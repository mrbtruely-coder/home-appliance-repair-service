import TwoStepBookingFlow from '@/components/TwoStepBookingFlow';
import { SERVICE_PRICE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const area = params?.area;
  const appliance = params?.appliance || params?.service;

  if (area || appliance) {
    const label = [appliance, area].filter(Boolean).join(' in ');
    return pageMetadata({
      title: `Book ${label ? `${label}, ` : ''}Hyderabad | Doorstep Service`,
      description: `Fast 2-step booking for ${label || 'home appliance repairs'} in Hyderabad. Certified technician arrives in 90 minutes. ₹0 booking fee with genuine spare parts.`,
      path: `/booking/${area ? `?area=${encodeURIComponent(area)}` : ''}`,
      keywords: [
        `book appliance repair ${area || 'Hyderabad'}`,
        `doorstep technician ${area || 'Hyderabad'}`,
        `schedule AC repair ${area || 'Hyderabad'}`,
        `book washing machine service ${area || 'Hyderabad'}`,
        `book refrigerator repair ${area || 'Hyderabad'}`,
        'same day appliance repair booking Hyderabad',
      ],
    });
  }

  return pageMetadata({
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
    ],
  });
}

export default function BookingPage() {
  return (
    <main>
      <TwoStepBookingFlow />
    </main>
  );
}
