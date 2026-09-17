'use client';

import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  ShieldCheck, 
  Heart,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Language } from '../../types';

interface MedicineItem {
  id: string;
  brandName: string;
  genericName: string;
  category: 'allopathic' | 'ayush';
  dosageForm: string;
  strength: string;
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  schedule: string;
  ayushProperties?: {
    rasa: string;
    virya: string;
    doshaEffect: string;
  };
}

const MEDICINE_CATALOG: MedicineItem[] = [
  {
    id: 'med-01',
    brandName: 'Glycomet-GP 1/500',
    genericName: 'Metformin Hydrochloride (500mg) + Glimepiride (1mg)',
    category: 'allopathic',
    dosageForm: 'Tablet',
    strength: '500mg / 1mg',
    indications: ['Type 2 Diabetes Mellitus', 'Insulin Resistance'],
    contraindications: ['Severe Renal Impairment (eGFR < 30)', 'Ketoacidosis', 'Severe Hepatic Impairment'],
    sideEffects: ['Hypoglycemia risk', 'Mild GI disturbance', 'Metallic taste'],
    schedule: 'Schedule H (Prescription Only)',
  },
  {
    id: 'med-02',
    brandName: 'Telma-H',
    genericName: 'Telmisartan (40mg) + Hydrochlorothiazide (12.5mg)',
    category: 'allopathic',
    dosageForm: 'Tablet',
    strength: '40mg / 12.5mg',
    indications: ['Essential Hypertension', 'Cardiovascular Risk Reduction'],
    contraindications: ['Pregnancy (2nd/3rd trimester)', 'Biliary Obstructive Disorders', 'Anuria'],
    sideEffects: ['Dizziness', 'Mild hyperkalemia', 'Fatigue'],
    schedule: 'Schedule H',
  },
  {
    id: 'med-03',
    brandName: 'Arjuna Churna',
    genericName: 'Terminalia Arjuna Bark Extract',
    category: 'ayush',
    dosageForm: 'Powder / Decoction',
    strength: '3g with warm milk/water',
    indications: ['Hridroga (Cardioprotection)', 'Mild Dyslipidemia', 'Vascular Tone Support'],
    contraindications: ['Concurrent high-dose anticoagulants without monitoring'],
    sideEffects: ['Safe when taken in prescribed dose; mild astringency'],
    schedule: 'Classical Ayurvedic Formulary',
    ayushProperties: {
      rasa: 'Kashaya (Astringent)',
      virya: 'Sheeta (Cooling)',
      doshaEffect: 'Pacifies Pitta and Kapha',
    },
  },
  {
    id: 'med-04',
    brandName: 'Ashwagandha Rasayana',
    genericName: 'Withania Somnifera Root Extract',
    category: 'ayush',
    dosageForm: 'Capsule / Leham',
    strength: '500mg twice daily',
    indications: ['Rasayana (Adaptogen)', 'Nervous Exhaustion', 'Anxiety & Sleep Support', 'Immune Tone'],
    contraindications: ['Acute Gastric Ulceration', 'Autoimmune flare-up without supervision'],
    sideEffects: ['Mild sedation if taken in high dose'],
    schedule: 'Ayurvedic Pharmacopoeia of India',
    ayushProperties: {
      rasa: 'Tikta, Kashaya, Madhura',
      virya: 'Ushna (Heating)',
      doshaEffect: 'Pacifies Vata and Kapha',
    },
  },
  {
    id: 'med-05',
    brandName: 'Augmentin 625 Duo',
    genericName: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
    category: 'allopathic',
    dosageForm: 'Film-Coated Tablet',
    strength: '625mg',
    indications: ['Lower Respiratory Tract Infections', 'ENT Infections', 'Skin & Soft Tissue Infections'],
    contraindications: ['Penicillin/Beta-lactam Allergy', 'Previous Amoxicillin-associated Jaundice'],
    sideEffects: ['Diarrhea', 'Nausea', 'Skin rash'],
    schedule: 'Schedule H1',
  },
  {
    id: 'med-06',
    brandName: 'Triphala Guggulu',
    genericName: 'Haritaki, Bibhitaki, Amalaki + Commiphora Mukul',
    category: 'ayush',
    dosageForm: 'Tablet (Vati)',
    strength: '2 tablets (500mg each) twice daily',
    indications: ['Lekhana (Lipid Scraping)', 'Joint Inflammation', 'Digestive Regularity', 'Metabolic Sluggishness'],
    contraindications: ['Active Bleeding Disorders', 'Severe Diarrhea'],
    sideEffects: ['Well tolerated; mild laxative effect initially'],
    schedule: 'Classical Ayurvedic Formulary',
    ayushProperties: {
      rasa: 'Pancharasa (Predominantly Kashaya/Tikta)',
      virya: 'Ushna',
      doshaEffect: 'Tridosha balancing (Special Vata-Kapha action)',
    },
  },
];

