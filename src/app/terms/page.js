import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms and Conditions',
  description: 'Terms for service enquiries, availability, estimates and repair approvals with Doorstep Home Appliance Services.',
  path: '/terms/',
});

export default function TermsPage() {
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><a href="/">Home</a><span>/</span><span>Terms</span></div><div className="page-heading"><span className="eyebrow">LEGAL INFORMATION</span><h1>Terms and conditions</h1><p>Important information about requests made through this website.</p></div></div></section><section className="page-content"><div className="container content-narrow prose"><h2>Service enquiries</h2><p>Submitting the website form or sending a WhatsApp message is a request for information and does not itself confirm an appointment, technician dispatch or service availability.</p><h2>Estimates and approvals</h2><p>Customers should confirm any visit fee, diagnosis charge, parts cost, estimate and applicable terms before approving work. Repair options depend on the appliance and diagnosis.</p><h2>Coverage and scheduling</h2><p>Service availability depends on the exact address, appliance type and schedule. The listed localities are not a guarantee of coverage for every street or time.</p><h2>Accurate details</h2><p>Please provide accurate contact details and a clear description of the issue. Replace or expand this starter wording to match the business's actual terms before launch.</p><div className="notice-box">Have these terms reviewed for your actual business process before publication.</div></div></section></>;
}
