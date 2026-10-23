import type { L } from './types.js';

// Facts here come from Kalaa's own documents (pitch deck, LLP profile, poster).
// The site and Kalaa Saathi both read from this file, so keep it true.

export const CONTACT = {
  phoneDisplay: '+91 73078 23206',
  phoneE164: '+917307823206',
  whatsapp: '917307823206',
  email: 'sarvagya3dwivedi@gmail.com',
  instagram: 'kalaaxskills',
  // Registered office, from the KALAA SKILLTECH LLP profile.
  address: {
    en: 'Anju Niwas, Green City Colony, near Glocal Hospital, Banshitikar, Bhagalpur, Bihar',
    hi: 'अंजू निवास, ग्रीन सिटी कॉलोनी, ग्लोकल हॉस्पिटल के पास, बंशीटिकर, भागलपुर, बिहार',
  } satisfies L,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Green+City+Colony+Banshitikar+Bhagalpur',
};

export const LEGAL_NAME = 'KALAA SKILLTECH LLP';

// The pitch deck lists ₹299 per course; the LLP profile uses ₹5,000 as an
// example. Set this once the real fee is confirmed. While null, the site says
// "low fees, ask us" instead of showing a number.
export const COURSE_FEE: number | null = null;

export const FUNDING = {
  scheme: 'Startup Bihar',
  amount: { hi: '₹10 लाख', en: '₹10 lakh' } satisfies L,
  applicants: '10,000+',
};

export const TAGLINE: L = { hi: 'बेहतर कल के लिए', en: 'for a better tomorrow' };
export const MOTTO: L = { hi: 'अभी सीखो, जल्दी कमाओ', en: 'Learn now, earn soon' };

export const MISSION: L = {
  hi: 'बिहार के युवाओं को सस्ती, काम आने वाली तकनीकी ट्रेनिंग देना, और लोकल बिज़नेस के साथ मिलकर उन्हें असली काम से जोड़ना।',
  en: 'To give the youth of Bihar affordable, job-ready technical skills, and connect them with real work through local business partnerships.',
};

export const VISION: L = {
  hi: 'बिहार में हुनरमंद युवाओं और बढ़ते लोकल बिज़नेस का सबसे बड़ा नेटवर्क बनाना, ताकि रोज़ी-रोटी टिकाऊ हो और तरक्की सबकी हो।',
  en: "To build Bihar's largest network of skilled youth and thriving local businesses, creating lasting livelihoods and growth that includes everyone.",
};

export const STEPS: { title: L; body: L }[] = [
  {
    title: { hi: 'फ़ोन पर सीखो', en: 'Learn on your phone' },
    body: {
      hi: 'हिंदी में आसान वीडियो कोर्स। कम फ़ीस, अपने टाइम पर।',
      en: 'Simple video lessons in Hindi. Low fees, at your own pace.',
    },
  },
  {
    title: { hi: 'दुकान पर हाथ से करो', en: 'Practise at a real shop' },
    body: {
      hi: 'पार्टनर दुकान पर एक अनुभवी मेंटर के साथ असली काम करो।',
      en: 'Work on real jobs at a partner shop, guided by an experienced mentor.',
    },
  },
  {
    title: { hi: 'सर्टिफिकेट लो, कमाओ', en: 'Get certified, start earning' },
    body: {
      hi: 'सर्टिफिकेट के साथ काम ढूँढने में मदद, या अपनी दुकान खोलने की तैयारी।',
      en: 'A certificate, help finding work, or the groundwork to open your own shop.',
    },
  },
];

export const TIMELINE: { when: L; what: L }[] = [
  {
    when: { hi: 'दिसंबर 2024', en: 'December 2024' },
    what: {
      hi: 'बिहार में पढ़े-लिखे पर बेरोज़गार युवाओं को देखकर Kalaa का आइडिया आया।',
      en: 'Seeing how many educated young people in Bihar had no work, we started Kalaa.',
    },
  },
  {
    when: { hi: 'मार्च 2025', en: 'March 2025' },
    what: {
      hi: 'Startup Bihar योजना में 10,000+ आवेदकों में से चुने गए और ₹10 लाख की सीड फ़ंडिंग मिली।',
      en: 'Picked from 10,000+ applicants for ₹10 lakh seed funding under the Startup Bihar scheme.',
    },
  },
  {
    when: { hi: 'अप्रैल 2025', en: 'April 2025' },
    what: {
      hi: 'हाथ से सिखाने के लिए लोकल दुकानों और बिज़नेस से पार्टनरशिप की।',
      en: 'Partnered with local businesses so trainees learn hands-on.',
    },
  },
  {
    when: { hi: 'मई 2025', en: 'May 2025' },
    what: {
      hi: 'मोबाइल रिपेयर, AC इंस्टॉलेशन और सोलर मेंटेनेंस के कोर्स शुरू किए।',
      en: 'Launched courses in mobile repair, AC installation and solar maintenance.',
    },
  },
];

export type Founder = { name: string; short: string; role: string; degree: string; photo: string; line: L };

export const TEAM: Founder[] = [
  {
    name: 'Sarvagya Dwivedi',
    short: 'Sarvagya Dwivedi',
    role: 'CEO',
    degree: 'B.Tech, MAE',
    photo: '/team/sarvagya.webp',
    line: { hi: 'Kalaa का आइडिया इन्हीं का है और मिशन यही आगे ले जाते हैं।', en: 'Had the idea for Kalaa and drives the mission.' },
  },
  {
    name: 'K Aditya Raj Kumar Dora',
    short: 'Aditya Raj',
    role: 'CTO',
    degree: 'B.Tech, CSE',
    photo: '/team/aditya.webp',
    line: { hi: 'Kalaa की पूरी टेक्नोलॉजी यही बनाते हैं।', en: 'Builds the technology behind Kalaa.' },
  },
  {
    name: 'Atyadik Kumar Anand',
    short: 'Atyadik Anand',
    role: 'CFO',
    degree: 'B.Tech, CSE',
    photo: '/team/atyadik.webp',
    line: { hi: 'पैसे का हिसाब और बिज़नेस पार्टनरशिप संभालते हैं।', en: 'Looks after finances and business partnerships.' },
  },
  {
    name: 'Abhinav Kishan',
    short: 'Abhinav Kishan',
    role: 'COO',
    degree: 'B.Tech, CSE',
    photo: '/team/abhinav.webp',
    line: { hi: 'ज़मीन पर ट्रेनिंग ठीक से चले, यह इनकी ज़िम्मेदारी है।', en: 'Makes sure training runs smoothly on the ground.' },
  },
];
