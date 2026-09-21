import React from 'react';
import type { Metadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesHero from '@/app/services/components/ServicesHero';
import ServicesFullGrid from '@/app/services/components/ServicesFullGrid';
import TechStackSection from '@/app/services/components/TechStackSection';
import ServicesCTA from '@/app/services/components/ServicesCTA';
import StickyCTA from '@/app/components/StickyCTA';

export const metadata: Metadata = {
  title: 'Software Development Services — MechEngineerSoft',
  description:
    'Custom ERP, CRM, inventory management, dashboards, business automation, and cloud application development services by MechEngineerSoft.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Software Development Services — MechEngineerSoft',
    description: 'ERP, CRM, dashboards, and automation software engineered for Indian businesses.',
    url: '/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" aria-label="Services page main content">
        <ServicesHero />
        <ServicesFullGrid />
        <TechStackSection />
        <ServicesCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}