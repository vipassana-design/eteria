import { Foto, Lienzo, LINEA, TENUE, TINTA } from './Lienzo'

/** Software a medida: el tablero de resumen.
 *
 *  La landing de software muestra el detalle de un pedido; acá va el
 *  nivel de arriba, el tablero que el equipo mira todos los días:
 *  KPIs comparados contra el período anterior, series de dos meses,
 *  ranking de productos y cola de trabajo pendiente.
 *
 *  Sin fotos de escena: un panel de gestión no las tiene. Lo que da
 *  realismo acá son los datos —importes con decimales, nombres, horas
 *  relativas— y la densidad de una pantalla en uso.
 *
 *  Partes: barra → kpis → grafico → ranking → cola → alerta.
 */

const VIOLETA = '#8B5CF6'
const VERDE = '#4F9E7F'
const AMBAR = '#C99A5A'
const ROJO = '#C95A5A'

/** Barra lateral: el ítem activo y un contador de pendientes. */
const NAV = [
  { t: 'Resumen', on: true, badge: '' },
  { t: 'Pedidos', on: false, badge: '12' },
  { t: 'Productos', on: false, badge: '' },
  { t: 'Clientes', on: false, badge: '' },
  { t: 'Informes', on: false, badge: '' },
  { t: 'Integraciones', on: false, badge: '' },
]

const KPIS = [
  { x: 200, etiqueta: 'Facturación', valor: '$1.284.500', delta: '+12,4%', sube: true, comp: 'vs. $1.142.800' },
  { x: 364, etiqueta: 'Pedidos', valor: '1.284', delta: '+8,1%', sube: true, comp: 'vs. 1.188' },
  { x: 528, etiqueta: 'Ticket promedio', valor: '$1.000', delta: '-0,4%', sube: false, comp: 'vs. $1.004' },
]

/** Serie de dos meses: la comparación es lo que hace útil un gráfico. */
const SERIE_ACTUAL = 'M218 246c22-5 33-19 55-23s34 11 56 5 34-21 56-24 36 13 58 9 31-15 49-18'
const SERIE_PREVIA = 'M218 256c22-3 33-10 55-12s34 6 56 3 34-12 56-13 36 7 58 4 31-8 49-10'

const RANKING = [
  { n: 'Sweater trenzado', u: '184 u.', pct: 92, m: '$137.6k' },
  { n: 'Camisa oversize', u: '142 u.', pct: 71, m: '$88.6k' },
  { n: 'Blazer de lana', u: '96 u.', pct: 48, m: '$122.9k' },
]

const COLA = [
  { id: '#4821', quien: 'M. Ferreyra', que: 'Pago acreditado', hace: 'hace 4 min', color: VERDE },
  { id: '#4820', quien: 'L. Ocampo', que: 'Esperando stock', hace: 'hace 22 min', color: AMBAR },
  { id: '#4819', quien: 'R. Duarte', que: 'Listo para despacho', hace: 'hace 1 h', color: VERDE },
]

