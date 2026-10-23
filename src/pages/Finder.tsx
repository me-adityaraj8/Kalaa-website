import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, MessageCircle, Mic, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import LotusMark from '../components/LotusMark';
import TradeIcon from '../components/TradeIcon';
import { getCourse, type Trait } from '../data/courses';
import { DEVICES, EDUCATION, GOALS, LIKES, PLACES, type Answers, type MatchResult } from '../data/finder';
import { matchCourse } from '../lib/api';
import { whatsappLink } from '../lib/contact';
import { useLang, type L } from '../lib/i18n';
import { offlineMatch } from '../lib/match';
import { useDictation } from '../lib/speech';

type Step = 'name' | 'education' | 'likes' | 'goal' | 'place' | 'device' | 'note';
const STEPS: Step[] = ['name', 'education', 'likes', 'goal', 'place', 'device', 'note'];

type Line = { from: 'saathi' | 'you'; text: L | string };

const EMPTY: Answers = { name: '', likes: [], note: '' };

function question(step: Step, name: string): L {
  const n = name.trim();
  switch (step) {
    case 'name':
      return {
        hi: 'नमस्ते! मैं Kalaa साथी हूँ। कुछ आसान सवाल पूछूँगा, फिर बताऊँगा कौन सा कोर्स आपके लिए सही है। पहले, आपका नाम?',
        en: "Hi! I'm Kalaa Saathi. A few easy questions, then I'll tell you which course fits you. First, what's your name?",
      };
    case 'education':
      return {
        hi: `${n ? `${n}, ` : ''}आपने कहाँ तक पढ़ाई की है?`,
        en: `${n ? `${n}, how` : 'How'} far have you studied?`,
      };
    case 'likes':
      return { hi: 'इनमें से क्या करना अच्छा लगता है? दो तक चुन सकते हो।', en: 'Which of these do you enjoy? Pick up to two.' };
    case 'goal':
      return { hi: 'सीखने के बाद क्या चाहते हो?', en: 'What do you want after learning?' };
    case 'place':
      return { hi: 'आप कहाँ रहते हो?', en: 'Where do you live?' };
    case 'device':
      return { hi: 'वीडियो लेसन किस पर देखोगे?', en: 'What will you watch the video lessons on?' };
    case 'note':
      return {
        hi: 'आख़िरी सवाल: अपने बारे में कुछ और बताना है? लिखो या बोलो, या छोड़ दो।',
        en: 'Last one: anything else you want to tell me? Type it, say it, or skip.',
      };
  }
}

