import { Lienzo, LINEA, TENUE, TINTA } from './LienzoMockup'

/** Software a medida: el tablero de trabajo del equipo.
 *
 *  Distinto de los dos que ya hay: el hero muestra el tablero de
 *  resumen con KPIs y la landing el detalle de un pedido. Acá va la
 *  vista operativa —las tarjetas moviéndose entre columnas— que es la
 *  pantalla donde el equipo pasa el día.
 *
 *  Sin fotos: un sistema interno no las tiene, y lo que lo hace ver
 *  real son los datos. Cada tarjeta lleva su número, su cliente, su
 *  importe y quién la tiene asignada.
 *
 *  Paleta propia, gris azulado con acento índigo: se distingue del
 *  azul de la ficha y del verde del estudio.
 *
 *  Partes: barra → filtros → columnas → tarjetas → resumen.
 */

const INDIGO = '#4F46E5'
const AMBAR = '#B45309'
const VERDE = '#047857'
const GRIS = '#F4F5F7'

/** Las cuatro columnas del tablero, con su color de estado. */
const COLUMNAS = [
  { t: 'Ingresados', n: 6, color: '#64748B' },
  { t: 'En preparación', n: 4, color: AMBAR },
  { t: 'Listos', n: 3, color: INDIGO },
  { t: 'Despachados', n: 9, color: VERDE },
]

/** Las tarjetas, por columna. `alta` marca las que llevan una etiqueta
 *  de prioridad: sin ninguna el tablero se ve inerte. */
const TARJETAS = [
  [
    { id: '#5142', cli: 'Distribuidora Sur', monto: '$284.500', quien: 'MF', alta: true },
    { id: '#5141', cli: 'Ferretería Norte', monto: '$62.300', quien: 'LO', alta: false },
  ],
  [
    { id: '#5138', cli: 'Corralón Este', monto: '$1.120.000', quien: 'RD', alta: true },
    { id: '#5137', cli: 'Kiosco 24hs', monto: '$18.900', quien: 'MF', alta: false },
  ],
  [{ id: '#5130', cli: 'Almacén Central', monto: '$402.000', quien: 'CI', alta: false }],
  [{ id: '#5122', cli: 'Mayorista Oeste', monto: '$860.400', quien: 'LO', alta: false }],
]

