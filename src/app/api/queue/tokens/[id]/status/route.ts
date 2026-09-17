import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { broadcastQueueUpdate } from '@/lib/queueEvents';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required.' }, { status: 400 });
    }

    const token = await prisma.queueToken.findFirst({
      where: { OR: [{ id }, { patientId: id }] },
      include: { department: true, patient: true },
    });

    if (!token) {
      return NextResponse.json({ error: 'Token not found.' }, { status: 404 });
    }

    const updated = await prisma.queueToken.update({
      where: { id: token.id },
      data: { status },
    });

    broadcastQueueUpdate({
      type: status === 'completed' ? 'TOKEN_COMPLETED' : 'TOKEN_SKIPPED',
      tokenId: token.id,
      tokenFormatted: token.tokenFormatted,
      departmentId: token.departmentId,
      departmentName: token.department.name,
      patientName: token.patient.name,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, token: updated });
  } catch (error: any) {
    console.error('Error in /api/queue/tokens/[id]/status:', error);
    return NextResponse.json({ error: error.message || 'Failed to update token status' }, { status: 500 });
  }
}
