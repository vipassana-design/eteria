import type { Servicio } from '@/types'

/** Sección "Servicios" (PLAN.md §4.4).
 *  Tres cards que se apilan al scrollear. Cada una: mitad texto, mitad
 *  mockup a color. */
export const seccionServicios = {
  titulo: 'Tipos de',
  tituloDegrade: 'proyecto',
  bajada: 'Tres áreas de trabajo. En las tres el desarrollo es a medida.',
}

export const servicios: Servicio[] = [
  {
    id: 'ecommerce',
    titulo: 'Ecommerce',
    gancho: 'Tiendas online con catálogo, checkout y administración.',
    descripcion:
      'Catálogo, carrito, checkout, pagos, envíos y panel de administración. Integramos las pasarelas y los operadores logísticos que la empresa ya usa, y la arquitectura contempla el crecimiento.',
    textoEnlace: 'Ver ecommerce',
    href: '/ecommerce',
    pantalla: 'tienda',
    pantallaUrl: 'tienda-indumentaria.com',
    pantallaAlt: 'Mockup de una tienda online con catálogo de productos y carrito',
  },
  {
    id: 'sitios-institucionales',
    titulo: 'Sitios institucionales',
    gancho: 'El sitio de la empresa, su contenido y su búsqueda.',
    descripcion:
      'Sitios rápidos e indexables, con la estructura de contenido y las URLs pensadas para búsqueda. Se entregan con un panel para que el equipo actualice textos, secciones e imágenes.',
    textoEnlace: 'Ver sitios institucionales',
    href: '/sitios-institucionales',
    pantalla: 'sitio',
    pantallaUrl: 'estudio-legal.com',
    pantallaAlt: 'Mockup de un sitio institucional con hero editorial y áreas de servicio',
  },
  {
    id: 'software-a-medida',
    titulo: 'Webapps y software a medida',
    gancho: 'Sistemas internos, plataformas e integraciones.',
    descripcion:
      'Paneles de gestión, plataformas con usuarios y permisos, automatización de tareas repetitivas e integraciones con los sistemas que ya están en uso: facturación, stock o CRM.',
    textoEnlace: 'Ver software a medida',
    href: '/software-a-medida',
    pantalla: 'panel',
    pantallaUrl: 'app.gestion.com/panel',
    pantallaAlt: 'Mockup de un panel de administración con métricas y tabla de pedidos',
  },
]
