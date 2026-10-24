import Link from 'next/link';
import { Check, ShieldCheck, Sparkles, ArrowRight, X, HelpCircle, ChevronDown } from 'lucide-react';
import { MEMBERSHIP_PLANS, MEMBERSHIP_PERKS } from '@/lib/plansData';
import { pageMetadata } from '@/lib/seo';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata = pageMetadata({
  title: 'Home Service Membership Plans in Hyderabad | Doorstep Services',
  description:
    'Compare Doorstep Basic Care, VIP Plus, and Elite AMC home appliance membership plans. Save up to 20% on AC, refrigerator, washing machine repairs in Hyderabad.',
  path: '/plans/',
  keywords: [
    'appliance AMC plans Hyderabad',
    'appliance maintenance contract Hyderabad',
    'home service membership Hyderabad',
    'AC annual maintenance contract Hyderabad',
    'refrigerator service plan Hyderabad',
  ],
});

const GENERAL_PLAN_FAQS = [
  {
    q: 'What is included in Doorstep Membership plans?',
    a: 'Every membership plan includes flat discounts on inspection and repair labor, priority appointment scheduling, zero platform convenience charges, and extended revisit warranties across Hyderabad.',
  },
  {
    q: 'How do I activate my membership plan?',
    a: 'Select your preferred plan on this page or through the individual plan details page. Once confirmed, your mobile number is recognized as a member and discounts apply automatically to all your bookings.',
  },
  {
    q: 'Which appliances and areas are eligible?',
    a: 'All plans cover Split & Window ACs, Single/Double Door Refrigerators, Washing Machines, Microwaves, Geysers, and TVs in Ameerpet Main Road, Chanda Nagar, Alwal, Suchitra, and nearby Hyderabad localities.',
  },
  {
    q: 'Can I cancel or request a refund?',
    a: 'You can request a 100% full refund within 7 days of purchase provided no diagnostic visit or service booking has been utilized.',
  },
  {
    q: 'Does the membership include replacement spare parts?',
    a: 'VIP Plus and Elite AMC include 10% to 15% discount on genuine manufacturer spare parts. Parts are billed transparently after your approval.',
  },
];

export default function PlansListingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Plans</span>
          </div>
          <div className="page-heading">
            <span className="eyebrow">SAVINGS & PROTECTION</span>
            <h1>Choose Your Membership Plan</h1>
            <p>
              Unlock dedicated technicians, priority scheduling, and guaranteed repair savings for all your
              household appliances.
            </p>
          </div>
        </div>
      </section>

      {/* Plans Comparison Grid */}
      <section className="page-content">
        <div className="container">
          <div className="plans-page-grid">
            {MEMBERSHIP_PLANS.map((plan) => (
              <article
                key={plan.slug}
                className={`plan-card-standalone ${plan.featured ? 'plan-featured' : ''}`}
              >
                {plan.badge && <span className="plan-badge-pill">{plan.badge}</span>}
                <div className="plan-top">
                  <span className="plan-icon">
                    <Sparkles size={22} />
                  </span>
                  <span className="plan-label">{plan.duration.toUpperCase()}</span>
                </div>

                <h2>{plan.name}</h2>
                <p>{plan.shortDesc}</p>

                <div className="plan-price-standalone">
                  <strong>₹{plan.price}</strong>
                  <span className="original-striked">₹{plan.originalPrice}</span>
                  <small>/{plan.duration}</small>
                </div>

                <div className="plan-savings-pill">
                  Estimated Savings: <strong>{plan.savingsEstimate}</strong>
                </div>

                <ul className="plan-features-list">
                  {plan.includedBenefits.map((b, i) => (
                    <li key={i}>
                      <Check size={16} className="text-success" />
                      <div>
                        <strong>{b.title}</strong>
                        <p>{b.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="plan-card-footer">
                  <Link
                    href={`/plans/${plan.slug}/`}
                    className={`button ${plan.featured ? 'button-primary' : 'button-secondary'}`}
                    style={{ width: '100%', marginBottom: 10 }}
                  >
                    View Plan Details & Activate
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Detailed Desktop Comparison Matrix Table */}
          <div className="plan-comparison-matrix-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">FEATURE COMPARISON</span>
                <h2>Compare Membership Features</h2>
                <p>See exactly what is included in each plan before making a decision.</p>
              </div>
            </div>

            <div className="matrix-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Features & Benefits</th>
                    {MEMBERSHIP_PLANS.map((p) => (
                      <th key={p.slug} className={p.featured ? 'highlight-col' : ''}>
                        {p.name}
                        <div className="table-price-tag">₹{p.price}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Service & Labor Discount</td>
                    <td>10% Flat</td>
                    <td className="highlight-col"><strong>15% Flat</strong></td>
                    <td>20% Flat</td>
                  </tr>
                  <tr>
                    <td>Validity Period</td>
                    <td>6 Months</td>
                    <td className="highlight-col">12 Months</td>
                    <td>12 Months</td>
                  </tr>
                  <tr>
                    <td>Free Annual Preventative Checkups</td>
                    <td>—</td>
                    <td className="highlight-col"><strong>2 Visits Included</strong></td>
                    <td>Unlimited Breakdown Visits</td>
                  </tr>
                  <tr>
                    <td>Free AC Jet Pump Servicing</td>
                    <td>—</td>
                    <td className="highlight-col">—</td>
                    <td><strong>1 Unit Included</strong></td>
                  </tr>
                  <tr>
                    <td>Genuine Spare Parts Discount</td>
                    <td>Standard Rates</td>
                    <td className="highlight-col">10% Off</td>
                    <td>15% Off</td>
                  </tr>
                  <tr>
                    <td>Technician Response Time</td>
                    <td>Same Day</td>
                    <td className="highlight-col"><strong>Express 90 Mins</strong></td>
                    <td>VIP Priority Dispatch</td>
                  </tr>
                  <tr>
                    <td>Revisit Warranty Coverage</td>
                    <td>30 Days</td>
                    <td className="highlight-col">60 Days</td>
                    <td>90 Days</td>
                  </tr>
                  <tr>
                    <td>Covered Hyderabad Locations</td>
                    <td>All Listed Hubs</td>
                    <td className="highlight-col">All Listed Hubs</td>
                    <td>All Listed Hubs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Membership FAQs */}
          <div className="plans-faq-wrap">
            <div className="section-heading">
              <div>
                <span className="eyebrow">COMMON QUESTIONS</span>
                <h2>Frequently Asked Questions</h2>
                <p>Everything you need to know about Doorstep VIP and Home Care Plans.</p>
              </div>
            </div>
            <FAQAccordion items={GENERAL_PLAN_FAQS} />
          </div>

          {/* Legal and Cancellation Callout */}
          <div className="notice-box plans-legal-notice">
            <ShieldCheck size={20} className="inline-icon" />
            <div>
              <strong>Transparent Policy Guarantee:</strong> No automatic unexpected recurring charges.
              All plan activations are for the specified duration and require your explicit renewal confirmation.
              Read our full <Link href="/cancellation-policy/">Cancellation & Refund Policy</Link> and{' '}
              <Link href="/terms/">Terms of Service</Link>.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
