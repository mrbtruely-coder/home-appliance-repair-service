'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL } from '@/lib/site';

const HUBS = [
  {
    id: 'ameerpet',
    slug: 'ameerpet-main-road',
    name: 'Ameerpet Hub',
    fullName: 'Ameerpet Main Road',
    address: 'Near Metro Station, Ameerpet Cross Road, Hyderabad, Telangana 500016',
    coverage: 'Ameerpet Cross Road, Metro Station, SR Nagar, Panjagutta, Dharam Karam Road, Balkampet',
    mapQuery: 'Ameerpet Metro Station, Hyderabad, Telangana 500016',
    boundsLabel: 'AMEERPET SERVICE BOUNDS',
  },
  {
    id: 'chanda-nagar',
    slug: 'chanda-nagar',
    name: 'Chanda Nagar Hub',
    fullName: 'Chanda Nagar',
    address: 'Near BHEL Circle, Chanda Nagar Main Road, Hyderabad, Telangana 500050',
    coverage: 'Chanda Nagar Main Road, BHEL Circle, Madinaguda, Gangaram, Miyapur, Hafeezpet',
    mapQuery: 'Chanda Nagar Main Road, Hyderabad, Telangana 500050',
    boundsLabel: 'CHANDA NAGAR SERVICE BOUNDS',
  },
  {
    id: 'alwal',
    slug: 'alwal',
    name: 'Alwal Hub',
    fullName: 'Alwal',
    address: 'Near IG Statue, Alwal Hills Main Road, Secunderabad - Hyderabad, Telangana 500010',
    coverage: 'Alwal Hills, IG Statue, Old Alwal, Lothkunta, Bolarum, Trimulgherry',
    mapQuery: 'Alwal, Secunderabad, Telangana 500010',
    boundsLabel: 'ALWAL SERVICE BOUNDS',
  },
  {
    id: 'suchitra',
    slug: 'suchitra',
    name: 'Suchitra Hub',
    fullName: 'Suchitra',
    address: 'Near Suchitra Circle, Quthbullapur Road, Hyderabad, Telangana 500067',
    coverage: 'Suchitra Circle, Quthbullapur, Jeedimetla, Kompally, Petbasheerabad, Bowenpally',
    mapQuery: 'Suchitra Circle, Hyderabad, Telangana 500067',
    boundsLabel: 'SUCHITRA SERVICE BOUNDS',
  },
];

export default function ContactClient() {
  const [selectedHub, setSelectedHub] = useState(HUBS[0]);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    selectedHub.mapQuery
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  const googleMapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    selectedHub.mapQuery
  )}`;

  return (
    <div className="contact-page-modern">
      {/* Top Header Section */}
      <section className="contact-hero-wrap">
        <div className="container text-center">
          <div className="contact-locate-pill">
            <MapPin size={13} />
            <span>LOCATE US</span>
          </div>

          <h1 className="contact-main-title">
            Our Service Area in{' '}
            <span className="contact-title-highlight">{selectedHub.fullName}</span>
          </h1>

          <p className="contact-main-subtitle">
            We operate fully equipped service vans across Ameerpet Main Road, Chanda Nagar, Alwal, and Suchitra, delivering rapid doorstep restoration whenever you book support.
          </p>

          {/* Hub Switcher Buttons matching reference screenshot */}
          <div className="contact-hubs-bar">
            {HUBS.map((hub) => {
              const isActive = selectedHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setSelectedHub(hub)}
                  className={`contact-hub-btn ${isActive ? 'active' : ''}`}
                  aria-pressed={isActive}
                >
                  {hub.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main 2-Column Section: Left Contact Cards, Right Interactive Map */}
      <section className="contact-content-section">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Left Column: 3 Contact Info Cards */}
            <div className="contact-info-cards">
              {/* Card 1: Address */}
              <div className="contact-info-card">
                <div className="contact-card-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="contact-card-body">
                  <span className="contact-card-label">DISPATCH HUB ADDRESS</span>
                  <h3 className="contact-card-title">
                    DOOR STEP SERVICE ({selectedHub.fullName.toUpperCase()})
                  </h3>
                  <p className="contact-card-text">{selectedHub.address}</p>
                  <p className="contact-card-coverage">
                    <strong>Coverage:</strong> {selectedHub.coverage}
                  </p>
                </div>
              </div>

              {/* Card 2: Helpline */}
              <div className="contact-info-card">
                <div className="contact-card-icon-box">
                  <Phone size={20} />
                </div>
                <div className="contact-card-body">
                  <span className="contact-card-label">SERVICE HELPLINE</span>
                  <div className="contact-helpline-lines">
                    <p className="contact-card-text">
                      Phone:{' '}
                      <a href={`tel:${PHONE_E164}`} className="contact-link-bold">
                        +{PHONE_DISPLAY}
                      </a>
                    </p>
                    <p className="contact-card-text">
                      WhatsApp:{' '}
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link-bold"
                      >
                        +{PHONE_DISPLAY}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Working Hours */}
              <div className="contact-info-card">
                <div className="contact-card-icon-box">
                  <Clock size={20} />
                </div>
                <div className="contact-card-body">
                  <span className="contact-card-label">WORKING HOURS</span>
                  <h4 className="contact-card-hours">
                    Monday – Sunday: 7:00 AM – 9:00 PM
                  </h4>
                  <p className="contact-card-emergency">
                    EMERGENCY DISPATCH: 24 HOURS ACTIVE
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Location Map with Map Bounds & Pin */}
            <div className="contact-map-card">
              <div className="contact-map-bounds-tag">
                {selectedHub.boundsLabel}
              </div>

              <div className="contact-map-info-float">
                <div className="map-float-hub-info">
                  <strong>{selectedHub.name}</strong>
                  <span>Hyderabad, Telangana</span>
                </div>
                <a
                  href={googleMapsExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-open-maps"
                >
                  <ExternalLink size={13} />
                  <span>Open in Maps</span>
                </a>
              </div>

              <div className="contact-map-frame-wrap">
                <iframe
                  key={selectedHub.id}
                  src={mapEmbedUrl}
                  title={`Google Map Location for ${selectedHub.fullName}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Rapid Response Helpline CTA Banner matching reference */}
      <section className="contact-bottom-cta-wrap">
        <div className="container">
          <div className="contact-rapid-banner">
            <div className="rapid-badge-pill">
              <Sparkles size={13} />
              <span>RAPID RESPONSE HELPLINE</span>
            </div>

            <h2 className="rapid-banner-title">Need Quick Appliance Repair?</h2>

            <p className="rapid-banner-desc">
              Don’t let a broken AC, refrigerator, washing machine, microwave, geyser, or TV interrupt your routine. Tap below to call or chat with our {selectedHub.fullName} technicians immediately.
            </p>

            <div className="contact-rapid-actions">
              <a href={`tel:${PHONE_E164}`} className="btn-rapid-call">
                <Phone size={17} />
                <span>CALL SUPPORT NOW: +{PHONE_DISPLAY}</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rapid-wa"
              >
                <MessageCircle size={17} />
                <span>Chat on WhatsApp</span>
              </a>

              <Link href="/booking/" className="btn-rapid-book">
                Book Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
