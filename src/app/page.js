'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Award,
  Wrench,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Star,
  Users,
  Smile,
  Zap,
  Snowflake,
  Refrigerator,
  WashingMachine,
  Microwave,
  ShowerHead,
  Tv,
  ArrowRight,
  Smartphone,
  QrCode,
  Tag,
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL, SERVICES, PLAY_STORE_URL, APP_STORE_URL } from '@/lib/site';
import { AppleIcon, GooglePlayIcon } from '@/components/AppStoreIcons';
import DoorStepLogo from '@/components/DoorStepLogo';

const ALL_APPLIANCES_LIST = [
  {
    slug: 'ac-repair',
    name: 'AC Service & Repair',
    desc: 'Deep jet cleaning, gas charging, cooling issues & installation.',
    icon: Snowflake,
    price: '₹299',
  },
  {
    slug: 'refrigerator-repair',
    name: 'Refrigerator Service',
    desc: 'Single & double door cooling repairs, compressor & gas recharge.',
    icon: Refrigerator,
    price: '₹299',
  },
  {
    slug: 'washing-machine-repair',
    name: 'Washing Machine Repair',
    desc: 'Front & top load drum, drainage, spin motor & board repairs.',
    icon: WashingMachine,
    price: '₹299',
  },
  {
    slug: 'oven-microwave-repair',
    name: 'Oven & Microwave Repair',
    desc: 'Heating failure, control keypad repair, magnetron & spark check.',
    icon: Microwave,
    price: '₹299',
  },
  {
    slug: 'geyser-repair',
    name: 'Geyser & Water Heater',
    desc: 'Thermostat replacement, water leakage & heating element fix.',
    icon: ShowerHead,
    price: '₹299',
  },
  {
    slug: 'tv-repair',
    name: 'LED & Smart TV Repair',
    desc: 'Screen backlight, sound issues, motherboard & power supply.',
    icon: Tv,
    price: '₹299',
  },
];

const STATS = [
  { value: '15k+', label: 'REPAIRS COMPLETED' },
  { value: '98%', label: 'HAPPY CUSTOMERS' },
  { value: '24/7', label: 'DISPATCH SUPPORT' },
  { value: '100%', label: 'ON-TIME ARRIVAL' },
];

const STANDARDS = [
  {
    icon: Zap,
    title: 'Speedy Arrival',
    desc: 'Fast local dispatch reaching your doorstep in 90 minutes with full diagnostic gear ready to inspect.',
  },
  {
    icon: Award,
    title: 'Performance First',
    desc: 'High-precision repair standards with OEM original spares restoring optimal peak appliance performance.',
  },
  {
    icon: ShieldCheck,
    title: 'Affordable Pricing',
    desc: 'Clear diagnostic estimate before any work starts. No hidden costs or surprise surcharges on final bill.',
  },
  {
    icon: Users,
    title: 'Certified Technicians',
    desc: 'Background-verified, skilled engineers with extensive multi-brand repair experience across all models.',
  },
  {
    icon: Clock,
    title: 'Same-Day Resolution',
    desc: 'Over 85% of breakdown complaints fixed on first visit right at your home without removing your unit.',
  },
  {
    icon: ShieldCheck,
    title: '90-Day Warranty Protection',
    desc: 'Every repair is backed by our official 90-day doorstep service warranty with zero hassle.',
  },
];

const JOURNEY_STEPS = [
  {
    num: '01',
    step: 'STEP 1',
    title: 'Easy Booking',
    desc: 'Select your appliance and preferred time slot online or with a quick call in 60 seconds.',
  },
  {
    num: '02',
    step: 'STEP 2',
    title: 'Doorstep Arrival',
    desc: 'Our certified local technician reaches your home within 90 minutes with full diagnostic tools.',
  },
  {
    num: '03',
    step: 'STEP 3',
    title: 'Inspection & Quote',
    desc: 'Transparent diagnosis with upfront price estimation before any work starts.',
  },
  {
    num: '04',
    step: 'STEP 4',
    title: 'Expert Repair & Bill',
    desc: 'Resolved accurately on-site with genuine spare parts and 90-day warranty slip.',
  },
];

