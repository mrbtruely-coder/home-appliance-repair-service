'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bell, UserRound, LogOut, ChevronDown, Smartphone } from 'lucide-react';
import { AppleIcon, GooglePlayIcon } from '@/components/AppStoreIcons';
import { PLAY_STORE_URL, APP_STORE_URL } from '@/lib/site';
import AuthModal from '@/components/AuthModal';

export function AccountLinks() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('doorstep-user') || 'null'));
    } catch {}
    const fn = () => {
      try {
        setUser(JSON.parse(localStorage.getItem('doorstep-user') || 'null'));
      } catch {}
    };
    window.addEventListener('doorstep-auth-change', fn);
    window.addEventListener('storage', fn);
    return () => {
      window.removeEventListener('doorstep-auth-change', fn);
      window.removeEventListener('storage', fn);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('doorstep-user');
    setUser(null);
    setOpen(false);
    window.dispatchEvent(new Event('doorstep-auth-change'));
  };

  return (
    <>
      <div className="account-wrap">
        {user ? (
          <>
            <button className="account-button" onClick={() => setOpen(!open)}>
              <span className="account-avatar">
                {(user.name || 'U').slice(0, 1).toUpperCase()}
              </span>
              <span className="account-name">
                Hi, {(user.name || 'there').split(' ')[0]}
              </span>
              <ChevronDown size={14} />
            </button>
            {open && (
              <div className="account-dropdown">
                <Link href="/notifications/" onClick={() => setOpen(false)}>
                  <Bell size={16} /> Notifications
                </Link>
                <Link href="/cart/" onClick={() => setOpen(false)}>
                  <UserRound size={16} /> My service cart
                </Link>
                <Link href="/favorites/" onClick={() => setOpen(false)}>
                  <UserRound size={16} /> Saved favorites
                </Link>
                <button onClick={logout}>
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            className="login-link header-login-trigger-btn"
            onClick={() => {
              setAuthMode('login');
              setAuthModalOpen(true);
            }}
          >
            <UserRound size={17} /> <span>Login</span>
          </button>
        )}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}

export function AppPromotion() {
  return (
    <section className="app-promo-section">
      <div className="container app-promo">
        <div className="app-promo-copy">
          <span className="eyebrow">DOORSTEP ON THE GO</span>
          <h2>Your home services, one tap away.</h2>
          <p>
            Get to service enquiries, booking details and support from a mobile-friendly experience.
            Our app download links can be added here once the Android and iOS apps are published.
          </p>
          <div className="app-promo-actions">
            <a
              className="app-badge-btn"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Download Doorstep Hub on Apple App Store"
            >
              <AppleIcon size={24} />
              <div className="app-badge-text">
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </a>

            <a
              className="app-badge-btn"
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Get Doorstep Hub on Google Play Store"
            >
              <GooglePlayIcon size={22} />
              <div className="app-badge-text">
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </div>
            </a>

            <Link className="button button-ghost" href="/services/">
              Explore services
            </Link>
          </div>
        </div>
        <div className="phone-mockup" aria-label="Preview of the Doorstep mobile experience">
          <div className="phone-notch" />
          <div className="phone-screen">
            <span className="phone-brand">
              D<span>.</span> Doorstep
            </span>
            <p>What needs a fix today?</p>
            <div className="phone-search">⌕ Search services</div>
            <div className="phone-tile-row">
              <span>
                ❄️<small>AC</small>
              </span>
              <span>
                🧊<small>Fridge</small>
              </span>
              <span>
                🫧<small>Washer</small>
              </span>
            </div>
            <div className="phone-offer-mini">
              <small>START YOUR ENQUIRY</small>
              <strong>Services from ₹299</strong>
            </div>
            <div className="phone-nav-mini">
              <span>⌂</span>
              <span>▦</span>
              <span>♙</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MemberOffers() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('doorstep-user') || 'null'));
    } catch {}
    const fn = () => {
      try {
        setUser(JSON.parse(localStorage.getItem('doorstep-user') || 'null'));
      } catch {}
    };
    window.addEventListener('doorstep-auth-change', fn);
    return () => window.removeEventListener('doorstep-auth-change', fn);
  }, []);
  if (!user) return null;
  return (
    <section className="section-white">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MEMBER BENEFITS</span>
            <h2>Offers for you, {user.name?.split(' ')[0] || 'there'}</h2>
            <p>Member offers are shown here when available. Terms and eligibility should be confirmed before purchase.</p>
          </div>
          <Link className="text-link" href="/services/">
            View services ↗
          </Link>
        </div>
        <div className="offer-grid">
          <article className="offer-card offer-vip">
            <span className="offer-kicker">VIP MEMBERSHIP</span>
            <h3>Save up to 15% on eligible home services</h3>
            <p>Membership benefits, when activated, will be shown with full terms.</p>
            <Link className="button button-secondary" href="/services/">
              Explore services
            </Link>
          </article>
          <article className="offer-card offer-blue">
            <span className="offer-kicker">APPLIANCE CARE</span>
            <h3>One place for your service enquiries</h3>
            <p>Keep your appliance and location details ready for faster requests.</p>
            <Link className="button button-ghost" href="/services/">
              Start enquiry
            </Link>
          </article>
          <article className="offer-card offer-gold">
            <span className="offer-kicker">SEASONAL OFFER</span>
            <h3>Check current service offers</h3>
            <p>Only offers confirmed by Doorstep should be considered active.</p>
            <Link className="button button-ghost" href="/contact/">
              Ask about offers
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
