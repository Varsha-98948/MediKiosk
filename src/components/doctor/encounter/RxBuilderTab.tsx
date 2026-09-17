'use client';

import React, { useState, useRef } from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import { drugCatalog, DrugCatalogItem } from '@/data/doctor/drugCatalog';
import {
  SupportedLanguage,
  getLocalizedDrugDescription,
  getLocalizedTiming,
  getLocalizedInstruction,
  prescriptionSectionLabels,
} from '@/data/doctor/translations';

const dosePresets = ['1-0-0', '0-0-1', '1-0-1', '1-1-1', '½-0-0'];
const timingPresets = ['After Food', 'Before Food', 'With Food', 'At Bedtime'];
const durationPresets = ['30 Days', '14 Days', '5 Days', '7 Days', '3 Months'];

export function RxBuilderTab() {
  const {
    prescriptions,
    addPrescription,
    removePrescription,
    safetyAlerts,
    setCurrentStep,
    setIsA4ModalOpen,
    rxLanguage,
    setRxLanguage,
    prescriptionDescriptions,
    updatePrescriptionDescription,
    resetPrescriptionDescription,
  } = useClinicalEncounter();

  const [searchDrug, setSearchDrug] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugCatalogItem | null>(null);
  const [schedule, setSchedule] = useState('1-0-1');
  const [timing, setTiming] = useState<'Before Food' | 'After Food' | 'With Food' | 'At Bedtime'>('After Food');
  const [duration, setDuration] = useState('30 Days');
  const [instructions, setInstructions] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const drugInputRef = useRef<HTMLInputElement>(null);

  const filteredCatalog = searchDrug.trim()
    ? drugCatalog.filter(
        (d) =>
          d.name.toLowerCase().includes(searchDrug.toLowerCase()) ||
          d.genericName.toLowerCase().includes(searchDrug.toLowerCase()) ||
          d.drugClass.toLowerCase().includes(searchDrug.toLowerCase())
      )
    : [];

  const handleSelectDrug = (drug: DrugCatalogItem) => {
    setSelectedDrug(drug);
    setSearchDrug(drug.name);
    setSchedule(drug.defaultSchedule);
    setTiming(drug.defaultTiming);
    setDuration(drug.defaultDuration);
    setInstructions(drug.instructions);
    setIsDropdownOpen(false);
  };

  const handleCommitRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchDrug.trim()) return;

    addPrescription({
      drugName: selectedDrug ? selectedDrug.name : searchDrug,
      genericName: selectedDrug ? selectedDrug.genericName : 'Generic Outpatient Formulation',
      form: selectedDrug ? selectedDrug.form : 'Tab',
      strength: selectedDrug ? selectedDrug.strength : 'Standard',
      dosageSchedule: schedule || '1-0-1',
      timing,
      frequency: schedule === '1-0-1' ? 'Twice Daily' : schedule === '1-1-1' ? 'Thrice Daily' : 'Daily',
      duration: duration || '30 Days',
      instructions: instructions || 'Take with water as directed.',
      diffStatus: 'NEW',
    });

    // Reset form
    setSearchDrug('');
    setSelectedDrug(null);
    setInstructions('');
    drugInputRef.current?.focus();
  };

  return (
    <div className="flex flex-col w-full gap-5 select-none">
      {/* Header */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-[13px] mb-1">
            <span className="material-symbols-outlined text-[18px]">prescriptions</span>
            <span>Rx Station 6</span>
          </div>
          <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
            Fast Keyboard-First Rx Prescription Builder
          </h2>
          <p className="text-[12px] text-on-surface-variant">
            Rapid single-row medication authoring with dosage shortcuts and real-time drug reconciliation
          </p>
        </div>

        <button
          onClick={() => setCurrentStep('safety')}
          className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-2xs"
        >
          <span>Review Med Safety Diff ({safetyAlerts.length})</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Real-time Safety Alert Banner */}
      {safetyAlerts.length > 0 && (
        <div className="p-3.5 rounded-xl bg-error-container/50 border border-error/30 text-error flex items-start gap-3">
          <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5 animate-bounce">
            warning
          </span>
          <div className="flex-1">
            <h4 className="font-bold text-[13px]">
              {safetyAlerts[0].title}
            </h4>
            <p className="text-[12px] text-error/90 mt-0.5">
              {safetyAlerts[0].description}
            </p>
          </div>
          <button
            onClick={() => setCurrentStep('safety')}
            className="h-7 px-3 rounded bg-error text-white font-bold text-[11px] uppercase tracking-wider shrink-0"
          >
            Review in Safety Engine
          </button>
        </div>
      )}

      {/* Rapid Inline Entry Row */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
        <form onSubmit={handleCommitRow} className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-on-surface uppercase tracking-wider">
              Rapid Medication Entry Row
            </span>
            <span className="text-[11px] text-on-surface-variant font-mono">
              Press [Enter] to commit prescription row
            </span>
          </div>

          {/* Inline Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {/* Drug Search */}
            <div className="md:col-span-5 relative">
              <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                Medicine Name &amp; Strength *
              </label>
              <input
                ref={drugInputRef}
                required
                type="text"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] font-medium text-on-surface outline-none focus:ring-1 focus:ring-primary"
                placeholder="Type drug name (e.g. Metformin, Augmentin, Telma)..."
                value={searchDrug}
                onChange={(e) => {
                  setSearchDrug(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />

              {/* Autocomplete Dropdown */}
              {isDropdownOpen && filteredCatalog.length > 0 && (
                <div className="absolute top-16 left-0 w-full bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high p-1.5 z-40 max-h-56 overflow-y-auto space-y-1">
                  {filteredCatalog.map((drug) => (
                    <button
                      key={drug.id}
                      type="button"
                      onClick={() => handleSelectDrug(drug)}
                      className="w-full text-left p-2 rounded-lg hover:bg-surface-container-low text-[12px] flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-on-surface">{drug.name}</div>
                        <div className="text-[10px] text-on-surface-variant">{drug.genericName}</div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
                        {drug.strength}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dose Shortcut */}
            <div className="md:col-span-2">
              <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                Dose Shortcut
              </label>
              <input
                type="text"
                className="w-full h-10 px-2.5 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-[14px] font-bold text-primary text-center outline-none focus:ring-1 focus:ring-primary"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="1-0-1"
              />
            </div>

            {/* Timing */}
            <div className="md:col-span-2">
              <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                Timing
              </label>
              <select
                className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-[12px] outline-none focus:ring-1 focus:ring-primary"
                value={timing}
                onChange={(e) => setTiming(e.target.value as any)}
              >
                {timingPresets.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div className="md:col-span-2">
              <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                Duration
              </label>
              <input
                type="text"
                className="w-full h-10 px-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-[12px] outline-none focus:ring-1 focus:ring-primary"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="30 Days"
              />
            </div>

            {/* Commit Button */}
            <div className="md:col-span-1">
              <button
                type="submit"
                className="w-full h-10 rounded-lg bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center transition-colors shadow-2xs font-bold text-[13px]"
                title="Commit row (Enter)"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>

          {/* Quick Dose Tokens Helper */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Dose Presets:</span>
            {dosePresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setSchedule(preset)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-colors ${
                  schedule === preset
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {preset}
              </button>
            ))}

            <span className="text-[10px] font-bold text-on-surface-variant uppercase ml-3">
              Duration:
            </span>
            {durationPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDuration(preset)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  duration === preset
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Multilingual Prescription Description Card */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-container-high/60">
          <div>
            <div className="flex items-center gap-1.5 text-primary font-bold text-[13px]">
              <span className="material-symbols-outlined text-[18px]">translate</span>
              <span>{prescriptionSectionLabels[rxLanguage].prescriptionDescriptionHeading}</span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Local language description printed on the patient&apos;s prescription slip for clear understanding &amp; adherence.
            </p>
          </div>

          {/* Language Switcher Tabs: English, Hindi, Marathi */}
          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg self-start sm:self-auto border border-surface-container-high/80">
            <button
              type="button"
              onClick={() => setRxLanguage('en')}
              className={`px-3 py-1 rounded text-[11px] font-bold transition-all ${
                rxLanguage === 'en'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setRxLanguage('hi')}
              className={`px-3 py-1 rounded text-[11px] font-bold transition-all ${
                rxLanguage === 'hi'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              हिंदी (Hindi)
            </button>
            <button
              type="button"
              onClick={() => setRxLanguage('mr')}
              className={`px-3 py-1 rounded text-[11px] font-bold transition-all ${
                rxLanguage === 'mr'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              मराठी (Marathi)
            </button>
          </div>
        </div>

        {/* Editable Description Box */}
        <div>
          <label className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1.5 flex items-center justify-between">
            <span>
              Description of Prescription ({rxLanguage === 'en' ? 'English' : rxLanguage === 'hi' ? 'हिंदी' : 'मराठी'})
            </span>
            <span className="text-[10px] text-primary font-medium">
              Live synced with PDF &amp; Print Letterhead
            </span>
          </label>
          <textarea
            rows={3}
            value={prescriptionDescriptions[rxLanguage]}
            onChange={(e) => updatePrescriptionDescription(rxLanguage, e.target.value)}
            className="w-full rounded-lg border border-surface-container-high bg-surface-container-low p-3 text-[12px] text-on-surface leading-relaxed focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans"
            placeholder="Type or customize the prescription description for patient..."
          />
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px] flex-wrap gap-2">
          <button
            type="button"
            onClick={() => resetPrescriptionDescription(rxLanguage)}
            className="text-on-surface-variant hover:text-primary flex items-center gap-1 font-medium transition-colors"
            title="Reset to recommended clinical description template"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            <span>Reset to Standard Clinical Description</span>
          </button>

          <button
            type="button"
            onClick={() => setIsA4ModalOpen(true)}
            className="text-primary hover:text-primary-container font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
            <span>Preview in A4 Prescription PDF ({rxLanguage.toUpperCase()})</span>
          </button>
        </div>
      </div>

      {/* Active Prescription Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high/60 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-surface-container-high/60 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-serif font-black text-primary leading-none">℞</span>
            <h3 className="font-headline-sm text-[14px] font-bold text-on-surface">
              Active Prescriptions for Ramesh Chandra ({prescriptions.length})
            </h3>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {rxLanguage === 'en' ? 'ENG' : rxLanguage === 'hi' ? 'हिंदी' : 'मराठी'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-on-surface-variant font-medium">
              Synchronized directly with Strict A4 Printable Sheet
            </span>
            <button
              onClick={() => setIsA4ModalOpen(true)}
              className="h-7 px-2.5 rounded bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[11px] flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">print</span>
              <span>Preview Rx</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px] border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-bold uppercase text-[10px] border-b border-surface-container-high/60 tracking-wider">
                <th className="py-2.5 px-4 w-10 text-center">#</th>
                <th className="py-2.5 px-4">{prescriptionSectionLabels[rxLanguage].medicine}</th>
                <th className="py-2.5 px-4 text-center">{prescriptionSectionLabels[rxLanguage].dosage}</th>
                <th className="py-2.5 px-4 text-center">{prescriptionSectionLabels[rxLanguage].timing}</th>
                <th className="py-2.5 px-4 text-center">{prescriptionSectionLabels[rxLanguage].duration}</th>
                <th className="py-2.5 px-4">{prescriptionSectionLabels[rxLanguage].instructions}</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/40">
              {prescriptions.map((rx, idx) => {
                const isNew = rx.diffStatus === 'NEW';
                const isDoseChanged = rx.diffStatus === 'DOSE_CHANGED';
                const localizedDesc = getLocalizedDrugDescription(rx.drugName, rxLanguage);
                const localizedTiming = getLocalizedTiming(rx.timing, rxLanguage);
                const localizedInstruction = getLocalizedInstruction(
                  rx.drugName,
                  rx.instructions,
                  rxLanguage
                );

                return (
                  <tr key={rx.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-on-surface-variant">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[13px] text-on-surface">{rx.drugName}</div>
                      <div className="text-[11px] text-on-surface-variant">{rx.genericName}</div>
                      <div className="text-[10px] text-teal-700 font-medium mt-0.5">
                        {localizedDesc.indication}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[13px] text-primary">
                      {rx.dosageSchedule}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-on-surface">
                      <div>{localizedTiming}</div>
                      {rxLanguage !== 'en' && (
                        <div className="text-[10px] text-on-surface-variant font-normal">{rx.timing}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-on-surface">
                      {rx.duration}
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant text-[11px] max-w-xs">
                      <div>{localizedInstruction}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isNew
                            ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                            : isDoseChanged
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {rx.diffStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => removePrescription(rx.id)}
                        className="p-1 text-on-surface-variant hover:text-error transition-colors"
                        title="Delete prescription"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
