/** Datos del sitio para SEO (PLAN.md §8.5).
 *
 *  El dominio es un pendiente del cliente (§1). Se define acá y se usa
 *  en metadataBase, sitemap y JSON-LD: cuando se resuelva, se cambia en
 *  un solo lugar.
 */
export const SITIO = {
  // PENDIENTE: dominio definitivo.
  url: process.env.NEXT_PUBLIC_URL ?? 'https://eteria.com',
  nombre: 'Eteria',
  descripcion:
    'Desarrollamos ecommerce, plataformas de gestión y sitios institucionales. Cada proyecto se construye sobre el alcance que definimos con el cliente.',
  locale: 'es_AR',
  /** Área geográfica principal. */
  pais: 'AR',
} as const

/** Rutas indexables, para el sitemap. */
export const RUTAS = [
  { ruta: '/', prioridad: 1 },
  { ruta: '/ecommerce', prioridad: 0.8 },
  { ruta: '/sitios-institucionales', prioridad: 0.8 },
  { ruta: '/software-a-medida', prioridad: 0.8 },
  { ruta: '/privacidad', prioridad: 0.3 },
] as const
