'use client';

import React, { useState } from 'react';
import { 
  HeartPulse, 
  FileText, 
  Pill, 
  Calendar, 
  History, 
  AlertTriangle, 
  Volume2, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Stethoscope,
  ScanLine,
  CheckCircle2,
  PhoneCall,
  Activity,
  Bot,
  Layers,
  FileCheck2,
  Ambulance,
  Ticket,
  Tv,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Video,
  Eye
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { speakText } from '../../utils/speech';

interface WelcomeScreenProps {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onStart: () => void;
  onGetToken?: () => void;
  onOpenDoctor?: () => void;
  onOpenWaitingTv?: () => void;
  onScanDoc?: () => void;
  onMedicines?: () => void;
  onAppointment?: () => void;
  onHistory?: () => void;
  onFirstAid?: () => void;
  onReels?: () => void;
  onXray?: () => void;
  onHelp: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  onSelectLanguage,
  onStart,
  onGetToken,
  onOpenDoctor,
  onOpenWaitingTv,
  onScanDoc,
  onMedicines,
  onAppointment,
  onHistory,
  onFirstAid,
  onReels,
  onXray,
  onHelp,
}) => {
  const t = translations[language];
  const [isPlayingWelcome, setIsPlayingWelcome] = useState(false);
  const [showMoreModules, setShowMoreModules] = useState(false);

  const handleAudioGuide = () => {
    setIsPlayingWelcome(true);
    const speech = language === 'hi'
      ? 'मेडीकियोस्क में आपका स्वागत है। डिजिटल टोकन लेने के लिए डिजिटल टोकन बटन दबाएं, या डॉक्टर से मिलने से पहले स्वास्थ्य जांच शुरू करें।'
      : language === 'mr'
      ? 'मेडीकिऑस्क मध्ये आपले स्वागत आहे. डिजिटल टोकन मिळवण्यासाठी टोकन बटण दाबा किंवा आरोग्य तपासणी सुरू करा.'
      : 'Welcome to MediKiosk. Digital Healthcare, Smarter Queues, Simpler Care. Touch Get Digital Token to receive your OPD token, or Start Health Check while you wait.';
    
    speakText(speech, language);
    setTimeout(() => setIsPlayingWelcome(false), 5000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 flex flex-col justify-between min-h-[660px] font-['Outfit'] space-y-8">
      
      {/* Top Hospital Kiosk Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-black shadow-sm">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 text-base sm:text-lg">MediKiosk Hospital Station</span>
              <span className="text-[10px] font-black bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                ABDM Level-3 Verified
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">Apex Multispecialty Hospital • OPD Waiting Block A</span>
          </div>
        </div>

        {/* Audio Guide & Language Switcher */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleAudioGuide}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer border ${
              isPlayingWelcome
                ? 'bg-amber-100 text-amber-950 border-amber-300 ring-2 ring-amber-300 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingWelcome ? 'text-amber-700' : 'text-teal-700'}`} />
            <span>{language === 'hi' ? 'ऑडियो गाइड (सुनें)' : language === 'mr' ? 'ऑडिओ गाईड (ऐका)' : 'Audio Guide'}</span>
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

      {/* Hero Banner Section */}
      <div className="text-center space-y-3 my-2 max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-teal-800 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200 inline-block">
          {language === 'hi' ? 'डिजिटल अस्पताल प्रणाली' : language === 'mr' ? 'डिजिटल रुग्णालय प्रणाली' : 'Smart Digital Hospital Ecosystem'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {language === 'hi'
            ? 'डिजिटल स्वास्थ्य सेवाएं। सुगम कतार। सरल उपचार।'
            : language === 'mr'
            ? 'डिजिटल आरोग्य सेवा. सोपी रांग. जलद उपचार.'
            : 'Digital Healthcare. Smarter Queues. Simpler Care.'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
          {language === 'hi'
            ? 'अस्पताल में आते ही डिजिटल टोकन प्राप्त करें, प्रतीक्षा के दौरान अपनी स्वास्थ्य जानकारी दर्ज करें, और डॉक्टर के साथ परामर्श को तीव्र बनाएं।'
            : language === 'mr'
            ? 'रुग्णालयात आल्यावर डिजिटल टोकन घ्या, वाट पाहताना आरोग्य माहिती भरा आणि डॉक्टरांकडून जलद तपासणी करून घ्या.'
            : 'Get your hospital token digitally, complete your health information while waiting, and help doctors access your structured history before consultation.'}
        </p>

        {/* Primary Action Buttons (2 Clear Options) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            type="button"
            id="hero-action-get-token"
            onClick={onGetToken || onStart}
            className="w-full sm:w-auto px-8 py-4 bg-teal-800 hover:bg-teal-700 text-white font-black text-base sm:text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-teal-900/20 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Ticket className="w-5 h-5 text-teal-200" />
            <span>{language === 'hi' ? '🎟️ डिजिटल टोकन लें' : language === 'mr' ? '🎟️ डिजिटल टोकन मिळवा' : '🎟️ GET DIGITAL TOKEN'}</span>
          </button>

          <button
            type="button"
            id="hero-action-start-intake"
            onClick={onStart}
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-900 font-black text-base sm:text-lg rounded-2xl border-2 border-slate-200 hover:border-teal-700 flex items-center justify-center gap-3 shadow-xs hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Stethoscope className="w-5 h-5 text-teal-700" />
            <span>{language === 'hi' ? '🩺 स्वास्थ्य जांच शुरू करें' : language === 'mr' ? '🩺 आरोग्य तपासणी सुरू करा' : '🩺 START HEALTH CHECK'}</span>
          </button>
        </div>
      </div>

      {/* 3 Core Experience Pillars (Simple Outside, Powerful Inside) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-2">
        
        {/* Pillar 1: Digital Hospital Token */}
        <div 
          onClick={onGetToken || onStart}
          className="p-6 bg-white hover:bg-teal-50/40 rounded-3xl border-2 border-slate-200 hover:border-teal-600 shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold">
              <Ticket className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded-full">
                Step 1 • Public Kiosk
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {language === 'hi' ? 'डिजिटल अस्पताल टोकन' : language === 'mr' ? 'डिजिटल रुग्णालय टोकन' : 'Digital Hospital Token'}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {language === 'hi'
                  ? 'टचस्क्रीन कियोस्क से विभाग चुनें, अपनी पहचान दर्ज करें और तुरंत डिजिटल टोकन पाएं।'
                  : language === 'mr'
                  ? 'टचस्क्रीन किऑस्कवरून विभाग निवडा आणि त्वरित डिजिटल टोकन मिळवा.'
                  : 'Select department, scan ABHA or enter phone to receive digital token & live wait-time estimate.'}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center text-xs font-black text-teal-800 gap-1.5 group-hover:translate-x-1 transition-transform">
            <span>{language === 'hi' ? 'टोकन प्राप्त करें' : language === 'mr' ? 'टोकन मिळवा' : 'Open Kiosk Terminal'}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Pillar 2: Smart Medical Intake */}
        <div 
          onClick={onStart}
          className="p-6 bg-white hover:bg-teal-50/40 rounded-3xl border-2 border-slate-200 hover:border-teal-600 shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
              <Stethoscope className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                Step 2 • While Waiting
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {language === 'hi' ? 'स्मार्ट मेडिकल इनटेक' : language === 'mr' ? 'स्मार्ट आरोग्य तपासणी' : 'Smart Medical Intake'}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {language === 'hi'
                  ? 'आवाज, टच, शरीर के दर्द बिंदु और पुरानी पर्ची स्कैन कर अपनी जानकारी तैयार करें।'
                  : language === 'mr'
                  ? 'आवाज, स्पर्श, शरीराचा दुखणारा भाग आणि जुनी चिठ्ठी स्कॅन करून माहिती भरा.'
                  : 'Multilingual voice & touch interview, precise body diagram pinpoint, and OCR document scanning.'}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center text-xs font-black text-emerald-800 gap-1.5 group-hover:translate-x-1 transition-transform">
            <span>{language === 'hi' ? 'जांच शुरू करें' : language === 'mr' ? 'तपासणी सुरू करा' : 'Start Health Check'}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Pillar 3: Doctor Dashboard */}
        <div 
          onClick={onOpenDoctor}
          className="p-6 bg-white hover:bg-teal-50/40 rounded-3xl border-2 border-slate-200 hover:border-teal-600 shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-800 flex items-center justify-center font-bold">
              <Activity className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800 bg-indigo-100/60 px-2 py-0.5 rounded-full">
                Step 3 • Doctor EMR
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {language === 'hi' ? 'डॉक्टर डैशबोर्ड व कतार' : language === 'mr' ? 'डॉक्टर डॅशबोर्ड व रांग' : 'Doctor Dashboard & Queue'}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {language === 'hi'
                  ? 'डॉक्टर कतार देखते हैं, अगला टोकन बुलाते हैं, संरचित सारांश जांचते हैं और व्हाट्सएप पर पर्ची भेजते हैं।'
                  : language === 'mr'
                  ? 'डॉक्टर रांग पाहतात, पुढील रुग्ण बोलावतात आणि व्हॉट्सॲपवर औषध चिठ्ठी पाठवतात.'
                  : 'Physicians manage live queue, call next patient, review AI summary, and send prescription PDF via WhatsApp.'}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center text-xs font-black text-indigo-800 gap-1.5 group-hover:translate-x-1 transition-transform">
            <span>{language === 'hi' ? 'डॉक्टर पोर्टल खोलें' : language === 'mr' ? 'डॉक्टर पोर्टल उघडा' : 'Open Doctor Workstation'}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* Progressive Disclosure: Secondary Clinical Modules Hub Toggle */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setShowMoreModules(!showMoreModules)}
          className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-black text-slate-700 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-700" />
            <span>{language === 'hi' ? 'अतिरिक्त अस्पताल सेवाएं एवं टूल्स देखें' : language === 'mr' ? 'इतर रुग्णालय सेवा आणि टूल्स पहा' : 'Explore Additional Medical Modules & Tools'}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>{showMoreModules ? 'Collapse' : 'Expand (7 Modules)'}</span>
            {showMoreModules ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showMoreModules && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-3xl border border-slate-200 animate-in fade-in duration-150">
            
            {/* 1. Scan Medical Documents */}
            <button
              type="button"
              onClick={onScanDoc || onStart}
              className="p-3.5 bg-white hover:bg-slate-100 rounded-2xl border border-slate-200 text-left transition-colors cursor-pointer space-y-1"
            >
              <ScanLine className="w-5 h-5 text-cyan-700" />
              <div className="text-xs font-black text-slate-900">📄 Scan Document OCR</div>
              <div className="text-[10px] text-slate-500 font-medium">Extract lab reports & slips</div>
            </button>

            {/* 2. Medicine Explorer */}
            <button
              type="button"
              onClick={onMedicines}
              className="p-3.5 bg-white hover:bg-slate-100 rounded-2xl border border-slate-200 text-left transition-colors cursor-pointer space-y-1"
            >
              <Pill className="w-5 h-5 text-emerald-700" />
              <div className="text-xs font-black text-slate-900">💊 Medicine Explorer</div>
              <div className="text-[10px] text-slate-500 font-medium">Allopathic & AYUSH drugs</div>
            </button>

            {/* 3. Book Appointment */}
            <button
              type="button"
              onClick={onAppointment}
              className="p-3.5 bg-white hover:bg-slate-100 rounded-2xl border border-slate-200 text-left transition-colors cursor-pointer space-y-1"
            >
              <Calendar className="w-5 h-5 text-indigo-700" />
              <div className="text-xs font-black text-slate-900">📅 OPD Appointments</div>
              <div className="text-[10px] text-slate-500 font-medium">Book doctor consult slots</div>
            </button>

            {/* 4. Patient History Timeline */}
            <button
              type="button"
              onClick={onHistory}
              className="p-3.5 bg-white hover:bg-slate-100 rounded-2xl border border-slate-200 text-left transition-colors cursor-pointer space-y-1"
            >
              <History className="w-5 h-5 text-teal-700" />
              <div className="text-xs font-black text-slate-900">📋 Patient EMR Timeline</div>
              <div className="text-[10px] text-slate-500 font-medium">Longitudinal history & ABHA</div>
            </button>

            {/* 5. First Aid & Red Flag */}
            <button
              type="button"
              onClick={onFirstAid}
              className="p-3.5 bg-white hover:bg-rose-50 rounded-2xl border border-rose-200 text-left transition-colors cursor-pointer space-y-1"
            >
              <Ambulance className="w-5 h-5 text-rose-700" />
              <div className="text-xs font-black text-rose-950">🚑 First Aid & Red Flags</div>
              <div className="text-[10px] text-rose-800 font-medium">Emergency nurse triage</div>
            </button>

            {/* 6. AI X-Ray Viewer */}
            <button
              type="button"
              onClick={onXray}
              className="p-3.5 bg-white hover:bg-slate-100 rounded-2xl border border-slate-200 text-left transition-colors cursor-pointer space-y-1"
            >
              <Eye className="w-5 h-5 text-sky-700" />
              <div className="text-xs font-black text-slate-900">🩻 X-Ray Analysis AI</div>
              <div className="text-[10px] text-slate-500 font-medium">DICOM radiograph assist</div>
            </button>

            {/* 7. Health Reels */}
            <button
              type="button"
              onClick={onReels}
              className="p-3.5 bg-white hover:bg-slate-100 rounded-2xl border border-slate-200 text-left transition-colors cursor-pointer space-y-1"
            >
              <Video className="w-5 h-5 text-purple-700" />
              <div className="text-xs font-black text-slate-900">🎥 Health Education Reels</div>
              <div className="text-[10px] text-slate-500 font-medium">Doctor video guidance</div>
            </button>

            {/* 8. Waiting Room TV Display */}
            <button
              type="button"
              onClick={onOpenWaitingTv}
              className="p-3.5 bg-white hover:bg-teal-50 rounded-2xl border border-teal-200 text-left transition-colors cursor-pointer space-y-1"
            >
              <Tv className="w-5 h-5 text-teal-700" />
              <div className="text-xs font-black text-teal-950">📺 Waiting Room TV</div>
              <div className="text-[10px] text-teal-700 font-medium">Digital OPD signage</div>
            </button>

          </div>
        )}
      </div>

      {/* Footer Trust & Standards Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs">
        <button
          type="button"
          onClick={onHelp}
          className="inline-flex items-center gap-1.5 font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-teal-700" />
          <span>{t.help} (मदद / सहायता)</span>
        </button>

        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>ABDM & NABH Level-3 Standard • Complete Patient Data Privacy Guaranteed</span>
        </div>
      </div>

    </div>
  );
};
