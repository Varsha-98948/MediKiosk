'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Patient,
  QueueItem,
  VitalSigns,
  ChiefComplaint,
  ClinicalNotes,
  Diagnosis,
  PrescriptionItem,
  LabOrder,
  DirectiveItem,
  FollowUpData,
  SafetyAlert,
} from '@/types/emr';
import { initialQueue } from '@/data/doctor/initialQueue';
import { mockPatients } from '@/data/doctor/mockPatients';
import { availableLabTests, defaultDirectives } from '@/data/doctor/diagnosticPanels';
import { SupportedLanguage, defaultPrescriptionDescriptions } from '@/data/doctor/translations';

export type EncounterStepKey =
  | 'profile'
  | 'vitals'
  | 'complaints'
  | 'notes'
  | 'diagnoses'
  | 'rx'
  | 'safety'
  | 'orders'
  | 'directives'
  | 'followup';

interface ClinicalEncounterContextType {
  queue: QueueItem[];
  activePatient: Patient | null;
  activeEncounterId: string | null;
  consultationStatus: 'waiting' | 'in_progress' | 'completed';
  currentStep: EncounterStepKey;
  stepIndex: number;
  vitals: VitalSigns;
  complaints: ChiefComplaint[];
  clinicalNotes: ClinicalNotes;
  diagnoses: Diagnosis[];
  prescriptions: PrescriptionItem[];
  homeMeds: PrescriptionItem[];
  labOrders: LabOrder[];
  directives: DirectiveItem[];
  followUp: FollowUpData;
  safetyAlerts: SafetyAlert[];
  isA4ModalOpen: boolean;
  rxLanguage: SupportedLanguage;
  prescriptionDescriptions: Record<SupportedLanguage, string>;
  isLoading: boolean;
  error: string | null;

  // Actions
  selectPatient: (id: string) => void;
  callNextPatient: () => void;
  refreshQueue: () => Promise<void>;
  setCurrentStep: (step: EncounterStepKey) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  updateVitals: (partial: Partial<VitalSigns>) => void;
  addComplaint: (c: Omit<ChiefComplaint, 'id'>) => void;
  removeComplaint: (id: string) => void;
  updateClinicalNotes: (partial: Partial<ClinicalNotes>) => void;
  addDiagnosis: (d: Diagnosis) => void;
  removeDiagnosis: (code: string) => void;
  addPrescription: (item: Omit<PrescriptionItem, 'id'>) => void;
  updatePrescription: (id: string, updates: Partial<PrescriptionItem>) => void;
  removePrescription: (id: string) => void;
  addLabOrder: (order: LabOrder) => void;
  removeLabOrder: (id: string) => void;
  toggleDirective: (id: string) => void;
  updateFollowUp: (partial: Partial<FollowUpData>) => void;
  acknowledgeAlert: (id: string) => void;
  setIsA4ModalOpen: (open: boolean) => void;
  setRxLanguage: (lang: SupportedLanguage) => void;
  updatePrescriptionDescription: (lang: SupportedLanguage, text: string) => void;
  resetPrescriptionDescription: (lang?: SupportedLanguage) => void;
  completeConsultation: () => Promise<void>;
}

const stepsList: EncounterStepKey[] = [
  'profile',
  'vitals',
  'complaints',
  'notes',
  'diagnoses',
  'rx',
  'safety',
  'orders',
  'directives',
  'followup',
];

const initialVitals: VitalSigns = {
  systolic: 142,
  diastolic: 88,
  pulse: 78,
  spo2: 98,
  temp: 98.4,
  respiratoryRate: 18,
  bloodSugarFasting: 186,
  bloodSugarPostprandial: 248,
  height: 170,
  weight: 78.4,
  bmi: 27.1,
  bmiCategory: 'Overweight',
  previousBp: '138/84',
  previousWeight: 76.5,
  bpTrendDelta: '+4 mmHg (Stage 1 HTN)',
  weightTrendDelta: '+1.9 kg since May',
};

const initialComplaints: ChiefComplaint[] = [
  {
    id: 'comp-1',
    complaint: 'Increased frequency of urination (Polyuria)',
    duration: '3 Weeks',
    severity: 'Moderate',
    onset: 'Gradual',
    notes: 'Wakes up 3-4 times at night to urinate. Mild nocturia noted.',
  },
];

