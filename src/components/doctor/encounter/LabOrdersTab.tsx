'use client';

import React, { useState } from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import { availableLabTests } from '@/data/doctor/diagnosticPanels';
import { LabOrder } from '@/types/emr';

export function LabOrdersTab() {
  const { labOrders, addLabOrder, removeLabOrder, setCurrentStep } = useClinicalEncounter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCatalog = availableLabTests.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const isTestOrdered = (testName: string) => labOrders.some((o) => o.testName === testName);

  const handleToggleTest = (test: LabOrder) => {
    if (isTestOrdered(test.testName)) {
      const existing = labOrders.find((o) => o.testName === test.testName);
      if (existing) removeLabOrder(existing.id);
    } else {
      addLabOrder(test);
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 select-none">
      {/* Header */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-[13px] mb-1">
            <span className="material-symbols-outlined text-[18px]">biotech</span>
            <span>Diagnostics Station 8</span>
          </div>
          <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
            Clinical Orders: Laboratory &amp; Diagnostic Investigations
          </h2>
          <p className="text-[12px] text-on-surface-variant">
            Order pathology panels, biochemistry, cardiovascular diagnostics, and imaging
          </p>
        </div>

        <button
          onClick={() => setCurrentStep('directives')}
          className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-2xs"
        >
          <span>Continue to Lifestyle Directives</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Diagnostics Category Filters */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high/60 shadow-xs flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'biochemistry', 'hematology', 'cardiology'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat === 'all' ? 'All Panels' : cat}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-on-surface-variant font-medium">
          {labOrders.length} Diagnostics Selected for this Prescription
        </span>
      </div>

      {/* Lab Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCatalog.map((test) => {
          const ordered = isTestOrdered(test.testName);
          return (
            <div
              key={test.id}
              onClick={() => handleToggleTest(test)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                ordered
                  ? 'bg-primary/5 border-primary shadow-xs'
                  : 'bg-surface-container-lowest border-surface-container-high/60 hover:border-primary/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center text-white text-[14px] ${
                    ordered ? 'bg-primary' : 'border border-surface-container-high bg-white'
                  }`}
                >
                  {ordered && <span className="material-symbols-outlined text-[14px]">check</span>}
                </div>
                <div>
                  <h4 className="font-bold text-[13px] text-on-surface">{test.testName}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-on-surface-variant">
                    <span className="px-1.5 py-0.5 rounded bg-surface-container font-medium">
                      {test.category}
                    </span>
                    {test.fastingRequired && (
                      <span className="text-amber-700 font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        10-12 Hr Fasting
                      </span>
                    )}
                  </div>
                  {test.clinicalIndication && (
                    <p className="text-[11px] text-on-surface-variant/80 mt-1">
                      Indication: {test.clinicalIndication}
                    </p>
                  )}
                </div>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-bold uppercase shrink-0">
                {test.priority}
              </span>
            </div>
          );
        })}
      </div>

      {/* Ordered Investigations Review Card */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs">
        <h3 className="text-[13px] font-bold text-on-surface uppercase tracking-wider mb-3">
          Ordered Diagnostic Investigations for A4 Letterhead ({labOrders.length})
        </h3>

        {labOrders.length === 0 ? (
          <p className="text-[12px] text-on-surface-variant italic py-3 text-center">
            No lab orders selected. Click any panel card above to add.
          </p>
        ) : (
          <div className="space-y-2">
            {labOrders.map((order) => (
              <div
                key={order.id}
                className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high/50 flex items-center justify-between text-[12px]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">lab_profile</span>
                  <span className="font-bold text-on-surface">{order.testName}</span>
                  <span className="text-[11px] text-on-surface-variant">({order.category})</span>
                  {order.fastingRequired && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                      Fasting Required
                    </span>
                  )}
                </div>

                <button
                  onClick={() => removeLabOrder(order.id)}
                  className="text-on-surface-variant hover:text-error transition-colors p-1"
                  title="Remove order"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
