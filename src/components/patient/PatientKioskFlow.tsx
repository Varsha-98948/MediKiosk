'use client';

import React, { useState } from 'react';
import { 
  HeartPulse, 
  ArrowRight, 
  ArrowLeft, 
  Globe, 
  AlertTriangle, 
  Ticket, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  User, 
  ShieldCheck, 
  Activity, 
  FileText, 
  Video, 
  Hand, 
  Mic, 
  Languages,
  RotateCcw,
  Check,
  Stethoscope,
  Phone,
  Printer
} from 'lucide-react';
import { Language, PatientRecord, HospitalToken, Gender } from '../../types';
import { MarmaBodyMap, MarmaPoint, PainType } from '../common/MarmaBodyMap';
import { AdaptiveAiInterview, AiInterviewAnswer } from './AdaptiveAiInterview';
import { AccessibilityBiometricsPanel } from './AccessibilityBiometricsPanel';
import { speakText } from '../../utils/speech';

interface PatientKioskFlowProps {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onTokenGenerated: (token: HospitalToken) => void;
  onSwitchToDoctor: () => void;
  onEmergencyAlert: () => void;
}

export type KioskStep = 
  | 'welcome'
  | 'basic_details'
  | 'symptoms'
  | 'body_map'
  | 'adaptive_questions'
  | 'health_history'
  | 'review'
  | 'token_pass';

