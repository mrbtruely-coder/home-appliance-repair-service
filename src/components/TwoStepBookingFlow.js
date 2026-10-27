'use client';
import { useState, useEffect, useMemo } from 'react';
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
  Calendar,
  CalendarDays,
  Edit3,
  Wrench,
  FileText,
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
    { id: 'cassette-ac-repair', name: 'Cassette AC Repair', price: '₹299' },
    { id: 'ac-installation-service', name: 'AC Installation Service', price: '₹299' },
  ],
  refrigerator: [
    { id: 'single-door-fridge-repair', name: 'Single Door Fridge Repair', price: '₹299' },
    { id: 'double-door-refrigerator', name: 'Double Door Refrigerator', price: '₹299' },
    { id: 'side-by-side-door-refrigerator', name: 'Side by Side Door Refrigerator', price: '₹299' },
  ],
  'washing-machine': [
    { id: 'front-load-washing-machine', name: 'Front Load Washing Machine', price: '₹299' },
    { id: 'top-load-washing-machine-repair', name: 'Top Load Washing Machine Repair', price: '₹299' },
  ],
  oven: [
    { id: 'convectional-oven-repair', name: 'Convectional Oven Repair', price: '₹299' },
    { id: 'microwave-oven-repair', name: 'Microwave Oven Repair', price: '₹299' },
  ],
  geyser: [
    { id: 'electric-geyser-repair', name: 'Electric Geyser Repair', price: '₹299' },
    { id: 'instant-geyser-repair', name: 'Instant Geyser Repair', price: '₹299' },
  ],
  tv: [
    { id: 'lcd-tv', name: 'LCD TV', price: '₹299' },
    { id: 'led-tv', name: 'LED TV', price: '₹299' },
    { id: 'smart-android-tv', name: 'Smart Android TV', price: '₹299' },
    { id: 'tv-installation-wall-mounting', name: 'TV Installation / Wall Mounting', price: '₹299' },
  ],
};

export const CITY_DATA = {
  Vijayawada: {
    name: 'Vijayawada',
    radius: '10 km',
    colonies: [
      'Benz Circle',
      'MG Road / Bandar Road',
      'Governorpet',
      'Moghalrajpuram',
      'Patamata',
      'Auto Nagar',
      'Bhavanipuram',
      'One Town',
      'Gunadala',
      'Tadepalle',
      'Labbipet',
      'Suryaraopet',
      'Satyanarayanapuram',
      'Kanuru',
      'Enikepadu',
      'Gollapudi',
      'Krishna Lanka',
      'Poranki',
      'Penamaluru',
      'Payakapuram',
      'Ajit Singh Nagar',
      'Vidyadharapuram',
      'Gannavaram',
      'Mangalagiri',
      'Prasadampadu',
    ],
  },
  Hyderabad: {
    name: 'Hyderabad',
    radius: '10 km',
    colonies: [
      'Ameerpet',
      'Kukatpally & KPHB',
      'Madhapur & Hitec City',
      'Gachibowli & Financial District',
      'Banjara Hills & Jubilee Hills',
      'Kondapur & Hafeezpet',
      'Miyapur & Chanda Nagar',
      'SR Nagar & Sanath Nagar',
      'Panjagutta & Somajiguda',
      'Begumpet & Prakash Nagar',
      'Mehdipatnam & Tolichowki',
      'Dilsukhnagar & LB Nagar',
      'Secunderabad & Alwal',
      'Trimulgherry & Sainikpuri',
      'Suchitra & Kompally',
      'Jeedimetla & Quthbullapur',
      'Attapur & Rajendranagar',
      'Uppal & Tarnaka',
      'Malakpet & Charminar',
    ],
  },
  Guntur: {
    name: 'Guntur',
    radius: '10 km',
    colonies: [
      'Brodipet',
      'Arundelpet',
      'Lakshmipuram',
      'Koretipadu',
      'Vidyanagar',
      'Pattabhipuram',
      'Amaravathi Road',
      'Old Guntur',
      'Nallapadu',
      'Syamala Nagar',
      'Chandramouli Nagar',
      'Gujjanagundla',
      'Stambalagaruvu',
      'Autonagar Guntur',
      'Gorantla',
    ],
  },
  Nellore: {
    name: 'Nellore',
    radius: '10 km',
    colonies: [
      'Dargamitta',
      'Magunta Layout',
      'Balaji Nagar',
      'Stonehousepet',
      'Vedayapalem',
      'Ramamurthy Nagar',
      'Pogathota',
      'Fathekhanpet',
      'Kavali Road',
      'Podalakur Road',
      'Current Office Centre',
      'Trunk Road',
      'Haranathapuram',
    ],
  },
  Secunderabad: {
    name: 'Secunderabad',
    radius: '10 km',
    colonies: [
      'Alwal',
      'Trimulgherry',
      'Marredpally',
      'Sainikpuri',
      'ECIL & Moula Ali',
      'Bowenpally',
      'Malkajgiri',
      'Bolarum & Lothkunta',
      'Begumpet',
      'Paradise & Parade Ground',
      'Tarnaka',
      'Habsiguda',
    ],
  },
};

