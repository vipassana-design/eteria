/** Pantallas de la propuesta 3, descompuestas en partes.
 *
 *  Las de PantallasMockup.tsx son un SVG monolítico: sirven para
 *  mostrar una interfaz, no para armarla por etapas. Acá cada parte es
 *  un grupo con `data-parte`, así el timeline la puede animar sola.
 *
 *  Misma caja de 720×460 y la misma paleta clara que las originales.
 */

const PAPEL = '#F7F6FB'
const TINTA = '#1B1733'
const TENUE = '#8E88A8'

function Lienzo({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 720 460" className="size-full" aria-hidden="true">
      <rect width={720} height={460} fill={PAPEL} />
      {children}
    </svg>
  )
}

/** Ecommerce: barra → hero → grilla → carrito. */
export function TiendaPorPartes() {
  const productos = [
    { x: 40, color: '#E8D5C4', acento: '#C97B5A' },
    { x: 216, color: '#D4DCE8', acento: '#5A7BC9' },
    { x: 392, color: '#E0D8E8', acento: '#8B5CF6' },
    { x: 568, color: '#D8E4DC', acento: '#4F9E7F' },
  ]

  return (
    <Lienzo>
      <g data-parte="barra">
        <rect width={720} height={52} fill="#FFFFFF" />
        <text x={40} y={33} fontSize={17} fontWeight={700} fill={TINTA} letterSpacing={-0.3}>
          ATELIER
        </text>
        {['Mujer', 'Hombre', 'Accesorios', 'Sale'].map((t, i) => (
          <text key={t} x={200 + i * 78} y={32} fontSize={11} fill={TENUE}>
            {t}
          </text>
        ))}
        <rect y={52} width={720} height={1} fill="#E8E5F0" />
      </g>

      <g data-parte="hero">
        <rect x={40} y={78} width={640} height={150} rx={10} fill="#E8D5C4" />
        <text x={72} y={128} fontSize={24} fontWeight={700} fill="#4A2E1E" letterSpacing={-0.6}>
          Nueva temporada
        </text>
        <text x={72} y={152} fontSize={12} fill="#7A5340">
          Hasta 30% en prendas seleccionadas
        </text>
        <rect x={72} y={170} width={116} height={32} rx={16} fill="#1B1733" />
        <text x={130} y={190} fontSize={11} fontWeight={600} fill="#FFF" textAnchor="middle">
          Ver colección
        </text>
        <g transform="translate(470 100) scale(0.85)">
          <path
            d="M44 6 26 14 8 30l14 18 12-9v67c0 3 2 5 5 5h62c3 0 5-2 5-5V39l12 9 14-18-18-16L96 6 70 18 44 6Z"
            fill="#C97B5A"
            opacity={0.7}
          />
        </g>
      </g>

      <g data-parte="grilla">
        <text x={40} y={262} fontSize={13} fontWeight={600} fill={TINTA}>
          Destacados
        </text>
        {productos.map((p) => (
          <g key={p.x} data-item>
            <rect x={p.x} y={276} width={112} height={104} rx={8} fill={p.color} />
            <g transform={`translate(${p.x + 27} 294) scale(0.42)`}>
              <path
                d="M44 6 26 14 8 30l14 18 12-9v67c0 3 2 5 5 5h62c3 0 5-2 5-5V39l12 9 14-18-18-16L96 6 70 18 44 6Z"
                fill={p.acento}
                opacity={0.62}
              />
            </g>
            <rect x={p.x} y={390} width={72} height={7} rx={3.5} fill="#DAD6E4" />
            <rect x={p.x} y={405} width={44} height={7} rx={3.5} fill={p.acento} opacity={0.75} />
          </g>
        ))}
      </g>

      {/* El carrito entra al final, como si alguien agregara un producto. */}
      <g data-parte="carrito">
        <rect x={470} y={54} width={210} height={92} rx={10} fill="#FFFFFF" />
        <rect x={470} y={54} width={210} height={92} rx={10} fill="none" stroke="#E2DEEE" />
        <text x={488} y={78} fontSize={11} fontWeight={600} fill={TINTA}>
          Agregado al carrito
        </text>
        <rect x={488} y={90} width={38} height={38} rx={5} fill="#E8D5C4" />
        <rect x={536} y={94} width={90} height={7} rx={3.5} fill="#DAD6E4" />
        <text x={536} y={122} fontSize={12} fontWeight={700} fill="#C97B5A">
          $18.400
        </text>
        <circle cx={664} cy={26} r={12} fill="#7C3AED" />
        <text x={664} y={30} fontSize={9} fontWeight={700} fill="#FFF" textAnchor="middle">
          1
        </text>
      </g>
    </Lienzo>
  )
}

