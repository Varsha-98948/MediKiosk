'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  QrCode, 
  FileCheck, 
  Scan, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Lock,
  RotateCw,
  Eye
} from 'lucide-react';

interface ForensicVerificationPanelProps {
  documentTitle?: string;
  facilityName?: string;
}

export const ForensicVerificationPanel: React.FC<ForensicVerificationPanelProps> = ({
  documentTitle = 'Comprehensive Biochemistry Panel (Report #L-4921)',
  facilityName = 'Apex Diagnostic & Research Laboratory (NABL Accredited)',
}) => {
  const [activeTab, setActiveTab] = useState<'integrity' | 'ela_analysis' | 'crypto_jws'>('integrity');
  const [elaFilterIntensity, setElaFilterIntensity] = useState<number>(65);

  const verificationMetrics = [
    { label: 'Cryptographic QR Code', status: 'verified', value: 'Valid AIIA/ABDM Public Key', desc: 'Embedded QR contains digital hash signed by hospital certificate.' },
    { label: 'JSON Web Signature (JWS)', status: 'verified', value: 'Signed (ES256 Algorithm)', desc: 'Header + Payload verified against national public registry.' },
    { label: 'Error Level Analysis (ELA)', status: 'warning', value: 'Compression Divergence on Line 4', desc: 'Creatinine value exhibits mild pixel compression variance vs surrounding text.' },
    { label: 'Numerical Layout & Font Grid', status: 'verified', value: 'Monospace Alignment 99.2%', desc: 'No baseline displacement or spliced glyph bounding boxes detected.' },
    { label: 'Exif & Metadata Continuity', status: 'verified', value: 'Generated directly via LIS Canon API', desc: 'No Photoshop or third-party image editor tag found.' }
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-7 font-['Outfit']">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span>
            <h3 className="text-xl font-black text-slate-900">
              Forensic Document Verification & Integrity
            </h3>
            <span className="text-[10px] font-black bg-[#EBF3EF] text-[#0D5C4D] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
              Anti-Tamper Protocol
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Clinical document forensic analysis detecting digital tampering, edited lab values, and cryptographic signature validity.
          </p>
        </div>

        {/* Big Mandated Clinical Verdict Badge (Verified ✓ or Review Required ⚠) */}
        <div className="px-4 py-2 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-center gap-2 shadow-2xs self-start sm:self-auto">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          <div className="leading-tight">
            <div className="text-xs font-black text-amber-900">Review Required ⚠</div>
            <div className="text-[10px] text-amber-700 font-semibold">1 Value Needs Doctor Scrutiny</div>
          </div>
        </div>
      </div>

      {/* Analysis Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold text-slate-600">
        <button
          type="button"
          onClick={() => setActiveTab('integrity')}
          className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'integrity'
              ? 'bg-[#0D5C4D] text-white shadow-xs'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Document Integrity Summary
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ela_analysis')}
          className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'ela_analysis'
              ? 'bg-[#0D5C4D] text-white shadow-xs'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Error Level Analysis (ELA) Visualizer
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('crypto_jws')}
          className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'crypto_jws'
              ? 'bg-[#0D5C4D] text-white shadow-xs'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Cryptographic JWS & QR Chain
        </button>
      </div>

      {/* Tab 1: Integrity Metric Checklist */}
      {activeTab === 'integrity' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#FAFBF9] rounded-2xl border border-slate-200 text-xs flex justify-between items-center">
            <div>
              <span className="text-slate-500 font-medium">Document Under Audit:</span>
              <div className="text-sm font-black text-slate-900">{documentTitle}</div>
              <div className="text-[11px] text-slate-500">{facilityName}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400">Total Integrity Score</span>
              <div className="text-2xl font-black text-[#0D5C4D] font-mono">92 / 100</div>
            </div>
          </div>

          <div className="space-y-2.5">
            {verificationMetrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black shrink-0 ${
                    m.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {m.status === 'verified' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black text-slate-900">{m.label}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{m.desc}</div>
                  </div>
                </div>

                <div className="self-end sm:self-auto text-right">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                    m.status === 'verified'
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border-amber-300'
                  }`}>
                    {m.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Error Level Analysis Visualizer */}
      {activeTab === 'ela_analysis' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Compression Error Sensitivity Slider:</span>
            <span className="font-mono font-black text-slate-900">{elaFilterIntensity}%</span>
          </div>

          <input
            type="range"
            min="20"
            max="95"
            value={elaFilterIntensity}
            onChange={(e) => setElaFilterIntensity(Number(e.target.value))}
            className="w-full accent-[#0D5C4D] h-2 bg-slate-200 rounded-lg cursor-pointer"
          />

          {/* ELA Visual Preview Window */}
          <div className="h-64 bg-slate-950 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden text-center text-white border border-slate-800">
            {/* Simulated ELA Noise Map */}
            <div className="space-y-2 relative z-10">
              <div className="text-xs font-mono text-emerald-400">
                [ELA SCANNER ACTIVE: RESIDUAL ARTIFACT ANALYSIS]
              </div>
              <div className="text-sm font-bold text-slate-300 max-w-md">
                Background uniform noise: <span className="text-emerald-400 font-mono">0.034 dB</span> (Consistent scan surface)
              </div>
              
              {/* Highlighted anomaly line */}
              <div className="p-3 bg-amber-500/20 border border-amber-400/80 rounded-xl text-amber-300 text-xs font-mono inline-block mt-3 animate-pulse">
                ⚠ Divergent Compression Discovered: Line 4 "Serum Creatinine 1.28 mg/dL"
              </div>
              <div className="text-[10px] text-slate-400">
                Pixel noise suggests the digit "1.28" was potentially re-saved with a different JPEG quantization table.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Cryptographic JWS & QR Chain */}
      {activeTab === 'crypto_jws' && (
        <div className="bg-[#FAFBF9] p-5 rounded-2xl border border-slate-200 space-y-4 text-xs font-mono">
          <div className="flex items-center justify-between text-slate-800 font-bold pb-2 border-b border-slate-200">
            <span className="flex items-center gap-1.5"><QrCode className="w-4 h-4 text-[#0D5C4D]" /> JWS Compact Header + Signature:</span>
            <span className="text-emerald-700 font-black">VALID CERTIFICATE ✓</span>
          </div>

          <div className="bg-slate-900 text-slate-300 p-4 rounded-xl text-[11px] leading-relaxed break-all overflow-x-auto">
            <span className="text-emerald-400">eyJhbGciOiJFUzI1NiIsIng1YyI6WyJNSUlCaVRDQ0FRMmdBd0lCQWdJ...</span>.
            <span className="text-amber-400">eyJwYXRob2xvZ3lJc3N1ZXIiOiJBcGV4IExhYnMiLCJyZXBvcnRJZCI6IjQ5MjEiLCJkYXRlIjoiMjAyNi0wOS0wNiIsImhhc2giOiJhZmQ3MjljOGIyNDcifQ...</span>.
            <span className="text-cyan-400">dBj4v5N3kL7pQ8wZ9mX2sR4tY1uI0oP5aA6dF8gH...</span>
          </div>

          <p className="text-slate-600 font-sans text-xs">
            The cryptographic signature confirms the report was published by Apex Laboratories. However, the ELA anomaly recommends the physician re-confirm the serum creatinine value with the patient or repeat the blood draw.
          </p>
        </div>
      )}

    </div>
  );
};
