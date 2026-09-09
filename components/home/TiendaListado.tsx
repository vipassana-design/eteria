import { Foto, Lienzo, LINEA, TENUE, TINTA } from './LienzoMockup'

/** Ecommerce: el listado de categoría con filtros.
 *
 *  La landing de ecommerce muestra la ficha de un producto; acá va el
 *  paso anterior del flujo, que es donde se ve el catálogo funcionando:
 *  filtros aplicados, orden, grilla con precios y estados, y paginado.
 *
 *  El lienzo se aprovecha entero: la columna de filtros baja hasta el
 *  pie con color, material y valoración, y la grilla arranca después de
 *  un banner de campaña. Antes los filtros terminaban en y=282 y las
 *  cards a 310, así que quedaba una franja blanca de 150px cruzando
 *  todo el ancho del mockup.
 *
 *  Partes: barra → banner → filtros → grilla → paginado → carrito.
 */

const CORAL = '#C97B5A'
const VERDE = '#4F9E7F'
const ROJO = '#C9503F'

const PRODUCTOS = [
  { foto: '/mockups/tienda-prod-1.webp', nombre: 'Camisa oversize', precio: '$62.400', antes: '', badge: '', stock: '' },
  { foto: '/mockups/tienda-prod-2.webp', nombre: 'Sweater trenzado', precio: '$74.900', antes: '$93.600', badge: '-20%', stock: '' },
  { foto: '/mockups/tienda-prod-3.webp', nombre: 'Blazer de lana', precio: '$128.000', antes: '', badge: 'Nuevo', stock: '' },
  { foto: '/mockups/tienda-prod-4.webp', nombre: 'Remera de algodón', precio: '$28.900', antes: '', badge: '', stock: 'Últimas 3' },
]

/** Swatches de color. El tildado es el que está aplicado. */
const COLORES = [
  { hex: '#1B1733', on: false },
  { hex: '#C9B8A8', on: true },
  { hex: '#8FA5B8', on: false },
  { hex: '#B5654F', on: false },
  { hex: '#7C8A6B', on: false },
]

const MATERIALES = [
  { t: 'Lino', n: 18, on: true },
  { t: 'Algodón', n: 26, on: false },
  { t: 'Lana', n: 11, on: false },
]

const TALLES = [
  { t: 'S', n: 12, on: false },
  { t: 'M', n: 24, on: true },
  { t: 'L', n: 18, on: false },
  { t: 'XL', n: 7, on: false },
]

