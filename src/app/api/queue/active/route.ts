import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get('departmentId');
    const today = new Date().toISOString().split('T')[0];

    const tokens = await prisma.queueToken.findMany({
      where: {
        date: today,
        departmentId: departmentId || undefined,
      },
      include: {
        patient: true,
        department: true,
        encounter: {
          include: {
            vitals: true,
            doctor: { select: { id: true, name: true, roomNumber: true } },
          },
        },
      },
      orderBy: [
        { status: 'asc' }, // waiting / in_consultation
        { tokenNumber: 'asc' },
      ],
    });

    const formattedQueue = tokens.map((t) => {
      const v = t.encounter?.vitals;
      const bpStr = v?.systolic && v?.diastolic ? `${v.systolic}/${v.diastolic} mmHg` : '120/80 mmHg';

      return {
        id: t.patientId, // Patient ID for opening encounter
        tokenId: t.id,
        tokenNumber: t.tokenNumber,
        tokenFormatted: t.tokenFormatted,
        mrn: t.patient.mrn,
        patientName: t.patient.name,
        age: t.patient.age,
        gender: t.patient.gender as 'Male' | 'Female' | 'Other',
        phone: t.patient.phone,
        category: t.department.name,
        chiefComplaint: t.chiefComplaint || 'Consultation',
        triage: t.triage as 'Urgent' | 'Priority' | 'Routine',
        status: t.status as 'waiting' | 'in_progress' | 'completed' | 'absent',
        waitTime: `${Math.max(1, Math.floor((Date.now() - new Date(t.createdAt).getTime()) / 60000))} mins`,
        bp: bpStr,
        pulse: v?.pulse || 76,
        bloodSugar: v?.bloodSugarFasting || 120,
        encounterId: t.encounter?.id,
        roomNumber: t.department.room,
        doctorName: t.encounter?.doctor?.name,
      };
    });

    // Find currently serving token
    const currentlyServing = formattedQueue.find((q) => q.status === 'in_progress' || (q.status as any) === 'in_consultation');

    return NextResponse.json({
      success: true,
      date: today,
      queue: formattedQueue,
      currentlyServing: currentlyServing || null,
      totalCount: formattedQueue.length,
      waitingCount: formattedQueue.filter((q) => q.status === 'waiting').length,
    });
  } catch (error: any) {
    console.error('Error in /api/queue/active:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch queue' }, { status: 500 });
  }
}
