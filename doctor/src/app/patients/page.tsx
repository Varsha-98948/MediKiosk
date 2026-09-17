'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import { mockPatients } from '@/data/mockPatients';
import { RegisterPatientModal } from '@/components/queue/RegisterPatientModal';

export default function PatientDirectoryPage() {
  const router = useRouter();
  const { selectPatient } = useClinicalEncounter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCohort, setSelectedCohort] = useState<string>('all');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const filteredPatients = mockPatients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery);

    if (!matchesSearch) return false;

    if (selectedCohort === 'diabetic') {
      return p.chronicConditions.some((c) => c.toLowerCase().includes('diabetes'));
    }
    if (selectedCohort === 'hypertensive') {
      return p.chronicConditions.some((c) => c.toLowerCase().includes('hypertension'));
    }

    return true;
  });

  const handleOpenChart = (patientId: string) => {
    selectPatient(patientId);
    router.push(`/encounter/${patientId}`);
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-16 select-none">
      {/* Breadcrumb & Step Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[12px] text-on-surface-variant mb-1 font-medium">
            <span>Clinical Registry</span>
            <span>/</span>
            <span className="text-primary font-semibold">Global Patient Directory</span>
          </div>
          <h1 className="font-headline-lg text-[22px] font-bold text-on-surface">
            Patient Directory &amp; Longitudinal Search
          </h1>
          <p className="text-[12px] text-on-surface-variant">
            Rapid indexed lookup across 340+ registered hospital patient records
          </p>
        </div>

        <button
          onClick={() => setIsRegisterOpen(true)}
          className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">person_add</span>
          <span>+ Register New Patient</span>
        </button>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            className="w-full h-9 pl-9 pr-8 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search by UHID, Mobile, Aadhaar, or Patient Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCohort('all')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
              selectedCohort === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            All Cohorts ({mockPatients.length})
          </button>
          <button
            onClick={() => setSelectedCohort('diabetic')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
              selectedCohort === 'diabetic'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Diabetic Cohort
          </button>
          <button
            onClick={() => setSelectedCohort('hypertensive')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
              selectedCohort === 'hypertensive'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Hypertensive
          </button>
        </div>
      </div>

      {/* Patient Directory Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high/60 shadow-xs hover:border-primary/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-[14px]">
                    {patient.avatar || 'PT'}
                  </div>
                  <div>
                    <h3 className="font-bold text-[14px] text-on-surface leading-tight">
                      {patient.name}
                    </h3>
                    <p className="text-[11px] font-mono text-primary font-semibold">
                      {patient.mrn}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-bold">
                  {patient.bloodGroup}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 text-[12px] text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Demographics:</span>
                  <span className="font-semibold text-on-surface">
                    {patient.age} Yrs • {patient.gender}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Contact:</span>
                  <span className="font-mono text-on-surface">{patient.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Visit:</span>
                  <span className="text-on-surface">{patient.lastVisit || 'First Visit'}</span>
                </div>
              </div>

              {/* Chronic Conditions */}
              <div className="mt-3 pt-2.5 border-t border-surface-container-high/40">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block mb-1">
                  Chronic Conditions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {patient.chronicConditions.map((cond) => (
                    <span
                      key={cond}
                      className="px-1.5 py-0.5 rounded bg-surface-container text-[10px] font-medium text-on-surface"
                    >
                      {cond}
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              {patient.allergies.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-error font-semibold">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  <span>Allergies: {patient.allergies.join(', ')}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenChart(patient.id)}
                className="w-full h-8 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                <span>Open 360 Chart &amp; Encounter</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      <RegisterPatientModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
