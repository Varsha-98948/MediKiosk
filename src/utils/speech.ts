import { Language } from '@/types/patient';

export function speakText(text: string, language: Language = 'en'): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  const langMap: Record<Language, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    mr: 'mr-IN',
  };

  utterance.lang = langMap[language] || 'en-IN';
  utterance.rate = 0.95; // Slightly measured rate for clear patient comprehension
  utterance.pitch = 1.0;

  // Try to pick appropriate Indian regional voice if available in client voices
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(langMap[language])) ||
                       voices.find(v => v.lang.includes('IN')) ||
                       voices.find(v => v.name.toLowerCase().includes('india'));
  
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
