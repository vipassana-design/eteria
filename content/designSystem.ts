/** Contenido de la ruta temporal /design-system.
 *
 *  Es una página de revisión interna, no del sitio público. Se
 *  elimina antes del cierre (PLAN.md seccion 9, Fase 9).
 */

export interface MuestraColor {
  variable: string
  valor: string
  nota?: string
  /** El swatch se dibuja sobre un tablero a cuadros para que se vea
   *  la transparencia. Solo para tokens con canal alfa. */
  conAlfa?: boolean
  /** El swatch se muestra como texto sobre el fondo, no como bloque
   *  de color: es lo que importa de los tokens de texto. */
  comoTexto?: boolean
}

export interface GrupoColor {
  titulo: string
  descripcion: string
  muestras: MuestraColor[]
}

export interface MuestraTipo {
  rol: string
  clase: string
  medidas: string
  ejemplo: string
  fuente: 'Clash Display' | 'Satoshi'
}

export const designSystem = {
  titulo: 'Design system',
  bajada:
    'Ruta temporal de revisión. Muestra los tokens, los componentes y las capas de fondo sobre el fondo real del sitio, antes de construir las secciones.',
  aviso: 'Esta página no forma parte del sitio. Se elimina en la fase de cierre.',

  // `satisfies` valida cada objeto contra la interfaz, y el `as` de
  // después ensancha el tipo: sin eso cada objeto conserva su tipo
  // literal y las props opcionales que no declara no existen al leerlas
  // en el .map() de la página.
  colores: [
    {
      titulo: 'Superficies',
      descripcion:
        'El fondo tiene croma real, no negro neutro. Un negro puro con un solo acento brillante es el patrón más reconocible de plantilla genérica.',
      muestras: [
        { variable: '--color-base', valor: '#0C0A18', nota: 'Página' },
        {
          variable: '--color-surface',
          valor: '#14112370',
          nota: 'Cards y secciones elevadas',
          conAlfa: true,
        },
        { variable: '--color-elevated', valor: '#1B1733', nota: 'Modal, header con scroll, hover' },
      ],
    },
    {
      titulo: 'Acento',
      descripcion:
        'Rampa completa, no un tono suelto. El color saturado entra solo por tres vías: los mockups, los degradés de título y los botones.',
      muestras: [
        { variable: '--color-violet-300', valor: '#C4B5FD' },
        { variable: '--color-violet-500', valor: '#8B5CF6', nota: 'Acento principal' },
        { variable: '--color-violet-600', valor: '#7C3AED' },
        { variable: '--color-blue-400', valor: '#60A5FA' },
        { variable: '--color-blue-500', valor: '#3B82F6', nota: 'Acento secundario' },
      ],
    },
    {
      titulo: 'Texto',
      descripcion:
        'Contraste AA sobre las tres superficies del sitio, no solo sobre el fondo base. --color-low pasó por dos ajustes: de #7B7499 a #807A9F en la Fase 2 (daba 4.48 sobre --bg-base) y de ahí a #8B85AD en la Fase 9, porque sobre --bg-elevated (las cards y el modal) daba 4.27. El valor actual da 5.65 / 4.98 / 5.10 sobre base, elevated y la barra de las ventanas de mockup.',
      muestras: [
        { variable: '--color-hi', valor: '#F4F2FF', nota: 'Títulos', comoTexto: true },
        { variable: '--color-mid', valor: '#B9B3D6', nota: 'Cuerpo', comoTexto: true },
        { variable: '--color-low', valor: '#8B85AD', nota: 'Labels y metadatos', comoTexto: true },
        {
          variable: '--color-danger',
          valor: '#FCA5A5',
          nota: 'Errores de formulario',
          comoTexto: true,
        },
      ],
    },
    {
      titulo: 'Bordes',
      descripcion: 'Hairline en reposo, violeta translúcido en hover.',
      muestras: [
        { variable: '--color-hairline', valor: 'rgba(255,255,255,0.07)', conAlfa: true },
        { variable: '--color-hairline-hover', valor: 'rgba(139,92,246,0.35)', conAlfa: true },
      ],
    },
  ] satisfies readonly GrupoColor[] as GrupoColor[],

  tipografia: [
    {
      rol: 'Hero H1',
      clase: 'text-hero',
      medidas: '76 / 40 px · 600 · -0.03em · lh 1.05',
      ejemplo: 'Desarrollamos el software que tu negocio necesita',
      fuente: 'Clash Display',
    },
    {
      rol: 'H2 sección',
      clase: 'text-h2',
      medidas: '52 / 32 px · 600 · -0.02em · lh 1.08',
      ejemplo: 'Software a medida, sin atajos',
      fuente: 'Clash Display',
    },
    {
      rol: 'H3 card',
      clase: 'text-h3',
      medidas: '28 / 22 px · 500 · -0.01em · lh 1.25',
      ejemplo: 'Tiendas que venden, no que solo existen',
      fuente: 'Clash Display',
    },
    {
      rol: 'Cuerpo grande',
      clase: 'text-cuerpo-lg',
      medidas: '20 / 18 px · 400 · lh 1.6',
      ejemplo:
        'Ecommerce, plataformas de gestión y sitios institucionales para empresas que necesitan algo propio.',
      fuente: 'Satoshi',
    },
    {
      rol: 'Cuerpo',
      clase: 'text-cuerpo',
      medidas: '17 / 16 px · 400 · lh 1.65',
      ejemplo:
        'Somos un equipo de desarrollo especializado en software para empresas. Cada proyecto tiene un equipo asignado y un responsable técnico que lo sigue de principio a fin.',
      fuente: 'Satoshi',
    },
    {
      rol: 'Label',
      clase: 'text-label',
      medidas: '14 / 13 px · 500 · lh 1.4',
      ejemplo: 'Tiempo de respuesta',
      fuente: 'Satoshi',
    },
  ] satisfies MuestraTipo[],

  secciones: {
    color: {
      titulo: 'Color',
      bajada:
        'Cada swatch con el nombre de su variable. El fondo de la página es el real del sitio.',
    },
    tipografia: {
      titulo: 'Tipografía',
      bajada:
        'Clash Display en títulos, Satoshi en cuerpo. La escala usa clamp() entre mobile y desktop, así que los tamaños cambian si redimensionás la ventana.',
    },
    degrade: {
      titulo: 'Degradé de marca',
      bajada:
        'Se usa en el H1 del hero, en el título de cada sección principal y en el botón primario. No en subtítulos ni en cuerpo.',
    },
    botones: {
      titulo: 'Botones',
      bajada:
        'Un solo botón con degradé y glow por pantalla. Los secundarios van con borde y fondo transparente.',
    },
    formulario: {
      titulo: 'Campos de formulario',
      bajada:
        'Los mismos campos de la sección de contacto, con sus estados. Los errores van inline, nunca en un alert.',
    },
    fondo: {
      titulo: 'Capas de fondo',
      bajada:
        'Tres capas, todas sutiles, ninguna protagonista. Las tres están activas en esta misma página.',
    },
    reveals: {
      titulo: 'Variantes de reveal',
      bajada:
        'El fade y slide en todas las secciones es el default genérico. Cada sección elige su variante. Recargá la página para verlos entrar de nuevo.',
    },
  },

  capasFondo: [
    {
      titulo: 'Campo de partículas',
      descripcion:
        'Canvas fijo, 60 puntos violeta a 8 y 14% de opacidad, con deriva lenta. Apagado en mobile y con reduced-motion: en esos casos no se monta el canvas ni el loop.',
    },
    {
      titulo: 'Glows de sección',
      descripcion:
        'Radiales de violeta con blur alto, detrás de secciones clave. En desktop se desplazan a distinta velocidad que el scroll; en mobile quedan estáticos con la misma intensidad.',
    },
    {
      titulo: 'Grano',
      descripcion:
        'Ruido tileable de 128px a 3% de opacidad. Evita el banding de los degradés en pantallas grandes y le quita el aspecto plástico al dark.',
    },
  ],

  reveals: [
    { variante: 'subir' as const, nota: 'Fade y 24px desde abajo. El default contenido.' },
    { variante: 'escala' as const, nota: 'Escala 0.96 a 1. Para cards.' },
    { variante: 'mascara' as const, nota: 'El contenido se descubre desde abajo. Para títulos.' },
    { variante: 'lateral' as const, nota: 'Fade y desplazamiento horizontal. Para filas con stagger.' },
  ],

  tiposProyecto: [
    { valor: '', etiqueta: 'Elegí una opción' },
    { valor: 'ecommerce', etiqueta: 'Ecommerce' },
    { valor: 'institucional', etiqueta: 'Sitio institucional' },
    { valor: 'webapp', etiqueta: 'Desarrollo a medida' },
    { valor: 'otro', etiqueta: 'Otro' },
  ],
}
