# Design Specification: PulseRx Clinical Precision EMR (Next.js & React)

**Date**: 2026-09-07  
**Status**: Approved by User  
**Author**: Antigravity Assistant & Dr. Dhananjay Chavan  
**Target Platform**: Next.js 14+ (App Router), React 18/19, TypeScript, Tailwind CSS

---

## 1. Executive Summary & Objectives

The goal is to engineer a high-precision, desktop-first Outpatient Department (OPD) and Electronic Medical Record (EMR) application in Next.js and React. The system translates 15 reference HTML/CSS mockups into an interactive, reactive clinical workspace designed for high-throughput consultation desks (diabetology, internal medicine, and multi-specialty clinics).

### Core Principles
1. **Clinical Cognitive Clarity**: Elimination of decorative clutter; high-density structured medical data with scannable semantic markers.
2. **Tabular Precision**: Inter font with tabular numerals (`tabular-nums`) for dosage alignment (`1 — 0 — 1`) and laboratory/vital trend indicators.
3. **Synchronized State Engine**: Actions in the Vitals, Chief Complaints, Diagnoses, Rx Builder, and Directives instantly update the Drug Safety Engine and synchronize with the Strict A4 Printable Prescription.
4. **Simple Flow & Minimal Animation**: Subtle micro-transitions (hover states, tab active states) without sluggish animation physics, honoring the user's explicit requirement: "keep the flow simple with minimal animation as given in the reference images".

---

## 2. Architecture & File Structure

The project will be built inside the workspace using the Next.js App Router:

```text
pulserx-emr/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── public/
│   ├── favicon.ico
│   └── clinic-logo.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout with Inter, Material Symbols & Providers
│   │   ├── globals.css                   # Custom scrollbars, print rules, clinical utilities
│   │   ├── page.tsx                      # Step 1: OPD Queue & Doctor Triage Desk
│   │   ├── patients/
│   │   │   └── page.tsx                  # Step 2: Patient Directory & Fast Global Search
│   │   ├── encounter/
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Active Patient Consultation Workspace (Steps 3-12)
│   │   └── print/
│   │       └── [id]/
│   │           └── page.tsx              # Clean standalone A4 Letterhead Printable view
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx               # Fixed 64-width navigation rail with queue status
│   │   │   ├── Header.tsx                # Clinic switcher, global search, user profile
│   │   │   └── PatientBanner.tsx         # Sticky patient identity & safety strip
│   │   ├── encounter/
│   │   │   ├── PatientProfileTab.tsx     # Step 3: Longitudinal history & past encounters
│   │   │   ├── VitalsStationTab.tsx      # Step 4: Vitals recording & BMI trend gauge
│   │   │   ├── ChiefComplaintsTab.tsx    # Step 5: Presenting symptoms & HPI documentation
│   │   │   ├── ClinicalNotesTab.tsx      # Step 6a: Physical exam & HPI documentation
│   │   │   ├── DiagnosesTab.tsx          # Step 6b: ICD-10 search & problem list
│   │   │   ├── RxBuilderTab.tsx          # Step 7: Fast keyboard-first prescription builder
│   │   │   ├── MedSafetyTab.tsx          # Step 8: Reconciliation diff & safety alerts
│   │   │   ├── LabOrdersTab.tsx          # Step 9 & 10: Diagnostic investigations catalog
│   │   │   ├── DirectivesTab.tsx         # Step 11: Physician directives & lifestyle advice
│   │   │   ├── FollowUpTab.tsx           # Step 12: Review slot booking & reminder setup
│   │   │   └── A4PrescriptionModal.tsx   # Step 10b: Modal preview of strict A4 Apollo Rx
│   │   └── ui/
│   │       ├── Badge.tsx                 # Status & diff badges (NEW, CONT, CHG, STOP)
│   │       ├── Button.tsx                # Primary teal, subtle secondary, danger red
│   │       ├── Input.tsx                 # Compact clinical form controls
│   │       └── Modal.tsx                 # Accessible modal dialog shell
│   ├── context/
│   │   └── ClinicalEncounterContext.tsx  # Centralized consultation & queue state
│   ├── data/
│   │   ├── initialQueue.ts               # 15 realistic OPD patient entries
│   │   ├── mockPatients.ts               # Deep patient profiles (e.g. Ramesh Chandra)
│   │   ├── drugCatalog.ts                # Diabetology, cardiac & antibiotic drug formulary
│   │   ├── icd10Database.ts              # ICD-10 codes, categories & descriptions
│   │   └── diagnosticPanels.ts           # Biochemistry, Hematology, Radiology panels
│   └── types/
│       └── emr.ts                        # TypeScript interfaces for patients, vitals, Rx, etc.
```

---

