import { SITE_NAME, SITE_URL } from './site';

export function pageMetadata({ title, description, path = '/', keywords = [] }) {
  const canonical = `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;
  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: 'en_IN',
    },
    twitter: { card: 'summary', title, description },
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
