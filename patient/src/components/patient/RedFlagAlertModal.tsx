import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, CheckCircle, UserCheck, BellRing } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { speakText } from '../../utils/speech';

interface RedFlagAlertModalProps {
  language: Language;
  isOpen: boolean;
  onCallStaff: () => void;
  onContinue: () => void;
  kioskNumber?: string;
  patientName?: string;
}

export const RedFlagAlertModal: React.FC<RedFlagAlertModalProps> = ({
  language,
  isOpen,
  onCallStaff,
  onContinue,
  kioskNumber = 'Kiosk #02 (OPD Ground Floor)',
  patientName = 'Rahul Sharma',
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl border-2 border-rose-300 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-center relative overflow-hidden">
        
        {/* Top Warning Ribbon */}
        <div className="w-20 h-20 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto ring-8 ring-rose-50 animate-pulse">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200 uppercase tracking-wider">
            <BellRing className="w-3.5 h-3.5 animate-pulse" /> {t.redFlagTitle}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">
            {t.redFlagSubtitle}
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            {t.redFlagNotice}
          </p>
        </div>

        {/* Live Triage Broadcast Details */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Location / Terminal:</span>
            <strong className="text-slate-900">{kioskNumber}</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Patient Check-In:</span>
            <strong className="text-slate-900">{patientName}</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Triage Priority:</span>
            <span className="text-rose-600 font-bold">LEVEL 1 — URGENT CLINICAL REVIEW</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={onCallStaff}
            className="w-full py-4 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
          >
            <PhoneCall className="w-5 h-5 animate-pulse" />
            <span>{t.callStaff}</span>
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="w-full py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-semibold text-sm transition-all"
          >
            {t.continueIfAllowed}
          </button>
        </div>

        <div className="text-[11px] text-slate-400">
          Doctor & OPD Nursing Station automatically alerted via MediKiosk Triage Network
        </div>

      </div>
    </div>
  );
};
