'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Phone,
  MessageCircle,
  Plus,
  Sparkles,
  LocateFixed,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { SERVICES, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL, SERVICE_PRICE } from '@/lib/site';

function slugify(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ServiceCenterDetailView({
  area,
  baseLocationPath = null,
  subAreaName = null,
  customArea = '',
}) {
  const router = useRouter();
  const [showOtherBox, setShowOtherBox] = useState(false);
  const [customAreaInput, setCustomAreaInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [detectingLoc, setDetectingLoc] = useState(false);
  const [detectedMsg, setDetectedMsg] = useState('');

  if (!area) {
    return (
      <section className="page-content container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h1>Service Center Not Found</h1>
        <p>The requested location service center could not be located.</p>
        <Link href="/service-center/" className="button button-primary" style={{ marginTop: '16px' }}>
          View All Service Centers
        </Link>
      </section>
    );
  }

  // Determine active display name
  const effectiveCustomArea = customArea || (subAreaName && subAreaName !== 'other-location' && subAreaName !== 'Other Location' ? subAreaName : '');
  const displayCityOnly = area.slug === 'secunderabad' ? 'Secunderabad' : 'Hyderabad';
  const displayTitle = effectiveCustomArea
    ? `${effectiveCustomArea}, ${displayCityOnly}`
    : (subAreaName === 'other-location' || subAreaName === 'Other Location' ? `Your Location in ${displayCityOnly}` : area.name);

  // Pre-configured colonies and residential landmarks within 10 km (excluding 'Other Location' from regular pills)
  const rawColonies = area.colonies || area.landmarks || [];
  const coloniesList = rawColonies.filter((c) => c !== 'Other Location' && c !== 'other-location');

  const handleInlineAutoDetect = async () => {
    if (!navigator.geolocation) {
      setInputError('Geolocation is not supported by your browser.');
      return;
    }
    setDetectingLoc(true);
    setInputError('');
    setDetectedMsg('');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          let found = '';
          let fullDisplay = '';

          // 1. Nominatim OpenStreetMap (High Accuracy Reverse Geocoding)
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              { headers: { 'Accept-Language': 'en' } }
            );
            const data = await res.json();
            if (data) {
              fullDisplay = data.display_name || '';
              const parts = (data.display_name || '').split(',').map((s) => s.trim()).filter(Boolean);
              const skipKeywords = [
                'greater hyderabad',
                'mandal',
                'telangana',
                'india',
                'ward ',
                'district',
                'iso3166',
                'municipal corporation',
              ];
              const meaningful = [];
              for (const p of parts) {
                const lower = p.toLowerCase();
                if (!skipKeywords.some((k) => lower.includes(k)) && !/^\d{6}$/.test(p)) {
                  if (!meaningful.some((m) => m.toLowerCase() === lower)) {
                    meaningful.push(p);
                  }
                }
              }

              if (meaningful.length > 0) {
                found = meaningful.slice(0, 3).join(', ');
              } else if (data.address) {
                const a = data.address;
                const localParts = [
                  a.building || a.amenity || a.residential || a.house_name,
                  a.road || a.street,
                  a.neighbourhood || a.quarter,
                  a.suburb || a.village,
                ].filter(Boolean);
                found = [...new Set(localParts)].join(', ');
              }
            }
          } catch {}

          // 2. BigDataCloud Fallback
          if (!found) {
            try {
              const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await res.json();
              if (data) {
                const parts = [
                  data.locality,
                  data.localityInfo?.administrative?.[3]?.name,
                  data.localityInfo?.administrative?.[2]?.name,
                  data.city,
                ].filter(Boolean);
                found = [...new Set(parts)].slice(0, 3).join(', ');
              }
            } catch {}
          }

          if (found) {
            setCustomAreaInput(found);
            setDetectedMsg(`Exact Location Pinned: ${found}`);
          } else {
            setInputError('Could not pinpoint exact colony or street. Please enter your location manually.');
          }
        } catch (err) {
          setInputError('Unable to detect exact location. Please enter manually.');
        } finally {
          setDetectingLoc(false);
        }
      },
      (err) => {
        setDetectingLoc(false);
        setInputError(err.code === 1 ? 'GPS location permission was denied. Please enter your area manually.' : 'Unable to retrieve exact GPS location.');
      },
      { timeout: 15000, enableHighAccuracy: true, maximumAge: 0 }
    );
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const trimmed = customAreaInput.trim();
    if (!trimmed) {
      setInputError('Please enter your colony, society or area name.');
      return;
    }
    setShowOtherBox(false);
    try {
      localStorage.setItem('doorstep-subarea', trimmed);
    } catch {}

    const targetCity = area.slug === 'secunderabad' ? 'secunderabad' : 'hyderabad';
    const matched = coloniesList.find((c) => c.toLowerCase() === trimmed.toLowerCase());
    if (matched) {
      router.push(`/locations/${targetCity}/${slugify(matched)}/`);
    } else {
      router.push(`/locations/${targetCity}/other-location/?customArea=${encodeURIComponent(trimmed)}`);
    }
  };

  const customParam = effectiveCustomArea ? `?customArea=${encodeURIComponent(effectiveCustomArea)}` : '';

  return (
    <div className="loc-ref-page">
      {/* Hero Section matching reference screenshot */}
      <section className="loc-ref-hero">
        <div className="container">
          {/* Top Breadcrumbs + Direct Hub Tags */}
          <div className="loc-ref-topbar">
            <div className="loc-ref-breadcrumbs">
              <Link href="/">Home</Link>
              <span>&gt;</span>
              <Link href="/service-center/">Locations</Link>
              <span>&gt;</span>
              <span>{displayTitle} (10 KM Radius)</span>
            </div>

            <div className="loc-ref-tags-strip">
              <span className="loc-tag-direct">DIRECT HUB: {displayTitle}</span>
              <span className="loc-tag-white">Service: ✓ Same-Day</span>
              <span className="loc-tag-white">📍 10 KM</span>
            </div>
          </div>

          {/* Hero Center Block */}
          <div className="loc-hero-center">
            <div className="loc-radius-top-chip">
              <ShieldCheck size={14} />
              <span>10 KM SERVICE RADIUS COVERAGE HUB</span>
            </div>

            <h1 className="loc-ref-title">
              Doorstep Appliance Repair in{' '}
              <span className="highlight-city">{displayTitle}</span>
            </h1>

            <p className="loc-ref-subtitle">
              Certified multi-brand technicians dispatched directly to your home within 60–90 minutes. Enjoy ₹0 Booking Fee and comprehensive repair coverage across all residential colonies within a 10 KM radius of {displayTitle} Dispatch Hub.
            </p>

            {/* 4 Feature Metrics Card Bar */}
            <div className="loc-metrics-grid">
              <div className="loc-metric-item">
                <div className="loc-metric-icon">
                  <Zap size={18} />
                </div>
                <div className="loc-metric-info">
                  <strong>10 KM Service Radius Reach</strong>
                  <span>On-demand service across all residential colonies</span>
                </div>
              </div>

              <div className="loc-metric-item">
                <div className="loc-metric-icon">
                  <Clock size={18} />
                </div>
                <div className="loc-metric-info">
                  <strong>60–90 Min Arrival</strong>
                  <span>Fast mobile doorstep technician dispatch</span>
                </div>
              </div>

              <div className="loc-metric-item">
                <div className="loc-metric-icon">
                  <ShieldCheck size={18} />
                </div>
                <div className="loc-metric-info">
                  <strong>90-Day Digital Warranty</strong>
                  <span>Guaranteed genuine spare parts with warranty card</span>
                </div>
              </div>

              <div className="loc-metric-item">
                <div className="loc-metric-icon">
                  <MapPin size={18} />
                </div>
                <div className="loc-metric-info">
                  <strong>Local Hub: {displayCityOnly}</strong>
                  <span>Certified technicians stationed locally</span>
                </div>
              </div>
            </div>

            {/* 3 Hero CTA Action Buttons */}
            <div className="loc-ref-hero-actions">
              <Link
                href={`/booking/?area=${encodeURIComponent(effectiveCustomArea || area.name)}`}
                className="btn-cyan-solid"
              >
                <span>Book Service in {displayTitle}</span>
              </Link>

              <a
                href={`tel:${PHONE_E164}`}
                className="btn-white-call"
              >
                <Phone size={16} />
                <span>Call Dispatch: {PHONE_DISPLAY}</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green-wa"
              >
                <MessageCircle size={16} />
                <span>WhatsApp {displayCityOnly} Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Colonies & Areas Covered Within 10 KM */}
      <section className="loc-ref-section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="loc-ref-sec-header">
            <span className="loc-ref-eyebrow">LOCAL SERVICE COVERAGE</span>
            <h2 className="loc-ref-sec-title">
              Colonies &amp; Areas Covered Within 10 KM of {area.name}
            </h2>
            <p className="loc-ref-sec-desc">
              Our mobile technician vans are stationed across {area.name} to guarantee rapid 60–90 min doorstep response in all surrounding colonies, metro stations, and residential societies:
            </p>
          </div>

          {/* Colonies Grid */}
          <div className="loc-colonies-grid">
            {coloniesList.map((colony, idx) => {
              const cSlug = slugify(colony);
              const colonyHref = baseLocationPath 
                ? `${baseLocationPath}/`
                : `/locations/${area.slug}/${cSlug}/`;
              return (
                <Link
                  key={idx}
                  href={colonyHref}
                  className="loc-colony-card"
                  title={`View all repair categories in ${colony}`}
                >
                  <div className="colony-icon-pill">
                    <MapPin size={15} />
                  </div>
                  <span className="loc-colony-name">{colony}</span>
                  <span className="loc-colony-arrow" aria-hidden="true">→</span>
                </Link>
              );
            })}

            {/* Dedicated Interactive "Other Sub-Area / Colony" Option Card matching reference */}
            <button
              type="button"
              onClick={() => {
                setShowOtherBox((prev) => !prev);
                setInputError('');
                setDetectedMsg('');
              }}
              className="loc-colony-card"
              style={{
                background: showOtherBox ? '#FFF4EC' : '#FFF9F5',
                border: showOtherBox ? '1.5px solid #FF6B00' : '1.5px dashed #FF6B00',
                color: '#0A2558',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
              }}
              title="Click to enter your colony, society or sub-area manually or auto-detect"
            >
              <div
                className="colony-icon-pill"
                style={{
                  background: showOtherBox ? '#FF6B00' : '#0A2558',
                  color: showOtherBox ? '#FFFFFF' : '#FF9E4A',
                  boxShadow: showOtherBox
                    ? '0 4px 10px rgba(255, 107, 0, 0.3)'
                    : '0 4px 10px rgba(10, 37, 88, 0.2)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Sparkles size={16} strokeWidth={2.4} />
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <span className="loc-colony-name" style={{ color: '#0A2558', fontWeight: 800 }}>
                  + Other Sub-Area / Colony
                </span>
                <span style={{ fontSize: '11px', color: '#FF6B00', fontWeight: 700 }}>
                  {showOtherBox ? 'Close' : 'Enter Area'}
                </span>
              </div>
              <span className="loc-colony-arrow" style={{ color: showOtherBox ? '#0A2558' : '#FF6B00', fontWeight: 800 }} aria-hidden="true">
                {showOtherBox ? '✕' : '→'}
              </span>
            </button>
          </div>

          {/* Inline Expandable Other Location Panel matching User Reference */}
          {showOtherBox && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0 24px 0',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9F5 100%)',
                  border: '1.5px solid #FFCCA3',
                  borderRadius: '16px',
                  padding: '22px 26px',
                  boxShadow: '0 8px 30px rgba(10, 37, 88, 0.08), 0 2px 8px rgba(255, 107, 0, 0.05)',
                  maxWidth: '680px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sparkles size={18} color="#FF6B00" />
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0A2558' }}>
                  Don&apos;t see your locality? Enter your sub-area in {area.name}:
                </h3>
              </div>

              <p style={{ margin: '0 0 16px 0', fontSize: '13.5px', color: '#475569', lineHeight: 1.5 }}>
                <span style={{ color: '#FF6B00' }}>⚡</span> <strong style={{ color: '#0A2558' }}>Express Doorstep Dispatch:</strong> Certified technicians reach all residential colonies and apartments in {area.name} within 60–90 minutes.
              </p>

              <form onSubmit={handleCustomSubmit}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'stretch' }}>
                  <div style={{ flex: '1 1 320px', position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <MapPin size={18} style={{ position: 'absolute', left: '14px', color: '#FF6B00', pointerEvents: 'none' }} />
                    <input
                      type="text"
                      placeholder={`Enter your colony or landmark in ${area.name}`}
                      value={customAreaInput}
                      onChange={(e) => {
                        setCustomAreaInput(e.target.value);
                        setInputError('');
                      }}
                      style={{
                        width: '100%',
                        padding: '13px 125px 13px 42px',
                        borderRadius: '10px',
                        border: inputError ? '1.5px solid #EF4444' : '1.5px solid #FFCCA3',
                        background: '#FFFFFF',
                        fontSize: '14.5px',
                        color: '#0F172A',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleInlineAutoDetect}
                      disabled={detectingLoc}
                      style={{
                        position: 'absolute',
                        right: '6px',
                        background: detectingLoc ? '#F1F5F9' : '#FFF4EC',
                        border: '1px solid #FFCCA3',
                        color: '#0A2558',
                        padding: '6px 12px',
                        borderRadius: '7px',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        cursor: detectingLoc ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                      title="Auto-detect using GPS"
                    >
                      {detectingLoc ? (
                        <Loader2 size={13} className="animate-spin" color="#FF6B00" />
                      ) : (
                        <LocateFixed size={13} color="#FF6B00" />
                      )}
                      <span>{detectingLoc ? 'Detecting...' : 'Auto Detect'}</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#FF6B00',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '13px 24px',
                      fontSize: '14.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(255, 107, 0, 0.35)',
                      transition: 'background 0.2s ease',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#E55A00'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#FF6B00'; }}
                  >
                    <span>View Services In this Area</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {inputError && (
                  <span style={{ display: 'block', color: '#DC2626', fontSize: '12px', marginTop: '6px', fontWeight: 600 }}>
                    {inputError}
                  </span>
                )}

                {detectedMsg && (
                  <span style={{ display: 'block', color: '#0A2558', fontSize: '12px', marginTop: '8px', fontWeight: 700 }}>
                    <span style={{ color: '#FF6B00', marginRight: '4px' }}>✓</span> Exact Location Pinned: {detectedMsg.replace(/^Exact Location Pinned:\s*/i, '')}
                  </span>
                )}
              </form>
            </div>
          </div>
        )}

          {/* 10 KM Radius Protection Guarantee Strip */}
          <div className="loc-radius-guarantee-strip">
            <MapPin size={22} style={{ flexShrink: 0, color: '#FF6B00' }} />
            <div>
              <strong>10 KM Radius Protection Guarantee:</strong> Even if your exact house, street or gated apartment society is not listed above, our mobile team covers all residential locations within a 10 KM radial perimeter from our {area.name} central dispatch hub. Click &quot;Other Location&quot; above to book for your specific area.
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Repair Categories in this Location */}
      <section className="loc-ref-section" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div className="loc-ref-sec-header">
            <span className="loc-ref-eyebrow">DOORSTEP SERVICES AVAILABLE</span>
            <h2 className="loc-ref-sec-title">
              Repair Categories in {displayTitle}
            </h2>
            <p className="loc-ref-sec-desc">
              Choose any appliance category below for same-day inspection, upfront diagnostic estimate, and doorstep repairs:
            </p>
          </div>

          {/* 3-Column Categories Grid */}
          <div className="loc-categories-grid-3col">
            {SERVICES.map((cat) => (
              <div key={cat.slug} className="loc-cat-card-modern">
                {/* Photo with Badges */}
                <div className="loc-cat-photo-wrap">
                  <Image
                    src={cat.image}
                    alt={`${cat.name} in ${displayTitle}`}
                    width={400}
                    height={220}
                    priority
                  />
                  <div className="badge-tech-dispatch">
                    TECH DISPATCH
                  </div>
                  <div className="badge-subcat-count">
                    {cat.subcategories?.length || 3} Subcategories
                  </div>
                </div>

                {/* Card Content */}
                <div className="loc-cat-content">
                  <h3 className="loc-cat-title-text">
                    {cat.name} in {displayTitle}
                  </h3>

                  <p className="loc-cat-desc-text">
                    {cat.short}
                  </p>

                  <span className="loc-key-services-title">
                    KEY SERVICES COVERED:
                  </span>

                  {/* Subcategories Pills */}
                  {cat.subcategories && (
                    <div className="loc-sub-pills-row">
                      {cat.subcategories.map((sub) => (
                        <span key={sub.id} className="loc-sub-chip-badge">
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Pricing Box */}
                  <div className="loc-cat-pricing-box">
                    <span className="pricing-box-label">
                      Diagnostic Fee in {displayCityOnly}:
                    </span>
                    <div className="pricing-box-val">
                      <span className="price-strike">From ₹399</span>
                      <strong className="price-green-bold">₹{SERVICE_PRICE}</strong>
                    </div>
                  </div>

                  {/* Dual Buttons */}
                  <div className="loc-cat-dual-buttons">
                    <Link
                      href={
                        baseLocationPath
                          ? `${baseLocationPath}/${cat.slug}/book/${customParam}`
                          : `/booking/?service=${encodeURIComponent(cat.name)}&area=${encodeURIComponent(effectiveCustomArea || area.name)}`
                      }
                      className="btn-cat-book"
                    >
                      Book in {effectiveCustomArea || subAreaName || area.name}
                    </Link>
                    <Link
                      href={
                        baseLocationPath
                          ? `${baseLocationPath}/${cat.slug}/${customParam}`
                          : `/services/${cat.slug}/`
                      }
                      className="btn-cat-subcats"
                    >
                      Subcategories &gt;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Bottom Rapid Transit Dispatch CTA Banner */}
      <section className="container">
        <div className="loc-ref-dispatch-banner">
          <div className="dispatch-badge-pill">
            <Clock size={13} />
            <span>RAPID TRANSIT DISPATCH</span>
          </div>

          <h2>Fast Doorstep Dispatch in {displayTitle} Within 90 Minutes</h2>

          <p>
            No matter which colony you live in within a 10 KM radius of {displayTitle} Dispatch Hub, our certified technicians reach you with calibrated equipment.
          </p>

          <div className="dispatch-banner-actions">
            <Link
              href={`/booking/?area=${encodeURIComponent(effectiveCustomArea || area.name)}`}
              className="btn-dispatch-white"
            >
              Book Technician Now
            </Link>

            <a
              href={`tel:${PHONE_E164}`}
              className="btn-dispatch-call"
            >
              <Phone size={16} />
              <span>Call +91 {PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
