'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from '@/components/StaticLink';
import { usePathname } from 'next/navigation';

import MESLogo from '@/components/MESLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Industries', href: '/industries' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Scroll progress
      const docHeight = document.documentElement?.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-background/90 backdrop-blur-xl border-b border-border' :'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="MechEngineerSoft — Home"
          >
            <MESLogo size={36} className="transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="font-bold text-base leading-tight text-foreground tracking-tight hidden sm:block">
                MechEngineerSoft
              </span>
              <span className="section-label hidden sm:block" style={{ fontSize: '0.55rem', letterSpacing: '0.15em' }}>
                Engineering Business Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className={`nav-link-animated text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  pathname === link?.href
                    ? 'text-accent active' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/admin/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Admin login</Link>
            <Link
              href="/contact"
              className="btn-primary text-sm px-5 py-2.5 magnetic-btn"
              aria-label="Book a free consultation"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
          </button>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 px-6">
          <MESLogo size={56} animated />
          <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
            {navLinks?.map((link, i) => (
              <Link
                key={link?.href}
                href={link?.href}
                className={`text-2xl font-bold tracking-tight transition-colors duration-200 ${
                  pathname === link?.href ? 'text-accent' : 'text-foreground hover:text-accent'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {link?.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="btn-primary text-base px-8 py-3 mt-4"
            aria-label="Book a free consultation"
          >
            Book Consultation
          </Link>
          <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-foreground">Admin login</Link>
        </div>
      </div>
    </>
  );
}