## 3. Design System Tokens & Styling

Mapped from `DESIGN.md` and reference HTML tailwind configurations:

### 3.1 Color Palette
- **Surfaces**:
  - `background`: `#f8f9ff`
  - `surface`: `#f8f9ff`
  - `surface-container-lowest` (Canvas white): `#ffffff`
  - `surface-container-low`: `#eff4ff`
  - `surface-container`: `#e5eeff`
  - `surface-container-high`: `#dce9ff`
  - `surface-container-highest`: `#d3e4fe`
  - `inverse-surface` (Sidebar dark navy): `#213145`
  - `on-surface`: `#0b1c30`
  - `on-surface-variant`: `#3d4947`
- **Primary Clinical Teal**:
  - `primary`: `#00685f`
  - `primary-container`: `#008378`
  - `primary-fixed`: `#89f5e7`
  - `on-primary`: `#ffffff`
- **Secondary & Tertiary Accents**:
  - `secondary`: `#565e74`
  - `tertiary`: `#006577`
  - `error`: `#ba1a1a`
  - `error-container`: `#ffdad6`
- **Semantic Clinical Diff Badges**:
  - `NEW`: Background `#eef2ff`, text `#4338ca`, border `#c7d2fe`
  - `CONTINUED`: Background `#ecfdf5`, text `#047857`, border `#a7f3d0`
  - `DOSE CHANGED`: Background `#fffbeb`, text `#b45309`, border `#fde68a`
  - `DISCONTINUED / ALLERGY`: Background `#fff1f2`, text `#be123c`, border `#fecdd3`

### 3.2 Typography & Density
- **Font**: `Inter, sans-serif`.
- **Dose Schedules**: Monospace-like tabular numerals `font-variant-numeric: tabular-nums; font-weight: 700`.
- **Sizing**:
  - Compact inputs & table cells: 32px–36px height, 6px–8px vertical padding.
  - Body text: 12px–13px (`body-sm`, `body-md`).
  - Section headers: 15px–18px (`headline-sm`, `headline-md`).

---

## 4. State Management Specifications (`ClinicalEncounterContext`)

The `ClinicalEncounterContext` manages:

