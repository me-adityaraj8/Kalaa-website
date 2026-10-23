import type Anthropic from '@anthropic-ai/sdk';
import { FALLBACK_BETA, MODEL, badRequest, getClient, isLimited, logError, offline, readJson, tooMany } from '../server/ai.js';
import { KNOWLEDGE, replyLanguage } from '../server/knowledge.js';
import { CONTACT } from '../src/data/site.js';
import type { Lang } from '../src/data/types.js';

// Tells the client to throw away what it has shown so far (the answer is being
// replaced, e.g. after a refusal).
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

const REFUSAL: Record<Lang, string> = {
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
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 4000,
    betas: [FALLBACK_BETA],
    fallbacks: 'default',
    output_config: { effort: 'low' },
    system: [
      { type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } },
      { type: 'text', text: replyLanguage(lang) },
    ],
    messages: messages as Anthropic.Beta.BetaMessageParam[],
  });

  const encoder = new TextEncoder();
  const body$ = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (text: string) => controller.enqueue(encoder.encode(text));
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_start' && (event.content_block as { type: string }).type === 'fallback') {
            send(RESET); // another model is taking over; drop the partial answer
          } else if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            send(event.delta.text);
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === 'refusal') send(RESET + REFUSAL[lang]);
      } catch (err) {
        logError('chat', err);
        send(RESET + FAILED[lang]);
      }
      controller.close();
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body$, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });
}
