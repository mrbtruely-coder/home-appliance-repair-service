'use client';
import { useState, useEffect } from 'react';
import { MessageSquarePlus, X, Star, Send, CheckCircle2 } from 'lucide-react';

export default function FloatingFeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('AC Service & Repair');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-floating-feedback', handleOpen);
    return () => window.removeEventListener('open-floating-feedback', handleOpen);
  }, []);

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
      window.dispatchEvent(new Event('doorstep-feedback-updated'));
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setName('');
      setPhone('');
      setComment('');
    }, 2000);
  };

  return (
    <>
      {/* Floating Trigger Pill on bottom left */}
      <div className="floating-feedback-container">
        <button
          type="button"
          className="floating-feedback-pill"
          onClick={() => setIsOpen(true)}
          aria-label="Give Feedback"
        >
          <div className="feedback-pill-icon">
            <MessageSquarePlus size={19} />
          </div>
          <div className="feedback-pill-text">
            <span>Feedback</span>
          </div>
          <div className="feedback-star-badge">
            <Star size={11} fill="#f59e0b" color="#f59e0b" />
            <span>4.9</span>
          </div>
        </button>
      </div>

      {/* Floating Card Popup Centered in Page */}
      {isOpen && (
        <div className="floating-feedback-backdrop" onClick={() => setIsOpen(false)}>
          <div
            className="floating-feedback-card floating-feedback-centered animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="floating-feedback-header">
              <div>
                <span className="eyebrow" style={{ color: '#0752D5', fontSize: '10px', fontWeight: '800' }}>
                  SHARE YOUR EXPERIENCE
                </span>
                <h3 style={{ fontSize: '22px', color: '#071B4D', fontWeight: '800', margin: '2px 0 0' }}>
                  Customer Feedback
                </h3>
              </div>
              <button
                type="button"
                className="floating-feedback-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close feedback card"
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ color: '#64748b', fontSize: '12px', margin: '8px 0 14px', lineHeight: '1.4' }}>
              Rate your service experience with Doorstep Home Appliance Services.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                <CheckCircle2 size={46} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', color: '#071B4D', marginBottom: '6px' }}>
                  Thank You!
                </h4>
                <p style={{ color: '#475569', fontSize: '13px' }}>
                  Your review has been successfully submitted.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="floating-feedback-form">
                {/* Rating Stars */}
                <div className="feedback-field-group">
                  <label>Overall Rating</label>
                  <div className="feedback-stars-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className="star-btn"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star
                          size={24}
                          fill={(hoverRating || rating) >= star ? '#f59e0b' : 'none'}
                          color={(hoverRating || rating) >= star ? '#f59e0b' : '#cbd5e1'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Appliance Service Select */}
                <div className="feedback-field-group">
                  <label>Appliance Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="feedback-input"
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
                <div className="feedback-row-two">
                  <div className="feedback-field-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Reddy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="feedback-input"
                    />
                  </div>
                  <div className="feedback-field-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="feedback-input"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div className="feedback-field-group">
                  <label>Your Review / Experience *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share your thoughts about technician promptness, service quality, pricing, etc..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="feedback-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Submit CTA */}
                <button type="submit" className="button button-primary feedback-submit-btn">
                  <Send size={15} /> Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
