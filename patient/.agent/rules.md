# Project Rules & Anti-AI-Slop Guidelines — MediKiosk (SIH26047)

## 1. Skill Invocation Mandate
- **ALWAYS** check installed skills (`superpowers:using-superpowers`, `impeccable`, `high-end-visual-design`, `minimalist-ui`, `stitch-design-taste`) before initiating design or implementation tasks.
- Use `full-output-enforcement` to prevent code truncation, placeholder comments (`// TODO`), or incomplete implementations.
- Always run `verification-before-completion` before declaring any task complete.

## 2. Anti-AI-Slop UI & Design Standards (TCS / Infosys Enterprise Criteria)
- **NO Generic AI Aesthetics**: Ban floating blur cards (`backdrop-blur-xl`), glowing purple neon gradients, and empty glassmorphism. Use structured, high-density clinical UI (`slate-900`, `teal-800`, `emerald-700`, clean white cards with crisp 1px slate-200 borders).
- **Explainable AI (XAI) Traceability**: Every AI-generated statement, lab value, or extracted medicine MUST have a visual source attribution link showing where it came from (e.g. `OCR Source: Lab Report Page 1` or `Voice Intake Transcript`).
- **Human Verification**: Display confidence metrics (e.g. `96% OCR Confidence`) and provide explicit doctor/patient `[Confirm]` and `[Edit]` controls for all AI outputs.
- **Medical Realism**: Use authentic medical terminology, SOCRATES HPI structure, realistic lab ranges, real drug formulations (e.g., Metformin 500mg BD, Amlodipine 5mg OD), and authentic Ayurvedic parameters (*Dashavidha Pariksha*, *Prakriti*, *Agni*, *Koshtha*).

## 3. Engineering & Interoperability Requirements
- Ensure full support for ABDM ABHA ID flows, FHIR R4 JSON schemas, and hospital queue token management.
- All interactive controls (voice dictate toggles, language switches, document audits, prescription builders) must function cleanly with zero console errors.
