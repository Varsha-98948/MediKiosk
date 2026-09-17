'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  ShieldAlert, 
  Hospital, 
  Activity, 
  Share2, 
  Settings, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Search, 
  Filter, 
  RotateCcw,
  Network,
  FileCheck2,
  Volume2,
  ScanLine,
  Sliders,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { PatientRecord, Language, DoctorProfile } from '../../types';
import { LongitudinalDiffTimeline } from './LongitudinalDiffTimeline';
import { GlassboxNodeGraph } from './GlassboxNodeGraph';
import { RawAudioProof } from './RawAudioProof';
import { OcrLabReportViewer } from './OcrLabReportViewer';
import { ForensicVerificationPanel } from './ForensicVerificationPanel';
import { SemanticContradictionMatrix } from './SemanticContradictionMatrix';
import { ClinicalCodingView } from './ClinicalCodingView';
import { FormularySafetyCheck } from './FormularySafetyCheck';
import { PathyaApathyaSmartSlip } from './PathyaApathyaSmartSlip';
import { speakText } from '../../utils/speech';

interface GlassboxDoctorWorkspaceProps {
  patients: PatientRecord[];
  activePatientId: string;
  onSelectPatient: (id: string) => void;
  onCallNextPatient?: () => void;
  language?: Language;
  doctorProfile?: DoctorProfile;
}

export type DoctorNavTab = 
  | 'dashboard'
  | 'patients'
  | 'diff_timeline'
  | 'ai_insights'
  | 'ocr_reports'
  | 'forensics'
  | 'safety_contradictions'
  | 'formulary_check'
  | 'clinical_coding'
  | 'smart_slip';

