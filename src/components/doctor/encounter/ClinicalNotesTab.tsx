'use client';

import React from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';

export function ClinicalNotesTab() {
  const { clinicalNotes, updateClinicalNotes, setCurrentStep } = useClinicalEncounter();

  return (
    <div className="flex flex-col w-full gap-5 select-none">
      {/* Header */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-[13px] mb-1">
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Clinical Station 4</span>
          </div>
          <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
            Physical Examination &amp; Clinical Notes Documentation
          </h2>
          <p className="text-[12px] text-on-surface-variant">
            Systematic organ-system assessment, physical signs, and physician summary
          </p>
        </div>

        <button
          onClick={() => setCurrentStep('diagnoses')}
          className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-2xs"
        >
          <span>Continue to ICD-10 Diagnoses</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* General Examination */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
        <label className="text-[12px] font-bold text-on-surface uppercase tracking-wider block mb-1.5 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">person</span>
          <span>General Physical Appearance &amp; Bedside Findings</span>
        </label>
        <textarea
          rows={2}
          className="w-full p-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] text-on-surface outline-none focus:ring-1 focus:ring-primary leading-relaxed"
          value={clinicalNotes.generalExam}
          onChange={(e) => updateClinicalNotes({ generalExam: e.target.value })}
          placeholder="e.g. Alert, oriented in time/place/person. No icterus, clubbing, cyanosis, or pedal edema..."
        />
      </div>

      {/* Systemic Examination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cardiovascular (CVS) */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
          <label className="text-[12px] font-bold text-on-surface uppercase tracking-wider block mb-1.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-error">cardiology</span>
            <span>Cardiovascular System (CVS)</span>
          </label>
          <textarea
            rows={2}
            className="w-full p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] text-on-surface outline-none focus:ring-1 focus:ring-primary leading-relaxed"
            value={clinicalNotes.cvs}
            onChange={(e) => updateClinicalNotes({ cvs: e.target.value })}
            placeholder="e.g. S1 S2 heard. No audible murmur. Normal regular rate..."
          />
        </div>

        {/* Respiratory System (RS) */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
          <label className="text-[12px] font-bold text-on-surface uppercase tracking-wider block mb-1.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">pulmonology</span>
            <span>Respiratory System (RS)</span>
          </label>
          <textarea
            rows={2}
            className="w-full p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] text-on-surface outline-none focus:ring-1 focus:ring-primary leading-relaxed"
            value={clinicalNotes.respiratory}
            onChange={(e) => updateClinicalNotes({ respiratory: e.target.value })}
            placeholder="e.g. Bilateral vesicular breath sounds. Clear lung fields without added sounds..."
          />
        </div>

        {/* Abdomen (PA) */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
          <label className="text-[12px] font-bold text-on-surface uppercase tracking-wider block mb-1.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-amber-600">gastroenterology</span>
            <span>Per Abdomen (PA)</span>
          </label>
          <textarea
            rows={2}
            className="w-full p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] text-on-surface outline-none focus:ring-1 focus:ring-primary leading-relaxed"
            value={clinicalNotes.abdomen}
            onChange={(e) => updateClinicalNotes({ abdomen: e.target.value })}
            placeholder="e.g. Soft, non-tender, no hepatosplenomegaly. Normal bowel sounds..."
          />
        </div>

        {/* Central Nervous System (CNS) */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
          <label className="text-[12px] font-bold text-on-surface uppercase tracking-wider block mb-1.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-purple-600">neurology</span>
            <span>Neurological &amp; Diabetic Sensory Exam</span>
          </label>
          <textarea
            rows={2}
            className="w-full p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] text-on-surface outline-none focus:ring-1 focus:ring-primary leading-relaxed"
            value={clinicalNotes.cns}
            onChange={(e) => updateClinicalNotes({ cns: e.target.value })}
            placeholder="e.g. Vibration perception threshold, monofilament touch, deep tendon reflexes..."
          />
        </div>
      </div>

      {/* Doctor Clinical Synthesis */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
        <label className="text-[12px] font-bold text-on-surface uppercase tracking-wider block mb-1.5 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">clinical_notes</span>
          <span>Physician Clinical Impressions &amp; Summary</span>
        </label>
        <textarea
          rows={3}
          className="w-full p-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] text-on-surface outline-none focus:ring-1 focus:ring-primary leading-relaxed font-medium"
          value={clinicalNotes.doctorImpressions}
          onChange={(e) => updateClinicalNotes({ doctorImpressions: e.target.value })}
          placeholder="Summary assessment, etiology, differential considerations, and management plan..."
        />
      </div>
    </div>
  );
}
