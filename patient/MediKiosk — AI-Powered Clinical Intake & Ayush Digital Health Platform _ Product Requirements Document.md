# MediKiosk
## AI-Powered Clinical Intake, Patient History & Ayush Digital Health Platform

**SIH Problem Statement:** SIH26047 — Patient Case-Taking Software  
**Organization:** Ministry of Ayush  
**Department:** All India Institute of Ayurveda  
**Theme:** Smart Automation  
**Product Type:** Healthcare SaaS / Hospital Digital Health Platform  
**Primary Users:** Patients, doctors, nurses/triage staff, hospital administrators, Ayush practitioners  
**Prototype Goal:** Demonstrate an end-to-end pre-consultation workflow that converts a patient's speech, touch responses and physical medical documents into a verified, structured clinical case sheet.

---

# 1. Executive Summary

MediKiosk is a patient-facing AI clinical intake platform designed for high-volume Ayush and government hospital OPDs.

The platform moves time-consuming history-taking and medical-record organization **before the doctor consultation**.

A patient can:

1. Identify themselves.
2. Provide consent.
3. Select a preferred language.
4. Answer clinical questions using voice or touch.
5. Complete an adaptive clinical history.
6. Scan/upload previous medical documents.
7. Allow AI to extract structured medical information.
8. Review/confirm captured information.
9. Receive a structured clinical summary.
10. Enter the consultation with the physician already having a consolidated case sheet.

The physician remains the final decision-maker.

MediKiosk does **not** autonomously diagnose, prescribe, or replace the physician.

---

# 2. Strategic Insight From Ministry of Ayush Ecosystem

Research into the Ministry's existing digital initiatives reveals that SIH26047 fits into a much larger direction.

Ayush Grid is intended to function as the digital backbone of the Ayush sector, covering healthcare, education, research, drug administration, medicinal plants and Ministry-level functions. The Ministry has also described a federated architecture spanning Core, National, State and Citizen-access layers.

The Ministry's recent reporting identifies:

- Ayush Hospital Management Information System (AHMIS)
- ABDM/ABHA integration
- Ayush Research Portal
- AHMIS 2.0
- Ayush-specific APIs
- citizen-facing services
- AI applications in traditional medicine
- real-time monitoring and data-driven governance

as part of this broader digital direction.

AIIA also has a national role in Ayush pharmacovigilance through Ayush Suraksha, which captures adverse drug reactions and integrates systems such as National Ayush Morbidity Codes and ICD-11.

Meanwhile, the adjacent SIH26046 problem emphasizes:

- FHIR interoperability
- structured clinical/research data
- role-based access
- immutable audit trails
- pharmacovigilance
- regulatory workflows
- data integrity
- analytics

for AIIA's clinical research ecosystem.

### Strategic conclusion

MediKiosk should therefore be designed as:

> **The intelligent first-mile clinical data capture layer for the Ayush digital-health ecosystem.**

Not simply:

> "an AI chatbot for patients."

---

# 3. Product Vision

## Vision

Create a multilingual, accessible and interoperable digital intake layer that captures high-quality patient information before consultation and converts fragmented patient records into structured, verifiable clinical data.

## Long-term vision

```text
Patient
   ↓
MediKiosk
   ↓
Structured Clinical Data
   ↓
AHMIS / Hospital System
   ↓
ABDM / Ayush Grid
   ↓
Clinical Care
Research
Pharmacovigilance
Analytics
Policy
```

---

# 4. Core Problem

Government and tertiary hospitals face extremely high OPD volumes.

Doctors have limited consultation time but must simultaneously:

- obtain patient history
- understand symptoms
- review previous records
- identify comorbidities
- review medications
- identify allergies
- examine the patient
- make clinical decisions
- counsel the patient
- document the encounter

Ayush consultations have additional assessment requirements including detailed Ayurvedic history.

Patients also arrive with fragmented paper-based medical records.

The result is:

- incomplete history
- repeated questioning
- missed information
- poor continuity of care
- wasted consultation time
- fragmented records
- manual documentation
- reduced ability to use historical data

---

# 5. Product Objectives

## Primary objectives

1. Reduce doctor time spent on repetitive history-taking.
2. Increase completeness of clinical history.
3. Digitize paper-based medical records.
4. Structure unstructured patient information.
5. Support Indian languages.
6. Support low-literacy and elderly patients.
7. Detect potentially urgent symptoms for human triage.
8. Create physician-verifiable clinical summaries.
9. Integrate with hospital systems using interoperable standards.
10. Support Ayurveda-specific clinical data collection.

