import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSES, type CourseSlug } from '../data/courses';
import { useLang } from '../lib/i18n';
import TradeIcon from './TradeIcon';

type Props = {
  /** Interactive: name field and trade tabs. Static: just the board. */
  interactive?: boolean;
  initialTrade?: CourseSlug;
};

/**
 * The painted board a graduate could hang over their own shop. Visitors type
 * their name and see it there: the thing Kalaa is actually selling.
 */
export default function ShopBoard({ interactive = true, initialTrade = 'smartphone-repair' }: Props) {
  const { t, lang } = useLang();
  const [name, setName] = useState('');
  const [trade, setTrade] = useState<CourseSlug>(initialTrade);
  const course = COURSES.find((c) => c.slug === trade)!;

  const hi = lang === 'hi';
  const shown = name.trim() || (hi ? 'आपका नाम' : 'Your name');
  const shopName = name.trim() ? name.trim().toUpperCase() : 'YOUR NAME';
  const topLine = hi ? `${shopName} ${course.board.en}` : `${shopName}'S`;

  return (
    <div>
      {/* Two strings hold the board from the wall */}
      <div className="relative mx-auto max-w-md origin-top animate-sway pt-10">
        <svg className="absolute inset-x-0 top-0 h-12 w-full" viewBox="0 0 400 48" preserveAspectRatio="none" aria-hidden>
          <path d="M200 4 L60 46 M200 4 L340 46" stroke="#151515" strokeWidth="3" fill="none" />
          <circle cx="200" cy="5" r="5" fill="#151515" />
        </svg>
        <div className="board screws bg-haldi px-5 pb-4 pt-5 text-center sm:px-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={trade}
              initial={{ opacity: 0, rotateX: -60 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 60 }}
              transition={{ duration: 0.25 }}
            >
              <p className="mx-auto flex items-center justify-center gap-2 font-display text-sm font-semibold tracking-wide text-ink/80">
                <TradeIcon slug={trade} className="h-4 w-4" />
                <span className="truncate">{topLine}</span>
              </p>
              <p lang={hi ? 'hi' : 'en'} className="paint-ink mt-1 break-words font-display text-[2.6rem] font-bold leading-[1.05] text-sindoor sm:text-5xl">
                {hi ? course.board.hi : course.board.en}
              </p>
              <p lang={hi ? 'hi' : 'en'} className="mt-2 text-[15px] font-bold leading-snug">
                {course.board.line[lang]}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 flex items-end justify-between gap-3 border-t-[3px] border-ink pt-3 text-left">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-ink/60">{t({ hi: 'प्रोप्राइटर', en: 'Proprietor' })}</p>
              <p className="truncate font-display text-2xl font-bold leading-tight">{shown}</p>
            </div>
            <span className="stamp shrink-0 bg-haldi text-base">
              <BadgeCheck className="h-4 w-4" aria-hidden /> Kalaa Certified
            </span>
          </div>
        </div>
      </div>

      {interactive && (
        <div className="mx-auto mt-8 max-w-md">
          <label htmlFor="board-name" className="label">
            {t({ hi: 'अपना नाम लिखो, अपनी दुकान देखो', en: 'Type your name, see your shop' })}
          </label>
          <input
            id="board-name"
            className="field"
            value={name}
            maxLength={22}
            autoComplete="given-name"
            placeholder={t({ hi: 'जैसे: राहुल', en: 'e.g. Rahul' })}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="mt-3 grid grid-cols-4 gap-2" role="group" aria-label={t({ hi: 'हुनर चुनो', en: 'Pick a trade' })}>
            {COURSES.map((c) => (
              <button
                key={c.slug}
                type="button"
                aria-pressed={trade === c.slug}
                onClick={() => setTrade(c.slug)}
                className="option flex flex-col items-center gap-1 px-1 py-2 text-center text-xs leading-tight"
                title={t(c.name)}
              >
                <TradeIcon slug={c.slug} className="h-6 w-6" />
                <span className="line-clamp-2">{t(c.name)}</span>
              </button>
            ))}
          </div>
          <Link to={`/courses/${trade}`} className="mt-4 inline-flex items-center gap-1 font-display text-xl font-semibold text-sindoor hover:underline">
            {t({ hi: 'यह बोर्ड सच करो', en: 'Make this board real' })} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      )}
    </div>
  );
}