export const GlassboxDoctorWorkspace: React.FC<GlassboxDoctorWorkspaceProps> = ({
  patients,
  activePatientId,
  onSelectPatient,
  onCallNextPatient,
  language = 'en',
  doctorProfile,
}) => {
  const [activeTab, setActiveTab] = useState<DoctorNavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'urgent' | 'routine'>('all');

  const activePatient = patients.find(p => p.id === activePatientId) || patients[0];

  const sidebarNavItems: { id: DoctorNavTab; label: string; icon: any; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients Queue', icon: Users, badge: `${patients.length}` },
    { id: 'diff_timeline', label: 'Diff Timeline', icon: Clock, badge: 'Deltas' },
    { id: 'ai_insights', label: 'AI Node Graph', icon: Network, badge: 'Explainable' },
    { id: 'ocr_reports', label: 'OCR Lab Reports', icon: ScanLine },
    { id: 'forensics', label: 'Document Forensics', icon: ShieldCheck, badge: 'ELA' },
    { id: 'safety_contradictions', label: 'Contradiction Matrix', icon: ShieldAlert, badge: 'Alert' },
    { id: 'formulary_check', label: 'Formulary Safety', icon: Activity },
    { id: 'clinical_coding', label: 'NAMASTE & ICD-11', icon: FileText },
    { id: 'smart_slip', label: 'Pathya Smart Slip', icon: FileCheck2 },
  ];

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || p.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-['Outfit'] text-[#1C2421]">
      
      {/* Top Header Strip */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E6ECE8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0D5C4D] text-white flex items-center justify-center font-black shadow-xs">
            <Stethoscope className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Glassbox Clinical Workspace
              </h2>
              <span className="text-[10px] font-black bg-[#EBF3EF] text-[#0D5C4D] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
                Physician Supervised AI
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Attending: <strong className="text-slate-800">Dr. Rajeshwar Sen</strong> (Cardiology & Ayush Integrative OPD Block A)
            </p>
          </div>
        </div>

        {/* Quick Call Next & Status */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onCallNextPatient && (
            <button
              type="button"
              onClick={onCallNextPatient}
              className="px-5 py-2.5 bg-[#0D5C4D] hover:bg-[#0F4C42] text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Call Next Token</span>
            </button>
          )}

          <div className="p-2 bg-[#FAFBF9] rounded-xl border border-slate-200 text-xs text-slate-500 font-medium hidden sm:block">
            Currently in Encounter: <strong className="text-slate-900 font-mono">{activePatient.tokenNumber}</strong>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout: Clean Left Sidebar + Dynamic Content Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Clinical Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-[#E6ECE8] p-3 sm:p-4 shadow-xs space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-wider">
            Clinical Navigation
          </div>

          {sidebarNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full p-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-[#0D5C4D] text-white shadow-xs font-black'
                    : 'text-slate-700 hover:bg-[#FAFBF9] hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Mini Active Patient Summary Card in Sidebar */}
          <div className="mt-4 pt-4 border-t border-slate-100 p-2 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Case Sheet
            </span>
            <div className="bg-[#FAFBF9] p-3 rounded-2xl border border-slate-200 space-y-1">
              <div className="font-black text-xs text-slate-900">{activePatient.name}</div>
              <div className="text-[11px] text-slate-500">
                {activePatient.age} yrs • Token: <strong className="text-[#0D5C4D] font-mono">{activePatient.tokenNumber}</strong>
              </div>
              <div className="text-[10px] text-rose-700 font-bold line-clamp-1">
                {activePatient.chiefComplaint}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Dynamic Canvas */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* ========================================================================= */}
          {/* 1. MASTER DASHBOARD VIEW (Prioritized Overview Per Section 13) */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Prioritized 4 Summary Metrics (No Cluttered 20 Cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Today's Queue</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">{patients.length}</div>
                  <span className="text-[10px] text-slate-400">3 Pending Intake</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Critical Cases</span>
                  <div className="text-2xl font-black text-rose-700 font-mono">1</div>
                  <span className="text-[10px] text-rose-600 font-bold">ACS Angina Alert</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Pending Doctor Sign-off</span>
                  <div className="text-2xl font-black text-amber-800 font-mono">2</div>
                  <span className="text-[10px] text-amber-700 font-semibold">AI Coding Approvals</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E6ECE8] shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-[#0D5C4D] uppercase tracking-wider">Ayush Integrative</span>
                  <div className="text-2xl font-black text-[#0D5C4D] font-mono">100%</div>
                  <span className="text-[10px] text-slate-400">Dashavidha Mapped</span>
                </div>
              </div>

              {/* Active Encounter Quick Highlights */}
              <div className="bg-white p-6 rounded-3xl border border-[#E6ECE8] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-black text-[#0D5C4D] uppercase tracking-wider bg-[#EBF3EF] px-2 py-0.5 rounded border border-[#D1E4DB]">
                      Active Consultation Encounter
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1">
                      {activePatient.name} ({activePatient.age} Yrs, {activePatient.gender}) • Token {activePatient.tokenNumber}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('diff_timeline')}
                      className="px-3.5 py-1.5 bg-[#FAFBF9] hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      View Diff Timeline →
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('ai_insights')}
                      className="px-3.5 py-1.5 bg-[#0D5C4D] hover:bg-[#0F4C42] text-white rounded-xl text-xs font-black cursor-pointer shadow-2xs"
                    >
                      Inspect AI Node Graph →
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 bg-[#FAFBF9] rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">Chief Complaint</span>
                    <div className="font-black text-slate-900 leading-snug">{activePatient.chiefComplaint}</div>
                    <div className="text-[11px] text-slate-500">Duration: 3 weeks • Severity: 7/10</div>
                  </div>

                  <div className="p-3.5 bg-[#FAFBF9] rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">Optical Baseline Vitals</span>
                    <div className="font-black text-slate-900 leading-snug">
                      BP: {activePatient.vitals.bp} • Pulse: {activePatient.vitals.pulse}
                    </div>
                    <div className="text-[11px] text-slate-500">SpO2: {activePatient.vitals.spo2} • Temp: {activePatient.vitals.temp}</div>
                  </div>

                  <div className="p-3.5 bg-[#FAFBF9] rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-[#0D5C4D] uppercase tracking-wider text-[10px] block">Prakriti & Agni</span>
                    <div className="font-black text-slate-900 leading-snug">
                      {activePatient.ayushAssessment?.prakritiType || 'Pitta-Kapha (द्वन्द्वज)'}
                    </div>
                    <div className="text-[11px] text-slate-500">Agni: Mandagni • Rasa Vitiation</div>
                  </div>
                </div>
              </div>

              {/* Raw Audio Proof Widget in Master Dashboard */}
              <RawAudioProof />

              {/* Longitudinal Diff Timeline Preview */}
              <LongitudinalDiffTimeline patient={activePatient} />

            </div>
          )}

          {/* 2. PATIENTS QUEUE */}
          {activeTab === 'patients' && (
            <div className="bg-white rounded-3xl border border-[#E6ECE8] p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900">Today's OPD Patient Triage Queue</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search name or token..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1.5 bg-[#FAFBF9] border border-slate-300 rounded-xl text-xs font-medium outline-none focus:border-[#0D5C4D]"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                {filteredPatients.map((p) => {
                  const isSelected = p.id === activePatient.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => onSelectPatient(p.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#0D5C4D] bg-[#EBF3EF]/40 shadow-xs ring-2 ring-[#0D5C4D]/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-12 h-10 rounded-xl flex items-center justify-center font-mono font-black text-xs ${
                          p.priority === 'urgent' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {p.tokenNumber}
                        </span>
                        <div>
                          <div className="text-sm font-black text-slate-900">{p.name}</div>
                          <div className="text-xs text-slate-500 font-medium">
                            {p.age} Yrs / {p.gender} • {p.chiefComplaint}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border uppercase ${
                          p.priority === 'urgent'
                            ? 'bg-rose-100 text-rose-900 border-rose-300'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}>
                          {p.priority}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. DIFF TIMELINE */}
          {activeTab === 'diff_timeline' && (
            <LongitudinalDiffTimeline patient={activePatient} />
          )}

          {/* 4. AI INSIGHTS / NODE GRAPH */}
          {activeTab === 'ai_insights' && (
            <GlassboxNodeGraph />
          )}

          {/* 5. OCR LAB REPORTS */}
          {activeTab === 'ocr_reports' && (
            <OcrLabReportViewer document={activePatient.documents[0]} />
          )}

          {/* 6. FORENSICS & INTEGRITY */}
          {activeTab === 'forensics' && (
            <ForensicVerificationPanel />
          )}

          {/* 7. CONTRADICTION MATRIX */}
          {activeTab === 'safety_contradictions' && (
            <SemanticContradictionMatrix />
          )}

          {/* 8. FORMULARY SAFETY */}
          {activeTab === 'formulary_check' && (
            <FormularySafetyCheck />
          )}

          {/* 9. CLINICAL CODING */}
          {activeTab === 'clinical_coding' && (
            <ClinicalCodingView />
          )}

          {/* 10. PATHYA SMART SLIP */}
          {activeTab === 'smart_slip' && (
            <PathyaApathyaSmartSlip patient={activePatient} />
          )}

        </main>

      </div>

    </div>
  );
};
