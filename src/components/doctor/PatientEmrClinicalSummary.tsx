import React, { useState } from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  Edit3, 
  FileText, 
  ExternalLink, 
  Pill, 
  Activity, 
  Layers, 
  Clock, 
  ArrowRight,
  Printer,
  PlusCircle,
  Copy,
  Share2,
  Globe,
  AlertCircle,
  Code,
  X,
  Download
} from 'lucide-react';
import { PatientRecord, MedicalDocument } from '../../types';
import { BodyDiagram } from '../common/BodyDiagram';
import { generateFhirBundle } from '../../utils/fhirUtils';

interface PatientEmrClinicalSummaryProps {
  patient: PatientRecord;
  onOpenPrescriptionBuilder: () => void;
  onOpenDocumentAudit: (docId: string) => void;
  onOpenAyushModule: () => void;
  onOpenLongitudinalTimeline: () => void;
  onOpenInvestigationOrders: () => void;
  onOpenVoiceScribe: () => void;
}

export const PatientEmrClinicalSummary: React.FC<PatientEmrClinicalSummaryProps> = ({
  patient,
  onOpenPrescriptionBuilder,
  onOpenDocumentAudit,
  onOpenAyushModule,
  onOpenLongitudinalTimeline,
  onOpenInvestigationOrders,
  onOpenVoiceScribe,
}) => {
  const [isEditingSoap, setIsEditingSoap] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [showFhirModal, setShowFhirModal] = useState(false);
  const [fhirCopied, setFhirCopied] = useState(false);

  const [doctorNotes, setDoctorNotes] = useState({
    subjective: `Patient presents with acute left-sided chest tightness for 2 days, radiating to left arm and jaw. Aggravated by walking up stairs, associated with diaphoresis and mild shortness of breath. No relief with antacids.`,
    objective: `BP: 150/95 mmHg | Pulse: 88 bpm | SpO2: 97% on room air. Known T2DM on Metformin 500mg BD. Recent HbA1c 7.1%, Fasting Blood Sugar 126 mg/dL. ECG (Aug 2026): Normal Sinus Rhythm.`,
    assessment: `1. Suspected Angina Pectoris / Acute Coronary Syndrome (ACS Rule Out)\n2. Essential Hypertension (Sub-optimally controlled)\n3. Type 2 Diabetes Mellitus (Fair glycemic control)`,
    plan: `1. Stat 12-Lead ECG + Serum Troponin-I stat\n2. Sublingual Sorbitrate 5mg SOS for severe angina\n3. Titrate antihypertensive / Initiate Statin + Antiplatelet therapy\n4. Urgent Cardiology 2D-ECHO evaluation`,
  });

  const fhirBundleJson = JSON.stringify(generateFhirBundle(patient), null, 2);

  const handleCopySoap = () => {
    const text = `PATIENT: ${patient.name} (${patient.age}y/${patient.gender}) | ABHA: ${patient.abhaId}\n\n[S - SUBJECTIVE]\n${doctorNotes.subjective}\n\n[O - OBJECTIVE]\n${doctorNotes.objective}\n\n[A - ASSESSMENT]\n${doctorNotes.assessment}\n\n[P - PLAN]\n${doctorNotes.plan}`;
    navigator.clipboard?.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleCopyFhir = () => {
    navigator.clipboard?.writeText(fhirBundleJson);
    setFhirCopied(true);
    setTimeout(() => setFhirCopied(false), 2000);
  };

  const isUrgent = patient.priority === 'urgent';

  return (
    <div className="space-y-6 font-['Inter']">
      
      {/* Patient Banner & Triage Header */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono text-white shrink-0 ${
            isUrgent ? 'bg-rose-700' : 'bg-slate-900'
          }`}>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Token</span>
            <span className="text-xl font-extrabold">{patient.tokenNumber}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {patient.name}
              </h2>
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {patient.age}y / {patient.gender === 'male' ? 'Male' : patient.gender === 'female' ? 'Female' : 'Other'}
              </span>
              <span className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                ABHA: <strong className="text-slate-900 font-bold">{patient.abhaId}</strong>
              </span>
              {isUrgent && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> High Priority Red Flag
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Contact: {patient.phone} • Check-in: {patient.intakeTime} • Room {patient.roomNumber}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShowFhirModal(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-teal-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-800"
          >
            <Code className="w-3.5 h-3.5 text-teal-400" />
            <span>Export ABDM FHIR R4</span>
          </button>

          <button
            type="button"
            onClick={onOpenVoiceScribe}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
          >
            <Activity className="w-3.5 h-3.5 text-teal-700" />
            <span>Voice Dictation</span>
          </button>

          <button
            type="button"
            onClick={onOpenPrescriptionBuilder}
            className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Prescription Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Triage Alert Banner */}
      {isUrgent && (
        <div className="bg-rose-50/80 border border-rose-200 p-4 rounded-xl flex items-start gap-3 text-rose-950">
          <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="text-sm font-bold text-rose-900">
              Triage Alert: Suspected Ischemic Chest Pain / Exertional Angina
            </h4>
            <p className="text-slate-700 font-medium">
              Patient endorsed retrosternal heaviness radiating to left arm with exertional diaphoresis and breathlessness. Recommending priority stat ECG and Cardiac Biomarkers.
            </p>
          </div>
        </div>
      )}

      {/* Clinical Intake Synthesis Card */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 space-y-6">
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-950 text-teal-400 flex items-center justify-center border border-teal-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">
                  Clinical Intake Summary
                </h3>
                <span className="text-[11px] font-mono font-medium bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800">
                  Verified Intake • 98% OCR Match
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Structured Multilingual Voice Intake & Optical Document Audit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySoap}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-teal-400" />
              <span>{copiedNotification ? 'Copied' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        {/* 4-Box Synthesis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Chief Complaint & Character */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-teal-400 tracking-wide">
              1. Chief Complaint
            </h4>
            <div className="text-sm font-semibold text-white leading-snug">
              {patient.intakeSummary.chiefComplaint}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Pain Score: <strong className="text-rose-400 font-mono">{patient.intakeSummary.painScore}/10 ({patient.intakeSummary.character})</strong>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Duration: {patient.intakeSummary.duration}
            </div>
          </div>

          {/* 2. Radiation & Associated Signs */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-teal-400 tracking-wide">
              2. Radiation & Associated
            </h4>
            <div className="text-xs text-slate-200 space-y-1 font-medium">
              <div>Radiation: <strong className="text-amber-300 font-mono">{patient.intakeSummary.radiation.join(', ')}</strong></div>
              <div>Associated: <span className="text-slate-300">{patient.intakeSummary.associatedSymptoms.join(', ')}</span></div>
            </div>
          </div>

          {/* 3. Chronic Comorbidities & Allergies */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-teal-400 tracking-wide">
              3. Comorbidities & Allergies
            </h4>
            <div className="space-y-1 text-xs font-medium">
              {patient.pastMedicalHistory.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  <span>{h}</span>
                </div>
              ))}
              <div className="text-rose-400 pt-1 text-[11px] font-semibold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>Allergies: {patient.allergies?.join(', ') || 'No known drug allergies (NKDA)'}</span>
              </div>
            </div>
          </div>

          {/* 4. Latest Lab / Diagnostic Clues */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-teal-400 tracking-wide">
              4. Key Lab Parameters
            </h4>
            <div className="space-y-1 text-xs font-medium">
              <div className="flex justify-between text-slate-300">
                <span>HbA1c:</span>
                <strong className="text-amber-300 font-mono">7.1% (Aug 2026)</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>FBS:</span>
                <strong className="text-amber-300 font-mono">126 mg/dL</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>BP:</span>
                <strong className="text-rose-400 font-mono">150/95 mmHg</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Lineage Attribution */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Extracted with clinical OCR from 2 verified hospital documents.</span>
          </div>
          
          <button
            type="button"
            onClick={() => onOpenDocumentAudit(patient.documents[0]?.id || 'doc-001')}
            className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View Lineage Evidence</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side (4 Cols): Body Map, Prescriptions, Documents */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Pain Map */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Pain Location Map</h4>
              <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Severity: {patient.intakeSummary.painScore}/10
              </span>
            </div>

            <BodyDiagram
              selectedLocation={patient.intakeSummary.location || 'chest'}
              interactive={false}
            />

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1 font-medium">
              <div><strong>Radiation:</strong> {patient.intakeSummary.radiation.join(', ')}</div>
              <div><strong>Trigger:</strong> Physical exertion</div>
            </div>
          </div>

          {/* Prescription History */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-teal-800" />
                <h4 className="font-bold text-slate-900 text-sm">
                  Prescription Records ({patient.prescriptions?.length || 0})
                </h4>
              </div>
              <button
                type="button"
                onClick={onOpenLongitudinalTimeline}
                className="text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
              >
                View Details
              </button>
            </div>

            {patient.prescriptions && patient.prescriptions.length > 0 ? (
              <div className="space-y-2">
                {patient.prescriptions.slice(0, 2).map((rx) => (
                  <div key={rx.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{rx.date}</span>
                      <span className="text-[10px] font-mono bg-teal-50 text-teal-900 border border-teal-200 px-1.5 py-0.5 rounded uppercase">
                        {rx.language || 'en'}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] truncate font-medium">{rx.diagnosis}</p>
                    <p className="text-teal-800 text-[11px] font-mono font-semibold">
                      {rx.medicines.length} medications
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No previous prescription records logged.</p>
            )}

            <button
              type="button"
              onClick={onOpenPrescriptionBuilder}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
            >
              <Pill className="w-3.5 h-3.5 text-teal-800" />
              <span>Add New Prescription</span>
            </button>
          </div>

          {/* Attached Patient Documents */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Medical Papers ({patient.documents.length})</h4>
              <button
                type="button"
                onClick={onOpenLongitudinalTimeline}
                className="text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
              >
                Full Timeline
              </button>
            </div>

            <div className="space-y-2">
              {patient.documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => onOpenDocumentAudit(doc.id)}
                  className="p-3 bg-slate-50 hover:bg-teal-50/40 rounded-lg border border-slate-200 hover:border-teal-300 transition-all cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 group-hover:text-teal-950">{doc.title}</span>
                    <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                      {doc.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">{doc.facility}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-teal-800 font-semibold">
                    <span>{doc.extractedFields?.length || 0} fields extracted</span>
                    <span className="flex items-center gap-0.5 text-xs text-teal-700">Audit <ExternalLink className="w-3 h-3" /></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AYUSH Integration Box */}
          {patient.ayushAssessment && (
            <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  AYUSH Integration
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-950 font-bold px-2 py-0.5 rounded border border-emerald-200">
                  Prakriti: {patient.ayushAssessment.prakritiType}
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Pitta-Kapha dominance with Agni status: Mandagni. Patient taking Arjuna Kwatha.
              </p>
              <button
                type="button"
                onClick={onOpenAyushModule}
                className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Herb-Drug Interaction Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

        {/* Right Side (8 Cols): Physician SOAP Notes */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* SOAP Clinical Note Builder */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Physician Clinical Notes (SOAP Format)
                </h3>
                <p className="text-xs text-slate-500 font-medium">ABDM Electronic Medical Record standard</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingSoap(!isEditingSoap)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-200 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingSoap ? 'Lock View' : 'Edit SOAP'}</span>
                </button>
              </div>
            </div>

            {/* S - Subjective */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-teal-100 text-teal-950 flex items-center justify-center text-[10px] font-mono">S</span>
                <span>Subjective (Patient History & Complaints)</span>
              </h4>
              {isEditingSoap ? (
                <textarea
                  rows={3}
                  value={doctorNotes.subjective}
                  onChange={(e) => setDoctorNotes({ ...doctorNotes, subjective: e.target.value })}
                  className="w-full p-3 text-sm font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-800 leading-relaxed font-medium">
                  {doctorNotes.subjective}
                </div>
              )}
            </div>

            {/* O - Objective */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-teal-100 text-teal-950 flex items-center justify-center text-[10px] font-mono">O</span>
                <span>Objective (Vitals, Examination & Lab Findings)</span>
              </h4>
              {isEditingSoap ? (
                <textarea
                  rows={3}
                  value={doctorNotes.objective}
                  onChange={(e) => setDoctorNotes({ ...doctorNotes, objective: e.target.value })}
                  className="w-full p-3 text-sm font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-800 leading-relaxed font-medium">
                  {doctorNotes.objective}
                </div>
              )}
            </div>

            {/* A - Assessment */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-rose-100 text-rose-950 flex items-center justify-center text-[10px] font-mono">A</span>
                <span>Assessment & Differential Diagnosis</span>
              </h4>
              {isEditingSoap ? (
                <textarea
                  rows={3}
                  value={doctorNotes.assessment}
                  onChange={(e) => setDoctorNotes({ ...doctorNotes, assessment: e.target.value })}
                  className="w-full p-3 text-sm font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              ) : (
                <div className="p-3.5 bg-rose-50/60 rounded-lg border border-rose-200 text-sm text-rose-950 leading-relaxed font-semibold whitespace-pre-line">
                  {doctorNotes.assessment}
                </div>
              )}
            </div>

            {/* P - Plan */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-950 flex items-center justify-center text-[10px] font-mono">P</span>
                <span>Clinical Management Plan</span>
              </h4>
              {isEditingSoap ? (
                <textarea
                  rows={3}
                  value={doctorNotes.plan}
                  onChange={(e) => setDoctorNotes({ ...doctorNotes, plan: e.target.value })}
                  className="w-full p-3 text-sm font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              ) : (
                <div className="p-3.5 bg-emerald-50/60 rounded-lg border border-emerald-200 text-sm text-emerald-950 leading-relaxed font-medium whitespace-pre-line">
                  {doctorNotes.plan}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onOpenInvestigationOrders}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-teal-800" />
                <span>Order Labs & 12-Lead ECG</span>
              </button>

              <button
                type="button"
                onClick={onOpenPrescriptionBuilder}
                className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Pill className="w-4 h-4" />
                <span>Generate Digital Prescription (Rx)</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* FHIR R4 JSON Export Modal */}
      {showFhirModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-xl max-w-3xl w-full p-6 space-y-4 border border-slate-800 shadow-xl flex flex-col max-h-[85vh]">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-lg text-white">
                  ABDM FHIR R4 Interoperability Payload
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFhirModal(false)}
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 shrink-0 font-medium">
              This FHIR R4 Bundle complies with ABDM/NDHM health data exchange specifications and can be seamlessly pushed to AHMIS 2.0 or hospital EHR nodes.
            </p>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 overflow-y-auto font-mono text-xs text-emerald-400 flex-1 select-all">
              <pre className="whitespace-pre-wrap leading-relaxed">{fhirBundleJson}</pre>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 shrink-0">
              <span className="text-xs text-slate-400 font-mono">Profile: NRCES India FHIR R4</span>
              
              <button
                type="button"
                onClick={handleCopyFhir}
                className="px-4 py-2 bg-teal-800 hover:bg-teal-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{fhirCopied ? 'Copied' : 'Copy FHIR R4 JSON'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
