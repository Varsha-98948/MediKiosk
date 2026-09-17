'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';

export function PatientBanner() {
  const router = useRouter();
  const {
    activePatient,
    vitals,
    setIsA4ModalOpen,
    completeConsultation,
  } = useClinicalEncounter();

  if (!activePatient) return null;

  const handleEndConsultation = () => {
    if (window.confirm(`Complete consultation for ${activePatient.name} and return to OPD Queue?`)) {
      completeConsultation();
      router.push('/doctor');
    }
  };

  return (
    <div className="w-full bg-inverse-surface text-inverse-on-surface rounded-xl p-3 px-5 shadow-sm border-b-2 border-primary-fixed flex flex-col md:flex-row md:items-center justify-between gap-4 select-none mb-4">
      {/* Patient Demographics & Identification */}
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-[15px] shadow-sm tracking-wider">
          {activePatient.avatar || 'PT'}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <span className="font-headline-md text-[17px] font-bold text-white">
              {activePatient.name}
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-highest/20 text-[11px] font-mono font-semibold tracking-wide text-primary-fixed">
              {activePatient.mrn}
            </span>
            <span className="text-[12px] text-inverse-on-surface/70">
              {activePatient.age} Yrs • {activePatient.gender}
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-surface-container-highest/20 text-inverse-on-surface/90 font-medium">
              {activePatient.bloodGroup}
            </span>
          </div>

          {/* Allergies & Key Clinical Indicators */}
          <div className="flex items-center gap-2 mt-1 flex-wrap text-[12px]">
            <span className="text-inverse-on-surface/60 font-semibold text-[11px] uppercase tracking-wider">
              Critical Allergies:
            </span>
            {activePatient.allergies.length > 0 ? (
              activePatient.allergies.map((allergy) => (
                <span
                  key={allergy}
                  className="px-2 py-0.5 rounded-full bg-error-container text-error text-[11px] font-bold border border-error/30 flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[12px]">warning</span>
                  {allergy}
                </span>
              ))
            ) : (
              <span className="text-inverse-on-surface/50 text-[11px]">No known drug allergies</span>
            )}
            <span className="text-inverse-on-surface/40">•</span>
            <span className="text-primary-fixed text-[12px] font-mono tabular-nums">
              BP: {vitals.systolic}/{vitals.diastolic} mmHg
            </span>
            <span className="text-inverse-on-surface/40">•</span>
            <span className="text-primary-fixed text-[12px] font-mono tabular-nums">
              FBS: {vitals.bloodSugarFasting} mg/dL
            </span>
          </div>
        </div>
      </div>

      {/* Action Zone: A4 Preview & End Consultation */}
      <div className="flex items-center gap-2.5 self-end md:self-auto">
        <button
          onClick={() => setIsA4ModalOpen(true)}
          className="h-9 px-3.5 rounded-lg bg-surface-container-highest/20 hover:bg-surface-container-highest/30 text-white font-headline-sm text-[12px] font-semibold flex items-center gap-1.5 transition-colors border border-surface-container-highest/30"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">print</span>
          <span>A4 Rx Preview</span>
          <span className="font-mono text-[10px] px-1 rounded bg-black/20 text-inverse-on-surface/70">
            ⌘P
          </span>
        </button>

        <button
          onClick={handleEndConsultation}
          className="h-9 px-4 rounded-lg bg-error hover:bg-red-700 text-white font-headline-sm text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>End Consultation</span>
        </button>
      </div>
    </div>
  );
}
