import ContactClient from '@/components/ContactClient';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Doorstep Home Appliance Services Hyderabad | Service Hubs & Map',
  description: 'Contact Doorstep Service in Hyderabad. Call 9515661677 for instant technician dispatch across Ameerpet, Chanda Nagar, Alwal, and Suchitra.',
  path: '/contact/',
  keywords: [
    'contact appliance repair Hyderabad',
    'appliance service helpline Hyderabad',
    'call technician Hyderabad',
    'appliance repair customer care Hyderabad',
    'doorstep service phone number',
  ],
});

export default function ContactPage() {
  return <ContactClient />;
}
