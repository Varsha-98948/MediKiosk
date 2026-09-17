import React from 'react';
import { 
  Volume2, 
  ArrowLeft, 
  Printer, 
  QrCode, 
  Clock, 
  MapPin, 
  Stethoscope, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FilePlus, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Language, PatientRecord } from '../../types';
import { translations } from '../../utils/translations';
import { speakText } from '../../utils/speech';

interface ReviewSummaryScreenProps {
  language: Language;
  patient: PatientRecord;
  onPrintToken: () => void;
  onAddMoreDocuments: () => void;
  onSwitchToDoctor: () => void;
  onBackToHome: () => void;
}

export const ReviewSummaryScreen: React.FC<ReviewSummaryScreenProps> = ({
  language,
  patient,
  onPrintToken,
  onAddMoreDocuments,
  onSwitchToDoctor,
  onBackToHome,
}) => {
  const t = translations[language];

  const handleListen = () => {
    const text = language === 'hi'
      ? `आपका टोकन नंबर ${patient.tokenNumber} तैयार है। कृपया कमरा नंबर ${patient.roomNumber} के बाहर प्रतीक्षा करें। डॉक्टर आपका रिकॉर्ड देख सकते हैं।`
      : language === 'mr'
      ? `तुमचा टोकन क्रमांक ${patient.tokenNumber} तयार आहे. कृपया खोली क्र. ${patient.roomNumber} बाहेर थांबा. डॉक्टर तुमची माहिती तपासत आहेत.`
      : `Your token number is ${patient.tokenNumber}. Please wait outside Room ${patient.roomNumber}. Your doctor can now access your pre-consultation summary.`;
    speakText(text, language);
  };

  return (
    <div className="flex flex-col justify-between min-h-[640px] p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kiosk Home</span>
        </button>

        <button
          type="button"
          onClick={handleListen}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200"
        >
          <Volume2 className="w-4 h-4 text-teal-600" />
          <span>{t.listen}</span>
        </button>
      </div>

      {/* Main Check-In Confirmation Pass */}
      <div className="bg-white rounded-3xl border-2 border-teal-600 shadow-xl overflow-hidden print:shadow-none">
        
        {/* Token Header Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Intake Complete & Synced to EMR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
              {patient.name}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 mt-1">
              ABHA: <span className="font-mono font-bold text-white">{patient.abhaId}</span> • {patient.age}y / {patient.gender}
            </p>
          </div>

          {/* Large Token Badge */}
          <div className="bg-white text-slate-900 px-6 py-4 rounded-2xl shadow-lg border-2 border-teal-200 text-center shrink-0">
            <span className="text-[11px] font-extrabold uppercase text-teal-800 tracking-wider block">
              OPD Token
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-teal-900 font-mono">
              {patient.tokenNumber}
            </span>
          </div>
        </div>

        {/* Clinical Queue & Doctor Assigned Box */}
        <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Consultation Room */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Room Number</span>
                <span className="text-base font-extrabold text-slate-900">{patient.roomNumber}</span>
              </div>
            </div>

            {/* Consulting Doctor */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Consultant</span>
                <span className="text-sm font-bold text-slate-900 line-clamp-1">{patient.assignedDoctor}</span>
              </div>
            </div>

            {/* Approx Wait Time */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Approx Wait</span>
                <span className="text-base font-extrabold text-amber-700">{patient.estimatedWaitMinutes} Mins</span>
              </div>
            </div>

          </div>

          {/* Recorded Clinical Snapshot for Patient Assurance */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Intake Recorded for Doctor's Screen
              </span>
              {patient.priority === 'urgent' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Priority Triage Flag
                </span>
              )}
            </div>

            <div className="text-sm text-slate-800 space-y-1.5">
              <p><strong>Chief Complaint:</strong> {patient.intakeSummary.chiefComplaint}</p>
              <p><strong>Pain Rating:</strong> {patient.intakeSummary.painScore}/10 (Character: {patient.intakeSummary.character || 'Heavy / Pressure'})</p>
              <p><strong>Associated:</strong> {patient.intakeSummary.associatedSymptoms.join(', ')}</p>
              <p><strong>Attached Documents:</strong> {patient.documents.length} papers scanned & indexed</p>
            </div>
          </div>

          {/* Print & Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              id="btn-print-token"
              onClick={onPrintToken}
              className="flex-1 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printSummary}</span>
            </button>

            <button
              type="button"
              onClick={onAddMoreDocuments}
              className="flex-1 py-3.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <FilePlus className="w-4 h-4 text-teal-600" />
              <span>Add Another Paper</span>
            </button>
          </div>

        </div>

      </div>

      {/* Switch to Doctor EMR Demo Button */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-2xl border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Experience Doctor's Side Now</h4>
            <p className="text-xs text-slate-600">See how this patient's intake appears instantly on the Doctor EMR dashboard.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSwitchToDoctor}
          className="w-full sm:w-auto px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <span>Open Doctor EMR</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
