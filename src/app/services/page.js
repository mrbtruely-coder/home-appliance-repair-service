import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Home Appliance Repair Services in Hyderabad | Doorstep Service',
  description: 'Verified doorstep repair services for AC, Refrigerator, Washing Machine, Oven, Geyser, and Smart TV in Hyderabad. Starting from ₹299.',
  path: '/services/',
  keywords: ['home appliance repair Hyderabad', 'AC repair Hyderabad', 'refrigerator repair Hyderabad', 'washing machine repair Hyderabad'],
});

const SERVICES_CATALOG = [
  {
    slug: 'ac-repair',
    name: 'AC Service & Repair',
    badge: 'Verified Job',
    image: '/service_ac.jpg',
    description: 'Expert diagnostics, cooling coils restoration, gas leakage plugging, and high-pressure jet wash wet servicing.',
    features: [
      'Complete split AC deep jet wash service',
      'Refrigerant gas charging & leak fix',
      'PC Board (PCB) troubleshooting',
    ],
    startingPrice: '₹299',
    featured: false,
  },
  {
    slug: 'refrigerator-repair',
    name: 'Refrigerator Repair',
    badge: 'Verified Job',
    image: '/service_fridge.jpg',
    description: 'Single-door, double-door, and side-by-side low cooling diagnostics, compressor fittings, and defrost sensor repairs.',
    features: [
      'Defrost heater & sensor repair',
      'Compressor fittings & gas refilling',
      'Thermostat testing & gaskets check',
    ],
    startingPrice: '₹399',
    featured: true, // Highlights with blue/navy theme matching user reference
  },
  {
    slug: 'washing-machine-repair',
    name: 'Washing Machine Repair',
    badge: 'Verified Job',
    image: '/service_washing_machine.jpg',
    description: 'Drum replacements, spin-cycle issues, motor repairs, intake pump issues, and extreme noise calibrations.',
    features: [
      'Spin drum & structural bearings repair',
      'Water intake and drain pump fixes',
      'Suspension struts & noise calibration',
    ],
    startingPrice: '₹349',
    featured: false,
  },
  {
    slug: 'oven-microwave-repair',
    name: 'Oven & Microwave Repair',
    badge: 'Verified Job',
    image: '/service_oven.jpg',
    description: 'Precision magnetron replacements, keypad touchpad sensor repairs, turntable drive fixes, and spark suppression.',
    features: [
      'Magnetron & high voltage diode test',
      'Touch capacitive panel & timer fix',
      'Turntable motor & mica sheet replacement',
    ],
    startingPrice: '₹299',
    featured: false,
  },
  {
    slug: 'geyser-repair',
    name: 'Geyser & Water Heater Repair',
    badge: 'Verified Job',
    image: '/service_geyser.jpg',
    description: 'Heating element replacements, thermostat resets, pressure relief valve replacements, and copper tank leak seals.',
    features: [
      'Heavy-duty copper heating coil change',
      'Thermostat & auto-cutoff replacement',
      'Anti-scaling & tank leak sealing',
    ],
    startingPrice: '₹299',
    featured: false,
  },
  {
    slug: 'tv-repair',
    name: 'LED & Smart TV Repair',
    badge: 'Verified Job',
    image: '/service_tv.jpg',
    description: 'Backlight strip replacements, main motherboard diagnostic repair, power card faults, and audio display issues.',
    features: [
      'LED backlight replacement & fix',
      'Motherboard & power supply module repairs',
      'Sound card & connectivity calibration',
    ],
    startingPrice: '₹349',
    featured: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="services-catalog-page">
      {/* Header Banner */}
      <section className="services-catalog-header">
        <div className="container">
          <div className="services-header-content">
            <span className="services-eyebrow">HYDERABAD DOORSTEP REPAIRS</span>
            <h1 className="services-main-title">Professional Home Appliance Services</h1>
            <p className="services-main-subtitle">
              Certified doorstep diagnostics & repairs for AC, Refrigerator, Washing Machine, Microwave, Geyser & Smart TV across Ameerpet Main Road, Chanda Nagar, Alwal, and Suchitra.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid matching exact design reference */}
      <section className="services-catalog-body">
        <div className="container">
          <div className="services-showcase-catalog-grid">
            {SERVICES_CATALOG.map((item) => (
              <div
                key={item.slug}
                className={`catalog-service-card ${item.featured ? 'is-featured-card' : ''}`}
              >
                {/* Photo with Verified Job Badge */}
                <div className="catalog-image-wrap">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={260}
                    className="catalog-card-img"
                    priority
                  />
                  <div className="catalog-badge-pill">
                    {item.badge}
                  </div>
                </div>

                {/* Card Content */}
                <div className="catalog-card-content">
                  <h3 className={`catalog-card-title ${item.featured ? 'featured-title' : ''}`}>
                    {item.name}
                  </h3>

                  <p className="catalog-card-desc">
                    {item.description}
                  </p>

                  {/* Bullet features with green check */}
                  <ul className="catalog-features-list">
                    {item.features.map((feat, idx) => (
                      <li key={idx}>
                        <span className="green-check-icon">
                          <Check size={14} strokeWidth={2.8} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Row: Diagnostics Starting Price & Book Service Button */}
                  <div className="catalog-card-footer">
                    <div className="catalog-price-box">
                      <span className="price-tag-label">DIAGNOSTICS</span>
                      <strong className="price-tag-value">From {item.startingPrice}</strong>
                    </div>

                    <Link
                      href={`/booking/?service=${encodeURIComponent(item.name)}`}
                      className={`catalog-book-btn ${item.featured ? 'btn-blue-featured' : 'btn-light-pill'}`}
                    >
                      Book Service &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
