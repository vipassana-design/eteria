import Reveal from '@/components/ui/Reveal'
import TituloSeccion from '@/components/ui/TituloSeccion'
import { proceso } from '@/content/proceso'
import { landingUi } from '@/content/landings'
import Glow from '@/components/bg/Glow'

/** Versión compacta del proceso para las landings (PLAN.md §5).
 *
 *  Sin ilustraciones ni línea conectora: en la landing el proceso es
 *  contexto, no la sección protagonista. Esa versión completa vive en
 *  la home. */
export default function LandingProceso() {
  return (
    <section id="proceso" className="seccion relative scroll-mt-24 border-t border-hairline">
      <Glow className="-right-56 top-16" tamano={580} intensidad={0.55} soloDesktop />
      <div className="contenedor">
        <TituloSeccion
          degrade={landingUi.tituloProcesoDegrade}
          bajada={landingUi.bajadaProceso}
        >
          {landingUi.tituloProceso}
        </TituloSeccion>

        <Reveal
          variante="lateral"
          stagger={0.1}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6"
        >
          {proceso.map((etapa) => (
            <div key={etapa.numero} className="border-t border-hairline pt-6">
              <p className="font-display texto-degrade-2 text-h3 font-semibold leading-none">
                {etapa.numero}
              </p>
              <h3 className="text-cuerpo-lg mt-3 font-medium text-hi">{etapa.titulo}</h3>
              <p className="text-cuerpo mt-2 text-mid">{etapa.descripcion}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
