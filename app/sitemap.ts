import type { MetadataRoute } from 'next'
import { RUTAS, SITIO } from '@/content/sitio'

/** sitemap.xml generado (PLAN.md §8.5).
 *  /design-system, /heros y /fondos quedan fuera a propósito: son rutas
 *  de revisión interna. Van con noindex y en el disallow de robots.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date()

  return RUTAS.map(({ ruta, prioridad }) => ({
    url: `${SITIO.url}${ruta}`,
    lastModified: ahora,
    changeFrequency: ruta === '/' ? 'monthly' : 'yearly',
    priority: prioridad,
  }))
}
