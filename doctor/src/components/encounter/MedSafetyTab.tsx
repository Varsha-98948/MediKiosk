'use client';

import React from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';

export function MedSafetyTab() {
  const {
    prescriptions,
    homeMeds,
    safetyAlerts,
    acknowledgeAlert,
    setCurrentStep,
  } = useClinicalEncounter();

  const newCount = prescriptions.filter((p) => p.diffStatus === 'NEW').length;
  const continuedCount = prescriptions.filter((p) => p.diffStatus === 'CONTINUED').length;
  const changedCount = prescriptions.filter((p) => p.diffStatus === 'DOSE_CHANGED').length;
  const discontinuedCount = prescriptions.filter((p) => p.diffStatus === 'DISCONTINUED').length;

  return (
    <div className="flex flex-col w-full gap-5 select-none">
      {/* Header */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-[13px] mb-1">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Safety Station 7</span>
          </div>
          <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
            Medication Reconciliation &amp; Drug Safety Engine
          </h2>
          <p className="text-[12px] text-on-surface-variant">
            Automated drug-drug interaction guardrails, allergy cross-matching, and chronic therapy diff
          </p>
        </div>

        <button
          onClick={() => setCurrentStep('orders')}
          className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-2xs"
        >
          <span>Proceed to Lab Orders</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Safety Alerts Cards */}
      <div className="space-y-3">
        <h3 className="text-[12px] font-bold text-on-surface uppercase tracking-wider">
          Active Safety &amp; Allergy Guardrails ({safetyAlerts.length})
        </h3>

        {safetyAlerts.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2.5 text-[13px]">
            <span className="material-symbols-outlined text-emerald-700 text-[20px]">check_circle</span>
            <span className="font-semibold">All clear: No contraindications, severe allergy conflicts, or lethal interactions detected.</span>
          </div>
        ) : (
          safetyAlerts.map((alert) => {
            const isCritical = alert.severity === 'critical';
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCritical
                    ? 'bg-error-container/40 border-error/30 text-error'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[24px] shrink-0 mt-0.5">
                    {isCritical ? 'report' : 'warning'}
                  </span>
                  <div>
                    <h4 className="font-bold text-[13px]">{alert.title}</h4>
                    <p className="text-[12px] mt-0.5 leading-relaxed opacity-90">
                      {alert.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {alert.acknowledged ? (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-black/10 text-on-surface uppercase">
                      Acknowledged ✓
                    </span>
                  ) : (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className={`h-8 px-3.5 rounded-lg text-[11px] font-bold uppercase transition-colors shadow-2xs ${
                        isCritical
                          ? 'bg-error text-white hover:bg-red-700'
                          : 'bg-amber-600 text-white hover:bg-amber-700'
                      }`}
                    >
                      Acknowledge Alert
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Therapy Reconciliation Diff Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900">
          <span className="text-[10px] uppercase font-bold tracking-wider block text-indigo-700">
            Newly Initiated
          </span>
          <span className="text-[20px] font-bold font-mono">{newCount} Meds</span>
        </div>

        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
          <span className="text-[10px] uppercase font-bold tracking-wider block text-emerald-700">
            Continued Stable
          </span>
          <span className="text-[20px] font-bold font-mono">{continuedCount} Meds</span>
        </div>

        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
          <span className="text-[10px] uppercase font-bold tracking-wider block text-amber-700">
            Dose Titrated / Changed
          </span>
          <span className="text-[20px] font-bold font-mono">{changedCount} Meds</span>
        </div>

        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
          <span className="text-[10px] uppercase font-bold tracking-wider block text-rose-700">
            Discontinued / Stopped
          </span>
          <span className="text-[20px] font-bold font-mono">{discontinuedCount} Meds</span>
        </div>
      </div>

      {/* Side-by-Side Reconciliation Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high/60 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-surface-container-high/60 flex items-center justify-between">
          <h3 className="font-headline-sm text-[14px] font-bold text-on-surface">
            Longitudinal Medication Reconciliation Diff
          </h3>
          <span className="text-[11px] text-on-surface-variant">
            Chronic Home Regimen vs Today&apos;s Updated Orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px] border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-bold uppercase text-[10px] border-b border-surface-container-high/60 tracking-wider">
                <th className="py-2.5 px-4">Medicine Name</th>
                <th className="py-2.5 px-4">Home / Prior Regimen</th>
                <th className="py-2.5 px-4">Current Consultation Dose</th>
                <th className="py-2.5 px-4">Reconciliation Status</th>
                <th className="py-2.5 px-4">Clinical Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/40">
              {prescriptions.map((rx) => {
                const prior = homeMeds.find((h) => h.drugName.includes(rx.drugName.split(' ')[1] || ''));
                return (
                  <tr key={rx.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-on-surface">
                      {rx.drugName}
                      <span className="block font-normal text-[10px] text-on-surface-variant">
                        {rx.genericName}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-on-surface-variant">
                      {prior ? `${prior.strength} (${prior.dosageSchedule})` : '— Not on home regimen'}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-primary">
                      {rx.strength} ({rx.dosageSchedule}) {rx.timing}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          rx.diffStatus === 'NEW'
                            ? 'bg-indigo-100 text-indigo-800'
                            : rx.diffStatus === 'DOSE_CHANGED'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {rx.diffStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant text-[11px]">
                      {rx.instructions}
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
