'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from '@/components/StaticLink';
import { useLocation } from 'wouter';

import MESLogo from '@/components/MESLogo';
import Icon from '@/components/ui/AppIcon';
import { useSiteSettings } from '@/app/site-settings';

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
  const [pathname] = useLocation();
  const settings = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const isCurrentPage = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

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
    if (mobileOpen) {
      mobileMenuButtonRef.current?.focus({ preventScroll: true });
    }
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMobileOpen(false);
      mobileMenuButtonRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen]);

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
        className={`fixed top-0 left-0 w-full z-[70] transition-all duration-500 ${
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
                {settings.companyName}
              </span>
              <span className="section-label hidden sm:block" style={{ fontSize: '0.55rem', letterSpacing: '0.15em' }}>
                {settings.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 mr-5" aria-label="Main navigation">
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
            ref={mobileMenuButtonRef}
            className={`md:hidden flex items-center justify-center w-11 h-11 rounded-xl border transition-all ${
              mobileOpen
                ? 'border-primary bg-primary/15 text-accent'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-primary'
            }`}
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
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <div className="relative z-10 flex min-h-full max-h-[100dvh] flex-col items-center gap-4 overflow-y-auto overscroll-contain px-6 pt-[calc(6.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <MESLogo size={44} animated />
          <nav className="flex w-full max-w-sm flex-col gap-1.5" aria-label="Mobile navigation">
            {navLinks?.map((link, i) => (
              <Link
                key={link?.href}
                href={link?.href}
                tabIndex={mobileOpen ? 0 : -1}
                aria-current={isCurrentPage(link.href) ? 'page' : undefined}
                className={`flex min-h-12 items-center justify-center rounded-xl border px-5 py-2 text-lg font-bold tracking-tight transition-colors duration-200 ${
                  isCurrentPage(link.href)
                    ? 'border-primary/40 bg-primary/15 text-accent shadow-[0_0_20px_rgba(10,123,255,0.12)]'
                    : 'border-transparent text-foreground hover:border-border hover:bg-secondary/60 hover:text-accent'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {link?.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            tabIndex={mobileOpen ? 0 : -1}
            className="btn-primary mt-2 min-h-12 px-8 py-3 text-base"
            aria-label="Book a free consultation"
          >
            Book Consultation
          </Link>
          <Link tabIndex={mobileOpen ? 0 : -1} href="/admin/login" className="min-h-11 px-4 py-3 text-sm text-muted-foreground hover:text-foreground">Admin login</Link>
        </div>
      </div>
    </>
  );
}
