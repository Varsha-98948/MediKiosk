// Re-export patient types
export * from './types/patient';

// Re-export non-conflicting EMR types
export type {
  TriageCategory,
  DiffStatus,
  QueueItem,
  VitalSigns,
  ChiefComplaint,
  ClinicalNotes,
  Diagnosis,
  LabOrder,
  DirectiveItem,
  FollowUpData,
  SafetyAlert,
} from './types/emr';

// Re-export Auth types
export * from './types/auth';
