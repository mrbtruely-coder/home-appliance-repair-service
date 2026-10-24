import Link from 'next/link';
import { CheckCircle2, Phone, Sparkles, Tag } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import FAQAccordion from '@/components/FAQAccordion';
import StructuredData from '@/components/StructuredData';
import ServiceHeroButtons from '@/components/ServiceHeroButtons';
import ServiceDetailActionBox from '@/components/ServiceDetailActionBox';
import { SERVICES, AREAS, PHONE_E164, PHONE_DISPLAY, SERVICE_PRICE } from '@/lib/site';
import { CATEGORY_OFFERS } from '@/lib/plansData';
import { pageMetadata, serviceJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) return { title: 'Service not found' };
  return pageMetadata({
    title: `${service.name} in Hyderabad | Doorstep Services`,
    description: `${service.description} Contact Doorstep Home Appliance Services at ${PHONE_DISPLAY}.`,
    path: `/services/${service.slug}/`,
    keywords: [`${service.name.toLowerCase()} Hyderabad`, 'home appliance repair Hyderabad', 'Doorstep Home Appliance Services'],
  });
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) {
    return (
      <section className="page-content container">
        <h1>Service not found</h1>
        <Link href="/services/">Browse services</Link>
      </section>
    );
  }

  // Find active offer for this service if configured
  const currentOffer = CATEGORY_OFFERS.find((o) => o.serviceSlug === service.slug);

  const sameCategory = SERVICES.filter((item) => item.slug !== service.slug && item.category === service.category);
  const related = [...sameCategory, ...SERVICES.filter((item) => item.slug !== service.slug && item.category !== service.category)].slice(0, 3);

  return (
    <>
      <StructuredData data={serviceJsonLd(service)} />

      {/* Hero Section */}
      <section className="page-hero service-detail-hero-enhanced">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services/">Services</Link>
            <span>/</span>
            <span>{service.name}</span>
          </div>

          <div className="page-heading">
            <div className="service-hero-kicker-row">
              <span className="eyebrow">APPLIANCE SERVICE</span>
              {currentOffer && (
                <span className="hero-offer-chip">
                  <Sparkles size={13} /> {currentOffer.discount} Available
                </span>
              )}
            </div>

            <h1>{service.name} in Hyderabad</h1>
            <p>{service.description}</p>

            {/* Interactive Hero Action Buttons: Book Inspection + Enquire + Call */}
            <ServiceHeroButtons service={service} offer={currentOffer} />
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="page-content">
        <div className="container detail-layout">
          <div className="prose">
            {/* Active Service Promotional Offer Banner */}
            {currentOffer && (
              <div className="service-offer-banner-box">
                <div className="offer-banner-icon">
                  <Tag size={24} />
                </div>
                <div className="offer-banner-details">
                  <span className="offer-badge-tag">{currentOffer.tag} DEAL</span>
                  <h3>{currentOffer.title} ({currentOffer.discount})</h3>
                  <p>{currentOffer.desc}</p>
                  <small className="offer-condition-note">{currentOffer.condition} · {currentOffer.expiry}</small>
                </div>
              </div>
            )}

            <h2>Common issues to mention</h2>
            <p>
              When you make an enquiry or book, describing the symptoms helps the technician bring the right diagnostic tools and components:
            </p>
            <ul className="check-list">
              {service.concerns.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2>What to include in your request</h2>
            <p>
              Share the appliance brand and model if available, what changed, any displayed error code, your locality and a convenient time. Confirm what the ₹{SERVICE_PRICE} displayed price includes, and ask about parts or any additional charges before approving work.
            </p>

            <h2>Areas listed for service</h2>
            <p>
              Technicians are on-call across the following residential hubs:
            </p>
            <ul>
              {AREAS.map((area) => (
                <li key={area.slug}>
                  <Link href={`/locations/${area.slug}/`}>{area.name}, Hyderabad</Link>
                </li>
              ))}
            </ul>

            <h2>Preferred service slot timings</h2>
            <p>
              Choose convenient timings when booking your appointment:
            </p>
            <ul>
              <li><strong>Morning:</strong> 9:00 AM – 12:00 PM</li>
              <li><strong>Afternoon:</strong> 12:00 PM – 3:00 PM</li>
              <li><strong>Evening:</strong> 3:00 PM – 6:00 PM</li>
            </ul>

            <h2>Cancellation and warranty guarantee</h2>
            <p>
              Call <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a> to reschedule or cancel anytime without penalties. All completed repairs carry our certified doorstep warranty.
            </p>

            <h2>Frequently asked questions about {service.name}</h2>
            <FAQAccordion items={service.faqs} />
          </div>

          {/* Sticky Aside Panel with Instant Book, Offers & Coupons */}
          <aside className="sticky-panel">
            <ServiceDetailActionBox service={service} offer={currentOffer} />
          </aside>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-white">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">RELATED SERVICES</span>
              <h2>{service.category} services to explore</h2>
            </div>
          </div>
          <div className="service-grid">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} compact />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
