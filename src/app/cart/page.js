import CartClient from '@/components/CartClient';
import { pageMetadata } from '@/lib/seo';
const seo = pageMetadata({
  title: 'Your Service Cart | Doorstep Home Appliance Services',
  description: 'Review selected home appliance services, discover related services and continue to a service enquiry in Hyderabad.',
  path: '/cart/',
});
export const metadata = { ...seo, robots: { index: false, follow: true } };
export default function CartPage() { return <CartClient />; }
