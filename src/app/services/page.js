import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { SERVICES } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Home Appliance Repair Services in Hyderabad | Doorstep Service',
  description: 'Verified doorstep repair services for AC, Refrigerator, Washing Machine, Oven, Geyser, and Smart TV in Hyderabad. Starting from ₹299.',
  path: '/services/',
  keywords: ['home appliance repair Hyderabad', 'AC repair Hyderabad', 'refrigerator repair Hyderabad', 'washing machine repair Hyderabad'],
});

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

      {/* Categories Showcase Grid */}
      <section className="services-catalog-body">
        <div className="container">
          <div className="services-showcase-catalog-grid">
            {SERVICES.map((item) => (
              <div
                key={item.slug}
                className="catalog-service-card"
              >
                {/* Photo with Verified Job Badge — Click navigates to subcategories */}
                <Link
                  href={`/services/${item.slug}/`}
                  className="catalog-image-wrap"
                  aria-label={`View subcategories for ${item.name}`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={260}
                    className="catalog-card-img"
                    priority
                  />
                  <div className="catalog-badge-pill">
                    Verified Job
                  </div>
                </Link>

                {/* Card Content */}
                <div className="catalog-card-content">
                  <h3 className="catalog-card-title">
                    <Link href={`/services/${item.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {item.name}
                    </Link>
                  </h3>

                  <p className="catalog-card-desc">
                    {item.description}
                  </p>

                  {/* Subcategories list pills */}
                  {item.subcategories && item.subcategories.length > 0 && (
                    <div className="catalog-subcategories-wrap">
                      <span className="subcategories-label">Included Subcategories:</span>
                      <div className="subcategories-chips">
                        {item.subcategories.map((sub) => (
                          <span key={sub.id} className="sub-chip">
                            {sub.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bullet features */}
                  <ul className="catalog-features-list">
                    {item.concerns?.slice(0, 3).map((feat, idx) => (
                      <li key={idx}>
                        <span className="green-check-icon">
                          <Check size={14} strokeWidth={2.8} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Row: Diagnostics Starting Price & Navigate to Subcategories */}
                  <div className="catalog-card-footer">
                    <div className="catalog-price-box">
                      <span className="price-tag-label">DIAGNOSTICS</span>
                      <strong className="price-tag-value">From ₹299</strong>
                    </div>

                    <Link
                      href={`/services/${item.slug}/`}
                      className="catalog-view-btn"
                    >
                      <span>View Subcategories</span>
                      <ArrowRight size={14} />
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
