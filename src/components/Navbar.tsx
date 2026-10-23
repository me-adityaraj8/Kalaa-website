import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLang, type L } from '../lib/i18n';
import LangToggle from './LangToggle';
import { useSaathi } from './Saathi';
import Wordmark from './Wordmark';

export const NAV_LINKS: { to: string; label: L; ai?: boolean }[] = [
  { to: '/courses', label: { hi: 'कोर्स', en: 'Courses' } },
  { to: '/find', label: { hi: 'कोर्स चुनो', en: 'Course finder' }, ai: true },
  { to: '/fix', label: { hi: 'फ़ोटो से जाँच', en: 'Photo check' }, ai: true },
  { to: '/about', label: { hi: 'हमारे बारे में', en: 'About us' } },
  { to: '/partner', label: { hi: 'दुकानदारों के लिए', en: 'For shop owners' } },
];

const ENROL: L = { hi: 'दाख़िला लो', en: 'Enrol now' };
const ASK: L = { hi: 'साथी से पूछो', en: 'Ask Saathi' };

export default function Navbar() {
  const { t } = useLang();
  const { open } = useSaathi();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link to="/" aria-label="Kalaa home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative rounded-md px-2.5 py-1.5 font-display text-lg font-semibold transition-colors hover:bg-wall ${
                  isActive ? 'after:absolute after:inset-x-2 after:-bottom-[11px] after:h-[5px] after:bg-haldi' : ''
                }`
              }
            >
              <span className="inline-flex items-center gap-1">
                {t(link.label)}
                {link.ai && <Sparkles className="h-3.5 w-3.5 text-neon" aria-hidden />}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LangToggle />
          <button type="button" onClick={() => open()} className="btn btn-white hidden px-3 py-1.5 text-lg xl:inline-flex">
            <Sparkles className="h-4 w-4 text-neon" aria-hidden /> {t(ASK)}
          </button>
          <Link to="/enroll" className="btn btn-haldi hidden px-4 py-1.5 text-lg sm:inline-flex">
            {t(ENROL)}
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border-[3px] border-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            className="absolute inset-x-0 top-full border-b-[3px] border-ink bg-white lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <ul className="mx-auto max-w-6xl px-4 py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b-2 border-wall py-3 font-display text-2xl font-semibold ${
                        isActive ? 'text-sindoor' : ''
                      }`
                    }
                  >
                    {t(link.label)}
                    {link.ai && <span className="chip border-neon bg-neon-glow/30 text-xs">AI</span>}
                  </NavLink>
                </li>
              ))}
              <li className="pt-4">
                <Link to="/enroll" className="btn btn-haldi w-full">
                  {t(ENROL)}
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
