import { COURSES, type CourseSlug, type Trait } from '../data/courses';
import type { Answers, MatchResult } from '../data/finder';
import type { Lang } from '../data/types';

// Offline course finder: used when Kalaa Saathi can't be reached, so the
// finder always ends with a recommendation.

const TRAIT_WEIGHTS: Record<Trait, Partial<Record<CourseSlug, number>>> = {
  gadgets: { 'smartphone-repair': 3, 'laptop-repair': 1 },
  computer: { 'laptop-repair': 3, 'smartphone-repair': 1 },
  electric: { 'ac-service': 2, 'solar-installation': 2 },
  outdoor: { 'solar-installation': 3, 'ac-service': 1 },
  people: { 'smartphone-repair': 1, 'ac-service': 1 },
};

const ORDER: CourseSlug[] = ['smartphone-repair', 'ac-service', 'solar-installation', 'laptop-repair'];

export function scoreCourses(answers: Answers): CourseSlug[] {
  const score = new Map<CourseSlug, number>(ORDER.map((slug) => [slug, 0]));
  const add = (slug: CourseSlug, n: number) => score.set(slug, (score.get(slug) ?? 0) + n);

  for (const like of answers.likes) {
    for (const [slug, n] of Object.entries(TRAIT_WEIGHTS[like])) add(slug as CourseSlug, n);
  }
  if (answers.goal === 'shop') {
    add('smartphone-repair', 1);
    add('laptop-repair', 1);
  }
  if (answers.goal === 'job') {
    add('ac-service', 1);
    add('solar-installation', 1);
  }
  if (answers.device === 'laptop') add('laptop-repair', 1);

  return [...ORDER].sort((a, b) => (score.get(b) ?? 0) - (score.get(a) ?? 0));
}

export function offlineMatch(answers: Answers, lang: Lang): MatchResult {
  const [first, second] = scoreCourses(answers);
  const course = COURSES.find((c) => c.slug === first)!;
  const name = answers.name.trim();
  const hi = lang === 'hi';

  const reasons = [course.goodFor[lang], course.why[lang]];
  if (answers.goal === 'shop') {
    reasons.push(
      hi
        ? 'इस हुनर से कम पैसे में अपना काम शुरू किया जा सकता है।'
        : 'This is a trade you can start on your own without much money.',
    );
  } else if (answers.goal === 'job') {
    reasons.push(
      hi ? 'इस काम के लिए दुकानों और कंपनियों को ट्रेंड लोग चाहिए।' : 'Shops and companies need trained people for this work.',
    );
  }

  return {
    course: course.slug,
    alternative: second ?? 'none',
    headline: hi
      ? `${name ? `${name}, ` : ''}आपके लिए ${course.name.hi} सबसे सही लगता है`
      : `${name ? `${name}, ` : ''}${course.name.en} looks like your best fit`,
    reasons: reasons.slice(0, 3),
    first_step: hi
      ? 'कोर्स पेज पढ़ो, फिर दाख़िले का फ़ॉर्म भरो। टीम आपसे WhatsApp पर बात करेगी।'
      : 'Read the course page, then fill in the enrolment form. The team will reach you on WhatsApp.',
  };
}
