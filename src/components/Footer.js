'use client';
import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { PHONE_E164, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/site';

import DoorStepLogo from '@/components/DoorStepLogo';
import { AppleIcon, GooglePlayIcon } from '@/components/AppStoreIcons';

export default function Footer() {
  return (
    <footer className="site-footer modern-doorstep-footer">
      <div className="container footer-main-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <Link href="/" className="footer-logo-link" aria-label="Home Appliance Repair Services Hyderabad">
            <DoorStepLogo dark={true} size={48} />
          </Link>
          <p className="footer-about-text">
            Door Step Service is Hyderabad&apos;s premium appliance repair and maintenance company. We specialize in fast AC, Refrigerator, Washing Machine, Microwave, Geyser, and TV diagnostics right at your home.
          </p>

          {/* Industry Level Mobile App Download Badges */}
          <div className="footer-app-badges-box" style={{ marginTop: '22px' }}>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '10px' }}>
              EXPERIENCE ON MOBILE APP
            </span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href="#app-download"
                className="app-badge-btn"
                style={{ padding: '9px 15px', borderRadius: '10px', background: '#0F2F6E', border: '1px solid rgba(255, 255, 255, 0.22)', display: 'inline-flex', alignItems: 'center', gap: '9px', textDecoration: 'none', color: '#fff', transition: 'all 0.2s ease' }}
                onClick={(e) => {
                  e.preventDefault();
                  alert('Doorstep Service iOS App is coming soon on the App Store!');
                }}
              >
                <AppleIcon size={20} />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
                  <small style={{ fontSize: '8.5px', color: '#CBD5E1', textTransform: 'uppercase' }}>Download on the</small>
                  <strong style={{ fontSize: '11.5px', fontWeight: 700, color: '#FFFFFF' }}>App Store</strong>
                </div>
              </a>

              <a
                href="#app-download"
                className="app-badge-btn"
                style={{ padding: '9px 15px', borderRadius: '10px', background: '#0F2F6E', border: '1px solid rgba(255, 255, 255, 0.22)', display: 'inline-flex', alignItems: 'center', gap: '9px', textDecoration: 'none', color: '#fff', transition: 'all 0.2s ease' }}
                onClick={(e) => {
                  e.preventDefault();
                  alert('Doorstep Service Android App is coming soon on Google Play!');
                }}
              >
                <GooglePlayIcon size={18} />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
                  <small style={{ fontSize: '8.5px', color: '#CBD5E1', textTransform: 'uppercase' }}>GET IT ON</small>
                  <strong style={{ fontSize: '11.5px', fontWeight: 700, color: '#FFFFFF' }}>Google Play</strong>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Our Repair Services */}
        <div className="footer-nav-col">
          <h3 className="footer-nav-heading">OUR REPAIR SERVICES</h3>
          <ul className="footer-links-list">
            <li>
              <Link href="/services/ac-repair/">AC Service &amp; Repair</Link>
            </li>
            <li>
              <Link href="/services/refrigerator-repair/">Refrigerator Service</Link>
            </li>
            <li>
              <Link href="/services/washing-machine-repair/">Washing Machine Repair</Link>
            </li>
            <li>
              <Link href="/services/oven-microwave-repair/">Oven &amp; Microwave Repair</Link>
            </li>
            <li>
              <Link href="/services/geyser-repair/">Geyser &amp; Water Heater Repair</Link>
            </li>
            <li>
              <Link href="/services/tv-repair/">LED &amp; Smart TV Repair</Link>
            </li>
          </ul>
        </div>

        {/* Service Locations (Hyderabad Only) */}
        <div className="footer-nav-col">
          <h3 className="footer-nav-heading">SERVICE LOCATIONS</h3>
          <ul className="footer-links-list">
            <li>
              <Link href="/booking/?area=Ameerpet+Main+Road">Ameerpet Main Road</Link>
            </li>
            <li>
              <Link href="/booking/?area=Chanda+Nagar">Chanda Nagar</Link>
            </li>
            <li>
              <Link href="/booking/?area=Alwal">Alwal</Link>
            </li>
            <li>
              <Link href="/booking/?area=Suchitra">Suchitra</Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-nav-col">
          <h3 className="footer-nav-heading">QUICK LINKS</h3>
          <div className="footer-quick-links-split">
            <ul className="footer-links-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services/">Services</Link>
              </li>
              <li>
                <Link href="/booking/">Book Service</Link>
              </li>
            </ul>
            <ul className="footer-links-list">
              <li>
                <Link href="/faqs/">FAQs</Link>
              </li>
              <li>
                <Link href="/contact/">Contact Us</Link>
              </li>
              <li>
                <Link href="/terms/">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container footer-bottom-bar">
        <span className="footer-copy-text">
          © {new Date().getFullYear()} DOOR STEP SERVICE. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/terms/" style={{ color: '#94A3B8', fontSize: '12px' }}>Terms of Service</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <Link href="/privacy-policy/" style={{ color: '#94A3B8', fontSize: '12px' }}>Privacy Policy</Link>
        </div>
        <span className="footer-made-with">
          Made with <span style={{ color: '#FF6B00' }}>❤️</span> for Hyderabad residents
        </span>
      </div>
    </footer>
  );
}
