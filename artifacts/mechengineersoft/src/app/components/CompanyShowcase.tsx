import Link from '@/components/StaticLink';

const industries = [
  ['Manufacturing', 'Production intelligence, inventory control, and operational reporting.'],
  ['Healthcare', 'Clearer workflows, dashboards, and patient-service operations.'],
  ['Education', 'Connected administration, communication, and learning systems.'],
  ['Professional Services', 'Client management, quotations, and process automation.'],
];

export default function CompanyShowcase() {
  return (
    <section className="relative px-6 py-24 overflow-hidden" aria-labelledby="industries-heading">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Built for real operations</p>
            <h2 id="industries-heading" className="text-display font-extrabold">Software shaped around the way your business works.</h2>
          </div>
          <Link href="/industries" className="btn-secondary px-5 py-3 text-sm self-start md:self-auto">Explore industries</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map(([title, description], index) => (
            <article key={title} className="glass-card glass-card-hover hover-elevate rounded-2xl p-6 min-h-56 flex flex-col">
              <span className="font-mono-custom text-xs text-accent">0{index + 1}</span>
              <h3 className="text-xl font-bold mt-8 mb-3">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 glass-card rounded-3xl p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="section-label mb-3">A considered partnership</p>
            <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed">“We start with the business problem, then engineer the software around a clearer outcome.”</blockquote>
            <p className="mt-4 text-sm text-muted-foreground">S M Waqaar Yezdani · Founder & Business Software Developer</p>
          </div>
          <Link href="/contact" className="btn-primary px-6 py-3 text-sm text-center">Discuss your workflow</Link>
        </div>
      </div>
    </section>
  );
}
