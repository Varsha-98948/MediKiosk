'use client';

import React, { useState } from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import { icd10Database, ICD10Entry } from '@/data/doctor/icd10Database';

export function DiagnosesTab() {
  const { diagnoses, addDiagnosis, removeDiagnosis, setCurrentStep } = useClinicalEncounter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'Primary' | 'Secondary'>('Primary');

  const filteredIcd10 = searchTerm.trim()
    ? icd10Database.filter(
        (item) =>
          item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectIcd = (item: ICD10Entry) => {
    addDiagnosis({
      code: item.code,
      description: item.description,
      type: selectedType,
      status: item.isChronic ? 'Chronic' : 'Active',
      onsetDate: 'Today',
    });
    setSearchTerm('');
  };

  return (
    <div className="flex flex-col w-full gap-5 select-none">
      {/* Header */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-[13px] mb-1">
            <span className="material-symbols-outlined text-[18px]">diagnosis</span>
            <span>Coding Station 5</span>
          </div>
          <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
            Structured Diagnoses &amp; ICD-10 Problem List
          </h2>
          <p className="text-[12px] text-on-surface-variant">
            Standardized WHO ICD-10 diagnostic coding, chronic disease tracking, and problem stratification
          </p>
        </div>

        <button
          onClick={() => setCurrentStep('rx')}
          className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-2xs"
        >
          <span>Proceed to Rx Builder Engine</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* ICD-10 Search & Type Selector */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
        <label className="text-[12px] font-bold text-on-surface uppercase tracking-wider block mb-2">
          Search ICD-10 Catalog (Code or Condition)
        </label>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              type="text"
              className="w-full h-10 pl-9 pr-8 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g. Type 2 Diabetes, E11.9, Hypertension, Neuropathy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-surface-container-high shrink-0">
            <span className="text-[11px] font-bold uppercase text-on-surface-variant px-2">Role:</span>
            <button
              type="button"
              onClick={() => setSelectedType('Primary')}
              className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase transition-colors ${
                selectedType === 'Primary'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Primary
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('Secondary')}
              className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase transition-colors ${
                selectedType === 'Secondary'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Secondary
            </button>
          </div>
        </div>

        {/* Autocomplete Results Box */}
        {searchTerm.trim().length > 0 && (
          <div className="mt-3 p-2 rounded-lg bg-surface-container-low border border-surface-container-high max-h-60 overflow-y-auto space-y-1">
            {filteredIcd10.length === 0 ? (
              <p className="p-3 text-[12px] text-on-surface-variant text-center">
                No matching ICD-10 code found for &quot;{searchTerm}&quot;.
              </p>
            ) : (
              filteredIcd10.map((item) => {
                const isSelected = diagnoses.some((d) => d.code === item.code);
                return (
                  <button
                    key={item.code}
                    onClick={() => !isSelected && handleSelectIcd(item)}
                    disabled={isSelected}
                    className={`w-full flex items-center justify-between p-2 rounded-md text-left text-[12px] transition-colors ${
                      isSelected
                        ? 'opacity-50 cursor-not-allowed bg-surface-container'
                        : 'hover:bg-surface-container-lowest'
                    }`}
                  >
                    <div>
                      <span className="font-mono font-bold text-primary mr-2">[{item.code}]</span>
                      <span className="font-semibold text-on-surface">{item.description}</span>
                      <span className="text-[10px] text-on-surface-variant block mt-0.5">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-bold uppercase">
                      {isSelected ? 'Added' : `+ Add as ${selectedType}`}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Active Diagnoses & Problem List */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-bold text-on-surface uppercase tracking-wider">
            Active Clinical Problem List ({diagnoses.length})
          </h3>
          <span className="text-[11px] text-on-surface-variant">
            These will be printed under Provisional/Confirmed Diagnosis on A4 Rx
          </span>
        </div>

        <div className="space-y-2">
          {diagnoses.length === 0 ? (
            <p className="text-[12px] text-on-surface-variant py-4 text-center italic">
              No diagnoses recorded for this encounter yet.
            </p>
          ) : (
            diagnoses.map((diag) => (
              <div
                key={diag.code}
                className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high/60 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[13px] font-bold px-2 py-1 rounded bg-surface-container-lowest text-primary border border-surface-container-high">
                    {diag.code}
                  </span>
                  <div>
                    <h4 className="font-bold text-[13px] text-on-surface">{diag.description}</h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-on-surface-variant">
                      <span>Onset: {diag.onsetDate}</span>
                      <span>•</span>
                      <span
                        className={`font-semibold uppercase text-[10px] ${
                          diag.status === 'Chronic' ? 'text-primary' : 'text-amber-700'
                        }`}
                      >
                        {diag.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      diag.type === 'Primary'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {diag.type}
                  </span>
                  <button
                    onClick={() => removeDiagnosis(diag.code)}
                    className="p-1 text-on-surface-variant hover:text-error transition-colors"
                    title="Remove diagnosis"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
