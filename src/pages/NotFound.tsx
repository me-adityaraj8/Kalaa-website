import { Link } from 'react-router-dom';
import { useLang } from '../lib/i18n';

export default function NotFound() {
  const { t } = useLang();
  return (
    <section className="bricks grid min-h-[70vh] place-items-center px-4 py-16">
      <div className="board screws max-w-md bg-haldi px-8 py-10 text-center">
        <p className="paint font-display text-8xl font-bold leading-none">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold">{t({ hi: 'यह पेज नहीं मिला', en: "This page isn't here" })}</h1>
        <p className="mt-2 text-lg">
          {t({ hi: 'शायद लिंक पुराना है। यहाँ से आगे बढ़ो:', en: 'The link may be old. Carry on from here:' })}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-ink">{t({ hi: 'होम', en: 'Home' })}</Link>
          <Link to="/courses" className="btn btn-white">{t({ hi: 'कोर्स', en: 'Courses' })}</Link>
        </div>
      </div>
    </section>
  );
}
