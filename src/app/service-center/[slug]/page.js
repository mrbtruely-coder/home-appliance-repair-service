import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Wrench,
} from 'lucide-react';
import { AREAS, SERVICES, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL, SERVICE_PRICE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import ServiceCenterDetailView from '@/components/ServiceCenterDetailView';

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

const AREA_SEO_CONFIG = {
  'ameerpet-main-road': {
    title: 'Home Appliance Repair in Ameerpet Main Road, Hyderabad | Doorstep Service',
    description: 'Need fast home appliance repair in Ameerpet Main Road, SR Nagar, Panjagutta, or Somajiguda? Our certified technician arrives in 90 minutes. We service AC, fridge, washing machine, microwave, and TV with genuine parts and warranty. Call 9515661677.',
    keywords: [
      'Hyderabad appliance repair Ameerpet',
      'AC repair Ameerpet Hyderabad',
      'washing machine service Ameerpet Hyderabad',
      'refrigerator repair Ameerpet Hyderabad',
      'microwave oven repair Ameerpet Hyderabad',
      'geyser repair Ameerpet Hyderabad',
      'smart TV repair Ameerpet Hyderabad',
      'doorstep appliance repair Ameerpet Main Road',
      'same day appliance service Ameerpet Hyderabad',
      'appliance service center Ameerpet Hyderabad',
      'SR Nagar appliance repair Hyderabad',
      'Panjagutta appliance repair Hyderabad',
      'Somajiguda appliance repair Hyderabad',
      'Banjara Hills appliance repair Hyderabad',
      'doorstep service center 500016',
    ],
  },
  'chanda-nagar': {
    title: 'Home Appliance Repair in Chanda Nagar, Hyderabad | Doorstep Service',
    description: 'Trusted doorstep appliance repair in Chanda Nagar, Miyapur, Madinaguda, and BHEL Hyderabad. Fast 90-minute technician visit for AC, refrigerator, washing machine, and TV repairs with affordable pricing and warranty. Call 9515661677.',
    keywords: [
      'Hyderabad appliance repair Chanda Nagar',
      'AC repair Chanda Nagar Hyderabad',
      'washing machine service Chanda Nagar Hyderabad',
      'refrigerator repair Chanda Nagar Hyderabad',
      'microwave oven repair Chanda Nagar Hyderabad',
      'TV repair Chanda Nagar Hyderabad',
      'doorstep technician Chanda Nagar Hyderabad',
      'same day appliance service Chanda Nagar',
      'appliance service center Chanda Nagar Hyderabad',
      'Miyapur appliance repair Hyderabad',
      'Madinaguda appliance repair Hyderabad',
      'BHEL appliance repair Hyderabad',
      'Hafeezpet appliance repair Hyderabad',
      'doorstep service center 500050',
    ],
  },
  'alwal': {
    title: 'Home Appliance Repair in Alwal, Hyderabad | Doorstep Service',
    description: 'Same-day doorstep appliance service in Alwal, Lothkunta, Sainikpuri, and Secunderabad. Verified technicians for AC, washing machine, fridge, geyser, and TV repair with genuine parts and 90-minute arrival. Call 9515661677.',
    keywords: [
      'Hyderabad appliance repair Alwal',
      'AC repair Alwal Hyderabad',
      'washing machine service Alwal Hyderabad',
      'refrigerator repair Alwal Hyderabad',
      'geyser repair Alwal Hyderabad',
      'TV repair Alwal Hyderabad',
      'doorstep technician Alwal Secunderabad',
      'same day appliance repair Alwal',
      'appliance service center Alwal Hyderabad',
      'Lothkunta appliance repair Hyderabad',
      'Sainikpuri appliance repair Hyderabad',
      'Old Alwal appliance repair Hyderabad',
      'Trimulgherry appliance repair Hyderabad',
      'doorstep service center 500010',
    ],
  },
  'suchitra': {
    title: 'Home Appliance Repair in Suchitra Circle, Hyderabad | Doorstep Service',
    description: 'Affordable doorstep appliance repair in Suchitra, Kompally, Jeedimetla, and Quthbullapur Hyderabad. Fast 90-minute technician visit for AC, fridge, washing machine, and microwave repairs with warranty. Call 9515661677.',
    keywords: [
      'Hyderabad appliance repair Suchitra',
      'AC repair Suchitra Hyderabad',
      'washing machine service Suchitra Hyderabad',
      'refrigerator repair Suchitra Hyderabad',
      'microwave oven repair Suchitra Hyderabad',
      'TV repair Suchitra Circle Hyderabad',
      'doorstep technician Suchitra Kompally',
      'same day appliance service Suchitra',
      'appliance service center Suchitra Hyderabad',
      'Kompally appliance repair Hyderabad',
      'Jeedimetla appliance repair Hyderabad',
      'Quthbullapur appliance repair Hyderabad',
      'Bowenpally appliance repair Hyderabad',
      'doorstep service center 500067',
    ],
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = AREAS.find((item) => item.slug === slug);
  if (!area) return { title: 'Service Center Not Found' };

  const customSeo = AREA_SEO_CONFIG[area.slug] || {
    title: `Home Appliance Repair in ${area.name}, Hyderabad | Doorstep Service`,
    description: `Fast doorstep appliance repair in ${area.name}, Hyderabad. Certified technicians arrive in 90 minutes for AC, fridge, washing machine, and TV repairs with 90-day warranty. Call ${PHONE_DISPLAY}.`,
    keywords: [
      `Hyderabad appliance repair ${area.name}`,
      `AC repair in ${area.name} Hyderabad`,
      `washing machine repair ${area.name} Hyderabad`,
      `refrigerator service ${area.name} Hyderabad`,
      `doorstep appliance technician ${area.name}`,
      'Hyderabad home appliance repair',
    ],
  };

  return pageMetadata({
    title: customSeo.title,
    description: customSeo.description,
    path: `/service-center/${area.slug}/`,
    keywords: customSeo.keywords,
  });
}

export default async function ServiceCenterDetailPage({ params }) {
  const { slug } = await params;
  const area = AREAS.find((item) => item.slug === slug);
  return <ServiceCenterDetailView area={area} />;
}
