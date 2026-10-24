import { Phone, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';
import { PHONE_DISPLAY, WHATSAPP_URL, AREAS } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = pageMetadata({
  title: 'Contact Doorstep Home Appliance Services',
  description: 'Contact Doorstep Home Appliance Services at 9515661677 or WhatsApp for home appliance repair enquiries in selected Hyderabad service areas.',
  path: '/contact/',
});

export default function ContactPage() {
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><a href="/">Home</a><span>/</span><span>Contact</span></div><div className="page-heading"><span className="eyebrow">GET IN TOUCH</span><h1>Let’s talk about your appliance.</h1><p>Contact us to describe the issue and confirm whether your address is within the current service coverage.</p></div></div></section><section className="page-content"><div className="container"><div className="service-grid"><article className="service-card"><span className="service-icon"><Phone size={22}/></span><h3>Call us</h3><p>Speak to the team about your appliance and service availability.</p><a className="text-link" href="tel:+919515661677">{PHONE_DISPLAY} <ArrowUpRight size={15}/></a></article><article className="service-card"><span className="service-icon"><MessageCircle size={22}/></span><h3>WhatsApp</h3><p>Send a message with your appliance details and locality.</p><a className="text-link" href={`${WHATSAPP_URL}?text=${encodeURIComponent('Hello Doorstep Home Appliance Services, I would like to enquire about appliance repair.')}`} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={15}/></a></article><article className="service-card"><span className="service-icon"><MapPin size={22}/></span><h3>Service areas listed</h3><p>Ameerpet Main Road, Chanda Nagar, Alwal and Suchitra, Hyderabad.</p><Link className="text-link" href="/locations/">Check areas <ArrowUpRight size={15}/></Link></article></div></div></section></>;
}
