'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Bell, 
  ArrowRight, 
  ChevronRight, 
  PhoneCall, 
  Activity, 
  FileText, 
  Stethoscope,
  Heart,
  TrendingUp,
  ShieldCheck,
  Play,
  RotateCcw,
  SkipForward,
  Check,
  Radio
} from 'lucide-react';
import { PatientRecord, PriorityLevel, QueueStatus } from '../../types';

interface DoctorDashboardProps {
  patients: PatientRecord[];
  selectedPatientId?: string;
  onSelectPatient: (patientId: string) => void;
  onCallPatient: (tokenNumber: string, patientName: string) => void;
  onCallNextPatient?: () => void;
  onUpdatePatientStatus?: (patientId: string, status: QueueStatus) => void;
  activeFilter: 'all' | 'urgent' | 'ready' | 'completed';
  onFilterChange: (filter: 'all' | 'urgent' | 'ready' | 'completed') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentServingToken?: string;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  onCallPatient,
  onCallNextPatient,
  onUpdatePatientStatus,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  currentServingToken = 'A-121',
}) => {
  // Compute queue statistics
  const totalQueue = patients.length;
  const urgentCount = patients.filter(p => p.priority === 'urgent').length;
  const readyCount = patients.filter(p => p.priority === 'routine' || p.priority === 'moderate').length;
  const completedCount = 14;

  // Filtered patients
  const filteredPatients = patients.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abhaId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.intakeSummary.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'urgent') return p.priority === 'urgent';
    if (activeFilter === 'ready') return p.priority === 'routine' || p.priority === 'moderate';
    return true;
  });

  const nextPatient = patients.find(p => p.tokenNumber !== currentServingToken && p.queueStatus !== 'completed') || patients[0];

  return (
    <div className="space-y-6 font-['Outfit']">
      
      {/* OPD Header & Hospital Stats Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-md">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Physician OPD Queue & Triage Dashboard
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-50 text-teal-900 border border-teal-300">
              Live Room 104
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Consultant: <strong className="text-slate-900">Dr. Rajeshwar Sen, MD, DM (Cardiology)</strong> • MCI Reg: MCI-48291
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200 font-bold shadow-2xs">
            <Activity className="w-4 h-4 text-teal-700 animate-pulse" />
            <span>AI Intake Stream Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-teal-950 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-300 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>ABDM Integrated OPD</span>
          </div>
        </div>
      </div>

      {/* CORE QUEUE MANAGEMENT COMMAND BAR (Real-Time Digital Token Controller) */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 border-2 border-teal-500/40 shadow-xl space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-teal-500/20">
          
          {/* NOW SERVING TOKEN */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500 text-slate-950 flex flex-col items-center justify-center font-black shadow-lg">
              <span className="text-[9px] uppercase tracking-widest font-black opacity-80">Serving</span>
              <span className="text-xl font-mono">{currentServingToken}</span>
            </div>
            <div>
              <span className="text-xs text-cyan-300 uppercase font-black tracking-wider block">
                Now in Consultation Room 104
              </span>
              <h3 className="text-lg font-black text-white">
                Ramesh Chandra (54y, Male)
              </h3>
              <span className="text-xs text-slate-400 font-medium">Cardiology Follow-Up • Token Called 4 mins ago</span>
            </div>
          </div>

          {/* NEXT TOKEN IN LINE */}
          <div className="bg-slate-800/80 px-5 py-3 rounded-2xl border border-slate-700 flex items-center gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">
                Next in Queue
              </span>
              <strong className="text-2xl font-mono text-white font-black">
                {nextPatient.tokenNumber}
              </strong>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-300 block">{nextPatient.name}</span>
              <span className="text-[11px] text-amber-400 font-semibold">{nextPatient.intakeSummary.chiefComplaint.slice(0, 26)}...</span>
            </div>
          </div>

          {/* GIANT "CALL NEXT PATIENT" COMMAND BUTTON */}
          <button
            type="button"
            id="btn-doc-call-next"
            onClick={onCallNextPatient || (() => onCallPatient(nextPatient.tokenNumber, nextPatient.name))}
            className="px-6 py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 rounded-2xl font-black text-sm sm:text-base flex items-center gap-3 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-300 hover:scale-105 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>▶ CALL NEXT PATIENT ({nextPatient.tokenNumber})</span>
          </button>

        </div>

        {/* Real-time Queue Breadcrumbs */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-300">Upcoming Token Queue:</span>
            {patients.slice(0, 5).map((p, idx) => (
              <span
                key={p.id}
                onClick={() => onSelectPatient(p.id)}
                className={`px-2.5 py-1 rounded-xl font-mono font-bold cursor-pointer transition-colors ${
                  p.tokenNumber === currentServingToken
                    ? 'bg-cyan-500 text-slate-950'
                    : p.priority === 'urgent'
                    ? 'bg-rose-950 text-rose-300 border border-rose-600/60'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {p.tokenNumber} {p.priority === 'urgent' ? '⚠️' : ''}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Radio className="w-3.5 h-3.5 animate-ping" />
            <span>Waiting TV Display Synced</span>
          </div>
        </div>

      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total in Queue */}
        <div 
          onClick={() => onFilterChange('all')}
          className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className={`flex items-center justify-between text-xs font-black uppercase tracking-wider mb-2 ${
            activeFilter === 'all' ? 'text-teal-400' : 'text-slate-500'
          }`}>
            <span>Total in Queue</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black font-mono">{totalQueue}</div>
          <p className={`text-xs mt-1 font-medium ${activeFilter === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>Checked in via hospital kiosk</p>
        </div>

        {/* Urgent Red Flag Alerts */}
        <div 
          onClick={() => onFilterChange('urgent')}
          className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
            activeFilter === 'urgent'
              ? 'bg-rose-900 text-white border-rose-900 shadow-md'
              : 'bg-white border-slate-200 hover:border-rose-300 shadow-2xs'
          }`}
        >
          <div className={`flex items-center justify-between text-xs font-black uppercase tracking-wider mb-2 ${
            activeFilter === 'urgent' ? 'text-rose-300' : 'text-rose-600'
          }`}>
            <span>Urgent Red Flags</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black font-mono text-rose-600">{urgentCount}</div>
          <p className={`text-xs mt-1 font-medium ${activeFilter === 'urgent' ? 'text-rose-200' : 'text-slate-500'}`}>Requires immediate escalation</p>
        </div>

        {/* Ready for Doctor */}
        <div 
          onClick={() => onFilterChange('ready')}
          className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
            activeFilter === 'ready'
              ? 'bg-teal-900 text-white border-teal-900 shadow-md'
              : 'bg-white border-slate-200 hover:border-teal-300 shadow-2xs'
          }`}
        >
          <div className={`flex items-center justify-between text-xs font-black uppercase tracking-wider mb-2 ${
            activeFilter === 'ready' ? 'text-teal-300' : 'text-teal-700'
          }`}>
            <span>AI Intake Complete</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black font-mono text-teal-700">{readyCount}</div>
          <p className={`text-xs mt-1 font-medium ${activeFilter === 'ready' ? 'text-teal-200' : 'text-slate-500'}`}>Symptoms & OCR ready</p>
        </div>

        {/* OPD Completed Today */}
        <div 
          onClick={() => onFilterChange('completed')}
          className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
            activeFilter === 'completed'
              ? 'bg-indigo-900 text-white border-indigo-900 shadow-md'
              : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs'
          }`}
        >
          <div className={`flex items-center justify-between text-xs font-black uppercase tracking-wider mb-2 ${
            activeFilter === 'completed' ? 'text-indigo-300' : 'text-indigo-700'
          }`}>
            <span>OPD Consulted Today</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black font-mono text-indigo-700">{completedCount}</div>
          <p className={`text-xs mt-1 font-medium ${activeFilter === 'completed' ? 'text-indigo-200' : 'text-slate-500'}`}>Prescription dispatched</p>
        </div>

      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-2xs">
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search patient, token, ABHA, symptom..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-100"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Patients ({totalQueue})
          </button>

          <button
            type="button"
            onClick={() => onFilterChange('urgent')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'urgent'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            Urgent Red Flags ({urgentCount})
          </button>

          <button
            type="button"
            onClick={() => onFilterChange('ready')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'ready'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Routine Queue ({readyCount})
          </button>
        </div>

      </div>

      {/* Patient Queue Cards List with Detailed Token Status Actions */}
      <div className="space-y-3.5">
        {filteredPatients.map((patient) => {
          const isSelected = selectedPatientId === patient.id;
          const isUrgent = patient.priority === 'urgent';
          const isServing = patient.tokenNumber === currentServingToken;

          return (
            <div
              key={patient.id}
              onClick={() => onSelectPatient(patient.id)}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm hover:scale-[1.01] ${
                isServing
                  ? 'bg-cyan-50/70 border-cyan-500 shadow-md ring-2 ring-cyan-400/30'
                  : isSelected
                  ? 'bg-teal-50/60 border-teal-600 shadow-md'
                  : isUrgent
                  ? 'bg-rose-50/40 border-rose-300 hover:border-rose-400'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              
              {/* Left Column: Token + Patient Identity */}
              <div className="flex items-start gap-4">
                
                {/* Token Badge */}
                <div
                  className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono shrink-0 shadow-md ${
                    isServing
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : isUrgent
                      ? 'bg-rose-700 text-white'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  <span className="text-[10px] uppercase font-black tracking-wider opacity-80">Token</span>
                  <span className="text-xl font-black">{patient.tokenNumber}</span>
                </div>

                {/* Demographics & Chief Complaint */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-black text-slate-900 text-base">{patient.name}</h3>
                    <span className="text-xs font-bold text-slate-500">
                      {patient.age}y / {patient.gender === 'male' ? 'M' : patient.gender === 'female' ? 'F' : 'O'}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      • ABHA: {patient.abhaId}
                    </span>
                    {isServing && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-100 text-cyan-900 border border-cyan-300">
                        🔔 Now Serving
                      </span>
                    )}
                    {isUrgent && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-700 text-white uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Priority Triage
                      </span>
                    )}
                  </div>

                  {/* Complaint & Pain Score */}
                  <div className="flex items-center gap-2 text-xs text-slate-700 flex-wrap">
                    <span className="font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
                      CC: {patient.intakeSummary.chiefComplaint}
                    </span>
                    <span className={`font-bold px-2.5 py-1 rounded-xl border ${
                      patient.intakeSummary.painScore >= 7
                        ? 'bg-rose-50 text-rose-900 border-rose-200'
                        : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}>
                      Pain: {patient.intakeSummary.painScore}/10 ({patient.intakeSummary.character || 'Severe'})
                    </span>
                    <span className="text-slate-500 font-bold">
                      Duration: {patient.intakeSummary.duration}
                    </span>
                  </div>

                  {/* Clinical Data Status Pill */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-xl border border-slate-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                      <span>Structured Intake • {patient.documents.length} documents indexed</span>
                    </div>

                    {patient.ayushAssessment && (
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-xl border border-emerald-200">
                        AYUSH Prakriti Attached
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Doctor Actions (Call, Recall, Skip, Open EMR) */}
              <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                
                {/* Call In Speaker Action */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCallPatient(patient.tokenNumber, patient.name);
                  }}
                  className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-black flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
                  title="Announce token on hospital waiting TV"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-teal-800" />
                  <span>Call Token</span>
                </button>

                {/* Open EMR Action */}
                <button
                  type="button"
                  onClick={() => onSelectPatient(patient.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 text-white ring-2 ring-teal-500'
                      : 'bg-teal-800 hover:bg-teal-700 text-white'
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Open EMR Summary</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
