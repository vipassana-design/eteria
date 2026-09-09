import { TiendaFicha } from './TiendaFicha'
import { SitioEstudio } from './SitioEstudio'
import { PanelKanban } from './PanelKanban'

/** Los mockups de las cards de "Tipos de proyecto".
 *
 *  Uno por servicio, y cada uno muestra una pantalla que no aparece en
 *  ningún otro lugar del sitio:
 *
 *  | Servicio | El hero muestra | Las landings | Acá |
 *  |---|---|---|---|
 *  | Ecommerce | listado con filtros | ficha de producto | **ficha de tecnología** |
 *  | Institucionales | home industrial | panel de contenido | **home de estudio** |
 *  | Software | tablero de KPIs | detalle de pedido | **tablero kanban** |
 *
 *  Cada uno tiene paleta propia —azul, verde, índigo— porque
 *  representan sitios de clientes distintos. No están atados a los
 *  tokens del tema: si el sitio cambia de acento, los mockups no.
 */
export const PANTALLAS_SERVICIO = {
  ecommerce: TiendaFicha,
  'sitios-institucionales': SitioEstudio,
  'software-a-medida': PanelKanban,
} as const
