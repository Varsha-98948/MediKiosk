'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Language } from '@/types/patient';
import { ArrowLeft, Languages } from 'lucide-react';

// Dynamic imports for each module
import { MedicineExplorer } from '@/components/modules/MedicineExplorer';
import { XrayViewer } from '@/components/modules/XrayViewer';
import { FirstAidRedFlagCenter } from '@/components/modules/FirstAidRedFlagCenter';
import { DoctorAppointmentBooking } from '@/components/modules/DoctorAppointmentBooking';
import { HealthReels } from '@/components/modules/HealthReels';
import { HealthGuide } from '@/components/modules/HealthGuide';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params?.id as string;
  const [language, setLanguage] = useState<Language>('en');

  const renderModule = () => {
    switch (moduleId) {
      case 'medicine-explorer':
        return <MedicineExplorer language={language} onBack={() => router.push('/patient')} />;
      case 'xray-viewer':
        return <XrayViewer language={language} onBack={() => router.push('/patient')} />;
      case 'first-aid':
        return <FirstAidRedFlagCenter language={language} onBack={() => router.push('/patient')} />;
      case 'appointments':
        return <DoctorAppointmentBooking language={language} onBack={() => router.push('/patient')} />;
      case 'health-reels':
        return <HealthReels language={language} onBack={() => router.push('/patient')} />;
      case 'health-guide':
        return <HealthGuide language={language} onBack={() => router.push('/patient')} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-stone-600">
            <span className="text-5xl">🔍</span>
            <h2 className="text-xl font-bold">Module Not Found</h2>
            <p className="text-sm">The requested module &quot;{moduleId}&quot; is not available.</p>
            <button
              onClick={() => router.push('/patient')}
              className="px-5 py-2.5 rounded-xl bg-[#166E7E] text-white font-bold text-sm hover:bg-[#0F4B56] transition-colors"
            >
              ← Back to Patient Portal
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] text-stone-900 flex flex-col font-['Outfit']">
      <header className="bg-white border-b border-stone-200 px-6 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <div className="h-4 w-px bg-stone-300" />
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Module: {moduleId}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold">
            <Languages className="w-3.5 h-3.5 text-stone-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent border-none text-xs font-bold text-stone-800 focus:outline-hidden cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>
          <Link
            href="/patient"
            className="px-3 py-1.5 rounded-xl bg-teal-800 text-white font-bold text-xs hover:bg-teal-700 transition-colors shadow-xs"
          >
            Patient Kiosk
          </Link>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {renderModule()}
      </main>
    </div>
  );
}
