'use client';

import React, { useState } from 'react';
import { 
  FileCode, 
  CheckCircle2, 
  Edit3, 
  X, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  Globe,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

interface CodingMapping {
  id: string;
  patientStatement: string;
  suggestedNamasteTerm: {
    code: string;
    term: string;
    sanskrit: string;
  };
  suggestedIcd11Term: {
    code: string;
    title: string;
    chapter: string;
  };
  confidence: number;
  status: 'pending' | 'approved' | 'modified' | 'overridden';
  doctorOverrideNote?: string;
}

export const ClinicalCodingView: React.FC = () => {
  const [mappings, setMappings] = useState<CodingMapping[]>([
    {
      id: 'code_1',
      patientStatement: 'Severe precordial chest tightness radiating to left shoulder on fast walking',
      suggestedNamasteTerm: {
        code: 'SR-HR-02',
        term: 'Kaphaja Hridroga / Srotorodha',
        sanskrit: 'कफज हृद्रोग (स्रोतोरोध)'
      },
      suggestedIcd11Term: {
        code: 'TM2.4A / BA01',
        title: 'Disorders of Heart Channel with Phlegm-Blood Congestion',
        chapter: 'Chapter 26: Traditional Medicine Module 2'
      },
      confidence: 0.94,
      status: 'approved'
    },
    {
      id: 'code_2',
      patientStatement: 'Severe bilateral knee morning stiffness with cracking sounds lasting 90 minutes',
      suggestedNamasteTerm: {
        code: 'SR-AM-04',
        term: 'Sandhivata / Amavata (Joint Stiffness)',
        sanskrit: 'सन्धिवात / आमवात (स्तम्भ)'
      },
      suggestedIcd11Term: {
        code: 'TM2.1B / SB01',
        title: 'Disorders of Vata with Ama accumulation in Joint Dhatus',
        chapter: 'Chapter 26: Traditional Medicine Module 2'
      },
      confidence: 0.92,
      status: 'pending'
    },
    {
      id: 'code_3',
      patientStatement: 'Burning sensation in stomach 2 hours after food with sour belching and nausea',
      suggestedNamasteTerm: {
        code: 'SR-AG-01',
        term: 'Amlapitta / Vidagdhajirna (Hyperchlorhydria)',
        sanskrit: 'अम्लपित्त / विदग्धाजीर्ण'
      },
      suggestedIcd11Term: {
        code: 'TM2.2C / DA22',
        title: 'Disorders of Digestive Fire with Acid-Heat Imbalance',
        chapter: 'Chapter 26: Traditional Medicine Module 2'
      },
      confidence: 0.96,
      status: 'pending'
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTerm, setEditTerm] = useState('');

  const handleApprove = (id: string) => {
    setMappings(prev => prev.map(m => m.id === id ? { ...m, status: 'approved' } : m));
  };

  const handleOverride = (id: string) => {
    setMappings(prev => prev.map(m => m.id === id ? { ...m, status: 'overridden' } : m));
  };

  const handleSaveEdit = (id: string) => {
    setMappings(prev => prev.map(m => m.id === id ? {
      ...m,
      status: 'modified',
      suggestedNamasteTerm: { ...m.suggestedNamasteTerm, term: editTerm }
    } : m));
    setEditingId(null);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-7 font-['Outfit']">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span>
            <h3 className="text-xl font-black text-slate-900">
              Standardized Clinical Coding: NAMASTE & ICD-11 TM2
            </h3>
            <span className="text-[10px] font-black bg-[#EBF3EF] text-[#0D5C4D] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
              National Morbidity Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Maps free-text intake statements to National Ayush Morbidity codes and WHO ICD-11 Traditional Medicine Chapter 2.
          </p>
        </div>

        <div className="p-2.5 bg-[#FAFBF9] rounded-2xl border border-slate-200 text-xs font-bold text-[#0D5C4D] flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Physician Reviewable & Verifiable</span>
        </div>
      </div>

      {/* Mapping Cards */}
      <div className="space-y-4">
        {mappings.map((item) => {
          const isApproved = item.status === 'approved';
          const isOverridden = item.status === 'overridden';
          const isModified = item.status === 'modified';
          return (
            <div
              key={item.id}
              className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-4 ${
                isApproved
                  ? 'bg-[#EBF3EF]/20 border-[#D1E4DB]'
                  : isOverridden
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-[#FAFBF9] border-slate-200 hover:border-[#0D5C4D]/40'
              }`}
            >
              {/* Patient Statement Quote */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Patient Expressed Statement (Voice/Text Input):
                  </span>
                  <div className="text-sm font-black text-slate-900 italic">
                    "{item.patientStatement}"
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {Math.round(item.confidence * 100)}% Confidence
                  </span>
                  <span className={`text-xs font-black px-2.5 py-1 rounded-full border uppercase ${
                    isApproved
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : isOverridden
                      ? 'bg-rose-100 text-rose-900 border-rose-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Dual Coding Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                
                {/* 1. NAMASTE Standardized Term */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#0D5C4D] uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      NAMASTE National Ayush Terminology
                    </span>
                    <span className="text-xs font-mono font-black text-[#0D5C4D] bg-[#EBF3EF] px-2 py-0.5 rounded border border-[#D1E4DB]">
                      {item.suggestedNamasteTerm.code}
                    </span>
                  </div>

                  {editingId === item.id ? (
                    <div className="flex gap-1 pt-1">
                      <input
                        type="text"
                        value={editTerm}
                        onChange={(e) => setEditTerm(e.target.value)}
                        className="flex-1 px-2 py-1 bg-slate-50 rounded border text-xs font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(item.id)}
                        className="px-2 py-1 bg-[#0D5C4D] text-white rounded text-xs font-bold"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm font-black text-slate-900">
                        {item.suggestedNamasteTerm.term}
                      </div>
                      <div className="text-xs text-[#0D5C4D] font-bold">
                        {item.suggestedNamasteTerm.sanskrit}
                      </div>
                    </>
                  )}
                </div>

                {/* 2. ICD-11 TM2 (Traditional Medicine Module 2) Term */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      WHO ICD-11 Traditional Medicine (TM2)
                    </span>
                    <span className="text-xs font-mono font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {item.suggestedIcd11Term.code}
                    </span>
                  </div>

                  <div className="text-sm font-black text-slate-900">
                    {item.suggestedIcd11Term.title}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {item.suggestedIcd11Term.chapter}
                  </div>
                </div>

              </div>

              {/* Doctor Review Actions */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {isApproved ? 'Verified and locked for AHMIS case sheet.' : 'Requires physician sign-off before electronic filing:'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(item.id);
                      setEditTerm(item.suggestedNamasteTerm.term);
                    }}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOverride(item.id)}
                    className="px-3 py-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-800 rounded-xl font-bold cursor-pointer flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    <span>Override</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(item.id)}
                    className="px-4 py-1.5 bg-[#0D5C4D] hover:bg-[#0F4C42] text-white rounded-xl font-black cursor-pointer shadow-2xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve ✓</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
