'use client';

import React, { useState } from 'react';
import { PatientKioskFlow } from '@/components/patient/PatientKioskFlow';
import { Language } from '@/types/patient';

export default function PatientPage() {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-[#F9F9F6] text-stone-900">
      <PatientKioskFlow
        language={language}
        onSelectLanguage={setLanguage}
        onTokenGenerated={(token) => {
          console.log('Token generated:', token);
        }}
        onSwitchToDoctor={() => {
          window.location.href = '/doctor';
        }}
        onEmergencyAlert={() => {
          alert('Emergency alert triggered! Medical staff has been notified.');
        }}
      />
    </div>
  );
}
