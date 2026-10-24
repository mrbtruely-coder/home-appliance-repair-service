'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_E164 } from '@/lib/site';

import DoorStepLogo from '@/components/DoorStepLogo';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  return (
    <>
      {/* Top Banner Matching Screenshot */}
      <div className="doorstep-top-banner">
        <div className="container top-banner-content">
          <span className="top-banner-icon">⚡</span>
          <span className="top-banner-text">
            SAME-DAY DOORSTEP APPLIANCE REPAIR IN HYDERABAD — CALL <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="site-header doorstep-clean-header">
        <div className="container header-inner">
          <Link
            href="/"
            className="brand header-brand-link"
            aria-label="Home Appliance Repair Services Hyderabad"
            onClick={() => setOpen(false)}
          >
            <DoorStepLogo size={52} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav modern-nav" aria-label="Main navigation">
            <Link
              href="/"
              className={`nav-link-item ${isLinkActive('/') && pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/services/"
              className={`nav-link-item ${isLinkActive('/services') ? 'active' : ''}`}
            >
              Services
            </Link>
            <Link
              href="/booking/"
              className={`nav-link-item ${isLinkActive('/booking') ? 'active' : ''}`}
            >
              Book Service
              {isLinkActive('/booking') && <span className="active-nav-indicator" />}
            </Link>
            <Link
              href="/faqs/"
              className={`nav-link-item ${isLinkActive('/faqs') ? 'active' : ''}`}
            >
              FAQs
            </Link>
            <Link
              href="/contact/"
              className={`nav-link-item ${isLinkActive('/contact') ? 'active' : ''}`}
            >
              Contact Us
            </Link>
          </nav>

          <div className="header-actions">
            <Link
              href="/booking/"
              className="button button-primary header-book-support-btn"
            >
              Book Service
            </Link>

            <button
              className="menu-toggle"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/services/" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link href="/booking/" onClick={() => setOpen(false)} className="mobile-active">
              Book Service
            </Link>
            <Link href="/faqs/" onClick={() => setOpen(false)}>
              FAQs
            </Link>
            <Link href="/contact/" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
            <Link
              href="/booking/"
              className="button button-primary"
              onClick={() => setOpen(false)}
              style={{ marginTop: '10px', textAlign: 'center' }}
            >
              Book Service
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
