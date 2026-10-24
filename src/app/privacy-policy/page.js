import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'Read how Doorstep Home Appliance Services handles information entered into the WhatsApp-based booking enquiry form.',
  path: '/privacy-policy/',
});

export default function PrivacyPolicyPage() {
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><a href="/">Home</a><span>/</span><span>Privacy policy</span></div><div className="page-heading"><span className="eyebrow">LEGAL INFORMATION</span><h1>Privacy policy</h1><p>How the website booking enquiry works and what to consider when sharing details.</p></div></div></section><section className="page-content"><div className="container content-narrow prose"><h2>Information entered on this website</h2><p>The booking form prepares a message and opens WhatsApp. This static website does not send form submissions to its own booking database.</p><h2>WhatsApp messages</h2><p>If you choose to send the prepared message, the information you share is handled by WhatsApp under its own terms and privacy policy. Review those terms before using the service.</p><h2>Use of enquiry details</h2><p>Details shared directly with the business may be used to respond to your service enquiry and discuss availability. The business owner should update this policy to reflect actual data handling, retention, access and deletion practices before launch.</p><h2>Contact</h2><p>For questions about an enquiry, call 9515661677.</p><div className="notice-box">This is starter website copy, not legal advice. Review it against your real business processes and applicable law before publishing.</div></div></section></>;
}
