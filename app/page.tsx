import TituloSeccion from '@/components/ui/TituloSeccion'
import Hero from '@/components/home/Hero'
import QueHacemos from '@/components/home/QueHacemos'
import Servicios from '@/components/home/Servicios'
import Proceso from '@/components/home/Proceso'
import Ejemplos from '@/components/home/Ejemplos'
import Stack from '@/components/home/Stack'

/** Home.
 *
 *  Terminadas las secciones hasta ejemplos (Fases 4 a 6). Contacto
 *  queda como contenedor con su ancla para que la navegación funcione
 *  mientras se construye.
 */

const PENDIENTES = [{ id: 'contacto', titulo: 'Contacto', nota: 'Fase 7' }]

export default function Home() {
  return (
    <>
      <Hero />
      <QueHacemos />
      <Servicios />
      <Proceso />

      <Ejemplos />
      <Stack />

      <section
        id={PENDIENTES[0]!.id}
        className="seccion relative scroll-mt-24 border-t border-hairline"
      >
        <div className="contenedor">
          <TituloSeccion>{PENDIENTES[0]!.titulo}</TituloSeccion>
          <p className="text-label mt-4 text-low">{PENDIENTES[0]!.nota}</p>
        </div>
      </section>
    </>
  )
}
