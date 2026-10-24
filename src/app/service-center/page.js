import HubsDirectoryView from '@/components/HubsDirectoryView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'All Service Hubs & Coverage Areas in Hyderabad | 10 KM Radial Doorstep Repair',
  description: 'Verified doorstep technician squads operating across Ameerpet Main Road, Chanda Nagar, Alwal, and Suchitra. Fast 60-90 min arrival within 10 km radial reach.',
  path: '/service-center/',
  keywords: [
    'service hubs Hyderabad',
    'appliance repair coverage areas Hyderabad',
    'doorstep repair centers Hyderabad',
    'Ameerpet Main Road hub',
    'Chanda Nagar hub',
    'Alwal hub',
    'Suchitra hub',
  ],
});

export default function ServiceCenterHubPage() {
  return <HubsDirectoryView />;
}
