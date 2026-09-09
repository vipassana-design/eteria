import type { ComponentType } from 'react'
import type { SlugPlantilla } from '@/types'
import Atelier from './atelier/Atelier'

/** Registro de las nueve plantillas (PLAN.md §16).
 *
 *  Mismo patrón que `PANTALLAS_SERVICIO` y `POR_PARTES`: un mapa del
 *  slug al componente, para que la ruta dinámica resuelva sin un
 *  `switch`.
 *
 *  Los imports son estáticos y no `dynamic()`: cada plantilla vive en
 *  su propia ruta, así que Next ya las separa en chunks por página. Un
 *  `dynamic()` acá sumaría un estado de carga sin ahorrar nada.
 *
 *  Las que faltan se van sumando por etapa. `PLANTILLAS` es parcial a
 *  propósito mientras eso pase: la ruta hace `notFound()` con los slugs
 *  que todavía no tienen componente, que es preferible a un stub vacío
 *  que se vería como una plantilla arruinada.
 */
export const PLANTILLAS: Partial<Record<SlugPlantilla, ComponentType>> = {
  atelier: Atelier,
}
