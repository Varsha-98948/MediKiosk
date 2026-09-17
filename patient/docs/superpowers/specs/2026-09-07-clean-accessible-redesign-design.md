# Simple, Clean, Accessible Box-Border Redesign Specification

- **Date**: 2026-09-07
- **Topic**: Full visual and navigation overhaul of MediKiosk
- **Target Audience**: Regular hospital visitors, low-literacy/first-time users, clinical doctors, and hospital operators
- **Status**: Approved for Planning

---

## 1. Design Vision & Philosophy

### 1.1 Core Objectives
1. **Simple, Clean, and Professional**: Orderly, structured visual hierarchy that looks crisp, trustworthy, and clinical rather than like a flashy startup or tech demo.
2. **Crisp Box Borders**: Distinct solid 1.5px–2px borders on every container, card, modal, and button to clearly define boundaries and make visual scanning effortless.
3. **High Feature Discoverability**: Every capability (Patient Kiosk, Doctor Glassbox, Ayush AI Engine, Hospital Operations, Medicine Explorer, X-Ray Viewer, Appointment Booking, First Aid Red Flags, and Health Guides) is instantly findable through both prominent numbered primary tabs and an accessible "All Services / सभी सेवाएँ" visual directory grid.
4. **No Tech/Blue Theme**: Deep Forest Green (`#144A38`), Warm Sand/Ivory canvas (`#F9F9F6`), Pure White boxes (`#FFFFFF`), with warm Amber (`#B45309`) and Emergency Crimson (`#DC2626`) accents.
5. **Universal Accessibility for Regular & Low-Literacy Users**:
   - High-contrast visual icons paired with every single feature.
   - Text-to-speech speaker buttons (`🔊`) on all key cards and instructions in English, Hindi, and Marathi.
   - Simple plain language with bilingual/trilingual labels.
   - Large touch targets (minimum 44px–52px height) with prominent numbers (1, 2, 3).
6. **Zero Glows & Zero Heavy Shadows**: Total removal of `box-shadow`, `drop-shadow`, blur glows, and neon pulse effects. Visual hierarchy is established strictly via borders, background tones, and typography.
7. **Tactile, Simple Animations**: Responsive micro-animations: 150ms border darkening on hover (`hover:border-[#144A38]`), subtle background tint shift (`hover:bg-[#F4F7F4]`), and 1px active button depression (`active:translate-y-[1px]`).

---

## 2. Color Palette & Tokens (`src/index.css`)

| Token | Hex / Value | Purpose |
|---|---|---|
| `--color-forest-dark` | `#0E3B2C` | Deepest brand green, header text, high-contrast borders |
| `--color-forest-primary` | `#144A38` | Primary button fill, active tab indicator, active borders |
| `--color-forest-light` | `#1D664E` | Hover state for buttons and borders |
| `--color-sage-surface` | `#EAF2EC` | Badge background, selected pill fill, subtle accents |
| `--color-warm-bg` | `#F9F9F6` | Global page canvas background (warm ivory/sand) |
| `--color-box-white` | `#FFFFFF` | Solid card container fill |
| `--color-border-subtle` | `#E5E7EB` | Inner box separators and dividers |
| `--color-border-standard` | `#D1D5DB` | Standard 1.5px card and container borders |
| `--color-border-emphasis` | `#9CA3AF` | Interactive card default borders |
| `--color-border-active` | `#144A38` | Hovered / active card borders |
| `--color-alert-amber` | `#B45309` | Warning / triage alert text and border |
| `--color-alert-bg` | `#FEF3C7` | Warning / triage background fill |
| `--color-danger-red` | `#DC2626` | Emergency trigger / critical red flag |
| `--color-danger-bg` | `#FEE2E2` | Emergency banner background fill |
| `--color-text-main` | `#1F2937` | Main headings and high-contrast body copy |
| `--color-text-muted` | `#4B5563` | Subtitles, helper text, timestamps |

---

## 3. Component Architecture & UI Overhaul

### 3.1 Global Header Navigation (`src/components/navigation/EcosystemNavbar.tsx`)
- **Structure**: Clean top bar with solid bottom border (`border-b-2 border-stone-300 bg-white`).
- **Brand Identity**: Clean green medical cross icon + "MediKiosk / स्वास्थ्य केंद्र" with official Ayush / ABDM Level-3 badge.
- **Numbered Core Tabs**:
  1. `🏠 Home / मुख्य`
  2. `🏥 1. Patient Kiosk / मरीज़ काउंटर`
  3. `👨‍⚕️ 2. Doctor Desk / डॉक्टर कक्ष`
  4. `🌿 3. Ayush AI / आयुष निदान`
  5. `🏢 4. Hospital Ops / अस्पताल संचालन`
