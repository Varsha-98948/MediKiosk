'use client';

import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  QrCode, 
  Leaf, 
  HeartPulse, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Sparkles,
  Share2,
  FileText,
  User,
  Coffee,
  Moon,
  Sun
} from 'lucide-react';
import { PatientRecord, Language } from '../../types';

interface PathyaApathyaSmartSlipProps {
  patient: PatientRecord;
  language?: Language;
  doctorName?: string;
  doctorRegNo?: string;
  onClose?: () => void;
}

export const PathyaApathyaSmartSlip: React.FC<PathyaApathyaSmartSlipProps> = ({
  patient,
  language = 'en',
  doctorName = 'Dr. Rajeshwar Sen, MD, DM (Cardiology)',
  doctorRegNo = 'MCI-48291 / AIIA-INT-04',
  onClose,
}) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const pathyaDietWholesome = [
    { item: 'Shashtika Shali (Old red rice / brown rice)', reason: 'Laghu (light to digest), stabilizes Pitta-Kapha without creating Ama' },
    { item: 'Mudga Yusha (Moong dal soup with ginger & cumin)', reason: 'Enhances Jatharagni (digestive fire), cardiovascular friendly' },
    { item: 'Patola & Shigru (Pointed gourd & Drumstick)', reason: 'Hridya (cardiotonic) and Medohara (lipid balancing)' },
    { item: 'Draksha & Amalaki (Raisins & Indian Gooseberry)', reason: 'Potent natural antioxidant and Rasayana for Rasa Dhatu' },
    { item: 'Warm water with Dashamoola decoction', reason: 'Pacifies Vata in chest and relieves nocturnal respiratory heaviness' }
  ];

  const apathyaDietUnwholesome = [
    { item: 'Excess table salt & processed pickles (> 2g/day)', reason: 'Aggravates Rakta Pitta and elevates arterial systolic pressure' },
    { item: 'Deep-fried snacks & re-heated vegetable oils', reason: 'Generates obstructive Ama (atherosclerotic lipid accumulation)' },
    { item: 'Cold refrigerated water / ice creams', reason: 'Extinguishes Mandagni and triggers spasmodic Srotas constriction' },
    { item: 'Curd / Yogurt at night (Nishi Dadhi)', reason: 'Blocks micro-circulatory channels (Abhishyandi effect)' },
    { item: 'Excess tea, coffee, and tobacco products', reason: 'Over-stimulates heart rate and causes Vata tremors' }
  ];

  const lifestyleGuidance = [
    { icon: Sun, title: 'Pratah Utthana (Morning Routine)', desc: 'Wake up 45 mins before sunrise (Brahma Muhurta); drink 1 glass warm boiled water.' },
    { icon: HeartPulse, title: 'Vyayama (Cardiovascular Exercise)', desc: '30 minutes gentle brisk walking in open fresh air up to Ardhashakti (mild sweating on forehead).' },
    { icon: Moon, title: 'Nidra & Vishrama (Sleep Hygiene)', desc: 'Sleep by 10:30 PM; avoid digital screens 1 hour prior. No daytime sleeping (Divaswapna).' },
    { icon: Coffee, title: 'Ahara Niyama (Meal Timing)', desc: 'Maintain 4-hour gap between meals; early light dinner before 8:00 PM.' }
  ];

  const redFlags = [
    'Crushing chest tightness lasting more than 15 minutes or radiating to jaw/throat',
    'Sudden onset breathlessness during resting state',
    'Cold clammy sweating accompanied by dizziness or blackouts',
    'Resting pulse consistently exceeding 110 BPM or dropping below 50 BPM'
  ];

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-['Outfit'] text-[#1C2421]">
      
      {/* Top Action Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6ECE8] shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-[#0D5C4D]" />
          <span className="font-black text-sm text-slate-900">
            Pathya–Apathya Smart Care Slip & Digital Prescription
          </span>
          <span className="text-[10px] font-bold bg-[#EBF3EF] text-[#0D5C4D] px-2 py-0.5 rounded border border-[#D1E4DB]">
            Take-Home Document
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print Slip</span>
          </button>

          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="px-3.5 py-2 bg-[#EBF3EF] hover:bg-[#D1E4DB] text-[#0D5C4D] rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border border-[#D1E4DB]"
          >
            <QrCode className="w-4 h-4" />
            <span>Generate Patient QR</span>
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Printable Sheet Wrapper */}
      <div className="bg-white rounded-3xl border-2 border-[#E6ECE8] p-8 sm:p-10 shadow-sm space-y-8 print-only:p-0 print-only:border-none">
        
        {/* Hospital Letterhead */}
        <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0D5C4D] text-white flex items-center justify-center font-black">
              <HeartPulse className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                All India Institute of Ayurveda & Apex Multispecialty
              </h2>
              <p className="text-xs text-slate-600 font-semibold">
                Ministry of Ayush • Integrative Cardiology & Metabolic Care Unit
              </p>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                ABDM Facility ID: IN-DL-00492 • NABL & NABH Accredited
              </div>
            </div>
          </div>

          <div className="text-right text-xs">
            <div className="font-black text-slate-900">{doctorName}</div>
            <div className="text-[11px] text-slate-500">Reg: {doctorRegNo}</div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">
              Date: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Patient Summary Strip */}
        <div className="p-4 bg-[#FAFBF9] rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-500">Patient Name:</span>
            <div className="font-black text-slate-900">{patient.name}</div>
          </div>
          <div>
            <span className="text-slate-500">Age / Gender:</span>
            <div className="font-black text-slate-900">{patient.age} Yrs / {patient.gender}</div>
          </div>
          <div>
            <span className="text-slate-500">ABHA Health ID:</span>
            <div className="font-black text-slate-900">{patient.abhaId}</div>
          </div>
          <div>
            <span className="text-slate-500">Token / Encounter:</span>
            <div className="font-black text-[#0D5C4D] font-mono">{patient.tokenNumber} (OPD A)</div>
          </div>
        </div>

        {/* Clinical Diagnosis & Prakriti Note */}
        <div className="space-y-1 text-xs">
          <span className="font-black text-slate-500 uppercase tracking-wider block text-[10px]">
            Clinical Impression & Integrative Assessment:
          </span>
          <div className="text-sm font-black text-slate-900">
            Grade 1 Essential Hypertension with Precordial Angina Equivalence & Pitta-Kapha Mandagni
          </div>
          <p className="text-xs text-slate-600">
            NAMASTE Code: <strong>SR-HR-02 (Kaphaja Hridroga)</strong> • ICD-11: <strong>TM2.4A / BA01</strong>
          </p>
        </div>

        {/* Pathya (Wholesome) vs Apathya (Unwholesome) Dietary Table */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#0D5C4D]" />
            <span>Pathya–Apathya Ahara (Dietary Directives)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Pathya (Wholesome - TO EAT) */}
            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-900 pb-1 border-b border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>पथ्य (PATHYA) — Wholesome Foods to Favor</span>
              </div>
              <ul className="space-y-2 text-xs">
                {pathyaDietWholesome.map((item, idx) => (
                  <li key={idx} className="space-y-0.5">
                    <strong className="text-slate-900 block">• {item.item}</strong>
                    <span className="text-slate-600 text-[11px] pl-3 block leading-tight">{item.reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apathya (Unwholesome - TO AVOID) */}
            <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-black text-rose-900 pb-1 border-b border-rose-200">
                <XCircle className="w-4 h-4 text-rose-700" />
                <span>अपथ्य (APATHYA) — Foods to Strictly Avoid</span>
              </div>
              <ul className="space-y-2 text-xs">
                {apathyaDietUnwholesome.map((item, idx) => (
                  <li key={idx} className="space-y-0.5">
                    <strong className="text-slate-900 block">• {item.item}</strong>
                    <span className="text-slate-600 text-[11px] pl-3 block leading-tight">{item.reason}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Dinacharya Lifestyle & Activity Guidance */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Dinacharya & Vihara (Daily Lifestyle Guidelines)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lifestyleGuidance.map((guide, idx) => {
              const IconComp = guide.icon;
              return (
                <div key={idx} className="p-3.5 bg-[#FAFBF9] rounded-2xl border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <IconComp className="w-4 h-4 text-[#0D5C4D]" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">{guide.title}</div>
                    <div className="text-[11px] text-slate-600 leading-snug mt-0.5">{guide.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Red-Flag Warning Box */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-rose-900">
            <AlertTriangle className="w-4 h-4 text-rose-700" />
            <span>Red-Flag Symptoms — Seek Immediate Emergency Medical Care:</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-rose-800 font-semibold pl-2">
            {redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0"></span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow-Up Instructions & Doctor Signature */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-end gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-500">Scheduled Follow-Up:</span>
            <div className="text-sm font-black text-[#0D5C4D]">
              Review after 14 days with repeat ECG and Lipid Profile
            </div>
            <div className="text-[11px] text-slate-400">Emergency 24x7 Helpline: 108 / AIIA OPD Desk: +91 11 2695 0401</div>
          </div>

          <div className="text-right space-y-1">
            <div className="w-32 border-b border-slate-400 pb-8 text-[10px] text-slate-400 text-center font-mono">
              [Digital Token Verified]
            </div>
            <div className="font-black text-slate-900">{doctorName}</div>
            <div className="text-[10px] text-slate-500">Authorized Physician Signature</div>
          </div>
        </div>

      </div>

      {/* QR Code Wallet Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-5 text-center shadow-2xl border border-slate-200">
            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-900">
                Patient Digital Wallet Pass
              </h4>
              <p className="text-xs text-slate-500">
                Scan with any smartphone camera to open this digital prescription and diet slip on WhatsApp / Ayush Grid.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-[#0D5C4D] inline-block shadow-inner">
              <svg viewBox="0 0 160 160" className="w-36 h-36 mx-auto">
                <rect width="160" height="160" fill="#ffffff" />
                {/* Simulated High Density QR matrix */}
                <rect x="15" y="15" width="40" height="40" fill="#0D5C4D" />
                <rect x="25" y="25" width="20" height="20" fill="#ffffff" />
                <rect x="105" y="15" width="40" height="40" fill="#0D5C4D" />
                <rect x="115" y="25" width="20" height="20" fill="#ffffff" />
                <rect x="15" y="105" width="40" height="40" fill="#0D5C4D" />
                <rect x="25" y="115" width="20" height="20" fill="#ffffff" />
                <rect x="65" y="20" width="30" height="15" fill="#0D5C4D" />
                <rect x="65" y="45" width="30" height="15" fill="#0D5C4D" />
                <rect x="20" y="65" width="120" height="30" fill="#0D5C4D" fillOpacity="0.8" />
                <rect x="65" y="105" width="75" height="40" fill="#0D5C4D" />
              </svg>
            </div>

            <div className="text-xs font-mono font-bold text-slate-600">
              ABHA: {patient.abhaId} • RX-48210
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 py-2.5 bg-[#EBF3EF] text-[#0D5C4D] rounded-xl text-xs font-black cursor-pointer"
              >
                {copiedLink ? 'Link Copied! ✓' : 'Copy Digital Pass Link'}
              </button>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2.5 bg-[#0D5C4D] text-white rounded-xl text-xs font-black cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
