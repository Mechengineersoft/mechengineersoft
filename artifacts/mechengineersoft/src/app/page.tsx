import React from 'react';
import type { Metadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/app/components/Preloader';
import HeroSection from '@/app/components/HeroSection';
import ServicesBentoPreview from '@/app/components/ServicesBentoPreview';
import StatsSection from '@/app/components/StatsSection';
import ProcessSection from '@/app/components/ProcessSection';
import CTASection from '@/app/components/CTASection';
import StickyCTA from '@/app/components/StickyCTA';
import FounderStorySection from '@/app/components/FounderStorySection';
import CompanyShowcase from '@/app/components/CompanyShowcase';
import TestimonialsSection from '@/app/components/TestimonialsSection';

export const metadata: Metadata = {
  title: 'MechEngineerSoft — Engineering Business Solutions Through Software',
  description:
    'MechEngineerSoft builds custom ERP, CRM, inventory, and automation software for Indian manufacturers, startups, and enterprises. Book a free consultation today.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'MechEngineerSoft — Engineering Business Solutions',
    description: 'Custom ERP, CRM, dashboards, and automation software for Indian businesses.',
    url: '/',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content" aria-label="Homepage main content">
        <HeroSection />
        <ServicesBentoPreview />
        <StatsSection />
        <FounderStorySection />
        <CompanyShowcase />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
