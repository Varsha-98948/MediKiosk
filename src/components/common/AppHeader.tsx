'use client';

import React from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  Layers, 
  Volume2, 
  Globe, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Tv, 
  ShieldCheck, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { Language, PriorityLevel } from '../../types';

interface AppHeaderProps {
  currentApp: string;
  onSelectApp: (app: any) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  deviceFrame: 'mobile' | 'tablet' | 'kiosk' | 'fullscreen';
  onSelectDeviceFrame: (frame: 'mobile' | 'tablet' | 'kiosk' | 'fullscreen') => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  activeRedFlag?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentApp,
  onSelectApp,
  language,
  onSelectLanguage,
  deviceFrame,
  onSelectDeviceFrame,
  isSpeaking,
  onToggleSpeech,
  activeRedFlag,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs font-['Outfit']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Hospital Tag */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-800 text-white flex items-center justify-center shadow-md shadow-teal-900/10 ring-2 ring-teal-700/20">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-xl tracking-tight">MediKiosk</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3 h-3 mr-1 text-emerald-700" /> ABDM Level-3
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Hospital Digital Token & Smart Clinical Intake
              </p>
            </div>
          </div>

          {/* Connected App Switcher */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner overflow-x-auto">
            <button
              type="button"
              id="app-switch-patient"
              onClick={() => onSelectApp('patient')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                currentApp === 'patient'
                  ? 'bg-teal-800 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>1. 🏥 Public Kiosk</span>
            </button>

            <button
              type="button"
              id="app-switch-doctor"
              onClick={() => onSelectApp('doctor')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer relative whitespace-nowrap ${
                currentApp === 'doctor'
                  ? 'bg-teal-800 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>2. 👨‍⚕️ Doctor EMR</span>
              {activeRedFlag && (
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1"></span>
              )}
            </button>

            <button
              type="button"
              id="app-switch-waiting-tv"
              onClick={() => onSelectApp('waiting_tv')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                currentApp === 'waiting_tv'
                  ? 'bg-teal-800 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>3. 📺 Waiting TV</span>
            </button>

            <button
              type="button"
              id="app-switch-features"
              onClick={() => onSelectApp('features_hub')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                currentApp === 'features_hub'
                  ? 'bg-teal-800 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>4. 🌐 Modules Hub</span>
            </button>

            <button
              type="button"
              id="app-switch-design-system"
              onClick={() => onSelectApp('design_system')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all hidden xl:flex cursor-pointer whitespace-nowrap ${
                currentApp === 'design_system'
                  ? 'bg-teal-800 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>38-Screen Matrix</span>
            </button>
          </div>

          {/* Right Tools: Language, Audio, Device Frame */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Device Viewport Mode (when in Patient app) */}
            {currentApp === 'patient' && (
              <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-slate-600">
                <button
                  type="button"
                  title="Kiosk 1080p View"
                  onClick={() => onSelectDeviceFrame('kiosk')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${deviceFrame === 'kiosk' ? 'bg-white text-teal-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
                >
                  <Tv className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Tablet 1024px View"
                  onClick={() => onSelectDeviceFrame('tablet')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${deviceFrame === 'tablet' ? 'bg-white text-teal-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Mobile 390px View"
                  onClick={() => onSelectDeviceFrame('mobile')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${deviceFrame === 'mobile' ? 'bg-white text-teal-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Full Width"
                  onClick={() => onSelectDeviceFrame('fullscreen')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${deviceFrame === 'fullscreen' ? 'bg-white text-teal-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Global Voice Assistant Speaker Toggle */}
            <button
              type="button"
              id="header-tts-btn"
              onClick={onToggleSpeech}
              title="Voice narration / instructions"
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-100 border-amber-300 text-amber-950 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-white border-slate-200 text-teal-800 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-700' : 'text-teal-700'}`} />
              <span className="hidden sm:inline">{isSpeaking ? 'Mute' : 'Voice'}</span>
            </button>

            {/* Persistent Global Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                type="button"
                id="lang-btn-en"
                onClick={() => onSelectLanguage('en')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-teal-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                id="lang-btn-hi"
                onClick={() => onSelectLanguage('hi')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-white text-teal-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
              <button
                type="button"
                id="lang-btn-mr"
                onClick={() => onSelectLanguage('mr')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  language === 'mr'
                    ? 'bg-white text-teal-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                मराठी
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
