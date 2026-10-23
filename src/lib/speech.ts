import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '../data/types';

// Minimal typings for the Web Speech API, which TypeScript's DOM lib omits.
interface RecognitionResultList {
  length: number;
  [index: number]: { isFinal: boolean; 0: { transcript: string } };
}
interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: RecognitionResultList }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Speech-to-text in Hindi (hi-IN) or Indian English (en-IN). */
export function useDictation(lang: Lang) {
  const [listening, setListening] = useState(false);
  const recRef = useRef<Recognition | null>(null);
  const supported = recognitionCtor() !== null;

  const stop = useCallback(() => recRef.current?.stop(), []);

  const start = useCallback(
    (onText: (text: string, isFinal: boolean) => void) => {
      const Ctor = recognitionCtor();
      if (!Ctor) return;
      recRef.current?.abort();
      const rec = new Ctor();
      rec.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      rec.interimResults = true;
      rec.continuous = false;
      rec.onresult = (event) => {
        let text = '';
        let isFinal = false;
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
          if (event.results[i].isFinal) isFinal = true;
        }
        onText(text, isFinal);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recRef.current = rec;
      setListening(true);
      rec.start();
    },
    [lang],
  );

  useEffect(() => () => recRef.current?.abort(), []);

  return { supported, listening, start, stop };
}

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

/** Reads text aloud, picking a Hindi voice for Devanagari text. */
export function speak(text: string, onEnd?: () => void) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const code = /[ऀ-ॿ]/.test(text) ? 'hi-IN' : 'en-IN';
  utterance.lang = code;
  const voices = synth.getVoices();
  const voice = voices.find((v) => v.lang === code) ?? voices.find((v) => v.lang.startsWith(code.slice(0, 2)));
  if (voice) utterance.voice = voice;
  utterance.rate = 0.95;
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  synth.speak(utterance);
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}
