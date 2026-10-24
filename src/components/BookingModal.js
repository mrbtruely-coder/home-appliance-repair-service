'use client';
import { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Tag,
  CreditCard,
  MapPin,
  CheckCircle,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { AREAS, SERVICE_PRICE } from '@/lib/site';

const SLOTS = [
  { id: 'morning', label: 'Morning', time: '9:00 AM – 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM – 3:00 PM' },
  { id: 'evening', label: 'Evening', time: '3:00 PM – 6:00 PM' },
];

const OFFERS = [
  { code: 'DOORSTEP50', title: '₹50 Flat Off', discount: 50, desc: 'Special welcome discount for doorstep repair' },
  { code: 'FIRSTCARE', title: '10% Discount', percent: 10, desc: '10% off on inspection & service fee' },
];

const PAYMENT_MODES = [
  { id: 'Pay on Service (Cash/UPI)', label: 'Pay After Service', desc: 'Pay technician directly via Cash or UPI' },
  { id: 'UPI / Online Preview', label: 'UPI / QR Code', desc: 'Scan and pay when engineer arrives' },
  { id: 'Card on Arrival', label: 'Card Payment', desc: 'Card swipe machine subject to availability' },
];

export default function BookingModal({ service, isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [slot, setSlot] = useState(SLOTS[0].label + ' (' + SLOTS[0].time + ')');
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [paymentMode, setPaymentMode] = useState(PAYMENT_MODES[0].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('doorstep-area') || AREAS[0]?.name || '';
    }
    return AREAS[0]?.name || '';
  });
  const [address, setAddress] = useState('');
  const [issue, setIssue] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    if (isOpen) {
      const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
      if (user) {
        if (user.name) setName(user.name);
        if (user.phone) setPhone(user.phone);
      }
    }
  }, [isOpen]);

  if (!isOpen || !service) return null;

  // Calculation (Clean price without GST as requested)
  const basePrice = SERVICE_PRICE;
  let discountVal = 0;
  if (appliedOffer) {
    if (appliedOffer.discount) discountVal = appliedOffer.discount;
    else if (appliedOffer.percent) discountVal = Math.round((basePrice * appliedOffer.percent) / 100);
  }
  const total = Math.max(0, basePrice - discountVal);

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    const found = OFFERS.find((o) => o.code === code);
    if (found) {
      setAppliedOffer(found);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedOffer(null);
    setCouponInput('');
    setCouponError('');
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please fill your name and mobile number.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const generatedId = 'DS-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(generatedId);

    // Save booking to local orders history
    try {
      const existing = JSON.parse(localStorage.getItem('doorstep-orders') || '[]');
      const newOrder = {
        id: generatedId,
        service: service.name,
        serviceSlug: service.slug,
        date,
        slot,
        paymentMode,
        total,
        name: name.trim(),
        phone: phone.trim(),
        area,
        address: address.trim(),
        issue: issue.trim(),
        status: 'Confirmed - Technician Assigned',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('doorstep-orders', JSON.stringify([newOrder, ...existing]));
    } catch {}

    // Complete booking directly inside app without WhatsApp redirection
    setIsSuccess(true);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="booking-modal-overlay" onClick={resetAndClose} role="dialog" aria-modal="true">
      <div className="booking-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="booking-modal-header">
          <div>
            <span className="eyebrow" style={{ fontSize: 10, marginBottom: 2 }}>
              INSTANT BOOKING
            </span>
            <h3>Book {service.name}</h3>
          </div>
          <button
            type="button"
            className="booking-modal-close"
            onClick={resetAndClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Progress Steps */}
        {!isSuccess && (
          <div className="booking-steps-nav">
            <button
              type="button"
              className={`booking-step-btn ${step === 1 ? 'active' : ''}`}
              onClick={() => setStep(1)}
            >
              1. Slot & Details
            </button>
            <button
              type="button"
              className={`booking-step-btn ${step === 2 ? 'active' : ''}`}
              onClick={() => {
                if (!name.trim() || !phone.trim()) {
                  alert('Please enter your name and phone number first.');
                  return;
                }
                setStep(2);
              }}
            >
              2. Offers & Payment
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="booking-modal-body">
          {isSuccess ? (
            <div className="booking-success-box">
              <CheckCircle size={56} className="success-icon" />
              <h4>Booking Confirmed!</h4>
              <p>
                Your booking request for <strong>{service.name}</strong> on{' '}
                <strong>
                  {date} ({slot})
                </strong>{' '}
                has been recorded successfully.
              </p>
              <div className="success-meta-card">
                <div>
                  <span>Booking Reference:</span> <strong>{bookingId}</strong>
                </div>
                <div>
                  <span>Customer:</span> <strong>{name} ({phone})</strong>
                </div>
                <div>
                  <span>Area:</span> <strong>{area}</strong>
                </div>
                <div>
                  <span>Payment Mode:</span> <strong>{paymentMode}</strong>
                </div>
                <div>
                  <span>Total Amount:</span> <strong>₹{total.toFixed(2)}</strong>
                </div>
              </div>
              <p className="success-note">
                ✓ Technician assigned. Our service expert will reach your doorstep at the chosen time.
              </p>
              <button
                type="button"
                className="button button-primary"
                style={{ width: '100%', marginTop: 15 }}
                onClick={resetAndClose}
              >
                Close & Return
              </button>
            </div>
          ) : step === 1 ? (
            <div className="modal-step-content">
              {/* Date & Slot selection */}
              <div className="booking-field-group">
                <label className="modal-label">
                  <Calendar size={16} /> Select Preferred Date
                </label>
                <input
                  type="date"
                  className="modal-input"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="booking-field-group">
                <label className="modal-label">
                  <Clock size={16} /> Select Convenient Slot
                </label>
                <div className="slots-grid">
                  {SLOTS.map((s) => {
                    const fullSlot = `${s.label} (${s.time})`;
                    const isSelected = slot === fullSlot;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        className={`slot-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSlot(fullSlot)}
                      >
                        <strong>{s.label}</strong>
                        <small>{s.time}</small>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact information */}
              <div className="booking-field-group">
                <label className="modal-label">Your Details</label>
                <div className="modal-grid-2">
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Your Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    className="modal-input"
                    placeholder="10-digit Mobile Number *"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                  />
                </div>
              </div>

              <div className="booking-field-group">
                <label className="modal-label">
                  <MapPin size={16} /> Location / Area
                </label>
                <select
                  className="modal-input"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  {AREAS.map((a) => (
                    <option key={a.slug} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="modal-input"
                  style={{ marginTop: 8 }}
                  placeholder="Complete Address / Flat / Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="booking-field-group">
                <label className="modal-label">Issue Description</label>
                <textarea
                  className="modal-input modal-textarea"
                  rows={2}
                  placeholder="e.g. Not cooling, making noise, water leak..."
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="button button-primary modal-action-btn"
                onClick={() => {
                  if (!name.trim() || !phone.trim()) {
                    alert('Please enter your full name and 10-digit mobile number.');
                    return;
                  }
                  if (!/^[6-9]\d{9}$/.test(phone.trim())) {
                    alert('Please enter a valid 10-digit mobile number.');
                    return;
                  }
                  setStep(2);
                }}
              >
                Proceed to Offers & Payment →
              </button>
            </div>
          ) : (
            <div className="modal-step-content">
              {/* Offers Section */}
              <div className="booking-field-group">
                <label className="modal-label">
                  <Sparkles size={16} color="#D97706" /> Available Offers & Coupons
                </label>
                <div className="offers-list">
                  {OFFERS.map((off) => {
                    const isApplied = appliedOffer?.code === off.code;
                    return (
                      <div
                        key={off.code}
                        className={`offer-item ${isApplied ? 'applied' : ''}`}
                      >
                        <div>
                          <div className="offer-code-pill">
                            <Tag size={13} /> {off.code}
                          </div>
                          <p className="offer-desc">{off.desc}</p>
                        </div>
                        {isApplied ? (
                          <button
                            type="button"
                            className="offer-btn-remove"
                            onClick={handleRemoveCoupon}
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="offer-btn-apply"
                            onClick={() => handleApplyCoupon(off.code)}
                          >
                            Apply
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="coupon-custom-input">
                  <input
                    type="text"
                    className="modal-input coupon-text"
                    placeholder="Enter Coupon Code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => handleApplyCoupon()}
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="form-error" style={{ margin: '5px 0' }}>{couponError}</p>}
              </div>

              {/* Payment Mode Selection */}
              <div className="booking-field-group">
                <label className="modal-label">
                  <CreditCard size={16} /> Select Payment Mode
                </label>
                <div className="payment-options">
                  {PAYMENT_MODES.map((pm) => (
                    <label
                      key={pm.id}
                      className={`payment-option-card ${paymentMode === pm.id ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMode"
                        value={pm.id}
                        checked={paymentMode === pm.id}
                        onChange={(e) => setPaymentMode(e.target.value)}
                      />
                      <div>
                        <strong>{pm.label}</strong>
                        <small>{pm.desc}</small>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="modal-summary-card">
                <div className="summary-row">
                  <span>Standard Service Price</span>
                  <span>₹{basePrice.toFixed(2)}</span>
                </div>
                {appliedOffer && (
                  <div className="summary-row discount-row">
                    <span>Discount ({appliedOffer.code})</span>
                    <span>-₹{discountVal.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-divider" />
                <div className="summary-row total-row">
                  <strong>Total Amount</strong>
                  <strong>₹{total.toFixed(2)}</strong>
                </div>
              </div>

              <div className="modal-btn-row">
                <button
                  type="button"
                  className="button button-ghost"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="button button-primary"
                  style={{ flex: 1 }}
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking <CheckCircle size={17} />
                </button>
              </div>

              <p className="modal-privacy-note">
                <ShieldCheck size={14} /> Doorstep verified technician. Pay directly after service completion.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
