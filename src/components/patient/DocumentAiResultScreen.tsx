import React, { useState } from 'react';
import { 
  Volume2, 
  ArrowLeft, 
  CheckCircle, 
  Edit3, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Eye,
  Check
} from 'lucide-react';
import { Language, MedicalDocument } from '../../types';
import { translations } from '../../utils/translations';
import { speakText } from '../../utils/speech';

interface DocumentAiResultScreenProps {
  language: Language;
  document: MedicalDocument;
  onConfirm: () => void;
  onEdit: () => void;
  onBack: () => void;
}

export const DocumentAiResultScreen: React.FC<DocumentAiResultScreenProps> = ({
  language,
  document,
  onConfirm,
  onEdit,
  onBack,
}) => {
  const t = translations[language];

  return (
    <div className="flex flex-col justify-between min-h-[620px] p-6 sm:p-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-teal-100 text-teal-800 px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Document Intelligence
            </span>
            <button
              type="button"
              onClick={() => speakText(t.docAiResultSubtitle, language)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200"
            >
              <Volume2 className="w-4 h-4 text-teal-600" />
              <span>{t.listen}</span>
            </button>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            {t.docAiResultTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.docAiResultSubtitle}
          </p>
        </div>
      </div>

      {/* Side-by-Side Verification Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4">
        
        {/* Left: Original Document Preview (4 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-4 flex flex-col justify-between text-white space-y-3 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-400" /> Original Paper
            </span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono">
              {document.date}
            </span>
          </div>

          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
            <img
              src={document.originalImageUrl}
              alt="Medical document original"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-semibold flex items-center gap-1">
              <Eye className="w-3 h-3" /> Traceable Source
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center">
            Facility: <strong className="text-slate-200">{document.facility}</strong>
          </div>
        </div>

        {/* Right: AI-Extracted Clinical Fields (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{document.title}</h3>
                <span className="text-xs text-slate-500">Confidence Score: {document.overallConfidence}%</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> High Confidence
              </span>
            </div>

            {/* Extracted Lab / Vitals Values */}
            {document.extractedFields && document.extractedFields.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Diagnostic Values & Abnormal Flags
                </div>
                <div className="space-y-1.5">
                  {document.extractedFields.map((field) => (
                    <div
                      key={field.id}
                      className={`p-3 rounded-xl border flex items-center justify-between text-sm transition-all ${
                        field.isAbnormal
                          ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                          : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{field.label}</span>
                          {field.isAbnormal && (
                            <span className="text-[10px] font-extrabold bg-rose-200 text-rose-800 px-1.5 py-0.5 rounded flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Abnormal
                            </span>
                          )}
                        </div>
                        {field.reference && (
                          <div className="text-xs text-slate-500">Ref: {field.reference}</div>
                        )}
                      </div>

                      <div className="text-right">
                        <span className={`font-mono font-bold text-base ${field.isAbnormal ? 'text-rose-700' : 'text-teal-800'}`}>
                          {field.value}
                        </span>
                        <div className="text-[10px] text-slate-400">Match: {field.confidence}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extracted Medicines if found */}
            {document.medicinesFound && document.medicinesFound.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Identified Active Medications
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {document.medicinesFound.map((med) => (
                    <div key={med.id} className="p-2.5 bg-teal-50/50 rounded-xl border border-teal-200 text-xs">
                      <div className="font-bold text-teal-950">{med.name} {med.strength}</div>
                      <div className="text-teal-800 font-medium">{med.frequency} • {med.timing}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Verification Disclaimer */}
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>AI extracted information — please verify and confirm for your doctor's EMR.</span>
          </div>

        </div>

      </div>

      {/* Action Controls */}
      <div className="w-full max-w-md mx-auto flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
        >
          <Edit3 className="w-4 h-4" />
          <span>{t.edit}</span>
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="flex-2 py-4 px-6 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl font-bold text-base shadow-lg shadow-teal-800/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-5 h-5" />
          <span>{t.looksCorrect}</span>
        </button>
      </div>

    </div>
  );
};
