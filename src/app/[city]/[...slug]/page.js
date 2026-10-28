import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { AREAS, SERVICES, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL, SERVICE_PRICE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import ServiceCenterDetailView from '@/components/ServiceCenterDetailView';
import TwoStepBookingFlow from '@/components/TwoStepBookingFlow';
import ClientBookingWrapper from '@/components/ClientBookingWrapper';
import { notFound } from 'next/navigation';

export function slugify(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CATEGORY_MAP = {
  'ac': 'ac-repair',
  'ac-repair': 'ac-repair',
  'ac-service': 'ac-repair',
  'refrigerator': 'refrigerator-repair',
  'refrigerator-repair': 'refrigerator-repair',
  'fridge': 'refrigerator-repair',
  'washing-machine': 'washing-machine-repair',
  'washing-machine-repair': 'washing-machine-repair',
  'washer': 'washing-machine-repair',
  'oven': 'oven-microwave-repair',
  'oven-microwave-repair': 'oven-microwave-repair',
  'microwave': 'oven-microwave-repair',
  'geyser': 'geyser-repair',
  'geyser-repair': 'geyser-repair',
  'water-heater': 'geyser-repair',
  'tv': 'tv-repair',
  'tv-repair': 'tv-repair',
};

const APPLIANCE_ID_MAP = {
  'ac-repair': 'ac',
  'refrigerator-repair': 'refrigerator',
  'washing-machine-repair': 'washing-machine',
  'oven-microwave-repair': 'oven',
  'geyser-repair': 'geyser',
  'tv-repair': 'tv',
};

export function generateStaticParams() {
  const params = [];
  const added = new Set();

  function addParam(citySlug, slugArray) {
    const key = `${citySlug}/${slugArray.join('/')}`;
    if (!added.has(key)) {
      added.add(key);
      params.push({ city: citySlug, slug: slugArray });
    }
  }

  // Multi-segment combinations for Hyderabad and Secunderabad
  const hubCities = AREAS.filter((a) => a.slug === 'hyderabad' || a.slug === 'secunderabad');

  hubCities.forEach((city) => {
    const colonies = city.colonies || city.landmarks || [];
    colonies.forEach((col) => {
      const subSlug = slugify(col);
      if (!subSlug) return;

      // Level 2: [city, subArea] -> /[city]/[subArea]/
      addParam(city.slug, [subSlug]);

      SERVICES.forEach((cat) => {
        // Level 3: [city, subArea, category] -> /[city]/[subArea]/[category]/
        addParam(city.slug, [subSlug, cat.slug]);

        const subcats = cat.subcategories || [];
        subcats.forEach((sub) => {
          const fullSubSlug = slugify(sub.slug || sub.name || sub.id);
          if (!fullSubSlug) return;

          // Level 4: [city, subArea, category, subcategory] -> /[city]/[subArea]/[category]/[subCategory]/
          addParam(city.slug, [subSlug, cat.slug, fullSubSlug]);

          // Level 5: [city, subArea, category, subcategory, 'book']
          addParam(city.slug, [subSlug, cat.slug, fullSubSlug, 'book']);
        });
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }) {
  const { city: citySlug, slug } = await params;
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const city = AREAS.find((a) => a.slug === citySlug) || AREAS[0];

  const subSlug = slugArray[0];
  const colonies = city.colonies || city.landmarks || [];
  const subAreaName = colonies.find((c) => slugify(c) === subSlug) || subSlug.replace(/-/g, ' ');

  if (slugArray.length === 1) {
    return pageMetadata({
      title: `Doorstep Home Appliance Repair in ${subAreaName}, ${city.name} | 60-90 Min Dispatch`,
      description: `Same-day doorstep appliance service in ${subAreaName}, ${city.name}. AC, Refrigerator, Washing Machine, Microwave, Geyser & TV repairs. Call ${PHONE_DISPLAY}.`,
      path: `/${city.slug}/${subSlug}/`,
      keywords: [
        `appliance repair in ${subAreaName}`,
        `home appliance service ${subAreaName}`,
        `doorstep technician in ${subAreaName}`,
        `AC repair ${subAreaName}`,
        `refrigerator service ${subAreaName}`,
        `washing machine repair ${subAreaName}`,
        `microwave repair in ${subAreaName}`,
        `geyser repair ${subAreaName}`,
        `TV repair in ${subAreaName}`,
        `same day repair ${subAreaName} ${city.name}`,
      ],
    });
  }

  const rawCat = slugArray[1];
  const canonicalCatSlug = CATEGORY_MAP[rawCat] || rawCat;
  const category = SERVICES.find((s) => s.slug === canonicalCatSlug) || SERVICES[0];

  if (slugArray.length === 2) {
    return pageMetadata({
      title: `${category.name} in ${subAreaName}, ${city.name} | Doorstep Repair`,
      description: `Fast ${category.name} in ${subAreaName}, ${city.name}. Multi-brand expert technicians with genuine parts and 90-day warranty. Call ${PHONE_DISPLAY}.`,
      path: `/${city.slug}/${subSlug}/${rawCat}/`,
      keywords: [
        `${category.name} in ${subAreaName}`,
        `${category.name.toLowerCase()} service ${subAreaName}`,
        `doorstep ${category.name.toLowerCase()} ${subAreaName}`,
        `best ${category.name.toLowerCase()} technician ${subAreaName}`,
        `${category.name.toLowerCase()} repair near me ${subAreaName}`,
        `emergency ${category.name.toLowerCase()} ${city.name}`,
        `same day ${category.name.toLowerCase()} ${subAreaName}`,
        `certified ${category.name.toLowerCase()} technician`,
        `${category.name.toLowerCase()} service center ${subAreaName}`,
        `affordable ${category.name.toLowerCase()} in ${city.name}`,
      ],
    });
  }

  const rawSub = slugArray[2];
  const subcats = category.subcategories || [];
  const subcategory = subcats.find((s) => slugify(s.slug || s.name || s.id).includes(slugify(rawSub))) || subcats[0];

  if (slugArray.length === 3) {
    return pageMetadata({
      title: `${subcategory.name} in ${subAreaName}, ${city.name} | Certified Technician`,
      description: `Expert ${subcategory.name} in ${subAreaName}, ${city.name}. Genuine replacement parts, transparent diagnostics, and 90-day warranty. Call ${PHONE_DISPLAY}.`,
      path: `/${city.slug}/${subSlug}/${rawCat}/${rawSub}/`,
      keywords: [
        `${subcategory.name} in ${subAreaName}`,
        `${subcategory.name.toLowerCase()} ${city.name}`,
        `doorstep ${subcategory.name.toLowerCase()} ${subAreaName}`,
        `${subcategory.name.toLowerCase()} repair service`,
        `${subcategory.name.toLowerCase()} specialist near me`,
        `fast ${subcategory.name.toLowerCase()} in ${subAreaName}`,
        `reliable ${subcategory.name.toLowerCase()} technician`,
        `${subcategory.name.toLowerCase()} cost in ${city.name}`,
        `emergency ${subcategory.name.toLowerCase()} repair`,
        `same day ${subcategory.name.toLowerCase()} ${subAreaName}`,
      ],
    });
  }

  return pageMetadata({
    title: `Book ${subcategory.name} in ${subAreaName}, ${city.name} | Fast Dispatch`,
    description: `Book same-day ${subcategory.name} in ${subAreaName}, ${city.name}. Certified technician arrives in 90 minutes. Call ${PHONE_DISPLAY}.`,
    path: `/${city.slug}/${subSlug}/${rawCat}/${rawSub}/book/`,
    keywords: [
      `book ${subcategory.name.toLowerCase()} in ${subAreaName}`,
      `schedule ${subcategory.name.toLowerCase()} ${city.name}`,
      `order ${subcategory.name.toLowerCase()} repair`,
      `online booking ${subcategory.name.toLowerCase()}`,
      `doorstep ${subcategory.name.toLowerCase()} booking`,
      `${subcategory.name.toLowerCase()} appointment ${subAreaName}`,
      `fast technician dispatch ${subAreaName}`,
      `instant booking ${subcategory.name.toLowerCase()}`,
      `same day ${subcategory.name.toLowerCase()} booking`,
      `verified technician ${subAreaName} ${city.name}`,
    ],
  });
}

function resolveInfo(citySlug, slugArray) {
  const city = AREAS.find((a) => a.slug === citySlug) || AREAS[0];

  const subSlug = slugArray[0];
  const colonies = city.colonies || city.landmarks || [];
  let subAreaName = colonies.find((c) => slugify(c) === subSlug);
  if (!subAreaName) {
    subAreaName = decodeURIComponent(subSlug).replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  if (slugArray.length === 1) {
    return { level: 2, city, subSlug, subAreaName };
  }

  const rawCat = slugArray[1];
  const canonicalCatSlug = CATEGORY_MAP[rawCat] || rawCat;
  const category = SERVICES.find((s) => s.slug === canonicalCatSlug) || SERVICES[0];

  if (slugArray.length === 2) {
    if (rawCat === 'book') {
      return { level: 5, city, subSlug, subAreaName, category: SERVICES[0] };
    }
    return { level: 3, city, subSlug, subAreaName, category, rawCat };
  }

  const rawSub = slugArray[2];
  if (rawSub === 'book') {
    return { level: 5, city, subSlug, subAreaName, category };
  }

  const subcategories = category.subcategories || [];
  let subcategory = subcategories.find((s) => {
    const sSlug = slugify(s.slug || s.name || s.id);
    const cleanRaw = slugify(rawSub);
    return sSlug === cleanRaw || sSlug.includes(cleanRaw) || cleanRaw.includes(sSlug);
  }) || subcategories[0];

  if (slugArray.length === 3) {
    return { level: 4, city, subSlug, subAreaName, category, subcategory, rawSub, rawCat };
  }

  return { level: 5, city, subSlug, subAreaName, category, subcategory, rawSub, rawCat };
}

export default async function SubAreaCatchAllPage({ params }) {
  try {
    const { city: citySlug, slug } = await params;
    const validCity = AREAS.some((a) => a.slug === citySlug);
    if (!validCity) {
      notFound();
    }

    const slugArray = Array.isArray(slug) ? slug : [slug];
    const info = resolveInfo(citySlug, slugArray);

  // LEVEL 5: Dedicated Booking Page (e.g. /secunderabad/alwal/oven/convectional-oven/book)
  if (info.level === 5) {
    const applianceId = info.category ? APPLIANCE_ID_MAP[info.category.slug] || 'ac' : 'ac';
    const subcatId = info.subcategory ? (info.subcategory.id || slugify(info.subcategory.name)) : '';

    return (
      <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '36px 0 60px' }}>
        <div className="container">
          <div style={{ marginBottom: '20px', fontSize: '13px', color: '#64748B' }}>
            <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <Link href={`/${info.city.slug}/`} style={{ color: '#64748B', textDecoration: 'none' }}>{info.city.name}</Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <Link href={`/${info.city.slug}/${info.subSlug}/`} style={{ color: '#64748B', textDecoration: 'none' }}>{info.subAreaName}</Link>
            {info.category && (
              <>
                <span style={{ margin: '0 8px' }}>&gt;</span>
                <Link href={`/${info.city.slug}/${info.subSlug}/${info.rawCat || info.category.slug}/`} style={{ color: '#64748B', textDecoration: 'none' }}>{info.category.name}</Link>
              </>
            )}
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <span style={{ color: '#0A2558', fontWeight: 700 }}>Booking</span>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #0A2558 0%, #06183B 100%)',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px 32px',
            marginBottom: '32px',
            boxShadow: '0 12px 36px rgba(10, 37, 88, 0.16)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 90, 0, 0.18)',
              border: '1px solid #FF5A00',
              color: '#FF5A00',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              <Sparkles size={13} />
              <span>Doorstep Booking • {info.subAreaName}, {info.city.name}</span>
            </div>
            <h1 style={{ fontSize: '30px', fontWeight: 800, margin: '0 0 8px' }}>
              Book {info.subcategory ? info.subcategory.name : (info.category ? info.category.name : 'Appliance Repair')}
            </h1>
            <p style={{ margin: 0, color: '#CBD5E1', fontSize: '15px' }}>
              Technicians stationed across {info.subAreaName} arrive within 60–90 minutes with 90-day warranty and genuine parts.
            </p>
          </div>

          <ClientBookingWrapper
            initialAppliance={applianceId}
            initialSubcategory={subcatId}
            initialArea={info.subAreaName}
            initialCity={info.city.name}
          />
        </div>
      </div>
    );
  }

  // LEVEL 4: Sub-Category Detail View (e.g. /secunderabad/alwal/oven/convectional-oven)
  if (info.level === 4) {
    const bookUrl = `/${info.city.slug}/${info.subSlug}/${info.rawCat}/${info.rawSub}/book/`;

    return (
      <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '36px 0 60px' }}>
        <div className="container">
          <div style={{ marginBottom: '24px', fontSize: '13px', color: '#64748B' }}>
            <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <Link href={`/${info.city.slug}/`} style={{ color: '#64748B', textDecoration: 'none' }}>{info.city.name}</Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <Link href={`/${info.city.slug}/${info.subSlug}/`} style={{ color: '#64748B', textDecoration: 'none' }}>{info.subAreaName}</Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <Link href={`/${info.city.slug}/${info.subSlug}/${info.rawCat}/`} style={{ color: '#64748B', textDecoration: 'none' }}>{info.category.name}</Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <span style={{ color: '#0A2558', fontWeight: 700 }}>{info.subcategory.name}</span>
          </div>

          {/* Hero Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #0A2558 0%, #06183B 100%)',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '36px 40px',
            marginBottom: '36px',
            boxShadow: '0 16px 40px rgba(10, 37, 88, 0.18)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 90, 0, 0.18)',
              border: '1px solid #FF5A00',
              color: '#FF5A00',
              padding: '5px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              <ShieldCheck size={14} />
              <span>Certified Service • {info.subAreaName}, {info.city.name}</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 12px' }}>
              {info.subcategory.name} in {info.subAreaName}
            </h1>
            <p style={{ margin: '0 0 24px', color: '#E2E8F0', fontSize: '16px', maxWidth: '780px', lineHeight: 1.6 }}>
              {info.subcategory.shortDesc || `Fast, reliable doorstep repair for ${info.subcategory.name} in ${info.subAreaName}, ${info.city.name}. Multi-brand verified technicians arrive in 60–90 minutes with 100% genuine spare parts.`}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href={bookUrl}
                style={{
                  background: '#FF5A00',
                  color: '#FFFFFF',
                  padding: '13px 32px',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '16px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 24px rgba(255, 90, 0, 0.35)'
                }}
              >
                <span>Book Service in {info.subAreaName}</span>
                <ArrowRight size={18} />
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '13px 26px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Phone size={16} />
                <span>Call Dispatch: {PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Diagnostic Features Card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '32px',
            marginBottom: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0A2558', marginTop: 0, marginBottom: '20px' }}>
              What&apos;s Included in {info.subcategory.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="#FF5A00" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: '#0A2558', fontSize: '15px' }}>Upfront Diagnostic Check</strong>
                  <span style={{ fontSize: '13.5px', color: '#64748B' }}>Fixed nominal inspection fee with transparent quote before repair</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="#FF5A00" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: '#0A2558', fontSize: '15px' }}>90-Day Digital Warranty</strong>
                  <span style={{ fontSize: '13.5px', color: '#64748B' }}>Guaranteed protection on genuine replacement spares & labor</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="#FF5A00" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: '#0A2558', fontSize: '15px' }}>60–90 Min Arrival</strong>
                  <span style={{ fontSize: '13.5px', color: '#64748B' }}>Locally stationed technician dispatched to {info.subAreaName}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '13px', color: '#64748B', display: 'block' }}>Diagnostic Fee in {info.subAreaName}:</span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#FF5A00' }}>₹{SERVICE_PRICE}</span>
                <span style={{ fontSize: '12px', color: '#94A3B8', marginLeft: '8px', textDecoration: 'line-through' }}>₹399</span>
              </div>
              <Link
                href={bookUrl}
                style={{
                  background: '#0A2558',
                  color: '#FFFFFF',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>Book This Service</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LEVEL 3: Service Category Page (e.g. /secunderabad/alwal/oven)
  if (info.level === 3) {
    const subcats = info.category.subcategories || [];

    return (
      <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '36px 0 60px' }}>
        <div className="container">
          <div style={{ marginBottom: '24px', fontSize: '13px', color: '#64748B' }}>
            <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <Link href={`/${info.city.slug}/`} style={{ color: '#64748B', textDecoration: 'none' }}>{info.city.name}</Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <Link href={`/${info.city.slug}/${info.subSlug}/`} style={{ color: '#64748B', textDecoration: 'none' }}>{info.subAreaName}</Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <span style={{ color: '#0A2558', fontWeight: 700 }}>{info.category.name}</span>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #0A2558 0%, #06183B 100%)',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '36px 40px',
            marginBottom: '36px',
            boxShadow: '0 16px 40px rgba(10, 37, 88, 0.18)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 90, 0, 0.18)',
              border: '1px solid #FF5A00',
              color: '#FF5A00',
              padding: '5px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              <Wrench size={14} />
              <span>{info.category.name} • {info.subAreaName}, {info.city.name}</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 12px' }}>
              {info.category.name} in {info.subAreaName}
            </h1>
            <p style={{ margin: 0, color: '#E2E8F0', fontSize: '16px', maxWidth: '780px', lineHeight: 1.6 }}>
              Select your required {info.category.name} sub-category service below to view pricing, common issues fixed, and book online:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {subcats.map((sub) => {
              const subSlug = slugify(sub.slug || sub.name || sub.id);
              const subDetailUrl = `/${info.city.slug}/${info.subSlug}/${info.rawCat}/${subSlug}/`;
              const subBookUrl = `/${info.city.slug}/${info.subSlug}/${info.rawCat}/${subSlug}/book/`;

              return (
                <div
                  key={sub.id || sub.name}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid #E2E8F0',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0A2558', marginTop: 0, marginBottom: '8px' }}>
                      {sub.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
                      {sub.shortDesc || `Doorstep multi-brand service for ${sub.name} across ${info.subAreaName}.`}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '13px', color: '#64748B' }}>Diagnostic Fee:</span>
                      <strong style={{ fontSize: '20px', color: '#FF5A00', fontWeight: 800 }}>₹{SERVICE_PRICE}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                      href={subDetailUrl}
                      style={{
                        flex: 1,
                        background: '#EEF2F9',
                        color: '#0A2558',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        textAlign: 'center',
                        textDecoration: 'none',
                        border: '1px solid #D4E0F4'
                      }}
                    >
                      View Details
                    </Link>
                    <Link
                      href={subBookUrl}
                      style={{
                        flex: 1,
                        background: '#FF5A00',
                        color: '#FFFFFF',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        fontWeight: 800,
                        textAlign: 'center',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(255, 90, 0, 0.25)'
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // LEVEL 2: Sub-Area Page (e.g. /secunderabad/prakash-nagar-metro)
  const otherColonies = (info.city.colonies || info.city.landmarks || []).filter(
    (c) => slugify(c) !== info.subSlug && c !== 'Other Location' && c !== 'other-location'
  );

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '36px 0 60px' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '24px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <Link href={`/${info.city.slug}/`} style={{ color: '#64748B', textDecoration: 'none' }}>{info.city.name}</Link>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#0A2558', fontWeight: 700 }}>{info.subAreaName}</span>
        </div>

        {/* Hero Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0A2558 0%, #06183B 100%)',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '36px 40px',
          marginBottom: '36px',
          boxShadow: '0 16px 40px rgba(10, 37, 88, 0.18)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 90, 0, 0.18)',
            border: '1px solid #FF5A00',
            color: '#FF5A00',
            padding: '5px 14px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}>
            <MapPin size={14} />
            <span>{info.subAreaName}, {info.city.name} Dispatch Hub • 60–90 Min Arrival</span>
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 12px' }}>
            Doorstep Appliance Repair Services in <span style={{ color: '#FF5A00' }}>{info.subAreaName}</span>
          </h1>

          <p style={{ margin: '0 0 24px 0', color: '#E2E8F0', fontSize: '16px', maxWidth: '820px', lineHeight: 1.6 }}>
            Select your appliance category below to view specific repairs, transparent diagnostic pricing, and instant doorstep technician dispatch across {info.subAreaName}:
          </p>

          {/* Guarantee Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px' }}>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '8px', color: '#FFFFFF', fontWeight: 600 }}>
              ✓ ₹0 Booking Fee
            </span>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '8px', color: '#FFFFFF', fontWeight: 600 }}>
              ✓ 60–90 Min Doorstep Arrival
            </span>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '8px', color: '#FFFFFF', fontWeight: 600 }}>
              ✓ 90-Day Digital Warranty
            </span>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '8px', color: '#FFFFFF', fontWeight: 600 }}>
              ✓ Pay Only After Service
            </span>
          </div>
        </div>

        {/* Section Title */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0A2558', margin: '0 0 6px 0' }}>
            Select Appliance Category
          </h2>
          <p style={{ margin: 0, color: '#64748B', fontSize: '14.5px' }}>
            Click on any appliance below to choose your specific problem or repair service in {info.subAreaName}:
          </p>
        </div>

        {/* 6 Category Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {SERVICES.map((cat) => {
            const catShort = APPLIANCE_ID_MAP[cat.slug] || cat.slug;
            const catUrl = `/${info.city.slug}/${info.subSlug}/${catShort}/`;

            return (
              <Link
                key={cat.slug}
                href={catUrl}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
              >
                {/* Photo with Badges */}
                <div style={{ position: 'relative', width: '100%', height: '190px', background: '#E2E8F0', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={`${cat.name} in ${info.subAreaName}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(10, 37, 88, 0.88)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    letterSpacing: '0.5px'
                  }}>
                    TECH DISPATCH
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#FF5A00',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {cat.subcategories?.length || 3} Sub-Services
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0A2558', margin: '0 0 8px 0' }}>
                      {cat.name}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                      {cat.short}
                    </p>

                    {/* Subcategories preview pills */}
                    {cat.subcategories && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                        {cat.subcategories.slice(0, 3).map((sub) => (
                          <span
                            key={sub.id || sub.name}
                            style={{
                              background: '#F1F5F9',
                              color: '#334155',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              padding: '3px 9px',
                              borderRadius: '6px'
                            }}
                          >
                            {sub.name}
                          </span>
                        ))}
                        {cat.subcategories.length > 3 && (
                          <span style={{ fontSize: '11.5px', color: '#94A3B8', padding: '3px 4px' }}>
                            +{cat.subcategories.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #F1F5F9',
                      paddingTop: '14px',
                      marginBottom: '16px'
                    }}>
                      <span style={{ fontSize: '13px', color: '#64748B' }}>Diagnostic Fee:</span>
                      <div>
                        <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '12px', marginRight: '6px' }}>
                          ₹399
                        </span>
                        <strong style={{ fontSize: '18px', color: '#059669', fontWeight: 800 }}>
                          ₹{SERVICE_PRICE}
                        </strong>
                      </div>
                    </div>

                    <div style={{
                      background: '#FF5A00',
                      color: '#FFFFFF',
                      padding: '12px 18px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 800,
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(255, 90, 0, 0.28)'
                    }}>
                      <span>Select {cat.name}</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Immediate Call / Assistance Strip */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '24px 28px',
          marginBottom: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
        }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 800, color: '#0A2558' }}>
              Need Urgent Repair Assistance in {info.subAreaName}?
            </h4>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#64748B' }}>
              Our local coordinator can dispatch the nearest technician van directly to your home.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href={`tel:${PHONE_E164}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#0A2558',
                color: '#FFFFFF',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Phone size={15} />
              <span>Call {PHONE_DISPLAY}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#FFFFFF',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Switch Sub-Area in City */}
        {otherColonies.length > 0 && (
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px 28px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px' }}>
              OTHER AREAS IN {info.city.name.toUpperCase()}
            </div>
            <h4 style={{ margin: '0 0 14px 0', fontSize: '15px', fontWeight: 700, color: '#0A2558' }}>
              Looking for service in another {info.city.name} neighbourhood?
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {otherColonies.slice(0, 18).map((colony) => {
                const cSlug = slugify(colony);
                return (
                  <Link
                    key={colony}
                    href={`/${info.city.slug}/${cSlug}/`}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      color: '#334155',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    {colony}
                  </Link>
                );
              })}
              <Link
                href={`/${info.city.slug}/other-location/`}
                style={{
                  background: '#FFF4EC',
                  border: '1px solid #FFCCA3',
                  color: '#FF5A00',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                + Other Location
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  } catch (err) {
    console.error('*** PRERENDER_FAILED_REASON ***:', err?.message || err, err?.stack || '');
    throw err;
  }
}
