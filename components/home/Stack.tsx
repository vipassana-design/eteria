import Reveal from '@/components/ui/Reveal'
import TituloSeccion from '@/components/ui/TituloSeccion'
import { seccionStack, stack } from '@/content/stack'
import { LOGOS } from './LogosStack'

/** Sección "Stack" (PLAN.md §4.7).
 *
 *  Grid estático con hover: el borde pasa a --border-hover, el logo de
 *  monocromo a su color de marca, y aparece el nombre debajo.
 *
 *  Cinco celdas: 5 columnas en desktop y 2 en mobile, así la quinta
 *  queda sola en la última fila alineada a la izquierda, como el resto
 *  del sitio.
 */
export default function Stack() {
  return (
    <section id="stack" className="seccion relative scroll-mt-24">
      <div className="contenedor">
        <TituloSeccion degrade={seccionStack.tituloDegrade} bajada={seccionStack.bajada}>
          {seccionStack.titulo}
        </TituloSeccion>

        <Reveal
          variante="escala"
          stagger={0.07}
          className="mt-14 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-5"
        >
          {stack.map((t) => {
            const Logo = LOGOS[t.id]

            return (
              <div
                key={t.id}
                className="group flex aspect-4/3 flex-col items-center justify-center gap-3 rounded-(--radius-card) border border-hairline transition-colors duration-500 ease-(--ease-suave) hover:border-hairline-hover"
              >
                {/* El logo hereda el color: en reposo va en --text-low y
                    en hover pasa al color de marca. */}
                <span
                  className="text-low transition-colors duration-500 ease-(--ease-suave)"
                  style={{ '--color-marca': t.color } as React.CSSProperties}
                >
                  <span className="block group-hover:text-(--color-marca)">
                    <Logo />
                  </span>
                </span>

                {/* El nombre aparece en hover. Ocupa su lugar siempre
                    para que la celda no cambie de alto. */}
                <span className="text-label text-transparent transition-colors duration-500 ease-(--ease-suave) group-hover:text-mid">
                  {t.nombre}
                </span>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