const initialClinicalNotes: ClinicalNotes = {
  hpi: '58-year-old male presenting with progressive polyuria and fatigue over the past 3 weeks. Fasting sugars averaging 180–195 mg/dL.',
  generalExam: 'Conscious, oriented, no pedal edema, no pallor/icterus.',
  cvs: 'S1 S2 heard. No murmurs.',
  respiratory: 'Bilateral vesicular breath sounds.',
  abdomen: 'Soft, non-tender.',
  cns: 'Intact, mild loss of vibration sense in bilateral great toes.',
  doctorImpressions: 'Uncontrolled Type 2 Diabetes Mellitus with sub-optimal glycemic control and Essential Hypertension Stage 1.',
};

const initialDiagnoses: Diagnosis[] = [
  {
    code: 'E11.9',
    description: 'Type 2 diabetes mellitus without complications (Uncontrolled glycemic profile)',
    type: 'Primary',
    status: 'Active',
    onsetDate: 'Jan 2021',
  },
  {
    code: 'I10',
    description: 'Essential (primary) hypertension',
    type: 'Secondary',
    status: 'Chronic',
    onsetDate: 'Aug 2019',
  },
];

const initialPrescriptions: PrescriptionItem[] = [
  {
    id: 'rx-1',
    drugName: 'Tab. Glycomet SR (Metformin)',
    genericName: 'Metformin Hydrochloride Prolonged Release',
    form: 'Tab',
    strength: '500 mg',
    dosageSchedule: '1-0-1',
    timing: 'After Food',
    frequency: 'Twice Daily',
    duration: '30 Days',
    instructions: 'Take immediately after principal meals.',
    diffStatus: 'CONTINUED',
  },
  {
    id: 'rx-2',
    drugName: 'Tab. Amaryl (Glimepiride)',
    genericName: 'Glimepiride',
    form: 'Tab',
    strength: '2 mg',
    dosageSchedule: '1-0-0',
    timing: 'Before Food',
    frequency: 'Daily',
    duration: '30 Days',
    instructions: 'Titrated up from 1mg to 2mg due to FBS > 180 mg/dL.',
    diffStatus: 'DOSE_CHANGED',
    originalDose: '1 mg (1-0-0)',
  },
];

const initialFollowUp: FollowUpData = {
  interval: '2 Weeks',
  date: '2026-09-21',
  slot: '10:30 AM - Morning Slot 3',
  clinicalObjective: 'Review fasting/PPBS glycemic response and SGLT-2 tolerability',
  sendSms: true,
  sendWhatsApp: true,
};

const ClinicalEncounterContext = createContext<ClinicalEncounterContextType | null>(null);

