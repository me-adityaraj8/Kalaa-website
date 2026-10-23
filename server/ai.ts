import { FinishReason, GoogleGenAI, type GenerateContentResponse } from '@google/genai';

// Fast, cheap, takes images, and is on the Gemini API free tier.
export const MODEL = 'gemini-3.5-flash-lite';

let client: GoogleGenAI | null = null;

/** Null when no key is configured; callers answer 503 and the UI falls back. */
export function getClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  client ??= new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return client;
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export const offline = () => json({ error: 'ai_offline' }, 503);
export const tooMany = () => json({ error: 'rate_limited' }, 429);
export const badRequest = () => json({ error: 'bad_request' }, 400);

// Best effort only: each serverless instance keeps its own counts.
const hits = new Map<string, number[]>();

export function isLimited(req: Request, bucket: string, max: number, windowMs = 10 * 60_000): boolean {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

export async function readJson(req: Request, maxChars: number): Promise<unknown> {
  const text = await req.text();
  if (text.length > maxChars) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** True when Gemini blocked the prompt or stopped for safety rather than finishing. */
export function wasBlocked(response: GenerateContentResponse): boolean {
  if (response.promptFeedback?.blockReason) return true;
  const reason = response.candidates?.[0]?.finishReason;
  return reason !== undefined && reason !== FinishReason.STOP && reason !== FinishReason.MAX_TOKENS;
}

/** Parses a structured-output reply, or null if it didn't finish cleanly. */
export function parseJsonReply<T>(response: GenerateContentResponse): T | null {
  if (wasBlocked(response) || response.candidates?.[0]?.finishReason !== FinishReason.STOP) return null;
  try {
    return JSON.parse(response.text ?? '') as T;
  } catch {
    return null;
  }
}

export function logError(where: string, err: unknown) {
  console.error(`[${where}]`, err instanceof Error ? err.message : err);
}