/** Panel: barra → métricas → gráfico → tabla. */
export function PanelPorPartes() {
  const metricas = [
    { x: 216, valor: '$248.5k', etiqueta: 'Ventas del mes', delta: '+12,4%', color: '#4F9E7F' },
    { x: 384, valor: '1.284', etiqueta: 'Pedidos', delta: '+8,1%', color: '#4F9E7F' },
    { x: 552, valor: '3,8%', etiqueta: 'Conversión', delta: '-0,4%', color: '#C95A5A' },
  ]
  const filas = [
    { id: '#4821', cliente: 'M. Ferreyra', monto: '$18.400', estado: 'Enviado', color: '#4F9E7F' },
    { id: '#4820', cliente: 'L. Ocampo', monto: '$7.250', estado: 'En proceso', color: '#C99A5A' },
    { id: '#4819', cliente: 'R. Duarte', monto: '$32.900', estado: 'Enviado', color: '#4F9E7F' },
  ]

  return (
    <Lienzo>
      <g data-parte="barra">
        <rect width={176} height={460} fill="#1B1733" />
        <circle cx={36} cy={34} r={11} fill="#8B5CF6" />
        <text x={56} y={39} fontSize={13} fontWeight={700} fill="#F4F2FF">
          Gestión
        </text>
        {['Resumen', 'Pedidos', 'Productos', 'Clientes'].map((t, i) => (
          <g key={t}>
            {i === 0 && <rect x={12} y={70} width={152} height={30} rx={7} fill="#2C2551" />}
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
        <text x={216} y={40} fontSize={19} fontWeight={700} fill={TINTA} letterSpacing={-0.4}>
          Resumen
        </text>
      </g>

      <g data-parte="metricas">
        {metricas.map((m) => (
          <g key={m.x} data-item>
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
      </g>

      <g data-parte="grafico">
        <rect x={216} y={164} width={464} height={128} rx={9} fill="#FFFFFF" />
        <rect x={216} y={164} width={464} height={128} rx={9} fill="none" stroke="#E8E5F0" />
        <text x={232} y={188} fontSize={11} fontWeight={600} fill={TINTA}>
          Ventas por semana
        </text>
        <defs>
          <linearGradient id="areaPartes" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path
          d="M236 272c28-10 42-30 70-34s44 16 72 8 44-34 72-38 46 22 74 16 40-24 62-28v76H236v0Z"
          fill="url(#areaPartes)"
        />
        <path
          data-trazo
          d="M236 272c28-10 42-30 70-34s44 16 72 8 44-34 72-38 46 22 74 16 40-24 62-28"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth={2.2}
          strokeLinecap="round"
        />
      </g>

      <g data-parte="tabla">
        <text x={216} y={324} fontSize={11} fontWeight={600} fill={TINTA}>
          Pedidos recientes
        </text>
        {filas.map((f, i) => (
          <g key={f.id} data-item>
            <rect
              x={216}
              y={336 + i * 28}
              width={464}
              height={24}
              rx={5}
              fill={i % 2 ? '#FFF' : '#F2F0F8'}
            />
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
      </g>
    </Lienzo>
  )
}

/** Institucional: barra → hero → datos → prensa. */
export function CorporativoPorPartes() {
  const datos = [
    { x: 56, valor: '+40', etiqueta: 'países' },
    { x: 232, valor: '1.200', etiqueta: 'empleados' },
    { x: 408, valor: '35', etiqueta: 'años' },
  ]

  return (
    <Lienzo>
      <rect width={720} height={460} fill="#FFFFFF" />

      <g data-parte="barra">
        <rect width={720} height={58} fill="#0B3A5C" />
        <rect x={40} y={22} width={26} height={14} rx={2} fill="#4FA3D9" />
        <text x={76} y={34} fontSize={14} fontWeight={700} fill="#FFFFFF" letterSpacing={-0.2}>
          Norvex
        </text>
        {['Compañía', 'Soluciones', 'Inversores', 'Prensa'].map((t, i) => (
          <text key={t} x={356 + i * 76} y={34} fontSize={10.5} fill="#B3D2E6">
            {t}
          </text>
        ))}
      </g>

      <g data-parte="hero">
        <rect y={58} width={720} height={196} fill="#F2F7FB" />
        <text x={56} y={124} fontSize={27} fontWeight={700} fill="#0B3A5C" letterSpacing={-0.7}>
          Infraestructura
        </text>
        <text x={56} y={158} fontSize={27} fontWeight={700} fill="#4FA3D9" letterSpacing={-0.7}>
          para la industria
        </text>
        <rect x={56} y={180} width={130} height={34} rx={4} fill="#0B3A5C" />
        <text x={121} y={202} fontSize={11} fontWeight={600} fill="#FFF" textAnchor="middle">
          Conocer más
        </text>
        {[64, 96, 78, 118, 92, 138].map((h, i) => (
          <rect
            key={i}
            data-item
            x={470 + i * 34}
            y={224 - h}
            width={20}
            height={h}
            rx={2}
            fill={i === 5 ? '#4FA3D9' : '#C9DEEC'}
          />
        ))}
      </g>

      <g data-parte="datos">
        {datos.map((d) => (
          <g key={d.etiqueta} data-item>
            <text x={d.x} y={310} fontSize={28} fontWeight={700} fill="#0B3A5C">
              {d.valor}
            </text>
            <text x={d.x} y={330} fontSize={10.5} fill="#6E8698">
              {d.etiqueta}
            </text>
          </g>
        ))}
        <line x1={56} y1={352} x2={664} y2={352} stroke="#E2EBF2" strokeWidth={1} />
      </g>

      <g data-parte="prensa">
        {[0, 1, 2].map((i) => (
          <g key={i} data-item>
            <rect x={56 + i * 208} y={374} width={184} height={58} rx={5} fill="#F7FAFC" />
            <rect x={70 + i * 208} y={388} width={40} height={7} rx={3.5} fill="#4FA3D9" />
            <rect x={70 + i * 208} y={404} width={150} height={6} rx={3} fill="#D8E4ED" />
            <rect x={70 + i * 208} y={416} width={112} height={6} rx={3} fill="#D8E4ED" />
          </g>
        ))}
      </g>
    </Lienzo>
  )
}

export const POR_PARTES = {
  tienda: TiendaPorPartes,
  panel: PanelPorPartes,
  corporativo: CorporativoPorPartes,
} as const
