import { MetadataRoute } from 'next';
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/admin/'],
    },
    sitemap: 'https://lgs.aimtechsolutions.in/sitemap.xml',
  };
}
