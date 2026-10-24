'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ArrowRight, Wrench, CalendarCheck } from 'lucide-react';
import { SERVICES, SERVICE_PRICE } from '@/lib/site';
import BookingModal from '@/components/BookingModal';
import { useToast } from '@/context/ToastContext';

export default function FavoritesClient() {
  const [favorites, setFavorites] = useState([]);
  const [activeBookingService, setActiveBookingService] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const read = () => {
      try {
        setFavorites(JSON.parse(localStorage.getItem('doorstep-favorites') || '[]'));
      } catch {
        setFavorites([]);
      }
    };
    read();
    window.addEventListener('doorstep-favorites-change', read);
    window.addEventListener('storage', read);
    return () => {
      window.removeEventListener('doorstep-favorites-change', read);
      window.removeEventListener('storage', read);
    };
  }, []);

  const selected = useMemo(
    () =>
      favorites
        .map((item) => SERVICES.find((service) => service.slug === item.slug))
        .filter(Boolean),
    [favorites]
  );

  const remove = (slug, serviceName) => {
    const next = favorites.filter((item) => item.slug !== slug);
    localStorage.setItem('doorstep-favorites', JSON.stringify(next));
    setFavorites(next);
    window.dispatchEvent(new Event('doorstep-favorites-change'));
    showToast(`${serviceName || 'Service'} removed from favorites`, 'info');
  };

  const handleBook = (service) => {
    const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
    if (!user) {
      showToast('Please sign in or register to book a service.', 'info');
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }));
      return;
    }
    setActiveBookingService(service);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Saved Favorites</span>
          </div>
          <div className="page-heading">
            <span className="eyebrow">YOUR SHORTLIST</span>
            <h1>Saved favorite services</h1>
            <p>
              Keep your frequently needed appliance repair services handy. Quickly book an inspection or send an enquiry whenever you need doorstep assistance.
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
                    <h2>Favorite Services ({selected.length})</h2>
                    <p>All items saved for quick access</p>
                  </div>
                  <Link className="text-link" href="/services/">
                    Browse all services
                  </Link>
                </div>

                {selected.map((service) => (
                  <article className="cart-item" key={service.slug}>
                    <div className="cart-item-icon" style={{ background: '#FEF2F2', color: '#EF4444' }}>
                      <Heart size={22} fill="#EF4444" color="#EF4444" />
                    </div>
                    <div className="cart-item-info">
                      <h3>{service.name}</h3>
                      <p>{service.short}</p>
                      <Link href={`/services/${service.slug}/`}>View service details</Link>
                    </div>
                    <div className="cart-item-price">
                      <strong>₹{SERVICE_PRICE}</strong>
                      <small>standard fee</small>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        <button
                          type="button"
                          className="button button-small button-book"
                          onClick={() => handleBook(service)}
                          style={{ minHeight: '34px', padding: '0 12px' }}
                        >
                          <CalendarCheck size={14} /> Book
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(service.slug, service.name)}
                          aria-label={`Remove ${service.name}`}
                          title="Remove from favorites"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="cart-empty">
                <div className="cart-empty-icon" style={{ background: '#FEF2F2', color: '#EF4444' }}>
                  <Heart size={34} />
                </div>
                <h2>No saved services yet</h2>
                <p>
                  Click the heart icon beside the ₹299 price tag on any service card to bookmark services you frequently need.
                </p>
                <Link className="button button-primary" href="/services/">
                  Browse services <ArrowRight size={17} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Booking modal */}
      {activeBookingService && (
        <BookingModal
          service={activeBookingService}
          isOpen={!!activeBookingService}
          onClose={() => setActiveBookingService(null)}
        />
      )}
    </>
  );
}
