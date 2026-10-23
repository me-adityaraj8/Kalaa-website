import { MODEL, badRequest, getClient, isLimited, json, logError, offline, parseJsonReply, readJson, tooMany } from '../server/ai.js';
import { KNOWLEDGE } from '../server/knowledge.js';
import { COURSE_SLUGS } from '../src/data/courses.js';
import type { Lang } from '../src/data/types.js';

const DEVICE_KINDS = ['phone', 'laptop', 'ac', 'solar', 'other'] as const;
type DeviceKind = (typeof DEVICE_KINDS)[number];
const MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
type MediaType = (typeof MEDIA_TYPES)[number];

const SYSTEM = `You are Kalaa Saathi's repair desk. Kalaa SkillTech teaches young people in Bihar to repair phones and laptops and to install ACs and rooftop solar. Someone has sent a photo of a device, sometimes with a few words about the problem. Act like a careful senior technician at the counter: say what you can actually see, list the likely faults, and keep the person safe.

<knowledge>
${KNOWLEDGE}
</knowledge>

Guidance:
- "is_device": false if the photo is not a phone, laptop, AC, solar setup or similar repairable device. Then keep the other fields short and say what you need instead.
- "what_i_see": one or two sentences describing visible signs only (cracks, burn marks, swelling, corrosion, loose wires, dust). Say if the photo is too unclear to judge.
- "likely_issues": 1 to 3 faults, most likely first. "chance" is your honest confidence. Combine what you see with what they wrote.
- "safe_checks": 2 to 4 things a non-technician can safely try or look at. Nothing that involves opening mains-powered equipment, AC gas, or climbing a roof.
- "warnings": safety warnings that apply (swollen battery means fire risk, so stop charging; AC capacitors and solar DC can shock even when off). Empty list if none apply.
- "difficulty": how hard the repair is for a trained technician.
- "course": the Kalaa course slug that teaches this repair, or "none".
- "learn_line": one encouraging sentence about learning to fix this with that course. Do not promise income or jobs.
- Write every text field in the requested language. For Hindi, use simple everyday Hindi in Devanagari (common English words like screen, battery, charging are fine).`;

const SCHEMA = {
  type: 'object',
  properties: {
    is_device: { type: 'boolean' },
    what_i_see: { type: 'string' },
    likely_issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          issue: { type: 'string' },
          why: { type: 'string' },
          chance: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['issue', 'why', 'chance'],
        additionalProperties: false,
      },
    },
    safe_checks: { type: 'array', items: { type: 'string' } },
    warnings: { type: 'array', items: { type: 'string' } },
    difficulty: { type: 'string', enum: ['easy', 'medium', 'expert'] },
    course: { type: 'string', enum: [...COURSE_SLUGS, 'none'] },
    learn_line: { type: 'string' },
  },
  required: ['is_device', 'what_i_see', 'likely_issues', 'safe_checks', 'warnings', 'difficulty', 'course', 'learn_line'],
  additionalProperties: false,
} as const;

const DEVICE_NAMES: Record<DeviceKind, string> = {
  phone: 'mobile phone',
  laptop: 'laptop',
  ac: 'air conditioner',
  solar: 'solar panel / inverter / battery setup',
  other: 'other device',
};

type DiagnoseBody = { lang: Lang; device: DeviceKind; note: string; image: string; mediaType: MediaType };

function parse(body: unknown): DiagnoseBody | null {
  if (!body || typeof body !== 'object') return null;
  const b = body as Record<string, unknown>;
  if (b.lang !== 'hi' && b.lang !== 'en') return null;
  const device = DEVICE_KINDS.find((d) => d === b.device);
  const mediaType = MEDIA_TYPES.find((m) => m === b.mediaType);
  if (!device || !mediaType) return null;
  if (typeof b.image !== 'string' || b.image.length < 100 || !/^[A-Za-z0-9+/=]+$/.test(b.image)) return null;
  return {
    lang: b.lang,
    device,
    mediaType,
    image: b.image,
    note: typeof b.note === 'string' ? b.note.trim().slice(0, 500) : '',
  };
}

export async function POST(request: Request): Promise<Response> {
  // ~2.5 MB of base64 is plenty for a 1280px JPEG.
  const body = parse(await readJson(request, 2_600_000));
  if (!body) return badRequest();
  const client = getClient();
  if (!client) return offline();
  if (isLimited(request, 'diagnose', 8)) return tooMany();

  try {
    const response = await client.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: body.mediaType, data: body.image } },
            {
              text:
                `Reply language: ${body.lang === 'hi' ? 'Hindi' : 'English'}\n` +
                `They say this is a: ${DEVICE_NAMES[body.device]}\n` +
                `Their description: ${body.note || '(none)'}`,
            },
          ],
        },
      ],
      config: {
        systemInstruction: SYSTEM,
        responseMimeType: 'application/json',
        responseJsonSchema: SCHEMA,
        maxOutputTokens: 4096,
      },
    });
    const result = parseJsonReply<{ is_device: boolean }>(response);
    if (!result || typeof result.is_device !== 'boolean') return json({ error: 'no_result' }, 502);
    return json(result);
  } catch (err) {
    logError('diagnose', err);
    return json({ error: 'no_result' }, 502);
  }
}
