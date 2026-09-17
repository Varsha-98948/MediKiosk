import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { broadcastQueueUpdate } from '@/lib/queueEvents';
import { getSessionFromRequest } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json().catch(() => ({}));
    const session = await getSessionFromRequest(req);

    // Find token by ID or patient ID
    const token = await prisma.queueToken.findFirst({
      where: {
        OR: [{ id }, { patientId: id }],
      },
      include: {
        department: true,
        patient: true,
        encounter: true,
      },
    });

    if (!token) {
      return NextResponse.json({ error: 'Token not found.' }, { status: 404 });
    }

    const doctorId = body.doctorId || session?.userId || 'doc-001';
    const doctor = await prisma.user.findUnique({ where: { id: doctorId } });

    // Update token status to in_consultation
    const updatedToken = await prisma.queueToken.update({
      where: { id: token.id },
      data: { status: 'in_consultation' },
    });

    // Ensure encounter exists and has doctorId assigned
    let encounter = token.encounter;
    if (!encounter) {
      encounter = await prisma.encounter.create({
        data: {
          patientId: token.patientId,
          tokenId: token.id,
          doctorId,
          status: 'in_progress',
        },
      });
    } else if (!encounter.doctorId || encounter.doctorId !== doctorId) {
      encounter = await prisma.encounter.update({
        where: { id: encounter.id },
        data: { doctorId },
      });
    }

    // Broadcast SSE update
    broadcastQueueUpdate({
      type: 'TOKEN_CALLED',
      tokenId: token.id,
      tokenFormatted: token.tokenFormatted,
      departmentId: token.departmentId,
      departmentName: token.department.name,
      roomNumber: doctor?.roomNumber || token.department.room,
      doctorName: doctor?.name || 'Dr. Dhananjay Chavan',
      patientName: token.patient.name,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      token: updatedToken,
      encounterId: encounter.id,
      patient: token.patient,
    });
  } catch (error: any) {
    console.error('Error in /api/queue/tokens/[id]/call:', error);
    return NextResponse.json({ error: error.message || 'Failed to call token' }, { status: 500 });
  }
}
