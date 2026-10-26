import { AREAS } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import ServiceCenterDetailView from '@/components/ServiceCenterDetailView';

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = AREAS.find((item) => item.slug === slug);
  if (!area) return { title: 'Location Not Found' };

  return pageMetadata({
    title: `Home Appliance Repair in ${area.name}, Hyderabad | Doorstep Service`,
    description: `Fast doorstep appliance repair in ${area.name}, Hyderabad. Certified technicians arrive in 90 minutes for AC, fridge, washing machine, and TV repairs with 90-day warranty.`,
    path: `/locations/${area.slug}/`,
    keywords: [
      `Hyderabad appliance repair ${area.name}`,
      `AC repair in ${area.name} Hyderabad`,
      `washing machine repair ${area.name} Hyderabad`,
      `refrigerator service ${area.name} Hyderabad`,
      `doorstep appliance technician ${area.name}`,
      'Hyderabad home appliance repair',
    ],
  });
}

export default async function LocationDetailPage({ params }) {
  const { slug } = await params;
  const area = AREAS.find((item) => item.slug === slug);
  return <ServiceCenterDetailView area={area} />;
}
