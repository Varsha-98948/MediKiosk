import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { diagnoses } = body; // Array of { code, description, type, status, onsetDate }

    const encounter = await prisma.encounter.findFirst({
      where: { OR: [{ id }, { patientId: id }, { tokenId: id }] },
    });

    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found.' }, { status: 404 });
    }

    if (!Array.isArray(diagnoses)) {
      return NextResponse.json({ error: 'diagnoses must be an array.' }, { status: 400 });
    }

    // Atomic replace of diagnoses for this encounter
    await prisma.$transaction(async (tx) => {
      await tx.diagnosis.deleteMany({
        where: { encounterId: encounter.id },
      });

      if (diagnoses.length > 0) {
        await tx.diagnosis.createMany({
          data: diagnoses.map((d: any) => ({
            encounterId: encounter.id,
            code: d.code,
            description: d.description,
            type: d.type || 'Primary',
            status: d.status || 'Active',
            onsetDate: d.onsetDate || null,
          })),
        });
      }
    });

    const updated = await prisma.diagnosis.findMany({
      where: { encounterId: encounter.id },
    });

    return NextResponse.json({ success: true, diagnoses: updated });
  } catch (error: any) {
    console.error('Error in /api/encounters/[id]/diagnoses:', error);
    return NextResponse.json({ error: error.message || 'Failed to save diagnoses' }, { status: 500 });
  }
}
