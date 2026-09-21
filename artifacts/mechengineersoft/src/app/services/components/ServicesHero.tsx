'use client';

import React, { useEffect, useState } from 'react';

export default function ServicesHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[50vh] flex items-end pb-16 pt-40 px-6 overflow-hidden bg-grid noise-overlay" aria-label="Services hero">
      {/* Depth layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute blob-primary" style={{ width: '600px', height: '600px', right: '-100px', top: '-100px', opacity: 0.5 }} />
        <div className="absolute blob-accent" style={{ width: '400px', height: '400px', left: '-80px', bottom: '-80px', opacity: 0.3 }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label mb-5 block">Our Services</span>
          <h1 className="text-hero font-extrabold text-foreground mb-6">
            Software built for<br />
            <span className="gradient-text">business precision</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            From ERP systems managing 5,000+ SKUs to CRM platforms closing ₹50 Cr pipelines —
            every solution is engineered from the ground up to match your exact requirements.
          </p>
        </div>
      </div>
    </section>
  );
}