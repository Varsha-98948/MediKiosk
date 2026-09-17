import React, { useState } from 'react';
import { Volume2, ArrowLeft, QrCode, CreditCard, UserPlus, UserCheck, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { speakText } from '../../utils/speech';

interface IdentificationScreenProps {
  language: Language;
  onSelectMethod: (method: 'scan_abha' | 'enter_abha' | 'new_patient' | 'guest') => void;
  onBack: () => void;
}

export const IdentificationScreen: React.FC<IdentificationScreenProps> = ({
  language,
  onSelectMethod,
  onBack,
}) => {
  const t = translations[language];
  const [showAbhaInput, setShowAbhaInput] = useState(false);
  const [enteredAbha, setEnteredAbha] = useState('91-4829-1029-4401');

  const steps = [
    { num: 1, label: language === 'hi' ? 'पहचान' : language === 'mr' ? 'ओळख' : 'Identify', active: true },
    { num: 2, label: language === 'hi' ? 'समस्या' : language === 'mr' ? 'त्रास' : 'Tell Us' },
    { num: 3, label: language === 'hi' ? 'दस्तावेज़' : language === 'mr' ? 'कागदपत्रे' : 'Documents' },
    { num: 4, label: language === 'hi' ? 'जांच' : language === 'mr' ? 'तपासणी' : 'Review' },
    { num: 5, label: language === 'hi' ? 'डॉक्टर' : language === 'mr' ? 'डॉक्टर' : 'Doctor' },
  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-[580px] p-6 sm:p-10 max-w-3xl mx-auto">
      
      {/* Step Progress Bar */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
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
            onClick={() => speakText(t.identifyTitle, language)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200"
          >
            <Volume2 className="w-4 h-4 text-teal-600" />
            <span>{t.listen}</span>
          </button>
        </div>

        {/* Visual 5-Step Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0"></div>
            {steps.map((s, idx) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s.active
                      ? 'bg-teal-700 text-white ring-4 ring-teal-100'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {s.num}
                </div>
                <span className={`text-[11px] font-semibold ${s.active ? 'text-teal-900' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Options */}
      <div className="my-auto w-full py-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            {t.identifyTitle}
          </h2>
          <p className="text-sm text-slate-500">
            Ayushman Bharat Health Account (ABHA) / Fast Kiosk Check-In
          </p>
        </div>

        {!showAbhaInput ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Scan ABHA */}
            <button
              type="button"
              id="btn-scan-abha"
              onClick={() => onSelectMethod('scan_abha')}
              className="flex items-center gap-4 p-5 rounded-2xl border-2 border-teal-200 bg-teal-50/50 hover:bg-teal-50 hover:border-teal-500 transition-all text-left group shadow-xs cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-700 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <QrCode className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{t.scanAbha}</h3>
                <p className="text-xs text-slate-600">Scan QR from ABHA App, Ayushman Card or Aadhaar</p>
              </div>
            </button>

            {/* Enter ABHA */}
            <button
              type="button"
              id="btn-enter-abha"
              onClick={() => setShowAbhaInput(true)}
              className="flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-teal-500 hover:bg-slate-50 transition-all text-left group shadow-xs cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CreditCard className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{t.enterAbha}</h3>
                <p className="text-xs text-slate-600">14-digit ABHA ID or linked 10-digit mobile number</p>
              </div>
            </button>

            {/* New Patient Registration */}
            <button
              type="button"
              id="btn-new-patient"
              onClick={() => onSelectMethod('new_patient')}
              className="flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-teal-500 hover:bg-slate-50 transition-all text-left group shadow-xs cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <UserPlus className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{t.newPatient}</h3>
                <p className="text-xs text-slate-600">First time visiting this hospital OPD</p>
              </div>
            </button>

            {/* Continue as Guest */}
            <button
              type="button"
              id="btn-guest-intake"
              onClick={() => onSelectMethod('guest')}
              className="flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-teal-500 hover:bg-slate-50 transition-all text-left group shadow-xs cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <UserCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{t.continueGuest}</h3>
                <p className="text-xs text-slate-600">Quick emergency or walk-in consultation</p>
              </div>
            </button>

          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4 max-w-md mx-auto">
            <h3 className="font-bold text-slate-900 text-base">Enter 14-Digit ABHA ID</h3>
            <div>
              <input
                type="text"
                value={enteredAbha}
                onChange={(e) => setEnteredAbha(e.target.value)}
                placeholder="e.g. 91-4829-1029-4401"
                className="w-full px-4 py-3 text-lg font-mono tracking-wider border-2 border-teal-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowAbhaInput(false)}
                className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm"
              >
                {t.back}
              </button>
              <button
                type="button"
                onClick={() => onSelectMethod('enter_abha')}
                className="flex-2 py-3 bg-teal-700 text-white rounded-xl font-bold text-sm"
              >
                Fetch ABHA Profile
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>National Health Authority (NHA) & Ayushman Bharat Compliant</span>
      </div>

    </div>
  );
};
