import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Sparkles, 
  CheckCircle, 
  Copy, 
  RefreshCw, 
  ShieldCheck,
  Activity
} from 'lucide-react';

interface VoiceDictationScribeProps {
  onBack: () => void;
  onApplyToSoap: (text: string) => void;
}

export const VoiceDictationScribe: React.FC<VoiceDictationScribeProps> = ({
  onBack,
  onApplyToSoap,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [dictatedText, setDictatedText] = useState(
    'Patient evaluated. Heart sounds S1 S2 heard regular, no murmur or S3 gallop. Bilateral chest clear without wheezing or crepitations. Mild epigastric tenderness present. Advised immediate 12-lead ECG and sublingual nitrates. Schedule 2D-Echo tomorrow morning.'
  );

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
                Doctor Ambient Voice Scribe
              </h2>
              <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
                Medical Speech-to-SOAP
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Dictate clinical findings, examination notes or diagnostic reasoning in English/Hinglish
            </p>
          </div>
        </div>
      </div>

      {/* Dictation Canvas Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Large Mic Trigger */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <button
            type="button"
            onClick={toggleRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isRecording
                ? 'bg-rose-600 text-white ring-8 ring-rose-200 scale-110 shadow-lg animate-pulse'
                : 'bg-teal-700 hover:bg-teal-800 text-white shadow-md'
            }`}
          >
            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>

          <span className="text-xs font-bold text-slate-700">
            {isRecording ? 'Listening... Speak your clinical notes' : 'Tap Microphone to Start Ambient Dictation'}
          </span>
        </div>

        {/* Live Formatted Output */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Transcribed Clinical Formulation
          </label>
          <textarea
            rows={6}
            value={dictatedText}
            onChange={(e) => setDictatedText(e.target.value)}
            className="w-full p-4 text-sm font-medium border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 leading-relaxed text-slate-800"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onApplyToSoap(dictatedText)}
            className="flex-1 py-3.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-teal-800/20"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Apply to Patient SOAP Plan</span>
          </button>
        </div>

      </div>

    </div>
  );
};
