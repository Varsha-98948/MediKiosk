'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
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
import { initialQueue } from '@/data/initialQueue';
import { mockPatients } from '@/data/mockPatients';
import { availableLabTests, defaultDirectives } from '@/data/diagnosticPanels';
import { SupportedLanguage, defaultPrescriptionDescriptions } from '@/data/translations';

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

  // Actions
  selectPatient: (id: string) => void;
  callNextPatient: () => void;
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
  completeConsultation: () => void;
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
  {
    id: 'comp-2',
    complaint: 'General fatigue & early morning lethargy',
    duration: '1 Month',
    severity: 'Moderate',
    onset: 'Gradual',
    notes: 'Struggles with afternoon fatigue despite adequate sleep.',
  },
];

const initialClinicalNotes: ClinicalNotes = {
  hpi: '58-year-old male with long-standing Type 2 DM (12 years) presenting with progressive polyuria and fatigue over the past 3 weeks. Home glucometer readings show elevated fasting sugars averaging 180–195 mg/dL. Denies fever, chest pain, or dysuria. Adherence to diet has lapsed over past month.',
  generalExam: 'Alert, oriented, moderately built. No pallor, icterus, cyanosis, clubbing, or pedaloedema. Bilateral carotid pulses normal.',
  cvs: 'S1 S2 heard. No murmurs. Heart rate regular at 78 bpm.',
  respiratory: 'Bilateral vesicular breath sounds. Chest clear without wheeze or crackles.',
  abdomen: 'Soft, non-tender, no organomegaly. Normal bowel sounds present.',
  cns: 'Higher mental functions intact. Decreased vibration perception threshold (18V) in bilateral great toes. Bilateral ankle jerks diminished.',
  doctorImpressions: 'Uncontrolled Type 2 Diabetes Mellitus with sub-optimal glycemic control and early diabetic sensory neuropathy. Essential Hypertension Stage 1.',
};

const initialDiagnoses: Diagnosis[] = [
  {
    code: 'E11.9',
    description: 'Type 2 diabetes mellitus without complications',
    type: 'Primary',
    status: 'Chronic',
    onsetDate: 'May 2014',
  },
  {
    code: 'I10',
    description: 'Essential (primary) hypertension',
    type: 'Secondary',
    status: 'Chronic',
    onsetDate: 'Aug 2019',
  },
  {
    code: 'E11.40',
    description: 'Type 2 diabetes mellitus with diabetic neuropathy, unspecified',
    type: 'Secondary',
    status: 'Active',
    onsetDate: 'Sep 2026',
  },
];

