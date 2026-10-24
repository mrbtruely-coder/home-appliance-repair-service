import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Clock, Phone, MessageCircle } from 'lucide-react';
import { AREAS, SERVICES, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL, SERVICE_PRICE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = AREAS.find((item) => item.slug === slug);
  if (!area) return { title: 'Location not found' };
  return pageMetadata({
    title: `Home Appliance Repair in ${area.name}, Hyderabad (10 km Radius Coverage)`,
    description: `Same-day doorstep repair services in ${area.name} & within 10 km radius across Hyderabad. AC, Refrigerator, Washing Machine, Microwave, Geyser & TV repair. Call ${PHONE_DISPLAY}.`,
    path: `/locations/${area.slug}/`,
    keywords: [
      `home appliance repair ${area.name}`,
      `AC repair ${area.name}`,
      `refrigerator repair ${area.name}`,
      `washing machine repair ${area.name}`,
      `appliance repair 10 km radius ${area.name}`,
      `doorstep service Hyderabad`,
    ],
  });
}

export default async function LocationDetailPage({ params }) {
  const { slug } = await params;
  const area = AREAS.find((item) => item.slug === slug);
  if (!area) {
    return (
      <section className="page-content container">
        <h1>Location not found</h1>
        <Link href="/locations/">View all service areas</Link>
      </section>
    );
  }

  const otherAreas = AREAS.filter((a) => a.slug !== area.slug);

  return (
    <div className="location-detail-page">
      {/* Location Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/locations/">Locations</Link>
            <span>/</span>
            <span>{area.name}</span>
          </div>

          <div className="page-heading">
            <span className="eyebrow">HYDERABAD DOORSTEP SERVICE HUB</span>
            <h1>Home Appliance Repair in {area.name}</h1>
            
            {/* Prominent 10 KM Radius Pill */}
            <div>
              <span className="location-radius-pill">
                <MapPin size={15} />
                <span>Active 10 KM Service Radius Coverage</span>
              </span>
            </div>

            <p style={{ marginTop: '14px', maxWidth: '700px' }}>
              {area.description} Certified technician dispatch at your doorstep within 90 minutes.
            </p>

            <div className="hero-actions" style={{ marginTop: '22px' }}>
              <Link
                className="button button-primary"
                href={`/booking/?area=${encodeURIComponent(area.name)}`}
              >
                Book Service in {area.name} <ArrowRight size={17} />
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="button button-ghost"
                style={{ gap: '8px' }}
              >
                <Phone size={16} />
                <span>Call {PHONE_DISPLAY}</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
                style={{ background: '#22C55E', color: '#fff', gap: '8px' }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Dispatch</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="page-content">
        <div className="container detail-layout">
          <div className="prose">
            {/* 10 KM Radius Highlight Banner Card */}
            <div className="location-radius-banner">
              <span className="radius-badge-header">
                <MapPin size={13} />
                <span>10 KM Radius Service Guarantee</span>
              </span>
              <h2>Same-Day Doorstep Assistance across {area.name} & 10 KM Radius</h2>
              <p>
                Our mobile technician teams are stationed locally at <strong>{area.name}</strong>, providing rapid doorstep diagnosis and repair coverage across all residential colonies, gated apartments, and commercial complexes within a <strong>10 km radius</strong>.
              </p>

              {/* Landmarks and surrounding colonies */}
              {area.landmarks && area.landmarks.length > 0 && (
                <div className="location-landmarks-wrap">
                  <span className="landmarks-label">Covered Landmarks & Surrounding Localities (10 km Radius):</span>
                  <div className="landmarks-chips">
                    {area.landmarks.map((landmark, idx) => (
                      <span key={idx} className="landmark-chip">
                        📍 {landmark}
                      </span>
                    ))}
                    <span className="landmark-chip">
                      ✓ All Colonies within 10 km
                    </span>
                    <span className="landmark-chip">
                      ✓ Gated Communities & Apartments
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Categories Available in this Location */}
            <div className="location-categories-section">
              <h2>Appliance Repair Categories in {area.name}</h2>
              <p>
                Choose from our verified categories below for immediate same-day technician visit at your doorstep in {area.name}:
              </p>

              <div className="location-categories-grid">
                {SERVICES.map((service) => (
                  <div key={service.slug} className="location-category-card">
                    {/* Category Photo */}
                    <Link
                      href={`/services/${service.slug}/`}
                      className="location-cat-image-wrap"
                      aria-label={`View subcategories for ${service.name}`}
                    >
                      <Image
                        src={service.image}
                        alt={`${service.name} in ${area.name}`}
                        width={320}
                        height={180}
                        className="location-cat-img"
                      />
                      <span className="location-cat-badge">
                        Verified in {area.name}
                      </span>
                    </Link>

                    {/* Category Details */}
                    <div className="location-cat-body">
                      <h3 className="location-cat-title">
                        <Link href={`/services/${service.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {service.name}
                        </Link>
                      </h3>

                      <p className="location-cat-desc">
                        {service.short}
                      </p>

                      {/* Subcategories list */}
                      {service.subcategories && (
                        <div className="location-sub-chips">
                          {service.subcategories.map((sub) => (
                            <span key={sub.id} className="location-sub-pill">
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="location-cat-footer">
                        <span className="location-cat-price">From ₹{SERVICE_PRICE}</span>
                        <Link
                          href={`/booking/?service=${encodeURIComponent(service.name)}&area=${encodeURIComponent(area.name)}`}
                          className="location-cat-btn"
                        >
                          Book Now &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Doorstep Service in this Area */}
            <h2>Why Book Home Appliance Repair in {area.name}?</h2>
            <ul className="check-list">
              <li>
                <CheckCircle2 size={18} />
                <span>
                  <strong>10 KM Rapid Dispatch:</strong> A dedicated technician reaches your home within 90 minutes anywhere in {area.name} or surrounding 10 km colonies.
                </span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>
                  <strong>Transparent ₹{SERVICE_PRICE} Diagnostics:</strong> Clear upfront pricing with no hidden charges before any repair begins.
                </span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>
                  <strong>90-Day Digital Warranty:</strong> All replaced spare parts and services come backed with our official 90-day warranty card.
                </span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>
                  <strong>Background-Verified Technicians:</strong> Expert mechanics with ID cards, professional tools, and certified experience.
                </span>
              </li>
            </ul>

            {/* Other Nearby Service Hubs */}
            <h2 style={{ marginTop: '36px' }}>Other Service Hubs in Hyderabad</h2>
            <p>We also provide 10 km radius coverage across these key localities:</p>
            <ul>
              {otherAreas.map((item) => (
                <li key={item.slug}>
                  <Link href={`/locations/${item.slug}/`}>
                    <strong>{item.name}</strong> — 10 km Radius Coverage ({item.landmarks.slice(0, 2).join(', ')})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky Aside Panel */}
          <aside className="sticky-panel">
            <div className="detail-panel">
              <span className="area-pin"><MapPin size={22} /></span>
              <h2>{area.name} Hub</h2>
              <p style={{ margin: '8px 0 16px', fontSize: '13px', color: '#64748B' }}>
                Active coverage within <strong>10 km radius</strong> across all surrounding residential localities.
              </p>

              <div style={{ display: 'grid', gap: '10px', margin: '14px 0 20px', fontSize: '12px', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="#16A34A" />
                  <span><strong>90-Min</strong> Doorstep Arrival</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} color="#16A34A" />
                  <span><strong>90-Day</strong> Service Warranty</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="#16A34A" />
                  <span><strong>10 KM</strong> Service Radius</span>
                </div>
              </div>

              <Link
                className="button button-primary"
                href={`/booking/?area=${encodeURIComponent(area.name)}`}
                style={{ width: '100%', marginBottom: '10px', textAlign: 'center' }}
              >
                Book for {area.name} <ArrowRight size={16} />
              </Link>

              <a
                href={`tel:${PHONE_E164}`}
                className="button button-ghost"
                style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center' }}
              >
                <Phone size={15} /> Call {PHONE_DISPLAY}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
