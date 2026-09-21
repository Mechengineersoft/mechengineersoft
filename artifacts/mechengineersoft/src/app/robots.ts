export default function robots() {
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}