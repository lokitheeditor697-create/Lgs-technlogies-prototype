import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lgs.aimtechsolutions.in';
  
  // List all available internship domains
  const internships = [
    'ui-ux-designing',
    'ai-ml-development',
    'gst-taxation',
    'hr',
    'python-development',
    'sales-marketing',
    'web-development',
    'graphic-designing',
    'content-writing',
    'digital-marketing',
    'app-development',
    'data-science',
    'cyber-security',
    'cloud-computing'
  ];

  const internshipUrls = internships.map((domain) => ({
    url: `${baseUrl}/internships/${domain}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...internshipUrls,
  ];
}
