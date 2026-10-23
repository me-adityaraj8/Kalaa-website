import { GraduationCap, Handshake, MessageCircle, Users, Video } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import Duo from '../components/Duo';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { COURSES } from '../data/courses';
import { whatsappLink } from '../lib/contact';
import { useLang, type L } from '../lib/i18n';

const BENEFITS: { icon: typeof Users; title: L; body: L }[] = [
  {
    icon: Users,
    title: { hi: 'ट्रेंड मददगार पाओ', en: 'Get trained helpers' },
    body: {
      hi: 'हमारे ट्रेनी बेसिक पहले से सीखकर आते हैं और आपकी दुकान के असली काम में हाथ बँटाते हैं।',
      en: 'Our trainees arrive with the basics learned and help with real work at your shop.',
    },
  },
  {
    icon: GraduationCap,
    title: { hi: 'मेंटर बनो', en: 'Become a mentor' },
    body: {
      hi: 'अपने अनुभव से नए कारीगर तैयार करो। इलाके में आपका नाम और भरोसा बढ़ेगा।',
      en: 'Use your experience to train new technicians, and grow your name in the area.',
    },
  },
  {
    icon: Handshake,
    title: { hi: 'अपनों में से हायर करो', en: 'Hire people you trained' },
    body: {
      hi: 'जिसे आपने खुद सिखाया, उसी को काम पर रख लो। अच्छे लोग ढूँढने की झंझट ख़त्म।',
      en: "Hire someone you've trained yourself, and stop hunting for good people.",
    },
  },
  {
    icon: Video,
    title: { hi: 'Kalaa के वीडियो में दिखो', en: "Feature in Kalaa's lessons" },
    body: {
      hi: 'हमारे वीडियो कोर्स में आपकी दुकान और आपका काम दिख सकता है।',
      en: 'Your shop and your work can appear in our video lessons.',
    },
  },
];

export default function Partner() {
  const { t } = useLang();
  const [shop, setShop] = useState('');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [trade, setTrade] = useState('');
  const [area, setArea] = useState('');
  const [error, setError] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!shop.trim() || !owner.trim() || phone.replace(/\D/g, '').length < 10) {
      setError(true);
      return;
    }
    setError(false);
    const course = COURSES.find((c) => c.slug === trade);
    const message = [
      t({ hi: 'नमस्ते Kalaa टीम, मैं अपनी दुकान को Kalaa से जोड़ना चाहता/चाहती हूँ।', en: 'Hello Kalaa team, I would like my shop to partner with Kalaa.' }),
      `${t({ hi: 'दुकान', en: 'Shop' })}: ${shop.trim()}`,
      `${t({ hi: 'नाम', en: 'Name' })}: ${owner.trim()}`,
      `${t({ hi: 'मोबाइल', en: 'Mobile' })}: ${phone.trim()}`,
      `${t({ hi: 'काम', en: 'Trade' })}: ${course ? t(course.name) : t({ hi: 'कुछ और', en: 'Other' })}`,
      area.trim() ? `${t({ hi: 'इलाका', en: 'Area' })}: ${area.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(whatsappLink(message), '_blank', 'noopener');
  }

  return (
    <>
      <PageHeader
        title={{ hi: 'दुकानदारों और बिज़नेस के लिए', en: 'For shop owners and businesses' }}
        intro={{
          hi: 'असली कारीगर दुकान पर काम करके ही बनते हैं। Kalaa से जुड़ो: नए लोगों को अपने हाथ से सिखाओ, और ट्रेंड लोग पाओ।',
          en: 'Real technicians are made at real shops. Partner with Kalaa: train newcomers with your own hands, and get skilled people in return.',
        }}
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title.en} delay={i * 0.06}>
              <div className="board h-full bg-white p-6">
                <span className="grid h-12 w-12 place-items-center rounded-md border-[3px] border-ink bg-haldi">
                  <b.icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold leading-tight">{t(b.title)}</h2>
                <p className="mt-2 text-lg leading-relaxed">{t(b.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bricks border-t-[3px] border-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Duo text={{ hi: 'जुड़ना आसान है', en: 'Joining is simple' }} className="font-display text-4xl font-bold md:text-5xl" />
            <ol className="mt-6 space-y-4 text-lg">
              {[
                { hi: 'नीचे फ़ॉर्म भरो, मैसेज WhatsApp पर आएगा।', en: 'Fill in the form and the message goes to us on WhatsApp.' },
                { hi: 'हमारी टीम आपकी दुकान पर मिलने आएगी।', en: 'Our team visits your shop to meet you.' },
                { hi: 'आपके हिसाब से ट्रेनी आपके पास भेजे जाएँगे।', en: 'Trainees are matched to your shop at a pace that suits you.' },
              ].map((step, i) => (
                <li key={step.en} className="flex gap-3">
                  <span lang="hi" className="paint font-body text-4xl font-extrabold leading-none">{['१', '२', '३'][i]}</span>
                  {t(step)}
                </li>
              ))}
            </ol>
          </div>

          <form onSubmit={submit} noValidate className="board bg-white p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="p-shop" className="label">{t({ hi: 'दुकान / बिज़नेस का नाम', en: 'Shop or business name' })}</label>
                <input id="p-shop" className="field" value={shop} maxLength={80} onChange={(e) => setShop(e.target.value)} />
              </div>
              <div>
                <label htmlFor="p-owner" className="label">{t({ hi: 'आपका नाम', en: 'Your name' })}</label>
                <input id="p-owner" className="field" value={owner} maxLength={60} autoComplete="name" onChange={(e) => setOwner(e.target.value)} />
              </div>
              <div>
                <label htmlFor="p-phone" className="label">{t({ hi: 'मोबाइल', en: 'Mobile' })}</label>
                <input id="p-phone" className="field" value={phone} inputMode="tel" autoComplete="tel-national" maxLength={16} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label htmlFor="p-trade" className="label">{t({ hi: 'आपका काम', en: 'Your trade' })}</label>
                <select id="p-trade" className="field" value={trade} onChange={(e) => setTrade(e.target.value)}>
                  <option value="">{t({ hi: 'चुनो', en: 'Choose' })}</option>
                  {COURSES.map((c) => (
                    <option key={c.slug} value={c.slug}>{t(c.name)}</option>
                  ))}
                  <option value="other">{t({ hi: 'कुछ और', en: 'Something else' })}</option>
                </select>
              </div>
              <div>
                <label htmlFor="p-area" className="label">{t({ hi: 'इलाका / शहर', en: 'Area or town' })}</label>
                <input id="p-area" className="field" value={area} maxLength={60} onChange={(e) => setArea(e.target.value)} />
              </div>
            </div>
            {error && (
              <p className="mt-4 font-bold text-sindoor" role="alert">
                {t({ hi: 'दुकान का नाम, आपका नाम और मोबाइल नंबर ज़रूरी है।', en: 'Shop name, your name and mobile number are needed.' })}
              </p>
            )}
            <button type="submit" className="btn btn-wa mt-6 w-full">
              <MessageCircle className="h-5 w-5" aria-hidden /> {t({ hi: 'WhatsApp पर भेजो', en: 'Send on WhatsApp' })}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
