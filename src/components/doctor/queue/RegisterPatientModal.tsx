'use client';

import React, { useState } from 'react';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import { QueueItem, TriageCategory } from '@/types/emr';
import { apiPost } from '@/lib/apiClient';

interface RegisterPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterPatientModal({ isOpen, onClose }: RegisterPatientModalProps) {
  const { queue, selectPatient } = useClinicalEncounter();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Diabetology & Metabolic');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [triage, setTriage] = useState<TriageCategory>('Routine');
  const [bp, setBp] = useState('120/80 mmHg');
  const [pulse, setPulse] = useState('74');
  const [bloodSugar, setBloodSugar] = useState('130');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      // 1. Identify or register patient
      const identifyRes = await apiPost('/api/patients/identify', {
        name: name.trim(),
        age: parseInt(age) || 40,
        gender,
        phone: phone || '+91 98000 00000',
      });

      const identifyData = await identifyRes.json();
      const patientId = identifyData.patient?.id;

      if (!patientId) throw new Error('Failed to register patient');

      // 2. Generate token in DB
      const tokenRes = await apiPost('/api/queue/tokens', {
        patientId,
        departmentId: 'gen_med',
        triage,
        chiefComplaint: chiefComplaint || 'Routine consultation',
        vitals: {
          bp,
          pulse,
          bloodSugar,
        },
      });

      const tokenData = await tokenRes.json();
      if (tokenData.success) {
        selectPatient(patientId);
        onClose();
      }
    } catch (err) {
      console.error('Error registering patient from OPD desk:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 select-none">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-2xl border border-surface-container-high overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px]">person_add</span>
            <span className="font-headline-sm text-[15px] font-bold text-on-surface">
              Quick Patient Registration (OPD Desk)
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">
                Full Patient Name *
              </label>
              <input
                required
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Smt. Kamala Devi"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">Age *</label>
              <input
                required
                type="number"
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
                placeholder="Age in Yrs"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">Gender</label>
              <select
                className="w-full h-9 px-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">Phone Number</label>
              <input
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
                placeholder="+91 98000 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">Triage Urgency</label>
              <select
                className="w-full h-9 px-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
                value={triage}
                onChange={(e) => setTriage(e.target.value as any)}
              >
                <option value="Routine">Routine</option>
                <option value="Priority">Priority</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">
                Chief Complaint / Visit Purpose
              </label>
              <input
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Uncontrolled fasting sugars, burning feet"
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">Triage BP</label>
              <input
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
                placeholder="130/80 mmHg"
                value={bp}
                onChange={(e) => setBp(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">Blood Sugar (mg/dL)</label>
              <input
                type="number"
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-surface-container-high text-[13px] outline-none focus:ring-1 focus:ring-primary"
                placeholder="140"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-surface-container-high flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface font-headline-sm text-[12px] font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-[12px] font-semibold transition-colors shadow-sm"
            >
              Register & Add to Queue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
