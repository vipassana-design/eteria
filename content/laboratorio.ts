/** Definición del laboratorio de paleta (PLAN.md §15).
 *
 *  Herramienta interna para explorar paletas y escala en vivo. No es
 *  parte del sitio: se monta solo cuando está habilitada.
 */

/** Un control de color: mueve un token y, si tiene, sus derivados. */
export interface ControlColor {
  /** Variable CSS que escribe. */
  token: string
  etiqueta: string
  /** Para qué se usa. Aparece como ayuda al lado del control. */
  nota: string
  /** Tokens que se recalculan a partir de este, con su delta HSL.
   *  Así un control mueve el color y su rampa de una vez. */
  derivados?: { token: string; dl?: number; ds?: number; dh?: number }[]
}

/** Grupos de controles de color, en el orden en que se lee una
 *  pantalla: primero el fondo, después el acento, después el texto. */
export const gruposColor: { titulo: string; controles: ControlColor[] }[] = [
  {
    titulo: 'Superficies',
    controles: [
      {
        token: '--color-base',
        etiqueta: 'Fondo de página',
        nota: 'El fondo de todo el sitio. También lo usan los desvanecidos de los fondos animados.',
      },
      {
        token: '--color-elevated',
        etiqueta: 'Cards y modal',
        nota: 'Header con scroll, modal, cards de servicios, ventanas de los mockups.',
      },
    ],
  },
  {
    titulo: 'Acento',
    controles: [
      {
        token: '--color-violet-500',
        etiqueta: 'Violeta principal',
        nota: 'Botones, glows, bordes en hover, partículas y trazos del fondo.',
        // El 600 es la versión oscura y el 300 la clara: moverlos con
        // el principal mantiene la rampa coherente.
        derivados: [
          { token: '--color-violet-600', dl: -9 },
          { token: '--color-violet-300', dl: 24, ds: -8 },
        ],
      },
      {
        token: '--color-blue-500',
        etiqueta: 'Azul secundario',
        nota: 'El cierre del degradé de marca y la segunda mancha del fondo mesh.',
        derivados: [{ token: '--color-blue-400', dl: 12 }],
      },
    ],
  },
  {
    titulo: 'Texto',
    controles: [
      {
        token: '--color-hi',
        etiqueta: 'Títulos',
        nota: 'Títulos y el texto sobre el botón primario.',
      },
      {
        token: '--color-mid',
        etiqueta: 'Cuerpo',
        nota: 'Párrafos y bajadas. Es el que más superficie ocupa.',
      },
      {
        token: '--color-low',
        etiqueta: 'Labels',
        nota: 'Metadatos y notas al pie. El más expuesto a fallar contraste.',
      },
      {
        token: '--color-danger',
        etiqueta: 'Error',
        nota: 'Mensajes de error del formulario.',
      },
    ],
  },
]

/** Un par texto/superficie que se audita en vivo. */
export interface ParContraste {
  texto: string
  fondo: string
  etiqueta: string
  /** El texto es 24px+, o 19px+ en bold: la WCAG lo permite a 3:1. */
  grande?: boolean
  /** Cuando el fondo es translúcido, sobre qué se compone. */
  sobre?: string
}

/** Los pares que hay que vigilar.
 *
 *  Salen de dónde se usa cada token: un color de texto se mide contra
 *  TODAS las superficies sobre las que aparece, no solo la principal.
 *  Es la lección de las dos veces que `--color-low` falló AA: pasaba
 *  sobre el fondo de página y fallaba sobre las cards. */
export const paresContraste: ParContraste[] = [
  { texto: '--color-hi', fondo: '--color-base', etiqueta: 'Título sobre página', grande: true },
  { texto: '--color-hi', fondo: '--color-elevated', etiqueta: 'Título sobre card', grande: true },
  { texto: '--color-mid', fondo: '--color-base', etiqueta: 'Cuerpo sobre página' },
  { texto: '--color-mid', fondo: '--color-elevated', etiqueta: 'Cuerpo sobre card' },
  {
    texto: '--color-mid',
    fondo: '--color-surface',
    etiqueta: 'Cuerpo sobre superficie',
    sobre: '--color-base',
  },
  { texto: '--color-low', fondo: '--color-base', etiqueta: 'Label sobre página' },
  { texto: '--color-low', fondo: '--color-elevated', etiqueta: 'Label sobre card' },
  {
    texto: '--color-low',
    fondo: '--color-surface',
    etiqueta: 'Label sobre superficie',
    sobre: '--color-base',
  },
  { texto: '--color-violet-300', fondo: '--color-base', etiqueta: 'Enlace violeta' },
  { texto: '--color-violet-300', fondo: '--color-elevated', etiqueta: 'Enlace sobre card' },
  { texto: '--color-danger', fondo: '--color-base', etiqueta: 'Error sobre página' },
  {
    texto: '--color-base',
    fondo: '--color-violet-500',
    etiqueta: 'Texto sobre botón',
  },
]

/** Un control numérico: tipografía, radios, espaciado. */
export interface ControlNumero {
  token: string
  etiqueta: string
  nota: string
  min: number
  max: number
  paso: number
  unidad: 'px' | 'rem' | ''
  /** Los tokens de tipografía son `clamp(min, fluido, max)`: el panel
   *  mueve el máximo, que es el valor en desktop, y deja el mínimo. */
  esClamp?: boolean
}

