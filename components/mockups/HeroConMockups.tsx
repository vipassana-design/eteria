'use client'

import Hero from '@/components/home/Hero'
import { TiendaListado } from './TiendaListado'
import { PanelDashboard } from './PanelDashboard'
import { CorporativoHome } from './CorporativoHome'

/** El hero real con los mockups nuevos en el ciclo.
 *
 *  El mapa de pantallas vive acá y no en la página: son componentes, y
 *  pasarlos como prop desde un server component no se puede serializar
 *  (el build falla al prerenderizar). Este wrapper es cliente, así que
 *  los importa y los pasa del lado del cliente.
 */
const PANTALLAS = {
  tienda: TiendaListado,
  panel: PanelDashboard,
  corporativo: CorporativoHome,
} as const

export default function HeroConMockups() {
  return <Hero pantallas={PANTALLAS} />
}
