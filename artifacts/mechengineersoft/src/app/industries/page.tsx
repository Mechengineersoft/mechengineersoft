import type { Metadata } from '@/lib/metadata';
import Link from '@/components/StaticLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/app/components/StickyCTA';

export const metadata: Metadata = {
  title: 'Industry Software Solutions | Mech Engineer Soft',
  description: 'Custom software systems for manufacturers, healthcare teams, schools, restaurants, and service businesses.',
  alternates: { canonical: '/industries' },
};

const industries = [
  { name: 'Manufacturing & Engineering', outcome: 'Make production, inventory, and reporting easier to run.', solutions: ['Factory management systems', 'Inventory & dispatch control', 'Production dashboards', 'Quotation workflows'] },
  { name: 'Healthcare', outcome: 'Bring clarity to daily operations and management decisions.', solutions: ['Operational dashboards', 'Appointment workflows', 'Role-based administration', 'Secure reporting'] },
  { name: 'Education', outcome: 'Connect administration, communication, and performance tracking.', solutions: ['School ERP', 'Attendance systems', 'Parent communication', 'Academic dashboards'] },
  { name: 'Restaurants & Retail', outcome: 'Keep orders, stock, and customer service moving together.', solutions: ['POS workflows', 'Inventory monitoring', 'Sales analytics', 'Customer records'] },
  { name: 'Professional Services', outcome: 'Reduce follow-ups and give teams a single source of truth.', solutions: ['CRM', 'Proposal systems', 'Project dashboards', 'Automation'] },
  { name: 'Growing Businesses', outcome: 'Replace spreadsheets with a scalable operating system.', solutions: ['Custom business portals', 'Cloud databases', 'API integration', 'Management reporting'] },
];

export default function IndustriesPage() {
  return <><Header /><main className="min-h-screen pt-32 pb-24 px-6">
    <section className="max-w-7xl mx-auto">
      <p className="section-label mb-4">Industry expertise</p>
      <h1 className="text-display font-extrabold max-w-3xl">Digital systems for operations that cannot afford friction.</h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">Every industry has its own rhythm. We design software around your people, decisions, and workflows—not a generic template.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
        {industries.map((industry, i) => <article key={industry.name} className="glass-card glass-card-hover rounded-3xl p-7 hover-elevate">
          <span className="font-mono-custom text-xs text-accent">SECTOR / 0{i + 1}</span>
          <h2 className="text-xl font-bold mt-5">{industry.name}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3 min-h-12">{industry.outcome}</p>
          <ul className="mt-6 space-y-2" aria-label={`${industry.name} solutions`}>
            {industry.solutions.map((solution) => <li key={solution} className="text-sm text-foreground/80 flex gap-2"><span className="text-accent">•</span>{solution}</li>)}
          </ul>
        </article>)}
      </div>
    </section>
    <section className="max-w-5xl mx-auto mt-20 rounded-3xl glass-card gradient-border p-10 text-center">
      <h2 className="text-3xl font-extrabold">Your workflow is the starting point.</h2>
      <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Tell us what is slowing your team down. We’ll map a practical route to a clearer software system.</p>
      <Link href="/contact" className="btn-primary inline-block px-7 py-3 mt-7 text-sm">Schedule a consultation</Link>
    </section>
  </main><Footer /><StickyCTA /></>;
}
