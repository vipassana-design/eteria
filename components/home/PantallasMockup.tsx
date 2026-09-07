/** Pantallas de los mockups del hero.
 *
 *  UI dibujada con SVG en vez de imágenes: los mockups reales son un
 *  pendiente del cliente (PLAN.md §1), y así el hero se juzga con
 *  contenido realista y a color mientras tanto. Al escalar quedan
 *  nítidas y no suman peso de red.
 *
 *  Las tres comparten caja de 720×460 y una paleta propia por pantalla:
 *  el color saturado del sitio entra por los mockups (§2.1), así que acá
 *  sí hay color real y no solo la rampa violeta.
 */

const CAJA = { ancho: 720, alto: 460 }

/** Fondo claro de las pantallas: son UI de producto, no del sitio dark.
 *  El contraste con el fondo de la página es lo que las hace leer como
 *  pantallas reales. */
const PAPEL = '#F7F6FB'
const TINTA = '#1B1733'
const TENUE = '#8E88A8'

function Marco({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${CAJA.ancho} ${CAJA.alto}`}
      className="size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width={CAJA.ancho} height={CAJA.alto} fill={PAPEL} />
      {children}
    </svg>
  )
}

/** Tienda de indumentaria: header con nav y carrito, hero con foto,
 *  grilla de productos con precios. */
export function PantallaTienda() {
  const productos = [
    { x: 40, color: '#E8D5C4', acento: '#C97B5A' },
    { x: 216, color: '#D4DCE8', acento: '#5A7BC9' },
    { x: 392, color: '#E0D8E8', acento: '#8B5CF6' },
    { x: 568, color: '#D8E4DC', acento: '#4F9E7F' },
  ]

  return (
    <Marco>
      {/* Barra superior */}
      <rect width={720} height={52} fill="#FFFFFF" />
      <text x={40} y={33} fontSize={17} fontWeight={700} fill={TINTA} letterSpacing={-0.3}>
        ATELIER
      </text>
      {['Mujer', 'Hombre', 'Accesorios', 'Sale'].map((t, i) => (
        <text key={t} x={200 + i * 78} y={32} fontSize={11} fill={TENUE}>
          {t}
        </text>
      ))}
      {/* Carrito con badge */}
      <circle cx={664} cy={26} r={13} fill="#F2EFFB" />
      <path
        d="M659 22h10l-1.2 9h-7.6L659 22Z"
        fill="none"
        stroke="#7C3AED"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <circle cx={674} cy={17} r={6.5} fill="#7C3AED" />
      <text x={674} y={20.5} fontSize={8} fontWeight={700} fill="#FFF" textAnchor="middle">
        3
      </text>
      <rect y={52} width={720} height={1} fill="#E8E5F0" />

      {/* Hero de la tienda */}
      <rect x={40} y={78} width={640} height={168} rx={10} fill="#E8D5C4" />
      {/* Remera: cuerpo con mangas y cuello, para que se lea como prenda
          y no como una forma redondeada. */}
      <g transform="translate(452 118)">
        <path
          d="M44 6 26 14 8 30l14 18 12-9v67c0 3 2 5 5 5h62c3 0 5-2 5-5V39l12 9 14-18-18-16L96 6 70 18 44 6Z"
          fill="#C97B5A"
          opacity={0.7}
        />
        <path d="M44 6 70 18 96 6l-8-4H52l-8 4Z" fill="#A85F42" opacity={0.55} />
      </g>
      <g transform="translate(566 142) scale(0.82)">
        <path
          d="M44 6 26 14 8 30l14 18 12-9v67c0 3 2 5 5 5h62c3 0 5-2 5-5V39l12 9 14-18-18-16L96 6 70 18 44 6Z"
          fill="#B06846"
          opacity={0.55}
        />
      </g>
      <text x={72} y={132} fontSize={26} fontWeight={700} fill="#4A2E1E" letterSpacing={-0.6}>
        Nueva temporada
      </text>
      <text x={72} y={158} fontSize={12} fill="#7A5340">
        Hasta 30% en prendas seleccionadas
      </text>
      <rect x={72} y={178} width={116} height={34} rx={17} fill="#1B1733" />
      <text x={130} y={199} fontSize={11} fontWeight={600} fill="#FFF" textAnchor="middle">
        Ver colección
      </text>

      {/* Grilla de productos */}
      <text x={40} y={280} fontSize={13} fontWeight={600} fill={TINTA}>
        Destacados
      </text>
      {productos.map((p) => (
        <g key={p.x}>
          <rect x={p.x} y={294} width={112} height={104} rx={8} fill={p.color} />
          {/* Remera chica, misma silueta que el hero: la grilla se lee
              como productos y no como bloques de color. */}
          <g transform={`translate(${p.x + 27} 312) scale(0.42)`}>
            <path
              d="M44 6 26 14 8 30l14 18 12-9v67c0 3 2 5 5 5h62c3 0 5-2 5-5V39l12 9 14-18-18-16L96 6 70 18 44 6Z"
              fill={p.acento}
              opacity={0.62}
            />
          </g>
          <rect x={p.x} y={408} width={72} height={7} rx={3.5} fill="#DAD6E4" />
          <rect x={p.x} y={423} width={44} height={7} rx={3.5} fill={p.acento} opacity={0.75} />
        </g>
      ))}
    </Marco>
  )
}

/** Panel de administración: sidebar, métricas con sparkline, tabla de
 *  pedidos con estados. */
export function PantallaPanel() {
  const metricas = [
    { x: 216, valor: '$248.5k', etiqueta: 'Ventas del mes', delta: '+12,4%', color: '#4F9E7F' },
    { x: 384, valor: '1.284', etiqueta: 'Pedidos', delta: '+8,1%', color: '#4F9E7F' },
    { x: 552, valor: '3,8%', etiqueta: 'Conversión', delta: '-0,4%', color: '#C95A5A' },
  ]
  const filas = [
    { id: '#4821', cliente: 'M. Ferreyra', monto: '$18.400', estado: 'Enviado', color: '#4F9E7F' },
    { id: '#4820', cliente: 'L. Ocampo', monto: '$7.250', estado: 'En proceso', color: '#C99A5A' },
    { id: '#4819', cliente: 'R. Duarte', monto: '$32.900', estado: 'Enviado', color: '#4F9E7F' },
    { id: '#4818', cliente: 'S. Bianchi', monto: '$4.100', estado: 'Pendiente', color: '#8E88A8' },
  ]

  return (
    <Marco>
      {/* Sidebar */}
      <rect width={176} height={460} fill="#1B1733" />
      <circle cx={36} cy={34} r={11} fill="#8B5CF6" />
      <text x={56} y={39} fontSize={13} fontWeight={700} fill="#F4F2FF">
        Gestión
      </text>
      {['Resumen', 'Pedidos', 'Productos', 'Clientes', 'Informes'].map((t, i) => (
        <g key={t}>
          {i === 0 && <rect x={12} y={70 + i * 36} width={152} height={30} rx={7} fill="#2C2551" />}
          <rect
            x={26}
            y={81 + i * 36}
            width={10}
            height={10}
            rx={2.5}
            fill={i === 0 ? '#8B5CF6' : '#5B5480'}
          />
          <text x={48} y={90 + i * 36} fontSize={11.5} fill={i === 0 ? '#F4F2FF' : '#9A93BC'}>
            {t}
          </text>
        </g>
      ))}

      {/* Encabezado */}
      <text x={216} y={40} fontSize={19} fontWeight={700} fill={TINTA} letterSpacing={-0.4}>
        Resumen
      </text>
      <rect x={604} y={22} width={76} height={26} rx={13} fill="#F2EFFB" />
      <text x={642} y={39} fontSize={10.5} fill="#7C3AED" textAnchor="middle">
        Últimos 30 días
      </text>

      {/* Métricas */}
      {metricas.map((m) => (
        <g key={m.x}>
          <rect x={m.x} y={66} width={152} height={82} rx={9} fill="#FFFFFF" />
          <rect x={m.x} y={66} width={152} height={82} rx={9} fill="none" stroke="#E8E5F0" />
          <text x={m.x + 16} y={92} fontSize={10.5} fill={TENUE}>
            {m.etiqueta}
          </text>
          <text x={m.x + 16} y={117} fontSize={21} fontWeight={700} fill={TINTA}>
            {m.valor}
          </text>
          <text x={m.x + 16} y={135} fontSize={10} fontWeight={600} fill={m.color}>
            {m.delta}
          </text>
        </g>
      ))}

      {/* Gráfico de área */}
      <rect x={216} y={164} width={464} height={128} rx={9} fill="#FFFFFF" />
      <rect x={216} y={164} width={464} height={128} rx={9} fill="none" stroke="#E8E5F0" />
      <text x={232} y={188} fontSize={11} fontWeight={600} fill={TINTA}>
        Ventas por semana
      </text>
      <defs>
        <linearGradient id="areaVentas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.28} />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        d="M236 272c28-10 42-30 70-34s44 16 72 8 44-34 72-38 46 22 74 16 40-24 62-28v76H236v0Z"
        fill="url(#areaVentas)"
      />
      <path
        d="M236 272c28-10 42-30 70-34s44 16 72 8 44-34 72-38 46 22 74 16 40-24 62-28"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <circle cx={656} cy={188} r={3.5} fill="#8B5CF6" />

      {/* Tabla de pedidos */}
      <text x={216} y={324} fontSize={11} fontWeight={600} fill={TINTA}>
        Pedidos recientes
      </text>
      {filas.map((f, i) => (
        <g key={f.id}>
          <rect x={216} y={336 + i * 28} width={464} height={24} rx={5} fill={i % 2 ? '#FFF' : '#F2F0F8'} />
          <text x={230} y={352 + i * 28} fontSize={10} fontWeight={600} fill={TINTA}>
            {f.id}
          </text>
          <text x={288} y={352 + i * 28} fontSize={10} fill={TENUE}>
            {f.cliente}
          </text>
          <text x={440} y={352 + i * 28} fontSize={10} fill={TINTA}>
            {f.monto}
          </text>
          <circle cx={540} cy={348 + i * 28} r={3.5} fill={f.color} />
          <text x={552} y={352 + i * 28} fontSize={10} fill={f.color}>
            {f.estado}
          </text>
        </g>
      ))}
    </Marco>
  )
}

/** Sitio institucional: header, hero editorial y tres servicios. */
export function PantallaSitio() {
  const servicios = [
    { x: 40, titulo: 'Societario', color: '#5A7BC9' },
    { x: 256, titulo: 'Laboral', color: '#4F9E7F' },
    { x: 472, titulo: 'Tributario', color: '#C99A5A' },
  ]

  return (
    <Marco>
      <rect width={720} height={460} fill="#FBFAFE" />

      {/* Barra superior */}
      <rect width={720} height={56} fill="#FFFFFF" />
      <rect x={40} y={20} width={16} height={16} rx={3} fill="#1B1733" />
      <text x={64} y={33} fontSize={14} fontWeight={700} fill={TINTA} letterSpacing={-0.2}>
        Duarte &amp; Asoc.
      </text>
      {['Estudio', 'Áreas', 'Equipo', 'Contacto'].map((t, i) => (
        <text key={t} x={392 + i * 68} y={33} fontSize={11} fill={TENUE}>
          {t}
        </text>
      ))}
      <rect y={56} width={720} height={1} fill="#EAE7F2" />

      {/* Hero editorial */}
      <text x={40} y={132} fontSize={32} fontWeight={700} fill={TINTA} letterSpacing={-0.9}>
        Asesoría legal
      </text>
      <text x={40} y={172} fontSize={32} fontWeight={700} fill="#5A7BC9" letterSpacing={-0.9}>
        para empresas
      </text>
      <rect x={40} y={196} width={300} height={7} rx={3.5} fill="#DEDAEA" />
      <rect x={40} y={212} width={250} height={7} rx={3.5} fill="#DEDAEA" />
      <rect x={40} y={238} width={128} height={36} rx={6} fill="#1B1733" />
      <text x={104} y={261} fontSize={11} fontWeight={600} fill="#FFF" textAnchor="middle">
        Consultar
      </text>

      {/* Imagen del hero: edificio sugerido */}
      <rect x={400} y={84} width={280} height={196} rx={8} fill="#DDE4F0" />
      <rect x={430} y={140} width={54} height={140} fill="#B9C6DC" />
      <rect x={496} y={112} width={62} height={168} fill="#A6B6D0" />
      <rect x={570} y={158} width={50} height={122} fill="#C4CFE2" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={508 + c * 22}
            y={128 + r * 30}
            width={12}
            height={16}
            fill="#8CA3C6"
          />
        )),
      )}

      {/* Servicios */}
      <rect y={310} width={720} height={150} fill="#FFFFFF" />
      {servicios.map((s) => (
        <g key={s.x}>
          <rect x={s.x} y={340} width={208} height={92} rx={8} fill="#FBFAFE" />
          <rect x={s.x} y={340} width={208} height={92} rx={8} fill="none" stroke="#EAE7F2" />
          <rect x={s.x + 18} y={358} width={22} height={22} rx={5} fill={s.color} opacity={0.22} />
          <circle cx={s.x + 29} cy={369} r={4.5} fill={s.color} />
          <text x={s.x + 18} y={400} fontSize={12} fontWeight={600} fill={TINTA}>
            {s.titulo}
          </text>
          <rect x={s.x + 18} y={410} width={150} height={5.5} rx={2.75} fill="#E4E0EE" />
        </g>
      ))}
    </Marco>
  )
}

export const PANTALLAS = {
  tienda: PantallaTienda,
  panel: PantallaPanel,
  sitio: PantallaSitio,
} as const
