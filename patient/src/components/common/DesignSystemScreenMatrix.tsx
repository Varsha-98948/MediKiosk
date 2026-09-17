import React from 'react';
import { 
  Layers, 
  HeartPulse, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface DesignSystemScreenMatrixProps {
  onNavigateToScreen: (app: 'patient' | 'doctor', screenName: string) => void;
}

export const DesignSystemScreenMatrix: React.FC<DesignSystemScreenMatrixProps> = ({
  onNavigateToScreen,
}) => {
  const patientScreens = [
    { num: '01', name: 'Welcome & Idle Attractor', desc: 'Hospital branding, ABDM tag, 3-language direct buttons, audio helper', screenId: 'welcome' },
    { num: '02', name: 'Language Selection', desc: 'Large 3 cards for English, Hindi, Marathi with audio prompts', screenId: 'language' },
    { num: '03', name: 'Plain-Language Consent', desc: 'Clear terms in patient’s language without legal jargon, privacy shield', screenId: 'consent' },
    { num: '04', name: 'Patient Identification & ABHA', desc: 'Scan QR from ABHA card, 14-digit ID input, new patient, or guest', screenId: 'identify' },
    { num: '05', name: 'Basic Profile & Demographics', desc: 'Pre-filled or editable name, age, gender buttons, phone number', screenId: 'profile' },
    { num: '06', name: 'Main Complaint Selector', desc: '9 visual symptom cards with icons + Voice "Tell in own words" button', screenId: 'complaint' },
    { num: '07', name: 'Adaptive Clinical Questioning', desc: 'One question at a time: onset, pain type, radiation, associated signs', screenId: 'adaptive' },
    { num: '08', name: 'Interactive Body Map & Pain Scale', desc: 'Interactive SVG anatomical diagram + Wong-Baker 0-10 scale', screenId: 'adaptive_body' },
    { num: '09', name: 'AI Conversational Intake', desc: 'Dual mode: natural chat, voice recording with live text, suggested buttons', screenId: 'ai_chat' },
    { num: '10', name: 'Voice Intake Live Transcription', desc: 'Voice recording pulse, live audio transcription in Hindi/Marathi/English', screenId: 'ai_chat_voice' },
    { num: '11', name: 'Red-Flag Clinical Triage Alert', desc: 'Urgent notification modal, staff auto-alert, priority flag', screenId: 'red_flag' },
    { num: '12', name: 'Document Category Selection', desc: '6 document types: Prescription, Blood Lab, Discharge, Scan, Med List', screenId: 'doc_upload' },
    { num: '13', name: 'Camera Scanner Frame Simulation', desc: 'Document boundary alignment frame, OCR processing laser animation', screenId: 'doc_camera' },
    { num: '14', name: 'Document OCR Result & Audit', desc: 'Side-by-side verification: original photo on left, extracted data on right', screenId: 'doc_result' },
    { num: '15', name: 'Longitudinal EMR Timeline', desc: 'Chronological timeline from 2024 to 2026 with verified document links', screenId: 'timeline' },
    { num: '16', name: 'Review & Token Confirmation Pass', desc: 'Printable visit token (A-42), Doctor room 104, wait time estimation', screenId: 'summary' },
    { num: '17', name: 'Patient EMR Home Dashboard', desc: 'Active conditions, ongoing medicines, allergies, OPD token status', screenId: 'emr_home' },
    { num: '18', name: 'Patient Prescriptions Portal', desc: 'Digital prescriptions list, downloadable PDF, dosage schedules', screenId: 'emr_prescriptions' },
    { num: '19', name: 'Consultation History', desc: 'Past visits to Cardiology, Endocrinology, General Medicine OPDs', screenId: 'emr_history' },
    { num: '20', name: 'Lab Reports & Scans Repository', desc: 'Categorized diagnostic documents with OCR extracted findings', screenId: 'emr_reports' },
    { num: '21', name: 'ABDM Privacy & Consent Settings', desc: 'Consent manager, data protection rights, access revocation', screenId: 'emr_privacy' },
  ];

  const doctorScreens = [
    { num: '22', name: 'Doctor Dashboard & OPD Queue', desc: 'Real-time patient queue, red-flag urgent tags, search & triage filters', screenId: 'queue' },
    { num: '23', name: '30-Second Glanceable Summary', desc: '4-box AI synthesized clinical summary, confidence score, evidence link', screenId: 'clinical_summary' },
    { num: '24', name: 'Doctor SOAP Documentation', desc: 'Structured Subjective, Objective, Assessment, Plan formulation', screenId: 'soap_notes' },
    { num: '25', name: 'OCR Verification & Lineage Audit', desc: 'Side-by-side verification with bounding boxes and approval checkboxes', screenId: 'ocr_audit' },
    { num: '26', name: 'Longitudinal Biomarker Trajectory', desc: 'Interactive sparkline trends for HbA1c, Fasting Blood Sugar, BP', screenId: 'trends' },
    { num: '27', name: 'AYUSH & Herb-Drug Safety', desc: 'Ayurvedic Prakriti (Pitta-Kapha), Agni status, Herb-Drug interaction safety', screenId: 'ayush' },
    { num: '28', name: 'Digital Prescription Builder (Rx)', desc: 'Indian generic/brand formulary, 1-0-1 dosing, duration, safety checker', screenId: 'rx_builder' },
    { num: '29', name: 'Printable Hospital Prescription', desc: 'Clean A4 letterhead, doctor signature, ABDM QR code, Rx formatting', screenId: 'print_rx' },
    { num: '30', name: 'Diagnostic Orders & Referral', desc: 'Stat 12-Lead ECG, Troponin-I, Echo orders dispatched to central LIS', screenId: 'orders' },
    { num: '31', name: 'Physician Ambient Voice Scribe', desc: 'Voice dictation engine formatted into SOAP clinical plan', screenId: 'voice_scribe' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 sm:p-6">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-800 text-white flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              MediKiosk — Product Architecture & Screen Matrix
            </h1>
            <p className="text-sm text-slate-500">
              Commercial Indian Hospital Product Specification (ABDM / NHA Ready)
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          Comprehensive 2-application ecosystem linking high-throughput patient intake kiosks with doctor EMR terminals. Built with high-contrast accessibility, multilingual support (English, Hindi, Marathi), and traceable AI clinical intelligence.
        </p>
      </div>

      {/* PATIENT APPLICATION SECTION (Screens 01-21) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
              1. Patient Kiosk Application Flow (Screens 01 – 21)
            </h2>
          </div>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            21 Kiosk Views
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {patientScreens.map((s) => (
            <div
              key={s.num}
              onClick={() => onNavigateToScreen('patient', s.screenId)}
              className="p-4 bg-white hover:bg-teal-50/50 rounded-2xl border border-slate-200 hover:border-teal-400 transition-all cursor-pointer space-y-2 group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold bg-teal-100 text-teal-900 px-2 py-0.5 rounded">
                  Screen {s.num}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-transform group-hover:translate-x-1" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-950">{s.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DOCTOR / PHYSICIAN APPLICATION SECTION (Screens 22-38) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
              2. Doctor EMR & Clinical Workstation Flow (Screens 22 – 32)
            </h2>
          </div>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            11 Physician Views
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {doctorScreens.map((s) => (
            <div
              key={s.num}
              onClick={() => onNavigateToScreen('doctor', s.screenId)}
              className="p-4 bg-white hover:bg-teal-50/50 rounded-2xl border border-slate-200 hover:border-teal-400 transition-all cursor-pointer space-y-2 group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold bg-teal-100 text-teal-900 px-2 py-0.5 rounded">
                  Screen {s.num}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-700 transition-transform group-hover:translate-x-1" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-950">{s.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
