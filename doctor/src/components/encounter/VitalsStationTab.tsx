'use client';

import React from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';

export function VitalsStationTab() {
  const { vitals, updateVitals, setCurrentStep } = useClinicalEncounter();

  const getBpHtnCategory = (sys: number, dia: number) => {
    if (sys >= 140 || dia >= 90) {
      return { label: 'Stage 2 Hypertension', color: 'bg-error text-on-error' };
    }
    if (sys >= 130 || dia >= 80) {
      return { label: 'Stage 1 Hypertension', color: 'bg-amber-100 text-amber-900 border border-amber-300' };
    }
    if (sys >= 120 && dia < 80) {
      return { label: 'Elevated BP', color: 'bg-yellow-100 text-yellow-900' };
    }
    return { label: 'Normal Blood Pressure', color: 'bg-emerald-100 text-emerald-900' };
  };

  const htnCat = getBpHtnCategory(vitals.systolic, vitals.diastolic);

  return (
    <div className="flex flex-col w-full gap-5 select-none">
      {/* Vitals Station Header */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-[13px] mb-1">
            <span className="material-symbols-outlined text-[18px]">vital_signs</span>
            <span>Triage Station 2</span>
          </div>
          <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
            Clinical Vitals &amp; Biometric Triage Station
          </h2>
          <p className="text-[12px] text-on-surface-variant">
            High-precision vitals recording with automated BMI calculation and historical trend comparison
          </p>
        </div>

        <button
          onClick={() => setCurrentStep('complaints')}
          className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-2xs"
        >
          <span>Save &amp; Continue to Complaints</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Primary Vitals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Blood Pressure Card */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-error">favorite</span>
                Blood Pressure
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${htnCat.color}`}>
                {htnCat.label}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1">
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  Systolic (mmHg)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-[16px] font-bold text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  value={vitals.systolic}
                  onChange={(e) => updateVitals({ systolic: parseInt(e.target.value) || 0 })}
                />
              </div>
              <span className="text-[20px] text-on-surface-variant font-mono mt-4">/</span>
              <div className="flex-1">
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  Diastolic (mmHg)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-[16px] font-bold text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  value={vitals.diastolic}
                  onChange={(e) => updateVitals({ diastolic: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-center justify-between text-[11px] text-on-surface-variant">
            <span>Previous: {vitals.previousBp} mmHg</span>
            <span className="text-error font-semibold font-mono">{vitals.bpTrendDelta}</span>
          </div>
        </div>

        {/* Pulse Rate & SpO2 */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-primary">ecg_heart</span>
                Pulse Rate &amp; Oxygen Saturation
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold uppercase">
                Stable
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  Pulse (BPM)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-[16px] font-bold text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  value={vitals.pulse}
                  onChange={(e) => updateVitals({ pulse: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  SpO2 (%)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-[16px] font-bold text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  value={vitals.spo2}
                  onChange={(e) => updateVitals({ spo2: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-center justify-between text-[11px] text-on-surface-variant">
            <span>Normal: 60–100 bpm</span>
            <span className="text-emerald-700 font-semibold font-mono">Room Air (SpO2 98%)</span>
          </div>
        </div>

        {/* Temperature & Respiratory Rate */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-amber-600">device_thermostat</span>
                Temperature &amp; Respiration
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold uppercase">
                Afebrile
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  Temp (°F)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-[16px] font-bold text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  value={vitals.temp}
                  onChange={(e) => updateVitals({ temp: parseFloat(e.target.value) || 98.4 })}
                />
              </div>
              <div>
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  Resp. Rate (/min)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-[16px] font-bold text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  value={vitals.respiratoryRate}
                  onChange={(e) => updateVitals({ respiratoryRate: parseInt(e.target.value) || 16 })}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-center justify-between text-[11px] text-on-surface-variant">
            <span>Oral Sensor Calibrated</span>
            <span className="text-emerald-700 font-semibold font-mono">Normal RR (12–20)</span>
          </div>
        </div>
      </div>

      {/* Second Row: Blood Glucose & Biometric BMI Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Blood Sugar Monitoring */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">bloodtype</span>
              Point-of-Care Blood Sugar (mg/dL)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-error-container text-error font-bold uppercase">
              Hyperglycemia Alert
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container-high/40">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase block mb-1">
                Fasting Blood Sugar (FBS)
              </label>
              <div className="flex items-baseline gap-2">
                <input
                  type="number"
                  className="w-24 h-9 px-2.5 rounded bg-surface-container-lowest border border-surface-container-high font-mono text-[18px] font-bold text-primary outline-none focus:ring-1 focus:ring-primary"
                  value={vitals.bloodSugarFasting}
                  onChange={(e) => updateVitals({ bloodSugarFasting: parseInt(e.target.value) || 0 })}
                />
                <span className="text-[11px] text-on-surface-variant font-mono">mg/dL</span>
              </div>
              <span className="text-[10px] text-error font-semibold mt-1 block">
                Target: 80–130 mg/dL (&uarr; High)
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container-high/40">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase block mb-1">
                Postprandial (PPBS)
              </label>
              <div className="flex items-baseline gap-2">
                <input
                  type="number"
                  className="w-24 h-9 px-2.5 rounded bg-surface-container-lowest border border-surface-container-high font-mono text-[18px] font-bold text-primary outline-none focus:ring-1 focus:ring-primary"
                  value={vitals.bloodSugarPostprandial}
                  onChange={(e) => updateVitals({ bloodSugarPostprandial: parseInt(e.target.value) || 0 })}
                />
                <span className="text-[11px] text-on-surface-variant font-mono">mg/dL</span>
              </div>
              <span className="text-[10px] text-error font-semibold mt-1 block">
                Target: &lt; 180 mg/dL (&uarr; Excursion)
              </span>
            </div>
          </div>
        </div>

        {/* Height, Weight & Live BMI Gauge */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-primary">scale</span>
                Body Mass Index (BMI) &amp; Anthropometry
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold uppercase">
                {vitals.bmiCategory} ({vitals.bmi} kg/m²)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-[14px] font-bold text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  value={vitals.height}
                  onChange={(e) => updateVitals({ height: parseFloat(e.target.value) || 170 })}
                />
              </div>

              <div>
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-[14px] font-bold text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  value={vitals.weight}
                  onChange={(e) => updateVitals({ weight: parseFloat(e.target.value) || 70 })}
                />
              </div>
            </div>

            {/* Visual BMI Gauge Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[10px] text-on-surface-variant font-bold uppercase mb-1">
                <span>Underweight (&lt;18.5)</span>
                <span>Normal (18.5–24.9)</span>
                <span>Overweight (25–29.9)</span>
                <span>Obese (&gt;30)</span>
              </div>
              <div className="h-3 w-full rounded-full bg-surface-container-high overflow-hidden flex">
                <div className="w-[18%] bg-blue-300"></div>
                <div className="w-[32%] bg-emerald-400"></div>
                <div className="w-[25%] bg-amber-400 relative">
                  {/* Current BMI Marker */}
                  <div className="absolute top-0 bottom-0 right-3 w-1 bg-slate-900"></div>
                </div>
                <div className="w-[25%] bg-rose-400"></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-center justify-between text-[11px] text-on-surface-variant">
            <span>Previous Weight: {vitals.previousWeight} kg</span>
            <span className="text-error font-semibold font-mono">{vitals.weightTrendDelta}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
