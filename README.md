# MediKiosk — Unified Smart Healthcare & OPD EMR Platform

MediKiosk is a unified, high-throughput digital outpatient healthcare platform that bridges patient self-intake kiosks with a precision clinical Electronic Medical Record (EMR) system for doctors.

---

## Architecture Overview

The codebase unifies two independently developed frontend applications into a cohesive **Next.js 14 App Router** application under `src/`:

```text
MediKiosk/
├── package.json              # Unified Next.js 14 + React 18 dependencies
├── tsconfig.json             # Strict TypeScript configuration with @/* path alias
├── tailwind.config.ts        # Unified theme with Doctor Material & Patient tactile tokens
├── next.config.mjs           # Next.js server configuration & security headers
├── .env.example              # Server-side GEMINI_API_KEY environment template
├── doctor/                   # Preserved original Doctor reference codebase (untouched)
├── patient/                  # Preserved original Patient reference codebase (untouched)
└── src/                      # Unified Application
    ├── app/                  # Next.js App Router
    │   ├── layout.tsx        # Global Root Layout with AuthProvider
    │   ├── page.tsx          # Unified Ecosystem Landing Hub
    │   ├── login/            # Multi-Role Authentication Portal
    │   ├── doctor/           # Doctor Clinical EMR Workspace
    │   │   ├── layout.tsx    # Role Guard & Encounter Context Provider
    │   │   ├── page.tsx      # OPD Queue Desk & Active Encounter Tabs
    │   │   ├── patients/     # Patient Registry & EMR Search
    │   │   ├── encounter/    # Dynamic Patient Encounter ([id])
    │   │   └── print/        # A4 Letterhead Printable Prescription ([id])
    │   ├── patient/          # Patient Kiosk & Hospital Services
    │   │   ├── page.tsx      # Interactive Multilingual Touch Kiosk
    │   │   ├── ayush/        # AYUSH Dashavidha Pariksha Intelligence Engine
    │   │   ├── operations/   # Hospital Operations & Spatial Triage Radar
    │   │   ├── waiting-tv/   # Live Waiting Room TV Display with Audio Queue
    │   │   └── modules/[id]/ # Dynamic Clinical Modules (PACS, Formulary, etc.)
    │   └── api/gemini/       # Server-Side Gemini AI Route Handlers
    ├── auth/                 # Client AuthContext & ProtectedRoute guard
    ├── components/           # Component library organized by domain
    │   ├── common/           # Shared UI (AppHeader, BodyMap, WaitingTV, etc.)
    │   ├── doctor/           # Doctor EMR Tabs (Profile, Vitals, RxBuilder, Safety, etc.)
    │   ├── patient/          # Kiosk Intake Screens (ABHA, Symptoms, Review, Token)
    │   ├── ayush/            # AYUSH intelligence components
    │   ├── operations/       # Spatial triage and FHIR interoperability
    │   ├── modules/          # Dynamic PACS, Medicine Explorer, First Aid
    │   └── navigation/       # Ecosystem Navbar & All-Services Hub
    ├── context/              # ClinicalEncounterContext (Doctor workflow state)
    ├── data/                 # Diagnostic panels, drug catalogs, mock patients
    ├── types/                # Strict TypeScript models (EMR, Patient, Auth)
    ├── utils/                # FHIR builders, speech synthesis, translations
    └── styles/               # Global CSS with dual-theme design tokens
```

---

## Features & Routes

### 1. Ecosystem Landing (`/`)
* Entry point presenting role-based cards for Doctor EMR, Patient Kiosk, AYUSH Intelligence, Hospital Operations, and All Services directory.
* Multilingual voice assistant and live OPD token status indicator.

### 2. Multi-Role Authentication (`/login`)
* Role-based selector (Doctor, Patient, Receptionist, Admin).
* Manages client-side session state via `AuthContext`.

