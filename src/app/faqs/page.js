import FAQAccordion from '@/components/FAQAccordion';
import { FAQS } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Home Appliance Repair FAQs | Doorstep Service Hyderabad',
  description: 'Frequently asked questions about home appliance repair in Hyderabad. Learn about visiting charges, 90-minute arrival, warranty, and covered areas.',
  path: '/faqs/',
  keywords: [
    'appliance repair FAQs Hyderabad',
    'technician visit charges Hyderabad',
    'doorstep appliance warranty',
    'AC repair cost Hyderabad',
    'doorstep service questions',
  ],
});

export default function FAQsPage() {
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) };
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><a href="/">Home</a><span>/</span><span>FAQs</span></div><div className="page-heading"><span className="eyebrow">HELP CENTRE</span><h1>Frequently asked questions</h1><p>Helpful information before you send a service enquiry.</p></div></div></section><section className="page-content"><div className="container content-narrow"><FAQAccordion items={FAQS}/><div className="notice-box">Still have a question? Call 9515661677 or contact us through WhatsApp. Service availability and charges should be confirmed directly.</div></div></section></>;
}
