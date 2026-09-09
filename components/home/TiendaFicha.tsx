import { ALTOS, Foto, Lienzo, LINEA, TENUE, TINTA } from './LienzoMockup'

/** Ecommerce: la ficha de un producto de tecnología.
 *
 *  Es la tercera pantalla del flujo de una tienda, distinta de las dos
 *  que ya hay: el hero muestra el listado con filtros y el carrusel de
 *  Soluciones muestra la grilla del catálogo. Acá va el detalle, que es
 *  donde se decide la compra.
 *
 *  Rubro tecnología —celulares, notebooks, componentes— a pedido del
 *  cliente. Paleta propia, azul frío: es el sitio de otro, no el
 *  nuestro.
 *
 *  Va en el lienzo alto de las cards de servicios (720×538): con el
 *  de 460 quedaban franjas del color de fondo arriba y abajo, porque
 *  la celda es más alta de proporción que la ventana del hero.
 *
 *  Partes: barra → galería → ficha → variantes → envío → especificaciones
 *  → relacionados.
 */

const AZUL = '#2563EB'
const AZUL_CLARO = '#EFF4FF'
const VERDE = '#0F8A5F'
const NARANJA = '#D97706'

const THUMBS = [
  '/mockups/tec-thumb-1.webp',
  '/mockups/tec-thumb-2.webp',
  '/mockups/tec-thumb-3.webp',
]

const CAPACIDADES = [
  { t: '128 GB', on: false },
  { t: '256 GB', on: true },
  { t: '512 GB', on: false },
]

/** Especificaciones del producto. Cuatro pares clave-valor: es el
 *  bloque que toda ficha tiene debajo de la compra, y da densidad sin
 *  necesitar más fotos. */
const ESPECIFICACIONES = [
  { k: 'Pantalla', v: '6,7" OLED 120 Hz' },
  { k: 'Procesador', v: 'Octa-core 3,2 GHz' },
  { k: 'Cámara', v: '50 + 12 + 10 MP' },
  { k: 'Batería', v: '5.000 mAh · 45 W' },
]

const RELACIONADOS = [
  { foto: '/mockups/tec-relacionado-1.webp', nombre: 'Notebook 14"', precio: '$1.240.000' },
  { foto: '/mockups/tec-relacionado-2.webp', nombre: 'Monitor 27"', precio: '$486.000' },
  { foto: '/mockups/tec-relacionado-3.webp', nombre: 'Teclado mecánico', precio: '$92.400' },
]

