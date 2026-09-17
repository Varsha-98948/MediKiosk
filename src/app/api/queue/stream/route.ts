import { NextRequest } from 'next/server';
import { queueEvents, QUEUE_EVENT_NAME, QueueEventPayload } from '@/lib/queueEvents';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      controller.enqueue(
        encoder.encode(`event: connected\ndata: ${JSON.stringify({ message: 'SSE stream connected', timestamp: new Date().toISOString() })}\n\n`)
      );

      // Event listener for queue updates
      const onQueueUpdate = (payload: QueueEventPayload) => {
        try {
          controller.enqueue(
            encoder.encode(`event: queue_update\ndata: ${JSON.stringify(payload)}\n\n`)
          );
        } catch (err) {
          // Stream might be closed
        }
      };

      queueEvents.on(QUEUE_EVENT_NAME, onQueueUpdate);

      // Heartbeat ping every 25 seconds to keep connection alive
      const interval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping\n\n`));
        } catch (err) {
          clearInterval(interval);
        }
      }, 25000);

      // Clean up on abort
      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        queueEvents.off(QUEUE_EVENT_NAME, onQueueUpdate);
        try {
          controller.close();
        } catch (e) {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
