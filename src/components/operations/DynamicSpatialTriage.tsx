'use client';

import React, { useState } from 'react';
import { 
  Hospital, 
  MapPin, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Radio, 
  Users, 
  Flame, 
  Stethoscope,
  Activity,
  Play
} from 'lucide-react';

interface TriageStation {
  id: string;
  name: string;
  code: string;
  category: 'intake' | 'general' | 'specialist' | 'emergency' | 'diagnostics' | 'pharmacy';
  x: number; // SVG coordinates
  y: number;
  occupancy: number;
  capacity: number;
  waitingCount: number;
  avgWaitMins: number;
  doctorInCharge: string;
}

const HOSPITAL_STATIONS: TriageStation[] = [
  { id: 'st_kiosk', name: 'Intake Kiosks & Registration', code: 'INT-01', category: 'intake', x: 80, y: 220, occupancy: 4, capacity: 6, waitingCount: 2, avgWaitMins: 3, doctorInCharge: 'Triage Nurse Staff' },
  { id: 'st_gen', name: 'General Medicine OPD', code: 'OPD-A', category: 'general', x: 280, y: 120, occupancy: 12, capacity: 15, waitingCount: 5, avgWaitMins: 14, doctorInCharge: 'Dr. Ananya Sharma' },
  { id: 'st_spec', name: 'Specialist Cardiology & Ortho', code: 'OPD-B', category: 'specialist', x: 280, y: 320, occupancy: 9, capacity: 10, waitingCount: 3, avgWaitMins: 18, doctorInCharge: 'Dr. Rajeshwar Sen' },
  { id: 'st_emerg', name: 'Acute Emergency Ayush Bay', code: 'EMG-BAY', category: 'emergency', x: 440, y: 220, occupancy: 2, capacity: 4, waitingCount: 0, avgWaitMins: 0, doctorInCharge: 'Dr. Vikramaditya Joshi (Stat)' },
  { id: 'st_diag', name: 'Diagnostics & Pathology Labs', code: 'LAB-01', category: 'diagnostics', x: 600, y: 120, occupancy: 7, capacity: 12, waitingCount: 4, avgWaitMins: 10, doctorInCharge: 'Dr. S. K. Rastogi' },
  { id: 'st_pharm', name: 'Ayush & Allopathic Dispensary', code: 'PHARM', category: 'pharmacy', x: 600, y: 320, occupancy: 14, capacity: 20, waitingCount: 6, avgWaitMins: 8, doctorInCharge: 'Chief Pharmacist' },
];

