'use client';

import React, { useState } from 'react';
import { 
  Volume2, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  FileText, 
  FlaskConical, 
  Pill, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  GitCompare
} from 'lucide-react';
import { Language, MedicalDocument } from '../../types';
import { translations } from '../../utils/translations';
import { speakText } from '../../utils/speech';

interface TimelineEvent {
  year: string;
  date: string;
  category: 'Diagnosis' | 'Medication' | 'Lab Report' | 'Prescription' | 'Current Visit';
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  badgeColor: string;
  docId?: string;
}

interface PatientTimelineScreenProps {
  language: Language;
  onSelectDocument: (docId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const PatientTimelineScreen: React.FC<PatientTimelineScreenProps> = ({
  language,
  onSelectDocument,
  onContinue,
  onBack,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'timeline' | 'whats_new' | 'reconciliation'>('timeline');

  const events: TimelineEvent[] = [
    {
      year: '2024',
      date: '14 May 2024',
      category: 'Diagnosis',
      title: 'Type 2 Diabetes Mellitus Detected',
      subtitle: 'Diagnosed at KEM Hospital OPD during routine health camp (FBS 142 mg/dL)',
      icon: AlertCircle,
      color: 'border-amber-300 bg-amber-50/70 text-amber-900',
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    {
      year: '2025',
      date: '15 Jan 2025',
      category: 'Prescription',
      title: 'Oral Hypoglycemic Started',
      subtitle: 'Tab. Metformin 500mg BD initiated by Dr. S. K. Mehta + Lifestyle counseling',
      icon: Pill,
      color: 'border-teal-300 bg-teal-50/70 text-teal-900',
      badgeColor: 'bg-teal-100 text-teal-900',
      docId: 'doc-001',
    },
    {
      year: '2025',
      date: '20 Nov 2025',
      category: 'Lab Report',
      title: 'Biochemistry & HbA1c Test',
      subtitle: 'HbA1c 8.2% (Uncontrolled). Advised dietary restriction & BP tracking.',
      icon: FlaskConical,
      color: 'border-indigo-300 bg-indigo-50/70 text-indigo-900',
      badgeColor: 'bg-indigo-100 text-indigo-900',
    },
    {
      year: '2026',
      date: '10 Aug 2026',
      category: 'Lab Report',
      title: 'Blood Panel & Glycemic Control',
      subtitle: 'HbA1c reduced to 7.1%. Fasting Blood Sugar 126 mg/dL. Mild Anemia (Hb 9.2).',
      icon: FlaskConical,
      color: 'border-indigo-300 bg-indigo-50/70 text-indigo-900',
      badgeColor: 'bg-indigo-100 text-indigo-900',
      docId: 'doc-002',
    },
    {
      year: '2026',
      date: '12 Aug 2026',
      category: 'Prescription',
      title: 'Antihypertensive Titration',
      subtitle: 'Tab. Amlodipine 5mg OD added for BP 150/95 mmHg by Dr. Mehta.',
      icon: Pill,
      color: 'border-teal-300 bg-teal-50/70 text-teal-900',
      badgeColor: 'bg-teal-100 text-teal-900',
      docId: 'doc-001',
    },
    {
      year: '2026',
      date: '28 Aug 2026 (Today)',
      category: 'Current Visit',
      title: 'Chest Tightness & Exertional Pain',
      subtitle: 'AI Intake Recorded: Left chest pressure radiating to arm with sweating × 2 days.',
      icon: Sparkles,
      color: 'border-rose-400 bg-rose-50 text-rose-950',
      badgeColor: 'bg-rose-100 text-rose-800',
    },
  ];

  return (
    <div className="flex flex-col justify-between min-h-[640px] p-4 sm:p-8 max-w-4xl mx-auto font-['Outfit'] space-y-6">
      
      {/* Header */}
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-700 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black bg-teal-100 text-teal-950 px-3.5 py-1 rounded-full border border-teal-300">
              Longitudinal EMR Timeline
            </span>
            <button
              type="button"
              onClick={() => speakText(t.timelineTitle, language)}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-teal-700" />
              <span>{t.listen}</span>
            </button>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'hi' ? 'रोगी का संपूर्ण मेडिकल इतिहास' : language === 'mr' ? 'रुग्णाचा संपूर्ण वैद्यकीय इतिहास' : 'Patient History & Timeline'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
            {language === 'hi' 
              ? 'अस्पताल के पिछले पर्चे, रिपोर्ट और आज की जांच का व्यवस्थित विवरण' 
              : language === 'mr' 
              ? 'मागील चिठ्ठ्या, तपासणी अहवाल आणि आजच्या तपासणीची कालक्रमानुसार माहिती' 
              : 'Chronological timeline synthesized from past prescriptions, lab tests & current visit'}
          </p>
        </div>

        {/* 3-Way Sub-Tabs: Timeline | What's New? | Medication Reconciliation */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-white text-teal-950 shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📅 Chronological Timeline
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('whats_new')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'whats_new'
                  ? 'bg-white text-teal-950 shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✨ What's New Today?
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reconciliation')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'reconciliation'
                  ? 'bg-white text-teal-950 shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              💊 Medication Changes
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: CHRONOLOGICAL TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="my-2 relative pl-6 sm:pl-8 space-y-4 border-l-2 border-teal-600/50">
          {events.map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <div key={idx} className="relative group">
                
                {/* Timeline Node Pin */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-3.5 w-6 h-6 rounded-full bg-white border-4 border-teal-600 flex items-center justify-center shadow-xs">
                </div>

                {/* Event Card */}
                <div
                  onClick={() => evt.docId && onSelectDocument(evt.docId)}
                  className={`p-4 rounded-2xl border-2 transition-all ${evt.color} ${
                    evt.docId ? 'hover:shadow-md cursor-pointer' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black font-mono px-2 py-0.5 rounded-lg bg-white/90 border border-slate-200">
                        {evt.year}
                      </span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${evt.badgeColor}`}>
                        {evt.category}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-bold">{evt.date}</span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm sm:text-base">{evt.title}</h3>
                      <p className="text-xs text-slate-700 mt-0.5 leading-relaxed font-medium">{evt.subtitle}</p>
                    </div>
                    {evt.docId && (
                      <div className="shrink-0 flex items-center gap-1 text-xs font-black text-teal-800 bg-white px-2.5 py-1.5 rounded-xl border border-teal-300 shadow-2xs">
                        <span>View Slip</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: WHAT'S NEW TODAY? */}
      {activeTab === 'whats_new' && (
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span>Comparative Delta: Current Visit vs Previous Visit</span>
            </h3>
            <span className="text-[11px] font-bold text-slate-500">Auto-Reconciled</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            
            {/* 1. New Symptom */}
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-emerald-950 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  🟢 New Chief Complaint
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Reported Today</span>
              </div>
              <p className="font-bold text-slate-800 text-sm">Precordial Chest Tightness & Sweating</p>
              <p className="text-slate-600 text-[11px]">Onset 2 days ago. No previous cardiac history recorded in EMR.</p>
            </div>

            {/* 2. Red Flag */}
            <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-rose-950 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                  🔴 Active Clinical Red Flag
                </span>
                <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">Urgent</span>
              </div>
              <p className="font-bold text-slate-800 text-sm">Left Arm Radiation + SBP 150 mmHg</p>
              <p className="text-slate-600 text-[11px]">Requires immediate 12-Lead ECG & Troponin I screen before OPD consult.</p>
            </div>

            {/* 3. Medication Changed */}
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-amber-950 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                  🟡 Medication Titration
                </span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">Dosage Increased</span>
              </div>
              <p className="font-bold text-slate-800 text-sm">Tab. Metformin changed from 500mg → 850mg BD</p>
              <p className="text-slate-600 text-[11px]">Adjusted following HbA1c 8.2% report on 20 Nov 2025.</p>
            </div>

            {/* 4. New Document */}
            <div className="p-4 rounded-2xl bg-cyan-50 border-2 border-cyan-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-cyan-950 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-600"></span>
                  🔵 New Document Scanned
                </span>
                <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full">Lab Biochemistry</span>
              </div>
              <p className="font-bold text-slate-800 text-sm">AIIMS Apex Biochemistry Panel (10 Aug 2026)</p>
              <p className="text-slate-600 text-[11px]">Extracted 6 verified clinical parameters (FBS, HbA1c, Serum Creatinine).</p>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: MEDICATION RECONCILIATION */}
      {activeTab === 'reconciliation' && (
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
              <Pill className="w-5 h-5 text-teal-600" />
              <span>Medication Reconciliation: Previous vs Active Regimen</span>
            </h3>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Doctor Verification Required
            </span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900 text-slate-800 font-black">
                <th className="py-2.5">Medicine Name</th>
                <th className="py-2.5">Previous Dose</th>
                <th className="py-2.5">Current Status</th>
                <th className="py-2.5">Reconciliation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="text-slate-900">
                <td className="py-3 font-bold">Tab. Metformin</td>
                <td className="py-3 font-mono">500mg BD</td>
                <td className="py-3 font-mono font-bold text-teal-900">850mg BD</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                    🟡 Dose Increased
                  </span>
                </td>
              </tr>

              <tr className="text-slate-900">
                <td className="py-3 font-bold">Tab. Amlodipine</td>
                <td className="py-3 font-mono text-slate-400">None</td>
                <td className="py-3 font-mono font-bold text-teal-900">5mg OD</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                    🟢 Newly Added (12 Aug)
                  </span>
                </td>
              </tr>

              <tr className="text-slate-900">
                <td className="py-3 font-bold">Cap. Omeprazole</td>
                <td className="py-3 font-mono">20mg OD</td>
                <td className="py-3 font-mono text-slate-400">Discontinued</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-900 border border-rose-300">
                    🔴 Removed / Course Complete
                  </span>
                </td>
              </tr>

              <tr className="text-slate-900 bg-emerald-50/40">
                <td className="py-3 font-bold">Ayur. Arjuna Kwatha</td>
                <td className="py-3 font-mono text-slate-400">None</td>
                <td className="py-3 font-mono font-bold text-emerald-900">15ml BD</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                    🌿 AYUSH Adjuvant Added
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="w-full max-w-md mx-auto pt-2">
        <button
          type="button"
          id="btn-timeline-continue"
          onClick={onContinue}
          className="w-full py-4 sm:py-5 px-6 bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-700 hover:from-teal-600 hover:to-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-teal-900/20 flex items-center justify-center gap-3 cursor-pointer transition-all"
        >
          <span>{t.continue} to AI Clinical Summary</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};