const initialHomeMeds: PrescriptionItem[] = [
  {
    id: 'home-1',
    drugName: 'Tab. Glycomet SR',
    genericName: 'Metformin Hydrochloride Prolonged Release',
    form: 'Tab',
    strength: '500 mg',
    dosageSchedule: '1-0-1',
    timing: 'After Food',
    frequency: 'Twice Daily',
    duration: 'Continuous',
    instructions: 'Take after breakfast and dinner.',
    diffStatus: 'CONTINUED',
  },
  {
    id: 'home-2',
    drugName: 'Tab. Amaryl',
    genericName: 'Glimepiride',
    form: 'Tab',
    strength: '1 mg',
    dosageSchedule: '1-0-0',
    timing: 'Before Food',
    frequency: 'Daily',
    duration: 'Continuous',
    instructions: 'Take 15 mins before breakfast.',
    diffStatus: 'DOSE_CHANGED',
  },
  {
    id: 'home-3',
    drugName: 'Tab. Telma',
    genericName: 'Telmisartan',
    form: 'Tab',
    strength: '40 mg',
    dosageSchedule: '0-0-1',
    timing: 'After Food',
    frequency: 'Daily',
    duration: 'Continuous',
    instructions: 'Take at bedtime.',
    diffStatus: 'CONTINUED',
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
  {
    id: 'rx-3',
    drugName: 'Tab. Jardiance (Empagliflozin)',
    genericName: 'Empagliflozin',
    form: 'Tab',
    strength: '10 mg',
    dosageSchedule: '1-0-0',
    timing: 'Before Food',
    frequency: 'Daily',
    duration: '30 Days',
    instructions: 'Drink minimum 2.5L water daily. Excellent cardio-renal protection.',
    diffStatus: 'NEW',
  },
  {
    id: 'rx-4',
    drugName: 'Tab. Telma (Telmisartan)',
    genericName: 'Telmisartan',
    form: 'Tab',
    strength: '40 mg',
    dosageSchedule: '0-0-1',
    timing: 'After Food',
    frequency: 'Daily',
    duration: '30 Days',
    instructions: 'Continue regular nightly dosing for BP control.',
    diffStatus: 'CONTINUED',
  },
  {
    id: 'rx-5',
    drugName: 'Cap. Rejunex CD3',
    genericName: 'Methylcobalamin + Alpha Lipoic Acid',
    form: 'Cap',
    strength: '1500 mcg',
    dosageSchedule: '0-0-1',
    timing: 'After Food',
    frequency: 'Daily',
    duration: '30 Days',
    instructions: 'For diabetic peripheral burning sensation and nerve health.',
    diffStatus: 'NEW',
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
  const [activePatient, setActivePatient] = useState<Patient | null>(mockPatients[0]); // Ramesh Chandra
  const [consultationStatus, setConsultationStatus] = useState<'waiting' | 'in_progress' | 'completed'>('in_progress');
  const [currentStep, setCurrentStep] = useState<EncounterStepKey>('profile');

  const [vitals, setVitals] = useState<VitalSigns>(initialVitals);
  const [complaints, setComplaints] = useState<ChiefComplaint[]>(initialComplaints);
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNotes>(initialClinicalNotes);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(initialDiagnoses);
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>(initialPrescriptions);
  const [homeMeds] = useState<PrescriptionItem[]>(initialHomeMeds);
  const [labOrders, setLabOrders] = useState<LabOrder[]>([
    availableLabTests[0], // HbA1c
    availableLabTests[1], // FBS & PPBS
    availableLabTests[3], // RFT
    availableLabTests[4], // uACR
  ]);
  const [directives, setDirectives] = useState<DirectiveItem[]>(defaultDirectives);
  const [followUp, setFollowUp] = useState<FollowUpData>(initialFollowUp);
  const [acknowledgedAlertIds, setAcknowledgedAlertIds] = useState<string[]>([]);
  const [isA4ModalOpen, setIsA4ModalOpen] = useState<boolean>(false);
  const [rxLanguage, setRxLanguage] = useState<SupportedLanguage>('en');
  const [prescriptionDescriptions, setPrescriptionDescriptions] = useState<Record<SupportedLanguage, string>>(defaultPrescriptionDescriptions);

  const updatePrescriptionDescription = useCallback((lang: SupportedLanguage, text: string) => {
    setPrescriptionDescriptions((prev) => ({
      ...prev,
      [lang]: text,
    }));
  }, []);

  const resetPrescriptionDescription = useCallback((lang?: SupportedLanguage) => {
    if (lang) {
      setPrescriptionDescriptions((prev) => ({
        ...prev,
        [lang]: defaultPrescriptionDescriptions[lang],
      }));
    } else {
      setPrescriptionDescriptions(defaultPrescriptionDescriptions);
    }
  }, []);

  const stepIndex = useMemo(() => stepsList.indexOf(currentStep), [currentStep]);

  // Real-time Drug Safety Engine
  const safetyAlerts = useMemo<SafetyAlert[]>(() => {
    const alerts: SafetyAlert[] = [];

    // 1. Check for Penicillin Allergy
    const hasPenicillinRx = prescriptions.some((p) =>
      p.drugName.toLowerCase().includes('augmentin') ||
      p.genericName.toLowerCase().includes('amoxicillin') ||
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
        description: `Patient ${activePatient?.name} has a recorded life-threatening allergy to Penicillin. Augmentin / Amoxicillin should be discontinued immediately.`,
        acknowledged: acknowledgedAlertIds.includes('alert-penicillin'),
      });
    }

    // 2. Check for SGLT2 + Hypoglycemia Risk
    const hasSGLT2 = prescriptions.some((p) => p.drugName.toLowerCase().includes('jardiance') || p.genericName.toLowerCase().includes('empagliflozin'));
    const hasSU = prescriptions.some((p) => p.drugName.toLowerCase().includes('amaryl') || p.genericName.toLowerCase().includes('glimepiride'));

    if (hasSGLT2 && hasSU) {
      alerts.push({
        id: 'alert-hypo-risk',
        type: 'interaction',
        severity: 'moderate',
        title: 'Increased Hypoglycemia Risk: Glimepiride + Empagliflozin',
        description: 'Combination of Sulfonylurea with SGLT2 inhibitor increases hypoglycemia frequency. Educate patient on early signs and glucose candy protocol.',
        acknowledged: acknowledgedAlertIds.includes('alert-hypo-risk'),
      });
    }

    // 3. Check for Dual ARB/ACEi or high BP combo
    const hasARB = prescriptions.some((p) => p.drugName.toLowerCase().includes('telma') || p.genericName.toLowerCase().includes('telmisartan'));
    if (hasARB && vitals.systolic > 140) {
      alerts.push({
        id: 'alert-bp-titrate',
        type: 'dosage',
        severity: 'low',
        title: 'Sub-target Blood Pressure: 142/88 mmHg',
        description: 'Current BP exceeds standard diabetic target (<130/80 mmHg). Consider titrating Telmisartan to 80mg or adding Amlodipine 5mg on review.',
        acknowledged: acknowledgedAlertIds.includes('alert-bp-titrate'),
      });
    }

    return alerts;
  }, [prescriptions, activePatient, vitals.systolic, acknowledgedAlertIds]);

  const selectPatient = useCallback((id: string) => {
    const found = mockPatients.find((p) => p.id === id) || {
      id,
      mrn: `UHID-${id}`,
      name: 'Selected Patient',
      age: 45,
      gender: 'Male' as const,
      phone: '+91 98000 00000',
      bloodGroup: 'O Positive',
      allergies: [],
      chronicConditions: [],
      registrationDate: '2026-01-01',
    };
    setActivePatient(found);
    setConsultationStatus('in_progress');
    setCurrentStep('profile');

    // Update queue status
    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: 'in_progress' } : q))
    );
  }, []);

  const callNextPatient = useCallback(() => {
    const nextWaiting = queue.find((q) => q.status === 'waiting');
    if (nextWaiting) {
      selectPatient(nextWaiting.id);
    }
  }, [queue, selectPatient]);

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

  const updateVitals = useCallback((partial: Partial<VitalSigns>) => {
    setVitals((prev) => {
      const updated = { ...prev, ...partial };
      // Auto-recalculate BMI if height or weight changed
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
      return updated;
    });
  }, []);

  const addComplaint = useCallback((c: Omit<ChiefComplaint, 'id'>) => {
    const newComplaint: ChiefComplaint = {
      ...c,
      id: `comp-${Date.now()}`,
    };
    setComplaints((prev) => [...prev, newComplaint]);
  }, []);

  const removeComplaint = useCallback((id: string) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateClinicalNotes = useCallback((partial: Partial<ClinicalNotes>) => {
    setClinicalNotes((prev) => ({ ...prev, ...partial }));
  }, []);

  const addDiagnosis = useCallback((d: Diagnosis) => {
    setDiagnoses((prev) => {
      if (prev.some((item) => item.code === d.code)) return prev;
      return [...prev, d];
    });
  }, []);

  const removeDiagnosis = useCallback((code: string) => {
    setDiagnoses((prev) => prev.filter((d) => d.code !== code));
  }, []);

  const addPrescription = useCallback((item: Omit<PrescriptionItem, 'id'>) => {
    const newItem: PrescriptionItem = {
      ...item,
      id: `rx-${Date.now()}`,
    };
    setPrescriptions((prev) => [...prev, newItem]);
  }, []);

  const updatePrescription = useCallback((id: string, updates: Partial<PrescriptionItem>) => {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const removePrescription = useCallback((id: string) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  }, []);

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
    setDirectives((prev) =>
      prev.map((d) => (d.id === id ? { ...d, selected: !d.selected } : d))
    );
  }, []);

  const updateFollowUp = useCallback((partial: Partial<FollowUpData>) => {
    setFollowUp((prev) => ({ ...prev, ...partial }));
  }, []);

  const acknowledgeAlert = useCallback((id: string) => {
    setAcknowledgedAlertIds((prev) => [...prev, id]);
  }, []);

  const completeConsultation = useCallback(() => {
    if (activePatient) {
      setQueue((prev) =>
        prev.map((q) => (q.id === activePatient.id ? { ...q, status: 'completed' } : q))
      );
    }
    setConsultationStatus('completed');
    setIsA4ModalOpen(false);
  }, [activePatient]);

  return (
    <ClinicalEncounterContext.Provider
      value={{
        queue,
        activePatient,
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
        selectPatient,
        callNextPatient,
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
