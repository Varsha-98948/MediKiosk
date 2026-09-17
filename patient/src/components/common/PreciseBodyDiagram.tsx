'use client';

import React, { useState } from 'react';
import { 
  RotateCcw, 
  MapPin, 
  Sparkles, 
  Volume2, 
  Activity, 
  CheckCircle2, 
  Layers,
  Heart,
  Flame,
  Bone,
  User
} from 'lucide-react';
import { Language } from '../../types';
import { speakText } from '../../utils/speech';

interface AnatomicalRegion {
  id: string;
  label: {
    en: string;
    hi: string;
    mr: string;
  };
  side: 'front' | 'back' | 'both';
  pctX: number; // Percentage from left (0 to 100)
  pctY: number; // Percentage from top (0 to 100)
  radius: number;
  category: 'head' | 'chest' | 'abdomen' | 'limbs' | 'back' | 'joints';
}

const ANATOMICAL_REGIONS: AnatomicalRegion[] = [
  // Front View Regions
  { id: 'head_forehead', label: { en: 'Head / Forehead / Migraine', hi: 'सिर / माथा / आधा सीसी दर्द', mr: 'डोके / कपाळ / अर्धशिशी' }, side: 'front', pctX: 50, pctY: 8, radius: 12, category: 'head' },
  { id: 'eyes_sinus', label: { en: 'Eyes / Sinus / Face', hi: 'आँखें / साइनस / चेहरा', mr: 'डोळे / सायनस / चेहरा' }, side: 'front', pctX: 50, pctY: 13, radius: 10, category: 'head' },
  { id: 'throat_neck', label: { en: 'Throat / Thyroid / Neck', hi: 'गला / थायरॉयड / गर्दन', mr: 'घसा / थायरॉईड / मान' }, side: 'front', pctX: 50, pctY: 18, radius: 10, category: 'head' },
  { id: 'chest_heart', label: { en: 'Left Chest (Heart / Precordial)', hi: 'बायां सीना (हार्ट / हृदय)', mr: 'डावी छाती (हृदय)' }, side: 'front', pctX: 58, pctY: 27, radius: 14, category: 'chest' },
  { id: 'chest_right', label: { en: 'Right Chest (Lungs / Ribs)', hi: 'दायां सीना (फेफड़े / पसलियां)', mr: 'उजवी छाती (फुफ्फुस)' }, side: 'front', pctX: 42, pctY: 27, radius: 14, category: 'chest' },
  { id: 'epigastric_stomach', label: { en: 'Upper Stomach / Acidity / Epigastric', hi: 'ऊपरी पेट / गैस / एसिडिटी', mr: 'पोटाचा वरचा भाग / ॲसिडिटी' }, side: 'front', pctX: 50, pctY: 36, radius: 12, category: 'abdomen' },
  { id: 'abdomen_lower', label: { en: 'Lower Abdomen / Navel / Appendix', hi: 'निचला पेट / नाभि / अपेंडिक्स', mr: 'पोटाचा खालचा भाग / बेंबी' }, side: 'front', pctX: 50, pctY: 44, radius: 12, category: 'abdomen' },
  { id: 'pelvis_groin', label: { en: 'Pelvis / Bladder / Groin', hi: 'पेल्विस / मूत्राशय / जांघ', mr: 'पेल्व्हिस / मूत्राशय' }, side: 'front', pctX: 50, pctY: 52, radius: 12, category: 'abdomen' },
  { id: 'left_shoulder', label: { en: 'Left Shoulder Joint', hi: 'बायां कंधा', mr: 'डावा खांदा' }, side: 'front', pctX: 72, pctY: 22, radius: 11, category: 'joints' },
  { id: 'right_shoulder', label: { en: 'Right Shoulder Joint', hi: 'दायां कंधा', mr: 'उजवा खांदा' }, side: 'front', pctX: 28, pctY: 22, radius: 11, category: 'joints' },
  { id: 'left_arm', label: { en: 'Left Arm & Elbow', hi: 'बायां हाथ व कोहनी', mr: 'डावा हात आणि कोपर' }, side: 'front', pctX: 79, pctY: 37, radius: 11, category: 'limbs' },
  { id: 'right_arm', label: { en: 'Right Arm & Elbow', hi: 'दायां हाथ व कोहनी', mr: 'उजवा हात आणि कोपर' }, side: 'front', pctX: 21, pctY: 37, radius: 11, category: 'limbs' },
  { id: 'left_hand', label: { en: 'Left Hand & Wrist', hi: 'बाईं हथेली व कलाई', mr: 'डावा हात / मनगट' }, side: 'front', pctX: 85, pctY: 53, radius: 10, category: 'limbs' },
  { id: 'right_hand', label: { en: 'Right Hand & Wrist', hi: 'दाहिनी हथेली व कलाई', mr: 'उजवा हात / मनगट' }, side: 'front', pctX: 15, pctY: 53, radius: 10, category: 'limbs' },
  { id: 'left_thigh', label: { en: 'Left Thigh (Femur)', hi: 'बाईं जांघ', mr: 'डावी मांडी' }, side: 'front', pctX: 60, pctY: 64, radius: 12, category: 'limbs' },
  { id: 'right_thigh', label: { en: 'Right Thigh (Femur)', hi: 'दाहिनी जांघ', mr: 'उजवी मांडी' }, side: 'front', pctX: 40, pctY: 64, radius: 12, category: 'limbs' },
  { id: 'left_knee', label: { en: 'Left Knee Joint (Patella)', hi: 'बायां घुटना', mr: 'डावा गुडघा' }, side: 'front', pctX: 60, pctY: 76, radius: 11, category: 'joints' },
  { id: 'right_knee', label: { en: 'Right Knee Joint (Patella)', hi: 'दायां घुटना', mr: 'उजवा घुटना' }, side: 'front', pctX: 40, pctY: 76, radius: 11, category: 'joints' },
  { id: 'left_foot', label: { en: 'Left Ankle & Foot', hi: 'बायां टखना व पैर', mr: 'डावा घोटा / पाऊल' }, side: 'front', pctX: 61, pctY: 92, radius: 11, category: 'limbs' },
  { id: 'right_foot', label: { en: 'Right Ankle & Foot', hi: 'दायां टखना व पैर', mr: 'उजवा घोटा / पाऊल' }, side: 'front', pctX: 39, pctY: 92, radius: 11, category: 'limbs' },

  // Back View Regions
  { id: 'back_head', label: { en: 'Back of Head / Occipital', hi: 'सिर का पिछला हिस्सा', mr: 'डोक्याचा मागील भाग' }, side: 'back', pctX: 50, pctY: 8, radius: 12, category: 'head' },
  { id: 'cervical_spine', label: { en: 'Cervical Spine / Upper Neck', hi: 'गर्दन का पिछला भाग / सर्वाइकल', mr: 'मानेचा मागील भाग / मणका' }, side: 'back', pctX: 50, pctY: 18, radius: 11, category: 'back' },
  { id: 'upper_back', label: { en: 'Upper Back / Shoulder Blades', hi: 'पीठ का ऊपरी हिस्सा / कंधे की हड्डी', mr: 'पाठीचा वरचा भाग' }, side: 'back', pctX: 50, pctY: 28, radius: 14, category: 'back' },
  { id: 'lumbar_spine', label: { en: 'Lower Back / Lumbar Spine', hi: 'कमर / रीढ़ की हड्डी / लंबर', mr: 'कंबर / पाठीचा खालचा मणका' }, side: 'back', pctX: 50, pctY: 42, radius: 13, category: 'back' },
  { id: 'gluteal_hip', label: { en: 'Hips / Sciatic Nerve', hi: 'कूल्हे / सायटिका दर्द', mr: 'खुबा / सायटिका कळ' }, side: 'back', pctX: 50, pctY: 53, radius: 14, category: 'back' },
  { id: 'back_left_calf', label: { en: 'Left Calf / Achilles Tendon', hi: 'बाईं पिंडली (काफ मसल)', mr: 'डावी पोटरी' }, side: 'back', pctX: 60, pctY: 82, radius: 11, category: 'limbs' },
  { id: 'back_right_calf', label: { en: 'Right Calf / Achilles Tendon', hi: 'दाहिनी पिंडली (काफ मसल)', mr: 'उजवी पोटरी' }, side: 'back', pctX: 40, pctY: 82, radius: 11, category: 'limbs' },
];

