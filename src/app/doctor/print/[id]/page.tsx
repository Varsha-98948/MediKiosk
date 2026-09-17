'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import {
  prescriptionSectionLabels,
  getLocalizedInstruction,
  getLocalizedTiming,
  getLocalizedDiagnosis,
  directiveTranslations,
} from '@/data/doctor/translations';

export default function DoctorPrintPage() {
  const params = useParams();
  const patientId = params?.id as string;
  const {
    activePatient,
    vitals,
    diagnoses,
    prescriptions,
    directives,
    rxLanguage,
    selectPatient,
  } = useClinicalEncounter();

  useEffect(() => {
    if (patientId && (!activePatient || activePatient.id !== patientId)) {
      selectPatient(patientId);
    }
  }, [patientId, activePatient, selectPatient]);

  if (!activePatient) {
    return <div className="p-8 text-center font-sans">Loading prescription for #{patientId}...</div>;
  }

  const selectedDirectives = directives.filter((d) => d.selected);
  const activeDiagnoses = diagnoses.filter((d) => d.status !== 'Resolved');
  const labels = prescriptionSectionLabels[rxLanguage];

  return (
    <div className="bg-white min-h-screen text-slate-900 p-8 max-w-4xl mx-auto print:p-0 font-sans">
      <div className="flex justify-between items-center mb-6 print:hidden border-b pb-4">
        <h1 className="text-xl font-bold">Prescription Preview</h1>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-700 shadow-xs cursor-pointer"
        >
          Print Prescription
        </button>
      </div>

      {/* Hospital Letterhead */}
      <div className="border-b-2 border-slate-900 pb-4 mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-black text-teal-900">APEX MULTISPECIALTY HOSPITAL</h2>
          <p className="text-xs text-slate-600">NABH & ABDM Level-3 Accredited Healthcare Centre</p>
          <p className="text-xs text-slate-500">12, Mahatma Gandhi Marg, Civil Lines, Pune - 411001</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-slate-900">Dr. Dhananjay Chavan</p>
          <p className="text-xs text-slate-600">MBBS, MD (Internal Medicine)</p>
          <p className="text-xs text-slate-500">Reg No: KMC-74920</p>
        </div>
      </div>

      {/* Patient Meta Strip */}
      <div className="bg-slate-50 rounded-lg p-3 grid grid-cols-4 gap-2 text-xs border border-slate-200 mb-6">
        <div><span className="text-slate-500">Patient:</span> <strong>{activePatient.name}</strong></div>
        <div><span className="text-slate-500">UHID:</span> <strong>{activePatient.mrn}</strong></div>
        <div><span className="text-slate-500">Age/Gender:</span> <strong>{activePatient.age}y / {activePatient.gender}</strong></div>
        <div><span className="text-slate-500">Date:</span> <strong>{new Date().toLocaleDateString('en-IN')}</strong></div>
      </div>

      {/* Vitals */}
      <div className="text-xs border-b pb-3 mb-4 flex gap-6 text-slate-700">
        <span><strong>BP:</strong> {vitals.systolic}/{vitals.diastolic} mmHg</span>
        <span><strong>Pulse:</strong> {vitals.pulse} bpm</span>
        <span><strong>SpO2:</strong> {vitals.spo2}%</span>
        <span><strong>Temp:</strong> {vitals.temp} °F</span>
      </div>

      {/* Diagnoses */}
      {activeDiagnoses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{labels.diagnosis}</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {activeDiagnoses.map((d, i) => (
              <li key={i}><strong>{getLocalizedDiagnosis(d.code, d.description, rxLanguage)}</strong> ({d.code})</li>
            ))}
          </ul>
        </div>
      )}

      {/* Prescriptions (Rx) */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-900 mb-2 flex items-center gap-1">
          <span>℞</span> {labels.rxHeading}
        </h3>
        <table className="w-full text-left text-xs border border-slate-200">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Medicine / Generic</th>
              <th className="p-2">Dosage & Frequency</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Instructions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {prescriptions.map((p, i) => (
              <tr key={i}>
                <td className="p-2">{i + 1}</td>
                <td className="p-2">
                  <div className="font-bold">{p.drugName}</div>
                  <div className="text-[10px] text-slate-500">{p.genericName} {p.strength}</div>
                </td>
                <td className="p-2">{p.dosageSchedule} • {getLocalizedTiming(p.timing, rxLanguage)}</td>
                <td className="p-2">{p.duration}</td>
                <td className="p-2">{getLocalizedInstruction(p.drugName, p.instructions, rxLanguage)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Directives & Advice */}
      {selectedDirectives.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{labels.dietHeading}</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {selectedDirectives.map((d, i) => (
              <span key={i} className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                {directiveTranslations[d.id]?.[rxLanguage]?.title || d.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Signature */}
      <div className="mt-16 pt-6 border-t border-slate-300 flex justify-between text-xs text-slate-500">
        <p>Generated via MediKiosk Hospital Precision EMR</p>
        <div className="text-right">
          <p className="font-bold text-slate-900">Dr. Dhananjay Chavan</p>
          <p>Senior Consultant Physician</p>
        </div>
      </div>
    </div>
  );
}
