import { Foto, Lienzo, TENUE } from './Lienzo'

/** Sitios institucionales: la home de la empresa.
 *
 *  La landing de institucionales muestra el panel de contenido; acá va
 *  la cara pública, que es lo que ve el visitante: hero con foto,
 *  divisiones de negocio, cifras y las últimas novedades.
 *
 *  Paleta propia, azul corporativo: los tres mockups del ciclo tienen
 *  que leerse como tres sitios de clientes distintos, no como tres
 *  pantallas del mismo producto.
 *
 *  Partes: barra → hero → divisiones → cifras → novedades → pie.
 */

const AZUL = '#0B3A5C'
const CELESTE = '#4FA3D9'
const AZUL_TENUE = '#6E8698'

const DIVISIONES = [
  { t: 'Energía', d: 'Generación y transmisión', x: 36 },
  { t: 'Infraestructura', d: 'Obra civil e industrial', x: 254 },
  { t: 'Logística', d: 'Transporte y almacenaje', x: 472 },
]

const CIFRAS = [
  { v: '+40', e: 'países', x: 36 },
  { v: '1.200', e: 'empleados', x: 194 },
  { v: '35', e: 'años', x: 352 },
  { v: '98%', e: 'retención', x: 510 },
]

const NOVEDADES = [
  { foto: '/mockups/corp-prensa-1.webp', cat: 'Operaciones', t: 'Nueva planta en Rosario', f: '12 mar' },
  { foto: '/mockups/corp-prensa-2.webp', cat: 'Inversores', t: 'Resultados del Q1 2026', f: '04 mar' },
  { foto: '/mockups/corp-prensa-3.webp', cat: 'Sustentabilidad', t: 'Plan de reducción a 2030', f: '27 feb' },
]

