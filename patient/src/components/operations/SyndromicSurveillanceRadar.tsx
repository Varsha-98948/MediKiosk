'use client';

import React, { useState } from 'react';
import { 
  Radio, 
  MapPin, 
  Filter, 
  Sparkles, 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  Search,
  CheckCircle2,
  Layers,
  ChevronDown
} from 'lucide-react';

interface PinCluster {
  pinCode: string;
  district: string;
  clusterSeverity: 'critical_spike' | 'moderate_cluster' | 'baseline';
  primarySymptomCluster: string;
  activeCaseCount: number;
  pctIncreaseVsLastWeek: number;
  dominantAyushSyndrome: string;
  ageBracketDominant: string;
  lat: number;
  lng: number;
}

const MOCK_CLUSTERS: PinCluster[] = [
  {
    pinCode: '110025',
    district: 'South East Delhi (Okhla / Sarita Vihar)',
    clusterSeverity: 'critical_spike',
    primarySymptomCluster: 'Kaphaja Kasa & Wheezing (Acute Respiratory Strain)',
    activeCaseCount: 48,
    pctIncreaseVsLastWeek: 42,
    dominantAyushSyndrome: 'Pranavaha Srotodushti • Kaphaja Vata Kasa',
    ageBracketDominant: 'Elderly (> 50 yrs)',
    lat: 140,
    lng: 180,
  },
  {
    pinCode: '110001',
    district: 'Central Delhi (Connaught Place / Mandi House)',
    clusterSeverity: 'moderate_cluster',
    primarySymptomCluster: 'Sandhivata & Morning Joint Stiffness (Amavata)',
    activeCaseCount: 31,
    pctIncreaseVsLastWeek: 18,
    dominantAyushSyndrome: 'Vata-Kapha Stambha • Asthi Dhatu Dushti',
    ageBracketDominant: 'Adults (35–55 yrs)',
    lat: 220,
    lng: 260,
  },
  {
    pinCode: '110049',
    district: 'South Delhi (South Extension / Defence Colony)',
    clusterSeverity: 'baseline',
    primarySymptomCluster: 'Amlapitta & Gastric Burning (Hyperchlorhydria)',
    activeCaseCount: 16,
    pctIncreaseVsLastWeek: 4,
    dominantAyushSyndrome: 'Vidagdhajirna • Pachaka Pitta Aggravation',
    ageBracketDominant: 'Young Adults (20–40 yrs)',
    lat: 310,
    lng: 210,
  },
  {
    pinCode: '110092',
    district: 'East Delhi (Laxmi Nagar / Anand Vihar)',
    clusterSeverity: 'moderate_cluster',
    primarySymptomCluster: 'Allergic Rhinitis & Sinusitis (Peenasa)',
    activeCaseCount: 29,
    pctIncreaseVsLastWeek: 24,
    dominantAyushSyndrome: 'Urdhwajatrugata Roga • Kaphaja Pratishyaya',
    ageBracketDominant: 'All Age Groups',
    lat: 190,
    lng: 360,
  }
];

