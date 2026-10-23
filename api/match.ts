import { MODEL, badRequest, getClient, isLimited, json, logError, offline, parseJsonReply, readJson, tooMany } from '../server/ai.js';
import { KNOWLEDGE } from '../server/knowledge.js';
import { COURSE_SLUGS, type Trait } from '../src/data/courses.js';
import { DEVICES, EDUCATION, GOALS, LIKES, PLACES, type Answers, type MatchResult } from '../src/data/finder.js';
import type { Lang } from '../src/data/types.js';

const SYSTEM = `You are Kalaa Saathi, the course guide for Kalaa SkillTech in Bihar. A young person has answered a short set of questions on the website. Pick the one Kalaa course that fits them best, and explain why to them directly, warmly and honestly.

<knowledge>
${KNOWLEDGE}
</knowledge>

Guidance:
- Choose only from the course slugs listed in the knowledge. Weigh what they enjoy most, then their goal, then anything they wrote in their own words (that can override the rest).
- "alternative" is a genuine second option, or "none" if nothing else fits well.
- "headline": one short line addressed to them, using their name if given, that names the course.
- "reasons": 2 or 3 short sentences, each tied to something they actually told you. No generic praise.
- "first_step": one concrete next step on this website (enrol, read the course page, or WhatsApp the team with a question).
- Never invent fees, dates, durations, salaries or job guarantees.
- Write everything in the requested language. For Hindi, use simple everyday Hindi in Devanagari (common English words like course, repair, AC are fine).`;

const SCHEMA = {
  type: 'object',
  properties: {
    course: { type: 'string', enum: [...COURSE_SLUGS] },
    alternative: { type: 'string', enum: [...COURSE_SLUGS, 'none'] },
    headline: { type: 'string' },
    reasons: { type: 'array', items: { type: 'string' } },
    first_step: { type: 'string' },
  },
  required: ['course', 'alternative', 'headline', 'reasons', 'first_step'],
  additionalProperties: false,
} as const;

function pick<T extends { id: string }>(list: T[], id: unknown): T['id'] | undefined {
  return list.find((item) => item.id === id)?.id;
}

function parse(body: unknown): { lang: Lang; answers: Answers } | null {
  if (!body || typeof body !== 'object') return null;
  const { lang, answers } = body as Record<string, unknown>;
  if ((lang !== 'hi' && lang !== 'en') || !answers || typeof answers !== 'object') return null;
  const a = answers as Record<string, unknown>;
  const likes = Array.isArray(a.likes) ? a.likes.filter((x): x is Trait => LIKES.some((l) => l.id === x)).slice(0, 3) : [];
  return {
    lang,
    answers: {
      name: typeof a.name === 'string' ? a.name.trim().slice(0, 40) : '',
      education: pick(EDUCATION, a.education),
      likes,
      goal: pick(GOALS, a.goal),
      place: pick(PLACES, a.place),
      device: pick(DEVICES, a.device),
      note: typeof a.note === 'string' ? a.note.trim().slice(0, 500) : '',
    },
  };
}

function describe(a: Answers): string {
  const label = <T extends { id: string; label: { en: string } }>(list: T[], id?: string) =>
    list.find((x) => x.id === id)?.label.en ?? 'not answered';
  return [
    `Name: ${a.name || 'not given'}`,
    `Studied up to: ${label(EDUCATION, a.education)}`,
    `Enjoys: ${a.likes.length ? a.likes.map((id) => label(LIKES, id)).join(', ') : 'not answered'}`,
    `Goal: ${label(GOALS, a.goal)}`,
    `Lives: ${label(PLACES, a.place)}`,
    `Will watch lessons on: ${label(DEVICES, a.device)}`,
    `In their own words: ${a.note || '(nothing)'}`,
  ].join('\n');
}

export async function POST(request: Request): Promise<Response> {
  const body = parse(await readJson(request, 8_000));
  if (!body) return badRequest();
  const client = getClient();
  if (!client) return offline();
  if (isLimited(request, 'match', 12)) return tooMany();

  try {
    const response = await client.models.generateContent({
      model: MODEL,
      contents: `Reply language: ${body.lang === 'hi' ? 'Hindi' : 'English'}\n\n${describe(body.answers)}`,
      config: {
        systemInstruction: SYSTEM,
        responseMimeType: 'application/json',
        responseJsonSchema: SCHEMA,
        maxOutputTokens: 2048,
      },
    });
    const result = parseJsonReply<MatchResult>(response);
    if (!result || !COURSE_SLUGS.includes(result.course) || !Array.isArray(result.reasons)) {
      return json({ error: 'no_match' }, 502);
    }
    result.reasons = result.reasons.slice(0, 3);
    return json(result);
  } catch (err) {
    logError('match', err);
    return json({ error: 'no_match' }, 502);
  }
}
