import Link from 'next/link';
import { MessageCircle, Phone, CalendarClock, CreditCard, MapPin, ShieldCheck, CircleHelp } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import { FAQS, PHONE_E164, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Help Center | Appliance Service Booking Support Hyderabad',
  description: 'Get help with appliance service enquiries, booking slots, service locations, payment methods, cancellation and rescheduling in Hyderabad.',
  path: '/help-center/',
  keywords: ['home appliance service help Hyderabad', 'booking support', 'cancellation help', 'Doorstep service support'],
});

const topics = [
  { icon: CalendarClock, title: 'Booking & time slots', text: 'Choose a preferred date and morning, afternoon or evening window. A slot is only confirmed when the team responds.', href: '/booking/' },
  { icon: MapPin, title: 'Service availability', text: 'Check the listed Hyderabad areas and ask us to verify coverage for your exact address before confirming.', href: '/hyderabad/' },
  { icon: CreditCard, title: 'Price & payment', text: 'Services display ₹299. Confirm what it includes, any additional charges and accepted payment methods before approving work.', href: '/services/' },
  { icon: ShieldCheck, title: 'Cancellation & rescheduling', text: 'Contact us as early as possible to request a change or cancellation. Ask about any applicable fees in advance.', href: '/cancellation-policy/' },
];

export default function HelpCenterPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Help Center</span></div><div className="page-heading"><span className="eyebrow">CUSTOMER SUPPORT</span><h1>How can we help you?</h1><p>Find answers about service requests, availability, preferred time slots, pricing, payment and cancellations.</p><div className="hero-actions"><a className="button button-primary" href={`${WHATSAPP_URL}?text=${encodeURIComponent('Hello Doorstep Home Appliance Services, I need help with a service enquiry.')}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Chat on WhatsApp</a><a className="button button-ghost" href={`tel:${PHONE_E164}`}><Phone size={16}/> Call {PHONE_DISPLAY}</a></div></div></div></section>
    <section className="page-content"><div className="container"><div className="section-heading"><div><span className="eyebrow">SUPPORT TOPICS</span><h2>Choose a topic</h2></div></div><div className="service-grid">{topics.map(({icon:Icon,title,text,href})=><article className="service-card" key={title}><div className="service-card-icon"><Icon size={24}/></div><h3>{title}</h3><p>{text}</p><Link className="text-link" href={href}>Learn more →</Link></article>)}</div></div></section>
    <section className="section-white"><div className="container content-narrow"><div className="section-heading"><div><span className="eyebrow">QUICK ANSWERS</span><h2>Frequently asked questions</h2></div></div><FAQAccordion items={FAQS}/><div className="notice-box"><CircleHelp size={18} className="inline-icon"/> Need more help? Contact the team directly. Please do not share passwords, payment OTPs or full card details.</div></div></section>
  </>;
}
