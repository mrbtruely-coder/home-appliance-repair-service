'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Check,
  Crown,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Wrench,
  CheckCircle2,
  Lock,
  Phone,
  Clock,
  Zap,
} from 'lucide-react';
import { SERVICES, AREAS } from '@/lib/site';
import AuthModal from '@/components/AuthModal';
import FAQAccordion from '@/components/FAQAccordion';
import { useToast } from '@/context/ToastContext';

export default function PlanDetailClient({ plan }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
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

  const handleActivate = () => {
    if (!user) {
      setAuthModalOpen(true);
      showToast('Please sign in or create an account to proceed with activation', 'info');
      return;
    }
    if (!termsAccepted) {
      alert('Please check the box to agree to the membership terms & conditions.');
      return;
    }

    try {
      const activeSub = {
        planSlug: plan.slug,
        planName: plan.name,
        price: plan.price,
        duration: plan.duration,
        discountPercent: plan.discountPercent,
        activatedAt: new Date().toISOString(),
        userPhone: user.phone,
        status: 'Active',
      };
      localStorage.setItem('doorstep-membership', JSON.stringify(activeSub));
      setIsActivated(true);
      showToast(`Success! Your ${plan.name} is now active.`, 'success');
    } catch {
      alert('Could not complete activation. Please try again.');
    }
  };

  return (
    <>
      {/* Plan Hero Banner */}
      <section className="plan-detail-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/plans/">Plans</Link>
            <span>/</span>
            <span>{plan.name}</span>
          </div>

          <div className="plan-hero-inner-grid">
            <div className="plan-hero-main">
              <span className="eyebrow" style={{ color: '#FFD995' }}>
                <Crown size={15} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                OFFICIAL DOORSTEP MEMBERSHIP
              </span>
              <h1>{plan.name}</h1>
              <p className="plan-hero-tagline">{plan.tagline}</p>
              <p className="plan-hero-desc">{plan.fullDesc}</p>

              <div className="plan-hero-highlights">
                <div className="hero-highlight-pill">
                  <Check size={16} /> <strong>{plan.discountPercent}% Off</strong> Service Labor
                </div>
                <div className="hero-highlight-pill">
                  <Clock size={16} /> <strong>{plan.duration}</strong> Active Validity
                </div>
                <div className="hero-highlight-pill">
                  <Sparkles size={16} /> <strong>{plan.savingsEstimate}</strong> Potential Savings
                </div>
              </div>
            </div>

            {/* Quick Sticky Purchase / Pricing Summary Card */}
            <div className="plan-hero-checkout-card">
              <div className="checkout-card-head">
                <span className="plan-label">{plan.duration.toUpperCase()} PASS</span>
                <div className="checkout-price-block">
                  <strong>₹{plan.price}</strong>
                  <span className="original-striked">₹{plan.originalPrice}</span>
                  <small>all-inclusive</small>
                </div>
              </div>

              {isActivated ? (
                <div className="plan-activated-box">
                  <CheckCircle2 size={42} className="success-icon" />
                  <h4>Membership Active!</h4>
                  <p>
                    Your plan is now linked to <strong>{user?.phone}</strong>. Member discounts will automatically
                    be applied to all your service bookings.
                  </p>
                  <Link href="/services/" className="button button-primary" style={{ width: '100%', marginTop: 10 }}>
                    Book a Service Now
                  </Link>
                </div>
              ) : (
                <div className="checkout-action-box">
                  <div className="checkout-guarantee-line">
                    <ShieldCheck size={16} /> 100% Satisfaction or 7-Day Refund Guarantee
                  </div>

                  <label className="terms-checkbox-label">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <span>
                      I agree to the plan terms, cancellation guidelines & service conditions.
                    </span>
                  </label>

                  <button
                    type="button"
                    className="button button-primary plan-purchase-btn"
                    onClick={handleActivate}
                  >
                    {user ? 'Activate Membership Now' : 'Sign in to Get This Plan'}
                  </button>

                  <p className="checkout-security-sub">
                    <Lock size={12} /> Secure activation · No hidden charges · Single billing
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="page-content">
        <div className="container plan-detail-body-layout">
          <div className="plan-body-main">
            {/* Complete Benefits List */}
            <div className="plan-section-card">
              <span className="eyebrow">WHAT YOU GET</span>
              <h2>Included Membership Benefits</h2>
              <p>Everything bundled with your {plan.name} subscription:</p>

              <div className="detailed-benefits-grid">
                {plan.includedBenefits.map((benefit, idx) => (
                  <div key={idx} className="benefit-detail-item">
                    <div className="benefit-icon-box">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligible Services Grid */}
            <div className="plan-section-card">
              <span className="eyebrow">COVERAGE</span>
              <h2>Eligible Household Appliances</h2>
              <p>Your {plan.discountPercent}% membership discount applies to all listed categories:</p>

              <div className="plan-eligible-services-grid">
                {SERVICES.map((s) => (
                  <Link href={`/services/${s.slug}/`} key={s.slug} className="eligible-service-item">
                    <div className="eligible-icon-wrap">
                      <Wrench size={18} />
                    </div>
                    <div>
                      <strong>{s.name}</strong>
                      <small>Standard ₹299 → ₹{Math.round(299 * (1 - plan.discountPercent / 100))}</small>
                    </div>
                    <ArrowRight size={15} className="arrow-muted" />
                  </Link>
                ))}
              </div>
            </div>

            {/* How It Works (4 Steps) */}
            <div className="plan-section-card">
              <span className="eyebrow">EASY PROCESS</span>
              <h2>How Your Membership Works</h2>
              <div className="how-it-works-steps">
                <div className="step-block">
                  <span className="step-num">1</span>
                  <strong>Choose & Activate</strong>
                  <p>Select {plan.name} and activate it with your 10-digit mobile number.</p>
                </div>
                <div className="step-block">
                  <span className="step-num">2</span>
                  <strong>Book Any Appliance</strong>
                  <p>Browse AC, Refrigerator, Washer or TV services across Hyderabad.</p>
                </div>
                <div className="step-block">
                  <span className="step-num">3</span>
                  <strong>Instant Discount</strong>
                  <p>Your {plan.discountPercent}% member rate is automatically applied to your invoice.</p>
                </div>
                <div className="step-block">
                  <span className="step-num">4</span>
                  <strong>Certified Repair</strong>
                  <p>Our verified technician visits your doorstep with extended warranty protection.</p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="plan-section-card">
              <span className="eyebrow">TERMS OF USE</span>
              <h2>Plan Specific Terms & Conditions</h2>
              <ul className="plan-terms-list">
                {plan.terms.map((t, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="terms-footer-link">
                Review complete legal policies in our{' '}
                <Link href="/terms/">Terms of Service</Link> and{' '}
                <Link href="/cancellation-policy/">Cancellation & Refund Policy</Link>.
              </p>
            </div>

            {/* Plan-Specific FAQs */}
            <div className="plan-section-card">
              <span className="eyebrow">HAVE QUESTIONS?</span>
              <h2>Frequently Asked Questions</h2>
              <FAQAccordion items={plan.faqs} />
            </div>
          </div>

          {/* Right Aside: Plan Navigation & Quick Support */}
          <aside className="plan-detail-aside">
            <div className="aside-box">
              <h3>Need Help Deciding?</h3>
              <p>Our home care coordinators can explain the best plan for your appliance models.</p>
              <a href="tel:+919515661677" className="button button-ghost" style={{ width: '100%', marginBottom: 10 }}>
                <Phone size={15} /> Call 9515661677
              </a>
              <Link href="/plans/" className="text-link">
                ← Compare all membership tiers
              </Link>
            </div>

            <div className="aside-box aside-covered-areas">
              <h3>Covered Hyderabad Hubs</h3>
              <p>Technician priority dispatch is currently active in:</p>
              <ul>
                {AREAS.map((a) => (
                  <li key={a.slug}>
                    <Check size={14} /> {a.name}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Auth Modal if unauthenticated */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode="login"
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