### 3. Doctor Clinical EMR Suite (`/doctor`)
* **OPD Queue Desk**: Real-time token queue with priority badges (Emergency, Priority, Routine) and patient registration.
* **10-Step Encounter Workflow**:
  1. Patient 360 Profile (UHID, chronic conditions, allergies)
  2. Triage & Vitals Station (automated BMI, BP trends)
  3. Clinical Intake & HPI (Chief complaints, duration)
  4. Clinical Notes & Systemic Examination
  5. Diagnoses & ICD-10 Search Engine
  6. Rx Builder Engine with formulary suggestions
  7. Med Safety & Differential Drug Matrix (contraindication alerts)
  8. Diagnostic Lab & Radiology Orders
  9. Clinical Directives & Lifestyle Guidance
  10. Follow-Up Scheduling & WhatsApp Dispatch
* **Patient Registry (`/doctor/patients`)**: Searchable hospital database by MRN, name, or condition.
* **Direct Encounter Routing (`/doctor/encounter/[id]`)**: Deep-link to any active patient encounter.
* **A4 Letterhead Prescription (`/doctor/print/[id]`)**: NABH-compliant print-ready prescription.

### 4. Patient Touch Kiosk (`/patient`)
* Tactile, high-contrast, accessible touch interface.
* Trilingual support: English, हिंदी (Hindi), मराठी (Marathi).
* ABHA QR scan, Marma anatomical pain locator, adaptive AI symptom interview.
* Queue token generation with live wait time estimation and audio announcement.

### 5. Hospital Operations & AYUSH Intelligence
* **AYUSH Intelligence (`/patient/ayush`)**: Dashavidha Pariksha clinical analysis, doshic balance, and herb-drug interaction safety checker.
* **Hospital Operations (`/patient/operations`)**: Dynamic spatial triage floor plan, syndromic surveillance radar, and FHIR interoperability viewer.
* **Waiting Room Display (`/patient/waiting-tv`)**: Dedicated widescreen TV display with speech broadcast.
* **Dynamic Medical Modules (`/patient/modules/[id]`)**:
  - `medicine-explorer`: National Formulary & AYUSH Dravyaguna browser.
  - `xray-viewer`: PACS radiograph viewer with AI bounding boxes.
  - `first-aid`: Red Flag & emergency triage protocol center.
  - `appointments`: Doctor slot booking engine.
  - `health-reels`: Video-based health literacy shorts.
  - `health-guide`: Preventive lifestyle and dietary care guides.

---

## Gemini AI Integration & Security

All Gemini AI capabilities are executed strictly on the server through Next.js Route Handlers:

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/gemini/intake-chat` | POST | Multilingual patient symptom collection |
| `/api/gemini/document-ocr` | POST | Vision-based medical report & Rx digitizer |
| `/api/gemini/ocr-audit` | POST | OCR verification and evidence bounding box extraction |
| `/api/gemini/clinical-summary` | POST | Clinical synthesis of intake and past records |
| `/api/gemini/clinical-coding` | POST | ICD-10-CM & NAMASTE AYUSH code mapper |
| `/api/gemini/ayush-intelligence`| POST | Prakriti & herb-drug interaction analysis |

> **Security Note**: `GEMINI_API_KEY` is loaded strictly via `process.env.GEMINI_API_KEY` on the server and is **never** exposed to client browser bundles (`NEXT_PUBLIC_*` is not used). If no key is set, the endpoints seamlessly return rich simulated clinical mock data for offline demo evaluation.

---

## Getting Started

### Prerequisites
* Node.js 18.17+ or 20+
* npm 9+

### Installation & Execution

```powershell
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```powershell
# Validate TypeScript
npx tsc --noEmit

# Compile production build
npm run build

# Start production server
npm start
```

---

## Session & Demo Architecture Note

MediKiosk uses client-side session management (`AuthContext` with `localStorage` persistence) and client route guards (`ProtectedRoute`) suitable for rapid clinic kiosk deployments and demo workflows. In production deployments requiring regulatory HIPAA/DISHA compliance, connect `AuthContext` to your hospital's OpenID Connect / SAML identity provider.
