import type { EtapaProceso } from '@/types'

/** Ilustraciones de las etapas del proceso (PLAN.md §4.5).
 *
 *  SVG inline con primitivas, trazo en --border-hover y sin relleno.
 *  Coherentes entre sí: mismo grosor de trazo (1.5) y misma caja de
 *  100×56.
 */

const CAJA = '0 0 100 56'

function Base({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={CAJA}
      // El color lo controla GSAP desde el encendido de la etapa, no
      // un `group-hover`: las etapas se iluminan solas con el scroll,
      // así que depender del mouse dejaba la ilustración apagada
      // mientras el punto y el texto ya estaban encendidos.
      data-icono
      className="h-16 w-28 text-hairline-hover"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

/** 01 Relevamiento — documento con líneas. */
function Documento() {
  return (
    <Base>
      <path d="M22 4h34l12 12v36H22V4Z" />
      <path d="M56 4v12h12" />
      <path d="M30 26h30M30 34h30M30 42h18" />
    </Base>
  )
}

/** 02 Diseño — wireframe de bloques. */
function Wireframe() {
  return (
    <Base>
      <rect x={14} y={6} width={72} height={44} rx={3} />
      <path d="M14 16h72" />
      <rect x={21} y={23} width={20} height={20} rx={2} />
      <path d="M48 25h31M48 32h31M48 39h20" />
    </Base>
  )
}

/** 03 Desarrollo — ventana con etiqueta de código. */
function Codigo() {
  return (
    <Base>
      <rect x={14} y={6} width={72} height={44} rx={3} />
      <path d="M14 16h72" />
      <circle cx={21} cy={11} r={1.4} />
      <circle cx={27} cy={11} r={1.4} />
      <path d="m42 25-8 8 8 8M58 25l8 8-8 8M52 23l-4 20" />
    </Base>
  )
}

/** 04 Entrega — check dentro de un círculo. */
function Check() {
  return (
    <Base>
      <circle cx={50} cy={28} r={20} />
      <path d="m40 28 7 7 14-14" />
    </Base>
  )
}

export const ILUSTRACIONES: Record<EtapaProceso['ilustracion'], () => React.JSX.Element> = {
  documento: Documento,
  wireframe: Wireframe,
  codigo: Codigo,
  check: Check,
}
