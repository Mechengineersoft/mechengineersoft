'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/StaticLink';
import Icon from '@/components/ui/AppIcon';
import { usePublicContent } from '@/app/use-public-content';

const services = [
  {
    id: 'erp',
    label: 'ERP Systems',
    icon: 'CubeIcon' as const,
    tagline: 'End-to-end enterprise resource planning',
    description:
      'Custom ERP platforms built for manufacturers and mid-size enterprises — procurement, production, finance, and HR unified in one system.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    span: 'col-span-1 md:col-span-2',
    featured: true,
  },
  {
    id: 'crm',
    label: 'CRM Platforms',
    icon: 'UserGroupIcon' as const,
    tagline: 'Sales pipelines that close deals faster',
    description: 'Purpose-built CRM for B2B sales teams — lead tracking, pipeline management, and automated follow-ups.',
    tags: ['React', 'Node.js'],
    span: 'col-span-1',
    featured: false,
  },
  {
    id: 'inventory',
    label: 'Inventory Management',
    icon: 'ArchiveBoxIcon' as const,
    tagline: 'Real-time stock visibility',
    description: 'Barcode-enabled inventory tracking with multi-warehouse support and automated reorder alerts.',
    tags: ['TypeScript', 'PostgreSQL'],
    span: 'col-span-1',
    featured: false,
  },
  {
    id: 'dashboard',
    label: 'Dashboard & Analytics',
    icon: 'ChartBarIcon' as const,
    tagline: 'Data that drives decisions',
    description: 'Interactive business intelligence dashboards with live KPIs, drill-down reports, and role-based views.',
    tags: ['Recharts', 'React'],
    span: 'col-span-1',
    featured: false,
  },
  {
    id: 'automation',
    label: 'Business Automation',
    icon: 'BoltIcon' as const,
    tagline: 'Eliminate manual workflows',
    description: 'Workflow automation, scheduled tasks, and API integrations that reduce manual work by 60–80%.',
    tags: ['Node.js', 'Webhooks'],
    span: 'col-span-1',
    featured: false,
  },
  {
    id: 'cloud',
    label: 'Cloud Applications',
    icon: 'CloudIcon' as const,
    tagline: 'Scalable, secure, always available',
    description: 'Cloud-native apps deployed on AWS or Azure with auto-scaling, CI/CD pipelines, and 99.9% uptime SLAs.',
    tags: ['AWS', 'Docker', 'Node.js'],
    span: 'col-span-1 md:col-span-3',
    featured: false,
  },
];

export default function ServicesBentoPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const storedServices = usePublicContent('services', []);
  const displayedServices = storedServices.length > 0
    ? storedServices.map((service: { slug: string; title: string; summary: string; icon: string; features?: string[] }, index) => ({
      ...services[index % services.length],
      id: service.slug,
      label: service.title,
      tagline: service.title,
      description: service.summary,
      icon: service.icon,
      tags: service.features?.slice(0, 3) || [],
    }))
    : services;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden" id="services-preview" aria-labelledby="services-heading">
      {/* Background depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute blob-primary" style={{ width: '500px', height: '500px', right: '-100px', top: '0', opacity: 0.4 }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <span className="section-label mb-4 block">What We Build</span>
            <h2 id="services-heading" className="text-display font-extrabold text-foreground">
              Software engineered for<br />
              <span className="gradient-text">real business outcomes</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm border-l border-border pl-6">
            From ERP to cloud dashboards — every solution is architected from scratch to match your exact workflow, not a generic template.
          </p>
        </div>

        {/* BENTO GRID AUDIT:
            Cards: [ERP (cs-2), CRM (cs-1), Inventory (cs-1), Dashboard (cs-1), Automation (cs-1), Cloud (cs-3)]
            Row 1: [col-1–2: ERP cs-2] [col-3: CRM cs-1]
            Row 2: [col-1: Inventory cs-1] [col-2: Dashboard cs-1] [col-3: Automation cs-1]
            Row 3: [col-1–3: Cloud cs-3]
            Placed 6/6 ✓
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayedServices.map((service, i) => (
            <div
              key={service.id}
              className={`bento-card p-7 ${service.span} transition-all duration-700 ${
                revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                style={{ background: 'rgba(10, 123, 255, 0.12)', border: '1px solid rgba(10, 123, 255, 0.2)' }}
              >
                <Icon name={service.icon} size={22} className="text-primary" />
              </div>

              <div className={service.featured ? 'flex flex-col lg:flex-row lg:gap-10' : ''}>
                <div className={service.featured ? 'lg:flex-1' : ''}>
                  <span className="section-label mb-2 block">{service.label}</span>
                  <h3 className="font-bold text-xl text-foreground mb-3 leading-snug">{service.tagline}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                {service.featured && (
                  <div className="mt-6 lg:mt-0 lg:flex-shrink-0 flex items-end">
                    <Link
                      href="/services"
                      className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap"
                      aria-label={`Learn more about ${service.label}`}
                    >
                      View All Services →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}