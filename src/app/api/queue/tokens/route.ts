import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { broadcastQueueUpdate } from '@/lib/queueEvents';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      patientId,
      departmentId = 'gen_med',
      triage = 'Routine',
      chiefComplaint = 'Routine Consultation',
      intakeSummary = null,
      vitals = null,
    } = body;

    if (!patientId) {
      return NextResponse.json({ error: 'patientId is required.' }, { status: 400 });
    }

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found.' }, { status: 404 });
    }

    const today = new Date().toISOString().split('T')[0];

    // Concurrency-safe atomic token generation inside transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Get Department details
      const dept = await tx.department.findUnique({ where: { id: departmentId } });
      const deptCode = dept?.code || 'A';

      // 2. Atomically upsert and increment sequence counter
      const seq = await tx.departmentDailySequence.upsert({
        where: {
          departmentId_date: {
            departmentId,
            date: today,
          },
        },
        update: {
          lastTokenNumber: {
            increment: 1,
          },
        },
        create: {
          departmentId,
          date: today,
          lastTokenNumber: 101,
        },
      });

      const nextNumber = seq.lastTokenNumber;
      const tokenFormatted = `${deptCode}-${nextNumber}`;

      // 3. Create QueueToken
      const token = await tx.queueToken.create({
        data: {
          tokenNumber: nextNumber,
          tokenFormatted,
          departmentId,
          patientId,
          date: today,
          triage,
          status: 'waiting',
          chiefComplaint: chiefComplaint || 'Consultation',
        },
        include: {
          department: true,
          patient: true,
        },
      });

      // 4. Create associated Encounter with intake summary and vitals if provided
      const encounter = await tx.encounter.create({
        data: {
          patientId,
          tokenId: token.id,
          status: 'in_progress',
          intakeSummary: intakeSummary ? JSON.stringify(intakeSummary) : null,
        },
      });

      // 5. If initial vitals were collected at kiosk, save to VitalSigns
      if (vitals) {
        await tx.vitalSigns.create({
          data: {
            encounterId: encounter.id,
            systolic: parseInt(vitals.systolic) || parseInt(vitals.bp?.split('/')[0]) || null,
            diastolic: parseInt(vitals.diastolic) || parseInt(vitals.bp?.split('/')[1]) || null,
            pulse: parseInt(vitals.pulse) || parseInt(vitals.rhr) || null,
            spo2: parseInt(vitals.spo2) || null,
            temp: parseFloat(vitals.temp) || null,
            bloodSugarFasting: parseInt(vitals.bloodSugarFasting) || parseInt(vitals.bloodSugar) || null,
            height: parseFloat(vitals.height) || null,
            weight: parseFloat(vitals.weight) || null,
            bmi: parseFloat(vitals.bmi) || null,
            bmiCategory: vitals.bmiCategory || null,
          },
        });
      }

      return { token, encounter };
    });

    // Broadcast real-time SSE event
    broadcastQueueUpdate({
      type: 'TOKEN_CREATED',
      tokenId: result.token.id,
      tokenFormatted: result.token.tokenFormatted,
      departmentId: result.token.departmentId,
      departmentName: result.token.department.name,
      patientName: patient.name,
      timestamp: new Date().toISOString(),
    });

    // Count how many patients are ahead
    const patientsAhead = await prisma.queueToken.count({
      where: {
        departmentId,
        date: today,
        status: 'waiting',
        tokenNumber: { lt: result.token.tokenNumber },
      },
    });

    // Find the doctor assigned to this department for display on token
    const assignedDoctor = await prisma.user.findFirst({
      where: { departmentId, role: 'DOCTOR' },
      select: { name: true },
    });

    const responseToken = {
      id: result.token.id,
      tokenNumber: result.token.tokenFormatted,
      rawTokenNumber: result.token.tokenNumber,
      departmentId: result.token.departmentId,
      departmentName: result.token.department.name,
      roomNumber: result.token.department.room,
      patientId: patient.id,
      patientName: patient.name,
      phone: patient.phone,
      abhaId: patient.abhaId,
      age: patient.age,
      gender: patient.gender,
      reasonForVisit: result.token.chiefComplaint,
      generatedAt: result.token.createdAt.toISOString(),
      status: result.token.status,
      patientsAhead,
      estimatedWaitMins: Math.max(patientsAhead * 10, 5),
      intakeCompleted: true,
      encounterId: result.encounter.id,
      doctorName: assignedDoctor?.name || null,
    };

    return NextResponse.json({ success: true, token: responseToken });
  } catch (error: any) {
    console.error('Error in /api/queue/tokens:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate token' }, { status: 500 });
  }
}
