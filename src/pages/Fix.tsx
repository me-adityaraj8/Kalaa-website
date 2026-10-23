import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Camera, ImagePlus, Loader2, MessageCircle, Mic, RotateCcw } from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import TradeIcon from '../components/TradeIcon';
import { getCourse } from '../data/courses';
import { AiBusy, AiOffline, diagnose, type DeviceKind, type Diagnosis } from '../lib/api';
import { whatsappLink } from '../lib/contact';
import { numeral, useLang, type L } from '../lib/i18n';
import { shrinkPhoto } from '../lib/image';
import { useDictation } from '../lib/speech';

const DEVICES: { id: DeviceKind; label: L }[] = [
  { id: 'phone', label: { hi: 'मोबाइल', en: 'Phone' } },
  { id: 'laptop', label: { hi: 'लैपटॉप', en: 'Laptop' } },
  { id: 'ac', label: { hi: 'AC', en: 'AC' } },
  { id: 'solar', label: { hi: 'सोलर', en: 'Solar' } },
  { id: 'other', label: { hi: 'कुछ और', en: 'Other' } },
];

const CHANCE: Record<Diagnosis['likely_issues'][number]['chance'], { label: L; cls: string }> = {
  high: { label: { hi: 'ज़्यादा संभावना', en: 'Likely' }, cls: 'bg-sindoor text-white' },
  medium: { label: { hi: 'हो सकता है', en: 'Possible' }, cls: 'bg-haldi' },
  low: { label: { hi: 'कम संभावना', en: 'Less likely' }, cls: 'bg-wall' },
};

const DIFFICULTY: Record<Diagnosis['difficulty'], { label: L; level: number }> = {
  easy: { label: { hi: 'आसान', en: 'Easy' }, level: 1 },
  medium: { label: { hi: 'मध्यम', en: 'Medium' }, level: 2 },
  expert: { label: { hi: 'एक्सपर्ट का काम', en: 'Expert job' }, level: 3 },
};

type Status = 'idle' | 'loading' | 'done' | 'offline' | 'busy' | 'error';

