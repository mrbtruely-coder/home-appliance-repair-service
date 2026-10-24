'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  MapPin,
  ChevronDown,
  ShieldCheck,
  Clock,
  Headphones,
  Zap,
  CheckCircle2,
  Star,
  ArrowRight,
  ChevronRight,
  Snowflake,
  Refrigerator,
  WashingMachine,
  Microwave,
  ShowerHead,
  Tv,
} from 'lucide-react';
import { SERVICES, AREAS, SERVICE_PRICE } from '@/lib/site';

const SERVICE_ICONS = {
  'ac-repair': Snowflake,
  'refrigerator-repair': Refrigerator,
  'washing-machine-repair': WashingMachine,
  'oven-microwave-repair': Microwave,
  'geyser-repair': ShowerHead,
  'tv-repair': Tv,
};

export default function HomeHero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const router = useRouter();

  const handleFindServices = (e) => {
    e.preventDefault();
    if (selectedArea) {
      try {
        localStorage.setItem('doorstep-area', selectedArea);
        window.dispatchEvent(new Event('doorstep-area-change'));
      } catch {}
    }
    if (searchQuery.trim()) {
      router.push(`/services/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/services/');
    }
  };

  return (
    <div className="exact-hero-wrapper">
      {/* =========================================================================
          MAIN HERO SECTION (Exact Reference Layout)
          ========================================================================= */}
      <section className="exact-hero-section">
        {/* Background graphic layer */}
        <div className="exact-hero-bg-layer" />

        <div className="container exact-hero-container">
          {/* Left Column: Heading, Search & Trust Markers */}
          <div className="exact-hero-left">
            <span className="exact-hero-eyebrow">
              TRUSTED HOME APPLIANCE SERVICE PARTNER
            </span>

            <h1 className="exact-hero-title">
              <span className="title-navy">Expert Repairs for a</span>
              <span className="title-blue">Hassle-Free Home</span>
            </h1>

            <p className="exact-hero-desc">
              AC, Refrigerator, Washing Machine, Microwave, Geyser, TV and more.
              <br />
              Professional service at your doorstep in Hyderabad.
            </p>

            {/* Pill Search & Location Container */}
            <form className="exact-hero-search-pill" onSubmit={handleFindServices}>
              <div className="search-input-col">
                <Search size={18} className="search-pill-icon" />
                <input
                  type="text"
                  placeholder="Search service (e.g. AC repair)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-field-native"
                />
              </div>

              <div className="search-divider-line" />

              <div className="location-select-col">
                <MapPin size={18} className="location-pill-icon" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="location-select-native"
                >
                  <option value="">Select your area</option>
                  {AREAS.map((a) => (
                    <option key={a.slug} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="dropdown-arrow" />
              </div>

              <button type="submit" className="find-services-btn">
                Find Services
              </button>
            </form>

            {/* Trust Indicators Row */}
            <div className="exact-hero-trust-row">
              <div className="trust-pill-item">
                <Zap size={14} className="trust-blue-icon" />
                <span>Quick Booking</span>
              </div>
              <div className="trust-pill-item">
                <CheckCircle2 size={14} className="trust-blue-icon" />
                <span>Verified Technicians</span>
              </div>
              <div className="trust-pill-item">
                <MapPin size={14} className="trust-blue-icon" />
                <span>4 Service Areas in Hyderabad</span>
              </div>
              <div className="trust-pill-item">
                <Star size={14} className="trust-blue-icon" />
                <span>Trusted & Reliable</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="exact-hero-right">
            <div className="technician-visual-wrapper">
              <img
                src="/hero-technician.jpg"
                alt="Doorstep Home Appliance Services - Professional technician servicing appliances in Hyderabad home"
                className="exact-hero-img"
              />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