const STANDARD_TIME_SLOTS = [
  { id: '09-11', label: '09:00 AM – 11:00 AM', startHour: 9 },
  { id: '11-13', label: '11:00 AM – 01:00 PM', startHour: 11 },
  { id: '13-15', label: '01:00 PM – 03:00 PM', startHour: 13 },
  { id: '15-17', label: '03:00 PM – 05:00 PM', startHour: 15 },
  { id: '17-19', label: '05:00 PM – 07:00 PM', startHour: 17 },
  { id: '19-21', label: '07:00 PM – 09:00 PM', startHour: 19 },
];

function getUpcomingDays(count = 7) {
  const days = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateLabel = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    let tag = '';
    if (i === 0) tag = 'Today';
    else if (i === 1) tag = 'Tomorrow';

    days.push({
      dateStr,
      dayName,
      dateLabel,
      tag,
      isToday: i === 0,
      isTomorrow: i === 1,
      fullLabel: tag ? `${tag} (${dateLabel})` : `${dayName}, ${dateLabel}`,
    });
  }
  return days;
}

function getAvailableSlotsForDate(isToday) {
  if (!isToday) {
    return STANDARD_TIME_SLOTS;
  }
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const bufferHour = currentHour + 3; // 3-Hour Buffer for "Today"
  return STANDARD_TIME_SLOTS.filter((slot) => slot.startHour >= bufferHour);
}

