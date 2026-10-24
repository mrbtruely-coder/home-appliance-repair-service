import Link from 'next/link';
import { MapPin, ArrowRight, ShieldCheck, Clock, Phone } from 'lucide-react';
import { AREAS, PHONE_DISPLAY, PHONE_E164, SERVICE_PRICE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Doorstep Appliance Repair Service Centers in Hyderabad | 10 KM Radius Coverage',
  description: 'Verified doorstep appliance service centers across Hyderabad in Ameerpet Main Road, Chanda Nagar, Alwal, and Suchitra. Fast 90-min technician dispatch within 10 km radius.',
  path: '/service-center/',
  keywords: ['appliance service center Hyderabad', 'doorstep repair centers Hyderabad', 'home service Chanda Nagar', 'home service Ameerpet'],
});

export default function ServiceCenterHubPage() {
  return (
    <div className="loc-ref-page">
      {/* Header Banner */}
      <section className="loc-ref-hero">
        <div className="container">
          <div className="loc-hero-center">
            <div className="loc-radius-top-chip">
              <ShieldCheck size={14} />
              <span>HYDERABAD COVERAGE NETWORK</span>
            </div>

            <h1 className="loc-ref-title">
              Doorstep Appliance Repair <span className="highlight-city">Service Centers</span>
            </h1>

            <p className="loc-ref-subtitle">
              Select your nearest local hub below. Each service center provides full 10 KM radial coverage with rapid 60–90 minute doorstep dispatch for AC, Refrigerator, Washing Machine, Oven, Geyser, and Smart TV repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Service Centers Grid */}
      <section className="loc-ref-section">
        <div className="container">
          <div className="loc-colonies-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {AREAS.map((area) => (
              <div
                key={area.slug}
                className="loc-cat-card-modern"
                style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div className="colony-icon-pill" style={{ width: '42px', height: '42px' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0A2558', margin: 0 }}>
                      {area.name} Hub
                    </h2>
                    <span style={{ fontSize: '11px', color: '#0284C7', fontWeight: 800 }}>
                      📍 10 KM Service Radius
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                  {area.description}
                </p>

                {/* Landmarks chips preview */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  {area.landmarks.slice(0, 4).map((l, idx) => (
                    <span key={idx} className="loc-sub-chip-badge" style={{ fontSize: '10.5px' }}>
                      {l}
                    </span>
                  ))}
                  <span className="loc-sub-chip-badge" style={{ fontSize: '10.5px', background: '#F1F5F9', color: '#475569', borderColor: '#E2E8F0' }}>
                    + More Localities
                  </span>
                </div>

                <Link
                  href={`/service-center/${area.slug}/`}
                  className="btn-cyan-solid"
                  style={{ justifyContent: 'center', width: '100%', marginTop: 'auto' }}
                >
                  <span>Explore {area.name} Hub</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
