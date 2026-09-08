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
    gancho: 'Tiendas online para vender y administrar el negocio.',
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
    gancho: 'La cara pública de la empresa, con su contenido al día.',
    descripcion:
      'Definimos las secciones y la jerarquía del contenido para que cada página tenga un propósito claro. El equipo administra textos, novedades, imágenes y documentos desde un panel propio.',
    textoEnlace: 'Ver sitios institucionales',
    href: '/sitios-institucionales',
    pantalla: 'sitio',
    pantallaUrl: 'estudio-legal.com',
    pantallaAlt: 'Mockup de un sitio institucional con hero editorial y áreas de servicio',
  },
  {
    id: 'software-a-medida',
    titulo: 'Software a medida',
    gancho: 'Sistemas que se adaptan a cómo trabaja la empresa.',
    descripcion:
      'Paneles de gestión, plataformas con usuarios y permisos, y automatización de tareas que hoy se hacen a mano. Se conecta con los sistemas que la empresa ya tiene en uso: facturación, stock o CRM.',
    textoEnlace: 'Ver software a medida',
    href: '/software-a-medida',
    pantalla: 'panel',
    pantallaUrl: 'app.gestion.com/panel',
    pantallaAlt: 'Mockup de un panel de administración con métricas y tabla de pedidos',
  },
]
