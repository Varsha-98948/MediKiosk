import React, { useState } from 'react';
import { 
  HeartPulse, 
  Pill, 
  History, 
  FileText, 
  Shield, 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  Calendar, 
  AlertCircle, 
  User, 
  Phone, 
  Lock, 
  CheckCircle2, 
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { Language, PatientRecord } from '../../types';
import { translations } from '../../utils/translations';

interface PatientEmrPortalProps {
  language: Language;
  patient: PatientRecord;
  onBackToIntake: () => void;
  onSelectDocument: (docId: string) => void;
}

export const PatientEmrPortal: React.FC<PatientEmrPortalProps> = ({
  language,
  patient,
  onBackToIntake,
  onSelectDocument,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'prescriptions' | 'history' | 'reports' | 'privacy'>('overview');
  const t = translations[language];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToIntake}
            className="p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
                {patient.name}
              </h2>
              <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                ABHA Active
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              ABHA: {patient.abhaId} • {patient.age}y / {patient.gender} • {patient.phone}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: HeartPulse },
            { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
            { id: 'history', label: 'Consultations', icon: History },
            { id: 'reports', label: 'Reports & Scans', icon: FileText },
            { id: 'privacy', label: 'Privacy & ABDM', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-teal-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Quick Health Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Chronic Conditions */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Active Conditions</span>
                <HeartPulse className="w-4 h-4 text-rose-500" />
              </div>
              <div className="space-y-1">
                {patient.pastMedicalHistory.map((cond, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>{cond}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Medicines Count */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Active Rx Medicines</span>
                <Pill className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-2xl font-extrabold text-teal-900 font-mono">
                {patient.currentMedications.length} Regular
              </div>
              <p className="text-xs text-slate-500">
                {patient.currentMedications.map(m => m.name).join(', ')}
              </p>
            </div>

            {/* Known Allergies */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Allergies</span>
                <AlertCircle className="w-4 h-4 text-amber-500" />
              </div>
              {patient.allergies.length > 0 ? (
                <div className="space-y-1">
                  {patient.allergies.map((all, idx) => (
                    <span key={idx} className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-300">
                      {all}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-slate-500 font-medium">No known drug allergies reported</span>
              )}
            </div>

          </div>

          {/* Today's Token Status */}
          <div className="bg-gradient-to-r from-teal-800 to-emerald-800 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Today's OPD Token
              </span>
              <h3 className="text-2xl font-bold mt-2">Token #{patient.tokenNumber} • Room {patient.roomNumber}</h3>
              <p className="text-xs text-teal-100 mt-1">
                Doctor: {patient.assignedDoctor} • Approx wait {patient.estimatedWaitMinutes} mins
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('prescriptions')}
              className="px-4 py-2.5 bg-white text-teal-900 hover:bg-slate-50 rounded-xl font-bold text-xs shadow-xs"
            >
              View Active Rx Details
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: PRESCRIPTIONS */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Current & Past Prescriptions</h3>
            <span className="text-xs text-slate-500 font-medium">Digital EMR Prescriptions</span>
          </div>

          <div className="space-y-3">
            {patient.prescriptions.map((rx) => (
              <div key={rx.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                      Rx #{rx.id}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base mt-1">{rx.doctorName} ({rx.doctorSpecialty})</h4>
                    <span className="text-xs text-slate-500">{rx.facility} • {rx.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                {/* Medicine Items */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Prescribed Medications</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {rx.medicines.map((med) => (
                      <div key={med.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                          <span>{med.name} {med.strength}</span>
                          <span className="text-teal-700 font-mono font-bold">{med.dosage}</span>
                        </div>
                        <div className="text-slate-600">
                          <strong>Timing:</strong> {med.timing} • <strong>Duration:</strong> {med.duration}
                        </div>
                        {med.instructions && (
                          <div className="text-[11px] text-slate-500 italic">
                            Note: {med.instructions}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {rx.generalAdvice && (
                  <div className="text-xs bg-amber-50 text-amber-900 p-2.5 rounded-xl border border-amber-200">
                    <strong>Doctor's Advice:</strong> {rx.generalAdvice}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONSULTATIONS HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Past Hospital Consultations</h3>
            <span className="text-xs text-slate-500">Longitudinal Record</span>
          </div>

          <div className="space-y-3">
            {[
              {
                date: '12 Aug 2026',
                doctor: 'Dr. S. K. Mehta (Cardiologist)',
                department: 'Cardiology OPD',
                diagnosis: 'Essential Hypertension, Type 2 DM follow-up',
                summary: 'Blood pressure elevated at 150/95 mmHg. Added Amlodipine 5mg. Advised low salt diet.',
              },
              {
                date: '20 Nov 2025',
                doctor: 'Dr. Priya Nair (Endocrinologist)',
                department: 'Diabetology OPD',
                diagnosis: 'Uncontrolled Type 2 Diabetes Mellitus (HbA1c 8.2%)',
                summary: 'Reviewed diet and Metformin compliance. Advised brisk walking 30 mins daily.',
              },
              {
                date: '14 May 2024',
                doctor: 'Dr. R. Verma (General Physician)',
                department: 'Internal Medicine OPD',
                diagnosis: 'New onset Hyperglycemia',
                summary: 'Initial screening during community camp. Recommended formal fasting lipid & sugar tests.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {item.date}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{item.department}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.doctor}</h4>
                <p className="text-xs font-semibold text-rose-700">Diagnosis: {item.diagnosis}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REPORTS & SCANS */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Medical Reports & Diagnostic Scans</h3>
            <span className="text-xs text-slate-500">{patient.documents.length} verified documents</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {patient.documents.map((doc) => (
              <div key={doc.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                      {doc.type}
                    </span>
                    <span className="text-xs text-slate-500">{doc.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{doc.title}</h4>
                  <p className="text-xs text-slate-600">{doc.facility}</p>

                  {doc.clinicalImpression && (
                    <div className="text-xs bg-slate-50 p-2 rounded-xl text-slate-700 border border-slate-200">
                      <strong>Summary:</strong> {doc.clinicalImpression}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectDocument(doc.id)}
                    className="flex-1 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-teal-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Inspect OCR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PRIVACY & ABDM */}
      {activeTab === 'privacy' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" />
              <span>ABDM Health Data Consent & Privacy</span>
            </h3>
            <p className="text-xs text-slate-500">
              National Digital Health Mission (NDHM) & Ayushman Bharat Privacy Controls
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block text-sm">Consent Granted for OPD Consultation</strong>
                <p className="text-emerald-800 mt-0.5">
                  Your clinical intake and uploaded lab reports are accessible only to the attending physician ({patient.assignedDoctor}) for the duration of this OPD session.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800">Your Data Protection Rights:</span>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Data is 256-bit encrypted in transit and at rest.</li>
                <li>AI processing is restricted to clinical synthesis and does not retain training data.</li>
                <li>You can revoke hospital access to past records at any time from your ABHA App.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