const CLIENT_REVIEWS = [
  {
    id: 1,
    name: 'Suresh Rao',
    location: 'Tadepalle, Vijayawada',
    service: 'Washing Machine & Refrigerator Repair',
    rating: 5,
    text: 'My front load washing machine was making severe rattling sounds and leaking water. Within 45 minutes of booking, Suresh Sharma arrived with replacement shock absorbers. Fast, polite, reasonable price and replaced with 100% genuine parts and tested the spin cycle thoroughly. Super professional and reliable!',
    verified: true,
  },
  {
    id: 2,
    name: 'Ravi Kumar K',
    location: 'Brodipet, Guntur',
    service: 'Double Door Refrigerator Cooling',
    rating: 5,
    text: 'Their technician arrived within 50 minutes of booking. My LG double-door refrigerator was not cooling and he replaced the sensor right away with genuine parts. Clean, polite, and very reasonable pricing. Highly recommended!',
    verified: true,
  },
  {
    id: 3,
    name: 'Sravani Reddy',
    location: 'Magunta Layout, Nellore',
    service: 'Split AC Deep Jet Cleaning & Gas',
    rating: 5,
    text: 'Booked service for split AC cooling issue and jet cleaning. The engineer diagnosed worn-out capacitor and fixed it in an hour. Very professional and polite doorstep service.',
    verified: true,
  },
];

const LOCAL_FAQS = [
  {
    q: 'How fast can a technician reach my home in Vijayawada, Guntur or Nellore?',
    a: 'Our dispatch team assigns the nearest verified technician in Vijayawada, Guntur, or Nellore to arrive at your doorstep within 90 minutes of booking.',
  },
  {
    q: 'Which locations do you currently serve?',
    a: 'We provide doorstep repair services across Vijayawada, Guntur, and Nellore.',
  },
  {
    q: 'What appliances do you repair at doorstep?',
    a: 'We specialize in AC, Refrigerator, Washing Machine, Microwave Oven, Geyser, and Smart TV repairs of all major brands.',
  },
  {
    q: 'How much does the inspection / service cost?',
    a: 'Initial booking and diagnostics start at just ₹299. The technician inspects the unit thoroughly and provides a transparent quote before any repair work starts.',
  },
  {
    q: 'Is there a warranty on repairs and spare parts?',
    a: 'Yes, all our doorstep repair jobs and genuine spare parts come with an official 90-day service warranty.',
  },
  {
    q: 'Can I call directly or chat on WhatsApp to book?',
    a: 'Absolutely! You can call our helpline directly at 9515661677 or click the WhatsApp button for instant support.',
  },
];

