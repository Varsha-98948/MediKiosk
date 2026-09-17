import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const patient = await prisma.patient.findFirst({
      where: {
        OR: [{ id }, { mrn: id }],
      },
      include: {
        tokens: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        encounters: {
          orderBy: { startedAt: 'desc' },
          include: {
            doctor: { select: { id: true, name: true, specialty: true } },
            vitals: true,
            clinicalNotes: true,
            diagnoses: true,
            prescriptions: { include: { items: true } },
          },
        },
      },
    });

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found.' }, { status: 404 });
    }

    const formatted = {
      id: patient.id,
      mrn: patient.mrn,
      abhaId: patient.abhaId,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      bloodGroup: patient.bloodGroup,
      allergies: patient.allergies ? JSON.parse(patient.allergies) : [],
      chronicConditions: patient.chronicConditions ? JSON.parse(patient.chronicConditions) : [],
      registrationDate: new Date(patient.createdAt).toISOString().split('T')[0],
      tokens: patient.tokens,
      encounters: patient.encounters.map((e) => ({
        id: e.id,
        doctorId: e.doctorId,
        doctorName: e.doctor?.name || 'Consultant Doctor',
        status: e.status,
        startedAt: e.startedAt,
        completedAt: e.completedAt,
        intakeSummary: e.intakeSummary ? JSON.parse(e.intakeSummary) : null,
        vitals: e.vitals,
        clinicalNotes: e.clinicalNotes,
        diagnoses: e.diagnoses,
        prescriptions: e.prescriptions,
      })),
    };

    return NextResponse.json({ patient: formatted });
  } catch (error: any) {
    console.error('Error in /api/patients/[id]:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch patient' }, { status: 500 });
  }
}
