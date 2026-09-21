import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from '@/app/contact/components/ContactHero';
import ContactForm from '@/app/contact/components/ContactForm';
import ContactInfo from '@/app/contact/components/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact & Book Consultation — MechEngineerSoft',
  description:
    'Book a free 30-minute software consultation with MechEngineerSoft. Share your project requirements and get a no-obligation proposal within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact MechEngineerSoft — Book a Free Consultation',
    description: 'Share your project requirements and get a fixed-price proposal within 24 hours.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" aria-label="Contact page main content">
        <ContactHero />
        <section className="py-16 px-6" aria-label="Contact form and information">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}