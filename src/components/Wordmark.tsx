import LotusMark from './LotusMark';

/** Lotus badge plus the spaced-out KALAA lettering from the logo. */
export default function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-md border-[3px] ${
          dark ? 'border-haldi bg-ink' : 'border-ink bg-ink'
        }`}
      >
        <LotusMark className="h-6 w-6 text-haldi" />
      </span>
      <span className={`font-display text-2xl font-semibold tracking-[0.32em] ${dark ? 'text-white' : 'text-ink'}`}>
        KALAA
      </span>
    </span>
  );
}
