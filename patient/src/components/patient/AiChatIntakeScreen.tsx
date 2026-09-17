import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  Bot, 
  User, 
  RotateCcw, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { speakText, stopSpeaking } from '../../utils/speech';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  options?: string[];
  redFlag?: boolean;
}

interface AiChatIntakeScreenProps {
  language: Language;
  chiefComplaint: string;
  onFinishChat: (transcript: string, redFlagDetected: boolean) => void;
  onBack: () => void;
}

export const AiChatIntakeScreen: React.FC<AiChatIntakeScreenProps> = ({
  language,
  chiefComplaint,
  onFinishChat,
  onBack,
}) => {
  const t = translations[language];

  const initialGreeting: Record<Language, string> = {
    en: `Hello. I am your MediKiosk AI Clinical Intake Assistant. I see you are experiencing ${chiefComplaint || 'chest discomfort'}. When did this pain or discomfort first begin?`,
    hi: `नमस्ते। मैं आपका मेडीकियोस्क एआई स्वास्थ्य सहायक हूँ। क्या आप बता सकते हैं कि यह समस्या या दर्द सबसे पहले कब शुरू हुआ था?`,
    mr: `नमस्कार. मी आपला मेडीकिऑस्क एआय आरोग्य सहाय्यक आहे. हा त्रास किंवा वेदना सर्वप्रथम कधी सुरू झाली हे सांगू शकाल का?`,
  };

  const initialOptions: Record<Language, string[]> = {
    en: ['Since yesterday morning', 'Started 2 hours ago', 'Past 3-4 days', 'Few weeks ago'],
    hi: ['कल सुबह से', '२ घंटे पहले शुरू हुआ', 'पिछले ३-४ दिनों से', 'कई हफ़्तों से'],
    mr: ['काल सकाळपासून', '२ तासांपूर्वी सुरू झाला', 'मागील ३-४ दिवसांपासून', 'काही आठवड्यांपासून'],
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: initialGreeting[language],
      options: initialOptions[language],
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasRedFlag, setHasRedFlag] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, liveTranscript, isLoading]);

  // Voice recording simulation or real Web Speech Recognition if supported
  const toggleRecording = () => {
    if (isListening) {
      setIsListening(false);
      if (liveTranscript) {
        handleSendMessage(liveTranscript);
        setLiveTranscript('');
      }
    } else {
      setIsListening(true);
      setLiveTranscript('');
      
      // Simulate live progressive speech transcription for kiosk realism
      const simulatedPhrases: Record<Language, string[]> = {
        en: [
          'My chest started hurting yesterday...',
          'It is heavy and spreading to my left arm...',
          'I also felt sweating when climbing stairs.'
        ],
        hi: [
          'कल से छाती में भारीपन लग रहा है...',
          'दर्द बाईं बांह में भी जा रहा है...',
          'चलने पर पसीना और घबराहट होती है।'
        ],
        mr: [
          'कालपासून छातीत जडपणा जाणवत आहे...',
          'वेदना डाव्या हातातही पसरत आहे...',
          'जिने चढताना घाम आणि धाप लागते.'
        ]
      };

      const phrases = simulatedPhrases[language];
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx < phrases.length) {
          setLiveTranscript(phrases[currentIdx]);
          currentIdx++;
        } else {
          clearInterval(interval);
        }
      }, 1400);

      // Web Speech API fallback check
      if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        try {
          const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
          const recognition = new SpeechRec();
          recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
              .map((res: any) => res[0].transcript)
              .join('');
            setLiveTranscript(transcript);
          };
          recognition.start();
        } catch (e) {
          // fallback interval is running
        }
      }
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLiveTranscript('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/intake-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.sender === 'ai' ? 'assistant' : 'user', content: m.text })),
          language,
          chiefComplaint,
        }),
      });

      const data = await res.json();
      const aiReplyText = data.reply || (
        language === 'hi'
          ? 'धन्यवाद। क्या यह दर्द चलने पर बढ़ता है, या आपको पसीना/सांस फूलने की शिकायत भी है?'
          : language === 'mr'
          ? 'धन्यवाद. हा त्रास चालताना वाढतो का, किंवा घाम/धाप लागते का?'
          : 'Thank you. Does this pain increase during physical exertion, or do you notice associated sweating or breathlessness?'
      );

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        options: data.suggestedOptions || [
          language === 'hi' ? 'हाँ, पसीना आता है' : language === 'mr' ? 'होय, घाम येतो' : 'Yes, sweating & breathlessness',
          language === 'hi' ? 'चलने पर बढ़ता है' : language === 'mr' ? 'चालताना वाढतो' : 'Worse when walking',
          language === 'hi' ? 'केवल भारीपन है' : language === 'mr' ? 'फक्त जडपणा आहे' : 'Only heavy sensation',
        ],
        redFlag: data.redFlagDetected || text.toLowerCase().includes('chest') || text.toLowerCase().includes('sweat'),
      };

      if (aiMsg.redFlag) {
        setHasRedFlag(true);
      }

      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiReplyText, language);
    } catch (err) {
      console.error(err);
      const fallbackAiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: language === 'hi' 
          ? 'आपकी जानकारी दर्ज कर ली गई है। क्या आपको पहले से मधुमेह (Diabetes) या ब्लड प्रेशर की शिकायत है?'
          : language === 'mr'
          ? 'तुमची माहिती नोंदवली आहे. तुम्हाला आधीपासून मधुमेह (Diabetes) किंवा बीपीचा त्रास आहे का?'
          : 'Your response is noted. Do you have any prior history of Diabetes or High Blood Pressure?',
        options: [
          language === 'hi' ? 'हाँ, डायबिटीज है' : language === 'mr' ? 'होय, मधुमेह आहे' : 'Yes, have Diabetes & BP',
          language === 'hi' ? 'नहीं, कोई बीमारी नहीं' : language === 'mr' ? 'नाही, काहीही नाही' : 'No prior chronic conditions',
        ],
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteIntake = () => {
    const fullTranscript = messages
      .map(m => `${m.sender.toUpperCase()}: ${m.text}`)
      .join('\n');
    onFinishChat(fullTranscript, hasRedFlag);
  };

  return (
    <div className="flex flex-col h-[660px] max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
      
      {/* Top AI Header */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-400/30">
            <Bot className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg">{t.aiAssistantHeader}</h3>
              <span className="flex items-center gap-1 text-[11px] font-semibold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-400/30">
                <Sparkles className="w-3 h-3 text-amber-300" /> Clinical Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">{t.aiAssistantSubheader}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCompleteIntake}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Finish & Next</span>
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs font-semibold text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{t.aiDoctorDisclaimer}</span>
        </div>
        {hasRedFlag && (
          <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-[10px] font-extrabold animate-pulse">
            Priority Flag
          </span>
        )}
      </div>

      {/* Scrollable Conversation History */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0 text-xs shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl space-y-3 ${
                m.sender === 'user'
                  ? 'bg-teal-700 text-white rounded-tr-none shadow-xs font-medium'
                  : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none shadow-sm'
              }`}
            >
              <p className="text-sm sm:text-base leading-relaxed">{m.text}</p>

              {/* Quick-reply button options if attached to AI response */}
              {m.options && m.options.length > 0 && (
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                  {m.options.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(opt)}
                      className="text-xs font-bold bg-slate-100 hover:bg-teal-800 hover:text-white hover:border-teal-800 text-teal-950 px-3 py-1.5 rounded-full border border-slate-200 transition-all cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {m.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0 text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 text-xs text-slate-700 font-semibold">
              <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse delay-200"></div>
              <span>Structuring clinical response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Live Voice Recording Overlay / Bottom Controller */}
      <div className="p-4 bg-white border-t border-slate-200 space-y-3">
        
        {/* Live Audio Transcription Banner */}
        {isListening && (
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 flex items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center animate-ping">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  {t.speakNaturally}
                </span>
                <p className="text-sm font-semibold text-slate-800 italic">
                  "{liveTranscript || 'Listening to your voice...'}"
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleRecording}
              className="px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              {t.stopVoice}
            </button>
          </div>
        )}

        {/* Input Controls */}
        <div className="flex items-center gap-2">
          
          {/* Large Accessible Microphone Button */}
          <button
            type="button"
            id="btn-ai-chat-mic"
            onClick={toggleRecording}
            className={`p-3.5 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white ring-4 ring-rose-200 scale-105 shadow-md'
                : 'bg-teal-700 hover:bg-teal-800 text-white shadow-md'
            }`}
            title="Voice Input"
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            id="input-ai-chat-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder={
              language === 'hi' 
                ? 'अपनी बात लिखें या बोलकर बताएं...' 
                : language === 'mr' 
                ? 'येथे लिहा किंवा बोलून सांगा...' 
                : 'Type your symptoms or speak...'
            }
            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className={`p-3.5 rounded-2xl flex items-center justify-center transition-all ${
              inputText.trim()
                ? 'bg-teal-700 text-white hover:bg-teal-800 cursor-pointer shadow-md'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
};
