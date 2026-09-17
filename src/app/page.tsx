'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/landing/LandingPage';
import { EcosystemNavbar, EcosystemView } from '@/components/navigation/EcosystemNavbar';
import { AllServicesModal } from '@/components/navigation/AllServicesModal';
import { Language } from '@/types/patient';

export default function HomePage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('en');
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [currentServingToken, setCurrentServingToken] = useState('A-42');
  const [isOnline, setIsOnline] = useState(true);

  const handleSelectView = (view: EcosystemView) => {
    switch (view) {
      case 'landing':
        router.push('/');
        break;
      case 'kiosk':
        router.push('/patient');
        break;
      case 'doctor':
        router.push('/doctor');
        break;
      case 'ayush_engine':
        router.push('/patient/ayush');
        break;
      case 'operations':
        router.push('/patient/operations');
        break;
    }
  };

  const handleSelectService = (serviceId: string) => {
    setIsServicesModalOpen(false);
    switch (serviceId) {
      case 'kiosk':
        router.push('/patient');
        break;
      case 'doctor':
        router.push('/doctor');
        break;
      case 'ayush_engine':
        router.push('/patient/ayush');
        break;
      case 'operations':
        router.push('/patient/operations');
        break;
      case 'medicine_explorer':
        router.push('/patient/modules/medicine-explorer');
        break;
      case 'xray_viewer':
        router.push('/patient/modules/xray-viewer');
        break;
      case 'first_aid':
        router.push('/patient/modules/first-aid');
        break;
      case 'appointments':
        router.push('/patient/modules/appointments');
        break;
      case 'health_reels':
        router.push('/patient/modules/health-reels');
        break;
      case 'health_guide':
        router.push('/patient/modules/health-guide');
        break;
      case 'waiting_tv':
        router.push('/patient/waiting-tv');
        break;
      default:
        router.push('/patient');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <EcosystemNavbar
        currentView="landing"
        onSelectView={handleSelectView}
        language={language}
        onSelectLanguage={setLanguage}
        currentServingToken={currentServingToken}
        onCallNextToken={() => {
          const nextIdx = Math.floor(Math.random() * 50) + 1;
          setCurrentServingToken(`A-${nextIdx}`);
        }}
        onSimulateEmergency={() => alert('Emergency protocol initiated.')}
        isOnline={isOnline}
        onToggleOnline={() => setIsOnline(!isOnline)}
        onToggleAccessibility={() => {}}
        onOpenAllServices={() => setIsServicesModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LandingPage
          language={language}
          onExplorePlatform={() => router.push('/patient')}
          onOpenKiosk={() => router.push('/patient')}
          onOpenDoctor={() => router.push('/doctor')}
          onOpenAyushEngine={() => router.push('/patient/ayush')}
          onOpenOperations={() => router.push('/patient/operations')}
          onOpenMedicineExplorer={() => router.push('/patient/modules/medicine-explorer')}
          onOpenXrayViewer={() => router.push('/patient/modules/xray-viewer')}
          onOpenFirstAid={() => router.push('/patient/modules/first-aid')}
          onOpenAppointments={() => router.push('/patient/modules/appointments')}
          onOpenAllServices={() => setIsServicesModalOpen(true)}
        />
      </main>

      <AllServicesModal
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
        language={language}
        onSelectService={handleSelectService}
      />
    </div>
  );
}
