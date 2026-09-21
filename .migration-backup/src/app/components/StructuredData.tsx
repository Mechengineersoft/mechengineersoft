const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mechengineersoft.com';

export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Mech Engineer Soft',
        url: siteUrl,
        description: 'Engineering business solutions through software.',
        founder: { '@type': 'Person', name: 'S M Waqaar Yezdani', jobTitle: 'Founder & Business Software Developer' },
      },
      {
        '@type': 'WebSite',
        name: 'Mech Engineer Soft',
        url: siteUrl,
        potentialAction: { '@type': 'SearchAction', target: `${siteUrl}/portfolio?search={search_term_string}`, 'query-input': 'required name=search_term_string' },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