export function CorporativoHome() {
  return (
    <Lienzo fondo="#FFFFFF">
      {/* ── Barra: navegación institucional con utilidades ── */}
      <g data-parte="barra">
        {/* Franja de utilidades: el detalle que distingue un sitio
            corporativo de una landing. */}
        <rect width={720} height={22} fill="#072B45" />
        <text x={36} y={15} fontSize={8} fill="#7FA8C4">
          Inversores
        </text>
        <text x={92} y={15} fontSize={8} fill="#7FA8C4">
          Proveedores
        </text>
        <text x={158} y={15} fontSize={8} fill="#7FA8C4">
          Trabajá con nosotros
        </text>
        <text x={646} y={15} fontSize={8} fontWeight={600} fill="#FFFFFF">
          ES
        </text>
        <text x={666} y={15} fontSize={8} fill="#5B87A6">
          EN
        </text>

        <rect y={22} width={720} height={46} fill={AZUL} />
        {/* Marca. */}
        <rect x={36} y={38} width={24} height={14} rx={2} fill={CELESTE} />
        <path d="M40 45h16" stroke={AZUL} strokeWidth={2} strokeLinecap="round" />
        <text x={70} y={50} fontSize={14} fontWeight={700} fill="#FFFFFF" letterSpacing={-0.2}>
          Norvex
        </text>

        {['Compañía', 'Divisiones', 'Sustentabilidad', 'Prensa'].map((t, i) => {
          const x = [316, 386, 462, 566][i] ?? 0
          return (
            <g key={t}>
              <text x={x} y={50} fontSize={9.5} fill={i === 1 ? '#FFFFFF' : '#B3D2E6'}>
                {t}
              </text>
              {i === 1 ? <rect x={x} y={56} width={54} height={2} fill={CELESTE} /> : null}
            </g>
          )
        })}

        {/* CTA de contacto en la barra. */}
        <rect x={628} y={35} width={58} height={20} rx={3} fill={CELESTE} />
        <text x={657} y={49} fontSize={9} fontWeight={600} fill={AZUL} textAnchor="middle">
          Contacto
        </text>
      </g>

      {/* ── Hero: foto a la derecha, texto a la izquierda ── */}
      <g data-parte="hero">
        <rect y={68} width={720} height={150} fill="#F2F7FB" />
        <Foto id="corpHeroFoto" href="/mockups/corp-hero.webp" x={396} y={68} w={324} h={150} rx={0} />
        {/* Velo en degradé sobre el borde izquierdo de la foto, para que
            el corte contra el fondo claro no sea duro. */}
        <rect x={396} y={68} width={80} height={150} fill="url(#veloCorpHero)" />
        <defs>
          <linearGradient id="veloCorpHero" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F2F7FB" stopOpacity={1} />
            <stop offset="100%" stopColor="#F2F7FB" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Volanta: ubica el sector antes del titular. */}
        <rect x={36} y={88} width={3} height={12} fill={CELESTE} />
        <text x={48} y={98} fontSize={8.5} fontWeight={600} fill={CELESTE} letterSpacing={0.6}>
          ENERGÍA E INFRAESTRUCTURA
        </text>

        <text x={36} y={132} fontSize={24} fontWeight={700} fill={AZUL} letterSpacing={-0.7}>
          Infraestructura crítica
        </text>
        <text x={36} y={158} fontSize={24} fontWeight={700} fill={CELESTE} letterSpacing={-0.7}>
          para la industria
        </text>
        <text x={36} y={180} fontSize={9.5} fill={AZUL_TENUE}>
          Operamos plantas y redes de distribución en toda la región.
        </text>

        <rect x={36} y={184} width={112} height={26} rx={3} fill={AZUL} />
        <text x={92} y={201} fontSize={9.5} fontWeight={600} fill="#FFFFFF" textAnchor="middle">
          Conocer la compañía
        </text>
        <text x={164} y={201} fontSize={9.5} fontWeight={600} fill={AZUL}>
          Ver divisiones
        </text>
        <path d="M232 194l5 4-5 4" fill="none" stroke={AZUL} strokeWidth={1.4} strokeLinecap="round" />
      </g>

      {/* ── Divisiones: las tres unidades de negocio ── */}
      <g data-parte="divisiones">
        {DIVISIONES.map((d, i) => (
          <g key={d.t} data-item>
            <rect
              x={d.x}
              y={238}
              width={212}
              height={58}
              rx={4}
              fill="#FFFFFF"
              filter="url(#sombraCard)"
            />
            {/* Filete de color: identifica la división de un vistazo. */}
            <rect x={d.x} y={238} width={212} height={3} rx={1.5} fill={i === 1 ? CELESTE : '#BFD6E5'} />
            <rect x={d.x + 16} y={252} width={16} height={16} rx={3} fill="#EAF3F9" />
            <path
              d={`M${d.x + 20} 260h8m-4-4v8`}
              stroke={CELESTE}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
            <text x={d.x + 42} y={259} fontSize={11} fontWeight={700} fill={AZUL}>
              {d.t}
            </text>
            <text x={d.x + 42} y={274} fontSize={8.5} fill={AZUL_TENUE}>
              {d.d}
            </text>
            <path
              d={`M${d.x + 190} 279l5 4-5 4`}
              fill="none"
              stroke="#BFD6E5"
              strokeWidth={1.4}
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>

      {/* ── Cifras: la franja de datos de la compañía ── */}
      <g data-parte="cifras">
        <rect y={296} width={720} height={46} fill="#F7FAFC" />
        {CIFRAS.map((c, i) => (
          <g key={c.e} data-item>
            <text x={c.x} y={320} fontSize={18} fontWeight={700} fill={AZUL} letterSpacing={-0.5}>
              {c.v}
            </text>
            <text x={c.x} y={334} fontSize={8.5} fill={AZUL_TENUE}>
              {c.e}
            </text>
            {i < CIFRAS.length - 1 ? (
              <line x1={c.x + 138} y1={307} x2={c.x + 138} y2={331} stroke="#E2EBF2" strokeWidth={1} />
            ) : null}
          </g>
        ))}
        <text x={684} y={326} fontSize={8.5} fill={AZUL_TENUE} textAnchor="end">
          Datos a marzo 2026
        </text>
      </g>

      {/* ── Novedades: tres notas con foto, categoría y fecha ── */}
      <g data-parte="novedades">
        <text x={36} y={364} fontSize={11.5} fontWeight={700} fill={AZUL}>
          Últimas novedades
        </text>
        <text x={684} y={364} fontSize={9} fill={CELESTE} textAnchor="end">
          Sala de prensa
        </text>

        {NOVEDADES.map((n, i) => (
          <g key={n.t} data-item>
            <Foto id={`corpNota${i}`} href={n.foto} x={36 + i * 218} y={376} w={90} h={50} rx={3} />
            <text x={136 + i * 218} y={388} fontSize={7.5} fontWeight={600} fill={CELESTE} letterSpacing={0.4}>
              {n.cat.toUpperCase()}
            </text>
            <text x={136 + i * 218} y={404} fontSize={9} fontWeight={600} fill={AZUL}>
              {n.t.length > 24 ? `${n.t.slice(0, 23)}…` : n.t}
            </text>
            <text x={136 + i * 218} y={422} fontSize={7.5} fill={TENUE}>
              {n.f}
            </text>
          </g>
        ))}
      </g>
    </Lienzo>
  )
}
