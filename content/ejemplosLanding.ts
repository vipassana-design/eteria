import type { LandingSlug, Plantilla } from '@/types'

/** Copy del módulo de ejemplos de las landings (PLAN.md §16).
 *
 *  Cada landing de servicio muestra las tres plantillas de su línea, en
 *  tres cards fijas —no un carrusel: el carrusel es el recurso de la
 *  home, y repetirlo acá le quitaría peso a los dos. Acá el visitante ya
 *  eligió un servicio, así que lo que corresponde es un panorama rápido
 *  y completo de las tres propuestas, todas visibles a la vez.
 */
export const seccionEjemplos = {
  volanta: 'Propuestas',
  /** El título cambia por línea: "proyectos de ecommerce" dice más que
   *  un "Ejemplos" a secas, y evita repetir la misma frase en las tres
   *  landings. */
  titulo: {
    ecommerce: 'Ejemplos de tiendas online',
    'sitios-institucionales': 'Ejemplos de sitios institucionales',
    'software-a-medida': 'Ejemplos de sistemas a medida',
  } as Record<LandingSlug, string>,
  bajada:
    'Tres propuestas conceptuales para recorrer completas. Son demostraciones, no trabajos publicados.',
  abrir: 'Ver en detalle',
}

/** De qué línea de negocio es cada landing.
 *
 *  El campo `linea` de `Plantilla` usa el nombre de la línea y no el
 *  slug de la landing: son dos vocabularios distintos —uno es de
 *  negocio, el otro de ruteo— y este mapa los une en un solo lugar en
 *  lugar de repartir la traducción por los componentes. */
export const LINEA_DE_LANDING: Record<LandingSlug, Plantilla['linea']> = {
  ecommerce: 'Ecommerce',
  'sitios-institucionales': 'Institucional',
  'software-a-medida': 'Software a medida',
}
