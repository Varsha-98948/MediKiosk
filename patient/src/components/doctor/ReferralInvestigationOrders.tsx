import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FlaskConical, 
  Layers, 
  Send, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Activity, 
  UserCheck
} from 'lucide-react';
import { PatientRecord } from '../../types';

interface ReferralInvestigationOrdersProps {
  patient: PatientRecord;
  onBack: () => void;
  onOrderSuccess: () => void;
}

export const ReferralInvestigationOrders: React.FC<ReferralInvestigationOrdersProps> = ({
  patient,
  onBack,
  onOrderSuccess,
}) => {
  const [selectedTests, setSelectedTests] = useState<string[]>([
    'Stat 12-Lead Electrocardiogram (ECG)',
    'High-Sensitivity Serum Troponin-I (Stat)',
    '2D-Echocardiography with Color Doppler',
    'Comprehensive Lipid Profile (Fasting)',
  ]);

  const [referralDepartment, setReferralDepartment] = useState('Interventional Cardiology & Cath Lab');
  const [urgency, setUrgency] = useState<'stat' | 'urgent' | 'routine'>('stat');
  const [clinicalNotes, setClinicalNotes] = useState('Suspected acute coronary syndrome / unstable angina in patient with uncontrolled hypertension and type 2 diabetes. Immediate cardiac biomarker & echo evaluation requested.');
  const [isOrdered, setIsOrdered] = useState(false);

  const availableTests = [
    'Stat 12-Lead Electrocardiogram (ECG)',
    'High-Sensitivity Serum Troponin-I (Stat)',
    '2D-Echocardiography with Color Doppler',
    'Treadmill Stress Test (TMT / Stress Echo)',
    'Comprehensive Lipid Profile (Fasting)',
    'Serum Electrolytes (Na+, K+, Cl-)',
    'Kidney Function Test (BUN / Creatinine)',
    'HbA1c Glycated Hemoglobin',
    'Chest X-Ray (PA View)',
  ];

  const handleToggleTest = (test: string) => {
    if (selectedTests.includes(test)) {
      setSelectedTests(selectedTests.filter(t => t !== test));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const handleSubmitOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      onOrderSuccess();
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
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
                Order Diagnostic Investigations & Specialist Referral
              </h2>
              <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
                Apex Central Diagnostics LIS
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Patient: <strong className="text-slate-800">{patient.name}</strong> • Token #{patient.tokenNumber}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (7 Cols): Test Selection Grid */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Select Diagnostic Panels</h3>
              <span className="text-xs text-slate-500">Auto-sent to Hospital Laboratory & Imaging Information System</span>
            </div>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              {selectedTests.length} Selected
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {availableTests.map((test, idx) => {
              const isSelected = selectedTests.includes(test);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleToggleTest(test)}
                  className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border-teal-600 text-teal-950 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FlaskConical className={`w-4 h-4 ${isSelected ? 'text-teal-700' : 'text-slate-400'}`} />
                    <span>{test}</span>
                  </span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-teal-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right (5 Cols): Urgency, Specialist Referral & Dispatch */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Order Priority & Referral Destination</h3>

            {/* Urgency Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Triage Urgency</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'stat', label: 'STAT (Immediate)', color: 'bg-rose-600 text-white' },
                  { id: 'urgent', label: 'Urgent (< 2 hrs)', color: 'bg-amber-600 text-white' },
                  { id: 'routine', label: 'Routine (Same Day)', color: 'bg-teal-700 text-white' },
                ].map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUrgency(u.id as any)}
                    className={`py-2 px-1 text-center rounded-xl text-[11px] font-bold border transition-all ${
                      urgency === u.id
                        ? `${u.color} shadow-xs border-transparent`
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Referral Department */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Referral Department</label>
              <select
                value={referralDepartment}
                onChange={(e) => setReferralDepartment(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
              >
                <option value="Interventional Cardiology & Cath Lab">Interventional Cardiology & Cath Lab</option>
                <option value="Emergency Medicine & Triage">Emergency Medicine & Triage</option>
                <option value="Diabetology & Endocrinology">Diabetology & Endocrinology</option>
                <option value="Cardiothoracic Surgery (CTVS)">Cardiothoracic Surgery (CTVS)</option>
              </select>
            </div>

            {/* Clinical Indications */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Indications</label>
              <textarea
                rows={3}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmitOrder}
              disabled={isOrdered}
              className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm shadow-md shadow-teal-800/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {isOrdered ? (
                <>
                  <CheckCircle2 className="w-5 h-5 animate-pulse" />
                  <span>Orders Dispatched to LIS!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Dispatch Stat Orders to Lab & Cath Lab</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
