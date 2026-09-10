import type { Plantilla } from '@/types'

/** Sección "Soluciones digitales" (PLAN.md §4.6 y §16).
 *
 *  Las plantillas son de demostración: no se declara autoría ni se
 *  atribuyen a clientes. Se presentan como capacidades, no como
 *  portfolio (§1). */
export const seccionSoluciones = {
  titulo: 'Soluciones',
  tituloDegrade: 'digitales',
  bajada:
    'Explorá algunas propuestas conceptuales de productos y experiencias digitales.',
  /** Etiquetas de la navegación del carrusel y del modal. */
  ui: {
    anterior: 'Ver anterior',
    siguiente: 'Ver siguiente',
    abrir: 'Ver en detalle',
    cerrar: 'Cerrar',
    pista: 'Arrastrá para ver más',
    /** Mientras la plantilla carga dentro del iframe. */
    cargando: 'Cargando la propuesta',
    contador: (actual: number, total: number) => `${actual} de ${total}`,
    /** El switch de vista del modal.
     *
     *  Las plantillas son responsivas, así que la vista mobile estrecha
     *  el iframe a 390px y el documento embebido responde con sus
     *  propios breakpoints: se ve la versión mobile real, no una
     *  maqueta. */
    vista: {
      grupo: 'Cambiar la vista',
      escritorio: 'Escritorio',
      mobile: 'Mobile',
    },
  },
}

/** Las nueve plantillas, tres por línea de negocio.
 *
 *  **Dos decisiones que vienen del cliente y valen para las nueve:**
 *
 *  1. **La barra de direcciones va vacía.** Las URLs de ejemplo de la
 *     primera versión —`norvex.com`, `fluxo.app`, `estudio-legal.com`—
 *     existen y son de terceros; una llegó a disparar una advertencia
 *     de seguridad del navegador. Un mockup no puede dirigir a un sitio
 *     ajeno ni visualmente: quien lo lee puede tipearlo. El campo se
 *     conserva porque el marco de navegador necesita el espacio.
 *
 *  2. **El `titulo` describe el tipo de proyecto, no el nombre del
 *     sitio.** Los nombres son inventados y no tienen por qué llevarse
 *     el protagonismo: lo que el visitante necesita saber es qué clase
 *     de trabajo es. El nombre vive dentro de la plantilla, donde
 *     corresponde.
 *
 *  El orden es el del carrusel: se alternan las líneas para que dos del
 *  mismo rubro no queden pegadas. Con las tres de ecommerce seguidas,
 *  el carrusel se lee como un catálogo de tiendas y no como el alcance
 *  de la agencia. */
export const plantillas: Plantilla[] = [
  {
    slug: 'atelier',
    titulo: 'Tienda online de indumentaria',
    rubro: 'Ecommerce',
    linea: 'Ecommerce',
    url: '',
    alt: 'Tienda de indumentaria con catálogo editorial, grilla de productos y bloque de temporada',
    scrollea: true,
  },
  {
    slug: 'clinica',
    titulo: 'Sitio de una clínica médica',
    rubro: 'Institucional',
    linea: 'Institucional',
    url: '',
    alt: 'Sitio de una clínica con especialidades, cuerpo médico y solicitud de turnos',
    scrollea: true,
  },
  {
    slug: 'panel',
    titulo: 'Panel de gestión comercial',
    rubro: 'Software a medida',
    linea: 'Software a medida',
    url: '',
    alt: 'Panel de administración con métricas, gráfico de facturación y tabla de pedidos',
    scrollea: false,
  },
  {
    slug: 'vertice',
    titulo: 'Tienda de productos de tecnología',
    rubro: 'Ecommerce',
    linea: 'Ecommerce',
    url: '',
    alt: 'Tienda de tecnología con comparador de especificaciones y stock por sucursal',
    scrollea: true,
  },
  {
    slug: 'terrazas',
    titulo: 'Sitio de una inmobiliaria',
    rubro: 'Institucional',
    linea: 'Institucional',
    url: '',
    alt: 'Sitio inmobiliario con búsqueda de propiedades, fichas y datos de la zona',
    scrollea: true,
  },
  {
    slug: 'flota',
    titulo: 'Panel de logística y flota',
    rubro: 'Software a medida',
    linea: 'Software a medida',
    url: '',
    alt: 'Panel de logística con mapa de vehículos en ruta y estados de entrega',
    scrollea: false,
  },
  {
    slug: 'feria',
    titulo: 'Marketplace de varios vendedores',
    rubro: 'Ecommerce',
    linea: 'Ecommerce',
    url: '',
    alt: 'Marketplace con múltiples vendedores, filtros laterales y reputación por tienda',
    scrollea: true,
  },
  {
    slug: 'marquez',
    titulo: 'Sitio de un estudio jurídico',
    rubro: 'Institucional',
    linea: 'Institucional',
    url: '',
    alt: 'Sitio de un estudio jurídico con áreas de práctica, socios y formulario de consulta',
    scrollea: true,
  },
  {
    slug: 'legajos',
    titulo: 'Sistema de recursos humanos',
    rubro: 'Software a medida',
    linea: 'Software a medida',
    url: '',
    alt: 'Sistema de recursos humanos con legajos del personal, licencias y organigrama',
    scrollea: true,
  },
]
