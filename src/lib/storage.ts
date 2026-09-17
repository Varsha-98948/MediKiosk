import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const DEFAULT_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'medical-documents';

// Initialize Supabase client if credentials exist
export const supabase = (SUPABASE_URL && SUPABASE_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false },
    })
  : null;

export interface UploadResult {
  fileUrl: string;
  storageKey: string;
  storageBucket: string;
  mimeType: string;
  fileSizeBytes: number;
}

/**
 * Uploads a file buffer or base64 data to Supabase Storage or S3-compatible storage.
 * If Supabase credentials are not configured, uses local storage as a dev fallback.
 */
export async function uploadDocumentFile({
  fileBuffer,
  base64Data,
  fileName,
  mimeType = 'image/jpeg',
  patientId,
  bucketName = DEFAULT_BUCKET,
}: {
  fileBuffer?: Buffer;
  base64Data?: string;
  fileName: string;
  mimeType?: string;
  patientId?: string;
  bucketName?: string;
}): Promise<UploadResult> {
  // Convert base64 data to Buffer if provided
  let buffer: Buffer;
  let cleanMime = mimeType;

  if (base64Data) {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      cleanMime = matches[1];
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(base64Data, 'base64');
    }
  } else if (fileBuffer) {
    buffer = fileBuffer;
  } else {
    throw new Error('No fileBuffer or base64Data provided for upload.');
  }

  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const patientFolder = patientId ? `patients/${patientId}` : 'general';
  const storageKey = `${patientFolder}/${timestamp}-${sanitizedFileName}`;

  // 1. If Supabase is configured, upload to Supabase Storage Bucket
  if (supabase) {
    try {
      // Ensure bucket exists or attempt upload
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(storageKey, buffer, {
          contentType: cleanMime,
          upsert: true,
        });

      if (error) {
        console.warn('[Storage] Supabase storage upload returned error, falling back:', error.message);
      } else {
        // Get public URL or signed URL
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(storageKey);

        return {
          fileUrl: urlData.publicUrl,
          storageKey,
          storageBucket: bucketName,
          mimeType: cleanMime,
          fileSizeBytes: buffer.length,
        };
      }
    } catch (e: any) {
      console.warn('[Storage] Exception uploading to Supabase Storage:', e.message);
    }
  }

  // 2. Local disk storage fallback for local dev / offline resilience
  if (process.env.NODE_ENV === 'production' && !supabase) {
    throw new Error('[Storage] Supabase Storage credentials (SUPABASE_URL, SUPABASE_ANON_KEY) are required in production.');
  }

  console.info('[DevStorage] Notice: Using local filesystem storage adapter (development/offline fallback).');

  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', bucketName, patientFolder);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const localFilePath = path.join(uploadsDir, `${timestamp}-${sanitizedFileName}`);
    fs.writeFileSync(localFilePath, buffer);

    const publicUrl = `/uploads/${bucketName}/${storageKey}`;

    return {
      fileUrl: publicUrl,
      storageKey,
      storageBucket: 'local-dev-bucket',
      mimeType: cleanMime,
      fileSizeBytes: buffer.length,
    };
  } catch (fsErr: any) {
    console.error('[Storage] Local filesystem write failed:', fsErr);
    throw new Error(`[Storage] Failed to store document: ${fsErr.message}`);
  }
}
