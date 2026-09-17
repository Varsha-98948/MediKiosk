'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Share2, 
  Heart, 
  Sparkles, 
  Globe, 
  ArrowLeft, 
  Bookmark,
  CheckCircle2,
  Tv
} from 'lucide-react';
import { Language } from '../../types';
import { speakText, stopSpeaking } from '../../utils/speech';

interface ReelItem {
  id: string;
  title: string;
  doctor: string;
  specialty: string;
  category: 'First Aid' | 'Ayurveda' | 'Cardiology' | 'Diabetes' | 'Wellness';
  duration: string;
  views: string;
  likes: number;
  bgGradient: string;
  keyTakeaways: string[];
  captions: {
    en: string;
    hi: string;
    mr: string;
  };
}

const HEALTH_REELS: ReelItem[] = [
  {
    id: 'reel-01',
    title: 'Recognizing Early Heart Attack Signs in 30 Seconds',
    doctor: 'Dr. Rajesh Sharma',
    specialty: 'Senior Cardiologist, AIIMS',
    category: 'First Aid',
    duration: '0:45',
    views: '24.8k',
    likes: 1820,
    bgGradient: 'from-rose-900 via-slate-900 to-slate-950',
    keyTakeaways: [
      'Chest pressure radiating to left arm/jaw',
      'Sudden cold sweats & unexplained shortness of breath',
      'Immediate action: Aspirin 300mg chewable + Call 108',
    ],
    captions: {
      en: 'Chest discomfort radiating to the left arm or jaw with cold sweats is an emergency. Do not wait. Chew a 300mg soluble aspirin and seek immediate medical triage.',
      hi: 'छाती में भारीपन जो बाएं हाथ या जबड़े तक फैले और ठंडा पसीना आए, यह हार्ट अटैक का लक्षण हो सकता है। तुरंत 300mg एस्पिरिन चबाएं और अस्पताल जाएं।',
      mr: 'छातीत जड वाटणे, डाव्या हाताकडे किंवा जबड्याकडे कळ जाणे आणि घाम येणे हे हृदयविकाराचे लक्षण असू शकते. तात्काळ डॉक्टरांशी संपर्क साधा.',
    },
  },
  {
    id: 'reel-02',
    title: 'Triphala & Agni: How to Boost Metabolism Naturally',
    doctor: 'Vaidya Ananya Joshi',
    specialty: 'BAMS, MD (Ayurveda)',
    category: 'Ayurveda',
    duration: '0:50',
    views: '19.4k',
    likes: 1450,
    bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
    keyTakeaways: [
      'Take 1 teaspoon Triphala powder with warm water at bedtime',
      'Balances Pitta & Kapha while rejuvenating digestive fire (Agni)',
      'Rich in natural Vitamin C from Amla',
    ],
    captions: {
      en: 'Triphala is composed of Haritaki, Bibhitaki, and Amalaki. Taking it with warm water at bedtime flushes toxins (Ama) and balances digestive Agni.',
      hi: 'त्रिफला हरड़, बहेड़ा और आंवला से बनता है। रात को गुनगुने पानी के साथ 1 चम्मच लेने से पाचन अग्नि तेज होती है और शरीर से टॉक्सिन बाहर निकलते हैं।',
      mr: 'त्रिफळा चूर्ण रात्री कोमट पाण्यासोबत घेतल्याने पचनक्रिया सुधारते आणि शरीरातील विषारी घटक बाहेर पडतात.',
    },
  },
  {
    id: 'reel-03',
    title: '5 Golden Rules for Managing Fasting Blood Sugar',
    doctor: 'Dr. Meera Nambiar',
    specialty: 'Endocrinologist',
    category: 'Diabetes',
    duration: '0:40',
    views: '32.1k',
    likes: 2980,
    bgGradient: 'from-blue-950 via-indigo-950 to-slate-950',
    keyTakeaways: [
      'Have dinner 3 hours prior to sleep',
      'Incorporate 15-minute post-meal brisk walking',
      'Prioritize protein & fiber over refined carbs',
    ],
    captions: {
      en: 'Consistently high fasting sugar? Stop late-night dinners. A 15-minute walk after meals improves insulin receptor sensitivity dramatically.',
      hi: 'फास्टिंग शुगर को नियंत्रित करने के लिए रात का खाना सोने से 3 घंटे पहले खाएं और भोजन के बाद 15 मिनट जरूर टहलिए।',
      mr: 'सकाळची साखर नियंत्रित ठेवण्यासाठी रात्रीचे जेवण वेळेवर करा आणि जेवणानंतर १५ मिनिटे चालायला विसरू नका.',
    },
  },
];

