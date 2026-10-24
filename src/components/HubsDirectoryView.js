'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Navigation,
  ArrowRight,
  Sparkles,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { AREAS, SERVICES, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL } from '@/lib/site';

export default function HubsDirectoryView() {
  const [selectedHub, setSelectedHub] = useState('all');

  const filteredAreas = selectedHub === 'all'
    ? AREAS
    : AREAS.filter((a) => a.slug === selectedHub);

  const scrollToHub = (slug) => {
    setSelectedHub(slug);
    if (slug !== 'all') {
      const el = document.getElementById(`hub-card-${slug}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="hub-ref-wrapper">
      {/* 1. Top Subheader Bar (Breadcrumbs & Select Hub Pills) */}
      <div className="hub-top-filter-bar">
        <div className="container hub-top-bar-inner">
          <div className="hub-breadcrumbs">
            <Link href="/" className="hub-bc-link">Home</Link>
            <span className="hub-bc-sep">›</span>
            <Link href="/service-center/" className="hub-bc-link">Locations</Link>
            <span className="hub-bc-sep">›</span>
            <span className="hub-bc-current">All City Hubs & Coverage ({AREAS.length} Hubs)</span>
          </div>

          <div className="hub-filter-pills-group">
            <span className="hub-filter-label">SELECT HUB:</span>
            <button
              type="button"
              onClick={() => setSelectedHub('all')}
              className={`hub-filter-pill-btn ${selectedHub === 'all' ? 'active' : ''}`}
            >
              All Hubs ({AREAS.length} Hubs)
            </button>
            {AREAS.map((area) => (
              <button
                key={area.slug}
                type="button"
                onClick={() => scrollToHub(area.slug)}
                className={`hub-filter-pill-btn ${selectedHub === area.slug ? 'active' : ''}`}
              >
                {area.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Hero Section */}
      <section className="hub-hero-section">
        <div className="container">
          <div className="hub-hero-content">
            <div className="hub-hero-badge-pill">
              <Navigation size={13} className="hub-badge-icon" />
              <span>10 KM SERVICE RADIUS ACROSS 4 HYDERABAD HUBS</span>
            </div>

            <h1 className="hub-hero-title">
              All Service Hubs & <span className="hub-hero-title-accent">Coverage Areas</span>
            </h1>

            <p className="hub-hero-subtitle">
              Verified doorstep technician squads operating across <strong>Ameerpet Main Road</strong>, <strong>Chanda Nagar</strong>, <strong>Alwal</strong>, and <strong>Suchitra</strong>. Enjoy fast <strong>60 to 90-minute arrival</strong>, <strong>₹0 Booking Fee</strong>, and 100% transparent diagnostics across a <strong>10 KM radial perimeter</strong> in each central hub.
            </p>

            {/* 4 Trust Metric Capsule Badges */}
            <div className="hub-metrics-capsule-card">
              <div className="hub-metric-box">
                <div className="hub-metric-icon-wrap">
                  <MapPin size={20} />
                </div>
                <div className="hub-metric-text">
                  <strong>4 Dedicated Hubs</strong>
                  <p>Ameerpet, Chanda Nagar, Alwal & Suchitra</p>
                </div>
              </div>

              <div className="hub-metric-box">
                <div className="hub-metric-icon-wrap">
                  <Clock size={20} />
                </div>
                <div className="hub-metric-text">
                  <strong>60 – 90 Min Arrival</strong>
                  <p>Trained local technicians</p>
                </div>
              </div>

              <div className="hub-metric-box">
                <div className="hub-metric-icon-wrap">
                  <ShieldCheck size={20} />
                </div>
                <div className="hub-metric-text">
                  <strong>90 Days Warranty</strong>
                  <p>100% Genuine spare parts</p>
                </div>
              </div>

              <div className="hub-metric-box">
                <div className="hub-metric-icon-wrap">
                  <Navigation size={20} />
                </div>
                <div className="hub-metric-text">
                  <strong>10 KM Free Radial Reach</strong>
                  <p>No travel fees inside 10 km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Central Service Hubs Section */}
      <section className="hub-directory-section">
        <div className="container">
          <div className="hub-section-heading">
            <span className="hub-section-eyebrow">CENTRAL SERVICE HUBS</span>
            <h2 className="hub-section-title">Select Your City Service Hub</h2>
            <p className="hub-section-desc">
              Click on your hub to view its exact colony coverage map or click any residential colony tag to book immediately.
            </p>
          </div>

          <div className="hub-cards-grid">
            {filteredAreas.map((area) => (
              <div
                key={area.slug}
                id={`hub-card-${area.slug}`}
                className="hub-directory-card"
              >
                {/* Card Top Row: Badge & Pincode */}
                <div className="hub-card-header-row">
                  <span className="hub-card-badge-pill">
                    {area.badge || 'Verified Hub'}
                  </span>
                  <span className="hub-card-pincode">
                    {area.pincode || 'PIN: Hyderabad'}
                  </span>
                </div>

                {/* Hub Title & Subtitle */}
                <h3 className="hub-card-title">{area.name} Hub</h3>
                <div className="hub-card-dispatch-sub">
                  <MapPin size={15} />
                  <span>{area.dispatchHub || `${area.name} Central Dispatch Hub`}</span>
                </div>

                <p className="hub-card-desc">{area.description}</p>

                {/* 10 KM Radial Coverage Highlight Box */}
                <div className="hub-radial-highlight-box">
                  <Navigation size={15} />
                  <span>10 KM Radial Coverage • 60 – 90 Minutes Arrival</span>
                </div>

                {/* Key Colonies Covered */}
                <div className="hub-colonies-section">
                  <p className="hub-colonies-title">
                    KEY COLONIES COVERED ({area.colonies ? area.colonies.length : '10+'}):
                  </p>
                  <div className="hub-colonies-tags-wrap">
                    {(area.colonies || area.landmarks || []).map((colony, idx) => (
                      <Link
                        key={idx}
                        href={`/service-center/${area.slug}/`}
                        className="hub-colony-tag-pill"
                        title={`View ${colony} coverage in ${area.name}`}
                      >
                        <span className="hub-colony-dot">•</span>
                        <span>{colony}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="hub-card-actions">
                  <Link
                    href={`/service-center/${area.slug}/`}
                    className="hub-btn-solid"
                  >
                    <span>Explore {area.name} Hub Details</span>
                    <ArrowRight size={15} />
                  </Link>

                  <Link
                    href={`/booking/?hub=${area.slug}`}
                    className="hub-btn-outline"
                  >
                    <span>Book Service in {area.name}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Doorstep Appliance Services Section */}
      <section className="hub-services-section">
        <div className="container">
          <div className="hub-section-heading">
            <span className="hub-section-eyebrow">DOORSTEP APPLIANCE SERVICES</span>
            <h2 className="hub-section-title">Available Across Hyderabad Service Hubs</h2>
            <p className="hub-section-desc">
              All 6 core appliance repair services are supported across all 4 central hubs with verified local technicians.
            </p>
          </div>

          <div className="hub-services-grid">
            {SERVICES.map((srv) => (
              <div key={srv.slug} className="hub-service-item-card">
                <div className="hub-service-img-wrap">
                  <Image
                    src={srv.image || '/service_ac.jpg'}
                    alt={`${srv.name} Hyderabad`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="hub-service-img"
                  />
                  <span className="hub-service-subcat-badge">
                    {srv.subcategories?.length || 2} Subcategories
                  </span>
                </div>

                <div className="hub-service-body">
                  <h3 className="hub-service-name">{srv.name}</h3>
                  <p className="hub-service-desc">{srv.short || srv.description}</p>
                  <Link
                    href={`/services/${srv.slug}/`}
                    className="hub-service-cta-link"
                  >
                    <span>View Subcategories & Prices</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 5. 10 KM Radial Radius Assurance Box */}
          <div className="hub-assurance-callout-card">
            <div className="hub-assurance-icon-box">
              <Sparkles size={24} />
            </div>
            <div className="hub-assurance-text">
              <strong>10 KM Radial Radius Assurance:</strong> Every home, apartment, and layout located within a 10 KM radius from any of our 4 service hubs (Ameerpet Main Road, Chanda Nagar, Alwal, Suchitra) is fully supported with express same-day doorstep technician dispatch.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
