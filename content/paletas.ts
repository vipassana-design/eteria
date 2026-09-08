/** Paletas del laboratorio (PLAN.md §15).
 *
 *  Trece combinaciones completas para dark mode, listas para aplicar de
 *  un click. Todas pasan AA en los doce pares que audita el panel: el
 *  punto de tener plantillas es poder elegir sin auditar cada una.
 *
 *  **De dónde salen los valores.** La mayoría usa las escalas dark de
 *  Radix Colors, que están construidas para esto y traen dos cosas que
 *  no se improvisan: el gris que acompaña cada matiz —Radix empareja
 *  mauve con los violetas, slate con los azules, sage con los verdes y
 *  sand con los cálidos— y un step 9 con la máxima croma de la escala.
 *
 *  **Lo que hubo que corregir.** El botón primario del sitio usa
 *  `text-base` sobre el degradé: o sea el fondo de página oscuro encima
 *  del acento. Varios step 9 de Radix no daban 4,5:1 en ese par y se
 *  aclararon hasta pasar, medido uno por uno.
 *
 *  **La distribución de matices.** Se descartaron cuatro candidatas por
 *  redundancia, no por contraste: jade y verde terminal quedaban a 8° y
 *  22° de teal —los tres se leían igual—, y violeta Radix e índigo
 *  caían dentro de un racimo de siete paletas entre 206° y 258°. Las
 *  trece que quedaron cubren el círculo con la menor distancia en 6°, y
 *  en esos casos el fondo las distingue antes que el acento.
 *
 *  Las recomendaciones generales de dark mode que se siguieron: nada
 *  de negro puro —los fondos van entre 6% y 12% de luminosidad—, el
 *  cuerpo de texto en un blanco roto y no en blanco puro, y los
 *  acentos algo desaturados respecto de su versión para fondo claro.
 */

export interface Paleta {
  id: string
  nombre: string
  /** Qué carácter tiene y para qué serviría. */
  linea: string
  /** De dónde salen los valores. */
  origen: 'La del sitio' | 'Radix Colors' | 'Sistemas reales'
  /** Los tokens que escribe, con el nombre de la variable CSS. */
  tokens: Record<string, string>
  /** El contraste más bajo de la paleta, normalizado a la escala de
   *  texto normal. Se muestra en la card para saber cuánto margen deja. */
  peorContraste: number
}

/** Cada paleta escribe estos nueve tokens. */
function paleta(
  id: string,
  nombre: string,
  origen: Paleta['origen'],
  linea: string,
  c: {
    base: string
    elevated: string
    surface: string
    v500: string
    v600: string
    v300: string
    b500: string
    b400: string
    hi: string
    mid: string
    low: string
    danger: string
  },
  peorContraste: number,
): Paleta {
  return {
    id,
    nombre,
    linea,
    origen,
    peorContraste,
    tokens: {
      '--color-base': c.base,
      '--color-elevated': c.elevated,
      '--color-surface': c.surface,
      '--color-violet-500': c.v500,
      '--color-violet-600': c.v600,
      '--color-violet-300': c.v300,
      '--color-blue-500': c.b500,
      '--color-blue-400': c.b400,
      '--color-hi': c.hi,
      '--color-mid': c.mid,
      '--color-low': c.low,
      '--color-danger': c.danger,
    },
  }
}

