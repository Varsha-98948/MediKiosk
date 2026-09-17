import React from 'react';

interface BodyDiagramProps {
  selectedLocation?: string;
  onSelectLocation?: (locationId: string, label: string) => void;
  interactive?: boolean;
}

export const BodyDiagram: React.FC<BodyDiagramProps> = ({
  selectedLocation = 'chest',
  onSelectLocation,
  interactive = true,
}) => {
  const regions = [
    { id: 'head', label: 'Head / Eyes / Face', x: 100, y: 35, r: 24 },
    { id: 'throat', label: 'Throat / Neck', x: 100, y: 72, width: 24, height: 16, type: 'rect' },
    { id: 'chest', label: 'Chest (Heart / Lungs)', x: 100, y: 110, width: 60, height: 45, type: 'rect' },
    { id: 'abdomen', label: 'Stomach / Abdomen', x: 100, y: 165, width: 56, height: 45, type: 'rect' },
    { id: 'left_arm', label: 'Left Arm / Shoulder', x: 148, y: 135, width: 22, height: 90, type: 'rect' },
    { id: 'right_arm', label: 'Right Arm / Shoulder', x: 52, y: 135, width: 22, height: 90, type: 'rect' },
    { id: 'pelvis', label: 'Pelvis / Groin', x: 100, y: 220, width: 50, height: 35, type: 'rect' },
    { id: 'legs', label: 'Knees / Legs / Feet', x: 100, y: 295, width: 65, height: 110, type: 'rect' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center p-4 bg-slate-900/5 rounded-2xl border border-slate-200">
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        {interactive ? 'Tap the body region where it hurts' : 'Identified Pain Location'}
      </div>
      
      <svg
        viewBox="0 0 200 420"
        className="w-48 h-96 max-w-full drop-shadow-sm transition-all"
        style={{ touchAction: 'manipulation' }}
      >
        {/* Silhouette Outline */}
        <defs>
          <radialGradient id="painGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Human Body Base Silhouette */}
        <g fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Head */}
          <circle cx="100" cy="38" r="22" />
          {/* Neck */}
          <path d="M92,58 L92,72 L108,72 L108,58 Z" />
          {/* Torso & Shoulders */}
          <path d="M60,78 C70,72 130,72 140,78 C150,84 152,110 148,150 L140,210 L130,225 L70,225 L60,210 L52,150 C48,110 50,84 60,78 Z" />
          {/* Left Arm (viewer right) */}
          <path d="M140,82 L162,150 L158,215 L146,215 L148,150 L136,105 Z" />
          {/* Right Arm (viewer left) */}
          <path d="M60,82 L38,150 L42,215 L54,215 L52,150 L64,105 Z" />
          {/* Pelvis & Legs */}
          <path d="M70,225 L72,310 L75,395 L88,395 L86,310 L96,250 L104,250 L114,310 L112,395 L125,395 L128,310 L130,225 Z" />
        </g>

        {/* Interactive Highlight Zones */}
        {regions.map((reg) => {
          const isSelected = selectedLocation === reg.id;
          return (
            <g
              key={reg.id}
              onClick={() => interactive && onSelectLocation && onSelectLocation(reg.id, reg.label)}
              className={interactive ? 'cursor-pointer group' : ''}
              id={`body-region-${reg.id}`}
            >
              {reg.type === 'rect' ? (
                <rect
                  x={reg.x - (reg.width || 40) / 2}
                  y={reg.y - (reg.height || 40) / 2}
                  width={reg.width}
                  height={reg.height}
                  rx={8}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? 'fill-rose-500/80 stroke-rose-600 stroke-2 animate-pulse'
                      : 'fill-teal-500/0 hover:fill-teal-500/25 stroke-teal-500/0 hover:stroke-teal-500 stroke-1'
                  }`}
                />
              ) : (
                <circle
                  cx={reg.x}
                  cy={reg.y}
                  r={reg.r || 20}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? 'fill-rose-500/80 stroke-rose-600 stroke-2 animate-pulse'
                      : 'fill-teal-500/0 hover:fill-teal-500/25 stroke-teal-500/0 hover:stroke-teal-500 stroke-1'
                  }`}
                />
              )}

              {/* Pulsing indicator circle when selected */}
              {isSelected && (
                <circle
                  cx={reg.x}
                  cy={reg.y}
                  r={28}
                  fill="url(#painGlow)"
                  className="pointer-events-none animate-ping opacity-75"
                />
              )}
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
        <span>Selected: <strong className="text-slate-900 capitalize">{regions.find(r => r.id === selectedLocation)?.label || selectedLocation}</strong></span>
      </div>
    </div>
  );
};
