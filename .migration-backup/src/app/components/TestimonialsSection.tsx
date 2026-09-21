'use client';

import React, { useEffect, useRef, useState } from 'react';

const placeholders = [
  { name: '--------', company: '--------', role: '--------', quote: '--------' },
  { name: '--------', company: '--------', role: '--------', quote: '--------' },
  { name: '--------', company: '--------', role: '--------', quote: '--------' },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setRevealed(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 border-t border-border relative overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute blob-accent" style={{ width: '460px', height: '300px', left: '-60px', top: '20%', opacity: 0.25 }} />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label mb-4 block">Client voices</span>
          <h2 id="testimonials-heading" className="text-display font-extrabold">
            What partners say<br />
            <span className="gradient-text">about working with us</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl leading-relaxed">
            Client reviews are published here as engagements complete. Each testimonial is managed from the admin panel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {placeholders.map((item, index) => (
            <article
              key={index}
              className={`glass-card glass-card-hover rounded-3xl p-7 hover-elevate transition-all duration-700 ${
                revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="flex gap-1 text-accent" aria-label="Rating pending">
                {Array.from({ length: 5 }).map((_, star) => (
                  <span key={star} aria-hidden="true" className="opacity-40">★</span>
                ))}
              </div>
              <p className="text-base text-foreground/80 leading-relaxed mt-5 min-h-24">“{item.quote}”</p>
              <div className="flex items-center gap-3 mt-7 pt-6 border-t border-border">
                <span
                  className="w-11 h-11 rounded-full border border-border bg-secondary flex items-center justify-center text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  MES
                </span>
                <div>
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.role} · {item.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
