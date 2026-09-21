'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (import.meta.env.DEV || !('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => { void navigator.serviceWorker.register('/sw.js'); }, { once: true });
  }, []);
  return null;
}
