'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  CheckCircle2, 
  Building, 
  QrCode, 
  Share2, 
  ArrowRight,
  Phone,
  Sparkles
} from 'lucide-react';
import { Language } from '../../types';
import { mockDoctors } from '../../data/mockData';

interface AppointmentSlot {
  time: string;
  available: boolean;
}

const AVAILABLE_SLOTS: AppointmentSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '09:30 AM', available: false },
  { time: '10:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '11:15 AM', available: true },
  { time: '11:45 AM', available: false },
  { time: '02:00 PM', available: true },
  { time: '02:30 PM', available: true },
  { time: '03:15 PM', available: true },
];

interface DoctorAppointmentBookingProps {
  language?: Language;
  onBack?: () => void;
  onBookingConfirmed?: (token: string, details: any) => void;
}

export const DoctorAppointmentBooking: React.FC<DoctorAppointmentBookingProps> = ({
  language = 'en',
  onBack,
  onBookingConfirmed,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState(mockDoctors[0]);
  const [selectedDate, setSelectedDate] = useState('Today (28 Aug 2026)');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [patientName, setPatientName] = useState('Ramesh Patel');
  const [patientPhone, setPatientPhone] = useState('+91 98765 43210');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('OPD-A42');

  const handleConfirm = () => {
    const token = `OPD-${selectedDoctor.roomNumber.replace(/[^0-9]/g, '') || '104'}-${Math.floor(10 + Math.random() * 89)}`;
    setGeneratedToken(token);
    setIsConfirmed(true);
    if (onBookingConfirmed) {
      onBookingConfirmed(token, {
        doctor: selectedDoctor,
        slot: selectedSlot,
        date: selectedDate,
        patientName,
        phone: patientPhone,
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
              <span>OPD Appointment & Token Dispatch</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                Live Hospital Slots
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Schedule consultation slots, select specialist physicians & obtain automated token pass
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

      {!isConfirmed ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Doctor Selection */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              1. Select Specialist Physician
            </h3>
            <div className="space-y-2.5">
              {mockDoctors.map((doc) => {
                const isSelected = selectedDoctor.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-teal-50/70 border-teal-600 shadow-xs ring-1 ring-teal-600'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold border border-slate-200">
                        {doc.name.charAt(3)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{doc.name}</h4>
                        <p className="text-xs text-teal-700 font-medium">{doc.specialty}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{doc.roomNumber || 'Room 104 (OPD A)'}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                      Reg: {doc.regNo}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Patient Credentials */}
            <div className="pt-2 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Patient Verification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Slot Selection & Booking Summary */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  3. Select Consultation Slot ({selectedDate})
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABLE_SLOTS.map((slot, i) => {
                    const isSelected = selectedSlot === slot.time;
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                          !slot.available
                            ? 'bg-slate-200/60 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-teal-600 text-white font-bold border-teal-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Appointment Confirmation Preview
                </h4>
                <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
                  <div>Doctor: <strong className="text-slate-900 block">{selectedDoctor.name}</strong></div>
                  <div>Department: <strong className="text-slate-900 block">{selectedDoctor.specialty}</strong></div>
                  <div>Date: <strong className="text-slate-900 block">{selectedDate}</strong></div>
                  <div>Time Slot: <strong className="text-teal-700 block">{selectedSlot}</strong></div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Confirm & Generate OPD Token</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Confirmed Token Pass Card */
        <div className="max-w-md mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center border border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Appointment Confirmed
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-1 font-mono tracking-tight">
              {generatedToken}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Token dispatched to {patientPhone} via WhatsApp
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-left space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Patient:</span>
              <strong className="text-slate-200">{patientName}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Consultant:</span>
              <strong className="text-slate-200">{selectedDoctor.name}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Room:</span>
              <strong className="text-teal-300">{selectedDoctor.roomNumber}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Scheduled Slot:</span>
              <strong className="text-emerald-400">{selectedSlot}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsConfirmed(false)}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
          >
            Book Another Appointment
          </button>
        </div>
      )}
    </div>
  );
};
