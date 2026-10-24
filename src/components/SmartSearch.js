'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, ArrowUpRight, X } from 'lucide-react';
import { SERVICES, AREAS } from '@/lib/site';
export default function SmartSearch({ compact = false }) {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('');
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SERVICES.slice(0, 4);
    return SERVICES.filter(s => `${s.name} ${s.short} ${s.concerns.join(' ')}`.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);
  const areaMatches = AREAS.filter(a => !area || a.name.toLowerCase().includes(area.toLowerCase())).slice(0, 4);
  return <div className={`smart-search ${compact ? 'smart-search-compact' : ''}`}>
    <label className="search-field"><Search size={19}/><input aria-label="Search services" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search AC, fridge, washing machine…" autoComplete="off"/><span className="search-shortcut">⌘ K</span>{query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}><X size={16}/></button>}</label>
    <div className="search-suggestions">{matches.length ? matches.map(s => <Link href={`/services/${s.slug}/`} key={s.slug} className="search-suggestion" onClick={() => setQuery('')}><span className="suggestion-icon">⌕</span><span><strong>{s.name}</strong><small>Service enquiry · ₹299</small></span><ArrowUpRight size={16}/></Link>) : <p className="search-empty">No exact match. Try “AC”, “fridge” or “TV”.</p>}</div>
    {!compact && <div className="search-location"><MapPin size={16}/><input aria-label="Filter by service area" value={area} onChange={e => setArea(e.target.value)} placeholder="Choose your Hyderabad area" list="service-areas"/><datalist id="service-areas">{AREAS.map(a => <option key={a.slug} value={a.name}/>)}</datalist><span>{areaMatches.length} areas</span></div>}
  </div>;
}
