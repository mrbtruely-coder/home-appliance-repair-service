export const SITE_NAME = 'Doorstep Service';
export const SITE_URL = 'https://doorstepservices.example'; // Replace with your real domain before launch.
export const PHONE_DISPLAY = '9515661677';
export const SERVICE_PRICE = 299;
// Business-configurable checkout defaults. Confirm GST applicability/rate with your tax adviser before launch.
export const GST_RATE = 18;
export const PLATFORM_FEE = 10;
export const PHONE_E164 = '+919515661677';
export const WHATSAPP_URL = 'https://wa.me/919515661677';
export const CITY = 'Hyderabad';
export const DEFAULT_DESCRIPTION =
  'Request same-day doorstep home appliance repair for AC, Refrigerator, Washing Machine, Oven, Geyser, and TV in Hyderabad. A certified technician arrives in 90 minutes. Call 9515661677.';
export const AREAS = [
  {
    slug: 'ameerpet-main-road',
    name: 'Ameerpet Main Road',
    description: 'Same-day doorstep appliance repair enquiries in Ameerpet Main Road, Hyderabad.',
    landmarks: ['Ameerpet Cross Road', 'Metro Station'],
  },
  {
    slug: 'chanda-nagar',
    name: 'Chanda Nagar',
    description: 'Expert doorstep appliance repair in Chanda Nagar, Hyderabad.',
    landmarks: ['Chanda Nagar Main Road', 'BHEL Circle'],
  },
  {
    slug: 'alwal',
    name: 'Alwal',
    description: 'Fast home appliance repairs in Alwal, Hyderabad.',
    landmarks: ['Alwal Hills', 'IG Statue'],
  },
  {
    slug: 'suchitra',
    name: 'Suchitra',
    description: 'Certified appliance technician dispatch in Suchitra, Hyderabad.',
    landmarks: ['Suchitra Circle', 'Quthbullapur'],
  },
];
export const SERVICES = [
  {
    slug: 'ac-repair',
    category: 'Cooling',
    name: 'AC Service & Repair',
    short: 'Help with cooling problems, unusual noise, servicing enquiries and fault diagnosis.',
    description: 'Request AC service or repair in selected Hyderabad areas. Share the AC type, brand, model and symptoms so service availability and the next steps can be discussed.',
    icon: 'snowflake',
    concerns: ['AC not cooling as expected', 'Unusual sounds or smells', 'Water dripping from the indoor unit', 'Remote or control issues'],
    faqs: [
      { q: 'What details should I share for AC repair?', a: 'Share the AC type, brand/model, symptoms and your service area. If there is a burning smell or suspected electrical fault, switch the unit off and seek qualified assistance.' },
      { q: 'Can I get an estimate first?', a: 'Ask the team to confirm any visit or diagnosis fee and the estimate before approving repair work.' },
    ],
  },
  {
    slug: 'refrigerator-repair',
    category: 'Kitchen appliances',
    name: 'Refrigerator Repair',
    short: 'Help with cooling concerns, leakage, noise and general troubleshooting.',
    description: 'Request refrigerator repair in selected Hyderabad areas. Provide the brand, model and symptoms to help the team discuss availability and an estimate.',
    icon: 'refrigerator',
    concerns: ['Not cooling properly', 'Water leakage', 'Unusual sounds', 'Door seal or temperature concerns'],
    faqs: [
      { q: 'What should I tell you about my refrigerator?', a: 'Share the brand/model, approximate age if known, symptoms and service locality.' },
      { q: 'Should I keep using a refrigerator with an electrical smell?', a: 'No. If you notice a burning smell, sparking or another suspected electrical hazard, disconnect power only if safe and seek qualified help.' },
    ],
  },
  {
    slug: 'washing-machine-repair',
    category: 'Laundry',
    name: 'Washing Machine Repair',
    short: 'Help with drainage, spin-cycle, vibration and washing performance issues.',
    description: 'Request washing machine service or repair in selected Hyderabad areas. Include the machine type, brand, model and any displayed error code.',
    icon: 'washing-machine',
    concerns: ['Water not draining', 'Spin cycle not working', 'Excessive vibration', 'Error codes or cycle interruptions'],
    faqs: [
      { q: 'Can I share an error code?', a: 'Yes. Include the exact error code and model number in your booking message if available.' },
      { q: 'Do you handle front-load and top-load machines?', a: 'Share the machine type when booking so the team can confirm support and availability.' },
    ],
  },
  {
    slug: 'oven-microwave-repair',
    category: 'Kitchen appliances',
    name: 'Oven & Microwave Repair',
    short: 'Help with heating concerns, control faults and safe appliance diagnosis.',
    description: 'Request oven or microwave repair in selected Hyderabad areas. Share the appliance type, model and reported issue before arranging service.',
    icon: 'microwave',
    concerns: ['Not heating as expected', 'Control panel concerns', 'Turntable or door issues', 'Unusual sounds or error displays'],
    faqs: [
      { q: 'Can I use a microwave that sparks?', a: 'Stop using it until it has been inspected. Do not attempt internal repairs yourself.' },
      { q: 'What information helps with a booking?', a: 'Share the appliance type, brand/model, symptoms and your area.' },
    ],
  },
  {
    slug: 'geyser-repair',
    category: 'Water heating',
    name: 'Geyser Repair',
    short: 'Help with water-heating issues, leaks and thermostat or element concerns.',
    description: 'Request geyser service in selected Hyderabad areas. Because water heaters combine water and electricity, suspected faults should be handled by a qualified technician.',
    icon: 'geyser',
    concerns: ['Water not heating', 'Water leakage', 'Unexpected shutdowns', 'Temperature-control concerns'],
    faqs: [
      { q: 'What if my geyser is leaking?', a: 'Turn it off and isolate water/electricity only if you can do so safely, then contact a qualified professional.' },
      { q: 'Can you quote before the visit?', a: 'Ask about any visit or diagnosis fee and request an estimate before approving work.' },
    ],
  },
  {
    slug: 'tv-repair',
    category: 'Entertainment',
    name: 'TV Repair',
    short: 'Help with display, sound, power and connectivity troubleshooting.',
    description: 'Request TV repair in selected Hyderabad areas. Share the TV type, brand, model and symptoms so availability can be confirmed.',
    icon: 'tv',
    concerns: ['TV not powering on', 'Picture or display problems', 'Sound issues', 'Connectivity or input problems'],
    faqs: [
      { q: 'What TV details should I provide?', a: 'Share the brand/model, screen type if known, symptoms and whether any indicator light appears.' },
      { q: 'Do you offer a fixed price for every repair?', a: 'Repair costs depend on diagnosis and parts. Confirm the estimate before approving work.' },
    ],
  },
];
export const FAQS = [
  { q: 'How do I book a home appliance repair?', a: 'Choose the appliance, describe the issue, add your contact details and locality, then continue to WhatsApp to send the request.' },
  { q: 'Which areas do you serve?', a: 'The website lists Ameerpet Main Road, Chanda Nagar, Alwal and Suchitra in Hyderabad. Please confirm availability for your exact address before booking.' },
  { q: 'Do you repair every brand?', a: 'Brand, model and fault support can vary. Share the appliance details so the team can confirm whether assistance is available.' },
  { q: 'How much will the repair cost?', a: 'Costs depend on the fault, diagnosis and parts required. Ask about any visit fee and request an estimate before approving work.' },
  { q: 'Does the booking form confirm an appointment?', a: 'No. The form opens WhatsApp with your request details. Your appointment is not confirmed until the business confirms it directly.' },
  { q: 'Can I contact you by phone?', a: 'Yes. Call 9515661677 or use the WhatsApp link on the website.' },
];
