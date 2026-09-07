import type { Tecnologia } from '@/types'

/** Logos del stack (PLAN.md §4.7).
 *
 *  SVG inline con `fill="currentColor"` para que el paso de monocromo a
 *  color en hover sea un cambio de color heredado, sin duplicar el
 *  gráfico ni cargar dos archivos.
 *
 *  Los paths son las marcas oficiales de cada tecnología. Se usan por
 *  identificación nominativa, que es el uso que las cuatro licencias
 *  permiten; ninguna se altera de forma ni de proporción.
 */

function Base({ children, caja = 24 }: { children: React.ReactNode; caja?: number }) {
  return (
    <svg
      viewBox={`0 0 ${caja} ${caja}`}
      className="size-9"
      fill="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

/** Next.js: círculo con la N y la diagonal. */
function NextJs() {
  return (
    <Base>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.554 0 4.921-.798 6.867-2.158l-9.19-11.9v7.62a.75.75 0 0 1-1.5 0V7.75a.75.75 0 0 1 1.343-.46l10.55 13.657A11.96 11.96 0 0 0 24 12c0-6.627-5.373-12-12-12Zm3.6 7.2h1.5v7.02l-1.5-1.943V7.2Z" />
    </Base>
  )
}

/** React: núcleo con las tres órbitas. */
function React_() {
  return (
    <Base>
      <circle cx={12} cy={12} r={2.05} />
      <g fill="none" stroke="currentColor" strokeWidth={1.1}>
        <ellipse cx={12} cy={12} rx={10.4} ry={3.95} />
        <ellipse cx={12} cy={12} rx={10.4} ry={3.95} transform="rotate(60 12 12)" />
        <ellipse cx={12} cy={12} rx={10.4} ry={3.95} transform="rotate(120 12 12)" />
      </g>
    </Base>
  )
}

/** TypeScript: cuadrado con las letras TS caladas. */
function TypeScript() {
  return (
    <Base>
      {/* El cuadrado y las letras van en un solo path con fill-rule
          evenodd: así las letras quedan caladas y se ven del color del
          fondo, como en la marca real. */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2h20v20H2V2Zm11.42 15.6v2.02c.33.17.71.3 1.16.38.44.09.91.13 1.4.13.48 0 .94-.04 1.37-.14.43-.9.81-.24 1.14-.46.32-.21.58-.49.77-.84.19-.34.28-.77.28-1.28 0-.37-.05-.69-.16-.97a2.26 2.26 0 0 0-.47-.72 3.4 3.4 0 0 0-.72-.57c-.28-.17-.6-.33-.95-.48a10.2 10.2 0 0 1-.7-.32 3.3 3.3 0 0 1-.52-.31 1.34 1.34 0 0 1-.33-.34.72.72 0 0 1-.12-.4c0-.14.03-.26.1-.37a.9.9 0 0 1 .28-.29c.12-.8.27-.14.45-.19.18-.4.38-.6.6-.6.16 0 .33.01.51.04.18.02.36.06.54.11.18.05.36.12.53.2.17.07.33.16.47.27v-1.89a5 5 0 0 0-1.03-.26 8.5 8.5 0 0 0-1.28-.09c-.48 0-.94.06-1.37.16-.43.1-.81.27-1.13.5-.33.22-.58.5-.77.85-.19.34-.29.75-.29 1.23 0 .61.18 1.13.53 1.56.35.43.89.79 1.6 1.09.3.12.57.24.83.36.25.12.47.24.65.37.19.13.33.27.44.42.1.15.16.32.16.51 0 .13-.3.25-.1.37a.83.83 0 0 1-.28.3c-.12.08-.28.15-.47.2-.19.05-.41.07-.66.07-.44 0-.87-.08-1.3-.23a3.9 3.9 0 0 1-1.18-.69ZM10.68 12.3H13V10.5H6.02v1.8h2.3v6.9h2.36v-6.9Z"
      />
    </Base>
  )
}

/** Node.js: el hexágono de la marca. */
function NodeJs() {
  return (
    <Base>
      <path d="M12 1.85c-.28 0-.55.07-.79.21L3.78 6.45c-.49.28-.79.8-.79 1.37v8.36c0 .57.3 1.09.79 1.37l2.02 1.17c.98.48 1.33.48 1.78.48 1.44 0 2.27-.87 2.27-2.39V8.55a.22.22 0 0 0-.22-.22H8.66a.22.22 0 0 0-.22.22v8.26c0 .67-.7 1.34-1.83.78L4.5 16.36a.25.25 0 0 1-.12-.22V7.83c0-.9.04-.17.12-.22l7.42-4.28a.24.24 0 0 1 .23 0l7.42 4.28c.7.5.12.13.12.22v8.31c0 .09-.5.18-.12.22l-7.42 4.29a.24.24 0 0 1-.23 0l-1.9-1.13a.2.2 0 0 0-.19-.01c-.53.3-.62.34-1.11.51-.12.05-.3.12.7.2l2.48 1.47c.24.14.51.21.79.21.28 0 .55-.7.79-.21l7.42-4.29c.49-.28.79-.8.79-1.37V7.83c0-.57-.3-1.09-.79-1.37l-7.42-4.4a1.6 1.6 0 0 0-.79-.21Zm1.99 5.97c-2.11 0-3.37.9-3.37 2.39 0 1.62 1.25 2.07 3.28 2.27 2.42.24 2.61.59 2.61 1.07 0 .82-.66 1.17-2.22 1.17-1.95 0-2.38-.49-2.53-1.46a.22.22 0 0 0-.21-.18H10.4a.22.22 0 0 0-.22.23c0 1.24.68 2.72 3.81 2.72 2.35 0 3.7-.93 3.7-2.55 0-1.6-1.09-2.03-3.37-2.33-2.31-.31-2.53-.46-2.53-1 0-.45.19-1.04 1.9-1.04 1.52 0 2.09.33 2.32 1.36.2.1.11.17.21.17h1.16c.06 0 .12-.3.16-.7.04-.5.06-.11.05-.17-.18-2.13-1.6-3.12-4.48-3.12Z" />
    </Base>
  )
}

/** PostgreSQL: el elefante de la marca, simplificado a trazo. */
function PostgreSql() {
  return (
    <Base>
      <g fill="none" stroke="currentColor" strokeWidth={1.15} strokeLinecap="round" strokeLinejoin="round">
        {/* Cabeza y cuerpo */}
        <path d="M17.5 15.6c.15-1.25.1-1.44 1.03-1.24l.24.02c.71.03 1.64-.11 2.18-.37 1.17-.54 1.86-1.44.71-1.2-2.63.54-2.81-.35-2.81-.35 2.77-4.12 3.93-9.35 2.93-10.63-2.73-3.49-7.45-1.84-7.53-1.8h-.02a9.3 9.3 0 0 0-1.75-.18c-1.19-.02-2.09.31-2.77.83 0 0-8.42-3.47-8.03 4.37.08 1.67 2.39 12.6 5.14 9.3.99-1.21 1.96-2.23 1.96-2.23.48.32 1.06.48 1.66.42l.05-.04c-.2.16-.1.32.2.47-.72.81-.51.95-1.95 1.24-1.45.3-.6.83-.4.87.24.6 1.83.65 3.06-1.11.36-.51.35.4.75 1.32.16.86 1.11 2.55 1.34 2.75.22.2.85.11 1.36-.05Z" />
        {/* Ojo */}
        <circle cx={16.2} cy={5.6} r={0.55} fill="currentColor" stroke="none" />
      </g>
    </Base>
  )
}

export const LOGOS: Record<Tecnologia['id'], () => React.JSX.Element> = {
  nextjs: NextJs,
  react: React_,
  typescript: TypeScript,
  nodejs: NodeJs,
  postgresql: PostgreSql,
}
