'use client';

import React from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  Brain, 
  Hospital, 
  ShieldCheck, 
  Activity, 
  LayoutGrid,
  Volume2,
  Home
} from 'lucide-react';
import { Language } from '../../types';
import { speakText } from '../../utils/speech';

export type EcosystemView = 
  | 'landing' 
  | 'kiosk' 
  | 'doctor' 
  | 'ayush_engine' 
  | 'operations';

interface EcosystemNavbarProps {
  currentView: EcosystemView;
  onSelectView: (view: EcosystemView) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  currentServingToken: string;
  onCallNextToken: () => void;
  onSimulateEmergency: () => void;
  isOnline: boolean;
  onToggleOnline: () => void;
  onToggleAccessibility: () => void;
  onOpenAllServices?: () => void;
  hasRedFlagActive?: boolean;
}

export const EcosystemNavbar: React.FC<EcosystemNavbarProps> = ({
  currentView,
  onSelectView,
  language,
  onSelectLanguage,
  currentServingToken,
  onCallNextToken,
  onSimulateEmergency,
  isOnline,
  onToggleOnline,
  onToggleAccessibility,
  onOpenAllServices,
  hasRedFlagActive,
}) => {
  const handleReadScreen = () => {
    const textToSpeak = 
      language === 'hi' 
        ? `आप स्वास्थ्य केंद्र पोर्टल पर हैं। वर्तमान स्क्रीन: ${
            currentView === 'landing' ? 'मुख्य पृष्ठ' :
            currentView === 'kiosk' ? 'मरीज़ पर्चा काउंटर' :
            currentView === 'doctor' ? 'डॉक्टर परामर्श कक्ष' :
            currentView === 'ayush_engine' ? 'आयुष त्रिदोष निदान' : 'अस्पताल प्रबंधन'
          }। किसी भी सेवा पर जाने के लिए ऊपर दिए गए बटनों को दबाएँ।`
        : language === 'mr'
        ? `तुम्ही आरोग्य केंद्र पोर्टलवर आहात. सध्याची स्क्रीन: ${
            currentView === 'landing' ? 'मुख्य पृष्ठ' :
            currentView === 'kiosk' ? 'रुग्ण नोंदणी काउंटर' :
            currentView === 'doctor' ? 'डॉक्टर तपासणी कक्ष' :
            currentView === 'ayush_engine' ? 'आयुष त्रिदोष निदान' : 'रुग्णालय व्यवस्थापन'
          }। इतर सेवेसाठी वरील बटणे वापरा.`
        : `You are on the Health Kiosk portal. Current view is ${
            currentView === 'landing' ? 'Home' :
            currentView === 'kiosk' ? 'Patient Kiosk' :
            currentView === 'doctor' ? 'Doctor Desk' :
            currentView === 'ayush_engine' ? 'Ayush Engine' : 'Hospital Operations'
          }. Tap any numbered button above to navigate.`;

    speakText(textToSpeak, language);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-stone-300 font-['Outfit'] select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & National Health Title */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer py-1"
            onClick={() => onSelectView('landing')}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#166E7E] text-white flex items-center justify-center border-2 border-[#0F4B56] shrink-0">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-stone-900 text-base sm:text-xl tracking-tight">
                  MediKiosk
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E6F4F6] text-[#166E7E] border border-[#BCE3E8]">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Ayush
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-600 hidden sm:block font-medium">
                {language === 'hi' ? 'डिजिटल स्वास्थ्य केंद्र व ओपीडी' : language === 'mr' ? 'डिजिटल आरोग्य केंद्र व ओपीडी' : 'Digital Health & OPD Center'}
              </p>
            </div>
          </div>

          {/* Primary View Switcher: Clear Bordered Numbered Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5 bg-[#F9F9F6] p-1.5 rounded-xl border-2 border-stone-300 overflow-x-auto max-w-full">
            
            {/* Home */}
            <button
              type="button"
              onClick={() => onSelectView('landing')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap btn-tactile border-2 ${
                currentView === 'landing'
                  ? 'bg-[#166E7E] text-white border-[#0F4B56]'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-[#166E7E] hover:bg-stone-50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {language === 'hi' ? 'मुख्य' : language === 'mr' ? 'मुख्य' : 'Home'}
              </span>
            </button>

            {/* 1. Patient Kiosk - Orange (#C05C29) */}
            <button
              type="button"
              onClick={() => onSelectView('kiosk')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap btn-tactile border-2 ${
                currentView === 'kiosk'
                  ? 'bg-[#C05C29] text-white border-[#9C4519]'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-[#C05C29] hover:bg-orange-50/50'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-[#C05C29]" />
              <span>1. {language === 'hi' ? 'पर्चा काउंटर' : language === 'mr' ? 'नोंदणी' : 'Kiosk'}</span>
            </button>

            {/* 2. Doctor Desk - Purple (#6355DC) */}
            <button
              type="button"
              onClick={() => onSelectView('doctor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap relative btn-tactile border-2 ${
                currentView === 'doctor'
                  ? 'bg-[#6355DC] text-white border-[#4E41B8]'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-[#6355DC] hover:bg-purple-50/50'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-[#6355DC]" />
              <span>2. {language === 'hi' ? 'डॉक्टर कक्ष' : language === 'mr' ? 'डॉक्टर' : 'Doctor'}</span>
              {hasRedFlagActive && (
                <span className="w-2 h-2 rounded-full bg-[#B83253] border border-white"></span>
              )}
            </button>

            {/* 3. Ayush Clinical Engine - Gold (#C59E27) */}
            <button
              type="button"
              onClick={() => onSelectView('ayush_engine')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap btn-tactile border-2 ${
                currentView === 'ayush_engine'
                  ? 'bg-[#C59E27] text-white border-[#9E7D1A]'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-[#C59E27] hover:bg-yellow-50/50'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-[#C59E27]" />
              <span>3. {language === 'hi' ? 'आयुष निदान' : language === 'mr' ? 'आयुष' : 'Ayush AI'}</span>
            </button>

            {/* 4. Hospital Operations - Berry (#B83253) */}
            <button
              type="button"
              onClick={() => onSelectView('operations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap btn-tactile border-2 ${
                currentView === 'operations'
                  ? 'bg-[#B83253] text-white border-[#8F223D]'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-[#B83253] hover:bg-rose-50/50'
              }`}
            >
              <Hospital className="w-3.5 h-3.5 text-[#B83253]" />
              <span>4. {language === 'hi' ? 'प्रबंधन' : language === 'mr' ? 'व्यवस्थापन' : 'Ops'}</span>
            </button>
          </nav>

          {/* Right Action Cluster: All Services, Audio Reader & Language */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Prominent All Services Feature Launcher Button */}
            {onOpenAllServices && (
              <button
                type="button"
                onClick={onOpenAllServices}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#6355DC] border-2 border-[#6355DC] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 btn-tactile"
                title="Open directory of all hospital tools and features"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === 'hi' ? 'सभी सेवाएँ' : language === 'mr' ? 'सर्व सेवा' : 'All Services'}
                </span>
              </button>
            )}

            {/* Voice Audio Read Button for Low-Literacy Users */}
            <button
              type="button"
              onClick={handleReadScreen}
              className="p-2 sm:px-3 sm:py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl border border-stone-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 btn-tactile"
              title="Click to hear what this screen is about"
            >
              <Volume2 className="w-4 h-4 text-[#166E7E]" />
              <span className="hidden lg:inline">
                {language === 'hi' ? 'सुनें' : language === 'mr' ? 'ऐका' : 'Listen'}
              </span>
            </button>

            {/* Accessibility Settings */}
            <button
              type="button"
              onClick={onToggleAccessibility}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl border border-stone-300 text-xs font-bold transition-all cursor-pointer flex items-center"
              title="Accessibility & Contrast Settings"
            >
              <Activity className="w-4 h-4 text-stone-700" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => onSelectLanguage(e.target.value as Language)}
                className="px-2 py-1.5 sm:px-2.5 sm:py-2 bg-white border-2 border-stone-300 hover:border-[#144A38] rounded-xl text-xs font-bold text-stone-900 cursor-pointer outline-none"
              >
                <option value="en">EN (English)</option>
                <option value="hi">HI (हिन्दी)</option>
                <option value="mr">MR (मराठी)</option>
              </select>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
