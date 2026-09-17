import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadDocumentFile } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let fileBuffer: Buffer | undefined;
    let base64Data: string | undefined;
    let fileName = 'medical-document.jpg';
    let mimeType = 'image/jpeg';
    let patientId: string | undefined;
    let encounterId: string | undefined;
    let documentType = 'lab_report';
    let title = 'Medical Document';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      if (!file) {
        return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
      }

      fileName = file.name || fileName;
      mimeType = file.type || mimeType;
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);

      patientId = (formData.get('patientId') as string) || undefined;
      encounterId = (formData.get('encounterId') as string) || undefined;
      documentType = (formData.get('documentType') as string) || documentType;
      title = (formData.get('title') as string) || fileName;
    } else {
      const body = await req.json();
      base64Data = body.imageBase64 || body.fileBase64;
      fileName = body.fileName || fileName;
      mimeType = body.mimeType || mimeType;
      patientId = body.patientId;
      encounterId = body.encounterId;
      documentType = body.documentType || documentType;
      title = body.title || title;

      if (!base64Data) {
        return NextResponse.json({ error: 'No imageBase64 or fileBase64 provided' }, { status: 400 });
      }
    }

    // 1. Upload to Supabase / Object Storage
    const uploadResult = await uploadDocumentFile({
      fileBuffer,
      base64Data,
      fileName,
      mimeType,
      patientId,
    });

    // 2. Perform OCR extraction via Gemini if available
    let extractedFields: any[] = [];
    let medicinesFound: any[] = [];
    let clinicalImpression = 'Uploaded document processed';
    let confidenceScore = 95.0;

    try {
      const ocrRes = await fetch(`${process.env.APP_URL || 'http://localhost:3000'}/api/gemini/ocr-audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data || (fileBuffer ? `data:${mimeType};base64,${fileBuffer.toString('base64')}` : ''),
          documentType,
        }),
      });

      if (ocrRes.ok) {
        const ocrData = await ocrRes.json();
        extractedFields = ocrData.extractedFields || [];
        medicinesFound = ocrData.medicinesFound || [];
        clinicalImpression = ocrData.clinicalImpression || clinicalImpression;
        confidenceScore = ocrData.confidenceScore || confidenceScore;
        if (ocrData.documentType) {
          title = ocrData.documentType;
        }
      }
    } catch (ocrErr) {
      console.warn('[DocumentUpload] OCR audit extraction skipped/failed:', ocrErr);
    }

    // 3. If patientId is provided, store metadata + storage URL in PostgreSQL
    let savedDocument = null;
    if (patientId) {
      try {
        savedDocument = await prisma.patientDocument.create({
          data: {
            patientId,
            encounterId: encounterId || null,
            title,
            type: documentType,
            fileUrl: uploadResult.fileUrl,
            storageKey: uploadResult.storageKey,
            storageBucket: uploadResult.storageBucket,
            mimeType: uploadResult.mimeType,
            fileSizeBytes: uploadResult.fileSizeBytes,
            extractedData: JSON.stringify({ extractedFields, medicinesFound }),
            clinicalImpression,
            confidenceScore,
          },
        });
      } catch (dbErr: any) {
        console.warn('[DocumentUpload] Failed to record PatientDocument in DB:', dbErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      document: {
        id: savedDocument?.id || `doc-${Date.now()}`,
        title,
        type: documentType,
        fileUrl: uploadResult.fileUrl,
        storageKey: uploadResult.storageKey,
        storageBucket: uploadResult.storageBucket,
        mimeType: uploadResult.mimeType,
        fileSizeBytes: uploadResult.fileSizeBytes,
        extractedFields,
        medicinesFound,
        clinicalImpression,
        confidenceScore,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('[DocumentUpload] Upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload document' }, { status: 500 });
  }
}
