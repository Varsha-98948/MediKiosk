'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Keyboard, 
  Hand, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Bot, 
  Smile, 
  ShieldAlert,
  Send,
  Video,
  Languages
} from 'lucide-react';
import { Language } from '../../types';
import { speakText, stopSpeaking } from '../../utils/speech';

export interface AiInterviewAnswer {
  questionId: string;
  questionText: string;
  answerText: string;
  modalityUsed: 'voice' | 'text' | 'selection' | 'sign_language';
  confidenceScore: number;
}

interface AdaptiveAiInterviewProps {
  language?: Language;
  onCompleteInterview: (answers: AiInterviewAnswer[]) => void;
  onBack?: () => void;
  initialComplaint?: string;
  selectedMarma?: string;
}

interface AdaptiveQuestion {
  id: string;
  text: {
    en: string;
    hi: string;
    mr: string;
  };
  ayushContext: string;
  quickOptions: {
    en: string[];
    hi: string[];
    mr: string[];
  };
  signDemoGifText: string;
}

const INTERVIEW_QUESTIONS: AdaptiveQuestion[] = [
  {
    id: 'q1_chief_feeling',
    text: {
      en: 'What is bothering you the most today? Tell me in your own words.',
      hi: 'आज आपको सबसे अधिक क्या परेशानी या तकलीफ हो रही है? अपने शब्दों में बताएं।',
      mr: 'आज तुम्हाला सर्वात जास्त कोणता त्रास किंवा वेदना होत आहे? तुमच्या शब्दांत सांगा.',
    },
    ayushContext: 'Pradhana Vedana (Chief Complaint) • Vata/Pitta/Kapha Trigger',
    quickOptions: {
      en: ['Chest discomfort / Pressure', 'Severe Joint Stiffness', 'Chronic Acidity / Burning', 'Throbbing Headache'],
      hi: ['सीने में भारीपन व दबाव', 'जोड़ों में तेज जकड़न व दर्द', 'पेट में तेज जलन व खट्टी डकारें', 'सिर में तेज धड़कन जैसा दर्द'],
      mr: ['छातीत जडपणा आणि दाब', 'सांध्यांमध्ये तीव्र आखडलेपणा', 'पोटात जळजळ आणि पित्त', 'डोक्यात तीव्र ठसठस'],
    },
    signDemoGifText: 'Sign: "What pain or distress do you feel today?"',
  },
  {
    id: 'q2_onset_radiation',
    text: {
      en: 'Does this discomfort travel or radiate to another body area like your left arm, jaw, or down your legs?',
      hi: 'क्या यह दर्द आपके शरीर के किसी अन्य हिस्से, जैसे बाएं हाथ, जबड़े या पैर की तरफ फैलता है?',
      mr: 'ही वेदना तुमच्या शरीराच्या दुसऱ्या भागात, जसे डावा हात, जबडा किंवा पायाकडे पसरते का?',
    },
    ayushContext: 'Tiryak Gati (Path of Radiation) • Srotas Involvement',
    quickOptions: {
      en: ['Yes, radiates to left shoulder & arm', 'Yes, shoots down the back of my leg', 'No, remains localized at one spot', 'Spreads all over body with heaviness'],
      hi: ['हाँ, बाएं कंधे और हाथ की ओर जाता है', 'हाँ, पैर के पीछे करंट जैसा दौड़ता है', 'नहीं, सिर्फ एक ही जगह रहता है', 'पूरे शरीर में भारीपन के साथ फैलता है'],
      mr: ['होय, डाव्या खांद्याकडे आणि हाताकडे जाते', 'होय, पायाच्या मागून कळ जाते', 'नाही, फक्त एकाच जागी राहते', 'संपूर्ण अंगात जडपणासह पसरते'],
    },
    signDemoGifText: 'Sign: "Does pain move or stay in one place?"',
  },
  {
    id: 'q3_time_aggravation',
    text: {
      en: 'At what time of day or under what conditions is your distress at its worst?',
      hi: 'दिन के किस समय या किन परिस्थितियों में यह तकलीफ सबसे अधिक बढ़ जाती है?',
      mr: 'दिवसाच्या कोणत्या वेळी किंवा कोणत्या कारणाने हा त्रास सर्वात जास्त वाढतो?',
    },
    ayushContext: 'Kala Bala (Circadian Agitation) • Vata (Morning/Night) vs Pitta (Noon)',
    quickOptions: {
      en: ['Early morning upon waking up', 'Right after climbing stairs / walking', 'Immediately after spicy or heavy meals', 'Late evening after a long working day'],
      hi: ['सुबह सोकर उठते ही सबसे ज्यादा', 'सीढ़ी चढ़ने या तेज चलने पर', 'मसालेदार भोजन करने के तुरंत बाद', 'शाम को काम के बाद थकावट में'],
      mr: ['सकाळी उठल्यावर सर्वात जास्त', 'जिना चढताना किंवा चालताना', 'मसालेदार जेवणानंतर लगेच', 'संध्याकाळी कामाच्या थकव्यानंतर'],
    },
    signDemoGifText: 'Sign: "When is pain worst: Morning, Evening, or After Walking?"',
  },
  {
    id: 'q4_appetite_sleep',
    text: {
      en: 'How is your digestion and sleep lately? Any constipation or restless nights?',
      hi: 'आपकी भूख, पाचन और नींद कैसी है? क्या कब्ज या रात में नींद टूटने की समस्या है?',
      mr: 'तुमची भूक, पचन आणि झोप कशी आहे? बद्धकोष्ठता किंवा रात्री झोपमोड होते का?',
    },
    ayushContext: 'Agni & Nidra Assessment • Mandagni & Vataja Nidranasha',
    quickOptions: {
      en: ['Poor appetite, frequent bloating & constipation', 'Normal digestion but disturbed sleep', 'High appetite with severe acid reflux', 'Good digestion and sound sleep'],
      hi: ['भूख कम लगती है, पेट फूलना और कब्ज रहता है', 'पाचन ठीक है पर रात को नींद नहीं आती', 'भूख बहुत तेज लगती है और सीने में जलन होती है', 'पाचन और नींद दोनों बिल्कुल ठीक हैं'],
      mr: ['भूक कमी, पोट फुगणे आणि बद्धकोष्ठता', 'पचन ठीक आहे पण झोप लागत नाही', 'खूप भूक आणि तीव्र जळजळ होते', 'पचन आणि झोप दोन्ही उत्तम आहेत'],
    },
    signDemoGifText: 'Sign: "How is your digestion, stomach, and sleep?"',
  },
];

