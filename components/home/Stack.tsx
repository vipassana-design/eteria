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
                // En hover el borde se marca más y aparece un glow
                // violeta alrededor de la celda.
                className="group flex aspect-4/3 flex-col items-center justify-center gap-3 rounded-(--radius-card) border border-hairline transition-[border-color,box-shadow] duration-500 ease-(--ease-suave) hover:border-violet-500/45 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.18),0_10px_40px_-10px_rgba(139,92,246,0.4)]"
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

                {/* El nombre está siempre visible en gris claro; en hover
                    sube a --text-hi. */}
                <span className="text-label text-mid transition-colors duration-500 ease-(--ease-suave) group-hover:text-hi">
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
