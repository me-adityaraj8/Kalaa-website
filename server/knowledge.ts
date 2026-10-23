import { COURSES } from '../src/data/courses.js';
import { CONTACT, COURSE_FEE, FUNDING, MISSION, MOTTO, STEPS, TAGLINE, TEAM } from '../src/data/site.js';

const courseLines = COURSES.map(
  (c) =>
    `- ${c.name.en} (${c.name.hi}) [slug: ${c.slug}]: ${c.short.en} Suits people who: ${c.goodFor.en} ` +
    `Why it pays: ${c.why.en} You learn to: ${c.outcomes.map((o) => o.en).join('; ')}.`,
).join('\n');

const fee =
  COURSE_FEE === null
    ? 'Fees are kept low on purpose, but the exact current fee is not listed. Ask the team.'
    : `Course fee: ₹${COURSE_FEE} per course.`;

/** The only facts Kalaa Saathi may state about Kalaa. */
export const KNOWLEDGE = `
Kalaa SkillTech LLP ("Kalaa") is a skill-training startup based in Bhagalpur, Bihar. Tagline: "${TAGLINE.en}" (${TAGLINE.hi}). Motto: "${MOTTO.en}" (${MOTTO.hi}).
Who it is for: young people in Bihar, roughly 18 to 30 years old, who want practical skills that lead to work.
Mission: ${MISSION.en}

How it works:
${STEPS.map((s, i) => `${i + 1}. ${s.title.en}: ${s.body.en}`).join('\n')}
Lessons are in Hindi (the local language). The hands-on part happens at Kalaa's partner local businesses, where an experienced mentor (for example a mobile-repair shop owner) guides the trainee.
${fee}

Courses:
${courseLines}
More trades are planned; people can tell the team what they want to learn.

Backing: selected for ${FUNDING.amount.en} seed funding under the ${FUNDING.scheme} scheme, picked from ${FUNDING.applicants} applicants (March 2025).
Founders: ${TEAM.map((m) => `${m.name} (${m.role})`).join(', ')}.

Contact: WhatsApp or call ${CONTACT.phoneDisplay}. Email ${CONTACT.email}. Instagram @${CONTACT.instagram}. Office: ${CONTACT.address.en}.
On this website: a course finder at /find, a photo fault-finder at /fix, course pages at /courses, an enrolment form at /enroll, and a page for shop owners at /partner.

Not known, so never guess: batch start dates, course length, class timings, stipend amounts, salaries, placement numbers, names of partner shops.
`.trim();
