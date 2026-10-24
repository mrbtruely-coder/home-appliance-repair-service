'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { WHATSAPP_URL, PHONE_E164, PHONE_DISPLAY } from '@/lib/site';

export default function WhatsAppFloat() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const message = encodeURIComponent(
    'Hello Doorstep Service Hyderabad, I would like to book a home appliance repair.'
  );

  return (
    <div className="doorstep-floating-stack" aria-label="Quick contact buttons">
      <a
        className="floating-btn floating-phone-btn"
        href={`tel:${PHONE_E164}`}
        aria-label={`Call Doorstep Service at ${PHONE_DISPLAY}`}
        title={`Call ${PHONE_DISPLAY}`}
      >
        <Phone size={22} strokeWidth={2.4} />
      </a>

      <a
        className="floating-btn floating-whatsapp-btn"
        href={`${WHATSAPP_URL}?text=${message}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Start a WhatsApp conversation with Doorstep Service Hyderabad"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} strokeWidth={2.4} />
      </a>

      {showTopBtn && (
        <button
          type="button"
          className="floating-btn floating-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll back to top of page"
          title="Back to Top"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
