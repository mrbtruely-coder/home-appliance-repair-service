import { AREAS } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import ServiceCenterDetailView from '@/components/ServiceCenterDetailView';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return AREAS.map((area) => ({
    city: area.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const city = AREAS.find((a) => a.slug === citySlug);

  if (!city) {
    return pageMetadata({
      title: 'Service Location Not Found',
      description: 'The requested service location could not be found.',
      path: `/${citySlug}/`,
    });
  }

  return pageMetadata({
    title: `Home Appliance Repair in ${city.name} | Doorstep Service (10 KM Radius)`,
    description: `Official doorstep appliance service center in ${city.name}. Certified technicians arrive in 60-90 minutes. Call 9515661677.`,
    path: `/${city.slug}/`,
    keywords: [
      `home appliance repair in ${city.name}`,
      `doorstep appliance service ${city.name}`,
      `appliance service center ${city.name}`,
      `AC repair in ${city.name}`,
      `refrigerator repair ${city.name}`,
      `washing machine repair ${city.name}`,
      `microwave oven repair ${city.name}`,
      `geyser repair ${city.name}`,
      `TV repair service ${city.name}`,
      `same day appliance technician ${city.name}`,
    ],
  });
}

export default async function CityOverviewPage({ params }) {
  const { city: citySlug } = await params;
  const city = AREAS.find((a) => a.slug === citySlug);

  if (!city) {
    notFound();
  }

  return <ServiceCenterDetailView area={city} />;
}
