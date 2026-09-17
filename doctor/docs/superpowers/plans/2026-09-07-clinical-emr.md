# PulseRx Clinical Precision EMR Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive Next.js and React Clinical Precision EMR application with high-throughput Outpatient Department (OPD) queue triage, 10-stage clinical consultation workspace, keyboard-first prescription builder, medication safety reconciliation diff, and official A4 printable letterhead prescription.

**Architecture:** Next.js 14+ App Router with Tailwind CSS custom tokens mapped from `DESIGN.md`. A centralized `ClinicalEncounterContext` coordinates state across all 10 consultation stages, providing real-time synchronization from vitals and diagnoses to prescription entry, drug interaction safety warnings, and the final printable A4 Apollo Clinic prescription.

**Tech Stack:** Next.js 14/15, React 18/19, TypeScript, Tailwind CSS, Material Symbols Outlined, Inter font.

**Spec:** [2026-09-07-clinical-emr-design.md](file:///c:/Users/DHANANJAY%20CHAVAN/Desktop/Projects/sih2026/Dummy3.0/docs/superpowers/specs/2026-09-07-clinical-emr-design.md)

## Global Constraints
- Target platform: Windows, Shell: PowerShell, Node.js v24.12.0, npm 11.6.2.
- Styling: Tailwind CSS configured with exact hex values and typography from `DESIGN.md`.
- Typography: Inter with `tabular-nums` for dosage and vital sign numerical alignment.
- Minimal animation: Zero sluggish spring/physics transitions; instant crisp tab changes and hover highlights.
- Zero external backend dependencies: Fully autonomous client-side state engine with rich medical formulary and mock clinical databases.

---

### Task 1: Next.js Project Scaffolding & Clinical Design System Configuration

**Files:**
- Create/Modify: `package.json`
- Create/Modify: `tsconfig.json`
- Create/Modify: `tailwind.config.ts`
- Create/Modify: `postcss.config.mjs`
- Create/Modify: `src/app/globals.css`
- Create/Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: Tailwind theme tokens (`colors.primary: #00685f`, `colors.inverse-surface: #213145`, `colors.surface: #f8f9ff`, `colors.surface-container-lowest: #ffffff`, etc.), custom `@layer utilities` for tabular figures and print layouts.

- [ ] **Step 1: Initialize Next.js project structure with TypeScript and Tailwind**
  Ensure dependencies (`next`, `react`, `react-dom`, `typescript`, `@types/react`, `@types/react-dom`, `tailwindcss`, `postcss`, `autoprefixer`) are installed in the workspace.

- [ ] **Step 2: Configure `tailwind.config.ts`**
  Add all color tokens from `DESIGN.md` (`primary: #00685f`, `surface: #f8f9ff`, `surface-container-low: #eff4ff`, `surface-container: #e5eeff`, `inverse-surface: #213145`, `on-surface: #0b1c30`, etc.), semantic badge colors, border radiuses, and font sizes.

- [ ] **Step 3: Setup `src/app/globals.css`**
  Define clinical CSS reset, hidden scrollbars (`::-webkit-scrollbar { display: none; }`), `.tabular-nums` utility, and print media rules for `@media print`.

- [ ] **Step 4: Create root `src/app/layout.tsx`**
  Import Inter font and Google Material Symbols Outlined stylesheet links, apply `font-sans antialiased bg-background text-on-surface`.

- [ ] **Step 5: Verify basic Next.js setup**
  Run `npm run build` or test script to confirm no bundling errors.

---

### Task 2: Strict EMR TypeScript Interfaces & Mock Medical Datasets

**Files:**
- Create: `src/types/emr.ts`
- Create: `src/data/initialQueue.ts`
- Create: `src/data/drugCatalog.ts`
- Create: `src/data/icd10Database.ts`
- Create: `src/data/diagnosticPanels.ts`

**Interfaces:**
- Produces:
  - Types: `Patient`, `VitalSigns`, `ChiefComplaint`, `ClinicalNotes`, `Diagnosis`, `PrescriptionItem`, `LabOrder`, `DirectiveItem`, `FollowUpData`, `SafetyAlert`, `QueueItem`.
  - Data exports: `initialQueue: QueueItem[]`, `drugCatalog: DrugInfo[]`, `icd10Database: ICD10Code[]`, `diagnosticPanels: DiagnosticPanel[]`.

- [ ] **Step 1: Define comprehensive TypeScript types in `src/types/emr.ts`**
  Include exact interfaces for all clinical entities (e.g. `diffStatus: 'NEW' | 'CONTINUED' | 'DOSE_CHANGED' | 'DISCONTINUED'`).

- [ ] **Step 2: Create realistic OPD queue data in `src/data/initialQueue.ts`**
  15 realistic patient records with Mr. Ramesh Chandra (#P-90284, 58M, Diabetology) as the primary patient, along with other emergency, priority, and routine queue items.

- [ ] **Step 3: Create drug formulary in `src/data/drugCatalog.ts`**
  Comprehensive medications (Metformin, Glimepiride, Sitagliptin, Telmisartan, Atorvastatin, Amoxicillin-Clav, Insulin Glargine) with strengths, default schedules (`1-0-1`), instructions, and contraindication/allergy flags.

- [ ] **Step 4: Create ICD-10 database in `src/data/icd10Database.ts`**
  Standard internal medicine & diabetes ICD-10 codes (E11.9, I10, E78.5, N18.3, E11.40, etc.).

- [ ] **Step 5: Create diagnostic panels in `src/data/diagnosticPanels.ts`**
  Common lab investigations (HbA1c, Fasting Blood Sugar, Lipid Profile, Serum Creatinine, eGFR, Complete Blood Count, Urine Microalbumin, 12-Lead ECG).

---

### Task 3: Centralized Consultation Context & Drug Safety Engine

**Files:**
- Create: `src/context/ClinicalEncounterContext.tsx`

**Interfaces:**
- Consumes: Types from `src/types/emr.ts`, data from `src/data/initialQueue.ts` and `src/data/drugCatalog.ts`.
- Produces: `useClinicalEncounter()` hook with active encounter state, safety alerts computed property, and dispatch actions:
  - `queue`, `activePatient`, `consultationStatus`, `currentStep`, `vitals`, `complaints`, `clinicalNotes`, `diagnoses`, `prescriptions`, `labOrders`, `directives`, `followUp`, `safetyAlerts`.
  - `selectPatient(patientId)`, `callNextPatient()`, `setStep(step)`, `updateVitals(partial)`, `addComplaint(c)`, `removeComplaint(id)`, `addDiagnosis(d)`, `removeDiagnosis(code)`, `addPrescription(p)`, `updatePrescription(id, p)`, `removePrescription(id)`, `addLabOrder(o)`, `removeLabOrder(id)`, `toggleDirective(cat, text)`, `setFollowUp(f)`, `endConsultation()`.

- [ ] **Step 1: Write `ClinicalEncounterContext.tsx` with initial states**
  Initialize state for queue and active patient pre-loaded with Ramesh Chandra's active visit data.

- [ ] **Step 2: Implement real-time drug safety validation engine**
  Inside the context, automatically compute `safetyAlerts` whenever `prescriptions` or `activePatient.allergies` change (e.g. flag penicillin allergy if Amoxicillin is added, or flag Metformin if renal contraindication is present).

- [ ] **Step 3: Implement step traversal and consultation completion**
  Implement `callNextPatient()`, `setStep()`, and `endConsultation()` updating queue statuses.

---

### Task 4: Persistent Layout Shell Components

**Files:**
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/PatientBanner.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Button.tsx`

**Interfaces:**
- Consumes: `useClinicalEncounter()` for live queue counters, active patient identity, and step navigation.
- Produces: Shared clinical layout frame with fixed 64-width left navigation rail, top header with search and doctor profile, and sticky patient context banner.

- [ ] **Step 1: Build `Sidebar.tsx`**
  Renders navigation items matching all 10 consultation modules with Material Symbols, live OPD queue counter badge ("Room 3 • 14 Waiting"), and key commands cheatsheet (`⌘K`, `⌘P`, `Enter`, `ESC`).

- [ ] **Step 2: Build `Header.tsx`**
  Clinic identity badge ("Apollo Multi-Specialty Clinic • OPD Unit 3"), global patient search input (`⌘K`), "+ New Patient" button, notification bell with red dot, and Dr. Dhananjay Chavan profile chip.

- [ ] **Step 3: Build `PatientBanner.tsx`**
  Sticky patient banner rendered during active encounter showing Patient Avatar, Name (Mr. Ramesh Chandra), UHID, Age/Sex (58 Yrs / Male), Blood Group (B+), Allergy pill tags (Penicillin, Sulfa), current vitals summary, and "End Consultation" button.

- [ ] **Step 4: Build reusable `Badge.tsx` and `Button.tsx`**
  Semantic variants (`NEW`, `CONTINUED`, `DOSE_CHANGED`, `DISCONTINUED`, `URGENT`, `ROUTINE`).

---

### Task 5: OPD Queue Desk & Patient Directory Pages

**Files:**
- Create/Modify: `src/app/page.tsx` (OPD Queue Desk)
- Create: `src/app/patients/page.tsx` (Patient Directory)
- Create: `src/components/queue/RegisterPatientModal.tsx`

**Interfaces:**
- Consumes: `useClinicalEncounter()` queue items, patient list, and `callNextPatient()` function.
- Produces: High-throughput doctor's triage desk and patient directory search.

- [ ] **Step 1: Implement OPD Queue Desk in `src/app/page.tsx`**
  - Live session header: "Good Morning, Dr. Dhananjay Chavan • Diabetology & Metabolic Care".
  - 4 Summary metric cards: Total Registered (28), Waiting in Lobby (12), In Consultation (1), Completed (15).
  - Quick action toolbar: "Break / Pause", "+ Register Patient", "Call Next Patient" (`Space` shortcut).
  - Live Queue table with Token #, Patient details, Age/Gender, Chief Complaint, Triage status badge, Wait time, and Action buttons ("Start Consultation", "Reassign").

- [ ] **Step 2: Implement keyboard shortcuts for OPD Desk**
  Pressing `Space` triggers `callNextPatient()`, pressing `⌘K` focuses search.

- [ ] **Step 3: Implement Patient Directory in `src/app/patients/page.tsx`**
  Search input by UHID, Mobile, or Name; disease cohort filter chips (All, Diabetic Cohort, Hypertensive, Follow-ups); patient table with "+ Add Patient" modal and "Open Chart" buttons.

---

### Task 6: Active Consultation Encounter Shell & Step 3-4 (360 Profile & Vitals)

**Files:**
- Create: `src/app/encounter/[id]/page.tsx`
- Create: `src/components/encounter/EncounterStepNavigator.tsx`
- Create: `src/components/encounter/PatientProfileTab.tsx`
- Create: `src/components/encounter/VitalsStationTab.tsx`

**Interfaces:**
- Consumes: `useClinicalEncounter()`, `vitals`, `activePatient`.
- Produces: Encounter shell with step progress indicator, Tab 1 (Patient 360 Profile & Timeline), and Tab 2 (Triage Vitals Station).

- [ ] **Step 1: Build `EncounterStepNavigator.tsx`**
  Horizontal stepper with 10 labeled steps (Profile, Vitals, Complaints, Notes, Diagnoses, Rx Builder, Med Safety, Orders, Directives, Follow-up). Shows active state, completed state, and previous/next buttons.

- [ ] **Step 2: Build `PatientProfileTab.tsx`**
  Renders longitudinal clinical summary: active chronic conditions, allergies, past visits timeline with previous diagnoses and prescribed medications, and longitudinal trend highlights.

- [ ] **Step 3: Build `VitalsStationTab.tsx`**
  Interactive vitals input cards:
  - Blood Pressure (Systolic/Diastolic) with automated HTN category (Normal / Pre-HTN / Stage 1 / Stage 2).
  - Pulse, SpO2, Temperature, Blood Sugar (Fasting & Postprandial).
  - Height & Weight inputs with automatic BMI calculation and color-coded BMI gauge.
  - Previous visit delta indicators (&uarr; 10 mmHg, &darr; 1.2 kg).
  - "Save & Proceed to Complaints" button.

---

### Task 7: Step 5-6 (Chief Complaints, Clinical Notes & ICD-10 Diagnoses)

**Files:**
- Create: `src/components/encounter/ChiefComplaintsTab.tsx`
- Create: `src/components/encounter/ClinicalNotesTab.tsx`
- Create: `src/components/encounter/DiagnosesTab.tsx`

**Interfaces:**
- Consumes: `useClinicalEncounter()`, `icd10Database`.
- Produces: Chief complaints intake with symptom chips, HPI notes, and ICD-10 problem list manager.

- [ ] **Step 1: Build `ChiefComplaintsTab.tsx`**
  - Quick-add symptom chips: Polyuria, Polydipsia, Fatigue, Blurred Vision, Burning Feet, Weight Loss.
  - Structured fields per complaint: Duration (days/weeks/months), Severity (Mild, Moderate, Severe), Onset (Gradual, Sudden).
  - Free-text HPI (History of Present Illness) narrative editor.

- [ ] **Step 2: Build `ClinicalNotesTab.tsx`**
  Structured physical examination fields: General Appearance, Cardiovascular, Respiratory, Abdominal, CNS, and Doctor's Clinical Impressions.

- [ ] **Step 3: Build `DiagnosesTab.tsx`**
  - ICD-10 search input with real-time matching against `icd10Database`.
  - Active diagnoses list with Primary / Secondary classification badges, chronic vs acute tags, and delete/edit buttons.

---

### Task 8: Step 7-8 (Keyboard-First Rx Builder & Med Safety Engine)

**Files:**
- Create: `src/components/encounter/RxBuilderTab.tsx`
- Create: `src/components/encounter/MedSafetyTab.tsx`

**Interfaces:**
- Consumes: `drugCatalog`, `useClinicalEncounter()` prescriptions, allergies, safetyAlerts.
- Produces: Rapid prescription authoring interface and medication reconciliation diff engine.

- [ ] **Step 1: Build `RxBuilderTab.tsx`**
  - Single continuous rapid entry row:
    `[ Drug Autocomplete ] -> [ Dose Shortcut: 1-0-1 ] -> [ Timing: After Food ] -> [ Duration: 30 Days ] -> [ Enter to Commit ]`.
  - Clickable dose preset tokens: `1-0-0`, `0-0-1`, `1-0-1`, `1-1-1`, `½-0-0`.
  - Structured active prescription table showing Drug Name, Form, Dose, Timing, Duration, Instructions, and row actions (Edit, Duplicate, Delete).

- [ ] **Step 2: Build `MedSafetyTab.tsx`**
  - Side-by-side reconciliation table comparing Home/Chronic Medications against Today's Orders.
  - Semantic diff tags: `NEW`, `CONTINUED`, `DOSE CHANGED`, `DISCONTINUED` (with strike-through).
  - Safety Alert cards: Drug-Drug interactions, Patient Allergy alerts (Penicillin contraindication), and severity markers (High/Moderate).
  - "Acknowledge / Override" buttons for clinical safety flags.

---

### Task 9: Step 9-12 (Lab Orders, Directives & Follow-Up Scheduling)

**Files:**
- Create: `src/components/encounter/LabOrdersTab.tsx`
- Create: `src/components/encounter/DirectivesTab.tsx`
- Create: `src/components/encounter/FollowUpTab.tsx`

**Interfaces:**
- Consumes: `diagnosticPanels`, `useClinicalEncounter()` directives, followUp.
- Produces: Lab test ordering grid, lifestyle directives counseling cards, and follow-up slot booking.

- [ ] **Step 1: Build `LabOrdersTab.tsx`**
  Diagnostic investigation catalog organized into tabs (Biochemistry, Hematology, Radiology, Cardiology); quick check/toggle for HbA1c, Fasting Lipid, RFT, Urine Microalbumin, ECG; priority selection (Routine/Urgent); and fasting instructions badge.

- [ ] **Step 2: Build `DirectivesTab.tsx`**
  Structured physician directives cards:
  - Diabetic Diet (1500 kcal, avoid sugar, high fiber).
  - Sodium Restriction (< 2g sodium/day).
  - Aerobic Exercise (30 mins brisk walk 5 days/week).
  - Diabetic Foot Care Precautions (Daily inspection, comfortable footwear).
  - Red-flag emergency symptoms.

- [ ] **Step 3: Build `FollowUpTab.tsx`**
  - Follow-up interval tokens: `1 Week`, `2 Weeks`, `1 Month`, `3 Months`, or custom calendar date.
  - Appointment review time slot picker.
  - Review objective input (e.g. "Review HbA1c & Blood Sugar Control").
  - SMS & WhatsApp patient reminder notification preview card.

---

### Task 10: Strict A4 Printable Rx Preview & Standalone Print Page

**Files:**
- Create: `src/components/encounter/A4PrescriptionModal.tsx`
- Create: `src/app/print/[id]/page.tsx`

**Interfaces:**
- Consumes: All consultation data for the active patient from `ClinicalEncounterContext`.
- Produces: Pixel-perfect Apollo Multi-Specialty Clinic A4 letterhead prescription with `@media print` support and direct print trigger (`⌘P`).

- [ ] **Step 1: Build `A4PrescriptionModal.tsx`**
  - Modal container rendering a 210mm x 297mm A4 aspect ratio clinical sheet.
  - Hospital letterhead: "APOLLO MULTI-SPECIALTY CLINIC", Reg No, Address, Phone, Email.
  - Doctor block: Dr. Dhananjay Chavan, MD (Internal Medicine), Senior Diabetologist.
  - Patient header: Name, UHID, Age/Sex, Date, Allergies list.
  - Clinical Summary block: Vitals, Chief Complaints, ICD-10 Diagnoses.
  - Formatted &#8478; Prescriptions Table: S.No, Medicine Name, Strength, Dose Schedule (`1 — 0 — 1`), Timing, Duration, Instructions.
  - Lab Orders & Physician Directives section.
  - Next Review Date and Doctor's Digital Signature block with QR code verification stamp.
  - Top action bar: "Print Direct (`⌘P`)", "Download PDF", "Send WhatsApp", "Close".

- [ ] **Step 2: Implement `src/app/print/[id]/page.tsx`**
  Standalone printable page designed exclusively for paper printing, stripping all app navigation rails and utilizing pure black/white crisp vector styling.

---

### Task 11: End-to-End Verification & Production Build Validation

**Files:**
- Test all pages and components in the browser and CLI.

- [ ] **Step 1: Run TypeScript compiler validation**
  Run `npx tsc --noEmit` to verify 0 type errors.

- [ ] **Step 2: Run Next.js production build**
  Run `npm run build` to confirm clean compilation and server-side rendering capability.

- [ ] **Step 3: Verify complete clinical flow in browser**
  - Open OPD Queue &rarr; Click "Call Next Patient" &rarr; verify Ramesh Chandra encounter opens.
  - Step through Vitals &rarr; verify BMI gauge updates.
  - Add complaint & ICD-10 diagnosis &rarr; verify problem list updates.
  - Add medication in Rx builder &rarr; verify tabular schedule and allergy warning.
  - Select lab tests & lifestyle directives &rarr; set 2-week follow-up.
  - Open A4 Printable Rx Modal &rarr; verify all synchronized data renders crisply.
  - Click "End Consultation" &rarr; verify queue updates status to Completed.
