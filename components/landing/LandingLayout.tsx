import type { Landing } from '@/types'
import Contacto from '@/components/home/Contacto'
import LandingHero from './LandingHero'
import EjemplosLanding from './EjemplosLanding'
import LandingBeneficios from './LandingBeneficios'
import LandingProceso from './LandingProceso'

/** Estructura común de las tres landings (PLAN.md §5 y §16).
 *  Hero split → ejemplos de la línea → beneficios → proceso compacto →
 *  formulario con el tipo preseleccionado.
 *
 *  **Los ejemplos van justo después del hero.** Es la posición que el
 *  cliente pidió y tiene sentido: quien llega a la landing de un
 *  servicio quiere ver cómo se ve el resultado antes de leer qué
 *  incluye. Las tres propuestas de la línea le dan ese panorama en un
 *  solo pantallazo.
 *
 *  `Contacto` va con su propio título: trae su `<section id="contacto">`
 *  y envolverlo en otra duplicaría el id. */
export default function LandingLayout({ landing }: { landing: Landing }) {
  return (
    <>
      <LandingHero landing={landing} />
      <EjemplosLanding slug={landing.slug} />
      <LandingBeneficios beneficios={landing.beneficios} />
      <LandingProceso />
      {/* El glow va a la izquierda acá: "Cómo trabajamos", que viene
          justo antes, ya tiene el suyo a la derecha. En la home Contacto
          cierra la alternancia por la derecha y se queda así. */}
      <Contacto tipoPreseleccionado={landing.tipoPreseleccionado} glowIzquierda />
    </>
  )
}
