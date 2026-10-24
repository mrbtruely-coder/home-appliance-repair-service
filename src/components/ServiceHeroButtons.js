'use client';
import { useState } from 'react';
import { CalendarCheck, ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';
import { useToast } from '@/context/ToastContext';
import { SERVICE_PRICE, PHONE_E164, PHONE_DISPLAY } from '@/lib/site';

export default function ServiceHeroButtons({ service, offer }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

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
      <div className="hero-actions service-hero-actions-enhanced">
        <button
          type="button"
          className="button button-primary hero-instant-book-btn"
          onClick={handleBookClick}
        >
          <CalendarCheck size={18} /> Book Service (₹{SERVICE_PRICE})
        </button>
        <Link
          className="button button-secondary"
          href={`/checkout/?service=${service.slug}`}
          onClick={handleEnquireClick}
        >
          Enquire for ₹{SERVICE_PRICE} <ArrowRight size={17} />
        </Link>
        <a className="button button-ghost" href={`tel:${PHONE_E164}`}>
          <Phone size={16} /> Call {PHONE_DISPLAY}
        </a>
      </div>

      <BookingModal
        service={service}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
