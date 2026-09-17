'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Activity, 
  Flame, 
  Zap, 
  ShieldAlert, 
  Layers, 
  Info,
  CheckCircle2,
  Sliders,
  Compass
} from 'lucide-react';
import { Language } from '../../types';

export interface MarmaPoint {
  id: string;
  name: string;
  sanskritName: string;
  region: 'head' | 'chest' | 'abdomen' | 'shoulder' | 'arm' | 'spine' | 'knee' | 'foot';
  side: 'anterior' | 'posterior';
  cx: number;
  cy: number;
  r: number;
  doshaAffinity: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Vata-Kapha' | 'Tridosha';
  organLink: string;
  defaultQuestions: {
    en: string[];
    hi: string[];
    mr: string[];
  };
  radiationPath?: string; // SVG path for radiation animation
}

export const MARMA_REGIONS: MarmaPoint[] = [
  // Anterior Points
  {
    id: 'sthapani_head',
    name: 'Sthapani & Siras (Frontal/Cranial)',
    sanskritName: 'स्थापनी एवं शिरस् मर्म',
    region: 'head',
    side: 'anterior',
    cx: 150,
    cy: 48,
    r: 12,
    doshaAffinity: 'Vata-Pitta',
    organLink: 'Nervous system, Ajna Chakra, Pituitary',
    radiationPath: 'M 150 48 Q 165 30 185 25',
    defaultQuestions: {
      en: ['Is the headache throbbing or constant pressure?', 'Does bright light or loud noise aggravate it?', 'Any nausea or visual aura?'],
      hi: ['क्या सिरदर्द में धड़कन महसूस होती है या भारीपन है?', 'क्या तेज रोशनी या शोर से दर्द बढ़ता है?', 'क्या जी मिचलाना या उल्टी जैसा लगता है?'],
      mr: ['डोकेदुखी मध्ये ठसठस जाणवते की जडपणा आहे?', 'उजेड किंवा आवाजाने त्रास वाढतो का?', 'मळमळ किंवा भोवळ येते का?'],
    }
  },
  {
    id: 'hridaya_chest',
    name: 'Hridaya Marma (Precordial / Heart)',
    sanskritName: 'हृदय मर्म (सद्यः प्राणहर)',
    region: 'chest',
    side: 'anterior',
    cx: 165,
    cy: 140,
    r: 14,
    doshaAffinity: 'Vata-Pitta',
    organLink: 'Cardiac plexus, Rasa & Rakta Vaha Srotas',
    radiationPath: 'M 165 140 Q 130 135 95 160 L 75 220', // radiating to left arm
    defaultQuestions: {
      en: ['Does pain radiate to your left shoulder, jaw, or arm?', 'Does pain worsen with exertion and ease with rest?', 'Any shortness of breath or cold sweating?'],
      hi: ['क्या दर्द बाएं कंधे, जबड़े या हाथ की तरफ जाता है?', 'क्या चलने या सीढ़ी चढ़ने पर दर्द बढ़ता है?', 'क्या सांस फूलना या ठंडा पसीना आता है?'],
      mr: ['वेदना डाव्या खांद्याकडे, जबड्याकडे किंवा हाताकडे जातात का?', 'चालताना त्रास वाढतो का आणि विश्रांतीने कमी होतो का?', 'दम लागतो किंवा थंड घाम येतो का?'],
    }
  },
  {
    id: 'nabhi_abdomen',
    name: 'Nabhi Marma (Umbilical / Digestive Core)',
    sanskritName: 'नाभि मर्म (सद्यः प्राणहर / अग्निकेन्द्र)',
    region: 'abdomen',
    side: 'anterior',
    cx: 150,
    cy: 215,
    r: 13,
    doshaAffinity: 'Pitta',
    organLink: 'Samana Vata, Pachaka Pitta, Solar Plexus',
    radiationPath: 'M 150 215 Q 150 255 150 290',
    defaultQuestions: {
      en: ['Is there burning sensation or severe acidity after meals?', 'Does pain change before or after passing stool?', 'Any bloating or indigestion (Mandagni)?'],
      hi: ['क्या भोजन के बाद पेट में तेज जलन या खट्टा पानी आता है?', 'क्या शौच के बाद दर्द में आराम मिलता है?', 'क्या पेट फूलना या भारीपन रहता है?'],
      mr: ['जेवणानंतर पोटात जळजळ किंवा पित्त खवळते का?', 'शौचास झाल्यावर पोटदुखी कमी होते का?', 'पोट फुगणे किंवा मंदाग्नीचा त्रास आहे का?'],
    }
  },
  {
    id: 'basti_pelvic',
    name: 'Basti Marma (Bladder & Hypogastric)',
    sanskritName: 'बस्ति मर्म (मूत्रवह स्रोतस्)',
    region: 'abdomen',
    side: 'anterior',
    cx: 150,
    cy: 265,
    r: 12,
    doshaAffinity: 'Vata',
    organLink: 'Apana Vata, Urinary tract & reproductive floor',
    radiationPath: 'M 150 265 Q 170 290 190 320',
    defaultQuestions: {
      en: ['Is there painful urination or burning micturition?', 'Any lower abdomen heaviness or colic?', 'Do you wake up multiple times at night to urinate?'],
      hi: ['क्या पेशाब में जलन या रुकावट महसूस होती है?', 'क्या पेडू में तेज ऐंठन या दर्द है?', 'क्या रात में बार-बार पेशाब जाना पड़ता है?'],
      mr: ['लघवी करताना जळजळ किंवा त्रास होतो का?', 'ओटीपोटात दुखणे किंवा गोळा येणे जाणवते का?', 'रात्री वारंवार लघवीला जावे लागते का?'],
    }
  },
  {
    id: 'amsa_shoulder_right',
    name: 'Right Amsa Marma (Shoulder Girdle)',
    sanskritName: 'अंस मर्म (स्कन्ध सन्धि)',
    region: 'shoulder',
    side: 'anterior',
    cx: 98,
    cy: 110,
    r: 12,
    doshaAffinity: 'Vata',
    organLink: 'Sleshaka Kapha, Brachial plexus',
    radiationPath: 'M 98 110 L 75 180',
    defaultQuestions: {
      en: ['Can you raise your arm above shoulder level?', 'Is the stiffness worse in early morning?', 'Any history of injury, frozen shoulder, or cervical pain?'],
      hi: ['क्या आप हाथ को सिर के ऊपर बिना दर्द के उठा सकते हैं?', 'क्या सुबह उठने पर कंधा अधिक जकड़ा रहता है?', 'क्या पुरानी चोट या सर्वाइकल का दर्द है?'],
      mr: ['हात खांद्यावरून वर उचलताना त्रास होतो का?', 'सकाळी खांदा जास्त आखडलेला असतो का?', 'पूर्वीची इजा किंवा फ्रोजन शोल्डर आहे का?'],
    }
  },
  {
    id: 'amsa_shoulder_left',
    name: 'Left Amsa Marma (Shoulder Girdle)',
    sanskritName: 'अंस मर्म (स्कन्ध सन्धि)',
    region: 'shoulder',
    side: 'anterior',
    cx: 202,
    cy: 110,
    r: 12,
    doshaAffinity: 'Vata',
    organLink: 'Sleshaka Kapha, Brachial plexus',
    radiationPath: 'M 202 110 L 225 180',
    defaultQuestions: {
      en: ['Can you raise your arm above shoulder level?', 'Is the stiffness worse in early morning?', 'Any tingling down the arm into your fingers?'],
      hi: ['क्या हाथ ऊपर उठाने में कठिनाई या जकड़न है?', 'क्या सुबह कंधा अधिक भारी रहता है?', 'क्या उंगलियों में झनझनाहट या सुन्नपन होता है?'],
      mr: ['हात वर करताना त्रास किंवा आखडणे होते का?', 'सकाळी खांदा जास्त अवघडतो का?', 'बोटांमध्ये मुंग्या किंवा बधिरता येते का?'],
    }
  },
  {
    id: 'janu_knee_left',
    name: 'Left Janu Marma (Knee / Sandhi)',
    sanskritName: 'जानु मर्म (सन्धि मर्म)',
    region: 'knee',
    side: 'anterior',
    cx: 172,
    cy: 410,
    r: 12,
    doshaAffinity: 'Vata-Kapha',
    organLink: 'Sleshaka Kapha, Sandhivata / Osteoarthritis',
    radiationPath: 'M 172 410 L 176 475',
    defaultQuestions: {
      en: ['Is there crepitus (cracking sounds) when bending the knee?', 'Does it swell after walking or climbing stairs?', 'How long does morning stiffness last?'],
      hi: ['क्या घुटना मोड़ने पर कट-कट की आवाज आती है?', 'क्या चलने के बाद घुटने में सूजन आ जाती है?', 'सुबह घुटने की जकड़न कितनी देर रहती है?'],
      mr: ['गुडघा वाकवताना कट-कट असा आवाज येतो का?', 'चालल्यानंतर गुडघ्यावर सूज येते का?', 'सकाळचा आखडलेपणा किती वेळ राहतो?'],
    }
  },
  {
    id: 'janu_knee_right',
    name: 'Right Janu Marma (Knee / Sandhi)',
    sanskritName: 'जानु मर्म (सन्धि मर्म)',
    region: 'knee',
    side: 'anterior',
    cx: 128,
    cy: 410,
    r: 12,
    doshaAffinity: 'Vata-Kapha',
    organLink: 'Sleshaka Kapha, Sandhivata / Osteoarthritis',
    radiationPath: 'M 128 410 L 124 475',
    defaultQuestions: {
      en: ['Is there crepitus (cracking sounds) when bending the knee?', 'Does it swell after walking or climbing stairs?', 'How long does morning stiffness last?'],
      hi: ['क्या घुटना मोड़ने पर कट-कट की आवाज आती है?', 'क्या चलने के बाद घुटने में सूजन आ जाती है?', 'सुबह घुटने की जकड़न कितनी देर रहती है?'],
      mr: ['गुडघा वाकवताना कट-कट असा आवाज येतो का?', 'चालल्यानंतर गुडघ्यावर सूज येते का?', 'सकाळचा आखडलेपणा किती वेळ राहतो?'],
    }
  },

  // Posterior Points
  {
    id: 'krikatika_neck_back',
    name: 'Krikatika Marma (Cervico-Occipital)',
    sanskritName: 'कृकाटिका मर्म (ग्रीवा सन्धि)',
    region: 'spine',
    side: 'posterior',
    cx: 150,
    cy: 68,
    r: 11,
    doshaAffinity: 'Vata',
    organLink: 'Cervical vertebrae, Manyastambha',
    radiationPath: 'M 150 68 Q 130 90 100 115',
    defaultQuestions: {
      en: ['Does pain radiate from neck down your arm?', 'Do you get dizziness when turning your neck quickly?', 'Do you spend long hours at computers or looking down?'],
      hi: ['क्या गर्दन का दर्द हाथ या उंगलियों तक जाता है?', 'क्या गर्दन घुमाने पर चक्कर आता है?', 'क्या आप घंटों झुककर मोबाइल या कंप्यूटर देखते हैं?'],
      mr: ['मानेचे दुखणे हाताकडे जाते का?', 'मान वळवताना चक्कर आल्यासारखे होते का?', 'संगणकावर किंवा खाली मान घालून जास्त वेळ काम करता का?'],
    }
  },
  {
    id: 'kukundara_lower_back',
    name: 'Kati & Kukundara (Lumbar / Sciatic)',
    sanskritName: 'कटि एवं कुकुन्दर मर्म (कटीशूल)',
    region: 'spine',
    side: 'posterior',
    cx: 150,
    cy: 245,
    r: 14,
    doshaAffinity: 'Vata',
    organLink: 'L4-L5, S1, Sciatic nerve pathway (Gridhrasi)',
    radiationPath: 'M 150 245 Q 165 290 175 350 L 175 440', // Sciatica down leg
    defaultQuestions: {
      en: ['Does an electric or shooting pain shoot down the back of your leg to the foot?', 'Is it worse while sitting or standing?', 'Any weakness, tingling, or foot drop?'],
      hi: ['क्या कमर से लेकर पैर के नीचे तक बिजली जैसा करंट या तेज खिंचाव होता है?', 'क्या बैठने या झुकने पर दर्द बढ़ता है?', 'क्या पैर में कमजोरी या सुन्नपन महसूस होता है?'],
      mr: ['कमरेपासून पायाच्या मागून तळपायापर्यंत कळ किंवा करंटसारखी वेदना जाते का?', 'बसल्यावर किंवा वाकल्यावर त्रास वाढतो का?', 'पायात अशक्तपणा किंवा बधिरता जाणवते का?'],
    }
  },
  {
    id: 'gulpha_ankle_left',
    name: 'Left Gulpha Marma (Ankle / Foot)',
    sanskritName: 'गुल्फ मर्म (पाद सन्धि)',
    region: 'foot',
    side: 'posterior',
    cx: 168,
    cy: 505,
    r: 11,
    doshaAffinity: 'Vata',
    organLink: 'Achilles tendon, Vatarakta / Gout, Plantar fascia',
    radiationPath: 'M 168 505 L 168 535',
    defaultQuestions: {
      en: ['Is the heel pain worst during the very first steps in the morning?', 'Is the big toe joint red, swollen, or intensely painful?', 'Any burning in the soles of feet at night?'],
      hi: ['क्या सुबह सोकर उठते ही जमीन पर पहला कदम रखने में एड़ी में तेज दर्द होता है?', 'क्या पैर के अंगूठे में सूजन, लालिमा या तेज जलन है?', 'क्या रात में तलवों में जलन होती है?'],
      mr: ['सकाळी उठल्यावर पहिली पावले टाकताना टाचेत खूप वेदना होतात का?', 'अंगठ्यावर सूज, लालसरपणा किंवा तीव्र ठसठस आहे का?', 'रात्री तळपायांची आग होते का?'],
    }
  }
];

