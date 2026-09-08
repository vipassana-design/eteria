/** Contenido de las propuestas de hero (ruta temporal /heros).
 *
 *  El copy y la paleta son idénticos en todas a propósito: la
 *  comparación es de dirección visual, no de texto.
 */

export type HeroId = 'franja' | 'reveal' | 'ventana' | 'video' | 'terminal' | 'mixto'

/** El mismo copy del hero actual (content/hero.ts). */
export const copyComun = {
  titulo: { antes: ['Desarrollo', 'de software'], degrade: ['a medida'] },
  bajada:
    'Ecommerce, plataformas de gestión y sitios institucionales. Cada proyecto se construye sobre el alcance que definimos con el cliente.',
  ctaPrimario: { etiqueta: 'Cotizar mi proyecto', href: '/#contacto' },
  ctaSecundario: { etiqueta: 'Ver ejemplos', href: '/#ejemplos' },
  prueba: '+20 años construyendo software',
}

export interface Propuesta {
  id: HeroId
  numero: string
  nombre: string
  linea: string
}

export const propuestas: Propuesta[] = [
  {
    id: 'franja',
    numero: '1',
    nombre: 'Franja',
    linea:
      'Los mockups desfilan en loop en el tercio inferior, cortados por los dos bordes. El mouse sobre una tarjeta frena la marcha y le devuelve el color.',
  },
  {
    id: 'reveal',
    numero: '2',
    nombre: 'Reveal',
    linea:
      'Grilla de mockups apagados a pantalla completa detrás del texto. El cursor funciona como foco: lo que pasa cerca recupera color y nitidez.',
  },
  {
    id: 'ventana',
    numero: '3',
    nombre: 'Ventana que se construye sola',
    linea:
      'Una ventana grande donde la interfaz se arma sola por partes, se desarma y vuelve a armarse con otro tipo de proyecto. El texto queda quieto.',
  },
  {
    id: 'video',
    numero: '4',
    nombre: 'Video',
    linea:
      'Loop abstracto oscuro a pantalla completa con velo y degradé que lo funde hacia abajo. El texto encima, sin competir.',
  },
  {
    id: 'terminal',
    numero: '5',
    nombre: 'Terminal',
    linea:
      'Una sesión de trabajo real: los comandos se escriben solos y van levantando un proyecto. Vincula con el oficio, no con una metáfora.',
  },
  {
    id: 'mixto',
    numero: '6',
    nombre: 'Mixto — terminal y ventanas',
    linea:
      'La terminal levanta el proyecto en cinco segundos y después la ventana arma los tres tipos de proyecto, uno tras otro, antes de volver a la terminal.',
  },
]

/** Etiquetas de la barra de comparación. */
export const herosUi = {
  titulo: 'Propuestas de hero',
  bajada: 'Direcciones distintas, con el mismo copy y la misma paleta.',
  volver: 'Ver todas',
  siguiente: 'Siguiente',
  anterior: 'Anterior',
  aviso: 'Ruta temporal de comparación. No forma parte del sitio.',
}

/** Secuencia de la propuesta Terminal (versión completa, ~11s). */
export const sesionTerminal = [
  { tipo: 'comando', texto: 'npx create-next-app tienda-atelier' },
  { tipo: 'salida', texto: 'Creating a new Next.js app...' },
  { tipo: 'ok', texto: 'Success! Created tienda-atelier' },
  { tipo: 'comando', texto: 'npm i @mercadopago/sdk-react' },
  { tipo: 'salida', texto: 'added 24 packages in 3s' },
  { tipo: 'comando', texto: 'git commit -m "checkout con envío por CP"' },
  { tipo: 'salida', texto: '14 files changed, 486 insertions(+)' },
  { tipo: 'comando', texto: 'npm run build' },
  { tipo: 'salida', texto: 'Compiled successfully in 4.1s' },
  { tipo: 'ok', texto: 'Deployed to production' },
] as const

/** Versión corta para el hero mixto: entra en ~5s, que es lo que dura
 *  antes de pasar a las ventanas. Menos líneas y más cortas. */
export const sesionTerminalCorta = [
  { tipo: 'comando', texto: 'npx create-next-app tienda' },
  { tipo: 'ok', texto: 'Success! Created tienda' },
  { tipo: 'comando', texto: 'npm i @mercadopago/sdk-react' },
  { tipo: 'salida', texto: 'added 24 packages in 3s' },
  { tipo: 'comando', texto: 'npm run build' },
  { tipo: 'ok', texto: 'Deployed to production' },
] as const

/** Etapas de la propuesta Ventana: qué se arma y en qué orden. */
export const etapasVentana = [
  {
    pantalla: 'tienda' as const,
    url: 'tienda-atelier.com',
    etiqueta: 'Ecommerce',
    partes: ['barra', 'hero', 'grilla', 'carrito'],
  },
  {
    pantalla: 'panel' as const,
    url: 'app.gestion.com/panel',
    etiqueta: 'Panel de administración',
    partes: ['barra', 'metricas', 'grafico', 'tabla'],
  },
  {
    pantalla: 'corporativo' as const,
    url: 'norvex.com',
    etiqueta: 'Sitio institucional',
    partes: ['barra', 'hero', 'datos', 'prensa'],
  },
]

/** Fuente del video placeholder de la propuesta 4.
 *  Documentado acá para poder reemplazarlo sin tener que rastrearlo. */
export const videoPlaceholder = {
  archivo: '/heros/abstracto.mp4',
  fuente: 'Pexels',
  id: '2611250',
  url: 'https://www.pexels.com/video/2611250/',
  descargadoDe:
    'https://videos.pexels.com/video-files/2611250/2611250-hd_1920_1080_30fps.mp4',
  peso: '3,3 MB · 1920×1080 · H.264',
  licencia:
    'La licencia de Pexels permite uso comercial y personal sin atribución obligatoria (pexels.com/license). Se eligió Pexels sobre Coverr porque expone descarga directa por URL, sin API key.',
  /** No verificado: Chrome headless no decodifica H.264, así que no se
   *  pudo revisar el contenido del video desde el entorno de trabajo.
   *  Hay que mirarlo en el navegador antes de darlo por bueno. */
  pendienteDeRevision:
    'El contenido visual del video no se pudo verificar automáticamente. Revisar en el navegador que sea suficientemente oscuro y sin movimiento brusco.',
  comoReemplazar:
    'Reemplazar /public/heros/abstracto.mp4 manteniendo el nombre, o cambiar `archivo` acá. Conviene un loop de 8 a 15 segundos, oscuro y de movimiento lento, en H.264 a 1920×1080 y por debajo de 3 MB. Para producción conviene además una versión WebM y un poster JPG del primer frame.',
}
