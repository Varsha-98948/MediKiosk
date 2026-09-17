import React, { useState } from 'react';
import { 
  ArrowLeft, 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  Calendar, 
  FileText, 
  AlertCircle, 
  Sparkles,
  ExternalLink,
  Pill,
  Share2,
  Phone,
  Printer,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { PatientRecord, PrescriptionRecord } from '../../types';
import { generateWhatsAppUrl, formatWhatsAppPrescriptionMessage } from '../../utils/prescriptionUtils';

interface LongitudinalEmrHistoryProps {
  patient: PatientRecord;
  onBack: () => void;
  onSelectDocument: (docId: string) => void;
  onOpenPrescriptionBuilder?: () => void;
}

export const LongitudinalEmrHistory: React.FC<LongitudinalEmrHistoryProps> = ({
  patient,
  onBack,
  onSelectDocument,
  onOpenPrescriptionBuilder,
}) => {
  const [activeWhatsAppModalRx, setActiveWhatsAppModalRx] = useState<PrescriptionRecord | null>(null);
  const [targetPhone, setTargetPhone] = useState(patient.phone || '+91 98201 44521');
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);

  // Longitudinal lab trend data
  const hba1cTrend = [
    { date: 'May 2024', val: 9.4, flag: 'High' },
    { date: 'Nov 2025', val: 8.2, flag: 'High' },
    { date: 'Aug 2026', val: 7.1, flag: 'Improving' },
  ];

  const fbsTrend = [
    { date: 'May 2024', val: 184, flag: 'High' },
    { date: 'Nov 2025', val: 156, flag: 'High' },
    { date: 'Aug 2026', val: 126, flag: 'Borderline' },
  ];

  const bpTrend = [
    { date: 'May 2024', val: '142/88', map: 106 },
    { date: 'Nov 2025', val: '148/92', map: 110 },
    { date: 'Aug 2026', val: '150/95', map: 113, flag: 'Elevated' },
  ];

  const handleTriggerWhatsApp = (rx: PrescriptionRecord) => {
    const formatted = formatWhatsAppPrescriptionMessage({
      patient,
      doctorName: rx.doctorName,
      doctorSpecialty: rx.doctorSpecialty,
      doctorRegNo: rx.doctorRegNo,
      facility: rx.facility,
      diagnosis: rx.diagnosis,
      medicines: rx.medicines,
      generalAdvice: rx.generalAdvice,
      language: rx.language || 'en',
      date: rx.date,
      includeAyush: rx.includeAyush,
    });

    const url = generateWhatsAppUrl(targetPhone, formatted);
    window.open(url, '_blank');
    setDispatchedSuccess(true);
    setTimeout(() => {
      setDispatchedSuccess(false);
      setActiveWhatsAppModalRx(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
                Longitudinal Health Trajectory & EMR History
              </h2>
              <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
                2024 - 2026 EMR
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Patient: <strong className="text-slate-800">{patient.name}</strong> • ABHA: {patient.abhaId}
            </p>
          </div>
        </div>

        {onOpenPrescriptionBuilder && (
          <button
            type="button"
            onClick={onOpenPrescriptionBuilder}
            className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Pill className="w-4 h-4" />
            <span>Create New Prescription</span>
          </button>
        )}
      </div>

      {/* Dedicated Patient Prescription History Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-700" />
            <h3 className="font-extrabold text-slate-900 text-base font-['Outfit']">
              Patient Prescription History & WhatsApp Records ({patient.prescriptions?.length || 0})
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            WhatsApp Dispatch Supported
          </span>
        </div>

        {patient.prescriptions && patient.prescriptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patient.prescriptions.map((rx) => (
              <div 
                key={rx.id} 
                className="p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                        {rx.id}
                      </span>
                      <span className="text-xs font-bold text-teal-800">{rx.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold mt-1">
                      {rx.doctorName} • {rx.facility}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {rx.language === 'hi' ? 'हिन्दी' : rx.language === 'mr' ? 'मराठी' : 'English'}
                    </span>
                    {rx.sentViaWhatsApp && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <Share2 className="w-2.5 h-2.5" /> WhatsApp Sent
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-slate-500 font-bold text-[11px]">DIAGNOSIS:</div>
                  <div className="font-semibold text-slate-900 text-xs">{rx.diagnosis}</div>
                </div>

                {/* Medicines List Preview */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Medications ({rx.medicines.length}):
                  </div>
                  <div className="space-y-1">
                    {rx.medicines.map((m, idx) => (
                      <div key={idx} className="text-xs flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                        <span className="font-bold text-slate-800">{m.name} ({m.strength})</span>
                        <span className="font-mono text-teal-700 font-bold text-[11px]">{m.dosage} • {m.timing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advice preview */}
                {rx.generalAdvice && (
                  <div className="text-xs text-teal-950 bg-teal-50/50 p-2 rounded-xl border border-teal-100">
                    <strong>Advice ({rx.language?.toUpperCase() || 'EN'}):</strong> {rx.generalAdvice.slice(0, 90)}...
                  </div>
                )}

                {/* Action Toolbar */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveWhatsAppModalRx(rx);
                      setTargetPhone(rx.whatsAppRecipient || patient.phone || '+91 98201 44521');
                    }}
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Send WhatsApp ({rx.language?.toUpperCase() || 'EN'})</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
            <Pill className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No previous prescriptions recorded yet</p>
            <p className="text-xs text-slate-500">Generate digital prescriptions via the Prescription Builder to store them here.</p>
          </div>
        )}
      </div>

      {/* 3 Interactive Biomarker Sparkline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* HbA1c Glycemic Trend */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">HbA1c Trend (%)</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> -2.3% Total
            </span>
          </div>

          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            7.1% <span className="text-xs text-slate-400 font-sans font-medium">Target &lt; 7.0%</span>
          </div>

          {/* Sparkline Bar Visualization */}
          <div className="pt-3 space-y-2">
            {hba1cTrend.map((t, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{t.date}</span>
                  <strong className="font-mono">{t.val}% ({t.flag})</strong>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${t.val > 8 ? 'bg-amber-500' : 'bg-teal-600'}`}
                    style={{ width: `${(t.val / 12) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fasting Blood Sugar Trend */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fasting Glucose (mg/dL)</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> -58 mg/dL
            </span>
          </div>

          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            126 <span className="text-xs text-slate-400 font-sans font-medium">Target &lt; 100</span>
          </div>

          {/* Sparkline Bar */}
          <div className="pt-3 space-y-2">
            {fbsTrend.map((t, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{t.date}</span>
                  <strong className="font-mono">{t.val} mg/dL</strong>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${t.val > 140 ? 'bg-amber-500' : 'bg-teal-600'}`}
                    style={{ width: `${(t.val / 250) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Pressure Trend */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Pressure (mmHg)</span>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Rising
            </span>
          </div>

          <div className="text-3xl font-extrabold text-rose-700 font-mono">
            150/95 <span className="text-xs text-slate-400 font-sans font-medium">Stage 2 HTN</span>
          </div>

          {/* Sparkline Bar */}
          <div className="pt-3 space-y-2">
            {bpTrend.map((t, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{t.date}</span>
                  <strong className="font-mono text-rose-700">{t.val} mmHg</strong>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-rose-500"
                    style={{ width: `${(t.map / 140) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Full Chronological Clinical Events Stream */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-5">
        <h3 className="font-bold text-slate-900 text-base">Longitudinal Episode History (2024 - 2026)</h3>

        <div className="space-y-4">
          {[
            {
              date: '25 Aug 2026 (Today)',
              type: 'OPD Encounter',
              title: 'Chest Pain & Exertional Tightness Intake',
              facility: 'AIIMS / Apex Hospital Kiosk #02',
              details: 'Pre-intake completed in Marathi/Hindi. Retrosternal heaviness radiating to left arm × 2 days. AI triage flagged as high priority.',
            },
            {
              date: '12 Aug 2026',
              type: 'Prescription',
              title: 'Antihypertensive Titration (Dr. S. K. Mehta)',
              facility: 'Apex Hospital OPD',
              details: 'BP 150/95 mmHg. Added Amlodipine 5mg OD. Advised salt restriction and lipid profile.',
              docId: 'doc-001',
            },
            {
              date: '10 Aug 2026',
              type: 'Lab Report',
              title: 'Biochemistry Panel & Glycated Hb',
              facility: 'Metropolis Diagnostics',
              details: 'HbA1c: 7.1%, Fasting Blood Sugar: 126 mg/dL, Hemoglobin: 9.2 g/dL (Mild Anemia).',
              docId: 'doc-002',
            },
            {
              date: '20 Nov 2025',
              type: 'Lab Report',
              title: 'HbA1c & Renal Function Test',
              facility: 'KEM Hospital Central Lab',
              details: 'HbA1c: 8.2%, Serum Creatinine: 1.0 mg/dL, Urea: 24 mg/dL.',
            },
            {
              date: '14 May 2024',
              type: 'Diagnosis',
              title: 'Initial Type 2 Diabetes Mellitus Detection',
              facility: 'KEM Hospital OPD',
              details: 'Screening random blood sugar 240 mg/dL. Initiated on Tab Metformin 500mg BD.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 font-mono">
                    {item.date}
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {item.type}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{item.facility}</span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.details}</p>

              {item.docId && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectDocument(item.docId!)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 cursor-pointer"
                  >
                    <span>Inspect OCR Document</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Modal for History Item */}
      {activeWhatsAppModalRx && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            <div className="bg-emerald-700 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Re-Send Prescription via WhatsApp</h3>
                  <p className="text-xs text-emerald-100">
                    Rx ID: {activeWhatsAppModalRx.id} • {activeWhatsAppModalRx.date}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveWhatsAppModalRx(null)}
                className="w-8 h-8 rounded-full bg-emerald-800/50 hover:bg-emerald-800 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recipient WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={targetPhone}
                    onChange={(e) => setTargetPhone(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Formatted Message Preview ({activeWhatsAppModalRx.language?.toUpperCase() || 'EN'})
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Real-time Markdown</span>
                </div>
                <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-2xl max-h-52 overflow-y-auto text-xs font-mono whitespace-pre-line text-emerald-950 font-medium">
                  {formatWhatsAppPrescriptionMessage({
                    patient,
                    doctorName: activeWhatsAppModalRx.doctorName,
                    doctorSpecialty: activeWhatsAppModalRx.doctorSpecialty,
                    doctorRegNo: activeWhatsAppModalRx.doctorRegNo,
                    facility: activeWhatsAppModalRx.facility,
                    diagnosis: activeWhatsAppModalRx.diagnosis,
                    medicines: activeWhatsAppModalRx.medicines,
                    generalAdvice: activeWhatsAppModalRx.generalAdvice,
                    language: activeWhatsAppModalRx.language || 'en',
                    date: activeWhatsAppModalRx.date,
                    includeAyush: activeWhatsAppModalRx.includeAyush,
                  })}
                </div>
              </div>

              {dispatchedSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp window opened with localized prescription!</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveWhatsAppModalRx(null)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleTriggerWhatsApp(activeWhatsAppModalRx)}
                  className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Open WhatsApp</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