## Secondary objectives

11. Create longitudinal patient timelines.
12. Generate standardized structured data useful for future analytics.
13. Create a foundation for Ayush research and pharmacovigilance.
14. Support multiple Ayush systems in future.
15. Provide hospital-level operational analytics.

---

# 6. Target Users

## 6.1 Patient

Needs:

- simple interaction
- local language
- voice assistance
- minimal typing
- privacy
- accessibility
- fast completion

---

## 6.2 Doctor / Ayush Practitioner

Needs:

- concise case summary
- complete history
- previous records
- medication history
- investigation history
- red-flag indicators
- ability to edit and verify AI output

---

## 6.3 Nurse / Triage Staff

Needs:

- priority alerts
- incomplete case identification
- patient queue
- escalation mechanism

---

## 6.4 Hospital Administrator

Needs:

- OPD throughput
- average intake time
- waiting time
- completion rates
- language distribution
- document processing statistics
- triage statistics

---

## 6.5 Ministry / Institution

Future needs:

- aggregated statistics
- interoperability
- standardized data
- monitoring
- research datasets
- system-level analytics

---

# 7. Product Architecture

```text
                    MEDIKIOSK
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
 Patient Kiosk     Doctor Portal    Admin Portal
        │               │                │
        └───────────────┼────────────────┘
                        ▼
                 Application API
                        │
        ┌───────────────┼─────────────────┐
        │               │                 │
        ▼               ▼                 ▼
 Interview Engine   Document AI     Identity/Consent
        │               │                 │
        ▼               ▼                 ▼
    ASR / TTS          OCR           ABHA/Auth
        │               │
        └───────────────┼─────────────────┘
                        ▼
                Clinical Data Engine
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
      Timeline      Red Flags     Summary
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                 Interoperability
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
            AHMIS              ABDM/FHIR
```

---

# 8. Feature Classification

Features are divided into:

### P0 — Essential

Must exist in the prototype.

### P1 — Competitive

Features that can significantly differentiate the solution.

### P2 — Strategic

Features demonstrating that the product can become a real Ministry-scale platform.

### P3 — Future

Features that should be shown in the roadmap but not consume hackathon development time.

---

# 9. P0 — Essential Features

## 9.1 Patient Identification

Patient can:

- enter patient ID
- enter/scan ABHA identifier
- use a demo patient
- register as new patient

### Prototype

Implement a simulated ABHA flow.

Do not depend on production credentials.

---

# 10. Consent Management

Before clinical data collection:

```text
Why are we collecting your information?

What information will be collected?

Who will see it?

How will it be used?
```

Provide:

- visual consent
- audio explanation
- local-language explanation
- consent checkbox/tap
- timestamp
- consent version
- consent purpose
- revocation status

### Data model

```text
Consent
├── patient_id
├── purpose
├── version
├── timestamp
├── status
└── method
```

---

# 11. Multilingual Patient Interface

Initial prototype:

- English
- Hindi
- Marathi

Architecture should allow:

```text
Marathi
Hindi
English
Tamil
Telugu
Bengali
Gujarati
Kannada
Malayalam
Punjabi
```

without changing the application architecture.

---

# 12. Accessibility Layer

The kiosk must support:

- large text
- large buttons
- icon-based interaction
- audio prompts
- voice responses
- touch responses
- high-contrast mode
- simple language
- progress indicator
- repeat question
- previous/next navigation
- assisted mode

### Key principle

Every important question should be answerable through:

```text
VOICE
OR
TOUCH
```

---

# 13. AI Clinical Interview

This is the core feature.

The system conducts a structured interview rather than a generic chatbot conversation.

## Required history

- Chief complaint
- History of present illness
- Past medical history
- Past surgical history
- Drug history
- Allergy history
- Family history
- Personal history
- Review of systems

---

# 14. Adaptive Question Engine

The question flow changes according to the patient's responses.

Example:

```text
Chest Pain
    ↓
When did it start?
    ↓
Where is the pain?
    ↓
What does it feel like?
    ↓
Does it move anywhere?
    ↓
How severe is it?
    ↓
What makes it worse?
    ↓
What makes it better?
    ↓
Breathlessness?
    ↓
Sweating?
    ↓
Dizziness?
```

The engine should use:

```text
Clinical Ontology
+
Rules
+
LLM extraction
```

rather than relying entirely on an LLM.

---

# 15. Clinical State Engine

The backend maintains a structured patient state.

Example:

