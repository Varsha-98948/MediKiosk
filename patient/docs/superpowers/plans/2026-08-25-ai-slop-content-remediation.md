# Comprehensive AI Slop & Content Technique Remediation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate all mechanical anti-patterns (gray-on-color text contrast issues, tacky bounce animations, AI color gradients) and content slop ("AI-powered", sparkles, hype copy) across all MediKiosk UI components, establishing an enterprise-grade, minimalist clinical interface.

**Architecture:** Systematic audit and refactoring based on `detect.mjs` mechanical scan results and `impeccable` craft floor directives. All text contrast is fixed using matching dark color shades on tinted backgrounds, bounce animations are replaced with calm `animate-pulse` or static indicators, and all content text is standardized to strict clinical terminology.

**Tech Stack:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS, Lucide React icons.

**Spec:** `docs/superpowers/specs/2026-08-25-medikiosk-prototype-design.md`

## Global Constraints

- Zero Unicode emojis anywhere in markup or copy. Use clean Lucide SVG icons.
- Zero tacky bounce animations (`animate-bounce`). Use `animate-pulse` or static indicators.
- High-contrast text on tinted backgrounds (never slate/gray text on color backgrounds).
- Clean, institutional typography (Inter/Geist for UI text, Mono for ABHA IDs, Tokens, Lab Values, FHIR JSON).
- Strict clinical language—no marketing hype or AI magic claims.

---

### Task 1: Fix Contrast & Slop in Patient Upload & Verification Screens

**Files:**
- Modify: `src/components/patient/DocumentUploadScreen.tsx:280-290`
- Modify: `src/components/patient/DocumentAiResultScreen.tsx:125-140`
- Modify: `src/components/patient/AiChatIntakeScreen.tsx:300-330`
- Modify: `src/components/patient/RedFlagAlertModal.tsx:35-45`

- [ ] **Step 1: Fix DocumentUploadScreen bounce animation**
Replace `animate-bounce` on line 284 with `animate-pulse` or static scanner crosshair ring.

- [ ] **Step 2: Fix DocumentAiResultScreen contrast bug**
Replace `text-slate-900 on bg-rose-50` (line 132) with `text-rose-950 font-medium bg-rose-50 border border-rose-200`.

- [ ] **Step 3: Fix AiChatIntakeScreen contrast & bounce issues**
Replace `text-slate-700 on bg-teal-50` (line 303) with `text-teal-950 font-medium bg-teal-50`.
Replace `animate-bounce` (line 326) with `animate-pulse`.

- [ ] **Step 4: Fix RedFlagAlertModal bounce animation**
Replace `animate-bounce` (line 39) with `animate-pulse` on emergency indicator icon.

- [ ] **Step 5: Run mechanical detector check**
Run: `node .agents/skills/impeccable/scripts/detect.mjs --json src/components/patient/DocumentUploadScreen.tsx src/components/patient/DocumentAiResultScreen.tsx src/components/patient/AiChatIntakeScreen.tsx src/components/patient/RedFlagAlertModal.tsx`
Expected: 0 findings for these target files.

---

### Task 2: Fix Contrast & Slop in Doctor Clinical EMR Modules

**Files:**
- Modify: `src/components/doctor/DocumentViewerOcrAudit.tsx:135-145`
- Modify: `src/components/doctor/DoctorLoginScreen.tsx:145-155`
- Modify: `src/components/doctor/DoctorPrintPrescription.tsx:360-370`, `475-485`
- Modify: `src/components/doctor/LongitudinalEmrHistory.tsx:185-195`, `445-455`
- Modify: `src/components/doctor/PrescriptionBuilder.tsx:495-505`, `680-690`
- Modify: `src/components/doctor/ReferralInvestigationOrders.tsx:195-205`

- [ ] **Step 1: Fix DocumentViewerOcrAudit contrast bug**
Replace `text-slate-950 on bg-emerald-500` (line 140) with `text-white font-bold bg-emerald-700 px-2 py-0.5 rounded`.

- [ ] **Step 2: Fix DoctorLoginScreen contrast bug**
Replace `text-slate-700 on bg-teal-700` (line 150) with `text-white font-semibold`.

