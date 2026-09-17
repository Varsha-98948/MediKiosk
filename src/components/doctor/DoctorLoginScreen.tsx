import React, { useState } from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  KeyRound, 
  Sparkles,
  HeartPulse,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { DoctorProfile } from '../../types';
import { mockDoctors } from '../../data/mockData';

interface DoctorLoginScreenProps {
  onLoginSuccess: (doctor: DoctorProfile) => void;
  onBackToPatientKiosk: () => void;
}

export const DoctorLoginScreen: React.FC<DoctorLoginScreenProps> = ({
  onLoginSuccess,
  onBackToPatientKiosk,
}) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(mockDoctors[0].id);
  const [pin, setPin] = useState('4829');
  const [selectedShift, setSelectedShift] = useState<'morning' | 'evening'>('morning');
  const [selectedRoom, setSelectedRoom] = useState('Room 104 (OPD Block A)');
  const [isLoading, setIsLoading] = useState(false);

  const selectedDoctor = mockDoctors.find(d => d.id === selectedDoctorId) || mockDoctors[0];

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        ...selectedDoctor,
        roomNumber: selectedRoom,
      });
    }, 450);
  };

  return (
    <div className="min-h-[620px] flex flex-col justify-between max-w-4xl mx-auto p-4 sm:p-6">
      
      {/* Top Breadcrumb & Switcher */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={onBackToPatientKiosk}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Switch to Patient Kiosk</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>ABDM Health Professional Registry (HPR) Ready</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="my-6 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Hospital Branding & Verification Badge (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-600/30 text-teal-300 border border-teal-500/30 flex items-center justify-center">
              <Stethoscope className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-400">
                Hospital EMR Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit'] mt-1 leading-tight">
                Physician & Doctor Clinical Station
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Apex Multispecialty Hospital & Research Institute • OPD Block A
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live OPD Queue & Red-Flag Triage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Second AI Clinical Synthesis & SOAP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multilingual Rx & Instant WhatsApp Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Longitudinal EMR & OCR History Audit</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Security: 256-Bit SSL</span>
            <span className="text-emerald-400 font-bold">ABDM Verified</span>
          </div>
        </div>

        {/* Right Side: Doctor Selection & PIN Sign-In (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
          
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              Doctor Sign-In
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your physician profile and confirm OPD Room allocation.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Doctor Profile Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Attending Consultant
              </label>
              <div className="space-y-2">
                {mockDoctors.map((doc) => {
                  const isSelected = selectedDoctorId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-teal-50/70 border-teal-600 shadow-xs ring-2 ring-teal-500/10'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                          isSelected ? 'bg-teal-700 text-white' : 'bg-slate-200 text-teal-950'
                        }`}>
                          {doc.name.split(' ')[1]?.[0] || 'D'}
                        </div>
                        <div>
                          <strong className="text-xs sm:text-sm text-slate-900 block font-bold">
                            {doc.name}
                          </strong>
                          <span className="text-[11px] text-slate-500 block">
                            {doc.specialty} • Reg: {doc.regNo}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-teal-600 bg-teal-600' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Room & Shift Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  OPD Room Allocation
                </label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                >
                  <option value="Room 104 (OPD Block A)">Room 104 (OPD Block A)</option>
                  <option value="Room 108 (Cardiology Suite)">Room 108 (Cardiology Suite)</option>
                  <option value="Room 205 (AYUSH Wing)">Room 205 (AYUSH Wing)</option>
                  <option value="Emergency Triage Station #01">Emergency Triage Station #01</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Active Shift
                </label>
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                >
                  <option value="morning">Morning OPD (08:00 - 14:00)</option>
                  <option value="evening">Evening OPD (16:00 - 20:00)</option>
                </select>
              </div>
            </div>

            {/* PIN / Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Doctor PIN / Hospital Passcode
                </label>
                <span className="text-[11px] text-teal-700 font-medium">Demo PIN: 4829</span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  maxLength={6}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono tracking-widest text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Submit & Demo Quick-Login */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-teal-700 hover:bg-teal-800 active:scale-[0.99] text-white rounded-xl font-bold text-sm shadow-md shadow-teal-800/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <span>Authenticating Doctor Credentials...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Enter Doctor Dashboard as {selectedDoctor.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Connected to ABDM Hospital Information Management System (HIMS)
              </p>
            </div>

          </form>

        </div>

      </div>

      {/* Footer Notice */}
      <div className="text-center text-xs text-slate-400">
        MediKiosk EMR • Designed for High-Load Indian Hospital OPDs
      </div>

    </div>
  );
};
