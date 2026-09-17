export type Language = 'en' | 'hi' | 'mr';

export type Gender = 'male' | 'female' | 'other';

export type QueueStatus = 'waiting' | 'called' | 'in_consultation' | 'completed' | 'skipped' | 'emergency' | 'ai_completed';

export type PriorityLevel = 'normal' | 'priority' | 'urgent' | 'routine' | 'moderate';

export type DepartmentId = 
  | 'gen_med' 
  | 'cardiology' 
  | 'ortho' 
  | 'pediatrics' 
  | 'ent' 
  | 'dermatology' 
  | 'gynecology' 
  | 'ayurveda';

export interface DepartmentInfo {
  id: DepartmentId;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  code: string; // e.g. 'A', 'C', 'O', 'P', 'E', 'D', 'G', 'AY'
  room: string;
  doctor: string;
  currentWaitMins: number;
  icon: string;
}

export interface HospitalToken {
  tokenNumber: string; // e.g. 'A-127'
  departmentId: DepartmentId;
  departmentName: string;
  doctorName: string;
  roomNumber: string;
  patientId: string;
  patientName: string;
  phone: string;
  abhaId?: string;
  age: number;
  gender: Gender;
  reasonForVisit: string;
  generatedAt: string;
  status: QueueStatus;
  patientsAhead: number;
  estimatedWaitMins: number;
  intakeCompleted: boolean;
  isEmergency?: boolean;
}

export interface BoundingBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number;
  height: number;
}

export type ProvenanceOrigin = 'patient_response' | 'previous_record' | 'scanned_document' | 'doctor_verified';

export interface ExtractedField {
  id: string;
  label: string;
  value: string;
  reference?: string;
  isAbnormal?: boolean;
  confidence: number;
  evidenceText?: string;
  evidenceBoundingBox?: BoundingBox;
  sourceDocumentId?: string;
  provenanceSource?: ProvenanceOrigin;
  verified?: boolean;
}

export interface ExtractedMedicine {
  id: string;
  name: string;
  strength: string;
  frequency: string;
  timing: string;
  confidence: number;
  evidenceText?: string;
  evidenceBoundingBox?: BoundingBox;
  sourceDocumentId?: string;
  provenanceSource?: ProvenanceOrigin;
  verified?: boolean;
}

export interface MedicalDocument {
  id: string;
  title: string;
  type: 'prescription' | 'lab_report' | 'discharge_summary' | 'scan_imaging' | 'medicine_list' | 'other';
  date: string;
  facility: string;
  originalImageUrl: string;
  extractedFields: ExtractedField[];
  medicinesFound?: ExtractedMedicine[];
  clinicalImpression?: string;
  overallConfidence: number;
}

export interface PrescriptionItem {
  id: string;
  name: string;
  genericName?: string;
  dosage: string;
  timing: string;
  frequency: string;
  duration: string;
  instructions?: string;
  verified?: boolean;
  strength?: string;
}

export interface PrescriptionRecord {
  id: string;
  date: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorRegNo: string;
  facility: string;
  roomNumber?: string;
  diagnosis: string;
  generalAdvice: string;
  generalAdviceTranslations?: {
    en: string;
    hi: string;
    mr: string;
  };
  medicines: PrescriptionItem[];
  language: Language;
  includeAyush?: boolean;
  sentViaWhatsApp?: boolean;
  whatsAppRecipient?: string;
  whatsAppSentAt?: string;
  createdAt: string;
}

export interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  regNo: string;
  department: string;
  roomNumber: string;
  hospitalName: string;
  avatarUrl?: string;
  isAvailable: boolean;
}

export interface AyushAssessment {
  prakritiType: string;
  agniStatus: string;
  koshthaType?: string;
  aharaViharaNotes?: string;
  herbDrugInteractions?: {
    herb: string;
    allopathicDrug: string;
    note: string;
    severity: 'safe' | 'caution' | 'contraindicated';
  }[];
}

export interface PatientRecord {
  id: string;
  tokenNumber: string;
  abhaId: string;
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  language: Language;
  priority: PriorityLevel;
  queueStatus: QueueStatus;
  intakeTime: string;
  estimatedWaitMinutes: number;
  roomNumber: string;
  assignedDoctor?: string;
  department?: string;
  chiefComplaint: string;
  selectedPainLocations?: string[];
  intakeSummary: {
    chiefComplaint: string;
    duration: string;
    character: string;
    location?: string;
    selectedLocations?: string[];
    painScore: number;
    radiation: string[];
    associatedSymptoms: string[];
    redFlagReason?: string;
  };
  vitals: {
    bp: string;
    pulse: string;
    spo2: string;
    temp: string;
    bloodSugar?: string;
    hba1c?: string;
  };
  pastMedicalHistory: string[];
  allergies?: string[];
  documents: MedicalDocument[];
  currentMedicines: PrescriptionItem[];
  currentMedications?: PrescriptionItem[];
  prescriptions?: PrescriptionRecord[];
  ayushAssessment?: AyushAssessment;
}

// Backward compatibility aliases
export type Patient = PatientRecord;
export type Prescription = PrescriptionItem;
export type PrescriptionMedicine = PrescriptionItem;
