'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, ArrowLeft, MessageCircle, ReceiptText } from 'lucide-react';
import { AREAS, SERVICES, WHATSAPP_URL, SERVICE_PRICE } from '@/lib/site';

const money = (value) => `₹${Number(value).toFixed(2)}`;

export default function CheckoutClient() {
  const [service, setService] = useState('');
  const [area, setArea] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [issue, setIssue] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [payment, setPayment] = useState('Confirm with team');
  const [error, setError] = useState('');

  // Sync service from query string (or browser URL params)
  useEffect(() => {
    const parseUrl = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const sParam = params.get('service');
        if (sParam) {
          setService(sParam);
        }
        const savedArea = localStorage.getItem('doorstep-area');
        if (savedArea) setArea(savedArea);
      } catch {}
    };

    parseUrl();
    window.addEventListener('popstate', parseUrl);
    window.addEventListener('doorstep-area-change', parseUrl);
    return () => {
      window.removeEventListener('popstate', parseUrl);
      window.removeEventListener('doorstep-area-change', parseUrl);
    };
  }, []);

  const selected = useMemo(() => {
    if (!service) return SERVICES[0];
    return SERVICES.find((item) => item.slug === service) || SERVICES[0];
  }, [service]);

  const total = selected ? SERVICE_PRICE : 0;

  const submit = (e) => {
    e.preventDefault();

    // Require login
    const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
    if (!user) {
      showToast('Please sign in or register to complete your enquiry.', 'info');
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }));
      return;
    }

    if (!selected) {
      setError('Please select a service.');
      return;
    }
    if (!area) {
      setError('Please select your service area.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''))) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }

    const msg = [
      `*New Service Enquiry - Doorstep Team*`,
      `Service: ${selected.name}`,
      `Service Inspection Fee: ₹${SERVICE_PRICE}`,
      `Customer Name: ${name.trim()}`,
      `Mobile: ${phone.trim()}`,
      `Service Area: ${area}`,
      `Address / Landmark: ${address.trim() || 'Shared on call'}`,
      `Preferred date: ${date || 'To be discussed'}`,
      `Preferred time slot: ${slot || 'Flexible / to be confirmed'}`,
      `Payment preference: ${payment}`,
      `Issue description: ${issue.trim() || 'General enquiry / inspection'}`,
      `-----------------------------`,
      `Status: Sent directly to Doorstep Team`,
    ].join('\n');

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services/">Services</Link>
            <span>/</span>
            <span>Enquiry</span>
          </div>
          <div className="page-heading">
            <span className="eyebrow">ENQUIRY DETAILS</span>
            <h1>Service Enquiry</h1>
            <p>
              Review your service details and send your service enquiry directly to the Doorstep Team.
            </p>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container booking-layout">
          <form className="booking-form" onSubmit={submit}>
            <div className="form-heading">
              <h2>Service and contact details</h2>
              <p>Required fields are marked with an asterisk.</p>
            </div>
            <div className="form-grid">
              <label className="field-wide">
                Selected Service <span>*</span>
                <select
                  required
                  value={selected?.slug || service}
                  onChange={(e) => setService(e.target.value)}
                >
                  {SERVICES.map((item) => (
                    <option value={item.slug} key={item.slug}>
                      {item.name} (₹{SERVICE_PRICE})
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Full name <span>*</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>

              <label>
                Mobile number <span>*</span>
                <input
                  required
                  value={phone}
                  onChange={(e) =>
                    setName ? setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)) : null
                  }
                  inputMode="tel"
                  placeholder="10-digit number"
                  autoComplete="tel"
                />
              </label>

              <label>
                Service area <span>*</span>
                <select required value={area} onChange={(e) => setArea(e.target.value)}>
                  <option value="">Select area</option>
                  {AREAS.map((item) => (
                    <option key={item.slug} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Preferred date
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </label>

              <label>
                Preferred time slot
                <select value={slot} onChange={(e) => setSlot(e.target.value)}>
                  <option value="">Flexible / ask me</option>
                  <option>Morning · 9 AM–12 PM</option>
                  <option>Afternoon · 12 PM–3 PM</option>
                  <option>Evening · 3 PM–6 PM</option>
                </select>
              </label>

              <label>
                Payment preference
                <select value={payment} onChange={(e) => setPayment(e.target.value)}>
                  <option>Confirm with team</option>
                  <option>Cash, if accepted</option>
                  <option>UPI, if accepted</option>
                  <option>Card, if accepted</option>
                </select>
              </label>

              <label className="field-wide">
                Address or nearby landmark
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat / street / landmark"
                  rows={2}
                />
              </label>

              <label className="field-wide">
                Describe the issue
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="What is happening with your appliance? Brand/model or problem description."
                  rows={3}
                />
              </label>
            </div>

            {error && <p className="form-error">{error}</p>}
            <button className="button button-primary submit-button" type="submit">
              Send enquiry on WhatsApp <MessageCircle size={17} />
            </button>
            <p className="privacy-note">
              <ShieldCheck size={15} /> Your details will be sent directly to the Doorstep Team via WhatsApp.
            </p>
            <p className="form-phone">
              <Link href="/services/">
                <ArrowLeft size={13} /> Back to services
              </Link>
            </p>
          </form>

          <aside className="booking-aside checkout-summary">
            <h2>
              <ReceiptText size={20} className="inline-icon" /> Enquiry Summary
            </h2>
            <p>Details for your selected doorstep repair.</p>
            <div className="checkout-summary-line">
              <span>Selected service</span>
              <strong>{selected?.name || 'Not selected'}</strong>
            </div>
            <div className="checkout-summary-line">
              <span>Service price</span>
              <strong>{money(total)}</strong>
            </div>
            <div className="checkout-total">
              <span>Total Displayed</span>
              <strong>{money(total)}</strong>
            </div>
            <p className="checkout-note">
              This is a service enquiry request. No payment is collected online. Any parts or repairs beyond general inspection are confirmed with you by the technician beforehand.
            </p>
            <div className="aside-divider" />
            <h3>Appointment & confirmation</h3>
            <p>
              Requested slots are confirmed when the Doorstep team contacts you on WhatsApp or call.
            </p>
            <div className="aside-divider" />
            <p>
              <CheckCircle2 size={16} className="inline-icon" /> Doorstep verified technician
            </p>
            <p>
              <CheckCircle2 size={16} className="inline-icon" /> Direct support via WhatsApp & Call
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
