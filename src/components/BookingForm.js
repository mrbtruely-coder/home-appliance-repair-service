'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { AREAS, PHONE_DISPLAY, SERVICES, WHATSAPP_URL, SERVICE_PRICE } from '@/lib/site';

export default function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: SERVICES[0].name, area: AREAS[0].name, address: '', issue: '', preferred: '', slot: '' });
  const [error, setError] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
      }));
    }
  }, []);

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  function submit(e) {
    e.preventDefault();

    // Check Login Requirement
    const user = JSON.parse(localStorage.getItem('doorstep-user') || 'null');
    if (!user) {
      showToast('Please sign in or register to send an enquiry.', 'info');
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }));
      return;
    }

    if (!form.name.trim() || !form.phone.trim() || !form.issue.trim()) {
      setError('Please complete your name, mobile number and issue description.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    setError('');
    const message = [
      'Hello Doorstep Home Appliance Services, I would like to request a repair service.',
      `Name: ${form.name.trim()}`,
      `Mobile: ${form.phone.trim()}`,
      `Appliance: ${form.service}`,
      `Displayed service price: ₹${SERVICE_PRICE}`,
      'Please confirm what is included and any additional charges before approving work.',
      `Area: ${form.area}`,
      `Address / landmark: ${form.address.trim() || 'Will share on call'}`,
      `Issue: ${form.issue.trim()}`,
      `Preferred date: ${form.preferred.trim() || 'To be discussed'}`,
      `Preferred time slot: ${form.slot || 'Flexible / to be confirmed'}`,
      'Payment: confirm accepted methods with the team; no online payment is taken by this form.',
    ].join('\n');
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }
  return <form className="booking-form" onSubmit={submit} noValidate>
    <div className="form-heading"><span className="eyebrow">BOOKING ENQUIRY</span><h2>Tell us what needs attention.</h2><p>Every listed service displays <strong>₹{SERVICE_PRICE}</strong>. Complete the form, then send the details through WhatsApp. Confirm scope and any additional charges before work.</p><p><a className="text-link" href="/checkout/">Use the guided checkout instead ↗</a></p></div>
    <div className="form-grid">
      <label>Full name <span>*</span><input value={form.name} onChange={e => update('name', e.target.value)} autoComplete="name" placeholder="Your name" /></label>
      <label>Mobile number <span>*</span><input value={form.phone} onChange={e => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} autoComplete="tel-national" inputMode="numeric" placeholder="10-digit mobile number" /></label>
      <label>Appliance <span>*</span><select value={form.service} onChange={e => update('service', e.target.value)}>{SERVICES.map(s => <option key={s.slug} value={s.name}>{s.name} — ₹{SERVICE_PRICE}</option>)}</select></label>
      <label>Service area <span>*</span><select value={form.area} onChange={e => update('area', e.target.value)}>{AREAS.map(a => <option key={a.slug}>{a.name}</option>)}</select></label>
      <label className="field-wide">Address / nearby landmark<input value={form.address} onChange={e => update('address', e.target.value)} autoComplete="street-address" placeholder="Street, building or landmark" /></label>
      <label className="field-wide">Describe the issue <span>*</span><textarea value={form.issue} onChange={e => update('issue', e.target.value)} rows={4} placeholder="What is happening with the appliance?" /></label>
      <label>Preferred date<input type="date" value={form.preferred} onChange={e => update('preferred', e.target.value)} /></label><label>Preferred time slot<select value={form.slot} onChange={e => update('slot', e.target.value)}><option value="">Flexible / ask me</option><option>Morning · 9 AM–12 PM</option><option>Afternoon · 12 PM–3 PM</option><option>Evening · 3 PM–6 PM</option></select></label>
    </div>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-primary submit-button" type="submit"><MessageCircle size={18}/> Continue to WhatsApp</button>
    <p className="privacy-note"><ShieldCheck size={16}/> This static form does not save submissions. WhatsApp opens with your details ready to send.</p>
    <p className="form-phone">Prefer to call? <a href="tel:+919515661677">{PHONE_DISPLAY}</a></p>
  </form>;
}
