'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/StaticLink';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/app/components/StickyCTA';
import { getProjectBySlug, getRelatedProjects, projects } from '../data/projects';

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

/* ─── Dashboard Preview ──────────────────────────────────────── */
function DashboardPreview({ accentColor, icon, title }: { accentColor: string; icon: string; title: string }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(5,13,26,0.95)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: `0 0 60px ${accentColor}20, 0 40px 80px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <div className="flex-1 mx-4 h-5 rounded-full bg-white/5 flex items-center px-3">
          <span className="text-[10px] text-white/20">mechengineersoft.com/demo/{title.toLowerCase().replace(/\s+/g, '-')}</span>
        </div>
      </div>

      {/* App layout */}
      <div className="flex" style={{ height: 400 }}>
        {/* Sidebar */}
        <div className="w-48 border-r border-white/5 p-4 flex flex-col gap-2" style={{ background: 'rgba(5,13,26,0.5)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{icon}</span>
            <div>
              <div className="text-xs font-bold text-white/80">{title}</div>
              <div className="text-[10px] text-white/30">Demo Mode</div>
            </div>
          </div>
          {['Dashboard', 'Analytics', 'Reports', 'Data', 'Settings', 'Users', 'Logs'].map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
              style={{
                background: i === 0 ? `${accentColor}20` : 'transparent',
                color: i === 0 ? accentColor : 'rgba(255,255,255,0.35)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? accentColor : 'rgba(255,255,255,0.15)' }} />
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 overflow-hidden">
          {/* KPI row */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Total Records', value: '2,847', delta: '+12%' },
              { label: 'Active Items', value: '1,293', delta: '+8%' },
              { label: 'This Month', value: '384', delta: '+23%' },
              { label: 'Efficiency', value: '94.2%', delta: '+5%' },
            ].map(({ label, value, delta }) => (
              <div key={label} className="rounded-xl p-3" style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}20` }}>
                <div className="text-[10px] text-white/40 mb-1">{label}</div>
                <div className="text-lg font-bold" style={{ color: accentColor }}>{value}</div>
                <div className="text-[10px] text-green-400">{delta}</div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Bar chart */}
            <div className="col-span-2 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="text-xs font-semibold text-white/50 mb-3">Monthly Overview</div>
              <div className="flex items-end justify-around h-24 gap-1">
                {[55, 72, 48, 88, 63, 95, 71, 84, 59, 92, 76, 89].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `linear-gradient(to top, ${accentColor}40, ${accentColor}90)` }} />
                ))}
              </div>
              <div className="flex justify-around mt-1">
                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m) => (
                  <div key={m} className="text-[8px] text-white/20">{m}</div>
                ))}
              </div>
            </div>

            {/* Donut chart */}
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="text-xs font-semibold text-white/50 mb-3">Distribution</div>
              <div className="flex justify-center mb-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(${accentColor} 0deg 216deg, #00C2FF 216deg 288deg, rgba(255,255,255,0.1) 288deg 360deg)`,
                  }}
                >
                  <div className="w-10 h-10 rounded-full" style={{ background: 'rgba(5,13,26,0.95)' }} />
                </div>
              </div>
              {[{ label: 'Primary', pct: '60%', color: accentColor }, { label: 'Secondary', pct: '20%', color: '#00C2FF' }, { label: 'Other', pct: '20%', color: 'rgba(255,255,255,0.2)' }].map(({ label, pct, color }) => (
                <div key={label} className="flex items-center justify-between text-[9px] mb-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-white/40">{label}</span>
                  </div>
                  <span style={{ color }}>{pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="grid grid-cols-4 px-4 py-2 text-[9px] font-semibold text-white/30 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <span>ID</span><span>Name</span><span>Status</span><span>Value</span>
            </div>
            {[
              { id: '#001', name: 'Record Alpha', status: 'Active', value: '₹12,400' },
              { id: '#002', name: 'Record Beta', status: 'Pending', value: '₹8,200' },
              { id: '#003', name: 'Record Gamma', status: 'Active', value: '₹21,800' },
            ].map((row) => (
              <div key={row.id} className="grid grid-cols-4 px-4 py-2 text-[10px] border-t border-white/5">
                <span className="text-white/30">{row.id}</span>
                <span className="text-white/60">{row.name}</span>
                <span style={{ color: row.status === 'Active' ? '#10B981' : '#F59E0B' }}>{row.status}</span>
                <span style={{ color: accentColor }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Project Detail Page ────────────────────────────────────── */
export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = getProjectBySlug(slug);
  const related = project ? getRelatedProjects(slug, project.category) : [];

  const { ref: overviewRef, inView: overviewInView } = useInView(0.1);
  const { ref: featuresRef, inView: featuresInView } = useInView(0.1);
  const { ref: techRef, inView: techInView } = useInView(0.1);

  if (!project) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
          <div className="text-center px-6">
            <div className="text-6xl mb-6">🔍</div>
            <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
            <p className="text-white/50 mb-8">The project you're looking for doesn't exist or has been moved.</p>
            <Link href="/portfolio" className="btn-primary px-8 py-3">
              Back to Portfolio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'var(--background)' }}>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section
          className="relative pt-32 pb-16 px-6 overflow-hidden"
          aria-labelledby="project-heading"
        >
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-10 blur-3xl"
              style={{ background: `radial-gradient(circle, ${project.accentColor}, transparent 70%)` }}
            />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `linear-gradient(${project.accentColor}40 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}40 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/portfolio" className="hover:text-white/60 transition-colors">Portfolio</Link>
              <span>/</span>
              <span className="text-white/60">{project.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: `${project.accentColor}20`, color: project.accentColor, border: `1px solid ${project.accentColor}30` }}
                  >
                    {project.category}
                  </span>
                  <span className="text-xs text-white/30">{project.clientType}</span>
                </div>

                <h1
                  id="project-heading"
                  className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4"
                >
                  {project.icon} {project.title}
                </h1>

                <p className="text-lg text-white/50 leading-relaxed mb-6">{project.shortDesc}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: `${project.accentColor}15`, color: project.accentColor, border: `1px solid ${project.accentColor}25` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="btn-primary px-6 py-2.5 text-sm font-semibold"
                    aria-label="Request a similar project"
                  >
                    Request Similar Project
                  </Link>
                  <Link
                    href="/portfolio"
                    className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300"
                    aria-label="Back to portfolio"
                  >
                    ← All Projects
                  </Link>
                </div>
              </div>

              {/* Right: Dashboard preview */}
              <div className="hidden lg:block">
                <DashboardPreview
                  accentColor={project.accentColor}
                  icon={project.icon}
                  title={project.title}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Overview: Challenge & Solution ───────────────────── */}
        <section ref={overviewRef} className="px-6 py-16" aria-labelledby="overview-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="overview-heading" className="text-2xl font-bold text-white mb-8">Project Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Challenge */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  opacity: overviewInView ? 1 : 0,
                  transform: overviewInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: 'rgba(239,68,68,0.15)' }}>⚠️</div>
                  <h3 className="font-bold text-white">The Challenge</h3>
                </div>
                <p className="text-white/60 leading-relaxed text-sm">{project.challenge}</p>
              </div>

              {/* Solution */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: `${project.accentColor}08`,
                  border: `1px solid ${project.accentColor}20`,
                  opacity: overviewInView ? 1 : 0,
                  transform: overviewInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: `${project.accentColor}20` }}>✅</div>
                  <h3 className="font-bold text-white">Our Solution</h3>
                </div>
                <p className="text-white/60 leading-relaxed text-sm">{project.solution}</p>
              </div>
            </div>

            {/* Long description */}
            <div
              className="mt-6 rounded-2xl p-6"
              style={{
                background: 'rgba(10,22,40,0.7)',
                border: '1px solid rgba(255,255,255,0.06)',
                opacity: overviewInView ? 1 : 0,
                transform: overviewInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
              }}
            >
              <p className="text-white/55 leading-relaxed">{project.longDesc}</p>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section ref={featuresRef} className="px-6 py-16" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }} />
              <h2 id="features-heading" className="text-2xl font-bold text-white">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.features.map((feature, i) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{
                    background: 'rgba(10,22,40,0.7)',
                    border: `1px solid ${project.accentColor}15`,
                    opacity: featuresInView ? 1 : 0,
                    transform: featuresInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${project.accentColor}25` }}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke={project.accentColor} strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-white/65 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits ─────────────────────────────────────────── */}
        <section className="px-6 py-16" aria-labelledby="benefits-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="benefits-heading" className="text-2xl font-bold text-white mb-8">Business Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {project.benefits.map((benefit, i) => (
                <div
                  key={benefit}
                  className="text-center p-5 rounded-2xl"
                  style={{
                    background: `${project.accentColor}08`,
                    border: `1px solid ${project.accentColor}20`,
                  }}
                >
                  <div className="text-2xl mb-2">
                    {['🚀', '📊', '🔒', '⚡', '💡'][i % 5]}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech Stack ───────────────────────────────────────── */}
        <section ref={techRef} className="px-6 py-16" aria-labelledby="tech-heading">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Tech stack */}
              <div>
                <h2 id="tech-heading" className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t, i) => (
                    <div
                      key={t}
                      className="px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{
                        background: `${project.accentColor}12`,
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}25`,
                        opacity: techInView ? 1 : 0,
                        transform: techInView ? 'scale(1)' : 'scale(0.8)',
                        transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Future scope */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Future Enhancements</h2>
                <div className="space-y-3">
                  {project.futureScope.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background: 'rgba(10,22,40,0.6)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        opacity: techInView ? 1 : 0,
                        transform: techInView ? 'translateX(0)' : 'translateX(20px)',
                        transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                      }}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: `${project.accentColor}20`, color: project.accentColor }}>
                        {i + 1}
                      </div>
                      <span className="text-sm text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Projects ─────────────────────────────────── */}
        {related.length > 0 && (
          <section className="px-6 py-16" aria-labelledby="related-heading">
            <div className="max-w-7xl mx-auto">
              <h2 id="related-heading" className="text-2xl font-bold text-white mb-8">Related Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/portfolio/${rel.slug}`}
                    className="group rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 block"
                    style={{ background: 'rgba(10,22,40,0.7)', backdropFilter: 'blur(20px)' }}
                    aria-label={`View ${rel.title}`}
                  >
                    <div
                      className={`relative h-32 bg-gradient-to-br ${rel.coverColor} flex items-center justify-center`}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{ background: `radial-gradient(circle, ${rel.accentColor}50, transparent 70%)` }}
                      />
                      <span className="text-4xl relative z-10">{rel.icon}</span>
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-semibold mb-1" style={{ color: rel.accentColor }}>{rel.category}</div>
                      <h3 className="font-bold text-white text-sm mb-1 group-hover:text-accent transition-colors">{rel.title}</h3>
                      <p className="text-xs text-white/40 line-clamp-2">{rel.shortDesc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <div
              className="relative rounded-3xl p-10 text-center overflow-hidden"
              style={{ background: 'rgba(10,22,40,0.8)', border: `1px solid ${project.accentColor}25`, backdropFilter: 'blur(20px)' }}
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}, transparent 60%)` }}
              />
              <div className="relative z-10">
                <h2 className="text-2xl font-extrabold text-white mb-3">
                  Want a Similar Solution for Your Business?
                </h2>
                <p className="text-white/50 mb-6 text-sm">
                  We build custom software tailored to your exact business requirements. Let's discuss your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn-primary px-8 py-3 text-sm font-semibold" aria-label="Start your project">
                    Start Your Project
                  </Link>
                  <Link href="/portfolio" className="px-8 py-3 text-sm font-semibold rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300" aria-label="View all projects">
                    View All Projects
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
