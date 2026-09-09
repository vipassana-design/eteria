'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { flota } from '@/content/plantillas/flota'

/** El mapa esquemático, dibujado en SVG.
 *
 *  **Por qué no es un mapa real.** Un mapa de verdad necesita un
 *  proveedor de tiles, una clave de API y una librería —Leaflet o
 *  MapLibre, 150 a 250 KB—, y las tres cosas están fuera de alcance:
 *  cero dependencias nuevas, y una demostración no puede depender de un
 *  servicio ajeno que puede caerse el día que el cliente la muestre. Un
 *  esquema de calles con toponimia comunica lo mismo —que el producto
 *  ubica una flota en el territorio— y pesa lo que pesa el SVG.
 *
 *  Lo que lo hace leerse como mapa y no como diagrama son cuatro cosas:
 *  las calles tienen jerarquía (avenidas anchas, secundarias finas),
 *  hay una grilla de fondo tenue, los cruces tienen nombre y las
 *  avenidas van rotuladas sobre la traza, con el ángulo de la calle.
 *
 *  **La interacción.** Click en un vehículo lo resalta: el punto crece,
 *  toma un anillo de acento y un glow, y el resto baja a opacidad
 *  media. El estado es el mismo que usa la lista lateral, así que
 *  seleccionar de un lado marca en el otro. Es click y no hover a
 *  propósito: con `prefers-reduced-motion` las transiciones CSS están
 *  anuladas y en touch no hay hover, así que el hover no puede ser la
 *  vía de acceso (restricción de la Etapa 0).
 *
 *  El halo pulsante va solo en los vehículos con incidencia: si latiera
 *  en los ocho, el pulso dejaría de significar algo. Con
 *  `prefers-reduced-motion` queda un anillo fijo.
 */
interface Props {
  elegido: string | null
  alElegir: (id: string | null) => void
}

/** El viewBox del esquema. Las coordenadas de los vehículos en
 *  `content/plantillas/flota.ts` están en este sistema. */
const A = 940

/** El alto en el que están dibujadas las calles, las manzanas y las
 *  coordenadas de los vehículos del contenido. */
const AL_TRAZA = 460

/** El alto del viewBox. Está elegido para acercarse a la proporción del
 *  contenedor en desktop (~4:3): con el viewBox apaisado de la traza
 *  —940×460— y `preserveAspectRatio="meet"`, el esquema entraba completo
 *  pero dejaba dos franjas muertas de más de 100px arriba y abajo, y el
 *  mapa quedaba flotando en el medio de la card.
 *
 *  El dibujo no se rehace con las coordenadas nuevas: se estira en Y con
 *  un `transform` sobre el grupo que lo contiene. Así las coordenadas del
 *  contenido siguen siendo la única fuente de verdad —los vehículos y
 *  los cruces se ubican en el mismo sistema que las calles— y cambiar la
 *  proporción de la card es tocar una constante y nada más. */
const AL = 660
const ESCALA_Y = AL / AL_TRAZA

