import type { MetadataRoute } from 'next'
import { SITIO } from '@/content/sitio'

/** robots.txt generado (PLAN.md §8.5). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Rutas de revisión interna, no indexables.
      disallow: ['/design-system', '/heros', '/fondos'],
    },
    sitemap: `${SITIO.url}/sitemap.xml`,
  }
}
