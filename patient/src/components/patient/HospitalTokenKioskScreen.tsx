'use client';

import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Ticket, 
  Stethoscope, 
  Bone, 
  Baby, 
  Ear, 
  Sparkles, 
  UserCheck, 
  Leaf, 
  ArrowRight, 
  ArrowLeft, 
  Volume2, 
  Globe, 
  ShieldCheck, 
  Clock, 
  Users, 
  MapPin, 
  QrCode, 
  Phone, 
  CreditCard, 
  UserPlus, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  RotateCcw,
  Activity,
  Bot
} from 'lucide-react';
import { Language, Gender, DepartmentId, DepartmentInfo, HospitalToken, QueueStatus } from '../../types';
import { mockDepartments } from '../../data/mockData';
import { speakText } from '../../utils/speech';

interface HospitalTokenKioskScreenProps {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onTokenGenerated: (token: HospitalToken) => void;
  onStartIntakeWithToken: (token: HospitalToken) => void;
  currentServingToken?: string;
}

export const HospitalTokenKioskScreen: React.FC<HospitalTokenKioskScreenProps> = ({
  language,
  onSelectLanguage,
  onTokenGenerated,
  onStartIntakeWithToken,
  currentServingToken = 'A-121',
}) => {
  // Step 0: Kiosk Home | Step 1: Select Dept | Step 2: Patient ID | Step 3: Reason for Visit | Step 4: Token Confirmation
  const [step, setStep] = useState<number>(0);
  
  // Selected Department
  const [selectedDept, setSelectedDept] = useState<DepartmentInfo>(mockDepartments[0]);
  
  // Patient details
  const [authMethod, setAuthMethod] = useState<'abha' | 'phone' | 'new' | 'fast'>('fast');
  const [patientName, setPatientName] = useState('Rahul Sharma');
  const [patientPhone, setPatientPhone] = useState('+91 98201 44521');
  const [patientAbha, setPatientAbha] = useState('91-4829-1029-4401');
  const [patientAge, setPatientAge] = useState<number>(48);
  const [patientGender, setPatientGender] = useState<Gender>('male');
  
  // Reason for Visit
  const [visitReason, setVisitReason] = useState<string>('Chest Pain & Discomfort');
  
  // Generated Token Result
  const [generatedToken, setGeneratedToken] = useState<HospitalToken | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const getDeptIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-8 h-8 text-rose-600" />;
      case 'Bone': return <Bone className="w-8 h-8 text-indigo-600" />;
      case 'Baby': return <Baby className="w-8 h-8 text-cyan-600" />;
      case 'Ear': return <Ear className="w-8 h-8 text-amber-600" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-purple-600" />;
      case 'UserCheck': return <UserCheck className="w-8 h-8 text-teal-600" />;
      case 'Leaf': return <Leaf className="w-8 h-8 text-emerald-600" />;
      default: return <Stethoscope className="w-8 h-8 text-teal-700" />;
    }
  };

  const commonReasons = [
    { id: 'fever', en: 'Fever / Cough / Cold', hi: 'बुखार / खांसी / जुकाम', mr: 'ताप / खोकला / सर्दी' },
    { id: 'chest_pain', en: 'Chest Pain / Heart Distress', hi: 'सीने में दर्द / बेचैनी', mr: 'छातीत दुखणे / अस्वस्थता', isUrgent: true },
    { id: 'stomach', en: 'Stomach Pain / Acidity / Nausea', hi: 'पेट दर्द / गैस / उल्टी', mr: 'पोटदुखी / ॲसिडिटी / मळमळ' },
    { id: 'joints', en: 'Joint Pain / Knee / Back', hi: 'जोड़ों व कमर का दर्द', mr: 'सांधेदुखी / कंबरदुखी' },
    { id: 'checkup', en: 'Routine Health Check-up', hi: 'नियमित स्वास्थ्य जांच', mr: 'नियमित आरोग्य तपासणी' },
    { id: 'refill', en: 'Prescription Refill / Follow-up', hi: 'पुरानी पर्ची / दवाइयां', mr: 'जुनी चिठ्ठी / औषधे' },
  ];

  const handleGenerateToken = () => {
    const randomNum = Math.floor(125 + Math.random() * 5);
    const code = selectedDept.code || 'A';
    const tokenNum = `${code}-${randomNum}`;
    
    const newToken: HospitalToken = {
      tokenNumber: tokenNum,
      departmentId: selectedDept.id,
      departmentName: selectedDept.name[language] || selectedDept.name.en,
      doctorName: selectedDept.doctor,
      roomNumber: selectedDept.room,
      patientId: `pat-${Date.now()}`,
      patientName: patientName,
      phone: patientPhone,
      abhaId: patientAbha,
      age: patientAge,
      gender: patientGender,
      reasonForVisit: visitReason,
      generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'waiting',
      patientsAhead: 5,
      estimatedWaitMins: selectedDept.currentWaitMins,
      intakeCompleted: false,
      isEmergency: visitReason.toLowerCase().includes('chest') || visitReason.toLowerCase().includes('heart'),
    };

    setGeneratedToken(newToken);
    onTokenGenerated(newToken);
    setStep(4);

    // Spoken Audio Announcement
    const tokenSpeech = language === 'hi'
      ? `आपका टोकन नंबर ${tokenNum} बन गया है। ${selectedDept.name.hi} विभाग में 5 मरीज आगे हैं।`
      : language === 'mr'
      ? `तुमचा टोकन क्रमांक ${tokenNum} तयार झाला आहे. ${selectedDept.name.mr} विभागात ५ रुग्ण पुढे आहेत.`
      : `Your token number is ${tokenNum}. Department: ${selectedDept.name.en}. 5 patients are ahead of you.`;
    speakText(tokenSpeech, language);
  };

  const handleAudioHelp = () => {
    setIsPlayingAudio(true);
    let prompt = '';
    if (step === 0) {
      prompt = language === 'hi' 
        ? 'मेडीकियोस्क में आपका स्वागत है। अस्पताल का डिजिटल टोकन लेने के लिए टोकन प्राप्त करें बटन दबाएं।'
        : language === 'mr'
        ? 'मेडीकिऑस्क मध्ये आपले स्वागत आहे. डिजिटल टोकन मिळवण्यासाठी टोकन मिळवा बटण दाबा.'
        : 'Welcome to MediKiosk. Touch the Get Hospital Token button to skip manual queues.';
    } else if (step === 1) {
      prompt = language === 'hi' ? 'कृपया अपनी बीमारी के अनुसार डॉक्टर विभाग चुनें।' : language === 'mr' ? 'कृपया डॉक्टरांचा विभाग निवडा.' : 'Please select your department.';
    } else if (step === 2) {
      prompt = language === 'hi' ? 'अपना मोबाइल नंबर या आभा आईडी दर्ज करें।' : language === 'mr' ? 'तुमचा मोबाईल नंबर किंवा आभा आयडी टाका.' : 'Please enter your mobile number or ABHA ID.';
    } else if (step === 3) {
      prompt = language === 'hi' ? 'अस्पताल आने का मुख्य कारण चुनें।' : language === 'mr' ? 'रुग्णालयात येण्याचे मुख्य कारण निवडा.' : 'Please select your reason for visit.';
    } else if (step === 4) {
      prompt = language === 'hi' ? 'आपका टोकन तैयार है। क्या आप डॉक्टर से मिलने से पहले स्वास्थ्य जांच शुरू करना चाहते हैं?' : language === 'mr' ? 'तुमचा टोकन तयार आहे. डॉक्टर भेटण्यापूर्वी आरोग्य तपासणी सुरू करायची आहे का?' : 'Your token is ready. Would you like to start your health intake now?';
    }
    speakText(prompt, language);
    setTimeout(() => setIsPlayingAudio(false), 4000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 flex flex-col justify-between min-h-[660px] font-['Outfit'] space-y-6">
      
      {/* Top Touchscreen Kiosk Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-800 to-cyan-700 text-white flex items-center justify-center font-black shadow-md">
            <Ticket className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 text-lg sm:text-xl">MediKiosk Hospital Token Terminal</span>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Live Queue Connected
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">Apex Multispecialty Central Hospital • Public Touchscreen #01</span>
          </div>
        </div>

        {/* Audio Help & Language Switcher */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAudioHelp}
            className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer border ${
              isPlayingAudio 
                ? 'bg-amber-100 text-amber-950 border-amber-300 ring-2 ring-amber-300 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-amber-700' : 'text-teal-700'}`} />
            <span>{language === 'hi' ? 'आवाज सुनें (Audio)' : language === 'mr' ? 'आवाज ऐका' : 'Audio Guide'}</span>
          </button>

          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => onSelectLanguage('en')}
              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                language === 'en' ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onSelectLanguage('hi')}
              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                language === 'hi' ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => onSelectLanguage('mr')}
              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                language === 'mr' ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              मराठी
            </button>
          </div>
        </div>
      </div>

      {/* Live Hospital Queue Ticker */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-3.5 sm:p-4 rounded-3xl border border-teal-500/30 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs sm:text-sm font-bold text-slate-300">
            {language === 'hi' ? 'वर्तमान में सेवा जारी:' : language === 'mr' ? 'सध्या सुरू असलेला टोकन:' : 'Now Serving OPD:'}
          </span>
          <span className="text-base sm:text-lg font-black text-cyan-300 font-mono tracking-wider bg-slate-800/80 px-3 py-0.5 rounded-xl border border-cyan-500/30">
            {currentServingToken}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-300">
          <span>Active Doctors: <strong className="text-white">8 Available</strong></span>
          <span>•</span>
          <span>Avg Wait: <strong className="text-emerald-400">~15 mins</strong></span>
        </div>
      </div>

      {/* STEP 0: PUBLIC KIOSK HOME */}
      {step === 0 && (
        <div className="my-auto py-4 flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
          
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200 inline-block">
              {language === 'hi' ? 'डिजिटल अस्पताल टोकन प्रणाली' : language === 'mr' ? 'डिजिटल रुग्णालय टोकन प्रणाली' : 'Digital Hospital Token Queue System'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {language === 'hi' ? 'बिना लाइन लगे डिजिटल टोकन प्राप्त करें' : language === 'mr' ? 'रांगेत न थांबता डिजिटल टोकन मिळवा' : 'Skip the Manual Waiting Queue'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
              {language === 'hi'
                ? 'कियोस्क स्क्रीन पर 3 आसान चरणों में अपनी पर्ची और टोकन लें'
                : language === 'mr'
                ? 'किऑस्क स्क्रीनवर फक्त ३ सोप्या टप्प्यांत तुमचा टोकन मिळवा'
                : 'Get your digital hospital token in 3 simple touch steps and track your waiting time in real time.'}
            </p>
          </div>

          {/* GIANT PRIMARY ACTION: Get Hospital Token */}
          <div className="w-full max-w-xl space-y-3.5 pt-2">
            <button
              type="button"
              id="kiosk-btn-get-token"
              onClick={() => setStep(1)}
              className="w-full py-5 sm:py-6 px-8 bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 hover:from-teal-700 hover:to-emerald-600 text-white rounded-3xl font-black text-xl sm:text-2xl flex items-center justify-between gap-4 shadow-xl shadow-teal-900/25 ring-4 ring-teal-500/20 hover:scale-[1.01] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white text-teal-900 flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform">
                  <Ticket className="w-8 h-8 text-teal-800" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-teal-200 uppercase tracking-wider">Fast Check-In</span>
                  <span>{language === 'hi' ? '🩺 टोकन प्राप्त करें (Get Token)' : language === 'mr' ? '🩺 टोकन मिळवा (Get Token)' : '🩺 Get Hospital Token'}</span>
                </div>
              </div>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Sub-actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('abha');
                  setStep(2);
                }}
                className="p-4 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl border-2 border-slate-200 flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
              >
                <CreditCard className="w-5 h-5 text-teal-700" />
                <span>{language === 'hi' ? '📋 पुराना मरीज (ABHA ID)' : language === 'mr' ? '📋 जुना रुग्ण (ABHA)' : '📋 Existing Patient'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMethod('new');
                  setStep(2);
                }}
                className="p-4 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl border-2 border-slate-200 flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
              >
                <UserPlus className="w-5 h-5 text-indigo-700" />
                <span>{language === 'hi' ? '🆕 नया पंजीकरण (New)' : language === 'mr' ? '🆕 नवीन नोंदणी' : '🆕 New Patient'}</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* STEP 1: SELECT DEPARTMENT */}
      {step === 1 && (
        <div className="space-y-5 my-auto">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="inline-flex items-center gap-1.5 text-xs font-black text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="text-xs font-black bg-teal-100 text-teal-900 px-3.5 py-1 rounded-full">
              Step 1 of 3: Select Department
            </span>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'hi' ? 'डॉक्टर का विभाग चुनें' : language === 'mr' ? 'डॉक्टरांचा विभाग निवडा' : 'Select Hospital Department'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {language === 'hi' ? 'जिस विभाग में जांच करानी है उसे स्क्रीन पर छुएं' : language === 'mr' ? 'तपासणी करायची असलेल्या विभागाला स्पर्श करा' : 'Touch the clinical department you wish to consult today'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {mockDepartments.map((dept) => {
              const isSelected = selectedDept.id === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => {
                    setSelectedDept(dept);
                    setStep(2);
                    const label = dept.name[language] || dept.name.en;
                    speakText(label, language);
                  }}
                  className={`p-5 rounded-3xl border-2 text-left flex flex-col justify-between min-h-[140px] transition-all cursor-pointer group shadow-xs ${
                    isSelected
                      ? 'bg-gradient-to-tr from-teal-50 to-emerald-50 border-teal-600 ring-4 ring-teal-500/20 shadow-md scale-[1.02]'
                      : 'bg-white border-slate-200 hover:border-teal-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                      {getDeptIcon(dept.icon)}
                    </div>
                    <span className="text-[10px] font-black uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      Code {dept.code}
                    </span>
                  </div>

                  <div className="mt-3 space-y-0.5">
                    <h3 className="font-black text-slate-900 text-sm leading-snug group-hover:text-teal-800 transition-colors">
                      {dept.name[language] || dept.name.en}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">{dept.room}</p>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                      <Clock className="w-3 h-3" />
                      <span>Wait: ~{dept.currentWaitMins} mins</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: PATIENT IDENTIFICATION & DEMOGRAPHICS */}
      {step === 2 && (
        <div className="max-w-xl mx-auto space-y-5 my-auto w-full">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-black text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="text-xs font-black bg-teal-100 text-teal-900 px-3.5 py-1 rounded-full">
              Step 2 of 3: Patient Details
            </span>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'hi' ? 'रोगी की जानकारी' : language === 'mr' ? 'रुग्णाची माहिती' : 'Patient Information'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Department: <strong className="text-teal-800">{selectedDept.name[language] || selectedDept.name.en}</strong> ({selectedDept.room})
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-md space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">
                Full Name (रोगी का नाम)
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  Mobile Number (फोन नंबर)
                </label>
                <input
                  type="text"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+91 98201 44521"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  Age & Gender (उम्र / लिंग)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(parseInt(e.target.value) || 30)}
                    className="w-1/2 px-3 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-bold text-slate-900 text-center"
                  />
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value as Gender)}
                    className="w-1/2 px-2 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold text-slate-900"
                  >
                    <option value="male">Male (M)</option>
                    <option value="female">Female (F)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">
                ABHA ID / Ayushman Card (वैकल्पिक)
              </label>
              <input
                type="text"
                value={patientAbha}
                onChange={(e) => setPatientAbha(e.target.value)}
                placeholder="91-4829-1029-4401"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-mono font-bold text-slate-900"
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-full py-4 bg-teal-800 hover:bg-teal-700 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all mt-2"
            >
              <span>Next: Reason for Visit</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: REASON FOR VISIT */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto space-y-5 my-auto w-full">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-black text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="text-xs font-black bg-teal-100 text-teal-900 px-3.5 py-1 rounded-full">
              Step 3 of 3: Reason for Visit
            </span>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'hi' ? 'अस्पताल आने का कारण चुनें' : language === 'mr' ? 'रुग्णालयात येण्याचे कारण निवडा' : 'Reason for Visit'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Touch the symptom or reason closest to your condition
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {commonReasons.map((reason) => {
              const label = reason[language] || reason.en;
              const isSelected = visitReason === label;
              return (
                <button
                  key={reason.id}
                  type="button"
                  onClick={() => setVisitReason(label)}
                  className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-600 shadow-md font-black text-teal-950 scale-[1.01]'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {reason.isUrgent && (
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0"></span>
                    )}
                    <span className="text-xs sm:text-sm">{label}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Confirm & Generate Token Action */}
          <div className="pt-3">
            <button
              type="button"
              id="btn-confirm-generate-token"
              onClick={handleGenerateToken}
              className="w-full py-4 sm:py-5 px-6 bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 hover:from-teal-700 hover:to-emerald-600 text-white rounded-3xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-xl shadow-teal-900/25 transition-all cursor-pointer group"
            >
              <span>🎟️ Generate Digital Token (टोकन बनाएं)</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: DIGITAL TOKEN CONFIRMATION PASS */}
      {step === 4 && generatedToken && (
        <div className="max-w-2xl mx-auto space-y-6 my-auto w-full font-['Outfit']">
          
          {/* Main Hospital Token Card */}
          <div className="bg-white rounded-3xl border-2 border-teal-600 shadow-2xl overflow-hidden">
            
            {/* Header Strip */}
            <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 text-white p-6 sm:p-8 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-black">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Token Successfully Generated</span>
              </div>
              
              <div className="pt-2">
                <span className="text-xs font-bold text-teal-200 uppercase tracking-widest block">
                  Your Digital OPD Token
                </span>
                <h1 className="text-5xl sm:text-6xl font-black text-white font-mono tracking-wider">
                  {generatedToken.tokenNumber}
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-teal-100 font-medium">
                {generatedToken.patientName} ({generatedToken.age}y / {generatedToken.gender}) • ABHA: {generatedToken.abhaId}
              </p>
            </div>

            {/* Token Metadata Details */}
            <div className="p-6 sm:p-8 space-y-6 bg-slate-50/60">
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-bold block">Department</span>
                  <strong className="text-slate-900 text-sm block font-black">{generatedToken.departmentName}</strong>
                  <span className="text-[11px] text-teal-700 font-semibold">{generatedToken.roomNumber}</span>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-bold block">Consulting Doctor</span>
                  <strong className="text-slate-900 text-sm block font-black">{generatedToken.doctorName}</strong>
                  <span className="text-[11px] text-slate-500 font-semibold">OPD Room Ready</span>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-slate-500 font-bold block">Queue Position</span>
                  <div className="flex items-center gap-2">
                    <strong className="text-amber-700 text-sm font-black">{generatedToken.patientsAhead} Ahead</strong>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 font-bold">~{generatedToken.estimatedWaitMins}m</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold block">Now Serving: {currentServingToken}</span>
                </div>

              </div>

              {/* Seamless Health Check Intake Invitation */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-300 p-5 rounded-3xl space-y-3 text-center">
                <div className="inline-flex items-center gap-1.5 text-teal-900 font-black text-sm sm:text-base">
                  <Bot className="w-5 h-5 text-teal-700" />
                  <span>Would you like to complete your health intake while you wait?</span>
                </div>
                <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
                  Answering a few simple questions on the touchscreen or through voice will share your symptoms directly with {generatedToken.doctorName}.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    id="btn-kiosk-start-intake"
                    onClick={() => onStartIntakeWithToken(generatedToken)}
                    className="flex-1 py-3.5 px-6 bg-teal-800 hover:bg-teal-700 text-white rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>🩺 Start Health Check Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="py-3.5 px-6 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all"
                  >
                    <span>Finish & Wait for Token Call</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>NABH Certified Hospital Public Kiosk • Token auto-expires after consultation</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Need Staff Assistance?</span>
          <strong className="text-teal-800">Dial Helpdesk 104</strong>
        </div>
      </div>

    </div>
  );
};
