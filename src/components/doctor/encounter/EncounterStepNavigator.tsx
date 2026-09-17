'use client';

import React from 'react';
import { useClinicalEncounter, EncounterStepKey } from '@/context/ClinicalEncounterContext';

interface StepMeta {
  key: EncounterStepKey;
  label: string;
  icon: string;
  number: number;
}

const steps: StepMeta[] = [
  { key: 'profile', label: 'Patient 360', icon: 'clinical_notes', number: 1 },
  { key: 'vitals', label: 'Triage Vitals', icon: 'vital_signs', number: 2 },
  { key: 'complaints', label: 'Complaints', icon: 'stethoscope', number: 3 },
  { key: 'notes', label: 'Notes & Exam', icon: 'edit_note', number: 4 },
  { key: 'diagnoses', label: 'ICD-10 Diagnoses', icon: 'diagnosis', number: 5 },
  { key: 'rx', label: 'Rx Builder', icon: 'prescriptions', number: 6 },
  { key: 'safety', label: 'Safety Diff', icon: 'verified_user', number: 7 },
  { key: 'orders', label: 'Lab Orders', icon: 'biotech', number: 8 },
  { key: 'directives', label: 'Directives', icon: 'health_and_safety', number: 9 },
  { key: 'followup', label: 'Follow-Up', icon: 'event', number: 10 },
];

export function EncounterStepNavigator() {
  const { currentStep, setCurrentStep, goToNextStep, goToPrevStep, stepIndex } = useClinicalEncounter();

  return (
    <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 select-none mb-5">
      {/* Horizontal Scrollable Stepper */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        {steps.map((s, idx) => {
          const isActive = s.key === currentStep;
          const isPassed = idx < stepIndex;

          return (
            <button
              key={s.key}
              onClick={() => setCurrentStep(s.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors shrink-0 ${
                isActive
                  ? 'bg-primary text-on-primary shadow-xs'
                  : isPassed
                  ? 'bg-primary/10 text-primary hover:bg-primary/15'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{s.icon}</span>
              <span>
                {s.number}. {s.label}
              </span>
              {isPassed && (
                <span className="material-symbols-outlined text-[14px] text-primary">check</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Prev / Next Controls */}
      <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
        <button
          onClick={goToPrevStep}
          disabled={stepIndex === 0}
          className="h-8 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container disabled:opacity-40 text-on-surface text-[12px] font-semibold flex items-center gap-1 transition-colors border border-surface-container-high/40"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          <span>Back</span>
        </button>

        <button
          onClick={goToNextStep}
          className="h-8 px-3.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1 transition-colors shadow-2xs"
        >
          <span>{stepIndex === steps.length - 1 ? 'Preview A4 Rx' : 'Next Step'}</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