export function TiendaFicha() {
  return (
    <Lienzo alto={ALTOS.celda}>
      {/* ── Barra: categorías de tecnología y buscador ── */}
      <g data-parte="barra">
        <rect width={720} height={44} fill="#FFFFFF" />
        <g data-item>
          <rect x={32} y={14} width={16} height={16} rx={4} fill={AZUL} />
          <path d="M37 22h6m-3-3v6" stroke="#FFF" strokeWidth={1.6} strokeLinecap="round" />
          <text x={56} y={27} fontSize={14} fontWeight={700} fill={TINTA} letterSpacing={-0.3}>
            NEXO
          </text>
        </g>

        {['Celulares', 'Notebooks', 'Componentes', 'Audio'].map((t, i) => (
          <g key={t} data-item>
            <text
              x={132 + i * 74}
              y={26}
              fontSize={9.5}
              fontWeight={i === 0 ? 600 : 400}
              fill={i === 0 ? TINTA : TENUE}
            >
              {t}
            </text>
            {i === 0 ? <rect x={132} y={32} width={48} height={2} rx={1} fill={AZUL} /> : null}
          </g>
        ))}

        <g data-item>
          <rect x={452} y={11} width={140} height={22} rx={11} fill="#F1F4F9" />
          <circle cx={467} cy={22} r={4} fill="none" stroke={TENUE} strokeWidth={1.4} />
          <path d="M470 25l3.5 3.5" stroke={TENUE} strokeWidth={1.4} strokeLinecap="round" />
          <text x={478} y={25.5} fontSize={9} fill={TENUE}>
            Buscar
          </text>
        </g>

        <g data-item>
          <path
            d="M618 15h10l-1.3 8.5h-7.4L618 15Z"
            fill="none"
            stroke={TINTA}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <circle cx={664} cy={20} r={8} fill="#F1F4F9" />
          <circle cx={664} cy={17.8} r={2.4} fill="none" stroke={AZUL} strokeWidth={1.3} />
          <path
            d="M660.5 24.5c0-2 1.6-3 3.5-3s3.5 1 3.5 3"
            fill="none"
            stroke={AZUL}
            strokeWidth={1.3}
          />
        </g>
        <rect y={44} width={720} height={1} fill={LINEA} />
      </g>

      {/* ── Galería: foto grande y tres miniaturas ── */}
      <g data-parte="galeria">
        {/* Migas: ubica la ficha dentro del catálogo. */}
        <text x={32} y={66} fontSize={9} fill={TENUE}>
          Celulares / Gama alta / Aurora X9 Pro
        </text>

        <rect x={32} y={78} width={272} height={318} rx={10} fill="#F6F8FC" />
        <Foto id="fichaHero" href="/mockups/tec-hero.webp" x={32} y={78} w={272} h={318} rx={10} />

        {/* Badge de stock sobre la foto, en la zona oscura de la madera. */}
        <g data-item>
          <rect x={46} y={92} width={78} height={20} rx={10} fill="#0B1220" opacity={0.82} />
          <circle cx={58} cy={102} r={3} fill="#4ADE80" />
          <text x={67} y={105.5} fontSize={8.5} fontWeight={600} fill="#FFF">
            En stock
          </text>
        </g>

        {THUMBS.map((src, i) => (
          <g key={src} data-item>
            <Foto id={`fichaThumb${i}`} href={src} x={32 + i * 62} y={408} w={54} h={54} rx={7} />
            <rect
              x={32 + i * 62}
              y={408}
              width={54}
              height={54}
              rx={7}
              fill="none"
              stroke={i === 0 ? AZUL : '#DFE5EE'}
              strokeWidth={i === 0 ? 2 : 1}
            />
          </g>
        ))}
      </g>

      {/* ── Ficha: nombre, reputación, precio y financiación ── */}
      <g data-parte="ficha">
        <text x={330} y={92} fontSize={19} fontWeight={700} fill={TINTA} letterSpacing={-0.4}>
          Aurora X9 Pro
        </text>
        <text x={330} y={110} fontSize={9.5} fill={TENUE}>
          256 GB · 8 GB RAM · Titanio
        </text>

        {/* Reputación: cinco estrellas y el conteo de opiniones. */}
        <g data-item>
          {/* Cinco estrellas, cuatro llenas. El path es una estrella de
              10px dibujada en el origen y movida con `translate`: con
              el trazado calculado en cada posición el código se vuelve
              ilegible y es donde se cuelan los errores. */}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              transform={`translate(${332 + i * 13} 122)`}
              d="M5 0l1.6 3.2 3.4.5-2.5 2.4.6 3.4L5 7.9 1.9 9.5l.6-3.4L0 3.7l3.4-.5L5 0Z"
              fill={i < 4 ? NARANJA : '#DFE5EE'}
            />
          ))}
          <text x={404} y={131} fontSize={9} fill={TENUE}>
            4,6 · 218 opiniones
          </text>
        </g>

        <g data-item>
          <text x={330} y={168} fontSize={26} fontWeight={700} fill={TINTA} letterSpacing={-0.6}>
            $1.489.000
          </text>
          <text x={330} y={186} fontSize={9.5} fill="#9AA4B2" textDecoration="line-through">
            $1.749.000
          </text>
          <rect x={414} y={172} width={44} height={18} rx={9} fill="#FEF2F2" />
          <text x={436} y={184.5} fontSize={8.5} fontWeight={700} fill="#DC2626" textAnchor="middle">
            -15%
          </text>
        </g>

        {/* Financiación: es lo que más pesa en una compra de este monto. */}
        <g data-item>
          <rect x={330} y={200} width={356} height={30} rx={7} fill={AZUL_CLARO} />
          <text x={344} y={219} fontSize={10} fill={AZUL}>
            12 cuotas de
          </text>
          <text x={414} y={219} fontSize={11} fontWeight={700} fill={AZUL}>
            $124.083
          </text>
          <text x={484} y={219} fontSize={9.5} fill={AZUL}>
            sin interés
          </text>
        </g>
      </g>

      {/* ── Variantes: capacidad y color ── */}
      <g data-parte="variantes">
        <text x={330} y={252} fontSize={10} fontWeight={600} fill={TINTA}>
          Capacidad
        </text>
        {CAPACIDADES.map((c, i) => (
          <g key={c.t} data-item>
            <rect
              x={330 + i * 62}
              y={260}
              width={56}
              height={30}
              rx={7}
              fill={c.on ? TINTA : '#FFFFFF'}
              stroke={c.on ? 'none' : '#DFE5EE'}
              strokeWidth={1.3}
            />
            <text
              x={358 + i * 62}
              y={279}
              fontSize={10}
              fontWeight={600}
              fill={c.on ? '#FFF' : TINTA}
              textAnchor="middle"
            >
              {c.t}
            </text>
          </g>
        ))}

        <text x={528} y={252} fontSize={10} fontWeight={600} fill={TINTA}>
          Color
        </text>
        {['#3F4854', '#C8CDD6', '#1E3A5F'].map((c, i) => (
          <g key={c} data-item>
            <circle
              cx={540 + i * 30}
              cy={275}
              r={11}
              fill={c}
              stroke={i === 0 ? AZUL : 'none'}
              strokeWidth={2}
            />
          </g>
        ))}
      </g>

      {/* ── Envío y compra ── */}
      <g data-parte="envio">
        <rect x={330} y={302} width={356} height={44} rx={8} fill="#F6F8FC" />
        <g data-item>
          <path
            d="M346 322h10v8h-10v-8Zm10 2h5l3 3v3h-8v-6Z"
            fill="none"
            stroke={VERDE}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <text x={374} y={319} fontSize={10} fontWeight={600} fill={TINTA}>
            Llega gratis el jueves 12
          </text>
          <text x={374} y={333} fontSize={9} fill={TENUE}>
            Retiro en sucursal disponible hoy
          </text>
        </g>

        <g data-item>
          <rect x={330} y={358} width={230} height={36} rx={8} fill={AZUL} />
          <text x={445} y={381} fontSize={11.5} fontWeight={600} fill="#FFF" textAnchor="middle">
            Comprar ahora
          </text>
          <rect
            x={570}
            y={358}
            width={116}
            height={36}
            rx={8}
            fill="#FFFFFF"
            stroke={AZUL}
            strokeWidth={1.4}
          />
          <text x={628} y={381} fontSize={11} fontWeight={600} fill={AZUL} textAnchor="middle">
            Al carrito
          </text>
        </g>
      </g>

      {/* ── Especificaciones: es lo que hay debajo del bloque de
             compra en cualquier ficha, y llena la franja que el lienzo
             alto deja libre entre los botones y el pie. ── */}
      <g data-parte="especificaciones">
        <line x1={330} y1={412} x2={688} y2={412} stroke={LINEA} strokeWidth={1} />
        <text x={330} y={434} fontSize={10} fontWeight={600} fill={TINTA}>
          Especificaciones
        </text>
        {ESPECIFICACIONES.map((e, i) => (
          <g key={e.k} data-item>
            <text x={330 + (i % 2) * 184} y={456 + Math.floor(i / 2) * 20} fontSize={8.5} fill={TENUE}>
              {e.k}
            </text>
            <text
              x={330 + (i % 2) * 184 + 74}
              y={456 + Math.floor(i / 2) * 20}
              fontSize={8.5}
              fontWeight={600}
              fill={TINTA}
            >
              {e.v}
            </text>
          </g>
        ))}
      </g>

      {/* ── Relacionados: cierra la ficha con más catálogo.

             Van a todo el ancho al pie, debajo de la galería y de la
             columna de compra: con el lienzo alto hay lugar para una
             fila completa en lugar de tres miniaturas apretadas. ── */}
      <g data-parte="relacionados">
        <rect y={508} width={720} height={30} fill="#F6F8FC" />
        <text x={32} y={527} fontSize={9} fontWeight={600} fill={TINTA}>
          Quien vio esto también vio
        </text>
        {RELACIONADOS.map((r, i) => (
          <g key={r.nombre} data-item>
            <Foto
              id={`fichaRel${i}`}
              href={r.foto}
              x={186 + i * 178}
              y={512}
              w={30}
              h={22}
              rx={3}
            />
            <text x={222 + i * 178} y={521} fontSize={8} fill={TINTA}>
              {r.nombre.length > 15 ? `${r.nombre.slice(0, 14)}…` : r.nombre}
            </text>
            <text x={222 + i * 178} y={532} fontSize={8} fontWeight={600} fill={AZUL}>
              {r.precio}
            </text>
          </g>
        ))}
      </g>
    </Lienzo>
  )
}
