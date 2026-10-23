import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Duo from '../components/Duo';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import TradeIcon from '../components/TradeIcon';
import { COURSES } from '../data/courses';
import { useLang } from '../lib/i18n';

export default function Courses() {
  const { t } = useLang();
  return (
    <>
      <PageHeader
        title={{ hi: 'सारे कोर्स', en: 'All courses' }}
        intro={{
          hi: 'हर कोर्स के तीन हिस्से हैं: फ़ोन पर हिंदी वीडियो, पार्टनर दुकान पर मेंटर के साथ प्रैक्टिकल, और आख़िर में सर्टिफिकेट।',
          en: 'Every course has three parts: Hindi video lessons on your phone, hands-on practice with a mentor at a partner shop, and a certificate at the end.',
        }}
      >
        <Link to="/find" className="btn btn-ink mt-7">
          <Sparkles className="h-5 w-5 text-neon-glow" aria-hidden />
          {t({ hi: 'तय नहीं कर पा रहे? साथी से चुनवाओ', en: "Can't decide? Let Saathi help" })}
        </Link>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          {COURSES.map((course, i) => (
            <Reveal key={course.slug} delay={i * 0.05}>
              <CourseCard course={course} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t-[3px] border-ink bg-wall">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <Duo text={{ hi: 'किसके लिए कौन सा', en: 'Which one suits whom' }} className="font-display text-4xl font-bold" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {COURSES.map((course) => (
              <li key={course.slug} className="flex gap-4 rounded-md border-[3px] border-ink bg-white p-4">
                <TradeIcon slug={course.slug} className="mt-1 h-7 w-7 shrink-0" />
                <div>
                  <p className="font-display text-2xl font-semibold">{t(course.name)}</p>
                  <p className="text-lg leading-relaxed">{t(course.goodFor)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
