import React, { useState } from 'react';
import { Volume2, ArrowLeft, User, Phone, Calendar, ShieldCheck } from 'lucide-react';
import { Language, Gender } from '../../types';
import { translations } from '../../utils/translations';
import { speakText } from '../../utils/speech';

interface BasicProfileScreenProps {
  language: Language;
  initialName?: string;
  initialAge?: number;
  initialGender?: Gender;
  initialPhone?: string;
  onSaveProfile: (profile: { name: string; age: number; gender: Gender; phone: string; language: Language }) => void;
  onBack: () => void;
}

export const BasicProfileScreen: React.FC<BasicProfileScreenProps> = ({
  language,
  initialName = 'Rahul Sharma',
  initialAge = 48,
  initialGender = 'male',
  initialPhone = '+91 98201 44521',
  onSaveProfile,
  onBack,
}) => {
  const t = translations[language];

  const [name, setName] = useState(initialName);
  const [age, setAge] = useState(initialAge.toString());
  const [gender, setGender] = useState<Gender>(initialGender);
  const [phone, setPhone] = useState(initialPhone);
  const [selectedLang, setSelectedLang] = useState<Language>(language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name: name || 'Rahul Sharma',
      age: parseInt(age, 10) || 48,
      gender,
      phone: phone || '+91 98201 44521',
      language: selectedLang,
    });
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[580px] p-6 sm:p-10 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <button
          type="button"
          onClick={() => speakText('Please confirm your basic details.', language)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200"
        >
          <Volume2 className="w-4 h-4 text-teal-600" />
          <span>{t.listen}</span>
        </button>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="my-auto w-full py-6 space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            {t.profileTitle}
          </h2>
          <p className="text-xs text-slate-500">
            Auto-populated via ABHA / Hospital Master Record
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">{t.fullName}</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="input-profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 text-base font-semibold border-2 border-slate-200 rounded-xl focus:border-teal-600 focus:ring-4 focus:ring-teal-100 outline-none"
              />
            </div>
          </div>

          {/* Age and Gender Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Age */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">{t.age}</label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  id="input-profile-age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                  required
                  className="w-full pl-11 pr-4 py-3 text-base font-semibold border-2 border-slate-200 rounded-xl focus:border-teal-600 focus:ring-4 focus:ring-teal-100 outline-none"
                />
              </div>
            </div>

            {/* Gender Simple Buttons */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">{t.gender}</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  id="btn-gender-male"
                  onClick={() => setGender('male')}
                  className={`py-3 text-xs font-bold rounded-xl border-2 transition-all ${
                    gender === 'male'
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t.male}
                </button>
                <button
                  type="button"
                  id="btn-gender-female"
                  onClick={() => setGender('female')}
                  className={`py-3 text-xs font-bold rounded-xl border-2 transition-all ${
                    gender === 'female'
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t.female}
                </button>
                <button
                  type="button"
                  id="btn-gender-other"
                  onClick={() => setGender('other')}
                  className={`py-3 text-xs font-bold rounded-xl border-2 transition-all ${
                    gender === 'other'
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t.other}
                </button>
              </div>
            </div>

          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">{t.mobileNumber}</label>
            <div className="relative">
              <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                id="input-profile-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-base font-semibold border-2 border-slate-200 rounded-xl focus:border-teal-600 focus:ring-4 focus:ring-teal-100 outline-none"
              />
            </div>
          </div>

        </div>

        {/* Submit */}
        <button
          type="submit"
          id="btn-profile-continue"
          className="w-full py-4 px-6 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-800/20 transition-all cursor-pointer"
        >
          {t.continue}
        </button>
      </form>

      {/* Footer */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Verified with Ayushman Bharat ID</span>
      </div>

    </div>
  );
};