```json
{
  "chief_complaint": "chest pain",
  "duration": "3 days",
  "severity": 7,
  "radiation": "left arm",
  "associated_symptoms": [
    "breathlessness"
  ]
}
```

The next question is determined from missing required fields.

---

# 16. Voice AI

Pipeline:

```text
Patient Speech
      ↓
ASR
      ↓
Transcript
      ↓
Language Detection
      ↓
Clinical Information Extraction
      ↓
Structured State
      ↓
Question Engine
      ↓
TTS
      ↓
Patient
```

Prototype languages:

**English + Hindi + Marathi**

---

# 17. Document Digitization

Patient can upload or scan:

- prescriptions
- lab reports
- discharge summaries
- imaging reports
- previous consultation notes

Pipeline:

```text
Image/PDF
    ↓
OCR
    ↓
Document Classification
    ↓
Entity Extraction
    ↓
Normalization
    ↓
Validation
    ↓
Clinical Timeline
```

---

# 18. Medical Entity Extraction

Extract:

### Diagnoses

```text
Type 2 Diabetes
Hypertension
```

### Medications

```text
Metformin
500 mg
1-0-1
```

### Investigations

```text
HbA1c
8.1%
```

### Procedures

```text
Appendectomy
2024
```

### Allergies

```text
Penicillin
```

---

# 19. OCR Confidence Layer

Every extracted field should have:

```text
Value
+
Confidence
+
Source
```

Example:

```text
Metformin 500 mg

Confidence: 96%

Source:
Prescription → Page 1 → Region B
```

This is an excellent trust feature.

---

# 20. Human Verification

Never silently trust OCR/LLM extraction.

Show:

```text
AI extracted:

Metformin 500 mg
        ↓
[✓ Confirm] [✎ Edit]
```

The physician/patient can correct the value.

---

# 21. Medical Timeline

All historical information should be organized chronologically.

```text
2024
│
├── Diabetes diagnosis
│
2025
│
├── Hospital admission
├── Blood investigation
│
2026
│
├── New prescription
└── Current complaint
```

This should become one of the main visual features of the doctor dashboard.

---

# 22. Red-Flag Detection

The system identifies predefined urgent symptom combinations.

Examples:

- chest pain + breathlessness
- sudden weakness + speech difficulty
- severe bleeding
- loss of consciousness
- severe allergic symptoms
- suicidal/self-harm statements

The system should say:

```text
URGENT CLINICAL REVIEW REQUIRED
```

It should NOT diagnose.

---

# 23. Triage Alert

If a red flag is detected:

```text
Patient
 ↓
AI detection
 ↓
Rule validation
 ↓
Triage alert
 ↓
Nurse/doctor
```

Example:

```text
🚨 HIGH PRIORITY

Reason:
Chest pain + breathlessness

Action:
Immediate clinical assessment recommended.

[Notify Triage]
```

---

# 24. AI Clinical Summary

Generate:

```text
Patient Information

Chief Complaint

History of Present Illness

Past Medical History

Past Surgical History

Drug History

Allergy History

Family History

Personal History

Review of Systems

Previous Investigations

Current Medications

Relevant Documents

Red Flags

Information requiring verification
```

---

# 25. AI Provenance

This is a major differentiator.

Every AI-generated statement should ideally be traceable to its source.

Example:

```text
Diabetes — 4 years

Source:
Patient interview
```

```text
HbA1c — 8.1%

Source:
Lab report
Uploaded 12/08/2026
```

```text
Metformin 500 mg

Source:
Prescription
Page 1
```

This creates **explainable clinical documentation** instead of a black-box summary.

---

# 26. Doctor Verification Dashboard

Doctor can:

- view patient queue
- view summary
- view original documents
- view timeline
- edit AI summary
- correct extracted data
- accept summary
- reject summary
- add clinical notes
- mark red flag reviewed
- finalize encounter

---

# 27. AI Confidence Dashboard

Show:

```text
History completeness
████████████░ 92%

Document extraction
███████████░ 89%

Summary confidence
████████████░ 94%
```

More importantly, show:

```text
⚠ 3 fields require verification
```

rather than pretending the AI is always correct.

---

# 28. AYUSH Mode

This should be one of your strongest differentiators.

Mode selection:

```text
Clinical Mode

○ General Clinical Intake
● Ayurveda OPD
```

Capture:

### Dashavidha Pariksha

- Prakriti
- Vikriti
- Sara
- Samhanana
- Pramana
- Satmya
- Sattva
- Ahara Shakti
- Vyayama Shakti
- Vaya

Also:

