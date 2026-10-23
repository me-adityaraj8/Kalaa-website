import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COURSES } from '../data/courses';
import { CONTACT, FUNDING, LEGAL_NAME, MOTTO, TAGLINE } from '../data/site';
import { callLink, instagramLink, whatsappLink } from '../lib/contact';
import { useLang } from '../lib/i18n';
import LotusMark from './LotusMark';

export default function Footer() {
  const { t } = useLang();
  const heading = 'mb-3 font-display text-xl font-semibold text-haldi';
  const link = 'text-white/80 hover:text-white hover:underline';

  return (
    <footer className="border-t-[3px] border-ink bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <LotusMark className="h-16 w-16 text-haldi" />
          <p className="mt-4 font-display text-4xl font-semibold tracking-[0.32em]">KALAA</p>
          <p className="text-white/70">{t(TAGLINE)}</p>
          <p className="paint mt-5 font-display text-2xl font-semibold text-haldi">{t(MOTTO)}</p>
          <p className="mt-4 max-w-xs text-sm text-white/60">
            {t({
              hi: `${FUNDING.scheme} योजना के तहत ${FUNDING.amount.hi} की सीड फ़ंडिंग, ${FUNDING.applicants} आवेदकों में से चुने गए।`,
              en: `${FUNDING.amount.en} seed funding under ${FUNDING.scheme}, picked from ${FUNDING.applicants} applicants.`,
            })}
          </p>
        </div>

        <div>
          <p className={heading}>{t({ hi: 'कोर्स', en: 'Courses' })}</p>
          <ul className="space-y-2">
            {COURSES.map((c) => (
              <li key={c.slug}>
                <Link to={`/courses/${c.slug}`} className={link}>
                  {t(c.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={heading}>Kalaa</p>
          <ul className="space-y-2">
            <li><Link to="/find" className={link}>{t({ hi: 'कोर्स चुनो (AI)', en: 'Course finder (AI)' })}</Link></li>
            <li><Link to="/fix" className={link}>{t({ hi: 'फ़ोटो से जाँच (AI)', en: 'Photo check (AI)' })}</Link></li>
            <li><Link to="/about" className={link}>{t({ hi: 'हमारे बारे में', en: 'About us' })}</Link></li>
            <li><Link to="/partner" className={link}>{t({ hi: 'दुकानदारों के लिए', en: 'For shop owners' })}</Link></li>
            <li><Link to="/enroll" className={link}>{t({ hi: 'दाख़िला', en: 'Enrol' })}</Link></li>
          </ul>
        </div>

        <div>
          <p className={heading}>{t({ hi: 'बात करो', en: 'Get in touch' })}</p>
          <ul className="space-y-3">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className={`${link} inline-flex items-center gap-2`}>
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden /> WhatsApp
              </a>
            </li>
            <li>
              <a href={callLink} className={`${link} inline-flex items-center gap-2`}>
                <Phone className="h-4 w-4 shrink-0" aria-hidden /> {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className={`${link} inline-flex items-center gap-2 break-all`}>
                <Mail className="h-4 w-4 shrink-0" aria-hidden /> {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={instagramLink} target="_blank" rel="noreferrer" className={`${link} inline-flex items-center gap-2`}>
                <Instagram className="h-4 w-4 shrink-0" aria-hidden /> @{CONTACT.instagram}
              </a>
            </li>
            <li>
              <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className={`${link} inline-flex items-start gap-2 text-sm`}>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {t(CONTACT.address)}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-white/50">
          © {new Date().getFullYear()} {LEGAL_NAME} · {t({ hi: 'भागलपुर, बिहार', en: 'Bhagalpur, Bihar' })}
        </p>
      </div>
    </footer>
  );
}
