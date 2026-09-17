import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { broadcastQueueUpdate } from '@/lib/queueEvents';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const encounter = await prisma.encounter.findFirst({
      where: { OR: [{ id }, { patientId: id }, { tokenId: id }] },
      include: {
        patient: true,
        queueToken: { include: { department: true } },
        prescriptions: { include: { items: true } },
      },
    });

    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found.' }, { status: 404 });
    }

    const updated = await prisma.$transaction(async (tx) => {
      // 1. Finalize encounter
      const finalizedEncounter = await tx.encounter.update({
        where: { id: encounter.id },
        data: {
          status: 'completed',
          completedAt: new Date(),
        },
      });

      // 2. Mark prescription finalized
      if (encounter.prescriptions.length > 0) {
        await tx.prescription.update({
          where: { id: encounter.prescriptions[0].id },
          data: { isFinalized: true },
        });
      }

      // 3. Complete queue token if present
      if (encounter.tokenId) {
        await tx.queueToken.update({
          where: { id: encounter.tokenId },
          data: { status: 'completed' },
        });
      }

      return finalizedEncounter;
    });

    // Broadcast SSE completion
    if (encounter.queueToken) {
      broadcastQueueUpdate({
        type: 'TOKEN_COMPLETED',
        tokenId: encounter.queueToken.id,
        tokenFormatted: encounter.queueToken.tokenFormatted,
        departmentId: encounter.queueToken.departmentId,
        departmentName: encounter.queueToken.department.name,
        patientName: encounter.patient.name,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Encounter finalized and saved successfully.',
      encounter: updated,
    });
  } catch (error: any) {
    console.error('Error in /api/encounters/[id]/finalize:', error);
    return NextResponse.json({ error: error.message || 'Failed to finalize encounter' }, { status: 500 });
  }
}
