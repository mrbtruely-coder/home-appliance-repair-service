'use client';
import { useState, useEffect } from 'react';
import { Star, BadgeCheck, MessageSquarePlus } from 'lucide-react';

export default function HomeFeedbackSection() {
  const [reviews, setReviews] = useState([]);

  const loadFeedback = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('doorstep-feedback') || '[]');
      setReviews(stored);
    } catch {}
  };

  useEffect(() => {
    loadFeedback();
    window.addEventListener('doorstep-feedback-updated', loadFeedback);
    return () => window.removeEventListener('doorstep-feedback-updated', loadFeedback);
  }, []);

  const handleOpenFloating = () => {
    window.dispatchEvent(new Event('open-floating-feedback'));
  };

  return (
    <>
      <section className="section reviews-section">
        <div className="container reviews-empty">
          <span className="review-icon">
            <Star size={22} />
          </span>
          <div>
            <span className="eyebrow">CUSTOMER FEEDBACK</span>
            <h2>Real experiences matter.</h2>
            <p>
              We take pride in delivering honest, reliable doorstep repairs across Hyderabad.
              Share your genuine experience or suggestions with us.
            </p>
            <button
              type="button"
              className="text-link"
              onClick={handleOpenFloating}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: '700',
                color: '#FF6B00',
                fontSize: '15px',
                marginTop: '10px',
              }}
            >
              Share feedback <MessageSquarePlus size={16} />
            </button>
          </div>
          <div className="review-checklist">
            <span>
              <BadgeCheck size={16} /> Verified customer
            </span>
            <span>
              <BadgeCheck size={16} /> Real service experience
            </span>
            <span>
              <BadgeCheck size={16} /> Published with permission
            </span>
          </div>
        </div>

        {/* Display real user reviews when available */}
        {reviews.length > 0 && (
          <div className="container" style={{ marginTop: '24px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
              }}
            >
              {reviews.slice(0, 3).map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 16px rgba(7, 27, 77, 0.04)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          fill={i < rev.rating ? '#f59e0b' : 'none'}
                          color={i < rev.rating ? '#f59e0b' : '#cbd5e1'}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{rev.date}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#334155', fontStyle: 'italic', marginBottom: '12px', lineHeight: '1.5' }}>
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '13px', color: '#071B4D' }}>{rev.name}</strong>
                    <span style={{ fontSize: '11px', background: '#eff6ff', color: '#1d4ed8', padding: '3px 8px', borderRadius: '6px' }}>
                      {rev.service}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
