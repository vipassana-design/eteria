import { legajos } from '@/content/plantillas/legajos'
import Superior from './partes/Superior'
import Resumen from './partes/Resumen'
import Personal from './partes/Personal'
import Estructura from './partes/Estructura'
import Calendario from './partes/Calendario'
import Vencimientos from './partes/Vencimientos'
import Pie from './partes/Pie'

/** Legajos — sistema de recursos humanos (PLAN.md §16).
 *
 *  Dotación, licencias y organigrama. De las tres de software a medida
 *  es la única que **scrollea**, y eso es lo que la separa de las otras
 *  dos: los paneles de gestión y de flota son tableros de monitoreo
 *  —todo a la vista, sin scroll de documento—, mientras que un sistema
 *  de RR. HH. es un sistema de registro, con vistas que se recorren una
 *  abajo de la otra. Si las tres fueran one page se leerían como el
 *  mismo producto tres veces.
 *
 *  **El registro es administrativo pero cálido.** El fondo tira a hueso
 *  (`#FAF9F7`) y no a gris frío, y el acento es índigo. Es el rubro de
 *  los tres que más trato con personas tiene: un sistema de personal en
 *  gris azulado se lee como software de los 2000, y era el riesgo más
 *  concreto de esta plantilla.
 *
 *  Los tokens van como variables CSS locales y los colores como hex
 *  literales (`plan.md` §15), igual que las otras ocho.
 *
 *  **No hay fotos.** Las iniciales en círculos de color son lo que usa
 *  cualquier sistema de RR. HH. real cuando el legajo no tiene foto
 *  cargada, y de paso el color por persona hace de identificador
 *  visual entre la tabla, el calendario y los vencimientos: la misma
 *  persona lleva el mismo color en los tres lugares.
 *
 *  **Restricción de la Etapa 0:** con `prefers-reduced-motion` el
 *  `!important` de `globals.css` anula toda `transition` CSS y se
 *  hereda al iframe. Ningún hover es la única vía de acceso a
 *  información: los tramos del calendario llevan el nombre y las fechas
 *  escritos, no en un tooltip.
 */

/** El sistema de la plantilla, en un solo lugar. */
const TOKENS = {
  '--fondo': '#FAF9F7',
  '--superficie': '#FFFFFF',
  '--texto': '#1F2937',
  '--texto-medio': '#57616F',
  '--texto-tenue': '#98A0AC',
  '--linea': '#E8E4DE',
  '--linea-suave': '#F2EFEA',
  '--acento': '#4F46E5',
  '--acento-suave': '#EEF2FF',
  '--sans': "'Segoe UI', Inter, ui-sans-serif, system-ui, sans-serif",
} as React.CSSProperties

export default function Legajos() {
  return (
    <div
      style={{
        ...TOKENS,
        background: 'var(--fondo)',
        color: 'var(--texto)',
        fontFamily: 'var(--sans)',
      }}
      className="min-h-screen antialiased"
    >
      <Superior />

      <main className="mx-auto max-w-[1180px] px-4 py-5 lg:px-6 lg:py-7">
        {/* La cabecera de la vista. */}
        <div className="mb-4 lg:mb-5">
          <h1 className="text-[18px] font-semibold leading-tight lg:text-[21px]">
            {legajos.cabecera.titulo}
          </h1>
          <p
            style={{ color: 'var(--texto-medio)' }}
            className="mt-1 text-[12.5px] lg:text-[13px]"
          >
            {legajos.cabecera.bajada}
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:gap-5">
          <Resumen />
          <Personal />
          <Estructura />
          <Calendario />
          <Vencimientos />
        </div>
      </main>

      <Pie />

      <p className="sr-only">
        {legajos.producto.nombre} es un sistema de demostración. Las
        personas, los legajos y las licencias son ficticios.
      </p>
    </div>
  )
}
