'use client';

import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  CheckCircle2, 
  Activity, 
  Flame, 
  Wind, 
  Droplet, 
  ArrowRight,
  ShieldCheck,
  FileCode,
  Sliders
} from 'lucide-react';
import { PatientRecord, Language } from '../../types';

interface AyushIntelligenceEngineProps {
  patient?: PatientRecord;
  language?: Language;
  onNavigateToCoding?: () => void;
}

interface DashavidhaItem {
  id: string;
  categoryNumber: number;
  sanskritName: string;
  englishTitle: string;
  currentFinding: string;
  clinicalSignificance: string;
  charakaCitation: string;
  doshicAffinity: string;
  expandedDetails: {
    definition: string;
    diagnosticMarkers: string[];
    therapeuticGuidance: string;
  };
}

const DASHAVIDHA_PARIKSHA_DATA: DashavidhaItem[] = [
  {
    id: 'dushya',
    categoryNumber: 1,
    sanskritName: 'दूष्य (Dushya)',
    englishTitle: 'Tissues & Vitiated Substrates',
    currentFinding: 'Rakta (Blood) & Medas (Adipose tissue) Vitiation',
    clinicalSignificance: 'Circulatory srotas congestion with lipid elevation causing exertional tightness.',
    charakaCitation: 'Charaka Vimana Sthana 8/94',
    doshicAffinity: 'Vata-Pitta Dushti',
    expandedDetails: {
      definition: 'Substances or body tissues (Dhatus and Malas) susceptible to vitiation by aggravated Doshas.',
      diagnosticMarkers: ['Heaviness in chest precordial region', 'Mild breathlessness on physical exertion', 'Lipid dyslipidemia'],
      therapeuticGuidance: 'Employ Medohara and Hridya formulations (Pushkarmool, Guggulu, Arjuna).'
    }
  },
  {
    id: 'desha',
    categoryNumber: 2,
    sanskritName: 'देश (Desha)',
    englishTitle: 'Geographic Habitat & Soil',
    currentFinding: 'Sadharana Desha (Temperate / Mixed Urban Environment)',
    clinicalSignificance: 'Patient resides in Delhi NCR with exposure to moderate humidity and atmospheric particulate matter.',
    charakaCitation: 'Charaka Vimana Sthana 8/93',
    doshicAffinity: 'Balanced Soil / Urban Vata Aggravation',
    expandedDetails: {
      definition: 'Geographical classification of land (Jangala = arid/Vata, Anupa = marshy/Kapha, Sadharana = moderate/equable).',
      diagnosticMarkers: ['Moderate atmospheric humidity', 'Urban dust/smog exposure contributing to Pranavaha Srotas strain'],
      therapeuticGuidance: 'Advise Pranayama with air-purifying herbs and Nasya with Anu Taila.'
    }
  },
  {
    id: 'bala',
    categoryNumber: 3,
    sanskritName: 'बल (Bala)',
    englishTitle: 'Immune & Vital Strength',
    currentFinding: 'Madhyama Bala (Moderate Constitutional Strength)',
    clinicalSignificance: 'Good recovery potential; patient tolerates standard therapeutic dosages without hypersensitivity.',
    charakaCitation: 'Charaka Vimana Sthana 8/95',
    doshicAffinity: 'Sahaja + Yuktikrita Bala',
    expandedDetails: {
      definition: 'Threefold physical and immunological resilience: Sahaja (innate), Kalaja (chronobiological), Yuktikrita (acquired).',
      diagnosticMarkers: ['Normal grip strength and posture', 'Moderate stamina during routine activities'],
      therapeuticGuidance: 'Rasayana therapy indicated (Amalaki, Ashwagandha) to fortify Ojas.'
    }
  },
  {
    id: 'kala',
    categoryNumber: 4,
    sanskritName: 'काल (Kala)',
    englishTitle: 'Season & Circadian Timing',
    currentFinding: 'Sharad Ritu (Autumn transition) • Pitta Aggravation Phase',
    clinicalSignificance: 'Seasonal transition increases natural thermal irritability and arterial vascular reactivity.',
    charakaCitation: 'Charaka Vimana Sthana 8/96',
    doshicAffinity: 'Pitta Prakopa Kala',
    expandedDetails: {
      definition: 'Time dimension encompassing seasonal diurnal cycles (Ritu) and patient disease chronobiology.',
      diagnosticMarkers: ['Increased subjective body heat and thirst', 'Chest discomfort reported mostly between 11 AM – 2 PM'],
      therapeuticGuidance: 'Tikta-Madhura Rasa diet with cooling Dravyas (Chandana, Usheera).'
    }
  },
  {
    id: 'anala',
    categoryNumber: 5,
    sanskritName: 'अनल / अग्नि (Anala / Agni)',
    englishTitle: 'Digestive & Metabolic Fire',
    currentFinding: 'Mandagni (Sub-optimal, sluggish digestion with Ama)',
    clinicalSignificance: 'Incomplete metabolic transformation produces endotoxin (Ama) obstructing Rasavaha Srotas.',
    charakaCitation: 'Charaka Grahani Chikitsa 15/51',
    doshicAffinity: 'Kapha-Vataja Mandagni',
    expandedDetails: {
      definition: 'Biological metabolic catalyst governing digestion (Jatharagni), absorption, and cellular assimilation (Dhatwagni).',
      diagnosticMarkers: ['Post-prandial heaviness lasting > 3 hours', 'Coated tongue (Saama Jihva)', 'Sluggish bowel clearance'],
      therapeuticGuidance: 'Prescribe Deepana-Pachana herbs (Trikatu, Shunthi, Chitrakadi Vati).'
    }
  },
  {
    id: 'prakriti',
    categoryNumber: 6,
    sanskritName: 'प्रकृति (Prakriti)',
    englishTitle: 'Inherent Doshic Constitution',
    currentFinding: 'Pitta-Kapha (द्वन्द्वज प्रकृति) with Vata Imbalance',
    clinicalSignificance: 'Dominant Pitta confers high vascular warmth; secondary Kapha predisposes to tissue congestion.',
    charakaCitation: 'Charaka Vimana Sthana 8/98',
    doshicAffinity: 'Pitta 50%, Kapha 40%, Vata 35%',
    expandedDetails: {
      definition: 'Genetically and maternally fixed constitutional matrix determined at the moment of conception (Shukra-Shonita).',
      diagnosticMarkers: ['Warm palms and feet', 'Moderate muscular frame', 'Intolerance to extreme heat and humid conditions'],
      therapeuticGuidance: 'Avoid hot pungent spicy stimulants; favor wholesome Madhura-Kashaya tastes.'
    }
  },
  {
    id: 'vayas',
    categoryNumber: 7,
    sanskritName: 'वयस् (Vayas)',
    englishTitle: 'Chronological Age Stage',
    currentFinding: 'Madhyama Vaya (54 Years, Middle Age / Pitta-Vata shift)',
    clinicalSignificance: 'Transition from Pitta metabolic maturity toward Vata degenerative susceptibility.',
    charakaCitation: 'Charaka Vimana Sthana 8/100',
    doshicAffinity: 'Pitta-Vata Junction',
    expandedDetails: {
      definition: 'Three primary human lifespans: Balya (childhood/Kapha), Madhyama (adult/Pitta), Vardhakya (elderly/Vata).',
      diagnosticMarkers: ['Arteriosclerotic changes common in this demographic', 'Mild presbyopia and occasional joint stiffness'],
      therapeuticGuidance: 'Vata-shamaka care with gentle oil massage (Abhyanga) and joint rejuvenation.'
    }
  },
  {
    id: 'sattva',
    categoryNumber: 8,
    sanskritName: 'सत्त्व (Sattva)',
    englishTitle: 'Mental Strength & Emotional Resilience',
    currentFinding: 'Madhyama Sattva (Balanced Cognitive Coping)',
    clinicalSignificance: 'Patient rationalizes clinical symptoms well and adheres strictly to physician guidance.',
    charakaCitation: 'Charaka Vimana Sthana 8/101',
    doshicAffinity: 'Sattva > Rajas > Tamas',
    expandedDetails: {
      definition: 'Psychological fortitude and tolerance to physical pain, distress, and clinical procedures.',
      diagnosticMarkers: ['Cooperative during clinical interview', 'Mild work-related anxiety during peak hours'],
      therapeuticGuidance: 'Medhya Rasayana (Brahmi, Shankhpushpi, Mandukaparni) and daily meditation.'
    }
  },
  {
    id: 'satmya',
    categoryNumber: 9,
    sanskritName: 'सात्म्य (Satmya)',
    englishTitle: 'Habituation & Biological Adaptability',
    currentFinding: 'Vyayamasatmya Alpa • Satmya to Vegetarian Grain Diet',
    clinicalSignificance: 'Accustomed to wheat, lentils, and moderate dairy; low habituation to strenuous cardiovascular exertion.',
    charakaCitation: 'Charaka Vimana Sthana 8/102',
    doshicAffinity: 'Sarvarasa Satmya (Mixed)',
    expandedDetails: {
      definition: 'Substances, foods, or regimens that are wholesome and comfortable due to prolonged continuous usage.',
      diagnosticMarkers: ['Tolerance to cow milk and cooked ghee', 'Low tolerance to sudden unaccustomed hill climbing'],
      therapeuticGuidance: 'Gradual graded exercise (Vyayama) up to Ardhashakti (half of maximum capacity).'
    }
  },
  {
    id: 'ahara',
    categoryNumber: 10,
    sanskritName: 'आहार शक्ति (Ahara Shakti)',
    englishTitle: 'Food Capacity & Intake Tolerance',
    currentFinding: 'Abhyavaharana Shakti: Madhyama • Jarana Shakti: Alpa',
    clinicalSignificance: 'Patient can ingest normal food portions but digests them slowly, risking sub-optimal absorption.',
    charakaCitation: 'Charaka Vimana Sthana 8/103',
    doshicAffinity: 'Alpa Jarana Shakti',
    expandedDetails: {
      definition: 'Evaluation of both intake volume capacity (Abhyavaharana) and digestive-metabolic breakdown speed (Jarana).',
      diagnosticMarkers: ['Fullness after dinner', 'Clear tongue by morning only with early light meals'],
      therapeuticGuidance: 'Laghu Ahara (light dinners like Moong dal soup) 3 hours prior to sleep.'
    }
  }
];