- Agni
- Koshtha
- Ahara
- Vihara
- Nidana
- Samprapti

---

# 29. AYUSH Structured Case Sheet

Instead of merely generating text:

```text
Ayurveda Case

Prakriti
Vata-Pitta

Agni
Tikshna

Koshtha
...

Ahara
...

Vihara
...

Dashavidha Pariksha
...
```

Store these as structured fields.

This makes the data reusable for:

- clinical care
- research
- analytics
- future AI systems

---

# 30. P1 — Competitive Features

These are the features I would prioritize if your core MVP is stable.

---

# 31. Smart Question Compression

Don't ask every possible question.

The engine should determine:

```text
Already known?
       ↓
Don't ask again.
```

For example:

Previous document:

```text
Diabetes diagnosed in 2022
```

Patient interview:

```text
AI:
"We found that you have a history of diabetes
from your previous record. Is this still correct?"
```

This prevents repetitive questioning.

---

# 32. Patient Memory Across Visits

On future visits:

```text
Previous history
      +
New symptoms
      ↓
Delta interview
```

Instead of asking everything again.

This could dramatically improve the real-world usefulness of the product.

---

# 33. "What's New Since Last Visit?"

Doctor gets:

```text
Since previous visit:

+ New medication
+ New symptom
+ New investigation
- Previous medication stopped
⚠ New allergy reported
```

This is a highly useful feature and a strong differentiator.

---

# 34. Medication Reconciliation

Compare:

```text
Previous medications
        +
New documents
        +
Patient's current response
```

Output:

```text
Medication Changes

✓ Metformin — continuing
⚠ Amlodipine — patient says stopped
+ New medication detected
```

Doctor verifies the final list.

---

# 35. Lab Trend Visualization

Instead of showing:

```text
HbA1c 7.2
HbA1c 8.1
HbA1c 8.5
```

show:

```text
HbA1c

7.2 ─── 8.1 ─── 8.5
2024     2025     2026
```

Similarly:

- Hb
- glucose
- BP
- creatinine
- lipid profile

Only display trends where sufficient reliable historical data exists.

---

# 36. Missing Information Detector

Before consultation:

```text
⚠ Missing Information

Drug allergy: Not recorded
Family history: Incomplete
Current medication: Needs verification
Previous surgery date: Unknown
```

This is safer and more useful than allowing the AI to invent missing data.

---

# 37. Contradiction Detector

Compare:

```text
Patient says:
"I am not diabetic."

Previous report:
"Type 2 Diabetes — diagnosed 2022."
```

System:

```text
⚠ INFORMATION CONFLICT

Current patient response conflicts with
previous medical record.

[Review]
```

This is an excellent AI feature for the judging demo.

---

# 38. Document Quality Detection

Before OCR:

```text
Document Quality

✓ Good lighting
✓ Text visible
⚠ Page partially cropped
```

Allow:

```text
Retake
Crop
Rotate
Enhance
```

---

# 39. Smart Document Classification

Automatically identify:

```text
Prescription
Lab Report
Discharge Summary
Imaging Report
Insurance Document
Unknown
```

This makes the scanning workflow feel intelligent.

---

# 40. P1 — Clinical Safety Layer

Create a dedicated safety engine.

```text
AI Extraction
      ↓
Clinical Rules
      ↓
Safety Checks
      ↓
Doctor Review
```

Rules can detect:

- allergy conflicts
- duplicate medications
- abnormal lab values
- red-flag symptoms
- contradictory information
- missing critical history

Do not provide autonomous treatment recommendations.

---

# 41. P1 — Explainable AI

For every generated summary:

```text
AI-generated statement

[View Source]
```

Source types:

```text
Patient response
Document
Previous encounter
Structured questionnaire
```

This increases physician trust.

---

# 42. P1 — Multimodal Conversation

Patient can switch modes at any time:

```text
🎤 Speak

OR

👆 Tap

OR

⌨ Type
```

Example:

```text
AI:
"How severe is your pain?"

Patient:
🎤 "Around 7."

System:
Pain severity = 7/10
```

---

# 43. P1 — Offline / Low Connectivity Mode

This is highly relevant for India.

The kiosk should gracefully handle temporary connectivity loss.

Potential architecture:

```text
Kiosk
 ↓
Local encrypted queue
 ↓
Connectivity restored
 ↓
Secure synchronization
```

For the prototype, implement:

```text
Offline simulation
+
sync indicator
```

rather than trying to make every AI model fully offline.

---

# 44. P1 — Queue Optimization

Once triage data is available:

