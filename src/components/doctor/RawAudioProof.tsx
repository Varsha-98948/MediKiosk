'use client';

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText,
  RotateCcw
} from 'lucide-react';

interface RawAudioProofProps {
  transcript?: string;
  associatedField?: string;
  timestamp?: string;
  kioskId?: string;
  languageDetected?: string;
}

export const RawAudioProof: React.FC<RawAudioProofProps> = ({
  transcript = 'सीने में भारीपन और बाएँ हाथ में दर्द होता है जब तेज चलता हूँ। (Pain radiates to left arm when walking fast)',
  associatedField = 'Chief Complaint • Precordial Angina with Radiation',
  timestamp = 'Today, 10:14:22 AM IST',
  kioskId = 'Kiosk #01 (OPD Block A)',
  languageDetected = 'Hindi (हिन्दी) • 96% Acoustic Confidence',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 10;
        });
      }, 300); // 3-second duration total (300ms * 10 = 3000ms)
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setPlaybackProgress(0);
      setIsPlaying(true);
    }
  };

  // Waveform Bar heights (24 bars)
  const barHeights = [20, 35, 65, 80, 45, 90, 75, 60, 40, 85, 95, 70, 50, 60, 85, 40, 75, 90, 65, 50, 40, 60, 30, 15];

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-5 sm:p-6 shadow-xs space-y-4 font-['Outfit']">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#0D5C4D] text-white flex items-center justify-center font-black">
            <Volume2 className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-slate-900">
                Original Raw Audio Evidence
              </h4>
              <span className="text-[10px] font-bold bg-[#EBF3EF] text-[#0D5C4D] px-2 py-0.5 rounded-full border border-[#D1E4DB]">
                3-Second Verified Clip
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Field: <strong className="text-slate-800">{associatedField}</strong>
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 font-mono self-start sm:self-auto">
          {kioskId} • {timestamp}
        </div>
      </div>

      {/* Waveform Player & Controls */}
      <div className="bg-[#FAFBF9] p-4 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row items-center gap-4">
        
        {/* Play / Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0 ${
            isPlaying
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-[#0D5C4D] hover:bg-[#0F4C42] text-white'
          }`}
          title={isPlaying ? 'Pause Audio' : 'Play 3-second audio'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5 fill-white" />}
        </button>

        {/* Dynamic Waveform Visualization (24 bars) */}
        <div className="flex-1 w-full flex items-center justify-between gap-1 h-12 px-2 select-none">
          {barHeights.map((h, i) => {
            const barProgressPct = (i / barHeights.length) * 100;
            const isPassed = playbackProgress >= barProgressPct;
            return (
              <div
                key={i}
                className="flex-1 rounded-full transition-all duration-150"
                style={{
                  height: `${h}%`,
                  backgroundColor: isPassed ? '#0D5C4D' : '#CBD5E1',
                  transform: isPlaying && isPassed ? 'scaleY(1.15)' : 'scaleY(1)',
                }}
              ></div>
            );
          })}
        </div>

        {/* Duration Display */}
        <div className="text-xs font-mono font-bold text-slate-600 shrink-0">
          {isPlaying ? `00:0${Math.floor((playbackProgress / 100) * 3)}` : '00:03'} / 00:03
        </div>

      </div>

      {/* Transcript & Acoustic Proof Metadata */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
            Synchronized Patient Transcript
          </span>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {languageDetected}
          </span>
        </div>
        <p className="text-slate-800 font-bold leading-relaxed italic">
          "{transcript}"
        </p>
      </div>

    </div>
  );
};
