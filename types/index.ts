/** Tipos compartidos del contenido del sitio.
 *  Todo objeto de /content se tipa contra estas interfaces. */

/** Slug de las tres landings internas. Se usa como clave de ruta. */
export type LandingSlug = 'ecommerce' | 'sitios-institucionales' | 'software-a-medida'

/** Opciones del campo "tipo de proyecto" del formulario. */
export type TipoProyecto = 'ecommerce' | 'institucional' | 'webapp' | 'otro'

/** Pantalla de placeholder para los mockups del hero.
 *
 *  Son UI dibujada con SVG, no imágenes: los mockups reales son un
 *  pendiente del cliente (PLAN.md §1) y así el hero se puede juzgar
 *  con contenido realista mientras tanto. */
export type PantallaMockup =
  | 'tienda'
  | 'panel'
  | 'sitio'
  | 'vinos'
  | 'saas'
  | 'corporativo'

/** Enlace de navegación. Los del header apuntan a secciones de la home
 *  con ancla; los del footer pueden ir a rutas. */
export interface EnlaceNav {
  etiqueta: string
  href: string
  /** Enlaces hijos, para los elementos que abren submenú. */
  hijos?: EnlaceNav[]
}

/** Una de las tres cards apiladas de la home. */
export interface Servicio {
  id: LandingSlug
  titulo: string
  gancho: string
  descripcion: string
  textoEnlace: string
  href: string
  /** Pantalla de mockup que acompaña la card. Mientras no haya
   *  imágenes reales se dibuja con SVG, igual que en el hero. */
  pantalla: PantallaMockup
  pantallaUrl: string
  pantallaAlt: string
}

/** Etapa del proceso de trabajo (4 en total). */
export interface EtapaProceso {
  /** Número mostrado en la card: '01' … '04'. */
  numero: string
  titulo: string
  descripcion: string
  /** Identificador de la ilustración SVG inline que le corresponde. */
  ilustracion: 'documento' | 'wireframe' | 'codigo' | 'check'
}

/** Mockup del carrusel de ejemplos.
 *  Mientras no haya imágenes reales del cliente, cada uno se dibuja con
 *  la pantalla SVG que le corresponde. */
export interface Mockup {
  id: string
  titulo: string
  rubro: string
  pantalla: PantallaMockup
  /** Texto de la barra de direcciones del marco de navegador. */
  url: string
  alt: string
}

/** Tecnología del grid de stack.
 *  Los logos son SVG inline (no archivos en /public) para poder animar
 *  el paso de monocromo a color en hover con currentColor. */
export interface Tecnologia {
  id: 'nextjs' | 'react' | 'typescript' | 'nodejs' | 'postgresql'
  nombre: string
  /** Color de marca, al que pasa el logo en hover. */
  color: string
}

/** Bloque de beneficio de una landing (layout editorial, sin card). */
export interface Beneficio {
  numero: string
  titulo: string
  descripcion: string
}

/** Contenido completo de una landing interna. */
export interface Landing {
  slug: LandingSlug
  /** Título con la palabra rotante marcada aparte. */
  titulo: { antes: string; palabras: string[]; despues: string }
  bajada: string
  /** Valor preseleccionado en el formulario de la landing. */
  tipoPreseleccionado: TipoProyecto
  beneficios: Beneficio[]
  /** Ventana del hero de la landing. La pantalla SVG se elige por
   *  `slug` en PANTALLAS_LANDING; acá van la URL de la barra y el alt. */
  mockup: { url: string; alt: string }
  meta: { title: string; description: string }
}

/** Una de las tres ventanas de navegador del hero. */
export interface MockupHero {
  id: PantallaMockup
  /** Texto de la barra de direcciones de la ventana. */
  url: string
  /** Descripción para lectores de pantalla. */
  alt: string
}

/** Dato de prueba social (hero y "Qué hacemos"). */
export interface DatoHero {
  valor: string
  etiqueta: string
  /** El valor es una enumeración, no un número: va a cuerpo más chico.
   *  El tamaño de número grande está reservado para las cifras, que es
   *  lo que le da peso al bloque. */
  esTexto?: boolean
}

/** Datos de marca y contacto. Los valores reales son pendientes del
 *  cliente (PLAN.md §1), así que están centralizados para reemplazarlos
 *  en un solo lugar. */
export interface Marca {
  /** Nombre partido para el logo: la segunda mitad va con degradé. */
  nombre: { inicio: string; fin: string }
  descripcion: string
  email: string
  /** Número en formato internacional sin signos, para el enlace wa.me. */
  whatsapp: string
  /** Se muestra al usuario, con formato legible. */
  whatsappVisible: string
}
