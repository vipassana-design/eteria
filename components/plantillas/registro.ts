import type { ComponentType } from 'react'
import type { SlugPlantilla } from '@/types'
import Atelier from './atelier/Atelier'
import Clinica from './clinica/Clinica'
import Terrazas from './terrazas/Terrazas'
import Marquez from './marquez/Marquez'
import Vertice from './vertice/Vertice'
import Feria from './feria/Feria'
import Panel from './panel/Panel'
import Flota from './flota/Flota'
import Legajos from './legajos/Legajos'

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
 *  Es parcial mientras se van sumando: el carrusel, el modal y el
 *  módulo de las landings filtran por las que existen, y la ruta hace
 *  `notFound()` con las que no —preferible a un stub vacío que se vería
 *  como una plantilla arruinada.
 */
export const PLANTILLAS: Partial<Record<SlugPlantilla, ComponentType>> = {
  atelier: Atelier,
  clinica: Clinica,
  terrazas: Terrazas,
  marquez: Marquez,
  vertice: Vertice,
  feria: Feria,
  panel: Panel,
  flota: Flota,
  legajos: Legajos,
}
