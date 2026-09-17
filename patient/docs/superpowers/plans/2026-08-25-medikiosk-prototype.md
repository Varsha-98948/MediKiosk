# MediKiosk SIH26047 Enterprise Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate MediKiosk into an enterprise-grade, non-AI-slop prototype for SIH26047 featuring FHIR R4 interoperability, Explainable AI (XAI) OCR provenance, Ayush *Dashavidha Pariksha*, and high-density clinical EMR workflows.

**Architecture:** Refactor TypeScript models to support FHIR R4 export and XAI evidence lineage. Enhance Patient Kiosk & Physician EMR components with high-density enterprise styling, explicit confidence indicators, human verification controls, and real-time clinical safety rules.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React Icons, Web Speech API.

**Spec:** `docs/superpowers/specs/2026-08-25-medikiosk-prototype-design.md`

## Global Constraints
- Follow `.agent/rules.md` strictly: No generic glowing blur cards, no fake AI diagnostic claims, high information density.
- All code edits must be unabridged, complete drop-in replacements with no `// TODO` or placeholder code.
- Validate TypeScript compilation and build cleanly with `npm run build`.

---

### Task 1: FHIR R4 Interoperability Generator & Data Schema Polish

**Files:**
- Create: `src/utils/fhirUtils.ts`
- Modify: `src/types.ts`
- Test: `src/utils/fhirUtils.ts`

**Interfaces:**
- Consumes: `PatientRecord`, `MedicalDocument`, `PrescriptionRecord` from `src/types.ts`
- Produces: `generateFhirBundle(patient: PatientRecord): object` returning a valid FHIR R4 Bundle JSON.

- [ ] **Step 1: Update `src/types.ts` with XAI Lineage and FHIR types**

Add `evidenceBoundingBox`, `sourceDocumentId`, and `fhirResourceRef` fields to `ExtractedField` and `ExtractedMedicine`. Add `FhirBundle` type definition.

- [ ] **Step 2: Create `src/utils/fhirUtils.ts`**

Implement `generateFhirBundle(patient)` converting `PatientRecord` into FHIR R4 resources (`Patient`, `Encounter`, `Condition`, `Observation`, `Consent`, `MedicationStatement`).

- [ ] **Step 3: Verify TypeScript builds without errors**

Run: `npx tsc --noEmit`
Expected: 0 errors.

---

### Task 2: Explainable AI (XAI) OCR Bounding Box Audit & Lineage View

**Files:**
- Modify: `src/components/doctor/DocumentViewerOcrAudit.tsx`
- Modify: `src/components/patient/DocumentAiResultScreen.tsx`

**Interfaces:**
- Consumes: `MedicalDocument`, `ExtractedField`, `ExtractedMedicine`
- Produces: Interactive OCR audit canvas with highlighted bounding regions, confidence sliders, and field-level verification toggles.

- [ ] **Step 1: Enhance `DocumentViewerOcrAudit.tsx`**

Add interactive field selection that highlights corresponding simulated document bounding boxes on the original scanned document image. Show exact OCR confidence percentages (e.g. `96% confidence`) and source coordinates.

- [ ] **Step 2: Enhance `DocumentAiResultScreen.tsx`**

Add explicit `[✓ Confirm Field]` and `[✎ Edit Field]` controls for every extracted lab parameter and medication, reinforcing human-in-the-loop verification.

- [ ] **Step 3: Verify components compile**

Run: `npx tsc --noEmit`
Expected: 0 errors.

---

### Task 3: Ayush Dashavidha Pariksha & Integrative Herb-Drug Safety Engine

**Files:**
- Modify: `src/components/doctor/AyushIntegrationView.tsx`
- Modify: `src/data/mockData.ts`

**Interfaces:**
- Consumes: `AyushAssessment`, `PatientRecord`
- Produces: Structured Ayurvedic assessment UI (Prakriti, Vikriti, Sara, Samhanana, Agni, Koshtha) and Herb-Allopathic Drug Interaction warning matrix.

- [ ] **Step 1: Update `AyushIntegrationView.tsx`**

Implement full *Dashavidha Pariksha* 10-fold examination grid, Agni status badges, and severity-coded herb-drug interaction alerts (e.g., Arjuna Kwatha + Beta Blockers caution alert).

- [ ] **Step 2: Update `mockData.ts`**

Populate rich Ayurvedic assessment data for sample patients.

- [ ] **Step 3: Verify compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors.

---

### Task 4: Physician 30-Second Glance Summary & FHIR Modal Integration

**Files:**
- Modify: `src/components/doctor/PatientEmrClinicalSummary.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `PatientRecord`, `generateFhirBundle`
- Produces: High-density 4-quadrant case sheet, editable SOAP note form, and FHIR JSON modal exporter.

- [ ] **Step 1: Enhance `PatientEmrClinicalSummary.tsx`**

Add FHIR R4 JSON Export modal, XAI source attribution links, and voice dictation integration.

- [ ] **Step 2: Connect FHIR Modal and shortcuts in `App.tsx`**

Ensure seamless navigation between Patient Kiosk, Doctor EMR, Ayush Module, and FHIR Exporter.

- [ ] **Step 3: Build verification**

Run: `npm run build`
Expected: Build succeeds with 0 errors.