interface PreciseBodyDiagramProps {
  selectedLocation?: string;
  onSelectLocation?: (locationId: string, labelText: string, coordinates?: { x: number; y: number }) => void;
  language?: Language;
  interactive?: boolean;
}

export const PreciseBodyDiagram: React.FC<PreciseBodyDiagramProps> = ({
  selectedLocation = 'chest_heart',
  onSelectLocation,
  language = 'en',
  interactive = true,
}) => {
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [displayMode, setDisplayMode] = useState<'skeleton' | 'body'>('skeleton');
  const [pinPoint, setPinPoint] = useState<{ x: number; y: number } | null>(null);
  const [imgError, setImgError] = useState(false);

  const activeRegions = ANATOMICAL_REGIONS.filter(r => r.side === viewSide || r.side === 'both');
  const selectedRegion = ANATOMICAL_REGIONS.find(r => r.id === selectedLocation) || ANATOMICAL_REGIONS[3];

  // Direct High Quality Medical Images from Web
  const skeletonFrontImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Human_skeleton_front_en.svg/600px-Human_skeleton_front_en.svg.png';
  const skeletonBackImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Human_skeleton_back_en.svg/600px-Human_skeleton_back_en.svg.png';
  
  // Body Muscle / Silhouette Anatomy Images
  const bodyFrontImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Anterior_view_of_human_body.svg/600px-Anterior_view_of_human_body.svg.png';
  const bodyBackImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Posterior_view_of_human_body.svg/600px-Posterior_view_of_human_body.svg.png';

  const currentImgSrc = displayMode === 'skeleton'
    ? (viewSide === 'front' ? skeletonFrontImg : skeletonBackImg)
    : (viewSide === 'front' ? bodyFrontImg : bodyBackImg);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const pctX = (clickX / rect.width) * 100;
    const pctY = (clickY / rect.height) * 100;

    setPinPoint({ x: pctX, y: pctY });

    // Find closest anatomical region based on percentage distance
    let closest = activeRegions[0];
    let minDist = 99999;

    activeRegions.forEach((reg) => {
      // Weight Y slightly more as anatomical hierarchy is vertical
      const dist = Math.hypot((reg.pctX - pctX) * 1.0, (reg.pctY - pctY) * 1.2);
      if (dist < minDist) {
        minDist = dist;
        closest = reg;
      }
    });

    if (closest && onSelectLocation) {
      const label = closest.label[language] || closest.label.en;
      onSelectLocation(closest.id, label, { x: pctX, y: pctY });

      // Spoken voice feedback for illiterate patients
      const speechPrompt = language === 'hi'
        ? `${closest.label.hi} चुना गया`
        : language === 'mr'
        ? `${closest.label.mr} निवडले आहे`
        : `${closest.label.en} selected`;
      speakText(speechPrompt, language);
    }
  };

  const handleSelectRegionDirect = (reg: AnatomicalRegion) => {
    setPinPoint({ x: reg.pctX, y: reg.pctY });
    if (onSelectLocation) {
      const label = reg.label[language] || reg.label.en;
      onSelectLocation(reg.id, label, { x: reg.pctX, y: reg.pctY });

      const speechPrompt = language === 'hi'
        ? `${reg.label.hi} चुना गया`
        : language === 'mr'
        ? `${reg.label.mr} निवडले आहे`
        : `${reg.label.en} selected`;
      speakText(speechPrompt, language);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl border-2 border-teal-500/30 shadow-2xl p-4 sm:p-6 flex flex-col items-center space-y-4 max-w-lg mx-auto font-['Outfit']">
      
      {/* Top Controls: Skeleton/Body mode & Front/Back View */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        
        {/* Skeleton vs Muscle Body Switcher */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => setDisplayMode('skeleton')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              displayMode === 'skeleton'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Bone className="w-3.5 h-3.5" />
            <span>🩻 Skeleton (कंकाल)</span>
          </button>

          <button
            type="button"
            onClick={() => setDisplayMode('body')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              displayMode === 'body'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>🧍 Body (शरीर)</span>
          </button>
        </div>

        {/* Front vs Back Switcher */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setViewSide('front');
              setPinPoint(null);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewSide === 'front'
                ? 'bg-teal-600 text-white shadow-sm font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Front (आगे)
          </button>

          <button
            type="button"
            onClick={() => {
              setViewSide('back');
              setPinPoint(null);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewSide === 'back'
                ? 'bg-teal-600 text-white shadow-sm font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Back (पीछे)
          </button>
        </div>
      </div>

      {/* Spoken Voice Guidance Banner */}
      <div className="w-full bg-gradient-to-r from-teal-950/80 via-slate-900 to-cyan-950/80 border border-cyan-500/30 rounded-2xl p-2.5 text-center shadow-inner flex items-center justify-between gap-2">
        <p className="text-xs text-cyan-200 font-extrabold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
          <span>
            {language === 'hi'
              ? '👉 स्क्रीन पर कंकाल या शरीर के दर्द वाले हिस्से को छुएं'
              : language === 'mr'
              ? '👉 स्क्रीनवर कंकाल किंवा शरीराच्या दुखऱ्या भागावर बोट ठेवा'
              : '👉 Touch the exact spot on the skeleton or body where it hurts'}
          </span>
        </p>

        <button
          type="button"
          onClick={() => {
            const prompt = language === 'hi'
              ? 'कंकाल या शरीर के जिस हिस्से में दर्द हो रहा है, वहां उंगली से स्क्रीन पर छुएं।'
              : language === 'mr'
              ? 'कंकाल किंवा शरीराच्या ज्या भागात दुखत आहे, तिथे स्क्रीनवर बोट लावा.'
              : 'Tap directly on the skeleton or body where you feel pain.';
            speakText(prompt, language);
          }}
          className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
          title="Audio guidance"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Interactive Skeleton & Body Diagram Canvas */}
      <div 
        className="relative w-full max-w-[340px] h-[430px] bg-slate-950 rounded-2xl border-2 border-slate-800 flex items-center justify-center overflow-hidden cursor-crosshair group shadow-inner select-none"
        onClick={handleContainerClick}
      >
        {/* Internet Skeleton / Body Image */}
        {!imgError ? (
          <img
            src={currentImgSrc}
            alt="Human Skeleton & Anatomy Diagram"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-2 filter contrast-125 brightness-110 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)] pointer-events-none transition-all duration-300"
          />
        ) : (
          /* High Precision SVG Fallback if offline/blocked */
          <div className="text-center p-4">
            <Bone className="w-24 h-24 mx-auto text-cyan-400 opacity-60 animate-pulse" />
            <p className="text-xs text-slate-400 mt-2">Interactive Anatomical Skeleton</p>
          </div>
        )}

        {/* Anatomical Overlay Grid with Hotspots */}
        <div className="absolute inset-0 pointer-events-none">
          {activeRegions.map((reg) => {
            const isSelected = selectedLocation === reg.id;
            return (
              <div
                key={reg.id}
                style={{
                  left: `${reg.pctX}%`,
                  top: `${reg.pctY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute pointer-events-auto rounded-full transition-all flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'w-9 h-9 bg-rose-600/90 ring-4 ring-rose-400/80 shadow-[0_0_20px_rgba(244,63,94,0.9)] animate-pulse z-30'
                    : 'w-6 h-6 bg-cyan-500/10 hover:bg-cyan-400/40 hover:ring-2 hover:ring-cyan-300 z-10'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectRegionDirect(reg);
                }}
                title={reg.label[language] || reg.label.en}
              >
                {isSelected ? (
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                    <span className="absolute w-12 h-12 rounded-full border-2 border-rose-400 animate-ping"></span>
                  </div>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 group-hover:bg-cyan-200"></span>
                )}
              </div>
            );
          })}

          {/* User's Exact Touch / Click Pinpoint Marker */}
          {pinPoint && (
            <div
              style={{
                left: `${pinPoint.x}%`,
                top: `${pinPoint.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute pointer-events-none z-40 animate-bounce"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-lg shadow-red-900/60">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="absolute w-14 h-14 rounded-full bg-red-500/40 animate-ping"></div>
              </div>
            </div>
          )}
        </div>

        {/* View Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900/90 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-500/40 backdrop-blur-xs">
            {displayMode === 'skeleton' ? '🩻 Skeleton' : '🧍 Anatomy'}
          </span>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700">
            {viewSide === 'front' ? 'Front (Anterior)' : 'Back (Posterior)'}
          </span>
        </div>
      </div>

      {/* Identified Location Status Card */}
      <div className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-teal-500/40 rounded-2xl p-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center font-bold shadow-md shadow-rose-900/40 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-teal-300 font-extrabold uppercase tracking-widest block">
              Identified Pain Region (दर्द का स्थान)
            </span>
            <h4 className="font-black text-sm sm:text-base text-white">
              {selectedRegion.label[language] || selectedRegion.label.en}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const label = selectedRegion.label[language] || selectedRegion.label.en;
            speakText(label, language);
          }}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors cursor-pointer"
          title="Speak location aloud"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Quick One-Tap Body Part Buttons */}
      <div className="w-full space-y-1.5 pt-1">
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
          Or Quick Tap Common Body Zones:
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {activeRegions.slice(0, 6).map((reg) => {
            const isSelected = selectedLocation === reg.id;
            return (
              <button
                key={reg.id}
                type="button"
                onClick={() => handleSelectRegionDirect(reg)}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center truncate cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-rose-600 to-red-600 border-rose-400 text-white shadow-md scale-[1.02]'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {reg.label[language]?.split('/')[0] || reg.label.en.split('/')[0]}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
