'use client';

import React, { useState } from 'react';
import { 
  Printer, 
  ArrowLeft, 
  Download, 
  HeartPulse, 
  ShieldCheck, 
  QrCode, 
  Share2, 
  CheckCircle2, 
  FileText,
  Globe,
  Phone,
  Send,
  Check,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { PatientRecord, PrescriptionItem, Language, PrescriptionRecord } from '../../types';
import { 
  getLocalizedTiming, 
  getLocalizedDosage, 
  formatWhatsAppPrescriptionMessage, 
  generateWhatsAppUrl,
  adviceTranslations 
} from '../../utils/prescriptionUtils';

interface DoctorPrintPrescriptionProps {
  prescriptionData: {
    patient: PatientRecord;
    diagnosis: string;
    generalAdvice: string;
    generalAdviceTranslations?: { en: string; hi: string; mr: string };
    medicines: PrescriptionItem[];
    doctorName: string;
    doctorRegNo: string;
    date: string;
    includeAyush?: boolean;
    language?: Language;
    recipientPhone?: string;
    onSavePrescription?: (prescription: PrescriptionRecord) => void;
  };
  onBack: () => void;
  onSavePrescription?: (prescription: PrescriptionRecord) => void;
}

export const DoctorPrintPrescription: React.FC<DoctorPrintPrescriptionProps> = ({
  prescriptionData,
  onBack,
}) => {
  const { 
    patient, 
    diagnosis, 
    generalAdvice, 
    generalAdviceTranslations,
    medicines, 
    doctorName, 
    doctorRegNo, 
    date, 
    includeAyush,
    language: initialLanguage = 'en',
    recipientPhone: initialPhone,
    onSavePrescription
  } = prescriptionData;

  const [currentLang, setCurrentLang] = useState<Language>(initialLanguage);
  const [recipientPhone, setRecipientPhone] = useState(initialPhone || patient.phone || '+91 98201 44521');
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [whatsAppSuccess, setWhatsAppSuccess] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const displayAdvice = generalAdviceTranslations 
    ? (generalAdviceTranslations[currentLang] || generalAdviceTranslations.en)
    : generalAdvice;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    // Simulate generation and trigger browser native print / PDF export
    setTimeout(() => {
      setIsGeneratingPdf(false);
      window.print();
    }, 400);
  };

  const handleSaveToHistory = (viaWhatsApp = false) => {
    if (onSavePrescription) {
      const rxRecord: PrescriptionRecord = {
        id: `RX-${Date.now()}`,
        date,
        doctorName,
        doctorSpecialty: 'Cardiologist & Physician',
        doctorRegNo,
        facility: 'Apex Multispecialty Hospital',
        diagnosis,
        generalAdvice: displayAdvice,
        generalAdviceTranslations: generalAdviceTranslations || { en: generalAdvice, hi: generalAdvice, mr: generalAdvice },
        medicines,
        language: currentLang,
        includeAyush,
        sentViaWhatsApp: viaWhatsApp,
        whatsAppRecipient: recipientPhone,
        whatsAppSentAt: viaWhatsApp ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
        createdAt: new Date().toISOString(),
      };
      onSavePrescription(rxRecord);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const formattedWhatsAppText = formatWhatsAppPrescriptionMessage({
    patient,
    doctorName,
    doctorSpecialty: 'Cardiologist & Internal Medicine',
    doctorRegNo,
    facility: 'Apex Multispecialty Hospital',
    diagnosis,
    medicines,
    generalAdvice: displayAdvice,
    language: currentLang,
    date,
    includeAyush,
  });

  const handleSendWhatsApp = () => {
    handleSaveToHistory(true);
    
    // Construct rich PDF formatted WhatsApp message
    const rxId = `RX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const pdfUrl = `https://medikiosk.health/rx-download/${rxId}.pdf`;
    
    const pdfFormattedMessage = `🏥 *APEX MULTISPECIALTY HOSPITAL & RESEARCH INSTITUTE*
📋 *ABDM Verified Digital Prescription (PDF Format)*
═════════════════════════════════
👤 *Patient:* ${patient.name} (${patient.age} Yrs, ${patient.gender === 'male' ? 'Male' : 'Female'})
🆔 *ABHA ID:* ${patient.abhaId}
👨‍⚕️ *Consultant:* ${doctorName} (MCI Reg: ${doctorRegNo})
📅 *Date:* ${date} | Token #${patient.tokenNumber}

📄 *DOWNLOAD OFFICIAL MEDICAL PDF:*
🔗 ${pdfUrl}

🔍 *DIAGNOSIS:*
${diagnosis}

💊 *MEDICATION SCHEDULE (${currentLang.toUpperCase()}):*
${medicines.map((m, i) => `${i + 1}. *${m.name}* (${m.strength})\n   Dosage: ${m.dosage} | ${getLocalizedTiming(m.timing, currentLang)} | ${m.duration}`).join('\n')}
${includeAyush ? `\n🌿 *AYUSH ADJUVANT:* Ayur. Arjuna Kwatha (15ml) — 1-0-1 After meals (30 days)` : ''}

🩺 *DOCTOR ADVICE:*
${displayAdvice}

═════════════════════════════════
🔒 *ABDM HPR Encrypted • Digitally Signed by ${doctorName}*
🏥 *Emergency OPD Helpline:* 011-2659-4000`;

    const url = generateWhatsAppUrl(recipientPhone, pdfFormattedMessage);
    window.open(url, '_blank');
    setWhatsAppSuccess(true);
    setTimeout(() => {
      setWhatsAppSuccess(false);
      setWhatsAppModalOpen(false);
    }, 2500);
  };

  const isHi = currentLang === 'hi';
  const isMr = currentLang === 'mr';

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-['Outfit']">
      
      {/* Top Action Toolbar (Hidden during print) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-md print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-2xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Prescription</span>
        </button>

        <div className="flex items-center gap-2.5 flex-wrap">
          
          {/* Print Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
            <button
              type="button"
              onClick={() => setCurrentLang('en')}
              className={`px-2.5 py-1 text-xs font-black rounded-xl transition-all cursor-pointer ${
                currentLang === 'en' ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setCurrentLang('hi')}
              className={`px-2.5 py-1 text-xs font-black rounded-xl transition-all cursor-pointer ${
                currentLang === 'hi' ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setCurrentLang('mr')}
              className={`px-2.5 py-1 text-xs font-black rounded-xl transition-all cursor-pointer ${
                currentLang === 'mr' ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              मराठी
            </button>
          </div>

          {/* WhatsApp Share PDF Button */}
          <button
            type="button"
            onClick={() => setWhatsAppModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp PDF</span>
          </button>

          {/* Download Official PDF */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 rounded-2xl text-xs font-black flex items-center gap-2 shadow-md transition-all cursor-pointer border border-cyan-500/30"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          {/* Save to History Button */}
          <button
            type="button"
            onClick={() => handleSaveToHistory(false)}
            className={`px-3.5 py-2.5 text-xs font-black rounded-2xl flex items-center gap-1.5 border transition-all cursor-pointer ${
              savedSuccess 
                ? 'bg-teal-50 border-teal-400 text-teal-800' 
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-teal-700" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Save EMR</span>
              </>
            )}
          </button>

          {/* Print A4 */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print (A4)</span>
          </button>
        </div>
      </div>

      {/* Standard Hospital A4 Prescription Document */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-slate-200 shadow-xl text-slate-900 space-y-6 print:border-none print:shadow-none print:p-0 print:m-0">
        
        {/* Hospital Letterhead Header */}
        <div className="flex items-start justify-between pb-6 border-b-2 border-slate-900">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-800 to-cyan-700 text-white flex items-center justify-center font-bold text-2xl print:text-black print:bg-slate-200 shadow-md">
              <HeartPulse className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-teal-950 print:text-black">
                APEX MULTISPECIALTY HOSPITAL & RESEARCH INSTITUTE
              </h1>
              <p className="text-xs font-bold text-slate-600 mt-0.5">
                Department of Cardiology & Internal Medicine • ABHA Integrated OPD Block
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                NABH & ABDM Level-3 Accredited • 24x7 Emergency • Tel: 011-2659-4000
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-600">
            <strong className="text-slate-900 text-base block font-black">{doctorName}</strong>
            <span className="font-bold">MCI Reg. No: <strong>{doctorRegNo}</strong></span>
            <div className="text-[11px] text-slate-500 mt-1">Room 104 • OPD Block A</div>
            <div className="text-[10px] font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full mt-1 border border-teal-200 print:hidden inline-block">
              Language: {currentLang.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Patient Demographics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block font-semibold">
              {isHi ? 'रोगी का नाम (Patient):' : isMr ? 'रुग्णाचे नाव (Patient):' : 'Patient Name:'}
            </span>
            <strong className="text-slate-900 text-sm font-black">{patient.name}</strong>
          </div>
          <div>
            <span className="text-slate-500 block font-semibold">
              {isHi ? 'आयु / लिंग (Age/Gender):' : isMr ? 'वय / लिंग (Age/Gender):' : 'Age / Gender:'}
            </span>
            <strong className="text-slate-900 text-sm font-black">{patient.age} Yrs / {patient.gender === 'male' ? 'Male' : 'Female'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block font-semibold">
              {isHi ? 'दिनांक / टोकन:' : isMr ? 'तारीख / टोकन:' : 'Date / Token:'}
            </span>
            <strong className="text-slate-900 text-sm font-black">{date} (Token #{patient.tokenNumber})</strong>
          </div>
          <div>
            <span className="text-slate-500 block font-semibold">ABHA ID / Mobile:</span>
            <strong className="text-slate-900 text-sm font-mono font-black">{patient.abhaId}</strong>
            <span className="text-[11px] text-slate-500 block">{patient.phone}</span>
          </div>
        </div>

        {/* Clinical Vitals & Diagnosis */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-4 text-xs font-bold bg-teal-50/70 p-3 rounded-2xl border border-teal-200 text-teal-950">
            <span>BP: <strong>150/95 mmHg</strong></span>
            <span>Pulse: <strong>88 bpm</strong></span>
            <span>SpO2: <strong>97%</strong></span>
            <span>Blood Sugar: <strong>126 mg/dL</strong></span>
            <span>HbA1c: <strong>7.1%</strong></span>
          </div>

          <div className="text-xs">
            <span className="font-black text-slate-500 uppercase tracking-wider block mb-0.5">
              {isHi ? 'चिकित्सकीय निदान (Clinical Diagnosis):' : isMr ? 'वैद्यकीय निदान (Clinical Diagnosis):' : 'Clinical Diagnosis:'}
            </span>
            <p className="font-black text-base text-slate-900">{diagnosis}</p>
          </div>
        </div>

        {/* The Rx Section & Prescription Table */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif italic font-black text-3xl text-teal-900 print:text-black">℞</span>
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                {isHi ? 'निर्धारित औषधियां (Prescribed Medications)' : isMr ? 'औषधांचे वेळापत्रक (Prescription)' : 'Medical Prescription'}
              </span>
            </div>
            <span className="text-[11px] text-teal-800 bg-teal-50 font-black px-3 py-1 rounded-full border border-teal-200">
              Schedule: {currentLang === 'hi' ? 'हिन्दी' : currentLang === 'mr' ? 'मराठी' : 'English'}
            </span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900 text-slate-800 font-black">
                <th className="py-2.5 w-8">#</th>
                <th className="py-2.5">
                  {isHi ? 'दवा का नाम व संघटन' : isMr ? 'औषधाचे नाव व प्रमाण' : 'Medicine Name & Strength'}
                </th>
                <th className="py-2.5 text-center">
                  {isHi ? 'मात्रा (Dosage)' : isMr ? 'प्रमाण (Dosage)' : 'Dosage (M-A-N)'}
                </th>
                <th className="py-2.5 text-center">
                  {isHi ? 'समय (Timing)' : isMr ? 'वेळ (Timing)' : 'Timing'}
                </th>
                <th className="py-2.5 text-center">
                  {isHi ? 'अवधि' : isMr ? 'कालावधी' : 'Duration'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {medicines.map((med, idx) => {
                const locDosage = getLocalizedDosage(med.dosage, currentLang);
                const locTiming = getLocalizedTiming(med.timing, currentLang);

                return (
                  <tr key={med.id} className="text-slate-900">
                    <td className="py-3 font-mono font-bold text-slate-400">{idx + 1}.</td>
                    <td className="py-3">
                      <div className="font-black text-sm text-slate-950">{med.name} ({med.strength})</div>
                      <div className="text-[11px] text-slate-500 font-normal">{med.genericName}</div>
                      {med.instructions && (
                        <div className="text-[11px] text-teal-800 italic mt-0.5 font-bold">Note: {med.instructions}</div>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      <div className="font-mono font-black text-teal-900 text-sm">{med.dosage}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{locDosage}</div>
                    </td>
                    <td className="py-3 text-center">
                      <div className="text-slate-800 font-bold">{locTiming}</div>
                    </td>
                    <td className="py-3 text-center text-slate-700 font-mono font-bold">
                      {med.duration}
                    </td>
                  </tr>
                );
              })}

              {includeAyush && (
                <tr className="text-emerald-950 bg-emerald-50/50">
                  <td className="py-3 font-mono font-bold text-slate-400">{medicines.length + 1}.</td>
                  <td className="py-3">
                    <div className="font-black text-sm text-emerald-950">
                      {isHi ? 'आयुष अर्जुन क्वाथ (15ml)' : isMr ? 'आयुष अर्जुन काढा (15ml)' : 'Ayur. Arjuna Kwatha Decoction (15ml)'}
                    </div>
                    <div className="text-[11px] text-slate-500">Terminalia Arjuna Standardized Extract</div>
                    <div className="text-[11px] text-emerald-800 italic mt-0.5 font-bold">
                      {isHi ? 'हृदय टॉनिक • 15ml गुनगुने पानी के साथ' : isMr ? 'हृदय स्वास्थ्य • १५ml कोमट पाण्यासोबत' : 'Cardiotonic adjuvant • 15ml with warm water'}
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <div className="font-mono font-bold text-emerald-900 text-sm">1-0-1</div>
                    <div className="text-[10px] text-emerald-800">
                      {isHi ? 'सुबह 1 - रात 1' : isMr ? 'सकाळी 1 - रात्री 1' : 'Twice daily'}
                    </div>
                  </td>
                  <td className="py-3 text-center font-bold text-slate-800">
                    {isHi ? 'भोजन के बाद' : isMr ? 'जेवणानंतर' : 'After meals'}
                  </td>
                  <td className="py-3 text-center text-slate-700 font-mono font-bold">30 days</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* General Advice & Lifestyle Instructions */}
        <div className="space-y-2 pt-4 border-t border-slate-200 text-xs">
          <span className="font-black text-slate-700 uppercase tracking-wider block">
            {isHi ? 'डॉक्टर की सलाह एवं सावधानियां:' : isMr ? 'डॉक्टरांचा सल्ला व आहार सूचना:' : "Doctor's Advice & Lifestyle Instructions:"}
          </span>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 whitespace-pre-line leading-relaxed font-bold">
            {displayAdvice}
          </div>
        </div>

        {/* ABDM QR Code & Digital Signature */}
        <div className="pt-8 flex items-end justify-between border-t-2 border-slate-900 text-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 bg-slate-100 p-1.5 rounded-2xl border border-slate-300 flex items-center justify-center shadow-xs">
              <QrCode className="w-12 h-12 text-slate-900" />
            </div>
            <div>
              <span className="font-black text-slate-900 block text-xs">ABDM Digital Rx ID: #RX-2026-9481</span>
              <span className="text-[11px] text-slate-500 font-medium">Scan via ABHA App / Aarogya Setu for Verified Refill</span>
              <span className="text-[10px] text-emerald-700 block font-bold mt-0.5">
                WhatsApp Dispatch: {recipientPhone}
              </span>
            </div>
          </div>

          <div className="text-right space-y-6">
            <div className="font-serif italic text-lg text-slate-900 font-black border-b border-dashed border-slate-400 pb-1">
              Rajeshwar Sen
            </div>
            <div>
              <strong className="block text-slate-900 text-xs font-black">{doctorName}</strong>
              <span className="text-[11px] text-slate-500 font-medium">Consultant Cardiologist • MCI Reg: {doctorRegNo}</span>
            </div>
          </div>
        </div>

      </div>

      {/* WhatsApp Modal with PDF Attachment Format */}
      {whatsAppModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-['Outfit']">
            
            <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-800 flex items-center justify-center shadow-inner">
                  <Share2 className="w-6 h-6 text-emerald-200" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">Send Prescription PDF via WhatsApp</h3>
                  <p className="text-xs text-emerald-100 font-medium">
                    Patient: {patient.name} ({patient.phone})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWhatsAppModalOpen(false)}
                className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              
              {/* PDF Document Attachment Card Preview */}
              <div className="p-3.5 bg-emerald-50 rounded-2xl border-2 border-emerald-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                    PDF
                  </div>
                  <div>
                    <span className="text-xs font-black text-emerald-950 block">
                      Prescription_RX-2026-9481_{patient.name.replace(/\s+/g, '_')}.pdf
                    </span>
                    <span className="text-[10px] text-emerald-700 font-medium">
                      Official A4 Medical Document • ABDM Certified (148 KB)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="p-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer"
                  title="Download copy"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  Recipient WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="+91 98201 44521"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-black text-slate-700">
                    WhatsApp Message Preview with Direct PDF Link
                  </label>
                  <span className="text-[10px] text-emerald-700 font-bold font-mono">PDF Included</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl max-h-44 overflow-y-auto text-xs font-mono whitespace-pre-line text-slate-800 font-medium">
                  {`🏥 APEX HOSPITAL — DIGITAL PRESCRIPTION PDF
📋 Rx ID: RX-2026-9481 | ABDM Verified
👤 Patient: ${patient.name}
📄 Download Full Official PDF: https://medikiosk.health/rx-download/RX-2026-9481.pdf
💊 Prescribed Medicines: ${medicines.map(m => m.name).join(', ')}`}
                </div>
              </div>

              {whatsAppSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Prescription recorded in EMR and WhatsApp opened with PDF link!</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setWhatsAppModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-black cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send PDF on WhatsApp</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