```text
Token 101 → Normal
Token 102 → Normal
Token 103 → HIGH PRIORITY
Token 104 → Normal
```

Triage staff dashboard:

```text
HIGH PRIORITY
↓
Patient #103
↓
Immediate review
```

The system should assist prioritization, not make final emergency decisions.

---

# 45. P1 — Accessibility Intelligence

Support:

- elderly mode
- hearing-impaired mode
- visual assistance
- audio repetition
- slow speech
- simplified questions
- caregiver-assisted mode

---

# 46. P2 — Ministry-Scale Features

These features are where you demonstrate that your architecture can become a real platform.

---

# 47. AHMIS Integration Layer

The Ministry's AHMIS is already part of the Ayush digital ecosystem and has been deployed across 100+ facilities according to Ministry reporting. Recent reporting also notes ABDM/ABHA integration.

Therefore MediKiosk should not attempt to replace AHMIS.

Instead:

```text
MediKiosk
    ↓
Interoperability Layer
    ↓
AHMIS
```

MediKiosk becomes the intelligent intake layer.

---

# 48. FHIR Interoperability

Map internal data into resources such as:

```text
Patient
Encounter
Condition
Observation
MedicationStatement
AllergyIntolerance
DocumentReference
DiagnosticReport
Consent
```

Example:

```text
MediKiosk Clinical JSON
        ↓
FHIR Mapping Engine
        ↓
FHIR R4 Bundle
        ↓
Hospital / ABDM adapter
```

The adjacent AIIA clinical-trials problem also explicitly emphasizes FHIR interoperability, making interoperability a sensible strategic design choice for the broader ecosystem.

---

# 49. Ayush-Specific Data Layer

Create an extensible model:

```text
Clinical System
│
├── Ayurveda
├── Yoga & Naturopathy
├── Unani
├── Siddha
├── Sowa Rigpa
└── Homoeopathy
```

For the prototype, fully implement:

```text
Ayurveda
```

but architect the system for other Ayush systems.

This aligns with Ayush Grid's stated sector-wide scope.

---

# 50. Ayush Morbidity Coding

The Ministry's Ayush Suraksha platform already integrates National Ayush Morbidity Codes and ICD-11.

Therefore MediKiosk should eventually support:

```text
Clinical Case
     ↓
Structured condition
     ↓
Ayush morbidity code
     +
ICD-11 mapping where applicable
```

For the prototype, demonstrate the mapping on a small curated dataset.

Do not allow the LLM to freely invent codes.

---

# 51. Pharmacovigilance Integration

This is a particularly interesting extension because AIIA has a national pharmacovigilance role.

Ayush Suraksha is the Ministry's platform for documenting suspected adverse drug reactions and other pharmacovigilance information, with AIIA serving as the National Pharmacovigilance Coordination Centre.

Therefore:

```text
Patient interview
       +
Current medication
       +
Symptoms
       ↓
Potential ADR signal
       ↓
Doctor confirmation
       ↓
ADR report workflow
       ↓
Ayush Suraksha integration
```

### Important

Do not claim:

> "AI confirms an adverse drug reaction."

Instead:

> "AI identifies a possible medication-related event for clinician review."

This is both safer and strategically aligned.

---

# 52. Research Data Pipeline

AIIA has a major research role, and the Ministry describes AIIA as an apex Ayurveda institution focused on healthcare, education and research.

Therefore structured clinical data can eventually support:

```text
De-identified clinical data
        ↓
Research dataset
        ↓
Ayurveda research
        ↓
Evidence generation
```

Add:

```text
Research Export
```

with:

- de-identification
- consent checks
- data dictionary
- export logs

Do not expose patient-identifiable data to researchers.

---

# 53. Population Health Analytics

Aggregated data could eventually show:

```text
OPD Dashboard

Patients Today       4,820
AI Intake Completed  4,410
Average Intake       6m 12s
Doctor Review        2m 04s

Top Complaints
1. Joint pain
2. Digestive complaints
3. Respiratory complaints

Language
Hindi      42%
Marathi    31%
English    17%
Other      10%
```

This aligns with the Ministry's broader emphasis on real-time data and data-driven governance through Ayush Grid.

---

# 54. AI Model Monitoring

Create an admin dashboard:

```text
AI Quality

ASR accuracy
OCR accuracy
Extraction accuracy
Summary acceptance rate
Correction rate
Red-flag precision
False alert rate
Average AI processing time
```

This is a surprisingly strong hackathon feature.

It demonstrates that your team understands that deploying healthcare AI requires **monitoring**, not just calling an LLM API.

