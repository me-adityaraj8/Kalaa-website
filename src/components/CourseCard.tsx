import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course } from '../data/courses';
import { langAttr, otherLang, useLang } from '../lib/i18n';
import TradeIcon from './TradeIcon';

const TONES = ['bg-haldi', 'bg-white', 'bg-white', 'bg-haldi'];

export default function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const { t, lang } = useLang();
  const other = otherLang(lang);
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group board flex h-full flex-col bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-board-lg"
    >
      <div className={`flex items-center gap-3 border-b-[3px] border-ink px-5 py-4 ${TONES[index % TONES.length]}`}>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md border-[3px] border-ink bg-white">
          <TradeIcon slug={course.slug} className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <p lang={langAttr(other)} className="truncate text-sm font-bold text-ink/60">
            {course.name[other]}
          </p>
          <h3 className="font-display text-2xl font-bold leading-tight">{t(course.name)}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 py-4">
        <p className="flex-1 text-[17px] leading-relaxed">{t(course.short)}</p>
        <span className="mt-4 inline-flex items-center gap-1 font-display text-xl font-semibold text-sindoor">
          {t({ hi: 'कोर्स देखो', en: 'See the course' })}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