- **Feature Directory Quick Launcher**:
  - `📂 All Services / सभी सेवाएँ` button that toggles a full-screen or slide-down clean box grid of all 8+ hospital modules.
- **Language Switcher**:
  - Direct toggle buttons or dropdown with clear native names: `English`, `हिन्दी`, `मराठी`.
  - Plays instant audio pronunciation when switched.
- **Screen Reader / Audio Help Button**:
  - Prominent `🔊 Listen to Page` button that speaks screen instructions for low-literacy users.

### 3.2 Master Landing Page & Feature Directory (`src/components/landing/LandingPage.tsx`)
- **Hero Banner**:
  - Simple, human headline: *"Ayush Hospital Care Made Simple & Fast / सबके लिए सरल और त्वरित स्वास्थ्य सेवा"*.
  - Plain instruction box with audio playback button: *"Touch any service box below to begin or ask a staff member for assistance."*
  - Big primary action buttons: *"Start Patient Check-In / नया पर्चा बनाएं"* and *"Doctor & Staff Login / डॉक्टर लॉगिन"*.
- **The Box Border Feature Directory (8 Core Modules)**:
  - 8 distinct bordered cards (`border-2 border-stone-300 rounded-xl bg-white p-5`):
    1. **Patient Queue & Token Kiosk**: Check symptoms, register ABHA, point pain on body map, print queue token.
    2. **Doctor Glassbox EMR**: Patient history, clinical notes, AI explanation graphs, prescription generator.
    3. **Ayush Intelligence Engine**: Dashavidha Pariksha, Prakriti balance polygon, NAMASTE & ICD-11 coding.
    4. **Hospital Operations & Triage**: Bed occupancy, dynamic room routing, pin code disease surveillance radar.
    5. **Medicine & Herb Guide**: Search Ayurvedic and standard medicines with safety and dosage instructions.
    6. **X-Ray & Lab Report Viewer**: View medical scans, blood reports, and OCR extracted lab values.
    7. **Emergency & Red Flag Center**: Immediate triage for chest pain, acute breathlessness, and critical symptoms.
    8. **Doctor Appointment Booking**: Reserve a consultation slot with available hospital specialists.
  - Each card includes:
    - Dedicated visual icon in a clean colored badge.
    - Large high-contrast title and 1-sentence plain explanation.
    - Audio speaker button (`🔊`) to read the card aloud.
    - Direct action button with hover border highlighting.
- **4-Step Visual Journey**:
  - Clean numbered boxes (Step 1: Check In → Step 2: AI Intake → Step 3: Doctor Consultation → Step 4: Medicine & Diet Slip).

### 3.3 Bottom Simulation & Workflow Toolbar (`src/App.tsx`)
- Replace the dark translucent glass floating footer with a clean, solid, bordered bar (`border-t-2 border-stone-300 bg-white`).
- High-contrast controls:
  - Current Token display (`Serving: A-121`).
  - Next Patient button (`▶ Call Next Patient`).
  - Emergency Simulation trigger (`+ Urgent Patient`).
  - Direct quick-switcher buttons to any view.
  - Offline/Online connectivity status badge.

### 3.4 Modal & Card Styling
- Remove all glowing radar rings and amber pulse shadows.
- Red Flag Modal: Solid 2px Crimson Red border (`border-2 border-red-600 bg-white`), clear warning icon, large text, and voice announcement.
- Accessibility Panel: Clean bordered drawer with high contrast text, font-size scaler (100%, 125%, 150%), and audio guides.

---

## 4. Verification Plan

### 4.1 Automated Validation
- Run TypeScript build check (`npm run build` or Next.js build) to verify 0 syntax or type errors.
- Ensure no broken imports or missing properties.

### 4.2 Visual & Usability Verification
- Verify that no blue tech themes or blue background/button styles remain.
- Verify that all containers, cards, and buttons have clear, crisp box borders.
- Verify that every feature card and navigation element has clear visual icons.
- Verify that audio speech buttons function properly in English, Hindi, and Marathi.
- Verify that hover animations are smooth and free of glowing/shadow effects.
