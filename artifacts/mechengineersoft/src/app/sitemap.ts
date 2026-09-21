type SitemapEntry = { url: string; lastModified: Date; changeFrequency: string; priority: number };
export default function sitemap(): SitemapEntry[] {
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}