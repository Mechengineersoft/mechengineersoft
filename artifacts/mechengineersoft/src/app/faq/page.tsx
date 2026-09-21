import type { Metadata } from '@/lib/metadata';
import Link from '@/components/StaticLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/app/components/StickyCTA';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Mech Engineer Soft',
  description:
    'Answers about project timelines, pricing, ownership, technology choices, support, and how Mech Engineer Soft builds custom business software.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | Mech Engineer Soft',
    description: 'How we scope, build, deliver, and support custom business software.',
    url: '/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | Mech Engineer Soft',
    description: 'How we scope, build, deliver, and support custom business software.',
  },
};

const faqGroups = [
  {
    category: 'Getting started',
    items: [
      {
        question: 'How does a project begin?',
        answer:
          'It starts with a free consultation. We discuss your current workflow, the problems you want removed, and the outcome you expect. You then receive a written proposal with scope, milestones, timeline, and a fixed quotation before any development work begins.',
      },
      {
        question: 'Do I need to know exactly what I want before contacting you?',
        answer:
          'No. Most clients arrive with a problem rather than a specification. We map your existing process first, then translate it into a practical software plan you can approve module by module.',
      },
      {
        question: 'Do you work with small businesses?',
        answer:
          'Yes. We deliberately structure engagements so a small team can start with one module — such as inventory or quotations — and expand later without rebuilding the system.',
      },
    ],
  },
  {
    category: 'Pricing & timelines',
    items: [
      {
        question: 'How much does a business software project cost?',
        answer:
          'A business website typically starts from ₹35,000, a single business module from ₹1,20,000, and a multi-department ERP is quoted individually. The pricing page includes an interactive estimator that gives an indicative range in under a minute.',
      },
      {
        question: 'How long does delivery take?',
        answer:
          'Websites usually take two to three weeks. A focused business system takes five to eight weeks. Full ERP platforms run three to six months and are released in phases so you gain value before the final module ships.',
      },
      {
        question: 'How are payments structured?',
        answer:
          'Payments are tied to milestones — typically an advance to begin, staged payments on module delivery, and a final payment at deployment. Nothing is invoiced outside the approved scope without your written confirmation.',
      },
    ],
  },
  {
    category: 'Technology & ownership',
    items: [
      {
        question: 'Which technologies do you build with?',
        answer:
          'Primarily React, Next.js, TypeScript, Node.js, PostgreSQL, and Supabase, with Tailwind CSS for interfaces. The technologies page lists the full stack along with where each tool is used.',
      },
      {
        question: 'Who owns the code and the data?',
        answer:
          'You do. On final payment you receive full ownership of the source code, the database, and all associated accounts. There is no vendor lock-in and no licence fee for software we build for you.',
      },
      {
        question: 'Can you integrate with the systems we already use?',
        answer:
          'Yes. We regularly integrate WhatsApp Business, Google Sheets, email and SMS providers, payment gateways, maps, and existing REST APIs so your new system fits into current operations.',
      },
    ],
  },
  {
    category: 'Delivery & support',
    items: [
      {
        question: 'Will my team be trained on the system?',
        answer:
          'Yes. Every delivery includes a walkthrough session and written documentation. For operational systems we also provide role-specific guidance so warehouse, sales, and management users each know their own screens.',
      },
      {
        question: 'What support is available after launch?',
        answer:
          'Websites include 30 days of post-launch support and business systems include a 90-day support and iteration window. After that, an annual maintenance plan covers monitoring, updates, and priority response.',
      },
      {
        question: 'Is our business data secure?',
        answer:
          'Security is built in from the start: hashed credentials, signed sessions, role-based permissions, validated inputs, environment-based secrets, audit logging, and encrypted cloud databases with automated backups.',
      },
      {
        question: 'Can the software grow with our business?',
        answer:
          'Yes. Systems are built modularly on a relational database, so new departments, branches, reports, or integrations can be added without discarding what already works.',
      },
    ],
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="min-h-screen pt-32 pb-24 px-6" aria-label="Frequently asked questions main content">
        <section className="max-w-4xl mx-auto">
          <p className="section-label mb-4">Frequently asked questions</p>
          <h1 className="text-display font-extrabold">
            Straight answers,<br />
            <span className="gradient-text">before you commit</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            The questions business owners ask us most often about cost, delivery, ownership, and long-term support.
          </p>
        </section>

        <div className="max-w-4xl mx-auto mt-14 space-y-12">
          {faqGroups.map((group) => (
            <section key={group.category} aria-labelledby={`faq-${group.category.replace(/\W+/g, '-').toLowerCase()}`}>
              <h2 id={`faq-${group.category.replace(/\W+/g, '-').toLowerCase()}`} className="text-2xl font-extrabold">
                {group.category}
              </h2>
              <div className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <details key={item.question} className="glass-card rounded-2xl p-6 group">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-bold text-foreground">
                      {item.question}
                      <span className="text-accent shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-4">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="max-w-5xl mx-auto mt-20 rounded-3xl glass-card gradient-border p-10 text-center">
          <h2 className="text-3xl font-extrabold">Still have a question?</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Send it across and you will get a direct, practical answer within 24 hours — no sales script.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href="/contact" className="btn-primary px-7 py-3 text-sm">Ask a question</Link>
            <Link href="/pricing" className="btn-secondary px-7 py-3 text-sm">See pricing</Link>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
