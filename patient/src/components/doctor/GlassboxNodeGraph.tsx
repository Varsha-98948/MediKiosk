'use client';

import React, { useState } from 'react';
import { 
  Network, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Database, 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  Cpu, 
  UserCheck, 
  FileCheck,
  Info,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface NodeData {
  id: string;
  stepNumber: number;
  label: string;
  category: string;
  icon: any;
  status: 'captured' | 'analyzed' | 'verified' | 'finalized';
  summary: string;
  evidenceDetails: {
    source: string;
    timestamp: string;
    confidence: number;
    rawText: string;
    clinicalRuleApplied: string;
    ayushCitation: string;
  };
}

const GLASSBOX_NODES: NodeData[] = [
  {
    id: 'node_1_data',
    stepNumber: 1,
    label: 'Patient Intake Data',
    category: 'First-Mile Capture',
    icon: Database,
    status: 'captured',
    summary: 'Spoken Hindi audio + 2D Marma tap on Hridaya Precordium at Kiosk #01.',
    evidenceDetails: {
      source: 'Touchscreen Kiosk Audio Transcriber & Optical Sensor',
      timestamp: 'Today, 10:14:22 AM IST',
      confidence: 0.96,
      rawText: '"सीने में भारीपन और बाएँ हाथ में दर्द होता है जब तेज चलता हूँ।" (Pain radiates to left arm when walking fast)',
      clinicalRuleApplied: 'Direct speech capture without intermediate paraphrasing; biometric pulse 76 BPM synchronized.',
      ayushCitation: 'Rogi Pariksha (Direct Patient Interrogation - Prashna Pariksha).'
    }
  },
  {
    id: 'node_2_symptoms',
    stepNumber: 2,
    label: 'Extracted Symptoms',
    category: 'NLP & Normalization',
    icon: Layers,
    status: 'analyzed',
    summary: 'Extracted Precordial Pain, Radiating Left Arm Ache, Exertional Onset.',
    evidenceDetails: {
      source: 'Clinical NLP Entity Extraction Pipeline v3.2',
      timestamp: 'Today, 10:14:25 AM IST',
      confidence: 0.94,
      rawText: 'Primary: Precordial Angina (Chest Discomfort); Secondary: Left arm radiation; Aggravation: Walking/Stairs.',
      clinicalRuleApplied: 'Normalized against SNOMED-CT [225566008] and Ayush Morbidity Vocabulary.',
      ayushCitation: 'Hrid-Drava (हृद्द्रव) and Hrid-Vedana (हृद्वेदना) classical symptom clusters.'
    }
  },
  {
    id: 'node_3_rules',
    stepNumber: 3,
    label: 'Clinical Decision Rules',
    category: 'Modern Triage Logic',
    icon: Cpu,
    status: 'analyzed',
    summary: 'Triggered ACC/AHA Angina Equivalence + Red Flag Chest Alert rule set.',
    evidenceDetails: {
      source: 'Cardiovascular Triage Rule Engine (Rule-ID: CV-EXERT-04)',
      timestamp: 'Today, 10:14:28 AM IST',
      confidence: 0.92,
      rawText: 'Exertional substernal discomfort + Left arm radiation in male > 50 yrs = High suspicion of myocardial ischemia.',
      clinicalRuleApplied: 'Escalated queue to Priority Routine (Room 104); ECG alert flagged for doctor order.',
      ayushCitation: 'Sannipataja Hridroga warning signs per Sushruta Uttaratantra.'
    }
  },
  {
    id: 'node_4_ayush',
    stepNumber: 4,
    label: 'Ayush Knowledge Graph',
    category: 'Classical Ontology',
    icon: BookOpen,
    status: 'analyzed',
    summary: 'Correlated with Pitta-Kapha Avarana (Obstruction) in Rasa-Rakta Vaha Srotas.',
    evidenceDetails: {
      source: 'AIIA National Knowledge Graph • Classical Samhita Repository',
      timestamp: 'Today, 10:14:31 AM IST',
      confidence: 0.93,
      rawText: 'Metabolic Ama accumulation obstructing coronary channel flow (Hridaya Srotorodha). Mandagni underlying factor.',
      clinicalRuleApplied: 'Linked to Dashavidha Pariksha #1 (Dushya: Rakta/Medas) & #5 (Anala: Mandagni).',
      ayushCitation: 'Charaka Samhita Sutrasthana 17/30: "हृदि प्रकुपिता दोषा..."'
    }
  },
  {
    id: 'node_5_ai_suggestion',
    stepNumber: 5,
    label: 'AI Recommendation',
    category: 'Provisional Proposal',
    icon: Sparkles,
    status: 'analyzed',
    summary: 'Proposes NAMASTE SR-HR-02 + ECG Investigation + Deepana-Pachana Care.',
    evidenceDetails: {
      source: 'Glassbox Clinical Recommender (Model AI-Ayush v4.1)',
      timestamp: 'Today, 10:14:34 AM IST',
      confidence: 0.89,
      rawText: 'Provisional: Exertional Angina / Kaphaja Hridroga. Suggests 12-Lead ECG, Lipid Profile, and Yogaraj Guggulu / Arjuna Ksheerapaka.',
      clinicalRuleApplied: 'All suggestions flagged as "Pending Physician Review and Override".',
      ayushCitation: 'Integrative protocol AIIA-CAR-2024.'
    }
  },
  {
    id: 'node_6_doctor_review',
    stepNumber: 6,
    label: 'Doctor Verification',
    category: 'Human Authority',
    icon: UserCheck,
    status: 'verified',
    summary: 'Dr. Rajeshwar Sen reviewed, approved diagnosis, adjusted dosage, and ordered ECG.',
    evidenceDetails: {
      source: 'Physician EMR Terminal (Doctor ID: dr-001)',
      timestamp: 'Today, 10:32:15 AM IST',
      confidence: 1.0,
      rawText: 'Attending physician confirmed findings. "Patient exhibits classical exertional pattern. Approved Ayush adjuvant and ordered stat 12-lead ECG."',
      clinicalRuleApplied: 'Final clinical authority resides solely with attending doctor.',
      ayushCitation: 'Physician is Pradhananga (Chief Factor) in the Ayurvedic Quadruple (Chikitsa Chatushpada).'
    }
  },
  {
    id: 'node_7_final_record',
    stepNumber: 7,
    label: 'Final Clinical Record',
    category: 'Interoperable EHR',
    icon: FileCheck,
    status: 'finalized',
    summary: 'Sealed EMR encounter bundled into FHIR R4 JSON for Ayush Grid transmission.',
    evidenceDetails: {
      source: 'ABDM Health Information Provider (HIP) Gateway',
      timestamp: 'Today, 10:34:00 AM IST',
      confidence: 1.0,
      rawText: 'Bundle includes Condition, Observation (BP 152/92), DiagnosticReport, and MedicationRequest.',
      clinicalRuleApplied: 'Cryptographically signed using JWS certificate; immutable audit hash recorded.',
      ayushCitation: 'Integrated AHMIS 2.0 electronic case sheet.'
    }
  }
];

export const GlassboxNodeGraph: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('node_4_ayush');
  const activeNode = GLASSBOX_NODES.find(n => n.id === activeNodeId) || GLASSBOX_NODES[3];

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-7 font-['Outfit']">
      
      {/* Header Banner with Mandated Transparency Statement */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span>
            <h3 className="text-xl font-black text-slate-900">
              Glassbox AI Reasoning Node Graph
            </h3>
            <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
              100% Explainable
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualizes every hop from patient voice intake to final clinical sign-off. Click any node to reveal evidence.
          </p>
        </div>

        {/* The Core Mandated Philosophy Banner */}
        <div className="p-3 bg-[#EBF3EF] rounded-2xl border border-[#D1E4DB] flex items-center gap-2 text-xs font-black text-[#0D5C4D] shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>"AI assists the doctor; the doctor remains in control."</span>
        </div>
      </div>

      {/* Horizontal Interactive Node Graph Flow */}
      <div className="overflow-x-auto pb-3 pt-2">
        <div className="flex items-center min-w-[850px] justify-between gap-2 px-2">
          {GLASSBOX_NODES.map((node, index) => {
            const IconComponent = node.icon;
            const isSelected = node.id === activeNodeId;
            return (
              <React.Fragment key={node.id}>
                {/* Node Pill */}
                <button
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between w-36 h-36 shrink-0 relative group ${
                    isSelected
                      ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-md scale-105 ring-4 ring-[#EBF3EF]'
                      : 'bg-[#FAFBF9] border-slate-200 text-slate-800 hover:border-[#0D5C4D]/40 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-black ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`}>
                      0{node.stepNumber}
                    </span>
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-white/15 text-white' : 'bg-slate-100 text-[#0D5C4D]'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-black leading-tight">
                      {node.label}
                    </div>
                    <div className={`text-[9px] mt-0.5 truncate ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                      {node.category}
                    </div>
                  </div>

                  {/* Pulsing indicator for active */}
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-2 right-2 animate-ping"></span>
                  )}
                </button>

                {/* Connecting Arrow */}
                {index < GLASSBOX_NODES.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Evidence & Traceability Drawer */}
      <div className="bg-[#FAFBF9] p-6 rounded-2xl border border-slate-200/90 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#0D5C4D] text-white flex items-center justify-center font-mono font-black text-xs">
              0{activeNode.stepNumber}
            </span>
            <div>
              <h4 className="text-base font-black text-slate-900">
                {activeNode.label} — Evidence & Audit Trace
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">
                Phase: <strong>{activeNode.category}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Confidence:</span>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {Math.round(activeNode.evidenceDetails.confidence * 100)}% Verified
            </span>
          </div>
        </div>

        {/* Evidence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="font-black text-[#0D5C4D] uppercase tracking-wider block text-[10px]">
              Primary Captured Narrative / Data:
            </span>
            <p className="text-slate-800 font-bold leading-relaxed italic">
              "{activeNode.evidenceDetails.rawText}"
            </p>
            <div className="pt-2 text-[10px] text-slate-400 font-mono">
              Source: {activeNode.evidenceDetails.source} • Timestamp: {activeNode.evidenceDetails.timestamp}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="font-black text-amber-800 uppercase tracking-wider block text-[10px]">
              Ayush Classical Rule & Samhita Citation:
            </span>
            <p className="text-slate-800 font-semibold leading-relaxed">
              {activeNode.evidenceDetails.ayushCitation}
            </p>
            <div className="p-2 bg-[#EBF3EF] rounded-lg text-[11px] text-[#0D5C4D] font-bold mt-2">
              Rule Applied: {activeNode.evidenceDetails.clinicalRuleApplied}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
