import { ALTOS, Foto, Lienzo, TENUE } from './LienzoMockup'

/** Sitios institucionales: la home de un estudio profesional.
 *
 *  Distinta de las dos que ya hay: el hero muestra la home de una
 *  compañía industrial y las landings el panel de contenido. Acá va un
 *  estudio de servicios, que es el otro caso típico —más chico, con
 *  áreas de práctica y un formulario de consulta en vez de secciones
 *  corporativas.
 *
 *  Paleta propia, verde profundo sobre crema: se distingue del azul de
 *  la ficha y del azul corporativo del hero.
 *
 *  Va en el lienzo alto de las cards de servicios (720×538): con el
 *  de 460 quedaban franjas del color de fondo arriba y abajo, porque
 *  la celda es más alta de proporción que la ventana del hero.
 *
 *  Partes: barra → hero → areas → equipo → cifras → notas.
 */

const VERDE = '#14503C'
const VERDE_CLARO = '#2E7D5E'
const CREMA = '#FAF8F3'
const DORADO = '#B08A3E'

const AREAS = [
  { t: 'Societario', d: 'Constitución y reorganización' },
  { t: 'Laboral', d: 'Contratos y conflictos' },
  { t: 'Tributario', d: 'Planificación y litigios' },
]

const CIFRAS = [
  { v: '32', e: 'años de trayectoria' },
  { v: '+400', e: 'clientes activos' },
  { v: '14', e: 'profesionales' },
]

/** Cuatro socios: las iniciales en un círculo y su especialidad. Sin
 *  fotos de personas, que en el mockup de un estudio ajeno serían
 *  fotos de stock de gente en traje. */
const EQUIPO = [
  { ini: 'MA', n: 'M. Alvear', esp: 'Societario' },
  { ini: 'JP', n: 'J. Pereyra', esp: 'Laboral' },
  { ini: 'CS', n: 'C. Sosa', esp: 'Tributario' },
  { ini: 'RB', n: 'R. Bustos', esp: 'Litigios' },
]

const NOTAS = [
  { foto: '/mockups/estudio-nota-1.webp', t: 'Reforma del régimen de contratos', f: '18 mar' },
  { foto: '/mockups/estudio-nota-2.webp', t: 'Nuevo esquema de retenciones', f: '02 mar' },
  { foto: '/mockups/estudio-nota-3.webp', t: 'Fallo sobre teletrabajo', f: '21 feb' },
]

