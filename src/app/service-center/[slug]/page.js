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
  Wrench,
} from 'lucide-react';
import { AREAS, SERVICES, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL, SERVICE_PRICE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = AREAS.find((item) => item.slug === slug);
  if (!area) return { title: 'Service Center Not Found' };
  return pageMetadata({
    title: `Doorstep Appliance Repair in ${area.name} | Certified Service Center (10 KM Radius)`,
    description: `Official doorstep appliance service center in ${area.name}, Hyderabad. AC, Refrigerator, Washing Machine, Microwave, Geyser & TV repairs within 10 km radius. Call ${PHONE_DISPLAY}.`,
    path: `/service-center/${area.slug}/`,
    keywords: [
      `appliance service center ${area.name}`,
      `doorstep repair ${area.name}`,
      `AC repair ${area.name}`,
      `refrigerator repair ${area.name}`,
      `washing machine service center ${area.name}`,
      `10 km radius appliance service ${area.name}`,
    ],
  });
}

export default async function ServiceCenterDetailPage({ params }) {
  const { slug } = await params;
  const area = AREAS.find((item) => item.slug === slug);

  if (!area) {
    return (
      <section className="page-content container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h1>Service Center Not Found</h1>
        <p>The requested location service center could not be located.</p>
        <Link href="/service-center/" className="button button-primary" style={{ marginTop: '16px' }}>
          View All Service Centers
        </Link>
      </section>
    );
  }

  // Pre-configured colonies and residential landmarks within 10 km
  const coloniesList = [
    ...(area.landmarks || []),
    'All Residential Colonies',
    'Gated Societies & High-Rise Towers',
    'Commercial Complexes within 10 KM',
  ];

  return (
    <div className="loc-ref-page">
      {/* Hero Section matching reference screenshot */}
      <section className="loc-ref-hero">
        <div className="container">
          {/* Top Breadcrumbs + Direct Hub Tags */}
          <div className="loc-ref-topbar">
            <div className="loc-ref-breadcrumbs">
              <Link href="/">Home</Link>
              <span>&gt;</span>
              <Link href="/service-center/">Locations</Link>
              <span>&gt;</span>
              <span>{area.name} (10 KM Radius)</span>
            </div>

            <div className="loc-ref-tags-strip">
              <span className="loc-tag-direct">DIRECT HUB: {area.name}</span>
              <span className="loc-tag-white">Service: ✓ Same-Day</span>
              <span className="loc-tag-white">📍 10 KM</span>
            </div>
          </div>

          {/* Hero Center Block */}
          <div className="loc-hero-center">
            <div className="loc-radius-top-chip">
              <ShieldCheck size={14} />
              <span>10 KM SERVICE RADIUS COVERAGE HUB</span>
            </div>

            <h1 className="loc-ref-title">
              Doorstep Appliance Repair in{' '}
              <span className="highlight-city">{area.name}</span>
            </h1>

            <p className="loc-ref-subtitle">
              Certified multi-brand technicians dispatched directly to your home within 60–90 minutes. Enjoy ₹0 Booking Fee and comprehensive repair coverage across all residential colonies within a 10 KM radius of {area.name} Dispatch Hub.
            </p>

            {/* 4 Feature Metrics Card Bar */}
            <div className="loc-metrics-grid">
              <div className="loc-metric-item">
                <div className="loc-metric-icon">
                  <Zap size={18} />
                </div>
                <div className="loc-metric-info">
                  <strong>10 KM Service Radius Reach</strong>
                  <span>On-demand service across all residential colonies</span>
                </div>
              </div>

              <div className="loc-metric-item">
                <div className="loc-metric-icon">
                  <Clock size={18} />
                </div>
                <div className="loc-metric-info">
                  <strong>60–90 Min Arrival</strong>
                  <span>Fast mobile doorstep technician dispatch</span>
                </div>
              </div>

              <div className="loc-metric-item">
                <div className="loc-metric-icon">
                  <ShieldCheck size={18} />
                </div>
                <div className="loc-metric-info">
                  <strong>90-Day Digital Warranty</strong>
                  <span>Guaranteed genuine spare parts with warranty card</span>
                </div>
              </div>

              <div className="loc-metric-item">
                <div className="loc-metric-icon">
                  <MapPin size={18} />
                </div>
                <div className="loc-metric-info">
                  <strong>Local Hub: {area.name}</strong>
                  <span>Certified technicians stationed locally</span>
                </div>
              </div>
            </div>

            {/* 3 Hero CTA Action Buttons */}
            <div className="loc-ref-hero-actions">
              <Link
                href={`/booking/?area=${encodeURIComponent(area.name)}`}
                className="btn-cyan-solid"
              >
                <span>Book Service in {area.name}</span>
              </Link>

              <a
                href={`tel:${PHONE_E164}`}
                className="btn-white-call"
              >
                <Phone size={16} />
                <span>Call Dispatch: {PHONE_DISPLAY}</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green-wa"
              >
                <MessageCircle size={16} />
                <span>WhatsApp {area.name} Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Colonies & Areas Covered Within 10 KM */}
      <section className="loc-ref-section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="loc-ref-sec-header">
            <span className="loc-ref-eyebrow">LOCAL SERVICE COVERAGE</span>
            <h2 className="loc-ref-sec-title">
              Colonies & Areas Covered Within 10 KM of {area.name}
            </h2>
            <p className="loc-ref-sec-desc">
              Our mobile technician vans are stationed across {area.name} to guarantee rapid 60–90 min doorstep response in all surrounding colonies and societies:
            </p>
          </div>

          {/* Colonies Grid */}
          <div className="loc-colonies-grid">
            {coloniesList.map((colony, idx) => (
              <Link
                key={idx}
                href={`/services/?area=${encodeURIComponent(area.name)}&locality=${encodeURIComponent(colony)}`}
                className="loc-colony-card"
                title={`View all repair categories in ${colony}`}
              >
                <div className="colony-icon-pill">
                  <MapPin size={15} />
                </div>
                <span className="loc-colony-name">{colony}</span>
                <span className="loc-colony-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>

          {/* 10 KM Radius Protection Guarantee Strip */}
          <div className="loc-radius-guarantee-strip">
            <MapPin size={22} style={{ flexShrink: 0, color: '#FF6B00' }} />
            <div>
              <strong>10 KM Radius Protection Guarantee:</strong> Even if your exact house, street or gated apartment society is not listed above, our mobile team covers all residential locations within a 10 KM radial perimeter from our {area.name} central dispatch hub.
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Repair Categories in this Location */}
      <section className="loc-ref-section" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div className="loc-ref-sec-header">
            <span className="loc-ref-eyebrow">DOORSTEP SERVICES AVAILABLE</span>
            <h2 className="loc-ref-sec-title">
              Repair Categories in {area.name}
            </h2>
            <p className="loc-ref-sec-desc">
              Choose any appliance category below for same-day inspection, upfront diagnostic estimate, and doorstep repairs:
            </p>
          </div>

          {/* 3-Column Categories Grid */}
          <div className="loc-categories-grid-3col">
            {SERVICES.map((cat) => (
              <div key={cat.slug} className="loc-cat-card-modern">
                {/* Photo with Badges */}
                <div className="loc-cat-photo-wrap">
                  <Image
                    src={cat.image}
                    alt={`${cat.name} in ${area.name}`}
                    width={400}
                    height={220}
                    priority
                  />
                  <div className="badge-tech-dispatch">
                    TECH DISPATCH
                  </div>
                  <div className="badge-subcat-count">
                    {cat.subcategories?.length || 3} Subcategories
                  </div>
                </div>

                {/* Card Content */}
                <div className="loc-cat-content">
                  <h3 className="loc-cat-title-text">
                    {cat.name} in {area.name}
                  </h3>

                  <p className="loc-cat-desc-text">
                    {cat.short}
                  </p>

                  <span className="loc-key-services-title">
                    KEY SERVICES COVERED:
                  </span>

                  {/* Subcategories Pills */}
                  {cat.subcategories && (
                    <div className="loc-sub-pills-row">
                      {cat.subcategories.map((sub) => (
                        <span key={sub.id} className="loc-sub-chip-badge">
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Pricing Box */}
                  <div className="loc-cat-pricing-box">
                    <span className="pricing-box-label">
                      Diagnostic Fee in {area.name}:
                    </span>
                    <div className="pricing-box-val">
                      <span className="price-strike">From ₹399</span>
                      <strong className="price-green-bold">₹{SERVICE_PRICE}</strong>
                    </div>
                  </div>

                  {/* Dual Buttons */}
                  <div className="loc-cat-dual-buttons">
                    <Link
                      href={`/booking/?service=${encodeURIComponent(cat.name)}&area=${encodeURIComponent(area.name)}`}
                      className="btn-cat-book"
                    >
                      Book in {area.name}
                    </Link>
                    <Link
                      href={`/services/${cat.slug}/`}
                      className="btn-cat-subcats"
                    >
                      Subcategories &gt;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Bottom Rapid Transit Dispatch CTA Banner */}
      <section className="container">
        <div className="loc-ref-dispatch-banner">
          <div className="dispatch-badge-pill">
            <Clock size={13} />
            <span>RAPID TRANSIT DISPATCH</span>
          </div>

          <h2>Fast Doorstep Dispatch in {area.name} Within 90 Minutes</h2>

          <p>
            No matter which colony you live in within a 10 KM radius of {area.name} Dispatch Hub, our certified technicians reach you with calibrated equipment.
          </p>

          <div className="dispatch-banner-actions">
            <Link
              href={`/booking/?area=${encodeURIComponent(area.name)}`}
              className="btn-dispatch-white"
            >
              Book Technician Now
            </Link>

            <a
              href={`tel:${PHONE_E164}`}
              className="btn-dispatch-call"
            >
              <Phone size={16} />
              <span>Call +91 {PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
