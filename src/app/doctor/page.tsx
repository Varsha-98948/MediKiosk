'use client';

import React, { useState } from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import { PatientBanner } from '@/components/doctor/layout/PatientBanner';
import { EncounterStepNavigator } from '@/components/doctor/encounter/EncounterStepNavigator';
import { PatientProfileTab } from '@/components/doctor/encounter/PatientProfileTab';
import { VitalsStationTab } from '@/components/doctor/encounter/VitalsStationTab';
import { ChiefComplaintsTab } from '@/components/doctor/encounter/ChiefComplaintsTab';
import { ClinicalNotesTab } from '@/components/doctor/encounter/ClinicalNotesTab';
import { DiagnosesTab } from '@/components/doctor/encounter/DiagnosesTab';
import { RxBuilderTab } from '@/components/doctor/encounter/RxBuilderTab';
import { MedSafetyTab } from '@/components/doctor/encounter/MedSafetyTab';
import { LabOrdersTab } from '@/components/doctor/encounter/LabOrdersTab';
import { DirectivesTab } from '@/components/doctor/encounter/DirectivesTab';
import { FollowUpTab } from '@/components/doctor/encounter/FollowUpTab';
import { A4PrescriptionModal } from '@/components/doctor/encounter/A4PrescriptionModal';
import { RegisterPatientModal } from '@/components/doctor/queue/RegisterPatientModal';

export default function DoctorPage() {
  const {
    queue,
    activePatient,
    currentStep,
    selectPatient,
  } = useClinicalEncounter();

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const renderCurrentTab = () => {
    switch (currentStep) {
      case 'profile':     return <PatientProfileTab />;
      case 'vitals':      return <VitalsStationTab />;
      case 'complaints':  return <ChiefComplaintsTab />;
      case 'notes':       return <ClinicalNotesTab />;
      case 'diagnoses':   return <DiagnosesTab />;
      case 'rx':          return <RxBuilderTab />;
      case 'safety':      return <MedSafetyTab />;
      case 'orders':      return <LabOrdersTab />;
      case 'directives':  return <DirectivesTab />;
      case 'followup':    return <FollowUpTab />;
      default:            return <PatientProfileTab />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* OPD Queue Panel */}
      {!activePatient && (
        <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high/60 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-on-surface">OPD Queue Desk</h1>
              <p className="text-[12px] text-on-surface-variant">Select a patient to begin their encounter</p>
            </div>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="h-9 px-4 rounded-lg bg-primary text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-xs hover:bg-primary-container"
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>Register Patient</span>
            </button>
          </div>

          <div className="space-y-2">
            {queue.map((item) => (
              <div
                key={item.id}
                onClick={() => selectPatient(item.id)}
                className="p-4 rounded-xl border border-surface-container-high/60 bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono text-white shrink-0 ${
                    item.triage === 'Urgent' ? 'bg-error' : item.triage === 'Priority' ? 'bg-amber-600' : 'bg-primary'
                  }`}>
                    <span className="text-[9px] uppercase font-bold opacity-80">Token</span>
                    <span className="text-sm font-bold">{item.tokenNumber}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[14px] text-on-surface">{item.patientName}</h3>
                    <p className="text-[11px] text-on-surface-variant">{item.chiefComplaint}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    item.triage === 'Urgent' ? 'bg-error-container text-error' :
                    item.triage === 'Priority' ? 'bg-amber-100 text-amber-900' :
                    'bg-primary/10 text-primary'
                  }`}>{item.triage}</span>
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Encounter View */}
      {activePatient && (
        <div className="flex flex-col gap-4">
          <PatientBanner />
          <EncounterStepNavigator />
          {renderCurrentTab()}
        </div>
      )}

      {/* Register Patient Modal */}
      <RegisterPatientModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}
