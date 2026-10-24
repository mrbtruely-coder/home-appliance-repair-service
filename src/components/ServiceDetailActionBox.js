'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Tag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
} from 'lucide-react';
import BookingModal from '@/components/BookingModal';
import { useToast } from '@/context/ToastContext';
import { SERVICE_PRICE, PHONE_E164, PHONE_DISPLAY } from '@/lib/site';

export default function ServiceDetailActionBox({ service, offer }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleBookInspection = () => {
    const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
    if (!user) {
      showToast('Please sign in or register to book an inspection.', 'info');
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }));
      return;
    }
    setModalOpen(true);
  };

  const handleEnquiryClick = (e) => {
    const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
    if (!user) {
      e.preventDefault();
      showToast('Please sign in or register to send a service enquiry.', 'info');
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }));
    }
  };

  return (
    <>
      <div className="service-detail-booking-card">
        {/* Active Offer Banner Badge if available */}
        {offer && (
          <div className="service-active-offer-ribbon">
            <div className="offer-ribbon-badge">
              <Sparkles size={14} /> ACTIVE DEAL
            </div>
            <div className="offer-ribbon-content">
              <strong>{offer.discount}: {offer.title}</strong>
              <small>{offer.desc}</small>
            </div>
          </div>
        )}

        {/* Pricing display with offer notice */}
        <div className="service-card-price-headline">
          <div>
            <span className="price-tag-sub">Standard Inspection Fee</span>
            <div className="detail-price-big">
              <strong>₹{SERVICE_PRICE}</strong>
              {offer && <span className="offer-discount-chip">{offer.discount}</span>}
            </div>
          </div>
          <span className="guarantee-pill">
            <ShieldCheck size={14} /> Pay After Fix
          </span>
        </div>

        <p className="booking-card-desc">
          Certified technician assigned to your doorstep in 90 minutes. Transparent pricing & genuine spare parts.
        </p>

        {/* Instant Book CTA */}
        <div className="service-detail-btn-stack">
          <button
            type="button"
            className="button button-primary book-instant-hero-btn"
            onClick={handleBookInspection}
          >
            <CalendarCheck size={18} /> Book Inspection Now
          </button>

          <Link
            className="button button-ghost"
            href={`/checkout/?service=${service.slug}`}
            onClick={handleEnquiryClick}
          >
            Send Service Enquiry <ArrowRight size={15} />
          </Link>
        </div>

        {/* Quick Offer Callout in Aside */}
        <div className="applicable-coupons-snippet">
          <span className="coupon-snippet-label">
            <Tag size={12} /> Applicable Coupons at Booking:
          </span>
          <div className="coupon-mini-pills">
            <span className="coupon-chip" onClick={() => setModalOpen(true)}>
              <code>DOORSTEP50</code> (Flat ₹50 Off)
            </span>
            <span className="coupon-chip" onClick={() => setModalOpen(true)}>
              <code>FIRSTCARE</code> (10% Off)
            </span>
          </div>
        </div>

        <div className="aside-divider" />

        <div className="detail-meta-points">
          <p className="service-area-inline">
            <MapPin size={15} /> Ameerpet · Chanda Nagar · Alwal · Suchitra
          </p>
          <p className="service-area-inline">
            <Clock size={15} /> Instant slot confirmation: Morning, Afternoon, Evening
          </p>
          <a className="call-support-link" href={`tel:${PHONE_E164}`}>
            <Phone size={14} /> Need phone assistance? Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Booking Modal with Slots, Offers, & Payment Mode */}
      <BookingModal
        service={service}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
