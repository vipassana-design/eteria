import type { MetadataRoute } from 'next'
import { SITIO } from '@/content/sitio'

/** robots.txt generado (PLAN.md §8.5). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Rutas de revisión interna y material de demostración: no
      // indexables. `/plantillas` son los sitios de muestra que se
      // abren en el modal de Soluciones (§16); se sirven por iframe,
      // no se navegan directo.
      disallow: ['/design-system', '/heros', '/fondos', '/mockups', '/plantillas'],
    },
    sitemap: `${SITIO.url}/sitemap.xml`,
  }
}
