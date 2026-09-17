'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import { PatientBanner } from '@/components/layout/PatientBanner';
import { EncounterStepNavigator } from '@/components/encounter/EncounterStepNavigator';

import { PatientProfileTab } from '@/components/encounter/PatientProfileTab';
import { VitalsStationTab } from '@/components/encounter/VitalsStationTab';
import { ChiefComplaintsTab } from '@/components/encounter/ChiefComplaintsTab';
import { ClinicalNotesTab } from '@/components/encounter/ClinicalNotesTab';
import { DiagnosesTab } from '@/components/encounter/DiagnosesTab';
import { RxBuilderTab } from '@/components/encounter/RxBuilderTab';
import { MedSafetyTab } from '@/components/encounter/MedSafetyTab';
import { LabOrdersTab } from '@/components/encounter/LabOrdersTab';
import { DirectivesTab } from '@/components/encounter/DirectivesTab';
import { FollowUpTab } from '@/components/encounter/FollowUpTab';

export default function PatientEncounterPage() {
  const params = useParams();
  const { activePatient, selectPatient, currentStep } = useClinicalEncounter();

  const patientId = (params?.id as string) || 'p-90284';

  useEffect(() => {
    if (patientId && activePatient?.id !== patientId) {
      selectPatient(patientId);
    }
  }, [patientId, activePatient, selectPatient]);

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Sticky Patient Context Banner */}
      <PatientBanner />

      {/* Horizontal Consultation Stepper */}
      <EncounterStepNavigator />

      {/* Dynamic Step View Content */}
      <div className="w-full">
        {currentStep === 'profile' && <PatientProfileTab />}
        {currentStep === 'vitals' && <VitalsStationTab />}
        {currentStep === 'complaints' && <ChiefComplaintsTab />}
        {currentStep === 'notes' && <ClinicalNotesTab />}
        {currentStep === 'diagnoses' && <DiagnosesTab />}
        {currentStep === 'rx' && <RxBuilderTab />}
        {currentStep === 'safety' && <MedSafetyTab />}
        {currentStep === 'orders' && <LabOrdersTab />}
        {currentStep === 'directives' && <DirectivesTab />}
        {currentStep === 'followup' && <FollowUpTab />}
      </div>
    </div>
  );
}
