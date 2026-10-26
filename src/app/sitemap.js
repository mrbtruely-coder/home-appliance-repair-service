
import { SITE_URL, SERVICES, AREAS } from '@/lib/site';
import { ARTICLES } from '@/lib/articles';
import { MEMBERSHIP_PLANS } from '@/lib/plansData';

export const dynamic = 'force-static';

export default function sitemap() {
  const staticRoutes = [
    '',
    '/services/',
    '/locations/',
    '/booking/',
    '/about/',
    '/faqs/',
    '/contact/',
    '/search/',
    '/plans/',
    '/app/',
    '/privacy-policy/',
    '/terms/',
    '/cancellation-policy/',
    '/help-center/',
    '/articles/',
  ];

  const serviceRoutes = SERVICES.map((service) => `/services/${service.slug}/`);
  const locationRoutes = AREAS.map((area) => `/locations/${area.slug}/`);
  const articleRoutes = ARTICLES.map((article) => `/articles/${article.slug}/`);
  const planRoutes = MEMBERSHIP_PLANS.map((plan) => `/plans/${plan.slug}/`);

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...articleRoutes,
    ...planRoutes,
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority:
      route === ''
        ? 1
        : route.startsWith('/services/') || route.startsWith('/plans/')
          ? 0.8
          : 0.6,
  }));
}
