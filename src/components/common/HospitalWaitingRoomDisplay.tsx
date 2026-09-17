'use client';

import React, { useState } from 'react';
import { 
  Tv, 
  Volume2, 
  Bell, 
  HeartPulse, 
  Users, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  ArrowRight,
  Radio,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Language, HospitalToken } from '../../types';
import { speakText } from '../../utils/speech';

interface HospitalWaitingRoomDisplayProps {
  language: Language;
  currentServingToken: string;
  servingRoom: string;
  servingDoctor: string;
  servingDepartment: string;
  servingPatientName?: string;
  waitingTokens: {
    token: string;
    patientName: string;
    dept: string;
    status: string;
    isPriority?: boolean;
  }[];
  onSimulateNextToken?: () => void;
  onBackToKiosk?: () => void;
}

export const HospitalWaitingRoomDisplay: React.FC<HospitalWaitingRoomDisplayProps> = ({
  language,
  currentServingToken,
  servingRoom,
  servingDoctor,
  servingDepartment,
  servingPatientName,
  waitingTokens,
  onSimulateNextToken,
  onBackToKiosk,
}) => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const handleBroadcastAnnouncement = () => {
    setIsBroadcasting(true);
    const speech = language === 'hi'
      ? `कृपया ध्यान दें। टोकन नंबर ${currentServingToken}, कमरा नंबर ${servingRoom} में पधारें।`
      : language === 'mr'
      ? `कृपया लक्ष द्या. टोकन क्रमांक ${currentServingToken}, खोली क्रमांक ${servingRoom} मध्ये यावे.`
      : `Attention please. Token Number ${currentServingToken}, please proceed to ${servingRoom}.`;
    
    speakText(speech, language);
    setTimeout(() => setIsBroadcasting(false), 4500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 flex flex-col justify-between font-['Outfit'] select-none">
      
      {/* Top Waiting Hall Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 flex items-center justify-center font-black shadow-lg ring-4 ring-cyan-500/20">
            <Tv className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                APEX MULTISPECIALTY HOSPITAL
              </h1>
              <span className="text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-3 py-0.5 rounded-full flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-ping text-emerald-400" />
                Live OPD Waiting Hall
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Automated Digital Token Queue Display • OPD Blocks A, B & C
            </p>
          </div>
        </div>

        {/* Live Audio PA Broadcast Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBroadcastAnnouncement}
            className={`px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all cursor-pointer shadow-lg ${
              isBroadcasting
                ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-300 animate-pulse'
                : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40'
            }`}
          >
            <Bell className="w-4 h-4 animate-bounce text-amber-400" />
            <span>📢 Broadcast Audio Call (घोषणा)</span>
          </button>

          {onBackToKiosk && (
            <button
              type="button"
              onClick={onBackToKiosk}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-2xl text-xs font-bold cursor-pointer transition-colors"
            >
              Exit TV Mode
            </button>
          )}
        </div>
      </div>

      {/* Main Waiting TV Layout (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 flex-1 items-stretch">
        
        {/* Left Column (7 Cols): Giant NOW SERVING Card */}
        <div className="lg:col-span-7 bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 rounded-3xl border-4 border-cyan-500/50 p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Pulse Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-4 py-1 rounded-full border border-cyan-500/40">
                🔔 NOW SERVING (वर्तमान टोकन)
              </span>
              <span className="text-xs font-bold text-slate-400 font-mono">
                Room Call Active
              </span>
            </div>

            {/* Giant Token Display */}
            <div className="py-6 text-center space-y-2">
              <h2 className="text-7xl sm:text-9xl font-black text-white font-mono tracking-widest drop-shadow-[0_0_35px_rgba(6,182,212,0.4)] animate-pulse">
                {currentServingToken}
              </h2>
              {servingPatientName && (
                <p className="text-lg sm:text-xl font-bold text-teal-200">
                  Patient: {servingPatientName}
                </p>
              )}
            </div>
          </div>

          {/* Consultation Room & Doctor Badge */}
          <div className="bg-slate-900/90 border-2 border-cyan-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-inner">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Please Proceed To (कमरा नंबर)
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {servingRoom}
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-0.5 border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
              <span className="text-xs font-bold text-teal-400 block">{servingDepartment}</span>
              <h4 className="text-base sm:text-lg font-black text-white">{servingDoctor}</h4>
              <span className="text-xs text-slate-400">Consultation in Progress</span>
            </div>
          </div>

        </div>

        {/* Right Column (5 Cols): UPCOMING TOKENS LIST */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl border-2 border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-5">
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-black text-base sm:text-lg text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span>NEXT TOKENS IN LINE (आगामी टोकन)</span>
              </h3>
              <span className="text-xs font-bold text-slate-400 font-mono">
                {waitingTokens.length} Waiting
              </span>
            </div>

            {/* Upcoming Token Items */}
            <div className="space-y-3 mt-4">
              {waitingTokens.slice(0, 5).map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                    idx === 0
                      ? 'bg-cyan-950/40 border-cyan-500/50 shadow-md scale-[1.01]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm ${
                      idx === 0 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      #{idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-base sm:text-lg font-black text-white font-mono tracking-wider">
                          {item.token}
                        </strong>
                        {item.isPriority && (
                          <span className="text-[10px] font-black bg-rose-950 text-rose-300 border border-rose-600/60 px-2 py-0.5 rounded-full animate-pulse">
                            Priority Flag
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 block font-medium">
                        {item.patientName} • {item.dept}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 block">
                      {idx === 0 ? 'Next in 3m' : `~${(idx + 1) * 6} mins`}
                    </span>
                    <span className="text-[10px] text-teal-400 font-bold uppercase">
                      {idx === 0 ? 'Get Ready' : 'Waiting'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulate Action for Demo Walkthroughs */}
          {onSimulateNextToken && (
            <div className="pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onSimulateNextToken}
                className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-2xl text-xs font-black flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
              >
                <span>Simulate Call Next Token</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Emergency Help & Ticker */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>If you experience acute chest pain or difficulty breathing, please notify the Triage Nurse immediately.</span>
        </div>

        <div className="flex items-center gap-2 text-white font-bold">
          <span>Emergency OPD Helpline:</span>
          <span className="text-cyan-400 font-mono">011-2659-4000 (Ext. 104)</span>
        </div>
      </div>

    </div>
  );
};
