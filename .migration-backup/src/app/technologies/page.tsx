import type { Metadata } from 'next';
import Link from '@/components/StaticLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/app/components/StickyCTA';

export const metadata: Metadata = {
  title: 'Technology Stack | Mech Engineer Soft',
  description:
    'The frontend, backend, database, cloud, and automation technologies Mech Engineer Soft uses to build ERP, CRM, dashboard, and automation software.',
  alternates: { canonical: '/technologies' },
  openGraph: {
    title: 'Technology Stack | Mech Engineer Soft',
    description: 'React, Next.js, Node.js, PostgreSQL, Supabase, and automation tooling used in production.',
    url: '/technologies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technology Stack | Mech Engineer Soft',
    description: 'React, Next.js, Node.js, PostgreSQL, Supabase, and automation tooling used in production.',
  },
};

type Tech = { name: string; description: string; useCase: string; level: 'Expert' | 'Advanced' | 'Proficient' | 'Exploring'; docs: string };

const stack: { category: string; summary: string; items: Tech[] }[] = [
  {
    category: 'Frontend',
    summary: 'Interfaces that stay fast, accessible, and pleasant on every screen.',
    items: [
      { name: 'React', description: 'Component architecture for complex business interfaces.', useCase: 'ERP screens, dashboards, admin panels', level: 'Expert', docs: 'https://react.dev' },
      { name: 'Next.js', description: 'Server rendering, routing, and SEO for production web apps.', useCase: 'Company websites, portals, SaaS front ends', level: 'Expert', docs: 'https://nextjs.org/docs' },
      { name: 'TypeScript', description: 'Type safety that prevents defects before they ship.', useCase: 'Every application layer', level: 'Advanced', docs: 'https://www.typescriptlang.org/docs' },
      { name: 'Tailwind CSS', description: 'Design-system driven styling with consistent spacing and tokens.', useCase: 'Design systems, responsive layouts', level: 'Expert', docs: 'https://tailwindcss.com/docs' },
      { name: 'Framer Motion', description: 'Motion design for reveals, transitions, and micro-interactions.', useCase: 'Premium marketing pages', level: 'Advanced', docs: 'https://www.framer.com/motion' },
      { name: 'Recharts', description: 'Analytical charting for KPI and reporting screens.', useCase: 'Business intelligence dashboards', level: 'Advanced', docs: 'https://recharts.org' },
    ],
  },
  {
    category: 'Backend',
    summary: 'Application logic, validation, and integrations built to scale.',
    items: [
      { name: 'Node.js', description: 'Server runtime for APIs, jobs, and integrations.', useCase: 'REST APIs, automation workers', level: 'Advanced', docs: 'https://nodejs.org/docs/latest/api' },
      { name: 'Express', description: 'Lightweight service layer for custom business endpoints.', useCase: 'ERP and CRM backends', level: 'Advanced', docs: 'https://expressjs.com' },
      { name: 'REST API', description: 'Predictable, documented contracts between systems.', useCase: 'Mobile apps, third-party integrations', level: 'Expert', docs: 'https://developer.mozilla.org/en-US/docs/Glossary/REST' },
      { name: 'JWT', description: 'Stateless authentication with signed, short-lived sessions.', useCase: 'Admin panels, client portals', level: 'Advanced', docs: 'https://jwt.io/introduction' },
      { name: 'Zod', description: 'Schema validation on every inbound request.', useCase: 'Form and API validation', level: 'Advanced', docs: 'https://zod.dev' },
    ],
  },
  {
    category: 'Database',
    summary: 'Data models designed for reporting, auditing, and growth.',
    items: [
      { name: 'PostgreSQL', description: 'Relational database for transactional business data.', useCase: 'Inventory, production, finance records', level: 'Advanced', docs: 'https://www.postgresql.org/docs' },
      { name: 'Supabase', description: 'Managed Postgres with authentication, storage, and row-level security.', useCase: 'Rapid, secure product delivery', level: 'Advanced', docs: 'https://supabase.com/docs' },
      { name: 'Drizzle ORM', description: 'Typed schema and migrations kept under version control.', useCase: 'Schema evolution, safe queries', level: 'Advanced', docs: 'https://orm.drizzle.team/docs/overview' },
      { name: 'Firebase', description: 'Realtime data and authentication for lightweight apps.', useCase: 'Mobile-first and realtime features', level: 'Proficient', docs: 'https://firebase.google.com/docs' },
    ],
  },
  {
    category: 'Cloud & Deployment',
    summary: 'Reliable hosting, environments, and release workflows.',
    items: [
      { name: 'Vercel', description: 'Edge hosting with preview deployments for every change.', useCase: 'Websites and Next.js applications', level: 'Advanced', docs: 'https://vercel.com/docs' },
      { name: 'Render', description: 'Managed services and databases for backend workloads.', useCase: 'APIs, cron jobs, workers', level: 'Proficient', docs: 'https://render.com/docs' },
      { name: 'GitHub Actions', description: 'Automated checks, builds, and deployments.', useCase: 'CI/CD pipelines', level: 'Proficient', docs: 'https://docs.github.com/actions' },
      { name: 'Docker', description: 'Reproducible environments for portable deployments.', useCase: 'Containerised delivery (rolling out)', level: 'Exploring', docs: 'https://docs.docker.com' },
    ],
  },
  {
    category: 'Automation & AI',
    summary: 'Removing manual steps from everyday business operations.',
    items: [
      { name: 'Google Apps Script', description: 'Automating spreadsheet-driven processes and reports.', useCase: 'Daily reports, approvals, alerts', level: 'Expert', docs: 'https://developers.google.com/apps-script' },
      { name: 'Google Sheets API', description: 'Bridging spreadsheets with production systems.', useCase: 'Data sync, operational reporting', level: 'Advanced', docs: 'https://developers.google.com/sheets/api' },
      { name: 'WhatsApp Business API', description: 'Instant notifications and customer communication.', useCase: 'Inquiry alerts, order updates', level: 'Advanced', docs: 'https://developers.facebook.com/docs/whatsapp' },
      { name: 'AI APIs', description: 'Assistants, summarisation, and document intelligence.', useCase: 'Chat assistants, proposal drafting', level: 'Proficient', docs: 'https://platform.openai.com/docs' },
    ],
  },
  {
    category: 'Engineering & Tooling',
    summary: 'The engineering discipline behind every delivery.',
    items: [
      { name: 'Git & GitHub', description: 'Version control, reviews, and traceable history.', useCase: 'Every project', level: 'Advanced', docs: 'https://docs.github.com/get-started' },
      { name: 'Figma', description: 'Interface design and prototyping before development.', useCase: 'UI design, client approvals', level: 'Proficient', docs: 'https://help.figma.com' },
      { name: 'Process Engineering', description: 'Mechanical engineering discipline applied to workflow design.', useCase: 'Factory and operations mapping', level: 'Expert', docs: 'https://www.asme.org' },
    ],
  },
];

