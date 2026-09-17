'use client';

import React, { useState } from 'react';
import { 
  Pill, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  BookOpen, 
  Bot, 
  Layers, 
  Tv, 
  Activity, 
  Smartphone,
  MapPin, 
  Heart, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  FolderLock, 
  Clock, 
  Globe, 
  Printer, 
  Share2,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Database,
  Search,
  ScanLine,
  UserCheck,
  WifiOff,
  GitCompare,
  BarChart3,
  FileCheck2,
  Users
} from 'lucide-react';
import { Language } from '../../types';

interface MedicalFeaturesHubProps {
  language: Language;
  onNavigateToScreen: (app: 'patient' | 'doctor' | 'design_system', screenId: string) => void;
  onOpenModule?: (moduleId: string) => void;
}

export const MedicalFeaturesHub: React.FC<MedicalFeaturesHubProps> = ({
  language,
  onNavigateToScreen,
  onOpenModule,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Modules (25+)' },
    { id: 'patient', label: '1. Patient Services' },
    { id: 'ai', label: '2. AI & Smart Health' },
    { id: 'accessibility', label: '3. Accessibility' },
    { id: 'doctor', label: '4. Doctor & Staff' },
    { id: 'integration', label: '5. Integration & ABDM' },
  ];

  const allFeatures = [
    // 1. Patient Services
    { id: 'medicine', category: 'patient', name: 'Medicine & Drug Formulary', desc: 'Allopathic & AYUSH drug database with indications, dosages and contraindications', icon: Pill, color: 'text-teal-700', bg: 'bg-teal-50', screen: 'medicine_explorer', tag: 'Patient Service' },
    { id: 'appointment', category: 'patient', name: 'Doctor Appointment Booking', desc: 'Specialist OPD slot booking, token number generation, and SMS/WhatsApp pass', icon: Calendar, color: 'text-blue-700', bg: 'bg-blue-50', screen: 'appointment_booking', tag: 'Patient Service' },
    { id: 'health_guide', category: 'patient', name: 'Health Guide & Dinacharya', desc: 'Biological rhythm wellness, hypertension dietary routines, and preventive care', icon: BookOpen, color: 'text-emerald-700', bg: 'bg-emerald-50', screen: 'health_guide', tag: 'Patient Service' },
    { id: 'first_aid', category: 'patient', name: 'First Aid & Emergency Center', desc: 'Urgent red-flag protocols, CPR & choking guides, emergency nurse escalation', icon: AlertTriangle, color: 'text-rose-700', bg: 'bg-rose-50', screen: 'first_aid_center', tag: 'Patient Service' },
    { id: 'xray', category: 'patient', name: 'X-Ray & Radiology Viewer', desc: 'Radiographic PACS viewer with contrast inversion, bone fracture AI boxes', icon: Layers, color: 'text-cyan-700', bg: 'bg-cyan-50', screen: 'xray_viewer', tag: 'Patient Service' },
    { id: 'reels', category: 'patient', name: 'Health Reels & Shorts', desc: 'Bite-sized clinical educational videos in Hindi, Marathi & English', icon: Tv, color: 'text-purple-700', bg: 'bg-purple-50', screen: 'health_reels', tag: 'Patient Service' },
    { id: 'history', category: 'patient', name: 'Patient History & Timeline', desc: 'Longitudinal clinical biomarker history (HbA1c, FBS, Blood Pressure)', icon: Clock, color: 'text-indigo-700', bg: 'bg-indigo-50', screen: 'timeline', app: 'patient' as const, tag: 'Patient Service' },
    { id: 'doc_storage', category: 'patient', name: 'Document Storage & OCR', desc: 'Encrypted document vault for prescriptions, lab slips, and discharge summaries', icon: FolderLock, color: 'text-slate-800', bg: 'bg-slate-100', screen: 'doc_upload', app: 'patient' as const, tag: 'Patient Service' },

    // 2. AI & Smart Healthcare
    { id: 'self_ai', category: 'ai', name: 'Self-Trained AI Clinical Interview', desc: 'Rule-based and LLM-powered adaptive questioning based on active disease', icon: Bot, color: 'text-teal-700', bg: 'bg-teal-50', screen: 'ai_chat', app: 'patient' as const, tag: 'AI & Intelligence' },
    { id: 'pain_rec', category: 'ai', name: 'Image Pain Recognition (Body Map)', desc: 'Interactive skeleton and human anatomy diagram with touch pinpoint crosshair', icon: Heart, color: 'text-rose-700', bg: 'bg-rose-50', screen: 'adaptive', app: 'patient' as const, tag: 'AI & Intelligence' },
    { id: 'ai_ocr', category: 'ai', name: 'OCR & Structured Extraction', desc: 'Transforms handwritten and printed medical documents into structured clinical data', icon: ScanLine, color: 'text-cyan-700', bg: 'bg-cyan-50', screen: 'doc_result', app: 'patient' as const, tag: 'AI & Intelligence' },
    { id: 'ai_provenance', category: 'ai', name: 'AI Provenance & Lineage', desc: 'Every data point displays exact source origin (Patient / Paper / Past Visit)', icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50', screen: 'ocr_audit', app: 'doctor' as const, tag: 'AI & Intelligence' },
    { id: 'contradiction', category: 'ai', name: 'Contradiction & Allergy Alert', desc: 'Real-time detection of conflicting statements across historical and current visits', icon: GitCompare, color: 'text-amber-700', bg: 'bg-amber-50', screen: 'clinical_summary', app: 'doctor' as const, tag: 'AI & Intelligence' },
    { id: 'red_flag', category: 'ai', name: 'Red-Flag Triaging Engine', desc: 'Automated high-priority classification for chest pain, high fever, and stroke symptoms', icon: AlertTriangle, color: 'text-rose-700', bg: 'bg-rose-50', screen: 'clinical_summary', app: 'doctor' as const, tag: 'AI & Intelligence' },
    { id: 'reconciliation', category: 'ai', name: 'Medication Reconciliation', desc: 'Cross-checks previous vs current drug regimen to prevent adverse interactions', icon: Activity, color: 'text-purple-700', bg: 'bg-purple-50', screen: 'timeline', app: 'patient' as const, tag: 'AI & Intelligence' },

    // 3. Accessibility
    { id: 'multilingual', category: 'accessibility', name: 'Multilingual UI Translation', desc: 'Consistent 3-language layer across English, हिन्दी (Hindi), and मराठी (Marathi)', icon: Globe, color: 'text-blue-700', bg: 'bg-blue-50', screen: 'language', app: 'patient' as const, tag: 'Accessibility' },
    { id: 'talkback', category: 'accessibility', name: 'Talkback & Audio Guide Player', desc: 'Natural voice synthesis instructions, speed control (0.75x-1.25x), and live soundwaves', icon: Volume2, color: 'text-teal-700', bg: 'bg-teal-50', screen: 'welcome', app: 'patient' as const, tag: 'Accessibility' },
    { id: 'touch_controls', category: 'accessibility', name: 'Senior-Friendly Touch Targets', desc: 'Large high-contrast touch cards with zero hover-dependency, suitable for kiosks', icon: Sparkles, color: 'text-amber-700', bg: 'bg-amber-50', screen: 'welcome', app: 'patient' as const, tag: 'Accessibility' },

    // 4. Doctor & Healthcare Staff
    { id: 'doc_dashboard', category: 'doctor', name: 'Physician EMR Dashboard', desc: 'Integrated clinical queue, active red flags, today\'s patient list, and triage badges', icon: Stethoscope, color: 'text-teal-700', bg: 'bg-teal-50', screen: 'queue', app: 'doctor' as const, tag: 'Doctor Portal' },
    { id: 'doc_summary', category: 'doctor', name: 'AI Clinical Case Summary', desc: 'Glanceable 30-second summary with chief complaint, vitals, history and AI notes', icon: FileCheck2, color: 'text-emerald-700', bg: 'bg-emerald-50', screen: 'clinical_summary', app: 'doctor' as const, tag: 'Doctor Portal' },
    { id: 'rx_builder', category: 'doctor', name: 'Digital Prescription Builder', desc: 'Allopathic & Ayurvedic 1-0-1 dosage calculator, timing schedules, and interaction checks', icon: FileText, color: 'text-indigo-700', bg: 'bg-indigo-50', screen: 'rx_builder', app: 'doctor' as const, tag: 'Doctor Portal' },
    { id: 'print_rx', category: 'doctor', name: 'Printable Hospital A4 Rx & PDF', desc: 'Official NABH hospital letterhead with doctor digital signature and ABDM QR code', icon: Printer, color: 'text-slate-800', bg: 'bg-slate-100', screen: 'print_rx', app: 'doctor' as const, tag: 'Doctor Portal' },
    { id: 'ayush_mode', category: 'doctor', name: 'Ayurveda Case-Sheet Assessment', desc: 'Prakriti, Vikriti, Agni, Koshtha, Ahara, and Dashavidha Pariksha documentation', icon: BookOpen, color: 'text-emerald-700', bg: 'bg-emerald-50', screen: 'ayush', app: 'doctor' as const, tag: 'Doctor Portal' },

    // 5. Integration & Interoperability
    { id: 'whatsapp', category: 'integration', name: 'WhatsApp PDF Connectivity', desc: 'Direct patient transmission of verified digital prescription PDF via WhatsApp link', icon: Share2, color: 'text-emerald-700', bg: 'bg-emerald-50', screen: 'print_rx', app: 'doctor' as const, tag: 'Integration' },
    { id: 'abdm_fhir', category: 'integration', name: 'HL7 FHIR R4 & ABDM Protocol', desc: 'ABHA Health ID M1/M2/M3 compliance, HPR validation, and longitudinal health sync', icon: Database, color: 'text-blue-700', bg: 'bg-blue-50', screen: 'clinical_summary', app: 'doctor' as const, tag: 'Integration' },
    { id: 'offline_mode', category: 'integration', name: 'Offline Mode & Local Storage', desc: 'Continues clinical intake without internet; automatically synchronizes when online', icon: WifiOff, color: 'text-amber-700', bg: 'bg-amber-50', screen: 'welcome', app: 'patient' as const, tag: 'Integration' },
    { id: 'role_access', category: 'integration', name: 'Role-Based Access Control', desc: 'Tailored permissions for Patients, Doctors, Nurses, Admins and Researchers', icon: Users, color: 'text-purple-700', bg: 'bg-purple-50', screen: 'queue', app: 'doctor' as const, tag: 'Integration' },
    { id: 'analytics', category: 'integration', name: 'OPD Analytics & Audit Trail', desc: 'Intake completion rates, average triage duration, AI correction audits, and statistics', icon: BarChart3, color: 'text-slate-800', bg: 'bg-slate-100', screen: 'trends', app: 'doctor' as const, tag: 'Integration' },
  ];

  const filteredFeatures = activeCategory === 'all'
    ? allFeatures
    : allFeatures.filter(f => f.category === activeCategory);

  const handleAction = (item: any) => {
    if (onOpenModule && ['medicine_explorer', 'first_aid_center', 'appointment_booking', 'health_guide', 'xray_viewer', 'health_reels'].includes(item.screen)) {
      onOpenModule(item.screen);
    } else {
      onNavigateToScreen(item.app || 'patient', item.screen);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6 font-['Outfit']">
      
      {/* Top Professional Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-md space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-bold shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                MediKiosk — Complete Healthcare Capability Hub
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Organized Directory of Patient Services, AI Diagnostics, Doctor EMR, and ABDM Integration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">
              28 Certified Modules
            </span>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-teal-800 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Categorized Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFeatures.map((feat) => {
          const IconComp = feat.icon;
          return (
            <div
              key={feat.id}
              onClick={() => handleAction(feat)}
              className="p-5 bg-white rounded-3xl border-2 border-slate-200 hover:border-teal-500 hover:bg-slate-50 transition-all cursor-pointer space-y-3 shadow-2xs flex flex-col justify-between group hover:scale-[1.01]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center font-bold shadow-xs`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {feat.tag}
                  </span>
                </div>
                
                <h3 className="font-black text-base text-slate-900 leading-snug group-hover:text-teal-800 transition-colors">
                  {feat.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-teal-800">
                <span>Launch Feature</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