export const AdaptiveAiInterview: React.FC<AdaptiveAiInterviewProps> = ({
  language = 'en',
  onCompleteInterview,
  onBack,
  initialComplaint,
  selectedMarma,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedModality, setSelectedModality] = useState<'voice' | 'text' | 'selection' | 'sign_language'>('selection');
  const [isRecording, setIsRecording] = useState(false);
  const [customText, setCustomText] = useState('');
  const [recordedSpeech, setRecordedSpeech] = useState('');
  const [showSignModal, setShowSignModal] = useState(false);
  const [answers, setAnswers] = useState<AiInterviewAnswer[]>([]);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);

  const currentQ = INTERVIEW_QUESTIONS[currentQIndex];
  const progressPercent = Math.round(((currentQIndex + 1) / INTERVIEW_QUESTIONS.length) * 100);

  // Auto-speak question on transition
  useEffect(() => {
    const textToSpeak = currentQ.text[language];
    speakQuestionAudio(textToSpeak);
  }, [currentQIndex, language]);

  const speakQuestionAudio = (text: string) => {
    setIsSpeakingQuestion(true);
    speakText(text, language);
    setTimeout(() => setIsSpeakingQuestion(false), 3500);
  };

  const handleSimulateVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    // Simulate real-time speech transcription
    const simulatedTranscripts = [
      'I have this constant deep pain in my chest that goes down my left hand when I walk fast.',
      'Yes, early morning when I get up from bed, all my knuckles and knees feel completely locked and stiff.',
      'It burns like fire in the middle of my stomach two hours after lunch.',
      'My digestion is very weak and I get severe headaches when I work under bright lights.'
    ];

    setTimeout(() => {
      const captured = simulatedTranscripts[currentQIndex % simulatedTranscripts.length];
      setRecordedSpeech(captured);
      setIsRecording(false);
      recordAnswerAndAdvance(captured, 'voice');
    }, 2500);
  };

  const recordAnswerAndAdvance = (answer: string, modality: 'voice' | 'text' | 'selection' | 'sign_language') => {
    const newAns: AiInterviewAnswer = {
      questionId: currentQ.id,
      questionText: currentQ.text[language],
      answerText: answer,
      modalityUsed: modality,
      confidenceScore: modality === 'voice' ? 0.94 : modality === 'sign_language' ? 0.91 : 0.99,
    };

    const updated = [...answers, newAns];
    setAnswers(updated);
    setCustomText('');
    setRecordedSpeech('');

    if (currentQIndex + 1 < INTERVIEW_QUESTIONS.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      onCompleteInterview(updated);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl border border-[#E6ECE8] p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Top Header & Progress */}
      <div className="space-y-3 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#0D5C4D] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">
                  Adaptive Ayush Clinical AI Intake
                </h3>
                <span className="text-[10px] font-extrabold bg-[#EBF3EF] text-[#0D5C4D] px-2 py-0.5 rounded-full border border-[#D1E4DB]">
                  Dynamic Branching
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {currentQ.ayushContext}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-black text-[#0D5C4D]">
              Question {currentQIndex + 1} of {INTERVIEW_QUESTIONS.length}
            </span>
            <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-[#0D5C4D] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Central Question Display Card with Animated Speaking Indicator */}
      <div className="bg-[#FAFBF9] p-6 sm:p-7 rounded-2xl border border-slate-200/90 space-y-4 relative">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
            AI Assistant Question
          </span>
          <button
            type="button"
            onClick={() => speakQuestionAudio(currentQ.text[language])}
            className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isSpeakingQuestion
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 animate-pulse'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs'
            }`}
            title="Listen to question"
          >
            <Volume2 className="w-4 h-4 text-[#0D5C4D]" />
            <span>Repeat Question</span>
          </button>
        </div>

        <div className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
          "{currentQ.text[language]}"
        </div>

        {/* Dynamic Modality Selector Toolbar: 🎙 Speak, ⌨ Type, 👆 Select, 🤟 Sign */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-700">
          <span className="text-slate-400 font-medium">Answer via:</span>
          
          <button
            type="button"
            onClick={() => setSelectedModality('selection')}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedModality === 'selection'
                ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>👆 Touch Options</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedModality('voice')}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedModality === 'voice'
                ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>🎙 Speak Voice</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedModality('text')}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedModality === 'text'
                ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>⌨ Type Input</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedModality('sign_language');
              setShowSignModal(true);
            }}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedModality === 'sign_language'
                ? 'bg-[#0D5C4D] text-white border-[#0D5C4D] shadow-xs'
                : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-amber-700" />
            <span>🤟 Indian Sign Language (ISL)</span>
          </button>
        </div>
      </div>

      {/* Active Modality Input Surfaces */}
      <div className="space-y-4">
        
        {/* Modality 1: Touch Quick Selection Chips */}
        {selectedModality === 'selection' && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500">
              Touch the statement that matches best:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.quickOptions[language].map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => recordAnswerAndAdvance(option, 'selection')}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-[#0D5C4D] bg-white hover:bg-[#EBF3EF]/40 text-left text-xs sm:text-sm font-black text-slate-800 transition-all cursor-pointer shadow-2xs hover:shadow-sm flex items-center justify-between group"
                >
                  <span className="leading-snug">{option}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0D5C4D] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modality 2: Large Microphone Voice Interaction */}
        {selectedModality === 'voice' && (
          <div className="bg-[#FAFBF9] p-6 rounded-2xl border border-slate-200 text-center space-y-4">
            <div className="flex flex-col items-center space-y-3">
              <button
                type="button"
                onClick={handleSimulateVoiceInput}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-200 scale-110'
                    : 'bg-[#0D5C4D] text-white hover:bg-[#0F4C42] ring-4 ring-[#EBF3EF]'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              <div>
                <div className="text-sm font-black text-slate-900">
                  {isRecording ? 'Listening to your speech...' : 'Tap Microphone to Speak'}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {isRecording ? 'Speak naturally in Hindi, Marathi, or English' : 'Voice will be transcribed and verified by doctor'}
                </div>
              </div>
            </div>

            {isRecording && (
              <div className="flex items-center justify-center gap-1 h-8">
                <span className="w-1.5 h-6 bg-rose-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-8 bg-rose-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-1.5 h-4 bg-rose-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                <span className="w-1.5 h-7 bg-rose-500 rounded-full animate-bounce [animation-delay:0.45s]"></span>
                <span className="w-1.5 h-5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              </div>
            )}
          </div>
        )}

        {/* Modality 3: Virtual Keyboard / Text Typing */}
        {selectedModality === 'text' && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-600">
              Type your answer or symptom details:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type here..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customText.trim()) {
                    recordAnswerAndAdvance(customText.trim(), 'text');
                  }
                }}
                className="flex-1 px-4 py-3 bg-white rounded-xl border border-slate-300 text-sm font-medium focus:border-[#0D5C4D] focus:ring-2 focus:ring-[#0D5C4D]/20 outline-none"
              />
              <button
                type="button"
                disabled={!customText.trim()}
                onClick={() => recordAnswerAndAdvance(customText.trim(), 'text')}
                className="px-5 py-3 bg-[#0D5C4D] disabled:bg-slate-300 text-white rounded-xl font-black text-xs cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>Submit</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Modality 4: Indian Sign Language Recognition Demonstration */}
        {selectedModality === 'sign_language' && (
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-amber-700" />
                Indian Sign Language (ISL) Recognition Camera Active
              </span>
              <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                AI Gesture PoseNet
              </span>
            </div>

            <div className="h-40 bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white text-center p-4 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-400/80 flex items-center justify-center animate-pulse">
                <Hand className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-xs font-bold mt-2">Sign Gesture Detected: "Severe Chest Pressure (छाती दाब)"</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Confidence: 91.4% • ISL Standardized Dictionary</div>
              <span className="absolute top-2 right-2 text-[10px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-black">
                REC
              </span>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => recordAnswerAndAdvance('Indian Sign Language: Severe Chest Pressure and Radiating Ache', 'sign_language')}
                className="px-4 py-2 bg-[#0D5C4D] text-white rounded-xl text-xs font-black cursor-pointer shadow-xs"
              >
                Confirm Detected Gesture
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Nav: Back & Skip */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-slate-500">
        <button
          type="button"
          onClick={() => {
            if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
            else if (onBack) onBack();
          }}
          className="hover:text-slate-900 cursor-pointer flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <button
          type="button"
          onClick={() => recordAnswerAndAdvance('Skipped by patient', 'selection')}
          className="hover:text-slate-900 cursor-pointer"
        >
          Skip Question
        </button>
      </div>

    </div>
  );
};
