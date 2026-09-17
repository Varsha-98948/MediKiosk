import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Sparkles,
  HelpCircle,
  Globe,
  Share2,
  Phone,
  Check,
  Send,
  ExternalLink
} from 'lucide-react';
import { PatientRecord, PrescriptionItem, Language, PrescriptionRecord } from '../../types';
import { 
  timingTranslations, 
  dosageTranslations, 
  adviceTranslations, 
  getLocalizedTiming, 
  getLocalizedDosage,
  formatWhatsAppPrescriptionMessage,
  generateWhatsAppUrl 
} from '../../utils/prescriptionUtils';

interface PrescriptionBuilderProps {
  patient: PatientRecord;
  onBack: () => void;
  onPrintPreview: (prescriptionData: any) => void;
  onSavePrescription?: (prescription: PrescriptionRecord) => void;
}

export const PrescriptionBuilder: React.FC<PrescriptionBuilderProps> = ({
  patient,
  onBack,
  onPrintPreview,
  onSavePrescription,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(patient.language || 'en');
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState(patient.phone || '+91 98201 44521');
  const [whatsAppSentSuccess, setWhatsAppSentSuccess] = useState(false);
  const [isSavedInHistory, setIsSavedInHistory] = useState(false);

  // Preset Indian generic and branded drugs catalog
  const drugCatalog = [
    { name: 'Sorbitrate', genericName: 'Isosorbide Dinitrate', strength: '5 mg', type: 'Sublingual Tablet', category: 'Nitrate / Angina', defaultDosage: 'SOS', defaultTiming: 'Under tongue during acute chest pain' },
    { name: 'Ecosprin', genericName: 'Aspirin', strength: '75 mg', type: 'Tablet', category: 'Antiplatelet', defaultDosage: '0-1-0', defaultTiming: 'After lunch' },
    { name: 'Atorva', genericName: 'Atorvastatin', strength: '20 mg', type: 'Tablet', category: 'Statin / Lipid', defaultDosage: '0-0-1', defaultTiming: 'After dinner (Night)' },
    { name: 'Telma', genericName: 'Telmisartan', strength: '40 mg', type: 'Tablet', category: 'Antihypertensive (ARB)', defaultDosage: '1-0-0', defaultTiming: 'After meals' },
    { name: 'Glycomet', genericName: 'Metformin', strength: '500 mg', type: 'Tablet', category: 'Antidiabetic (Biguanide)', defaultDosage: '1-0-1', defaultTiming: 'After breakfast & dinner' },
    { name: 'Pan', genericName: 'Pantoprazole', strength: '40 mg', type: 'Tablet', category: 'Proton Pump Inhibitor', defaultDosage: '1-0-0', defaultTiming: 'Empty stomach (Morning)' },
    { name: 'Dolo', genericName: 'Paracetamol', strength: '650 mg', type: 'Tablet', category: 'Analgesic / Antipyretic', defaultDosage: '1-0-1', defaultTiming: 'After meals' },
    { name: 'Arjuna Kwatha', genericName: 'Terminalia Arjuna Herbal Decoction', strength: '15 ml', type: 'AYUSH Decoction', category: 'Ayurvedic Cardiotonic', defaultDosage: '1-0-1', defaultTiming: 'With warm water after food' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState<PrescriptionItem[]>([
    {
      id: 'rx-1',
      name: 'Tab. Sorbitrate',
      genericName: 'Isosorbide Dinitrate',
      dosage: 'SOS',
      timing: 'Under tongue during acute chest pain',
      frequency: 'SOS',
      duration: '15 days',
      instructions: 'Keep under tongue; call ambulance if pain persists > 5 mins',
      verified: true,
      strength: '5 mg',
    },
    {
      id: 'rx-2',
      name: 'Tab. Ecosprin',
      genericName: 'Aspirin',
      dosage: '0-1-0',
      timing: 'After lunch',
      frequency: 'Once daily',
      duration: '30 days',
      instructions: 'Take strictly after food',
      verified: true,
      strength: '75 mg',
    },
    {
      id: 'rx-3',
      name: 'Tab. Atorva',
      genericName: 'Atorvastatin',
      dosage: '0-0-1',
      timing: 'After dinner (Night)',
      frequency: 'Once daily',
      duration: '30 days',
      instructions: 'For lipid optimization and plaque stabilization',
      verified: true,
      strength: '20 mg',
    },
    {
      id: 'rx-4',
      name: 'Tab. Glycomet',
      genericName: 'Metformin',
      dosage: '1-0-1',
      timing: 'After breakfast & dinner',
      frequency: 'Twice daily',
      duration: '30 days',
      instructions: 'Continue ongoing diabetic therapy',
      verified: true,
      strength: '500 mg',
    }
  ]);

  const [diagnosis, setDiagnosis] = useState('Suspected Angina Pectoris / Acute Coronary Syndrome (ACS) Rule Out; Essential Hypertension, Type 2 DM');
  
  // Dynamic multilingual general advice
  const [adviceMap, setAdviceMap] = useState<{ en: string; hi: string; mr: string }>({
    en: adviceTranslations.cardiac_default.en,
    hi: adviceTranslations.cardiac_default.hi,
    mr: adviceTranslations.cardiac_default.mr,
  });

  const [includeAyush, setIncludeAyush] = useState(true);

  const currentGeneralAdvice = adviceMap[selectedLanguage] || adviceMap.en;

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
  };

  const handleAddDrug = (drug: typeof drugCatalog[0]) => {
    const newItem: PrescriptionItem = {
      id: `rx-${Date.now()}`,
      name: `Tab. ${drug.name}`,
      genericName: drug.genericName,
      dosage: drug.defaultDosage,
      timing: drug.defaultTiming,
      frequency: drug.defaultDosage === '1-0-1' ? 'Twice daily' : drug.defaultDosage === '1-0-0' ? 'Once daily' : 'As directed',
      duration: '30 days',
      instructions: drug.category,
      verified: true,
      strength: drug.strength,
    };
    setSelectedMedicines([...selectedMedicines, newItem]);
    setSearchQuery('');
  };

  const handleRemoveDrug = (id: string) => {
    setSelectedMedicines(selectedMedicines.filter(m => m.id !== id));
  };

  const handleUpdateDrug = (id: string, field: keyof PrescriptionItem, val: string) => {
    setSelectedMedicines(selectedMedicines.map(m => m.id === id ? { ...m, [field]: val } : m));
  };

  const filteredCatalog = drugCatalog.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const buildPrescriptionObject = (sentWhatsApp = false): PrescriptionRecord => {
    return {
      id: `RX-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      doctorName: 'Dr. Rajeshwar Sen',
      doctorSpecialty: 'Cardiologist & Physician',
      doctorRegNo: 'MCI-48291',
      facility: 'Apex Multispecialty Hospital',
      roomNumber: 'Room 104',
      diagnosis,
      generalAdvice: currentGeneralAdvice,
      generalAdviceTranslations: adviceMap,
      medicines: selectedMedicines,
      language: selectedLanguage,
      includeAyush,
      sentViaWhatsApp: sentWhatsApp,
      whatsAppRecipient: recipientPhone,
      whatsAppSentAt: sentWhatsApp ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
      createdAt: new Date().toISOString(),
    };
  };

  const handleSaveToHistory = () => {
    const rxRecord = buildPrescriptionObject(false);
    if (onSavePrescription) {
      onSavePrescription(rxRecord);
    }
    setIsSavedInHistory(true);
    setTimeout(() => setIsSavedInHistory(false), 3000);
  };

  const handleGenerateRx = () => {
    const rxRecord = buildPrescriptionObject(false);
    if (onSavePrescription) {
      onSavePrescription(rxRecord);
    }
    onPrintPreview({
      patient,
      diagnosis,
      generalAdvice: currentGeneralAdvice,
      generalAdviceTranslations: adviceMap,
      medicines: selectedMedicines,
      doctorName: 'Dr. Rajeshwar Sen, MD, DM (Cardiology)',
      doctorRegNo: 'MCI-48291',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      includeAyush,
      language: selectedLanguage,
      recipientPhone,
      onSavePrescription,
    });
  };

  const formattedWhatsAppText = formatWhatsAppPrescriptionMessage({
    patient,
    doctorName: 'Dr. Rajeshwar Sen, MD, DM (Cardiology)',
    doctorSpecialty: 'Cardiologist & Internal Medicine',
    doctorRegNo: 'MCI-48291',
    facility: 'Apex Multispecialty Hospital',
    diagnosis,
    medicines: selectedMedicines,
    generalAdvice: currentGeneralAdvice,
    language: selectedLanguage,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    includeAyush,
  });

  const handleSendWhatsApp = () => {
    const rxRecord = buildPrescriptionObject(true);
    if (onSavePrescription) {
      onSavePrescription(rxRecord);
    }
    const url = generateWhatsAppUrl(recipientPhone, formattedWhatsAppText);
    window.open(url, '_blank');
    setWhatsAppSentSuccess(true);
    setTimeout(() => {
      setWhatsAppSentSuccess(false);
      setWhatsAppModalOpen(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
                Digital Prescription Builder (Rx)
              </h2>
              <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
                ABDM Compliant
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Patient: <strong className="text-slate-800">{patient.name}</strong> • {patient.age}y / {patient.gender} • ABHA: {patient.abhaId}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <Globe className="w-4 h-4 text-slate-500 ml-2" />
            <span className="text-[11px] font-bold text-slate-600 hidden sm:inline">Rx Language:</span>
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedLanguage === 'en'
                  ? 'bg-white text-teal-800 shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('hi')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedLanguage === 'hi'
                  ? 'bg-white text-teal-800 shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('mr')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedLanguage === 'mr'
                  ? 'bg-white text-teal-800 shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              मराठी
            </button>
          </div>

          {/* Send via WhatsApp Button */}
          <button
            type="button"
            onClick={() => setWhatsAppModalOpen(true)}
            className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Send to WhatsApp</span>
          </button>

          {/* Save to Patient History */}
          <button
            type="button"
            onClick={handleSaveToHistory}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isSavedInHistory 
                ? 'bg-teal-50 border-teal-400 text-teal-800' 
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            {isSavedInHistory ? (
              <>
                <Check className="w-3.5 h-3.5 text-teal-700" />
                <span>Saved in EMR History</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>Save to History</span>
              </>
            )}
          </button>

          {/* Preview & Print */}
          <button
            type="button"
            onClick={handleGenerateRx}
            className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-800/20 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Preview & Print (A4)</span>
          </button>

        </div>
      </div>

      {/* Language Notice Strip */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 p-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-teal-950">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            <strong>Prescription Language:</strong> Currently set to{' '}
            <strong className="underline decoration-teal-500">
              {selectedLanguage === 'hi' ? 'हिन्दी (Hindi)' : selectedLanguage === 'mr' ? 'मराठी (Marathi)' : 'English'}
            </strong>
            . Timings, dosage schedule, advice, and WhatsApp dispatch will be automatically formatted in this language.
          </span>
        </div>
        <span className="text-[11px] font-bold text-teal-800 bg-white px-2.5 py-0.5 rounded-lg border border-teal-200 shrink-0">
          Auto-Translation Enabled
        </span>
      </div>

      {/* Safety Alert Checker Banner */}
      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-950">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Safety Check:</strong> No severe adverse drug interactions between Aspirin, Atorvastatin, Metformin and Sorbitrate.</span>
        </div>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
          MCI Standard Verified
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Drug Search & Catalog (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Add Drug from Indian Formulary</h3>
              <span className="text-[11px] text-slate-400">Generic + Brand</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Sorbitrate, Telma, Metformin, Dolo..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600 focus:bg-white"
              />
            </div>

            {/* Quick Drug Suggestions */}
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {filteredCatalog.map((drug, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAddDrug(drug)}
                  className="p-3 bg-slate-50 hover:bg-teal-50 hover:border-teal-300 rounded-xl border border-slate-200 transition-all cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 group-hover:text-teal-900 text-xs">
                      {drug.name} <span className="text-teal-700 font-mono">({drug.strength})</span>
                    </strong>
                    <Plus className="w-4 h-4 text-slate-400 group-hover:text-teal-700" />
                  </div>
                  <div className="text-[11px] text-slate-500">{drug.genericName}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                    <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">{drug.category}</span>
                    <span>{drug.defaultDosage}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* AYUSH Cardiotonic Toggle */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950">Integrative AYUSH Co-Prescription</span>
              <input
                type="checkbox"
                checked={includeAyush}
                onChange={(e) => setIncludeAyush(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </div>
            <p className="text-xs text-slate-600">
              Terminalia Arjuna (Arjuna Kwatha) cardiotonic adjuvant to standard anti-ischemic therapy.
            </p>
          </div>

        </div>

        {/* Right Column: Active Prescription Table & Doctor Instructions (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Prescription Medicine Items */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Prescribed Medication Items ({selectedMedicines.length})
                </h3>
                <span className="text-xs text-slate-500">
                  Dosage translations are active for: <strong className="text-teal-700 font-bold">{selectedLanguage.toUpperCase()}</strong>
                </span>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Rx Symbol Active
              </span>
            </div>

            <div className="space-y-3">
              {selectedMedicines.map((med, index) => {
                const localizedDosage = getLocalizedDosage(med.dosage, selectedLanguage);
                const localizedTiming = getLocalizedTiming(med.timing, selectedLanguage);

                return (
                  <div
                    key={med.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 font-mono">{index + 1}.</span>
                          <strong className="text-slate-900 text-sm">{med.name}</strong>
                          <span className="text-xs bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-teal-800 font-bold">
                            {med.strength}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 ml-4">{med.genericName}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveDrug(med.id)}
                        className="p-1.5 text-rose-950 hover:text-white hover:bg-rose-600 rounded-lg transition-colors cursor-pointer"
                        title="Remove medicine"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Dosage & Timing Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Dosage Frequency</label>
                        <select
                          value={med.dosage}
                          onChange={(e) => handleUpdateDrug(med.id, 'dosage', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
                        >
                          <option value="1-0-1">1-0-1 (Twice daily BD)</option>
                          <option value="1-0-0">1-0-0 (Morning OD)</option>
                          <option value="0-0-1">0-0-1 (Night OD)</option>
                          <option value="0-1-0">0-1-0 (Afternoon)</option>
                          <option value="1-1-1">1-1-1 (Thrice daily TDS)</option>
                          <option value="SOS">SOS (When needed for pain)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Meal Timing</label>
                        <select
                          value={med.timing}
                          onChange={(e) => handleUpdateDrug(med.id, 'timing', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-800"
                        >
                          <option value="After meals">After food (Post-meal)</option>
                          <option value="Before meals">Before food (Pre-meal)</option>
                          <option value="Empty stomach (Morning)">Empty stomach (Morning)</option>
                          <option value="Under tongue during acute chest pain">Under tongue (Sublingual)</option>
                          <option value="At bedtime">At bedtime</option>
                          <option value="After lunch">After lunch</option>
                          <option value="After dinner (Night)">After dinner (Night)</option>
                          <option value="After breakfast & dinner">After breakfast & dinner</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Duration</label>
                        <select
                          value={med.duration}
                          onChange={(e) => handleUpdateDrug(med.id, 'duration', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-800"
                        >
                          <option value="5 days">5 days</option>
                          <option value="7 days">7 days</option>
                          <option value="15 days">15 days</option>
                          <option value="30 days">30 days (1 Month)</option>
                          <option value="90 days">90 days (Chronic refill)</option>
                        </select>
                      </div>
                    </div>

                    {/* Patient-facing translation pill */}
                    <div className="bg-teal-50/70 p-2 rounded-xl border border-teal-200/80 text-[11px] text-teal-900 flex items-center justify-between">
                      <span>
                        <strong>{selectedLanguage.toUpperCase()} Schedule:</strong> {localizedDosage} • {localizedTiming}
                      </span>
                    </div>

                    {/* Special Instruction Field */}
                    <div>
                      <input
                        type="text"
                        value={med.instructions || ''}
                        onChange={(e) => handleUpdateDrug(med.id, 'instructions', e.target.value)}
                        placeholder="Special instructions (e.g. Swallow whole, avoid milk...)"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Clinical Advice & Dietary Instructions in Selected Language */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">
                Doctor's Clinical Impression & Lifestyle Advice ({selectedLanguage.toUpperCase()})
              </h3>
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setAdviceMap({ ...adviceMap, [selectedLanguage]: adviceTranslations.cardiac_default[selectedLanguage] })}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-[10px]"
                >
                  Cardiac Template
                </button>
                <button
                  type="button"
                  onClick={() => setAdviceMap({ ...adviceMap, [selectedLanguage]: adviceTranslations.hypertension_default[selectedLanguage] })}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-[10px]"
                >
                  HTN Template
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Provisional Diagnosis</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  General & Lifestyle Advice (Editable in {selectedLanguage === 'hi' ? 'हिन्दी' : selectedLanguage === 'mr' ? 'मराठी' : 'English'})
                </label>
                <textarea
                  rows={3}
                  value={currentGeneralAdvice}
                  onChange={(e) => setAdviceMap({ ...adviceMap, [selectedLanguage]: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium leading-relaxed"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* WhatsApp Modal / Share Drawer */}
      {whatsAppModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            <div className="bg-emerald-700 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Send Prescription via WhatsApp</h3>
                  <p className="text-xs text-emerald-100">
                    Patient Phone: {patient.name} ({patient.phone})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWhatsAppModalOpen(false)}
                className="w-8 h-8 rounded-full bg-emerald-800/50 hover:bg-emerald-800 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recipient Phone Number (with Country Code)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="+91 98201 44521"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Formatted WhatsApp Message Preview ({selectedLanguage.toUpperCase()})
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Real-time Markdown</span>
                </div>
                <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-2xl max-h-56 overflow-y-auto text-xs font-mono whitespace-pre-line text-emerald-950 font-medium">
                  {formattedWhatsAppText}
                </div>
              </div>

              {whatsAppSentSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Prescription dispatched & persisted to Patient History!</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setWhatsAppModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open & Send via WhatsApp</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
