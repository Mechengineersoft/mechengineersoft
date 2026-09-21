'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/StaticLink';
import Icon from '@/components/ui/AppIcon';
import { usePublicContent } from '@/app/use-public-content';

const allServices = [
  {
    id: 'erp',
    icon: 'CubeIcon' as const,
    label: 'ERP Systems',
    headline: 'End-to-end enterprise resource planning',
    description:
      'Custom ERP platforms built for manufacturers and mid-size enterprises. Unify procurement, production scheduling, finance, HR, and reporting in a single, role-based system.',
    features: [
      'Multi-module architecture (Finance, HR, Production)',
      'Role-based access control',
      'Real-time reporting & KPI dashboards',
      'Mobile-responsive interface',
      'API integrations with existing tools',
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    span: 'md:col-span-2',
    featured: true,
  },
  {
    id: 'crm',
    icon: 'UserGroupIcon' as const,
    label: 'CRM Platforms',
    headline: 'Sales pipelines that close deals faster',
    description:
      'Purpose-built CRM for B2B sales teams. Track leads from first contact to closed deal with automated follow-ups, pipeline analytics, and team performance dashboards.',
    features: [
      'Lead & opportunity management',
      'Automated email follow-ups',
      'Sales pipeline visualization',
      'Activity logging & reminders',
      'Revenue forecasting reports',
    ],
    tags: ['React', 'Node.js', 'MongoDB'],
    span: 'md:col-span-1',
    featured: false,
  },
  {
    id: 'inventory',
    icon: 'ArchiveBoxIcon' as const,
    label: 'Inventory Management',
    headline: 'Real-time stock visibility across warehouses',
    description:
      'Barcode-enabled inventory tracking with multi-warehouse support, automated reorder alerts, batch tracking, and supplier management — designed for manufacturers and distributors.',
    features: [
      'Barcode & QR code scanning',
      'Multi-warehouse management',
      'Automated reorder triggers',
      'Batch & expiry tracking',
      'Supplier & purchase order management',
    ],
    tags: ['TypeScript', 'PostgreSQL', 'Node.js'],
    span: 'md:col-span-1',
    featured: false,
  },
  {
    id: 'dashboard',
    icon: 'ChartBarIcon' as const,
    label: 'Dashboard & Analytics',
    headline: 'Business intelligence that drives decisions',
    description:
      'Interactive dashboards with live KPIs, drill-down reports, and role-based views. Connect to your existing databases, ERP, or CRM and surface the metrics your leadership team actually needs.',
    features: [
      'Live KPI widgets',
      'Drill-down interactive charts',
      'Role-based data visibility',
      'Scheduled PDF report exports',
      'Multi-source data connectors',
    ],
    tags: ['React', 'Recharts', 'Node.js', 'PostgreSQL'],
    span: 'md:col-span-1',
    featured: false,
  },
  {
    id: 'automation',
    icon: 'BoltIcon' as const,
    label: 'Business Automation',
    headline: 'Eliminate manual workflows permanently',
    description:
      'Workflow automation, scheduled tasks, and API integrations that reduce manual data entry and repetitive operations by 60–80%. From invoice generation to approval chains.',
    features: [
      'Visual workflow builder',
      'Scheduled job automation',
      'Third-party API webhooks',
      'Email & SMS trigger notifications',
      'Audit trail & rollback',
    ],
    tags: ['Node.js', 'Webhooks', 'TypeScript'],
    span: 'md:col-span-1',
    featured: false,
  },
  {
    id: 'cloud',
    icon: 'CloudIcon' as const,
    label: 'Cloud Applications',
    headline: 'Scalable, secure, always available',
    description:
      'Cloud-native applications deployed on AWS or Azure with auto-scaling, CI/CD pipelines, and 99.9% uptime SLAs. Built for performance under real production load.',
    features: [
      'AWS / Azure deployment',
      'Auto-scaling architecture',
      'CI/CD pipelines (GitHub Actions)',
      'SSL, WAF & security hardening',
      '99.9% uptime SLA',
    ],
    tags: ['AWS', 'Docker', 'Node.js', 'Nginx'],
    span: 'md:col-span-3',
    featured: true,
  },
];

export default function ServicesFullGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const storedServices = usePublicContent('services', []);
  const renderedServices = storedServices.length > 0
    ? storedServices.map((service: { slug: string; title: string; summary: string; icon: string; features?: string[] }, index) => ({
      ...allServices[index % allServices.length],
      id: service.slug,
      icon: service.icon,
      label: service.title,
      headline: service.title,
      description: service.summary,
      features: service.features || [],
    }))
    : allServices;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden" aria-labelledby="full-services-heading">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-14 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 id="full-services-heading" className="text-display font-extrabold text-foreground">
            Complete service <span className="gradient-text">portfolio</span>
          </h2>
        </div>

        {/* BENTO GRID AUDIT:
            Cards: [ERP (cs-2), CRM (cs-1), Inventory (cs-1), Dashboard (cs-1), Automation (cs-1), Cloud (cs-3)]
            Row 1: [col-1–2: ERP cs-2] [col-3: CRM cs-1]
            Row 2: [col-1: Inventory cs-1] [col-2: Dashboard cs-1] [col-3: Automation cs-1]
            Row 3: [col-1–3: Cloud cs-3]
            Placed 6/6 ✓
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {renderedServices.map((service, i) => (
            <div
              key={service.id}
              className={`bento-card p-8 ${service.span} transition-all duration-700 flex flex-col ${
                revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(10, 123, 255, 0.1)', border: '1px solid rgba(10, 123, 255, 0.2)' }}
                >
                  <Icon name={service.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <span className="section-label">{service.label}</span>
                  <h3 className="font-bold text-lg text-foreground leading-snug mt-1">{service.headline}</h3>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{service.description}</p>

              {/* Features list */}
              <ul className="space-y-2 mb-6" aria-label={`${service.label} features`}>
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-accent mt-0.5 flex-shrink-0">›</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Tags + CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-5 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-accent hover:text-primary transition-colors flex items-center gap-1"
                  aria-label={`Get a quote for ${service.label}`}
                >
                  Get Quote →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}