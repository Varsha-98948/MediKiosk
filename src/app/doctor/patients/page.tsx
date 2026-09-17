'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';

export default function DoctorPatientsPage() {
  const router = useRouter();
  const { selectPatient } = useClinicalEncounter();
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/patients?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (res.ok && data.patients) {
          setPatients(data.patients);
        }
      } catch (err) {
        console.error('Error searching patients:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/40">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-on-surface-variant text-[13px]">
                    Searching registry records...
                  </td>
                </tr>
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-on-surface-variant text-[13px]">
                    No matching patient records found.
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3 px-3 font-mono text-[12px] font-bold text-primary">
                      {p.mrn}
                    </td>
                    <td className="py-3 px-3 font-bold text-on-surface">
                      {p.name}
                    </td>
                    <td className="py-3 px-3 text-on-surface-variant">
                      {p.age}y / {p.gender}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-surface-container text-[11px] font-medium text-on-surface">
                        {p.bloodGroup || 'O Positive'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-on-surface-variant text-[12px]">
                      {Array.isArray(p.chronicConditions) && p.chronicConditions.length > 0
                        ? p.chronicConditions.join(', ')
                        : 'None documented'}
                    </td>
                    <td className="py-3 px-3 text-on-surface-variant text-[12px]">
                      {p.lastVisit || p.registrationDate || 'Recent'}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleOpenPatient(p.id)}
                        className="h-7 px-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <span>Open Chart</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