export function TiendaListado() {
  return (
    <Lienzo>
      {/* ── Barra: logo, navegación con el rubro activo, buscador ── */}
      <g data-parte="barra">
        <rect width={720} height={46} fill="#FFFFFF" />
        <text x={32} y={29} fontSize={15} fontWeight={700} fill={TINTA} letterSpacing={-0.3}>
          ATELIER
        </text>

        {['Mujer', 'Hombre', 'Accesorios'].map((t, i) => (
          <g key={t} data-item>
            <text
              x={124 + i * 66}
              y={28}
              fontSize={10}
              fontWeight={i === 0 ? 600 : 400}
              fill={i === 0 ? TINTA : TENUE}
            >
              {t}
            </text>
            {/* Subrayado del rubro activo. */}
            {i === 0 && <rect x={124} y={34} width={30} height={2} rx={1} fill={CORAL} />}
          </g>
        ))}
        <text x={322} y={28} fontSize={10} fill={ROJO}>
          Sale
        </text>

        {/* Buscador con placeholder: da la pista de que el catálogo es grande. */}
        <g data-item>
        <rect x={430} y={12} width={168} height={23} rx={11.5} fill="#F4F2FA" />
        <circle cx={445} cy={23.5} r={4} fill="none" stroke={TENUE} strokeWidth={1.4} />
        <path d="M448 26.5l3.5 3.5" stroke={TENUE} strokeWidth={1.4} strokeLinecap="round" />
        <text x={456} y={27} fontSize={9.5} fill={TENUE}>
          Buscar productos
        </text>
        </g>

        {/* Cuenta y carrito. */}
        <g data-item>
        <circle cx={624} cy={23} r={9} fill="#F2EFFB" />
        <circle cx={624} cy={20.5} r={2.6} fill="none" stroke="#7C3AED" strokeWidth={1.3} />
        <path
          d="M620 27.5c0-2.2 1.8-3.4 4-3.4s4 1.2 4 3.4"
          fill="none"
          stroke="#7C3AED"
          strokeWidth={1.3}
        />
        <path
          d="M659 17h11l-1.4 9h-8.2L659 17Z"
          fill="none"
          stroke={TINTA}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        </g>
        <rect y={46} width={720} height={1} fill={LINEA} />
      </g>

      {/* ── Filtros: columna izquierda con lo aplicado a la vista ── */}
      <g data-parte="filtros">
        <text x={32} y={74} fontSize={11.5} fontWeight={700} fill={TINTA}>
          Filtros
        </text>
        <text x={148} y={74} fontSize={9} fill={CORAL}>
          Limpiar
        </text>

        {/* Chips de lo ya aplicado: muestran el filtrado en uso, no solo
            que el control existe. */}
        {[
          { t: 'Lino', x: 32, w: 50 },
          { t: 'Talle M', x: 88, w: 66 },
        ].map((c) => (
          <g key={c.t} data-item>
            <rect x={c.x} y={84} width={c.w} height={19} rx={9.5} fill="#F2EFFB" />
            <text x={c.x + 9} y={97} fontSize={8.5} fill="#6D28D9">
              {c.t}
            </text>
            <path
              d={`M${c.x + c.w - 13} 90.5l4.5 4.5m0-4.5l-4.5 4.5`}
              stroke="#9F7AEA"
              strokeWidth={1.2}
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Precio con el slider en una posición intermedia. */}
        <g data-item>
        <text x={32} y={128} fontSize={10} fontWeight={600} fill={TINTA}>
          Precio
        </text>
        <rect x={32} y={140} width={132} height={3} rx={1.5} fill="#E4E0EE" />
        <rect x={32} y={140} width={86} height={3} rx={1.5} fill={CORAL} />
        <circle cx={118} cy={141.5} r={5.5} fill="#FFFFFF" stroke={CORAL} strokeWidth={1.8} />
        <text x={32} y={158} fontSize={8.5} fill={TENUE}>
          $20.000
        </text>
        <text x={164} y={158} fontSize={8.5} fill={TENUE} textAnchor="end">
          $130.000
        </text>
        </g>

        {/* Talles con contador por opción: el detalle que delata un
            catálogo con datos detrás. */}
        <text x={32} y={184} fontSize={10} fontWeight={600} fill={TINTA}>
          Talle
        </text>
        {TALLES.map((o, i) => (
          <g key={o.t} data-item>
            <rect
              x={32}
              y={194 + i * 22}
              width={11}
              height={11}
              rx={2.5}
              fill={o.on ? CORAL : '#FFFFFF'}
              stroke={o.on ? CORAL : '#D8D3E4'}
              strokeWidth={1.3}
            />
            {o.on ? (
              <path
                d={`M35 ${199.5 + i * 22}l2.2 2.2 4-4.2`}
                fill="none"
                stroke="#FFF"
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            ) : null}
            <text x={52} y={203 + i * 22} fontSize={9.5} fill={o.on ? TINTA : TENUE}>
              {o.t}
            </text>
            <text x={164} y={203 + i * 22} fontSize={8.5} fill="#B4AEC6" textAnchor="end">
              {o.n}
            </text>
          </g>
        ))}

        {/* Color: los swatches son el filtro que toda tienda de ropa
            tiene, y el tildado muestra la selección en uso. */}
        <text x={32} y={306} fontSize={10} fontWeight={600} fill={TINTA}>
          Color
        </text>
        {COLORES.map((c, i) => (
          <g key={c.hex} data-item>
            <circle
              cx={40 + (i % 5) * 30}
              cy={324}
              r={8.5}
              fill={c.hex}
              stroke={c.on ? CORAL : '#E4E0EE'}
              strokeWidth={c.on ? 2 : 1}
            />
            {c.on ? (
              <circle cx={40 + (i % 5) * 30} cy={324} r={12} fill="none" stroke={CORAL} strokeWidth={1} />
            ) : null}
          </g>
        ))}

        {/* Material con contador, igual que los talles. */}
        <text x={32} y={362} fontSize={10} fontWeight={600} fill={TINTA}>
          Material
        </text>
        {MATERIALES.map((m, i) => (
          <g key={m.t} data-item>
            <rect
              x={32}
              y={372 + i * 22}
              width={11}
              height={11}
              rx={2.5}
              fill={m.on ? CORAL : '#FFFFFF'}
              stroke={m.on ? CORAL : '#D8D3E4'}
              strokeWidth={1.3}
            />
            {m.on ? (
              <path
                d={`M35 ${377.5 + i * 22}l2.2 2.2 4-4.2`}
                fill="none"
                stroke="#FFF"
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            ) : null}
            <text x={52} y={381 + i * 22} fontSize={9.5} fill={m.on ? TINTA : TENUE}>
              {m.t}
            </text>
            <text x={164} y={381 + i * 22} fontSize={8.5} fill="#B4AEC6" textAnchor="end">
              {m.n}
            </text>
          </g>
        ))}

        {/* Valoración: cierra la columna al pie con las estrellas, que
            es lo que ocupa el último tramo sin pedir otro control. */}
        <g data-item>
          <text x={32} y={444} fontSize={10} fontWeight={600} fill={TINTA}>
            Valoración
          </text>
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${94 + i * 15} 437l1.9 3.9 4.3.6-3.1 3 .7 4.3-3.8-2-3.8 2 .7-4.3-3.1-3 4.3-.6 1.9-3.9Z`}
              fill={i < 4 ? '#E8B54A' : '#E4E0EE'}
            />
          ))}
        </g>

        {/* Separador: define la columna sin encerrarla en una card.
            Llega hasta el pie porque la columna ahora también. */}
        <line x1={188} y1={62} x2={188} y2={438} stroke={LINEA} strokeWidth={1} />
      </g>

      {/* ── Banner de campaña: la franja que toda tienda pone sobre
             el catálogo. Ocupa el ancho de la grilla con la foto del
             hero a la derecha y el mensaje sobre el fondo oscuro. ── */}
      <g data-parte="banner">
        <clipPath id="recorteBanner">
          <rect x={212} y={62} width={472} height={92} rx={9} />
        </clipPath>
        <g clipPath="url(#recorteBanner)">
          <rect x={212} y={62} width={472} height={92} fill="#2E2440" />
          <Foto
            id="bannerTienda"
            href="/mockups/tienda-hero.webp"
            x={472}
            y={62}
            w={212}
            h={92}
            rx={0}
          />
          {/* El degradé funde la foto con el fondo del banner, si no el
              corte vertical parte la franja en dos bloques. */}
          <rect x={432} y={62} width={110} height={92} fill="url(#veloBanner)" />
        </g>
        <defs>
          <linearGradient id="veloBanner" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2E2440" stopOpacity={1} />
            <stop offset="100%" stopColor="#2E2440" stopOpacity={0} />
          </linearGradient>
        </defs>

        <g data-item>
          <text x={232} y={90} fontSize={7.5} fontWeight={600} fill={CORAL} letterSpacing={1.2}>
            NUEVA TEMPORADA
          </text>
          <text x={232} y={113} fontSize={17} fontWeight={700} fill="#FFFFFF" letterSpacing={-0.4}>
            Otoño en lino
          </text>
          <text x={232} y={130} fontSize={8.5} fill="#B9B0CC">
            Hasta 30% en prendas seleccionadas
          </text>
        </g>
        {/* Contador de la campaña: da la sensación de promoción viva
            en lugar de una franja decorativa. */}
        <g data-item>
          <rect x={556} y={122} width={108} height={20} rx={10} fill="#FFFFFF" opacity={0.14} />
          <text x={610} y={136} fontSize={8} fontWeight={600} fill="#FFFFFF" textAnchor="middle">
            Termina en 3 días
          </text>
        </g>
      </g>

      {/* ── Grilla: 4 productos con foto real, precio y estado ── */}
      <g data-parte="grilla">
        <g data-item>
        <text x={212} y={180} fontSize={13} fontWeight={700} fill={TINTA} letterSpacing={-0.2}>
          Mujer
        </text>
        <text x={262} y={180} fontSize={9.5} fill={TENUE}>
          61 productos
        </text>

        <rect x={578} y={168} width={106} height={22} rx={5} fill="#FFFFFF" stroke="#E2DEEE" />
        <text x={589} y={182} fontSize={9} fill={TENUE}>
          Más vendidos
        </text>
        <path
          d="M670 178l3.5 3.5 3.5-3.5"
          fill="none"
          stroke={TENUE}
          strokeWidth={1.3}
          strokeLinecap="round"
        />
        </g>

        {PRODUCTOS.map((p, i) => {
          const x = 212 + i * 120
          const anchoBadge = p.badge === 'Nuevo' ? 36 : 30
          return (
            <g key={p.nombre} data-item>
              {/* La sombra es lo que separa la card del fondo sin
                  necesidad de un borde duro. */}
              <rect
                x={x}
                y={200}
                width={108}
                height={236}
                rx={9}
                fill="#FFFFFF"
                filter="url(#sombraCard)"
              />

              <Foto id={`prodListado${i}`} href={p.foto} x={x + 6} y={206} w={96} h={116} rx={6} />

              {p.badge ? (
                <>
                  <rect
                    x={x + 12}
                    y={212}
                    width={anchoBadge}
                    height={16}
                    rx={8}
                    fill={p.badge === 'Nuevo' ? TINTA : ROJO}
                  />
                  <text
                    x={x + 12 + anchoBadge / 2}
                    y={223.5}
                    fontSize={8}
                    fontWeight={700}
                    fill="#FFF"
                    textAnchor="middle"
                  >
                    {p.badge}
                  </text>
                </>
              ) : null}

              {/* Favorito: estado que tienen todas las tiendas reales. */}
              <circle cx={x + 88} cy={220} r={9} fill="#FFFFFF" opacity={0.92} />
              <path
                d={`M${x + 88} 223.5c-3-2.2-5-3.8-5-5.8 0-1.5 1.2-2.5 2.5-2.5 1 0 1.9.5 2.5 1.4.6-.9 1.5-1.4 2.5-1.4 1.3 0 2.5 1 2.5 2.5 0 2-2 3.6-5 5.8Z`}
                fill={i === 1 ? CORAL : 'none'}
                stroke={i === 1 ? CORAL : '#B4AEC6'}
                strokeWidth={1.3}
              />

              <text x={x + 10} y={342} fontSize={10} fontWeight={600} fill={TINTA}>
                {p.nombre}
              </text>

              <text x={x + 10} y={366} fontSize={12.5} fontWeight={700} fill={TINTA}>
                {p.precio}
              </text>
              {p.antes ? (
                <text x={x + 10} y={384} fontSize={8.5} fill="#B4AEC6" textDecoration="line-through">
                  {p.antes}
                </text>
              ) : null}
              {p.stock ? (
                <text x={x + 10} y={384} fontSize={8.5} fontWeight={600} fill={ROJO}>
                  {p.stock}
                </text>
              ) : null}

              {/* Colores disponibles. */}
              {['#1B1733', '#C9B8A8', '#8FA5B8'].map((c, j) => (
                <circle
                  key={c}
                  cx={x + 14 + j * 13}
                  cy={404}
                  r={4.5}
                  fill={c}
                  stroke={j === 0 ? '#FFFFFF' : 'none'}
                  strokeWidth={1.4}
                />
              ))}
              <text x={x + 56} y={407} fontSize={7.5} fill="#B4AEC6">
                +2
              </text>
            </g>
          )
        })}
      </g>

      {/* ── Paginado: cierra el listado y sugiere que hay más ── */}
      <g data-parte="paginado">
        <text x={212} y={451} fontSize={9} fill={TENUE}>
          Mostrando 4 de 61
        </text>
        {['1', '2', '3', '…', '9'].map((n, i) => (
          <g key={n} data-item>
            <rect
              x={554 + i * 26}
              y={436}
              width={20}
              height={20}
              rx={4}
              fill={i === 0 ? TINTA : '#FFFFFF'}
              stroke={i === 0 ? 'none' : '#E2DEEE'}
            />
            <text
              x={564 + i * 26}
              y={450}
              fontSize={9}
              fontWeight={i === 0 ? 700 : 400}
              fill={i === 0 ? '#FFF' : TENUE}
              textAnchor="middle"
            >
              {n}
            </text>
          </g>
        ))}
      </g>

      {/* ── Carrito: el toast que confirma el agregado ──

          Va a la derecha, del lado del ícono del carrito: es de donde
          sale y es donde toda tienda lo pone. Antes iba abajo a la
          izquierda, en el hueco que dejaban los filtros; con la columna
          poblada ese hueco no existe más.

          A la altura de la grilla y no del banner: apoyado arriba
          tapaba la mitad de la franja de campaña, que es justo lo que
          el mockup acaba de presentar. */}
      <g data-parte="carrito">
        <rect
          x={476}
          y={218}
          width={208}
          height={58}
          rx={10}
          fill="#FFFFFF"
          filter="url(#sombraFlotante)"
        />
        <g data-item>
        <Foto id="carritoThumb" href="/mockups/tienda-carrito.webp" x={486} y={226} w={42} h={42} rx={6} />
        <circle cx={542} cy={238} r={7} fill="#EAF6EF" />
        <path
          d="M539 238l2.2 2.2 4.2-4.4"
          fill="none"
          stroke={VERDE}
          strokeWidth={1.8}
          strokeLinecap="round"
        />
        <text x={556} y={241} fontSize={9.5} fontWeight={600} fill={TINTA}>
          Agregado al carrito
        </text>
        <text x={539} y={259} fontSize={9} fill={TENUE}>
          Sweater trenzado
        </text>
        <text x={674} y={259} fontSize={10.5} fontWeight={700} fill={TINTA} textAnchor="end">
          $74.900
        </text>
        </g>

        {/* Contador del carrito, en la barra de arriba. */}
        <g data-item>
        <circle cx={670} cy={14} r={8} fill="#7C3AED" />
        <text x={670} y={17.5} fontSize={8.5} fontWeight={700} fill="#FFF" textAnchor="middle">
          1
        </text>
        </g>
      </g>
    </Lienzo>
  )
}