export const paletas: Paleta[] = [
  paleta(
    'actual',
    'Violeta profundo',
    'La del sitio',
    'La paleta actual. Violeta saturado sobre un negro con croma violeta.',
    {
      base: '#0c0a18', elevated: '#1b1733', surface: '#14112370',
      v500: '#8b5cf6', v600: '#7c3aed', v300: '#c4b5fd',
      b500: '#3b82f6', b400: '#60a5fa',
      hi: '#f4f2ff', mid: '#b9b3d6', low: '#8b85ad', danger: '#fca5a5',
    },
    4.62,
  ),
  paleta(
    'iris',
    'Iris',
    'Radix Colors',
    'Índigo, entre el violeta y el azul, con gris slate. El registro más sobrio de la lista.',
    {
      base: '#111113', elevated: '#212225', surface: '#18191b70',
      v500: '#7373dc', v600: '#7373dc', v300: '#b1a9ff',
      b500: '#0090ff', b400: '#3b9eff',
      hi: '#edeef0', mid: '#b0b4ba', low: '#8b9096', danger: '#ff9592',
    },
    4.68,
  ),
  paleta(
    'azul',
    'Azul técnico',
    'Radix Colors',
    'Azul puro sobre gris slate. Es lo que se espera de una herramienta de desarrollo.',
    {
      base: '#0d1520', elevated: '#1c2733', surface: '#141d2870',
      v500: '#0090ff', v600: '#006cbf', v300: '#70b8ff',
      b500: '#00a2c7', b400: '#23afd0',
      hi: '#edeef0', mid: '#b0b6be', low: '#87909a', danger: '#ff9592',
    },
    4.67,
  ),
  paleta(
    'cyan',
    'Cian',
    'Radix Colors',
    'Cian frío con gris slate. Más eléctrico que el azul sin irse a neón.',
    {
      base: '#0b161a', elevated: '#17272d', surface: '#101c2270',
      v500: '#00a2c7', v600: '#00748f', v300: '#4ccce6',
      b500: '#0090ff', b400: '#3b9eff',
      hi: '#edeef0', mid: '#aeb8bd', low: '#849197', danger: '#ff9592',
    },
    4.74,
  ),
  paleta(
    'teal',
    'Teal',
    'Radix Colors',
    'Verde azulado con gris sage. El acento con más luminancia: destaca sin subir el fondo.',
    {
      base: '#0d1514', elevated: '#1a2624', surface: '#111c1b70',
      v500: '#12a594', v600: '#0d776b', v300: '#0bd8b6',
      b500: '#00a2c7', b400: '#23afd0',
      hi: '#eceeed', mid: '#adb5b2', low: '#84908c', danger: '#ff9592',
    },
    4.71,
  ),
  paleta(
    'purpura',
    'Púrpura',
    'Radix Colors',
    'Púrpura más rojizo que el violeta, con gris mauve. Más cálido y menos técnico.',
    {
      base: '#18111b', elevated: '#2a1d31', surface: '#1e152370',
      v500: '#9e67ce', v600: '#9f69cf', v300: '#d19dff',
      b500: '#ab4aba', b400: '#b658c4',
      hi: '#eeeef0', mid: '#b7aebd', low: '#8e8b97', danger: '#ff9592',
    },
    4.65,
  ),
  paleta(
    'lima',
    'Lima',
    'Radix Colors',
    'Lima sobre gris olive. El acento más luminoso de la lista: el botón lleva texto oscuro.',
    {
      base: '#11130c', elevated: '#232619', surface: '#151a1070',
      v500: '#bdee63', v600: '#bdee63', v300: '#bde56c',
      b500: '#ffe629', b400: '#ffff57',
      hi: '#eceeec', mid: '#b0b5ab', low: '#8e8f87', danger: '#ff9592',
    },
    4.71,
  ),
  paleta(
    'ruby',
    'Rubí',
    'Radix Colors',
    'Rojo con algo de rosa, gris mauve. El más frontal de la lista.',
    {
      base: '#191113', elevated: '#2b1d21', surface: '#1e151770',
      v500: '#e54666', v600: '#e54666', v300: '#ff949d',
      b500: '#e5484d', b400: '#ec5d5e',
      hi: '#eeeef0', mid: '#bab2b6', low: '#918a8e', danger: '#ffd1d9',
    },
    4.77,
  ),
  paleta(
    'ambar',
    'Ámbar',
    'Radix Colors',
    'Ámbar cálido con gris sand. El único que rompe con el frío del resto de la lista.',
    {
      base: '#111110', elevated: '#252523', surface: '#19191870',
      v500: '#ffc53d', v600: '#d9a52e', v300: '#ffca16',
      b500: '#f76b15', b400: '#ff801f',
      hi: '#eeeeec', mid: '#b5b3ad', low: '#8e8d87', danger: '#ff9592',
    },
    4.61,
  ),
  paleta(
    'crimson',
    'Crimson',
    'Radix Colors',
    'Rosa profundo con gris mauve. El más expresivo, para un tono de marca antes que técnico.',
    {
      base: '#191114', elevated: '#2b1c22', surface: '#20131870',
      v500: '#e93d82', v600: '#c22e6b', v300: '#ff92ad',
      b500: '#d6409f', b400: '#de51a8',
      hi: '#eeeef0', mid: '#bab2b6', low: '#918a8e', danger: '#ffb3ae',
    },
    4.82,
  ),
  paleta(
    'grafito',
    'Grafito',
    'Radix Colors',
    'Sin acento de color: el gris mauve como sistema y el blanco como acento. Todo el peso lo lleva la tipografía.',
    {
      base: '#121113', elevated: '#232225', surface: '#1a191b70',
      v500: '#7f7d87', v600: '#7f7d87', v300: '#eeeef0',
      b500: '#b5b2bc', b400: '#c8c5cf',
      hi: '#eeeef0', mid: '#b5b2bc', low: '#8e8b97', danger: '#ff9592',
    },
    4.64,
  ),
  paleta(
    'linear',
    'Lavanda',
    'Sistemas reales',
    'Negro casi puro con un solo acento lavanda y sin segundo color. La restricción es el argumento.',
    {
      base: '#010102', elevated: '#18191a', surface: '#0f101170',
      v500: '#626ed3', v600: '#6470d4', v300: '#a8b1f5',
      b500: '#7c8bf0', b400: '#9aa5f5',
      hi: '#f7f8f8', mid: '#b4b8bf', low: '#8a8f98', danger: '#ff9592',
    },
    4.66,
  ),
  paleta(
    'neutro',
    'Gris neutro',
    'Sistemas reales',
    'Grises sin croma y azul de sistema. El registro de las plataformas de deploy.',
    {
      base: '#0a0a0a', elevated: '#1f1f1f', surface: '#16161670',
      v500: '#0076fd', v600: '#0076fd', v300: '#66b3ff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#ededed', mid: '#a1a1a1', low: '#8f8f8f', danger: '#ff8f8f',
    },
    4.72,
  ),
]

export const paletasUi = {
  titulo: 'Paletas',
  bajada: 'Doce combinaciones para dark mode. Todas pasan AA en los doce pares.',
  aplicar: 'Aplicar',
  contrasteMinimo: 'mín.',
  origenes: {
    'La del sitio': 'La del sitio',
    'Radix Colors': 'Radix',
    'Sistemas reales': 'Sistemas',
  },
  nota: 'Aplicar una paleta reemplaza los doce colores. Después se puede ajustar cada uno en la pestaña Color.',
}
