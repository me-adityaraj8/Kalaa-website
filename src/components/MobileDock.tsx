import { BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { whatsappLink } from '../lib/contact';
import { useLang } from '../lib/i18n';
import { useSaathi } from './Saathi';

/** Thumb-reach actions on phones: ask, browse, WhatsApp, enrol. */
export default function MobileDock() {
  const { t } = useLang();
  const { open } = useSaathi();
  const item = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[13px] font-bold leading-none';

  return (
    <nav aria-label="Quick actions" className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-ink bg-white md:hidden">
      <div className="flex items-stretch">
        <button type="button" onClick={() => open()} className={item}>
          <Sparkles className="h-5 w-5 text-neon" aria-hidden />
          {t({ hi: 'साथी', en: 'Saathi' })}
        </button>
        <Link to="/courses" className={item}>
          <BookOpen className="h-5 w-5" aria-hidden />
          {t({ hi: 'कोर्स', en: 'Courses' })}
        </Link>
        <a
          href={whatsappLink(t({ hi: 'नमस्ते, मुझे Kalaa के कोर्स के बारे में जानना है।', en: "Hi, I'd like to know about Kalaa's courses." }))}
          target="_blank"
          rel="noreferrer"
          className={item}
        >
          <MessageCircle className="h-5 w-5 text-patta" aria-hidden />
          WhatsApp
        </a>
        <Link to="/enroll" className="m-1.5 flex flex-[1.3] items-center justify-center rounded-md border-[3px] border-ink bg-haldi font-display text-lg font-semibold">
          {t({ hi: 'दाख़िला', en: 'Enrol' })}
        </Link>
      </div>
    </nav>
  );
}
