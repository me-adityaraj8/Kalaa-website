import { MODEL, badRequest, getClient, isLimited, logError, offline, readJson, tooMany, wasBlocked } from '../server/ai.js';
import { KNOWLEDGE, replyLanguage } from '../server/knowledge.js';
import { CONTACT } from '../src/data/site.js';
import type { Lang } from '../src/data/types.js';

// Tells the client to throw away what it has shown so far (the answer is being
// replaced, e.g. after a safety block).
const RESET = '\u001e';

const SYSTEM = `You are Kalaa Saathi, the helper on the website of Kalaa SkillTech, a skill-training startup in Bhagalpur, Bihar. You talk with young people who are thinking about learning a trade. Many are more comfortable in Hindi than English, many are on a phone, and some speak instead of typing.

How to talk:
- Reply in the language and script the person used: Hindi in Devanagari gets Hindi in Devanagari, Hinglish in Roman letters gets Hinglish in Roman letters, English gets simple English.
- Keep replies short, 2 to 4 sentences and under 70 words, because they may be read aloud. Plain sentences only: no markdown, headings, lists or emoji.
- Use everyday words. Be warm and straightforward, like a helpful elder brother or sister from the same town.

What you know about Kalaa (the only facts about Kalaa you may state):
<knowledge>
${KNOWLEDGE}
</knowledge>

Rules:
- Never invent facts about Kalaa. If asked about something the knowledge does not cover (fees, dates, course length, salaries, placements), say the team will confirm it and give the WhatsApp number ${CONTACT.phoneDisplay}.
- Do not promise jobs or earnings. Kalaa helps people find work; it does not guarantee it.
- When someone is choosing a course, ask at most one or two short questions about what they enjoy, then suggest one course and say why in a sentence. You can also mention the course finder on the site.
- Simple, safe repair tips are fine. For mains electricity, AC gas, swollen or hot batteries, or rooftop work, tell them to stop and get a trained person.
- If the chat drifts away from skills, work and Kalaa, answer briefly and kindly steer back.`;

const BLOCKED: Record<Lang, string> = {
  hi: `माफ़ करना, इसमें मैं मदद नहीं कर पाऊँगा। Kalaa के कोर्स के बारे में कुछ भी पूछो, या टीम से WhatsApp पर बात करो: ${CONTACT.phoneDisplay}`,
  en: `Sorry, I can't help with that one. Ask me anything about Kalaa's courses, or message the team on WhatsApp: ${CONTACT.phoneDisplay}`,
};

const FAILED: Record<Lang, string> = {
  hi: `अभी जवाब नहीं आ पाया। थोड़ी देर में फिर पूछो, या WhatsApp करो: ${CONTACT.phoneDisplay}`,
  en: `I couldn't finish that answer. Try again in a moment, or WhatsApp us: ${CONTACT.phoneDisplay}`,
};

type ChatBody = { lang: Lang; messages: { role: 'user' | 'assistant'; content: string }[] };

function parse(body: unknown): ChatBody | null {
  if (!body || typeof body !== 'object') return null;
  const { lang, messages } = body as Record<string, unknown>;
  if (lang !== 'hi' && lang !== 'en') return null;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) return null;
  const clean: ChatBody['messages'] = [];
  for (const m of messages) {
    if (!m || typeof m !== 'object') return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
    const text = content.trim().slice(0, 1200);
    if (!text) return null;
    clean.push({ role, content: text });
  }
  if (clean[0].role !== 'user' || clean[clean.length - 1].role !== 'user') return null;
  return { lang, messages: clean };
}

export async function POST(request: Request): Promise<Response> {
  const body = parse(await readJson(request, 40_000));
  if (!body) return badRequest();
  const client = getClient();
  if (!client) return offline();
  if (isLimited(request, 'chat', 30)) return tooMany();

  const { lang, messages } = body;
  const abort = new AbortController();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (text: string) => controller.enqueue(encoder.encode(text));
      try {
        const chunks = await client.models.generateContentStream({
          model: MODEL,
          contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
          config: {
            systemInstruction: `${SYSTEM}\n\n${replyLanguage(lang)}`,
            maxOutputTokens: 2048,
            abortSignal: abort.signal,
          },
        });
        for await (const chunk of chunks) {
          if (wasBlocked(chunk)) {
            send(RESET + BLOCKED[lang]);
            break;
          }
          if (chunk.text) send(chunk.text);
        }
      } catch (err) {
        if (!abort.signal.aborted) {
          logError('chat', err);
          send(RESET + FAILED[lang]);
        }
      }
      controller.close();
    },
    cancel() {
      abort.abort();
    },
  });

  return new Response(stream, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });
}
