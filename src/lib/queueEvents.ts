import { EventEmitter } from 'events';

// Global singleton event emitter for in-memory SSE queue broadcasts (single server / kiosk instance)
const globalForEvents = globalThis as unknown as {
  queueEvents: EventEmitter | undefined;
};

export const queueEvents = globalForEvents.queueEvents ?? new EventEmitter();

// Prevent memory leak warnings in dev mode with hot reloading
queueEvents.setMaxListeners(100);

if (process.env.NODE_ENV !== 'production') globalForEvents.queueEvents = queueEvents;

export const QUEUE_EVENT_NAME = 'queue_update';

export interface QueueEventPayload {
  type: 'TOKEN_CREATED' | 'TOKEN_CALLED' | 'TOKEN_COMPLETED' | 'TOKEN_SKIPPED' | 'TOKEN_EMERGENCY';
  tokenId: string;
  tokenFormatted: string;
  departmentId?: string;
  departmentName?: string;
  roomNumber?: string;
  doctorName?: string;
  patientName?: string;
  timestamp: string;
}

export function broadcastQueueUpdate(payload: QueueEventPayload) {
  queueEvents.emit(QUEUE_EVENT_NAME, payload);
}
