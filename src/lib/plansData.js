// Centralized Configurable Data for Offers & Membership Plans
export const MEMBERSHIP_PLANS = [
  {
    slug: 'basic-care',
    name: 'Doorstep Basic Care',
    badge: 'Starter',
    tagline: 'Affordable protection & recurring member discounts',
    price: 199,
    originalPrice: 499,
    duration: '6 months',
    savingsEstimate: 'Up to ₹2,500/yr',
    discountPercent: 10,
    featured: false,
    shortDesc: 'Ideal for small apartments and single appliance households looking for affordable routine care.',
    fullDesc:
      'Doorstep Basic Care gives you guaranteed discounts on inspection and repair services across all major home appliances with verified technicians in Hyderabad.',
    includedBenefits: [
      {
        title: 'Flat 10% Off on All Services',
        desc: 'Save 10% on every appliance repair and diagnosis booking.',
        icon: 'percent',
      },
      {
        title: 'Priority Service Support',
        desc: 'Dedicated customer coordinator for fast technician scheduling.',
        icon: 'phone-call',
      },
      {
        title: 'Zero Convenience Fee',
        desc: 'No platform booking fee charged on eligible bookings.',
        icon: 'shield-check',
      },
      {
        title: '30-Day Service Warranty',
        desc: 'Complimentary revisit guarantee on diagnosed issues.',
        icon: 'badge-check',
      },
    ],
    terms: [
      'Valid for 6 months from the date of activation.',
      'Discount applies to inspection and standard labor charges only; spare parts quoted at competitive rates.',
      'Valid across covered Hyderabad localities: Ameerpet, Chanda Nagar, Alwal, Suchitra and surrounding neighbourhoods.',
      'Non-refundable once any service booking has been confirmed under this plan.',
    ],
    faqs: [
      {
        q: 'Which appliances are covered under Basic Care?',
        a: 'Basic Care covers AC, Refrigerators, Washing Machines, Microwaves, Geysers, and TVs.',
      },
      {
        q: 'Can I use the 10% discount multiple times?',
        a: 'Yes, the discount is unlimited during your active 6-month validity period.',
      },
      {
        q: 'Do I get priority booking?',
        a: 'Yes, your booking enquiries receive expedited review by our dispatch desk.',
      },
    ],
  },
  {
    slug: 'plus-care',
    name: 'Doorstep VIP Plus',
    badge: 'Most Popular',
    tagline: 'Higher discounts, zero platform fee & fast technician dispatch',
    price: 399,
    originalPrice: 999,
    duration: '12 months',
    savingsEstimate: 'Up to ₹6,500/yr',
    discountPercent: 15,
    featured: true,
    shortDesc: 'Our most popular plan for families with 3+ appliances looking for maximum peace of mind.',
    fullDesc:
      'Doorstep VIP Plus delivers 15% flat savings across all appliance categories, zero service fees, and express 90-minute slot availability.',
    includedBenefits: [
      {
        title: 'Flat 15% Off on All Repairs',
        desc: 'Enjoy 15% discount on AC, Fridge, Washer, Microwave, Geyser & TV services.',
        icon: 'percent',
      },
      {
        title: '2 Free Annual Health Checkups',
        desc: 'Complimentary general appliance health inspection visits.',
        icon: 'sparkles',
      },
      {
        title: 'Express 90-Minute Dispatch',
        desc: 'Immediate technician assignment for urgent breakdowns.',
        icon: 'zap',
      },
      {
        title: '10% Off on Genuine Spare Parts',
        desc: 'Exclusive savings on replacement compressors, motors, thermostats, and sensors.',
        icon: 'wrench',
      },
      {
        title: '60-Day Revisit Warranty',
        desc: 'Extended service peace-of-mind guarantee with free revisits.',
        icon: 'shield-check',
      },
    ],
    terms: [
      'Valid for 12 months from activation across all listed Hyderabad service areas.',
      '15% discount is automatically applied to service invoices.',
      'Free health checkup visits require prior appointment booking via web or call.',
      'Plan benefits are transferable to any property address within covered Hyderabad zones.',
    ],
    faqs: [
      {
        q: 'What is included in the 2 Free Health Checkups?',
        a: 'A certified engineer checks cooling efficiency, electrical safety, drainage, filters, and overall machine condition without charging any inspection fee.',
      },
      {
        q: 'How does the 10% spare parts discount work?',
        a: 'If your appliance requires replacement components (e.g. thermostat, capacitor, PCB), the 10% discount is deducted from the retail part invoice.',
      },
      {
        q: 'Can I upgrade from Basic Care to VIP Plus?',
        a: 'Yes, you can upgrade anytime and the remaining value will be adjusted.',
      },
    ],
  },
  {
    slug: 'premium-care',
    name: 'Doorstep Elite AMC',
    badge: 'Best Value',
    tagline: 'All-inclusive appliance protection & seasonal maintenance',
    price: 799,
    originalPrice: 1999,
    duration: '12 months',
    savingsEstimate: 'Up to ₹12,000/yr',
    discountPercent: 20,
    featured: false,
    shortDesc: 'Complete residential care with free service visits, gas top-up discounts, and dedicated VIP manager.',
    fullDesc:
      'Doorstep Elite AMC is our premium all-in-one protection plan. Experience total home comfort with free breakdown visits, heavy discounts on spares, and AC deep cleaning.',
    includedBenefits: [
      {
        title: 'Flat 20% Off All Services',
        desc: 'Top-tier discount on all home appliance repairs and servicing.',
        icon: 'percent',
      },
      {
        title: 'Unlimited Free Diagnostic Visits',
        desc: 'Zero call-out fees for any technician inspection throughout the year.',
        icon: 'badge-check',
      },
      {
        title: 'Free AC Deep Cleaning (1 Unit)',
        desc: 'Complete jet pump water servicing and filter sanitization included.',
        icon: 'sparkles',
      },
      {
        title: '15% Off on Spare Parts & Gas',
        desc: 'Significant savings on compressor gas refilling and original components.',
        icon: 'wrench',
      },
      {
        title: 'Dedicated VIP Support Lead',
        desc: 'Direct WhatsApp and phone line to our senior technical supervisor.',
        icon: 'crown',
      },
      {
        title: '90-Day Comprehensive Warranty',
        desc: 'Industry-best 3-month revisit warranty on serviced components.',
        icon: 'shield-check',
      },
    ],
    terms: [
      'Valid for 1 full year covering all appliances in a single household.',
      'Unlimited free diagnostic visits are valid for breakdown investigations.',
      'AC jet service valid for one split or window unit per active membership year.',
      'Membership renewals receive an additional loyalty renewal discount.',
    ],
    faqs: [
      {
        q: 'Are all appliances in my home covered?',
        a: 'Yes! AC, Refrigerator, Washing Machine, Microwave, Geyser, and Television in your home are all covered under one single Elite AMC subscription.',
      },
      {
        q: 'How do I redeem the free AC deep cleaning?',
        a: 'Simply click "Book" on AC Service and your Elite AMC status will automatically make the service fee ₹0 at checkout.',
      },
      {
        q: 'What is the refund policy?',
        a: 'A 100% money-back guarantee is offered within 7 days if no free diagnostic visit or service claim has been used.',
      },
    ],
  },
];

