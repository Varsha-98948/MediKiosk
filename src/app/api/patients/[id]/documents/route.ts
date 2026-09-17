import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = params.id;
    const documents = await prisma.patientDocument.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      documents: documents.map((doc) => {
        let extractedFields = [];
        let medicinesFound = [];
        if (doc.extractedData) {
          try {
            const parsed = JSON.parse(doc.extractedData);
            extractedFields = parsed.extractedFields || [];
            medicinesFound = parsed.medicinesFound || [];
          } catch (e) {}
        }
        return {
          id: doc.id,
          title: doc.title,
          type: doc.type,
          fileUrl: doc.fileUrl,
          mimeType: doc.mimeType,
          fileSizeBytes: doc.fileSizeBytes,
          clinicalImpression: doc.clinicalImpression,
          confidenceScore: doc.confidenceScore,
          extractedFields,
          medicinesFound,
          createdAt: doc.createdAt,
        };
      }),
    });
  } catch (error: any) {
    console.error('[PatientDocuments] Fetch error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch patient documents' }, { status: 500 });
  }
}
