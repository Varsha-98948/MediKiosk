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

    const vitalsData = {
      systolic: body.systolic !== undefined ? parseInt(body.systolic) || null : undefined,
      diastolic: body.diastolic !== undefined ? parseInt(body.diastolic) || null : undefined,
      pulse: body.pulse !== undefined ? parseInt(body.pulse) || null : undefined,
      spo2: body.spo2 !== undefined ? parseInt(body.spo2) || null : undefined,
      temp: body.temp !== undefined ? parseFloat(body.temp) || null : undefined,
      respiratoryRate: body.respiratoryRate !== undefined ? parseInt(body.respiratoryRate) || null : undefined,
      bloodSugarFasting: body.bloodSugarFasting !== undefined ? parseInt(body.bloodSugarFasting) || null : undefined,
      bloodSugarPostprandial: body.bloodSugarPostprandial !== undefined ? parseInt(body.bloodSugarPostprandial) || null : undefined,
      height: body.height !== undefined ? parseFloat(body.height) || null : undefined,
      weight: body.weight !== undefined ? parseFloat(body.weight) || null : undefined,
      bmi: body.bmi !== undefined ? parseFloat(body.bmi) || null : undefined,
      bmiCategory: body.bmiCategory !== undefined ? body.bmiCategory : undefined,
    };

    const saved = await prisma.vitalSigns.upsert({
      where: { encounterId: encounter.id },
      update: vitalsData,
      create: {
        encounterId: encounter.id,
        ...vitalsData,
      },
    });

    return NextResponse.json({ success: true, vitals: saved });
  } catch (error: any) {
    console.error('Error in /api/encounters/[id]/vitals:', error);
    return NextResponse.json({ error: error.message || 'Failed to save vitals' }, { status: 500 });
  }
}
