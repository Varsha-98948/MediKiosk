'use client';

import React, { useState } from 'react';
import { 
  History, 
  Plus, 
  Minus, 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  TrendingUp,
  Pill,
  Activity
} from 'lucide-react';
import { PatientRecord } from '../../types';

interface LongitudinalDiffTimelineProps {
  patient: PatientRecord;
  onSelectVisit?: (visitId: string) => void;
}

interface ClinicalDelta {
  type: 'new_symptom' | 'new_medication' | 'stopped_medication' | 'increased_severity' | 'improved_symptom';
  symbol: string;
  badgeColor: string;
  textColor: string;
  title: string;
  description: string;
  evidence: string;
}

interface VisitRecord {
  id: string;
  date: string;
  daysAgo: string;
  doctorName: string;
  department: string;
  primaryDiagnosis: string;
  deltas: ClinicalDelta[];
  bp: string;
  pulse: string;
  summaryNotes: string;
}

export const LongitudinalDiffTimeline: React.FC<LongitudinalDiffTimelineProps> = ({
  patient,
  onSelectVisit,
}) => {
  const [selectedVisitId, setSelectedVisitId] = useState<string>('visit_today');
  const [expandedDeltaIdx, setExpandedDeltaIdx] = useState<number | null>(0);

  const visits: VisitRecord[] = [
    {
      id: 'visit_today',
      date: 'Today, 10:30 AM',
      daysAgo: 'Current Consultation',
      doctorName: 'Dr. Rajeshwar Sen (Cardiology)',
      department: 'OPD Block A • Room 104',
      primaryDiagnosis: 'Exertional Precordial Angina with Pitta-Kapha Ama Accumulation',
      bp: '152/92 mmHg',
      pulse: '76 BPM',
      summaryNotes: 'Patient presents with new bilateral ankle swelling and aggravated precordial tightness during morning stair climbing.',
      deltas: [
        {
          type: 'new_symptom',
          symbol: '+',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
          textColor: 'text-rose-900',
          title: 'New Symptom: Bilateral Ankle Pitting Edema (पादशोथ)',
          description: 'Mild dependent swelling noticed 4 days ago; pits on firm pressure. Corresponds to Kapha-Vata fluid retention.',
          evidence: 'Kiosk Intake Question #2 & Physical examination confirm 1+ pitting ankle edema.'
        },
        {
          type: 'increased_severity',
          symbol: '↑',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
          textColor: 'text-amber-900',
          title: 'Increased Severity: Systolic Blood Pressure 138 → 152 mmHg',
          description: 'Systolic pressure has risen 14 mmHg compared to 3 weeks ago. Elevated Pitta vascular resistance.',
          evidence: 'Optical Kiosk vitals: 152/92 mmHg vs previous recorded baseline 138/84 mmHg.'
        },
        {
          type: 'new_medication',
          symbol: '+',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          textColor: 'text-emerald-900',
          title: 'New Ayush Formulation: Yogaraj Guggulu 500mg BD',
          description: 'Initiated for Sandhi stambha (joint morning stiffness) and Deepana-Pachana effect.',
          evidence: 'Checked against Formulary Safety Check: verified low-dose interaction profile.'
        },
        {
          type: 'stopped_medication',
          symbol: '−',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
          textColor: 'text-slate-800',
          title: 'Medication Discontinued: Ibuprofen 400mg PRN',
          description: 'NSAID stopped due to worsening epigastric burning (Amlapitta) and fluid retention risk.',
          evidence: 'Discontinued on physician review to protect gastric mucosa and renal filtration.'
        },
        {
          type: 'improved_symptom',
          symbol: '↓',
          badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
          textColor: 'text-teal-900',
          title: 'Improved Symptom: Knee Morning Stiffness 90 min → 20 min',
          description: 'Joint flexibility has noticeably improved following Panchakarma Janu Basti sessions.',
          evidence: 'Patient self-reported duration on Kiosk: reduced from 90 to 20 minutes.'
        }
      ]
    },
    {
      id: 'visit_prev',
      date: '21 Aug 2026',
      daysAgo: '3 weeks ago',
      doctorName: 'Dr. Ananya Sharma (General Medicine)',
      department: 'OPD Block A • Room 101',
      primaryDiagnosis: 'Essential Hypertension Grade 1 & Knee Osteoarthritis (Sandhivata)',
      bp: '138/84 mmHg',
      pulse: '72 BPM',
      summaryNotes: 'Follow-up for chronic knee pain and mild blood pressure elevation. Advised lifestyle modifications.',
      deltas: [
        {
          type: 'new_medication',
          symbol: '+',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          textColor: 'text-emerald-900',
          title: 'Prescribed Telmisartan 40mg OD',
          description: 'Started for blood pressure management.',
          evidence: 'Clinical EMR prescription record #RX-48210.'
        },
        {
          type: 'improved_symptom',
          symbol: '↓',
          badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
          textColor: 'text-teal-900',
          title: 'Digestive Heartburn Eased with Diet (Pathya)',
          description: 'Evening acidity reduced by avoiding fried spices.',
          evidence: 'Patient reported good adherence to Pathya regimen.'
        }
      ]
    },
    {
      id: 'visit_baseline',
      date: '05 Jul 2026',
      daysAgo: '2 months ago',
      doctorName: 'Dr. Vivek Kulkarni (Orthopedics)',
      department: 'OPD Block A • Room 106',
      primaryDiagnosis: 'Bilateral Primary Osteoarthritis Knee (Grade 2 Kellgren-Lawrence)',
      bp: '134/82 mmHg',
      pulse: '74 BPM',
      summaryNotes: 'Initial intake with bilateral knee crepitus and restricted flexion after morning awakening.',
      deltas: [
        {
          type: 'new_symptom',
          symbol: '+',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
          textColor: 'text-rose-900',
          title: 'Onset: Knee Crepitus & Morning Stambha',
          description: 'First formal presentation of osteoarthritic symptoms.',
          evidence: 'X-Ray Bilateral Knees AP confirmed joint space narrowing.'
        }
      ]
    }
  ];

  const currentVisit = visits.find(v => v.id === selectedVisitId) || visits[0];

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-7 font-['Outfit']">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span>
            <h3 className="text-xl font-black text-slate-900">
              Longitudinal Clinical Diff Timeline
            </h3>
            <span className="text-[10px] font-black bg-[#EBF3EF] text-[#0D5C4D] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
              Visit-over-Visit Deltas
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Highlights <strong>"What changed since the previous visit"</strong> to eliminate repetitive history-taking and alert fatigue.
          </p>
        </div>

        {/* Delta Type Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-extrabold text-slate-600">
          <span className="px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-md">+ New Symptom</span>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">+ New Med</span>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-300 rounded-md">− Stopped</span>
          <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-md">↑ Worse</span>
          <span className="px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-md">↓ Improved</span>
        </div>
      </div>

      {/* Visit Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {visits.map((visit) => {
          const isSelected = visit.id === selectedVisitId;
          return (
            <button
              key={visit.id}
              type="button"
              onClick={() => {
                setSelectedVisitId(visit.id);
                if (onSelectVisit) onSelectVisit(visit.id);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-sm scale-[1.01]'
                  : 'bg-[#FAFBF9] border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black ${isSelected ? 'text-emerald-300' : 'text-[#0D5C4D]'}`}>
                  {visit.date}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {visit.daysAgo}
                </span>
              </div>
              <div className="text-xs font-black mt-1 line-clamp-1">
                {visit.primaryDiagnosis}
              </div>
              <div className={`text-[11px] mt-1 font-medium ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                BP: {visit.bp} • {visit.deltas.length} Delta Indicators
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Visit Delta Deep Dive */}
      <div className="bg-[#FAFBF9] p-5 sm:p-6 rounded-2xl border border-slate-200/90 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-slate-500">Encounter Summary:</span>
            <div className="text-sm font-black text-slate-900">
              {currentVisit.doctorName} • {currentVisit.department}
            </div>
          </div>
          <div className="text-xs text-slate-600 font-medium">
            Baseline Vitals: <strong className="text-slate-900">{currentVisit.bp}</strong>, Pulse: <strong className="text-slate-900">{currentVisit.pulse}</strong>
          </div>
        </div>

        {/* Detailed Delta List */}
        <div className="space-y-3">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
            What Changed Since Previous Consultation:
          </span>

          {currentVisit.deltas.map((delta, idx) => {
            const isExpanded = expandedDeltaIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2 hover:border-[#0D5C4D]/40 transition-colors"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedDeltaIdx(isExpanded ? null : idx)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black border font-mono ${delta.badgeColor}`}>
                      {delta.symbol}
                    </span>
                    <div className="text-xs sm:text-sm font-black text-slate-900">
                      {delta.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">
                      {isExpanded ? 'Hide evidence' : 'Click to inspect proof'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                <p className="text-xs text-slate-600 pl-10 leading-relaxed font-medium">
                  {delta.description}
                </p>

                {isExpanded && (
                  <div className="ml-10 mt-2 p-3 bg-[#FAFBF9] rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-[#0D5C4D] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Data Provenance & Clinical Evidence:</span>
                    </div>
                    <p className="text-slate-600 font-medium">
                      {delta.evidence}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
