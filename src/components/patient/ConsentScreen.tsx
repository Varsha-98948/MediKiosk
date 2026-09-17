import React from 'react';
import { Volume2, ArrowLeft, ShieldCheck, Lock, Check, HelpCircle, HeartHandshake } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { speakText } from '../../utils/speech';

interface ConsentScreenProps {
  language: Language;
  onAgree: () => void;
  onNeedHelp: () => void;
  onBack: () => void;
}

export const ConsentScreen: React.FC<ConsentScreenProps> = ({
  language,
  onAgree,
  onNeedHelp,
  onBack,
}) => {
  const t = translations[language];

  const handleListen = () => {
    speakText(t.termsDesc, language);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[580px] p-6 sm:p-10 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
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

      {/* Main Consent Card */}
      <div className="my-auto w-full py-6 space-y-6">
        
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto ring-4 ring-teal-50">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            {t.termsTitle}
          </h2>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
          <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed">
            "{t.termsDesc}"
          </p>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="flex items-center gap-2.5 bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{t.privacyProtected}</span>
            </div>

            <div className="flex items-center gap-2.5 bg-sky-50 text-sky-900 p-3 rounded-xl border border-sky-200 text-xs font-semibold">
              <Lock className="w-5 h-5 text-sky-600 shrink-0" />
              <span>{t.secureRecord}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="w-full max-w-md space-y-3">
        <button
          type="button"
          id="btn-consent-agree"
          onClick={onAgree}
          className="w-full py-4 px-6 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-800/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Check className="w-5 h-5" />
          <span>{t.iAgree}</span>
        </button>

        <button
          type="button"
          onClick={onNeedHelp}
          className="w-full py-3 px-6 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-semibold text-sm border border-slate-200 flex items-center justify-center gap-2"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>{t.iNeedHelp}</span>
        </button>
      </div>

    </div>
  );
};
