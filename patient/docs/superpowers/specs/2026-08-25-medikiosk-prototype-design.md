# MediKiosk SIH26047 Enterprise Prototype Design Document

> **Project:** MediKiosk — AI-Powered Multilingual Clinical Intake & Ayush Digital Health Platform  
> **Problem Statement:** SIH26047 (Ministry of Ayush / AIIA)  
> **Target Audience:** Internal SIH Judges (Enterprise IT leaders from TCS, Infosys, Wipro, Accenture & Ministry Domain Experts)  
> **Goal:** Build an enterprise-grade, non-AI-slop prototype demonstrating an end-to-end patient-to-doctor clinical intake workflow.

---

## 1. Executive Summary & Winning Strategy

MediKiosk is designed as the **intelligent first-mile clinical data capture layer** for the Ayush digital health ecosystem (AHMIS 2.0, ABDM, Ayush Grid).

### Key Differentiation from "AI Slop":
- **Explainable AI (XAI)**: Every AI-extracted field features clickable source attribution linking to its exact bounding region/text snippet in original medical documents or patient voice transcripts.
- **Human-in-the-Loop Verification**: No silent AI assumptions. Clear confidence badges (e.g. `96% OCR Confidence`) and explicit doctor/patient verification toggles (`Confirm` / `Edit`).
- **Ayush Clinical Depth**: Structured *Dashavidha Pariksha* assessment (Prakriti, Agni, Koshtha), *Ayush Suraksha* adverse drug reaction signals, and herb-allopathic drug safety checks.
- **Enterprise Aesthetics**: Clean slate/teal corporate visual hierarchy, high data density, subtle micro-animations, zero floating neon blur cards, zero generic placeholders.

---

## 2. System Architecture & Multimodal Workflow

```text
PATIENT KIOSK LAYER              AI INTAKE & CLINICAL ENGINE              PHYSICIAN EMR STATION
┌────────────────────────┐      ┌──────────────────────────────┐      ┌─────────────────────────────┐
│ 1. ABHA / Aadhaar Auth │ ───► │ • Multilingual ASR / TTS     │ ───► │ • 30-Sec Glance Case Sheet │
│ 2. Visual Consent      │      │ • SOCRATES HPI Ontology      │      │ • Interactive Body Map      │
│ 3. Audio/Touch Intake  │      │ • Document OCR & NER         │      │ • Editable SOAP Notes       │
│ 4. Paper Scan Simulator│      │ • Triage Red-Flag Engine     │      │ • OCR Source Evidence Lineage│
└────────────────────────┘      └──────────────────────────────┘      │ • Ayush & Herb Safety Check │
                                                                      │ • Rx Builder + WhatsApp PDF │
                                                                      │ • FHIR R4 JSON Exporter     │
                                                                      └─────────────────────────────┘
```

---

## 3. Screen Specifications & Component Breakdown

### 3.1 Patient Kiosk Experience
- **Language & Consent**: English, Hindi, Marathi audio-assisted consent with explicit timestamping and purpose breakdown.
- **SOCRATES Intake & Body Map**: Touch-interactive anatomical diagram mapping pain location, radiation pathways, onset, and severity (1-10 scale).
- **Document AI & OCR**: Document upload simulator (Prescription, Lab Report, Discharge Summary) displaying extracted fields with bounding-box OCR lineage and confidence metrics.
- **Emergency Triage**: Automated red-flag detection for urgent symptoms (e.g., chest pain radiating to arm + diaphoresis) with simulated hospital audio PA announcement ("Token #103, report to Room 104").

### 3.2 Physician EMR Experience
- **30-Second Glanceable Summary**: 4-quadrant structured synthesis (Chief Complaint, Radiation/Associated Symptoms, Comorbidities/Allergies, Key Lab Parameters).
- **SOAP Notes & Audio Dictation**: Editable Subjective, Objective, Assessment, and Plan fields with continuous voice scribe capability.
- **Ayush & Herb-Drug Safety**: Ayurvedic Prakriti/Agni assessment + alert engine for potential herb-drug interactions (e.g., Arjuna Kwatha + Allopathic Antihypertensives).
- **Prescription Builder & Localization**: Full digital Rx builder with multi-language general advice, QR code generation, WhatsApp delivery simulation, and print formatting.

### 3.3 Interoperability & Admin Console
- **FHIR R4 Bundle Viewer**: Real-time generation of FHIR JSON payloads (Patient, Encounter, Condition, Observation, Consent).
- **AI Model Performance Metrics**: Live dashboard showing ASR accuracy, OCR confidence, summary doctor-acceptance rate, and audit logging.

---

## 4. Anti-AI-Slop Rules & Visual Design Standards

1. **Colors**: Tailored HSL Slate & Clinical Teal palette (`slate-900`, `slate-800`, `teal-700`, `emerald-700`, `rose-600`). No bright neon purple gradients or dark-mode gloss overuse.
2. **Typography**: Inter / Outfit modern sans-serif hierarchy with monospaced accents (`font-mono`) for medical registration numbers, tokens, and lab values.
3. **Data Authenticity**: All clinical data (drug names, dosages, lab reference ranges, Ayush terms) must be realistic and medically accurate.
