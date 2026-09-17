'use client';

import React from 'react';
import {
  X,
  Volume2,
  HeartPulse,
  Stethoscope,
  Brain,
  Hospital,
  Tv,
  Pill,
  FileSearch,
  AlertTriangle,
  CalendarCheck,
  BookOpen,
  LayoutGrid,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Language } from '../../types';
import { speakText } from '../../utils/speech';

export interface ServiceItem {
  id: string;
  title: string;
  titleHi: string;
  titleMr: string;
  desc: string;
  descHi: string;
  descMr: string;
  icon: React.ElementType;
  badge: string;
  tagNumber: string;
  color: string;
  bgLight: string;
  borderClass: string;
}

interface AllServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectService: (serviceId: string) => void;
}

export const AllServicesModal: React.FC<AllServicesModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectService,
}) => {
  if (!isOpen) return null;

  // 10 Services with palette colors matching user image:
  // Orange #C05C29, Purple #6355DC, Teal #166E7E, Berry #B83253, Gold #C59E27, Indigo #2D55B8
  const services: ServiceItem[] = [
    {
      id: 'kiosk',
      tagNumber: '01',
      title: 'Patient Kiosk & Token',
      titleHi: '01. नया पर्चा व टोकन काउंटर',
      titleMr: '01. रुग्ण नोंदणी व टोकन',
      desc: 'Touch or speak to register, point pain on body map, and get token.',
      descHi: 'पर्चा बनाने और टोकन नंबर लेने के लिए यहाँ दबाएँ।',
      descMr: 'नोंदणी करण्यासाठी आणि टोकन मिळवण्यासाठी येथे स्पर्श करा.',
      icon: HeartPulse,
      badge: 'Step 1 • Intake',
      color: '#C05C29',
      bgLight: '#FFF7ED',
      borderClass: 'border-[#C05C29] hover:bg-[#FFF7ED]'
    },
    {
      id: 'doctor',
      tagNumber: '02',
      title: 'Doctor Consultation Desk',
      titleHi: '02. डॉक्टर परामर्श कक्ष',
      titleMr: '02. डॉक्टर तपासणी कक्ष',
      desc: 'Full clinical history, past visit diff, and smart prescription slip.',
      descHi: 'डॉक्टर द्वारा मरीज़ की जाँच और डिजिटल पर्चा तैयार करना।',
      descMr: 'डॉक्टरांकडून रुग्णाची तपासणी आणि डिजिटल प्रिस्क्रिप्शन.',
      icon: Stethoscope,
      badge: 'Step 2 • Care',
      color: '#6355DC',
      bgLight: '#F5F3FF',
      borderClass: 'border-[#6355DC] hover:bg-[#F5F3FF]'
    },
    {
      id: 'ayush_engine',
      tagNumber: '03',
      title: 'Ayush Intelligence Engine',
      titleHi: '03. आयुष त्रिदोष व प्रकृति संतुलन',
      titleMr: '03. आयुष त्रिदोष व प्रकृती विश्लेषण',
      desc: 'Dashavidha Pariksha, Prakriti triad balance, and NAMASTE codes.',
      descHi: 'आयुर्वेदिक त्रिदोष और प्रकृति की विस्तृत जाँच।',
      descMr: 'आयुर्वेदिक त्रिदोष आणि प्रकृतीची सविस्तर तपासणी.',
      icon: Brain,
      badge: 'Ayush Clinical AI',
      color: '#166E7E',
      bgLight: '#F0FDFA',
      borderClass: 'border-[#166E7E] hover:bg-[#F0FDFA]'
    },
    {
      id: 'operations',
      tagNumber: '04',
      title: 'Hospital Operations & Triage',
      titleHi: '04. अस्पताल संचालन व बेड स्थिति',
      titleMr: '04. रुग्णालय व्यवस्थापन व बेड स्थिती',
      desc: 'Real-time room allocation, queue speed, and disease outbreak radar.',
      descHi: 'अस्पताल में खाली बेड, डॉक्टर के कमरे और कतार की स्थिति।',
      descMr: 'रुग्णालयातील रिकामे बेड आणि डॉक्टरांच्या कक्षांची स्थिती.',
      icon: Hospital,
      badge: 'Operations & Beds',
      color: '#B83253',
      bgLight: '#FFF1F2',
      borderClass: 'border-[#B83253] hover:bg-[#FFF1F2]'
    },
    {
      id: 'medicine_explorer',
      tagNumber: '05',
      title: 'Medicine & Herb Explorer',
      titleHi: '05. दवाई व जड़ी-बूटी जानकारी',
      titleMr: '05. औषध व वनस्पती माहिती',
      desc: 'Search Ayurvedic formulations, modern drugs, and safety guides.',
      descHi: 'आयुर्वेदिक और अंग्रेजी दवाइयों के उपयोग व सुरक्षा नियम।',
      descMr: 'औषधांचे प्रमाण व सुरक्षिततेचे नियम तपासा.',
      icon: Pill,
      badge: 'Formulary & Safety',
      color: '#C59E27',
      bgLight: '#FEFCE8',
      borderClass: 'border-[#C59E27] hover:bg-[#FEFCE8]'
    },
    {
      id: 'xray_viewer',
      tagNumber: '06',
      title: 'X-Ray & Radiology Viewer',
      titleHi: '06. एक्स-रे और लैब रिपोर्ट',
      titleMr: '06. क्ष-किरण (X-Ray) व लॅब तपासणी',
      desc: 'High-contrast medical scan viewer with automatic anomaly hints.',
      descHi: 'अपनी एक्स-रे फिल्म और खून की जाँच रिपोर्ट देखें।',
      descMr: 'तुमचे एक्स-रे फोटो आणि रक्त तपासणी अहवाल पहा.',
      icon: FileSearch,
      badge: 'Diagnostics',
      color: '#2D55B8',
      bgLight: '#EFF6FF',
      borderClass: 'border-[#2D55B8] hover:bg-[#EFF6FF]'
    },
    {
      id: 'first_aid_center',
      tagNumber: '07',
      title: 'Emergency Red Flag Center',
      titleHi: '07. आपातकालीन प्राथमिक उपचार केंद्र',
      titleMr: '07. तातडीचे व प्रथमोपचार केंद्र',
      desc: 'Instant protocols for chest pain, acute asthma, strokes, and wounds.',
      descHi: 'सीने में दर्द, सांस फूलने या गंभीर चोट के लिए त्वरित सहायता।',
      descMr: 'छातीत दुखणे, धाप लागणे किंवा गंभीर त्रासासाठी त्वरित मदत.',
      icon: AlertTriangle,
      badge: 'Urgent Care',
      color: '#B83253',
      bgLight: '#FFF1F2',
      borderClass: 'border-[#B83253] hover:bg-[#FFF1F2]'
    },
    {
      id: 'appointment_booking',
      tagNumber: '08',
      title: 'Book Doctor Appointment',
      titleHi: '08. डॉक्टर से समय (अपॉइंटमेंट) लें',
      titleMr: '08. डॉक्टरांची वेळ बुक करा',
      desc: 'Schedule advance OPD visits and specialist consultations.',
      descHi: 'आगामी तारीख के लिए डॉक्टर की अपॉइंटमेंट बुक करें।',
      descMr: 'पुढील तारखेसाठी डॉक्टरांची अपॉइंटमेंट बुक करा.',
      icon: CalendarCheck,
      badge: 'Appointments',
      color: '#6355DC',
      bgLight: '#F5F3FF',
      borderClass: 'border-[#6355DC] hover:bg-[#F5F3FF]'
    },
    {
      id: 'waiting_tv',
      tagNumber: '09',
      title: 'Waiting Hall TV Display',
      titleHi: '09. प्रतीक्षा कक्ष टीवी स्क्रीन',
      titleMr: '09. प्रतीक्षा कक्ष टीव्ही स्क्रीन',
      desc: 'Full-screen queue token calling board for hospital waiting lobby.',
      descHi: 'प्रतीक्षा कक्ष के लिए बड़ा टोकन नंबर डिस्प्ले बोर्ड।',
      descMr: 'मोठ्या पडद्यावर टोकन नंबर दाखवणारा डिस्प्ले.',
      icon: Tv,
      badge: 'Public Display',
      color: '#166E7E',
      bgLight: '#F0FDFA',
      borderClass: 'border-[#166E7E] hover:bg-[#F0FDFA]'
    },
    {
      id: 'health_guide',
      tagNumber: '10',
      title: 'Daily Dinacharya & Diet Guide',
      titleHi: '10. स्वस्थ दिनचर्या और आहार नियम',
      titleMr: '10. दैनंदिन दिनचर्या व आहार नियम',
      desc: 'Seasonal health guidance and Pathya-Apathya food lists.',
      descHi: 'ऋतु अनुसार क्या खाएं और क्या न खाएं, आसान सलाह।',
      descMr: 'ऋतूनुसार काय खावे आणि काय टाळावे, सोप्या सूचना.',
      icon: BookOpen,
      badge: 'Daily Wellness',
      color: '#C59E27',
      bgLight: '#FEFCE8',
      borderClass: 'border-[#C59E27] hover:bg-[#FEFCE8]'
    },
  ];

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakText(text, language);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-5xl rounded-2xl border-2 border-stone-400 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#166E7E] text-white px-5 py-4 flex items-center justify-between border-b-2 border-[#0F4B56]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#166E7E] flex items-center justify-center font-black border border-stone-300">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                {language === 'hi' ? 'सभी 10 अस्पताल सेवाएँ' : language === 'mr' ? 'सर्व १० रुग्णालय सेवा' : 'All 10 Hospital Services'}
              </h2>
              <p className="text-xs text-teal-100 font-medium">
                {language === 'hi' ? 'किसी भी सेवा को खोलने के लिए उस बॉक्स को दबाएँ' : language === 'mr' ? 'कोणतीही सेवा उघडण्यासाठी त्या बॉक्सला स्पर्श करा' : 'Tap any colored box to directly launch that feature'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">
              {language === 'hi' ? 'बंद करें' : language === 'mr' ? 'बंद करा' : 'Close'}
            </span>
          </button>
        </div>

        {/* Modal Body - Box Grid with Palette Colors */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-[#F9F9F6] flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const IconComponent = service.icon;
              const title = language === 'hi' ? service.titleHi : language === 'mr' ? service.titleMr : service.title;
              const desc = language === 'hi' ? service.descHi : language === 'mr' ? service.descMr : service.desc;

              return (
                <div
                  key={service.id}
                  onClick={() => {
                    onSelectService(service.id);
                    onClose();
                  }}
                  className={`bg-white border-2 ${service.borderClass} rounded-xl p-4 transition-all duration-150 cursor-pointer flex flex-col justify-between group btn-tactile relative overflow-hidden`}
                >
                  {/* Subtle watermark number */}
                  <span className="absolute top-1 right-2 text-5xl font-black opacity-5 pointer-events-none select-none text-stone-900">
                    {service.tagNumber}
                  </span>

                  <div>
                    {/* Top Row: Tag & Audio */}
                    <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-stone-200">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-7 h-7 rounded-md text-white text-xs font-extrabold flex items-center justify-center"
                          style={{ backgroundColor: service.color }}
                        >
                          {service.tagNumber}
                        </span>
                        <span 
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                          style={{ color: service.color, borderColor: service.color, backgroundColor: service.bgLight }}
                        >
                          {service.badge}
                        </span>
                      </div>

                      {/* Listen Button for low-literacy users */}
                      <button
                        type="button"
                        onClick={(e) => handleSpeak(e, `${title}. ${desc}`)}
                        className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors z-10"
                        title="Listen to this card"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex items-start gap-3 mt-1 relative z-10">
                      <div 
                        className="w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0"
                        style={{ backgroundColor: service.color }}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          className="text-sm font-bold leading-tight"
                          style={{ color: service.color }}
                        >
                          {title}
                        </h3>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action strip */}
                  <div className="mt-4 pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-bold" style={{ color: service.color }}>
                    <span>
                      {language === 'hi' ? 'खोलें' : language === 'mr' ? 'उघडा' : 'Open Feature'}
                    </span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-5 py-3 border-t-2 border-stone-300 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#166E7E]" />
            <span>Ayush Hospital Information System • Certified ABDM Level-3</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-900 rounded-lg font-bold transition-all border border-stone-300 cursor-pointer"
          >
            {language === 'hi' ? 'वापस जाएं' : language === 'mr' ? 'परत जा' : 'Close Window'}
          </button>
        </div>

      </div>
    </div>
  );
};
