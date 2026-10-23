import type { L } from './types.js';
import type { CourseSlug, Trait } from './courses.js';

export type Education = '8' | '10' | '12' | 'iti' | 'grad';
export type Goal = 'job' | 'shop' | 'unsure';
export type Place = 'bhagalpur' | 'bihar' | 'outside';
export type Device = 'phone' | 'laptop' | 'none';

export interface Answers {
  name: string;
  education?: Education;
  likes: Trait[];
  goal?: Goal;
  place?: Place;
  device?: Device;
  note: string;
}

export interface MatchResult {
  course: CourseSlug;
  alternative: CourseSlug | 'none';
  headline: string;
  reasons: string[];
  first_step: string;
}

export const EDUCATION: { id: Education; label: L }[] = [
  { id: '8', label: { hi: '8वीं', en: 'Class 8' } },
  { id: '10', label: { hi: '10वीं', en: 'Class 10' } },
  { id: '12', label: { hi: '12वीं', en: 'Class 12' } },
  { id: 'iti', label: { hi: 'ITI / डिप्लोमा', en: 'ITI / Diploma' } },
  { id: 'grad', label: { hi: 'ग्रेजुएशन', en: 'Graduate' } },
];

export const LIKES: { id: Trait; label: L }[] = [
  { id: 'gadgets', label: { hi: 'फ़ोन-गैजेट खोलकर देखना', en: 'Opening up phones and gadgets' } },
  { id: 'computer', label: { hi: 'कंप्यूटर-लैपटॉप चलाना', en: 'Using computers and laptops' } },
  { id: 'electric', label: { hi: 'बिजली और वायरिंग का काम', en: 'Electrical and wiring work' } },
  { id: 'outdoor', label: { hi: 'बाहर या छत पर काम करना', en: 'Working outdoors or on rooftops' } },
  { id: 'people', label: { hi: 'लोगों से बात करना', en: 'Talking to people and customers' } },
];

export const GOALS: { id: Goal; label: L }[] = [
  { id: 'job', label: { hi: 'नौकरी', en: 'A job' } },
  { id: 'shop', label: { hi: 'अपनी दुकान या काम', en: 'My own shop or business' } },
  { id: 'unsure', label: { hi: 'अभी पक्का नहीं', en: 'Not sure yet' } },
];

export const PLACES: { id: Place; label: L }[] = [
  { id: 'bhagalpur', label: { hi: 'भागलपुर', en: 'Bhagalpur' } },
  { id: 'bihar', label: { hi: 'बिहार में कहीं और', en: 'Elsewhere in Bihar' } },
  { id: 'outside', label: { hi: 'बिहार के बाहर', en: 'Outside Bihar' } },
];

export const DEVICES: { id: Device; label: L }[] = [
  { id: 'phone', label: { hi: 'स्मार्टफ़ोन', en: 'Smartphone' } },
  { id: 'laptop', label: { hi: 'लैपटॉप / कंप्यूटर', en: 'Laptop / computer' } },
  { id: 'none', label: { hi: 'अभी कुछ नहीं', en: 'Nothing yet' } },
];
