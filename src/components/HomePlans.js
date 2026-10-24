import Link from 'next/link';
import { Check, Sparkles, Shield, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    id: 'starter',
    name: 'Pay As You Go',
    desc: 'For occasional repairs & one-off diagnostic visits',
    price: '₹299',
    period: 'per visit',
    featured: false,
    badge: null,
    features: [
      'Single appliance inspection & diagnosis',
      'Verified doorstep technician visit',
      'Transparent quote before any work',
      'Doorstep service guarantee',
    ],
    buttonText: 'Book Inspection',
    href: '/booking/',
  },
  {
    id: 'vip',
    name: 'Doorstep VIP Care',
    desc: 'Unlimited support & member discounts across all appliances',
    price: '₹799',
    period: 'per year',
    featured: true,
    badge: 'MOST POPULAR',
    features: [
      'Free inspection visits for 1 full year',
      '15% flat discount on all spare parts',
      'Priority same-day technician dispatch',
      'Covers AC, Fridge, Washing Machine, Geyser & TV',
      'Dedicated relationship manager support',
    ],
    buttonText: 'Join VIP Care',
    href: '/plans/',
  },
  {
    id: 'annual',
    name: 'Complete Home AMC',
    desc: 'Full appliance protection and routine maintenance',
    price: '₹1,499',
    period: 'per year',
    featured: false,
    badge: 'ALL-IN-ONE',
    features: [
      '2 free preventive maintenance services/year',
      'Unlimited free breakdown visit calls',
      '20% off on replacement spare parts',
      'Gas top-up discounts for AC & Fridge',
      'Annual appliance health checkup report',
    ],
    buttonText: 'Explore AMC',
    href: '/plans/',
  },
];

export default function HomePlans() {
  return (
    <section className="home-plans-section" id="membership-plans">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SAVINGS & MEMBERSHIP</span>
            <h2>Flexible Home Appliance Plans</h2>
            <p>
              Choose standard pay-per-service inspection or save with annual VIP care for all your home appliances.
            </p>
          </div>
          <Link className="text-link" href="/plans/">
            View full plan details <ArrowRight size={15} />
          </Link>
        </div>

        <div className="home-plans-grid">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`home-plan-card ${plan.featured ? 'home-plan-featured' : ''}`}
            >
              {plan.badge && <span className="home-plan-tag">{plan.badge}</span>}

              <div className="home-plan-header">
                <h3>{plan.name}</h3>
                <p>{plan.desc}</p>
              </div>

              <div className="home-plan-price">
                <span>{plan.price}</span>
                <small>/{plan.period}</small>
              </div>

              <ul className="home-plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <Check size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`button ${plan.featured ? 'button-primary' : 'button-ghost'} home-plan-btn`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
