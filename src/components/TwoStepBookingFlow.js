'use client';
import { useState, useEffect } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Loader2,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
  Clock,
  Check,
  Navigation,
  LocateFixed,
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { AREAS, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL, SERVICE_PRICE, CITY } from '@/lib/site';

// Pixel-perfect SVG Appliance Icons matching the screenshot
function AcIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="9" rx="2" />
      <line x1="6" y1="9" x2="10" y2="9" />
      <circle cx="18" cy="8.5" r="0.7" fill={color} />
      {/* Airflow waves */}
      <path d="M5 16c1.5 1.5 2.5 1.5 4 0" />
      <path d="M10 16c1.5 1.5 2.5 1.5 4 0" />
      <path d="M15 16c1.5 1.5 2.5 1.5 4 0" />
    </svg>
  );
}

function FridgeIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="8" y1="5" x2="8" y2="7" />
      <line x1="8" y1="12" x2="8" y2="15" />
    </svg>
  );
}

function WashingMachineIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <path d="M12 10.5a2.5 2.5 0 0 1 2.5 2.5" />
      <circle cx="7.5" cy="5.5" r="1" fill={color} />
      <line x1="12" y1="5.5" x2="16.5" y2="5.5" />
    </svg>
  );
}

function OvenIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <rect x="5" y="8" width="10" height="8" rx="1" />
      <circle cx="18" cy="9" r="1" fill={color} />
      <circle cx="18" cy="14" r="1" fill={color} />
    </svg>
  );
}

function GeyserIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <circle cx="12" cy="10" r="3" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
    </svg>
  );
}

function TvIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="13" rx="2" />
      <polyline points="17 2 12 6 7 2" />
    </svg>
  );
}

const APPLIANCES = [
  { id: 'ac', name: 'AC SERVICE', icon: AcIcon },
  { id: 'refrigerator', name: 'REFRIGERATOR', icon: FridgeIcon },
  { id: 'washing-machine', name: 'WASHING MACHINE', icon: WashingMachineIcon },
  { id: 'oven', name: 'OVEN / MICROWAVE', icon: OvenIcon },
  { id: 'geyser', name: 'GEYSER / HEATER', icon: GeyserIcon },
  { id: 'tv', name: 'LED / SMART TV', icon: TvIcon },
];

const APPLIANCE_SUBCATEGORIES = {
  ac: [
    { id: 'split-ac-repair', name: 'Split AC Repair', price: '₹299' },
    { id: 'cassette-ac-repair', name: 'Cassette AC Repair', price: '₹499' },
    { id: 'ac-installation-service', name: 'AC Installation Service', price: '₹499' },
  ],
  refrigerator: [
    { id: 'single-door-fridge-repair', name: 'Single Door Fridge Repair', price: '₹299' },
    { id: 'double-door-refrigerator', name: 'Double Door Refrigerator', price: '₹399' },
    { id: 'side-by-side-door-refrigerator', name: 'Side by Side Door Refrigerator', price: '₹499' },
  ],
  'washing-machine': [
    { id: 'front-load-washing-machine', name: 'Front Load Washing Machine', price: '₹349' },
    { id: 'top-load-washing-machine-repair', name: 'Top Load Washing Machine Repair', price: '₹299' },
  ],
  oven: [
    { id: 'convectional-oven-repair', name: 'Convectional Oven Repair', price: '₹349' },
    { id: 'microwave-oven-repair', name: 'Microwave Oven Repair', price: '₹299' },
  ],
  geyser: [
    { id: 'electric-geyser-repair', name: 'Electric Geyser Repair', price: '₹299' },
    { id: 'instant-geyser-repair', name: 'Instant Geyser Repair', price: '₹299' },
  ],
  tv: [
    { id: 'lcd-tv', name: 'LCD TV', price: '₹349' },
    { id: 'led-tv', name: 'LED TV', price: '₹349' },
    { id: 'smart-android-tv', name: 'Smart Android TV', price: '₹399' },
    { id: 'tv-installation-wall-mounting', name: 'TV Installation / Wall Mounting', price: '₹299' },
  ],
};

