import { Check, MessageCircle, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Duo from '../components/Duo';
import PageHeader from '../components/PageHeader';
import { useSaathi } from '../components/Saathi';
import ShopBoard from '../components/ShopBoard';
import { COURSES, getCourse } from '../data/courses';
import { COURSE_FEE, STEPS } from '../data/site';
import { whatsappLink } from '../lib/contact';
import { useLang } from '../lib/i18n';
import NotFound from './NotFound';

export default function CoursePage() {
  const { slug } = useParams();
  const { t } = useLang();
  const { open } = useSaathi();
  const course = getCourse(slug);
  if (!course) return <NotFound />;

  const h2 = 'font-display text-3xl font-bold md:text-4xl';
  const others = COURSES.filter((c) => c.slug !== course.slug);

  return (
    <>
      <PageHeader title={course.name} intro={course.short}>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to={`/enroll?course=${course.slug}`} className="btn btn-haldi">
            {t({ hi: 'इस कोर्स में दाख़िला लो', en: 'Enrol in this course' })}
          </Link>
          <button
            type="button"
            className="btn btn-white"
            onClick={() =>
              open(
                t({
                  hi: `${course.name.hi} कोर्स के बारे में बताओ। क्या यह मेरे लिए सही है?`,
                  en: `Tell me about the ${course.name.en} course. Is it right for me?`,
                }),
              )
            }
          >
            <Sparkles className="h-5 w-5 text-neon" aria-hidden /> {t({ hi: 'साथी से पूछो', en: 'Ask Saathi' })}
          </button>
        </div>
      </PageHeader>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-12">
          <div>
            <Duo text={{ hi: 'आप क्या सीखोगे', en: "What you'll learn" }} className={h2} />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o.en} className="flex gap-3 rounded-md border-[3px] border-ink bg-white p-3.5 text-lg leading-snug">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded border-2 border-ink bg-haldi">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                  </span>
                  {t(o)}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="board bg-haldi-soft p-6">
              <h3 className="font-display text-2xl font-bold">{t({ hi: 'इस हुनर में काम क्यों है', en: 'Why there is work in this' })}</h3>
              <p className="mt-2 text-lg leading-relaxed">{t(course.why)}</p>
            </div>
            <div className="board bg-white p-6">
              <h3 className="font-display text-2xl font-bold">{t({ hi: 'किसके लिए सही', en: 'Who it suits' })}</h3>
              <p className="mt-2 text-lg leading-relaxed">{t(course.goodFor)}</p>
            </div>
          </div>

          <div>
            <Duo text={{ hi: 'इन औज़ारों से काम करोगे', en: "Tools you'll handle" }} className={h2} />
            <ul className="mt-5 flex flex-wrap gap-2">
              {course.tools.map((tool) => (
                <li key={tool.en} className="chip px-4 py-2 text-base">
                  {t(tool)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Duo text={{ hi: 'कैसे सीखोगे', en: "How you'll learn" }} className={h2} />
            <ol className="mt-6 space-y-4">
              {STEPS.map((step, i) => (
                <li key={step.title.en} className="flex gap-4">
                  <span lang="hi" className="paint w-10 shrink-0 font-body text-5xl font-extrabold leading-none">
                    {['१', '२', '३'][i]}
                  </span>
                  <div>
                    <p className="font-display text-2xl font-semibold">{t(step.title)}</p>
                    <p className="text-lg leading-relaxed">{t(step.body)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="space-y-8 self-start lg:sticky lg:top-24">
          <div>
            <p className="kicker text-center">{t({ hi: 'कोर्स के बाद, आपका बोर्ड', en: 'After the course, your board' })}</p>
            <ShopBoard key={course.slug} interactive={false} initialTrade={course.slug} />
          </div>
          <div className="board bg-white p-5">
            <p className="font-display text-2xl font-bold">{t({ hi: 'फ़ीस', en: 'Fees' })}</p>
            <p className="text-lg">
              {COURSE_FEE === null
                ? t({ hi: 'कम रखी गई है। अभी की फ़ीस WhatsApp पर पूछो।', en: 'Kept low. Ask on WhatsApp for the current fee.' })
                : t({ hi: `₹${COURSE_FEE}, एक बार`, en: `₹${COURSE_FEE}, paid once` })}
            </p>
            <div className="mt-5 grid gap-3">
              <Link to={`/enroll?course=${course.slug}`} className="btn btn-ink w-full">
                {t({ hi: 'दाख़िला लो', en: 'Enrol now' })}
              </Link>
              <a
                href={whatsappLink(
                  t({
                    hi: `नमस्ते, मुझे ${course.name.hi} कोर्स के बारे में जानना है।`,
                    en: `Hi, I'd like to know about the ${course.name.en} course.`,
                  }),
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-wa w-full"
              >
                <MessageCircle className="h-5 w-5" aria-hidden /> {t({ hi: 'WhatsApp पर पूछो', en: 'Ask on WhatsApp' })}
              </a>
            </div>
          </div>
        </aside>
      </section>

      <section className="border-t-[3px] border-ink bg-wall">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <Duo text={{ hi: 'दूसरे कोर्स', en: 'Other courses' }} className="font-display text-3xl font-bold md:text-4xl" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((c, i) => (
              <CourseCard key={c.slug} course={c} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
