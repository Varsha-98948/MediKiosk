'use client';

import React, { useState } from 'react';
import { HospitalWaitingRoomDisplay } from '@/components/common/HospitalWaitingRoomDisplay';
import { mockPatients } from '@/data/patient/mockData';
import { Language } from '@/types/patient';

export default function WaitingTvPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentToken, setCurrentToken] = useState('A-42');

  const waitingTokens = mockPatients.map((p) => ({
    token: p.tokenNumber,
    patientName: p.name,
    dept: p.assignedDoctor ? 'Cardiology' : 'General Medicine',
    status: p.queueStatus,
    isPriority: p.priority === 'urgent',
  }));

  const handleSimulateNext = () => {
    const nextIdx = Math.floor(Math.random() * 50) + 1;
    setCurrentToken(`A-${nextIdx}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <HospitalWaitingRoomDisplay
        language={language}
        currentServingToken={currentToken}
        servingRoom="Room 104 (OPD Block A)"
        servingDoctor="Dr. Rajeshwar Sen"
        servingDepartment="Cardiology & Internal Medicine"
        servingPatientName="Rahul Sharma"
        waitingTokens={waitingTokens}
        onSimulateNextToken={handleSimulateNext}
        onBackToKiosk={() => {
          window.location.href = '/patient';
        }}
      />
    </div>
  );
}
