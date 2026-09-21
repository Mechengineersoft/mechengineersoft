'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/app/components/StickyCTA';
import Link from 'next/link';

/* ─── Intersection hook ──────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Data ───────────────────────────────────────────────────── */
const timelineMilestones = [
  {
    year: '2014',
    tag: 'Foundation',
    title: 'Engineering Begins',
    body: 'Enrolled in B.Tech Mechanical Engineering — building a rigorous analytical foundation in thermodynamics, manufacturing processes, and production systems.',
    accent: '#0A7BFF',
    icon: '⚙️',
  },
  {
    year: '2016',
    tag: 'Insight',
    title: 'Business Process Discovery',
    body: 'Worked extensively on production management, inventory systems, operational reporting and business process automation — seeing firsthand where manual workflows break.',
    accent: '#00C2FF',
    icon: '🔍',
  },
  {
    year: '2018',
    tag: 'Milestone',
    title: 'B.Tech Completed',
    body: 'Graduated in Mechanical Engineering from Adamas Institute of Technology under MAKAUT — with deep expertise in industrial systems and process optimization.',
    accent: '#0A7BFF',
    icon: '🎓',
  },
  {
    year: '2020',
    tag: 'Mastery',
    title: 'M.Tech — Thermal Engineering',
    body: 'Completed Master of Technology at Aliah University, deepening expertise in industrial systems, complex process optimization, and engineering research.',
    accent: '#00C2FF',
    icon: '🔬',
  },
  {
    year: '2021',
    tag: 'Pivot',
    title: 'Software Development',
    body: 'Began building custom business software — combining engineering thinking with modern web technologies to solve real operational problems for businesses.',
    accent: '#0A7BFF',
    icon: '💻',
  },
  {
    year: '2022',
    tag: 'Expansion',
    title: 'MCA — Computer Applications',
    body: 'Pursued Master of Computer Applications at IGNOU to formalize software architecture knowledge and deepen full-stack development expertise.',
    accent: '#00C2FF',
    icon: '📚',
  },
  {
    year: '2023',
    tag: 'Modern Tech',
    title: 'Cloud & AI Ready',
    body: 'Mastered cloud databases, Supabase, Firebase, REST APIs, and AI integrations — building scalable applications ready for the next generation of business software.',
    accent: '#0A7BFF',
    icon: '☁️',
  },
  {
    year: '2024',
    tag: 'Launch',
    title: 'Mech Engineer Soft Founded',
    body: 'Founded Mech Engineer Soft with a clear mission: build intelligent business software that eliminates operational complexity for manufacturers, startups, and enterprises.',
    accent: '#00C2FF',
    icon: '🚀',
  },
];

