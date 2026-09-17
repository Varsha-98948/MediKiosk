'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HospitalOperationsDashboard } from '@/components/operations/HospitalOperationsDashboard';
import { mockPatients } from '@/data/patient/mockData';
import { Language } from '@/types/patient';
import { ArrowLeft, Tv, Stethoscope } from 'lucide-react';

export default function OperationsPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentToken, setCurrentToken] = useState('A-42');
  const [patientsList, setPatientsList] = useState(mockPatients);

  const handleCallNext = () => {
    const nextIdx = Math.floor(Math.random() * 50) + 1;
    setCurrentToken(`A-${nextIdx}`);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] text-stone-900 flex flex-col">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <div className="h-4 w-px bg-stone-300" />
          <h1 className="text-lg font-bold text-stone-900">Hospital Operations Command Center</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/patient/waiting-tv"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-all shadow-xs"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Waiting Room TV</span>
          </Link>
          <Link
            href="/doctor"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-800 text-white rounded-lg text-xs font-semibold hover:bg-teal-700 transition-all shadow-xs"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor Portal</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        <HospitalOperationsDashboard
          patients={patientsList}
          currentServingToken={currentToken}
          onCallNextPatient={handleCallNext}
          language={language}
        />
      </main>
    </div>
  );
}
