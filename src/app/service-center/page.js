import HubsDirectoryView from '@/components/HubsDirectoryView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Appliance Repair Service Centers in Hyderabad | Doorstep Service Hubs',
  description: 'Find your nearest doorstep appliance repair center in Hyderabad. We have active service hubs in Ameerpet, Chanda Nagar, Alwal, and Suchitra covering all colonies within 10 km. Fast 90-minute technician dispatch.',
  path: '/service-center/',
  keywords: [
    'appliance service centers Hyderabad',
    'doorstep repair locations Hyderabad',
    'AC service center Hyderabad',
    'washing machine service center Hyderabad',
    'refrigerator repair center Hyderabad',
    'microwave oven repair Hyderabad',
    'TV service center Hyderabad',
    'appliance repair Ameerpet Hyderabad',
    'appliance repair Chanda Nagar Hyderabad',
    'appliance repair Alwal Hyderabad',
    'appliance repair Suchitra Hyderabad',
    'same day appliance technician Hyderabad',
    'Hyderabad doorstep appliance repair',
  ],
});

export default function ServiceCenterHubPage() {
  return <HubsDirectoryView />;
}
