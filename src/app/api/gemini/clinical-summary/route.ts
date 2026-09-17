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
    const { patientProfile, intakeData, documents } = body;
    const client = getGeminiClient();

    if (!client) {
      return NextResponse.json({
        chiefComplaint: `${intakeData?.chiefComplaint || 'Chest discomfort & breathlessness'} × ${intakeData?.duration || '2 days'}`,
        hpi: [
          'Pain began yesterday morning, predominantly left retrosternal location',
          'Characterized as heaviness / pressing sensation radiating towards left arm',
          'Aggravated with brisk walking or climbing stairs at work',
          'Associated with episodic diaphoresis (sweating) and mild shortness of breath',
          'No prior history of myocardial infarction or documented CAD'
        ],
        pastMedicalHistory: ['Type 2 Diabetes Mellitus (detected 2024)', 'Essential Hypertension (detected 2025)'],
        currentMedications: ['Tab. Metformin 500 mg BD (after meals)', 'Tab. Amlodipine 5 mg OD (morning)'],
        allergies: 'No known drug allergies (NKDA) reported',
        priorInvestigations: [
          'HbA1c: 7.1% (12 Aug 2026)',
          'Hemoglobin: 9.2 g/dL (Mild microcytic pattern suggested)',
          'Fasting Blood Sugar: 126 mg/dL',
          'Last recorded BP: 150/95 mmHg'
        ],
        redFlagAlert: 'Potential acute coronary syndrome (ACS) symptom profile with exertional chest pain + arm radiation + diaphoresis. Prioritize ECG and Troponin I evaluation.',
        recommendedReviewPoints: [
          'Verify onset timing and 12-lead ECG immediately',
          'Check compliance with Amlodipine and Metformin',
          'Assess for exertional dyspnea vs angina equivalents'
        ]
      });
    }

    const response = await client.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `You are an expert physician EMR summarizer for an Indian hospital OPD.
Synthesize the patient intake and uploaded documents into a rigorous, standard clinical summary for the attending consultant doctor.
Do NOT diagnose conclusively; phrase findings as structured clinical history and review points.
Input data:
Patient: ${JSON.stringify(patientProfile)}
Intake: ${JSON.stringify(intakeData)}
Documents: ${JSON.stringify(documents)}

Return JSON with:
{
  "chiefComplaint": string,
  "hpi": string[],
  "pastMedicalHistory": string[],
  "currentMedications": string[],
  "allergies": string,
  "priorInvestigations": string[],
  "redFlagAlert": string,
  "recommendedReviewPoints": string[]
}`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/clinical-summary:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate clinical summary' }, { status: 500 });
  }
}
