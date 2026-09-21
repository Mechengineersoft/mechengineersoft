'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

type ProjectType = { id: string; label: string; base: number; weeks: number };
type FeatureOption = { id: string; label: string; cost: number; weeks: number };

const projectTypes: ProjectType[] = [
  { id: 'website', label: 'Business Website', base: 35000, weeks: 3 },
  { id: 'dashboard', label: 'Dashboard / Analytics', base: 70000, weeks: 4 },
  { id: 'inventory', label: 'Inventory Software', base: 110000, weeks: 6 },
  { id: 'crm', label: 'CRM Platform', base: 130000, weeks: 7 },
  { id: 'erp', label: 'ERP System', base: 250000, weeks: 14 },
  { id: 'automation', label: 'Business Automation', base: 45000, weeks: 3 },
];

const featureOptions: FeatureOption[] = [
  { id: 'auth', label: 'Authentication & user roles', cost: 18000, weeks: 1 },
  { id: 'admin', label: 'Admin panel / CMS', cost: 30000, weeks: 2 },
  { id: 'reports', label: 'Reports & PDF exports', cost: 22000, weeks: 1 },
  { id: 'api', label: 'Third-party API integration', cost: 25000, weeks: 1 },
  { id: 'payments', label: 'Payment gateway', cost: 20000, weeks: 1 },
  { id: 'cloud', label: 'Cloud database & backups', cost: 15000, weeks: 1 },
  { id: 'whatsapp', label: 'WhatsApp / email automation', cost: 15000, weeks: 1 },
  { id: 'ai', label: 'AI assistant features', cost: 35000, weeks: 2 },
];

const timelines = [
  { id: 'standard', label: 'Standard schedule', multiplier: 1 },
  { id: 'priority', label: 'Priority (faster delivery)', multiplier: 1.2 },
  { id: 'flexible', label: 'Flexible (phased release)', multiplier: 0.92 },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.round(value / 1000) * 1000);

export default function CostEstimator() {
  const [projectType, setProjectType] = useState(projectTypes[1].id);
  const [features, setFeatures] = useState<string[]>(['auth', 'admin']);
  const [timeline, setTimeline] = useState(timelines[0].id);

  const estimate = useMemo(() => {
    const type = projectTypes.find((item) => item.id === projectType) ?? projectTypes[0];
    const selected = featureOptions.filter((item) => features.includes(item.id));
    const multiplier = timelines.find((item) => item.id === timeline)?.multiplier ?? 1;
    const base = type.base + selected.reduce((sum, item) => sum + item.cost, 0);
    const weeks = type.weeks + selected.reduce((sum, item) => sum + item.weeks, 0);
    return {
      low: base * multiplier * 0.9,
      high: base * multiplier * 1.25,
      weeksLow: Math.max(2, Math.round(weeks * (multiplier > 1 ? 0.8 : 1))),
      weeksHigh: Math.round(weeks * 1.3),
    };
  }, [projectType, features, timeline]);

  const toggleFeature = (id: string) =>
    setFeatures((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  return (
    <section className="max-w-7xl mx-auto mt-20" aria-labelledby="estimator-heading">
      <div className="glass-card rounded-3xl p-8 md:p-10">
        <p className="section-label mb-4">Project estimator</p>
        <h2 id="estimator-heading" className="text-3xl font-extrabold">
          Estimate your project in under a minute
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Choose what you need and see an indicative budget and timeline immediately.
        </p>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mt-10">
          <div className="space-y-8">
            <fieldset>
              <legend className="text-sm font-bold mb-4">1. What are you building?</legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <label
                    key={type.id}
                    className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                      projectType === type.id
                        ? 'border-primary bg-primary/15 text-foreground'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="project-type"
                      value={type.id}
                      checked={projectType === type.id}
                      onChange={() => setProjectType(type.id)}
                      className="sr-only"
                    />
                    {type.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-bold mb-4">2. Which features do you need?</legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {featureOptions.map((feature) => (
                  <label
                    key={feature.id}
                    className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium flex items-center gap-3 transition-all ${
                      features.includes(feature.id)
                        ? 'border-primary bg-primary/15 text-foreground'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={features.includes(feature.id)}
                      onChange={() => toggleFeature(feature.id)}
                      className="accent-primary"
                    />
                    {feature.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-bold mb-4">3. Preferred timeline</legend>
              <div className="grid sm:grid-cols-3 gap-3">
                {timelines.map((option) => (
                  <label
                    key={option.id}
                    className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                      timeline === option.id
                        ? 'border-primary bg-primary/15 text-foreground'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeline"
                      value={option.id}
                      checked={timeline === option.id}
                      onChange={() => setTimeline(option.id)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className="glass-card gradient-border rounded-3xl p-7 h-fit lg:sticky lg:top-28" aria-live="polite">
            <p className="font-mono-custom text-[11px] text-accent">ESTIMATED INVESTMENT</p>
            <p className="text-3xl font-extrabold mt-3 font-mono-custom">
              {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
            </p>
            <p className="font-mono-custom text-[11px] text-accent mt-7">ESTIMATED TIMELINE</p>
            <p className="text-xl font-bold mt-2">
              {estimate.weeksLow} – {estimate.weeksHigh} weeks
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-6">
              This is an estimated cost. Final pricing depends on project requirements.
            </p>
            <Link href="/contact" className="btn-primary w-full text-center px-6 py-3 text-sm mt-6 block">
              Get an exact quotation
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
