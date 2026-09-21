'use client';

import { useEffect } from 'react';

export default function StaticNavigation() {
  useEffect(() => {
    const navigateWithDocument = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.protocol !== window.location.protocol ||
        destination.pathname.startsWith('/api/')
      ) {
        return;
      }

      const sameDocument =
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search;
      if (sameDocument && destination.hash) return;

      const isFile = /\/[^/]+\.[^/]+$/.test(destination.pathname);
      if (
        process.env.NODE_ENV === 'production' &&
        process.env.NEXT_PUBLIC_STATIC_EXPORT !== 'false' &&
        destination.pathname !== '/' &&
        !isFile &&
        !destination.pathname.endsWith('/')
      ) {
        destination.pathname = `${destination.pathname}.html`;
      }

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(destination.href);
    };

    document.addEventListener('click', navigateWithDocument, true);
    return () => document.removeEventListener('click', navigateWithDocument, true);
  }, []);

  return null;
}