/** Tipos compartidos del contenido del sitio.
 *  Todo objeto de /content se tipa contra estas interfaces. */

/** Slug de las tres landings internas. Se usa como clave de ruta. */
export type LandingSlug = 'ecommerce' | 'sitios-institucionales' | 'software-a-medida'

/** Opciones del campo "tipo de proyecto" del formulario. */
export type TipoProyecto = 'ecommerce' | 'institucional' | 'webapp' | 'otro'

/** Una de las tres cards apiladas de la home. */
export interface Servicio {
  id: LandingSlug
  titulo: string
  gancho: string
  descripcion: string
  textoEnlace: string
  href: string
  /** Imagen del mockup que acompaña la card. */
  imagen: string
  imagenAlt: string
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

/** Mockup del carrusel de ejemplos. */
export interface Mockup {
  id: string
  titulo: string
  rubro: string
  /** Miniatura de la card del carrusel. */
  imagen: string
  /** Imagen larga que se carga al abrir el modal. */
  imagenLarga: string
  alt: string
}

/** Tecnología del grid de stack. */
export interface Tecnologia {
  id: string
  nombre: string
  /** Ruta del logo SVG en /public. */
  logo: string
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
  mockup: { imagen: string; alt: string }
  meta: { title: string; description: string }
}
