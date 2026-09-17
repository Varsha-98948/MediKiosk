import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { abhaId, phone, name, age, gender, bloodGroup, allergies, chronicConditions } = body;

    // 1. Try finding existing patient by ABHA ID
    if (abhaId && abhaId.trim()) {
      const existing = await prisma.patient.findFirst({
        where: { abhaId: abhaId.trim() },
        include: {
          encounters: {
            orderBy: { startedAt: 'desc' },
            take: 3,
            include: { vitals: true, diagnoses: true, prescriptions: { include: { items: true } } },
          },
        },
      });

      if (existing) {
        return NextResponse.json({
          isNew: false,
          patient: {
            ...existing,
            allergies: existing.allergies ? JSON.parse(existing.allergies) : [],
            chronicConditions: existing.chronicConditions ? JSON.parse(existing.chronicConditions) : [],
          },
        });
      }
    }

    // 2. Try finding existing patient by Phone if provided
    if (phone && phone.trim()) {
      const existing = await prisma.patient.findFirst({
        where: { phone: phone.trim() },
        include: {
          encounters: {
            orderBy: { startedAt: 'desc' },
            take: 3,
            include: { vitals: true, diagnoses: true, prescriptions: { include: { items: true } } },
          },
        },
      });

      if (existing) {
        return NextResponse.json({
          isNew: false,
          patient: {
            ...existing,
            allergies: existing.allergies ? JSON.parse(existing.allergies) : [],
            chronicConditions: existing.chronicConditions ? JSON.parse(existing.chronicConditions) : [],
          },
        });
      }
    }

    // 3. Register a new patient
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Patient name is required for registration.' },
        { status: 400 }
      );
    }

    const uniqueSuffix = Date.now().toString().slice(-5);
    const mrn = `UHID-${uniqueSuffix}`;

    const newPatient = await prisma.patient.create({
      data: {
        mrn,
        abhaId: abhaId?.trim() || `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name.trim(),
        age: parseInt(age) || 35,
        gender: gender || 'Male',
        phone: phone?.trim() || '+91 98000 00000',
        bloodGroup: bloodGroup || 'O Positive',
        allergies: allergies ? JSON.stringify(allergies) : JSON.stringify([]),
        chronicConditions: chronicConditions ? JSON.stringify(chronicConditions) : JSON.stringify([]),
      },
    });

    return NextResponse.json({
      isNew: true,
      patient: {
        ...newPatient,
        allergies: newPatient.allergies ? JSON.parse(newPatient.allergies) : [],
        chronicConditions: newPatient.chronicConditions ? JSON.parse(newPatient.chronicConditions) : [],
      },
    });
  } catch (error: any) {
    console.error('Error in /api/patients/identify:', error);
    return NextResponse.json({ error: error.message || 'Failed to identify/register patient' }, { status: 500 });
  }
}
