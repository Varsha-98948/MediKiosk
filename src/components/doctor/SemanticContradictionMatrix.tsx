'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  Check, 
  HelpCircle,
  Link2,
  FileCheck2
} from 'lucide-react';

interface ContradictionItem {
  id: string;
  fieldA: {
    label: string;
    value: string;
    source: string;
  };
  fieldB: {
    label: string;
    value: string;
    source: string;
  };
  contradictionType: 'biological_impossibility' | 'doshic_contraindication' | 'pharmacological_conflict';
  severity: 'critical' | 'moderate';
  rationale: string;
  recommendedAction: string;
  status: 'pending' | 'corrected' | 'dismissed';
}

export const SemanticContradictionMatrix: React.FC = () => {
  const [contradictions, setContradictions] = useState<ContradictionItem[]>([
    {
      id: 'contra_1',
      fieldA: { label: 'Patient Demographics: Gender', value: 'Male (M)', source: 'Aadhaar / ABHA KYC' },
      fieldB: { label: 'Uploaded Lab Intake: Beta-hCG', value: 'Positive (Pregnancy Test)', source: 'OCR Upload Document #DOC-89' },
      contradictionType: 'biological_impossibility',
      severity: 'critical',
      rationale: 'Biological impossibility: Male patient records indicate pregnancy hormone assay positive. High likelihood of document mix-up with spouse or laboratory clerical error.',
      recommendedAction: 'Verify document identity with patient and unlink misattributed report from this EMR encounter.',
      status: 'pending'
    },
    {
      id: 'contra_2',
      fieldA: { label: 'Prakriti Assessment: Current Vikriti', value: 'Severe Pitta Aggravation with Daha (Burning)', source: 'Dashavidha Pariksha Intake' },
      fieldB: { label: 'Proposed Dravya Prescription', value: 'Maricha & Trikatu (Extreme Ushna/Hot potency)', source: 'Initial Drug Suggestion' },
      contradictionType: 'doshic_contraindication',
      severity: 'moderate',
      rationale: 'Classical Contraindication: Administering strong Ushna/Tikshna (heating/pungent) substances during acute Pitta Daha will exacerbate gastritis and arterial vascular tension.',
      recommendedAction: 'Substitute with Pitta-Shamaka digestive stimulants like Dhanyaka, Musta, or Usheera.',
      status: 'pending'
    }
  ]);

  const [activeCorrectionId, setActiveCorrectionId] = useState<string | null>(null);

  const handleAction = (id: string, newStatus: 'corrected' | 'dismissed') => {
    setContradictions(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-7 font-['Outfit']">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
            <h3 className="text-xl font-black text-slate-900">
              Semantic Contradiction Matrix
            </h3>
            <span className="text-[10px] font-black bg-rose-50 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
              Clinical Safety Shield
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Validates cross-field clinical coherence between demographics, lab reports, and Ayurvedic doshic contraindications.
          </p>
        </div>

        <div className="text-xs font-bold text-slate-500">
          Shield Status: <strong className="text-rose-700 font-black">2 Incoherencies Detected</strong>
        </div>
      </div>

      {/* Contradiction Cards with Visual Linking Connectors */}
      <div className="space-y-6">
        {contradictions.map((contra) => {
          const isResolved = contra.status !== 'pending';
          return (
            <div
              key={contra.id}
              className={`rounded-3xl border p-5 sm:p-6 transition-all ${
                isResolved
                  ? 'bg-slate-50/60 border-slate-200 opacity-80'
                  : contra.severity === 'critical'
                  ? 'bg-rose-50/30 border-rose-200 shadow-xs'
                  : 'bg-amber-50/30 border-amber-200 shadow-xs'
              }`}
            >
              {/* Alert Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/80">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black ${
                    contra.severity === 'critical' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>Clinical Contradiction Detected</span>
                      <span className={`text-[10px] font-black px-2 py-0.2 rounded-full border uppercase ${
                        contra.severity === 'critical'
                          ? 'bg-rose-100 text-rose-900 border-rose-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}>
                        {contra.contradictionType.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                {isResolved && (
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolution: {contra.status.toUpperCase()}</span>
                  </span>
                )}
              </div>

              {/* Visually Connected Fields (Field A <---> Field B) */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center py-4">
                
                {/* Field A */}
                <div className="md:col-span-5 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    Conflicting Parameter 1
                  </span>
                  <div className="text-xs font-bold text-slate-500">{contra.fieldA.label}</div>
                  <div className="text-base font-black text-slate-900 font-mono">{contra.fieldA.value}</div>
                  <div className="text-[10px] text-slate-400">Source: {contra.fieldA.source}</div>
                </div>

                {/* Visual Connector / Linkage */}
                <div className="md:col-span-1 flex flex-col items-center justify-center text-rose-600 font-black">
                  <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center">
                    <Link2 className="w-4 h-4 text-rose-600 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-bold text-rose-700 mt-1 uppercase">Conflict</span>
                </div>

                {/* Field B */}
                <div className="md:col-span-5 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    Conflicting Parameter 2
                  </span>
                  <div className="text-xs font-bold text-slate-500">{contra.fieldB.label}</div>
                  <div className="text-base font-black text-slate-900 font-mono">{contra.fieldB.value}</div>
                  <div className="text-[10px] text-slate-400">Source: {contra.fieldB.source}</div>
                </div>

              </div>

              {/* Rationale & Action Bar */}
              <div className="pt-2 border-t border-slate-200/80 space-y-3">
                <div className="text-xs text-slate-700 leading-relaxed font-medium">
                  <strong>Clinical Rationale:</strong> {contra.rationale}
                </div>
                <div className="text-xs text-[#0D5C4D] font-bold">
                  Recommended Action: {contra.recommendedAction}
                </div>

                {/* Action Buttons: Review, Correct, Dismiss */}
                {!isResolved && (
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => handleAction(contra.id, 'dismissed')}
                      className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    >
                      Dismiss as Clinical Exception
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(contra.id, 'corrected')}
                      className="px-5 py-2 bg-[#0D5C4D] hover:bg-[#0F4C42] text-white rounded-xl text-xs font-black cursor-pointer transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Correct & Verify Coherence</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
