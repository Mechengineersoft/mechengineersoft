import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import StructuredData from '@/app/components/StructuredData';
import ServiceWorkerRegistration from '@/app/components/ServiceWorkerRegistration';
import FloatingContact from '@/app/components/FloatingContact';
import StaticNavigation from '@/app/components/StaticNavigation';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'MechEngineerSoft — Engineering Business Solutions Through Software',
  description: 'MechEngineerSoft builds custom ERP, CRM, dashboards, and automation software for manufacturers, startups, and enterprises across India.',
  keywords: [
    'Business Software Development',
    'Custom Software Development',
    'ERP Development',
    'CRM Development',
    'Inventory Management Software',
    'Dashboard Development',
    'Business Automation',
    'React Development',
    'Node.js Development',
    'Cloud Applications',
    'Software Company India',
    'Manufacturing Software',
  ],
  openGraph: {
    title: 'MechEngineerSoft — Engineering Business Solutions',
    description: 'Custom ERP, CRM, and automation software built for Indian enterprises.',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MechEngineerSoft — Engineering Business Solutions',
    description: 'Custom ERP, CRM, and automation software built for Indian enterprises.',
    images: ['/assets/images/app_logo.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <StructuredData />
        <ServiceWorkerRegistration />
        <StaticNavigation />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
