'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const contactDetails = [
  {
    icon: 'EnvelopeIcon' as const,
    label: 'Business Email',
    value: '--------',
    href: null,
  },
  {
    icon: 'PhoneIcon' as const,
    label: 'Phone Number',
    value: '--------',
    href: null,
  },
  {
    icon: 'MapPinIcon' as const,
    label: 'Office Address',
    value: '--------',
    href: null,
  },
];

const socialLinks = [
  { label: 'LinkedIn', icon: 'LinkIcon' as const, href: '--------' },
  { label: 'GitHub', icon: 'CodeBracketIcon' as const, href: '--------' },
  { label: 'YouTube', icon: 'PlayIcon' as const, href: '--------' },
  { label: 'Instagram', icon: 'CameraIcon' as const, href: '--------' },
  { label: 'X (Twitter)', icon: 'ChatBubbleLeftRightIcon' as const, href: '--------' },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects take 8–16 weeks from discovery to deployment, depending on scope and complexity.',
  },
  {
    q: 'Do you offer fixed-price contracts?',
    a: 'Yes. After the discovery phase, we provide a fixed-price proposal so there are no billing surprises.',
  },
  {
    q: 'Who owns the source code?',
    a: 'You do. Full source code ownership is transferred upon project completion.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: '90 days of post-launch support is included in every project. Extended support plans are also available.',
  },
];

export default function ContactInfo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col gap-6">
      {/* Contact details card */}
      <div
        className={`glass-card rounded-3xl p-7 border-glow transition-all duration-700 ${
          revealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
      >
        <h2 className="font-bold text-lg text-foreground mb-6">Contact Details</h2>
        <div className="space-y-5">
          {contactDetails.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(10,123,255,0.1)', border: '1px solid rgba(10,123,255,0.2)' }}
              >
                <Icon name={item.icon} size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium mb-0.5">{item.label}</div>
                <div className="text-sm text-foreground font-semibold">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-xs text-muted-foreground font-medium mb-3">Follow Us</div>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href === '--------' ? '#' : s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-accent hover:border-primary transition-all duration-200"
              >
                <Icon name={s.icon} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Business hours card */}
      <div
        className={`glass-card rounded-3xl p-7 transition-all duration-700 delay-100 ${
          revealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
      >
        <h3 className="font-bold text-base text-foreground mb-4">Business Hours</h3>
        <div className="space-y-2">
          {[
            { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM IST' },
            { day: 'Saturday', hours: '10:00 AM – 2:00 PM IST' },
            { day: 'Sunday', hours: 'Closed' },
          ].map((item) => (
            <div key={item.day} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.day}</span>
              <span className={`font-medium ${item.hours === 'Closed' ? 'text-muted-foreground' : 'text-foreground'}`}>
                {item.hours}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Typically responds within 4 business hours
        </div>
      </div>

      {/* FAQ accordion */}
      <div
        className={`glass-card rounded-3xl p-7 transition-all duration-700 delay-200 ${
          revealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
      >
        <h3 className="font-bold text-base text-foreground mb-5">Frequently Asked</h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-foreground hover:text-accent transition-colors min-h-[44px]"
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{faq.q}</span>
                <Icon
                  name={openFaq === i ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                  size={16}
                  className="text-muted-foreground flex-shrink-0 ml-3 transition-transform duration-300"
                />
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === i ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div
        className={`glass-card rounded-3xl p-7 transition-all duration-700 delay-300 ${
          revealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
      >
        <h3 className="font-bold text-base text-foreground mb-4">Quick Links</h3>
        <div className="flex flex-col gap-2">
          {[
            { label: 'View All Services', href: '/services' },
            { label: 'Back to Home', href: '/' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between text-sm text-muted-foreground hover:text-accent transition-colors py-2 border-b border-border last:border-0 min-h-[44px]"
            >
              <span>{link.label}</span>
              <Icon name="ArrowRightIcon" size={14} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}