export function PanelKanban() {
  return (
    <Lienzo fondo={GRIS}>
      {/* ── Barra superior ── */}
      <g data-parte="barra">
        <rect width={720} height={46} fill="#FFFFFF" />
        <g data-item>
          <rect x={28} y={15} width={17} height={17} rx={5} fill={INDIGO} />
          <rect x={32} y={20} width={9} height={2} rx={1} fill="#FFF" />
          <rect x={32} y={24} width={6} height={2} rx={1} fill="#FFF" opacity={0.7} />
          <text x={54} y={28} fontSize={12.5} fontWeight={700} fill={TINTA}>
            Pedidos
          </text>
        </g>

        {['Tablero', 'Lista', 'Calendario'].map((t, i) => (
          <g key={t} data-item>
            <rect
              x={132 + i * 68}
              y={13}
              width={62}
              height={20}
              rx={5}
              fill={i === 0 ? '#EEF2FF' : 'transparent'}
            />
            <text
              x={163 + i * 68}
              y={27}
              fontSize={9}
              fontWeight={i === 0 ? 600 : 400}
              fill={i === 0 ? INDIGO : TENUE}
              textAnchor="middle"
            >
              {t}
            </text>
          </g>
        ))}

        {/* Los avatares del equipo: dicen que el sistema es
            multiusuario sin necesidad de explicarlo. */}
        <g data-item>
          {['MF', 'LO', 'RD', 'CI'].map((ini, i) => (
            <g key={ini}>
              <circle cx={556 + i * 20} cy={23} r={9.5} fill="#FFF" />
              <circle cx={556 + i * 20} cy={23} r={9.5} fill={['#C7D2FE', '#FDE68A', '#BBF7D0', '#FBCFE8'][i]} />
              <text
                x={556 + i * 20}
                y={26.5}
                fontSize={7.5}
                fontWeight={700}
                fill="#3F3F46"
                textAnchor="middle"
              >
                {ini}
              </text>
            </g>
          ))}
          <rect x={648} y={13} width={44} height={20} rx={5} fill={INDIGO} />
          <text x={670} y={27} fontSize={9} fontWeight={600} fill="#FFF" textAnchor="middle">
            Nuevo
          </text>
        </g>
        <rect y={46} width={720} height={1} fill={LINEA} />
      </g>

      {/* ── Filtros aplicados ── */}
      <g data-parte="filtros">
        <g data-item>
          <rect x={28} y={60} width={92} height={22} rx={11} fill="#EEF2FF" />
          <text x={40} y={74.5} fontSize={8.5} fill={INDIGO}>
            Esta semana
          </text>
          <path d="M107 68l4.5 4.5m0-4.5L107 72.5" stroke="#A5B4FC" strokeWidth={1.2} strokeLinecap="round" />
        </g>
        <g data-item>
          <rect x={126} y={60} width={80} height={22} rx={11} fill="#EEF2FF" />
          <text x={138} y={74.5} fontSize={8.5} fill={INDIGO}>
            Sin retiro
          </text>
          <path d="M193 68l4.5 4.5m0-4.5L193 72.5" stroke="#A5B4FC" strokeWidth={1.2} strokeLinecap="round" />
        </g>
        <text x={218} y={74.5} fontSize={8.5} fill={TENUE}>
          22 de 148 pedidos
        </text>

        <g data-item>
          <rect x={598} y={60} width={94} height={22} rx={5} fill="#FFFFFF" stroke="#E2E5EA" />
          <text x={610} y={74.5} fontSize={8.5} fill={TENUE}>
            Agrupar por
          </text>
          <path d="M678 70l3 3 3-3" fill="none" stroke={TENUE} strokeWidth={1.2} strokeLinecap="round" />
        </g>
      </g>

      {/* ── Las columnas ── */}
      <g data-parte="columnas">
        {COLUMNAS.map((c, i) => (
          <g key={c.t} data-item>
            <rect x={28 + i * 168} y={96} width={156} height={318} rx={8} fill="#EAECF0" opacity={0.7} />
            <circle cx={44 + i * 168} cy={114} r={3.5} fill={c.color} />
            <text x={54 + i * 168} y={117.5} fontSize={9.5} fontWeight={600} fill={TINTA}>
              {c.t}
            </text>
            <rect x={152 + i * 168} y={107} width={20} height={15} rx={7.5} fill="#DCDFE4" />
            <text
              x={162 + i * 168}
              y={117.5}
              fontSize={8}
              fontWeight={600}
              fill="#5B6472"
              textAnchor="middle"
            >
              {c.n}
            </text>
          </g>
        ))}
      </g>

      {/* ── Las tarjetas ── */}
      <g data-parte="tarjetas">
        {TARJETAS.map((col, ci) =>
          col.map((t, ti) => (
            <g key={t.id} data-item>
              <rect
                x={38 + ci * 168}
                y={132 + ti * 82}
                width={136}
                height={70}
                rx={6}
                fill="#FFFFFF"
                filter="url(#sombraCard)"
              />
              {/* Franja del estado, del color de su columna. */}
              <rect
                x={38 + ci * 168}
                y={132 + ti * 82}
                width={3}
                height={70}
                rx={1.5}
                fill={COLUMNAS[ci]!.color}
              />

              <text x={50 + ci * 168} y={148 + ti * 82} fontSize={9} fontWeight={700} fill={TINTA}>
                {t.id}
              </text>
              {t.alta ? (
                <>
                  <rect x={82 + ci * 168} y={139 + ti * 82} width={34} height={13} rx={6.5} fill="#FEF2F2" />
                  <text
                    x={99 + ci * 168}
                    y={148.5 + ti * 82}
                    fontSize={7}
                    fontWeight={700}
                    fill="#DC2626"
                    textAnchor="middle"
                  >
                    Urgente
                  </text>
                </>
              ) : null}

              <text x={50 + ci * 168} y={165 + ti * 82} fontSize={8.5} fill={TENUE}>
                {t.cli.length > 18 ? `${t.cli.slice(0, 17)}…` : t.cli}
              </text>
              <text x={50 + ci * 168} y={182 + ti * 82} fontSize={10} fontWeight={700} fill={TINTA}>
                {t.monto}
              </text>

              {/* Quién lo tiene asignado. */}
              <circle cx={160 + ci * 168} cy={178 + ti * 82} r={8} fill="#E4E7EC" />
              <text
                x={160 + ci * 168}
                y={181 + ti * 82}
                fontSize={7}
                fontWeight={700}
                fill="#5B6472"
                textAnchor="middle"
              >
                {t.quien}
              </text>
            </g>
          )),
        )}
      </g>

      {/* ── Resumen al pie ── */}
      <g data-parte="resumen">
        <rect y={422} width={720} height={38} fill="#FFFFFF" />
        {[
          { t: 'Total de la semana', v: '$4.286.400' },
          { t: 'Promedio', v: '$194.836' },
          { t: 'Pendientes de despacho', v: '13' },
        ].map((r, i) => (
          <g key={r.t} data-item>
            <text x={28 + i * 200} y={444} fontSize={8.5} fill={TENUE}>
              {r.t}
            </text>
            <text x={28 + i * 200 + (i === 2 ? 122 : 102)} y={444} fontSize={8.5} fontWeight={700} fill={TINTA}>
              {r.v}
            </text>
          </g>
        ))}
      </g>
    </Lienzo>
  )
}
