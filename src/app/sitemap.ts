import type { MetadataRoute } from 'next';
import { services, site } from '@/lib/config';
import { projects } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    ...services.map((s) => `/services/${s.slug}`),
    '/about',
    '/work',
    ...projects.map((p) => `/work/${p.slug}`),
    '/privacy',
    '/terms',
  ];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
  }));
}
