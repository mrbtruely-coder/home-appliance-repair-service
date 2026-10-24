import Link from 'next/link';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { AREAS, SERVICES, PHONE_DISPLAY, SERVICE_PRICE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = AREAS.find((item) => item.slug === slug);
  if (!area) return { title: 'Location not found' };
  return pageMetadata({
    title: `Home Appliance Repair in ${area.name}, Hyderabad`,
    description: `${area.description} Call ${PHONE_DISPLAY} to confirm exact-address service availability.`,
    path: `/locations/${area.slug}/`,
    keywords: [`home appliance repair ${area.name}`, `AC repair ${area.name}`, `appliance service Hyderabad`],
  });
}

export default async function LocationDetailPage({ params }) {
  const { slug } = await params;
  const area = AREAS.find((item) => item.slug === slug);
  if (!area) {
    return <section className="page-content container"><h1>Location not found</h1><Link href="/locations/">View service areas</Link></section>;
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/locations/">Locations</Link><span>/</span><span>{area.name}</span></div>
          <div className="page-heading">
            <span className="eyebrow">HYDERABAD SERVICE AREA</span>
            <h1>Home appliance repair enquiries in {area.name}</h1>
            <p>{area.description}</p>
            <div className="hero-actions"><Link className="button button-primary" href="/checkout/">Request a service for ₹{SERVICE_PRICE} <ArrowRight size={17} /></Link></div>
          </div>
        </div>
      </section>
      <section className="page-content">
        <div className="container detail-layout">
          <div className="prose">
            <h2>Appliances you can enquire about</h2>
            <p>Share your appliance type and a short description of the issue. Support and availability depend on the appliance, fault and appointment schedule.</p>
            <ul className="check-list">{SERVICES.map((service) => <li key={service.slug}><CheckCircle2 size={18} /><span><Link href={`/services/${service.slug}/`}>{service.name} — ₹{SERVICE_PRICE}</Link></span></li>)}</ul>
            <h2>Confirm your exact address</h2>
            <p>Before booking, share your street or landmark and ask the team to confirm that service is available at your address. The presence of this page does not guarantee same-day or appointment availability.</p>
            <h2>Helpful details to share</h2>
            <ul><li>Appliance brand and model, if available</li><li>A brief description of the issue</li><li>Your locality and nearby landmark</li><li>Your preferred date or time</li></ul>
          </div>
          <aside className="sticky-panel">
            <div className="detail-panel">
              <span className="area-pin"><MapPin size={19} /></span>
              <h2>{area.name}, Hyderabad</h2>
              <p>Service area enquiry. Please confirm address coverage before scheduling.</p>
              <Link className="button button-primary" href="/checkout/" style={{ width: '100%' }}>Check availability <ArrowRight size={16} /></Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
