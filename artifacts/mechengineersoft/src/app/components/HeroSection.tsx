'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/StaticLink';
import MESLogo from '@/components/MESLogo';
import { useSiteSettings } from '@/app/site-settings';
import { HeroUniverseBackground } from './HeroUniverseBackground';

const terminalLines = [
  { delay: 0, color: 'text-accent', prefix: '$', text: 'mes init --project enterprise-erp' },
  { delay: 600, color: 'text-muted-foreground', prefix: '›', text: 'Analyzing requirements...' },
  { delay: 1200, color: 'text-muted-foreground', prefix: '›', text: 'Architecting database schema...' },
  { delay: 1800, color: 'text-muted-foreground', prefix: '›', text: 'Scaffolding React + Node.js stack...' },
  { delay: 2400, color: 'text-muted-foreground', prefix: '›', text: 'Configuring cloud deployment...' },
  { delay: 3000, color: 'text-green-400', prefix: '✓', text: 'Solution deployed. Performance: 98/100' },
];

const floatingTechs = [
  { label: 'React', x: '8%', y: '20%', delay: 0 },
  { label: 'Node.js', x: '88%', y: '15%', delay: 0.5 },
  { label: 'PostgreSQL', x: '5%', y: '72%', delay: 1 },
  { label: 'TypeScript', x: '85%', y: '68%', delay: 1.5 },
  { label: 'AWS', x: '15%', y: '45%', delay: 0.8 },
  { label: 'Docker', x: '80%', y: '42%', delay: 1.2 },
];

export default function HeroSection() {
  const settings = useSiteSettings();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay + 800);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid noise-overlay"
      aria-label="Hero section"
    >
      {/* Universe background — decorative layer */}
      <HeroUniverseBackground />
      {/* Atmospheric depth layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Layer 1: far background blobs */}
        <div
          className="absolute blob-primary animate-float"
          style={{ width: '600px', height: '600px', top: '-100px', left: '-150px', opacity: 0.6 }}
        />
        <div
          className="absolute blob-accent animate-float-delayed"
          style={{ width: '500px', height: '500px', bottom: '-80px', right: '-100px', opacity: 0.5 }}
        />
        {/* Layer 2: mid atmospheric */}
        <div
          className="absolute blob-primary"
          style={{ width: '400px', height: '400px', top: '40%', left: '50%', transform: 'translateX(-50%)', opacity: 0.15, filter: 'blur(100px)' }}
        />
        {/* Floating tech tags */}
        {floatingTechs.map((tech) => (
          <div
            key={tech.label}
            className="absolute hidden xl:flex items-center tech-tag animate-float"
            style={{
              left: tech.x,
              top: tech.y,
              animationDelay: `${tech.delay}s`,
              animationDuration: `${4 + tech.delay}s`,
            }}
            aria-hidden="true"
          >
            {tech.label}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            {/* Label */}
            <div
              className={`inline-flex items-center gap-3 mb-8 transition-all duration-700 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
               <span className="section-label">{settings.companyName}</span>
              <span className="w-8 h-px bg-accent" />
              <span className="section-label text-muted-foreground">Est. 2020</span>
            </div>

            {/* Headline */}
            <h1
              className={`text-hero font-extrabold text-foreground mb-6 transition-all duration-700 delay-100 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Engineering
              <br />
              <span className="gradient-text">Business Solutions</span>
              <br />
              Through Software
            </h1>

            {/* Subheadline */}
            <p
              className={`text-lg text-muted-foreground leading-relaxed max-w-lg mb-10 transition-all duration-700 delay-200 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <strong className="text-foreground">{settings.tagline}.</strong>{' '}
              We build custom ERP systems, CRM platforms, inventory tools, and
              cloud dashboards that transform how manufacturers and enterprises
              operate — delivered with startup agility and enterprise precision.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 delay-300 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link
                href="/contact"
                className="btn-primary magnetic-btn text-center"
                aria-label="Book a free consultation with MechEngineerSoft"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/services"
                className="btn-secondary text-center"
                aria-label="Explore our software services"
              >
                Explore Services →
              </Link>
            </div>

            {/* Trust signals */}
            <div
              className={`flex flex-wrap gap-8 transition-all duration-700 delay-400 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '5+', label: 'Years Experience' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-extrabold text-2xl gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal mockup */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="terminal-window shadow-2xl" style={{ boxShadow: '0 0 80px rgba(10,123,255,0.12), 0 40px 80px rgba(0,0,0,0.4)' }}>
              {/* Terminal title bar */}
              <div className="bg-secondary/60 px-5 py-3 flex items-center justify-between border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  mes-cli v2.6.0 — project-init
                </span>
                <div className="w-12" />
              </div>

              {/* Terminal body */}
              <div className="p-6 font-mono text-sm min-h-72 bg-background/60">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 mb-3 transition-all duration-500 ${
                      visibleLines.includes(i)
                        ? 'opacity-100 translate-y-0' :'opacity-0 translate-y-2'
                    }`}
                  >
                    <span className={line.color + ' select-none'}>{line.prefix}</span>
                    <span className={i === terminalLines.length - 1 ? 'text-green-400 font-semibold' : 'text-foreground/80'}>
                      {line.text}
                    </span>
                  </div>
                ))}
                {/* Cursor blink */}
                <div className="flex gap-3 items-center mt-1">
                  <span className="text-accent select-none">$</span>
                  <span
                    className="w-2 h-4 bg-accent inline-block"
                    style={{ animation: 'blink 1s step-end infinite' }}
                  />
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div
              className="glass-card rounded-2xl p-5 mt-4 flex items-center gap-5 border-glow animate-float"
              style={{ animationDelay: '2s' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
              >
                <MESLogo size={28} />
              </div>
              <div>
                <div className="font-bold text-foreground text-sm">Enterprise ERP Delivered</div>
                <div className="text-xs text-muted-foreground mt-0.5">Manufacturing client — 3,200 daily active users</div>
              </div>
              <div className="ml-auto text-green-400 text-xs font-mono font-bold">LIVE ●</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="section-label" style={{ fontSize: '0.6rem' }}>Scroll</span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-accent"
            style={{ height: '40%', animation: 'scan-line 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}