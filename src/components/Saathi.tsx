import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Mic, Send, Square, Volume2, X } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AiBusy, AiOffline, streamChat, type ChatTurn } from '../lib/api';
import { whatsappLink } from '../lib/contact';
import { useLang, type L } from '../lib/i18n';
import { canSpeak, speak, stopSpeaking, useDictation } from '../lib/speech';
import LotusMark from './LotusMark';

type Status = 'streaming' | 'offline' | 'busy' | 'error';
type Message = { role: 'user' | 'assistant'; content: string; status?: Status };

type SaathiContextValue = { open: (ask?: string) => void; close: () => void };
const SaathiContext = createContext<SaathiContextValue | null>(null);

export function useSaathi(): SaathiContextValue {
  const ctx = useContext(SaathiContext);
  if (!ctx) throw new Error('useSaathi must be used inside SaathiProvider');
  return ctx;
}

export function SaathiProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [ask, setAsk] = useState<string | null>(null);
  const open = useCallback((question?: string) => {
    setOpen(true);
    if (question) setAsk(question);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  return (
    <SaathiContext.Provider value={{ open, close }}>
      {children}
      <SaathiPanel isOpen={isOpen} onClose={close} ask={ask} onAsked={() => setAsk(null)} />
    </SaathiContext.Provider>
  );
}

const SUGGESTIONS: L[] = [
  { hi: 'मेरे लिए कौन सा कोर्स ठीक है?', en: 'Which course suits me?' },
  { hi: 'हाथ से काम कहाँ सिखाते हो?', en: 'Where is the hands-on training?' },
  { hi: 'फ़ीस कितनी है?', en: 'How much are the fees?' },
  { hi: 'सर्टिफिकेट मिलेगा क्या?', en: 'Do I get a certificate?' },
];

const COPY = {
  greeting: {
    hi: 'नमस्ते! मैं Kalaa साथी हूँ। कोर्स, ट्रेनिंग या दाख़िले के बारे में कुछ भी पूछो। माइक दबाकर बोल भी सकते हो।',
    en: "Hi! I'm Kalaa Saathi. Ask me anything about our courses, training or how to join. You can also tap the mic and speak.",
  },
  subtitle: { hi: 'AI गाइड · हिंदी या English में पूछो', en: 'AI guide · ask in Hindi or English' },
  placeholder: { hi: 'यहाँ लिखो…', en: 'Type here…' },
  listening: { hi: 'सुन रहा हूँ… बोलो', en: 'Listening… go ahead' },
  offline: {
    hi: 'साथी अभी आराम कर रहा है। आपका सवाल सीधे टीम को WhatsApp पर भेज दो, वो जवाब देंगे।',
    en: "Saathi is resting right now. Send your question to the team on WhatsApp and they'll answer.",
  },
  busy: {
    hi: 'बहुत सारे सवाल एक साथ आ गए। थोड़ी देर बाद पूछो, या WhatsApp करो।',
    en: 'Too many questions at once. Try again in a few minutes, or WhatsApp us.',
  },
  error: { hi: 'जवाब नहीं आ पाया। एक बार फिर कोशिश करो।', en: "That didn't go through. Please try once more." },
  disclaimer: {
    hi: 'साथी AI है, कभी-कभी गलती कर सकता है। ज़रूरी बातें टीम से पक्की कर लो।',
    en: 'Saathi is an AI and can get things wrong. Confirm important details with the team.',
  },
  sendWa: { hi: 'WhatsApp पर भेजो', en: 'Send on WhatsApp' },
  close: { hi: 'बंद करो', en: 'Close' },
  mic: { hi: 'बोलकर पूछो', en: 'Ask by voice' },
  send: { hi: 'भेजो', en: 'Send' },
  listen: { hi: 'सुनो', en: 'Listen' },
  stop: { hi: 'रोको', en: 'Stop' },
} satisfies Record<string, L>;

function SaathiPanel({ isOpen, onClose, ask, onAsked }: { isOpen: boolean; onClose: () => void; ask: string | null; onAsked: () => void }) {
  const { lang, t } = useLang();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const dictation = useDictation(lang);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const updateLast = (patch: Partial<Message>) =>
    setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { ...m, ...patch } : m)));

  const send = useCallback(
    async (raw: string, viaVoice = false) => {
      const content = raw.trim();
      if (!content || busy) return;
      stopSpeaking();
      setSpeakingIndex(null);

      // Only real exchanges go back to the model, newest 12 turns.
      let history: ChatTurn[] = messages
        .filter((m) => !m.status)
        .map(({ role, content }) => ({ role, content }))
        .concat({ role: 'user', content })
        .slice(-12);
      while (history.length && history[0].role !== 'user') history = history.slice(1);

      setMessages((prev) => [...prev, { role: 'user', content }, { role: 'assistant', content: '', status: 'streaming' }]);
      setInput('');
      setBusy(true);
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const reply = await streamChat(lang, history, (text) => updateLast({ content: text }), controller.signal);
        updateLast({ content: reply, status: undefined });
        if (viaVoice && canSpeak()) {
          // Spoken question, spoken answer. The reply sits after the user turn.
          setSpeakingIndex(messages.length + 1);
          speak(reply, () => setSpeakingIndex(null));
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        if (err instanceof AiOffline) updateLast({ content: t(COPY.offline), status: 'offline' });
        else if (err instanceof AiBusy) updateLast({ content: t(COPY.busy), status: 'busy' });
        else updateLast({ content: t(COPY.error), status: 'error' });
      } finally {
        setBusy(false);
      }
    },
    [busy, lang, messages, t],
  );

  // A question handed over from elsewhere on the site ("ask about this course").
  useEffect(() => {
    if (isOpen && ask && !busy) {
      onAsked();
      void send(ask);
    }
  }, [isOpen, ask, busy, onAsked, send]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      dictation.stop();
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const timer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 250);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(timer);
    };
    // dictation.stop is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const onMic = () => {
    if (dictation.listening) return dictation.stop();
    stopSpeaking();
    dictation.start((text, isFinal) => {
      setInput(text);
      if (isFinal) void send(text, true);
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const toggleSpeak = (index: number, text: string) => {
    if (speakingIndex === index) {
      stopSpeaking();
      setSpeakingIndex(null);
    } else {
      setSpeakingIndex(index);
      speak(text, () => setSpeakingIndex(null));
    }
  };

  const lastUserQuestion = [...messages].reverse().find((m) => m.role === 'user')?.content;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[60] hidden bg-ink/40 md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Kalaa Saathi"
            className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-wall md:inset-y-3 md:left-auto md:right-3 md:w-[420px] md:rounded-lg md:border-[3px] md:border-ink md:shadow-board-lg"
            initial={{ x: '105%' }}
            animate={{ x: 0 }}
            exit={{ x: '105%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
          >
            <header className="flex items-center gap-3 bg-ink px-4 py-3 text-white">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-neon-glow/50 bg-neon-deep">
                <LotusMark className="h-6 w-6 text-neon-glow" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="tubelight animate-flicker font-display text-2xl font-semibold leading-none">Kalaa साथी</p>
                <p className="truncate text-sm text-white/70">{t(COPY.subtitle)}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-md border-2 border-white/30 hover:bg-white/10"
                aria-label={t(COPY.close)}
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              <Bubble role="assistant">{t(COPY.greeting)}</Bubble>
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button key={s.en} type="button" className="chip hover:bg-haldi-soft" onClick={() => void send(t(s))}>
                      {t(s)}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role}>
                  {m.status === 'streaming' && !m.content ? (
                    <span className="inline-flex gap-1 py-1" aria-label="…">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-2 w-2 animate-blink rounded-full bg-ink" style={{ animationDelay: `${d * 0.2}s` }} />
                      ))}
                    </span>
                  ) : (
                    <span className="whitespace-pre-wrap">{m.content}</span>
                  )}
                  {(m.status === 'offline' || m.status === 'busy') && (
                    <a
                      href={whatsappLink(lastUserQuestion)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-wa mt-3 w-full py-2 text-lg"
                    >
                      <MessageCircle className="h-5 w-5" /> {t(COPY.sendWa)}
                    </a>
                  )}
                  {m.role === 'assistant' && !m.status && m.content && canSpeak() && (
                    <button
                      type="button"
                      onClick={() => toggleSpeak(i, m.content)}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-neon-deep hover:underline"
                    >
                      {speakingIndex === i ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      {speakingIndex === i ? t(COPY.stop) : t(COPY.listen)}
                    </button>
                  )}
                </Bubble>
              ))}
            </div>

            <form onSubmit={onSubmit} className="safe-bottom border-t-[3px] border-ink bg-white px-3 pt-3">
              <div className="flex items-end gap-2">
                {dictation.supported && (
                  <button
                    type="button"
                    onClick={onMic}
                    aria-label={t(COPY.mic)}
                    aria-pressed={dictation.listening}
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-ink transition-colors ${
                      dictation.listening ? 'animate-pulse bg-sindoor text-white' : 'bg-haldi hover:bg-haldi-deep'
                    }`}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                )}
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void send(input);
                    }
                  }}
                  placeholder={dictation.listening ? t(COPY.listening) : t(COPY.placeholder)}
                  maxLength={1000}
                  className="field max-h-32 min-h-[48px] resize-none py-2 text-base"
                  aria-label={t(COPY.placeholder)}
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label={t(COPY.send)}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-md border-[3px] border-ink bg-ink text-haldi disabled:opacity-40"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="py-2 text-xs leading-snug text-ink/60">{t(COPY.disclaimer)}</p>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: ReactNode }) {
  const mine = role === 'user';
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-lg border-[3px] border-ink px-3.5 py-2.5 text-[17px] leading-relaxed shadow-board-sm ${
          mine ? 'rounded-br-sm bg-haldi' : 'rounded-bl-sm bg-white'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