const levelStyles: Record<Tech['level'], string> = {
  Expert: 'bg-primary/15 text-accent border-primary/30',
  Advanced: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  Proficient: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  Exploring: 'bg-secondary text-muted-foreground border-border',
};

export default function TechnologiesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-32 pb-24 px-6" aria-label="Technologies page main content">
        <section className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Technology stack</p>
          <h1 className="text-display font-extrabold max-w-3xl">
            Proven technologies,<br />
            <span className="gradient-text">selected for the problem</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            We do not chase trends. Every tool below is chosen because it makes business software faster to build, easier to
            maintain, and safer to scale.
          </p>
        </section>

        <div className="max-w-7xl mx-auto mt-16 space-y-16">
          {stack.map((group) => (
            <section key={group.category} aria-labelledby={`tech-${group.category.replace(/\W+/g, '-').toLowerCase()}`}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <h2 id={`tech-${group.category.replace(/\W+/g, '-').toLowerCase()}`} className="text-2xl font-extrabold">
                  {group.category}
                </h2>
                <p className="text-sm text-muted-foreground md:max-w-md">{group.summary}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
                {group.items.map((tech) => (
                  <article key={tech.name} className="glass-card glass-card-hover rounded-3xl p-6 hover-elevate border-glow-hover">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold">{tech.name}</h3>
                      <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${levelStyles[tech.level]}`}>
                        {tech.level}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{tech.description}</p>
                    <p className="font-mono-custom text-[11px] text-accent mt-5">USE CASE</p>
                    <p className="text-sm text-foreground/80 mt-1">{tech.useCase}</p>
                    <a
                      href={tech.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-foreground transition-colors mt-5"
                    >
                      Documentation <span aria-hidden="true">→</span>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="max-w-5xl mx-auto mt-20 rounded-3xl glass-card gradient-border p-10 text-center">
          <h2 className="text-3xl font-extrabold">Not sure which stack fits your project?</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Share your workflow and we will recommend the simplest architecture that meets your requirement and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href="/contact" className="btn-primary px-7 py-3 text-sm">Book free consultation</Link>
            <Link href="/pricing" className="btn-secondary px-7 py-3 text-sm">View engagement pricing</Link>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
