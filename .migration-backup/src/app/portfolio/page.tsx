'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/app/components/StickyCTA';
import { projects, categories } from './data/projects';

/* ─── Intersection hook ──────────────────────────────────────── */
function useInView(threshold = 0.1) {
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

/* ─── MockupFrame ────────────────────────────────────────────── */
function MockupFrame({
  type,
  accentColor,
  icon,
  title,
}: {
  type: string;
  accentColor: string;
  icon: string;
  title: string;
}) {
  const isMobile = type === 'mobile';
  const isTablet = type === 'tablet';

  if (isMobile) {
    return (
      <div className="relative flex justify-center items-center h-full py-4">
        <div
          className="relative rounded-[2rem] border-2 overflow-hidden"
          style={{
            width: 120,
            height: 220,
            borderColor: 'rgba(255,255,255,0.15)',
            background: 'rgba(5,13,26,0.9)',
            boxShadow: `0 0 40px ${accentColor}30, 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full z-10" />
          {/* Screen */}
          <div className="absolute inset-2 rounded-[1.5rem] overflow-hidden" style={{ background: `linear-gradient(135deg, ${accentColor}15, rgba(5,13,26,0.95))` }}>
            <div className="p-2 pt-4">
              <div className="text-center text-2xl mb-1">{icon}</div>
              <div className="text-center text-[8px] font-bold text-white/80 mb-2">{title}</div>
              {[80, 60, 90, 45, 70].map((w, i) => (
                <div key={i} className="flex items-center gap-1 mb-1">
                  <div className="h-1 rounded-full" style={{ width: `${w}%`, background: `${accentColor}80` }} />
                </div>
              ))}
              <div className="mt-2 rounded-lg p-1.5" style={{ background: `${accentColor}20` }}>
                <div className="h-8 rounded" style={{ background: `${accentColor}30` }} />
              </div>
            </div>
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/20 rounded-full" />
        </div>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="relative flex justify-center items-center h-full py-2">
        <div
          className="relative rounded-2xl border-2 overflow-hidden"
          style={{
            width: 200,
            height: 150,
            borderColor: 'rgba(255,255,255,0.15)',
            background: 'rgba(5,13,26,0.9)',
            boxShadow: `0 0 40px ${accentColor}30, 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          <div className="absolute inset-1.5 rounded-xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${accentColor}15, rgba(5,13,26,0.95))` }}>
            <div className="flex h-full">
              <div className="w-1/3 border-r border-white/5 p-2">
                <div className="text-lg mb-1">{icon}</div>
                {['Nav', 'Data', 'Reports', 'Settings'].map((item) => (
                  <div key={item} className="text-[6px] text-white/40 py-0.5 px-1 rounded mb-0.5" style={{ background: 'rgba(255,255,255,0.03)' }}>{item}</div>
                ))}
              </div>
              <div className="flex-1 p-2">
                <div className="text-[7px] font-bold text-white/70 mb-1">{title}</div>
                <div className="grid grid-cols-2 gap-1 mb-1">
                  {[accentColor, '#00C2FF'].map((c, i) => (
                    <div key={i} className="rounded p-1" style={{ background: `${c}20` }}>
                      <div className="text-[6px] text-white/40">Metric {i + 1}</div>
                      <div className="text-[9px] font-bold" style={{ color: c }}>{i === 0 ? '1,284' : '94%'}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded h-10" style={{ background: `${accentColor}15` }}>
                  <div className="flex items-end justify-around h-full px-1 pb-1">
                    {[60, 80, 45, 90, 70, 85].map((h, i) => (
                      <div key={i} className="w-2 rounded-t" style={{ height: `${h}%`, background: `${accentColor}80` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop / Laptop / Dashboard
  return (
    <div className="relative flex justify-center items-end h-full pb-2">
      <div className="relative" style={{ width: '90%' }}>
        {/* Screen */}
        <div
          className="relative rounded-t-xl border-t-2 border-l-2 border-r-2 overflow-hidden"
          style={{
            borderColor: 'rgba(255,255,255,0.15)',
            background: 'rgba(5,13,26,0.95)',
            paddingTop: '62%',
            boxShadow: `0 0 40px ${accentColor}25`,
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className="w-2 h-2 rounded-full bg-green-500/60" />
              <div className="flex-1 mx-2 h-3 rounded-full bg-white/5 flex items-center px-2">
                <span className="text-[5px] text-white/20">mechengineersoft.com/{title.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>
            </div>
            {/* App content */}
            <div className="flex h-full" style={{ background: `linear-gradient(135deg, ${accentColor}08, rgba(5,13,26,0.98))` }}>
              {/* Sidebar */}
              <div className="w-1/4 border-r border-white/5 p-2 flex flex-col gap-1">
                <div className="text-base mb-1">{icon}</div>
                <div className="text-[6px] font-bold text-white/60 mb-1">{title}</div>
                {['Dashboard', 'Analytics', 'Reports', 'Settings', 'Users'].map((item, i) => (
                  <div
                    key={item}
                    className="text-[5px] py-0.5 px-1.5 rounded"
                    style={{
                      background: i === 0 ? `${accentColor}30` : 'rgba(255,255,255,0.03)',
                      color: i === 0 ? accentColor : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
              {/* Main content */}
              <div className="flex-1 p-2">
                <div className="grid grid-cols-3 gap-1 mb-2">
                  {['Total', 'Active', 'Revenue'].map((label, i) => (
                    <div key={label} className="rounded p-1" style={{ background: `${accentColor}15` }}>
                      <div className="text-[5px] text-white/40">{label}</div>
                      <div className="text-[8px] font-bold" style={{ color: accentColor }}>
                        {i === 0 ? '2,847' : i === 1 ? '1,293' : '₹4.2L'}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Chart area */}
                <div className="rounded p-1.5 mb-1" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-end justify-around h-12 px-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="w-2 rounded-t transition-all"
                        style={{ height: `${h}%`, background: `linear-gradient(to top, ${accentColor}40, ${accentColor}90)` }}
                      />
                    ))}
                  </div>
                </div>
                {/* Table rows */}
                {[1, 2, 3].map((row) => (
                  <div key={row} className="flex gap-1 mb-0.5">
                    <div className="flex-1 h-2 rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    <div className="w-8 h-2 rounded" style={{ background: `${accentColor}20` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Stand */}
        <div className="flex justify-center">
          <div className="w-1/3 h-2 rounded-b-lg" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>
        <div className="flex justify-center">
          <div className="w-1/2 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>
      </div>
    </div>
  );
}

/* ─── ProjectCard ────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, inView } = useInView(0.08);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) ${hovered ? 'translateY(-6px)' : 'translateY(0)'}`,
          transition: 'transform 0.3s ease',
        }}
        className="group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
        role="article"
        aria-label={`${project.title} project`}
      >
        {/* Glow border on hover */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: hovered ? 1 : 0,
            boxShadow: `inset 0 0 0 1px ${project.accentColor}50, 0 0 40px ${project.accentColor}20`,
          }}
        />

        {/* Mockup area */}
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${project.coverColor}`}
          style={{ height: 220 }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accentColor}40, transparent 70%)` }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${project.accentColor}20 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}20 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />
          <MockupFrame
            type={project.mockupType}
            accentColor={project.accentColor}
            icon={project.icon}
            title={project.title}
          />
          {/* Featured badge */}
          {project.featured && (
            <div
              className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: `${project.accentColor}30`, color: project.accentColor, border: `1px solid ${project.accentColor}40` }}
            >
              ⭐ Featured
            </div>
          )}
          {/* Category badge */}
          <div
            className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(5,13,26,0.8)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {project.category}
          </div>
        </div>

        {/* Card body */}
        <div className="p-5" style={{ background: 'rgba(10,22,40,0.85)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{project.icon}</span>
            <div>
              <h3 className="font-bold text-base text-white leading-tight mb-1">{project.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{project.shortDesc}</p>
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${project.accentColor}15`, color: project.accentColor, border: `1px solid ${project.accentColor}25` }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium text-white/30 border border-white/10">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* CTA */}
          <Link
            href={`/portfolio/${project.slug}`}
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group/btn"
            style={{
              background: hovered ? `${project.accentColor}25` : 'rgba(255,255,255,0.05)',
              color: hovered ? project.accentColor : 'rgba(255,255,255,0.6)',
              border: `1px solid ${hovered ? project.accentColor + '40' : 'rgba(255,255,255,0.08)'}`,
            }}
            aria-label={`View ${project.title} case study`}
          >
            <span>View Case Study</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Portfolio Page ────────────────────────────────────── */
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const { ref: statsRef, inView: statsInView } = useInView(0.2);

  const filtered = projects.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'var(--background)' }}>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 px-6 overflow-hidden"
          aria-labelledby="portfolio-heading"
        >
          {/* Background blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
              style={{ background: 'radial-gradient(circle, #0A7BFF, transparent 70%)' }}
            />
            <div
              className="absolute -bottom-20 -right-40 w-[500px] h-[500px] rounded-full opacity-8 blur-3xl"
              style={{ background: 'radial-gradient(circle, #00C2FF, transparent 70%)' }}
            />
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(rgba(10,123,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(10,123,255,0.5) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/60">Portfolio</span>
            </nav>

            <div className="max-w-3xl">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
                style={{ background: 'rgba(10,123,255,0.12)', color: '#0A7BFF', border: '1px solid rgba(10,123,255,0.25)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Enterprise-Grade Demo Projects
              </div>

              <h1
                id="portfolio-heading"
                className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <span className="text-white">Proof of</span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0A7BFF, #00C2FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Enterprise Capability
                </span>
              </h1>

              <p className="text-lg text-white/50 leading-relaxed max-w-2xl mb-8">
                Every project below demonstrates production-ready architecture, real business logic, and enterprise-grade UI. These aren't mockups — they're fully functional demo systems built to solve actual business problems.
              </p>

              {/* Stats row */}
              <div ref={statsRef} className="flex flex-wrap gap-6">
                {[
                  { value: '11+', label: 'Demo Projects' },
                  { value: '6', label: 'Industry Verticals' },
                  { value: '15+', label: 'Technologies' },
                  { value: '100%', label: 'Custom Built' },
                ].map(({ value, label }, i) => (
                  <div
                    key={label}
                    style={{
                      opacity: statsInView ? 1 : 0,
                      transform: statsInView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                    }}
                  >
                    <div className="text-2xl font-extrabold" style={{ color: '#0A7BFF' }}>{value}</div>
                    <div className="text-xs text-white/40">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Projects ─────────────────────────────────── */}
        <section className="px-6 pb-16" aria-labelledby="featured-heading">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #0A7BFF, transparent)' }} />
              <h2 id="featured-heading" className="text-sm font-bold tracking-widest uppercase text-white/40">Featured Work</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.slice(0, 2).map((project, i) => (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 block"
                  style={{
                    background: 'rgba(10,22,40,0.7)',
                    backdropFilter: 'blur(20px)',
                  }}
                  aria-label={`View ${project.title} featured project`}
                >
                  {/* Mockup area */}
                  <div
                    className={`relative overflow-hidden bg-gradient-to-br ${project.coverColor}`}
                    style={{ height: 280 }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accentColor}50, transparent 70%)` }}
                    />
                    <div
                      className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                      style={{
                        backgroundImage: `linear-gradient(${project.accentColor}20 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}20 1px, transparent 1px)`,
                        backgroundSize: '24px 24px',
                      }}
                    />
                    <MockupFrame
                      type={project.mockupType}
                      accentColor={project.accentColor}
                      icon={project.icon}
                      title={project.title}
                    />
                    <div
                      className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: `${project.accentColor}30`, color: project.accentColor, border: `1px solid ${project.accentColor}40` }}
                    >
                      ⭐ Featured
                    </div>
                    <div
                      className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(5,13,26,0.8)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed">{project.shortDesc}</p>
                      </div>
                      <span className="text-3xl flex-shrink-0">{project.icon}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
                          style={{ background: `${project.accentColor}15`, color: project.accentColor, border: `1px solid ${project.accentColor}25` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      className="flex items-center gap-2 text-sm font-semibold transition-colors duration-300"
                      style={{ color: project.accentColor }}
                    >
                      <span>View Full Case Study</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Filter & Search ───────────────────────────────────── */}
        <section className="px-6 pb-8 sticky top-16 z-30" aria-label="Project filters">
          <div className="max-w-7xl mx-auto">
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl"
              style={{ background: 'rgba(10,22,40,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Category filters */}
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                    style={{
                      background: activeCategory === cat ? 'linear-gradient(135deg, #0A7BFF, #00C2FF)' : 'rgba(255,255,255,0.05)',
                      color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                      border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: activeCategory === cat ? '0 0 20px rgba(10,123,255,0.3)' : 'none',
                    }}
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 w-48"
                  aria-label="Search projects"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── All Projects Grid ─────────────────────────────────── */}
        <section className="px-6 pb-24" aria-labelledby="all-projects-heading">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 id="all-projects-heading" className="text-2xl font-bold text-white">
                {activeCategory === 'All' ? 'All Projects' : activeCategory}
                <span className="ml-3 text-sm font-normal text-white/30">({filtered.length})</span>
              </h2>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-white/40 text-lg">No projects match your search.</p>
                <button
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="relative rounded-3xl p-12 overflow-hidden"
              style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(10,123,255,0.2)', backdropFilter: 'blur(20px)' }}
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, #0A7BFF, transparent 60%)' }}
              />
              <div className="relative z-10">
                <div className="text-4xl mb-4">🚀</div>
                <h2 className="text-3xl font-extrabold text-white mb-4">
                  Ready to Build Your{' '}
                  <span style={{ background: 'linear-gradient(135deg, #0A7BFF, #00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Custom Solution?
                  </span>
                </h2>
                <p className="text-white/50 mb-8 max-w-xl mx-auto">
                  Every project above was built from scratch for real business needs. Let's discuss what we can build for yours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="btn-primary px-8 py-3 text-sm font-semibold"
                    aria-label="Start your project"
                  >
                    Start Your Project
                  </Link>
                  <Link
                    href="/services"
                    className="px-8 py-3 text-sm font-semibold rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all duration-300"
                    aria-label="Explore our services"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
