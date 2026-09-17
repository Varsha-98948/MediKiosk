'use client';

import React, { useState } from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';

const symptomPresets = [
  'Increased frequency of urination (Polyuria)',
  'Excessive thirst & dry mouth (Polydipsia)',
  'Waking up multiple times to urinate (Nocturia)',
  'General fatigue & early morning lethargy',
  'Burning feet sensation & numbness (Neuropathy)',
  'Intermittent blurred vision',
  'Unintentional weight loss',
  'Occipital morning headache',
];

export function ChiefComplaintsTab() {
  const {
    complaints,
    addComplaint,
    removeComplaint,
    clinicalNotes,
    updateClinicalNotes,
    setCurrentStep,
  } = useClinicalEncounter();

  const [selectedPreset, setSelectedPreset] = useState(symptomPresets[0]);
  const [duration, setDuration] = useState('2 Weeks');
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>('Moderate');
  const [onset, setOnset] = useState<'Gradual' | 'Sudden'>('Gradual');
  const [notes, setNotes] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPreset) return;
    addComplaint({
      complaint: selectedPreset,
      duration,
      severity,
      onset,
      notes: notes || undefined,
    });
    setNotes('');
  };

  const handleQuickAdd = (symptom: string) => {
    addComplaint({
      complaint: symptom,
      duration: '1-2 Weeks',
      severity: 'Moderate',
      onset: 'Gradual',
    });
  };

  return (
    <div className="flex flex-col w-full gap-5 select-none">
      {/* Header */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-[13px] mb-1">
            <span className="material-symbols-outlined text-[18px]">stethoscope</span>
            <span>Intake Station 3</span>
          </div>
          <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
            Chief Presenting Complaints &amp; Symptom Intake
          </h2>
          <p className="text-[12px] text-on-surface-variant">
            Capture presenting symptoms, chronicity, severity, and structured clinical history
          </p>
        </div>

        <button
          onClick={() => setCurrentStep('notes')}
          className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-2xs"
        >
          <span>Continue to Clinical Notes</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Quick Symptom Chips Picker */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
        <label className="text-[11px] font-bold text-on-surface uppercase tracking-wider block mb-2">
          Frequent Metabolic &amp; Outpatient Symptom Shortcuts (Click to Add)
        </label>
        <div className="flex flex-wrap gap-2">
          {symptomPresets.map((preset) => {
            const isAdded = complaints.some((c) => c.complaint === preset);
            return (
              <button
                key={preset}
                type="button"
                onClick={() => !isAdded && handleQuickAdd(preset)}
                disabled={isAdded}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition-colors border ${
                  isAdded
                    ? 'bg-primary/10 text-primary border-primary/30 opacity-60'
                    : 'bg-surface-container-low text-on-surface border-surface-container-high/60 hover:bg-surface-container hover:border-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {isAdded ? 'check' : 'add'}
                </span>
                <span>{preset}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Custom Complaint Input Form */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col justify-between">
          <form onSubmit={handleAdd} className="space-y-3.5">
            <h3 className="text-[13px] font-bold text-on-surface uppercase tracking-wider mb-2">
              Add Specific Presenting Complaint
            </h3>

            <div>
              <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                Symptom Description
              </label>
              <input
                type="text"
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Occipital headache radiating to neck"
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  className="w-full h-9 px-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-[12px] outline-none focus:ring-1 focus:ring-primary"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 3 Weeks"
                />
              </div>

              <div>
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  Severity
                </label>
                <select
                  className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-[12px] outline-none focus:ring-1 focus:ring-primary"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                  Onset
                </label>
                <select
                  className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-[12px] outline-none focus:ring-1 focus:ring-primary"
                  value={onset}
                  onChange={(e) => setOnset(e.target.value as any)}
                >
                  <option value="Gradual">Gradual</option>
                  <option value="Sudden">Sudden</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                Clinical Context &amp; Aggravating Factors (Optional)
              </label>
              <input
                type="text"
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[12px] outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. More pronounced after evening meals, no fever"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Symptom to Chart</span>
            </button>
          </form>
        </div>

        {/* Current Active Complaints List */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[13px] font-bold text-on-surface uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Active Intake Complaints ({complaints.length})</span>
              <span className="text-[11px] text-on-surface-variant font-normal">
                Synchronized with A4 Letterhead
              </span>
            </h3>

            {complaints.length === 0 ? (
              <p className="text-[12px] text-on-surface-variant italic py-4 text-center">
                No presenting complaints added yet. Click shortcuts above to add.
              </p>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {complaints.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high/50 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[13px] text-on-surface">{c.complaint}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-primary font-bold uppercase">
                          {c.duration}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            c.severity === 'Severe'
                              ? 'bg-error-container text-error'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {c.severity}
                        </span>
                      </div>
                      {c.notes && (
                        <p className="text-[11px] text-on-surface-variant mt-1">{c.notes}</p>
                      )}
                    </div>

                    <button
                      onClick={() => removeComplaint(c.id)}
                      className="text-on-surface-variant hover:text-error transition-colors p-1"
                      title="Remove complaint"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-surface-container-high/40 text-[11px] text-on-surface-variant">
            Patient verbal reports recorded by Dr. Dhananjay Chavan
          </div>
        </div>
      </div>

      {/* History of Present Illness (HPI) Narrative */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
        <label className="text-[12px] font-bold text-on-surface uppercase tracking-wider block mb-1.5">
          History of Present Illness (HPI) Narrative Documentation
        </label>
        <textarea
          rows={4}
          className="w-full p-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] text-on-surface outline-none focus:ring-1 focus:ring-primary leading-relaxed"
          value={clinicalNotes.hpi}
          onChange={(e) => updateClinicalNotes({ hpi: e.target.value })}
          placeholder="Detailed narrative describing onset, progression, aggravating/relieving factors, prior therapies..."
        />
      </div>
    </div>
  );
}