export const SyndromicSurveillanceRadar: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<string>('110025');
  const [selectedSymptomFilter, setSelectedSymptomFilter] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('last_7_days');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');

  const activeCluster = MOCK_CLUSTERS.find(c => c.pinCode === selectedPin) || MOCK_CLUSTERS[0];

  const filteredClusters = MOCK_CLUSTERS.filter(c => {
    if (selectedSymptomFilter !== 'all' && !c.primarySymptomCluster.toLowerCase().includes(selectedSymptomFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-7 font-['Outfit'] text-[#1C2421]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
            <h3 className="text-xl font-black text-slate-900">
              Syndromic Surveillance Radar
            </h3>
            <span className="text-[10px] font-black bg-rose-50 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
              Epidemiology Cluster Heatmap
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time geospatial monitoring of localized chief complaint spikes detected across hospital intake kiosks.
          </p>
        </div>

        <div className="text-xs font-bold text-slate-600 self-start sm:self-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>4 Regional Pin Clusters Active</span>
        </div>
      </div>

      {/* Mandatory Administrative Filters Strip (Prompt Section 19 Mandate) */}
      <div className="bg-[#FAFBF9] p-4 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        
        {/* Filter 1: Date Range */}
        <div className="space-y-1">
          <label className="font-bold text-slate-500 block">Date Horizon</label>
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="w-full p-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
          >
            <option value="today">Today (Past 24 Hours)</option>
            <option value="last_7_days">Last 7 Days (Default)</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="seasonal_quarter">Monsoon / Autumn Quarter</option>
          </select>
        </div>

        {/* Filter 2: Symptom Filter */}
        <div className="space-y-1">
          <label className="font-bold text-slate-500 block">Symptom Cluster</label>
          <select
            value={selectedSymptomFilter}
            onChange={(e) => setSelectedSymptomFilter(e.target.value)}
            className="w-full p-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
          >
            <option value="all">All Syndromes (Ayush + Allopathy)</option>
            <option value="kasa">Respiratory / Kasa & Wheeze</option>
            <option value="sandhivata">Joint / Sandhivata Stiffness</option>
            <option value="amlapitta">Digestive / Amlapitta Acidity</option>
          </select>
        </div>

        {/* Filter 3: Location / Pin Code */}
        <div className="space-y-1">
          <label className="font-bold text-slate-500 block">Pin Code Sector</label>
          <select
            value={selectedPin}
            onChange={(e) => setSelectedPin(e.target.value)}
            className="w-full p-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
          >
            <option value="110025">Pin 110025 (Okhla - Spike 42%)</option>
            <option value="110001">Pin 110001 (Central Delhi)</option>
            <option value="110049">Pin 110049 (South Delhi)</option>
            <option value="110092">Pin 110092 (East Delhi)</option>
          </select>
        </div>

        {/* Filter 4: Age Group */}
        <div className="space-y-1">
          <label className="font-bold text-slate-500 block">Demographic Age</label>
          <select
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="w-full p-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
          >
            <option value="all">All Age Groups</option>
            <option value="elderly">Elderly (&gt; 50 Years)</option>
            <option value="adults">Adults (25–50 Years)</option>
            <option value="pediatrics">Pediatrics (&lt; 18 Years)</option>
          </select>
        </div>

      </div>

      {/* Main Grid: Clean Geospatial Heatmap Left, Pin Cluster Intelligence Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: SVG Heatmap Radar */}
        <div className="lg:col-span-7 bg-[#FAFBF9] rounded-3xl border border-slate-200/90 p-5 space-y-3">
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-2 border-b border-slate-200">
            <span className="flex items-center gap-1.5 text-slate-800 font-black">
              <Radio className="w-4 h-4 text-[#0D5C4D]" />
              Geographic Grid: National Capital Region (NCR)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Heatmap Resolution: 1km²</span>
          </div>

          <div className="w-full h-[360px] flex items-center justify-center relative select-none">
            
            <svg viewBox="0 0 500 400" className="w-full h-full">
              <defs>
                {/* Radial Heatmap Gradients */}
                <radialGradient id="criticalHeat" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E11D48" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="moderateHeat" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D97706" stopOpacity="0.65" />
                  <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="baselineHeat" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0D5C4D" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Minimal Clean Regional Cartography Outlines */}
              <path
                d="M 50 150 Q 150 80 300 70 Q 420 120 450 250 Q 380 350 220 360 Q 80 320 50 150 Z"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              
              {/* Secondary Boundary River / Srotas line */}
              <path d="M 320 60 Q 340 180 310 280 Q 290 340 330 390" fill="none" stroke="#93C5FD" strokeWidth="3" strokeOpacity="0.6" />

              {/* Heatmap Aura Discs */}
              {filteredClusters.map((cluster) => {
                const isCritical = cluster.clusterSeverity === 'critical_spike';
                const isModerate = cluster.clusterSeverity === 'moderate_cluster';
                const isSelected = cluster.pinCode === selectedPin;
                const heatRadius = isCritical ? 65 : isModerate ? 50 : 35;
                const gradientId = isCritical ? 'url(#criticalHeat)' : isModerate ? 'url(#moderateHeat)' : 'url(#baselineHeat)';

                return (
                  <g key={cluster.pinCode} className="cursor-pointer" onClick={() => setSelectedPin(cluster.pinCode)}>
                    {/* Heatmap dispersion glow */}
                    <circle
                      cx={cluster.lng}
                      cy={cluster.lat}
                      r={heatRadius}
                      fill={gradientId}
                      className={isCritical ? 'animate-pulse' : ''}
                    />

                    {/* Central Anchor Pin */}
                    <circle
                      cx={cluster.lng}
                      cy={cluster.lat}
                      r={isSelected ? 10 : 7}
                      fill={isCritical ? '#E11D48' : isModerate ? '#D97706' : '#0D5C4D'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    {/* Label */}
                    <text
                      x={cluster.lng}
                      y={cluster.lat - 14}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="900"
                      fill="#1C2421"
                      className="pointer-events-none font-mono"
                    >
                      PIN {cluster.pinCode} ({cluster.activeCaseCount})
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Radar Legend */}
            <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span> Critical Spike (&gt;30% surge)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Moderate Cluster</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span> Baseline Norm</span>
            </div>

          </div>

        </div>

        {/* Right Column: Selected Pin Cluster Deep Dive */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-[#FAFBF9] p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300 uppercase">
                Active Cluster Focus
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                Pin {activeCluster.pinCode}
              </span>
            </div>

            <div>
              <h4 className="text-base font-black text-slate-900">
                {activeCluster.district}
              </h4>
              <div className="text-xs font-bold text-rose-700 mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{activeCluster.pctIncreaseVsLastWeek}% Case Volume Surge (Past 7 Days)</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                Predominant Symptom Cluster:
              </span>
              <div className="font-black text-slate-900 leading-snug">
                {activeCluster.primarySymptomCluster}
              </div>
              <div className="text-[11px] text-[#0D5C4D] font-bold">
                Ayush Syndrome: {activeCluster.dominantAyushSyndrome}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Active Intakes</span>
                <span className="text-lg font-black text-slate-900 font-mono">{activeCluster.activeCaseCount} Patients</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Demographic</span>
                <span className="text-xs font-black text-slate-900 mt-1 block">{activeCluster.ageBracketDominant}</span>
              </div>
            </div>
          </div>

          {/* Action to dispatch public health intervention */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-2">
            <div className="font-black text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Ayush Community Health Intervention Recommended</span>
            </div>
            <p className="text-emerald-800 leading-relaxed font-medium">
              Deploy mobile dispensary with Sitopaladi Churna, Talisadi, and preventive Agastya Haritaki to Community Health Centers in Pin {activeCluster.pinCode}.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
