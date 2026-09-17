'use client';

import React from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';

const intervals = ['1 Week', '2 Weeks', '1 Month', '3 Months', '6 Months'];
const availableSlots = [
  '09:30 AM - Morning Slot 1',
  '10:30 AM - Morning Slot 3',
  '11:45 AM - Morning Slot 6',
  '04:00 PM - Afternoon Slot 1',
  '05:15 PM - Evening Slot 3',
];

export function FollowUpTab() {
  const {
    followUp,
    updateFollowUp,
    activePatient,
    setIsA4ModalOpen,
  } = useClinicalEncounter();

  const handleIntervalClick = (inter: string) => {
    const today = new Date();
    let daysToAdd = 14;
    if (inter === '1 Week') daysToAdd = 7;
    else if (inter === '2 Weeks') daysToAdd = 14;
    else if (inter === '1 Month') daysToAdd = 30;
    else if (inter === '3 Months') daysToAdd = 90;
    else if (inter === '6 Months') daysToAdd = 180;

    const targetDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    const dateStr = targetDate.toISOString().split('T')[0];

    updateFollowUp({
      interval: inter,
      date: dateStr,
    });
  };

  return (
    <div className="flex flex-col w-full gap-5 select-none">
      {/* Header */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-[13px] mb-1">
            <span className="material-symbols-outlined text-[18px]">event</span>
            <span>Scheduling Station 10</span>
          </div>
          <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
            Consultation Follow-up &amp; Review Slot Scheduling
          </h2>
          <p className="text-[12px] text-on-surface-variant">
            Reserve review slot, establish clinical re-evaluation goals, and trigger automated patient SMS alerts
          </p>
        </div>

        <button
          onClick={() => setIsA4ModalOpen(true)}
          className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-2xs"
        >
          <span className="material-symbols-outlined text-[16px]">print</span>
          <span>Finalize &amp; Open A4 Printable Rx</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Scheduling Inputs */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs space-y-4">
          <div>
            <label className="text-[11px] font-bold text-on-surface uppercase tracking-wider block mb-2">
              Follow-up Review Interval Shortcuts
            </label>
            <div className="flex flex-wrap gap-2">
              {intervals.map((inter) => (
                <button
                  key={inter}
                  type="button"
                  onClick={() => handleIntervalClick(inter)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                    followUp.interval === inter
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {inter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                Scheduled Review Date
              </label>
              <input
                type="date"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] font-mono outline-none focus:ring-1 focus:ring-primary"
                value={followUp.date}
                onChange={(e) => updateFollowUp({ date: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                Review Appointment Slot
              </label>
              <select
                className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-[12px] outline-none focus:ring-1 focus:ring-primary"
                value={followUp.slot}
                onChange={(e) => updateFollowUp({ slot: e.target.value })}
              >
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
              Clinical Objective for Next Review
            </label>
            <textarea
              rows={3}
              className="w-full p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] text-on-surface outline-none focus:ring-1 focus:ring-primary leading-relaxed"
              value={followUp.clinicalObjective}
              onChange={(e) => updateFollowUp({ clinicalObjective: e.target.value })}
              placeholder="e.g. Review fasting blood sugars, HbA1c control, and check drug tolerance..."
            />
          </div>

          {/* Automated Notification Checkboxes */}
          <div className="pt-3 border-t border-surface-container-high/40 space-y-2">
            <label className="flex items-center gap-2.5 text-[12px] cursor-pointer">
              <input
                type="checkbox"
                checked={followUp.sendSms}
                onChange={(e) => updateFollowUp({ sendSms: e.target.checked })}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span className="font-semibold text-on-surface">
                Send Automated SMS Reminder to Patient ({activePatient?.phone})
              </span>
            </label>

            <label className="flex items-center gap-2.5 text-[12px] cursor-pointer">
              <input
                type="checkbox"
                checked={followUp.sendWhatsApp}
                onChange={(e) => updateFollowUp({ sendWhatsApp: e.target.checked })}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span className="font-semibold text-on-surface">
                Send WhatsApp Confirmation &amp; Digital Rx Link
              </span>
            </label>
          </div>
        </div>

        {/* SMS / WhatsApp Notification Live Preview Card */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary font-semibold text-[13px] mb-3">
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Patient Notification Message Preview</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-[12px] space-y-2 leading-relaxed shadow-inner">
              <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-700">
                <span>SMS GATEWAY: APOLLO-HEALTH</span>
                <span>TO: {activePatient?.phone}</span>
              </div>
              <p>
                Dear {activePatient?.name}, your consultation with Dr. Dhananjay Chavan MD at Apollo Clinic is complete.
              </p>
              <p className="text-emerald-400">
                Next Follow-up Date: {followUp.date} ({followUp.interval}) at {followUp.slot.split('-')[0]}.
              </p>
              <p className="text-slate-300 text-[11px]">
                Clinical Goal: {followUp.clinicalObjective}
              </p>
              <p className="text-primary-fixed text-[11px]">
                View your digital prescription: https://rx.apolloclinic.com/p/90284
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-center justify-between">
            <span className="text-[11px] text-on-surface-variant">
              Automated delivery queued upon consultation close
            </span>
            <button
              onClick={() => setIsA4ModalOpen(true)}
              className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Review A4 Letterhead Rx</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
