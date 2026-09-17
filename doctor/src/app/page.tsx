'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import { RegisterPatientModal } from '@/components/queue/RegisterPatientModal';

export default function OPDQueueDeskPage() {
  const router = useRouter();
  const { queue, selectPatient, callNextPatient } = useClinicalEncounter();

  const [activeTab, setActiveTab] = useState<'all' | 'priority' | 'routine' | 'completed'>('all');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Keyboard shortcut: Spacebar triggers Call Next Patient (when not focused in an input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === 'Space' &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        handleCallNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [queue]);

  const handleCallNext = () => {
    const waiting = queue.find((q) => q.status === 'waiting');
    if (waiting) {
      selectPatient(waiting.id);
      router.push(`/encounter/${waiting.id}`);
    } else {
      alert('All patients in the current queue have been attended to!');
    }
  };

  const handleStartConsultation = (patientId: string) => {
    selectPatient(patientId);
    router.push(`/encounter/${patientId}`);
  };

  const waitingPatients = queue.filter((q) => q.status === 'waiting');
  const completedPatients = queue.filter((q) => q.status === 'completed');
  const inConsultationPatients = queue.filter((q) => q.status === 'in_progress');

  const filteredQueue = queue.filter((item) => {
    if (activeTab === 'priority') return item.triage === 'Urgent' || item.triage === 'Priority';
    if (activeTab === 'routine') return item.triage === 'Routine';
    if (activeTab === 'completed') return item.status === 'completed';
    return true; // 'all'
  });

  return (
    <div className="flex flex-col w-full gap-5 pb-16 select-none">
      {/* Top Session & Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-xl shadow-xs border border-surface-container-high/60">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h1 className="font-headline-lg text-[22px] font-bold text-on-surface">
              Good Morning, Dr. Dhananjay Chavan
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-badge text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Live Active OPD
            </span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-[12px] flex-wrap">
            <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
            <span>Session: 09:00 – 14:00 IST</span>
            <span>•</span>
            <span className="material-symbols-outlined text-[16px] text-tertiary">meeting_room</span>
            <span>Room 3</span>
            <span>•</span>
            <span className="font-medium text-on-surface">Diabetology &amp; Metabolic Care</span>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            className="h-9 px-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-headline-sm text-[12px] font-semibold flex items-center gap-1.5 transition-colors border border-surface-container-high/40"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">coffee</span>
            <span>Break / Pause</span>
          </button>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="h-9 px-3.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-headline-sm text-[12px] font-semibold flex items-center gap-1.5 transition-colors border border-surface-container-highest"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">person_add</span>
            <span>+ Register Patient</span>
          </button>
          <button
            onClick={handleCallNext}
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-[12px] font-semibold flex items-center gap-2 transition-all shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">campaign</span>
            <span>Call Next Patient</span>
            <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest/20 font-badge text-[10px] tracking-wider uppercase font-mono">
              Space
            </span>
          </button>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-surface-container-high/60 flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[11px] text-secondary uppercase font-bold tracking-wider">
              Total Registered
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-lg text-[24px] font-bold text-on-surface">
                {queue.length + 14}
              </span>
              <span className="font-body-sm text-[11px] text-primary flex items-center font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>+4 booked
              </span>
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant">Slots 100% capacity</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">group</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-surface-container-high/60 flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[11px] text-secondary uppercase font-bold tracking-wider">
              Waiting in Lobby
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-lg text-[24px] font-bold text-on-surface">
                {waitingPatients.length}
              </span>
              <span className="font-body-sm text-[11px] text-error flex items-center font-semibold">
                Avg wait 18 mins
              </span>
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant">
              {waitingPatients.filter((q) => q.triage !== 'Routine').length} Priority / Urgent
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-surface-container-high/60 flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[11px] text-secondary uppercase font-bold tracking-wider">
              In Consultation
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-lg text-[24px] font-bold text-on-surface">
                {inConsultationPatients.length > 0 ? inConsultationPatients.length : '1'}
              </span>
              <span className="font-body-sm text-[11px] text-primary font-semibold">
                Room 3 Active
              </span>
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant">12 mins elapsed</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">stethoscope</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-surface-container-high/60 flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[11px] text-secondary uppercase font-bold tracking-wider">
              Completed OPD
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-lg text-[24px] font-bold text-on-surface">
                {completedPatients.length + 14}
              </span>
              <span className="font-body-sm text-[11px] text-primary flex items-center font-semibold">
                87% on-time
              </span>
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant">Avg 11 min / patient</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">task_alt</span>
          </div>
        </div>
      </div>

      {/* Main Queue Table Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-high/60 overflow-hidden">
        {/* Table Filter Tabs */}
        <div className="px-5 py-3 border-b border-surface-container-high/60 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              All Patients ({queue.length})
            </button>
            <button
              onClick={() => setActiveTab('priority')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeTab === 'priority'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              Priority / Urgent ({queue.filter((q) => q.triage !== 'Routine').length})
            </button>
            <button
              onClick={() => setActiveTab('routine')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeTab === 'routine'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              Routine Checkups ({queue.filter((q) => q.triage === 'Routine').length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeTab === 'completed'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              Completed ({completedPatients.length})
            </button>
          </div>

          <span className="text-[11px] text-on-surface-variant font-medium">
            Showing {filteredQueue.length} patient records
          </span>
        </div>

        {/* Triage Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px] border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-bold uppercase text-[11px] border-b border-surface-container-high/60 tracking-wider">
                <th className="py-2.5 px-4">Token / UHID</th>
                <th className="py-2.5 px-4">Patient Details</th>
                <th className="py-2.5 px-4">Triage Status</th>
                <th className="py-2.5 px-4">Chief Complaint</th>
                <th className="py-2.5 px-4">Pre-OPD Vitals</th>
                <th className="py-2.5 px-4">Wait Time</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/40">
              {filteredQueue.map((item) => {
                const isUrgent = item.triage === 'Urgent';
                const isPriority = item.triage === 'Priority';
                const isCompleted = item.status === 'completed';

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-surface-container-low/60 transition-colors ${
                      isCompleted ? 'opacity-60 bg-slate-50/50' : ''
                    }`}
                  >
                    {/* Token & UHID */}
                    <td className="py-3 px-4 font-mono font-bold text-on-surface">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-[11px] text-primary">
                          #{item.tokenNumber}
                        </span>
                        <span className="text-[11px] text-on-surface-variant font-normal">
                          {item.mrn}
                        </span>
                      </div>
                    </td>

                    {/* Patient Details */}
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-bold text-[13px] text-on-surface hover:text-primary cursor-pointer">
                          {item.patientName}
                        </span>
                        <div className="text-[11px] text-on-surface-variant">
                          {item.age} Yrs • {item.gender} • {item.phone}
                        </div>
                      </div>
                    </td>

                    {/* Triage Badge */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isUrgent
                            ? 'bg-error-container text-error border border-error/20'
                            : isPriority
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {isUrgent && <span className="w-1.5 h-1.5 rounded-full bg-error"></span>}
                        {item.triage}
                      </span>
                    </td>

                    {/* Chief Complaint */}
                    <td className="py-3 px-4 max-w-xs truncate text-on-surface font-medium">
                      {item.chiefComplaint}
                    </td>

                    {/* Pre-OPD Vitals */}
                    <td className="py-3 px-4 font-mono text-[11px] text-on-surface-variant">
                      <div>BP: {item.bp}</div>
                      <div className="text-[10px] text-on-surface-variant/80">
                        HR: {item.pulse} bpm • Sugar: {item.bloodSugar} mg/dL
                      </div>
                    </td>

                    {/* Wait Time */}
                    <td className="py-3 px-4 text-[11px] text-on-surface-variant font-medium">
                      {item.waitTime}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      {isCompleted ? (
                        <button
                          onClick={() => handleStartConsultation(item.id)}
                          className="h-7 px-2.5 rounded bg-surface-container hover:bg-surface-variant text-on-surface text-[11px] font-semibold transition-colors"
                        >
                          Review Chart
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartConsultation(item.id)}
                          className="h-7 px-3 rounded bg-primary hover:bg-primary-container text-on-primary text-[11px] font-semibold transition-colors shadow-2xs"
                        >
                          Start Consultation
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Modal */}
      <RegisterPatientModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}