interface MedicineExplorerProps {
  language?: Language;
  onBack?: () => void;
  onSelectForPrescription?: (med: MedicineItem) => void;
}

export const MedicineExplorer: React.FC<MedicineExplorerProps> = ({
  language = 'en',
  onBack,
  onSelectForPrescription,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'allopathic' | 'ayush'>('all');
  const [selectedMed, setSelectedMed] = useState<MedicineItem>(MEDICINE_CATALOG[0]);

  const filteredMedicines = MEDICINE_CATALOG.filter((med) => {
    const matchesSearch = 
      med.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.indications.some((ind) => ind.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || med.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 font-bold">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
              <span>National Formulary & Drug Explorer</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                Allopathy + AYUSH
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Formulary indications, contraindications, dosage forms & Ayurvedic pharmacological properties
            </p>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← Back to Overview
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by brand name, generic molecule, or indication (e.g. Metformin, Hypertension, Arjuna)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              categoryFilter === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Formularies
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('allopathic')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              categoryFilter === 'allopathic' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Allopathic Rx
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('ayush')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              categoryFilter === 'ayush' ? 'bg-white text-emerald-800 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AYUSH Herbs
          </button>
        </div>
      </div>

      {/* Grid Layout: List on Left, Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
          {filteredMedicines.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No matching medications found.
            </div>
          ) : (
            filteredMedicines.map((med) => {
              const isSelected = selectedMed.id === med.id;
              return (
                <div
                  key={med.id}
                  onClick={() => setSelectedMed(med)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/60 border-teal-600 shadow-xs ring-1 ring-teal-600'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{med.brandName}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                          med.category === 'ayush' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {med.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{med.genericName}</p>
                    </div>
                    <span className="text-xs text-slate-400 font-mono shrink-0">{med.strength}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {med.indications.slice(0, 2).map((ind, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Card */}
        <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-5">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit']">
                  {selectedMed.brandName}
                </h3>
                <span className={`text-xs px-2.5 py-0.5 rounded font-bold uppercase ${
                  selectedMed.category === 'ayush' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedMed.category}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">{selectedMed.genericName}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                <span>Form: <strong className="text-slate-800">{selectedMed.dosageForm}</strong></span>
                <span>•</span>
                <span>Strength: <strong className="text-slate-800">{selectedMed.strength}</strong></span>
                <span>•</span>
                <span className="font-mono text-teal-700">{selectedMed.schedule}</span>
              </div>
            </div>

            {onSelectForPrescription && (
              <button
                onClick={() => onSelectForPrescription(selectedMed)}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <span>Add to Rx</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* AYUSH Specific Pharmacodynamics if applicable */}
          {selectedMed.ayushProperties && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-2">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Ayurvedic Dravyaguna Formulation Properties
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs text-emerald-950">
                <div>
                  <span className="text-emerald-700 block text-[11px]">Rasa (Taste):</span>
                  <strong>{selectedMed.ayushProperties.rasa}</strong>
                </div>
                <div>
                  <span className="text-emerald-700 block text-[11px]">Virya (Potency):</span>
                  <strong>{selectedMed.ayushProperties.virya}</strong>
                </div>
                <div>
                  <span className="text-emerald-700 block text-[11px]">Dosha Karma:</span>
                  <strong>{selectedMed.ayushProperties.doshaEffect}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Clinical Indications */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              Therapeutic Indications
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedMed.indications.map((ind, i) => (
                <span key={i} className="text-xs bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg font-medium">
                  {ind}
                </span>
              ))}
            </div>
          </div>

          {/* Contraindications */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Contraindications & Safety Warnings
            </h4>
            <ul className="space-y-1">
              {selectedMed.contraindications.map((contra, i) => (
                <li key={i} className="text-xs text-rose-900 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-lg">
                  • {contra}
                </li>
              ))}
            </ul>
          </div>

          {/* Potential Side Effects */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-500" />
              Observed Side Effects
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedMed.sideEffects.map((se, i) => (
                <span key={i} className="text-xs bg-slate-200/70 text-slate-700 px-2.5 py-0.5 rounded-md">
                  {se}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
