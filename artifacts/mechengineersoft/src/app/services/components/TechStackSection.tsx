'use client';

import React, { useEffect, useRef, useState } from 'react';

const techCategories = [
  {
    category: 'Frontend',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Framer Motion'],
  },
  {
    category: 'Backend',
    techs: ['Node.js', 'Express.js', 'Python', 'FastAPI', 'GraphQL', 'REST APIs'],
  },
  {
    category: 'Database',
    techs: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch'],
  },
  {
    category: 'Cloud & DevOps',
    techs: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Nginx'],
  },
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 border-t border-border relative overflow-hidden" aria-labelledby="tech-stack-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute blob-accent" style={{ width: '500px', height: '300px', right: '-80px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`mb-12 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label mb-4 block">Technology Stack</span>
          <h2 id="tech-stack-heading" className="text-display font-extrabold text-foreground">
            Modern tools,<br />
            <span className="gradient-text">proven in production</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techCategories?.map((cat, i) => (
            <div
              key={cat?.category}
              className={`glass-card rounded-2xl p-6 border-glow-hover transition-all duration-700 ${
                revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="font-bold text-base text-foreground mb-4">{cat?.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat?.techs?.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}