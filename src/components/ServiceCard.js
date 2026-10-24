'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Snowflake,
  Refrigerator,
  WashingMachine,
  Microwave,
  ShowerHead,
  Tv,
  Wrench,
  MapPin,
  CalendarCheck,
} from 'lucide-react';
import { SERVICE_PRICE } from '@/lib/site';
import { useToast } from '@/context/ToastContext';
import FavoriteButton from '@/components/FavoriteButton';
import BookingModal from '@/components/BookingModal';

const icons = {
  snowflake: Snowflake,
  refrigerator: Refrigerator,
  'washing-machine': WashingMachine,
  microwave: Microwave,
  geyser: ShowerHead,
  tv: Tv,
};

export default function ServiceCard({ service, compact = false }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();
  const Icon = icons[service.icon] || Wrench;

  const handleBookClick = () => {
    const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
    if (!user) {
      showToast('Please sign in or register to book a service.', 'info');
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }));
      return;
    }
    setModalOpen(true);
  };

  const handleEnquireClick = (e) => {
    const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
    if (!user) {
      e.preventDefault();
      showToast('Please sign in or register to enquire about services.', 'info');
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }));
    }
  };

  return (
    <>
      <article className={`service-card ${compact ? 'service-card-compact' : ''}`}>
        <div className="service-card-top">
          <span className="service-icon">
            <Icon size={23} strokeWidth={1.8} />
          </span>
          {/* Top Right: Favorite Icon Beside the ₹299 Price Pill */}
          <div className="service-top-actions">
            <FavoriteButton service={service} iconOnly />
            <span className="price-pill">₹{SERVICE_PRICE}</span>
          </div>
        </div>
        <h3>{service.name}</h3>
        <p>{service.short}</p>
        <div className="service-card-meta">
          <span>
            <MapPin size={13} /> Selected Hyderabad areas
          </span>
        </div>
        <div className="service-card-actions">
          <Link className="text-link" href={`/services/${service.slug}/`}>
            Details <ArrowUpRight size={15} />
          </Link>
          <button
            type="button"
            className="button button-small button-book"
            onClick={handleBookClick}
          >
            <CalendarCheck size={14} /> Book
          </button>
          <Link
            className="button button-small button-primary"
            href={`/checkout/?service=${service.slug}`}
            onClick={handleEnquireClick}
          >
            Enquire
          </Link>
        </div>
      </article>

      <BookingModal
        service={service}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