---

# 55. AI Feedback Loop

Doctor edits:

```text
AI:
Metformin 500mg

Doctor:
Metformin 500 mg twice daily
```

Store:

```text
AI output
Doctor correction
Correction type
Timestamp
```

Use this for:

```text
model evaluation
prompt improvement
OCR evaluation
question-engine improvement
```

Do not automatically retrain on clinical data without appropriate governance.

---

# 56. Audit Trail

Every sensitive action should be logged:

```text
Patient created
Consent granted
Document uploaded
AI extraction performed
Doctor viewed record
Doctor edited summary
Doctor finalized encounter
Data shared
```

Example:

```text
24 Aug 2026
21:05
Dr. Sharma
Edited medication
Metformin 500 mg
```

This aligns strongly with the auditability emphasis seen in AIIA's adjacent clinical-trials problem.

---

# 57. Role-Based Access Control

Roles:

```text
Patient
Doctor
Nurse
Triage Staff
Admin
Researcher
Auditor
```

Example:

```text
Researcher
   ↓
De-identified data only

Doctor
   ↓
Assigned patient data

Nurse
   ↓
Triage-relevant information
```

---

# 58. P2 — Digital Health Ecosystem Dashboard

Eventually:

```text
Ministry Dashboard

Facilities
Patients
OPD Load
AI Intake
Data Quality
Red Flags
Language Usage
Ayush System Distribution
Research Statistics
ADR Signals
```

This transforms MediKiosk from:

> patient software

into:

> **digital infrastructure for Ayush healthcare.**

---

# 59. P3 — Future Features

Do not build these for SIH unless your core system is already excellent.

Potential future capabilities:

- full multi-Ayush support
- kiosk hardware integration
- biometric authentication
- smart card/QR identification
- wearable integration
- home pre-registration
- WhatsApp-assisted pre-intake
- telemedicine integration
- longitudinal AI health record
- advanced clinical decision support
- population-level disease surveillance
- research cohort discovery
- federated analytics
- multilingual medical translation
- voice-only kiosk
- edge AI
- fully offline inference

---

# 60. What NOT to Build

These are tempting but dangerous scope traps.

## Don't build:

### ❌ AI diagnosis

Do not make:

```text
Symptoms → Disease → Treatment
```

### ❌ AI prescription

Do not generate medicines automatically.

### ❌ Full ABDM implementation

Demonstrate the integration architecture and sandbox/mock flow.

### ❌ All Indian languages

Start with three.

### ❌ All medical conditions

Start with 3–5 complaint pathways.

### ❌ Full Ayurveda expert system

Build structured Ayurvedic data capture.

### ❌ Custom LLM training

Use APIs/models and focus on product architecture.

### ❌ Huge hospital management system

You are an intake layer, not an AHMIS replacement.

---

# 61. Recommended Prototype Scope

## Patient application

```text
P0

✓ Language
✓ Consent
✓ Patient identification
✓ Voice
✓ Touch
✓ Clinical interview
✓ Document upload
✓ OCR
✓ Extraction
✓ Review
✓ Submission
```

## AI

```text
P0

✓ ASR
✓ Clinical entity extraction
✓ Adaptive questions
✓ Summary generation
✓ Red-flag rules
✓ OCR
```

## Doctor

```text
P0

✓ Queue
✓ Patient summary
✓ Timeline
✓ Documents
✓ AI confidence
✓ Edit
✓ Verify
✓ Finalize
```

## Ayurveda

```text
P0/P1

✓ Ayurveda mode
✓ Dashavidha Pariksha
✓ Ahara
✓ Vihara
✓ Agni
✓ Koshtha
✓ Prakriti/Vikriti
```

## Integration

```text
P1/P2

✓ FHIR JSON
✓ Mock ABHA
✓ Mock AHMIS
✓ Audit logs
✓ Consent records
```

---

# 62. Ideal Demo Flow

Your 5–7 minute demo should be:

```text
1. Patient arrives
        ↓
2. Select Marathi
        ↓
3. Consent via audio
        ↓
4. Patient speaks:
   "माझ्या छातीत तीन दिवसांपासून दुखत आहे"
        ↓
5. AI understands
        ↓
6. AI asks adaptive questions
        ↓
7. Patient answers by voice/touch
        ↓
8. Red flag detected
        ↓
9. Triage alert appears
        ↓
10. Patient scans old prescription
        ↓
11. OCR extracts medication
        ↓
12. Patient scans blood report
        ↓
13. Timeline generated
        ↓
14. AI creates structured summary
        ↓
15. Doctor dashboard receives case
        ↓
16. Doctor sees red flag
        ↓
17. Doctor opens source document
        ↓
18. Doctor edits one AI mistake
        ↓
19. Doctor confirms
        ↓
20. FHIR bundle generated
        ↓
21. "Sent to AHMIS/ABDM" demo
```

