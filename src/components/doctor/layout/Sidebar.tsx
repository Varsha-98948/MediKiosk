'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useClinicalEncounter, EncounterStepKey } from '@/context/ClinicalEncounterContext';

interface NavItem {
  name: string;
  icon: string;
  href?: string;
  step?: EncounterStepKey;
  isAction?: boolean;
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    queue,
    activePatient,
    currentStep,
    setCurrentStep,
    setIsA4ModalOpen,
  } = useClinicalEncounter();

  const waitingCount = queue.filter((q) => q.status === 'waiting').length;
  const isEncounterPage = pathname?.startsWith('/doctor/encounter');
  const patientId = activePatient?.id || 'p-90284';

  const navItems: NavItem[] = [
    { name: 'OPD Queue Desk', icon: 'view_list', href: '/doctor' },
    { name: 'Patient Registry', icon: 'person_search', href: '/doctor/patients' },
    { name: 'Patient 360 Profile', icon: 'clinical_notes', step: 'profile' },
    { name: 'Triage & Vitals', icon: 'vital_signs', step: 'vitals' },
    { name: 'Clinical Intake (HPI)', icon: 'stethoscope', step: 'complaints' },
    { name: 'Diagnoses & ICD-10', icon: 'diagnosis', step: 'diagnoses' },
    { name: 'Rx Builder Engine', icon: 'prescriptions', step: 'rx' },
    { name: 'Med Safety & Diff', icon: 'verified_user', step: 'safety' },
    { name: 'Orders & Directives', icon: 'order_approve', step: 'orders' },
    { name: 'A4 Letterhead Rx', icon: 'print', isAction: true },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.isAction) {
      setIsA4ModalOpen(true);
      return;
    }

    if (item.href) {
      router.push(item.href);
      return;
    }

    if (item.step) {
      setCurrentStep(item.step);
      if (!isEncounterPage) {
        router.push(`/doctor/encounter/${patientId}`);
      }
    }
  };

  const isItemActive = (item: NavItem) => {
    if (item.href) {
      if (item.href === '/doctor' && pathname === '/doctor') return true;
      if (item.href !== '/doctor' && pathname?.startsWith(item.href)) return true;
      return false;
    }
    if (item.step) {
      return isEncounterPage && currentStep === item.step;
    }
    return false;
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-inverse-surface text-inverse-on-surface z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.08)] select-none">
      <div className="flex flex-col h-full">
        {/* Clinic Brand - Typographic MediKiosk Logo */}
        <div className="h-14 px-5 flex items-center justify-between bg-inverse-surface border-b border-surface-container-highest/10">
          <div className="flex items-center">
            <span className="text-[20px] font-bold tracking-tight text-white font-sans">
              Medi<span className="text-primary-fixed">Kiosk</span>
            </span>
          </div>
          <span className="font-badge text-[9px] text-primary-fixed/80 uppercase tracking-widest font-semibold border border-primary-fixed/25 px-1.5 py-0.5 rounded">
            EMR v4.2
          </span>
        </div>

        {/* Live OPD Queue Pill */}
        <div className="px-3 py-2 bg-inverse-surface">
          <div className="p-2.5 rounded-lg bg-surface-container-highest/10 flex items-center justify-between border border-surface-container-highest/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
              <div>
                <p className="font-label-caps text-[11px] text-surface-dim uppercase font-bold tracking-wider">
                  Live OPD Queue
                </p>
                <p className="font-headline-sm text-[13px] text-inverse-on-surface leading-none font-semibold">
                  Room 3 • {waitingCount} Waiting
                </p>
              </div>
            </div>
            <span className="font-badge text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary text-on-primary uppercase">
              ON TIME
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors font-body-md text-[13px] ${
                  active
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-inverse-on-surface/80 hover:bg-surface-container-highest/10 hover:text-inverse-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Key Commands Cheatsheet */}
        <div className="p-3 bg-inverse-surface/90 border-t border-surface-container-highest/10">
          <div className="rounded-lg bg-surface-container-highest/10 p-2.5 text-inverse-on-surface/70 space-y-1.5 text-[12px]">
            <div className="flex items-center justify-between font-label-caps text-[10px] text-surface-dim uppercase font-bold">
              <span>Key Commands</span>
              <span className="px-1 rounded bg-surface-container-highest/20 text-inverse-on-surface font-mono">
                ESC
              </span>
            </div>
            <div className="flex justify-between items-center text-body-sm text-[11px]">
              <span>Search Patient</span>
              <span className="font-mono text-inverse-on-surface bg-surface-container-highest/20 px-1 rounded text-[10px]">
                ⌘K
              </span>
            </div>
            <div className="flex justify-between items-center text-body-sm text-[11px]">
              <span>Commit Rx Row</span>
              <span className="font-mono text-inverse-on-surface bg-surface-container-highest/20 px-1 rounded text-[10px]">
                ↵
              </span>
            </div>
            <div className="flex justify-between items-center text-body-sm text-[11px]">
              <span>Print Direct</span>
              <span className="font-mono text-inverse-on-surface bg-surface-container-highest/20 px-1 rounded text-[10px]">
                ⌘P
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
