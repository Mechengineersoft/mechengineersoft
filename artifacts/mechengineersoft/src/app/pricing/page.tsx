import type { Metadata } from '@/lib/metadata';
import Link from '@/components/StaticLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/app/components/StickyCTA';
import CostEstimator from '@/app/pricing/components/CostEstimator';

export const metadata: Metadata = {
  title: 'Software Development Pricing | Mech Engineer Soft',
  description:
    'Transparent engagement packages for business websites, dashboards, ERP, CRM, and automation projects, plus an interactive project cost estimator.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Software Development Pricing | Mech Engineer Soft',
    description: 'Engagement packages and an interactive estimator for ERP, CRM, dashboard, and automation projects.',
    url: '/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Development Pricing | Mech Engineer Soft',
    description: 'Engagement packages and an interactive estimator for ERP, CRM, dashboard, and automation projects.',
  },
};

const packages = [
  {
    name: 'Launch',
    tagline: 'For businesses that need a credible, fast website.',
    price: 'From ₹35,000',
    duration: '2 – 3 weeks',
    popular: false,
    features: [
      'Up to 6 custom-designed pages',
      'Responsive across all devices',
      'SEO structure and meta setup',
      'Contact form with email alerts',
      'Performance and accessibility pass',
      '30 days post-launch support',
    ],
  },
  {
    name: 'Business Systems',
    tagline: 'For teams replacing spreadsheets with real software.',
    price: 'From ₹1,20,000',
    duration: '5 – 8 weeks',
    popular: true,
    features: [
      'Inventory, quotation, CRM, or dashboard module',
      'Role-based authentication and permissions',
      'Cloud PostgreSQL database with backups',
      'Admin panel for daily operations',
      'Reports and CSV/PDF exports',
      'Training session and documentation',
      '90 days support and iteration window',
    ],
  },
  {
    name: 'ERP & Platform',
    tagline: 'For multi-department operations that need one system.',
    price: 'Custom quote',
    duration: '3 – 6 months',
    popular: false,
    features: [
      'Multi-module ERP tailored to your workflow',
      'Production, inventory, dispatch, and finance flows',
      'Barcode, WhatsApp, and API integrations',
      'Analytics dashboards for management',
      'Audit trails and activity logging',
      'Phased rollout with staged releases',
      'Annual maintenance and enhancement plan',
    ],
  },
];

const addOns = [
  { name: 'WhatsApp automation', detail: 'Instant inquiry and order notifications.', price: 'From ₹15,000' },
  { name: 'Google Sheets automation', detail: 'Scheduled reports and workflow scripts.', price: 'From ₹12,000' },
  { name: 'AI assistant integration', detail: 'Chat assistant trained on your content.', price: 'From ₹25,000' },
  { name: 'Annual maintenance', detail: 'Monitoring, updates, and priority support.', price: '18% of project value / year' },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-32 pb-24 px-6" aria-label="Pricing page main content">
        <section className="max-w-7xl mx-auto text-center">
          <p className="section-label mb-4">Engagement pricing</p>
          <h1 className="text-display font-extrabold max-w-3xl mx-auto">
            Clear pricing.<br />
            <span className="gradient-text">No surprise invoices.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Every project is scoped before work begins. The ranges below reflect typical engagements — your final quote
            depends on modules, integrations, and data complexity.
          </p>
        </section>

        <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 mt-16" aria-label="Engagement packages">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`glass-card glass-card-hover rounded-3xl p-8 hover-elevate relative flex flex-col ${
                pkg.popular ? 'gradient-border ring-1 ring-primary/30' : ''
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-white shadow-lg shadow-primary/30">
                  Most requested
                </span>
              )}
              <h2 className="text-xl font-extrabold">{pkg.name}</h2>
              <p className="text-sm text-muted-foreground mt-2 min-h-10">{pkg.tagline}</p>
              <p className="text-3xl font-extrabold mt-6 font-mono-custom">{pkg.price}</p>
              <p className="text-xs text-muted-foreground mt-2">Typical delivery: {pkg.duration}</p>
              <ul className="mt-7 space-y-3 flex-1" aria-label={`${pkg.name} inclusions`}>
                {pkg.features.map((feature) => (
                  <li key={feature} className="text-sm text-foreground/85 flex gap-2">
                    <span className="text-accent" aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`${pkg.popular ? 'btn-primary' : 'btn-secondary'} mt-8 px-6 py-3 text-sm text-center`}
              >
                Request a quote
              </Link>
            </article>
          ))}
        </section>

        <section className="max-w-7xl mx-auto mt-20" aria-label="Add-on services">
          <h2 className="text-2xl font-extrabold">Add-ons</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
            {addOns.map((item) => (
              <article key={item.name} className="glass-card rounded-2xl p-6">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 min-h-10">{item.detail}</p>
                <p className="font-mono-custom text-sm text-accent mt-4">{item.price}</p>
              </article>
            ))}
          </div>
        </section>

        <CostEstimator />

        <section className="max-w-5xl mx-auto mt-20 rounded-3xl glass-card gradient-border p-10 text-center">
          <h2 className="text-3xl font-extrabold">Ready to scope your project?</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Book a free consultation and receive a written proposal with scope, milestones, and a fixed quotation.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href="/contact" className="btn-primary px-7 py-3 text-sm">Schedule consultation</Link>
            <Link href="/faq" className="btn-secondary px-7 py-3 text-sm">Read the FAQs</Link>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
