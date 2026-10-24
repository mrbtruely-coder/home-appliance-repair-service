import Link from 'next/link';
import {
  Check,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Clock,
  Wrench,
} from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import { SERVICES, PHONE_E164, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/site';
import { pageMetadata, serviceJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : {};
  const area = sp?.area;
  const locality = sp?.locality;
  const locationContext = locality ? `${locality}, ${area}` : area;

  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) return { title: 'Service not found' };

  const subcatKeywords = (service.subcategories || []).map((s) => s.name);
  const commonProblems = (service.concerns || []).map((c) => `${service.name} ${c}`);

  if (locationContext) {
    return pageMetadata({
      title: `${service.name} in ${locationContext}, Hyderabad | Doorstep Repair`,
      description: `Need fast ${service.name.toLowerCase()} in ${locationContext}, Hyderabad? Our certified technician arrives at your home within 90 minutes. Upfront pricing from ₹299, genuine spare parts, and 90-day warranty. Call ${PHONE_DISPLAY}.`,
      path: `/services/${service.slug}/?area=${encodeURIComponent(area || '')}${locality ? `&locality=${encodeURIComponent(locality)}` : ''}`,
      keywords: [
        `${service.name} in ${locationContext} Hyderabad`,
        `${service.name.toLowerCase()} in ${locationContext}`,
        `doorstep ${service.name.toLowerCase()} ${locationContext}`,
        `${service.name.toLowerCase()} technician ${locationContext} Hyderabad`,
        `same day ${service.name.toLowerCase()} in ${locationContext}`,
        `best ${service.name.toLowerCase()} near me in ${locationContext}`,
        ...subcatKeywords.map((s) => `${s} in ${locationContext}`),
        `${service.name} Hyderabad`,
        `Hyderabad ${service.name.toLowerCase()}`,
        'home appliance repair Hyderabad',
        'doorstep repair service Hyderabad',
      ],
    });
  }

  return pageMetadata({
    title: `${service.name} in Hyderabad | Same-Day Doorstep Service`,
    description: `Looking for reliable ${service.name.toLowerCase()} in Hyderabad? Our certified technicians arrive at your home within 90 minutes. Honest diagnostics from ₹299, genuine spare parts, and 90-day warranty. Call ${PHONE_DISPLAY}.`,
    path: `/services/${service.slug}/`,
    keywords: [
      // Service based keywords
      `${service.name}`,
      `${service.name.toLowerCase()} repair`,
      `${service.name.toLowerCase()} service`,
      `${service.slug.replace(/-/g, ' ')}`,
      ...subcatKeywords,
      ...commonProblems.slice(0, 4),
      // Cities + service keywords for city based urls
      `${service.name} Hyderabad`,
      `Hyderabad ${service.name.toLowerCase()}`,
      `${service.name.toLowerCase()} in Hyderabad`,
      `doorstep ${service.name.toLowerCase()} Hyderabad`,
      `${service.name.toLowerCase()} service center Hyderabad`,
      `same day ${service.name.toLowerCase()} Hyderabad`,
      `best ${service.name.toLowerCase()} near me Hyderabad`,
      'home appliance repair Hyderabad',
      'doorstep appliance service Hyderabad',
    ],
  });
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    return (
      <section className="page-content container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1>Service not found</h1>
        <p style={{ margin: '14px 0 24px', color: '#64748B' }}>
          The requested appliance category could not be located.
        </p>
        <Link href="/services/" className="button button-primary">
          Browse All Services
        </Link>
      </section>
    );
  }

  const subcategories = service.subcategories || [];

  return (
    <>
      <StructuredData data={serviceJsonLd(service)} />

      {/* 1. Top Dark Navy Hero Banner with Category Pills matching Reference */}
      <section className="srv-ref-hero-banner">
        <div className="container text-center">
          {/* Breadcrumbs */}
          <div className="srv-ref-breadcrumbs">
            <Link href="/">Home</Link>
            <span className="crumb-sep">&rsaquo;</span>
            <Link href="/services/">Services</Link>
            <span className="crumb-sep">&rsaquo;</span>
            <span className="crumb-active">{service.name}</span>
          </div>

          <div className="srv-ref-eyebrow">
            HYDERABAD DOORSTEP REPAIRS
          </div>

          <h1 className="srv-ref-main-title">
            {service.heroTagline || `${service.name} Services`}
          </h1>

          <p className="srv-ref-subtitle">
            {service.heroSubtitle || service.description}
          </p>

          {/* Category Filter Pills Row matching Reference */}
          <div className="srv-ref-pills-bar">
            <Link href="/services/" className="srv-ref-pill">
              All Categories (6)
            </Link>
            {SERVICES.map((cat) => {
              const isActive = cat.slug === service.slug;
              return (
                <Link
                  key={cat.slug}
                  href={`/services/${cat.slug}/`}
                  className={`srv-ref-pill ${isActive ? 'active' : ''}`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Main Body Content (on #F8FAFC) */}
      <section className="srv-ref-body-section">
        <div className="container">
          {/* Back button */}
          <div className="srv-ref-back-wrap">
            <Link href="/services/" className="btn-ref-back">
              <ArrowLeft size={16} />
              <span>Back to All Appliance Categories</span>
            </Link>
          </div>

          {/* Subcategories Showcase Overview Box */}
          <div className="srv-ref-overview-card">
            <div className="overview-card-left">
              <div className="overview-badge-pill">
                <Sparkles size={13} />
                <span>SAME-DAY FIX</span>
              </div>

              <h2 className="overview-card-title">
                {service.name} Subcategories
              </h2>

              <p className="overview-card-desc">
                Select your exact {service.name.toLowerCase()} type below. Our doorstep technicians carry original brand spare parts, certified multimeters, and pressure tools.
              </p>

              <div className="overview-trust-row">
                <div className="trust-check-item">
                  <Check size={16} strokeWidth={3} className="trust-check-icon" />
                  <span>90-Day Warranty</span>
                </div>
                <div className="trust-check-item">
                  <Check size={16} strokeWidth={3} className="trust-check-icon" />
                  <span>Genuine OEM Spares</span>
                </div>
                <div className="trust-check-item">
                  <Check size={16} strokeWidth={3} className="trust-check-icon" />
                  <span>Arrival in 90 Mins</span>
                </div>
              </div>
            </div>

            <div className="overview-card-right">
              <img
                src={service.image || '/hero-technician.jpg'}
                alt={`${service.name} technician servicing appliance in Hyderabad`}
                className="overview-tech-img"
              />
            </div>
          </div>

          {/* Subcategory Cards Section Header */}
          <div className="srv-ref-section-heading">
            <h2>Available Subcategory Services ({subcategories.length})</h2>
          </div>

          {/* Subcategory Cards Grid */}
          <div
            className={`srv-ref-cards-grid ${
              subcategories.length === 2
                ? 'grid-2col'
                : subcategories.length === 3
                ? 'grid-3col'
                : 'grid-4col'
            }`}
          >
            {subcategories.map((sub) => (
              <div key={sub.id} className="srv-ref-card">
                {/* Subcategory Badge */}
                <div className="srv-card-top-badge">
                  <span className="badge-tag-pill">{sub.badge || 'Expert Fix'}</span>
                </div>

                <h3 className="srv-card-title">{sub.name}</h3>

                <p className="srv-card-desc">{sub.description}</p>

                {/* Common Problems Solved List */}
                <div className="srv-card-problems-box">
                  <span className="problems-header-label">COMMON PROBLEMS SOLVED:</span>
                  <ul className="problems-list">
                    {(sub.commonProblems || service.concerns || []).slice(0, 4).map((prob, idx) => (
                      <li key={idx}>
                        <Check size={14} strokeWidth={2.6} className="problem-check-icon" />
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Pricing & Booking Action */}
                <div className="srv-card-bottom">
                  <div className="srv-price-meta-row">
                    <div className="price-block">
                      <span className="price-label">INSPECTION CHARGE</span>
                      <strong className="price-value">From {sub.startingPrice} Diagnostic Fee</strong>
                    </div>
                    <span className="adjusted-bill-tag">Adjusted in Bill</span>
                  </div>

                  <Link
                    href={`/booking/?service=${service.slug}&sub=${sub.id}`}
                    className="btn-srv-book-now"
                  >
                    <span>Book {sub.name}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Direct Assistance Strip matching Reference */}
          <div className="srv-ref-help-strip">
            <span className="help-strip-text">Need help selecting the right service?</span>
            <div className="help-strip-actions">
              <a href={`tel:${PHONE_E164}`} className="btn-help-call">
                <Phone size={16} />
                <span>Call: +{PHONE_DISPLAY}</span>
              </a>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  `Hello Doorstep Service Hyderabad, I need assistance selecting the right repair service for my ${service.name}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn-help-wa"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
