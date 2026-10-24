import HubsDirectoryView from '@/components/HubsDirectoryView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'All Service Hubs & Coverage Areas in Hyderabad | Doorstep Appliance Repair',
  description: 'Find your nearest doorstep appliance repair center in Hyderabad. Active service hubs in Ameerpet, Chanda Nagar, Alwal, and Suchitra covering all colonies within 10 km in 90 minutes.',
  path: '/locations/',
  keywords: [
    'service hubs Hyderabad',
    'appliance repair coverage areas Hyderabad',
    'doorstep repair centers Hyderabad',
    'AC repair Hyderabad',
    'refrigerator service Hyderabad',
    'washing machine repair Hyderabad',
    'Ameerpet Main Road hub',
    'Chanda Nagar hub',
    'Alwal hub',
    'Suchitra hub',
    'same day technician Hyderabad',
  ],
});

export default function LocationsHubPage() {
  return <HubsDirectoryView />;
}
