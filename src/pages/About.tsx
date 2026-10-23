import { MapPin, MessageCircle } from 'lucide-react';
import Duo from '../components/Duo';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { CONTACT, FUNDING, MISSION, TEAM, TIMELINE, VISION } from '../data/site';
import { whatsappLink } from '../lib/contact';
import { useLang } from '../lib/i18n';

export default function About() {
  const { t } = useLang();
  const h2 = 'font-display text-4xl font-bold leading-tight md:text-5xl';

  return (
    <>
      <PageHeader
        title={{ hi: 'हमारी कहानी', en: 'Our story' }}
        intro={{
          hi: 'बिहार में बहुत से युवा पढ़े-लिखे हैं, फिर भी बिना काम के हैं। कमी मेहनत की नहीं, सही हुनर और सही रास्ते की है। Kalaa यही रास्ता बनाने के लिए शुरू हुआ।',
          en: "Many young people in Bihar are educated and still without work. They don't lack effort; they lack the right skills and a clear path to work. Kalaa started to build that path.",
        }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-2">
        <Reveal>
          <div className="board screws h-full bg-haldi p-7">
            <p className="kicker">{t({ hi: 'Mission', en: 'मिशन' })}</p>
            <h2 className="font-display text-3xl font-bold">{t({ hi: 'हमारा मिशन', en: 'Our mission' })}</h2>
            <p className="mt-3 text-lg leading-relaxed">{t(MISSION)}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="board screws h-full bg-white p-7">
            <p className="kicker">{t({ hi: 'Vision', en: 'विज़न' })}</p>
            <h2 className="font-display text-3xl font-bold">{t({ hi: 'हमारा सपना', en: 'Our vision' })}</h2>
            <p className="mt-3 text-lg leading-relaxed">{t(VISION)}</p>
          </div>
        </Reveal>
      </section>

      <section className="border-y-[3px] border-ink bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <Duo text={{ hi: 'अब तक का सफ़र', en: 'The road so far' }} className={h2} subClassName="kicker text-haldi" />
          <ol className="relative mt-10 space-y-8 border-l-[6px] border-dashed border-haldi pl-8 md:ml-4">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.when.en} delay={i * 0.06}>
                <li className="relative">
                  <span className="absolute -left-[47px] top-1 h-6 w-6 rounded-full border-[3px] border-ink bg-haldi" aria-hidden />
                  <p className="font-display text-2xl font-semibold text-haldi">{t(item.when)}</p>
                  <p className="mt-1 max-w-2xl text-lg leading-relaxed text-white/85">{t(item.what)}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <Duo text={{ hi: 'टीम', en: 'The team' }} className={h2} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.06}>
              <li className="board h-full overflow-hidden bg-white">
                <img
                  src={member.photo}
                  alt={member.name}
                  width={480}
                  height={480}
                  loading="lazy"
                  className="aspect-square w-full border-b-[3px] border-ink object-cover grayscale-[0.2]"
                />
                <div className="p-4">
                  <p className="font-display text-sm font-semibold uppercase tracking-widest text-sindoor">{member.role}</p>
                  <p className="font-display text-2xl font-bold leading-tight">{member.name}</p>
                  <p className="text-sm text-ink/60">{member.degree}</p>
                  <p className="mt-2 leading-relaxed">{t(member.line)}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bricks border-t-[3px] border-ink">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-2">
          <div className="board screws bg-white p-7">
            <p className="font-display text-xl font-semibold text-sindoor">{FUNDING.scheme}</p>
            <p className="paint font-display text-6xl font-bold leading-none">{FUNDING.applicants}</p>
            <p className="mt-3 text-lg leading-relaxed">
              {t({
                hi: `बिहार सरकार की ${FUNDING.scheme} योजना में ${FUNDING.applicants} आवेदकों में से Kalaa को चुना गया और ${FUNDING.amount.hi} की सीड फ़ंडिंग मिली।`,
                en: `Kalaa was picked from ${FUNDING.applicants} applicants under the Government of Bihar's ${FUNDING.scheme} scheme and received ${FUNDING.amount.en} in seed funding.`,
              })}
            </p>
          </div>
          <div className="board screws bg-haldi p-7">
            <p className="font-display text-3xl font-bold">{t({ hi: 'मिलो या बात करो', en: 'Visit or talk to us' })}</p>
            <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 flex gap-2 text-lg hover:underline">
              <MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden /> {t(CONTACT.address)}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-wa mt-5">
              <MessageCircle className="h-5 w-5" aria-hidden /> WhatsApp · {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
