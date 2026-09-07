import TituloSeccion from '@/components/ui/TituloSeccion'
import Hero from '@/components/home/Hero'
import QueHacemos from '@/components/home/QueHacemos'
import Servicios from '@/components/home/Servicios'
import Proceso from '@/components/home/Proceso'
import Stack from '@/components/home/Stack'

/** Home.
 *
 *  Hero y secciones de contenido terminados (Fases 4 y 5). Ejemplos y
 *  contacto quedan como contenedores con sus anclas para que la
 *  navegación funcione mientras se construyen.
 */

const PENDIENTES = [
  { id: 'ejemplos', titulo: 'Ejemplos', nota: 'Fase 6' },
  { id: 'contacto', titulo: 'Contacto', nota: 'Fase 7' },
]

export default function Home() {
  return (
    <>
      <Hero />
      <QueHacemos />
      <Servicios />
      <Proceso />

      {/* Ejemplos va entre Proceso y Stack según el orden del header. */}
      <section
        id={PENDIENTES[0]!.id}
        className="seccion relative scroll-mt-24 border-t border-hairline"
      >
        <div className="contenedor">
          <TituloSeccion>{PENDIENTES[0]!.titulo}</TituloSeccion>
          <p className="text-label mt-4 text-low">{PENDIENTES[0]!.nota}</p>
        </div>
      </section>

      <Stack />

      <section
        id={PENDIENTES[1]!.id}
        className="seccion relative scroll-mt-24 border-t border-hairline"
      >
        <div className="contenedor">
          <TituloSeccion>{PENDIENTES[1]!.titulo}</TituloSeccion>
          <p className="text-label mt-4 text-low">{PENDIENTES[1]!.nota}</p>
        </div>
      </section>
    </>
  )
}
