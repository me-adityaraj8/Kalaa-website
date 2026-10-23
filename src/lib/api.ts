import type { Answers, MatchResult } from '../data/finder';
import type { CourseSlug } from '../data/courses';
import type { Lang } from '../data/types';

/** No API key on the server: the UI switches to its offline path. */
export class AiOffline extends Error {}
export class AiBusy extends Error {}

const RESET = '\u001e';

function check(res: Response) {
  if (res.status === 503) throw new AiOffline();
  if (res.status === 429) throw new AiBusy();
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
}

export type ChatTurn = { role: 'user' | 'assistant'; content: string };

/** Streams Kalaa Saathi's reply, calling onText with the full text so far. */
export async function streamChat(
  lang: Lang,
  messages: ChatTurn[],
  onText: (text: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ lang, messages }),
    signal,
  });
  check(res);
  if (!res.body) throw new Error('No response body');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let text = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    let chunk = decoder.decode(value, { stream: true });
    const reset = chunk.lastIndexOf(RESET);
    if (reset >= 0) {
      text = '';
      chunk = chunk.slice(reset + 1);
    }
    text += chunk;
    onText(text);
  }
  return text;
}

export async function matchCourse(lang: Lang, answers: Answers): Promise<MatchResult> {
  const res = await fetch('/api/match', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ lang, answers }),
  });
  check(res);
  return res.json();
}

export type DeviceKind = 'phone' | 'laptop' | 'ac' | 'solar' | 'other';

export interface Diagnosis {
  is_device: boolean;
  what_i_see: string;
  likely_issues: { issue: string; why: string; chance: 'high' | 'medium' | 'low' }[];
  safe_checks: string[];
  warnings: string[];
  difficulty: 'easy' | 'medium' | 'expert';
  course: CourseSlug | 'none';
  learn_line: string;
}

export async function diagnose(input: {
  lang: Lang;
  device: DeviceKind;
  note: string;
  image: string;
  mediaType: 'image/jpeg';
}): Promise<Diagnosis> {
  const res = await fetch('/api/diagnose', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  check(res);
  return res.json();
}
