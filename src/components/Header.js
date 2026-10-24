'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  MapPin,
  ArrowRight,
  Phone,
  Snowflake,
  Refrigerator,
  WashingMachine,
  Microwave,
  Flame,
  Tv,
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_E164, AREAS } from '@/lib/site';
import DoorStepLogo from '@/components/DoorStepLogo';

const SERVICE_DROPDOWN_ITEMS = [
  {
    slug: 'ac-repair',
    name: 'AC Service & Repair',
    desc: 'Split, Cassette & AC Installation Service',
    icon: Snowflake,
  },
  {
    slug: 'refrigerator-repair',
    name: 'Refrigerator Repair',
    desc: 'Single Door, Double Door & Side by Side',
    icon: Refrigerator,
  },
  {
    slug: 'washing-machine-repair',
    name: 'Washing Machine Repair',
    desc: 'Front Load & Top Load Machine Repairs',
    icon: WashingMachine,
  },
  {
    slug: 'oven-microwave-repair',
    name: 'Microwave & Oven Repair',
    desc: 'Convectional & Microwave Oven Fixes',
    icon: Microwave,
  },
  {
    slug: 'geyser-repair',
    name: 'Geyser & Water Heater',
    desc: 'Electric & Instant Geyser Repairs',
    icon: Flame,
  },
  {
    slug: 'tv-repair',
    name: 'LED & Smart TV Repair',
    desc: 'LCD, LED, Smart Android & Wall Mounting',
    icon: Tv,
  },
];

const LOCATION_DROPDOWN_ITEMS = [
  {
    slug: 'ameerpet-main-road',
    name: 'Ameerpet Main Road',
    desc: 'Hyderabad • Metro Station & Cross Road Hub',
  },
  {
    slug: 'chanda-nagar',
    name: 'Chanda Nagar',
    desc: 'Hyderabad • BHEL Circle & Main Road Hub',
  },
  {
    slug: 'alwal',
    name: 'Alwal',
    desc: 'Hyderabad • Alwal Hills & IG Statue Hub',
  },
  {
    slug: 'suchitra',
    name: 'Suchitra',
    desc: 'Hyderabad • Suchitra Circle & Quthbullapur',
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const isLinkActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setActiveDropdown(null);
    setOpen(false);
  }, [pathname]);

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
      <header className="site-header doorstep-clean-header" ref={dropdownRef}>
        <div className="container header-inner">
          <Link
            href="/"
            className="brand header-brand-link"
            aria-label="Home Appliance Repair Services Hyderabad"
            onClick={() => {
              setOpen(false);
              setActiveDropdown(null);
            }}
          >
            <DoorStepLogo size={52} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav modern-nav" aria-label="Main navigation">
            <Link
              href="/"
              onMouseEnter={() => setActiveDropdown(null)}
              className={`nav-link-item ${isLinkActive('/') && pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="header-dropdown-container"
              onMouseEnter={() => setActiveDropdown('services')}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className={`nav-dropdown-trigger ${
                  activeDropdown === 'services' || pathname?.startsWith('/services') ? 'active-dropdown-pill' : ''
                }`}
                aria-expanded={activeDropdown === 'services'}
              >
                <span>Services</span>
                <ChevronDown
                  size={15}
                  className={`dropdown-chevron ${activeDropdown === 'services' ? 'rotate-180' : ''}`}
                />
              </button>

              {activeDropdown === 'services' && (
                <div
                  className="header-dropdown-card"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="dropdown-card-header">
                    CORE REPAIR & APPLIANCE VERTICALS
                  </div>
                  <div className="dropdown-card-list">
                    {SERVICE_DROPDOWN_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.slug}
                          href={`/services/${item.slug}/`}
                          onClick={() => setActiveDropdown(null)}
                          className="dropdown-item-link"
                        >
                          <div className="dropdown-item-icon-box">
                            <Icon size={18} />
                          </div>
                          <div className="dropdown-item-text">
                            <p className="dropdown-item-title">{item.name}</p>
                            <p className="dropdown-item-subtitle">{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="dropdown-card-footer">
                    <Link
                      href="/services/"
                      onClick={() => setActiveDropdown(null)}
                      className="dropdown-footer-link"
                    >
                      <span>Explore All Services</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="header-dropdown-container"
              onMouseEnter={() => setActiveDropdown('locations')}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'locations' ? null : 'locations')}
                className={`nav-dropdown-trigger ${
                  activeDropdown === 'locations' || pathname?.startsWith('/service-center') || pathname?.startsWith('/locations') ? 'active-dropdown-pill' : ''
                }`}
                aria-expanded={activeDropdown === 'locations'}
              >
                <span>Locations</span>
                <ChevronDown
                  size={15}
                  className={`dropdown-chevron ${activeDropdown === 'locations' ? 'rotate-180' : ''}`}
                />
              </button>

              {activeDropdown === 'locations' && (
                <div
                  className="header-dropdown-card"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="dropdown-card-header">
                    SERVICE HUBS & LOCALITIES
                  </div>
                  <div className="dropdown-card-list">
                    {LOCATION_DROPDOWN_ITEMS.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={`/service-center/${loc.slug}/`}
                        onClick={() => setActiveDropdown(null)}
                        className="dropdown-item-link"
                      >
                        <div className="dropdown-item-icon-box location-icon-box">
                          <MapPin size={18} />
                        </div>
                        <div className="dropdown-item-text">
                          <p className="dropdown-item-title">{loc.name}</p>
                          <p className="dropdown-item-subtitle">{loc.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="dropdown-card-footer">
                    <Link
                      href="/service-center/"
                      onClick={() => setActiveDropdown(null)}
                      className="dropdown-footer-link"
                    >
                      <span>All City Hubs & Coverage Areas</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/booking/"
              onMouseEnter={() => setActiveDropdown(null)}
              className={`nav-link-item ${isLinkActive('/booking') ? 'active' : ''}`}
            >
              Book Service
              {isLinkActive('/booking') && <span className="active-nav-indicator" />}
            </Link>
            <Link
              href="/faqs/"
              onMouseEnter={() => setActiveDropdown(null)}
              className={`nav-link-item ${isLinkActive('/faqs') ? 'active' : ''}`}
            >
              FAQs
            </Link>
            <Link
              href="/contact/"
              onMouseEnter={() => setActiveDropdown(null)}
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

            {/* Mobile Services Section */}
            <div style={{ padding: '8px 0 4px', fontSize: '11px', fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Appliance Services
            </div>
            {SERVICE_DROPDOWN_ITEMS.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}/`}
                onClick={() => setOpen(false)}
                style={{ paddingLeft: '14px', fontSize: '13px' }}
              >
                • {item.name}
              </Link>
            ))}

            {/* Mobile Locations Section */}
            <div style={{ padding: '12px 0 4px', fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Service Hubs & Cities
            </div>
            {LOCATION_DROPDOWN_ITEMS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/service-center/${loc.slug}/`}
                onClick={() => setOpen(false)}
                style={{ paddingLeft: '14px', fontSize: '13px' }}
              >
                📍 {loc.name}
              </Link>
            ))}

            <div style={{ borderTop: '1px solid #F1F5F9', marginTop: '10px', paddingTop: '6px' }}>
              <Link href="/booking/" onClick={() => setOpen(false)} className="mobile-active">
                Book Service
              </Link>
              <Link href="/faqs/" onClick={() => setOpen(false)}>
                FAQs
              </Link>
              <Link href="/contact/" onClick={() => setOpen(false)}>
                Contact Us
              </Link>
            </div>

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
