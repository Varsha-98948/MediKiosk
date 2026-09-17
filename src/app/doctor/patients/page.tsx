'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import { mockPatients } from '@/data/doctor/mockPatients';

export default function DoctorPatientsPage() {
  const router = useRouter();
  const { selectPatient } = useClinicalEncounter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = mockPatients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  const handleOpenPatient = (id: string) => {
    selectPatient(id);
    router.push('/doctor');
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high/60 shadow-xs p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-on-surface">Patient Registry & EMR Archives</h1>
            <p className="text-[12px] text-on-surface-variant">
              Search hospital patient records, past encounters, and active care plans
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Name, UHID/MRN, Phone..."
                className="h-9 pl-9 pr-3 text-[12px] rounded-lg border border-surface-container-highest bg-surface-container-low focus:outline-hidden focus:border-primary w-64 text-on-surface"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-surface-container-high/60 text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">MRN / UHID</th>
                <th className="py-2.5 px-3">Patient Name</th>
                <th className="py-2.5 px-3">Age / Gender</th>
                <th className="py-2.5 px-3">Blood Group</th>
                <th className="py-2.5 px-3">Chronic Conditions</th>
                <th className="py-2.5 px-3">Last Visit</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/40">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-primary">{patient.mrn}</td>
                  <td className="py-3 px-3 font-semibold text-on-surface">{patient.name}</td>
                  <td className="py-3 px-3 text-on-surface-variant">{patient.age}y • {patient.gender}</td>
                  <td className="py-3 px-3 font-medium text-on-surface">{patient.bloodGroup}</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {patient.chronicConditions.slice(0, 2).map((c, idx) => (
                        <span key={idx} className="text-[10px] bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-on-surface-variant text-[12px]">{patient.lastVisit || 'Today'}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleOpenPatient(patient.id)}
                      className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-[11px] font-bold hover:bg-primary-container transition-colors shadow-xs inline-flex items-center gap-1"
                    >
                      <span>Open EMR</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