export default function NewHomePage() {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % CLIENT_REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length);
  };

  const currentReview = CLIENT_REVIEWS[activeReviewIdx];

  return (
    <div className="home-layout-clean">
      {/* =========================================================================
          1. HERO SECTION (Matching user reference layout exactly)
          ========================================================================= */}
      <section className="clean-hero-section">
        <div className="container clean-hero-container">
          {/* Left Column: Visual with Technician Image */}
          <div className="clean-hero-visual-col">
            <div className="technician-card-frame">
              <img
                src="/hero-technician.jpg"
                alt="Expert Doorstep Technician servicing appliance in Hyderabad"
                className="technician-frame-img"
              />
            </div>
          </div>

          {/* Right Column: Hero Headline, Key Highlights & Dual CTAs */}
          <div className="clean-hero-content-col">
            <div className="hero-pill-badge">
              <span className="pill-dot" />
              <span>Verified Local Appliance Technicians</span>
            </div>

            <h1 className="hero-clean-title">
              Easy Doorstep Repair <br />
              <span className="title-orange-bold">Oven, TV, AC, Fridge &amp; <br />Washer</span>
            </h1>

            <p className="hero-clean-desc">
              Fast, professional technicians at your doorstep in 90 minutes. Transparent diagnostics &amp; 90–day warranty.
            </p>

            {/* 3 Metric Cards Row */}
            <div className="hero-metrics-grid">
              <div className="metric-box">
                <Clock size={18} className="metric-icon" />
                <div className="metric-text">
                  <strong>90 Min</strong>
                  <small>Doorstep Arrival</small>
                </div>
              </div>

              <div className="metric-box">
                <ShieldCheck size={18} className="metric-icon" />
                <div className="metric-text">
                  <strong>100%</strong>
                  <small>Genuine Parts</small>
                </div>
              </div>

              <div className="metric-box">
                <Award size={18} className="metric-icon" />
                <div className="metric-text">
                  <strong>90–Day</strong>
                  <small>Service Warranty</small>
                </div>
              </div>
            </div>

            {/* Dual Action CTA Buttons */}
            <div className="hero-btn-action-row">
              <a href={`tel:${PHONE_E164}`} className="button hero-call-navy-btn">
                <Phone size={16} /> Call Expert: {PHONE_DISPLAY}
              </a>
              <Link href="/booking/" className="button hero-book-orange-btn">
                <span>Book Service Online</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. STATS BAR (11+ Years, 9+ Techs, 3/7 Support, 11k Served)
          ========================================================================= */}
      <section className="stats-strip-section">
        <div className="container stats-strip-grid">
          {STATS.map((s, idx) => (
            <div key={idx} className="stat-item-cell">
              <span className="stat-large-num">{s.value}</span>
              <span className="stat-muted-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. STANDARDS SECTION (Redefining Appliance Service Standards)
          ========================================================================= */}
      <section className="section-white standards-section">
        <div className="container">
          <div className="section-center-header">
            <span className="section-kicker-pill">WHY CHOOSE US</span>
            <h2 className="section-clean-heading">Redefining Appliance Service Standards</h2>
            <p className="section-clean-sub">
              Verified local engineers equipped with diagnostic equipment across Vijayawada, Guntur and Nellore with fixed pricing, transparent terms, and guaranteed satisfaction.
            </p>
          </div>

          <div className="standards-grid-6">
            {STANDARDS.map((std, i) => {
              const IconComp = std.icon;
              return (
                <div key={i} className="standard-feature-card">
                  <div className="standard-icon-circle">
                    <IconComp size={22} />
                  </div>
                  <h3>{std.title}</h3>
                  <p>{std.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SEAMLESS JOURNEY (Our Simple & Seamless Journey - 4 Steps)
          ========================================================================= */}
      <section className="section journey-section">
        <div className="container">
          <div className="section-center-header">
            <span className="section-kicker-pill">HOW IT WORKS</span>
            <h2 className="section-clean-heading">Our Simple &amp; Seamless Journey</h2>
            <p className="section-clean-sub">
              From booking to completion, your doorstep service is effortless and transparent.
            </p>
          </div>

          <div className="journey-steps-grid">
            {JOURNEY_STEPS.map((js, index) => (
              <div key={index} className="journey-step-card">
                <div className="journey-step-num-bubble">
                  <span>{js.num}</span>
                </div>
                <h4>{js.title}</h4>
                <p>{js.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. INDUSTRY-LEVEL MOBILE APP DOWNLOAD SHOWCASE (Matching User Reference Image)
          ========================================================================= */}
      <section className="section-white app-download-banner-section" id="app-download">
        <div className="container">
          <div className="app-download-card-wrapper">
            {/* Left Column: Pill, Title, Desc, 2x2 Features, App Store Buttons, Rating */}
            <div className="app-download-left-col">
              <div className="app-ref-kicker">
                <Smartphone size={14} className="kicker-phone-icon" />
                <span>DOORSTEP REPAIR MOBILE APP</span>
              </div>

              <h2 className="app-ref-title">
                Download Our App on <br />
                <span className="app-store-orange-text">iOS App Store</span> &amp; <span className="google-play-orange-text">Google Play</span>
              </h2>

              <p className="app-ref-desc">
                Book appliance technicians in 60 seconds, track their doorstep arrival in real time on the live map, receive instant digital quotes, and access your 90–day warranty certificates anytime.
              </p>

              {/* 2x2 Feature Checklist Grid */}
              <div className="app-features-grid-2x2">
                <div className="app-feature-cell">
                  <CheckCircle2 size={16} className="feature-check-orange" />
                  <span>Live GPS Technician Tracker</span>
                </div>
                <div className="app-feature-cell">
                  <CheckCircle2 size={16} className="feature-check-orange" />
                  <span>Instant Digital Bill &amp; Warranty</span>
                </div>
                <div className="app-feature-cell">
                  <CheckCircle2 size={16} className="feature-check-orange" />
                  <span>Priority 60–Min Doorstep Arrival</span>
                </div>
                <div className="app-feature-cell feature-discount-cell">
                  <Tag size={16} className="feature-tag-orange" />
                  <span className="discount-orange-text">Flat ₹100 OFF on 1st App Order</span>
                </div>
              </div>

              {/* App Store Download Badges */}
              <div className="app-store-badges-row">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-badge-card"
                  title="Download on Apple App Store"
                >
                  <AppleIcon size={24} />
                  <div className="store-badge-text">
                    <small>DOWNLOAD ON THE</small>
                    <strong>App Store</strong>
                  </div>
                </a>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-badge-card"
                  title="Get it on Google Play"
                >
                  <GooglePlayIcon size={20} />
                  <div className="store-badge-text">
                    <small>GET IT ON</small>
                    <strong>Google Play</strong>
                  </div>
                </a>
              </div>

              {/* Social Rating */}
              <div className="app-social-rating-line">
                <div className="stars-gold-cluster">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#FACC15" color="#FACC15" />
                  ))}
                </div>
                <span className="rating-label-white">
                  <strong>4.9/5</strong> &nbsp;•&nbsp; 15,000+ Verified Homeowners in AP
                </span>
              </div>
            </div>

            {/* Right Column: Floating Live Status Card from Reference Screenshot */}
            <div className="app-download-right-visual">
              <div className="app-floating-status-card">
                {/* Live Service Status Header */}
                <div className="status-card-header">
                  <div className="live-status-pill">
                    <span className="live-green-pulse" />
                    <strong>Live Service Status</strong>
                  </div>
                  <span className="in-progress-badge">IN PROGRESS</span>
                </div>

                {/* Technician Assigned Box */}
                <div className="tech-assigned-panel">
                  <div className="tech-assigned-profile">
                    <div className="tech-avatar-wrench">
                      <Wrench size={18} />
                    </div>
                    <div className="tech-profile-info">
                      <h4>Technician Assigned</h4>
                      <p>Ramesh K. • 4.9 ★ (420+ Jobs)</p>
                    </div>
                  </div>

                  <div className="arrival-status-row">
                    <div className="arrival-left-eta">
                      <Clock size={14} />
                      <span>Arriving in 14 Mins</span>
                    </div>
                    <span className="arrival-right-hub">Vijayawada Hub</span>
                  </div>
                </div>

                {/* Booked Service & Fee */}
                <div className="booked-service-row">
                  <div className="booked-service-meta">
                    <span className="booked-kicker-label">BOOKED SERVICE</span>
                    <strong className="booked-service-title">Refrigerator Repair</strong>
                  </div>
                  <div className="booked-fee-amount">
                    <span>₹299 Fee</span>
                  </div>
                </div>

                {/* Scan with Phone Camera Bar */}
                <div className="scan-camera-dark-bar">
                  <div className="qr-scanner-icon-box">
                    <QrCode size={22} />
                  </div>
                  <div className="scan-camera-text">
                    <strong>Scan with Phone Camera</strong>
                    <small>Auto-detects iOS &amp; Android</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. TESTIMONIAL / REVIEWS (What Our Clients Say)
          ========================================================================= */}
      <section className="section-white testimonials-clean-section">
        <div className="container">
          <div className="section-center-header">
            <span className="section-kicker-pill">CLIENT REVIEWS</span>
            <h2 className="section-clean-heading">What Our Clients Say</h2>
            <p className="section-clean-sub">
              Read genuine feedback from families across Vijayawada, Guntur and Nellore who rely on our quick doorstep repair services.
            </p>
          </div>

          <div className="client-testimonial-card-wrap">
            <div className="client-review-box">
              <div className="review-box-top">
                <div className="reviewer-avatar">
                  <span>{currentReview.name.charAt(0)}</span>
                </div>
                <div className="reviewer-meta">
                  <strong>{currentReview.name}</strong>
                  <small>{currentReview.location}</small>
                </div>
                <div className="reviewer-stars">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FF5A00" color="#FF5A00" />
                  ))}
                </div>
              </div>

              <p className="review-quote-text">
                &ldquo;{currentReview.text}&rdquo;
              </p>

              <div className="review-card-footer">
                <span className="service-name-text">
                  Service: {currentReview.service || 'Home Appliance Repair'}
                </span>
                <span className="verified-booking-tag">
                  <CheckCircle2 size={14} color="#10B981" /> Verified Customer
                </span>
              </div>
            </div>

            {/* Carousel navigation controls */}
            <div className="carousel-nav-arrows">
              <button
                type="button"
                className="carousel-arrow-btn"
                onClick={prevReview}
                aria-label="Previous review"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="carousel-dot-indicators">
                {CLIENT_REVIEWS.map((_, idx) => (
                  <span
                    key={idx}
                    className={`nav-dot ${idx === activeReviewIdx ? 'active' : ''}`}
                    onClick={() => setActiveReviewIdx(idx)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="carousel-arrow-btn"
                onClick={nextReview}
                aria-label="Next review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. BOTTOM RAPID CTA BANNER (Need Quick Appliance Repair?)
          ========================================================================= */}
      <section className="bottom-rapid-cta-section">
        <div className="container">
          <div className="rapid-cta-clean-container">
            <span className="section-kicker-pill">SAME-DAY REPAIR DISPATCH</span>
            <h2 className="rapid-cta-clean-title">Need Quick Appliance Repair?</h2>
            <p className="rapid-cta-clean-sub">
              Our verified technicians will arrive at your home in Vijayawada, Guntur, or Nellore within 90 minutes. Transparent on-site quote.
            </p>

            <div className="rapid-cta-btn-row">
              <a href={`tel:${PHONE_E164}`} className="button hero-call-navy-btn">
                <Phone size={16} /> Call: {PHONE_DISPLAY}
              </a>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent('Hello Doorstep Service, I need quick appliance repair in Vijayawada, Guntur, or Nellore.')}`}
                target="_blank"
                rel="noreferrer"
                className="button hero-book-orange-btn"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
              <Link href="/booking/" className="button cta-outline-btn">
                Book Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