const mvCards = [
  {
    type: 'Mission',
    headline: 'Empower through automation',
    body: 'To empower businesses with intelligent software solutions that automate operations, increase productivity and accelerate growth — removing complexity, not adding it.',
    accent: '#0A7BFF',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    type: 'Vision',
    headline: "India\'s most trusted software company",
    body: "To become one of India's most trusted software companies — delivering innovative digital products that serve manufacturers, healthcare, education, and enterprises worldwide.",
    accent: '#00C2FF',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const coreValues = [
  { label: 'Innovation', icon: '💡', color: '#0A7BFF' },
  { label: 'Integrity', icon: '🤝', color: '#00C2FF' },
  { label: 'Quality', icon: '⭐', color: '#0A7BFF' },
  { label: 'Commitment', icon: '🎯', color: '#00C2FF' },
  { label: 'Continuous Learning', icon: '📈', color: '#0A7BFF' },
  { label: 'Customer Success', icon: '🏆', color: '#00C2FF' },
];

const education = [
  {
    degree: 'M.Tech',
    field: 'Mechanical Engineering',
    spec: 'Thermal Engineering',
    institution: 'Aliah University',
    year: '2020',
    icon: '⚙️',
    color: '#0A7BFF',
  },
  {
    degree: 'B.Tech',
    field: 'Mechanical Engineering',
    spec: '',
    institution: 'Adamas Institute of Technology · MAKAUT',
    year: '2018',
    icon: '🔩',
    color: '#00C2FF',
  },
  {
    degree: 'MCA',
    field: 'Master of Computer Applications',
    spec: '',
    institution: 'Indira Gandhi National Open University',
    year: '2022',
    icon: '💻',
    color: '#38BDF8',
  },
];

const skillGroups = [
  {
    category: 'Frontend',
    color: '#0A7BFF',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    category: 'Backend',
    color: '#00C2FF',
    skills: ['Node.js', 'Express', 'REST API', 'JWT Auth', 'Zod Validation'],
  },
  {
    category: 'Database & Cloud',
    color: '#38BDF8',
    skills: ['PostgreSQL', 'Supabase', 'Firebase', 'SQL', 'Cloud DB'],
  },
  {
    category: 'Business Solutions',
    color: '#818CF8',
    skills: ['ERP Systems', 'CRM', 'Inventory Mgmt', 'Dashboards', 'Automation'],
  },
  {
    category: 'Engineering',
    color: '#34D399',
    skills: ['Mechanical Eng.', 'Thermal Systems', 'Process Analysis', 'Workflow Optimization'],
  },
  {
    category: 'Tools',
    color: '#FB923C',
    skills: ['Git', 'GitHub', 'VS Code', 'Google Apps Script', 'Google Sheets'],
  },
];

const whyUsDifferentiators = [
  {
    icon: '⚙️',
    title: 'Engineering Thinking',
    body: 'We approach software like engineers — systematic, precise, and process-driven. Every solution is designed to eliminate inefficiency, not just digitize it.',
    accent: '#0A7BFF',
  },
  {
    icon: '🏭',
    title: 'Business Understanding',
    body: 'We have worked inside production floors, warehouses, and offices. We understand how businesses actually operate — not just how they appear on paper.',
    accent: '#00C2FF',
  },
  {
    icon: '🛠️',
    title: 'Custom Development',
    body: 'No templates. No off-the-shelf products. Every solution is built from scratch to match your exact workflow, team structure, and growth plans.',
    accent: '#0A7BFF',
  },
  {
    icon: '🚀',
    title: 'Future Ready',
    body: 'Built with modern cloud architecture, AI-ready APIs, and scalable databases — your software grows with your business without costly rewrites.',
    accent: '#00C2FF',
  },
  {
    icon: '🔒',
    title: 'Secure Applications',
    body: 'Security is not an afterthought. Every application is built with JWT authentication, role-based access, input validation, and encrypted data storage.',
    accent: '#0A7BFF',
  },
  {
    icon: '🤝',
    title: 'Long Term Partnership',
    body: 'We do not disappear after delivery. We provide ongoing support, updates, and enhancements — treating your business success as our own.',
    accent: '#00C2FF',
  },
];

/* ─── Skill Badge ────────────────────────────────────────────── */
function SkillBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-default select-none hover:scale-105 hover:-translate-y-0.5"
      style={{
        background: `${color}12`,
        borderColor: `${color}35`,
        color: color,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${color}40`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
      {label}
    </span>
  );
}

/* ─── Timeline Item ──────────────────────────────────────────── */
function TimelineItem({
  item,
  index,
  active,
}: {
  item: (typeof timelineMilestones)[0];
  index: number;
  active: boolean;
}) {
  const isRight = index % 2 === 1;
  return (
    <div
      className="relative flex items-start gap-0 transition-all duration-700"
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: active ? 1 : 0,
        transform: active ? 'none' : isRight ? 'translateX(40px)' : 'translateX(-40px)',
      }}
    >
      {/* Left content (even) */}
      <div className="flex-1 pr-8 text-right hidden md:flex md:justify-end">
        {!isRight && (
          <div
            className="glass-card rounded-2xl p-5 text-left max-w-xs border-glow-hover transition-all duration-300 hover:-translate-y-1"
            style={{ borderColor: `${item.accent}30` }}
          >
            <span
              className="inline-block text-xs font-mono-custom font-semibold px-2 py-0.5 rounded-full mb-3"
              style={{ background: `${item.accent}20`, color: item.accent }}
            >
              {item.tag}
            </span>
            <div className="font-bold text-base text-foreground mb-1">{item.title}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
          </div>
        )}
      </div>

      {/* Center spine node */}
      <div className="flex flex-col items-center flex-shrink-0 relative z-10">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300"
          style={{
            background: `${item.accent}15`,
            borderColor: item.accent,
            boxShadow: `0 0 16px ${item.accent}40`,
          }}
        >
          {item.icon}
        </div>
        <div className="text-xs text-muted-foreground mt-1 font-mono-custom">{item.year}</div>
      </div>

      {/* Right content (odd) */}
      <div className="flex-1 pl-8">
        {isRight && (
          <div
            className="glass-card rounded-2xl p-5 max-w-xs border-glow-hover transition-all duration-300 hover:-translate-y-1"
            style={{ borderColor: `${item.accent}30` }}
          >
            <span
              className="inline-block text-xs font-mono-custom font-semibold px-2 py-0.5 rounded-full mb-3"
              style={{ background: `${item.accent}20`, color: item.accent }}
            >
              {item.tag}
            </span>
            <div className="font-bold text-base text-foreground mb-1">{item.title}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
          </div>
        )}
        {/* Mobile: all items on right */}
        {!isRight && (
          <div
            className="glass-card rounded-2xl p-5 max-w-xs border-glow-hover transition-all duration-300 hover:-translate-y-1 md:hidden"
            style={{ borderColor: `${item.accent}30` }}
          >
            <span
              className="inline-block text-xs font-mono-custom font-semibold px-2 py-0.5 rounded-full mb-3"
              style={{ background: `${item.accent}20`, color: item.accent }}
            >
              {item.tag}
            </span>
            <div className="font-bold text-base text-foreground mb-1">{item.title}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function AboutPage() {
  const { ref: heroRef, inView: heroInView } = useInView(0.1);
  const { ref: timelineRef, inView: timelineInView } = useInView(0.05);
  const { ref: founderRef, inView: founderInView } = useInView(0.1);
  const { ref: mvRef, inView: mvInView } = useInView(0.1);
  const { ref: eduRef, inView: eduInView } = useInView(0.1);
  const { ref: skillsRef, inView: skillsInView } = useInView(0.08);
  const { ref: whyRef, inView: whyInView } = useInView(0.08);

  return (
    <>
      <Header />
      <main id="main-content" aria-label="About page">
        {/* ── Page Hero ── */}
        <section
          className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 pb-20"
          aria-labelledby="about-hero-heading"
        >
          {/* Background blobs */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute blob-primary" style={{ width: '700px', height: '600px', top: '-100px', right: '-200px', opacity: 0.2 }} />
            <div className="absolute blob-accent" style={{ width: '500px', height: '400px', bottom: '0', left: '-100px', opacity: 0.15 }} />
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,123,255,0.07) 0%, transparent 70%)',
              }}
            />
          </div>

          <div ref={heroRef} className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <div
              className="transition-all duration-1000"
              style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'none' : 'translateY(40px)' }}
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs font-mono-custom text-muted-foreground mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                <span>/</span>
                <span className="text-accent">About</span>
              </nav>

              <span className="section-label mb-4 block">About Mech Engineer Soft</span>
              <h1
                id="about-hero-heading"
                className="text-hero font-extrabold text-foreground mb-6 max-w-4xl"
              >
                Engineering Excellence.{' '}
                <span className="gradient-text">Software Innovation.</span>{' '}
                Business Growth.
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-10">
                We are a modern software company that combines engineering precision with cutting-edge technology to build business software that actually works — the way your business works.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {['Business Software', 'ERP Systems', 'Cloud Applications', 'AI Ready', 'Custom Development'].map((badge, i) => (
                  <span
                    key={badge}
                    className="text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105"
                    style={{
                      background: i % 2 === 0 ? 'rgba(10,123,255,0.1)' : 'rgba(0,194,255,0.08)',
                      borderColor: i % 2 === 0 ? 'rgba(10,123,255,0.3)' : 'rgba(0,194,255,0.25)',
                      color: i % 2 === 0 ? '#0A7BFF' : '#00C2FF',
                      transitionDelay: `${i * 80}ms`,
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Who We Are ── */}
        <section
          className="relative py-24 border-t border-border overflow-hidden"
          aria-labelledby="who-we-are-heading"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute blob-primary" style={{ width: '500px', height: '400px', top: '10%', left: '-150px', opacity: 0.15 }} />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div>
                <span className="section-label mb-4 block">Who We Are</span>
                <h2 id="who-we-are-heading" className="text-display font-extrabold text-foreground mb-6">
                  We build software that{' '}
                  <span className="gradient-text">solves real problems</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Mech Engineer Soft is a modern software company focused on creating digital solutions that solve real business problems. Our approach combines engineering thinking with modern software development to deliver scalable, efficient and reliable solutions.
                  </p>
                  <p>
                    We don't simply develop websites. We design systems that improve productivity, automate workflows and help businesses grow. We believe software should reduce complexity rather than create it.
                  </p>
                  <p>
                    From ERP systems and CRM platforms to inventory management and business dashboards — every product we build is designed with the end user in mind and the business outcome as the goal.
                  </p>
                </div>
              </div>

              {/* Right — bento grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Business Software', icon: '🏢', desc: 'ERP, CRM, Inventory, Dashboards' },
                  { label: 'Web Applications', icon: '🌐', desc: 'Modern, fast, responsive' },
                  { label: 'Automation', icon: '⚡', desc: 'Workflows & integrations' },
                  { label: 'Cloud Solutions', icon: '☁️', desc: 'Scalable & secure' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="glass-card rounded-2xl p-5 border-glow-hover hover-elevate transition-all duration-300"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <div className="font-bold text-sm text-foreground mb-1">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Company Story Timeline ── */}
        <section
          className="relative py-24 border-t border-border overflow-hidden"
          aria-labelledby="timeline-heading"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute blob-accent" style={{ width: '600px', height: '500px', top: '20%', right: '-200px', opacity: 0.15 }} />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Our Journey</span>
              <h2 id="timeline-heading" className="text-display font-extrabold text-foreground">
                The story behind{' '}
                <span className="gradient-text">Mech Engineer Soft</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                From engineering classrooms to building enterprise software — a journey driven by curiosity, discipline, and a desire to solve real business problems.
              </p>
            </div>

            <div ref={timelineRef} className="relative max-w-4xl mx-auto">
              {/* Desktop spine */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgba(10,123,255,0.5) 10%, rgba(0,194,255,0.5) 90%, transparent)',
                }}
                aria-hidden="true"
              />
              {/* Mobile spine */}
              <div
                className="absolute left-6 top-0 bottom-0 w-px md:hidden"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,123,255,0.4) 10%, rgba(0,194,255,0.4) 90%, transparent)' }}
                aria-hidden="true"
              />

              <div className="space-y-10">
                {timelineMilestones.map((item, i) => (
                  <TimelineItem key={item.year + item.title} item={item} index={i} active={timelineInView} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Meet The Founder ── */}
        <section
          className="relative py-24 border-t border-border overflow-hidden"
          aria-labelledby="founder-heading"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute blob-primary" style={{ width: '600px', height: '500px', bottom: '0', left: '-100px', opacity: 0.18 }} />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Meet The Founder</span>
              <h2 id="founder-heading" className="text-display font-extrabold text-foreground">
                The mind behind{' '}
                <span className="gradient-text">the company</span>
              </h2>
            </div>

            <div ref={founderRef}>
              <div
                className="glass-card rounded-3xl p-8 md:p-12 border-glow max-w-5xl mx-auto transition-all duration-800"
                style={{
                  opacity: founderInView ? 1 : 0,
                  transform: founderInView ? 'none' : 'translateY(30px)',
                  transitionDuration: '800ms',
                }}
              >
                <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
                  {/* Avatar with animated ring */}
                  <div className="flex-shrink-0">
                    <div className="relative w-36 h-36 md:w-44 md:h-44">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'conic-gradient(from 0deg, #0A7BFF, #00C2FF, #38BDF8, #0A7BFF)',
                          animation: 'spin 5s linear infinite',
                          padding: '3px',
                        }}
                      />
                      <div
                        className="absolute inset-[4px] rounded-full flex items-center justify-center text-4xl font-extrabold gradient-text"
                        style={{ background: 'var(--card)' }}
                        aria-label="Founder initials SW"
                      >
                        SW
                      </div>
                    </div>
                    {/* Founder highlight chips below avatar */}
                    <div className="flex flex-col gap-2 mt-6">
                      {['Engineering Mindset', 'Business Automation', 'Modern Software', 'Cloud Technologies'].map((chip, i) => (
                        <span
                          key={chip}
                          className="text-xs px-3 py-1.5 rounded-full font-semibold text-center transition-all duration-300 hover:scale-105"
                          style={{
                            background: i % 2 === 0 ? 'rgba(10,123,255,0.12)' : 'rgba(0,194,255,0.1)',
                            color: i % 2 === 0 ? '#0A7BFF' : '#00C2FF',
                            border: `1px solid ${i % 2 === 0 ? 'rgba(10,123,255,0.25)' : 'rgba(0,194,255,0.2)'}`,
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-3">
                      <span className="section-label">Founder</span>
                      <span className="text-muted-foreground text-xs font-mono-custom">·</span>
                      <span className="section-label" style={{ color: '#00C2FF' }}>Business Software Developer</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                      S M Waqaar Yezdani
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 font-mono-custom">
                      M.Tech (Mechanical Engineering – Thermal Engineering) · MCA
                    </p>

                    <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                      <p>
                        S M Waqaar Yezdani founded Mech Engineer Soft with the vision of combining engineering principles and modern software development to help businesses improve efficiency through technology.
                      </p>
                      <p>
                        With a strong academic background in Mechanical Engineering and Computer Applications, he understands both industrial operations and modern software architecture.
                      </p>
                      <p>
                        Experienced in developing solutions for production management, inventory systems, operational reporting and business process automation — his expertise spans business automation, custom software development, ERP systems, dashboards, and scalable web applications.
                      </p>
                      <blockquote
                        className="border-l-2 pl-4 italic text-foreground/80"
                        style={{ borderColor: '#0A7BFF' }}
                      >
                        "I am passionate about solving real business problems using software. My engineering background allows me to understand industrial processes while my software expertise enables me to build scalable digital solutions."
                      </blockquote>
                      <p
                        className="text-xs font-mono-custom font-semibold"
                        style={{ color: '#00C2FF' }}
                      >
                        — S M Waqaar Yezdani, Founder
                      </p>
                    </div>

                    <p
                      className="mt-6 text-sm font-semibold italic"
                      style={{ color: '#0A7BFF' }}
                    >
                      "Technology should simplify business."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section
          className="relative py-24 border-t border-border overflow-hidden"
          aria-labelledby="mission-vision-heading"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute blob-accent" style={{ width: '500px', height: '400px', top: '0', right: '-100px', opacity: 0.15 }} />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Purpose</span>
              <h2 id="mission-vision-heading" className="text-display font-extrabold text-foreground">
                Mission &amp; <span className="gradient-text">Vision</span>
              </h2>
            </div>

            <div ref={mvRef}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                {mvCards.map((card, i) => (
                  <div
                    key={card.type}
                    className="relative rounded-3xl p-8 overflow-hidden hover-elevate transition-all duration-700"
                    style={{
                      opacity: mvInView ? 1 : 0,
                      transform: mvInView ? 'none' : 'translateY(30px)',
                      transitionDelay: `${i * 150}ms`,
                      background: `linear-gradient(135deg, ${card.accent}18 0%, ${card.accent}08 100%)`,
                      border: `1px solid ${card.accent}35`,
                      boxShadow: `0 8px 40px ${card.accent}12`,
                    }}
                  >
                    <div
                      className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                      style={{ background: `${card.accent}15`, filter: 'blur(40px)' }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                        style={{ background: `${card.accent}20`, color: card.accent, border: `1px solid ${card.accent}30` }}
                      >
                        {card.icon}
                      </div>
                      <div className="section-label mb-2" style={{ color: card.accent }}>{card.type}</div>
                      <h3 className="text-xl font-extrabold text-foreground mb-3">{card.headline}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Values */}
              <div
                className="glass-card rounded-2xl p-8 max-w-4xl mx-auto transition-all duration-700"
                style={{
                  opacity: mvInView ? 1 : 0,
                  transform: mvInView ? 'none' : 'translateY(20px)',
                  transitionDelay: '350ms',
                }}
              >
                <div className="text-center mb-6">
                  <span className="section-label">Core Values</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {coreValues.map((v) => (
                    <div
                      key={v.label}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 cursor-default"
                      style={{ background: `${v.color}08`, border: `1px solid ${v.color}20` }}
                    >
                      <span className="text-xl">{v.icon}</span>
                      <span className="text-sm font-semibold" style={{ color: v.color }}>{v.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Education Milestones ── */}
        <section
          className="relative py-24 border-t border-border overflow-hidden"
          aria-labelledby="education-heading"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute blob-primary" style={{ width: '500px', height: '400px', bottom: '10%', left: '-100px', opacity: 0.15 }} />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Academic Excellence</span>
              <h2 id="education-heading" className="text-display font-extrabold text-foreground">
                Educational <span className="gradient-text">milestones</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                A rare combination of engineering mastery and computer science expertise — the academic foundation that powers every solution we build.
              </p>
            </div>

            <div ref={eduRef}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
                {education.map((edu, i) => (
                  <div
                    key={edu.degree}
                    className="glass-card rounded-2xl p-7 border-glow-hover hover-elevate transition-all duration-700"
                    style={{
                      opacity: eduInView ? 1 : 0,
                      transform: eduInView ? 'none' : 'translateY(30px)',
                      transitionDelay: `${i * 120}ms`,
                    }}
                  >
                    <div className="text-4xl mb-5">{edu.icon}</div>
                    <div
                      className="text-xs font-mono-custom font-bold px-2.5 py-1 rounded-full inline-block mb-4"
                      style={{ background: `${edu.color}15`, color: edu.color }}
                    >
                      {edu.year}
                    </div>
                    <div className="text-2xl font-extrabold text-foreground mb-1">{edu.degree}</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: edu.color }}>{edu.field}</div>
                    {edu.spec && (
                      <div className="text-xs text-muted-foreground mb-3">({edu.spec})</div>
                    )}
                    <div className="text-xs text-muted-foreground leading-relaxed">{edu.institution}</div>
                  </div>
                ))}
              </div>

              {/* GATE Achievement */}
              <div
                className="max-w-5xl mx-auto transition-all duration-700"
                style={{
                  opacity: eduInView ? 1 : 0,
                  transform: eduInView ? 'none' : 'translateY(20px)',
                  transitionDelay: '400ms',
                }}
              >
                <div
                  className="rounded-2xl p-7 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
                  style={{
                    background: 'linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(245,158,11,0.04) 100%)',
                    border: '1px solid rgba(251,191,36,0.3)',
                    boxShadow: '0 8px 32px rgba(251,191,36,0.08)',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}
                    aria-label="Medal icon"
                  >
                    🏅
                  </div>
                  <div>
                    <div className="text-xs font-mono-custom font-bold mb-1" style={{ color: '#F59E0B' }}>
                      Special Achievement
                    </div>
                    <div className="text-xl font-extrabold text-foreground">GATE Qualified</div>
                    <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                      Graduate Aptitude Test in Engineering — a nationally recognized benchmark of engineering excellence, demonstrating mastery of core engineering concepts and analytical thinking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills & Technologies ── */}
        <section
          className="relative py-24 border-t border-border overflow-hidden"
          aria-labelledby="skills-heading"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute blob-accent" style={{ width: '600px', height: '500px', top: '10%', right: '-150px', opacity: 0.15 }} />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Expertise</span>
              <h2 id="skills-heading" className="text-display font-extrabold text-foreground">
                Skills &amp; <span className="gradient-text">technologies</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                A full-stack capability spanning frontend, backend, cloud, and business domain expertise — everything needed to build complete business software.
              </p>
            </div>

            <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {skillGroups.map((group, gi) => (
                <div
                  key={group.category}
                  className="glass-card rounded-2xl p-6 border-glow-hover transition-all duration-700"
                  style={{
                    opacity: skillsInView ? 1 : 0,
                    transform: skillsInView ? 'none' : 'translateY(30px)',
                    transitionDelay: `${gi * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }}
                    />
                    <span
                      className="text-xs font-mono-custom font-bold uppercase tracking-widest"
                      style={{ color: group.color }}
                    >
                      {group.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <SkillBadge key={skill} label={skill} color={group.color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Us Differentiators ── */}
        <section
          className="relative py-24 border-t border-border overflow-hidden"
          aria-labelledby="why-us-heading"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute blob-primary" style={{ width: '700px', height: '600px', bottom: '-100px', left: '-200px', opacity: 0.15 }} />
            <div className="absolute blob-accent" style={{ width: '500px', height: '400px', top: '0', right: '-100px', opacity: 0.12 }} />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Why Choose Us</span>
              <h2 id="why-us-heading" className="text-display font-extrabold text-foreground">
                Why our approach is{' '}
                <span className="gradient-text">different</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                We are not just developers. We are engineers who understand business — and that changes everything about how we build software.
              </p>
            </div>

            <div ref={whyRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {whyUsDifferentiators.map((item, i) => (
                <div
                  key={item.title}
                  className="glass-card rounded-2xl p-7 border-glow-hover hover-elevate transition-all duration-700 group"
                  style={{
                    opacity: whyInView ? 1 : 0,
                    transform: whyInView ? 'none' : 'translateY(30px)',
                    transitionDelay: `${i * 90}ms`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${item.accent}15`,
                      border: `1px solid ${item.accent}30`,
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  <div
                    className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-24 border-t border-border overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,123,255,0.08) 0%, transparent 70%)' }}
            />
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="section-label mb-4 block">Ready to Build?</span>
            <h2 className="text-display font-extrabold text-foreground mb-5">
              Let's build your next{' '}
              <span className="gradient-text">software project</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Whether you need a website, ERP, inventory management system, automation tool, or a custom business application — Mech Engineer Soft is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary px-8 py-4 text-base magnetic-btn"
                aria-label="Book a free consultation"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 text-base font-semibold rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-300"
                aria-label="Explore our services"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
