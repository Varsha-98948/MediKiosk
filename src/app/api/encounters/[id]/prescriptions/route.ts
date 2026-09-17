import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { items = [], generalAdvice, generalAdviceTranslations, rxLanguage = 'en', isFinalized = false } = body;

    const encounter = await prisma.encounter.findFirst({
      where: { OR: [{ id }, { patientId: id }, { tokenId: id }] },
    });

    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found.' }, { status: 404 });
    }

    const prescription = await prisma.$transaction(async (tx) => {
      // 1. Find or create prescription record for this encounter
      let rx = await tx.prescription.findFirst({
        where: { encounterId: encounter.id },
      });

      if (!rx) {
        rx = await tx.prescription.create({
          data: {
            encounterId: encounter.id,
            generalAdvice: generalAdvice || '',
            generalAdviceTranslations: generalAdviceTranslations ? JSON.stringify(generalAdviceTranslations) : null,
            rxLanguage: rxLanguage || 'en',
            isFinalized: isFinalized || false,
          },
        });
      } else {
        rx = await tx.prescription.update({
          where: { id: rx.id },
          data: {
            generalAdvice: generalAdvice !== undefined ? generalAdvice : rx.generalAdvice,
            generalAdviceTranslations:
              generalAdviceTranslations !== undefined
                ? JSON.stringify(generalAdviceTranslations)
                : rx.generalAdviceTranslations,
            rxLanguage: rxLanguage || rx.rxLanguage,
            isFinalized: isFinalized !== undefined ? isFinalized : rx.isFinalized,
          },
        });
      }

      // 2. Sync prescription items
      await tx.prescriptionItem.deleteMany({
        where: { prescriptionId: rx.id },
      });

      if (items.length > 0) {
        await tx.prescriptionItem.createMany({
          data: items.map((item: any) => ({
            prescriptionId: rx.id,
            drugName: item.drugName || item.name || 'Medication',
            genericName: item.genericName || null,
            form: item.form || 'Tab',
            strength: item.strength || null,
            dosageSchedule: item.dosageSchedule || item.dosage || '1-0-1',
            timing: item.timing || 'After Food',
            frequency: item.frequency || 'Daily',
            duration: item.duration || '30 Days',
            instructions: item.instructions || null,
            diffStatus: item.diffStatus || 'NEW',
          })),
        });
      }

      return tx.prescription.findUnique({
        where: { id: rx.id },
        include: { items: true },
      });
    });

    return NextResponse.json({ success: true, prescription });
  } catch (error: any) {
    console.error('Error in /api/encounters/[id]/prescriptions:', error);
    return NextResponse.json({ error: error.message || 'Failed to save prescriptions' }, { status: 500 });
  }
}
