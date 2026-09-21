'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/StaticLink';

export default function ServicesCTA() {
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
    <section ref={sectionRef} className="py-24 px-6 border-t border-border relative overflow-hidden" aria-labelledby="services-cta-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute blob-primary" style={{ width: '600px', height: '600px', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', opacity: 0.4 }} />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <div className={`transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="section-label mb-6 block">Let's Build Together</span>
          <h2 id="services-cta-heading" className="text-display font-extrabold text-foreground mb-6">
            Not sure which service<br />
            <span className="gradient-text">fits your needs?</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Book a free 30-minute discovery call. We'll analyze your workflows, identify the highest-impact software opportunity, and provide a no-obligation proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4 magnetic-btn" aria-label="Book a free consultation">
              Book Free Discovery Call
            </Link>
            <Link href="/" className="btn-secondary text-base px-8 py-4" aria-label="Return to homepage">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}