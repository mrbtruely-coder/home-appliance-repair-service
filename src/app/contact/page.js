import ContactClient from '@/components/ContactClient';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Doorstep Home Appliance Services Hyderabad | Service Hubs & Map',
  description: 'Locate Doorstep Home Appliance Services across Ameerpet, Chanda Nagar, Alwal, and Suchitra. Call +91 9515661677 or book online.',
  path: '/contact/',
});

export default function ContactPage() {
  return <ContactClient />;
}
