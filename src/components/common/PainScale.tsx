import React from 'react';
import { Language } from '../../types';

interface PainScaleProps {
  value: number;
  onChange: (val: number) => void;
  language: Language;
}

export const PainScale: React.FC<PainScaleProps> = ({ value, onChange, language }) => {
  const levels = [
    { score: 0, emoji: '😊', en: 'No Pain', hi: 'कोई दर्द नहीं', mr: 'वेदना नाही', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
    { score: 2, emoji: '🙂', en: 'Mild', hi: 'हल्का', mr: 'थोडी वेदना', color: 'bg-teal-50 text-teal-700 border-teal-300' },
    { score: 4, emoji: '😐', en: 'Moderate', hi: 'मध्यम', mr: 'मध्यम वेदना', color: 'bg-amber-50 text-amber-700 border-amber-300' },
    { score: 6, emoji: '😣', en: 'Severe', hi: 'तेज दर्द', mr: 'तीव्र वेदना', color: 'bg-orange-50 text-orange-700 border-orange-300' },
    { score: 8, emoji: '😫', en: 'Very Severe', hi: 'असहनीय', mr: 'अतिशय तीव्र', color: 'bg-rose-50 text-rose-700 border-rose-400' },
    { score: 10, emoji: '😭', en: 'Worst Possible', hi: 'चरम असहनीय', mr: 'असह्य वेदना', color: 'bg-red-100 text-red-800 border-red-500' },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">
          {language === 'hi' ? 'दर्द का स्तर (0 - 10)' : language === 'mr' ? 'वेदनेची तीव्रता (0 - 10)' : 'Pain Severity Scale (0 - 10)'}
        </span>
        <span className="px-3 py-1 bg-teal-100 text-teal-900 rounded-full font-bold text-sm">
          {value} / 10
        </span>
      </div>

      {/* Discrete Touch Targets */}
      <div className="grid grid-cols-6 gap-2">
        {levels.map((lvl) => {
          const isSelected = Math.abs(value - lvl.score) <= 1;
          const label = language === 'hi' ? lvl.hi : language === 'mr' ? lvl.mr : lvl.en;

          return (
            <button
              key={lvl.score}
              type="button"
              id={`pain-level-${lvl.score}`}
              onClick={() => onChange(lvl.score)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                isSelected
                  ? `${lvl.color} ring-4 ring-teal-500/20 scale-105 shadow-md font-bold`
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1">{lvl.emoji}</span>
              <span className="text-sm font-bold">{lvl.score}</span>
              <span className="text-[11px] leading-tight line-clamp-1 mt-0.5">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Slider for precision */}
      <div className="pt-2">
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
        />
        <div className="flex justify-between text-xs text-slate-500 px-1 mt-1">
          <span>0 (None)</span>
          <span>5 (Moderate)</span>
          <span>10 (Severe)</span>
        </div>
      </div>
    </div>
  );
};
