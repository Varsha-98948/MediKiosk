'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  ScanLine, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Search, 
  Upload, 
  ZoomIn, 
  ZoomOut,
  Crosshair,
  ShieldCheck,
  RotateCw
} from 'lucide-react';
import { MedicalDocument, ExtractedField } from '../../types';

interface OcrLabReportViewerProps {
  document?: MedicalDocument;
  onApproveField?: (fieldId: string) => void;
  onUploadNewDocument?: () => void;
}

interface MockOcrBox {
  id: string;
  label: string;
  value: string;
  confidence: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  w: number;
  h: number;
  status: 'high' | 'medium' | 'low';
}

const MOCK_OCR_FIELDS: MockOcrBox[] = [
  { id: 'f1', label: 'Hemoglobin A1c (HbA1c)', value: '8.4 %', confidence: 0.98, x: 22, y: 32, w: 56, h: 5, status: 'high' },
  { id: 'f2', label: 'Fasting Plasma Glucose', value: '168 mg/dL', confidence: 0.94, x: 22, y: 39, w: 56, h: 5, status: 'high' },
  { id: 'f3', label: 'Post-Prandial Blood Sugar', value: '232 mg/dL', confidence: 0.82, x: 22, y: 46, w: 56, h: 5, status: 'medium' },
  { id: 'f4', label: 'Serum Creatinine', value: '1.28 mg/dL', confidence: 0.64, x: 22, y: 53, w: 56, h: 5, status: 'low' }, // Low confidence amber pulse
  { id: 'f5', label: 'Estimated GFR (eGFR)', value: '64 mL/min/1.73m²', confidence: 0.76, x: 22, y: 60, w: 56, h: 5, status: 'medium' },
  { id: 'f6', label: 'Total Serum Cholesterol', value: '242 mg/dL', confidence: 0.96, x: 22, y: 67, w: 56, h: 5, status: 'high' },
  { id: 'f7', label: 'Serum Triglycerides', value: '260 mg/dL', confidence: 0.61, x: 22, y: 74, w: 56, h: 5, status: 'low' }, // Low confidence amber pulse
];

