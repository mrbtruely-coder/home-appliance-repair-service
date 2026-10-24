import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Doorstep Home Appliance Services',
  description: 'Learn about Doorstep Home Appliance Services and our straightforward approach to appliance repair enquiries in selected Hyderabad neighbourhoods.',
  path: '/about/',
});

export default function AboutPage() {
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><a href="/">Home</a><span>/</span><span>About</span></div><div className="page-heading"><span className="eyebrow">ABOUT DOORSTEP</span><h1>Service built around your home.</h1><p>A simple way to start a conversation about everyday appliance problems.</p></div></div></section><section className="page-content"><div className="container content-narrow prose"><h2>A straightforward service enquiry</h2><p>Doorstep Home Appliance Services provides a simple way for customers to enquire about home appliance repair. Share the appliance, symptoms and locality so service availability and next steps can be discussed directly.</p><h2>What you can expect from the booking process</h2><p>We encourage clear communication about the reported issue, any visit or diagnosis fee, parts availability and an estimate before repair work is approved. A request sent through this website is an enquiry and is not a confirmed appointment.</p><h2>Our listed service areas</h2><p>The website currently lists Ameerpet Main Road, Chanda Nagar, Alwal and Suchitra in Hyderabad. Please confirm coverage for your exact address before relying on a visit.</p><div className="notice-box">Before publishing, add only verified business information such as service hours, a business address, technician qualifications or warranty terms if these are applicable and accurate.</div></div></section></>;
}
