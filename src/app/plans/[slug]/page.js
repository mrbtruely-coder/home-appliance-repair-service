import { notFound } from 'next/navigation';
import { MEMBERSHIP_PLANS } from '@/lib/plansData';
import { pageMetadata } from '@/lib/seo';
import PlanDetailClient from '@/components/PlanDetailClient';

export function generateStaticParams() {
  return MEMBERSHIP_PLANS.map((plan) => ({ slug: plan.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const plan = MEMBERSHIP_PLANS.find((p) => p.slug === slug);
  if (!plan) return { title: 'Plan Not Found' };

  return pageMetadata({
    title: `${plan.name} | Doorstep Appliance Services`,
    description: `${plan.name}: ${plan.tagline}. Enjoy ${plan.discountPercent}% off on AC, Refrigerator, and Washing machine repairs in Hyderabad.`,
    path: `/plans/${plan.slug}/`,
    keywords: [
      `${plan.name} Hyderabad`,
      'home appliance membership Hyderabad',
      'appliance service AMC Hyderabad',
      'doorstep repair discounts',
    ],
  });
}

export default async function PlanDetailPage({ params }) {
  const { slug } = await params;
  const plan = MEMBERSHIP_PLANS.find((p) => p.slug === slug);

  if (!plan) {
    notFound();
  }

  return <PlanDetailClient plan={plan} />;
}
