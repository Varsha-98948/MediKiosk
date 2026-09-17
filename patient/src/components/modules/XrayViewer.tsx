'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Eye, 
  Layers, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { Language } from '../../types';

interface XrayStudy {
  id: string;
  modality: 'Chest X-Ray PA' | 'Lumbar Spine Lateral' | 'CT Brain Non-Contrast';
  patientName: string;
  date: string;
  imageUrl: string;
  aiFindings: {
    label: string;
    confidence: number;
    severity: 'normal' | 'observation' | 'urgent';
    box: { x: number; y: number; w: number; h: number };
    clinicalImpression: string;
  }[];
  radiologistNotes: string;
}

const SAMPLE_STUDIES: XrayStudy[] = [
  {
    id: 'xray-01',
    modality: 'Chest X-Ray PA',
    patientName: 'Ramesh Patel (58M)',
    date: '24 Aug 2026',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    aiFindings: [
      {
        label: 'Cardiomegaly (CTR > 0.55)',
        confidence: 94,
        severity: 'observation',
        box: { x: 35, y: 40, w: 30, h: 35 },
        clinicalImpression: 'Enlarged cardiac silhouette consistent with chronic hypertensive heart disease.',
      },
      {
        label: 'Clear Costophrenic Angles',
        confidence: 98,
        severity: 'normal',
        box: { x: 20, y: 70, w: 60, h: 20 },
        clinicalImpression: 'No pleural effusion or active basal consolidation observed.',
      },
    ],
    radiologistNotes: 'Lung fields are clear of focal consolidation or pneumothorax. Cardiomegaly noted. Advised clinical correlation with 2D Echocardiogram.',
  },
  {
    id: 'xray-02',
    modality: 'Lumbar Spine Lateral',
    patientName: 'Sunita Deshmukh (46F)',
    date: '18 Aug 2026',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    aiFindings: [
      {
        label: 'L4-L5 Disc Space Narrowing',
        confidence: 91,
        severity: 'observation',
        box: { x: 40, y: 45, w: 25, h: 25 },
        clinicalImpression: 'Degenerative disc changes at L4-L5 level with mild anterior osteophytosis.',
      },
    ],
    radiologistNotes: 'Mild lumbar lordosis reduction. No acute fracture or dislocation. Correlate with SLR test and physiotherapy assessment.',
  },
];

interface XrayViewerProps {
  language?: Language;
  onBack?: () => void;
}

export const XrayViewer: React.FC<XrayViewerProps> = ({
  language = 'en',
  onBack,
}) => {
  const [selectedStudy, setSelectedStudy] = useState<XrayStudy>(SAMPLE_STUDIES[0]);
  const [isInverted, setIsInverted] = useState(true);
  const [showAiBoxes, setShowAiBoxes] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-['Outfit'] flex items-center gap-2">
              <span>PACS & Radiology AI X-Ray Viewer</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-wide">
                DICOM / AI Vision
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              High-resolution radiograph inspection with AI anatomical segmentation and automated report extraction
            </p>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800"
          >
            ← Back to Overview
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Imaging Viewer Canvas */}
        <div className="lg:col-span-7 bg-black rounded-2xl border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
          
          {/* Top Viewer Toolbar */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-900 z-10">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-cyan-400">{selectedStudy.modality}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{selectedStudy.date}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setIsInverted(!isInverted)}
                className={`p-1.5 rounded flex items-center gap-1 ${isInverted ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'}`}
                title="Toggle Inverted Contrast"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Invert</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAiBoxes(!showAiBoxes)}
                className={`p-1.5 rounded flex items-center gap-1 ${showAiBoxes ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'}`}
                title="Toggle AI Annotations"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">AI Bounding Boxes</span>
              </button>

              <button
                type="button"
                onClick={() => setZoomLevel((z) => (z < 1.4 ? z + 0.2 : 1))}
                className="p-1.5 rounded text-slate-400 hover:text-white flex items-center gap-1"
                title="Zoom"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span className="text-[11px]">{Math.round(zoomLevel * 100)}%</span>
              </button>
            </div>
          </div>

          {/* Radiograph Viewport */}
          <div className="relative my-4 flex items-center justify-center min-h-[380px] bg-slate-950 rounded-xl overflow-hidden">
            <img
              src={selectedStudy.imageUrl}
              alt={selectedStudy.modality}
              className={`max-h-[360px] object-contain transition-all duration-300 rounded-lg ${
                isInverted ? 'filter invert contrast-125 brightness-90' : 'filter contrast-110'
              }`}
              style={{ transform: `scale(${zoomLevel})` }}
            />

            {/* AI Bounding Box Overlays */}
            {showAiBoxes &&
              selectedStudy.aiFindings.map((finding, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: `${finding.box.x}%`,
                    top: `${finding.box.y}%`,
                    width: `${finding.box.w}%`,
                    height: `${finding.box.h}%`,
                  }}
                  className="border-2 border-cyan-400/80 bg-cyan-500/10 rounded-lg pointer-events-none animate-pulse flex flex-col justify-start p-1"
                >
                  <span className="bg-cyan-950/90 border border-cyan-400 text-cyan-300 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm self-start">
                    {finding.label} ({finding.confidence}%)
                  </span>
                </div>
              ))}
          </div>

          {/* Bottom Hospital DICOM Tag */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-900">
            <span>Patient: {selectedStudy.patientName}</span>
            <span className="font-mono text-cyan-400">DICOM 3.0 Standard Compliant</span>
          </div>
        </div>

        {/* Right: AI Radiologist Report */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Study Picker */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Available Studies
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_STUDIES.map((study) => (
                <button
                  key={study.id}
                  onClick={() => setSelectedStudy(study)}
                  className={`p-3 text-left rounded-xl border transition-all text-xs ${
                    selectedStudy.id === study.id
                      ? 'bg-cyan-500/10 border-cyan-500 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="font-bold text-slate-200">{study.modality}</div>
                  <div className="text-[11px] text-slate-500">{study.date}</div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Segmented Findings */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              AI Radiographic Segmentation
            </h4>
            <div className="space-y-2">
              {selectedStudy.aiFindings.map((f, i) => (
                <div key={i} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{f.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                      {f.confidence}% Conf.
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.clinicalImpression}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Radiologist Formal Sign-off */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Radiologist Clinical Impression
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              "{selectedStudy.radiologistNotes}"
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