- [ ] **Step 3: Fix DoctorPrintPrescription contrast bugs**
Replace `text-slate-900 on bg-emerald-50` (line 363) with `text-emerald-950 font-semibold bg-emerald-50 border border-emerald-200`.
Replace `text-slate-800 on bg-emerald-50` (line 479) with `text-emerald-950 font-semibold bg-emerald-50 border border-emerald-200`.

- [ ] **Step 4: Fix LongitudinalEmrHistory contrast bugs**
Replace `text-slate-600 on bg-teal-50` (line 191) with `text-teal-950 font-medium bg-teal-50`.
Replace `text-slate-800 on bg-emerald-50` (line 450) with `text-emerald-950 font-medium bg-emerald-50`.

- [ ] **Step 5: Fix PrescriptionBuilder contrast bugs**
Replace `text-slate-400 on bg-rose-50` (line 500) with `text-rose-900 font-semibold bg-rose-50`.
Replace `text-slate-800 on bg-emerald-50` (line 687) with `text-emerald-950 font-semibold bg-emerald-50`.

- [ ] **Step 6: Fix ReferralInvestigationOrders bounce animation**
Replace `animate-bounce` (line 200) with `animate-pulse`.

- [ ] **Step 7: Run mechanical detector check**
Run: `node .agents/skills/impeccable/scripts/detect.mjs --json src/components/doctor/DocumentViewerOcrAudit.tsx src/components/doctor/DoctorLoginScreen.tsx src/components/doctor/DoctorPrintPrescription.tsx src/components/doctor/LongitudinalEmrHistory.tsx src/components/doctor/PrescriptionBuilder.tsx src/components/doctor/ReferralInvestigationOrders.tsx`
Expected: 0 findings for these target files.

---

### Task 3: Fix AI Color Palette in Common Design Matrix Component

**Files:**
- Modify: `src/components/common/DesignSystemScreenMatrix.tsx:135-150`

- [ ] **Step 1: Fix DesignSystemScreenMatrix AI color palette**
Replace generic indigo gradient headers (`text-indigo-950`) on line 141 with institutional Slate & Teal design system tokens (`text-slate-900`).

- [ ] **Step 2: Run mechanical detector check across whole project**
Run: `node .agents/skills/impeccable/scripts/detect.mjs --json src/app/page.tsx src/components/common/DesignSystemScreenMatrix.tsx`
Expected: 0 findings.

---

### Task 4: Full Codebase Audit & Next.js Build Verification

- [ ] **Step 1: Run comprehensive mechanical detector scan**
Run: `node .agents/skills/impeccable/scripts/detect.mjs --json src/app/page.tsx src/app/layout.tsx src/components/common/AppHeader.tsx src/components/common/BodyDiagram.tsx src/components/common/PainScale.tsx src/components/common/DesignSystemScreenMatrix.tsx src/components/doctor/AyushIntegrationView.tsx src/components/doctor/DoctorDashboard.tsx src/components/doctor/DoctorLoginScreen.tsx src/components/doctor/DoctorPrintPrescription.tsx src/components/doctor/DocumentViewerOcrAudit.tsx src/components/doctor/LongitudinalEmrHistory.tsx src/components/doctor/PatientEmrClinicalSummary.tsx src/components/doctor/PrescriptionBuilder.tsx src/components/doctor/ReferralInvestigationOrders.tsx src/components/doctor/VoiceDictationScribe.tsx src/components/patient/AdaptiveQuestionsScreen.tsx src/components/patient/AiChatIntakeScreen.tsx src/components/patient/BasicProfileScreen.tsx src/components/patient/ConsentScreen.tsx src/components/patient/DocumentAiResultScreen.tsx src/components/patient/DocumentUploadScreen.tsx src/components/patient/IdentificationScreen.tsx src/components/patient/LanguageSelectScreen.tsx src/components/patient/MainComplaintScreen.tsx src/components/patient/PatientEmrPortal.tsx src/components/patient/PatientTimelineScreen.tsx src/components/patient/RedFlagAlertModal.tsx src/components/patient/ReviewSummaryScreen.tsx src/components/patient/WelcomeScreen.tsx`
Expected: `[]` (Zero defects across all files).

- [ ] **Step 2: Run Next.js production build**
Run: `node .\node_modules\next\dist\bin\next build`
Expected: `✓ Compiled successfully`.
