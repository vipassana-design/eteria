import type { Mockup } from '@/types'

/** Sección "Soluciones" (PLAN.md §4.6).
 *
 *  Los mockups son de demostración: no se declara autoría ni se
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

export const mockups: Mockup[] = [
  {
    id: 'vinos',
    titulo: 'Tienda online',
    rubro: 'Ecommerce de nicho',
    pantalla: 'vinos',
    url: 'bodega-vinos.com',
    alt: 'Tienda de vinos con filtros por varietal y catálogo de etiquetas',
  },
  {
    id: 'corporativo',
    titulo: 'Sitio corporativo',
    rubro: 'Institucional',
    pantalla: 'corporativo',
    url: 'norvex.com',
    alt: 'Sitio corporativo con hero institucional, datos de la compañía y prensa',
  },
  {
    id: 'saas',
    titulo: 'Landing de producto SaaS',
    rubro: 'Startup',
    pantalla: 'saas',
    url: 'fluxo.app',
    alt: 'Landing de producto SaaS con planes de precios y prueba gratuita',
  },
  {
    id: 'indumentaria',
    titulo: 'Tienda de retail',
    rubro: 'Ecommerce',
    pantalla: 'tienda',
    url: 'tienda-indumentaria.com',
    alt: 'Tienda online de indumentaria con grilla de productos y carrito',
  },
  {
    id: 'panel',
    titulo: 'Panel de administración',
    rubro: 'Webapp',
    pantalla: 'panel',
    url: 'app.gestion.com/panel',
    alt: 'Panel de administración con métricas, gráfico de ventas y tabla de pedidos',
  },
  {
    id: 'estudio',
    titulo: 'Estudio de servicios profesionales',
    rubro: 'Institucional',
    pantalla: 'sitio',
    url: 'estudio-legal.com',
    alt: 'Sitio de un estudio profesional con áreas de servicio y formulario de consulta',
  },
]
