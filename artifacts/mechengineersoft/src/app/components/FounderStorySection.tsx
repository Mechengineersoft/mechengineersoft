'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ─── Timeline milestones ─────────────────────────────────────── */
const timelineMilestones = [
  {
    year: '2014',
    tag: 'Foundation',
    title: 'Engineering Begins',
    body: 'Enrolled in B.Tech Mechanical Engineering — building a rigorous analytical foundation in thermodynamics, manufacturing, and production systems.',
    accent: '#0A7BFF',
  },
  {
    year: '2018',
    tag: 'Insight',
    title: 'Business Process Discovery',
    body: 'Worked extensively on production management, inventory systems, operational reporting and business process automation — seeing firsthand where manual workflows break.',
    accent: '#00C2FF',
  },
  {
    year: '2020',
    tag: 'Mastery',
    title: 'M.Tech — Thermal Engineering',
    body: 'Completed Master of Technology at Aliah University, deepening expertise in industrial systems and complex process optimization.',
    accent: '#0A7BFF',
  },
  {
    year: '2021',
    tag: 'Pivot',
    title: 'Software Development',
    body: 'Began building custom business software — combining engineering thinking with modern web technologies to solve real operational problems.',
    accent: '#00C2FF',
  },
  {
    year: '2022',
    tag: 'Expansion',
    title: 'MCA — Computer Applications',
    body: 'Pursued Master of Computer Applications at IGNOU to formalize software architecture knowledge and deepen full-stack development expertise.',
    accent: '#0A7BFF',
  },
  {
    year: '2023',
    tag: 'Launch',
    title: 'Mech Engineer Soft Founded',
    body: 'Founded Mech Engineer Soft with a clear mission: build intelligent business software that eliminates operational complexity for manufacturers, startups, and enterprises.',
    accent: '#00C2FF',
  },
];

/* ─── Mission / Vision ───────────────────────────────────────── */
const mvCards = [
  {
    type: 'Mission',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    headline: 'Empower through automation',
    body: 'To empower businesses with intelligent software solutions that automate operations, increase productivity and accelerate growth — removing complexity, not adding it.',
    gradient: 'from-[#0A7BFF]/20 to-[#00C2FF]/10',
    border: 'rgba(10,123,255,0.35)',
    glow: 'rgba(10,123,255,0.15)',
  },
  {
    type: 'Vision',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    headline: 'India\'s most trusted software company',
    body: 'To become one of India\'s most trusted software companies — delivering innovative digital products that serve manufacturers, healthcare, education, and enterprises worldwide.',
    gradient: 'from-[#00C2FF]/20 to-[#0A7BFF]/10',
    border: 'rgba(0,194,255,0.35)',
    glow: 'rgba(0,194,255,0.15)',
  },
];

/* ─── Skills ─────────────────────────────────────────────────── */
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

/* ─── Education ──────────────────────────────────────────────── */
const education = [
  {
    degree: 'M.Tech',
    field: 'Mechanical Engineering',
    spec: 'Thermal Engineering',
    institution: 'Aliah University',
    year: '2020',
    icon: '⚙️',
  },
  {
    degree: 'B.Tech',
    field: 'Mechanical Engineering',
    spec: '',
    institution: 'Adamas Institute of Technology · MAKAUT',
    year: '2018',
    icon: '🔩',
  },
  {
    degree: 'MCA',
    field: 'Master of Computer Applications',
    spec: '',
    institution: 'Indira Gandhi National Open University',
    year: '2022',
    icon: '💻',
  },
];

