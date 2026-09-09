/** Pantallas de los heros de landing, descompuestas en partes.
 *
 *  Una por landing, distintas de las de la home: acá el mockup es el
 *  protagonista del hero, así que cada pantalla muestra una vista más
 *  específica del servicio y tiene seis partes en vez de cuatro, para
 *  que el armado dure más.
 *
 *  Misma caja de 720×460 y la misma paleta clara que el resto.
 *
 *  Los hitos de la línea de estado del detalle de pedido llevan
 *  `data-tras-trazo`: se encienden a medida que la línea los alcanza,
 *  no con el stagger general. Sin eso aparecían antes de que la línea
 *  llegara a ellos.
 */

const PAPEL = '#F7F6FB'
const TINTA = '#1B1733'
const TENUE = '#8E88A8'

function Lienzo({ children, fondo = PAPEL }: { children: React.ReactNode; fondo?: string }) {
  return (
    <svg
      viewBox="0 0 720 460"
      className="size-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect width={720} height={460} fill={fondo} />
      {children}
    </svg>
  )
}

/** Ecommerce: la ficha de producto y el checkout, que es donde se
 *  decide la venta. Distinta del catálogo que muestra la home.
 *
 *  Partes: barra → galería → ficha → variantes → envío → resumen. */
export function FichaProducto() {
  const talles = ['S', 'M', 'L', 'XL']
  const pasos = ['Carrito', 'Envío', 'Pago']

  return (
    <Lienzo>
      <g data-parte="barra">
        <rect width={720} height={50} fill="#FFFFFF" />
        <text x={36} y={31} fontSize={16} fontWeight={700} fill={TINTA} letterSpacing={-0.3}>
          ATELIER
        </text>
        {/* Migas de pan: ubica la pantalla dentro del sitio. */}
        <text x={150} y={31} fontSize={10.5} fill={TENUE}>
          Mujer / Camperas / Campera de lino
        </text>
        <circle cx={678} cy={25} r={12} fill="#F2EFFB" />
        <path
          d="M673 21h10l-1.2 8h-7.6L673 21Z"
          fill="none"
          stroke="#7C3AED"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <rect y={50} width={720} height={1} fill="#E8E5F0" />
      </g>

      {/* Galería: miniatura grande y tres chicas al costado. */}
      <g data-parte="galeria">
        <rect x={36} y={74} width={244} height={244} rx={8} fill="#E8D5C4" />
        <g transform="translate(96 122) scale(1.05)">
          <path
            d="M44 6 26 14 8 30l14 18 12-9v67c0 3 2 5 5 5h62c3 0 5-2 5-5V39l12 9 14-18-18-16L96 6 70 18 44 6Z"
            fill="#C97B5A"
            opacity={0.72}
          />
        </g>
        {[0, 1, 2].map((i) => (
          <g key={i} data-item>
            <rect
              x={36 + i * 62}
              y={330}
              width={54}
              height={54}
              rx={6}
              fill={i === 0 ? '#E8D5C4' : '#EFE9E3'}
              stroke={i === 0 ? '#C97B5A' : 'none'}
              strokeWidth={1.6}
            />
            <g transform={`translate(${45 + i * 62} 342) scale(0.26)`}>
              <path
                d="M44 6 26 14 8 30l14 18 12-9v67c0 3 2 5 5 5h62c3 0 5-2 5-5V39l12 9 14-18-18-16L96 6 70 18 44 6Z"
                fill="#C97B5A"
                opacity={0.5}
              />
            </g>
          </g>
        ))}
      </g>

      {/* Ficha: nombre, precio y stock. */}
      <g data-parte="ficha">
        <text x={310} y={98} fontSize={22} fontWeight={700} fill={TINTA} letterSpacing={-0.5}>
          Campera de lino
        </text>
        <text x={310} y={128} fontSize={24} fontWeight={700} fill="#C97B5A">
          $86.400
        </text>
        <text x={412} y={128} fontSize={12} fill={TENUE} textDecoration="line-through">
          $108.000
        </text>
        <rect x={484} y={112} width={54} height={20} rx={10} fill="#EAF6EF" />
        <text x={511} y={126} fontSize={9.5} fontWeight={600} fill="#3F8F63" textAnchor="middle">
          -20%
        </text>
        <circle cx={316} cy={148} r={3.5} fill="#4F9E7F" />
        <text x={328} y={152} fontSize={10.5} fill="#4F9E7F">
          8 en stock
        </text>
      </g>

      {/* Variantes: talles seleccionables. */}
      <g data-parte="variantes">
        <text x={310} y={186} fontSize={11} fontWeight={600} fill={TINTA}>
          Talle
        </text>
        {talles.map((t, i) => (
          <g key={t} data-item>
            <rect
              x={310 + i * 48}
              y={196}
              width={40}
              height={38}
              rx={6}
              fill={i === 1 ? '#1B1733' : '#FFFFFF'}
              stroke={i === 1 ? 'none' : '#DDD8E8'}
              strokeWidth={1.3}
            />
            <text
              x={330 + i * 48}
              y={221}
              fontSize={12}
              fontWeight={600}
              fill={i === 1 ? '#FFFFFF' : TINTA}
              textAnchor="middle"
            >
              {t}
            </text>
          </g>
        ))}
      </g>

      {/* Envío: cotización por código postal. */}
      <g data-parte="envio">
        <rect x={310} y={252} width={374} height={62} rx={8} fill="#FFFFFF" />
        <rect x={310} y={252} width={374} height={62} rx={8} fill="none" stroke="#E8E5F0" />
        <text x={328} y={274} fontSize={10.5} fill={TENUE}>
          Envío a CP 1425
        </text>
        <text x={328} y={296} fontSize={12} fontWeight={600} fill={TINTA}>
          Llega el jueves 12
        </text>
        <text x={666} y={296} fontSize={12} fontWeight={700} fill="#4F9E7F" textAnchor="end">
          Gratis
        </text>
      </g>

      {/* Resumen: el checkout en tres pasos. */}
      <g data-parte="resumen">
        <rect x={310} y={330} width={374} height={94} rx={8} fill="#F2EFFB" />
        {pasos.map((paso, i) => (
          <g key={paso} data-item>
            <circle
              cx={334 + i * 118}
              cy={356}
              r={9}
              fill={i === 0 ? '#7C3AED' : '#FFFFFF'}
              stroke={i === 0 ? 'none' : '#D6CFE8'}
              strokeWidth={1.3}
            />
            <text
              x={334 + i * 118}
              y={360}
              fontSize={9}
              fontWeight={700}
              fill={i === 0 ? '#FFF' : TENUE}
              textAnchor="middle"
            >
              {i + 1}
            </text>
            <text x={350 + i * 118} y={360} fontSize={10.5} fill={i === 0 ? TINTA : TENUE}>
              {paso}
            </text>
          </g>
        ))}
        <rect x={328} y={380} width={338} height={32} rx={16} fill="#1B1733" />
        <text x={497} y={400} fontSize={11.5} fontWeight={600} fill="#FFF" textAnchor="middle">
          Finalizar compra
        </text>
      </g>
    </Lienzo>
  )
}

