import TwoStepBookingFlow from '@/components/TwoStepBookingFlow';
import { SERVICE_PRICE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Book a Home Appliance Repair Service | 2-Step Dispatch Hyderabad',
  description: 'Easy 2-step home appliance repair dispatch in Hyderabad. Tap your appliance, enter your details and get a certified technician at your doorstep within 90 minutes.',
  path: '/booking/',
  keywords: ['book appliance repair Hyderabad', 'home appliance repair booking Hyderabad', 'fast appliance dispatch Hyderabad'],
});

export default function BookingPage() {
  return (
    <main>
      <TwoStepBookingFlow />
    </main>
  );
}
