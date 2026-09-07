import type { MetadataRoute } from 'next'
import { SITIO } from '@/content/sitio'

/** robots.txt generado (PLAN.md §8.5). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Ruta temporal de revisión, no indexable.
      disallow: ['/design-system'],
    },
    sitemap: `${SITIO.url}/sitemap.xml`,
  }
}