export default function Mapa({ elegido, alElegir }: Props) {
  const raiz = useRef<HTMLDivElement>(null)
  const { mapa, lista } = flota

  /** Lleva una `y` del sistema de la traza (940×460) al del viewBox.
   *
   *  Los vehículos, los cruces y las etiquetas se ubican con esto en vez
   *  de ir dentro del grupo estirado: un `scale` en Y sobre un círculo
   *  lo vuelve un óvalo y sobre el texto lo estira. Escalar solo la
   *  posición los deja en su lugar sin deformarlos. */
  const y = (v: number) => v * ESCALA_Y

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: el halo queda como anillo fijo. La incidencia
      // se sigue viendo —color y anillo—, solo no late.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-halo]', { opacity: 0.45, scale: 1.6, transformOrigin: 'center' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tw = gsap.fromTo(
          '[data-halo]',
          { opacity: 0.55, scale: 0.9 },
          {
            opacity: 0,
            scale: 2.6,
            duration: 1.9,
            repeat: -1,
            ease: 'sine.out',
            transformOrigin: 'center',
            stagger: 0.5,
          },
        )
        return () => tw.kill()
      })
    },
    { scope: raiz },
  )

  return (
    <section
      ref={raiz}
      style={{ background: 'var(--superficie)', borderColor: 'var(--borde)' }}
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border"
    >
      {/* La cabecera del mapa: zona y referencia de estados. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-wrap items-start justify-between gap-2 p-3">
        <span
          style={{
            background: 'rgba(10, 15, 26, 0.78)',
            borderColor: 'var(--borde)',
            color: 'var(--texto-medio)',
          }}
          className="rounded-lg border px-2.5 py-1.5 text-[10.5px] backdrop-blur-sm"
        >
          {mapa.zona}
        </span>

        {/* La referencia. Es lo que hace que los colores del mapa
            signifiquen algo sin tener que tocar nada. */}
        <div
          style={{
            background: 'rgba(10, 15, 26, 0.78)',
            borderColor: 'var(--borde)',
          }}
          className="rounded-lg border px-2.5 py-1.5 backdrop-blur-sm"
        >
          {/* El título de la referencia solo en desktop: en mobile los
              cuatro colores con su nombre ya se explican, y la línea de
              arriba le comía alto al mapa. */}
          <p
            style={{ color: 'var(--texto-tenue)', letterSpacing: '0.06em' }}
            className="mb-1 hidden text-[8.5px] font-semibold uppercase lg:block"
          >
            {mapa.referencia}
          </p>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-1">
            {Object.entries(lista.estados).map(([id, e]) => (
              <li
                key={id}
                style={{ color: 'var(--texto-medio)' }}
                className="flex items-center gap-1.5 text-[9.5px]"
              >
                <span
                  style={{ background: e.color }}
                  className="size-1.5 shrink-0 rounded-full"
                />
                {e.t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${A} ${AL}`}
        // Ni `none` ni `slice`. `none` estira y delata el mapa al
        // instante —las calles quedan con ángulos imposibles—, y
        // `slice` recorta por los costados: medido, "Planta Morón"
        // salía cortada al medio a 1440px. Con `meet` el esquema entra
        // completo, y el viewBox ya está en la proporción de la card,
        // así que no quedan franjas muertas.
        preserveAspectRatio="xMidYMid meet"
        // En mobile el mapa necesita alto propio: es la pieza principal
        // de la plantilla y con 260px la referencia le tapaba media
        // superficie. En desktop toma el alto de la card.
        className="h-[340px] w-full flex-1 lg:h-full"
        role="img"
        aria-label={`Mapa esquemático de ${mapa.zona} con ${lista.vehiculos.length} vehículos`}
      >
        <defs>
          {/* La grilla de fondo: es lo que da la textura de mapa. */}
          <pattern id="grilla-flota" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M40 0H0v40"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width={A} height={AL} fill="#0C1220" />
        <rect width={A} height={AL} fill="url(#grilla-flota)" />

        {/* La traza —manzanas, calles y avenidas— está dibujada en un
            sistema de 940×460 y se estira en Y hasta el alto del
            viewBox. Solo la traza: los vehículos y las etiquetas se
            posicionan aparte, porque estirarlos deformaría los círculos
            y la tipografía. */}
        <g transform={`scale(1 ${ESCALA_Y})`}>
        {/* Las manzanas: rectángulos apenas más claros que el fondo.
            Sin ellas el esquema es solo líneas cruzadas. */}
        <g fill="rgba(255,255,255,0.045)">
          <rect x="60" y="40" width="180" height="120" rx="4" />
          <rect x="270" y="36" width="150" height="86" rx="4" />
          <rect x="450" y="44" width="200" height="110" rx="4" />
          <rect x="680" y="40" width="200" height="130" rx="4" />
          <rect x="52" y="196" width="150" height="150" rx="4" />
          <rect x="240" y="210" width="170" height="120" rx="4" />
          <rect x="440" y="250" width="150" height="140" rx="4" />
          <rect x="630" y="200" width="170" height="100" rx="4" />
          <rect x="700" y="340" width="180" height="86" rx="4" />
          <rect x="120" y="378" width="220" height="60" rx="4" />
        </g>

        {/* Las calles secundarias: finas y en gris. */}
        <g
          stroke="rgba(148, 163, 195, 0.26)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M40 176h880" />
          <path d="M40 356h880" />
          <path d="M250 20v420" />
          <path d="M430 20v420" />
          <path d="M660 20v420" />
          <path d="M120 20v420" />
          <path d="M820 20v420" />
        </g>

        {/* Las avenidas: anchas, con un halo para que se lean como vía
            principal y no como una secundaria más gruesa. */}
        <g fill="none" strokeLinecap="round">
          <path
            d="M30 250 Q 250 210 470 214 T 910 150"
            stroke="rgba(124, 107, 245, 0.18)"
            strokeWidth="16"
          />
          <path
            d="M30 250 Q 250 210 470 214 T 910 150"
            stroke="rgba(163, 178, 210, 0.5)"
            strokeWidth="6"
          />
          <path
            d="M140 430 Q 380 350 600 300 T 920 300"
            stroke="rgba(124, 107, 245, 0.18)"
            strokeWidth="16"
          />
          <path
            d="M140 430 Q 380 350 600 300 T 920 300"
            stroke="rgba(163, 178, 210, 0.5)"
            strokeWidth="6"
          />
          {/* Las vías del tren: la línea de guiones cruzada es la marca
              que hace que un esquema se lea como mapa del oeste del
              conurbano. */}
          <path
            d="M60 110 L 900 88"
            stroke="rgba(148, 163, 195, 0.22)"
            strokeWidth="3"
            strokeDasharray="10 7"
          />
        </g>
        </g>

        {/* Los nombres de las avenidas, sobre la traza y con su
            inclinación. La `y` se escala a mano —no van dentro del
            grupo estirado— porque un `scale` en Y sobre texto lo
            deforma verticalmente. */}
        {mapa.avenidas.map((a) => (
          <text
            key={a.t}
            x={a.x}
            y={y(a.y)}
            transform={`rotate(${a.rot} ${a.x} ${y(a.y)})`}
            fill="rgba(148, 163, 195, 0.55)"
            style={{ fontSize: '11px', letterSpacing: '0.06em' }}
          >
            {a.t}
          </text>
        ))}

        {/* Los cruces y la planta. La planta lleva un cuadrado de
            acento; los demás, un punto hueco. */}
        {mapa.puntos.map((p) => (
          <g key={p.t}>
            {p.base ? (
              <rect
                x={p.x - 5}
                y={y(p.y) - 5}
                width="10"
                height="10"
                rx="2"
                fill="var(--acento)"
                opacity="0.9"
              />
            ) : (
              <circle
                cx={p.x}
                cy={y(p.y)}
                r="3.5"
                fill="#0C1220"
                stroke="rgba(148, 163, 195, 0.5)"
                strokeWidth="1.5"
              />
            )}
            <text
              x={p.x + 10}
              y={y(p.y) + 4}
              fill={p.base ? 'rgba(181, 170, 255, 0.9)' : 'rgba(148, 163, 195, 0.75)'}
              style={{ fontSize: '11px', fontWeight: p.base ? 600 : 400 }}
            >
              {p.t}
            </text>
          </g>
        ))}

        {/* Los vehículos. Van al final para quedar arriba de todo. */}
        {lista.vehiculos.map((v) => {
          const est = lista.estados[v.estado]
          const activo = elegido === v.id
          // Cuando hay uno elegido, el resto baja: es lo que hace que
          // el resaltado se note en un mapa con ocho puntos.
          const apagado = elegido !== null && !activo
          // La posición ya llevada al sistema del viewBox. Se calcula
          // una vez y se usa en el halo, el anillo, el punto, la flecha
          // del rumbo y la etiqueta de la patente.
          const vy = y(v.y)

          return (
            <g
              key={v.id}
              onClick={() => alElegir(activo ? null : v.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  alElegir(activo ? null : v.id)
                }
              }}
              aria-label={`${v.patente}, ${v.chofer}, ${est.t}, destino ${v.destino}`}
              aria-pressed={activo}
              style={{
                cursor: 'pointer',
                opacity: apagado ? 0.34 : 1,
                transition: 'opacity 250ms ease',
              }}
            >
              {/* El halo pulsante, solo en incidencias. */}
              {v.estado === 'incidencia' ? (
                <circle
                  data-halo
                  cx={v.x}
                  cy={vy}
                  r="11"
                  fill="none"
                  stroke={est.color}
                  strokeWidth="2"
                />
              ) : null}

              {/* El anillo del elegido, con glow. */}
              {activo ? (
                <circle
                  cx={v.x}
                  cy={vy}
                  r="16"
                  fill="rgba(124, 107, 245, 0.14)"
                  stroke="var(--acento)"
                  strokeWidth="1.75"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(124,107,245,0.75))' }}
                />
              ) : null}

              {/* El punto del vehículo: un triángulo orientado al
                  rumbo, no un círculo. Un círculo no dice para dónde
                  va, y en un panel de flota el rumbo es dato. */}
              <circle
                cx={v.x}
                cy={vy}
                r={activo ? 8 : 7}
                fill={est.color}
                stroke="#0C1220"
                strokeWidth="2"
                style={{
                  filter: activo
                    ? `drop-shadow(0 0 7px ${est.color})`
                    : `drop-shadow(0 0 3px ${est.color}88)`,
                }}
              />
              <path
                d="M0 -3.4 L 2.6 2.2 L 0 1 L -2.6 2.2 Z"
                fill="#0C1220"
                transform={`translate(${v.x} ${vy}) rotate(${v.rumbo})`}
                opacity="0.85"
              />

              {/* La patente del elegido, en una etiqueta. Solo del
                  elegido: ocho etiquetas a la vez tapan el mapa. */}
              {activo ? (
                <g transform={`translate(${v.x} ${vy - 26})`}>
                  <rect
                    x="-44"
                    y="-13"
                    width="88"
                    height="22"
                    rx="6"
                    fill="rgba(10, 15, 26, 0.92)"
                    stroke="var(--acento)"
                    strokeWidth="1"
                  />
                  <text
                    textAnchor="middle"
                    y="3"
                    fill="var(--texto)"
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {v.patente}
                  </text>
                </g>
              ) : null}
            </g>
          )
        })}
      </svg>
    </section>
  )
}