/** Sitios institucionales: el panel de contenido, que es el argumento
 *  de la landing (el equipo actualiza sin depender de nadie).
 *
 *  Partes: barra → árbol → editor → SEO → medios → publicar. */
export function PanelContenido() {
  const secciones = ['Inicio', 'Compañía', 'Servicios', 'Novedades', 'Contacto']

  return (
    <Lienzo fondo="#FBFAFE">
      <g data-parte="barra">
        <rect width={720} height={48} fill="#0B3A5C" />
        <rect x={30} y={17} width={22} height={14} rx={2} fill="#4FA3D9" />
        <text x={62} y={30} fontSize={13} fontWeight={700} fill="#FFFFFF">
          Norvex
        </text>
        <text x={150} y={30} fontSize={10.5} fill="#B3D2E6">
          Panel de contenido
        </text>
        <circle cx={684} cy={24} r={11} fill="#1E5B85" />
        <text x={684} y={28} fontSize={9} fontWeight={600} fill="#B3D2E6" textAnchor="middle">
          LD
        </text>
      </g>

      {/* Árbol de secciones del sitio. */}
      <g data-parte="arbol">
        <rect y={48} width={182} height={412} fill="#F4F7FA" />
        <text x={24} y={78} fontSize={10} fontWeight={600} fill="#6E8698">
          Secciones
        </text>
        {secciones.map((s, i) => (
          <g key={s} data-item>
            {i === 3 && <rect x={12} y={90 + i * 32} width={158} height={26} rx={5} fill="#E1EDF6" />}
            <rect
              x={24}
              y={99 + i * 32}
              width={8}
              height={8}
              rx={2}
              fill={i === 3 ? '#4FA3D9' : '#C0D2DE'}
            />
            <text x={42} y={107 + i * 32} fontSize={11} fill={i === 3 ? '#0B3A5C' : '#6E8698'}>
              {s}
            </text>
          </g>
        ))}
      </g>

      {/* Editor de texto con barra de formato. */}
      <g data-parte="editor">
        <text x={206} y={78} fontSize={15} fontWeight={700} fill="#0B3A5C" letterSpacing={-0.3}>
          Novedades
        </text>
        <rect x={206} y={90} width={324} height={30} rx={5} fill="#FFFFFF" />
        <rect x={206} y={90} width={324} height={30} rx={5} fill="none" stroke="#E2EBF2" />
        {['B', 'i', 'U'].map((b, i) => (
          <text
            key={b}
            x={222 + i * 24}
            y={110}
            fontSize={11}
            fontWeight={i === 0 ? 700 : 400}
            fontStyle={i === 1 ? 'italic' : 'normal'}
            fill="#6E8698"
          >
            {b}
          </text>
        ))}
        <rect x={294} y={98} width={1} height={14} fill="#E2EBF2" />
        <text x={310} y={110} fontSize={10} fill="#6E8698">
          H2
        </text>
        <text x={338} y={110} fontSize={10} fill="#6E8698">
          Enlace
        </text>

        <rect x={206} y={130} width={324} height={112} rx={5} fill="#FFFFFF" />
        <rect x={206} y={130} width={324} height={112} rx={5} fill="none" stroke="#E2EBF2" />
        <text x={222} y={154} fontSize={12} fontWeight={700} fill="#0B3A5C">
          Nueva planta en Rosario
        </text>
        {[286, 262, 300, 240].map((ancho, i) => (
          <rect
            key={i}
            data-item
            x={222}
            y={168 + i * 16}
            width={ancho}
            height={6}
            rx={3}
            fill="#DCE6EE"
          />
        ))}
      </g>

      {/* Panel de SEO con el largo de los campos. */}
      <g data-parte="seo">
        <rect x={548} y={90} width={148} height={152} rx={6} fill="#FFFFFF" />
        <rect x={548} y={90} width={148} height={152} rx={6} fill="none" stroke="#E2EBF2" />
        <text x={564} y={112} fontSize={10} fontWeight={600} fill="#0B3A5C">
          Búsqueda
        </text>
        <text x={564} y={132} fontSize={8.5} fill="#6E8698">
          Título
        </text>
        <rect x={564} y={138} width={116} height={5} rx={2.5} fill="#4FA3D9" />
        <text x={564} y={160} fontSize={8.5} fill="#6E8698">
          Descripción
        </text>
        <rect x={564} y={166} width={116} height={5} rx={2.5} fill="#DCE6EE" />
        <rect x={564} y={166} width={92} height={5} rx={2.5} fill="#4FA3D9" />
        <text x={564} y={190} fontSize={8.5} fill="#6E8698">
          URL
        </text>
        <text x={564} y={204} fontSize={8} fill="#0B3A5C">
          /novedades/planta-rosario
        </text>
        <circle cx={570} cy={222} r={4} fill="#4F9E7F" />
        <text x={582} y={225} fontSize={8.5} fill="#4F9E7F">
          Listo para indexar
        </text>
      </g>

      {/* Biblioteca de medios. */}
      <g data-parte="medios">
        <text x={206} y={272} fontSize={11} fontWeight={600} fill="#0B3A5C">
          Imágenes
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} data-item>
            <rect x={206 + i * 68} y={282} width={58} height={48} rx={5} fill="#DDE4F0" />
            <rect x={214 + i * 68} y={302} width={16} height={22} fill="#B9C6DC" />
            <rect x={234 + i * 68} y={294} width={18} height={30} fill="#A6B6D0" />
          </g>
        ))}
        <rect x={546 + 68} y={282} width={58} height={48} rx={5} fill="#F4F7FA" stroke="#C9DEEC" strokeDasharray="4 3" />
        <path d="M643 306h14M650 299v14" stroke="#4FA3D9" strokeWidth={1.6} strokeLinecap="round" />
      </g>

      {/* Barra de publicación. */}
      <g data-parte="publicar">
        <rect y={352} width={720} height={1} fill="#E2EBF2" />
        <circle cx={222} cy={392} r={4} fill="#C99A5A" />
        <text x={236} y={396} fontSize={10.5} fill="#6E8698">
          Borrador · guardado hace 2 minutos
        </text>
        <rect x={478} y={376} width={94} height={32} rx={5} fill="#FFFFFF" stroke="#C9DEEC" />
        <text x={525} y={396} fontSize={10.5} fill="#0B3A5C" textAnchor="middle">
          Previsualizar
        </text>
        <rect x={584} y={376} width={106} height={32} rx={5} fill="#0B3A5C" />
        <text x={637} y={396} fontSize={10.5} fontWeight={600} fill="#FFF" textAnchor="middle">
          Publicar
        </text>
      </g>
    </Lienzo>
  )
}