That is a **complete story**, not a collection of disconnected features.

---

# 63. The "Wow" Features I Would Prioritize

If you want to get ahead of teams that simply build:

> Voice + ChatGPT + OCR + Dashboard

prioritize these five.

## 🥇 1. AI Provenance

Every statement has a source.

```text
Claim
 ↓
Patient answer / Document / Previous record
```

---

## 🥈 2. Contradiction Detection

```text
Old record:
Diabetes

Patient:
"No diabetes."

→ ⚠ Conflict detected
```

Very strong demo.

---

## 🥉 3. Longitudinal Timeline

Turn years of papers into:

```text
Patient Journey
───────────────●────────●────────●──────
              2024     2025     2026
```

---

## 4. "What's New?"

Instead of repeating the whole history:

```text
PREVIOUS VISIT
        +
CURRENT INTERVIEW
        ↓
WHAT CHANGED?
```

This directly attacks the repeated-history problem.

---

## 5. Ayush + Modern Interoperability

Show:

```text
Ayurveda Case
      ↓
Structured Ayush Data
      ↓
FHIR
      ↓
AHMIS
      ↓
ABDM
```

This is much more strategically aligned with the Ministry's ecosystem than building a generic medical chatbot. The Ministry explicitly describes Ayush Grid as an ecosystem backbone and has been developing Ayush-specific APIs and ABDM-aligned systems.

---

# 64. Recommended Data Architecture

Use a structured canonical model:

```text
Patient
│
├── Identity
├── Consent
│
├── Encounters
│     │
│     ├── Symptoms
│     ├── History
│     ├── Examination
│     ├── Medications
│     └── Allergies
│
├── Documents
│
├── Investigations
│
├── Timeline
│
├── Ayush Assessment
│
├── Alerts
│
├── AI Outputs
│
└── Audit Trail
```

Then map this canonical model to:

```text
FHIR
AHMIS
ABDM
Ayush-specific APIs
Research exports
```

This prevents your application from becoming tightly coupled to one external system.

---

# 65. Suggested Technology Stack

## Frontend

```text
Next.js
TypeScript
Tailwind CSS
Framer Motion
```

## Backend

```text
FastAPI
Python
```

or:

```text
Node.js + FastAPI AI services
```

if your team is stronger in MERN.

## Database

```text
PostgreSQL
```

## Vector search

```text
pgvector
```

only where actually needed.

## Storage

```text
S3 / Supabase Storage
```

## AI

```text
LLM API
ASR API/model
TTS API/model
Vision/OCR model
```

## Authentication

```text
JWT
RBAC
```

## Interoperability

```text
FHIR R4
```

## Deployment

```text
Docker
Cloud deployment
HTTPS
```

---

# 66. Core Backend Services

```text
/api/auth
/api/patients
/api/consent
/api/encounters
/api/interview
/api/documents
/api/ocr
/api/extraction
/api/timeline
/api/alerts
/api/summary
/api/doctor
/api/ayush
/api/fhir
/api/audit
```

---

# 67. Success Metrics

Your judges should be able to understand the measurable impact.

## Patient

- Intake completion rate
- Average intake time
- Voice interaction success
- Language support
- Accessibility success

## Clinical

- History completeness
- Doctor correction rate
- Summary acceptance rate
- Red-flag detection recall
- Medication extraction accuracy

## Documents

- OCR accuracy
- Entity extraction accuracy
- Timeline accuracy
- Document classification accuracy

## Operational

- Reduction in doctor history-taking time
- Patients processed/hour
- Staff intervention rate
- Average queue time

---

# 68. Key Product KPI

The most important metric should be:

> **Doctor time saved per patient while maintaining or improving history completeness.**

Example target for prototype validation:

```text
Manual history:
8–10 minutes

MediKiosk:
4–6 minutes patient intake

Doctor review:
1–2 minutes
```

The actual numbers should be measured during testing rather than claimed as real-world clinical results.

---

# 69. Competitive Positioning

Don't position MediKiosk as:

> "AI healthcare chatbot"

Position it as:

> **AI-powered clinical intake infrastructure for Ayush hospitals.**

### Competitor-style comparison

