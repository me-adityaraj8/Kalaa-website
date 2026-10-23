import { useLang } from '../lib/i18n';

export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  const item = (active: boolean) =>
    `px-2.5 py-1 font-display text-base font-semibold leading-none transition-colors ${
      active ? 'bg-ink text-haldi' : 'bg-white text-ink hover:bg-haldi-soft'
    }`;
  return (
    <div
      role="group"
      aria-label="Language / भाषा"
      className={`inline-flex overflow-hidden rounded-md border-[3px] border-ink ${className}`}
    >
      <button type="button" lang="hi" aria-pressed={lang === 'hi'} className={item(lang === 'hi')} onClick={() => setLang('hi')}>
        हिंदी
      </button>
      <button type="button" aria-pressed={lang === 'en'} className={item(lang === 'en')} onClick={() => setLang('en')}>
        EN
      </button>
    </div>
  );
}
