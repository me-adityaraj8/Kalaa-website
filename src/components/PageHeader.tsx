import type { ReactNode } from 'react';
import type { L } from '../lib/i18n';
import { useLang } from '../lib/i18n';
import Duo from './Duo';

/** Wall-painted title band at the top of inner pages. */
export default function PageHeader({ title, intro, children }: { title: L; intro?: L; children?: ReactNode }) {
  const { t } = useLang();
  return (
    <section className="bricks border-b-[3px] border-ink">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Duo
          as="h1"
          text={title}
          className="paint font-display text-5xl font-bold leading-[1.02] md:text-6xl"
          subClassName="kicker mb-1 text-xl [text-shadow:none]"
        />
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed md:text-xl">{t(intro)}</p>}
        {children}
      </div>
    </section>
  );
}
