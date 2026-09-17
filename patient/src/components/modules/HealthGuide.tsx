'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Sun, 
  Moon, 
  Sparkles, 
  Activity, 
  Heart, 
  Apple, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { Language } from '../../types';

interface HealthGuideTopic {
  id: string;
  title: string;
  category: 'Ayurveda Dinacharya' | 'Dietary Nutrition' | 'Heart Health' | 'Diabetes Management';
  icon: string;
  summary: string;
  dailyRoutine: string[];
  dietaryRecommendations: string[];
  lifestyleTips: string[];
}

const HEALTH_TOPICS: HealthGuideTopic[] = [
  {
    id: 'topic-01',
    title: 'Ayurvedic Dinacharya (Ideal Daily Biological Rhythm)',
    category: 'Ayurveda Dinacharya',
    icon: '🌅',
    summary: 'Aligning your internal circadian clock with natural daylight and digestive Agni cycles for optimal vitality.',
    dailyRoutine: [
      'Brahma Muhurta Wakeup (45-60 mins before sunrise) for serene mental clarity.',
      'Ushapan (Drinking 1-2 glasses of lukewarm copper/earthen water) to stimulate natural bowel reflex.',
      'Jivha Nirlekhana (Tongue scraping with copper/steel scraper) to remove nocturnal Ama coating.',
      'Abhyanga (Self-massage with warm sesame/coconut oil) followed by warm bath.',
    ],
    dietaryRecommendations: [
      'Eat heaviest meal between 12:00 PM – 1:30 PM when solar & digestive Agni is at its peak.',
      'Light dinner before 7:30 PM consisting of vegetable soups, mung dal, or steamed grains.',
    ],
    lifestyleTips: [
      'Avoid sleeping during daytime (Diva Swapna) as it creates Kapha and Ama congestion.',
      'Practice 10 minutes of Nadi Shodhana (Alternate Nostril Pranayama) before bed.',
    ],
  },
  {
    id: 'topic-02',
    title: 'Cardiovascular Longevity & Hypertension Control',
    category: 'Heart Health',
    icon: '❤️',
    summary: 'Evidence-based lifestyle interventions to preserve vascular elasticity, lower pulse wave velocity, and stabilize blood pressure.',
    dailyRoutine: [
      '30-45 minutes of moderate aerobic activity (brisk walking, swimming) 5 days a week.',
      'Morning blood pressure tracking at fixed hours before breakfast and medication.',
    ],
    dietaryRecommendations: [
      'Adopt the DASH diet protocol: Limit dietary sodium to < 2.0g/day (< 1 teaspoon of table salt).',
      'Increase potassium-rich vegetables (spinach, bottle gourd, drumsticks).',
      'Incorporate Cardioprotective herbs: Terminalia Arjuna decoction with warm skimmed milk.',
    ],
    lifestyleTips: [
      'Avoid high-stress spikes with daily 15-minute mindfulness meditation.',
      'Maintain strict 7-8 hours of uninterrupted nocturnal sleep.',
    ],
  },
];

interface HealthGuideProps {
  language?: Language;
  onBack?: () => void;
}

export const HealthGuide: React.FC<HealthGuideProps> = ({
  language = 'en',
  onBack,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<HealthGuideTopic>(HEALTH_TOPICS[0]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
              <span>National Health Guide & Ayush Wellness Library</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                Preventive Care
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Evidence-based lifestyle interventions, Ayurvedic circadian regimens, and dietary prescriptions
            </p>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← Back to Overview
          </button>
        )}
      </div>

      {/* Grid: Topics on Left, Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Topic List */}
        <div className="lg:col-span-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Wellness Chapters
          </h3>
          {HEALTH_TOPICS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-600 shadow-xs ring-1 ring-emerald-600'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{topic.icon}</span>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                      {topic.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">{topic.title}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Content */}
        <div className="lg:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-5">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              {selectedTopic.category}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit'] mt-0.5">
              {selectedTopic.title}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
              {selectedTopic.summary}
            </p>
          </div>

          {/* Daily Routine */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500" />
              Daily Recommended Biological Routine
            </h4>
            <div className="space-y-1.5">
              {selectedTopic.dailyRoutine.map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dietary Nutrition */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Apple className="w-4 h-4 text-emerald-600" />
              Dietary & Ahara Principles
            </h4>
            <ul className="space-y-1.5">
              {selectedTopic.dietaryRecommendations.map((diet, idx) => (
                <li key={idx} className="text-xs text-emerald-950 bg-emerald-50/80 border border-emerald-200 px-3 py-2 rounded-xl flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{diet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
