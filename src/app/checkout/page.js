import CheckoutClient from '@/components/CheckoutClient';
export const metadata = { title: 'Checkout and Service Enquiry', description: 'Review your appliance service enquiry, choose a Hyderabad service area and send your request to Doorstep.', robots: { index: false, follow: true }, alternates: { canonical: '/checkout/' } };
export default function CheckoutPage() { return <CheckoutClient />; }