/** Software a medida: el detalle de un pedido con su integración, que
 *  es lo que la landing promete (conectado con lo que ya existe).
 *
 *  Partes: barra → cabecera → línea de tiempo → integraciones →
 *  actividad → acciones. */
export function DetallePedido() {
  const hitos = [
    { t: 'Pedido creado', h: '09:42', ok: true },
    { t: 'Stock reservado', h: '09:42', ok: true },
    { t: 'Factura emitida', h: '09:43', ok: true },
    { t: 'Enviado a logística', h: '—', ok: false },
  ]
  const sistemas = [
    { n: 'Facturación', e: 'Sincronizado', c: '#4F9E7F' },
    { n: 'Stock', e: 'Sincronizado', c: '#4F9E7F' },
    { n: 'Logística', e: 'Pendiente', c: '#C99A5A' },
  ]

  return (
    <Lienzo>
      <g data-parte="barra">
        <rect width={168} height={460} fill="#1B1733" />
        <circle cx={34} cy={32} r={10} fill="#8B5CF6" />
        <text x={52} y={37} fontSize={12.5} fontWeight={700} fill="#F4F2FF">
          Gestión
        </text>
        {['Resumen', 'Pedidos', 'Clientes', 'Integraciones'].map((s, i) => (
          <g key={s}>
            {i === 1 && <rect x={10} y={64 + i * 32} width={148} height={28} rx={6} fill="#2C2551" />}
            <rect
              x={24}
              y={74 + i * 32}
              width={9}
              height={9}
              rx={2}
              fill={i === 1 ? '#8B5CF6' : '#5B5480'}
            />
            <text x={44} y={83 + i * 32} fontSize={11} fill={i === 1 ? '#F4F2FF' : '#9A93BC'}>
              {s}
            </text>
          </g>
        ))}
      </g>

      {/* Cabecera del pedido. */}
      <g data-parte="cabecera">
        <text x={196} y={44} fontSize={18} fontWeight={700} fill={TINTA} letterSpacing={-0.4}>
          Pedido #4821
        </text>
        <rect x={334} y={28} width={78} height={22} rx={11} fill="#EAF6EF" />
        <text x={373} y={43} fontSize={10} fontWeight={600} fill="#3F8F63" textAnchor="middle">
          En proceso
        </text>
        <text x={196} y={66} fontSize={10.5} fill={TENUE}>
          M. Ferreyra · Creado hoy 09:42 · $18.400
        </text>
        <rect x={196} y={82} width={488} height={1} fill="#E8E5F0" />
      </g>

      {/* Línea de tiempo del pedido. */}
      <g data-parte="linea">
        <text x={196} y={108} fontSize={11} fontWeight={600} fill={TINTA}>
          Estado
        </text>
        <path
          data-trazo
          d="M204 130 V214"
          stroke="#DDD8E8"
          strokeWidth={1.6}
          fill="none"
        />
        {hitos.map((h, i) => (
          <g key={h.t} data-item data-tras-trazo>
            <circle cx={204} cy={130 + i * 28} r={5} fill={h.ok ? '#4F9E7F' : '#FFFFFF'} stroke={h.ok ? 'none' : '#DDD8E8'} strokeWidth={1.5} />
            {h.ok && (
              <path
                d={`m201 ${130 + i * 28} 2 2 4-4`}
                stroke="#FFF"
                strokeWidth={1.4}
                fill="none"
                strokeLinecap="round"
              />
            )}
            <text x={222} y={134 + i * 28} fontSize={10.5} fill={h.ok ? TINTA : TENUE}>
              {h.t}
            </text>
            <text x={392} y={134 + i * 28} fontSize={9.5} fill={TENUE} textAnchor="end">
              {h.h}
            </text>
          </g>
        ))}
      </g>

      {/* Integraciones con los sistemas existentes. */}
      <g data-parte="integraciones">
        <text x={430} y={108} fontSize={11} fontWeight={600} fill={TINTA}>
          Integraciones
        </text>
        {sistemas.map((s, i) => (
          <g key={s.n} data-item>
            <rect x={430} y={118 + i * 40} width={254} height={34} rx={7} fill="#FFFFFF" />
            <rect
              x={430}
              y={118 + i * 40}
              width={254}
              height={34}
              rx={7}
              fill="none"
              stroke="#E8E5F0"
            />
            <rect x={442} y={128 + i * 40} width={14} height={14} rx={3} fill={s.c} opacity={0.2} />
            <circle cx={449} cy={135 + i * 40} r={3} fill={s.c} />
            <text x={466} y={139 + i * 40} fontSize={10.5} fill={TINTA}>
              {s.n}
            </text>
            <text x={672} y={139 + i * 40} fontSize={9.5} fill={s.c} textAnchor="end">
              {s.e}
            </text>
          </g>
        ))}
      </g>

      {/* Registro de actividad: quién hizo qué. */}
      <g data-parte="actividad">
        <text x={196} y={262} fontSize={11} fontWeight={600} fill={TINTA}>
          Actividad
        </text>
        {[
          'L. Ocampo cambió el estado a En proceso',
          'Automatización reservó 3 unidades',
          'Sistema emitió la factura B-0042-00018',
        ].map((a, i) => (
          <g key={a} data-item>
            <rect x={196} y={274 + i * 30} width={488} height={24} rx={5} fill={i % 2 ? '#FFF' : '#F2F0F8'} />
            <circle cx={210} cy={286 + i * 30} r={3} fill="#8B5CF6" />
            <text x={224} y={290 + i * 30} fontSize={9.5} fill={TENUE}>
              {a}
            </text>
          </g>
        ))}
      </g>

      {/* Acciones del pedido. */}
      <g data-parte="acciones">
        <rect x={196} y={378} width={488} height={1} fill="#E8E5F0" />
        <rect x={196} y={396} width={128} height={34} rx={6} fill="#FFFFFF" stroke="#DDD8E8" />
        <text x={260} y={417} fontSize={10.5} fill={TINTA} textAnchor="middle">
          Ver factura
        </text>
        <rect x={336} y={396} width={158} height={34} rx={6} fill="#1B1733" />
        <text x={415} y={417} fontSize={10.5} fontWeight={600} fill="#FFF" textAnchor="middle">
          Enviar a logística
        </text>
      </g>
    </Lienzo>
  )
}

export const PANTALLAS_LANDING = {
  ecommerce: FichaProducto,
  'sitios-institucionales': PanelContenido,
  'software-a-medida': DetallePedido,
} as const
