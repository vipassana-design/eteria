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
    contador: (actual: number, total: number) => `${actual} de ${total}`,
  },
}

/** Las nueve plantillas, tres por línea de negocio.
 *
 *  El orden es el del carrusel: se alternan las líneas para que dos
 *  del mismo rubro no queden pegadas. Con las tres de ecommerce
 *  seguidas, el carrusel se lee como un catálogo de tiendas y no como
 *  el alcance de la agencia. */
export const plantillas: Plantilla[] = [
  {
    slug: 'atelier',
    titulo: 'Atelier',
    rubro: 'Indumentaria',
    linea: 'Ecommerce',
    url: 'atelier.com.ar',
    alt: 'Tienda de indumentaria con catálogo editorial, grilla de productos y bloque de temporada',
    scrollea: true,
  },
  {
    slug: 'clinica',
    titulo: 'Clínica Norte',
    rubro: 'Salud',
    linea: 'Institucional',
    url: 'clinicanorte.com.ar',
    alt: 'Sitio de una clínica con especialidades, cuerpo médico y solicitud de turnos',
    scrollea: true,
  },
  {
    slug: 'panel',
    titulo: 'Panel de gestión',
    rubro: 'Dashboard',
    linea: 'Software a medida',
    url: 'app.gestion.com',
    alt: 'Panel de administración con métricas, gráfico de facturación y tabla de pedidos',
    scrollea: false,
  },
  {
    slug: 'vertice',
    titulo: 'Vértice',
    rubro: 'Tecnología',
    linea: 'Ecommerce',
    url: 'vertice.com.ar',
    alt: 'Tienda de tecnología con comparador de especificaciones y stock por sucursal',
    scrollea: true,
  },
  {
    slug: 'terrazas',
    titulo: 'Terrazas',
    rubro: 'Inmobiliaria',
    linea: 'Institucional',
    url: 'terrazas.com.ar',
    alt: 'Sitio inmobiliario con búsqueda de propiedades, fichas y datos de la zona',
    scrollea: true,
  },
  {
    slug: 'flota',
    titulo: 'Flota',
    rubro: 'Logística',
    linea: 'Software a medida',
    url: 'flota.app',
    alt: 'Panel de logística con mapa de vehículos en ruta y estados de entrega',
    scrollea: false,
  },
  {
    slug: 'feria',
    titulo: 'Feria',
    rubro: 'Marketplace',
    linea: 'Ecommerce',
    url: 'feria.com.ar',
    alt: 'Marketplace con múltiples vendedores, filtros laterales y reputación por tienda',
    scrollea: true,
  },
  {
    slug: 'marquez',
    titulo: 'Márquez & Asociados',
    rubro: 'Jurídico',
    linea: 'Institucional',
    url: 'marquez-asoc.com.ar',
    alt: 'Sitio de un estudio jurídico con áreas de práctica, socios y formulario de consulta',
    scrollea: true,
  },
  {
    slug: 'legajos',
    titulo: 'Legajos',
    rubro: 'Recursos humanos',
    linea: 'Software a medida',
    url: 'legajos.app',
    alt: 'Sistema de recursos humanos con legajos del personal, licencias y organigrama',
    scrollea: true,
  },
]
