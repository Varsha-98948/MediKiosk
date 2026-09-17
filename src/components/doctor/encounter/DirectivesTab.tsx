'use client';

import React from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';

export function DirectivesTab() {
  const { directives, toggleDirective, setCurrentStep } = useClinicalEncounter();

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Diet':
        return 'nutrition';
      case 'Exercise':
        return 'directions_walk';
      case 'Precautions':
        return 'footprint';
      case 'Emergency':
        return 'emergency';
      default:
        return 'health_and_safety';
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 select-none">
      {/* Header */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-[13px] mb-1">
            <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
            <span>Guidance Station 9</span>
          </div>
          <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
            Physician Directives &amp; Lifestyle Advice
          </h2>
          <p className="text-[12px] text-on-surface-variant">
            Medical nutrition therapy, aerobic prescription, diabetic foot care, and red-flag protocols
          </p>
        </div>

        <button
          onClick={() => setCurrentStep('followup')}
          className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-2xs"
        >
          <span>Continue to Follow-Up Slot</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Directives Cards List */}
      <div className="space-y-3">
        {directives.map((directive) => {
          const icon = getCategoryIcon(directive.category);
          const isEmergency = directive.category === 'Emergency';

          return (
            <div
              key={directive.id}
              onClick={() => toggleDirective(directive.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3.5 ${
                directive.selected
                  ? isEmergency
                    ? 'bg-rose-50/70 border-rose-300 shadow-xs'
                    : 'bg-primary/5 border-primary shadow-xs'
                  : 'bg-surface-container-lowest border-surface-container-high/60 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-5 h-5 rounded mt-1 flex items-center justify-center text-white text-[14px] shrink-0 ${
                    directive.selected ? 'bg-primary' : 'border border-surface-container-high bg-white'
                  }`}
                >
                  {directive.selected && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        isEmergency ? 'text-error' : 'text-primary'
                      }`}
                    >
                      {icon}
                    </span>
                    <h4 className="font-bold text-[14px] text-on-surface">{directive.title}</h4>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isEmergency
                          ? 'bg-error-container text-error'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {directive.category}
                    </span>
                  </div>

                  <p className="text-[12px] text-on-surface-variant leading-relaxed">
                    {directive.description}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-primary shrink-0 self-center">
                {directive.selected ? 'Included in Rx' : '+ Include'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