export function PanelDashboard() {
  return (
    <Lienzo fondo="#F4F2F9">
      {/* ── Barra lateral y cabecera ── */}
      <g data-parte="barra">
        <rect width={176} height={460} fill="#171331" />

        {/* Marca del producto. */}
        <rect x={22} y={22} width={22} height={22} rx={6} fill={VIOLETA} />
        <path d="M29 33l3 3 6-7" fill="none" stroke="#FFF" strokeWidth={1.8} strokeLinecap="round" />
        <text x={54} y={38} fontSize={12.5} fontWeight={700} fill="#F4F2FF">
          Gestión
        </text>

        {NAV.map((n, i) => (
          <g key={n.t}>
            {n.on ? <rect x={10} y={64 + i * 32} width={156} height={26} rx={7} fill="#2A2352" /> : null}
            <rect
              x={24}
              y={72 + i * 32}
              width={9}
              height={9}
              rx={2.5}
              fill={n.on ? VIOLETA : '#514A78'}
            />
            <text x={44} y={81 + i * 32} fontSize={10.5} fill={n.on ? '#F4F2FF' : '#948CB8'}>
              {n.t}
            </text>
            {n.badge ? (
              <>
                <rect x={136} y={70 + i * 32} width={22} height={14} rx={7} fill="#3B3468" />
                <text x={147} y={80 + i * 32} fontSize={8} fontWeight={600} fill="#C4B5FD" textAnchor="middle">
                  {n.badge}
                </text>
              </>
            ) : null}
          </g>
        ))}

        {/* Pie de la barra: el usuario con sesión abierta. */}
        <line x1={16} y1={370} x2={160} y2={370} stroke="#2A2352" strokeWidth={1} />
        <Foto id="panelAvatar" href="/mockups/panel-thumb.webp" x={22} y={386} w={26} h={26} rx={13} />
        <text x={58} y={397} fontSize={9.5} fontWeight={600} fill="#F4F2FF">
          C. Ibáñez
        </text>
        <text x={58} y={409} fontSize={8} fill="#7B739F">
          Administrador
        </text>

        {/* Cabecera del contenido. */}
        <text x={200} y={38} fontSize={17} fontWeight={700} fill={TINTA} letterSpacing={-0.4}>
          Resumen
        </text>
        <text x={274} y={38} fontSize={9.5} fill={TENUE}>
          Actualizado hace 2 min
        </text>

        {/* Selector de período. */}
        <rect x={578} y={22} width={106} height={24} rx={6} fill="#FFFFFF" stroke="#E2DEEE" />
        <circle cx={592} cy={34} r={4.5} fill="none" stroke={TENUE} strokeWidth={1.3} />
        <path d="M592 31.5v3l2 1" stroke={TENUE} strokeWidth={1.2} strokeLinecap="round" />
        <text x={604} y={37.5} fontSize={9} fill={TINTA}>
          Últimos 30 días
        </text>
        <path d="M670 32l3.5 3.5 3.5-3.5" fill="none" stroke={TENUE} strokeWidth={1.3} strokeLinecap="round" />
      </g>

      {/* ── KPIs con comparación contra el período anterior ── */}
      <g data-parte="kpis">
        {KPIS.map((k) => (
          <g key={k.etiqueta} data-item>
            <rect
              x={k.x}
              y={54}
              width={148}
              height={78}
              rx={9}
              fill="#FFFFFF"
              filter="url(#sombraCard)"
            />
            <text x={k.x + 14} y={72} fontSize={9.5} fill={TENUE}>
              {k.etiqueta}
            </text>
            <text x={k.x + 14} y={96} fontSize={19} fontWeight={700} fill={TINTA} letterSpacing={-0.4}>
              {k.valor}
            </text>

            {/* Flecha + delta: la dirección se lee antes que el número. */}
            <path
              d={k.sube ? `M${k.x + 15} 113l4-5 4 5` : `M${k.x + 15} 108l4 5 4-5`}
              fill="none"
              stroke={k.sube ? VERDE : ROJO}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x={k.x + 28} y={114} fontSize={9.5} fontWeight={600} fill={k.sube ? VERDE : ROJO}>
              {k.delta}
            </text>
            <text x={k.x + 14} y={126} fontSize={8} fill="#B4AEC6">
              {k.comp}
            </text>
          </g>
        ))}
      </g>

      {/* ── Gráfico: dos series comparadas ── */}
      <g data-parte="grafico">
        <rect x={200} y={142} width={312} height={130} rx={9} fill="#FFFFFF" filter="url(#sombraCard)" />
        <text x={216} y={162} fontSize={10.5} fontWeight={600} fill={TINTA}>
          Facturación por semana
        </text>

        {/* Leyenda de las dos series. */}
        <circle cx={392} cy={159} r={3.5} fill={VIOLETA} />
        <text x={401} y={162} fontSize={8} fill={TENUE}>
          Este mes
        </text>
        <circle cx={452} cy={159} r={3.5} fill="#D6CFE8" />
        <text x={461} y={162} fontSize={8} fill={TENUE}>
          Anterior
        </text>

        <defs>
          <linearGradient id="areaDashboard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={VIOLETA} stopOpacity={0.22} />
            <stop offset="100%" stopColor={VIOLETA} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Guías horizontales: dan escala sin competir con las series. */}
        {[194, 220, 246].map((y) => (
          <line key={y} x1={218} y1={y} x2={494} y2={y} stroke="#F0EDF6" strokeWidth={1} />
        ))}

        <path d={`${SERIE_ACTUAL}v42H218v0Z`} fill="url(#areaDashboard)" />
        <path d={SERIE_PREVIA} fill="none" stroke="#D6CFE8" strokeWidth={1.8} strokeDasharray="3 3" />
        <path
          data-trazo
          d={SERIE_ACTUAL}
          fill="none"
          stroke={VIOLETA}
          strokeWidth={2.2}
          strokeLinecap="round"
        />

        {/* Punto del último valor con su tooltip: el detalle que hace
            que se lea como un gráfico en uso y no como una ilustración. */}
        <circle cx={472} cy={206} r={4} fill="#FFFFFF" stroke={VIOLETA} strokeWidth={2} />
        <rect x={430} y={172} width={74} height={26} rx={5} fill={TINTA} />
        <text x={467} y={183} fontSize={7.5} fill="#A79FC9" textAnchor="middle">
          Semana 4
        </text>
        <text x={467} y={193} fontSize={9} fontWeight={700} fill="#FFF" textAnchor="middle">
          $342.100
        </text>

        {['S1', 'S2', 'S3', 'S4'].map((s, i) => (
          <text key={s} x={232 + i * 82} y={262} fontSize={8} fill="#B4AEC6">
            {s}
          </text>
        ))}
      </g>

      {/* ── Ranking de productos con barra de proporción ── */}
      <g data-parte="ranking">
        <rect x={524} y={142} width={160} height={130} rx={9} fill="#FFFFFF" filter="url(#sombraCard)" />
        <text x={538} y={162} fontSize={10.5} fontWeight={600} fill={TINTA}>
          Más vendidos
        </text>

        {RANKING.map((r, i) => (
          <g key={r.n} data-item>
            <text x={538} y={186 + i * 30} fontSize={9} fill={TINTA}>
              {r.n.length > 17 ? `${r.n.slice(0, 16)}…` : r.n}
            </text>
            <text x={670} y={186 + i * 30} fontSize={8.5} fontWeight={600} fill={TENUE} textAnchor="end">
              {r.u}
            </text>
            <rect x={538} y={192 + i * 30} width={132} height={4} rx={2} fill="#F0EDF6" />
            <rect
              x={538}
              y={192 + i * 30}
              width={(132 * r.pct) / 100}
              height={4}
              rx={2}
              fill={VIOLETA}
              opacity={1 - i * 0.22}
            />
            <text x={538} y={207 + i * 30} fontSize={8} fill="#B4AEC6">
              {r.m}
            </text>
          </g>
        ))}
      </g>

      {/* ── Cola de trabajo: lo que hay para hacer ahora ── */}
      <g data-parte="cola">
        <text x={200} y={296} fontSize={10.5} fontWeight={600} fill={TINTA}>
          Requieren atención
        </text>
        <text x={684} y={296} fontSize={9} fill={VIOLETA} textAnchor="end">
          Ver los 12
        </text>

        {COLA.map((c, i) => (
          <g key={c.id} data-item>
            <rect
              x={200}
              y={306 + i * 30}
              width={484}
              height={26}
              rx={6}
              fill="#FFFFFF"
              stroke={LINEA}
            />
            <rect x={200} y={306 + i * 30} width={3} height={26} rx={1.5} fill={c.color} />
            <text x={216} y={323 + i * 30} fontSize={9.5} fontWeight={700} fill={TINTA}>
              {c.id}
            </text>
            <text x={262} y={323 + i * 30} fontSize={9.5} fill={TINTA}>
              {c.quien}
            </text>
            <circle cx={372} cy={319 + i * 30} r={3} fill={c.color} />
            <text x={382} y={323 + i * 30} fontSize={9} fill={c.color}>
              {c.que}
            </text>
            <text x={560} y={323 + i * 30} fontSize={8.5} fill="#B4AEC6">
              {c.hace}
            </text>

            {/* Acción por fila: sin esto la tabla se lee como reporte
                y no como bandeja de trabajo. */}
            <rect x={624} y={311 + i * 30} width={48} height={16} rx={4} fill="#F4F2FA" />
            <text x={648} y={323 + i * 30} fontSize={8} fontWeight={600} fill="#6D28D9" textAnchor="middle">
              Resolver
            </text>
          </g>
        ))}
      </g>

      {/* ── Integraciones: el estado de lo que el panel tiene conectado ── */}
      <g data-parte="integraciones">
        {[
          { t: 'Facturación', ok: true, x: 200 },
          { t: 'Stock', ok: true, x: 322 },
          { t: 'Mercado Pago', ok: true, x: 424 },
          { t: 'Andreani', ok: false, x: 540 },
        ].map((s) => (
          <g key={s.t} data-item>
            <circle cx={s.x + 6} cy={410} r={3.5} fill={s.ok ? VERDE : AMBAR} />
            <text x={s.x + 16} y={413} fontSize={8.5} fill={s.ok ? TENUE : AMBAR}>
              {s.t}
            </text>
          </g>
        ))}
        <text x={684} y={413} fontSize={8.5} fill="#B4AEC6" textAnchor="end">
          14:02
        </text>
      </g>
    </Lienzo>
  )
}
