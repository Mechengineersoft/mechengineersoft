import React from 'react';
import Link from '@/components/StaticLink';
import MESLogo from '@/components/MESLogo';
import Icon from '@/components/ui/AppIcon';
import NewsletterSignup from '@/app/components/NewsletterSignup';

const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

const socialLinks = [
  { label: 'LinkedIn', href: '--------', icon: 'LinkIcon' as const },
  { label: 'GitHub', href: '--------', icon: 'CodeBracketIcon' as const },
  { label: 'YouTube', href: '--------', icon: 'PlayIcon' as const },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <NewsletterSignup />
        </div>
        {/* Pattern 1: Linear Single-Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="MechEngineerSoft — Home">
            <MESLogo size={32} />
            <span className="font-bold text-sm text-foreground hidden sm:block">MechEngineerSoft</span>
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social + Copyright */}
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href === '--------' ? '#' : s.href}
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-accent hover:border-primary transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name={s.icon} size={16} />
              </a>
            ))}
            <span className="text-sm text-muted-foreground ml-2">© 2026 MES</span>
          </div>
        </div>
      </div>
    </footer>
  );
}