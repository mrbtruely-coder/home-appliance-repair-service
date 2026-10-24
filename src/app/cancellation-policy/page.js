import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Cancellation and Rescheduling Policy',
  description: 'How to contact Doorstep Home Appliance Services to change or cancel an appliance repair enquiry or appointment.',
  path: '/cancellation-policy/',
});

export default function CancellationPolicyPage() {
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><a href="/">Home</a><span>/</span><span>Cancellation policy</span></div><div className="page-heading"><span className="eyebrow">LEGAL INFORMATION</span><h1>Cancellation & rescheduling</h1><p>Contact the business directly if your plans change.</p></div></div></section><section className="page-content"><div className="container content-narrow prose"><h2>Change or cancel a request</h2><p>Call 9515661677 as early as practical if you need to change or cancel a requested appointment. If you have only submitted an enquiry, let the team know that you no longer need a response.</p><h2>Fees and parts</h2><p>Any visit, diagnosis, cancellation or parts-related fees should be explained and agreed before they apply. Confirm the exact terms with the business when arranging a visit.</p><h2>Appointment confirmation</h2><p>A WhatsApp enquiry is not a confirmed appointment. Follow the confirmation details provided directly by the business.</p><div className="notice-box">This starter policy must be updated to match the business's actual cancellation and refund process before launch.</div></div></section></>;
}
