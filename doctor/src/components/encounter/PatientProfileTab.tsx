'use client';

import React from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import { rameshChandraTimeline } from '@/data/mockPatients';

export function PatientProfileTab() {
  const { activePatient, setCurrentStep } = useClinicalEncounter();

  if (!activePatient) return null;

  return (
    <div className="flex flex-col w-full gap-5 select-none">
      {/* Overview Cards: Demographics & Chronic History */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Longitudinal Summary */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <span className="material-symbols-outlined text-[20px]">medical_information</span>
            <h3 className="font-headline-sm text-[14px] font-bold text-on-surface">
              Patient Identification &amp; Demographics
            </h3>
          </div>
          <div className="space-y-2 text-[12px] text-on-surface-variant">
            <div className="flex justify-between py-1 border-b border-surface-container-high/30">
              <span>Full Name:</span>
              <span className="font-bold text-on-surface">{activePatient.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container-high/30">
              <span>UHID / MRN:</span>
              <span className="font-mono font-bold text-primary">{activePatient.mrn}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container-high/30">
              <span>Age &amp; Gender:</span>
              <span className="text-on-surface font-semibold">
                {activePatient.age} Yrs • {activePatient.gender}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container-high/30">
              <span>Blood Group:</span>
              <span className="text-on-surface font-semibold">{activePatient.bloodGroup}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container-high/30">
              <span>Registered Since:</span>
              <span className="text-on-surface">{activePatient.registrationDate}</span>
            </div>
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <span className="material-symbols-outlined text-[20px]">chronic</span>
            <h3 className="font-headline-sm text-[14px] font-bold text-on-surface">
              Active Chronic Conditions
            </h3>
          </div>
          <div className="space-y-2.5">
            {activePatient.chronicConditions.map((cond) => (
              <div
                key={cond}
                className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high/50 flex items-center justify-between text-[12px]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-semibold text-on-surface">{cond}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant uppercase font-bold">
                  Managed
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Drug Allergies & Safety Notice */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-error">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            <h3 className="font-headline-sm text-[14px] font-bold text-error">
              Severe Drug Allergies &amp; Alerts
            </h3>
          </div>
          {activePatient.allergies.length > 0 ? (
            <div className="space-y-2">
              {activePatient.allergies.map((allergy) => (
                <div
                  key={allergy}
                  className="p-2.5 rounded-lg bg-error-container/40 border border-error/20 text-[12px] text-error flex items-start gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">
                    emergency
                  </span>
                  <div>
                    <p className="font-bold">{allergy}</p>
                    <p className="text-[11px] text-error/80">
                      Documented severe reaction. Contraindicated for all clinical orders.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[12px] text-on-surface-variant">No known drug allergies reported.</p>
          )}
        </div>
      </div>

      {/* Chronological Longitudinal Past Encounters Timeline */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-high/60 shadow-xs">
        <div className="flex items-center justify-between mb-5 border-b border-surface-container-high/50 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">history</span>
            <div>
              <h2 className="font-headline-sm text-[16px] font-bold text-on-surface">
                Longitudinal Consultation History &amp; Timeline
              </h2>
              <p className="text-[12px] text-on-surface-variant">
                Previous outpatient encounters, diagnoses, vitals trends &amp; prescriptions
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep('vitals')}
            className="h-8 px-3.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>Proceed to Vitals Recording</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Timeline Items */}
        <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">
          {rameshChandraTimeline.map((visit) => (
            <div key={visit.id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white shadow-xs"></div>

              {/* Card */}
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high/50 space-y-2.5">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[14px] text-on-surface">{visit.date}</span>
                      <span className="text-[12px] text-primary font-semibold">
                        • {visit.doctorName}
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      {visit.department}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono px-2 py-1 rounded bg-surface-container text-on-surface-variant border border-surface-container-high/40">
                    {visit.vitals}
                  </div>
                </div>

                {/* Diagnoses & Complaints */}
                <div className="text-[12px] space-y-1">
                  <div className="flex gap-2">
                    <span className="font-semibold text-on-surface-variant">Diagnoses:</span>
                    <span className="text-on-surface font-medium">
                      {visit.diagnoses.join(' • ')}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-on-surface-variant">Prescribed:</span>
                    <span className="text-on-surface">
                      {visit.prescriptions.join(' | ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant/90 italic bg-surface-container-lowest p-2 rounded border border-surface-container-high/30">
                    &quot;{visit.notes}&quot;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
