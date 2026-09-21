import type { AnchorHTMLAttributes, ReactNode } from 'react';

type StaticLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
};

function staticHref(href: string) {
  const staticHosting =
    process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_STATIC_EXPORT !== 'false';
  if (!staticHosting || !href.startsWith('/') || href === '/') return href;


  const [pathAndSearch, hash = ''] = href.split('#', 2);
  const [pathname, search = ''] = pathAndSearch.split('?', 2);
  const hasExtension = /\/[^/]+\.[^/]+$/.test(pathname);
  const staticPath = hasExtension ? pathname : `${pathname.replace(/\/$/, '')}.html`;
  return `${staticPath}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
}

export default function StaticLink({ href, children, ...props }: StaticLinkProps) {
  return <a href={staticHref(href)} {...props}>{children}</a>;
}