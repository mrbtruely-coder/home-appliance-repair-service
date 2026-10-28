
import { SITE_URL, SERVICES, AREAS } from '@/lib/site';
import { ARTICLES } from '@/lib/articles';
import { MEMBERSHIP_PLANS } from '@/lib/plansData';

export const dynamic = 'force-static';

export default function sitemap() {
  const staticRoutes = [
    '',
    '/services/',
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
  const locationRoutes = AREAS.map((area) => `/${area.slug}/`);
  
  // Include all sub-area and category pages for major hubs for industry-level SEO coverage
  const subAreaRoutes = [];
  const hubCities = AREAS.filter((a) => a.slug === 'hyderabad' || a.slug === 'secunderabad');
  
  function slugify(text) {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/\(.*?\)/g, '')
      .replace(/&/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  hubCities.forEach((city) => {
    const colonies = city.colonies || city.landmarks || [];
    colonies.forEach((col) => {
      const subSlug = slugify(col);
      if (!subSlug || subSlug === 'other-location') return;
      subAreaRoutes.push(`/${city.slug}/${subSlug}/`);
      
      SERVICES.forEach((service) => {
        subAreaRoutes.push(`/${city.slug}/${subSlug}/${service.slug}/`);
      });
    });
  });

  const articleRoutes = ARTICLES.map((article) => `/articles/${article.slug}/`);
  const planRoutes = MEMBERSHIP_PLANS.map((plan) => `/plans/${plan.slug}/`);

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...subAreaRoutes,
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
