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
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL, SERVICES } from '@/lib/site';
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
  { value: '11+', label: 'Years of Experience' },
  { value: '9+', label: 'Expert Technicians' },
  { value: '3/7', label: 'Emergency Support' },
  { value: '11k', label: 'Happy Families Served' },
];

const STANDARDS = [
  {
    icon: Clock,
    title: '90-Min Arrival',
    desc: 'Rapid doorstep dispatch across Nellore. Certified engineers arrive with full toolkit ready to inspect.',
  },
  {
    icon: Award,
    title: 'Post-Inspection Price',
    desc: 'Fair & transparent diagnosis with no hidden fees. Complete cost explanation before starting repair work.',
  },
  {
    icon: ShieldCheck,
    title: '90-Day Guarantee',
    desc: 'Comprehensive 90-day doorstep service warranty on all labor and parts replaced for total peace of mind.',
  },
  {
    icon: Users,
    title: 'Verified Technicians',
    desc: 'Background-checked, skilled and polite professionals with years of hands-on multi-brand repair experience.',
  },
  {
    icon: Wrench,
    title: 'Genuine Spare Parts',
    desc: 'Original manufacturer spares ensuring maximum efficiency, high durability, and lasting performance.',
  },
  {
    icon: Zap,
    title: 'Emergency Priority Desk',
    desc: 'Same-day urgent breakdown rescue for food preservation and cooling emergencies when you need it most.',
  },
];

const JOURNEY_STEPS = [
  {
    num: '01',
    step: 'STEP 1',
    title: 'Easy Booking',
    desc: 'Select your appliance and share contact details in 30 seconds online or call.',
  },
  {
    num: '02',
    step: 'STEP 2',
    title: 'Swift Dispatch',
    desc: 'A verified local engineer is assigned and reaches your doorstep in 90 minutes.',
  },
  {
    num: '03',
    step: 'STEP 3',
    title: 'Diagnostic',
    desc: 'Full inspection and honest upfront quote before starting any work.',
  },
  {
    num: '04',
    step: 'STEP 4',
    title: 'Repair & Warranty',
    desc: 'Prompt repair with genuine parts backed by our 90-day warranty.',
  },
];

const CLIENT_REVIEWS = [
  {
    id: 1,
    name: 'Ravi Kumar K',
    location: 'Ameerpet Main Road, Hyderabad',
    rating: 5,
    text: 'Their technician arrived within 50 minutes of booking. My LG double-door refrigerator was not cooling and he replaced the sensor right away with genuine parts. Clean, polite, and very reasonable pricing. Highly recommended!',
    verified: true,
  },
  {
    id: 2,
    name: 'Sravani Reddy',
    location: 'Chanda Nagar, Hyderabad',
    rating: 5,
    text: 'Booked service for my front load washing machine shaking violently. The engineer diagnosed worn-out suspension rods and fixed it in an hour. Very professional and polite doorstep service in Hyderabad.',
    verified: true,
  },
  {
    id: 3,
    name: 'Praveen Chowdary',
    location: 'Suchitra, Hyderabad',
    rating: 5,
    text: 'Excellent split AC cooling issue repair. They recharged gas and fixed the outdoor unit bracket promptly. 90-day warranty card given on the spot. Great local service!',
    verified: true,
  },
];