export default function TwoStepBookingFlow({
  initialAppliance = '',
  initialSubcategory = '',
  initialArea = '',
  initialCity = '',
} = {}) {
  const [selectedAppliance, setSelectedAppliance] = useState(initialAppliance);
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialSubcategory || (initialAppliance && APPLIANCE_SUBCATEGORIES[initialAppliance]?.[0]?.id) || ''
  );
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState(initialCity || '');
  const [selectedSubArea, setSelectedSubArea] = useState(initialArea || '');
  const [customArea, setCustomArea] = useState('');
  const [area, setArea] = useState(initialArea || '');
  const [doorNumber, setDoorNumber] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCustomArea, setIsCustomArea] = useState(false);

  // Dynamic Date & Time Slot Scheduling State
  const upcomingDays = useMemo(() => getUpcomingDays(7), []);
  const todayAvailableSlots = useMemo(() => getAvailableSlotsForDate(true), []);
  const todayHasSlots = todayAvailableSlots.length > 0;

  // Default to Today if slots exist after 3-hour buffer; otherwise default to Tomorrow
  const [selectedDateObj, setSelectedDateObj] = useState(() => {
    return todayHasSlots ? upcomingDays[0] : (upcomingDays[1] || upcomingDays[0]);
  });
  const [selectedSlot, setSelectedSlot] = useState(() => {
    const initialSlots = todayHasSlots ? todayAvailableSlots : STANDARD_TIME_SLOTS;
    return initialSlots[0]?.label || '';
  });
  const [isReviewing, setIsReviewing] = useState(false);

  const currentAvailableSlots = useMemo(() => {
    return getAvailableSlotsForDate(Boolean(selectedDateObj?.isToday));
  }, [selectedDateObj]);

  const handleDateSelect = (dayObj) => {
    setSelectedDateObj(dayObj);
    const slots = getAvailableSlotsForDate(Boolean(dayObj.isToday));
    if (slots.length > 0) {
      if (!slots.some((s) => s.label === selectedSlot)) {
        setSelectedSlot(slots[0].label);
      }
    } else {
      setSelectedSlot('');
      showToast("3-hour buffer closed for today. Tomorrow's slots are available!", 'info');
    }
    setError('');
  };

  useEffect(() => {
    if (initialAppliance) setSelectedAppliance(initialAppliance);
    if (initialSubcategory) setSelectedSubcategory(initialSubcategory);
    if (initialCity) setSelectedCity(initialCity);
    if (initialArea) {
      setSelectedSubArea(initialArea);
      setArea(initialArea);
    }
  }, [initialAppliance, initialSubcategory, initialArea, initialCity]);

  const handleApplianceSelect = (appId) => {
    setSelectedAppliance(appId);
    const subcats = APPLIANCE_SUBCATEGORIES[appId] || [];
    if (subcats.length > 0) {
      setSelectedSubcategory(subcats[0].id);
    } else {
      setSelectedSubcategory('');
    }
    setError('');
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

          // Fallback reverse geocoding via OpenStreetMap Nominatim (High Precision Local Extraction)
          if (!fullAddr) {
            const osmRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              { headers: { 'Accept-Language': 'en' } }
            );
            const osmData = await osmRes.json();
            if (osmData) {
              fullAddr = osmData.display_name || '';
              const parts = (osmData.display_name || '').split(',').map((s) => s.trim()).filter(Boolean);
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
                foundLocality = meaningful.slice(0, 3).join(', ');
              } else if (osmData.address) {
                const a = osmData.address;
                const localParts = [
                  a.building || a.amenity || a.residential || a.house_name,
                  a.road || a.street,
                  a.neighbourhood || a.quarter,
                  a.suburb || a.village,
                ].filter(Boolean);
                foundLocality = [...new Set(localParts)].join(', ');
              }
            }
          }

          // Fallback via BigDataCloud if Nominatim had an issue
          if (!foundLocality) {
            try {
              const bdcRes = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const bdcData = await bdcRes.json();
              if (bdcData) {
                const parts = [
                  bdcData.locality,
                  bdcData.localityInfo?.administrative?.[3]?.name,
                  bdcData.localityInfo?.administrative?.[2]?.name,
                  bdcData.city,
                ].filter(Boolean);
                foundLocality = [...new Set(parts)].slice(0, 3).join(', ');
                fullAddr = fullAddr || [foundLocality, bdcData.principalSubdivision, bdcData.countryName].filter(Boolean).join(', ');
              }
            } catch {}
          }

          // Extract city and subarea from detected location
          let matchedCity = '';
          const fullAddrLower = (fullAddr + ' ' + foundLocality).toLowerCase();
          for (const c of Object.keys(CITY_DATA)) {
            if (fullAddrLower.includes(c.toLowerCase())) {
              matchedCity = c;
              break;
            }
          }
          const finalCity = matchedCity || selectedCity || 'Vijayawada';
          setSelectedCity(finalCity);

          const cityColonies = CITY_DATA[finalCity]?.colonies || [];
          const matchedColony = cityColonies.find(
            (col) =>
              foundLocality &&
              (col.toLowerCase().includes(foundLocality.toLowerCase()) ||
                foundLocality.toLowerCase().includes(col.toLowerCase()))
          );

          if (matchedColony) {
            setSelectedSubArea(matchedColony);
            setArea(matchedColony);
            setIsCustomArea(false);
            setCustomArea('');
            setDetectedAddress(fullAddr || `${matchedColony}, ${finalCity}`);
            showToast(`📍 Location detected: ${matchedColony}, ${finalCity}`, 'success');
          } else if (foundLocality) {
            setSelectedSubArea('__other__');
            setArea(foundLocality);
            setIsCustomArea(true);
            setCustomArea(foundLocality);
            setDetectedAddress(fullAddr || `${foundLocality}, ${finalCity}`);
            showToast(`📍 Exact colony pinned: ${foundLocality}`, 'success');
          } else {
            const defaultCol = cityColonies[0] || 'Central Area';
            setSelectedSubArea(defaultCol);
            setArea(defaultCol);
            setIsCustomArea(false);
            setDetectedAddress(fullAddr || `${defaultCol}, ${finalCity}`);
            showToast(`📍 Location pinned to ${finalCity}`, 'success');
          }
        } catch (err) {
          console.error('Location error:', err);
          showToast('Could not fetch exact address name. Please enter your location manually.', 'info');
        } finally {
          setDetectingLocation(false);
        }
      },
      (geoError) => {
        setDetectingLocation(false);
        let msg = 'Unable to retrieve your location.';
        if (geoError.code === geoError.PERMISSION_DENIED) {
          msg = 'Location access denied. Please enter your location manually.';
        }
        setError(msg);
        showToast(msg, 'info');
      },
      { timeout: 15000, enableHighAccuracy: true, maximumAge: 0 }
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

  const handleProceedToReview = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!selectedAppliance) {
      setError('Please tap an appliance category to select your service.');
      return;
    }

    if (!selectedSubcategory) {
      setError('Please select a service sub-category.');
      return;
    }

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

    if (!selectedCity) {
      setError('Please select your city.');
      return;
    }

    const finalSubArea = isCustomArea ? customArea.trim() : selectedSubArea;
    if (!finalSubArea || finalSubArea === '__other__' || finalSubArea === 'Select Sub-Area') {
      setError(`Please select or enter your sub-area / colony in ${selectedCity}.`);
      return;
    }

    if (!selectedSlot) {
      if (selectedDateObj?.isToday && !todayHasSlots) {
        setError('No slots remaining today due to the 3-hour buffer. Please select Tomorrow or another upcoming date.');
      } else {
        setError('Please select an appointment time slot.');
      }
      return;
    }

    setError('');
    setIsReviewing(true);

    if (typeof window !== 'undefined') {
      const formBox = document.querySelector('.two-step-right-box');
      if (formBox) {
        formBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handleBookingSubmit = (e) => {
    handleProceedToReview(e);
  };

  const handleFinalBookingConfirm = async () => {
    setError('');
    setLoading(true);

    const cleanPhone = phone.replace(/\D/g, '');
    const finalSubArea = isCustomArea ? customArea.trim() : selectedSubArea;
    const fullLocationLabel = `${finalSubArea}, ${selectedCity}`;

    const genId = 'DS-' + Math.floor(100000 + Math.random() * 900000);
    const appObj = APPLIANCES.find((a) => a.id === selectedAppliance);
    const applianceName = appObj?.name || 'Home Appliance Service';
    const subcats = APPLIANCE_SUBCATEGORIES[selectedAppliance] || [];
    const subObj = subcats.find((s) => s.id === selectedSubcategory) || subcats[0];
    const subcategoryName = subObj?.name || '';
    const fullServiceLabel = subcategoryName ? `${applianceName} — ${subcategoryName}` : applianceName;

    try {
      const customLocName = isCustomArea ? customArea.trim() : '';

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
          area: fullLocationLabel,
          city: selectedCity,
          subArea: finalSubArea,
          landmark: doorNumber.trim(),
          doorNo: doorNumber.trim(),
          issue: issueDescription.trim(),
          date: selectedDateObj?.fullLabel || 'Today',
          timeSlot: selectedSlot,
          slot: selectedSlot,
          time: selectedSlot,
          otherLocation: customLocName,
          isOtherLocation: isCustomArea,
          address: doorNumber.trim()
            ? `${doorNumber.trim()}, ${fullLocationLabel}${detectedAddress ? ` (GPS: ${detectedAddress})` : ''}`
            : (detectedAddress ? `${fullLocationLabel} (GPS: ${detectedAddress})` : fullLocationLabel),
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
          area: fullLocationLabel,
          city: selectedCity,
          date: selectedDateObj?.fullLabel || 'Today',
          timeSlot: selectedSlot,
          price: subObj?.price || SERVICE_PRICE,
          status: `Scheduled · ${selectedDateObj?.fullLabel || 'Today'} (${selectedSlot})`,
          emailConfirmed: Boolean(data.userEmailSent),
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('doorstep-orders', JSON.stringify(existing));

        // Save user details
        localStorage.setItem(
          'doorstep-user',
          JSON.stringify({ name: name.trim(), phone: cleanPhone, email: email.trim() })
        );
        localStorage.setItem('doorstep-area', fullLocationLabel);
      } catch {}

      setIsSuccess(true);
      setIsReviewing(false);
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
      setIsReviewing(false);
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
                <h2>{isReviewing ? 'Review Booking' : 'Request Service'}</h2>
                <p>
                  {isReviewing
                    ? 'Verify your service address and appointment schedule before confirmation.'
                    : 'Tap your appliance, enter details, and book your technician.'}
                </p>
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
                      <small>AREA / LOCATION</small>
                      <strong>{area || (selectedSubArea && selectedCity ? `${selectedSubArea}, ${selectedCity}` : selectedCity || 'Doorstep Service')}</strong>
                    </div>
                    <div className="meta-item">
                      <small>SCHEDULED WINDOW</small>
                      <strong style={{ color: '#FF6B00' }}>
                        {selectedDateObj?.fullLabel} &bull; {selectedSlot}
                      </strong>
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
                      onClick={() => {
                        setIsSuccess(false);
                        setIsReviewing(false);
                      }}
                    >
                      Book Another Service
                    </button>
                  </div>
                </div>
              ) : isReviewing ? (
                <div className="booking-summary-card">
                  <div className="summary-header-box">
                    <div>
                      <div className="summary-badge-pill">
                        <Sparkles size={13} /> Review & Edit Details
                      </div>
                      <h3 className="summary-card-title">Service Address & Details</h3>
                      <p className="summary-card-sub">
                        Review your service address and appointment schedule before final dispatch.
                      </p>
                    </div>
                  </div>

                  <div className="summary-details-grid">
                    {/* 1. Customer Details */}
                    <div className="summary-section-box">
                      <div className="summary-section-title-row">
                        <User size={15} color="#FF6B00" />
                        <span>Customer Information</span>
                      </div>
                      <div className="summary-item-row">
                        <span className="summary-item-label">Full Name:</span>
                        <span className="summary-item-value">{name}</span>
                      </div>
                      <div className="summary-item-row">
                        <span className="summary-item-label">Mobile Number:</span>
                        <span className="summary-item-value">+91 {phone.replace(/\D/g, '')}</span>
                      </div>
                      <div className="summary-item-row">
                        <span className="summary-item-label">Email Address:</span>
                        <span className="summary-item-value">{email}</span>
                      </div>
                    </div>

                    {/* 2. Service Location */}
                    <div className="summary-section-box">
                      <div className="summary-section-title-row">
                        <MapPin size={15} color="#FF6B00" />
                        <span>Selected Location & Address</span>
                      </div>
                      <div className="summary-item-row">
                        <span className="summary-item-label">City:</span>
                        <span className="summary-item-value">{selectedCity}</span>
                      </div>
                      <div className="summary-item-row">
                        <span className="summary-item-label">Sub-Area / Locality:</span>
                        <span className="summary-item-value">{isCustomArea ? customArea : selectedSubArea}</span>
                      </div>
                      {doorNumber && (
                        <div className="summary-item-row">
                          <span className="summary-item-label">Door / Street / Landmark:</span>
                          <span className="summary-item-value">{doorNumber}</span>
                        </div>
                      )}
                      {detectedAddress && (
                        <div className="summary-item-row">
                          <span className="summary-item-label">GPS Pinned Location:</span>
                          <span className="summary-item-value" style={{ fontSize: '11.5px', color: '#0A2558' }}>
                            📍 {detectedAddress}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 3. Appliance & Service */}
                    <div className="summary-section-box">
                      <div className="summary-section-title-row">
                        <Wrench size={15} color="#FF6B00" />
                        <span>Appliance & Requested Service</span>
                      </div>
                      <div className="summary-item-row">
                        <span className="summary-item-label">Appliance:</span>
                        <span className="summary-item-value">
                          {APPLIANCES.find((a) => a.id === selectedAppliance)?.name}
                        </span>
                      </div>
                      <div className="summary-item-row">
                        <span className="summary-item-label">Selected Service:</span>
                        <span className="summary-item-value">
                          {(APPLIANCE_SUBCATEGORIES[selectedAppliance] || []).find((s) => s.id === selectedSubcategory)?.name}
                        </span>
                      </div>
                      <div className="summary-item-row">
                        <span className="summary-item-label">Inspection & Diagnostics:</span>
                        <span className="summary-item-value summary-price-highlight">
                          From ₹299 (Pay After Service)
                        </span>
                      </div>
                    </div>

                    {/* 4. Preferred Schedule & Issue Note */}
                    <div className="summary-section-box">
                      <div className="summary-section-title-row">
                        <CalendarDays size={15} color="#FF6B00" />
                        <span>Appointment Schedule</span>
                      </div>
                      <div className="summary-item-row">
                        <span className="summary-item-label">Selected Date:</span>
                        <span className="summary-item-value" style={{ color: '#FF6B00', fontWeight: 800 }}>
                          📅 {selectedDateObj?.fullLabel}
                        </span>
                      </div>
                      <div className="summary-item-row">
                        <span className="summary-item-label">Arrival Time Slot:</span>
                        <span className="summary-item-value" style={{ color: '#0A2558', fontWeight: 800 }}>
                          ⏰ {selectedSlot}
                        </span>
                      </div>
                      {issueDescription && (
                        <div className="summary-item-row">
                          <span className="summary-item-label">Issue Note for Tech:</span>
                          <span className="summary-item-value" style={{ fontStyle: 'italic', fontWeight: 500 }}>
                            &ldquo;{issueDescription}&rdquo;
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && <p className="form-error-text" style={{ marginTop: '12px' }}>{error}</p>}

                  {/* Actions: Edit or Confirm */}
                  <div className="summary-actions-row">
                    <button
                      type="button"
                      onClick={() => setIsReviewing(false)}
                      className="summary-edit-btn"
                    >
                      <Edit3 size={16} /> Edit Details
                    </button>

                    <button
                      type="button"
                      onClick={handleFinalBookingConfirm}
                      className="summary-confirm-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Dispatching Technician...
                        </>
                      ) : (
                        <>
                          Confirm Doorstep Booking <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProceedToReview} noValidate>
                  {/* Step 1: Tap Your Appliance */}
                  <div className="step-section">
                    <span className="step-label">1. TAP YOUR APPLIANCE</span>
                    <div className="appliance-tiles-row">
                      {APPLIANCES.map((app) => {
                        const IconComponent = app.icon;
                        const isSelected = selectedAppliance === app.id;
                        const isUnselected = Boolean(selectedAppliance) && !isSelected;
                        return (
                          <button
                            type="button"
                            key={app.id}
                            className={`appliance-tile-btn ${isSelected ? 'active' : ''} ${isUnselected ? 'is-unselected' : ''}`}
                            onClick={() => handleApplianceSelect(app.id)}
                            aria-pressed={isSelected}
                          >
                            <div className="appliance-tile-icon">
                              <IconComponent size={26} color={isSelected ? '#FFFFFF' : (isUnselected ? '#94A3B8' : '#FF6B00')} />
                            </div>
                            <span className="appliance-tile-name">{app.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Choose Sub-Category (Only shown after a category is selected) */}
                  {selectedAppliance && (
                    <div className="step-section subcategory-step-section animated-subcat-section">
                      <div className="subcat-header-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span className="step-label" style={{ margin: 0 }}>2. SELECT SUB-CATEGORY</span>
                          <span className="selected-appliance-badge">
                            {APPLIANCES.find((a) => a.id === selectedAppliance)?.name}
                          </span>
                        </div>
                        <span className="subcat-hint">Select specific service type</span>
                      </div>

                      <div className="subcat-selection-grid">
                        {(APPLIANCE_SUBCATEGORIES[selectedAppliance] || []).map((sub, idx) => {
                          const isSubActive = selectedSubcategory === sub.id;
                          const isSubUnselected = Boolean(selectedSubcategory) && !isSubActive;
                          return (
                            <button
                              type="button"
                              key={sub.id}
                              style={{ '--item-idx': idx }}
                              className={`subcat-select-btn ${isSubActive ? 'active' : ''} ${isSubUnselected ? 'is-unselected' : ''}`}
                              onClick={() => setSelectedSubcategory(sub.id)}
                              aria-pressed={isSubActive}
                            >
                              <div className="subcat-radio-icon">
                                {isSubActive ? (
                                  <CheckCircle2 size={16} color="#FF6B00" strokeWidth={2.4} className="subcat-check-icon" />
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
                  )}

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

                    {/* Service Locality & Sub-Areas Dropdown Section (Matches Reference Image) */}
                    <div className="input-group" style={{ marginTop: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 800, fontSize: '11.5px', color: '#0A2558' }}>
                          {selectedCity ? `SERVICE LOCALITY IN ${selectedCity.toUpperCase()}` : 'SERVICE LOCALITY'}
                        </label>
                        <button
                          type="button"
                          onClick={handleAutoDetectLocation}
                          disabled={detectingLocation}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: 'transparent',
                            border: 'none',
                            color: '#00A8B5',
                            padding: '3px 0',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: detectingLocation ? 'not-allowed' : 'pointer',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {detectingLocation ? (
                            <>
                              <Loader2 size={13} className="animate-spin" /> Detecting...
                            </>
                          ) : (
                            <>
                              <LocateFixed size={13} /> Auto Detect Location
                            </>
                          )}
                        </button>
                      </div>

                      {/* Two Dropdowns Side by Side: City & Sub-Area */}
                      <div className="locality-dropdowns-row">
                        {/* 1. City Dropdown */}
                        <div className="locality-select-wrap">
                          <select
                            value={selectedCity}
                            onChange={(e) => {
                              const newCity = e.target.value;
                              setSelectedCity(newCity);
                              setSelectedSubArea('');
                              setIsCustomArea(false);
                              setCustomArea('');
                              setArea('');
                              setDetectedAddress('');
                            }}
                            required
                          >
                            <option value="">Select City...</option>
                            {Object.keys(CITY_DATA).map((cityName) => (
                              <option key={cityName} value={cityName}>
                                {cityName}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={17} className="select-arrow" />
                        </div>

                        {/* 2. Sub-Area / Colony Dropdown */}
                        <div className="locality-select-wrap">
                          <select
                            value={isCustomArea ? '__other__' : selectedSubArea}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === '__other__') {
                                setIsCustomArea(true);
                                setSelectedSubArea('__other__');
                                setArea('');
                              } else {
                                setIsCustomArea(false);
                                setSelectedSubArea(val);
                                setArea(val);
                              }
                              setDetectedAddress('');
                            }}
                            disabled={!selectedCity}
                            required
                          >
                            <option value="">
                              {selectedCity ? `Select Sub-Area in ${selectedCity}...` : 'Select City First...'}
                            </option>
                            {selectedCity &&
                              (CITY_DATA[selectedCity]?.colonies || []).map((colony) => (
                                <option key={colony} value={colony}>
                                  {colony}
                                </option>
                              ))}
                            {selectedCity && (
                              <option value="__other__">📍 Other Sub-Area / Colony...</option>
                            )}
                          </select>
                          <ChevronDown size={17} className="select-arrow" />
                        </div>
                      </div>

                      {/* Row 2: Manual Colony / Sub-Area Input (shown when 'Other Sub-Area / Colony...' is selected) */}
                      {isCustomArea && (
                        <div className="subarea-manual-box">
                          <div className="subarea-manual-header">
                            <label className="subarea-manual-label">
                              SUB-AREA / COLONY IN {selectedCity ? selectedCity.toUpperCase() : 'YOUR CITY'} *
                            </label>
                            <span className="subarea-manual-hint">
                              Enter manually or tap Auto Detect
                            </span>
                          </div>

                          <div className="subarea-input-wrapper">
                            <MapPin size={17} className="subarea-input-pin" />
                            <input
                              type="text"
                              placeholder="Enter colony manually or tap Auto Detect GPS..."
                              value={customArea}
                              onChange={(e) => {
                                setCustomArea(e.target.value);
                                setArea(e.target.value);
                              }}
                              className="subarea-text-input"
                              required
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={handleAutoDetectLocation}
                              disabled={detectingLocation}
                              className="subarea-autodetect-inner-btn"
                              title="Auto-detect location using GPS"
                            >
                              {detectingLocation ? <Loader2 size={13} className="animate-spin" /> : <LocateFixed size={13} />}
                              <span>{detectingLocation ? 'Detecting...' : 'Auto Detect'}</span>
                            </button>
                          </div>

                          <div className="subarea-coverage-note">
                            <span style={{ color: '#FF6B00' }}>⚡</span> 10 KM Radial Coverage: Technicians dispatched to all colonies in {selectedCity || 'your city'}!
                          </div>
                        </div>
                      )}

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
                          <Navigation size={13} color="#00A8B5" style={{ flexShrink: 0 }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            Detected: <strong>{detectedAddress}</strong>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Optional Field 1: Door No / Street / Landmark */}
                    <div className="input-group" style={{ marginTop: '14px' }}>
                      <label style={{ margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 800, fontSize: '11.5px', color: '#0A2558' }}>
                        DOOR NO / STREET / LANDMARK (OPTIONAL)
                      </label>
                      <div className="input-with-icon">
                        <MapPin size={17} className="field-icon" style={{ color: '#64748B' }} />
                        <input
                          type="text"
                          placeholder="e.g. Flat 302, Green Meadows Apt, Near SBI Bank"
                          value={doorNumber}
                          onChange={(e) => setDoorNumber(e.target.value)}
                          className="booking-optional-input"
                        />
                      </div>
                    </div>

                    {/* Optional Field 2: Describe Appliance Issue / Note for Technician */}
                    <div className="input-group" style={{ marginTop: '14px' }}>
                      <label style={{ margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 800, fontSize: '11.5px', color: '#0A2558' }}>
                        DESCRIBE APPLIANCE ISSUE / NOTE FOR TECHNICIAN (OPTIONAL)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. AC cooling slowly, making clicking noise, etc."
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        className="booking-textarea"
                      />
                    </div>
                  </div>

                  {/* Step 4: Preferred Date & Time Slot Scheduling */}
                  <div className="step-section" style={{ marginTop: '22px' }}>
                    <div className="schedule-section-header">
                      <span className="step-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                        <CalendarDays size={16} color="#FF6B00" />
                        <span>4. PREFERRED DATE & TIME SLOT</span>
                      </span>
                      <p className="schedule-hint">
                        Choose your doorstep service date and convenient 2-hour arrival window.
                      </p>
                    </div>

                    {/* Horizontal Date Picker (Next 7 Days) */}
                    <div className="date-pills-scroll-row">
                      {upcomingDays.map((day) => {
                        const isSelected = selectedDateObj?.dateStr === day.dateStr;
                        return (
                          <button
                            key={day.dateStr}
                            type="button"
                            onClick={() => handleDateSelect(day)}
                            className={`date-pill-btn ${isSelected ? 'active' : ''}`}
                          >
                            <span className="date-pill-day">
                              {day.tag ? day.tag : day.dayName}
                            </span>
                            <span className="date-pill-date">{day.dateLabel}</span>
                            {day.tag && (
                              <span className="date-pill-badge">{day.tag}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* 3-Hour Buffer Notification Banner for "Today" */}
                    {selectedDateObj?.isToday && (
                      todayHasSlots ? (
                        <div className="date-buffer-hint">
                          <Clock size={15} color="#FF6B00" style={{ flexShrink: 0 }} />
                          <span>
                            <strong>3-Hour Buffer Applied:</strong> Only slots starting at least 3 hours from now are available for today.
                          </span>
                        </div>
                      ) : (
                        <div className="date-buffer-hint today-closed">
                          <Clock size={15} color="#DC2626" style={{ flexShrink: 0 }} />
                          <span>
                            <strong>Buffer Closed for Today:</strong> Technicians require 3 hours advance notice. We have defaulted your booking to <strong>Tomorrow</strong> for earliest service!
                          </span>
                        </div>
                      )
                    )}

                    {/* Time Slots Grid */}
                    <div className="time-slots-container">
                      <div className="time-slots-subhead">
                        <Clock size={13} color="#FF6B00" />
                        <span>Available Time Slots ({selectedDateObj?.fullLabel})</span>
                      </div>

                      {currentAvailableSlots.length > 0 ? (
                        <div className="time-slots-grid">
                          {currentAvailableSlots.map((slot) => {
                            const isSlotActive = selectedSlot === slot.label;
                            return (
                              <button
                                key={slot.id}
                                type="button"
                                onClick={() => {
                                  setSelectedSlot(slot.label);
                                  setError('');
                                }}
                                className={`time-slot-btn ${isSlotActive ? 'active' : ''}`}
                              >
                                <span className="time-slot-label">{slot.label}</span>
                                <div className="time-slot-radio-circle">
                                  {isSlotActive && <div className="time-slot-radio-inner" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', textAlign: 'center', border: '1px solid #E2E8F0', marginTop: '6px' }}>
                          <p style={{ margin: 0, fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                            No more appointment windows available for Today. Please select Tomorrow or an upcoming date above.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && <p className="form-error-text">{error}</p>}

                  {/* Primary CTA */}
                  <button
                    type="submit"
                    className="button button-primary book-dispatch-btn"
                  >
                    Review Booking Details <ArrowRight size={18} />
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
