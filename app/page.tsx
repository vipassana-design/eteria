import TituloSeccion from '@/components/ui/TituloSeccion'
import Glow from '@/components/bg/Glow'

/** Home.
 *
 *  Las secciones reales se construyen desde la Fase 4. Por ahora quedan
 *  los contenedores con sus anclas, para que la navegación del header y
 *  del menú mobile se pueda probar de punta a punta.
 */

const SECCIONES = [
  { id: 'hero', titulo: 'Hero', nota: 'Fase 4' },
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
      <section className="relative flex min-h-svh items-center">
        <Glow className="-right-32 top-10" tamano={760} />
        <div className="contenedor">
          <h1 className="text-hero font-semibold">
            <span className="texto-degrade inline-block">Eteria</span>
          </h1>
          <p className="text-cuerpo-lg medida mt-6 text-mid">
            Estructura del sitio en construcción. El chrome (header, menú, footer, WhatsApp y
            capas de fondo) está terminado; las secciones llegan a partir de la Fase 4.
          </p>
          <p className="text-label mt-8 text-low">
            Design system en{' '}
            <a className="text-violet-300 underline" href="/design-system">
              /design-system
            </a>
          </p>
        </div>
      </section>

      {SECCIONES.slice(1).map((s) => (
        <section key={s.id} id={s.id} className="seccion relative scroll-mt-24 border-t border-hairline">
          <div className="contenedor">
            <TituloSeccion>{s.titulo}</TituloSeccion>
            <p className="text-label mt-4 text-low">{s.nota}</p>
          </div>
        </section>
      ))}
    </>
  )
}
