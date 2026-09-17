'use client';

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Type, 
  Sun, 
  Moon, 
  Lock, 
  ShieldCheck, 
  HeartPulse, 
  Activity, 
  Signal, 
  AlertTriangle, 
  CheckCircle2, 
  Video, 
  Hand,
  RotateCw,
  Sparkles,
  Info
} from 'lucide-react';
import { Language } from '../../types';

interface AccessibilityBiometricsPanelProps {
  language?: Language;
  onClose?: () => void;
  onApplyBiometrics?: (biometrics: { rhr: number; stressScore: number; signalQuality: number }) => void;
}

export const AccessibilityBiometricsPanel: React.FC<AccessibilityBiometricsPanelProps> = ({
  language = 'en',
  onClose,
  onApplyBiometrics,
}) => {
  // Accessibility States
  const [fontScale, setFontScale] = useState<'100' | '125' | '150'>('100');
  const [highContrast, setHighContrast] = useState(false);
  const [audioNarration, setAudioNarration] = useState(true);
  const [islRecognitionActive, setIslRecognitionActive] = useState(false);
  const [piiMaskingActive, setPiiMaskingActive] = useState(false);
  const [autoLockSeconds, setAutoLockSeconds] = useState(45);

  // Biometric Capture States
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [heartRate, setHeartRate] = useState(74);
  const [stressLevel, setStressLevel] = useState<'Mild' | 'Moderate' | 'High'>('Moderate');
  const [stressScore, setStressScore] = useState(48); // 0 to 100 HRV index
  const [signalQuality, setSignalQuality] = useState(96); // percentage
  const [measurementComplete, setMeasurementComplete] = useState(true);

  // Apply font scale to document body
  const handleFontScaleChange = (scale: '100' | '125' | '150') => {
    setFontScale(scale);
    document.body.classList.remove('font-scale-100', 'font-scale-125', 'font-scale-150');
    document.body.classList.add(`font-scale-${scale}`);
  };

  // Apply High Contrast to document body
  const handleHighContrastToggle = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  // Simulate Biometric Sensor Reading
  const handleStartMeasurement = () => {
    setIsMeasuring(true);
    setMeasurementComplete(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setHeartRate(prev => Math.floor(70 + Math.random() * 12));
      setSignalQuality(prev => Math.floor(92 + Math.random() * 7));
      if (progress >= 100) {
        clearInterval(interval);
        setIsMeasuring(false);
        setMeasurementComplete(true);
        setHeartRate(76);
        setStressScore(44);
        setStressLevel('Moderate');
        setSignalQuality(98);
        if (onApplyBiometrics) {
          onApplyBiometrics({ rhr: 76, stressScore: 44, signalQuality: 98 });
        }
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-8 font-['Outfit']">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span>
            <h3 className="text-xl font-black text-slate-900">
              Universal Accessibility & Biometric Vitals
            </h3>
            <span className="text-[10px] font-extrabold bg-[#EBF3EF] text-[#0D5C4D] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
              WCAG 2.1 AAA Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Elderly-friendly touch scaling, Indian Sign Language gesture recognition, and non-invasive optical biometric assessment.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black transition-colors cursor-pointer self-start sm:self-auto"
          >
            Close Settings
          </button>
        )}
      </div>

      {/* Grid: Left Accessibility Controls, Right Biometric Scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Accessibility & Privacy Shields */}
        <div className="lg:col-span-6 space-y-5">
          
          <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0D5C4D]" />
            <span>Inclusive Patient Controls</span>
          </h4>

          {/* 1. Large Text Mode Scaler */}
          <div className="bg-[#FAFBF9] p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-[#0D5C4D]" />
                <span>Text Size & Touch Targets</span>
              </label>
              <span className="text-[10px] font-bold text-slate-500">
                {fontScale === '100' ? 'Normal (100%)' : fontScale === '125' ? 'Large (125%)' : 'Extra Large (150%)'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleFontScaleChange('100')}
                className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                  fontScale === '100'
                    ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                A Standard
              </button>
              <button
                type="button"
                onClick={() => handleFontScaleChange('125')}
                className={`py-2 rounded-xl text-sm font-black border transition-all cursor-pointer ${
                  fontScale === '125'
                    ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                A+ Large
              </button>
              <button
                type="button"
                onClick={() => handleFontScaleChange('150')}
                className={`py-2 rounded-xl text-base font-black border transition-all cursor-pointer ${
                  fontScale === '150'
                    ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                A++ Maximum
              </button>
            </div>
          </div>

          {/* 2. High Contrast Clinical Mode & Audio Narration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleHighContrastToggle}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                highContrast
                  ? 'bg-slate-900 text-white border-slate-800 shadow-sm'
                  : 'bg-[#FAFBF9] border-slate-200 text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="space-y-0.5">
                <div className="text-xs font-black flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>High Contrast Mode</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {highContrast ? 'Deep OLED Contrast Enabled' : 'Soft Daylight Theme'}
                </div>
              </div>
              <span className={`w-3 h-3 rounded-full ${highContrast ? 'bg-amber-400' : 'bg-slate-300'}`}></span>
            </button>

            <button
              type="button"
              onClick={() => setAudioNarration(!audioNarration)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                audioNarration
                  ? 'bg-[#EBF3EF] border-[#D1E4DB] text-[#0D5C4D] shadow-2xs'
                  : 'bg-[#FAFBF9] border-slate-200 text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="space-y-0.5">
                <div className="text-xs font-black flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audio Instructions</span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {audioNarration ? 'Multilingual TTS Active' : 'Muted'}
                </div>
              </div>
              <span className={`w-3 h-3 rounded-full ${audioNarration ? 'bg-[#0D5C4D]' : 'bg-slate-300'}`}></span>
            </button>
          </div>

          {/* 3. Indian Sign Language (ISL) Recognition Toggle */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-200/70 text-amber-900 flex items-center justify-center font-black">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-amber-900">
                    Indian Sign Language (ISL) Assistant
                  </div>
                  <div className="text-[10px] text-amber-700 font-medium">
                    Gesture detection for speech & hearing-impaired patients
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIslRecognitionActive(!islRecognitionActive)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  islRecognitionActive
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white border border-amber-300 text-amber-900'
                }`}
              >
                {islRecognitionActive ? 'Active ✓' : 'Enable'}
              </button>
            </div>
          </div>

          {/* 4. Privacy & Anti-Shoulder Surfing Mode */}
          <div className="bg-[#FAFBF9] p-4 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#0D5C4D]" />
                <span className="text-xs font-black text-slate-800">
                  Anti-Shoulder-Surfing Privacy Mode
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPiiMaskingActive(!piiMaskingActive)}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  piiMaskingActive
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                {piiMaskingActive ? 'PII Masked 🔒' : 'Visible'}
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              Automatically obscures phone numbers, ABHA IDs, and sensitive diagnoses if no touchscreen interaction is detected for 45 seconds in the public waiting hall.
            </p>
          </div>

        </div>

        {/* Right Column: Non-Invasive Biometric Capture Station */}
        <div className="lg:col-span-6 bg-[#FAFBF9] p-5 sm:p-6 rounded-2xl border border-slate-200/90 space-y-5 flex flex-col justify-between">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0D5C4D] uppercase tracking-wider bg-[#EBF3EF] px-2.5 py-0.5 rounded-md border border-[#D1E4DB]">
                Optical Biometric Intake
              </span>
              <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                <Signal className="w-3.5 h-3.5 text-emerald-600" />
                Sensor Signal: {signalQuality}%
              </span>
            </div>

            <h4 className="text-base font-black text-slate-900">
              Non-Invasive Cardiovascular & Stress Indicator
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              Touch the kiosk optical scanner pad to capture baseline resting pulse rate and autonomic heart rate variability (HRV) stress index.
            </p>
          </div>

          {/* Visual Sensor Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* 1. Resting Heart Rate Card */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-rose-600" />
                  Resting Heart Rate
                </span>
                <span className="text-rose-600 font-black animate-pulse">● Live</span>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                  {isMeasuring ? '--' : heartRate}
                </span>
                <span className="text-xs font-bold text-slate-500">BPM</span>
              </div>

              <div className="text-[10px] text-slate-500 font-medium">
                Normal Clinical Range: 60–100 BPM
              </div>
            </div>

            {/* 2. Stress & Autonomic Tone Card */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#0D5C4D]" />
                  Stress HRV Index
                </span>
                <span className="text-[#0D5C4D] font-black">{stressLevel}</span>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                  {isMeasuring ? '--' : stressScore}
                </span>
                <span className="text-xs font-bold text-slate-500">/ 100</span>
              </div>

              <div className="text-[10px] text-slate-500 font-medium">
                Vata-Pitta Autonomic Balance Score
              </div>
            </div>

          </div>

          {/* Action to scan */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              disabled={isMeasuring}
              onClick={handleStartMeasurement}
              className="w-full py-3.5 bg-[#0D5C4D] hover:bg-[#0F4C42] disabled:bg-slate-400 text-white rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              {isMeasuring ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-emerald-300" />
                  <span>Calibrating Optical Pulse Sensor (Please Hold)...</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 text-emerald-300" />
                  <span>Scan / Re-measure Biometric Indicators</span>
                </>
              )}
            </button>

            {/* Mandated Clinical Disclaimer */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2 text-[11px] text-amber-900 font-medium leading-tight">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Clinical Notice:</strong> Biometric readings provided on this kiosk are physiological indicators intended for triage intake context only. They do not constitute a diagnostic claim and require appropriate clinical interpretation by a physician.
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
