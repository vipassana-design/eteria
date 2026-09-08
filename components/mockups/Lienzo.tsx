/** Base compartida de los mockups mejorados (PLAN.md §14).
 *
 *  Misma caja de 720×460 que las pantallas originales, para que el
 *  ciclo del hero no cambie de tamaño entre etapas.
 *
 *  Sobre las fotos: van como `<image>` dentro del SVG y no como `<img>`
 *  aparte. Así siguen formando parte del grupo `data-parte` que anima
 *  el timeline, y se recortan con `clipPath` sin envoltorios extra.
 *  `preserveAspectRatio="xMidYMid slice"` es el equivalente de
 *  `object-fit: cover`: llena el slot sin deformar la foto.
 */

/** Paleta clara compartida. Es la de las pantallas originales. */
export const PAPEL = '#F7F6FB'
export const TINTA = '#1B1733'
export const TENUE = '#8E88A8'
export const LINEA = '#E8E5F0'

/** Sombras y viñetas reutilizables.
 *
 *  Las sombras son lo que más separa un mockup plano de una captura:
 *  una card sin sombra se lee como rectángulo, con sombra se lee como
 *  superficie. Se declaran una vez por pantalla y se referencian. */
export function DefsComunes() {
  return (
    <defs>
      {/* Sombra suave de card. Dos capas: una cercana que define el
          borde y una difusa que da la profundidad. */}
      <filter id="sombraCard" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#1B1733" floodOpacity="0.06" />
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#1B1733" floodOpacity="0.07" />
      </filter>

      {/* Sombra más marcada, para elementos flotantes (toasts, popovers). */}
      <filter id="sombraFlotante" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1B1733" floodOpacity="0.08" />
        <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#1B1733" floodOpacity="0.13" />
      </filter>

      {/* Degradé oscuro al pie de una foto, para que el texto encima se
          lea sin depender del contenido de la imagen. */}
      <linearGradient id="veloFoto" x1="0" y1="0" x2="0" y2="1">
        <stop offset="40%" stopColor="#1B1733" stopOpacity="0" />
        <stop offset="100%" stopColor="#0F0C1F" stopOpacity="0.78" />
      </linearGradient>
    </defs>
  )
}

export function Lienzo({ children, fondo = PAPEL }: { children: React.ReactNode; fondo?: string }) {
  return (
    <svg viewBox="0 0 720 460" className="size-full" aria-hidden="true">
      <rect width={720} height={460} fill={fondo} />
      <DefsComunes />
      {children}
    </svg>
  )
}

/** Foto recortada a un rectángulo con esquinas redondeadas.
 *
 *  `clipPath` con un id propio por slot: compartir uno haría que todas
 *  las fotos se recortaran con la misma caja. */
export function Foto({
  id, href, x, y, w, h, rx = 8, opacidad = 1,
}: {
  id: string; href: string; x: number; y: number; w: number; h: number
  rx?: number; opacidad?: number
}) {
  return (
    <>
      <defs>
        <clipPath id={id}>
          <rect x={x} y={y} width={w} height={h} rx={rx} />
        </clipPath>
      </defs>
      <image
        href={href}
        x={x}
        y={y}
        width={w}
        height={h}
        clipPath={`url(#${id})`}
        preserveAspectRatio="xMidYMid slice"
        opacity={opacidad}
      />
    </>
  )
}