export const gruposNumero: { titulo: string; controles: ControlNumero[] }[] = [
  {
    titulo: 'Tipografía',
    controles: [
      {
        token: '--text-hero',
        etiqueta: 'Título del hero',
        nota: 'El H1 de la home y de las landings. Arriba de ~64px no crece: su columna lo limita con container queries, que es lo que evita que el título se corte.',
        min: 32,
        max: 72,
        paso: 1,
        unidad: 'px',
        esClamp: true,
      },
      {
        token: '--text-h2',
        etiqueta: 'Títulos de sección',
        nota: 'Sobre nosotros, Tipos de proyecto, Proceso, Soluciones.',
        min: 24,
        max: 72,
        paso: 1,
        unidad: 'px',
        esClamp: true,
      },
      {
        token: '--text-h3',
        etiqueta: 'Subtítulos',
        nota: 'Títulos de card y nombres de servicio.',
        min: 18,
        max: 40,
        paso: 1,
        unidad: 'px',
        esClamp: true,
      },
      {
        token: '--text-cuerpo',
        etiqueta: 'Cuerpo',
        nota: 'Párrafos. Debajo de 16px la lectura en mobile se complica.',
        min: 14,
        max: 22,
        paso: 0.5,
        unidad: 'px',
        esClamp: true,
      },
      {
        token: '--text-label',
        etiqueta: 'Labels',
        nota: 'Etiquetas y metadatos.',
        min: 11,
        max: 18,
        paso: 0.5,
        unidad: 'px',
        esClamp: true,
      },
    ],
  },
  {
    titulo: 'Formas y espacio',
    controles: [
      {
        token: '--radius-card',
        etiqueta: 'Radio de cards',
        nota: 'Cards, modal y ventanas de los mockups.',
        min: 0,
        max: 32,
        paso: 1,
        unidad: 'px',
      },
      {
        token: '--radius-control',
        etiqueta: 'Radio de controles',
        nota: 'Botones y campos de formulario.',
        min: 0,
        max: 28,
        paso: 1,
        unidad: 'px',
      },
      {
        token: '--spacing-contenedor',
        etiqueta: 'Ancho del contenedor',
        nota: 'El ancho máximo del contenido en desktop.',
        min: 1040,
        max: 1600,
        paso: 20,
        unidad: 'px',
      },
      {
        token: '--padding-lateral',
        etiqueta: 'Margen lateral',
        nota: 'El aire a los costados del contenido.',
        min: 0.75,
        max: 4,
        paso: 0.25,
        unidad: 'rem',
      },
    ],
  },
]

/** Intensidad de las capas de fondo.
 *
 *  No son tokens del tema: son variables propias del laboratorio que
 *  las capas leen para poder atenuarse sin recompilar. */
export const controlesFondo: ControlNumero[] = [
  {
    token: '--lab-glow',
    etiqueta: 'Brillo de los glows',
    nota: 'Los degradés violetas detrás de las secciones. 0 los apaga.',
    min: 0,
    max: 2,
    paso: 0.05,
    unidad: '',
  },
  {
    token: '--lab-particulas',
    etiqueta: 'Brillo de las partículas',
    nota: 'Los puntos que flotan en el fondo de toda la página.',
    min: 0,
    max: 2,
    paso: 0.05,
    unidad: '',
  },
  {
    token: '--lab-mesh',
    etiqueta: 'Brillo del mesh',
    nota: 'Las manchas de gradiente del fondo del hero.',
    min: 0,
    max: 2,
    paso: 0.05,
    unidad: '',
  },
  {
    token: '--lab-grano',
    etiqueta: 'Grano',
    nota: 'El ruido que evita el banding de los degradés.',
    min: 0,
    max: 3,
    paso: 0.1,
    unidad: '',
  },
]

export const laboratorioUi = {
  titulo: 'Laboratorio',
  bajada: 'Paleta y escala en vivo',
  ocultar: 'Ocultar el panel',
  mostrar: 'Abrir el laboratorio',
  reset: 'Volver al original',
  exportar: 'Copiar CSS',
  exportado: 'Copiado',
  guardar: 'Guardar',
  guardadas: 'Guardadas',
  sinGuardadas: 'Guardá una combinación para poder volver a ella.',
  aplicar: 'Aplicar',
  borrar: 'Borrar',
  aleatorio: 'Variante al azar',
  aleatorioNota: 'Mueve el tono del acento y ajusta el resto en consecuencia.',
  pestanas: {
    paletas: 'Paletas',
    color: 'Color',
    escala: 'Escala',
    fondo: 'Fondo',
    contraste: 'Contraste',
  },
  contrasteNota:
    'AA pide 4,5:1 en texto normal y 3:1 en texto grande (24px+, o 19px+ en bold). AAA pide 7:1 y 4,5:1.',
  sinPersistencia:
    'Las paletas guardadas viven mientras la página esté abierta. Para conservar una, copiá el CSS.',
  aviso: 'Herramienta interna. No forma parte del sitio.',
  nombrePaleta: (n: number) => `Paleta ${n}`,
}