export default function Finder() {
  const { t, lang } = useLang();
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [stepIndex, setStepIndex] = useState(0);
  const [lines, setLines] = useState<Line[]>([{ from: 'saathi', text: question('name', '') }]);
  const [history, setHistory] = useState<{ answers: Answers; lines: Line[] }[]>([]);
  const [text, setText] = useState('');
  const [picked, setPicked] = useState<Trait[]>([]);
  const [phase, setPhase] = useState<'asking' | 'thinking' | 'done'>('asking');
  const [result, setResult] = useState<{ match: MatchResult; offline: boolean } | null>(null);
  const dictation = useDictation(lang);
  const endRef = useRef<HTMLDivElement>(null);

  const step = STEPS[stepIndex];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [lines, phase]);

  async function finish(final: Answers) {
    setPhase('thinking');
    try {
      const match = await matchCourse(lang, final);
      if (!getCourse(match.course)) throw new Error('Unknown course');
      setResult({ match, offline: false });
    } catch {
      // Saathi unreachable: the offline scorer still gives an honest pick.
      setResult({ match: offlineMatch(final, lang), offline: true });
    }
    setPhase('done');
  }

  function answer(patch: Partial<Answers>, said: L | string) {
    const next = { ...answers, ...patch };
    setHistory((h) => [...h, { answers, lines }]);
    setAnswers(next);
    setText('');
    const nextIndex = stepIndex + 1;
    const newLines: Line[] = [...lines, { from: 'you', text: said }];
    if (nextIndex < STEPS.length) {
      newLines.push({ from: 'saathi', text: question(STEPS[nextIndex], next.name) });
      setStepIndex(nextIndex);
      setLines(newLines);
    } else {
      setLines(newLines);
      void finish(next);
    }
  }

  function back() {
    const prev = history[history.length - 1];
    if (!prev || phase !== 'asking') return;
    setHistory((h) => h.slice(0, -1));
    setAnswers(prev.answers);
    setLines(prev.lines);
    setStepIndex((i) => i - 1);
    setPicked([]);
  }

  function restart() {
    setAnswers(EMPTY);
    setStepIndex(0);
    setLines([{ from: 'saathi', text: question('name', '') }]);
    setHistory([]);
    setPicked([]);
    setText('');
    setResult(null);
    setPhase('asking');
  }

  const skip: L = { hi: 'छोड़ो', en: 'Skip' };
  const skipped: L = { hi: '(छोड़ दिया)', en: '(skipped)' };

  function submitText(e: FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (step === 'name') answer({ name: value }, value || skipped);
    else answer({ note: value }, value || skipped);
  }

  const choices = (list: { id: string; label: L }[], key: 'education' | 'goal' | 'place' | 'device') => (
    <div className="grid gap-2 sm:grid-cols-2">
      {list.map((item) => (
        <button key={item.id} type="button" className="option" onClick={() => answer({ [key]: item.id } as Partial<Answers>, item.label)}>
          {t(item.label)}
        </button>
      ))}
    </div>
  );

  return (
    <section className="bricks min-h-[calc(100vh-4rem)] py-8 md:py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="kicker">{t({ hi: 'Course finder · AI', en: 'कोर्स खोजो · AI' })}</p>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              {t({ hi: 'आपके लिए कौन सा कोर्स?', en: 'Which course is yours?' })}
            </h1>
          </div>
          <LotusMark className="hidden h-14 w-14 shrink-0 text-ink sm:block" />
        </div>

        {/* Measuring-tape progress */}
        <div
          className="relative h-6 overflow-hidden rounded border-[3px] border-ink bg-white"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={STEPS.length}
          aria-valuenow={phase === 'asking' ? stepIndex : STEPS.length}
        >
          <motion.div
            className="h-full bg-haldi"
            animate={{ width: `${((phase === 'asking' ? stepIndex : STEPS.length) / STEPS.length) * 100}%` }}
            transition={{ type: 'spring', damping: 25 }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, #151515 0 2px, transparent 2px 100%)',
              backgroundSize: `${100 / STEPS.length}% 45%`,
              backgroundRepeat: 'repeat-x',
            }}
          />
        </div>

        <div className="mt-6 space-y-3" aria-live="polite">
          <AnimatePresence initial={false}>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${line.from === 'you' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg border-[3px] border-ink px-4 py-2.5 text-lg leading-relaxed shadow-board-sm ${
                    line.from === 'you' ? 'rounded-br-sm bg-haldi font-bold' : 'rounded-bl-sm bg-white'
                  }`}
                >
                  {typeof line.text === 'string' ? line.text : t(line.text)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {phase === 'thinking' && (
            <div className="flex items-center gap-3 rounded-lg border-[3px] border-ink bg-[#0B1C19] px-4 py-3 text-white">
              <LotusMark className="h-8 w-8 animate-pulse text-neon-glow" />
              <span className="tubelight font-display text-xl font-semibold">
                {t({ hi: 'साथी आपके जवाब देख रहा है…', en: 'Saathi is reading your answers…' })}
              </span>
            </div>
          )}
        </div>

        {phase === 'asking' && (
          <div className="mt-6 rounded-lg border-[3px] border-ink bg-white p-4 shadow-board">
            {(step === 'name' || step === 'note') && (
              <form onSubmit={submitText} className="space-y-3">
                <div className="flex gap-2">
                  {step === 'name' ? (
                    <input
                      className="field"
                      value={text}
                      maxLength={40}
                      autoFocus
                      autoComplete="given-name"
                      placeholder={t({ hi: 'अपना नाम', en: 'Your name' })}
                      onChange={(e) => setText(e.target.value)}
                    />
                  ) : (
                    <textarea
                      className="field min-h-[96px] resize-y"
                      value={text}
                      maxLength={500}
                      placeholder={
                        dictation.listening
                          ? t({ hi: 'सुन रहा हूँ… बोलो', en: 'Listening… go ahead' })
                          : t({ hi: 'जैसे: मेरे पापा की बिजली की दुकान है…', en: 'e.g. My father runs an electrical shop…' })
                      }
                      onChange={(e) => setText(e.target.value)}
                    />
                  )}
                  {dictation.supported && (
                    <button
                      type="button"
                      aria-label={t({ hi: 'बोलकर लिखो', en: 'Speak instead' })}
                      aria-pressed={dictation.listening}
                      onClick={() => (dictation.listening ? dictation.stop() : dictation.start((said) => setText(said)))}
                      className={`grid h-[54px] w-[54px] shrink-0 place-items-center self-start rounded-md border-[3px] border-ink ${
                        dictation.listening ? 'animate-pulse bg-sindoor text-white' : 'bg-haldi'
                      }`}
                    >
                      <Mic className="h-6 w-6" />
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="submit" className="btn btn-ink">
                    {step === 'note' ? t({ hi: 'मेरा कोर्स बताओ', en: 'Show my course' }) : t({ hi: 'आगे', en: 'Next' })}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-white"
                    onClick={() => (step === 'name' ? answer({ name: '' }, skipped) : answer({ note: '' }, skipped))}
                  >
                    {t(skip)}
                  </button>
                </div>
              </form>
            )}

            {step === 'education' && choices(EDUCATION, 'education')}
            {step === 'goal' && choices(GOALS, 'goal')}
            {step === 'place' && choices(PLACES, 'place')}
            {step === 'device' && choices(DEVICES, 'device')}

            {step === 'likes' && (
              <div className="space-y-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  {LIKES.map((item) => {
                    const on = picked.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={on}
                        className="option flex items-center gap-2"
                        onClick={() =>
                          setPicked((p) => (on ? p.filter((x) => x !== item.id) : p.length >= 2 ? [p[1], item.id] : [...p, item.id]))
                        }
                      >
                        <span className={`grid h-5 w-5 shrink-0 place-items-center rounded border-2 border-ink ${on ? 'bg-ink text-haldi' : 'bg-white'}`}>
                          {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        </span>
                        {t(item.label)}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="btn btn-ink"
                  disabled={picked.length === 0}
                  onClick={() => {
                    const labels = LIKES.filter((l) => picked.includes(l.id)).map((l) => l.label);
                    answer({ likes: picked }, { hi: labels.map((l) => l.hi).join(', '), en: labels.map((l) => l.en).join(', ') });
                    setPicked([]);
                  }}
                >
                  {t({ hi: 'आगे', en: 'Next' })} <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {stepIndex > 0 && (
              <button type="button" onClick={back} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-ink/60 hover:text-ink">
                <ArrowLeft className="h-4 w-4" /> {t({ hi: 'पिछला सवाल', en: 'Previous question' })}
              </button>
            )}
          </div>
        )}

        {phase === 'done' && result && <Result result={result} answers={answers} onRestart={restart} />}
        <div ref={endRef} />
      </div>
    </section>
  );
}

function Result({ result, answers, onRestart }: { result: { match: MatchResult; offline: boolean }; answers: Answers; onRestart: () => void }) {
  const { t } = useLang();
  const { match, offline } = result;
  const course = getCourse(match.course)!;
  const alternative = match.alternative === 'none' ? undefined : getCourse(match.alternative);
  const enrol = `/enroll?course=${course.slug}${answers.name ? `&name=${encodeURIComponent(answers.name)}` : ''}`;

  return (
    <motion.div
      className="board screws mt-6 bg-haldi p-6 md:p-8"
      initial={{ opacity: 0, y: 30, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: 'spring', damping: 18 }}
    >
      <p className="kicker">{t({ hi: 'साथी का सुझाव', en: "Saathi's pick" })}</p>
      <h2 className="mt-1 font-display text-3xl font-bold leading-tight md:text-4xl">{match.headline}</h2>

      <Link
        to={`/courses/${course.slug}`}
        className="mt-5 flex items-center gap-4 rounded-md border-[3px] border-ink bg-white p-4 transition-transform hover:-translate-y-0.5"
      >
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-md border-[3px] border-ink bg-ink text-haldi">
          <TradeIcon slug={course.slug} className="h-8 w-8" />
        </span>
        <span>
          <span className="block font-display text-3xl font-bold leading-tight">{t(course.name)}</span>
          <span className="text-base text-ink/70">{t(course.short)}</span>
        </span>
      </Link>

      <ul className="mt-5 space-y-2">
        {match.reasons.map((reason) => (
          <li key={reason} className="flex gap-2 text-lg leading-snug">
            <Check className="mt-1 h-5 w-5 shrink-0" strokeWidth={3} aria-hidden />
            {reason}
          </li>
        ))}
      </ul>

      <p className="mt-5 rounded-md bg-white/60 p-3 text-lg">
        <strong>{t({ hi: 'अगला कदम: ', en: 'Next step: ' })}</strong>
        {match.first_step}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to={enrol} className="btn btn-ink">
          {t({ hi: 'दाख़िला लो', en: 'Enrol now' })}
        </Link>
        <a
          href={whatsappLink(
            t({
              hi: `नमस्ते, Kalaa साथी ने मुझे ${course.name.hi} कोर्स सुझाया है। मुझे और जानना है।`,
              en: `Hi, Kalaa Saathi suggested the ${course.name.en} course for me. I'd like to know more.`,
            }),
          )}
          target="_blank"
          rel="noreferrer"
          className="btn btn-wa"
        >
          <MessageCircle className="h-5 w-5" aria-hidden /> WhatsApp
        </a>
        <button type="button" onClick={onRestart} className="btn btn-white">
          <RotateCcw className="h-5 w-5" aria-hidden /> {t({ hi: 'फिर से', en: 'Start over' })}
        </button>
      </div>

      {alternative && (
        <p className="mt-6 border-t-[3px] border-ink pt-4 text-lg">
          {t({ hi: 'दूसरा अच्छा विकल्प: ', en: 'Another good option: ' })}
          <Link to={`/courses/${alternative.slug}`} className="font-bold underline">
            {t(alternative.name)}
          </Link>
        </p>
      )}
      {offline && (
        <p className="mt-4 text-sm text-ink/70">
          {t({
            hi: 'साथी अभी ऑनलाइन नहीं है, इसलिए यह सुझाव आपके जवाबों से अपने-आप बना है। टीम से बात करके पक्का कर लो।',
            en: "Saathi is offline right now, so this pick was worked out from your answers automatically. Check it with the team.",
          })}
        </p>
      )}
    </motion.div>
  );
}
