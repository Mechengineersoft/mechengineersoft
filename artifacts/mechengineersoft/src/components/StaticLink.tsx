import type { AnchorHTMLAttributes, ReactNode } from 'react';

type StaticLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
};

function staticHref(href: string) {
  return href;
}

export default function StaticLink({ href, children, ...props }: StaticLinkProps) {
  return <a href={staticHref(href)} {...props}>{children}</a>;
}