export default function TwoStepBookingFlow() {
  const [selectedAppliance, setSelectedAppliance] = useState('ac');
  const [selectedSubcategory, setSelectedSubcategory] = useState('split-ac-repair');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApplianceSelect = (appId) => {
    setSelectedAppliance(appId);
    const subcats = APPLIANCE_SUBCATEGORIES[appId] || [];
    if (subcats.length > 0) {
      setSelectedSubcategory(subcats[0].id);
    }
  };
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [emailSentStatus, setEmailSentStatus] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [detectedAddress, setDetectedAddress] = useState('');
  const { showToast } = useToast();

  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.', 'error');
      return;
    }

    setDetectingLocation(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Attempt Google Geocoding API first (supports custom API key via NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
          let foundLocality = '';
          let fullAddr = '';

          if (apiKey) {
            const googleRes = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const googleData = await googleRes.json();
            if (googleData.status === 'OK' && googleData.results?.[0]) {
              fullAddr = googleData.results[0].formatted_address;
              // Extract sublocality or neighborhood
              for (const comp of googleData.results[0].address_components) {
                if (
                  comp.types.includes('sublocality') ||
                  comp.types.includes('sublocality_level_1') ||
                  comp.types.includes('neighborhood') ||
                  comp.types.includes('locality')
                ) {
                  foundLocality = comp.long_name;
                  break;
                }
              }
            }
          }

          // Fallback reverse geocoding via OpenStreetMap Nominatim if no Google key or quota
          if (!fullAddr) {
            const osmRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const osmData = await osmRes.json();
            if (osmData && osmData.address) {
              const a = osmData.address;
              foundLocality = a.suburb || a.neighbourhood || a.residential || a.city_district || a.city || a.town || 'Hyderabad';
              fullAddr = osmData.display_name;
            }
          }

          // Check if detected locality matches any of our Hyderabad areas
          const matchedArea = AREAS.find(
            (item) =>
              foundLocality &&
              (item.name.toLowerCase().includes(foundLocality.toLowerCase()) ||
                foundLocality.toLowerCase().includes(item.name.toLowerCase()))
          );

          if (matchedArea) {
            setArea(matchedArea.name);
            setDetectedAddress(fullAddr || `${matchedArea.name}, Hyderabad`);
            showToast(`📍 Auto-detected location: ${matchedArea.name}`, 'success');
          } else if (foundLocality) {
            // Check if locality is near any of the 4 locations
            setArea(foundLocality);
            setDetectedAddress(fullAddr || foundLocality);
            showToast(`📍 Location detected: ${foundLocality}`, 'success');
          } else {
            setArea('Ameerpet Main Road');
            setDetectedAddress(fullAddr || 'Ameerpet Main Road, Hyderabad');
            showToast('📍 Location pinned to Ameerpet Main Road, Hyderabad', 'success');
          }
        } catch (err) {
          console.error('Location error:', err);
          showToast('Could not fetch exact address name. Please select your area below.', 'info');
        } finally {
          setDetectingLocation(false);
        }
      },
      (geoError) => {
        setDetectingLocation(false);
        let msg = 'Unable to retrieve your location.';
        if (geoError.code === geoError.PERMISSION_DENIED) {
          msg = 'Location access denied. Please select your locality from the list.';
        }
        setError(msg);
        showToast(msg, 'info');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
      if (user) {
        if (user.name) setName(user.name);
        if (user.phone) setPhone(user.phone);
        if (user.email) setEmail(user.email);
      }
      const savedArea = localStorage.getItem('doorstep-area');
      if (savedArea) setArea(savedArea);
    } catch {}

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const srvParam = (params.get('service') || params.get('appliance') || params.get('category') || '').toLowerCase();
      let targetApp = '';
      if (srvParam.includes('ac')) targetApp = 'ac';
      else if (srvParam.includes('fridge') || srvParam.includes('refrigerator')) targetApp = 'refrigerator';
      else if (srvParam.includes('washing') || srvParam.includes('washer')) targetApp = 'washing-machine';
      else if (srvParam.includes('oven') || srvParam.includes('microwave')) targetApp = 'oven';
      else if (srvParam.includes('geyser') || srvParam.includes('heater')) targetApp = 'geyser';
      else if (srvParam.includes('tv')) targetApp = 'tv';

      if (targetApp && APPLIANCE_SUBCATEGORIES[targetApp]) {
        setSelectedAppliance(targetApp);
        const subParam = params.get('sub') || params.get('subcategory');
        if (subParam && APPLIANCE_SUBCATEGORIES[targetApp].some((s) => s.id === subParam)) {
          setSelectedSubcategory(subParam);
        } else {
          setSelectedSubcategory(APPLIANCE_SUBCATEGORIES[targetApp][0].id);
        }
      }
    }
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address to receive booking confirmation.');
      return;
    }

    if (!area || area === 'Select Area') {
      setError('Please select your service locality in Hyderabad.');
      return;
    }

    setError('');
    setLoading(true);

    const genId = 'DS-' + Math.floor(100000 + Math.random() * 900000);
    const appObj = APPLIANCES.find((a) => a.id === selectedAppliance);
    const applianceName = appObj?.name || 'Home Appliance Service';
    const subcats = APPLIANCE_SUBCATEGORIES[selectedAppliance] || [];
    const subObj = subcats.find((s) => s.id === selectedSubcategory) || subcats[0];
    const subcategoryName = subObj?.name || '';
    const fullServiceLabel = subcategoryName ? `${applianceName} — ${subcategoryName}` : applianceName;
    try {
      // Call Node.js Backend API to send confirmation email
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://backendapi.homeappliancerepairsservices.com';
      const response = await fetch(`${apiBase}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingRef: genId,
          name: name.trim(),
          phone: cleanPhone,
          email: email.trim(),
          service: fullServiceLabel,
          appliance: applianceName,
          subcategory: subcategoryName,
          fullService: fullServiceLabel,
          price: subObj?.price || '₹299',
          area: area,
          address: detectedAddress ? `${area} (GPS: ${detectedAddress})` : `${area}, Hyderabad`,
        }),
      });

      const data = await response.json();

      if (!response.ok && !data.success) {
        throw new Error(data.error || 'Failed to dispatch booking');
      }

      setBookingRef(genId);
      setEmailSentStatus(Boolean(data.userEmailSent));

      // Save order in browser localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('doorstep-orders') || '[]');
        existing.unshift({
          id: genId,
          service: fullServiceLabel,
          subcategory: subcategoryName,
          name: name.trim(),
          phone: cleanPhone,
          email: email.trim(),
          area: area,
          price: subObj?.price || SERVICE_PRICE,
          status: 'Engineer Dispatched · Within 90 mins',
          emailConfirmed: Boolean(data.userEmailSent),
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('doorstep-orders', JSON.stringify(existing));

        // Save user details
        localStorage.setItem(
          'doorstep-user',
          JSON.stringify({ name: name.trim(), phone: cleanPhone, email: email.trim() })
        );
        localStorage.setItem('doorstep-area', area);
      } catch {}

      setIsSuccess(true);
      showToast(
        data.userEmailSent
          ? `Booking confirmed! Email sent to ${email.trim()}.`
          : `Service booked! Reference: ${genId}`,
        'success'
      );
    } catch (err) {
      console.error('Booking submission error:', err);
      // Fallback: still show booking success locally even if mail transport had an issue
      setBookingRef(genId);
      setEmailSentStatus(false);
      setIsSuccess(true);
      showToast('Technician dispatched! Our team will call you shortly.', 'success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="two-step-booking-wrap">
      <div className="container">
        <div className="two-step-grid">
          {/* Left Column: Heading, Explanation & Trust Cards */}
          <div className="two-step-left-content">
            <span className="free-booking-badge">FREE BOOKING</span>
            <h1 className="two-step-main-title">
              Easy Repair Dispatch
            </h1>
            <p className="two-step-instructions">
              <strong>Simple Booking:</strong> 1. Tap your appliance, 2. Select sub-category, 3. Enter your contact details.
            </p>
            <p className="two-step-dispatch-sub">
              A certified local engineer will arrive at your doorstep in Hyderabad within 90 minutes.
            </p>

            {/* Benefit Cards */}
            <div className="two-step-perks">
              <div className="two-step-perk-card">
                <div className="perk-circle-icon orange-tint">
                  <CheckCircle2 size={22} color="#FF6B00" strokeWidth={2.3} />
                </div>
                <div className="perk-text-wrap">
                  <strong>No Booking Fee</strong>
                  <p>Registration is free. Pay only after diagnostics.</p>
                </div>
              </div>

              <div className="two-step-perk-card">
                <div className="perk-circle-icon navy-tint">
                  <ShieldCheck size={22} color="#0A2558" strokeWidth={2.3} />
                </div>
                <div className="perk-text-wrap">
                  <strong>Certified Vetted Techs</strong>
                  <p>Background-checked, highly-rated Hyderabad experts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2-Step Request Service Box */}
          <div className="two-step-right-box">
            <div className="request-service-card">
              <div className="request-service-header">
                <h2>Request Service</h2>
                <p>Tap your appliance, enter details, and book your technician.</p>
              </div>

              {isSuccess ? (
                <div className="booking-success-container">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={56} color="#FF6B00" strokeWidth={2.2} />
                  </div>
                  <h3>Technician Dispatched!</h3>
                  <p className="success-ref-lead">
                    Booking Reference: <strong>{bookingRef}</strong>
                  </p>
                  
                  {emailSentStatus ? (
                    <div className="email-status-pill success">
                      <Mail size={16} /> Confirmation email sent to <strong>{email}</strong>
                    </div>
                  ) : (
                    <div className="email-status-pill info">
                      <Clock size={16} /> Technician dispatched! Our coordinator will call you directly.
                    </div>
                  )}

                  <div className="success-meta-box">
                    <div className="meta-item">
                      <small>APPLIANCE</small>
                      <strong>{APPLIANCES.find((a) => a.id === selectedAppliance)?.name}</strong>
                    </div>
                    <div className="meta-item">
                      <small>SUB-CATEGORY</small>
                      <strong style={{ color: '#0A2558' }}>
                        {(APPLIANCE_SUBCATEGORIES[selectedAppliance] || []).find((s) => s.id === selectedSubcategory)?.name || 'Standard Repair'}
                      </strong>
                    </div>
                    <div className="meta-item">
                      <small>AREA</small>
                      <strong>{area || 'Hyderabad'}</strong>
                    </div>
                    <div className="meta-item">
                      <small>ARRIVAL TIME</small>
                      <strong style={{ color: '#FF6B00' }}>Within 90 Mins</strong>
                    </div>
                    <div className="meta-item">
                      <small>BOOKING FEE</small>
                      <strong style={{ color: '#0A2558' }}>FREE (₹0)</strong>
                    </div>
                  </div>

                  <div className="success-actions-row">
                    <a href={`tel:${PHONE_E164}`} className="button button-primary success-btn">
                      <Phone size={16} /> Call Hotline: {PHONE_DISPLAY}
                    </a>
                    <button
                      type="button"
                      className="button button-outline success-reset-btn"
                      onClick={() => setIsSuccess(false)}
                    >
                      Book Another Service
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} noValidate>
                  {/* Step 1: Tap Your Appliance */}
                  <div className="step-section">
                    <span className="step-label">1. TAP YOUR APPLIANCE</span>
                    <div className="appliance-tiles-row">
                      {APPLIANCES.map((app) => {
                        const IconComponent = app.icon;
                        const isSelected = selectedAppliance === app.id;
                        return (
                          <button
                            type="button"
                            key={app.id}
                            className={`appliance-tile-btn ${isSelected ? 'active' : ''}`}
                            onClick={() => handleApplianceSelect(app.id)}
                            aria-pressed={isSelected}
                          >
                            <div className="appliance-tile-icon">
                              <IconComponent size={26} color={isSelected ? '#FF6B00' : '#64748b'} />
                            </div>
                            <span className="appliance-tile-name">{app.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Choose Sub-Category */}
                  <div className="step-section subcategory-step-section">
                    <div className="subcat-header-row">
                      <span className="step-label" style={{ margin: 0 }}>2. SELECT SUB-CATEGORY</span>
                      <span className="subcat-hint">Select specific service type</span>
                    </div>

                    <div className="subcat-selection-grid">
                      {(APPLIANCE_SUBCATEGORIES[selectedAppliance] || []).map((sub) => {
                        const isSubActive = selectedSubcategory === sub.id;
                        return (
                          <button
                            type="button"
                            key={sub.id}
                            className={`subcat-select-btn ${isSubActive ? 'active' : ''}`}
                            onClick={() => setSelectedSubcategory(sub.id)}
                            aria-pressed={isSubActive}
                          >
                            <div className="subcat-radio-icon">
                              {isSubActive ? (
                                <CheckCircle2 size={16} color="#FF6B00" strokeWidth={2.4} />
                              ) : (
                                <span className="subcat-unselected-circle" />
                              )}
                            </div>
                            <div className="subcat-btn-inner">
                              <span className="subcat-btn-name">{sub.name}</span>
                              <span className="subcat-btn-price">From {sub.price}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Customer Details */}
                  <div className="step-section customer-details-section">
                    <span className="step-label">3. ENTER SERVICE DETAILS</span>
                    <div className="input-fields-row">
                      <div className="input-group">
                        <label>FULL NAME</label>
                        <div className="input-with-icon">
                          <User size={17} className="field-icon" />
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="input-group">
                        <label>MOBILE NUMBER</label>
                        <div className="input-with-icon">
                          <Phone size={17} className="field-icon" />
                          <input
                            type="tel"
                            placeholder="10-Digit Mobile Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="input-group" style={{ marginTop: '14px' }}>
                      <label>EMAIL ADDRESS (FOR DISPATCH CONFIRMATION)</label>
                      <div className="input-with-icon">
                        <Mail size={17} className="field-icon" />
                        <input
                          type="email"
                          placeholder="Your Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="input-group" style={{ marginTop: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ margin: 0 }}>SERVICE LOCALITY IN HYDERABAD</label>
                        <button
                          type="button"
                          onClick={handleAutoDetectLocation}
                          disabled={detectingLocation}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: '#FFF4EC',
                            border: '1px solid #FFCCA3',
                            color: '#FF6B00',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '11px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {detectingLocation ? (
                            <>
                              <Loader2 size={12} className="animate-spin" /> Detecting GPS...
                            </>
                          ) : (
                            <>
                              <LocateFixed size={12} /> Auto Detect Location
                            </>
                          )}
                        </button>
                      </div>

                      <div className="select-with-arrow">
                        <select
                          value={area}
                          onChange={(e) => {
                            setArea(e.target.value);
                            setDetectedAddress('');
                          }}
                          required
                        >
                          <option value="">Select Area in Hyderabad</option>
                          {AREAS.map((a) => (
                            <option key={a.slug} value={a.name}>
                              {a.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={17} className="select-arrow" />
                      </div>

                      {detectedAddress && (
                        <div
                          style={{
                            marginTop: '8px',
                            fontSize: '11px',
                            color: '#0A2558',
                            background: '#EEF3FA',
                            border: '1px solid #CBDDF5',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <Navigation size={13} color="#FF6B00" style={{ flexShrink: 0 }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            Detected: <strong>{detectedAddress}</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && <p className="form-error-text">{error}</p>}

                  {/* Primary CTA */}
                  <button
                    type="submit"
                    className="button button-primary book-dispatch-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Dispatching Technician & Sending Email...
                      </>
                    ) : (
                      <>
                        Book Service Now <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rapid Response Strip Below */}
      <section className="rapid-response-strip">
        <div className="container">
          <div className="rapid-badge-pill">
            <Sparkles size={14} color="#FF6B00" /> RAPID RESPONSE HELPLINE
          </div>
          <h2 className="rapid-heading">Need Quick Appliance Repair?</h2>
          <p className="rapid-desc">
            Don’t let a broken AC, refrigerator, or washing machine interrupt your routine. Tap below to call or chat with our Hyderabad technicians immediately.
          </p>

          <p className="tap-icons-hint">TAP ICONS BELOW TO CONNECT WITH US DIRECTLY</p>

          {/* 3 Action Cards (Call, WhatsApp, Location) */}
          <div className="rapid-cards-grid">
            <a href={`tel:${PHONE_E164}`} className="rapid-action-card">
              <div className="rapid-card-icon-circle call-bg">
                <Phone size={24} color="#0A2558" />
              </div>
              <span className="rapid-card-label">CALL</span>
            </a>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent('Hello Doorstep Service Hyderabad, I need immediate appliance repair assistance.')}`}
              target="_blank"
              rel="noreferrer"
              className="rapid-action-card"
            >
              <div className="rapid-card-icon-circle whatsapp-bg">
                <MessageCircle size={24} color="#FF6B00" />
              </div>
              <span className="rapid-card-label">WHATSAPP</span>
            </a>

            <a
              href="#service-locations"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showToast(`We cover Ameerpet Main Road, Chanda Nagar, Alwal, and Suchitra!`, 'info');
              }}
              className="rapid-action-card"
            >
              <div className="rapid-card-icon-circle location-bg">
                <MapPin size={24} color="#FF6B00" />
              </div>
              <span className="rapid-card-label">LOCATION</span>
            </a>
          </div>

          {/* Social Icons Row */}
          <div className="rapid-social-row">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-circle-btn" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-circle-btn" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-circle-btn" aria-label="YouTube">
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
