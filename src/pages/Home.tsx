import { motion } from 'framer-motion';
import { ArrowRight, Camera, ChevronDown, MessageCircle, Mic, Phone, Sparkles } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Duo from '../components/Duo';
import Reveal from '../components/Reveal';
import { useSaathi } from '../components/Saathi';
import ShopBoard from '../components/ShopBoard';
import { COURSES } from '../data/courses';
import { CONTACT, COURSE_FEE, FUNDING, MOTTO, STEPS, TEAM } from '../data/site';
import { callLink, whatsappLink } from '../lib/contact';
import { useLang, type L } from '../lib/i18n';

export default function Home() {
  return (
    <>
      <Hero />
      <LedTicker />
      <Trades />
      <HowItWorks />
      <SaathiShowcase />
      <Backing />
      <Faq />
      <FinalCall />
    </>
  );
}

function Hero() {
  const { t, lang } = useLang();
  const { open } = useSaathi();
  return (
    <section className="bricks overflow-hidden border-b-[3px] border-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-14 pt-10 md:pt-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="kicker text-xl" lang={lang === 'hi' ? 'en' : 'hi'}>
            {lang === 'hi' ? 'Learn a trade. Start earning.' : 'हुनर सीखो, कमाई शुरू करो।'}
          </p>
          <motion.h1
            className="mt-2 font-display text-[3.5rem] font-bold leading-[0.98] sm:text-7xl lg:text-[5.25rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="block">{t({ hi: 'हुनर सीखो,', en: 'Learn a trade.' })}</span>
            <span className="relative mt-1 inline-block">
              <motion.span
                aria-hidden
                className="absolute -inset-x-3 bottom-[0.06em] top-[0.3em] bg-haldi"
                initial={{ scaleX: 0, rotate: -1 }}
                animate={{ scaleX: 1, rotate: -1 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
              />
              <span className="paint relative">{t({ hi: 'कमाई शुरू करो।', en: 'Start earning.' })}</span>
            </span>
          </motion.h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl">
            {t({
              hi: 'मोबाइल, लैपटॉप, AC और सोलर का काम। पहले फ़ोन पर हिंदी वीडियो से सीखो, फिर असली दुकान पर मेंटर के साथ हाथ से करो।',
              en: 'Mobile, laptop, AC and solar repair. Learn from Hindi video lessons on your phone, then practise at a real shop with a mentor.',
            })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/find" className="btn btn-ink">
              <Sparkles className="h-5 w-5 text-neon-glow" aria-hidden />
              {t({ hi: 'मेरे लिए कौन सा कोर्स?', en: 'Which course is right for me?' })}
            </Link>
            <Link to="/courses" className="btn btn-white">
              {t({ hi: 'सारे कोर्स देखो', en: 'See all courses' })}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => open()}
            className="mt-5 inline-flex items-center gap-2 font-bold underline decoration-haldi decoration-4 underline-offset-4 hover:text-sindoor"
          >
            <Mic className="h-5 w-5" aria-hidden />
            {t({ hi: 'या साथी से बोलकर पूछो', en: 'or just ask Saathi out loud' })}
          </button>
        </div>
        <ShopBoard />
      </div>
    </section>
  );
}

function LedTicker() {
  const { t } = useLang();
  const items: L[] = [
    { hi: `${FUNDING.scheme} से फ़ंडेड`, en: `Funded by ${FUNDING.scheme}` },
    { hi: `${FUNDING.applicants} आवेदकों में से चुने गए`, en: `Picked from ${FUNDING.applicants} applicants` },
    { hi: 'हिंदी में कोर्स', en: 'Courses in Hindi' },
    { hi: 'असली दुकान, असली मेंटर', en: 'Real shops, real mentors' },
    { hi: 'सर्टिफिकेट + काम में मदद', en: 'Certificate + help finding work' },
    { hi: 'भागलपुर, बिहार', en: 'Bhagalpur, Bihar' },
  ];
  const row = items.map((item) => t(item)).join('   ★   ');
  return (
    <div className="led overflow-hidden border-b-[3px] border-ink py-3" aria-label={items.map((i) => t(i)).join(', ')}>
      <div className="flex w-max animate-marquee whitespace-nowrap font-display text-xl font-semibold uppercase tracking-wider" aria-hidden>
        <span className="pr-8">{row}   ★   </span>
        <span className="pr-8">{row}   ★   </span>
      </div>
    </div>
  );
}

function SectionTitle({ text, intro }: { text: L; intro?: L }) {
  const { t } = useLang();
  return (
    <div className="max-w-2xl">
      <Duo text={text} className="font-display text-4xl font-bold leading-tight md:text-5xl" />
      {intro && <p className="mt-3 text-lg leading-relaxed">{t(intro)}</p>}
    </div>
  );
}

function Trades() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionTitle
        text={{ hi: 'कौन सा हुनर सीखोगे?', en: 'Which trade will you learn?' }}
        intro={{
          hi: 'चारों ऐसे काम हैं जिनकी हर शहर और कस्बे में रोज़ ज़रूरत है।',
          en: 'All four are trades that every town and city needs, every day.',
        }}
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {COURSES.map((course, i) => (
          <Reveal key={course.slug} delay={i * 0.06}>
            <CourseCard course={course} index={i} />
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-6 flex flex-col items-start gap-4 rounded-md border-[3px] border-dashed border-ink/50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg">
            <strong>{t({ hi: 'और भी हुनर आ रहे हैं।', en: 'More trades are coming.' })}</strong>{' '}
            {t({ hi: 'आप क्या सीखना चाहते हो? हमें बताओ।', en: 'What do you want to learn? Tell us.' })}
          </p>
          <a
            href={whatsappLink(t({ hi: 'नमस्ते, मैं यह हुनर सीखना चाहता/चाहती हूँ: ', en: "Hi, here's a skill I'd like to learn: " }))}
            target="_blank"
            rel="noreferrer"
            className="btn btn-wa shrink-0 py-2 text-lg"
          >
            <MessageCircle className="h-5 w-5" aria-hidden /> {t({ hi: 'बताओ', en: 'Tell us' })}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function HowItWorks() {
  const { t } = useLang();
  const numerals = ['१', '२', '३'];
  return (
    <section className="border-y-[3px] border-ink bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <Duo
          text={{ hi: 'Kalaa में सीखना ऐसे होता है', en: 'How learning at Kalaa works' }}
          className="font-display text-4xl font-bold leading-tight md:text-5xl"
          subClassName="kicker text-haldi"
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title.en} delay={i * 0.1}>
              <li className="h-full rounded-lg border-[3px] border-white/20 p-6">
                <span lang="hi" className="paint block font-body text-7xl font-extrabold leading-none text-haldi">
                  {numerals[i]}
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold">{t(step.title)}</h3>
                <p className="mt-2 text-lg leading-relaxed text-white/80">{t(step.body)}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="paint mt-12 font-display text-3xl font-bold text-haldi md:text-4xl">{t(MOTTO)}</p>
      </div>
    </section>
  );
}

function ToolTile({
  icon: Icon,
  title,
  body,
  to,
  onClick,
}: {
  icon: ComponentType<{ className?: string }>;
  title: L;
  body: L;
  to?: string;
  onClick?: () => void;
}) {
  const { t } = useLang();
  const inner: ReactNode = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md border-2 border-neon-glow/50 bg-neon-deep text-neon-glow">
        <Icon className="h-6 w-6" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 font-display text-2xl font-semibold text-white">
          {t(title)} <ArrowRight className="h-5 w-5 text-neon-glow transition-transform group-hover:translate-x-1" />
        </span>
        <span className="mt-1 block text-[17px] leading-relaxed text-white/75">{t(body)}</span>
      </span>
    </>
  );
  const cls =
    'group flex w-full gap-4 rounded-lg border-2 border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:border-neon-glow/60 hover:bg-white/[0.06]';
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

function SaathiShowcase() {
  const { t } = useLang();
  const { open } = useSaathi();
  return (
    <section className="bricks py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-xl border-[3px] border-ink bg-[#0B1C19] text-white shadow-board-lg">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <div className="p-7 md:p-10">
              <p className="tubelight animate-flicker font-display text-5xl font-bold md:text-6xl">Kalaa साथी</p>
              <p className="mt-1 font-display text-xl font-semibold text-neon-glow/80">
                {t({ hi: 'आपका AI गाइड, आपकी भाषा में', en: 'Your AI guide, in your language' })}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-white/80">
                {t({
                  hi: 'कौन सा कोर्स लें, ट्रेनिंग कहाँ होगी, खराब फ़ोन में क्या दिक्कत है: सब साथी से पूछो। हिंदी में बोलो या लिखो, जवाब भी हिंदी में मिलेगा।',
                  en: "Which course to take, where training happens, what's wrong with a broken phone: ask Saathi. Speak or type in Hindi or English and get the answer the same way.",
                })}
              </p>
              <div className="mt-6 space-y-3" aria-hidden>
                <Reveal>
                  <div className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm border-2 border-ink bg-haldi px-3.5 py-2 text-ink">
                    {t({ hi: 'मुझे फ़ोन खोलकर देखना अच्छा लगता है। कौन सा कोर्स लूँ?', en: 'I like opening up phones. Which course should I take?' })}
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="w-fit max-w-[85%] rounded-lg rounded-bl-sm border-2 border-neon-glow/40 bg-white/5 px-3.5 py-2">
                    {t({
                      hi: 'तो स्मार्टफ़ोन रिपेयर से शुरू करो। हर घर में फ़ोन है और काम कभी कम नहीं होता।',
                      en: 'Then start with Smartphone Repair. Every home has phones, and the work never dries up.',
                    })}
                  </div>
                </Reveal>
              </div>
              <button type="button" onClick={() => open()} className="btn btn-neon mt-7">
                <Mic className="h-5 w-5" aria-hidden /> {t({ hi: 'साथी से बात करो', en: 'Talk to Saathi' })}
              </button>
            </div>
            <div className="grid content-center gap-4 border-t-2 border-white/10 p-6 md:p-8 lg:border-l-2 lg:border-t-0">
              <ToolTile
                to="/find"
                icon={Sparkles}
                title={{ hi: 'कोर्स खोजो', en: 'Course finder' }}
                body={{
                  hi: 'कुछ आसान सवाल, फिर साथी बताएगा कौन सा कोर्स आपके लिए सही है, और क्यों।',
                  en: 'A few easy questions, then Saathi tells you which course fits you, and why.',
                }}
              />
              <ToolTile
                onClick={() => open()}
                icon={Mic}
                title={{ hi: 'बोलकर पूछो', en: 'Ask out loud' }}
                body={{
                  hi: 'माइक दबाओ और सवाल बोलो। साथी जवाब पढ़कर सुना भी सकता है।',
                  en: 'Tap the mic and say your question. Saathi can read its answer aloud too.',
                }}
              />
              <ToolTile
                to="/fix"
                icon={Camera}
                title={{ hi: 'फ़ोटो से खराबी पहचानो', en: 'Photo fault-finder' }}
                body={{
                  hi: 'खराब फ़ोन, लैपटॉप या AC की फ़ोटो डालो। साथी बताएगा क्या दिक्कत हो सकती है और कौन सा कोर्स इसे ठीक करना सिखाता है।',
                  en: "Snap a broken phone, laptop or AC. Saathi suggests what's wrong and which course teaches the fix.",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Backing() {
  const { t } = useLang();
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-20 lg:grid-cols-2">
      <Reveal>
        <div className="board screws bg-white p-8 md:p-10">
          <p className="font-display text-2xl font-semibold text-sindoor">{FUNDING.scheme}</p>
          <p className="paint font-display text-7xl font-bold leading-none md:text-8xl">{FUNDING.applicants}</p>
          <p className="mt-3 text-xl font-bold">{t({ hi: 'आवेदकों में से Kalaa को चुना गया', en: 'applicants, and Kalaa was picked' })}</p>
          <p className="mt-3 text-lg leading-relaxed">
            {t({
              hi: `बिहार सरकार की ${FUNDING.scheme} योजना के तहत ${FUNDING.amount.hi} की सीड फ़ंडिंग मिली।`,
              en: `${FUNDING.amount.en} in seed funding under the Government of Bihar's ${FUNDING.scheme} scheme.`,
            })}
          </p>
        </div>
      </Reveal>
      <div>
        <SectionTitle
          text={{ hi: 'भागलपुर में बना, बिहार के लिए', en: 'Made in Bhagalpur, for Bihar' }}
          intro={{
            hi: 'Kalaa को चार इंजीनियरों ने शुरू किया, जिन्होंने अपने आसपास बहुत से पढ़े-लिखे युवाओं को बिना काम के देखा।',
            en: 'Kalaa was started by four engineers who saw too many educated young people around them without work.',
          }}
        />
        <ul className="mt-6 flex flex-wrap gap-4">
          {TEAM.map((m) => (
            <li key={m.name} className="flex items-center gap-2">
              <img
                src={m.photo}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                className="h-12 w-12 rounded-full border-[3px] border-ink object-cover"
              />
              <span className="text-sm font-bold leading-tight">
                {m.short}
                <span className="block font-normal text-ink/60">{m.role}</span>
              </span>
            </li>
          ))}
        </ul>
        <Link to="/about" className="mt-6 inline-flex items-center gap-1 font-display text-xl font-semibold text-sindoor hover:underline">
          {t({ hi: 'हमारी कहानी पढ़ो', en: 'Read our story' })} <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

const FAQS: { q: L; a: L }[] = [
  {
    q: { hi: 'फ़ीस कितनी है?', en: 'How much are the fees?' },
    a:
      COURSE_FEE === null
        ? {
            hi: 'फ़ीस जानबूझकर कम रखी गई है ताकि कोई भी सीख सके। अभी की फ़ीस और अगला बैच जानने के लिए WhatsApp करो।',
            en: 'Fees are kept low on purpose so anyone can learn. WhatsApp us for the current fee and the next batch.',
          }
        : {
            hi: `हर कोर्स की फ़ीस ₹${COURSE_FEE} है, एक बार।`,
            en: `Each course costs ₹${COURSE_FEE}, paid once.`,
          },
  },
  {
    q: { hi: 'क्या मैं फ़ोन पर सीख सकता हूँ?', en: 'Can I learn on my phone?' },
    a: {
      hi: 'हाँ। वीडियो कोर्स स्मार्टफ़ोन पर चलते हैं। प्रैक्टिकल काम पार्टनर दुकान पर होता है।',
      en: 'Yes. The video lessons work on a smartphone. The practical work happens at a partner shop.',
    },
  },
  {
    q: { hi: 'कोर्स किस भाषा में है?', en: 'What language are the courses in?' },
    a: { hi: 'लोकल भाषा, यानी हिंदी में, आसान शब्दों में।', en: 'In the local language, Hindi, using simple words.' },
  },
  {
    q: { hi: 'हाथ से काम कहाँ सीखेंगे?', en: 'Where will I practise hands-on?' },
    a: {
      hi: 'Kalaa की पार्टनर लोकल दुकानों और बिज़नेस में, एक अनुभवी मेंटर के साथ। जैसे मोबाइल रिपेयर सीखने वाला किसी अनुभवी दुकानदार से सीधे सीखता है।',
      en: 'At Kalaa partner shops and local businesses, with an experienced mentor. A mobile-repair trainee, for example, learns directly from an experienced shop owner.',
    },
  },
  {
    q: { hi: 'सर्टिफिकेट मिलेगा?', en: 'Will I get a certificate?' },
    a: {
      hi: 'हाँ, ट्रेनिंग पूरी करने पर सर्टिफिकेट मिलता है, जो काम ढूँढने में मदद करता है।',
      en: 'Yes. You get a certificate when you finish the training, which helps when you look for work.',
    },
  },
  {
    q: { hi: 'क्या नौकरी पक्की है?', en: 'Is a job guaranteed?' },
    a: {
      hi: 'कोई भी ईमानदार संस्था नौकरी की गारंटी नहीं देती। हम पार्टनर बिज़नेस के ज़रिए काम ढूँढने में पूरी मदद करते हैं, और अपनी दुकान खोलनी हो तो उसमें भी गाइड करते हैं।',
      en: 'No honest institute can guarantee a job. We help you find work through our partner businesses, and guide you if you want to open your own shop.',
    },
  },
  {
    q: { hi: 'कौन जॉइन कर सकता है?', en: 'Who can join?' },
    a: {
      hi: 'बिहार के युवा, लगभग 18 से 30 साल के, जो हुनर सीखकर कमाना चाहते हैं।',
      en: 'Young people in Bihar, roughly 18 to 30, who want to learn a skill and earn from it.',
    },
  },
];

function Faq() {
  const { t } = useLang();
  const { open } = useSaathi();
  return (
    <section className="border-t-[3px] border-ink bg-wall">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:py-20 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionTitle
            text={{ hi: 'अक्सर पूछे जाने वाले सवाल', en: 'Questions people ask' }}
            intro={{ hi: 'जवाब यहाँ नहीं मिला? साथी से पूछो।', en: "Didn't find your answer? Ask Saathi." }}
          />
          <button type="button" onClick={() => open()} className="btn btn-ink mt-6">
            <Sparkles className="h-5 w-5 text-neon-glow" aria-hidden /> {t({ hi: 'साथी से पूछो', en: 'Ask Saathi' })}
          </button>
        </div>
        <div className="space-y-3">
          {FAQS.map((item) => (
            <details key={item.q.en} className="group board bg-white open:bg-haldi-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-2xl font-semibold [&::-webkit-details-marker]:hidden">
                {t(item.q)}
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="px-5 pb-5 text-lg leading-relaxed">{t(item.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCall() {
  const { t } = useLang();
  return (
    <section className="bricks border-t-[3px] border-ink py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <div className="board screws bg-haldi px-6 py-10 text-center md:px-12">
            <Duo
              text={{ hi: 'आज ही शुरू करो', en: 'Start today' }}
              className="font-display text-5xl font-bold md:text-6xl"
              subClassName="kicker text-xl"
            />
            <p className="mx-auto mt-3 max-w-lg text-lg">
              {t({
                hi: 'फ़ॉर्म में बस नाम, फ़ोन नंबर और कोर्स। टीम आपसे WhatsApp पर बात करेगी।',
                en: 'Just your name, phone number and course. The team will message you on WhatsApp.',
              })}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/enroll" className="btn btn-ink">
                {t({ hi: 'दाख़िला लो', en: 'Enrol now' })}
              </Link>
              <a
                href={whatsappLink(t({ hi: 'नमस्ते, मुझे Kalaa के कोर्स के बारे में जानना है।', en: "Hi, I'd like to know about Kalaa's courses." }))}
                target="_blank"
                rel="noreferrer"
                className="btn btn-wa"
              >
                <MessageCircle className="h-5 w-5" aria-hidden /> WhatsApp
              </a>
              <a href={callLink} className="btn btn-white">
                <Phone className="h-5 w-5" aria-hidden /> {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
