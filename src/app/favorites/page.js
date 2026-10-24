import FavoritesClient from '@/components/FavoritesClient';
import { pageMetadata } from '@/lib/seo';

const seo = pageMetadata({
  title: 'Your Saved Favorite Services | Doorstep Home Appliance Services',
  description: 'View your favorite and bookmarked home appliance repair services for quick booking and enquiries in Hyderabad.',
  path: '/favorites/',
});

export const metadata = { ...seo, robots: { index: false, follow: true } };

export default function FavoritesPage() {
  return <FavoritesClient />;
}
