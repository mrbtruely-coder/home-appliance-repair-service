'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MapPin, ShoppingBag, Trash2, Wrench } from 'lucide-react';
import { SERVICES, SERVICE_PRICE } from '@/lib/site';
import ServiceCard from '@/components/ServiceCard';
import { useToast } from '@/context/ToastContext';

export default function CartClient() {
  const [items, setItems] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const read = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('doorstep-cart') || '[]');
        const favItems = JSON.parse(localStorage.getItem('doorstep-favorites') || '[]');
        // Merge both into a single list without duplicate service slugs
        const mergedMap = new Map();
        favItems.forEach((f) => mergedMap.set(f.slug, { slug: f.slug, isFav: true }));
        cartItems.forEach((c) => {
          if (!mergedMap.has(c.slug)) {
            mergedMap.set(c.slug, { slug: c.slug, isCart: true });
          }
        });
        setItems(Array.from(mergedMap.values()));
      } catch {
        setItems([]);
      }
    };
    read();
    window.addEventListener('doorstep-cart-change', read);
    window.addEventListener('doorstep-favorites-change', read);
    window.addEventListener('storage', read);
    return () => {
      window.removeEventListener('doorstep-cart-change', read);
      window.removeEventListener('doorstep-favorites-change', read);
      window.removeEventListener('storage', read);
    };
  }, []);

  const selected = useMemo(
    () => items.map((item) => SERVICES.find((service) => service.slug === item.slug)).filter(Boolean),
    [items]
  );

  const recommendations = useMemo(
    () => SERVICES.filter((service) => !selected.some((item) => item.slug === service.slug)).slice(0, 3),
    [selected]
  );

  const remove = (slug, serviceName) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('doorstep-cart') || '[]').filter((i) => i.slug !== slug);
      const favItems = JSON.parse(localStorage.getItem('doorstep-favorites') || '[]').filter((i) => i.slug !== slug);
      localStorage.setItem('doorstep-cart', JSON.stringify(cartItems));
      localStorage.setItem('doorstep-favorites', JSON.stringify(favItems));
      window.dispatchEvent(new Event('doorstep-cart-change'));
      window.dispatchEvent(new Event('doorstep-favorites-change'));
      showToast(`${serviceName || 'Service'} removed`, 'info');
    } catch {}
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Saved & cart services</span>
          </div>
          <div className="page-heading">
            <span className="eyebrow">YOUR SELECTED SERVICES</span>
            <h1>Saved & cart services</h1>
            <p>
              Review your favorite and shortlisted appliance services, discover related services, and continue to booking or enquiry.
              Nothing is booked or charged until the team confirms the details.
            </p>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container cart-layout">
          <div className="cart-main">
            {selected.length ? (
              <div className="cart-items">
                <div className="cart-section-title">
                  <div>
                    <h2>Your services</h2>
                    <p>
                      {selected.length} {selected.length === 1 ? 'service' : 'services'} selected
                    </p>
                  </div>
                  <Link className="text-link" href="/services/">
                    Browse all services
                  </Link>
                </div>
                {selected.map((service) => (
                  <article className="cart-item" key={service.slug}>
                    <div className="cart-item-icon">
                      <Wrench size={22} />
                    </div>
                    <div className="cart-item-info">
                      <h3>{service.name}</h3>
                      <p>{service.short}</p>
                      <Link href={`/services/${service.slug}/`}>View service details</Link>
                    </div>
                    <div className="cart-item-price">
                      <strong>₹{SERVICE_PRICE}</strong>
                      <small>displayed price</small>
                      <button
                        onClick={() => remove(service.slug, service.name)}
                        aria-label={`Remove ${service.name}`}
                      >
                        <Trash2 size={15} /> Remove
                      </button>
                    </div>
                  </article>
                ))}
                <div className="cart-subtotal">
                  <span>Displayed total</span>
                  <strong>₹{selected.length * SERVICE_PRICE}</strong>
                </div>
                <p className="cart-price-note">
                  This is a displayed estimate based on the selected service count, not a final quote or payment request.
                  Confirm service scope, parts and any additional charges before approving work.
                </p>
                <Link
                  className="button button-primary cart-checkout"
                  href={`/checkout/?service=${selected[0].slug}`}
                >
                  Continue to enquiry <ArrowRight size={17} />
                </Link>
                <p className="cart-checkout-note">
                  The current enquiry form processes one service at a time. For multiple services, mention the
                  additional services in the issue/details field or send a separate enquiry for each.
                </p>
              </div>
            ) : (
              <div className="cart-empty">
                <span className="cart-empty-icon">
                  <ShoppingBag size={29} />
                </span>
                <h2>Your service cart is empty</h2>
                <p>Choose a service that you need, then come back here to review it and discover related services.</p>
                <Link className="button button-primary" href="/services/">
                  Explore services <ArrowRight size={16} />
                </Link>
              </div>
            )}
            <div className="cart-assurance">
              <span>
                <CheckCircle2 size={17} /> No payment collected here
              </span>
              <span>
                <MapPin size={17} /> Hyderabad areas listed
              </span>
              <span>
                <CheckCircle2 size={17} /> Confirm before work begins
              </span>
            </div>
          </div>
          <aside className="cart-side">
            <span className="eyebrow">NEED A HAND?</span>
            <h2>Not sure which service to choose?</h2>
            <p>Check the detailed service page, common issues and service-specific FAQs before sending your enquiry.</p>
            <Link className="button button-ghost" href="/help-center/">
              Visit Help Center <ArrowRight size={15} />
            </Link>
            <div className="aside-divider" />
            <h3>Service availability</h3>
            <p>
              Coverage is listed for Ameerpet Main Road, Chanda Nagar, Alwal and Suchitra. Your exact address and
              appointment slot need confirmation.
            </p>
            <Link href="/hyderabad/" className="text-link">
              Check service areas →
            </Link>
          </aside>
        </div>
      </section>

      <section className="section-white cart-related">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOU MAY ALSO NEED</span>
              <h2>{selected.length ? 'Similar services to consider' : 'Popular services to get started'}</h2>
              <p>
                {selected.length
                  ? 'Add another appliance service to your cart or open its detail page to learn more.'
                  : 'Explore a service category and add it to your cart when you are ready.'}
              </p>
            </div>
            <Link className="text-link" href="/services/">
              View all services →
            </Link>
          </div>
          <div className="service-grid">
            {recommendations.map((service) => (
              <ServiceCard key={service.slug} service={service} compact />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
