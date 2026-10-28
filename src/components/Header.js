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
    slug: 'hyderabad',
    name: 'Hyderabad',
    desc: 'Central Hyderabad & IT Corridor',
  },
  {
    slug: 'secunderabad',
    name: 'Secunderabad',
    desc: 'Secunderabad & Cantonment Hub',
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const isPinnedRef = useRef(false);
  const pathname = usePathname();

  const isLinkActive = (path) => {
    if (!pathname) return false;
    const cleanPath = path.replace(/\/+$/, '') || '/';
    const cleanCurrent = pathname.replace(/\/+$/, '') || '/';
    if (cleanPath === '/') return cleanCurrent === '/';
    return cleanCurrent.startsWith(cleanPath);
  };

  const handleMouseEnter = (menuName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 280);
  };

  const toggleDropdown = (e, menuName) => {
    e.preventDefault();
    e.stopPropagation();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const closeAllDropdowns = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(null);
    isPinnedRef.current = false;
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    closeAllDropdowns();
    setOpen(false);
    setMobileServicesOpen(false);
    setMobileLocationsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Banner Matching Screenshot */}
      <div className="doorstep-top-banner">
        <div className="container top-banner-content">
          <div className="top-banner-main-line">
            <span className="top-banner-icon">⚡</span>
            <span className="top-banner-text">
              SAME-DAY DOORSTEP APPLIANCE REPAIR IN <strong>VIJAYAWADA, GUNTUR &amp; NELLORE</strong>
            </span>
          </div>
          <div className="top-banner-call-line">
            CALL <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
          </div>
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
              closeAllDropdowns();
            }}
          >
            <DoorStepLogo size={78} />
          </Link>

          {/* Desktop Navigation (Hidden on <= 1024px) */}
          <nav className="desktop-nav modern-nav" aria-label="Main navigation">
            <Link
              href="/"
              onMouseEnter={closeAllDropdowns}
              className={`nav-link-item ${isLinkActive('/') && pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="header-dropdown-container"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={(e) => toggleDropdown(e, 'services')}
                className={`nav-dropdown-trigger ${
                  activeDropdown === 'services' || pathname?.startsWith('/services') ? 'active-dropdown-pill' : ''
                }`}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown
                  size={15}
                  className={`dropdown-chevron ${activeDropdown === 'services' ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`header-dropdown-card ${activeDropdown === 'services' ? 'is-active-card' : ''}`}
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="dropdown-card-header">
                  CORE REPAIR &amp; APPLIANCE VERTICALS
                </div>
                <div className="dropdown-card-list">
                  {SERVICE_DROPDOWN_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.slug}
                        href={`/services/${item.slug}/`}
                        onClick={closeAllDropdowns}
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
                    onClick={closeAllDropdowns}
                    className="dropdown-footer-link"
                  >
                    <span>Explore All Services</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Locations Dropdown */}
            <div
              className="header-dropdown-container"
              onMouseEnter={() => handleMouseEnter('locations')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={(e) => toggleDropdown(e, 'locations')}
                className={`nav-dropdown-trigger ${
                  activeDropdown === 'locations' || pathname?.startsWith('/service-center') || pathname?.startsWith('/locations') ? 'active-dropdown-pill' : ''
                }`}
                aria-expanded={activeDropdown === 'locations'}
                aria-haspopup="true"
              >
                <span>Locations</span>
                <ChevronDown
                  size={15}
                  className={`dropdown-chevron ${activeDropdown === 'locations' ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`header-dropdown-card ${activeDropdown === 'locations' ? 'is-active-card' : ''}`}
                onMouseEnter={() => handleMouseEnter('locations')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="dropdown-card-header">
                  SERVICE HUBS &amp; LOCALITIES
                </div>
                <div className="dropdown-card-list">
                  {LOCATION_DROPDOWN_ITEMS.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/${loc.slug}/`}
                      onClick={closeAllDropdowns}
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
                    onClick={closeAllDropdowns}
                    className="dropdown-footer-link"
                  >
                    <span>All City Hubs &amp; Coverage Areas</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/booking/"
              onMouseEnter={closeAllDropdowns}
              className={`nav-link-item ${isLinkActive('/booking') ? 'active' : ''}`}
            >
              Book Service
              {isLinkActive('/booking') && <span className="active-nav-indicator" />}
            </Link>
            <Link
              href="/faqs/"
              onMouseEnter={closeAllDropdowns}
              className={`nav-link-item ${isLinkActive('/faqs') ? 'active' : ''}`}
            >
              FAQs
            </Link>
            <Link
              href="/contact/"
              onMouseEnter={closeAllDropdowns}
              className={`nav-link-item ${isLinkActive('/contact') ? 'active' : ''}`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Header Action Buttons (Book Service + Mobile Menu Toggle) */}
          <div className="header-actions">
            <Link
              href="/booking/"
              className="header-book-support-btn"
            >
              Book Service
            </Link>

            <button
              className="menu-toggle"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Matching Reference Image */}
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mobile-nav-item"
            >
              Home
            </Link>

            {/* Mobile Services Accordion */}
            <div className="mobile-accordion-group">
              <button
                type="button"
                className="mobile-accordion-trigger"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                aria-expanded={mobileServicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  size={18}
                  className={`mobile-chevron ${mobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="mobile-accordion-dropdown">
                  {SERVICE_DROPDOWN_ITEMS.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}/`}
                      onClick={() => setOpen(false)}
                      className="mobile-sub-link"
                    >
                      <span>• {item.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/services/"
                    onClick={() => setOpen(false)}
                    className="mobile-sub-link mobile-view-all-link"
                  >
                    <span>Explore All Services →</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Locations Accordion */}
            <div className="mobile-accordion-group">
              <button
                type="button"
                className="mobile-accordion-trigger"
                onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                aria-expanded={mobileLocationsOpen}
              >
                <span>Locations</span>
                <ChevronDown
                  size={18}
                  className={`mobile-chevron ${mobileLocationsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileLocationsOpen && (
                <div className="mobile-accordion-dropdown">
                  {LOCATION_DROPDOWN_ITEMS.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/service-center/${loc.slug}/`}
                      onClick={() => setOpen(false)}
                      className="mobile-sub-link"
                    >
                      <span>📍 {loc.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/service-center/"
                    onClick={() => setOpen(false)}
                    className="mobile-sub-link mobile-view-all-link"
                  >
                    <span>All City Hubs & Coverage →</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/booking/"
              onClick={() => setOpen(false)}
              className="mobile-nav-item"
            >
              Book Service
            </Link>

            <Link
              href="/faqs/"
              onClick={() => setOpen(false)}
              className="mobile-nav-item"
            >
              FAQs
            </Link>

            <Link
              href="/contact/"
              onClick={() => setOpen(false)}
              className="mobile-nav-item"
            >
              Contact Us
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
