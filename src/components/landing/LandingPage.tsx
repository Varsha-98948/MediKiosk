'use client';

import React from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  Brain, 
  Hospital, 
  ShieldCheck, 
  Volume2, 
  CalendarCheck, 
  FileSearch, 
  Pill, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Language } from '../../types';
import { speakText } from '../../utils/speech';

interface LandingPageProps {
  onExplorePlatform: () => void;
  onOpenKiosk: () => void;
  onOpenDoctor: () => void;
  onOpenAyushEngine: () => void;
  onOpenOperations: () => void;
  onOpenMedicineExplorer?: () => void;
  onOpenXrayViewer?: () => void;
  onOpenFirstAid?: () => void;
  onOpenAppointments?: () => void;
  onOpenAllServices?: () => void;
  language?: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExplorePlatform,
  onOpenKiosk,
  onOpenDoctor,
  onOpenAyushEngine,
  onOpenOperations,
  onOpenMedicineExplorer,
  onOpenXrayViewer,
  onOpenFirstAid,
  onOpenAppointments,
  onOpenAllServices,
  language = 'en',
}) => {
  // Voice assistance for landing page banner
  const handleSpeakHero = () => {
    const text = language === 'hi'
      ? 'आयुष स्वास्थ्य केंद्र में आपका स्वागत है। नीचे दिए गए किसी भी रंगीन बॉक्स को दबाकर अपनी सेवा चुनें। नया पर्चा बनाने के लिए नारंगी बॉक्स नंबर 01 दबाएँ।'
      : language === 'mr'
      ? 'आयुष आरोग्य केंद्रामध्ये आपले स्वागत आहे. खाली दिलेल्या कोणत्याही रंगीत बॉक्सला स्पर्श करून आपली सेवा निवडा. नवीन नोंदणीसाठी नारंगी बॉक्स नंबर 01 वापरा.'
      : 'Welcome to the Ayush Health Center. Touch any colored box below to choose a service. To register as a patient and take a queue token, tap orange box number 01.';
    speakText(text, language);
  };

  const handleSpeakCard = (title: string, desc: string) => {
    speakText(`${title}. ${desc}`, language);
  };

  // 6 Core Cards directly matched to the 6 colors from user reference image:
  // 1. Orange (#C05C29), 2. Purple (#6355DC), 3. Teal (#166E7E), 4. Berry (#B83253), 5. Gold (#C59E27), 6. Indigo (#2D55B8)
  const serviceCards = [
    {
      id: 'kiosk',
      number: '01',
      title: 'Patient Kiosk & Token',
      titleHi: '01. नया पर्चा व टोकन काउंटर',
      titleMr: '01. रुग्ण नोंदणी व टोकन',
      desc: 'Touch to register, mark where it hurts on the body map, and receive your OPD queue slip.',
      descHi: 'पर्चा बनाने, दर्द की जगह बताने और कतार टोकन प्राप्त करने के लिए यहाँ दबाएँ।',
      descMr: 'नोंदणी करण्यासाठी, वेदना दाखवण्यासाठी आणि रांगेचा टोकन घेण्यासाठी येथे दाबा.',
      icon: HeartPulse,
      badge: 'Step 1 • Intake',
      badgeHi: 'चरण 1 • पर्चा',
      badgeMr: 'टप्पा 1 • नोंदणी',
      action: onOpenKiosk,
      borderColor: 'border-[#C05C29]',
      borderHover: 'hover:border-[#9C4519]',
      bgHover: 'hover:bg-[#FFF7ED]',
      iconBg: 'bg-[#C05C29]',
      accentColor: 'text-[#C05C29]',
      badgeBg: 'bg-[#FFEDD5] text-[#C05C29] border-[#FDBA74]',
    },
    {
      id: 'doctor',
      number: '02',
      title: 'Doctor Consultation Desk',
      titleHi: '02. डॉक्टर परामर्श कक्ष',
      titleMr: '02. डॉक्टर तपासणी कक्ष',
      desc: 'View patient records, longitudinal visit history, AI reasoning graph, and create prescriptions.',
      descHi: 'मरीज़ की पुरानी फाइलें, जाँच रिपोर्ट और डिजिटल पर्चा लिखने के लिए डॉक्टर कक्ष खोलें।',
      descMr: 'रुग्णाचा इतिहास, तपासणी अहवाल आणि औषधोपचार चिठ्ठीसाठी डॉक्टर कक्ष उघडा.',
      icon: Stethoscope,
      badge: 'Step 2 • Clinical Care',
      badgeHi: 'चरण 2 • परामर्श',
      badgeMr: 'टप्पा 2 • तपासणी',
      action: onOpenDoctor,
      borderColor: 'border-[#6355DC]',
      borderHover: 'hover:border-[#4E41B8]',
      bgHover: 'hover:bg-[#F5F3FF]',
      iconBg: 'bg-[#6355DC]',
      accentColor: 'text-[#6355DC]',
      badgeBg: 'bg-[#EDE9FE] text-[#6355DC] border-[#DDD6FE]',
    },
    {
      id: 'ayush_engine',
      number: '03',
      title: 'Ayush Intelligence Engine',
      titleHi: '03. आयुष त्रिदोष व प्रकृति जाँच',
      titleMr: '03. आयुष त्रिदोष व प्रकृती तपासणी',
      desc: 'Dashavidha Pariksha, Prakriti body balance polygon, and NAMASTE / ICD-11 coding.',
      descHi: 'वात-पित्त-कफ का संतुलन और आयुर्वेदिक 10-चरणीय स्वास्थ्य परीक्षण देखें।',
      descMr: 'वात, पित्त आणि कफ संतुलन तसेच आयुर्वेदिक आरोग्य विश्लेषण पहा.',
      icon: Brain,
      badge: 'Ayush Clinical AI',
      badgeHi: 'आयुष त्रिदोष AI',
      badgeMr: 'आयुष त्रिदोष AI',
      action: onOpenAyushEngine,
      borderColor: 'border-[#166E7E]',
      borderHover: 'hover:border-[#0F4B56]',
      bgHover: 'hover:bg-[#F0FDFA]',
      iconBg: 'bg-[#166E7E]',
      accentColor: 'text-[#166E7E]',
      badgeBg: 'bg-[#CCFBF1] text-[#166E7E] border-[#99F6E4]',
    },
    {
      id: 'operations',
      number: '04',
      title: 'Hospital Operations & Triage',
      titleHi: '04. अस्पताल संचालन व बेड स्थिति',
      titleMr: '04. रुग्णालय व्यवस्थापन व बेड स्थिती',
      desc: 'Live patient queue tracker, dynamic room routing, and pin-code disease surveillance radar.',
      descHi: 'खाली बेड, डॉक्टर के कमरे, प्रतीक्षा समय और संक्रामक रोग निगरानी रडार देखें।',
      descMr: 'रुग्णालय बेड, डॉक्टरांचे कक्ष आणि आजार प्रसार नकाशा पहा.',
      icon: Hospital,
      badge: 'Command & Bed Flow',
      badgeHi: 'अस्पताल प्रबंधन',
      badgeMr: 'रुग्णालय व्यवस्थापन',
      action: onOpenOperations,
      borderColor: 'border-[#B83253]',
      borderHover: 'hover:border-[#8F223D]',
      bgHover: 'hover:bg-[#FFF1F2]',
      iconBg: 'bg-[#B83253]',
      accentColor: 'text-[#B83253]',
      badgeBg: 'bg-[#FFE4E6] text-[#B83253] border-[#FECDD3]',
    },
    {
      id: 'medicines',
      number: '05',
      title: 'Medicine & Herb Explorer',
      titleHi: '05. दवाई व जड़ी-बूटी निर्देशिका',
      titleMr: '05. औषध व वनस्पती माहिती',
      desc: 'Search Ayurvedic formulations, classical herbs, modern medications, and safety rules.',
      descHi: 'दवाइयों के फायदे, लेने का सही तरीका और परहेज़ की पूरी जानकारी प्राप्त करें।',
      descMr: 'औषधांचे फायदे, घेण्याची पद्धत आणि सुरक्षिततेचे नियम जाणून घ्या.',
      icon: Pill,
      badge: 'Ayurvedic Formulary',
      badgeHi: 'औषध निर्देशिका',
      badgeMr: 'औषध माहिती',
      action: onOpenMedicineExplorer || onOpenKiosk,
      borderColor: 'border-[#C59E27]',
      borderHover: 'hover:border-[#9E7D1A]',
      bgHover: 'hover:bg-[#FEFCE8]',
      iconBg: 'bg-[#C59E27]',
      accentColor: 'text-[#C59E27]',
      badgeBg: 'bg-[#FEF08A] text-[#854D0E] border-[#FDE047]',
    },
    {
      id: 'xray',
      number: '06',
      title: 'X-Ray & Radiology Viewer',
      titleHi: '06. एक्स-रे व लैब रिपोर्ट जांच',
      titleMr: '06. क्ष-किरण (X-Ray) व लॅब अहवाल',
      desc: 'Inspect medical imaging, chest scans, and laboratory blood reports with high clarity.',
      descHi: 'अपनी एक्स-रे फिल्म, छाती के स्कैन और खून की जाँच रिपोर्ट यहाँ देखें।',
      descMr: 'तुमचे एक्स-रे फोटो आणि रक्त तपासणी अहवाल येथे पहा.',
      icon: FileSearch,
      badge: 'Diagnostics & Reports',
      badgeHi: 'जाँच रिपोर्ट',
      badgeMr: 'तपासणी अहवाल',
      action: onOpenXrayViewer || onOpenKiosk,
      borderColor: 'border-[#2D55B8]',
      borderHover: 'hover:border-[#1E3A8A]',
      bgHover: 'hover:bg-[#EFF6FF]',
      iconBg: 'bg-[#2D55B8]',
      accentColor: 'text-[#2D55B8]',
      badgeBg: 'bg-[#DBEAFE] text-[#2D55B8] border-[#BFDBFE]',
    },
  ];

  // 4 Simple Patient Steps
  const simpleSteps = [
    {
      num: '1',
      title: 'Arrival & Token',
      titleHi: '1. पर्चा व टोकन लें',
      titleMr: '1. नोंदणी व टोकन',
      desc: 'Select language, tell your problem or point on the body map, and take printed slip.',
      descHi: 'भाषा चुनें, अपनी समस्या बताएं और टोकन पर्चा लें।',
      descMr: 'भाषा निवडा, त्रास सांगा आणि टोकन पावती घ्या.'
    },
    {
      num: '2',
      title: 'Ayush AI Check',
      titleHi: '2. आयुर्वेदिक लक्षण जाँच',
      titleMr: '2. त्रिदोष लक्षण तपासणी',
      desc: 'Automated assessment calculates Vata-Pitta-Kapha balance and prepares intake file.',
      descHi: 'प्रणाली वात, पित्त और कफ के लक्षणों की फाइल तैयार करती है।',
      descMr: 'संगणकीय प्रणाली त्रिदोषांची नोंद डॉक्टरसाठी तयार करते.'
    },
    {
      num: '3',
      title: 'Doctor Consultation',
      titleHi: '3. डॉक्टर से परामर्श',
      titleMr: '3. डॉक्टर तपासणी',
      desc: 'Physician checks your history, examines symptoms, and explains clinical treatment.',
      descHi: 'डॉक्टर आपकी पूरी जाँच कर के उचित सलाह देते हैं।',
      descMr: 'डॉक्टर सविस्तर तपासणी करून योग्य औषधोपचार सुचवतात.'
    },
    {
      num: '4',
      title: 'Diet & Medicine Slip',
      titleHi: '4. दवाई व खान-पान पर्ची',
      titleMr: '4. औषध व पथ्य पावती',
      desc: 'Get a clear Pathya-Apathya food slip and collect medicines from hospital pharmacy.',
      descHi: 'क्या खाएं और क्या न खाएं का पर्चा लें और दवाई प्राप्त करें।',
      descMr: 'काय खावे आणि काय टाळावे याची माहिती व औषधे घ्या.'
    },
  ];

  return (
    <div className="w-full font-['Outfit'] text-stone-900 space-y-8 pb-10">
      
      {/* 1. Main Welcome & Help Hero Box */}
      <section className="bg-white border-2 border-stone-300 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-3xl">
            {/* National Initiative Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E6F4F6] border border-[#BCE3E8] text-xs font-bold text-[#166E7E]">
              <ShieldCheck className="w-4 h-4 text-[#166E7E]" />
              <span>
                {language === 'hi'
                  ? 'आयुष मंत्रालय • राष्ट्रीय डिजिटल स्वास्थ्य मिशन (ABDM Level-3)'
                  : language === 'mr'
                  ? 'आयुष मंत्रालय • राष्ट्रीय डिजिटल आरोग्य अभियान (ABDM Level-3)'
                  : 'Ministry of Ayush • ABDM Level-3 Certified Clinical System'}
              </span>
            </div>

            {/* Clear Plain Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {language === 'hi' ? (
                <>सरल एवं त्वरित स्वास्थ्य केंद्र <span className="text-[#166E7E] block sm:inline">सबके लिए सुलभ</span></>
              ) : language === 'mr' ? (
                <>सोपे व तत्पर आरोग्य केंद्र <span className="text-[#166E7E] block sm:inline">सर्वांसाठी सहज उपलब्ध</span></>
              ) : (
                <>Simple, Fast Ayush Healthcare <span className="text-[#166E7E] block sm:inline">For Every Citizen</span></>
              )}
            </h1>

            {/* Plain Supporting Text */}
            <p className="text-sm sm:text-base text-stone-700 font-medium leading-relaxed">
              {language === 'hi'
                ? 'अस्पताल में नया पर्चा बनाने, डॉक्टर से मिलने, दवाई खोजने या अपनी रिपोर्ट देखने के लिए नीचे दिए गए किसी भी रंगीन बॉक्स को दबाएँ।'
                : language === 'mr'
                ? 'रुग्णालयात नवीन नोंदणी, डॉक्टर तपासणी, औषध माहिती किंवा तपासणी अहवाल पाहण्यासाठी खालील रंगीत बॉक्सला स्पर्श करा.'
                : 'Touch any colored service box below to get an OPD queue token, consult the physician, explore Ayurvedic medicines, or view lab reports.'}
            </p>
          </div>

          {/* Quick Action Buttons + Audio Instruction */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            
            {/* Primary Check-In CTA (Orange #C05C29 from image) */}
            <button
              type="button"
              onClick={onOpenKiosk}
              className="px-6 py-3.5 bg-[#C05C29] hover:bg-[#9C4519] text-white border-2 border-[#9C4519] rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-center gap-2 btn-tactile"
            >
              <HeartPulse className="w-5 h-5 text-white" />
              <span>
                {language === 'hi' ? '01. नया पर्चा बनाएं (Start Token)' : language === 'mr' ? '01. नवीन नोंदणी करा (Token)' : '01. Start Patient Token'}
              </span>
            </button>

            {/* Listen / Voice Help Button */}
            <button
              type="button"
              onClick={handleSpeakHero}
              className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 border-2 border-stone-300 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 btn-tactile"
              title="Listen to page instructions in chosen language"
            >
              <Volume2 className="w-5 h-5 text-[#166E7E]" />
              <span>
                {language === 'hi' ? 'निर्देश सुनें (Audio Guide)' : language === 'mr' ? 'सूचना ऐका (Audio Guide)' : 'Listen to Instructions'}
              </span>
            </button>

            {/* All Services Drawer Button (Purple #6355DC from image) */}
            {onOpenAllServices && (
              <button
                type="button"
                onClick={onOpenAllServices}
                className="px-5 py-3 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#6355DC] border-2 border-[#6355DC] rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 btn-tactile"
              >
                <span>{language === 'hi' ? '📂 सभी सेवाएँ देखें' : language === 'mr' ? '📂 सर्व सेवा पहा' : '📂 View All 10 Services'}</span>
              </button>
            )}

          </div>

        </div>

        {/* Informative Help Banner for Low-Literacy Users */}
        <div className="mt-6 pt-4 border-t-2 border-stone-200 flex items-center gap-2 text-xs sm:text-sm text-stone-700 bg-[#F9F9F6] p-3 rounded-xl border border-stone-300">
          <Info className="w-5 h-5 text-[#166E7E] shrink-0" />
          <span>
            {language === 'hi'
              ? 'मदद के लिए: हर बॉक्स पर बने लाउडस्पीकर (🔊) चिन्ह को दबाने से वह बोलकर समझाएगा।'
              : language === 'mr'
              ? 'मदतीसाठी: प्रत्येक बॉक्सवरील लाऊडस्पीकर (🔊) चिन्हाला स्पर्श केल्यास माहिती ऐकू येईल.'
              : 'Assistance note: Tap the speaker icon (🔊) on any box to hear its instructions read aloud in your language.'}
          </span>
        </div>
      </section>

      {/* 2. Primary 6-Box Feature Service Directory (Matching User Image Palette) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#166E7E] rounded-full"></span>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              {language === 'hi' ? 'मुख्य अस्पताल सेवाएँ' : language === 'mr' ? 'प्रमुख रुग्णालय सेवा' : 'Main Hospital Features'}
            </h2>
          </div>
          <span className="text-xs font-bold text-stone-500">
            {language === 'hi' ? '6 प्रमुख सेवाएँ' : language === 'mr' ? '6 प्रमुख सेवा' : '6 Core Features'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceCards.map((card) => {
            const Icon = card.icon;
            const title = language === 'hi' ? card.titleHi : language === 'mr' ? card.titleMr : card.title;
            const desc = language === 'hi' ? card.descHi : language === 'mr' ? card.descMr : card.desc;
            const badge = language === 'hi' ? card.badgeHi : language === 'mr' ? card.badgeMr : card.badge;

            return (
              <div
                key={card.id}
                onClick={card.action}
                className={`relative bg-white rounded-2xl p-5 sm:p-6 transition-all duration-150 cursor-pointer flex flex-col justify-between group btn-tactile overflow-hidden ${card.borderColor} ${card.borderHover} ${card.bgHover} border-2`}
              >
                {/* Watermark Large Number (Inspired by User Image) */}
                <span className="absolute top-2 right-3 text-6xl sm:text-7xl font-black opacity-[0.07] pointer-events-none select-none text-stone-900">
                  {card.number}
                </span>

                <div>
                  {/* Top Bar: Number Tag & Audio Assist */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-lg ${card.iconBg} text-white font-extrabold text-xs flex items-center justify-center`}>
                        {card.number}
                      </span>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${card.badgeBg}`}>
                        {badge}
                      </span>
                    </div>

                    {/* Audio Listen Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakCard(title, desc);
                      }}
                      className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors z-10"
                      title="Listen to this card"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-3 mt-1 relative z-10">
                    <div className={`w-12 h-12 rounded-xl ${card.iconBg} text-white flex items-center justify-center shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-base sm:text-lg font-bold ${card.accentColor} leading-tight`}>
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Trigger Action Pill */}
                <div className="mt-5 pt-3 border-t border-stone-200 flex items-center justify-between text-xs sm:text-sm font-bold">
                  <span className={card.accentColor}>
                    {language === 'hi' ? 'सेवा खोलें' : language === 'mr' ? 'सेवा उघडा' : 'Open Service'}
                  </span>
                  <div className={`w-7 h-7 rounded-full ${card.iconBg} text-white flex items-center justify-center transform group-hover:translate-x-1 transition-transform`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Simple 4-Step Patient Flow (Low-Literacy Friendly) */}
      <section className="bg-white border-2 border-stone-300 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
            {language === 'hi' ? 'मरीज़ के 4 आसान चरण' : language === 'mr' ? 'रुग्णाचे ४ सोपे टप्पे' : 'Simple 4-Step Patient Journey'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'hi'
              ? 'अस्पताल में आने पर क्या करना है, इसे समझें:'
              : language === 'mr'
              ? 'रुग्णालयात आल्यावर काय करावे ते समजून घ्या:'
              : 'Understand what to do step-by-step from arrival to departure:'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {simpleSteps.map((step, idx) => {
            const title = language === 'hi' ? step.titleHi : language === 'mr' ? step.titleMr : step.title;
            const desc = language === 'hi' ? step.descHi : language === 'mr' ? step.descMr : step.desc;
            
            // Color sequence using the palette
            const colors = ['#C05C29', '#6355DC', '#166E7E', '#B83253'];
            const stepColor = colors[idx % colors.length];

            return (
              <div key={step.num} className="p-4 rounded-xl border-2 border-stone-300 bg-[#F9F9F6] space-y-2">
                <div 
                  className="w-8 h-8 rounded-lg text-white font-extrabold flex items-center justify-center text-sm"
                  style={{ backgroundColor: stepColor }}
                >
                  {step.num}
                </div>
                <h4 className="font-bold text-stone-900 text-sm">{title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Trust & Clinical Compliance Strip */}
      <section className="bg-white border-2 border-stone-300 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-stone-700">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#166E7E]" />
          <span>Charaka Samhita & Sushruta Samhita Classical Ayush Ontology</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#166E7E]" />
          <span>NAMASTE & WHO ICD-11 Chapter 2 Dual Coding</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#166E7E]" />
          <span>HL7 FHIR R4 Interoperability with Ayush Grid</span>
        </div>
      </section>

    </div>
  );
};
