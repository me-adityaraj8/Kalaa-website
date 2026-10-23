import type { L } from './types.js';

export const COURSE_SLUGS = ['smartphone-repair', 'laptop-repair', 'ac-service', 'solar-installation'] as const;
export type CourseSlug = (typeof COURSE_SLUGS)[number];

// What a person enjoys; used by the course finder.
export type Trait = 'gadgets' | 'computer' | 'electric' | 'outdoor' | 'people';

export interface Course {
  slug: CourseSlug;
  name: L;
  short: L;
  /** Text for the shop signboard a graduate might one day put up. */
  board: { en: string; hi: string; line: L };
  why: L;
  goodFor: L;
  outcomes: L[];
  tools: L[];
  traits: Trait[];
}

export const COURSES: Course[] = [
  {
    slug: 'smartphone-repair',
    name: { en: 'Smartphone Repair', hi: 'स्मार्टफ़ोन रिपेयर' },
    short: {
      en: 'Fix screens, batteries, charging ports and software faults on any phone.',
      hi: 'हर कंपनी के फ़ोन की स्क्रीन, बैटरी, चार्जिंग और सॉफ़्टवेयर की खराबी ठीक करना सीखो।',
    },
    board: {
      en: 'MOBILE REPAIRING CENTRE',
      hi: 'मोबाइल रिपेयरिंग सेंटर',
      line: { hi: 'यहाँ सभी कंपनी के मोबाइल रिपेयर किए जाते हैं', en: 'All brands of mobile repaired here' },
    },
    why: {
      en: 'Every home has two or three phones, and screens and batteries keep breaking. A small counter and a toolkit are enough to start.',
      hi: 'हर घर में दो-तीन फ़ोन हैं और स्क्रीन-बैटरी खराब होती ही रहती है। शुरू करने के लिए एक छोटा काउंटर और टूलकिट काफ़ी है।',
    },
    goodFor: {
      en: 'You like opening gadgets to see how they work, and you have patient hands.',
      hi: 'आपको गैजेट खोलकर देखना पसंद है और हाथों में धैर्य है।',
    },
    outcomes: [
      { en: 'Open phones safely and replace screens, batteries and back panels', hi: 'फ़ोन को सही तरीके से खोलना, स्क्रीन, बैटरी और बैक पैनल बदलना' },
      { en: 'Fix charging ports, speakers, mics and buttons', hi: 'चार्जिंग पोर्ट, स्पीकर, माइक और बटन ठीक करना' },
      { en: 'Use a multimeter and hot-air station to find faults', hi: 'मल्टीमीटर और हॉट-एयर मशीन से खराबी ढूँढना' },
      { en: 'Handle water-damaged and dead phones step by step', hi: 'पानी में गिरे और डेड फ़ोन को स्टेप-बाय-स्टेप चेक करना' },
      { en: 'Update software and fix phones stuck on the logo', hi: 'सॉफ़्टवेयर अपडेट करना और लोगो पर अटके फ़ोन ठीक करना' },
      { en: 'Price a job, talk to customers and give a warranty', hi: 'काम का दाम तय करना, ग्राहक से बात करना और वारंटी देना' },
    ],
    tools: [
      { en: 'Screwdriver kit', hi: 'स्क्रूड्राइवर किट' },
      { en: 'Multimeter', hi: 'मल्टीमीटर' },
      { en: 'Hot-air station', hi: 'हॉट-एयर मशीन' },
      { en: 'Soldering iron', hi: 'सोल्डरिंग आयरन' },
    ],
    traits: ['gadgets', 'people'],
  },
  {
    slug: 'laptop-repair',
    name: { en: 'Laptop Repair', hi: 'लैपटॉप रिपेयर' },
    short: {
      en: 'Diagnose dead laptops, swap parts, fit SSDs and install Windows.',
      hi: 'बंद लैपटॉप की खराबी पकड़ना, पार्ट्स बदलना, SSD लगाना और Windows इंस्टॉल करना।',
    },
    board: {
      en: 'LAPTOP & COMPUTER CARE',
      hi: 'लैपटॉप एवं कंप्यूटर रिपेयर',
      line: { hi: 'सभी प्रकार के लैपटॉप व कंप्यूटर की मरम्मत', en: 'All laptops and computers repaired' },
    },
    why: {
      en: 'Students, offices and cyber cafés all run on laptops, and most towns have very few people who can properly fix them.',
      hi: 'स्टूडेंट, ऑफ़िस और साइबर कैफ़े सब लैपटॉप पर चलते हैं, और ज़्यादातर शहरों में इन्हें सही से ठीक करने वाले बहुत कम हैं।',
    },
    goodFor: {
      en: "You're comfortable with computers and enjoy solving puzzles.",
      hi: 'आप कंप्यूटर चलाने में सहज हैं और पहेली सुलझाना अच्छा लगता है।',
    },
    outcomes: [
      { en: "Find out why a laptop won't power on or shows no display", hi: 'लैपटॉप चालू न हो या डिस्प्ले न आए तो वजह ढूँढना' },
      { en: 'Replace keyboards, screens, batteries and hinges', hi: 'कीबोर्ड, स्क्रीन, बैटरी और हिंज बदलना' },
      { en: 'Add RAM and fit SSDs to make old laptops fast', hi: 'RAM और SSD लगाकर पुराने लैपटॉप को तेज़ बनाना' },
      { en: 'Install Windows, drivers and everyday software', hi: 'Windows, ड्राइवर और ज़रूरी सॉफ़्टवेयर इंस्टॉल करना' },
      { en: 'Clean fans and redo thermal paste to stop overheating', hi: 'फ़ैन साफ़ करना और थर्मल पेस्ट लगाकर गर्म होना रोकना' },
      { en: "Back up and recover a customer's data safely", hi: 'ग्राहक का डेटा सुरक्षित बैकअप और रिकवर करना' },
    ],
    tools: [
      { en: 'Screwdriver kit', hi: 'स्क्रूड्राइवर किट' },
      { en: 'Multimeter', hi: 'मल्टीमीटर' },
      { en: 'Thermal paste', hi: 'थर्मल पेस्ट' },
      { en: 'Bootable USB', hi: 'बूटेबल USB' },
    ],
    traits: ['computer', 'gadgets'],
  },
  {
    slug: 'ac-service',
    name: { en: 'AC Installation & Service', hi: 'AC इंस्टॉलेशन और सर्विस' },
    short: {
      en: 'Install split and window ACs, service them, and fix cooling and leakage faults.',
      hi: 'स्प्लिट और विंडो AC लगाना, सर्विस करना और कूलिंग-लीकेज की खराबी ठीक करना।',
    },
    board: {
      en: 'AC REPAIR & SERVICE',
      hi: 'एसी रिपेयर एवं सर्विस',
      line: { hi: 'सभी कंपनी के AC की फ़िटिंग, गैस चार्जिंग व सर्विस', en: 'Fitting, gas charging and service for all AC brands' },
    },
    why: {
      en: 'Bihar summers are long and more homes and shops buy ACs every year. Every AC needs fitting once and servicing every season.',
      hi: 'बिहार की गर्मी लंबी है और हर साल ज़्यादा घर-दुकानों में AC लग रहे हैं। हर AC को एक बार फ़िटिंग और हर सीज़न सर्विस चाहिए।',
    },
    goodFor: {
      en: "You don't mind physical work and want work that comes back every season.",
      hi: 'मेहनत वाले काम से परहेज़ नहीं और ऐसा काम चाहिए जो हर सीज़न लौटकर आए।',
    },
    outcomes: [
      { en: 'Install split and window ACs, including piping and drainage', hi: 'स्प्लिट और विंडो AC लगाना, पाइपिंग और ड्रेनेज के साथ' },
      { en: 'Do a full service: filters, coils and drain line', hi: 'पूरी सर्विस करना: फ़िल्टर, कॉइल और ड्रेन लाइन' },
      { en: 'Check gas pressure and learn safe refilling', hi: 'गैस प्रेशर चेक करना और गैस भरने का सुरक्षित तरीका' },
      { en: 'Fix "not cooling", water leaks and tripping', hi: '"ठंडा नहीं कर रहा", पानी टपकना और ट्रिपिंग ठीक करना' },
      { en: 'Test capacitors, wiring and stabilisers', hi: 'कैपेसिटर, वायरिंग और स्टेबलाइज़र टेस्ट करना' },
      { en: 'Work safely with electricity and at height', hi: 'बिजली और ऊँचाई पर सुरक्षित काम करना' },
    ],
    tools: [
      { en: 'Gauge manifold', hi: 'गेज मैनिफ़ोल्ड' },
      { en: 'Vacuum pump', hi: 'वैक्यूम पंप' },
      { en: 'Clamp meter', hi: 'क्लैंप मीटर' },
      { en: 'Drill machine', hi: 'ड्रिल मशीन' },
    ],
    traits: ['electric', 'outdoor', 'people'],
  },
  {
    slug: 'solar-installation',
    name: { en: 'Solar Panel Installation', hi: 'सोलर पैनल इंस्टॉलेशन' },
    short: {
      en: 'Plan, install and maintain rooftop solar: panels, inverters and batteries.',
      hi: 'छत पर सोलर सिस्टम (पैनल, इन्वर्टर, बैटरी) प्लान करना, लगाना और मेंटेन करना।',
    },
    board: {
      en: 'SOLAR INSTALLATION WORKS',
      hi: 'सोलर इंस्टॉलेशन वर्क्स',
      line: { hi: 'घर व दुकान के लिए सोलर पैनल फ़िटिंग एवं सर्विस', en: 'Solar fitting and service for homes and shops' },
    },
    why: {
      en: 'Rooftop solar is growing fast, helped by government schemes like PM Surya Ghar, and trained installers are in short supply.',
      hi: 'PM सूर्य घर जैसी सरकारी योजनाओं से छत पर सोलर तेज़ी से बढ़ रहा है, और ट्रेंड कारीगर कम हैं।',
    },
    goodFor: {
      en: 'You like working outdoors and want to be part of clean energy.',
      hi: 'बाहर काम करना पसंद है और साफ़ ऊर्जा का हिस्सा बनना चाहते हैं।',
    },
    outcomes: [
      { en: 'Understand how panels, inverters and batteries work together', hi: 'पैनल, इन्वर्टर और बैटरी मिलकर कैसे काम करते हैं, समझना' },
      { en: 'Survey a roof for direction, shade and load', hi: 'छत का सर्वे: दिशा, छाया और कितना लोड' },
      { en: 'Fit mounting structures and lay out panels', hi: 'माउंटिंग स्ट्रक्चर लगाना और पैनल सेट करना' },
      { en: 'Do DC and AC wiring, earthing and protection', hi: 'DC-AC वायरिंग, अर्थिंग और सुरक्षा उपकरण लगाना' },
      { en: 'Test output and find faults in a running system', hi: 'आउटपुट टेस्ट करना और चलते सिस्टम में खराबी ढूँढना' },
      { en: 'Clean and maintain systems so they keep producing', hi: 'सफ़ाई और मेंटेनेंस, ताकि सिस्टम बिजली बनाता रहे' },
    ],
    tools: [
      { en: 'Multimeter', hi: 'मल्टीमीटर' },
      { en: 'MC4 crimper', hi: 'MC4 क्रिम्पर' },
      { en: 'Earth tester', hi: 'अर्थ टेस्टर' },
      { en: 'Safety harness', hi: 'सेफ़्टी हार्नेस' },
    ],
    traits: ['outdoor', 'electric'],
  },
];

export function getCourse(slug: string | undefined): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