export const DynamicSpatialTriage: React.FC = () => {
  const [selectedStationId, setSelectedStationId] = useState<string>('st_emerg');
  const [emergencyBypassActive, setEmergencyBypassActive] = useState<boolean>(true);

  const selectedStation = HOSPITAL_STATIONS.find(s => s.id === selectedStationId) || HOSPITAL_STATIONS[3];

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-7 font-['Outfit'] text-[#1C2421]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span>
            <h3 className="text-xl font-black text-slate-900">
              Dynamic Spatial Triage & Patient Flow Architecture
            </h3>
            <span className="text-[10px] font-black bg-[#EBF3EF] text-[#0D5C4D] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
              Live Hospital Map
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualizes patient physical movement through the hospital. Critical alerts visually bypass standard FIFO queues.
          </p>
        </div>

        {/* Emergency Bypass Switch */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setEmergencyBypassActive(!emergencyBypassActive)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border ${
              emergencyBypassActive
                ? 'bg-rose-50 text-rose-900 border-rose-300 shadow-2xs'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${emergencyBypassActive ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
            <span>{emergencyBypassActive ? 'Critical Bypass Active ⚡' : 'Normal FIFO Queues'}</span>
          </button>
        </div>
      </div>

      {/* Spatial SVG Hospital Map Canvas */}
      <div className="bg-[#FAFBF9] rounded-3xl border border-slate-200/90 p-5 relative overflow-hidden">
        
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-3 border-b border-slate-200">
          <span className="flex items-center gap-1.5">
            <Hospital className="w-4 h-4 text-[#0D5C4D]" />
            Ground Level Floorplan • Apex & AIIA Integrated Health Facility
          </span>
          <span className="text-[10px] text-slate-400">Click any ward/bay to inspect telemetry</span>
        </div>

        <div className="w-full h-[400px] flex items-center justify-center relative select-none">
          
          <svg viewBox="0 0 700 440" className="w-full h-full">
            <defs>
              <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0D5C4D" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>

              <linearGradient id="emergencyBypass" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              <filter id="softGlowTriage" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Standard Patient Routing Pathways (Animated Dashed Lines) */}
            {/* Kiosk -> General OPD */}
            <path d="M 120 200 Q 200 130 240 130" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="5 4" className="animate-radiation" />
            {/* Kiosk -> Specialist OPD */}
            <path d="M 120 240 Q 200 310 240 310" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="5 4" className="animate-radiation" />
            {/* General OPD -> Diagnostics */}
            <path d="M 330 120 L 550 120" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="5 4" />
            {/* Specialist -> Pharmacy */}
            <path d="M 330 320 L 550 320" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="5 4" />
            {/* Diagnostics -> Pharmacy */}
            <path d="M 600 160 L 600 280" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />

            {/* CRITICAL BYPASS ROUTING (Bypasses all normal lines straight to Emergency Bay) */}
            {emergencyBypassActive && (
              <g>
                <path
                  d="M 120 220 L 390 220"
                  fill="none"
                  stroke="url(#emergencyBypass)"
                  strokeWidth="4"
                  className="animate-radiation"
                  filter="url(#softGlowTriage)"
                />
                <circle cx="255" cy="220" r="4" fill="#E11D48" className="animate-ping" />
              </g>
            )}

            {/* Render Hospital Stations */}
            {HOSPITAL_STATIONS.map((st) => {
              const isSelected = st.id === selectedStationId;
              const isEmergency = st.category === 'emergency';
              return (
                <g
                  key={st.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedStationId(st.id)}
                >
                  {/* Station Box Base */}
                  <rect
                    x={st.x - 45}
                    y={st.y - 35}
                    width="100"
                    height="70"
                    rx="16"
                    fill={isSelected ? '#0D5C4D' : isEmergency ? '#FFF1F2' : '#FFFFFF'}
                    stroke={isSelected ? '#0D5C4D' : isEmergency ? '#FDA4AF' : '#E2E8F0'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    filter="drop-shadow(0 2px 6px rgba(0,0,0,0.04))"
                    className="hover:scale-105 transition-transform"
                  />

                  {/* Station Badge Header */}
                  <text
                    x={st.x + 5}
                    y={st.y - 16}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill={isSelected ? '#A7F3D0' : isEmergency ? '#E11D48' : '#0D5C4D'}
                  >
                    {st.code}
                  </text>

                  {/* Station Name Label */}
                  <text
                    x={st.x + 5}
                    y={st.y - 2}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="bold"
                    fill={isSelected ? '#FFFFFF' : '#1C2421'}
                  >
                    {st.name.split(' ')[0]}
                  </text>

                  {/* Wait & Occupancy count */}
                  <text
                    x={st.x + 5}
                    y={st.y + 14}
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="bold"
                    fill={isSelected ? '#E2E8F0' : '#64748B'}
                  >
                    {st.occupancy}/{st.capacity} • {st.avgWaitMins}m wait
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend Strip */}
          <div className="absolute bottom-2 left-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between text-[11px]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span> Normal Transit</span>
              <span className="flex items-center gap-1 text-rose-600 font-bold"><span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span> Critical FIFO Bypass Route</span>
            </div>
            <span className="text-slate-400 font-mono">Live Telemetry Synchronized</span>
          </div>

        </div>

      </div>

      {/* Selected Station Deep Dive */}
      <div className="bg-[#FAFBF9] p-5 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">Selected Sector</span>
          <div className="text-sm font-black text-slate-900">{selectedStation.name}</div>
          <div className="text-[11px] text-slate-500 font-medium">In-Charge: {selectedStation.doctorInCharge}</div>
        </div>

        <div>
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">Current Occupancy</span>
          <div className="text-sm font-black text-[#0D5C4D] font-mono">
            {selectedStation.occupancy} / {selectedStation.capacity} Beds / Stations
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Capacity utilization: {Math.round((selectedStation.occupancy / selectedStation.capacity) * 100)}%</div>
        </div>

        <div>
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">Waiting Queue</span>
          <div className="text-sm font-black text-slate-900 font-mono">
            {selectedStation.waitingCount} Patients in Hall
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Estimated wait: {selectedStation.avgWaitMins} mins</div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => alert(`Station ${selectedStation.name} priority routing updated.`)}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl font-bold cursor-pointer transition-all shadow-2xs"
          >
            Adjust Sector Thresholds
          </button>
        </div>
      </div>

    </div>
  );
};
