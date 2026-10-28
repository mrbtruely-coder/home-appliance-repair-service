import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION } from './site.js';

export function formatTitle(rawTitle, brand = SITE_NAME) {
  if (!rawTitle) return `${brand} | Same-Day Home Appliance Repair`;
  let t = rawTitle.trim();
  if (t.length <= 90) return t;
  // Truncate cleanly under 90 characters
  return t.slice(0, 87).replace(/\s+\S*$/, '') + '...';
}

export function formatDescription(rawDesc) {
  if (!rawDesc) return DEFAULT_DESCRIPTION;
  let d = rawDesc.trim();
  if (d.length > 250) {
    return d.slice(0, 247).replace(/\s+\S*$/, '') + '...';
  }
  // If slightly short, pad smoothly to match ~250 characters with call-to-action
  if (d.length < 180 && !d.includes('9515661677')) {
    d = `${d} Verified doorstep technicians arrive in 60-90 minutes with genuine spare parts and 90-day warranty across all localities. Call 9515661677 now.`;
    if (d.length > 250) {
      d = d.slice(0, 247).replace(/\s+\S*$/, '') + '...';
    }
  }
  return d;
}

export function pageMetadata({ title, description, path = '/', keywords = [] }) {
  const canonical = `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;

  let keywordsList = Array.isArray(keywords)
    ? keywords.filter(Boolean)
    : typeof keywords === 'string'
      ? keywords.split(',').map((k) => k.trim()).filter(Boolean)
      : [];

  // Extract cities, service vertical, and domain cues from path
  const segments = path.split('/').filter(Boolean).map((s) => s.replace(/-/g, ' ').toLowerCase());
  const city = segments[0] || 'hyderabad';
  const service = segments[segments.length - 1] || 'appliance repair';

  if (keywordsList.length === 0) {
    const generated = new Set();
    generated.add(`${service} ${city}`);
    generated.add(`doorstep ${service} ${city}`);
    generated.add(`home appliance repair ${city}`);
    generated.add(`best ${service} near me`);
    generated.add(`same day ${service}`);
    generated.add(`appliance service center ${city}`);
    generated.add(`emergency ${service} service`);
    generated.add(`affordable ${service} charges`);
    keywordsList = Array.from(generated);
  }

  // Ensure ALL keywords are strictly lowercase, trimmed, deduplicated, and strictly less than 10 (e.g. 7-8 max)
  keywordsList = Array.from(new Set(keywordsList.map((k) => k.toLowerCase().trim()))).slice(0, 8);

  const finalTitle = formatTitle(title);
  const finalDescription = formatDescription(description);

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: keywordsList,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      locale: 'en_IN',
    },
    twitter: { card: 'summary', title: finalTitle, description: finalDescription },
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: '+919515661677',
    areaServed: [
      { '@type': 'Place', name: 'Ameerpet Main Road, Hyderabad, Telangana, India' },
      { '@type': 'Place', name: 'Chanda Nagar, Hyderabad, Telangana, India' },
      { '@type': 'Place', name: 'Alwal, Hyderabad, Telangana, India' },
      { '@type': 'Place', name: 'Suchitra, Hyderabad, Telangana, India' },
    ],
    description: 'Home appliance repair service enquiries in selected areas of Hyderabad. Contact the business to confirm exact coverage and appointment availability.',
    priceRange: 'Contact for estimate',
  };
}

export function serviceJsonLd(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    description: service.description,
    provider: { '@type': 'HomeAndConstructionBusiness', name: SITE_NAME, url: SITE_URL, telephone: '+919515661677' },
    areaServed: ['Ameerpet Main Road, Hyderabad', 'Chanda Nagar, Hyderabad', 'Alwal, Hyderabad', 'Suchitra, Hyderabad'],
    offers: { '@type': 'Offer', price: '299', priceCurrency: 'INR', description: 'Displayed service price; confirm the included scope and any additional charges before approving work.' },
  };
}