1. **Queue Management**:
   - `queue`: Array of patient queue records (Token #, patient info, triage category, status: `'waiting' | 'in_progress' | 'completed'`).
   - `callNextPatient()`: Auto-selects the next prioritized waiting patient, updates status to `'in_progress'`, and navigates to `/encounter/[id]`.
   - `completeConsultation(id)`: Marks encounter completed, records timestamp, and returns to OPD queue.

2. **Active Encounter Data**:
   - `activePatient`: Current patient record (MRN, Demographics, Allergies, Blood Group).
   - `vitals`: `{ systolic, diastolic, pulse, spo2, temp, bloodSugar, height, weight, bmi, trend }`.
   - `complaints`: Array of `{ id, complaint, duration, severity, onset, notes }`.
   - `clinicalNotes`: `{ hpi, physicalExam, doctorNotes }`.
   - `diagnoses`: Array of `{ code, description, type: 'primary' | 'secondary', status }`.
   - `prescriptions`: Array of `{ id, drugName, form, strength, schedule, timing, frequency, duration, instructions, diffStatus }`.
   - `labOrders`: Array of `{ id, testName, category, priority, instructions }`.
   - `directives`: Array of `{ category, text, selected }`.
   - `followUp`: `{ interval, date, slot, notes, sendSms }`.
   - `safetyAlerts`: Array of computed warnings (e.g. "Penicillin allergy triggered by Amoxicillin", "Metformin contraindicated with renal impairment").

3. **Helper Actions**:
   - `updateVitals(partial)`
   - `addComplaint(item)` / `removeComplaint(id)`
   - `addDiagnosis(item)` / `removeDiagnosis(code)`
   - `addPrescription(item)` / `removePrescription(id)` / `updatePrescription(id, updates)`
   - `addLabOrder(item)` / `removeLabOrder(id)`
   - `updateDirectives(directives)`
   - `setFollowUp(followUpData)`

---

## 5. Screen Specifications & Flow

### Screen 1: OPD Queue & Doctor Triage Desk (`/`)
- Header stats: Registered (28), Waiting (12), In Consultation (1), Completed (15).
- Quick action bar: "Break / Pause", "+ Register Patient", "Call Next Patient" (`Space` shortcut).
- Triage Table: Token #, Patient details, Age/Sex, Chief complaint, Triage category (Urgent, Routine), Wait duration, and Action button ("Start Encounter").

### Screen 2: Patient Directory & Fast Global Search (`/patients`)
- Instant search by Name, UHID, Phone.
- Quick filter tabs: All, Diabetic Cohort, Hypertensive, Follow-ups.
- Patient card grid/table with quick button to launch encounter.

### Screen 3: Patient Longitudinal 360 Profile
- Timeline of historical visits with diagnoses, previous prescribed medications, and vitals trend chart.

### Screen 4: Triage & Clinical Vitals Recording
- Structured vital entry: BP (mmHg), Heart Rate (bpm), SpO2 (%), Temperature (°F), Blood Sugar (mg/dL).
- Real-time BMI calculator with normal/overweight/obese gauge.
- Mini trend delta indicators (e.g., &uarr; 10 mmHg from last visit).

### Screen 5: Chief Complaints & Clinical Intake
- Fast symptom chips: Polyuria, Polydipsia, Weight Loss, Fatigue, Paresthesia, Nocturia.
- Structured selectors for Duration, Severity (Mild/Mod/Severe), Onset, and doctor's HPI free-text field.

### Screen 6: Clinical Notes & ICD-10 Diagnoses
- Systematic examination fields: General, Cardiovascular, Respiratory, Abdominal, CNS.
- ICD-10 autocomplete search picker with standard codes:
  - `E11.9`: Type 2 Diabetes Mellitus without complications
  - `I10`: Essential (primary) Hypertension
  - `E78.5`: Hyperlipidemia, unspecified
  - `N18.3`: Chronic Kidney Disease, Stage 3

### Screen 7: Fast Keyboard-First Rx Builder Engine
- Inline rapid entry row:
  - `[ Drug Search (Autocomplete) ]` &rarr; `[ Dose Shortcut: 1-0-1 ]` &rarr; `[ Timing: After Food ]` &rarr; `[ Duration: 30 Days ]` &rarr; `[ Press Enter ]`.
  - Quick dose shortcut tokens below input: `1-0-0`, `0-0-1`, `1-0-1`, `1-1-1`, `½-0-0`.
- Active Rx table with instant row editing and removal.

### Screen 8: Medication Reconciliation & Drug Safety Engine
- Side-by-side reconciliation between Chronic / Home Meds and Today's New Orders.
- Color-coded diff badges (`NEW`, `CONTINUED`, `DOSE CHANGED`, `DISCONTINUED`).
- Real-time safety warning cards with override acknowledgement.

### Screen 9 & 10: Diagnostic Lab Orders
- Test catalog organized by category: Biochemistry, Hematology, Radiology, Cardiology.
- Priority flags: Routine / Urgent / Stat. Fasting preparation instructions toggle.

### Screen 11: Physician Directives & Lifestyle Advice
- Preset clinical guidance modules:
  - Diabetic Diet (1500 kcal, avoid refined sugars).
  - Low Sodium Restriction (< 2g sodium/day).
  - Aerobic Exercise (30 min brisk walk 5 days/week).
  - Diabetic Foot Care Precautions.

### Screen 12: Consultation Follow-up & Review Slot
- Interval tokens: `1 Week`, `2 Weeks`, `1 Month`, `3 Months`.
- Date picker, available appointment time slot, clinical objective for review, and SMS confirmation toggle.

### Screen 13: Strict A4 Printable Rx Preview & Export
- Formatted 210mm x 297mm A4 layout:
  - Official Clinic Letterhead: "APOLLO MULTI-SPECIALTY CLINIC", Reg #, Address, Phone.
  - Doctor Credentials: Dr. Dhananjay Chavan MD, Senior Diabetologist.
  - Patient Context Bar: Ramesh Chandra, 58M, UHID #P-90284, Date, Allergies.
  - Clinical Summary: Vitals, Chief Complaints, Diagnoses (ICD-10).
  - Prescriptions Table: &#8478; Drug Name, Strength, Dose Schedule (`1 — 0 — 1`), Timing, Duration, Instructions.
  - Laboratory Investigations & Advice notes.
  - Next Follow-up Review date.
  - QR Code verification token and Doctor's digital signature block.
- Direct Print button (`⌘P`) styled with `@media print` CSS so printing from the browser produces a clean, borderless paper prescription.

---

## 6. Verification & Testing Strategy
1. **TypeScript Verification**: Zero type errors with strict schema validation.
2. **Next.js Production Build**: `npm run build` succeeds without warnings or bundle failures.
3. **Workflow E2E Testing**:
   - Navigate to OPD Queue &rarr; Call patient Ramesh Chandra.
   - Enter/modify vitals &rarr; Add complaint &rarr; Select ICD-10 diagnosis.
   - Add a medication via Rx builder &rarr; Check safety alert for penicillin allergy.
   - Add a lab test & lifestyle directive &rarr; Set 2-week follow-up.
   - Open A4 Letterhead Preview & verify all entered items appear on the prescription.
   - Complete consultation & confirm queue status updates.
