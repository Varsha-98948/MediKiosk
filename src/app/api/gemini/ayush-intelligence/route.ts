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
    const { patientRecord, prakriti } = body;
    const client = getGeminiClient();

    if (!client) {
      return NextResponse.json({
        prakritiAnalysis: prakriti || 'Pitta-Kapha (द्वन्द्वज)',
        doshaImbalance: 'Pitta-Vata Vitiation with Agni Mandya',
        herbDrugInteractions: [
          {
            herb: 'Arjuna Kwatha (Terminalia Arjuna)',
            allopathicDrug: 'Ecosprin 75mg (Aspirin)',
            note: 'Safe cardiotonic synergism without excess antiplatelet potentiation at 15ml BD dosage.',
            severity: 'safe',
          },
          {
            herb: 'Guggulu Formulations',
            allopathicDrug: 'Atorvastatin 20mg',
            note: 'Monitor liver enzymes periodically; mild additive lipid-lowering property.',
            severity: 'caution',
          },
        ],
        pathyaApathya: {
          pathya: ['Warm barley water', 'Mung dal soup with cumin', 'Pomegranate', 'Pitta pacifying herbs'],
          apathya: ['Reheated heavy oils', 'Excessive raw garlic', 'Late night heavy meals', 'Excess salt'],
        },
        recommendedAyushCodes: [
          { code: 'NAM-AY-0819', term: 'Hridroga (Hrdshula - Cardiac Distress Syndrome)' },
          { code: 'NAM-AY-0412', term: 'Madhumeda (Prameha - Metabolic Glycemic State)' },
        ],
      });
    }

    const response = await client.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `Analyze the following patient record and Ayush prakriti inputs to provide an integrative clinical guidance report.
Patient Data: ${JSON.stringify(patientRecord)}
Prakriti: ${JSON.stringify(prakriti)}

Output JSON structure:
{
  "prakritiAnalysis": string,
  "doshaImbalance": string,
  "herbDrugInteractions": [
    { "herb": string, "allopathicDrug": string, "note": string, "severity": "safe" | "caution" | "contraindicated" }
  ],
  "pathyaApathya": {
    "pathya": string[],
    "apathya": string[]
  },
  "recommendedAyushCodes": [
    { "code": string, "term": string }
  ]
}`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/ayush-intelligence:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate Ayush intelligence' }, { status: 500 });
  }
}
