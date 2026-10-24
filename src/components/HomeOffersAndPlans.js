'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Crown, ArrowRight } from 'lucide-react';
import { MEMBERSHIP_PLANS, CATEGORY_OFFERS } from '@/lib/plansData';
import AuthModal from '@/components/AuthModal';
import { useToast } from '@/context/ToastContext';

export default function HomeOffersAndPlans() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { showToast } = useToast();

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

  const handleBuyVIP = () => {
    const vipPlan = MEMBERSHIP_PLANS[0]; // Doorstep VIP Care
    if (!user) {
      setAuthModalOpen(true);
      showToast('Please sign in to get your VIP membership', 'info');
    } else {
      try {
        const activeSub = {
          planSlug: vipPlan.slug,
          planName: vipPlan.name,
          price: vipPlan.price,
          duration: vipPlan.duration,
          discountPercent: vipPlan.discountPercent,
          activatedAt: new Date().toISOString(),
          status: 'Active',
        };
        localStorage.setItem('doorstep-membership', JSON.stringify(activeSub));
        showToast(`🎉 Congratulations! Doorstep VIP Membership activated!`, 'success');
      } catch {}
    }
  };

  return (
    <div className="home-offers-plans-container" id="exclusive-offers">
      {/* =========================================================================
          VIP MEMBERSHIP SHOWCASE (Reference Layout Matching Screenshot Exactly)
          ========================================================================= */}
      <section className="vip-banner-wrapper">
        <div className="container">
          <div className="vip-section-header">
            <div>
              <span className="eyebrow">MEMBERSHIP PRIVILEGES</span>
              <h2>Doorstep VIP Membership</h2>
              <p>Enjoy exclusive savings, 2 free annual visits, and express technician dispatch across Hyderabad.</p>
            </div>
            <Link href="/plans/" className="text-link">
              View All Plans <ArrowRight size={15} />
            </Link>
          </div>

          <div className="vip-banner-card">
            {/* Left/Middle 4 Benefit Cards */}
            <div className="vip-banner-benefits-row">
              <div className="vip-mini-perk">
                <span className="perk-kicker">EXTRA</span>
                <h4>15% DISCOUNT</h4>
                <p>On all doorstep appliance services</p>
                <div className="perk-footer-badge">
                  <span>⚡ Instant Savings</span>
                </div>
              </div>

              <div className="vip-mini-perk">
                <span className="perk-kicker">FLAT</span>
                <h4>2 FREE VISITS</h4>
                <p>Annual preventative health checkups</p>
                <div className="perk-footer-badge">
                  <span>🛠️ ₹598 Value</span>
                </div>
              </div>

              <div className="vip-mini-perk">
                <span className="perk-kicker">FAST</span>
                <h4>EXPRESS DISPATCH</h4>
                <p>90-min priority slot booking</p>
                <div className="perk-footer-badge">
                  <span>📍 Hyderabad Wide</span>
                </div>
              </div>

              <div className="vip-mini-perk">
                <span className="perk-kicker">UP TO</span>
                <h4>15% OFF SPARES</h4>
                <p>On genuine brand spare parts</p>
                <div className="perk-footer-badge">
                  <span>🛡️ 60-Day Warranty</span>
                </div>
              </div>
            </div>

            {/* Right Dark Card Showcase (VIP Membership Buy Box) */}
            <div className="vip-hero-buy-box">
              <div className="vip-crown-mark">
                <Crown size={22} className="crown-icon" />
                <span className="vip-gold-tag">VIP</span>
              </div>
              <span className="vip-box-label">DOORSTEP VIP MEMBERSHIP</span>
              <div className="vip-price-display">
                <strong>₹199</strong>
                <span className="vip-old-price">₹499</span>
                <small>for 6 months</small>
              </div>
              <div className="vip-btn-row">
                <button
                  type="button"
                  className="vip-buy-btn"
                  onClick={handleBuyVIP}
                >
                  BUY NOW
                </button>
                <Link href="/plans/basic-care/" className="vip-know-more">
                  Know More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OFFERS FOR YOU (Category Cards Carousel)
          ========================================================================= */}
      <section className="section-offers-for-you">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SAVINGS AT YOUR DOORSTEP</span>
              <h2>Offers for you</h2>
              <p>Exclusive deals on AC, Refrigerator, Washing Machine and home repair services.</p>
            </div>
            <Link className="text-link" href="/services/">
              All services <ArrowRight size={15} />
            </Link>
          </div>

          <div className="category-offers-carousel">
            {/* VIP Promo Ticket Card */}
            <div className="offer-ticket-card vip-ticket-black">
              <div className="ticket-body">
                <div className="ticket-header-pill">VIP MEMBERSHIP</div>
                <h3>Save upto 15% off on Home Services</h3>
                <p>Special member rates across all appliances</p>
                <button
                  type="button"
                  className="ticket-cta-btn"
                  onClick={handleBuyVIP}
                >
                  Buy Now
                </button>
              </div>
              <div className="ticket-art-icon">
                <div className="gold-v-badge">V✦</div>
              </div>
            </div>

            {/* Configured Service Deals */}
            {CATEGORY_OFFERS.map((offer) => (
              <div key={offer.id} className={`offer-ticket-card theme-${offer.bgTheme}`}>
                <div className="ticket-body">
                  <div className="ticket-tag">{offer.tag}</div>
                  <h4>{offer.discount}</h4>
                  <p className="ticket-title">{offer.title}</p>
                  <small className="ticket-cond">{offer.condition}</small>
                  <Link href={`/services/${offer.serviceSlug}/`} className="ticket-explore-btn">
                    Explore Offer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Modal Trigger for unauthenticated users */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode="login"
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
