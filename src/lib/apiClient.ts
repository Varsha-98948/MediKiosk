/**
 * Centralized API client for MediKiosk.
 *
 * Routing strategy:
 * - If NEXT_PUBLIC_API_URL is set (e.g. http://127.0.0.1:8000), all core
 *   patient/queue/encounter/auth/document requests go to FastAPI.
 * - Gemini/OCR/AI routes (/api/gemini/*) always stay on Next.js because
 *   they are not yet migrated to FastAPI.
 * - credentials:'include' ensures the HttpOnly session cookie is forwarded
 *   on every cross-origin request so FastAPI auth works correctly.
 */

const FASTAPI_BASE_URL: string =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) || '';

/**
 * Routes that are NOT yet on FastAPI – stay on Next.js API routes.
 * Match is prefix-based.
 */
const NEXTJS_ONLY_PREFIXES = ['/api/gemini'];

function isFastApiRoute(path: string): boolean {
  if (!FASTAPI_BASE_URL) return false;
  return !NEXTJS_ONLY_PREFIXES.some((prefix) => path.startsWith(prefix));
}

function buildUrl(path: string): string {
  if (isFastApiRoute(path)) {
    return `${FASTAPI_BASE_URL}${path}`;
  }
  return path; // relative → handled by Next.js
}

type FetchOptions = RequestInit & {
  json?: unknown;
};

/**
 * Core fetch wrapper. Always includes credentials for cookie propagation.
 */
export async function apiFetch(path: string, options: FetchOptions = {}): Promise<Response> {
  const { json, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    ...(headers as Record<string, string> | undefined),
  };

  if (json !== undefined) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  const url = buildUrl(path);

  return fetch(url, {
    ...rest,
    credentials: 'include',
    headers: finalHeaders,
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });
}

/** GET */
export const apiGet = (path: string, options: FetchOptions = {}) =>
  apiFetch(path, { ...options, method: 'GET' });

/** POST with optional JSON body */
export const apiPost = (path: string, body?: unknown, options: FetchOptions = {}) =>
  apiFetch(path, { ...options, method: 'POST', json: body });

/** PATCH with optional JSON body */
export const apiPatch = (path: string, body?: unknown, options: FetchOptions = {}) =>
  apiFetch(path, { ...options, method: 'PATCH', json: body });

/** DELETE */
export const apiDelete = (path: string, options: FetchOptions = {}) =>
  apiFetch(path, { ...options, method: 'DELETE' });

/**
 * Build an EventSource URL pointing to FastAPI (or Next.js if not configured).
 * EventSource cannot set custom headers; it relies on the browser automatically
 * sending the HttpOnly cookie on same-origin or with CORS credentials.
 */
export function apiSseUrl(path: string): string {
  return buildUrl(path);
}
