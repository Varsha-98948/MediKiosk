export type TriageCategory = 'Urgent' | 'Priority' | 'Routine';
export type QueueStatus = 'waiting' | 'in_progress' | 'completed' | 'absent';
export type DiffStatus = 'NEW' | 'CONTINUED' | 'DOSE_CHANGED' | 'DISCONTINUED';

export interface QueueItem {
  id: string;
  tokenNumber: number;
  mrn: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  category: string;
  chiefComplaint: string;
  triage: TriageCategory;
  status: QueueStatus;
  waitTime: string;
  bp: string;
  pulse: number;
  bloodSugar: number;
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  avatar?: string;
  registrationDate: string;
  lastVisit?: string;
}

export interface VitalSigns {
  systolic: number;
  diastolic: number;
  pulse: number;
  spo2: number;
  temp: number;
  respiratoryRate: number;
  bloodSugarFasting: number;
  bloodSugarPostprandial: number;
  height: number;
  weight: number;
  bmi: number;
  bmiCategory: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  previousBp?: string;
  previousWeight?: number;
  bpTrendDelta?: string;
  weightTrendDelta?: string;
}

export interface ChiefComplaint {
  id: string;
  complaint: string;
  duration: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  onset: 'Gradual' | 'Sudden';
  notes?: string;
}

export interface ClinicalNotes {
  hpi: string;
  generalExam: string;
  cvs: string;
  respiratory: string;
  abdomen: string;
  cns: string;
  doctorImpressions: string;
}

export interface Diagnosis {
  code: string;
  description: string;
  type: 'Primary' | 'Secondary';
  status: 'Active' | 'Chronic' | 'Resolved';
  onsetDate: string;
}

export interface PrescriptionItem {
  id: string;
  drugName: string;
  genericName: string;
  form: 'Tab' | 'Cap' | 'Inj' | 'Syrup' | 'Ointment';
  strength: string;
  dosageSchedule: string; // e.g. "1-0-1"
  timing: 'Before Food' | 'After Food' | 'With Food' | 'At Bedtime';
  frequency: 'Daily' | 'Twice Daily' | 'Thrice Daily' | 'As Needed (PRN)';
  duration: string; // e.g. "30 Days"
  instructions: string;
  diffStatus: DiffStatus;
  originalDose?: string;
}

export interface SafetyAlert {
  id: string;
  type: 'allergy' | 'interaction' | 'dosage' | 'contraindication';
  severity: 'critical' | 'high' | 'moderate' | 'low';
  title: string;
  description: string;
  acknowledged: boolean;
}

export interface LabOrder {
  id: string;
  testName: string;
  category: 'Biochemistry' | 'Hematology' | 'Radiology' | 'Cardiology' | 'Microbiology';
  priority: 'Routine' | 'Urgent' | 'Stat';
  fastingRequired: boolean;
  clinicalIndication?: string;
}

export interface DirectiveItem {
  id: string;
  category: 'Diet' | 'Exercise' | 'Precautions' | 'Emergency';
  title: string;
  description: string;
  selected: boolean;
}

export interface FollowUpData {
  interval: string;
  date: string;
  slot: string;
  clinicalObjective: string;
  sendSms: boolean;
  sendWhatsApp: boolean;
}

export interface PastVisitSummary {
  id: string;
  date: string;
  doctorName: string;
  department: string;
  chiefComplaints: string[];
  diagnoses: string[];
  vitals: string;
  prescriptions: string[];
  notes: string;
}
