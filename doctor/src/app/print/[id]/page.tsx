'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useClinicalEncounter } from '@/context/ClinicalEncounterContext';
import {
  SupportedLanguage,
  prescriptionSectionLabels,
  getLocalizedInstruction,
  getLocalizedTiming,
  getLocalizedDrugDescription,
  getLocalizedDiagnosis,
  directiveTranslations,
} from '@/data/translations';

export default function StandalonePrintRxPage() {
  const searchParams = useSearchParams();
  const {
    activePatient,
    vitals,
    diagnoses,
    prescriptions,
    labOrders,
    directives,
    followUp,
    rxLanguage: contextLang,
    prescriptionDescriptions,
  } = useClinicalEncounter();

  const queryLang = searchParams?.get('lang') as SupportedLanguage;
  const rxLanguage: SupportedLanguage = queryLang || contextLang || 'en';

  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (!activePatient) {
    return (
      <div className="p-8 text-center text-slate-500 font-sans text-[13px]">
        No active patient encounter loaded to print.
      </div>
    );
  }

  const selectedDirectives = directives.filter((d) => d.selected);
  const activeDiagnoses = diagnoses.filter((d) => d.status !== 'Resolved');
  const labels = prescriptionSectionLabels[rxLanguage];

  return (
    <div id="printable-rx" className="bg-white text-slate-900 min-h-screen p-8 md:p-12 font-sans print-page max-w-[800px] mx-auto">
      {/* Clinic Letterhead (Always in English) */}
      <div className="flex items-start justify-between border-b border-slate-300 pb-4">
        <div>
          <h1 className="text-[18px] font-bold text-slate-900 tracking-tight uppercase leading-tight">
            Apollo Multi-Specialty Clinic
          </h1>
          <p className="text-[11px] text-[#00685f] font-semibold mt-0.5">
            Centre for Diabetology, Endocrinology &amp; Metabolic Care
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            #14/2 Bannerghatta Main Road, Bangalore - 560076 • Ph: +91 80 4999 2300
          </p>
          <p className="text-[10px] text-slate-400">
            Reg. No: AP-BLR-8940/2012 • Web: www.apolloclinic.com
          </p>
        </div>

        <div className="text-right">
          <h2 className="text-[15px] font-bold text-slate-900 leading-tight">
            Dr. Dhananjay Chavan
          </h2>
          <p className="text-[11px] font-medium text-slate-700">
            MBBS, MD (Internal Medicine)
          </p>
          <p className="text-[11px] text-slate-500">
            Senior Consultant Diabetologist
          </p>
          <p className="text-[10px] text-slate-400 font-mono">
            KMC Reg: 74920
          </p>
        </div>
      </div>

      {/* Patient Details Line */}
      <div className="py-3 border-b border-slate-200 text-[12px] space-y-1.5">
        <div className="grid grid-cols-4 gap-2">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">{labels.patientName}</span>
            <span className="font-bold text-slate-900">{activePatient.name}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">{labels.ageGender}</span>
            <span className="text-slate-800 font-medium">
              {activePatient.age} {rxLanguage === 'hi' ? 'वर्ष' : rxLanguage === 'mr' ? 'वर्षे' : 'Yrs'} / {activePatient.gender === 'Male' ? (rxLanguage === 'hi' ? 'पुरुष' : rxLanguage === 'mr' ? 'पुरुष' : 'Male') : activePatient.gender}
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">{labels.uhid}</span>
            <span className="font-mono font-bold text-slate-800">{activePatient.mrn}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">{labels.date}</span>
            <span className="text-slate-800 font-medium">
              {new Date().toLocaleDateString(rxLanguage === 'mr' ? 'mr-IN' : rxLanguage === 'hi' ? 'hi-IN' : 'en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Vitals & Allergies Strip */}
        <div className="pt-1.5 flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-bold uppercase text-[10px]">{labels.vitals}:</span>
            <span className="font-mono">BP: {vitals.systolic}/{vitals.diastolic} mmHg</span>
            <span>•</span>
            <span className="font-mono">Pulse: {vitals.pulse} bpm</span>
            <span>•</span>
            <span className="font-mono">FBS: {vitals.bloodSugarFasting} mg/dL</span>
            <span>•</span>
            <span className="font-mono">BMI: {vitals.bmi} kg/m²</span>
          </div>

          {activePatient.allergies.length > 0 && (
            <div className="text-red-700 font-semibold text-[11px]">
              <span className="text-[10px] font-bold uppercase mr-1">{labels.allergies}:</span>
              <span>
                {activePatient.allergies.map(a => 
                  a.toLowerCase().includes('penicillin')
                    ? (rxLanguage === 'hi' ? 'पेनिसिलिन (Penicillin)' : rxLanguage === 'mr' ? 'पेनिसिलिन (Penicillin)' : a)
                    : a
                ).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Diagnosis Line */}
      <div className="py-2.5 border-b border-slate-200 text-[12px] flex items-baseline gap-2">
        <span className="text-slate-400 text-[10px] uppercase font-bold shrink-0">
          {labels.diagnosis}:
        </span>
        <span className="text-slate-900 font-medium leading-relaxed">
          {activeDiagnoses.map((d, i) => (
            <span key={d.code}>
              <span className="font-semibold text-[#00685f] mr-1">[{d.code}]</span>
              {getLocalizedDiagnosis(d.code, d.description, rxLanguage)}
              {i < activeDiagnoses.length - 1 && '  •  '}
            </span>
          ))}
        </span>
      </div>

      {/* Multilingual Description of Prescription / Doctor's Overview */}
      {prescriptionDescriptions && prescriptionDescriptions[rxLanguage] && (
        <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#00685f] mb-1">
            <span>{labels.prescriptionDescriptionHeading}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-700">
            {prescriptionDescriptions[rxLanguage]}
          </p>
        </div>
      )}

      {/* ℞ Prescriptions Table with Localized Timing, Instructions & Drug Descriptions */}
      <div className="mt-5">
        <div className="flex items-center justify-between pb-1.5 mb-1">
          <div className="flex items-center gap-2">
            <span className="text-[26px] font-serif font-black text-[#00685f] leading-none">℞</span>
            <span className="font-bold text-slate-800 text-[12px] uppercase tracking-wider">
              {labels.rxHeading}
            </span>
          </div>

          {rxLanguage !== 'en' && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Language: {rxLanguage === 'hi' ? 'हिंदी (Hindi)' : 'मराठी (Marathi)'}
            </span>
          )}
        </div>

        <table className="w-full text-left text-[12px] border-collapse">
          <thead>
            <tr className="border-b border-slate-300 text-[10px] font-bold uppercase tracking-wider text-slate-500 pb-2">
              <th className="py-2 w-8 text-center">#</th>
              <th className="py-2">{labels.medicine}</th>
              <th className="py-2 text-center w-28">{labels.dosage}</th>
              <th className="py-2 text-center w-28">{labels.timing}</th>
              <th className="py-2 text-center w-24">{labels.duration}</th>
              <th className="py-2">{labels.instructions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {prescriptions.map((rx, idx) => {
              const localizedTiming = getLocalizedTiming(rx.timing, rxLanguage);
              const localizedInstruction = getLocalizedInstruction(
                rx.drugName,
                rx.instructions,
                rxLanguage
              );
              const localizedDrugDesc = getLocalizedDrugDescription(rx.drugName, rxLanguage);

              return (
                <tr key={rx.id}>
                  <td className="py-2.5 text-center font-mono text-[11px] text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 pr-2">
                    <div className="font-bold text-slate-900 text-[13px]">{rx.drugName}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{rx.genericName}</div>
                    <div className="text-[10px] text-[#00685f] font-medium mt-0.5 leading-snug">
                      {localizedDrugDesc.indication}
                    </div>
                  </td>
                  <td className="py-2.5 text-center font-mono font-bold text-[#00685f] text-[13px] tracking-wider">
                    {rx.dosageSchedule}
                  </td>
                  <td className="py-2.5 text-center text-slate-700 text-[11px] font-medium">
                    {localizedTiming}
                  </td>
                  <td className="py-2.5 text-center text-slate-700 text-[11px] font-medium">
                    {rx.duration}
                  </td>
                  <td className="py-2.5 text-slate-700 text-[11px] leading-relaxed font-normal">
                    {localizedInstruction}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Lab Orders & Lifestyle Directives */}
      <div className="mt-6 grid grid-cols-2 gap-6 text-[12px]">
        {labOrders.length > 0 && (
          <div>
            <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              {labels.labHeading}
            </h3>
            <ul className="space-y-1 text-slate-800 text-[11px]">
              {labOrders.map((l) => (
                <li key={l.id} className="flex items-start gap-1.5">
                  <span className="text-[#00685f] font-bold">•</span>
                  <span className="font-medium">{l.testName}</span>
                  {l.fastingRequired && (
                    <span className="text-amber-700 text-[10px]">
                      {rxLanguage === 'hi'
                        ? '(खाली पेट जांच)'
                        : rxLanguage === 'mr'
                        ? '(उपाशी पोटी तपासणी)'
                        : '(Fasting required)'}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedDirectives.length > 0 && (
          <div>
            <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              {labels.dietHeading}
            </h3>
            <ul className="space-y-1.5 text-slate-800 text-[11px]">
              {selectedDirectives.map((d) => {
                const translated =
                  directiveTranslations[d.id] && directiveTranslations[d.id][rxLanguage]
                    ? directiveTranslations[d.id][rxLanguage]
                    : { title: d.title, desc: d.description };

                return (
                  <li key={d.id} className="flex items-start gap-1.5">
                    <span className="text-[#00685f] font-bold">•</span>
                    <div>
                      <span className="font-semibold text-slate-900">{translated.title}</span>
                      <span className="block text-[10px] text-slate-500 leading-snug">
                        {translated.desc}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Follow-up Review & Doctor Signature */}
      <div className="mt-8 pt-4 border-t border-slate-300 flex items-end justify-between text-[11px]">
        <div>
          <div className="text-slate-800 mb-1">
            <span className="font-bold text-slate-900">{labels.nextReview} </span>
            <span>
              {followUp.date} ({followUp.interval}) at {followUp.slot}
            </span>
          </div>
          {followUp.clinicalObjective && (
            <p className="text-[10px] text-slate-500">
              <span className="font-medium">{labels.clinicalGoal} </span>
              <span>{followUp.clinicalObjective}</span>
            </p>
          )}
          <div className="mt-2 text-[9px] text-slate-400 font-mono flex items-center gap-1.5">
            <span className="px-1 py-0.5 rounded bg-slate-100 border border-slate-200">QR #90284</span>
            <span>{labels.digitalStamp}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="font-serif italic text-[16px] text-[#00685f] font-bold mb-1">
            Dr. Dhananjay Chavan
          </div>
          <p className="font-bold text-slate-900 text-[11px]">Dr. Dhananjay Chavan, MD</p>
          <p className="text-[10px] text-slate-500">Senior Consultant Diabetologist</p>
          <p className="text-[10px] text-slate-400 font-mono">KMC Reg: 74920</p>
        </div>
      </div>
    </div>
  );
}
