/** Paletas del laboratorio (PLAN.md §15).
 *
 *  Veintitrés combinaciones completas para dark mode, listas para
 *  aplicar de un click. Todas pasan AA en los doce pares que audita el panel: el
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
 *  que quedaron cubren el círculo con la menor distancia en 6°, y
 *  en esos casos el fondo las distingue antes que el acento.
 *
 *  **Los grises neutros y el segundo acento.** Cinco variantes de gris
 *  cambian el piso (de 3% a 13% de luminosidad), la elevación de las
 *  cards y el cast —frío, cálido o sin croma—, con tres niveles de
 *  contraste de texto. Otras cinco parten del gris neutro y suman un
 *  segundo acento en los valores que son un dato y no una acción: las
 *  cifras de Sobre nosotros, los números del proceso y los de los
 *  beneficios de cada landing.
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
  origen: 'La del sitio' | 'Radix Colors' | 'Sistemas reales' | 'Con segundo acento'
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
    /** Segundo acento: los valores que son un dato y no una acción.
     *  Si no se declara, queda igual al principal. */
    ac2?: string
    ac2Claro?: string
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
      // Sin segundo acento declarado, queda igual al principal: el
      // sitio se ve como si no existiera la distinción.
      '--color-acento-2': c.ac2 ?? c.v500,
      '--color-acento-2-claro': c.ac2Claro ?? c.v300,
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
    'neutro-tinta',
    'Gris tinta',
    'Sistemas reales',
    'Casi negro con un cast frío mínimo. El de mayor contraste de las cinco.',
    {
      base: '#08090a', elevated: '#1a1c1e', surface: '#1a1c1e70',
      v500: '#0076fd', v600: '#0076fd', v300: '#66b3ff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#f4f4f5', mid: '#b8b8bd', low: '#98989e', danger: '#ff8f8f',
    },
    4.75,
  ),
  paleta(
    'neutro',
    'Gris neutro',
    'Sistemas reales',
    'Grises puros sin croma. El registro de las plataformas de deploy.',
    {
      base: '#0a0a0a', elevated: '#1f1f1f', surface: '#1f1f1f70',
      v500: '#0076fd', v600: '#0076fd', v300: '#66b3ff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#ededed', mid: '#a1a1a1', low: '#8f8f8f', danger: '#ff8f8f',
    },
    4.72,
  ),
  paleta(
    'neutro-medio',
    'Gris medio',
    'Sistemas reales',
    'El fondo levantado a 11%: deja respirar las sombras de las cards y los mockups.',
    {
      base: '#111111', elevated: '#242424', surface: '#24242470',
      v500: '#0379ff', v600: '#0379ff', v300: '#66b3ff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#ededed', mid: '#a1a1a1', low: '#93939c', danger: '#ff8f8f',
    },
    4.66,
  ),
  paleta(
    'neutro-carbon',
    'Gris carbón',
    'Sistemas reales',
    'El más claro y con cast frío. El azul sube de luminosidad para no perderse.',
    {
      base: '#131315', elevated: '#282a2d', surface: '#282a2d70',
      v500: '#3d8bfd', v600: '#3d8bfd', v300: '#8cbcff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#f4f4f5', mid: '#b8b8bd', low: '#9a9ba1', danger: '#ff8f8f',
    },
    5.19,
  ),
  paleta(
    'neutro-calido',
    'Gris cálido',
    'Sistemas reales',
    'Cast cálido mínimo. Menos clínico que el neutro puro, casi imperceptible.',
    {
      base: '#100f0e', elevated: '#232120', surface: '#23212070',
      v500: '#0177ff', v600: '#0177ff', v300: '#66b3ff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#e4e4e6', mid: '#9a9a95', low: '#8e8c86', danger: '#ff8f8f',
    },
    4.63,
  ),
  paleta(
    'ac2-ambar',
    'Neutro + ámbar',
    'Con segundo acento',
    'Ámbar en los datos: las cifras, los números del proceso y los de los beneficios. Casi complementario del azul, es el que más separa "dato" de "acción".',
    {
      base: '#0a0a0a', elevated: '#1f1f1f', surface: '#1f1f1f70',
      v500: '#0076fd', v600: '#0076fd', v300: '#66b3ff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#ededed', mid: '#a1a1a1', low: '#8f8f8f', danger: '#ff8f8f',
      ac2: '#ffc53d', ac2Claro: '#fde6b0',
    },
    4.72,
  ),
  paleta(
    'ac2-violeta',
    'Neutro + violeta',
    'Con segundo acento',
    'Violeta en los datos. Cercano al azul, así que el conjunto se lee más unificado y la distinción es más sutil.',
    {
      base: '#0a0a0a', elevated: '#1f1f1f', surface: '#1f1f1f70',
      v500: '#0076fd', v600: '#0076fd', v300: '#66b3ff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#ededed', mid: '#a1a1a1', low: '#8f8f8f', danger: '#ff8f8f',
      ac2: '#a78bfa', ac2Claro: '#e2d9fc',
    },
    4.72,
  ),
  paleta(
    'ac2-teal',
    'Neutro + teal',
    'Con segundo acento',
    'Teal en los datos. Frío como el azul pero claramente separado: la lectura queda técnica.',
    {
      base: '#0a0a0a', elevated: '#1f1f1f', surface: '#1f1f1f70',
      v500: '#0076fd', v600: '#0076fd', v300: '#66b3ff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#ededed', mid: '#a1a1a1', low: '#8f8f8f', danger: '#ff8f8f',
      ac2: '#2dd4bf', ac2Claro: '#8ee3d8',
    },
    4.72,
  ),
  paleta(
    'ac2-lima',
    'Neutro + lima',
    'Con segundo acento',
    'Lima en los datos. El más luminoso: los números pesan tanto como los títulos.',
    {
      base: '#0a0a0a', elevated: '#1f1f1f', surface: '#1f1f1f70',
      v500: '#0076fd', v600: '#0076fd', v300: '#66b3ff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#ededed', mid: '#a1a1a1', low: '#8f8f8f', danger: '#ff8f8f',
      ac2: '#bef264', ac2Claro: '#e9f9cd',
    },
    4.72,
  ),
  paleta(
    'ac2-coral',
    'Neutro + coral',
    'Con segundo acento',
    'Coral en los datos. Cálido y con presencia, sin llegar al rojo que el sitio usa para error.',
    {
      base: '#0a0a0a', elevated: '#1f1f1f', surface: '#1f1f1f70',
      v500: '#0076fd', v600: '#0076fd', v300: '#66b3ff',
      b500: '#00b7e0', b400: '#33c8eb',
      hi: '#ededed', mid: '#a1a1a1', low: '#8f8f8f', danger: '#ff8f8f',
      ac2: '#fb7185', ac2Claro: '#fdd9de',
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
    'Con segundo acento': 'Con segundo acento',
  },
  nota: 'Aplicar una paleta reemplaza los doce colores. Después se puede ajustar cada uno en la pestaña Color.',
}