export const PatientKioskFlow: React.FC<PatientKioskFlowProps> = ({
  language,
  onSelectLanguage,
  onTokenGenerated,
  onSwitchToDoctor,
  onEmergencyAlert,
}) => {
  const [currentStep, setCurrentStep] = useState<KioskStep>('welcome');
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Patient Intake State
  const [patientName, setPatientName] = useState('Devendra Patel');
  const [age, setAge] = useState(54);
  const [gender, setGender] = useState<Gender>('male');
  const [phone, setPhone] = useState('9820194821');
  const [abhaId, setAbhaId] = useState('91-8472-1049-2819');
  const [primarySymptom, setPrimarySymptom] = useState('Chest Heaviness & Left Arm Ache');
  const [selectedMarma, setSelectedMarma] = useState<MarmaPoint | null>(null);
  const [painScore, setPainScore] = useState(7);
  const [painType, setPainType] = useState<PainType>('throbbing');
  const [hasRadiation, setHasRadiation] = useState(true);
  const [interviewAnswers, setInterviewAnswers] = useState<AiInterviewAnswer[]>([]);
  const [pastHistory, setPastHistory] = useState<string[]>(['Hypertension (5 years)', 'Type 2 Diabetes Mellitus']);
  const [vitals, setVitals] = useState({ rhr: 76, stress: 45, signal: 98 });
  const [generatedTokenNumber, setGeneratedTokenNumber] = useState('A-128');

  const stepsList: { key: KioskStep; label: string }[] = [
    { key: 'welcome', label: 'Welcome' },
    { key: 'basic_details', label: 'Basic Details' },
    { key: 'symptoms', label: 'Symptoms' },
    { key: 'body_map', label: 'Body Map' },
    { key: 'adaptive_questions', label: 'Questions' },
    { key: 'health_history', label: 'History' },
    { key: 'review', label: 'Review' },
    { key: 'token_pass', label: 'Token' },
  ];

  const currentStepIndex = stepsList.findIndex(s => s.key === currentStep);

  const supportedLanguages: { code: Language; name: string; native: string }[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
  ];

  const handleFinishAndGenerateToken = () => {
    const newToken: HospitalToken = {
      tokenNumber: generatedTokenNumber,
      departmentId: selectedMarma?.region === 'chest' ? 'cardiology' : 'gen_med',
      departmentName: selectedMarma?.region === 'chest' ? 'Cardiology & Heart Center' : 'General Medicine & Ayush',
      doctorName: selectedMarma?.region === 'chest' ? 'Dr. Rajeshwar Sen' : 'Dr. Ananya Sharma',
      roomNumber: selectedMarma?.region === 'chest' ? 'Room 104 (OPD Block A)' : 'Room 101 (OPD Block A)',
      patientId: `pat-${Date.now().toString().slice(-4)}`,
      patientName: patientName,
      phone: phone,
      abhaId: abhaId,
      age: age,
      gender: gender,
      reasonForVisit: primarySymptom,
      generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'waiting',
      patientsAhead: 3,
      estimatedWaitMins: 15,
      intakeCompleted: true,
      isEmergency: painScore >= 9,
    };

    onTokenGenerated(newToken);
    setCurrentStep('token_pass');

    const welcomeAnnouncement = `Your consultation token is ${generatedTokenNumber}. Please proceed to ${newToken.roomNumber}.`;
    speakText(welcomeAnnouncement, language);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-['Outfit']">
      
      {/* Top Kiosk Header: Emergency, Language, Accessibility */}
      <div className="bg-white p-4 rounded-2xl border-2 border-stone-300 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#144A38] text-white flex items-center justify-center font-bold border border-[#0E3B2C]">
            <HeartPulse className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-base">MediKiosk Station #01</span>
              <span className="text-[10px] font-bold bg-[#EAF2EC] text-[#144A38] px-2.5 py-0.5 rounded-md border border-[#C8DCD0]">
                Ayush OPD Triage
              </span>
            </div>
            <p className="text-xs text-stone-600 font-medium">
              Touch, Voice & Indian Sign Language Enabled
            </p>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2">
          {/* Accessibility Drawer Toggle */}
          <button
            type="button"
            onClick={() => setShowAccessibility(!showAccessibility)}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-stone-300 btn-tactile"
          >
            <Activity className="w-4 h-4 text-[#144A38]" />
            <span className="hidden sm:inline">Accessibility & Vitals</span>
          </button>

          {/* Multilingual Selector */}
          <button
            type="button"
            onClick={() => setShowLanguageModal(!showLanguageModal)}
            className="px-3.5 py-2 bg-[#EAF2EC] hover:bg-[#D4E8DC] text-[#144A38] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border-2 border-[#144A38] btn-tactile"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{language}</span>
          </button>

          {/* Red Flag Emergency Button */}
          <button
            type="button"
            onClick={onEmergencyAlert}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-2 border-red-700 flex items-center gap-1.5 btn-tactile"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency Help</span>
          </button>
        </div>
      </div>

      {/* Accessibility Drawer Modal */}
      {showAccessibility && (
        <AccessibilityBiometricsPanel
          language={language}
          onClose={() => setShowAccessibility(false)}
          onApplyBiometrics={(b) => setVitals({ rhr: b.rhr, stress: b.stressScore, signal: b.signalQuality })}
        />
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="bg-white p-5 rounded-2xl border-2 border-stone-400 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900">Select Kiosk Display & Voice Language</span>
            <button
              type="button"
              onClick={() => setShowLanguageModal(false)}
              className="text-xs text-stone-500 font-bold hover:text-stone-900"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onSelectLanguage(lang.code);
                  setShowLanguageModal(false);
                }}
                className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer btn-tactile ${
                  language === lang.code
                    ? 'bg-[#144A38] text-white font-bold border-[#0E3B2C]'
                    : 'bg-white text-stone-800 hover:bg-stone-50 border-stone-300'
                }`}
              >
                <div className="text-sm font-bold">{lang.native}</div>
                <div className="text-[10px] opacity-80">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stepped Progress Bar */}
      {currentStep !== 'welcome' && currentStep !== 'token_pass' && (
        <div className="bg-white p-4 rounded-xl border-2 border-stone-300 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-600">
            <span className="text-[#144A38] font-bold">
              Step {currentStepIndex} of {stepsList.length - 2}: {stepsList[currentStepIndex].label}
            </span>
            <span>{Math.round(((currentStepIndex) / (stepsList.length - 2)) * 100)}% Completed</span>
          </div>
          <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#144A38] h-full transition-all duration-200 rounded-full"
              style={{ width: `${((currentStepIndex) / (stepsList.length - 2)) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. STEP: WELCOME SCREEN (Home Screen with Very Large Obvious Actions) */}
      {/* ========================================================================= */}
      {currentStep === 'welcome' && (
        <div className="bg-white rounded-2xl border-2 border-stone-300 p-8 sm:p-12 space-y-10 text-center">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#144A38] text-white flex items-center justify-center mx-auto border-2 border-[#0E3B2C]">
              <HeartPulse className="w-8 h-8 text-emerald-300" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Welcome to MediKiosk
            </h2>
            <p className="text-base text-stone-600 font-medium leading-relaxed">
              AI-Powered Patient Intake & Ayush Triage System. <br className="hidden sm:inline" />
              Please select an action below to begin.
            </p>
          </div>

          {/* 4 Very Large Obvious Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            
            {/* Action 1: Start Consultation */}
            <button
              type="button"
              onClick={() => setCurrentStep('basic_details')}
              className="p-6 rounded-2xl bg-[#144A38] hover:bg-[#0E3B2C] text-white transition-all border-2 border-[#0E3B2C] cursor-pointer flex flex-col items-center justify-center space-y-3 group btn-tactile"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-emerald-300" />
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold">Start Consultation</div>
                <div className="text-xs text-emerald-100 font-medium">New visit check-in & symptoms</div>
              </div>
            </button>

            {/* Action 2: Check Token */}
            <button
              type="button"
              onClick={() => {
                alert('Current live serving token: A-121 (Room 101). Your token A-128 is 7 patients away.');
              }}
              className="p-6 rounded-2xl bg-white hover:bg-stone-50 border-2 border-stone-300 hover:border-[#144A38] text-stone-900 transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 group btn-tactile"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF2EC] flex items-center justify-center text-[#144A38]">
                <Ticket className="w-7 h-7 text-[#144A38]" />
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold">Check Token</div>
                <div className="text-xs text-stone-600 font-medium">Verify queue & waiting status</div>
              </div>
            </button>

            {/* Action 3: Emergency Help */}
            <button
              type="button"
              onClick={onEmergencyAlert}
              className="p-6 rounded-2xl bg-red-50 hover:bg-red-100 border-2 border-red-600 text-red-900 transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 group btn-tactile"
            >
              <div className="w-12 h-12 rounded-xl bg-red-200/60 flex items-center justify-center text-red-700">
                <AlertTriangle className="w-7 h-7 text-red-700" />
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold text-red-800">Emergency Help</div>
                <div className="text-xs text-red-700 font-medium">Severe chest distress or fainting</div>
              </div>
            </button>

            {/* Action 4: Language & Accessibility */}
            <button
              type="button"
              onClick={() => setShowLanguageModal(true)}
              className="p-6 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-500 text-amber-950 transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 group btn-tactile"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-200/60 flex items-center justify-center text-amber-800">
                <Languages className="w-7 h-7 text-amber-800" />
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold text-amber-950">भाषा / Language</div>
                <div className="text-xs text-amber-800 font-medium">English • हिन्दी • मराठी</div>
              </div>
            </button>

          </div>

          {/* Supported Interaction Modalities Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5"><Hand className="w-4 h-4 text-[#0D5C4D]" /> Touch Screen</span>
            <span className="flex items-center gap-1.5"><Mic className="w-4 h-4 text-[#0D5C4D]" /> Voice Audio In/Out</span>
            <span className="flex items-center gap-1.5"><Video className="w-4 h-4 text-[#0D5C4D]" /> Indian Sign Language (ISL)</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> ABDM Level-3</span>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. STEP: BASIC DETAILS & ABHA SCAN */}
      {/* ========================================================================= */}
      {currentStep === 'basic_details' && (
        <div className="bg-white rounded-2xl border-2 border-stone-300 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900">Step 1: Patient Basic Details</h3>
            <p className="text-xs text-slate-500">
              Verify your identity or scan your Ayushman Bharat Health Account (ABHA) QR card.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Full Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAFBF9] rounded-xl border border-slate-300 font-bold text-sm text-slate-900 focus:border-[#0D5C4D] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Mobile Number (WhatsApp Enabled)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAFBF9] rounded-xl border border-slate-300 font-bold text-sm text-slate-900 focus:border-[#0D5C4D] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Age (Years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#FAFBF9] rounded-xl border border-slate-300 font-bold text-sm text-slate-900 focus:border-[#0D5C4D] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {(['male', 'female', 'other'] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-3 rounded-xl border text-xs font-black capitalize transition-all cursor-pointer ${
                      gender === g
                        ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-2xs'
                        : 'bg-[#FAFBF9] border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700">ABHA Health ID (Ayushman Bharat)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#FAFBF9] rounded-xl border border-slate-300 font-bold text-sm text-slate-900 focus:border-[#0D5C4D] outline-none"
                />
                <button
                  type="button"
                  onClick={() => alert('Camera scanner opened for ABHA QR Code.')}
                  className="px-4 py-3 bg-[#EBF3EF] border border-[#D1E4DB] text-[#0D5C4D] rounded-xl text-xs font-black cursor-pointer"
                >
                  Scan QR
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep('welcome')}
              className="px-5 py-3 text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep('symptoms')}
              className="px-7 py-3.5 bg-[#0D5C4D] text-white rounded-2xl text-xs font-black hover:bg-[#0F4C42] transition-all cursor-pointer shadow-xs flex items-center gap-2"
            >
              <span>Next: Chief Symptoms</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. STEP: SYMPTOMS SELECTION */}
      {/* ========================================================================= */}
      {currentStep === 'symptoms' && (
        <div className="bg-white rounded-2xl border-2 border-stone-300 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900">Step 2: Primary Complaint</h3>
            <p className="text-xs text-slate-500">
              Select what is troubling you or tap to enter specific symptoms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Chest Discomfort / Heart Pressure',
              'Severe Knee / Joint Pain with Morning Stiffness',
              'Chronic Acidity / Epigastric Burning (Amlapitta)',
              'Throbbing Headache / Migraine (Siras-Shula)',
              'Sciatica / Lower Back Pain (Gridhrasi)',
              'Respiratory Wheezing / Cough (Kasa / Shwasa)'
            ].map((symptom, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrimarySymptom(symptom)}
                className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-between ${
                  primarySymptom === symptom
                    ? 'bg-[#EBF3EF] border-[#0D5C4D] text-[#0D5C4D] shadow-xs'
                    : 'bg-[#FAFBF9] border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>{symptom}</span>
                {primarySymptom === symptom && <Check className="w-4 h-4 text-[#0D5C4D]" />}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep('basic_details')}
              className="px-5 py-3 text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep('body_map')}
              className="px-7 py-3.5 bg-[#0D5C4D] text-white rounded-2xl text-xs font-black hover:bg-[#0F4C42] transition-all cursor-pointer shadow-xs flex items-center gap-2"
            >
              <span>Next: 2D Marma Body Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. STEP: INTERACTIVE MARMA BODY MAP */}
      {/* ========================================================================= */}
      {currentStep === 'body_map' && (
        <div className="space-y-4">
          <MarmaBodyMap
            language={language}
            selectedPointId={selectedMarma?.id || 'hridaya_chest'}
            onSelectPoint={(point, intensity, type, radiation) => {
              setSelectedMarma(point);
              setPainScore(intensity);
              setPainType(type);
              setHasRadiation(radiation);
            }}
          />

          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setCurrentStep('symptoms')}
              className="px-5 py-3 text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer"
            >
              Back to Symptoms
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep('adaptive_questions')}
              className="px-7 py-3.5 bg-[#0D5C4D] text-white rounded-2xl text-xs font-black hover:bg-[#0F4C42] transition-all cursor-pointer shadow-xs flex items-center gap-2"
            >
              <span>Confirm Pain Location & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. STEP: ADAPTIVE AI INTERVIEW */}
      {/* ========================================================================= */}
      {currentStep === 'adaptive_questions' && (
        <AdaptiveAiInterview
          language={language}
          initialComplaint={primarySymptom}
          selectedMarma={selectedMarma?.name}
          onBack={() => setCurrentStep('body_map')}
          onCompleteInterview={(ans) => {
            setInterviewAnswers(ans);
            setCurrentStep('health_history');
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* 6. STEP: HEALTH HISTORY & PREVIOUS MEDS */}
      {/* ========================================================================= */}
      {currentStep === 'health_history' && (
        <div className="bg-white rounded-2xl border-2 border-stone-300 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-stone-900">Step 5: Previous Health History</h3>
            <p className="text-xs text-stone-500">
              Select existing conditions and current medications you are taking.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-700">Existing Conditions:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Hypertension (BP)',
                'Type 2 Diabetes',
                'High Cholesterol',
                'Asthma / Bronchitis',
                'Thyroid Imbalance',
                'Hyperacidity / GERD'
              ].map((cond, idx) => {
                const isSelected = pastHistory.includes(cond);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (isSelected) setPastHistory(prev => prev.filter(c => c !== cond));
                      else setPastHistory(prev => [...prev, cond]);
                    }}
                    className={`p-3 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer text-left btn-tactile ${
                      isSelected
                        ? 'bg-[#EAF2EC] border-[#144A38] text-[#144A38]'
                        : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {cond}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={() => setCurrentStep('adaptive_questions')}
              className="px-5 py-2.5 text-stone-600 hover:text-stone-900 text-xs font-bold cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep('review')}
              className="px-6 py-3 bg-[#144A38] text-white rounded-xl text-xs font-bold hover:bg-[#0E3B2C] border-2 border-[#0E3B2C] transition-all cursor-pointer flex items-center gap-2 btn-tactile"
            >
              <span>Next: Review & Generate Token</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. STEP: REVIEW SUMMARY */}
      {/* ========================================================================= */}
      {currentStep === 'review' && (
        <div className="bg-white rounded-2xl border-2 border-stone-300 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-stone-900">Step 6: Review Case Sheet Summary</h3>
            <p className="text-xs text-stone-500">
              Please confirm your details before generating your hospital OPD token.
            </p>
          </div>

          <div className="bg-[#F9F9F6] p-5 rounded-xl border-2 border-stone-200 space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-3 border-b border-stone-200">
              <div>
                <span className="text-stone-500">Patient Name</span>
                <div className="font-bold text-stone-900 text-sm">{patientName}</div>
              </div>
              <div>
                <span className="text-stone-500">Age / Gender</span>
                <div className="font-bold text-stone-900 text-sm">{age} yrs / {gender}</div>
              </div>
              <div>
                <span className="text-stone-500">ABHA ID</span>
                <div className="font-bold text-stone-900 text-sm">{abhaId}</div>
              </div>
              <div>
                <span className="text-stone-500">Phone</span>
                <div className="font-bold text-stone-900 text-sm">{phone}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-[#144A38] uppercase tracking-wider block mb-1">
                  Primary Complaint & Marma Epicenter:
                </span>
                <div className="font-bold text-stone-800">{primarySymptom}</div>
                <div className="text-stone-500 mt-0.5">
                  Point: {selectedMarma?.name || 'Hridaya Marma'} • Severity: {painScore}/10 ({painType})
                </div>
              </div>

              <div>
                <span className="font-bold text-[#144A38] uppercase tracking-wider block mb-1">
                  Vitals & Optical Biometrics:
                </span>
                <div className="font-bold text-stone-800">
                  Resting HR: {vitals.rhr} BPM • Stress Score: {vitals.stress}/100
                </div>
                <div className="text-stone-500 mt-0.5">
                  Signal Quality: {vitals.signal}% • Optical contact verified
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={() => setCurrentStep('health_history')}
              className="px-5 py-2.5 text-stone-600 hover:text-stone-900 text-xs font-bold cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleFinishAndGenerateToken}
              className="px-7 py-3.5 bg-[#144A38] hover:bg-[#0E3B2C] text-white border-2 border-[#0E3B2C] rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 btn-tactile"
            >
              <Ticket className="w-5 h-5 text-emerald-300" />
              <span>Issue Digital OPD Token Pass</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. STEP: DIGITAL TOKEN PASS CONFIRMATION */}
      {/* ========================================================================= */}
      {currentStep === 'token_pass' && (
        <div className="bg-white rounded-2xl border-2 border-stone-300 p-8 sm:p-10 space-y-6 text-center max-w-xl mx-auto">
          
          <div className="w-16 h-16 rounded-full bg-[#EAF2EC] text-[#144A38] flex items-center justify-center mx-auto border-2 border-[#144A38]">
            <CheckCircle2 className="w-10 h-10 text-[#144A38]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              OPD Consultation Token Issued
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold text-[#144A38] font-mono tracking-tight">
              {generatedTokenNumber}
            </div>
            <div className="text-sm font-bold text-stone-800 mt-1">
              {patientName} • Assigned to <strong>Dr. Rajeshwar Sen</strong>
            </div>
            <div className="text-xs text-stone-500 font-medium">
              Room 104 (OPD Block A) • Estimated Wait: 15 mins (3 patients ahead)
            </div>
          </div>

          <div className="p-4 bg-[#F9F9F6] rounded-xl border-2 border-stone-200 text-xs text-stone-600 space-y-1">
            <div>Case sheet and Marma map have been synced to the <strong>Doctor Glassbox View</strong>.</div>
            <div className="text-[11px] text-stone-400">Your token will be announced on the waiting hall signage.</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-3 bg-white border-2 border-stone-300 text-stone-800 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-2 hover:bg-stone-50 btn-tactile"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>Print Slip</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToDoctor}
              className="px-6 py-3 bg-[#144A38] hover:bg-[#0E3B2C] text-white border-2 border-[#0E3B2C] rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-2 btn-tactile"
            >
              <Stethoscope className="w-4 h-4 text-emerald-300" />
              <span>Switch to Doctor Glassbox View</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setCurrentStep('welcome')}
            className="text-xs font-bold text-stone-500 hover:text-stone-900 cursor-pointer pt-2 block mx-auto"
          >
            ← Return to Kiosk Standby
          </button>

        </div>
      )}

    </div>
  );
};