export default function Fix() {
  const { t, lang } = useLang();
  const [device, setDevice] = useState<DeviceKind>('phone');
  const [photo, setPhoto] = useState<{ dataUrl: string; base64: string } | null>(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<Diagnosis | null>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const dictation = useDictation(lang);

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      setPhoto(await shrinkPhoto(file));
      setResult(null);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  }

  async function check() {
    if (!photo) return;
    setStatus('loading');
    setResult(null);
    try {
      setResult(await diagnose({ lang, device, note, image: photo.base64, mediaType: 'image/jpeg' }));
      setStatus('done');
    } catch (err) {
      setStatus(err instanceof AiOffline ? 'offline' : err instanceof AiBusy ? 'busy' : 'error');
    }
  }

  function reset() {
    setPhoto(null);
    setNote('');
    setResult(null);
    setStatus('idle');
  }

  const stepLabel = 'font-display text-2xl font-semibold';

  return (
    <>
      <PageHeader
        title={{ hi: 'फ़ोटो से खराबी पहचानो', en: 'Find the fault from a photo' }}
        intro={{
          hi: 'खराब फ़ोन, लैपटॉप, AC या सोलर की फ़ोटो डालो। साथी देखकर बताएगा क्या दिक्कत हो सकती है, क्या सावधानी रखनी है, और कौन सा Kalaa कोर्स इसे ठीक करना सिखाता है।',
          en: "Add a photo of a broken phone, laptop, AC or solar setup. Saathi will suggest what's wrong, what to be careful about, and which Kalaa course teaches the fix.",
        }}
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-8">
          <div>
            <p className={stepLabel}>
              <span className="paint mr-2 font-body font-extrabold">{numeral(lang, 0)}</span>
              {t({ hi: 'यह क्या है?', en: 'What is it?' })}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {DEVICES.map((d) => (
                <button key={d.id} type="button" aria-pressed={device === d.id} onClick={() => setDevice(d.id)} className="option px-4 py-2">
                  {t(d.label)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className={stepLabel}>
              <span className="paint mr-2 font-body font-extrabold">{numeral(lang, 1)}</span>
              {t({ hi: 'फ़ोटो लो', en: 'Take a photo' })}
            </p>
            <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFile} />
            <input ref={galleryRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
            {photo ? (
              <div className="mt-3 overflow-hidden rounded-md border-[3px] border-ink bg-ink">
                <img src={photo.dataUrl} alt={t({ hi: 'आपकी फ़ोटो', en: 'Your photo' })} className="mx-auto max-h-72 object-contain" />
              </div>
            ) : (
              <p className="mt-2 text-ink/70">
                {t({ hi: 'खराब हिस्सा साफ़ दिखे, रोशनी अच्छी हो।', en: 'Get the damaged part in frame, in good light.' })}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="btn btn-haldi" onClick={() => cameraRef.current?.click()}>
                <Camera className="h-5 w-5" aria-hidden /> {photo ? t({ hi: 'दूसरी फ़ोटो', en: 'Retake' }) : t({ hi: 'फ़ोटो खींचो', en: 'Use camera' })}
              </button>
              <button type="button" className="btn btn-white" onClick={() => galleryRef.current?.click()}>
                <ImagePlus className="h-5 w-5" aria-hidden /> {t({ hi: 'गैलरी से', en: 'From gallery' })}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="fault-note" className={stepLabel}>
              <span className="paint mr-2 font-body font-extrabold">{numeral(lang, 2)}</span>
              {t({ hi: 'क्या दिक्कत है? (अगर पता हो)', en: "What's the problem? (if you know)" })}
            </label>
            <div className="mt-3 flex gap-2">
              <textarea
                id="fault-note"
                className="field min-h-[88px] resize-y"
                value={note}
                maxLength={500}
                placeholder={t({ hi: 'जैसे: चार्ज नहीं हो रहा, स्क्रीन पर लाइनें…', en: 'e.g. not charging, lines on the screen…' })}
                onChange={(e) => setNote(e.target.value)}
              />
              {dictation.supported && (
                <button
                  type="button"
                  aria-label={t({ hi: 'बोलकर लिखो', en: 'Speak instead' })}
                  aria-pressed={dictation.listening}
                  onClick={() => (dictation.listening ? dictation.stop() : dictation.start((said) => setNote(said)))}
                  className={`grid h-[54px] w-[54px] shrink-0 place-items-center rounded-md border-[3px] border-ink ${
                    dictation.listening ? 'animate-pulse bg-sindoor text-white' : 'bg-haldi'
                  }`}
                >
                  <Mic className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn btn-ink" disabled={!photo || status === 'loading'} onClick={check}>
              {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
              {status === 'loading' ? t({ hi: 'जाँच हो रही है…', en: 'Checking…' }) : t({ hi: 'जाँच करो', en: 'Check it' })}
            </button>
            {(photo || result) && (
              <button type="button" className="btn btn-white" onClick={reset}>
                <RotateCcw className="h-5 w-5" aria-hidden /> {t({ hi: 'नई जाँच', en: 'New check' })}
              </button>
            )}
          </div>
        </div>

        <JobCard status={status} result={result} device={device} />
      </section>
    </>
  );
}

function JobCard({ status, result, device }: { status: Status; result: Diagnosis | null; device: DeviceKind }) {
  const { t } = useLang();
  const course = result && result.course !== 'none' ? getCourse(result.course) : undefined;
  const field = 'border-b-2 border-dashed border-ink/25 pb-4';
  const fieldLabel = 'text-sm font-bold uppercase tracking-wider text-ink/50';
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <motion.div layout className="board slip self-start p-6 md:p-7" aria-live="polite">
      <div className="flex items-start justify-between gap-4 border-b-[3px] border-ink pb-4">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.25em]">KALAA REPAIR DESK</p>
          <p className="font-display text-3xl font-bold leading-tight">{t({ hi: 'जॉब कार्ड', en: 'Job card' })}</p>
        </div>
        <p className="text-right text-sm text-ink/60">{today}</p>
      </div>

      {status === 'idle' && !result && (
        <div className="space-y-4 py-6 text-ink/50">
          <p className="text-lg">
            {t({
              hi: 'फ़ोटो डालकर "जाँच करो" दबाओ। साथी का जवाब यहाँ आएगा।',
              en: 'Add a photo and press "Check it". Saathi\'s answer appears here.',
            })}
          </p>
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-4 rounded bg-wall" style={{ width: `${90 - i * 18}%` }} />
          ))}
        </div>
      )}

      {status === 'loading' && (
        <div className="flex items-center gap-3 py-10">
          <Loader2 className="h-7 w-7 animate-spin" aria-hidden />
          <p className="text-lg font-bold">{t({ hi: 'साथी फ़ोटो ध्यान से देख रहा है…', en: 'Saathi is looking closely at the photo…' })}</p>
        </div>
      )}

      {(status === 'offline' || status === 'busy' || status === 'error') && (
        <div className="space-y-4 py-6">
          <p className="text-lg">
            {status === 'offline'
              ? t({
                  hi: 'फ़ोटो जाँच अभी चालू नहीं है। फ़ोटो सीधे टीम को WhatsApp पर भेज दो, वो बताएँगे।',
                  en: "Photo check isn't switched on right now. Send the photo to the team on WhatsApp and they'll take a look.",
                })
              : status === 'busy'
                ? t({ hi: 'अभी बहुत सारी जाँच चल रही हैं। थोड़ी देर बाद फिर कोशिश करो।', en: 'Lots of checks running right now. Try again in a few minutes.' })
                : t({ hi: 'जाँच पूरी नहीं हो पाई। फ़ोटो दोबारा डालकर कोशिश करो।', en: "The check didn't finish. Try adding the photo again." })}
          </p>
          <a
            href={whatsappLink(t({ hi: 'नमस्ते, मेरे डिवाइस में खराबी है। फ़ोटो भेज रहा/रही हूँ।', en: "Hi, my device has a fault. I'm sending a photo." }))}
            target="_blank"
            rel="noreferrer"
            className="btn btn-wa"
          >
            <MessageCircle className="h-5 w-5" aria-hidden /> WhatsApp
          </a>
        </div>
      )}

      {status === 'done' && result && (
        <div className="space-y-5 pt-5">
          <div className={field}>
            <p className={fieldLabel}>{t({ hi: 'डिवाइस', en: 'Device' })}</p>
            <p className="text-lg font-bold">{t(DEVICES.find((d) => d.id === device)!.label)}</p>
          </div>
          <div className={field}>
            <p className={fieldLabel}>{t({ hi: 'फ़ोटो में क्या दिखा', en: 'What the photo shows' })}</p>
            <p className="text-lg leading-relaxed">{result.what_i_see}</p>
          </div>

          {result.is_device && result.likely_issues.length > 0 && (
            <div className={field}>
              <p className={fieldLabel}>{t({ hi: 'संभावित खराबी', en: 'Likely faults' })}</p>
              <ol className="mt-2 space-y-3">
                {result.likely_issues.map((issue) => (
                  <li key={issue.issue}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold">{issue.issue}</span>
                      <span className={`rounded border-2 border-ink px-1.5 text-xs font-bold ${CHANCE[issue.chance].cls}`}>
                        {t(CHANCE[issue.chance].label)}
                      </span>
                    </div>
                    <p className="leading-relaxed text-ink/80">{issue.why}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {result.safe_checks.length > 0 && (
            <div className={field}>
              <p className={fieldLabel}>{t({ hi: 'आप खुद क्या देख सकते हो', en: 'What you can safely check' })}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-lg leading-relaxed">
                {result.safe_checks.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {result.warnings.length > 0 && (
            <div className="rounded-md border-[3px] border-sindoor bg-sindoor/5 p-4">
              <p className="flex items-center gap-2 font-display text-xl font-bold text-sindoor">
                <AlertTriangle className="h-5 w-5" aria-hidden /> {t({ hi: 'सावधान', en: 'Be careful' })}
              </p>
              <ul className="mt-1 space-y-1 text-lg leading-relaxed">
                {result.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {result.is_device && (
            <div className={field}>
              <p className={fieldLabel}>{t({ hi: 'रिपेयर कितना मुश्किल', en: 'How hard to repair' })}</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex gap-1" aria-hidden>
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className={`h-3 w-10 rounded-sm border-2 border-ink ${n <= DIFFICULTY[result.difficulty].level ? 'bg-ink' : 'bg-white'}`}
                    />
                  ))}
                </div>
                <span className="font-bold">{t(DIFFICULTY[result.difficulty].label)}</span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-lg leading-relaxed">{result.learn_line}</p>
              {course && (
                <Link to={`/courses/${course.slug}`} className="mt-2 inline-flex items-center gap-2 font-display text-xl font-semibold text-sindoor hover:underline">
                  <TradeIcon slug={course.slug} className="h-5 w-5" /> {t(course.name)} <ArrowRight className="h-5 w-5" />
                </Link>
              )}
            </div>
            <span className="stamp">Saathi checked</span>
          </div>
          <p className="text-sm text-ink/60">
            {t({
              hi: 'यह AI का अंदाज़ा है। पक्की जाँच किसी ट्रेंड टेक्नीशियन से ही कराओ।',
              en: "This is an AI's best guess. Get it confirmed by a trained technician.",
            })}
          </p>
        </div>
      )}
    </motion.div>
  );
}