export const CATEGORY_OFFERS = [
  {
    id: 'ac-season-deal',
    serviceSlug: 'ac-repair',
    serviceCategory: 'AC Service & Repair',
    title: 'AC Summer Shield Offer',
    discount: 'Flat ₹100 Off',
    desc: 'Deep jet pump cleaning & cooling inspection for split/window units.',
    condition: 'Valid on first AC service booking',
    expiry: 'Limited Time Deal',
    bgTheme: 'cooling',
    tag: 'Trending',
  },
  {
    id: 'fridge-cooling-pack',
    serviceSlug: 'refrigerator-repair',
    serviceCategory: 'Refrigerator Repair',
    title: 'Double Door Refrigerator Tuneup',
    discount: '15% Discount',
    desc: 'Thermostat test, coil cleaning, gas pressure inspection and seal fix.',
    condition: 'Applicable in Ameerpet & Chanda Nagar',
    expiry: 'Expires in 3 days',
    bgTheme: 'fridge',
    tag: 'Seasonal',
  },
  {
    id: 'washer-drum-care',
    serviceSlug: 'washing-machine-repair',
    serviceCategory: 'Washing Machine Repair',
    title: 'Washing Machine Diagnostic Special',
    discount: 'Flat ₹50 Off',
    desc: 'Motor check, spin noise diagnosis, water inlet & drainage overhaul.',
    condition: 'Valid on Front & Top load washers',
    expiry: 'Active Today',
    bgTheme: 'washer',
    tag: 'Popular',
  },
  {
    id: 'microwave-safety-check',
    serviceSlug: 'oven-microwave-repair',
    serviceCategory: 'Microwave & Oven Repair',
    title: 'Microwave Heating Diagnosis',
    discount: 'Free Cavity Inspection',
    desc: 'Magnetron safety analysis, high-voltage testing & sensor inspection.',
    condition: 'With any repair approval',
    expiry: 'Valid this week',
    bgTheme: 'oven',
    tag: 'Essential',
  },
  {
    id: 'geyser-winter-prep',
    serviceSlug: 'geyser-repair',
    serviceCategory: 'Geyser & Water Heater',
    title: 'Geyser Element Descaling',
    discount: 'Flat ₹80 Off',
    desc: 'Thermostat check, heating coil descaling & electrical safety audit.',
    condition: 'Instant doorstep visit in Suchitra & Alwal',
    expiry: 'Active Offer',
    bgTheme: 'geyser',
    tag: 'Hot Deal',
  },
  {
    id: 'tv-display-care',
    serviceSlug: 'tv-repair',
    serviceCategory: 'LED / Smart TV Repair',
    title: 'Smart TV Display & Audio Fix',
    discount: '₹120 Off Labor',
    desc: 'Backlight LED strip diagnosis, power board & HDMI connectivity repair.',
    condition: 'Screen panel & motherboard checks',
    expiry: 'Limited Slots',
    bgTheme: 'tv',
    tag: 'Smart Fix',
  },
];

export const MEMBERSHIP_PERKS = [
  {
    title: 'Exclusive Member Pricing',
    desc: 'Up to 20% flat discount on repair labor and diagnostic fees.',
    icon: 'tag',
  },
  {
    title: 'Priority Technician Dispatch',
    desc: 'Skip queue times with expedited 90-minute scheduling.',
    icon: 'zap',
  },
  {
    title: 'Zero Convenience Fees',
    desc: 'No platform booking charges or booking deposit requirements.',
    icon: 'shield-check',
  },
  {
    title: 'Spares & Gas Discounts',
    desc: 'Up to 15% genuine part price reduction from certified distributors.',
    icon: 'wrench',
  },
  {
    title: 'Revisit Warranty Guard',
    desc: 'Extended 30 to 90 days complimentary revisit warranty.',
    icon: 'badge-check',
  },
  {
    title: 'Dedicated Support Desk',
    desc: 'Direct line to senior service coordinators via WhatsApp & phone.',
    icon: 'phone-call',
  },
];
