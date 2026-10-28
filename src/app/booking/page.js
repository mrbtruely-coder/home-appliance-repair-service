import TwoStepBookingFlow from '@/components/TwoStepBookingFlow';
import { SERVICE_PRICE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Book Home Appliance Repair in Hyderabad | Fast 90-Min Dispatch',
  description: 'Book verified doorstep appliance repair in Hyderabad in 2 easy steps. Choose your appliance, enter your area, and get a certified technician at your home in 90 minutes. ₹0 booking fee.',
  path: '/booking/',
  keywords: [
    'book appliance repair Hyderabad',
    'home appliance repair booking Hyderabad',
    'schedule AC repair Hyderabad',
    'book washing machine service Hyderabad',
    'book refrigerator repair Hyderabad',
    'same day appliance repair booking Hyderabad',
    'doorstep technician dispatch Hyderabad',
    'online appliance service booking',
    'urgent home appliance technician Hyderabad',
    'emergency appliance repair booking',
  ],
});

export default function BookingPage() {
  return (
    <main>
      <TwoStepBookingFlow />
    </main>
  );
}
