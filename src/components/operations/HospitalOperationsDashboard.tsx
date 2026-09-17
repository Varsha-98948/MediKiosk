'use client';

import React, { useState } from 'react';
import { 
  Hospital, 
  Radio, 
  Network, 
  Tv, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Activity, 
  AlertTriangle,
  Play
} from 'lucide-react';
import { PatientRecord, Language } from '../../types';
import { DynamicSpatialTriage } from './DynamicSpatialTriage';
import { SyndromicSurveillanceRadar } from './SyndromicSurveillanceRadar';
import { FhirInteroperability } from './FhirInteroperability';
import { HospitalWaitingRoomDisplay } from '../common/HospitalWaitingRoomDisplay';

interface HospitalOperationsDashboardProps {
  patients: PatientRecord[];
  currentServingToken: string;
  onCallNextPatient: () => void;
  language?: Language;
}

export type OpsTab = 'spatial_triage' | 'surveillance' | 'fhir_grid' | 'waiting_tv';

export const HospitalOperationsDashboard: React.FC<HospitalOperationsDashboardProps> = ({
  patients,
  currentServingToken,
  onCallNextPatient,
  language = 'en',
}) => {
  const [activeTab, setActiveTab] = useState<OpsTab>('spatial_triage');

  const waitingTokensList = patients.map(p => ({
    token: p.tokenNumber,
    patientName: p.name,
    dept: p.assignedDoctor ? 'Cardiology' : 'General Medicine',
    status: p.queueStatus,
    isPriority: p.priority === 'urgent',
  }));

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-['Outfit'] text-[#1C2421]">
      
      {/* Top Operations Header Strip */}
      <div className="bg-white p-5 rounded-3xl border border-[#E6ECE8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0D5C4D] text-white flex items-center justify-center font-black shadow-xs">
            <Hospital className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Smart Hospital Operations & Surveillance Center
              </h2>
              <span className="text-[10px] font-black bg-[#EBF3EF] text-[#0D5C4D] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
                Administrator Command Center
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Dynamic Spatial Triage • Syndromic Heatmaps • FHIR R4 Ayush Grid Interoperability
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-[#FAFBF9] p-1.5 rounded-2xl border border-slate-200 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('spatial_triage')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'spatial_triage'
                ? 'bg-[#0D5C4D] text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Hospital className="w-3.5 h-3.5" />
            <span>Spatial Triage Map</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('surveillance')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'surveillance'
                ? 'bg-[#0D5C4D] text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Surveillance Radar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fhir_grid')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fhir_grid'
                ? 'bg-[#0D5C4D] text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>FHIR R4 & Ayush Grid</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('waiting_tv')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'waiting_tv'
                ? 'bg-[#0D5C4D] text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Waiting Hall TV Signage</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Content */}
      <div className="space-y-6">
        {activeTab === 'spatial_triage' && (
          <DynamicSpatialTriage />
        )}

        {activeTab === 'surveillance' && (
          <SyndromicSurveillanceRadar />
        )}

        {activeTab === 'fhir_grid' && (
          <FhirInteroperability patient={patients[0]} />
        )}

        {activeTab === 'waiting_tv' && (
          <HospitalWaitingRoomDisplay
            language={language}
            currentServingToken={currentServingToken}
            servingRoom="Room 104 (OPD Block A)"
            servingDoctor="Dr. Rajeshwar Sen"
            servingDepartment="Cardiology & Ayush Integrative"
            servingPatientName={patients[0]?.name || 'Devendra Patel'}
            waitingTokens={waitingTokensList}
            onSimulateNextToken={onCallNextPatient}
            onBackToKiosk={() => setActiveTab('spatial_triage')}
          />
        )}
      </div>

    </div>
  );
};
