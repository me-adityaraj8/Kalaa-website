import { Check, MessageCircle, Phone } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { COURSES, getCourse } from '../data/courses';
import { CONTACT } from '../data/site';
import { callLink, whatsappLink } from '../lib/contact';
import { numeral, useLang, type L } from '../lib/i18n';

const UNSURE = 'unsure';

const NEXT: L[] = [
  { hi: 'आपका मैसेज WhatsApp पर टीम तक पहुँचेगा।', en: 'Your message reaches the team on WhatsApp.' },
  { hi: 'टीम आपसे बात करके फ़ीस, बैच और ट्रेनिंग की जगह बताएगी।', en: 'They talk you through fees, the batch and where training happens.' },
  { hi: 'वीडियो कोर्स से शुरुआत, फिर दुकान पर प्रैक्टिकल।', en: 'You start with video lessons, then move to hands-on work at a shop.' },
];

export default function Enroll() {
  const { t, lang } = useLang();
  const [params] = useSearchParams();
  const [name, setName] = useState(params.get('name') ?? '');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(getCourse(params.get('course') ?? undefined)?.slug ?? '');
  const [town, setTown] = useState('');
  const [errors, setErrors] = useState<Record<string, L>>({});
  const [sentLink, setSentLink] = useState<string | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
    const next: Record<string, L> = {};
    if (!name.trim()) next.name = { hi: 'अपना नाम लिखो', en: 'Please add your name' };
    if (!/^[6-9]\d{9}$/.test(digits)) next.phone = { hi: '10 अंकों का सही मोबाइल नंबर लिखो', en: 'Enter a valid 10-digit mobile number' };
    if (!course) next.course = { hi: 'एक कोर्स चुनो', en: 'Pick a course' };
    setErrors(next);
    if (Object.keys(next).length) return;

    const chosen = getCourse(course);
    const lines = [
      t({ hi: 'नमस्ते Kalaa टीम, मुझे दाख़िला लेना है।', en: 'Hello Kalaa team, I want to enrol.' }),
      `${t({ hi: 'नाम', en: 'Name' })}: ${name.trim()}`,
      `${t({ hi: 'मोबाइल', en: 'Mobile' })}: ${digits}`,
      `${t({ hi: 'कोर्स', en: 'Course' })}: ${chosen ? t(chosen.name) : t({ hi: 'तय नहीं, मदद चाहिए', en: 'Not sure, need help choosing' })}`,
    ];
    if (town.trim()) lines.push(`${t({ hi: 'शहर/ज़िला', en: 'Town/district' })}: ${town.trim()}`);
    const link = whatsappLink(lines.join('\n'));
    setSentLink(link);
    window.open(link, '_blank', 'noopener');
  }

  const error = (key: string) =>
    errors[key] ? (
      <p className="mt-1 font-bold text-sindoor" role="alert">
        {t(errors[key])}
      </p>
    ) : null;

  return (
    <>
      <PageHeader
        title={{ hi: 'दाख़िला लो', en: 'Enrol' }}
        intro={{
          hi: 'बस तीन चीज़ें भरो। "भेजो" दबाते ही WhatsApp खुलेगा और आपका मैसेज तैयार मिलेगा। बस भेज देना।',
          en: 'Fill in three things. Pressing send opens WhatsApp with your message ready. Just hit send.',
        }}
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.3fr_1fr]">
        <form onSubmit={submit} noValidate className="board bg-white p-6 md:p-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="enrol-name" className="label">{t({ hi: 'आपका नाम', en: 'Your name' })}</label>
              <input id="enrol-name" className="field" value={name} maxLength={60} autoComplete="name" onChange={(e) => setName(e.target.value)} />
              {error('name')}
            </div>
            <div>
              <label htmlFor="enrol-phone" className="label">{t({ hi: 'मोबाइल नंबर (WhatsApp वाला)', en: 'Mobile number (WhatsApp)' })}</label>
              <input
                id="enrol-phone"
                className="field"
                value={phone}
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="98XXXXXXXX"
                maxLength={16}
                onChange={(e) => setPhone(e.target.value)}
              />
              {error('phone')}
            </div>
            <fieldset>
              <legend className="label">{t({ hi: 'कौन सा कोर्स?', en: 'Which course?' })}</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {COURSES.map((c) => (
                  <button key={c.slug} type="button" aria-pressed={course === c.slug} className="option" onClick={() => setCourse(c.slug)}>
                    {t(c.name)}
                  </button>
                ))}
                <button type="button" aria-pressed={course === UNSURE} className="option sm:col-span-2" onClick={() => setCourse(UNSURE)}>
                  {t({ hi: 'पता नहीं, चुनने में मदद चाहिए', en: "Not sure, help me choose" })}
                </button>
              </div>
              {error('course')}
            </fieldset>
            <div>
              <label htmlFor="enrol-town" className="label">
                {t({ hi: 'शहर या ज़िला', en: 'Town or district' })} <span className="text-base font-normal text-ink/50">({t({ hi: 'अगर बताना चाहो', en: 'optional' })})</span>
              </label>
              <input id="enrol-town" className="field" value={town} maxLength={60} onChange={(e) => setTown(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn btn-wa mt-8 w-full text-2xl">
            <MessageCircle className="h-6 w-6" aria-hidden /> {t({ hi: 'WhatsApp पर भेजो', en: 'Send on WhatsApp' })}
          </button>
          {sentLink && (
            <p className="mt-4 rounded-md bg-haldi-soft p-3 text-lg">
              {t({ hi: 'WhatsApp नहीं खुला? ', en: "WhatsApp didn't open? " })}
              <a href={sentLink} target="_blank" rel="noreferrer" className="font-bold underline">
                {t({ hi: 'यहाँ दबाओ', en: 'Tap here' })}
              </a>
              {t({ hi: ' या सीधे कॉल करो।', en: ' or just call us.' })}
            </p>
          )}
          <p className="mt-4 text-sm text-ink/60">
            {t({
              hi: 'आपकी जानकारी सिर्फ़ WhatsApp मैसेज में जाती है। यह वेबसाइट इसे कहीं सेव नहीं करती।',
              en: "Your details only go into the WhatsApp message. This website doesn't store them.",
            })}
          </p>
        </form>

        <aside className="space-y-6 self-start">
          <div className="board bg-haldi p-6">
            <p className="font-display text-3xl font-bold">{t({ hi: 'आगे क्या होगा', en: 'What happens next' })}</p>
            <ol className="mt-4 space-y-3">
              {NEXT.map((step, i) => (
                <li key={step.en} className="flex gap-3 text-lg leading-snug">
                  <span className="font-body text-3xl font-extrabold leading-none">{numeral(lang, i)}</span>
                  {t(step)}
                </li>
              ))}
            </ol>
          </div>
          <div className="board bg-white p-6">
            <p className="font-display text-2xl font-bold">{t({ hi: 'फ़ॉर्म नहीं भरना? सीधे बात करो', en: 'Rather talk? Call us' })}</p>
            <a href={callLink} className="btn btn-white mt-4 w-full">
              <Phone className="h-5 w-5" aria-hidden /> {CONTACT.phoneDisplay}
            </a>
            <ul className="mt-5 space-y-2">
              {[
                { hi: 'हिंदी में कोर्स', en: 'Courses in Hindi' },
                { hi: 'असली दुकान पर प्रैक्टिकल', en: 'Hands-on at a real shop' },
                { hi: 'सर्टिफिकेट और काम में मदद', en: 'Certificate and help finding work' },
              ].map((item) => (
                <li key={item.en} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-patta" strokeWidth={3} aria-hidden /> {t(item)}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
