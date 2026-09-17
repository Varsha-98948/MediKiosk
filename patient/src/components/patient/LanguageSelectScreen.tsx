import React from 'react';
import { Volume2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { speakText } from '../../utils/speech';

interface LanguageSelectScreenProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const LanguageSelectScreen: React.FC<LanguageSelectScreenProps> = ({
  currentLanguage,
  onSelectLanguage,
  onContinue,
  onBack,
}) => {
  const t = translations[currentLanguage];

  const languages = [
    {
      id: 'en' as Language,
      flag: '🇬🇧',
      primary: 'English',
      secondary: 'English',
      voicePrompt: 'English selected. You will be able to speak or tap.',
      desc: 'Comfortable in conversational English',
    },
    {
      id: 'hi' as Language,
      flag: '🇮🇳',
      primary: 'हिन्दी',
      secondary: 'Hindi',
      voicePrompt: 'हिंदी भाषा चुनी गई है। आप बोलकर या स्क्रीन को छूकर बता सकते हैं।',
      desc: 'सरल हिंदी में बातचीत और प्रश्न',
    },
    {
      id: 'mr' as Language,
      flag: '🇮🇳',
      primary: 'मराठी',
      secondary: 'Marathi',
      voicePrompt: 'मराठी भाषा निवडली आहे. तुम्ही बोलून किंवा स्क्रीनवर स्पर्श करून सांगू शकता.',
      desc: 'सोप्या मराठीत संवाद आणि प्रश्नोत्तरे',
    },
  ];

  const handleCardClick = (lang: Language, prompt: string) => {
    onSelectLanguage(lang);
    speakText(prompt, lang);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[580px] p-6 sm:p-10 max-w-3xl mx-auto">
      
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
          onClick={() => speakText('Please select your preferred language.', currentLanguage)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200"
        >
          <Volume2 className="w-4 h-4 text-teal-600" />
          <span>{t.listen}</span>
        </button>
      </div>

      {/* Main Options */}
      <div className="my-auto w-full py-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Choose Your Preferred Language
          </h2>
          <p className="text-base text-slate-600">
            आपणी पसंदीदा भाषा चुनें • आपली आवडती भाषा निवडा
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {languages.map((item) => {
            const isSelected = currentLanguage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                id={`lang-card-${item.id}`}
                onClick={() => handleCardClick(item.id, item.voicePrompt)}
                className={`flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-teal-50 border-teal-600 shadow-md ring-4 ring-teal-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="w-6 h-6 text-teal-600 absolute top-4 right-4 fill-teal-100" />
                )}
                <span className="text-4xl mb-3">{item.flag}</span>
                <span className="text-2xl font-bold text-slate-900 mb-1">{item.primary}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{item.secondary}</span>
                <span className="text-xs text-slate-600 leading-snug">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md">
        <button
          type="button"
          id="btn-language-continue"
          onClick={onContinue}
          className="w-full py-4 px-6 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-800/20 transition-all cursor-pointer"
        >
          {t.continue}
        </button>
      </div>

    </div>
  );
};
