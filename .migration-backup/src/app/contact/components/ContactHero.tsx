'use client';

import React, { useEffect, useState } from 'react';

export default function ContactHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[44vh] flex items-end pb-14 pt-40 px-6 overflow-hidden bg-grid noise-overlay" aria-label="Contact hero">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute blob-primary" style={{ width: '500px', height: '500px', right: '-80px', top: '-80px', opacity: 0.5 }} />
        <div className="absolute blob-accent" style={{ width: '300px', height: '300px', left: '-60px', bottom: '-60px', opacity: 0.3 }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label mb-5 block">Get In Touch</span>
          <h1 className="text-hero font-extrabold text-foreground mb-6">
            Let's build your<br />
            <span className="gradient-text">next software solution</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Fill in your project details below. We'll review your requirements and respond with a structured proposal within 24 hours — no commitment required.
          </p>
        </div>
      </div>
    </section>
  );
}