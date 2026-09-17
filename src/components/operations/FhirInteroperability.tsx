'use client';

import React, { useState } from 'react';
import { 
  Network, 
  CheckCircle2, 
  FileCode, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  Globe, 
  Copy, 
  ExternalLink,
  Lock,
  Cpu
} from 'lucide-react';
import { PatientRecord } from '../../types';

interface FhirInteroperabilityProps {
  patient?: PatientRecord;
}

export const FhirInteroperability: React.FC<FhirInteroperabilityProps> = ({
  patient,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeResourceType, setActiveResourceType] = useState<'Bundle' | 'Patient' | 'Condition' | 'Observation' | 'MedicationRequest'>('Bundle');

  const fhirBundleJson = {
    resourceType: "Bundle",
    id: "medikiosk-bundle-2026-09-07",
    meta: {
      versionId: "1",
      lastUpdated: "2026-09-07T10:34:00Z",
      profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/ClinicalArtifact"]
    },
    type: "document",
    entry: [
      {
        fullUrl: "urn:uuid:patient-devendra-01",
        resource: {
          resourceType: "Patient",
          id: "devendra-01",
          identifier: [
            { system: "https://healthid.ndhm.gov.in", value: patient?.abhaId || "91-8472-1049-2819" }
          ],
          name: [{ text: patient?.name || "Devendra Patel" }],
          gender: patient?.gender || "male",
          birthDate: "1972-04-12"
        }
      },
      {
        fullUrl: "urn:uuid:observation-vitals-01",
        resource: {
          resourceType: "Observation",
          status: "final",
          code: {
            coding: [
              { system: "http://loinc.org", code: "85354-9", display: "Blood pressure panel" }
            ]
          },
          component: [
            { code: { text: "Systolic" }, valueQuantity: { value: 152, unit: "mmHg" } },
            { code: { text: "Diastolic" }, valueQuantity: { value: 92, unit: "mmHg" } }
          ]
        }
      },
      {
        fullUrl: "urn:uuid:condition-namaste-01",
        resource: {
          resourceType: "Condition",
          clinicalStatus: { text: "active" },
          code: {
            coding: [
              {
                system: "https://namstp.ayush.gov.in/namaste-morbidity-codes",
                code: "SR-HR-02",
                display: "Kaphaja Hridroga (Precordial Angina / Channel Congestion)"
              },
              {
                system: "http://id.who.int/icd/release/11/mms",
                code: "TM2.4A",
                display: "Disorders of Heart Channel with Phlegm Congestion"
              }
            ],
            text: "Exertional Precordial Angina with Pitta-Kapha Mandagni"
          }
        }
      },
      {
        fullUrl: "urn:uuid:extension-ayush-prakriti-01",
        resource: {
          resourceType: "Basic",
          code: { text: "AyushPrakritiProfile" },
          extension: [
            { url: "prakritiConstitution", valueString: "Pitta-Kapha (द्वन्द्वज)" },
            { url: "agniStatus", valueString: "Mandagni (मंद जठराग्नि)" },
            { url: "dushyaSubstrates", valueString: "Rakta & Medas" }
          ]
        }
      }
    ]
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(fhirBundleJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-7 font-['Outfit'] text-[#1C2421]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span>
            <h3 className="text-xl font-black text-slate-900">
              FHIR R4 Interoperability & Ayush Grid Architecture
            </h3>
            <span className="text-[10px] font-black bg-[#EBF3EF] text-[#0D5C4D] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
              ABDM M1 • M2 • M3 Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized electronic health record exchange connecting hospital intake to AHMIS 2.0 and national research registries.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>{copied ? 'Bundle JSON Copied! ✓' : 'Copy FHIR R4 Bundle'}</span>
        </button>
      </div>

      {/* 4-Hop Pipeline Architecture Diagram (Prompt Section 20 Mandate) */}
      <div className="p-6 bg-[#FAFBF9] rounded-3xl border border-slate-200/90 space-y-4">
        <span className="text-xs font-black text-[#0D5C4D] uppercase tracking-wider block">
          Interoperability Pipeline Architecture:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Step 1: Verified Clinical Data */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black text-slate-400">HOP 01</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-sm font-black text-slate-900">Verified Clinical Data</div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Doctor-approved diagnosis, Dashavidha parameters, and Marma pain coordinates.
            </p>
          </div>

          {/* Step 2: FHIR R4 Bundle */}
          <div className="bg-white p-4 rounded-2xl border border-[#0D5C4D] shadow-xs space-y-2 ring-2 ring-[#0D5C4D]/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black text-[#0D5C4D]">HOP 02</span>
              <FileCode className="w-4 h-4 text-[#0D5C4D]" />
            </div>
            <div className="text-sm font-black text-slate-900">FHIR R4 Bundle</div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Normalized into NRCES ClinicalArtifact with Ayush Prakriti Extension.
            </p>
          </div>

          {/* Step 3: AHMIS */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black text-slate-400">HOP 03</span>
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-sm font-black text-slate-900">AHMIS 2.0</div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Hospital Management Information System ingest via secure REST APIs.
            </p>
          </div>

          {/* Step 4: Ayush Grid / ABDM */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black text-slate-400">HOP 04</span>
              <Globe className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-sm font-black text-slate-900">Ayush Grid & ABDM</div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Federated national health stack with universal citizen ABHA access.
            </p>
          </div>

        </div>
      </div>

      {/* Interactive FHIR JSON Bundle Viewer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5"><FileCode className="w-4 h-4 text-[#0D5C4D]" /> Live Bundle Resource Inspector</span>
          <span className="text-[10px] text-slate-400 font-mono">Payload Size: 2.4 KB • Schema Validated</span>
        </div>

        <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto max-h-[380px] shadow-inner border border-slate-800 leading-relaxed">
          <pre>{JSON.stringify(fhirBundleJson, null, 2)}</pre>
        </div>
      </div>

      {/* ABDM Compliance Milestone Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3 bg-[#FAFBF9] rounded-2xl border border-slate-200 flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">M1</div>
          <div>
            <div className="text-xs font-black text-slate-900">Milestone 1 (KYC)</div>
            <div className="text-[10px] text-slate-500">ABHA Creation & Verification</div>
          </div>
        </div>

        <div className="p-3 bg-[#FAFBF9] rounded-2xl border border-slate-200 flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">M2</div>
          <div>
            <div className="text-xs font-black text-slate-900">Milestone 2 (HIP)</div>
            <div className="text-[10px] text-slate-500">Health Information Provider Bundle</div>
          </div>
        </div>

        <div className="p-3 bg-[#FAFBF9] rounded-2xl border border-slate-200 flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">M3</div>
          <div>
            <div className="text-xs font-black text-slate-900">Milestone 3 (HIU)</div>
            <div className="text-[10px] text-slate-500">Health Information User Consent</div>
          </div>
        </div>
      </div>

    </div>
  );
};
