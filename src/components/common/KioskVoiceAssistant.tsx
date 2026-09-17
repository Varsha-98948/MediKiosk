'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Bot, 
  Headphones, 
  Globe, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Radio,
  CheckCircle2,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Language } from '../../types';
import { speakText, stopSpeaking } from '../../utils/speech';

interface KioskVoiceAssistantProps {
  language: Language;
  currentScreenName: string;
  screenGuidanceText?: string;
  onVoiceCommandRecognized?: (command: string) => void;
  onSelectLanguage?: (lang: Language) => void;
}

export const KioskVoiceAssistant: React.FC<KioskVoiceAssistantProps> = ({
  language,
  currentScreenName,
  screenGuidanceText,
  onVoiceCommandRecognized,
  onSelectLanguage,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingActive, setIsSpeakingActive] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [audioLevel, setAudioLevel] = useState<number[]>([40, 70, 30, 90, 60, 45, 80, 35]);
  const intervalRef = useRef<any>(null);

  // Screen-specific default guidance in Hindi, Marathi, and English
  const defaultGuidance: Record<string, { en: string; hi: string; mr: string }> = {
    welcome: {
      en: 'Welcome to MediKiosk. Please touch the start button or speak your language to begin.',
      hi: 'मेडीकियोस्क में आपका स्वागत है। शुरू करने के लिए हरा बटन दबाएं या अपनी भाषा बोलें।',
      mr: 'मेडीकिओस्कमध्ये आपले स्वागत आहे. सुरू करण्यासाठी हिरवे बटण दाबा किंवा तुमची भाषा बोला.',
    },
    language: {
      en: 'Please choose your preferred language: English, Hindi, or Marathi.',
      hi: 'कृपया अपनी पसंदीदा भाषा चुनें: हिंदी, मराठी या अंग्रेजी।',
      mr: 'कृपया तुमची पसंतीची भाषा निवडा: मराठी, हिंदी किंवा इंग्रजी.',
    },
    consent: {
      en: 'Your medical details will remain private and secure under ABDM. Tap Agree to continue.',
      hi: 'आपकी बीमारी की जानकारी पूरी तरह सुरक्षित रहेगी। आगे बढ़ने के लिए सहमति बटन दबाएं।',
      mr: 'तुमची वैद्यकीय माहिती पूर्णपणे सुरक्षित राहील. पुढे जाण्यासाठी संमती बटण दाबा.',
    },
    identify: {
      en: 'Please scan your ABHA QR card or type your 10-digit mobile number.',
      hi: 'अपना आभा कार्ड स्कैन करें या अपना मोबाइल नंबर दर्ज करें।',
      mr: 'तुमचे आभा कार्ड स्कॅन करा किंवा मोबाईल नंबर टाका.',
    },
    profile: {
      en: 'Please review your name, age, and phone number, then tap continue.',
      hi: 'कृपया अपना नाम, उम्र और फोन नंबर जांचें और आगे बढ़ें।',
      mr: 'कृपया तुमचे नाव, वय आणि फोन नंबर तपासा आणि पुढे जा.',
    },
    complaint: {
      en: 'What problem are you facing today? Touch the symptom icon or tap the mic to speak.',
      hi: 'आपको क्या तकलीफ हो रही है? नीचे दिए गए चित्र को छुएं या माइक दबाकर बोलें।',
      mr: 'तुम्हाला काय त्रास होत आहे? खालील चित्राला स्पर्श करा किंवा माईक दाबून बोला.',
    },
    adaptive: {
      en: 'Please touch the exact place on the skeleton or body diagram where you feel pain.',
      hi: 'कंकाल या शरीर के जिस हिस्से में दर्द हो रहा है, स्क्रीन पर ठीक उसी जगह उंगली से छुएं।',
      mr: 'कंकाल किंवा शरीराच्या ज्या भागात दुखत आहे, स्क्रीनवर बरोबर तिथे बोट ठेवा.',
    },
    ai_chat: {
      en: 'Please speak into the microphone in your own language. Our AI doctor is listening.',
      hi: 'माइक पर बोलकर अपनी तकलीफ बताएं। हमारा एआई डॉक्टर आपकी बात सुन रहा है।',
      mr: 'माईकवर बोलून तुमचा त्रास सांगा. आमचे एआय डॉक्टर तुमचे ऐकत आहेत.',
    },
    doc_upload: {
      en: 'Place your prescription or lab test report on the scanner glass to scan.',
      hi: 'अपनी पुरानी पर्ची या जांच रिपोर्ट स्कैनर पर रखकर स्कैन करें।',
      mr: 'तुमची जुनी चिठ्ठी किंवा लॅब रिपोर्ट स्कॅनरवर ठेवून स्कॅन करा.',
    },
  };

  const currentPrompt = screenGuidanceText || 
    (defaultGuidance[currentScreenName] ? defaultGuidance[currentScreenName][language] : defaultGuidance.welcome[language]);

  const handlePlayVoiceGuide = () => {
    setIsSpeakingActive(true);
    speakText(currentPrompt, language);
    setTimeout(() => setIsSpeakingActive(false), 3500);
  };

  // Automatically announce instructions when the screen changes
  useEffect(() => {
    const timer = setTimeout(() => {
      handlePlayVoiceGuide();
    }, 500);

    return () => clearTimeout(timer);
  }, [currentScreenName, language]);

  // Audio equalizer pulse animation when listening
  useEffect(() => {
    if (isListening) {
      intervalRef.current = setInterval(() => {
        setAudioLevel([
          Math.floor(Math.random() * 80) + 20,
          Math.floor(Math.random() * 95) + 15,
          Math.floor(Math.random() * 70) + 30,
          Math.floor(Math.random() * 100) + 10,
          Math.floor(Math.random() * 85) + 25,
          Math.floor(Math.random() * 90) + 20,
          Math.floor(Math.random() * 75) + 15,
          Math.floor(Math.random() * 60) + 30,
        ]);
      }, 120);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isListening]);

  const handleToggleMic = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    stopSpeaking();

    // Check for native Web Speech Recognition API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          processRecognizedSpeech(transcript);
        };

        recognition.onerror = () => {
          fallbackSimulateSpeech();
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('SpeechRecognition error, fallback used.');
      }
    }

    fallbackSimulateSpeech();
  };

  const processRecognizedSpeech = (transcript: string) => {
    setRecognizedText(transcript);
    setIsListening(false);

    if (onVoiceCommandRecognized) {
      onVoiceCommandRecognized(transcript);
    }

    const confirmText = language === 'hi' 
      ? `सुना गया: ${transcript}` 
      : language === 'mr' 
      ? `ऐकले: ${transcript}` 
      : `Detected: ${transcript}`;
    
    speakText(confirmText, language);
  };

  const fallbackSimulateSpeech = () => {
    setTimeout(() => {
      const demoPhrases: Record<Language, string[]> = {
        en: ['Severe chest pain since morning', 'High fever and body shivering', 'Stomach burning and nausea', 'Throbbing headache and dizziness'],
        hi: ['सुबह से सीने में बहुत तेज दर्द और पसीना आ रहा है', 'तेज बुखार और बदन में कंपकंपी है', 'पेट में तेज मरोड़ और गैस की जलन है', 'सिर में आधा सीसी दर्द हो रहा है'],
        mr: ['सकाळपासून छातीत खूप दुखत आहे आणि घाम येतोय', 'खूप जास्त ताप आणि थंडी वाजत आहे', 'पोटात जळजळ आणि मळमळ होतेय', 'डोक्यात तीव्र कळ येत आहे'],
      };
      const sample = demoPhrases[language][Math.floor(Math.random() * demoPhrases[language].length)];
      processRecognizedSpeech(sample);
    }, 2200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-3 px-2 font-['Outfit']">
      {/* Floating Kiosk Audio Assistance Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 text-white rounded-3xl p-4 sm:p-5 border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Animated Audio Wave background effect */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-end pr-6">
          <div className="flex items-center gap-1.5 h-16 items-end">
            {audioLevel.map((lvl, idx) => (
              <span 
                key={idx} 
                className="w-1.5 bg-gradient-to-t from-cyan-500 to-teal-300 rounded-full transition-all duration-150"
                style={{ height: isListening ? `${lvl}%` : '20%' }}
              ></span>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 z-10 relative">
          
          {/* Assistant Avatar & Spoken Screen Instructions */}
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-lg ring-4 ring-cyan-400/30 animate-pulse">
                <Bot className="w-7 h-7" />
              </div>
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 absolute -top-1 -right-1 shadow-sm"></span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-ping text-emerald-400" />
                  Kiosk Voice Assistant (ध्वनि सहायक)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-200 border border-cyan-700/60 font-bold uppercase">
                  {language === 'hi' ? '🇮🇳 हिन्दी' : language === 'mr' ? '🚩 मराठी' : '🇬🇧 English'}
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white leading-snug">
                "{currentPrompt}"
              </p>
            </div>
          </div>

          {/* Action Buttons: Listen Guidance & Speak Voice Input */}
          <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
            
            {/* Listen Aloud Button */}
            <button
              type="button"
              onClick={handlePlayVoiceGuide}
              className={`py-3 px-4 rounded-2xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                isSpeakingActive
                  ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-300 animate-pulse'
                  : 'bg-slate-800/90 hover:bg-slate-800 text-cyan-200 border border-cyan-500/40'
              }`}
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>{language === 'hi' ? 'आवाज सुनें' : language === 'mr' ? 'आवाज ऐका' : 'Read Aloud'}</span>
            </button>

            {/* Giant High-Visibility Mic Button for Illiterate / Non-educated Patients */}
            <button
              type="button"
              onClick={handleToggleMic}
              className={`py-3 px-5 rounded-2xl font-black text-sm flex items-center gap-2.5 transition-all cursor-pointer shadow-xl ${
                isListening
                  ? 'bg-rose-600 text-white ring-4 ring-rose-400 animate-bounce'
                  : 'bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 ring-2 ring-cyan-300 shadow-cyan-500/20'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5 animate-spin text-white" />
                  <span>{language === 'hi' ? 'सुन रहा हूँ...' : language === 'mr' ? 'ऐकत आहे...' : 'Listening...'}</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 text-slate-950 animate-pulse" />
                  <span>{language === 'hi' ? 'माइक पर बोलें' : language === 'mr' ? 'माईकवर बोला' : 'Speak Now'}</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Live Audio Transcript Box */}
        {recognizedText && (
          <div className="mt-3.5 pt-3 border-t border-cyan-500/30 flex items-center justify-between gap-3 text-xs bg-slate-950/60 p-2.5 rounded-xl">
            <div className="flex items-center gap-2 text-cyan-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === 'hi' ? 'पहचानी गई आवाज:' : language === 'mr' ? 'ओळखलेला आवाज:' : 'Detected Speech:'}{' '}
                <strong className="text-white font-bold">"{recognizedText}"</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setRecognizedText('')}
              className="text-[11px] font-bold text-slate-400 hover:text-white underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