export const OcrLabReportViewer: React.FC<OcrLabReportViewerProps> = ({
  document,
  onApproveField,
  onUploadNewDocument,
}) => {
  const [selectedFieldId, setSelectedFieldId] = useState<string>('f4'); // Start focused on low-confidence creatinine
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [verifiedFieldIds, setVerifiedFieldIds] = useState<string[]>(['f1', 'f2']);

  const activeBox = MOCK_OCR_FIELDS.find(b => b.id === selectedFieldId) || MOCK_OCR_FIELDS[3];

  const handleVerifyField = (fieldId: string) => {
    if (!verifiedFieldIds.includes(fieldId)) {
      setVerifiedFieldIds(prev => [...prev, fieldId]);
      if (onApproveField) onApproveField(fieldId);
    }
  };

  const getConfidenceBadge = (confidence: number, status: 'high' | 'medium' | 'low') => {
    if (status === 'high') {
      return (
        <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {Math.round(confidence * 100)}% High
        </span>
      );
    }
    if (status === 'medium') {
      return (
        <span className="text-[10px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          {Math.round(confidence * 100)}% Medium
        </span>
      );
    }
    return (
      <span className="text-[10px] font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded border border-amber-400 animate-amber-pulse">
        {Math.round(confidence * 100)}% Amber Pulse (Review)
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-7 font-['Outfit']">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C4D]"></span>
            <h3 className="text-xl font-black text-slate-900">
              Interactive OCR Lab Report & Confidence Heatmap
            </h3>
            <span className="text-[10px] font-black bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
              Amber Pulse Assisted
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Click any extracted parameter to synchronize and focus the corresponding bounding box on the original document.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onUploadNewDocument && (
            <button
              type="button"
              onClick={onUploadNewDocument}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Scanned Report</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Simulated Document Canvas, Right Extracted Field Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Document View with Bounding Boxes */}
        <div className="lg:col-span-7 bg-[#FAFBF9] rounded-2xl border border-slate-200/90 p-4 space-y-3">
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 pb-2 border-b border-slate-200">
            <span className="flex items-center gap-1.5 text-slate-900 font-black">
              <ScanLine className="w-4 h-4 text-[#0D5C4D]" />
              Scanned Lab Document: Apex Pathology Center #L-4921
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))}
                className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono w-10 text-center">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Document Simulated Sheet Container */}
          <div className="w-full bg-white border border-slate-300 rounded-xl shadow-inner min-h-[460px] p-6 relative overflow-hidden select-none"
               style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}>
            
            {/* Sheet Header */}
            <div className="border-b-2 border-slate-800 pb-3 mb-4 flex justify-between items-start text-slate-800">
              <div>
                <div className="font-black text-sm uppercase tracking-wide">Apex Diagnostic & Research Laboratory</div>
                <div className="text-[10px] text-slate-500">NABL Accredited • ISO 15189 Certified • New Delhi</div>
              </div>
              <div className="text-right text-[10px]">
                <div>Date: <strong>06-Sep-2026</strong></div>
                <div>Patient: <strong>Devendra Patel (54M)</strong></div>
              </div>
            </div>

            {/* Document Body Lines */}
            <div className="space-y-4 text-xs font-mono text-slate-700">
              <div className="text-[11px] font-black border-b border-slate-200 pb-1 uppercase">
                Biochemistry & Glycemic Profile
              </div>

              {/* Render Simulated Document Rows with Exact Position Overlays */}
              <div className="space-y-3 pt-2 text-[11px]">
                {MOCK_OCR_FIELDS.map((box) => {
                  const isSelected = box.id === selectedFieldId;
                  const isVerified = verifiedFieldIds.includes(box.id);
                  return (
                    <div
                      key={box.id}
                      onClick={() => setSelectedFieldId(box.id)}
                      className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between relative ${
                        isSelected
                          ? 'ring-2 ring-[#0D5C4D] bg-[#EBF3EF]/60 border-[#0D5C4D] font-black'
                          : box.status === 'low'
                          ? 'bg-amber-50/60 border-amber-300 animate-amber-pulse'
                          : 'border-transparent hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        <span>{box.label}</span>
                      </div>
                      <span className="font-black text-slate-900">{box.value}</span>

                      {/* Amber Pulse Indicator on Low Confidence */}
                      {box.status === 'low' && !isVerified && (
                        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-amber-500 border border-white animate-ping"></span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-between text-[10px] text-slate-400">
                <span>Verified by Senior Biochemist Dr. S. K. Rastogi</span>
                <span>Signature: [DIGITALLY SIGNED JWS]</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Extracted Values & Doctor Verification Table */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="space-y-1">
            <span className="text-xs font-black text-[#0D5C4D] uppercase tracking-wider bg-[#EBF3EF] px-2.5 py-0.5 rounded-full border border-[#D1E4DB]">
              Confidence Breakdown
            </span>
            <h4 className="text-base font-black text-slate-900">
              Extracted Parameters & Heatmap
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Green = High confidence (&gt;90%). Amber = Needs review (&lt;70%). Click a row to verify and anchor into longitudinal EMR.
            </p>
          </div>

          {/* Field List */}
          <div className="space-y-2">
            {MOCK_OCR_FIELDS.map((field) => {
              const isSelected = field.id === selectedFieldId;
              const isVerified = verifiedFieldIds.includes(field.id);
              return (
                <div
                  key={field.id}
                  onClick={() => setSelectedFieldId(field.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'border-[#0D5C4D] bg-[#FAFBF9] shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-slate-900">{field.label}</span>
                    {getConfidenceBadge(field.confidence, field.status)}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm font-black text-[#0D5C4D] font-mono">
                      {field.value}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerifyField(field.id);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                        isVerified
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-[#0D5C4D] hover:bg-[#0F4C42] text-white shadow-2xs'
                      }`}
                    >
                      {isVerified ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified</span>
                        </>
                      ) : (
                        <span>Verify ✓</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Field Focus Details */}
          <div className="p-4 bg-[#FAFBF9] rounded-2xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-800">
              Active Focus: <strong>{activeBox.label} ({activeBox.value})</strong>
            </div>
            <p className="text-slate-500 leading-snug">
              Bounding Box coordinates: X: {activeBox.x}%, Y: {activeBox.y}%. OCR engine raw acoustic/optical match verified.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