interface HealthReelsProps {
  language?: Language;
  onBack?: () => void;
}

export const HealthReels: React.FC<HealthReelsProps> = ({
  language = 'en',
  onBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likesCount, setLikesCount] = useState<Record<string, number>>({
    'reel-01': 1820,
    'reel-02': 1450,
    'reel-03': 2980,
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const currentReel = HEALTH_REELS[currentIndex];

  const handleLike = (id: string) => {
    setHasLiked((prev) => {
      const liked = !!prev[id];
      setLikesCount((c) => ({
        ...c,
        [id]: liked ? c[id] - 1 : c[id] + 1,
      }));
      return { ...prev, [id]: !liked };
    });
  };

  const handleSpeakCaption = () => {
    if (isMuted) {
      stopSpeaking();
      setIsMuted(false);
    } else {
      const text = currentReel.captions[language] || currentReel.captions.en;
      speakText(text, language);
      setIsMuted(true);
    }
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-['Outfit'] flex items-center gap-2">
              <span>Swasthya Reels & Health Shorts</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase tracking-wide">
                Live Doctor Tips
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Verified clinical guidance & preventive wellness in English, Hindi & Marathi
            </p>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800"
          >
            ← Back
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Reel Player Phone Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className={`w-[320px] h-[520px] rounded-[36px] border-4 border-slate-700 bg-gradient-to-b ${currentReel.bgGradient} p-5 flex flex-col justify-between relative shadow-2xl overflow-hidden`}>
            {/* Top Reel Meta */}
            <div className="flex items-center justify-between text-xs z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-slate-200 border border-white/10 font-semibold">
                {currentReel.category}
              </span>
              <button
                type="button"
                onClick={handleSpeakCaption}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-slate-200 border border-white/10 hover:bg-white/20"
                title="Voice narration"
              >
                {isMuted ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Center Animation Visual */}
            <div className="flex flex-col items-center justify-center text-center my-auto space-y-3 z-10">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner animate-pulse">
                {isPlaying ? (
                  <Sparkles className="w-10 h-10 text-rose-300" />
                ) : (
                  <Play className="w-10 h-10 text-white ml-1" />
                )}
              </div>
              <h3 className="font-extrabold text-base text-white px-2 leading-snug">
                {currentReel.title}
              </h3>
              <p className="text-xs text-rose-200 font-medium">
                {currentReel.doctor} • {currentReel.specialty}
              </p>
            </div>

            {/* Bottom Captions */}
            <div className="bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-2 z-10">
              <p className="text-xs text-slate-200 leading-relaxed italic">
                "{currentReel.captions[language] || currentReel.captions.en}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/10">
                <span>Views: {currentReel.views}</span>
                <span className="text-emerald-400 font-semibold">Verified Clinical Info</span>
              </div>
            </div>

            {/* Side Floating Action Buttons */}
            <div className="absolute right-3 bottom-24 flex flex-col items-center gap-3 z-20">
              <button
                type="button"
                onClick={() => handleLike(currentReel.id)}
                className="flex flex-col items-center text-slate-200 hover:text-rose-400 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                  hasLiked[currentReel.id] ? 'bg-rose-500 text-white border-rose-400' : 'bg-black/40 backdrop-blur-md border-white/20'
                }`}>
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <span className="text-[10px] font-bold mt-1">{likesCount[currentReel.id]}</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Share link generated for: ${currentReel.title}`)}
                className="flex flex-col items-center text-slate-200 hover:text-teal-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold mt-1">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Info & Playlist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Key Clinical Takeaways
              </h4>
              <span className="text-xs text-slate-400">Reel {currentIndex + 1} of {HEALTH_REELS.length}</span>
            </div>

            <ul className="space-y-2">
              {currentReel.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Playlist selector */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              More Health Shorts in Playlist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {HEALTH_REELS.map((reel, idx) => (
                <div
                  key={reel.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    stopSpeaking();
                    setIsMuted(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'bg-rose-500/10 border-rose-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="text-[10px] text-rose-400 font-semibold uppercase block mb-1">
                    {reel.category} • {reel.duration}
                  </span>
                  <h5 className="text-xs font-bold line-clamp-2">{reel.title}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
