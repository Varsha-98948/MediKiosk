import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Eye, 
  AlertTriangle, 
  FileText, 
  ShieldCheck,
  Check,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { MedicalDocument, ExtractedField } from '../../types';

interface DocumentViewerOcrAuditProps {
  document: MedicalDocument;
  onBack: () => void;
  onApproveField?: (fieldId: string) => void;
}

export const DocumentViewerOcrAudit: React.FC<DocumentViewerOcrAuditProps> = ({
  document,
  onBack,
  onApproveField,
}) => {
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(document.extractedFields[0]?.id || null);
  const [fields, setFields] = useState<ExtractedField[]>(
    (document.extractedFields || []).map((f, i) => ({
      ...f,
      evidenceBoundingBox: f.evidenceBoundingBox || {
        x: 10 + (i % 3) * 25,
        y: 25 + i * 18,
        width: 60,
        height: 12
      }
    }))
  );

  const handleVerify = (id: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, verified: !f.verified } : f));
    if (onApproveField) onApproveField(id);
  };

  const handleVerifyAll = () => {
    setFields(fields.map(f => ({ ...f, verified: true })));
  };

  const activeField = fields.find(f => f.id === activeHighlightId) || fields[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
                OCR Verification & Clinical Lineage Audit
              </h2>
              <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full border border-teal-300">
                OCR Accuracy: {document.overallConfidence}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {document.title} • {document.facility} • {document.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleVerifyAll}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify & Sign Off All Fields</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Audit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (6 Cols): Document Image Canvas with Bounding Box Overlay */}
        <div className="lg:col-span-6 bg-slate-950 rounded-3xl p-5 text-white flex flex-col justify-between space-y-4 shadow-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-400" /> Scanned Paper Artifact
            </span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono text-teal-300">
              ABDM Document ID: {document.id}
            </span>
          </div>

          {/* Scanned Image Container with Bounding Box Highlights */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 group shadow-inner">
            <img
              src={document.originalImageUrl}
              alt="Scanned original document"
              className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />

            {/* Render Bounding Boxes for Fields */}
            {fields.map((field) => {
              const isActive = field.id === activeHighlightId;
              const box = field.evidenceBoundingBox || { x: 15, y: 30, width: 70, height: 12 };
              
              return (
                <div
                  key={field.id}
                  onClick={() => setActiveHighlightId(field.id)}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                  }}
                  className={`absolute rounded-md border-2 transition-all cursor-pointer flex items-center justify-between px-2 ${
                    isActive
                      ? field.isAbnormal
                        ? 'border-rose-400 bg-rose-500/30 shadow-lg shadow-rose-500/20 ring-2 ring-rose-400'
                        : 'border-teal-400 bg-teal-500/30 shadow-lg shadow-teal-500/20 ring-2 ring-teal-400'
                      : 'border-slate-400/50 bg-slate-800/20 hover:border-teal-300 hover:bg-teal-500/10'
                  }`}
                >
                  <span className="bg-slate-900/90 text-white text-[9px] font-mono font-bold px-1 py-0.5 rounded backdrop-blur-xs">
                    {field.label}: {field.value}
                  </span>
                  <span className={`text-[9px] font-bold px-1 rounded ${
                    field.verified ? 'bg-emerald-700 text-white' : 'bg-amber-400 text-amber-950'
                  }`}>
                    {field.confidence}%
                  </span>
                </div>
              );
            })}

            <div className="absolute bottom-3 inset-x-3 bg-slate-900/90 text-white px-3 py-2 rounded-xl text-xs flex items-center justify-between border border-slate-700/80 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-teal-300">
                <Eye className="w-4 h-4" />
                <span className="font-medium text-[11px]">
                  Active Field: <strong className="text-white">{activeField?.label}</strong>
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Click region to highlight</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Source: Clinical Document AI OCR Engine</span>
            <span className="text-teal-400 font-mono text-[11px]">Audit Hash: 0x8f2a...c9e1</span>
          </div>
        </div>

        {/* Right (6 Cols): Interactive Field Verification List */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base font-['Outfit']">
                  Extracted Clinical Entities ({fields.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Select a field to highlight its OCR source bounding region
                </p>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {fields.filter(f => f.verified).length} / {fields.length} Approved
              </span>
            </div>

            {/* List of Extracted Parameters */}
            <div className="space-y-3">
              {fields.map((field) => {
                const isActive = field.id === activeHighlightId;
                
                return (
                  <div
                    key={field.id}
                    onClick={() => setActiveHighlightId(field.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2.5 ${
                      isActive
                        ? field.isAbnormal
                          ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                          : 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-100'
                        : field.isAbnormal
                          ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 text-sm font-bold">{field.label}</strong>
                          {field.isAbnormal && (
                            <span className="text-[10px] font-extrabold bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Abnormal Value
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Reference: <strong className="text-slate-700">{field.reference || 'Normal Standard'}</strong>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`font-mono text-base font-extrabold ${field.isAbnormal ? 'text-rose-700' : 'text-teal-800'}`}>
                          {field.value}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono font-semibold">
                          OCR Confidence: {field.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* Evidence Snippet & Doctor Approve Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                      <span className="italic text-slate-600 text-[11px] truncate max-w-[240px]">
                        "{field.evidenceText || `${field.label}: ${field.value}`}"
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerify(field.id);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          field.verified
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{field.verified ? 'Verified' : 'Verify Field'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
