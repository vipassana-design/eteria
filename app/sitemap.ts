import type { MetadataRoute } from 'next'
import { RUTAS, SITIO } from '@/content/sitio'

/** sitemap.xml generado (PLAN.md §8.5).
 *  /design-system queda fuera a propósito: es temporal. */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date()

  return RUTAS.map(({ ruta, prioridad }) => ({
    url: `${SITIO.url}${ruta}`,
    lastModified: ahora,
    changeFrequency: ruta === '/' ? 'monthly' : 'yearly',
    priority: prioridad,
  }))
}
