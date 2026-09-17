'use client';

import React from 'react';
import { 
  Volume2, 
  ArrowLeft, 
  Mic, 
  CheckCircle2, 
  HeartPulse, 
  Thermometer, 
  Wind, 
  Activity, 
  ShieldAlert, 
  Brain, 
  AlertTriangle, 
  Pill, 
  Plus,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language } from '../../types';
import { translations, symptomOptions } from '../../utils/translations';
import { speakText } from '../../utils/speech';

interface MainComplaintScreenProps {
  language: Language;
  selectedComplaints: string[];
  onToggleComplaint: (id: string) => void;
  onVoiceInputClick: () => void;
  onContinue: () => void;
  onBack: () => void;
}

const renderSymptomIcon = (iconKey?: string) => {
  switch (iconKey) {
    case 'HeartPulse': return <HeartPulse className="w-7 h-7 text-rose-600" />;
    case 'Thermometer': return <Thermometer className="w-7 h-7 text-amber-600" />;
    case 'Wind': return <Wind className="w-7 h-7 text-teal-600" />;
    case 'Activity': return <Activity className="w-7 h-7 text-indigo-600" />;
    case 'ShieldAlert': return <ShieldAlert className="w-7 h-7 text-blue-600" />;
    case 'Brain': return <Brain className="w-7 h-7 text-purple-600" />;
    case 'AlertTriangle': return <AlertTriangle className="w-7 h-7 text-rose-600" />;
    case 'Pill': return <Pill className="w-7 h-7 text-emerald-600" />;
    default: return <Plus className="w-7 h-7 text-teal-600" />;
  }
};

export const MainComplaintScreen: React.FC<MainComplaintScreenProps> = ({
  language,
  selectedComplaints,
  onToggleComplaint,
  onVoiceInputClick,
  onContinue,
  onBack,
}) => {
  const t = translations[language];
  const symptoms = symptomOptions[language];

  const handleListen = () => {
    speakText(t.mainComplaintSubtitle, language);
  };

  const handleCardClick = (id: string, label: string) => {
    onToggleComplaint(id);
    speakText(label, language);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[620px] p-6 sm:p-8 max-w-4xl mx-auto font-['Outfit']">
      
      {/* Top Header */}
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200">
              Step 2 / 5
            </span>
            <button
              type="button"
              onClick={handleListen}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 px-3.5 py-1.5 rounded-xl border border-teal-200 transition-all cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-teal-700" />
              <span>{t.listen}</span>
            </button>
          </div>
        </div>

        <div className="text-center space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.mainComplaintTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
            {t.mainComplaintSubtitle}
          </p>
        </div>
      </div>

      {/* Voice Assistant Large Action Banner for illiterate users */}
      <div className="w-full my-4">
        <button
          type="button"
          id="btn-voice-intake-entry"
          onClick={onVoiceInputClick}
          className="w-full py-4 px-6 bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 hover:from-teal-800 hover:to-emerald-900 text-white rounded-2xl flex items-center justify-between gap-4 transition-all cursor-pointer border border-teal-500/30 shadow-md group"
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md ring-4 ring-teal-400/20 group-hover:scale-105 transition-transform">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-white">
                {t.tellInOwnWords}
              </div>
              <p className="text-xs text-teal-200 font-medium">
                {language === 'hi'
                  ? 'माइक दबाकर अपनी भाषा में बीमारी बोलें'
                  : language === 'mr'
                  ? 'माईक दाबून तुमच्या भाषेत आजार सांगा'
                  : 'Multilingual voice intake in Hindi, Marathi & English'}
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 9 Large Visual Symptom Cards */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 my-2">
        {symptoms.map((sym) => {
          const isSelected = selectedComplaints.includes(sym.id);
          return (
            <button
              key={sym.id}
              type="button"
              id={`sym-card-${sym.id}`}
              onClick={() => handleCardClick(sym.id, sym.label)}
              className={`p-4 rounded-2xl border-2 text-left flex flex-col justify-between min-h-[105px] transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-emerald-50/80 border-emerald-600 shadow-md ring-2 ring-emerald-600/30 scale-[1.02]'
                  : 'bg-white border-slate-200 hover:border-teal-400 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="mb-2 p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                  {renderSymptomIcon(sym.iconKey)}
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                )}
                {sym.redFlag && !isSelected && (
                  <span className="text-[10px] font-extrabold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    Urgent
                  </span>
                )}
              </div>
              <span className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
                {sym.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Continue Action Button */}
      <div className="w-full max-w-md mt-4">
        <button
          type="button"
          id="btn-complaint-continue"
          onClick={onContinue}
          disabled={selectedComplaints.length === 0}
          className={`w-full py-4 px-6 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
            selectedComplaints.length > 0
              ? 'bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-700 hover:from-teal-600 hover:to-emerald-500 text-white cursor-pointer shadow-emerald-900/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>
            {selectedComplaints.length > 0 
              ? `${t.continue} (${selectedComplaints.length} selected)` 
              : 'Select At Least One Symptom'}
          </span>
          {selectedComplaints.length > 0 && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>

    </div>
  );
};
