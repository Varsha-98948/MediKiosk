import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MediKiosk database...');

  // 1. Departments
  const departments = [
    { id: 'gen_med', name: 'General Medicine & Diabetology', code: 'A', room: 'Room 3' },
    { id: 'cardiology', name: 'Cardiology & Chest Medicine', code: 'C', room: 'Room 104' },
    { id: 'ortho', name: 'Orthopedics & Joint Care', code: 'O', room: 'Room 201' },
    { id: 'pediatrics', name: 'Pediatrics & Child Care', code: 'P', room: 'Room 102' },
    { id: 'ayurveda', name: 'Ayush & Integrative Medicine', code: 'AY', room: 'Room 108' },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { id: dept.id },
      update: dept,
      create: dept,
    });
  }

  // 2. Users (Doctors & Admin)
  const defaultPasswordHash = await bcrypt.hash('doctor123', 10);
  const adminPasswordHash = await bcrypt.hash('admin123', 10);

  const users = [
    {
      id: 'doc-001',
      email: 'doctor@medikiosk.in',
      passwordHash: defaultPasswordHash,
      name: 'Dr. Dhananjay Chavan',
      role: 'DOCTOR',
      specialty: 'Diabetology & Metabolic Care',
      regNo: 'MCI-2012-84920',
      roomNumber: 'Room 3',
      departmentId: 'gen_med',
    },
    {
      id: 'doc-002',
      email: 'cardio@medikiosk.in',
      passwordHash: defaultPasswordHash,
      name: 'Dr. Rajeshwar Sen',
      role: 'DOCTOR',
      specialty: 'Cardiology & Internal Medicine',
      regNo: 'MCI-2008-54219',
      roomNumber: 'Room 104',
      departmentId: 'cardiology',
    },
    {
      id: 'admin-001',
      email: 'admin@medikiosk.in',
      passwordHash: adminPasswordHash,
      name: 'Hospital Administrator',
      role: 'ADMIN',
      specialty: null,
      regNo: null,
      roomNumber: 'Admin Desk',
      departmentId: 'gen_med',
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }

  // 3. Initial Patients and Queue Tokens
  const today = new Date().toISOString().split('T')[0];

  const seedPatients = [
    {
      id: 'p-90284',
      mrn: 'UHID-90284',
      abhaId: '91-8472-1049-2819',
      name: 'Mr. Ramesh Chandra',
      age: 58,
      gender: 'Male',
      phone: '+91 98450 23119',
      bloodGroup: 'O Positive',
      allergies: JSON.stringify(['Penicillin Class']),
      chronicConditions: JSON.stringify(['Type 2 Diabetes Mellitus', 'Essential Hypertension']),
      tokenNumber: 104,
      tokenFormatted: 'A-104',
      departmentId: 'gen_med',
      triage: 'Priority',
      status: 'waiting',
      chiefComplaint: 'Polyuria, fatigue & uncontrolled FBS (186 mg/dL)',
    },
    {
      id: 'p-90285',
      mrn: 'UHID-90285',
      abhaId: '91-4829-1029-4401',
      name: 'Mrs. Sunita Devi',
      age: 52,
      gender: 'Female',
      phone: '+91 98210 44321',
      bloodGroup: 'B Positive',
      allergies: JSON.stringify([]),
      chronicConditions: JSON.stringify(['Hypertension']),
      tokenNumber: 101,
      tokenFormatted: 'A-101',
      departmentId: 'gen_med',
      triage: 'Urgent',
      status: 'waiting',
      chiefComplaint: 'Occipital headache & BP review (158/96)',
    },
    {
      id: 'p-90286',
      mrn: 'UHID-90286',
      abhaId: '91-2940-1928-3391',
      name: 'Mr. Anil Kulkarni',
      age: 64,
      gender: 'Male',
      phone: '+91 94481 99012',
      bloodGroup: 'A Positive',
      allergies: JSON.stringify([]),
      chronicConditions: JSON.stringify(['Diabetic Neuropathy']),
      tokenNumber: 102,
      tokenFormatted: 'A-102',
      departmentId: 'gen_med',
      triage: 'Routine',
      status: 'waiting',
      chiefComplaint: 'Bilateral feet burning sensation & numbness',
    },
    {
      id: 'p-90287',
      mrn: 'UHID-90287',
      abhaId: '91-7729-4401-9281',
      name: 'Ms. Priya Sharma',
      age: 29,
      gender: 'Female',
      phone: '+91 97312 88201',
      bloodGroup: 'O Negative',
      allergies: JSON.stringify([]),
      chronicConditions: JSON.stringify(['Gestational Screening']),
      tokenNumber: 103,
      tokenFormatted: 'A-103',
      departmentId: 'gen_med',
      triage: 'Routine',
      status: 'waiting',
      chiefComplaint: 'OGTT test report review (24 weeks gestation)',
    },
  ];

  for (const pat of seedPatients) {
    const { tokenNumber, tokenFormatted, departmentId, triage, status, chiefComplaint, ...patientData } = pat;

    const savedPatient = await prisma.patient.upsert({
      where: { mrn: patientData.mrn },
      update: patientData,
      create: patientData,
    });

    const token = await prisma.queueToken.upsert({
      where: {
        departmentId_date_tokenNumber: {
          departmentId,
          date: today,
          tokenNumber,
        },
      },
      update: {
        status,
        triage,
        chiefComplaint,
      },
      create: {
        tokenNumber,
        tokenFormatted,
        departmentId,
        patientId: savedPatient.id,
        date: today,
        triage,
        status,
        chiefComplaint,
      },
    });

    // Seed an initial encounter with vitals for Ramesh Chandra
    if (savedPatient.id === 'p-90284') {
      const encounter = await prisma.encounter.upsert({
        where: { tokenId: token.id },
        update: {},
        create: {
          patientId: savedPatient.id,
          doctorId: 'doc-001',
          tokenId: token.id,
          status: 'in_progress',
          intakeSummary: JSON.stringify({
            chiefComplaint: 'Polyuria, fatigue & uncontrolled FBS',
            duration: '3 Weeks',
            painScore: 3,
            location: 'General',
          }),
        },
      });

      await prisma.vitalSigns.upsert({
        where: { encounterId: encounter.id },
        update: {},
        create: {
          encounterId: encounter.id,
          systolic: 142,
          diastolic: 88,
          pulse: 78,
          spo2: 98,
          temp: 98.4,
          respiratoryRate: 18,
          bloodSugarFasting: 186,
          bloodSugarPostprandial: 248,
          height: 170,
          weight: 78.4,
          bmi: 27.1,
          bmiCategory: 'Overweight',
        },
      });

      await prisma.clinicalNote.upsert({
        where: { encounterId: encounter.id },
        update: {},
        create: {
          encounterId: encounter.id,
          hpi: 'Patient reports progressive polyuria and nocturia 3-4 times per night for the last 3 weeks.',
          generalExam: 'Conscious, oriented, no pedal edema, no pallor/icterus.',
          cvs: 'S1 S2 heard, no murmurs.',
          respiratory: 'Bilateral vesicular breath sounds, no added sounds.',
          abdomen: 'Soft, non-tender, no organomegaly.',
          cns: 'Intact, mild loss of vibration sense in bilateral great toes.',
          doctorImpressions: 'Uncontrolled Type 2 Diabetes with early peripheral neuropathy and stage 1 hypertension.',
        },
      });

      await prisma.diagnosis.createMany({
        data: [
          {
            encounterId: encounter.id,
            code: 'E11.9',
            description: 'Type 2 diabetes mellitus without complications (Uncontrolled glycemic profile)',
            type: 'Primary',
            status: 'Active',
            onsetDate: 'Jan 2021',
          },
          {
            encounterId: encounter.id,
            code: 'I10',
            description: 'Essential (primary) hypertension',
            type: 'Secondary',
            status: 'Chronic',
            onsetDate: 'Aug 2019',
          },
        ],
      }).catch(() => {});
    }
  }

  // Ensure sequence counter is seeded to 104 for gen_med
  await prisma.departmentDailySequence.upsert({
    where: {
      departmentId_date: {
        departmentId: 'gen_med',
        date: today,
      },
    },
    update: {
      lastTokenNumber: 104,
    },
    create: {
      departmentId: 'gen_med',
      date: today,
      lastTokenNumber: 104,
    },
  });

  console.log('MediKiosk database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
