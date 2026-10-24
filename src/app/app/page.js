import Link from 'next/link';
import { ArrowRight, CheckCircle2, Smartphone } from 'lucide-react';
import { AppPromotion } from '@/components/ClientFeatures';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Doorstep Mobile App | Home Appliance Service Enquiries',
  description: 'Discover the planned Doorstep mobile experience for appliance service enquiries, location selection and booking updates in Hyderabad. App store links will be added after publication.',
  path: '/app/',
  keywords: ['Doorstep mobile app', 'home appliance service app Hyderabad', 'appliance repair booking app'],
});

export default function AppPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="page-heading"><span className="eyebrow">DOORSTEP MOBILE</span><h1>Home service access, designed for your phone.</h1><p>Explore the planned mobile experience for finding appliance services, selecting a locality and sending enquiries. Official app download links will be published here when the apps are available.</p><div className="hero-actions"><Link className="button button-primary" href="/contact/">Ask about app launch <ArrowRight size={17}/></Link><Link className="button button-ghost" href="/booking/">Book on the website</Link></div></div></div></section>
    <section className="page-content"><div className="container app-benefit-grid"><article><span><Smartphone size={20}/></span><h2>Easy service discovery</h2><p>Search appliance categories and review common issues before sending an enquiry.</p></article><article><span><CheckCircle2 size={20}/></span><h2>Area-first experience</h2><p>Select your area and confirm exact-address availability before a booking is accepted.</p></article><article><span><CheckCircle2 size={20}/></span><h2>Updates in one place</h2><p>Booking status and notifications can be added after secure account and messaging services are connected.</p></article></div></section>
    <AppPromotion />
  </>;
}
