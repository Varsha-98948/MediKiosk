import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const encounter = await prisma.encounter.findFirst({
      where: { OR: [{ id }, { patientId: id }, { tokenId: id }] },
    });

    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found.' }, { status: 404 });
    }

    const saved = await prisma.clinicalNote.upsert({
      where: { encounterId: encounter.id },
      update: {
        hpi: body.hpi,
        generalExam: body.generalExam,
        cvs: body.cvs,
        respiratory: body.respiratory,
        abdomen: body.abdomen,
        cns: body.cns,
        doctorImpressions: body.doctorImpressions,
      },
      create: {
        encounterId: encounter.id,
        hpi: body.hpi || '',
        generalExam: body.generalExam || '',
        cvs: body.cvs || '',
        respiratory: body.respiratory || '',
        abdomen: body.abdomen || '',
        cns: body.cns || '',
        doctorImpressions: body.doctorImpressions || '',
      },
    });

    return NextResponse.json({ success: true, clinicalNotes: saved });
  } catch (error: any) {
    console.error('Error in /api/encounters/[id]/notes:', error);
    return NextResponse.json({ error: error.message || 'Failed to save notes' }, { status: 500 });
  }
}
