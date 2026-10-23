# Kalaa SkillTech website

Website for Kalaa, a skill-training startup in Bhagalpur, Bihar. Young people learn mobile, laptop, AC and solar repair: video lessons in Hindi, then hands-on work with a mentor at a partner shop.

The site is in Hindi and English, styled after the painted shop signboards of Bihar, and has **Kalaa Saathi**, an AI guide built on Claude:

- **Course finder** (`/find`): a few questions, then a course recommendation with reasons
- **Ask Saathi**: chat panel available on every page, with voice input in Hindi and read-aloud answers
- **Photo fault-finder** (`/fix`): upload a photo of a broken device and get likely faults, safety warnings and the matching course

Enrolment and partner forms open WhatsApp with the message filled in. Nothing is stored by the site.

## Run it

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY to turn on Saathi
npm run dev
```

Without an API key everything still works: the course finder falls back to a built-in matcher, and chat and photo check point people to WhatsApp.

## Deploy

Vercel picks up `api/*.ts` as serverless functions. Add `ANTHROPIC_API_KEY` under Project → Settings → Environment Variables.

## Where things live

- `src/data/site.ts`: contact details, funding, team, timeline. **`COURSE_FEE` is unset until the real fee is confirmed.**
- `src/data/courses.ts`: the four courses, in both languages
- `server/knowledge.ts`: the facts Saathi is allowed to state (built from the two files above)
- `api/`: `chat` (streaming), `match` (course finder), `diagnose` (photo check)

## Stack

Vite, React, TypeScript, Tailwind, Framer Motion, Anthropic SDK.
