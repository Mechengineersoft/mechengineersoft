'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    number: '01',
    icon: 'MagnifyingGlassIcon' as const,
    title: 'Discovery & Requirements',
    description: 'We begin with a structured discovery session — mapping your workflows, pain points, and goals to define a precise technical specification.',
    duration: '1–2 weeks',
  },
  {
    number: '02',
    icon: 'PencilSquareIcon' as const,
    title: 'Architecture & Design',
    description: 'System architecture, database schema, UI wireframes, and API contracts are finalized before a single line of production code is written.',
    duration: '1–2 weeks',
  },
  {
    number: '03',
    icon: 'CodeBracketIcon' as const,
    title: 'Agile Development',
    description: 'Two-week sprints with working demos at each milestone. You see real progress — not status updates — from day one.',
    duration: '4–12 weeks',
  },
  {
    number: '04',
    icon: 'BeakerIcon' as const,
    title: 'Testing & QA',
    description: 'Automated test suites, manual UAT sessions, and performance benchmarking ensure your software is production-ready before launch.',
    duration: '1–2 weeks',
  },
  {
    number: '05',
    icon: 'RocketLaunchIcon' as const,
    title: 'Deployment & Handover',
    description: 'Zero-downtime deployment to your cloud environment with full documentation, team training, and 90-day post-launch support included.',
    duration: '1 week',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden border-t border-border" id="process" aria-labelledby="process-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute blob-primary" style={{ width: '400px', height: '400px', left: '-80px', bottom: '0', opacity: 0.3 }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Steps */}
          <div>
            <div className={`mb-12 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="section-label mb-4 block">How We Work</span>
              <h2 id="process-heading" className="text-display font-extrabold text-foreground">
                A proven process for<br />
                <span className="gradient-text">on-time delivery</span>
              </h2>
            </div>

            <div className="space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`flex gap-6 group transition-all duration-700 ${
                    revealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Step indicator */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:border-primary group-hover:shadow-lg"
                      style={{
                        background: 'rgba(10, 22, 40, 0.8)',
                        borderColor: 'rgba(26, 48, 80, 0.9)',
                      }}
                    >
                      <Icon name={step.icon} size={20} className="text-primary" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 mt-2 mb-2" style={{ background: 'linear-gradient(to bottom, rgba(10,123,255,0.3), rgba(0,194,255,0.1))' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="section-label">{step.number}</span>
                      <span className="text-xs text-muted-foreground font-mono border border-border px-2 py-0.5 rounded">{step.duration}</span>
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky companion card */}
          <div className={`lg:sticky lg:top-28 transition-all duration-700 delay-300 ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="glass-card rounded-3xl p-8 border-glow">
              <div className="mb-6">
                <span className="section-label mb-3 block">Typical Timeline</span>
                <div className="font-extrabold text-4xl gradient-text">8–16 Weeks</div>
                <p className="text-muted-foreground text-sm mt-2">From first call to production deployment</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { label: 'Fixed-price contracts available', icon: 'CheckCircleIcon' as const },
                  { label: 'Weekly progress demos', icon: 'CheckCircleIcon' as const },
                  { label: '90-day post-launch support', icon: 'CheckCircleIcon' as const },
                  { label: 'Source code ownership', icon: 'CheckCircleIcon' as const },
                  { label: 'NDA on all projects', icon: 'CheckCircleIcon' as const },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <Icon name={item.icon} size={18} className="text-accent flex-shrink-0" variant="solid" />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to start your project? Book a free 30-minute discovery call.
                </p>
                <a
                  href="/contact"
                  className="btn-primary w-full text-center block text-sm"
                  aria-label="Book a free discovery call"
                >
                  Book Discovery Call
                </a>
              </div>
            </div>

            {/* Tech stack card */}
            <div className="glass-card rounded-2xl p-6 mt-5 animate-float" style={{ animationDelay: '1s' }}>
              <span className="section-label mb-4 block">Core Technology Stack</span>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Redis', 'GraphQL'].map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}