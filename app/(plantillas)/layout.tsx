import type { Metadata } from 'next'
import MarcaBody from '@/components/plantillas/MarcaBody'
import './plantillas.css'

/** Layout de las plantillas de muestra (PLAN.md §16).
 *
 *  Las plantillas son sitios ajenos que se abren dentro de un iframe
 *  desde el modal de "Soluciones digitales". El iframe las carga como
 *  documento top-level, así que este layout controla todo lo que se ve
 *  —pero **hereda el root layout**, porque `app/layout.tsx` ya existe y
 *  un layout dentro de un route group es anidado, no hermano.
 *
 *  La alternativa ortodoxa era mover las 23 páginas del sitio a
 *  `app/(sitio)/` para que este fuera un root layout de verdad. Se
 *  descartó: `PageTransition` intercepta clicks y hace
 *  `ScrollTrigger.refresh()` sobre `usePathname`, y no vale arriesgar
 *  las transiciones de página del sitio entero por una sección.
 *
 *  En su lugar, este layout **neutraliza lo que hereda**:
 *
 *  - `plantillas.css` corta las propiedades heredables y el
 *    `color-scheme` sobre `.raiz-plantilla`.
 *  - `MarcaBody` esconde el cromo del sitio —header, footer, el FAB y
 *    las capas de fondo— que el root renderiza igual.
 */
export const metadata: Metadata = {
  // Las plantillas no son contenido a indexar: son material de
  // demostración. Mismo criterio que /heros, /fondos y /mockups.
  robots: { index: false, follow: false },
}

export default function LayoutPlantillas({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MarcaBody />
      <div className="raiz-plantilla">{children}</div>
    </>
  )
}
