import type { Landing } from '@/types'
import Contacto from '@/components/home/Contacto'
import LandingHero from './LandingHero'
import LandingBeneficios from './LandingBeneficios'
import LandingProceso from './LandingProceso'

/** Estructura común de las tres landings (PLAN.md §5).
 *  Hero split → beneficios → proceso compacto → formulario con el tipo
 *  preseleccionado.
 *
 *  `Contacto` va con su propio título: trae su `<section id="contacto">`
 *  y envolverlo en otra duplicaría el id. */
export default function LandingLayout({ landing }: { landing: Landing }) {
  return (
    <>
      <LandingHero landing={landing} />
      <LandingBeneficios beneficios={landing.beneficios} />
      <LandingProceso />
      <Contacto tipoPreseleccionado={landing.tipoPreseleccionado} />
    </>
  )
}
