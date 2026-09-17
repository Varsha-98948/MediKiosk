import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find encounter by ID, patient ID, or token ID
    let encounter = await prisma.encounter.findFirst({
      where: {
        OR: [{ id }, { patientId: id }, { tokenId: id }],
      },
      include: {
        patient: true,
        doctor: { select: { id: true, name: true, specialty: true, regNo: true, roomNumber: true } },
        queueToken: true,
        vitals: true,
        clinicalNotes: true,
        diagnoses: true,
        prescriptions: {
          include: { items: true },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { startedAt: 'desc' },
    });

    // If no encounter exists for this patient, create one
    if (!encounter) {
      const patient = await prisma.patient.findFirst({
        where: { OR: [{ id }, { mrn: id }] },
      });

      if (!patient) {
        return NextResponse.json({ error: 'Patient or encounter not found.' }, { status: 404 });
      }

      encounter = await prisma.encounter.create({
        data: {
          patientId: patient.id,
          doctorId: 'doc-001',
          status: 'in_progress',
        },
        include: {
          patient: true,
          doctor: { select: { id: true, name: true, specialty: true, regNo: true, roomNumber: true } },
          queueToken: true,
          vitals: true,
          clinicalNotes: true,
          diagnoses: true,
          prescriptions: {
            include: { items: true },
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    }

    const formatted = {
      id: encounter.id,
      patientId: encounter.patientId,
      doctorId: encounter.doctorId,
      status: encounter.status,
      startedAt: encounter.startedAt,
      completedAt: encounter.completedAt,
      intakeSummary: encounter.intakeSummary ? JSON.parse(encounter.intakeSummary) : null,
      patient: {
        ...encounter.patient,
        allergies: encounter.patient.allergies ? JSON.parse(encounter.patient.allergies) : [],
        chronicConditions: encounter.patient.chronicConditions ? JSON.parse(encounter.patient.chronicConditions) : [],
        registrationDate: new Date(encounter.patient.createdAt).toISOString().split('T')[0],
      },
      doctor: encounter.doctor,
      token: encounter.queueToken,
      vitals: encounter.vitals,
      clinicalNotes: encounter.clinicalNotes,
      diagnoses: encounter.diagnoses,
      prescription: encounter.prescriptions[0] || null,
    };

    return NextResponse.json({ success: true, encounter: formatted });
  } catch (error: any) {
    console.error('Error in /api/encounters/[id]:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch encounter' }, { status: 500 });
  }
}