export const AyushIntelligenceEngine: React.FC<AyushIntelligenceEngineProps> = ({
  patient,
  language = 'en',
  onNavigateToCoding,
}) => {
  const [expandedId, setExpandedId] = useState<string>('dushya');
  const [vataVal, setVataVal] = useState(35);
  const [pittaVal, setPittaVal] = useState(50);
  const [kaphaVal, setKaphaVal] = useState(40);

  // Pipeline step tracker
  const [activePipelineStep, setActivePipelineStep] = useState<number>(3);

  const pipelineStages = [
    { num: 1, title: 'Patient Symptoms', desc: 'Chest tightness, radiating ache, morning stiffness' },
    { num: 2, title: 'Adaptive Interview', desc: 'Branching Q&A, voice audio, 2D Marma location' },
    { num: 3, title: 'Dashavidha Pariksha', desc: '10-fold classical diagnostic matrix' },
    { num: 4, title: 'Prakriti Profile', desc: 'Triad polygon balance & metabolic assessment' },
    { num: 5, title: 'Clinical Knowledge', desc: 'Charaka & Sushruta rule-based mapping' },
    { num: 6, title: 'NAMASTE / ICD-11 TM2', desc: 'Standardized national & WHO morbidity codes' },
  ];

  // Dynamic Polygon coordinates calculation for Triad Balance
  // Center is (150, 150), radius is 100.
  // Vata at Top (angle -90 deg): (150, 150 - r)
  // Pitta at Bottom Right (angle 30 deg): (150 + r*cos(30), 150 + r*sin(30))
  // Kapha at Bottom Left (angle 150 deg): (150 - r*cos(30), 150 + r*sin(30))
  const rVata = (vataVal / 100) * 95;
  const rPitta = (pittaVal / 100) * 95;
  const rKapha = (kaphaVal / 100) * 95;

  const vataX = 150;
  const vataY = 150 - rVata;

  const cos30 = 0.866;
  const sin30 = 0.5;

  const pittaX = 150 + rPitta * cos30;
  const pittaY = 150 + rPitta * sin30;

  const kaphaX = 150 - rKapha * cos30;
  const kaphaY = 150 + rKapha * sin30;

  const polygonPoints = `${vataX},${vataY} ${pittaX},${pittaY} ${kaphaX},${kaphaY}`;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 font-['Outfit']">
      
      {/* 1. Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6ECE8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0D5C4D] text-white flex items-center justify-center shadow-xs">
            <Brain className="w-7 h-7 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Ayush Intelligence Engine
              </h2>
              <span className="text-xs font-black bg-[#EBF3EF] text-[#0D5C4D] px-3 py-0.5 rounded-full border border-[#D1E4DB]">
                Classical Ontology Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Transforms unstructured intake into verified Dashavidha Pariksha, Prakriti Polygon, and NAMASTE / ICD-11 TM2 codings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToCoding && (
            <button
              type="button"
              onClick={onNavigateToCoding}
              className="px-5 py-2.5 bg-[#0D5C4D] hover:bg-[#0F4C42] text-white rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <FileCode className="w-4 h-4 text-emerald-300" />
              <span>Open NAMASTE & ICD-11 Coding</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Visual Pipeline Flow (6 Stages) */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6ECE8] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-[#0D5C4D] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Clinical Reasoning Transformation Pipeline
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Interactive: Click step to inspect
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {pipelineStages.map((stage) => {
            const isActive = activePipelineStep === stage.num;
            return (
              <button
                key={stage.num}
                type="button"
                onClick={() => setActivePipelineStep(stage.num)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-sm scale-[1.02]'
                    : 'bg-[#FAFBF9] border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className={`text-[10px] font-mono font-black ${isActive ? 'text-emerald-300' : 'text-slate-400'}`}>
                    STAGE 0{stage.num}
                  </div>
                  <div className="text-xs font-black leading-tight mt-1">
                    {stage.title}
                  </div>
                </div>
                <p className={`text-[10px] mt-2 leading-relaxed line-clamp-2 ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                  {stage.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Grid: Left Prakriti Multi-Axis Polygon, Right 10-Fold Dashavidha Pariksha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Prakriti Profile (Custom Triad Polygon Radar - Not a Generic Pie Chart) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E6ECE8] shadow-xs space-y-6">
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0D5C4D] uppercase tracking-wider bg-[#EBF3EF] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
                Prakriti Triad Balance
              </span>
              <span className="text-[10px] font-bold text-slate-500">
                Non-Pie Multidimensional Radar
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Prakriti Constitutional Profile
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Triad balance showing innate baseline constitution (Prakriti) versus current disease perturbation (Vikriti).
            </p>
          </div>

          {/* Polygon SVG Canvas */}
          <div className="flex justify-center bg-[#FAFBF9] p-4 rounded-2xl border border-slate-200/90 relative overflow-hidden">
            
            <svg viewBox="0 0 300 270" className="w-full max-w-[280px] h-[250px] select-none">
              <defs>
                <linearGradient id="prakritiGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0D5C4D" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Background Reference Triangles (Grid) */}
              {/* 100% outer */}
              <polygon points="150,55 232,198 68,198" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
              {/* 66% mid */}
              <polygon points="150,86 205,182 95,182" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />
              {/* 33% inner */}
              <polygon points="150,118 178,166 122,166" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />

              {/* Radial Axis Lines */}
              <line x1="150" y1="150" x2="150" y2="55" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="150" y1="150" x2="232" y2="198" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="150" y1="150" x2="68" y2="198" stroke="#CBD5E1" strokeWidth="1" />

              {/* Dynamic Filled Polygon */}
              <polygon
                points={polygonPoints}
                fill="url(#prakritiGradient)"
                stroke="#0D5C4D"
                strokeWidth="2.5"
                className="transition-all duration-300"
              />

              {/* Data Marker Dots */}
              <circle cx={vataX} cy={vataY} r="5" fill="#0D5C4D" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx={pittaX} cy={pittaY} r="5" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx={kaphaX} cy={kaphaY} r="5" fill="#0F4C42" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Labels with Dosha Icons */}
              <text x="150" y="38" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0D5C4D">
                Vata (वात) {vataVal}%
              </text>
              <text x="245" y="215" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#D97706">
                Pitta (पित्त) {pittaVal}%
              </text>
              <text x="55" y="215" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F4C42">
                Kapha (कफ) {kaphaVal}%
              </text>
            </svg>

            {/* Current Diagnosed Constitution Badge */}
            <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md p-2 rounded-xl border border-slate-200 text-center shadow-2xs">
              <span className="text-[11px] font-black text-slate-800">
                Primary: <strong>Pitta-Kapha (द्वन्द्वज)</strong> • Secondary Vata Agitation
              </span>
            </div>
          </div>

          {/* Interactive Doshic Balance Sliders */}
          <div className="space-y-3 bg-[#FAFBF9] p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1"><Sliders className="w-3.5 h-3.5 text-[#0D5C4D]" /> Interactive Doshic Tuner</span>
              <span className="text-[10px] text-slate-400">Calibrated via Intake</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0D5C4D] flex items-center gap-1"><Wind className="w-3 h-3" /> Vata (Movement & Nervous):</span>
                <span className="font-mono font-black">{vataVal}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={vataVal}
                onChange={(e) => setVataVal(Number(e.target.value))}
                className="w-full accent-[#0D5C4D] h-1.5 bg-slate-200 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-700 flex items-center gap-1"><Flame className="w-3 h-3" /> Pitta (Metabolism & Heat):</span>
                <span className="font-mono font-black">{pittaVal}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={pittaVal}
                onChange={(e) => setPittaVal(Number(e.target.value))}
                className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-teal-800 flex items-center gap-1"><Droplet className="w-3 h-3" /> Kapha (Structure & Fluid):</span>
                <span className="font-mono font-black">{kaphaVal}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={kaphaVal}
                onChange={(e) => setKaphaVal(Number(e.target.value))}
                className="w-full accent-teal-800 h-1.5 bg-slate-200 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Doshic Gunas Summary */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-700 block">Dominant Qualitative Gunas:</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-md font-bold text-[10px]">Ushna (Hot)</span>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-md font-bold text-[10px]">Tikshna (Sharp)</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md font-bold text-[10px]">Guru (Heavy)</span>
              <span className="px-2 py-0.5 bg-cyan-50 text-cyan-900 border border-cyan-200 rounded-md font-bold text-[10px]">Snigdha (Unctuous)</span>
            </div>
          </div>

        </div>

        {/* Right Column: 10-Fold Dashavidha Pariksha Expandable Sections */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E6ECE8] shadow-xs space-y-5">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0D5C4D]" />
                <span>Dashavidha Pariksha (दशविध परीक्षा)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                The 10 classical diagnostic pillars per Charaka Samhita Vimana Sthana.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">
              10 Parameters
            </span>
          </div>

          <div className="space-y-2.5">
            {DASHAVIDHA_PARIKSHA_DATA.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? 'border-[#0D5C4D] bg-[#FAFBF9] shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black font-mono shrink-0 ${
                        isExpanded ? 'bg-[#0D5C4D] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.categoryNumber}
                      </span>
                      <div>
                        <div className="text-sm font-black text-slate-900">
                          {item.englishTitle} <span className="text-xs text-[#0D5C4D] font-bold">({item.sanskritName})</span>
                        </div>
                        <div className="text-xs text-slate-600 font-semibold line-clamp-1">
                          Finding: <strong className="text-slate-800">{item.currentFinding}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline text-[10px] font-bold bg-[#EBF3EF] text-[#0D5C4D] px-2 py-0.5 rounded border border-[#D1E4DB]">
                        {item.doshicAffinity}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>

                  {/* Expandable Category Deep Dive */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-200/80 space-y-3 text-xs">
                      
                      <p className="text-slate-600 leading-relaxed">
                        {item.expandedDetails.definition}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-slate-200">
                        <div>
                          <span className="font-bold text-slate-700 block mb-1">Clinical Diagnostic Markers:</span>
                          <ul className="space-y-0.5 text-slate-600">
                            {item.expandedDetails.diagnosticMarkers.map((marker, mIdx) => (
                              <li key={mIdx} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0D5C4D]"></span>
                                <span>{marker}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-bold text-[#0D5C4D] block mb-1">Therapeutic Guidance:</span>
                          <p className="text-slate-700 font-semibold leading-relaxed">
                            {item.expandedDetails.therapeuticGuidance}
                          </p>
                          <div className="text-[10px] text-slate-400 font-mono mt-1">
                            Ref: {item.charakaCitation}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
