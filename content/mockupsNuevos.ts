/** Contenido de la ruta temporal /mockups.
 *
 *  Los mockups del ciclo del hero, rehechos con fotos reales y más
 *  detalle. Cada uno se compara contra el actual.
 */

export type MockupId = 'tienda' | 'panel' | 'corporativo'

export interface PropuestaMockup {
  id: MockupId
  numero: string
  nombre: string
  /** Qué pantalla es y por qué esa. */
  linea: string
  /** Qué cambió respecto del actual. */
  cambios: string[]
  /** Fotos que usa, con su origen. */
  fotos: string
}

export const mockupsNuevos: PropuestaMockup[] = [
  {
    id: 'tienda',
    numero: '1',
    nombre: 'Tienda — listado con filtros',
    linea:
      'El listado de categoría, que es donde se ve el catálogo funcionando. La landing de ecommerce ya muestra la ficha de un producto, así que acá va el paso anterior del flujo.',
    cambios: [
      'Cuatro productos con foto real en lugar de rectángulos de color',
      'Columna de filtros con chips aplicados, slider de precio y contadores por talle',
      'Badges de descuento y de novedad, favorito marcado, swatches de color',
      'Precio con tachado, aviso de últimas unidades y selector de orden',
      'Paginado que deja ver que el catálogo tiene 61 productos',
      'Sombras de dos capas en las cards, en vez de bordes duros',
    ],
    fotos: 'Cinco de Pexels (licencia libre, uso comercial sin atribución).',
  },
  {
    id: 'panel',
    numero: '2',
    nombre: 'Panel — tablero de resumen',
    linea:
      'El nivel de arriba del sistema: lo que el equipo mira todos los días. La landing de software muestra el detalle de un pedido, así que acá va el tablero.',
    cambios: [
      'KPIs con comparación contra el período anterior, no solo el valor',
      'Gráfico de dos series (mes actual contra anterior) con tooltip en el último punto',
      'Ranking de productos con barra de proporción e importe',
      'Cola de trabajo con estados, tiempo relativo y una acción por fila',
      'Barra de integraciones con su estado de sincronización',
      'Navegación lateral con contador de pendientes y usuario con sesión abierta',
    ],
    fotos: 'Una, el avatar del usuario. Un panel de gestión no tiene fotos de escena: acá el realismo lo dan los datos.',
  },
  {
    id: 'corporativo',
    numero: '3',
    nombre: 'Institucional — home',
    linea:
      'La cara pública de la empresa. La landing de institucionales muestra el panel de contenido, así que acá va lo que ve el visitante.',
    cambios: [
      'Hero con foto real de planta industrial, con velo en degradé para que el corte no sea duro',
      'Franja de utilidades (inversores, proveedores, idioma) que tienen los sitios corporativos',
      'Tres divisiones de negocio con filete de color e ícono',
      'Franja de cifras con separadores y fecha del dato',
      'Novedades con foto, categoría y fecha, en lugar de barras grises',
      'Volanta sobre el titular para ubicar el sector',
    ],
    fotos: 'Cuatro de Pexels: una refinería para el hero y tres para las novedades.',
  },
]

export const mockupsUi = {
  titulo: 'Mockups del hero',
  bajada:
    'Los tres del ciclo del hero, con fotos reales y densidad de información de una pantalla en uso. Acá se ven quietos y grandes; corriendo se ven en la home y en las landings.',
  aviso: 'Ruta temporal de comparación. No forma parte del sitio.',
  volverAlSitio: 'Volver al sitio',
  siguiente: 'Siguiente',
  anterior: 'Anterior',
  verEnHero: 'Ver los tres corriendo en el hero de la home',
  tituloCambios: 'Qué cambió',
  tituloFotos: 'Fotos',
  /** Pie de la ruta: de dónde salieron las imágenes. */
  origenFotos:
    'Las fotos son de Pexels, con licencia libre para uso comercial sin atribución. Están recortadas al slot que ocupan y convertidas a WebP: las once suman 160 KB. Se reemplazan en /public/mockups manteniendo el nombre del archivo.',
}
