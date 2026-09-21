'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 50, suffix: '+', label: 'Projects Delivered', description: 'Across manufacturing, retail, and healthcare' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', description: 'Based on post-delivery feedback scores' },
  { value: 5, suffix: '+', label: 'Years of Engineering', description: 'Building production-grade business software' },
  { value: 12, suffix: '+', label: 'Technology Stacks', description: 'React, Node.js, Python, PostgreSQL & more' },
];

function useCounter(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return count;
}

function StatCard({ stat, index, started }: { stat: StatItem; index: number; started: boolean }) {
  const count = useCounter(stat.value, 2000, started);

  return (
    <div
      className={`glass-card rounded-2xl p-8 border-glow-hover transition-all duration-700 hover-elevate ${
        started ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="font-extrabold text-5xl gradient-text mb-2 font-mono">
        {count}{stat.suffix}
      </div>
      <div className="font-bold text-base text-foreground mb-2">{stat.label}</div>
      <div className="text-sm text-muted-foreground leading-relaxed">{stat.description}</div>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden" aria-labelledby="stats-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute blob-accent" style={{ width: '600px', height: '300px', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', opacity: 0.3 }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-14 transition-all duration-700 ${started ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label mb-4 block">By The Numbers</span>
          <h2 id="stats-heading" className="text-display font-extrabold text-foreground">
            Built on <span className="gradient-text">results, not promises</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}