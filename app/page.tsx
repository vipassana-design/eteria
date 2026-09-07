import TituloSeccion from '@/components/ui/TituloSeccion'
import Hero from '@/components/home/Hero'

/** Home.
 *
 *  El hero está terminado (Fase 4). El resto de las secciones son
 *  contenedores con sus anclas, para que la navegación funcione de punta
 *  a punta mientras se construyen.
 */

const PENDIENTES = [
  { id: 'que-hacemos', titulo: 'Qué hacemos', nota: 'Fase 5' },
  { id: 'servicios', titulo: 'Servicios', nota: 'Fase 5' },
  { id: 'proceso', titulo: 'Proceso', nota: 'Fase 5' },
  { id: 'ejemplos', titulo: 'Ejemplos', nota: 'Fase 6' },
  { id: 'stack', titulo: 'Stack', nota: 'Fase 5' },
  { id: 'contacto', titulo: 'Contacto', nota: 'Fase 7' },
]

export default function Home() {
  return (
    <>
      <Hero />

      {PENDIENTES.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="seccion relative scroll-mt-24 border-t border-hairline"
        >
          <div className="contenedor">
            <TituloSeccion>{s.titulo}</TituloSeccion>
            <p className="text-label mt-4 text-low">{s.nota}</p>
          </div>
        </section>
      ))}
    </>
  )
}
