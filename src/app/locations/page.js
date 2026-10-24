import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { AREAS } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Service Areas in Hyderabad',
  description: 'See the Hyderabad neighbourhoods listed by Doorstep Home Appliance Services: Ameerpet Main Road, Chanda Nagar, Alwal and Suchitra. Confirm exact address coverage before booking.',
  path: '/locations/',
  keywords: ['appliance repair service areas Hyderabad', 'home appliance repair near me Hyderabad'],
});

export default function LocationsPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Locations</span></div><div className="page-heading"><span className="eyebrow">WHERE WE TAKE ENQUIRIES</span><h1>Service areas in Hyderabad</h1><p>These neighbourhoods are listed for service enquiries. Coverage can vary by exact address and appointment availability, so please confirm before booking.</p></div></div></section>
    <section className="page-content"><div className="container"><div className="area-grid">{AREAS.map(area => <Link className="area-card" key={area.slug} href={`/locations/${area.slug}/`}><span className="area-pin"><MapPin size={19}/></span><strong>{area.name}</strong><small>{area.description}</small><span className="text-link">View location <ArrowUpRight size={14}/></span></Link>)}</div></div></section>
  </>;
}
