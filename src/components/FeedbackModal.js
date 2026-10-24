'use client';
import { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2, X } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('AC Service & Repair');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const feedbackItem = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      service,
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('doorstep-feedback') || '[]');
      existing.unshift(feedbackItem);
      localStorage.setItem('doorstep-feedback', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-card"
        style={{ maxWidth: '520px', width: '92%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="auth-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle2 size={54} color="#16a34a" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '22px', color: '#071B4D', marginBottom: '8px' }}>
              Thank You for Your Feedback!
            </h3>
            <p style={{ color: '#475569', fontSize: '14px' }}>
              Your review has been successfully submitted and helps us improve our doorstep services.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <span className="eyebrow" style={{ color: '#0752D5', fontSize: '11px', fontWeight: '800' }}>
                SHARE YOUR EXPERIENCE
              </span>
              <h2 style={{ fontSize: '24px', color: '#071B4D', marginTop: '6px', fontWeight: '800' }}>
                Customer Feedback
              </h2>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>
                Rate your service experience with Doorstep Home Appliance Services.
              </p>
            </div>

            {/* Star Rating Selector */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Overall Rating
              </label>
              <div style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease',
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    aria-label={`${star} star`}
                  >
                    <Star
                      size={28}
                      fill={(hoverRating || rating) >= star ? '#f59e0b' : 'none'}
                      color={(hoverRating || rating) >= star ? '#f59e0b' : '#cbd5e1'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Service selector */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Appliance Service
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  color: '#1e293b',
                  backgroundColor: '#fff',
                }}
              >
                <option value="AC Service & Repair">AC Service & Repair</option>
                <option value="Refrigerator Repair">Refrigerator Repair</option>
                <option value="Washing Machine Repair">Washing Machine Repair</option>
                <option value="Microwave & Oven Repair">Microwave & Oven Repair</option>
                <option value="Geyser Repair">Geyser Repair</option>
                <option value="TV Repair">TV Repair</option>
                <option value="Other Appliance Service">Other Appliance Service</option>
              </select>
            </div>

            {/* Name & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>

            {/* Feedback Comment */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Your Review / Experience *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Share your thoughts about technician promptness, service quality, pricing, etc..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              className="button button-primary"
              style={{
                width: '100%',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: '700',
              }}
            >
              <Send size={16} /> Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
