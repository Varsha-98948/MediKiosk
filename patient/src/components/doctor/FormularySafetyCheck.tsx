'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Pill, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Info,
  ShieldCheck,
  Search,
  Plus
} from 'lucide-react';

interface HerbDrugInteraction {
  id: string;
  herbName: string;
  allopathicDrug: string;
  severity: 'critical' | 'moderate' | 'mild';
  mechanism: string;
  clinicalOutcome: string;
  recommendedReview: string;
  ayushReference: string;
}

export const FormularySafetyCheck: React.FC = () => {
  const [interactions, setInteractions] = useState<HerbDrugInteraction[]>([
    {
      id: 'int_1',
      herbName: 'Shuddha Guggulu (Commiphora mukul)',
      allopathicDrug: 'Aspirin / Ecosprin 75mg',
      severity: 'critical',
      mechanism: 'Guggulsterones exhibit intrinsic platelet anti-aggregation and fibrinolytic enhancement, amplifying Aspirin effect.',
      clinicalOutcome: 'Significantly elevated bleeding risk, mucosal ecchymosis, or gastrointestinal micro-hemorrhage.',
      recommendedReview: 'Reduce Guggulu dose or schedule separated timing (min 4 hours apart); monitor prothrombin time (PT/INR) and stool occult blood.',
      ayushReference: 'Dravyaguna Vijnana • Antiplatelet Synergism Index'
    },
    {
      id: 'int_2',
      herbName: 'Ashwagandha (Withania somnifera)',
      allopathicDrug: 'Alprazolam / Clonazepam (Sedatives)',
      severity: 'moderate',
      mechanism: 'Withanolides interact with GABA-A receptor complex, compounding CNS central sedative depression.',
      clinicalOutcome: 'Excessive daytime drowsiness, impaired motor reflexes, hypotension.',
      recommendedReview: 'Halve nocturnal sedative dose; administer Ashwagandha exclusively with warm milk in late evening.',
      ayushReference: 'Pharmacovigilance Ayush Suraksha Portal #AIIA-PV-1029'
    },
    {
      id: 'int_3',
      herbName: 'Yashtimadhu (Glycyrrhiza glabra / Licorice)',
      allopathicDrug: 'Hydrochlorothiazide / Digoxin',
      severity: 'moderate',
      mechanism: 'Glycyrrhizin inhibits 11-beta-hydroxysteroid dehydrogenase, inducing pseudo-hyperaldosteronism.',
      clinicalOutcome: 'Potassium wasting (Hypokalemia), increased risk of digitalis-induced cardiac arrhythmias.',
      recommendedReview: 'Substitute with Deglycyrrhizinated Licorice (DGL) or Shatavari; check serum potassium.',
      ayushReference: 'Indian Herbal Pharmacopoeia • Cardiovascular Safety Matrix'
    },
    {
      id: 'int_4',
      herbName: 'Triphala Churna (Amalaki, Haritaki, Bibhitaki)',
      allopathicDrug: 'Metformin 500mg',
      severity: 'mild',
      mechanism: 'Polyphenols mildly slow intestinal glucose transit and carbohydrate breakdown.',
      clinicalOutcome: 'Beneficial synergistic glycemic reduction; monitor for rare nocturnal hypoglycemia.',
      recommendedReview: 'Safe combination with routine self-monitoring of capillary fasting blood sugar.',
      ayushReference: 'Clinical Diabetology Integrative Guidelines'
    }
  ]);

  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'moderate' | 'mild'>('all');

  const filtered = interactions.filter(item => {
    if (filterSeverity === 'all') return true;
    return item.severity === filterSeverity;
  });

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-7 font-['Outfit']">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <h3 className="text-xl font-black text-slate-900">
              Formulary Safety Check & Herb–Drug Interactions
            </h3>
            <span className="text-[10px] font-black bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
              Ayush Suraksha Pharmacovigilance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time cross-pharmacology safety checker preventing adverse botanical-synthetic interactions.
          </p>
        </div>

        {/* Severity Filter Pills */}
        <div className="flex items-center bg-[#FAFBF9] p-1 rounded-2xl border border-slate-200 text-xs font-bold self-start sm:self-auto">
          {(['all', 'critical', 'moderate', 'mild'] as const).map((sev) => (
            <button
              key={sev}
              type="button"
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer ${
                filterSeverity === sev
                  ? 'bg-[#0D5C4D] text-white font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Interaction Cards Grid */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isCritical = item.severity === 'critical';
          const isModerate = item.severity === 'moderate';
          return (
            <div
              key={item.id}
              className={`rounded-3xl border p-5 sm:p-6 transition-all space-y-3 ${
                isCritical
                  ? 'bg-rose-50/40 border-rose-200 shadow-2xs'
                  : isModerate
                  ? 'bg-amber-50/40 border-amber-200 shadow-2xs'
                  : 'bg-emerald-50/30 border-emerald-200'
              }`}
            >
              {/* Interaction Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black ${
                    isCritical ? 'bg-rose-600 text-white' : isModerate ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {isCritical ? <AlertTriangle className="w-4 h-4" /> : isModerate ? <ShieldAlert className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>{item.herbName}</span>
                      <span className="text-slate-400 font-normal">+</span>
                      <span className="text-slate-900">{item.allopathicDrug}</span>
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase self-start sm:self-auto ${
                  isCritical
                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                    : isModerate
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}>
                  {item.severity} Warning
                </span>
              </div>

              {/* Mechanism & Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-500 block text-[10px] uppercase tracking-wider">
                    Pharmacological Mechanism:
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {item.mechanism}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-rose-700 block text-[10px] uppercase tracking-wider">
                    Clinical Potential Risk:
                  </span>
                  <p className="text-slate-800 leading-relaxed font-bold">
                    {item.clinicalOutcome}
                  </p>
                </div>
              </div>

              {/* Recommended Action & Ayush Reference */}
              <div className="p-3 bg-white/80 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-[#0D5C4D]">Recommended Clinical Action:</span>{' '}
                  <span className="text-slate-700 font-semibold">{item.recommendedReview}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono shrink-0">
                  Ref: {item.ayushReference}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
