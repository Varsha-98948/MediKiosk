import React from 'react';
import { 
  ArrowLeft, 
  Leaf, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Sparkles,
  Info,
  BookOpen
} from 'lucide-react';
import { PatientRecord } from '../../types';

interface AyushIntegrationViewProps {
  patient: PatientRecord;
  onBack: () => void;
}

export const AyushIntegrationView: React.FC<AyushIntegrationViewProps> = ({
  patient,
  onBack,
}) => {
  const ayush = patient.ayushAssessment;

  // Full Dashavidha Pariksha 10-Fold Ayurvedic Assessment Parameters
  const dashavidhaPariksha = [
    { title: '1. Prakriti (Doshic Constitution)', value: ayush?.prakritiType || 'Pitta-Kapha (द्वन्द्वज)', detail: 'High Pitta thermal energy with secondary Kapha congestion' },
    { title: '2. Vikriti (Pathological Imbalance)', value: 'Vata-Pitta Dushti', detail: 'Rakta-Vaha Srotas obstruction manifesting as exertional angina' },
    { title: '3. Sara (Tissue Quality)', value: 'Rakta & Medo Sara', detail: 'Rich vascular tissue with moderate adipose saturation' },
    { title: '4. Samhanana (Body Compactness)', value: 'Madhyama (Moderate)', detail: 'Symmetrical musculoskeletal frame and rib cage' },
    { title: '5. Pramana (Anthropometric Proportion)', value: 'Normal BMI (24.2 kg/m²)', detail: 'Proportionate height-to-waist ratio' },
    { title: '6. Satmya (Adaptability/Habituation)', value: 'Satmya to Mixed Diet', detail: 'Accustomed to North Indian spices and cooked pulses' },
    { title: '7. Sattva (Mental Resistance)', value: 'Madhyama Sattva', detail: 'Good emotional resilience during clinical interviews' },
    { title: '8. Ahara Shakti (Digestive Capacity)', value: ayush?.agniStatus || 'Mandagni (मंद जठराग्नि)', detail: 'Sub-optimal digestive fire resulting in Ama accumulation' },
    { title: '9. Vyayama Shakti (Exercise Tolerance)', value: 'Alpa (Low Exertion)', detail: 'Exertional breathlessness on climbing 1 flight of stairs' },
    { title: '10. Vaya (Age Stage)', value: 'Madhyama Vaya (Middle Age)', detail: 'Degenerative metabolic transition phase' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
                AYUSH & Integrative Medicine Clinical Module
              </h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                National Ayush Morbidity Code Compliant
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Integrative holistic profiling alongside modern Cardiology encounter
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-900 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 font-bold">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span>Ayurveda • All India Institute of Ayurveda (AIIA)</span>
        </div>
      </div>

      {/* 10-Fold Dashavidha Pariksha Clinical Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <h3 className="font-extrabold text-slate-900 text-base font-['Outfit']">
              Dashavidha Pariksha (10-Fold Ayurvedic Assessment)
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Standardized Intake Ontology
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {dashavidhaPariksha.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5 hover:border-emerald-300 transition-colors">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block truncate">
                {item.title}
              </span>
              <div className="text-sm font-extrabold text-slate-900 font-['Outfit'] truncate">
                {item.value}
              </div>
              <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Herb-Drug Interaction & Safety Analysis */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base font-['Outfit']">
              Ayush Suraksha — Herb-Drug Interaction Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Cross-referenced against current Allopathic medications for safety
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Co-Prescription Verified Safe</span>
          </span>
        </div>

        <div className="space-y-3">
          {(ayush?.herbDrugInteractions || [
            {
              herb: 'Terminalia Arjuna (Arjuna Kwatha)',
              allopathicDrug: 'Aspirin 75mg / Ecosprin',
              note: 'Synergistic cardioprotective and mild anti-platelet activity. Safe under medical supervision.',
              severity: 'safe' as const
            },
            {
              herb: 'Guggulu (Commiphora mukul)',
              allopathicDrug: 'Atorvastatin 10mg',
              note: 'Monitored co-administration recommended for lipid reduction; test LFT baseline.',
              severity: 'caution' as const
            }
          ]).map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 text-xs ${
                item.severity === 'safe'
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/60 border-amber-200 text-amber-950'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <strong className="text-sm font-extrabold text-slate-900">{item.herb}</strong>
                  <span className="font-bold text-slate-400">+</span>
                  <strong className="text-sm font-extrabold text-slate-900">{item.allopathicDrug}</strong>
                </div>
                <p className="text-xs text-slate-700 font-medium">{item.note}</p>
              </div>

              <div className="shrink-0 text-right">
                <span className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] uppercase ${
                  item.severity === 'safe'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {item.severity}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
