import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

let genAI: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history, language = 'en', chiefComplaint } = body;
    const client = getGeminiClient();

    if (!client) {
      const simulatedResponses: Record<string, string> = {
        en: `I understand your concern about ${chiefComplaint || 'your symptoms'}. To help the doctor prepare for your visit, could you share if this pain radiates to your arm, jaw, or back, and whether it worsens when walking or climbing stairs?`,
        hi: `मैं आपकी समस्या समझ रहा हूँ। डॉक्टर साहब को आपकी सही जांच करने में सहायता के लिए, कृपया बताएं कि क्या यह दर्द चलने या सीढ़ियां चढ़ने पर बढ़ता है, या बांह/पीठ में फैलता है?`,
        mr: `मला तुमचे त्रास समजले आहेत. डॉक्टरांना योग्य निदान करण्यास मदत व्हावी म्हणून, कृपया सांगा की हा त्रास चालताना किंवा जिने चढताना वाढतो का, किंवा पाठीत/हातात पसरतो का?`,
      };
      return NextResponse.json({
        reply: simulatedResponses[language] || simulatedResponses.en,
        redFlagDetected: !!(
          message?.toLowerCase().includes('chest') &&
          (message?.toLowerCase().includes('sweat') || message?.toLowerCase().includes('breath'))
        ),
        suggestedOptions:
          language === 'hi'
            ? ['हाँ, फैलता है', 'नहीं, केवल एक जगह', 'चलने पर बढ़ता है', 'पसीना भी आ रहा है']
            : language === 'mr'
            ? ['होय, पसरतो', 'नाही, एकाच जागी', 'चालताना वाढतो', 'घामही येतो']
            : ['Yes, radiates to arm', 'No, stays in center', 'Worse when walking', 'Also sweating'],
      });
    }

    const systemPrompt = `You are "MediKiosk AI Assistant", an empathetic, accessible clinical intake assistant for Indian hospital outpatient departments (OPD).
LANGUAGE: Respond strictly in the requested language: ${language === 'hi' ? 'Hindi (Devanagari script)' : language === 'mr' ? 'Marathi (Devanagari script)' : 'Simple, clear English'}.
CRITICAL SAFETY RULES:
1. NEVER provide a final diagnosis, prognosis, or recommend specific drug prescriptions.
2. The user is a patient in an OPD waiting room or kiosk. Your role is strictly to collect structured clinical history (onset, duration, severity, radiation, aggravating/relieving factors, associated symptoms like nausea, breathlessness, sweating).
3. Keep your response very concise (1-2 sentences max), empathetic, and easy to understand for elderly or low-literacy patients.
4. If the patient mentions red flag symptoms (severe chest pain with sweating/breathlessness, sudden weakness/facial droop, acute severe bleeding, sudden severe headache), note that a red flag should be flagged.
5. Provide 3-4 short quick-reply buttons in the same language.`;

    const prompt = `Chief Complaint: ${chiefComplaint || 'General'}
Patient Message: ${message}
Previous Dialog History: ${JSON.stringify(history || [])}

Provide your response in JSON format with:
- "reply": string (polite, concise question in ${language})
- "redFlagDetected": boolean
- "suggestedOptions": string array (3-4 concise options for touch screens in ${language})`;

    const response = await client.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/intake-chat:', error);
    return NextResponse.json({ error: error.message || 'Failed to process chat' }, { status: 500 });
  }
}
