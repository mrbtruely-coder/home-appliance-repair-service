'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items }) {
  const [expanded, setExpanded] = useState([0]);
  return <div className="faq-list">{items.map((item, i) => {
    const isOpen = expanded.includes(i);
    return <section className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
      <h3><button aria-expanded={isOpen} onClick={() => setExpanded(prev => isOpen ? prev.filter(n => n !== i) : [...prev, i])}>{item.q}<ChevronDown size={19} /></button></h3>
      {isOpen && <p>{item.a}</p>}
    </section>;
  })}</div>;
}
