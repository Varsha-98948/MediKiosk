import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase() || '';

    const patients = await prisma.patient.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q } },
              { mrn: { contains: q } },
              { phone: { contains: q } },
              { abhaId: { contains: q } },
            ],
          }
        : undefined,
      include: {
        encounters: {
          orderBy: { startedAt: 'desc' },
          take: 1,
          select: { startedAt: true, status: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: 50,
    });

    const formatted = patients.map((p) => ({
      id: p.id,
      mrn: p.mrn,
      abhaId: p.abhaId,
      name: p.name,
      age: p.age,
      gender: p.gender,
      phone: p.phone,
      bloodGroup: p.bloodGroup,
      allergies: p.allergies ? JSON.parse(p.allergies) : [],
      chronicConditions: p.chronicConditions ? JSON.parse(p.chronicConditions) : [],
      lastVisit: p.encounters[0]?.startedAt
        ? new Date(p.encounters[0].startedAt).toISOString().split('T')[0]
        : 'New Registration',
      registrationDate: new Date(p.createdAt).toISOString().split('T')[0],
    }));

    return NextResponse.json({ patients: formatted });
  } catch (error: any) {
    console.error('Error in /api/patients:', error);
    return NextResponse.json({ error: error.message || 'Failed to list patients' }, { status: 500 });
  }
}