export function SitioEstudio() {
  return (
    <Lienzo fondo={CREMA} alto={ALTOS.celda}>
      {/* ── Barra: navegación de estudio, con el CTA de consulta ── */}
      <g data-parte="barra">
        <rect width={720} height={52} fill={CREMA} />
        <g data-item>
          <path
            d="M34 20h18v4H34v-4Zm4 6h10v12H38V26Z"
            fill={VERDE}
          />
          <text x={62} y={33} fontSize={14} fontWeight={700} fill={VERDE} letterSpacing={0.4}>
            ALVEAR
          </text>
          <text x={62} y={43} fontSize={7} fill={TENUE} letterSpacing={1.4}>
            ABOGADOS
          </text>
        </g>

        {['El estudio', 'Áreas', 'Equipo', 'Publicaciones'].map((t, i) => {
          const x = [268, 340, 396, 450][i] ?? 0
          return (
            <g key={t} data-item>
              <text
                x={x}
                y={32}
                fontSize={9.5}
                fontWeight={i === 1 ? 600 : 400}
                fill={i === 1 ? VERDE : TENUE}
              >
                {t}
              </text>
              {i === 1 ? <rect x={x} y={38} width={30} height={1.5} fill={DORADO} /> : null}
            </g>
          )
        })}

        <g data-item>
          <rect x={586} y={16} width={100} height={26} rx={2} fill={VERDE} />
          <text x={636} y={33} fontSize={9.5} fontWeight={600} fill={CREMA} textAnchor="middle">
            Consultar
          </text>
        </g>
        <rect y={52} width={720} height={1} fill="#E8E2D6" />
      </g>

      {/* ── Hero: foto a la izquierda, texto a la derecha.
             Al revés que el del hero del sitio, que tiene la foto a la
             derecha: así los dos mockups no se leen como el mismo
             layout con otro color.
 
             La foto arranca en x=32, la misma grilla que el logo (34) y
             las cards de áreas (32). Antes iba a sangre desde x=0 y
             quedaba pegada al borde, desalineada de todo lo demás. ── */}
      <g data-parte="hero">
        <Foto
          id="estHero"
          href="/mockups/estudio-hero.webp"
          x={32}
          y={73}
          w={268}
          h={180}
          rx={3}
        />
        {/* Velo verde sobre la foto: la ata a la paleta del sitio y le
            baja el contraste para que el texto de al lado gane peso. */}
        <rect x={32} y={73} width={268} height={180} rx={3} fill={VERDE} opacity={0.28} />

        <g data-item>
          <rect x={332} y={78} width={26} height={2} fill={DORADO} />
          <text x={332} y={106} fontSize={20} fontWeight={700} fill={VERDE} letterSpacing={-0.3}>
            Asesoramiento legal
          </text>
          <text x={332} y={130} fontSize={20} fontWeight={700} fill={VERDE_CLARO} letterSpacing={-0.3}>
            para empresas
          </text>
          <text x={332} y={154} fontSize={9.5} fill={TENUE}>
            Acompañamos operaciones, contratos y litigios desde 1993.
          </text>
        </g>

        <g data-item>
          <rect x={332} y={172} width={110} height={30} rx={2} fill={VERDE} />
          <text x={387} y={191} fontSize={9.5} fontWeight={600} fill={CREMA} textAnchor="middle">
            Conocer el estudio
          </text>
          <text x={456} y={191} fontSize={9.5} fontWeight={600} fill={VERDE}>
            Ver áreas
          </text>
          <path d="M512 187l4 4-4 4" fill="none" stroke={VERDE} strokeWidth={1.4} strokeLinecap="round" />
        </g>
      </g>

      {/* ── Áreas de práctica ── */}
      <g data-parte="areas">
        {AREAS.map((a, i) => (
          <g key={a.t} data-item>
            <rect
              x={32 + i * 220}
              y={244}
              width={200}
              height={64}
              rx={3}
              fill="#FFFFFF"
              filter="url(#sombraCard)"
            />
            <rect x={32 + i * 220} y={244} width={200} height={2} fill={i === 0 ? DORADO : '#DDD6C6'} />
            <text x={50 + i * 220} y={274} fontSize={11.5} fontWeight={700} fill={VERDE}>
              {a.t}
            </text>
            <text x={50 + i * 220} y={290} fontSize={8.5} fill={TENUE}>
              {a.d}
            </text>
            <path
              d={`M${196 + i * 220} 292l4 4-4 4`}
              fill="none"
              stroke="#C9C1AF"
              strokeWidth={1.4}
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>

      {/* ── Equipo: cuatro socios con su especialidad. Es lo que un
             estudio pone en su home, y llena la franja que el lienzo
             alto deja entre las áreas y las cifras. ── */}
      <g data-parte="equipo">
        <text x={32} y={340} fontSize={11} fontWeight={700} fill={VERDE}>
          El equipo
        </text>
        {EQUIPO.map((m, i) => (
          <g key={m.n} data-item>
            <circle cx={52 + i * 168} cy={374} r={17} fill="#EDE8DC" />
            <text
              x={52 + i * 168}
              y={379}
              fontSize={11}
              fontWeight={700}
              fill={VERDE}
              textAnchor="middle"
            >
              {m.ini}
            </text>
            <text x={78 + i * 168} y={370} fontSize={9} fontWeight={600} fill={VERDE}>
              {m.n}
            </text>
            <text x={78 + i * 168} y={382} fontSize={7.5} fill={TENUE}>
              {m.esp}
            </text>
          </g>
        ))}
      </g>

      {/* ── Cifras del estudio ── */}
      <g data-parte="cifras">
        <rect y={404} width={720} height={48} fill={VERDE} />
        {CIFRAS.map((c, i) => (
          <g key={c.e} data-item>
            <text x={40 + i * 230} y={430} fontSize={18} fontWeight={700} fill={CREMA}>
              {c.v}
            </text>
            <text x={40 + i * 230} y={443} fontSize={8.5} fill="#A8C4B6">
              {c.e}
            </text>
            {i < CIFRAS.length - 1 ? (
              <line
                x1={40 + i * 230 + 200}
                y1={416}
                x2={40 + i * 230 + 200}
                y2={440}
                stroke={VERDE_CLARO}
                strokeWidth={1}
              />
            ) : null}
          </g>
        ))}
        <text x={688} y={436} fontSize={8.5} fill="#A8C4B6" textAnchor="end">
          Matrícula CPACF T° 48
        </text>
      </g>

      {/* ── Publicaciones ── */}
      <g data-parte="notas">
        <text x={32} y={478} fontSize={11} fontWeight={700} fill={VERDE}>
          Publicaciones
        </text>
        <text x={688} y={478} fontSize={8.5} fill={DORADO} textAnchor="end">
          Ver todas
        </text>
        {NOTAS.map((n, i) => (
          <g key={n.t} data-item>
            <Foto id={`estNota${i}`} href={n.foto} x={32 + i * 224} y={490} w={52} h={36} rx={2} />
            <text x={92 + i * 224} y={504} fontSize={8.5} fontWeight={600} fill={VERDE}>
              {n.t.length > 24 ? `${n.t.slice(0, 23)}…` : n.t}
            </text>
            <text x={92 + i * 224} y={518} fontSize={7.5} fill={TENUE}>
              {n.f}
            </text>
          </g>
        ))}
      </g>
    </Lienzo>
  )
}
