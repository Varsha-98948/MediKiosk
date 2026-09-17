import { NextRequest } from 'next/server';
import { POST as documentOcrPOST } from '../document-ocr/route';

export async function POST(req: NextRequest) {
  return documentOcrPOST(req);
}
