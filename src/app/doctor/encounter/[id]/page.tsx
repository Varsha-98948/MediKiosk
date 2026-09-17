'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function DoctorEncounterPage() {
  const params = useParams();
  const patientId = params?.id as string;
  const {
    activePatient,
    currentStep,
    selectPatient,
  } = useClinicalEncounter();

  useEffect(() => {
    if (patientId && (!activePatient || activePatient.id !== patientId)) {
      selectPatient(patientId);
    }
  }, [patientId, activePatient, selectPatient]);

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
      {activePatient ? (
        <>
          <PatientBanner />
          <EncounterStepNavigator />
          {renderCurrentTab()}
        </>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high/60 p-8 text-center text-on-surface-variant">
          <p>Loading patient encounter #{patientId}...</p>
        </div>
      )}
    </div>
  );
}
