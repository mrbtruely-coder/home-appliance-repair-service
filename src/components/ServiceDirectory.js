'use client';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, MapPin, X, ArrowUpDown } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { AREAS, SERVICES, SERVICE_PRICE } from '@/lib/site';

const CATEGORIES = [...new Set(SERVICES.map((service) => service.category))];

export default function ServiceDirectory() {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('recommended');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = SERVICES.filter((service) => {
      const matchesText = !q || `${service.name} ${service.short} ${service.concerns.join(' ')} ${service.category}`.toLowerCase().includes(q);
      const matchesCategory = category === 'all' || service.category === category;
      return matchesText && matchesCategory;
    });
    return [...result].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'price-low') return SERVICE_PRICE - SERVICE_PRICE || a.name.localeCompare(b.name);
      if (sort === 'price-high') return SERVICE_PRICE - SERVICE_PRICE || a.name.localeCompare(b.name);
      return SERVICES.findIndex((item) => item.slug === a.slug) - SERVICES.findIndex((item) => item.slug === b.slug);
    });
  }, [query, category, sort]);
  const reset = () => { setQuery(''); setArea(''); setCategory('all'); setSort('recommended'); };
  return <>
    <div className="service-filters">
      <label className="service-filter-search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search appliance, category or problem" aria-label="Search services" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</label>
      <label className="service-filter-select"><SlidersHorizontal size={16} /><select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by service category"><option value="all">All categories</option>{CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      <label className="service-filter-select"><MapPin size={16} /><select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filter by location"><option value="">All listed areas</option>{AREAS.map((item) => <option key={item.slug} value={item.name}>{item.name}</option>)}</select></label>
      <label className="service-filter-select"><ArrowUpDown size={16} /><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort services"><option value="recommended">Recommended</option><option value="name">Name: A–Z</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
      {(query || area || category !== 'all' || sort !== 'recommended') && <button type="button" className="filter-reset" onClick={reset}>Reset filters</button>}
    </div>
    <div className="category-chip-row" aria-label="Browse service categories"><button type="button" className={category === 'all' ? 'category-chip active' : 'category-chip'} onClick={() => setCategory('all')}>All services</button>{CATEGORIES.map((item) => <button type="button" key={item} className={category === item ? 'category-chip active' : 'category-chip'} onClick={() => setCategory(item)}>{item}</button>)}</div>
    {area && <p className="filter-area-note"><MapPin size={14} /> Showing services listed for <strong>{area}</strong>. Exact-address coverage and appointment availability must be confirmed.</p>}
    <div className="filter-results-line"><span>{filtered.length} {filtered.length === 1 ? 'service' : 'services'} found</span><span>Displayed service price: ₹{SERVICE_PRICE} each · Category-related services shown together</span></div>
    {filtered.length ? <><div className="service-grid">{filtered.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>{category !== 'all' && <section className="category-related-block"><span className="eyebrow">CATEGORY GUIDE</span><h2>Explore {category.toLowerCase()} services</h2><p>Compare the service details, common issues, preferred slots and FAQs before sending an enquiry. All listed services display ₹{SERVICE_PRICE}; confirm the exact scope and any extra charges with the team.</p><div className="category-related-links">{filtered.map((service) => <a key={service.slug} href={`/services/${service.slug}/`}>{service.name} details →</a>)}</div></section>}</> : <div className="service-empty"><Search size={25} /><h2>No matching service found</h2><p>Try a different appliance name or clear your filters.</p><button type="button" className="button button-primary" onClick={reset}>Clear filters</button></div>}
  </>;
}