const HYDERABAD_FAQS = [
  {
    q: 'How fast can a technician reach my home in Hyderabad?',
    a: 'Our dispatch team assigns the nearest verified technician in Ameerpet Main Road, Chanda Nagar, Alwal, or Suchitra to arrive at your doorstep within 90 minutes of booking.',
  },
  {
    q: 'Which Hyderabad locations do you currently serve?',
    a: 'We provide doorstep repair services exclusively in Ameerpet Main Road, Chanda Nagar, Alwal, and Suchitra.',
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
    a: 'Absolutely! You can call our Hyderabad helpline directly at 9515661677 or click the WhatsApp button for instant support.',
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
                alt="Expert Doorstep Technician servicing appliance in Nellore"
                className="technician-frame-img"
              />
            </div>
          </div>

          {/* Right Column: Hero Headline, Key Highlights & Dual CTAs */}
          <div className="clean-hero-content-col">
            <div className="hero-pill-badge">
              <span className="pill-dot" />
              <span>TOP-RATED APPLIANCE CARE IN NELLORE</span>
            </div>

            <h1 className="hero-clean-title">
              Easy Doorstep Repair <br />
              <span className="title-navy-bold">AC, Fridge, Washer, </span>
              <span className="title-orange-accent">Oven, Geyser &amp; TV</span>
            </h1>

            <p className="hero-clean-desc">
              Hyderabad&apos;s certified local technicians at your doorstep in 90 minutes. Transparent diagnostics &amp; 90-day warranty.
            </p>

            {/* 3 Metric Pills Row */}
            <div className="hero-metrics-grid">
              <div className="metric-box">
                <Clock size={18} className="metric-icon" />
                <div className="metric-text">
                  <strong>90 Min</strong>
                  <small>Arrival Time</small>
                </div>
              </div>

              <div className="metric-box">
                <Wrench size={18} className="metric-icon" />
                <div className="metric-text">
                  <strong>₹299</strong>
                  <small>Fair Inspection</small>
                </div>
              </div>

              <div className="metric-box">
                <ShieldCheck size={18} className="metric-icon" />
                <div className="metric-text">
                  <strong>90-Day</strong>
                  <small>Service Warranty</small>
                </div>
              </div>
            </div>

            {/* Dual Action CTA Buttons */}
            <div className="hero-btn-action-row">
              <Link href="/booking/" className="button button-primary hero-main-cta">
                Book Service
              </Link>
              <a href={`tel:${PHONE_E164}`} className="button button-outline hero-call-cta">
                <Phone size={16} /> Call: {PHONE_DISPLAY}
              </a>
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
          OUR APPLIANCE SERVICES (AC, Refrigerator, Washer, Oven, Geyser, TV)
          ========================================================================= */}
      <section className="section-white services-showcase-section">
        <div className="container">
          <div className="section-center-header">
            <span className="section-kicker-pill">EXPERT REPAIRS</span>
            <h2 className="section-clean-heading">Our Appliance Services in Nellore</h2>
            <p className="section-clean-sub">
              Certified repairs for AC, Refrigerator, Washing Machine, Microwave Oven, Geyser, and Smart TV.
            </p>
          </div>

          <div className="services-showcase-grid">
            {ALL_APPLIANCES_LIST.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div key={srv.slug} className="service-showcase-card">
                  <div className="service-showcase-icon-box">
                    <IconComp size={24} />
                  </div>
                  <h3>{srv.name}</h3>
                  <p>{srv.desc}</p>
                  <div className="service-card-bottom-row">
                    <span className="service-price-tag">From {srv.price}</span>
                    <Link href={`/booking/?service=${srv.slug}`} className="service-book-link">
                      Book Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
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
              Setting the benchmark for transparent pricing, punctual arrivals, and quality multi-brand repairs in Nellore.
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
              Fast, hassle-free doorstep diagnosis and repair right at your comfort in Nellore.
            </p>
          </div>

          <div className="journey-steps-grid">
            {JOURNEY_STEPS.map((js, index) => (
              <div key={index} className="journey-step-card">
                <div className="journey-step-num-bubble">
                  <span>{js.num}</span>
                </div>
                <span className="journey-step-kicker">{js.step}</span>
                <h4>{js.title}</h4>
                <p>{js.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. TESTIMONIAL / REVIEWS CAROUSEL (What Our Nellore Clients Say)
          ========================================================================= */}
      <section className="section-white testimonials-clean-section">
        <div className="container">
          <div className="section-center-header">
            <span className="section-kicker-pill">CLIENT TESTIMONIALS</span>
            <h2 className="section-clean-heading">What Our Nellore Clients Say</h2>
            <p className="section-clean-sub">
              Real feedback from local residents who trust us for their home appliance repairs.
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
                    <Star key={i} size={16} fill="#FF6B00" color="#FF6B00" />
                  ))}
                </div>
              </div>

              <p className="review-quote-text">
                &ldquo;{currentReview.text}&rdquo;
              </p>

              <div className="review-card-footer">
                <span className="verified-booking-tag">
                  <CheckCircle2 size={14} color="#0A2558" /> Verified Doorstep Booking
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
          6. FAQS ACCORDION (Frequently Asked Questions)
          ========================================================================= */}
      <section className="section faqs-clean-section">
        <div className="container content-narrow">
          <div className="section-center-header">
            <span className="section-kicker-pill">FAQS</span>
            <h2 className="section-clean-heading">Frequently Asked Questions</h2>
            <p className="section-clean-sub">
              Everything you need to know about our doorstep repair process in Nellore.
            </p>
          </div>

          <div className="clean-faq-list">
            {HYDERABAD_FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`clean-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="clean-faq-trigger"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                  </button>
                  {isOpen && <p className="clean-faq-answer">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INDUSTRY-LEVEL MOBILE APP DOWNLOAD SHOWCASE
          ========================================================================= */}
      <section className="section-white app-download-banner-section" id="app-download">
        <div className="container">
          <div className="app-download-card-wrapper">
            <div className="app-download-left-col">
              <span className="section-kicker-pill">DOORSTEP MOBILE APP</span>
              <h2>Book &amp; Track Repairs on the Go</h2>
              <p>
                Get real-time technician GPS tracking, instant upfront pricing, booking updates, and digital warranty receipts right on your phone.
              </p>

              <div className="app-download-buttons-row">
                <a
                  href="#app-download"
                  className="industry-app-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Doorstep Service iOS App is coming soon on the Apple App Store!');
                  }}
                >
                  <AppleIcon size={26} />
                  <div className="app-btn-text">
                    <small>DOWNLOAD ON THE</small>
                    <strong>Apple App Store</strong>
                  </div>
                </a>

                <a
                  href="#app-download"
                  className="industry-app-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Doorstep Service Android App is coming soon on the Google Play Store!');
                  }}
                >
                  <GooglePlayIcon size={24} />
                  <div className="app-btn-text">
                    <small>GET IT ON</small>
                    <strong>Google Play Store</strong>
                  </div>
                </a>
              </div>

              <div className="app-features-badges">
                <span>⚡ 30-sec Booking</span>
                <span>📍 Live Tech Dispatch</span>
                <span>🛡️ 90-Day Digital Warranty</span>
              </div>
            </div>

            <div className="app-download-right-visual">
              <div className="phone-screen-container">
                <div className="phone-screen-top-bar">
                  <DoorStepLogo size={22} />
                </div>
                <div className="phone-app-mock-card">
                  <span className="app-mock-status">DISPATCHED IN HYDERABAD</span>
                  <h4>AC Technician Arriving</h4>
                  <p>ETA: <strong>35 mins</strong> · Ameerpet Main Rd</p>
                  <div className="app-mock-progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. BOTTOM RAPID CTA BANNER (Need Quick Appliance Repair?)
          ========================================================================= */}
      <section className="bottom-rapid-cta-section">
        <div className="container">
          <div className="rapid-cta-inner-card">
            <span className="cta-kicker-badge">
              <Sparkles size={13} color="#FF6B00" /> RAPID RESPONSE HELPLINE
            </span>
            <h2 className="cta-bold-title">Need Quick Appliance Repair?</h2>
            <p className="cta-sub-copy">
              Don’t let a broken AC, refrigerator, washing machine, oven, geyser, or TV disrupt your day. Connect with our Hyderabad technicians right away.
            </p>

            <div className="cta-buttons-cluster">
              <Link href="/booking/" className="button button-primary cta-primary-btn">
                Book Support
              </Link>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent('Hello Doorstep Service Hyderabad, I need quick appliance repair in Ameerpet, Chanda Nagar, Alwal, or Suchitra.')}`}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary cta-whatsapp-btn"
              >
                <MessageCircle size={17} /> Chat on WhatsApp
              </a>
              <a href={`tel:${PHONE_E164}`} className="button button-outline cta-call-btn">
                <Phone size={16} /> Call: {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

