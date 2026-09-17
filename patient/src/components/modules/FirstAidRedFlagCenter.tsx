'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  HeartHandshake, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  Clock,
  Flame,
  Zap,
  Info
} from 'lucide-react';
import { Language } from '../../types';
import { speakText, stopSpeaking } from '../../utils/speech';

interface EmergencyProtocol {
  id: string;
  title: string;
  category: 'Cardiac' | 'Respiratory' | 'Trauma' | 'Environmental';
  urgencyLevel: 'Immediate Red-Flag' | 'Urgent Triage';
  immediateActions: string[];
  doNots: string[];
  hospitalAlertPayload: string;
}

const PROTOCOLS: EmergencyProtocol[] = [
  {
    id: 'prot-01',
    title: 'Acute Chest Pain / Suspected Myocardial Infarction',
    category: 'Cardiac',
    urgencyLevel: 'Immediate Red-Flag',
    immediateActions: [
      'Have patient sit comfortably in semi-recumbent position (30-45 degrees).',
      'Administer Dispersible Aspirin (300mg) chewed immediately (if no known allergy or active gastrointestinal bleeding).',
      'Check vital signs (SpO2, Pulse, Blood Pressure) and connect continuous ECG monitor.',
      'Alert attending Emergency Medicine Physician & activate Cath Lab pathway.',
    ],
    doNots: [
      'Do not allow patient to walk, exert, or panic.',
      'Do not give heavy food or oral water until assessed.',
    ],
    hospitalAlertPayload: 'STAT ECG & Trop-I Order Triggered to Central Laboratory',
  },
  {
    id: 'prot-02',
    title: 'Adult Airway Obstruction / Choking',
    category: 'Respiratory',
    urgencyLevel: 'Immediate Red-Flag',
    immediateActions: [
      'If victim can cough or speak, encourage coughing; do not interfere.',
      'If silent choking: Deliver 5 sharp Back Blows between shoulder blades with heel of hand.',
      'If unresolved: Deliver 5 Abdominal Thrusts (Heimlich Maneuver) inward and upward.',
      'Repeat 5 back blows and 5 thrusts until obstruction clears or patient loses consciousness.',
    ],
    doNots: [
      'Do not perform blind finger sweeps in oral cavity.',
      'Do not administer abdominal thrusts to pregnant women or infants under 1 year.',
    ],
    hospitalAlertPayload: 'Emergency Airway Cart Requested to OPD Triage Bay',
  },
  {
    id: 'prot-03',
    title: 'Severe Burn Injury (Thermal / Chemical)',
    category: 'Trauma',
    urgencyLevel: 'Urgent Triage',
    immediateActions: [
      'Cool burn immediately with clean running tap water for at least 20 minutes.',
      'Remove constricting jewelry, belts, or clothing around burned area before swelling occurs.',
      'Cover with sterile non-adherent dressing or clean plastic cling film.',
      'Assess depth, total body surface area (Rule of Nines), and fluid resuscitation need.',
    ],
    doNots: [
      'Do not apply ice, iced water, butter, toothpaste, or home pastes on burns.',
      'Do not burst intact blisters.',
    ],
    hospitalAlertPayload: 'Burns Resuscitation Fluid Pack Assigned',
  },
];

interface FirstAidRedFlagCenterProps {
  language?: Language;
  onBack?: () => void;
  onTriggerEmergencyBroadcast?: (message: string) => void;
}

export const FirstAidRedFlagCenter: React.FC<FirstAidRedFlagCenterProps> = ({
  language = 'en',
  onBack,
  onTriggerEmergencyBroadcast,
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState<EmergencyProtocol>(PROTOCOLS[0]);
  const [alertSent, setAlertSent] = useState(false);

  const handleBroadcast = () => {
    setAlertSent(true);
    if (onTriggerEmergencyBroadcast) {
      onTriggerEmergencyBroadcast(`EMERGENCY: ${selectedProtocol.title} reported at OPD Kiosk`);
    }
    setTimeout(() => setAlertSent(false), 4000);
  };

  return (
    <div className="bg-white rounded-3xl border border-rose-200 shadow-sm p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
              <span>First Aid Emergency & Red-Flag Protocol Center</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                Rule-Based Triage
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Immediate life-saving clinical interventions & hospital emergency broadcast trigger
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBroadcast}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{alertSent ? 'Emergency PA Dispatched!' : 'Broadcast Hospital Red Alert'}</span>
          </button>

          {onBack && (
            <button
              onClick={onBack}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              ← Back
            </button>
          )}
        </div>
      </div>

      {/* Grid: Protocol Selector on Left, Actionable Guide on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List */}
        <div className="lg:col-span-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Critical Emergency Protocols
          </h3>
          {PROTOCOLS.map((prot) => {
            const isSelected = selectedProtocol.id === prot.id;
            return (
              <div
                key={prot.id}
                onClick={() => setSelectedProtocol(prot)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50 border-rose-600 shadow-xs ring-1 ring-rose-600'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase">
                    {prot.category}
                  </span>
                  <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" />
                    {prot.urgencyLevel}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">{prot.title}</h4>
              </div>
            );
          })}
        </div>

        {/* Right Detailed Action Card */}
        <div className="lg:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-5">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit']">
                  {selectedProtocol.title}
                </h3>
              </div>
              <p className="text-xs text-rose-700 font-semibold mt-1">
                Triage Priority: {selectedProtocol.urgencyLevel}
              </p>
            </div>

            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600">
              {selectedProtocol.hospitalAlertPayload}
            </span>
          </div>

          {/* Immediate Step-by-Step Actions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Immediate Step-by-Step Actions (Do First)
            </h4>
            <div className="space-y-2">
              {selectedProtocol.immediateActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical "Do Not" Rules */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Harm Prevention (Strictly Avoid)
            </h4>
            <ul className="space-y-1.5">
              {selectedProtocol.doNots.map((donot, idx) => (
                <li key={idx} className="text-xs text-rose-900 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl flex items-start gap-2">
                  <span className="font-bold text-rose-600">✕</span>
                  <span>{donot}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
