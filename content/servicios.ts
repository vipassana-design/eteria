import type { Servicio } from '@/types'

/** Sección "Servicios" (PLAN.md §4.4).
 *  Tres cards que se apilan al scrollear. Cada una: mitad texto, mitad
 *  mockup a color. */
export const seccionServicios = {
  titulo: 'Qué',
  tituloDegrade: 'construimos',
  bajada: 'Tres formas de trabajo, con el mismo criterio en las tres.',
}

export const servicios: Servicio[] = [
  {
    id: 'ecommerce',
    titulo: 'Ecommerce',
    gancho: 'Tiendas que venden, no que solo existen.',
    descripcion:
      'Catálogo, checkout, pagos, envíos y panel de administración. Integramos las pasarelas y la logística que ya usás, y el sistema queda preparado para crecer en productos y en tráfico sin rehacerse.',
    textoEnlace: 'Ver más sobre ecommerce',
    href: '/ecommerce',
    pantalla: 'tienda',
    pantallaUrl: 'tienda-indumentaria.com',
    pantallaAlt: 'Mockup de una tienda online con catálogo de productos y carrito',
  },
  {
    id: 'sitios-institucionales',
    titulo: 'Sitios institucionales',
    gancho: 'La cara de tu empresa, bien construida.',
    descripcion:
      'Sitios rápidos, indexables y fáciles de mantener. Estructura pensada para que la información se encuentre y para que el equipo pueda actualizarla sin depender de nadie.',
    textoEnlace: 'Ver más sobre sitios institucionales',
    href: '/sitios-institucionales',
    pantalla: 'sitio',
    pantallaUrl: 'estudio-legal.com',
    pantallaAlt: 'Mockup de un sitio institucional con hero editorial y áreas de servicio',
  },
  {
    id: 'software-a-medida',
    titulo: 'Webapps y software a medida',
    gancho: 'Sistemas que resuelven tu operación.',
    descripcion:
      'Paneles internos, plataformas con usuarios, automatizaciones, integraciones con lo que ya tenés. Software pensado para tu proceso, no un producto genérico al que hay que adaptarse.',
    textoEnlace: 'Ver más sobre software a medida',
    href: '/software-a-medida',
    pantalla: 'panel',
    pantallaUrl: 'app.gestion.com/panel',
    pantallaAlt: 'Mockup de un panel de administración con métricas y tabla de pedidos',
  },
]
