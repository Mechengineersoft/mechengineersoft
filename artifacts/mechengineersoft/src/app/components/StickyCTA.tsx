'use client';

import React, { useEffect, useState } from 'react';
import Link from '@/components/StaticLink';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky-cta ${visible ? 'visible' : ''}`} aria-hidden={!visible}>
      <Link
        href="/contact"
        className="btn-primary flex items-center gap-2 shadow-xl text-sm px-5 py-3"
        tabIndex={visible ? 0 : -1}
        aria-label="Book a free consultation"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Book Consultation
      </Link>
    </div>
  );
}