| Capability | Registration System | Generic Chatbot | OCR Scanner | MediKiosk |
|---|---:|---:|---:|---:|
| Patient registration | ✓ | ✓ | ✗ | ✓ |
| Clinical history | ✗ | Partial | ✗ | ✓ |
| Voice | ✗ | ✓ | ✗ | ✓ |
| Touch | ✓ | Partial | ✗ | ✓ |
| Indian languages | Partial | Partial | Partial | ✓ |
| Medical OCR | ✗ | ✗ | ✓ | ✓ |
| Timeline | ✗ | ✗ | ✗ | ✓ |
| Adaptive interview | ✗ | Partial | ✗ | ✓ |
| Red flags | ✗ | Partial | ✗ | ✓ |
| Doctor verification | ✓ | Partial | ✗ | ✓ |
| Ayurveda history | ✗ | ✗ | ✗ | ✓ |
| FHIR-ready | Partial | ✗ | ✗ | ✓ |
| Provenance | ✗ | ✗ | Partial | ✓ |
| Contradiction detection | ✗ | Partial | ✗ | ✓ |
| Pharmacovigilance pathway | ✗ | ✗ | ✗ | Future |
| Research-ready structured data | Partial | ✗ | ✗ | ✓ |

---

# 70. Final Product Strategy

The entire product can be understood in **three layers**.

## Layer 1 — Capture

```text
Voice
Touch
Documents
ABHA
Consent
```

## Layer 2 — Understand

```text
ASR
OCR
Clinical extraction
Adaptive questioning
Timeline
Red flags
Contradiction detection
```

## Layer 3 — Connect

```text
Doctor
AHMIS
ABDM
FHIR
Ayush Grid
Research
Pharmacovigilance
Analytics
```

That is the architecture I would pitch.

---

# 71. Final MVP vs Differentiator Matrix

| Feature | Build? | Priority |
|---|---|---:|
| Patient kiosk | YES | P0 |
| Consent | YES | P0 |
| Voice input | YES | P0 |
| Touch input | YES | P0 |
| Hindi/English/Marathi | YES | P0 |
| Adaptive questioning | YES | P0 |
| Clinical structured JSON | YES | P0 |
| OCR | YES | P0 |
| Medical extraction | YES | P0 |
| Timeline | YES | P0 |
| AI summary | YES | P0 |
| Doctor dashboard | YES | P0 |
| Doctor verification | YES | P0 |
| Red-flag detection | YES | P0 |
| Ayurveda mode | YES | P1 |
| Dashavidha Pariksha | YES | P1 |
| AI provenance | YES | P1 |
| Contradiction detection | YES | P1 |
| What's-new comparison | YES | P1 |
| Medication reconciliation | YES | P1 |
| Lab trends | YES | P1 |
| Offline support | YES | P1 |
| FHIR mapping | YES | P1 |
| Mock AHMIS integration | YES | P1 |
| Mock ABHA | YES | P1 |
| Audit logs | YES | P1 |
| Pharmacovigilance | Demo only | P2 |
| Research analytics | Demo only | P2 |
| Ministry dashboard | Demo only | P2 |
| Full ABDM production integration | NO | P3 |
| Full AHMIS replacement | NO | P3 |
| Autonomous diagnosis | NO | NEVER |
| Autonomous prescription | NO | NEVER |

---

# 72. The Strategic "Big Picture"

The most interesting conclusion from researching the Ministry is this:

**The Ministry isn't simply interested in putting AI into an OPD.**

Its broader digital direction is toward an **interoperable Ayush ecosystem** spanning healthcare, citizen access, research, hospital management, pharmacovigilance, data, and governance. Ayush Grid is explicitly positioned as the backbone for this ecosystem.

So your architecture should communicate:

```text
                 AYUSH DIGITAL ECOSYSTEM

                       AYUSH GRID
                           │
             ┌─────────────┼─────────────┐
             │             │             │
          AHMIS         Research      Suraksha
             │             │             │
             └─────────────┼─────────────┘
                           │
                         ABDM
                           │
                      MEDIKIOSK
                           │
                 FIRST-MILE DATA
                           │
             ┌─────────────┼─────────────┐
             │             │             │
          Patient        Doctor       Hospital
```

**MediKiosk becomes the missing first-mile layer.**

That is a much stronger SIH story than:

> "We made a kiosk that talks to patients."

It becomes:

> **"We built an AI-powered, multilingual, interoperable first-mile clinical data layer that converts patient conversations and fragmented paper records into verified structured health information for Ayush hospitals."**

That is the direction I would take for the SIH proposal.