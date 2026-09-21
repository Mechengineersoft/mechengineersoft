import React from 'react';
import '../styles/tailwind.css';
import StructuredData from '@/app/components/StructuredData';
import ServiceWorkerRegistration from '@/app/components/ServiceWorkerRegistration';
import FloatingContact from '@/app/components/FloatingContact';
import StaticNavigation from '@/app/components/StaticNavigation';
import { CustomCursor } from '@/app/components/CustomCursor';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData />
      <ServiceWorkerRegistration />
      <StaticNavigation />
      <CustomCursor />
      {children}
      <FloatingContact />
    </>
  );
}
