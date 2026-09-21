'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/StaticLink';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.2 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden border-t border-border" aria-labelledby="cta-heading">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute blob-primary" style={{ width: '700px', height: '700px', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', opacity: 0.5 }} />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div
          className={`transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="section-label mb-6 block">Start Your Project</span>
          <h2 id="cta-heading" className="text-hero font-extrabold text-foreground mb-6">
            Ready to build<br />
            <span className="gradient-text">something exceptional?</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
            Whether you need a full ERP system, a CRM platform, or a custom dashboard — we'll scope your project, provide a fixed-price estimate, and deliver on time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="btn-primary magnetic-btn text-base px-8 py-4"
              aria-label="Book a free consultation"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/services"
              className="btn-secondary text-base px-8 py-4"
              aria-label="View all services"
            >
              View Services
            </Link>
          </div>

          {/* Reassurance row */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            {['No commitment required', 'Response within 24 hours', 'Fixed-price quotes available']?.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}