/* ─── Intersection hook ──────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Timeline Item ──────────────────────────────────────────── */
function TimelineItem({ item, index, active }: { item: typeof timelineMilestones[0]; index: number; active: boolean }) {
  const isRight = index % 2 === 1;
  return (
    <div
      className={`relative flex items-start gap-0 transition-all duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${index * 130}ms`, transform: active ? 'none' : isRight ? 'translateX(40px)' : 'translateX(-40px)' }}
    >
      {/* Left content (even) */}
      <div className={`flex-1 ${isRight ? 'pr-8 text-right hidden md:block' : 'pr-8 text-right'}`}>
        {!isRight && (
          <div
            className="inline-block glass-card rounded-2xl p-5 text-left max-w-xs border-glow-hover transition-all duration-300 hover:-translate-y-1"
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

      {/* Center spine */}
      <div className="flex flex-col items-center flex-shrink-0 relative z-10">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-mono-custom font-bold text-xs border-2 transition-all duration-300"
          style={{
            background: `${item.accent}15`,
            borderColor: item.accent,
            boxShadow: `0 0 16px ${item.accent}40`,
            color: item.accent,
          }}
        >
          {item.year.slice(2)}
        </div>
        <div className="text-xs text-muted-foreground mt-1 font-mono-custom">{item.year}</div>
      </div>

      {/* Right content (odd) */}
      <div className={`flex-1 ${isRight ? 'pl-8' : 'pl-8 hidden md:block'}`}>
        {isRight && (
          <div
            className="inline-block glass-card rounded-2xl p-5 max-w-xs border-glow-hover transition-all duration-300 hover:-translate-y-1"
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
        {/* Mobile: show all on right */}
        {!isRight && (
          <div
            className="inline-block glass-card rounded-2xl p-5 max-w-xs border-glow-hover transition-all duration-300 hover:-translate-y-1 md:hidden"
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

/* ─── Skill Badge ────────────────────────────────────────────── */
function SkillBadge({ label, color, delay }: { label: string; color: string; delay: number }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-default select-none hover:scale-105 hover:-translate-y-0.5"
      style={{
        background: `${color}12`,
        borderColor: `${color}35`,
        color: color,
        animationDelay: `${delay}ms`,
        boxShadow: `0 0 0 0 ${color}00`,
        transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${color}40`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${color}00`;
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function FounderStorySection() {
  const { ref: timelineRef, inView: timelineInView } = useInView(0.05);
  const { ref: mvRef, inView: mvInView } = useInView(0.15);
  const { ref: skillsRef, inView: skillsInView } = useInView(0.1);
  const { ref: eduRef, inView: eduInView } = useInView(0.1);
  const { ref: founderRef, inView: founderInView } = useInView(0.15);

  return (
    <section
      className="relative overflow-hidden border-t border-border"
      aria-labelledby="founder-story-heading"
      id="founder-story"
    >
      {/* Atmospheric blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute blob-primary" style={{ width: '700px', height: '500px', top: '5%', right: '-200px', opacity: 0.25 }} />
        <div className="absolute blob-accent" style={{ width: '500px', height: '400px', bottom: '10%', left: '-150px', opacity: 0.2 }} />
      </div>

      {/* ── Section header ── */}
      <div className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="section-label mb-4 block">Our Story</span>
          <h2
            id="founder-story-heading"
            className="text-display font-extrabold text-foreground mb-5"
          >
            Engineering meets <span className="gradient-text">software</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            Mech Engineer Soft was born from a simple observation: most business software is built by people who have never worked inside a factory, warehouse, or production floor. We changed that.
          </p>
        </div>

        {/* ── Founder card ── */}
        <div ref={founderRef} className="mb-24">
          <div
            className={`glass-card rounded-3xl p-8 md:p-12 border-glow max-w-4xl mx-auto transition-all duration-800 ${founderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDuration: '800ms' }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar placeholder with animated ring */}
              <div className="flex-shrink-0">
                <div className="relative w-28 h-28 md:w-36 md:h-36">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, #0A7BFF, #00C2FF, #0A7BFF)',
                      animation: 'spin 4s linear infinite',
                      padding: '2px',
                    }}
                  />
                  <div
                    className="absolute inset-[3px] rounded-full flex items-center justify-center text-4xl font-extrabold gradient-text"
                    style={{ background: 'var(--card)' }}
                  >
                    SW
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                  <span className="section-label">Founder</span>
                  <span className="text-muted-foreground text-xs font-mono-custom">·</span>
                  <span className="section-label" style={{ color: '#00C2FF' }}>Business Software Developer</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">S M Waqaar Yezdani</h3>
                <p className="text-sm text-muted-foreground mb-4 font-mono-custom">M.Tech (Mechanical Engineering – Thermal Engineering) · MCA</p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-xl">
                  "I am passionate about solving real business problems using software. My engineering background allows me to understand industrial processes while my software expertise enables me to build scalable digital solutions."
                </p>

                {/* Highlight chips */}
                <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
                  {['Engineering Mindset', 'Business Automation', 'Modern Software', 'Cloud Technologies'].map((chip) => (
                    <span
                      key={chip}
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{ background: 'rgba(10,123,255,0.12)', color: '#0A7BFF', border: '1px solid rgba(10,123,255,0.25)' }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Animated Timeline ── */}
        <div ref={timelineRef} className="mb-24">
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">Journey</span>
            <h3 className="text-display font-extrabold text-foreground">
              Our <span className="gradient-text">timeline</span>
            </h3>
          </div>

          {/* Spine line */}
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(10,123,255,0.4) 10%, rgba(0,194,255,0.4) 90%, transparent)',
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
                <TimelineItem key={item.year} item={item} index={i} active={timelineInView} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Mission & Vision ── */}
        <div ref={mvRef} className="mb-24">
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">Purpose</span>
            <h3 className="text-display font-extrabold text-foreground">
              Mission &amp; <span className="gradient-text">Vision</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mvCards.map((card, i) => (
              <div
                key={card.type}
                className={`relative rounded-3xl p-8 overflow-hidden transition-all duration-700 hover-elevate ${mvInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  transitionDelay: `${i * 150}ms`,
                  background: `linear-gradient(135deg, ${card.gradient.replace('from-', '').replace('to-', '')})`,
                  border: `1px solid ${card.border}`,
                  boxShadow: `0 8px 40px ${card.glow}`,
                }}
              >
                {/* Decorative glow blob */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: card.glow, filter: 'blur(40px)' }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: card.border, color: i === 0 ? '#0A7BFF' : '#00C2FF' }}
                  >
                    {card.icon}
                  </div>
                  <div className="section-label mb-2">{card.type}</div>
                  <h4 className="text-xl font-extrabold text-foreground mb-3">{card.headline}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Values row */}
          <div
            className={`mt-8 glass-card rounded-2xl p-6 max-w-4xl mx-auto transition-all duration-700 ${mvInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '350ms' }}
          >
            <div className="text-center mb-4">
              <span className="section-label">Core Values</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Innovation', 'Integrity', 'Quality', 'Commitment', 'Continuous Learning', 'Customer Success'].map((v, i) => (
                <span
                  key={v}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: i % 2 === 0 ? 'rgba(10,123,255,0.12)' : 'rgba(0,194,255,0.12)',
                    color: i % 2 === 0 ? '#0A7BFF' : '#00C2FF',
                    border: `1px solid ${i % 2 === 0 ? 'rgba(10,123,255,0.25)' : 'rgba(0,194,255,0.25)'}`,
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Education Milestones ── */}
        <div ref={eduRef} className="mb-24">
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">Academic Excellence</span>
            <h3 className="text-display font-extrabold text-foreground">
              Educational <span className="gradient-text">milestones</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-6">
            {education.map((edu, i) => (
              <div
                key={edu.degree}
                className={`glass-card rounded-2xl p-6 border-glow-hover hover-elevate transition-all duration-700 ${eduInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="text-3xl mb-4">{edu.icon}</div>
                <div
                  className="text-xs font-mono-custom font-bold px-2 py-0.5 rounded-full inline-block mb-3"
                  style={{ background: 'rgba(10,123,255,0.15)', color: '#0A7BFF' }}
                >
                  {edu.year}
                </div>
                <div className="text-xl font-extrabold text-foreground mb-1">{edu.degree}</div>
                <div className="text-sm font-semibold text-accent mb-1">{edu.field}</div>
                {edu.spec && <div className="text-xs text-muted-foreground mb-2">({edu.spec})</div>}
                <div className="text-xs text-muted-foreground leading-relaxed">{edu.institution}</div>
              </div>
            ))}
          </div>

          {/* GATE achievement card */}
          <div
            className={`max-w-5xl mx-auto transition-all duration-700 ${eduInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div
              className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
              style={{
                background: 'linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(245,158,11,0.04) 100%)',
                border: '1px solid rgba(251,191,36,0.3)',
                boxShadow: '0 8px 32px rgba(251,191,36,0.08)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}
              >
                🏅
              </div>
              <div>
                <div className="text-xs font-mono-custom font-bold mb-1" style={{ color: '#F59E0B' }}>Special Achievement</div>
                <div className="text-lg font-extrabold text-foreground">GATE Qualified</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Graduate Aptitude Test in Engineering — a nationally recognized benchmark of engineering excellence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills Badges ── */}
        <div ref={skillsRef}>
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">Expertise</span>
            <h3 className="text-display font-extrabold text-foreground">
              Skills &amp; <span className="gradient-text">technologies</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {skillGroups.map((group, gi) => (
              <div
                key={group.category}
                className={`glass-card rounded-2xl p-6 border-glow-hover transition-all duration-700 ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${gi * 100}ms` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }}
                  />
                  <span className="text-xs font-mono-custom font-bold uppercase tracking-widest" style={{ color: group.color }}>
                    {group.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <SkillBadge key={skill} label={skill} color={group.color} delay={gi * 60 + si * 40} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
