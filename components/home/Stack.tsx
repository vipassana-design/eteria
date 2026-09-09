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
                // En hover el borde se marca más y aparece un glow del
                // color del acento alrededor de la celda. El glow va en
                // `style` porque `color-mix()` lleva espacios y los
                // guiones bajos de una clase arbitraria rompen la función.
                className="group flex aspect-4/3 flex-col items-center justify-center gap-4 rounded-(--radius-card) border border-hairline transition-[border-color,box-shadow] duration-500 ease-(--ease-suave) hover:border-(--borde-stack-hover) hover:shadow-(--sombra-stack-hover)"
                style={
                  {
                    '--borde-stack-hover':
                      'color-mix(in srgb, var(--color-violet-500) 45%, transparent)',
                    '--sombra-stack-hover':
                      '0 0 0 1px color-mix(in srgb, var(--color-violet-500) 20%, transparent), 0 10px 40px -10px color-mix(in srgb, var(--color-violet-500) 42%, transparent)',
                  } as React.CSSProperties
                }
              >
                {/* El logo hereda el color: en reposo va en --text-low y
                    en hover pasa al azul del acento.

                    Antes iba al color propio de cada marca, pero con
                    cinco colores distintos la fila perdía unidad y el
                    verde de Node y el celeste de React competían con el
                    acento del sitio. */}
                <span className="text-low transition-colors duration-500 ease-(--ease-suave) group-hover:text-violet-500">
                  <Logo />
                </span>

                {/* El nombre está siempre visible en gris claro; en hover
                    sube a --text-hi. */}
                <span className="text-cuerpo font-medium text-mid transition-colors duration-500 ease-(--ease-suave) group-hover:text-hi">
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
