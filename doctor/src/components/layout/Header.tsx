'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';

interface HeaderProps {
  onOpenRegisterModal?: () => void;
}

export function Header({ onOpenRegisterModal }: HeaderProps) {
  const router = useRouter();
  const { queue, selectPatient, safetyAlerts } = useClinicalEncounter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredPatients = searchQuery.trim()
    ? queue.filter(
        (q) =>
          q.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.phone.includes(searchQuery)
      )
    : [];

  const handleSelectSearchResult = (id: string) => {
    selectPatient(id);
    setSearchQuery('');
    setIsSearchOpen(false);
    router.push(`/encounter/${id}`);
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-surface-container-lowest border-b border-surface-container-high/60 shadow-[0_1px_4px_rgba(0,0,0,0.03)] z-40 flex items-center justify-between px-6 select-none">
      {/* Clinic Name & Global Search */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-high/40">
          <span className="material-symbols-outlined text-primary text-[18px]">local_hospital</span>
          <span className="font-headline-sm text-[13px] font-semibold">Apollo Multi-Specialty Clinic</span>
          <span className="text-on-surface-variant font-body-sm text-[12px]">• OPD Unit 3</span>
          <span className="material-symbols-outlined text-on-surface-variant text-[16px]">expand_more</span>
        </div>

        {/* Global Search Input */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            className="h-9 w-80 pl-9 pr-12 rounded-lg bg-surface-container-low text-on-surface font-body-md text-[13px] outline-none focus:ring-1 focus:ring-primary border border-surface-container-high/40 placeholder:text-on-surface-variant/70"
            placeholder="Global Patient Search (Name, UHID, Mobile)..."
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
          />
          <span className="absolute right-2 font-body-sm text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono">
            ⌘K
          </span>

          {/* Quick Search Autocomplete Dropdown */}
          {isSearchOpen && filteredPatients.length > 0 && (
            <div className="absolute top-11 left-0 w-96 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-high p-2 z-50">
              <div className="text-[11px] font-bold text-on-surface-variant uppercase px-2 py-1 tracking-wider">
                Matching Patients in Queue ({filteredPatients.length})
              </div>
              <div className="space-y-1">
                {filteredPatients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectSearchResult(p.id)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low text-left transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-[13px] text-on-surface">{p.patientName}</p>
                      <p className="text-[11px] text-on-surface-variant">
                        {p.mrn} • {p.age} Yrs • {p.gender}
                      </p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-bold uppercase">
                      Token #{p.tokenNumber}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: New Patient, Notifications, Doctor Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenRegisterModal || (() => router.push('/patients'))}
          className="h-9 px-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary flex items-center gap-1.5 font-headline-sm text-[13px] font-semibold transition-colors shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>+ New Patient</span>
        </button>

        {/* Safety Alerts / Notification Bell */}
        <div className="relative">
          <button
            className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors border border-surface-container-high/40"
            type="button"
            title={`${safetyAlerts.length} Safety Alerts`}
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {safetyAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error animate-pulse"></span>
            )}
          </button>
        </div>

        <div className="h-6 w-[1px] bg-outline-variant/30 mx-1"></div>

        {/* Doctor Identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-[12px] shadow-sm">
            DC
          </div>
          <div className="flex flex-col text-left">
            <span className="font-headline-sm text-[13px] font-bold text-on-surface leading-tight">
              Dr. Dhananjay Chavan
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant leading-none">
              MD, Senior Diabetologist
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
