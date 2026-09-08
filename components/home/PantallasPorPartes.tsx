import { TiendaListado } from './TiendaListado'
import { PanelDashboard } from './PanelDashboard'
import { CorporativoHome } from './CorporativoHome'

/** Las pantallas del ciclo del hero, descompuestas en partes.
 *
 *  Cada una es un SVG donde cada bloque va en un grupo `data-parte`,
 *  con `data-item` en los elementos que se pueblan de a poco: así el
 *  timeline del hero puede armarlas por etapas.
 *
 *  Las primeras versiones eran rectángulos y líneas de color plano. Se
 *  reemplazaron por estas, con fotos reales y densidad de información
 *  de una pantalla en uso (PLAN.md §14). Cada una muestra una pantalla
 *  distinta de la que muestra su landing, para no repetir.
 */
export const POR_PARTES = {
  tienda: TiendaListado,
  panel: PanelDashboard,
  corporativo: CorporativoHome,
} as const
