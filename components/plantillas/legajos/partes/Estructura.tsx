import { legajos } from '@/content/plantillas/legajos'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** El organigrama de tres niveles, en SVG.
 *
 *  **Por qué SVG y no divs con líneas.** Un organigrama hecho con divs
 *  necesita las líneas de conexión en `position: absolute` con
 *  coordenadas en píxeles, y eso se rompe al primer cambio de ancho o
 *  de largo de un nombre. Con un `viewBox` la figura escala completa y
 *  las líneas siguen cayendo donde tienen que caer, en cualquier
 *  contenedor.
 *
 *  Los conectores son ortogonales —baja, cruza, baja— y no diagonales:
 *  es la convención de los organigramas, y con diagonales el dibujo se
 *  lee como un grafo de red.
 *
 *  El nivel 3 cuelga de su nivel 2 por el índice `padre`, así que
 *  reordenar áreas en el contenido no rompe las líneas.
 *
 *  En mobile el SVG scrollea horizontalmente dentro de su contenedor:
 *  siete cajas de nivel 3 no se leen a 390px si se comprimen. Desborda
 *  el contenedor, no el documento.
 */
export default function Estructura() {
  const { organigrama } = legajos
  const { raiz, nivel2, nivel3 } = organigrama

  // Medidas de las cajas, en unidades del viewBox.
  const A2 = 176
  const AL2 = 52
  const A3 = 124
  const AL3 = 40
  const ARAIZ = 210
  const ALRAIZ = 50

  // El alto del viewBox: hasta la base del nivel 3 más aire.
  const VB_A = 940
  const VB_AL = 326

  return (
    // `Aparecer` envuelve la card en un div sin estilo: el borde y el
    // fondo van en la `section` de adentro. Ponerlos en los dos deja un
    // borde doble.
    <Aparecer>
      <section
        style={{ background: 'var(--superficie)', borderColor: 'var(--linea)' }}
        className="overflow-hidden rounded-xl border"
      >
        <div
          style={{ borderBottomColor: 'var(--linea)' }}
          className="border-b px-3.5 py-3 lg:px-4"
        >
          <h2 className="text-[14px] font-semibold">{organigrama.titulo}</h2>
          <p
            style={{ color: 'var(--texto-medio)' }}
            className="mt-0.5 text-[11.5px]"
          >
            {organigrama.bajada}
          </p>
        </div>

        <div data-lenis-prevent className="overflow-x-auto p-3.5 lg:p-4">
          <svg
            viewBox={`0 0 ${VB_A} ${VB_AL}`}
            // `min-w` en px para que en mobile el scroll horizontal
            // tenga sentido: comprimido a 390px no se leería nada.
            className="h-auto w-full min-w-[760px]"
            role="img"
            aria-label={`Organigrama de ${organigrama.titulo.toLowerCase()}, tres niveles`}
          >
            {/* Los conectores del nivel 1 al 2: bajan de la raíz, cruzan
                y bajan a cada área. */}
            <g stroke="var(--linea)" strokeWidth="1.5" fill="none">
              <path
                d={`M${raiz.x} ${raiz.y + ALRAIZ} V ${raiz.y + ALRAIZ + 26}`}
              />
              <path
                d={`M${nivel2[0]!.x} ${raiz.y + ALRAIZ + 26} H ${nivel2[nivel2.length - 1]!.x}`}
              />
              {nivel2.map((n) => (
                <path key={`c2-${n.t}`} d={`M${n.x} ${raiz.y + ALRAIZ + 26} V ${n.y}`} />
              ))}
            </g>

            {/* Los conectores del nivel 2 al 3. */}
            <g stroke="var(--linea)" strokeWidth="1.5" fill="none">
              {nivel3.map((h) => {
                const padre = nivel2[h.padre]
                if (!padre) return null
                const yMedio = padre.y + AL2 + 22
                return (
                  <path
                    key={`c3-${h.t}`}
                    d={`M${padre.x} ${padre.y + AL2} V ${yMedio} H ${h.x} V ${h.y}`}
                  />
                )
              })}
            </g>

            {/* La raíz. */}
            <g>
              <rect
                x={raiz.x - ARAIZ / 2}
                y={raiz.y}
                width={ARAIZ}
                height={ALRAIZ}
                rx="9"
                fill="var(--acento)"
              />
              <text
                x={raiz.x}
                y={raiz.y + 21}
                textAnchor="middle"
                fill="#FFFFFF"
                style={{ fontSize: '13px', fontWeight: 600 }}
              >
                {raiz.t}
              </text>
              <text
                x={raiz.x}
                y={raiz.y + 37}
                textAnchor="middle"
                fill="rgba(255,255,255,0.82)"
                style={{ fontSize: '11px' }}
              >
                {raiz.quien}
              </text>
            </g>

            {/* El nivel 2: las cuatro áreas, cada una con su color en la
                barra superior. Es lo que hace que el organigrama no sea
                una escalera de cajas grises. */}
            {nivel2.map((n) => (
              <g key={n.t}>
                <rect
                  x={n.x - A2 / 2}
                  y={n.y}
                  width={A2}
                  height={AL2}
                  rx="8"
                  fill="var(--superficie)"
                  stroke="var(--linea)"
                  strokeWidth="1.5"
                />
                {/* La barra de color del área. */}
                <rect x={n.x - A2 / 2} y={n.y} width="4" height={AL2} rx="2" fill={n.color} />
                <text
                  x={n.x - A2 / 2 + 14}
                  y={n.y + 20}
                  fill="var(--texto)"
                  style={{ fontSize: '12.5px', fontWeight: 600 }}
                >
                  {n.t}
                  <tspan
                    fill="var(--texto-tenue)"
                    style={{ fontSize: '11px', fontWeight: 400 }}
                  >
                    {'  '}({n.n})
                  </tspan>
                </text>
                <text
                  x={n.x - A2 / 2 + 14}
                  y={n.y + 37}
                  fill="var(--texto-medio)"
                  style={{ fontSize: '11px' }}
                >
                  {n.quien}
                </text>
              </g>
            ))}

            {/* El nivel 3: los equipos. */}
            {nivel3.map((h) => {
              const padre = nivel2[h.padre]
              return (
                <g key={h.t}>
                  <rect
                    x={h.x - A3 / 2}
                    y={h.y}
                    width={A3}
                    height={AL3}
                    rx="7"
                    fill="var(--fondo)"
                    stroke="var(--linea)"
                    strokeWidth="1.25"
                  />
                  <circle cx={h.x - A3 / 2 + 13} cy={h.y + AL3 / 2} r="3" fill={padre?.color} />
                  <text
                    x={h.x - A3 / 2 + 23}
                    y={h.y + 17}
                    fill="var(--texto)"
                    style={{ fontSize: '11.5px', fontWeight: 500 }}
                  >
                    {h.t}
                  </text>
                  <text
                    x={h.x - A3 / 2 + 23}
                    y={h.y + 30}
                    fill="var(--texto-tenue)"
                    style={{ fontSize: '10px', fontVariantNumeric: 'tabular-nums' }}
                  >
                    {h.n} personas
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </section>
    </Aparecer>
  )
}
