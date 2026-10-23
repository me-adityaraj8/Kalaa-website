import Anthropic from '@anthropic-ai/sdk';

export const MODEL = 'claude-opus-5-5';
// Re-runs a declined request on Anthropic's recommended fallback model.
export const FALLBACK_BETA = 'server-side-fallback-2026-07-01';

let client: Anthropic | null = null;

/** Null when no key is configured; callers answer 503 and the UI falls back. */
export function getClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  client ??= new Anthropic();
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

export function textOf(message: Anthropic.Beta.BetaMessage): string {
  return message.content
    .filter((block): block is Anthropic.Beta.BetaTextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('');
}

export function logError(where: string, err: unknown) {
  if (err instanceof Anthropic.APIError) console.error(`[${where}] API ${err.status}: ${err.message}`);
  else console.error(`[${where}]`, err);
}
