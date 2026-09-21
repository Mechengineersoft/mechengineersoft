'use client';

import React, { useEffect, useState } from 'react';
import MESLogo from '@/components/MESLogo';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setHidden(true);
          setTimeout(() => setMounted(false), 900);
        }, 300);
      }
      setProgress(Math.min(current, 100));
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`preloader ${hidden ? 'hidden' : ''}`}
      aria-label="Loading MechEngineerSoft"
      role="status"
    >
      <div className="flex flex-col items-center gap-8">
        <MESLogo size={72} animated />
        <div className="flex flex-col items-center gap-3">
          <span className="font-bold text-lg text-foreground tracking-tight">MechEngineerSoft</span>
          <span className="section-label">Engineering Business Solutions Through Software</span>
        </div>
        <div className="w-64 h-0.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--primary), var(--accent))',
            }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {Math.floor(progress)}%
        </span>
      </div>
    </div>
  );
}