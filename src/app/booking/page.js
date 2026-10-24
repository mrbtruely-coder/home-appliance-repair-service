import TwoStepBookingFlow from '@/components/TwoStepBookingFlow';
import { SERVICE_PRICE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Book a Home Appliance Repair Service | 2-Step Dispatch Nellore',
  description: 'Easy 2-step home appliance repair dispatch in Nellore. Tap your appliance, enter your details and get a certified technician at your doorstep within 90 minutes.',
  path: '/booking/',
  keywords: ['book appliance repair Nellore', 'home appliance repair booking Nellore', 'fast appliance dispatch Nellore'],
});

export default function BookingPage() {
  return (
    <main>
      <TwoStepBookingFlow />
    </main>
  );
}