export function ClinicalEncounterProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [activeEncounterId, setActiveEncounterId] = useState<string | null>(null);
  const [consultationStatus, setConsultationStatus] = useState<'waiting' | 'in_progress' | 'completed'>('in_progress');
  const [currentStep, setCurrentStep] = useState<EncounterStepKey>('profile');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [vitals, setVitals] = useState<VitalSigns>(initialVitals);
  const [complaints, setComplaints] = useState<ChiefComplaint[]>(initialComplaints);
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNotes>(initialClinicalNotes);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(initialDiagnoses);
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>(initialPrescriptions);
  const [homeMeds] = useState<PrescriptionItem[]>([]);
  const [labOrders, setLabOrders] = useState<LabOrder[]>([
    availableLabTests[0], // HbA1c
    availableLabTests[1], // FBS & PPBS
  ]);
  const [directives, setDirectives] = useState<DirectiveItem[]>(defaultDirectives);
  const [followUp, setFollowUp] = useState<FollowUpData>(initialFollowUp);
  const [acknowledgedAlertIds, setAcknowledgedAlertIds] = useState<string[]>([]);
  const [isA4ModalOpen, setIsA4ModalOpen] = useState<boolean>(false);
  const [rxLanguage, setRxLanguage] = useState<SupportedLanguage>('en');
  const [prescriptionDescriptions, setPrescriptionDescriptions] = useState<Record<SupportedLanguage, string>>(defaultPrescriptionDescriptions);

  const isInitialMount = useRef(true);

  // Fetch real OPD queue from API
  const refreshQueue = useCallback(async () => {
    try {
      const res = await fetch('/api/queue/active');
      const data = await res.json();
      if (res.ok && data.queue) {
        setQueue(data.queue);
        // If no active patient is selected and there's a serving or waiting patient, auto-select first
        if (!activePatient && isInitialMount.current && data.queue.length > 0) {
          isInitialMount.current = false;
          selectPatient(data.queue[0].id);
        }
      }
    } catch (err: any) {
      console.error('Error fetching queue:', err);
    }
  }, [activePatient]);

  // Initial load + Real-time SSE listener with 5s polling fallback
  useEffect(() => {
    refreshQueue();

    let eventSource: EventSource | null = null;
    let fallbackInterval: NodeJS.Timeout | null = null;

    try {
      eventSource = new EventSource('/api/queue/stream');

      eventSource.addEventListener('queue_update', (event) => {
        refreshQueue();
      });

      eventSource.onerror = () => {
        // SSE disconnected, fallback to 5s polling
        if (!fallbackInterval) {
          fallbackInterval = setInterval(refreshQueue, 5000);
        }
      };
    } catch (e) {
      fallbackInterval = setInterval(refreshQueue, 5000);
    }

    return () => {
      if (eventSource) eventSource.close();
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [refreshQueue]);

  const selectPatient = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Call patient on queue
      fetch(`/api/queue/tokens/${id}/call`, { method: 'POST' }).catch(() => {});

      // 2. Fetch full encounter from DB
      const res = await fetch(`/api/encounters/${id}`);
      const data = await res.json();

      if (res.ok && data.encounter) {
        const enc = data.encounter;
        setActiveEncounterId(enc.id);
        setActivePatient({
          id: enc.patient.id,
          mrn: enc.patient.mrn,
          name: enc.patient.name,
          age: enc.patient.age,
          gender: enc.patient.gender,
          phone: enc.patient.phone,
          bloodGroup: enc.patient.bloodGroup || 'O Positive',
          allergies: enc.patient.allergies || [],
          chronicConditions: enc.patient.chronicConditions || [],
          registrationDate: enc.patient.registrationDate || new Date().toISOString().split('T')[0],
        });

        setConsultationStatus(enc.status === 'completed' ? 'completed' : 'in_progress');

        if (enc.vitals) {
          setVitals({
            systolic: enc.vitals.systolic || 120,
            diastolic: enc.vitals.diastolic || 80,
            pulse: enc.vitals.pulse || 72,
            spo2: enc.vitals.spo2 || 98,
            temp: enc.vitals.temp || 98.4,
            respiratoryRate: enc.vitals.respiratoryRate || 18,
            bloodSugarFasting: enc.vitals.bloodSugarFasting || 110,
            bloodSugarPostprandial: enc.vitals.bloodSugarPostprandial || 140,
            height: enc.vitals.height || 170,
            weight: enc.vitals.weight || 70,
            bmi: enc.vitals.bmi || 24.2,
            bmiCategory: enc.vitals.bmiCategory || 'Normal',
          });
        }

        if (enc.clinicalNotes) {
          setClinicalNotes({
            hpi: enc.clinicalNotes.hpi || '',
            generalExam: enc.clinicalNotes.generalExam || '',
            cvs: enc.clinicalNotes.cvs || '',
            respiratory: enc.clinicalNotes.respiratory || '',
            abdomen: enc.clinicalNotes.abdomen || '',
            cns: enc.clinicalNotes.cns || '',
            doctorImpressions: enc.clinicalNotes.doctorImpressions || '',
          });
        }

        if (enc.diagnoses && enc.diagnoses.length > 0) {
          setDiagnoses(enc.diagnoses);
        } else {
          setDiagnoses([]);
        }

        if (enc.prescription?.items && enc.prescription.items.length > 0) {
          setPrescriptions(enc.prescription.items);
        } else {
          setPrescriptions([]);
        }

        if (enc.intakeSummary?.chiefComplaint) {
          setComplaints([
            {
              id: `comp-${Date.now()}`,
              complaint: enc.intakeSummary.chiefComplaint,
              duration: enc.intakeSummary.duration || 'Recently noted',
              severity: (enc.intakeSummary.painScore >= 8 ? 'Severe' : enc.intakeSummary.painScore >= 5 ? 'Moderate' : 'Mild') as any,
              onset: 'Gradual',
              notes: enc.intakeSummary.painType ? `Character: ${enc.intakeSummary.painType}` : undefined,
            },
          ]);
        }
      } else {
        // Fallback to in-memory mock if API errored
        const found = mockPatients.find((p) => p.id === id) || mockPatients[0];
        setActivePatient(found);
      }
    } catch (err: any) {
      console.error('Error selecting patient:', err);
      const found = mockPatients.find((p) => p.id === id) || mockPatients[0];
      setActivePatient(found);
    } finally {
      setIsLoading(false);
      setCurrentStep('profile');
    }
  }, []);

  const callNextPatient = useCallback(() => {
    const nextWaiting = queue.find((q) => q.status === 'waiting');
    if (nextWaiting) {
      selectPatient(nextWaiting.id);
    }
  }, [queue, selectPatient]);

  const updatePrescriptionDescription = useCallback((lang: SupportedLanguage, text: string) => {
    setPrescriptionDescriptions((prev) => ({ ...prev, [lang]: text }));
  }, []);

  const resetPrescriptionDescription = useCallback((lang?: SupportedLanguage) => {
    if (lang) {
      setPrescriptionDescriptions((prev) => ({ ...prev, [lang]: defaultPrescriptionDescriptions[lang] }));
    } else {
      setPrescriptionDescriptions(defaultPrescriptionDescriptions);
    }
  }, []);

  const stepIndex = useMemo(() => stepsList.indexOf(currentStep), [currentStep]);

  // Real-time Drug Safety Engine
  const safetyAlerts = useMemo<SafetyAlert[]>(() => {
    const alerts: SafetyAlert[] = [];

    // Check Penicillin Allergy
    const hasPenicillinRx = prescriptions.some((p) =>
      p.drugName.toLowerCase().includes('augmentin') ||
      p.genericName?.toLowerCase().includes('amoxicillin') ||
      p.drugName.toLowerCase().includes('penicillin')
    );
    const hasPenicillinAllergy = activePatient?.allergies.some((a) =>
      a.toLowerCase().includes('penicillin')
    );

    if (hasPenicillinRx && hasPenicillinAllergy) {
      alerts.push({
        id: 'alert-penicillin',
        type: 'allergy',
        severity: 'critical',
        title: 'CRITICAL ALLERGY CONTRAINDICATION: Penicillin Class',
        description: `Patient ${activePatient?.name} has a recorded allergy to Penicillin.`,
        acknowledged: acknowledgedAlertIds.includes('alert-penicillin'),
      });
    }

    return alerts;
  }, [prescriptions, activePatient, acknowledgedAlertIds]);

  const goToNextStep = useCallback(() => {
    const currentIndex = stepsList.indexOf(currentStep);
    if (currentIndex < stepsList.length - 1) {
      setCurrentStep(stepsList[currentIndex + 1]);
    } else {
      setIsA4ModalOpen(true);
    }
  }, [currentStep]);

  const goToPrevStep = useCallback(() => {
    const currentIndex = stepsList.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepsList[currentIndex - 1]);
    }
  }, [currentStep]);

  // Database-backed Autosave Mutations
  const updateVitals = useCallback((partial: Partial<VitalSigns>) => {
    setVitals((prev) => {
      const updated = { ...prev, ...partial };
      if (partial.height !== undefined || partial.weight !== undefined) {
        const hInMeters = updated.height / 100;
        if (hInMeters > 0) {
          const rawBmi = updated.weight / (hInMeters * hInMeters);
          updated.bmi = parseFloat(rawBmi.toFixed(1));
          if (updated.bmi < 18.5) updated.bmiCategory = 'Underweight';
          else if (updated.bmi < 25) updated.bmiCategory = 'Normal';
          else if (updated.bmi < 30) updated.bmiCategory = 'Overweight';
          else updated.bmiCategory = 'Obese';
        }
      }

      // Persist to DB if encounter exists
      if (activeEncounterId) {
        fetch(`/api/encounters/${activeEncounterId}/vitals`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        }).catch((e) => console.error('Error saving vitals:', e));
      }

      return updated;
    });
  }, [activeEncounterId]);

  const addComplaint = useCallback((c: Omit<ChiefComplaint, 'id'>) => {
    const newComplaint: ChiefComplaint = { ...c, id: `comp-${Date.now()}` };
    setComplaints((prev) => [...prev, newComplaint]);
  }, []);

  const removeComplaint = useCallback((id: string) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateClinicalNotes = useCallback((partial: Partial<ClinicalNotes>) => {
    setClinicalNotes((prev) => {
      const updated = { ...prev, ...partial };
      if (activeEncounterId) {
        fetch(`/api/encounters/${activeEncounterId}/notes`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        }).catch((e) => console.error('Error saving notes:', e));
      }
      return updated;
    });
  }, [activeEncounterId]);

  const addDiagnosis = useCallback((d: Diagnosis) => {
    setDiagnoses((prev) => {
      if (prev.some((item) => item.code === d.code)) return prev;
      const updated = [...prev, d];
      if (activeEncounterId) {
        fetch(`/api/encounters/${activeEncounterId}/diagnoses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ diagnoses: updated }),
        }).catch((e) => console.error('Error saving diagnoses:', e));
      }
      return updated;
    });
  }, [activeEncounterId]);

  const removeDiagnosis = useCallback((code: string) => {
    setDiagnoses((prev) => {
      const updated = prev.filter((d) => d.code !== code);
      if (activeEncounterId) {
        fetch(`/api/encounters/${activeEncounterId}/diagnoses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ diagnoses: updated }),
        }).catch((e) => console.error('Error removing diagnosis:', e));
      }
      return updated;
    });
  }, [activeEncounterId]);

  const addPrescription = useCallback((item: Omit<PrescriptionItem, 'id'>) => {
    const newItem: PrescriptionItem = { ...item, id: `rx-${Date.now()}` };
    setPrescriptions((prev) => {
      const updated = [...prev, newItem];
      if (activeEncounterId) {
        fetch(`/api/encounters/${activeEncounterId}/prescriptions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: updated, rxLanguage }),
        }).catch((e) => console.error('Error saving prescription:', e));
      }
      return updated;
    });
  }, [activeEncounterId, rxLanguage]);

  const updatePrescription = useCallback((id: string, updates: Partial<PrescriptionItem>) => {
    setPrescriptions((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      if (activeEncounterId) {
        fetch(`/api/encounters/${activeEncounterId}/prescriptions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: updated, rxLanguage }),
        }).catch((e) => console.error('Error updating prescription:', e));
      }
      return updated;
    });
  }, [activeEncounterId, rxLanguage]);

  const removePrescription = useCallback((id: string) => {
    setPrescriptions((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      if (activeEncounterId) {
        fetch(`/api/encounters/${activeEncounterId}/prescriptions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: updated, rxLanguage }),
        }).catch((e) => console.error('Error removing prescription:', e));
      }
      return updated;
    });
  }, [activeEncounterId, rxLanguage]);

  const addLabOrder = useCallback((order: LabOrder) => {
    setLabOrders((prev) => {
      if (prev.some((o) => o.id === order.id || o.testName === order.testName)) return prev;
      return [...prev, order];
    });
  }, []);

  const removeLabOrder = useCallback((id: string) => {
    setLabOrders((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const toggleDirective = useCallback((id: string) => {
    setDirectives((prev) => prev.map((d) => (d.id === id ? { ...d, selected: !d.selected } : d)));
  }, []);

  const updateFollowUp = useCallback((partial: Partial<FollowUpData>) => {
    setFollowUp((prev) => ({ ...prev, ...partial }));
  }, []);

  const acknowledgeAlert = useCallback((id: string) => {
    setAcknowledgedAlertIds((prev) => [...prev, id]);
  }, []);

  const completeConsultation = useCallback(async () => {
    if (activeEncounterId) {
      try {
        await fetch(`/api/encounters/${activeEncounterId}/finalize`, {
          method: 'POST',
        });
      } catch (e) {
        console.error('Error finalizing encounter:', e);
      }
    }

    setConsultationStatus('completed');
    setIsA4ModalOpen(false);
    refreshQueue();
  }, [activeEncounterId, refreshQueue]);

  return (
    <ClinicalEncounterContext.Provider
      value={{
        queue,
        activePatient,
        activeEncounterId,
        consultationStatus,
        currentStep,
        stepIndex,
        vitals,
        complaints,
        clinicalNotes,
        diagnoses,
        prescriptions,
        homeMeds,
        labOrders,
        directives,
        followUp,
        safetyAlerts,
        isA4ModalOpen,
        rxLanguage,
        prescriptionDescriptions,
        isLoading,
        error,
        selectPatient,
        callNextPatient,
        refreshQueue,
        setCurrentStep,
        goToNextStep,
        goToPrevStep,
        updateVitals,
        addComplaint,
        removeComplaint,
        updateClinicalNotes,
        addDiagnosis,
        removeDiagnosis,
        addPrescription,
        updatePrescription,
        removePrescription,
        addLabOrder,
        removeLabOrder,
        toggleDirective,
        updateFollowUp,
        acknowledgeAlert,
        setIsA4ModalOpen,
        setRxLanguage,
        updatePrescriptionDescription,
        resetPrescriptionDescription,
        completeConsultation,
      }}
    >
      {children}
    </ClinicalEncounterContext.Provider>
  );
}

export function useClinicalEncounter() {
  const context = useContext(ClinicalEncounterContext);
  if (!context) {
    throw new Error('useClinicalEncounter must be used within ClinicalEncounterProvider');
  }
  return context;
}