export type PainType = 'throbbing' | 'sharp' | 'dull' | 'burning' | 'stiffness';

interface MarmaBodyMapProps {
  language?: Language;
  selectedPointId?: string;
  onSelectPoint?: (point: MarmaPoint, intensity: number, painType: PainType, hasRadiation: boolean) => void;
  interactive?: boolean;
}

export const MarmaBodyMap: React.FC<MarmaBodyMapProps> = ({
  language = 'en',
  selectedPointId = 'hridaya_chest',
  onSelectPoint,
  interactive = true,
}) => {
  const [activeSide, setActiveSide] = useState<'anterior' | 'posterior'>('anterior');
  const [activePointId, setActivePointId] = useState<string>(selectedPointId);
  const [painIntensity, setPainIntensity] = useState<number>(7);
  const [painType, setPainType] = useState<PainType>('sharp');
  const [showRadiation, setShowRadiation] = useState<boolean>(true);

  const pointsForSide = MARMA_REGIONS.filter(p => p.side === activeSide);
  const currentPoint = MARMA_REGIONS.find(p => p.id === activePointId) || MARMA_REGIONS[1];

  const handlePointClick = (point: MarmaPoint) => {
    setActivePointId(point.id);
    if (onSelectPoint) {
      onSelectPoint(point, painIntensity, painType, showRadiation);
    }
  };

  const handleIntensityChange = (val: number) => {
    setPainIntensity(val);
    if (onSelectPoint) {
      onSelectPoint(currentPoint, val, painType, showRadiation);
    }
  };

  const handleTypeChange = (type: PainType) => {
    setPainType(type);
    if (onSelectPoint) {
      onSelectPoint(currentPoint, painIntensity, type, showRadiation);
    }
  };

  const handleToggleRadiation = () => {
    const next = !showRadiation;
    setShowRadiation(next);
    if (onSelectPoint) {
      onSelectPoint(currentPoint, painIntensity, painType, next);
    }
  };

  const painTypeLabels: Record<PainType, { label: string; sanskrit: string; icon: any; color: string }> = {
    throbbing: { label: 'Throbbing / Pulsating', sanskrit: 'स्पन्दन (Spandana)', icon: Activity, color: 'text-amber-700 bg-amber-50 border-amber-300' },
    sharp: { label: 'Sharp / Piercing', sanskrit: 'तोद / भेद (Toda)', icon: Zap, color: 'text-rose-700 bg-rose-50 border-rose-300' },
    dull: { label: 'Dull Aching / Heaviness', sanskrit: 'मन्द रुजा / गौरव (Gaurava)', icon: Layers, color: 'text-emerald-800 bg-emerald-50 border-emerald-300' },
    burning: { label: 'Burning Sensation', sanskrit: 'दाह (Daha)', icon: Flame, color: 'text-orange-700 bg-orange-50 border-orange-300' },
    stiffness: { label: 'Stiffness / Restricted Motion', sanskrit: 'स्तम्भ (Stambha)', icon: ShieldAlert, color: 'text-cyan-800 bg-cyan-50 border-cyan-300' },
  };

  const getVasColor = (score: number) => {
    if (score <= 3) return 'bg-emerald-500';
    if (score <= 6) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-5 sm:p-7 shadow-xs">
      
      {/* Header bar with Ayush Marma credentials */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D] animate-ping"></span>
            <h3 className="text-lg font-black text-slate-900 font-['Outfit']">
              Interactive Marma & Anatomical Pain Pathway
            </h3>
            <span className="text-[11px] font-extrabold bg-[#EBF3EF] text-[#0D5C4D] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
              Sushruta Samhita • 107 Marma Points
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tap a body region to pinpoint pain epicenter, trace radiation pathways, and generate targeted clinical queries.
          </p>
        </div>

        {/* Anterior / Posterior Switcher */}
        <div className="flex items-center bg-[#F4F6F5] p-1 rounded-2xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setActiveSide('anterior');
              const first = MARMA_REGIONS.find(m => m.side === 'anterior');
              if (first) setActivePointId(first.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeSide === 'anterior'
                ? 'bg-[#0D5C4D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Anterior (Front)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveSide('posterior');
              const first = MARMA_REGIONS.find(m => m.side === 'posterior');
              if (first) setActivePointId(first.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeSide === 'posterior'
                ? 'bg-[#0D5C4D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Posterior (Back)
          </button>
        </div>
      </div>

      {/* Main Grid: Left Anatomy Diagram, Right Clinical Pain Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        
        {/* Left Col: 2D Anatomical SVG with Dynamic Glowing Marma Points */}
        <div className="lg:col-span-6 flex flex-col items-center bg-[#FAFBF9] rounded-2xl border border-slate-200/80 p-4 relative overflow-hidden">
          
          <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#0D5C4D]" />
              {activeSide === 'anterior' ? 'Frontal Sagittal Plane' : 'Dorsal Posterior Plane'}
            </span>
            <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
              Touch to focus Marma
            </span>
          </div>

          <div className="relative w-full max-w-[320px] h-[520px] flex items-center justify-center">
            
            <svg
              viewBox="0 0 300 560"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 4px 12px rgba(13, 92, 77, 0.08))' }}
            >
              <defs>
                <linearGradient id="bodyGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E6EFE9" />
                  <stop offset="100%" stopColor="#D2E3D8" />
                </linearGradient>
                
                <radialGradient id="marmaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D97706" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                </radialGradient>

                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Minimalist, Clean Medical Silhouette */}
              {activeSide === 'anterior' ? (
                // Anterior Silhouette
                <g fill="url(#bodyGradient)" stroke="#0D5C4D" strokeWidth="1.5" strokeOpacity="0.4">
                  {/* Head & Neck */}
                  <path d="M 150 20 C 130 20 120 35 120 52 C 120 72 135 85 140 92 L 140 102 C 130 106 100 114 90 125 C 80 135 70 170 65 210 C 60 250 55 280 50 300 C 47 312 55 316 62 312 C 72 295 80 255 85 220 L 92 220 C 90 270 95 330 100 370 C 105 410 110 450 112 490 C 114 520 110 535 102 540 C 95 545 105 550 122 548 C 132 546 135 520 135 480 C 135 440 136 380 138 335 L 144 335 L 150 335 L 156 335 L 162 335 C 164 380 165 440 165 480 C 165 520 168 546 178 548 C 195 550 205 545 198 540 C 190 535 186 520 188 490 C 190 450 195 410 200 370 C 205 330 210 270 208 220 L 215 220 C 220 255 228 295 238 312 C 245 316 253 312 250 300 C 245 280 240 250 235 210 C 230 170 220 135 210 125 C 200 114 170 106 160 102 L 160 92 C 165 85 180 72 180 52 C 180 35 170 20 150 20 Z" />
                  {/* Subtle Anatomical Landmarks */}
                  <line x1="140" y1="102" x2="160" y2="102" stroke="#0D5C4D" strokeWidth="1" strokeOpacity="0.25" />
                  <path d="M 125 140 Q 150 150 175 140" fill="none" stroke="#0D5C4D" strokeWidth="1" strokeOpacity="0.2" />
                  <circle cx="150" cy="215" r="2" fill="#0D5C4D" fillOpacity="0.4" />
                </g>
              ) : (
                // Posterior Silhouette
                <g fill="url(#bodyGradient)" stroke="#0D5C4D" strokeWidth="1.5" strokeOpacity="0.4">
                  <path d="M 150 20 C 130 20 120 35 120 52 C 120 72 135 85 140 92 L 140 102 C 130 106 100 114 90 125 C 80 135 70 170 65 210 C 60 250 55 280 50 300 C 47 312 55 316 62 312 C 72 295 80 255 85 220 L 92 220 C 90 270 95 330 100 370 C 105 410 110 450 112 490 C 114 520 110 535 102 540 C 95 545 105 550 122 548 C 132 546 135 520 135 480 C 135 440 136 380 138 335 L 150 335 L 162 335 C 164 380 165 440 165 480 C 165 520 168 546 178 548 C 195 550 205 545 198 540 C 190 535 186 520 188 490 C 190 450 195 410 200 370 C 205 330 210 270 208 220 L 215 220 C 220 255 228 295 238 312 C 245 316 253 312 250 300 C 245 280 240 250 235 210 C 230 170 220 135 210 125 C 200 114 170 106 160 102 L 160 92 C 165 85 180 72 180 52 C 180 35 170 20 150 20 Z" />
                  {/* Spine line */}
                  <line x1="150" y1="80" x2="150" y2="280" stroke="#0D5C4D" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.3" />
                  {/* Scapula blades */}
                  <path d="M 125 125 Q 115 150 135 165" fill="none" stroke="#0D5C4D" strokeWidth="1" strokeOpacity="0.25" />
                  <path d="M 175 125 Q 185 150 165 165" fill="none" stroke="#0D5C4D" strokeWidth="1" strokeOpacity="0.25" />
                </g>
              )}

              {/* Animated Glowing Radiation Pathways */}
              {showRadiation && currentPoint.radiationPath && currentPoint.side === activeSide && (
                <g>
                  <path
                    d={currentPoint.radiationPath}
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="3"
                    className="animate-radiation"
                    filter="url(#softGlow)"
                    opacity="0.95"
                  />
                  <circle cx={currentPoint.cx} cy={currentPoint.cy} r={currentPoint.r * 1.8} fill="url(#marmaGlow)" className="animate-radar" />
                </g>
              )}

              {/* Render Marma Points for active view */}
              {pointsForSide.map((pt) => {
                const isSelected = pt.id === activePointId;
                return (
                  <g
                    key={pt.id}
                    className="cursor-pointer transition-transform duration-150"
                    onClick={() => handlePointClick(pt)}
                  >
                    {/* Pulsing ring for active */}
                    {isSelected && (
                      <circle
                        cx={pt.cx}
                        cy={pt.cy}
                        r={pt.r + 8}
                        fill="none"
                        stroke="#0D5C4D"
                        strokeWidth="2"
                        className="animate-ping"
                        opacity="0.5"
                      />
                    )}

                    {/* Outer Circle */}
                    <circle
                      cx={pt.cx}
                      cy={pt.cy}
                      r={pt.r}
                      fill={isSelected ? '#0D5C4D' : '#FFFFFF'}
                      stroke={isSelected ? '#D97706' : '#0D5C4D'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      filter="url(#softGlow)"
                      className="hover:scale-110 transition-transform"
                    />

                    {/* Inner Core */}
                    <circle
                      cx={pt.cx}
                      cy={pt.cy}
                      r={pt.r * 0.45}
                      fill={isSelected ? '#F59E0B' : '#0D5C4D'}
                    />

                    {/* Point Label badge */}
                    <text
                      x={pt.cx}
                      y={pt.cy + (pt.r + 14)}
                      textAnchor="middle"
                      fill="#1C2421"
                      fontSize="9"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {pt.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Floating Active Marma Callout */}
            <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-[#D1E4DB] shadow-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span>
                <div>
                  <div className="text-xs font-black text-slate-900 leading-tight">
                    {currentPoint.name}
                  </div>
                  <div className="text-[10px] text-[#0D5C4D] font-bold">
                    {currentPoint.sanskritName}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-black bg-[#EBF3EF] text-[#0D5C4D] px-2 py-0.5 rounded-md border border-[#D1E4DB]">
                {currentPoint.doshaAffinity}
              </span>
            </div>

          </div>

          <div className="w-full flex items-center justify-between mt-3 pt-3 border-t border-slate-200 text-xs">
            <span className="text-slate-500 font-medium">Radiation Vector Pathway:</span>
            <button
              type="button"
              onClick={handleToggleRadiation}
              className={`px-2.5 py-1 rounded-lg text-xs font-black border transition-colors cursor-pointer ${
                showRadiation
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {showRadiation ? '⚡ Radiation Animated' : 'Radiation Off'}
            </button>
          </div>

        </div>

        {/* Right Col: Pain Characteristics & Dynamic Clinical Question Generator */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Active Marma Details Card */}
          <div className="bg-[#FAFBF9] p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-[#0D5C4D] uppercase tracking-wider bg-[#EBF3EF] px-2.5 py-0.5 rounded-md border border-[#D1E4DB]">
                Selected Epicenter
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Organ Axis: <strong className="text-slate-800">{currentPoint.organLink}</strong>
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900">
              {currentPoint.name} ({currentPoint.sanskritName})
            </h4>
            <p className="text-xs text-slate-600">
              Primary constitutional impact on <strong>{currentPoint.doshaAffinity} Dosha</strong>. Clinical intake questions have adapted below.
            </p>
          </div>

          {/* 1. Pain Intensity Slider (VAS 1 to 10) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                <Sliders className="w-3.5 h-3.5 text-[#0D5C4D]" />
                <span>Pain Severity Scale (VAS 1–10)</span>
              </div>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full text-white ${getVasColor(painIntensity)}`}>
                Score: {painIntensity} / 10 {painIntensity >= 8 ? '(Severe)' : painIntensity >= 4 ? '(Moderate)' : '(Mild)'}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="10"
              value={painIntensity}
              onChange={(e) => handleIntensityChange(Number(e.target.value))}
              className="w-full accent-[#0D5C4D] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1">
              <span>1 Mild</span>
              <span>3 Discomfort</span>
              <span>5 Moderate</span>
              <span>7 Severe</span>
              <span>10 Agonizing</span>
            </div>
          </div>

          {/* 2. Pain Character / Ayush Quality (5 Modalities) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2.5 shadow-2xs">
            <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Pain Sensation Quality (Vedana Prakara)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(painTypeLabels) as PainType[]).map((type) => {
                const config = painTypeLabels[type];
                const IconComponent = config.icon;
                const isSelected = painType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? `${config.color} ring-2 ring-[#0D5C4D]/30 font-black shadow-xs`
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/80' : 'bg-slate-100'}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-xs font-extrabold">{config.label}</div>
                      <div className="text-[10px] text-slate-500 font-semibold">{config.sanskrit}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Dynamically Triggered Clinical & Ayush Questions */}
          <div className="bg-[#FAFBF9] p-4 rounded-2xl border border-[#D1E4DB] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0D5C4D] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Triggered Clinical Interview Questions
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                Auto-sequenced for Kiosk
              </span>
            </div>

            <div className="space-y-2">
              {currentPoint.defaultQuestions[language]?.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-start gap-2 shadow-2xs"
                >
                  <span className="w-4 h-4 rounded-full bg-[#EBF3EF] text-[#0D5C4D] flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
