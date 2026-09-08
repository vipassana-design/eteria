import type { Landing, LandingSlug } from '@/types'

/** Contenido de las tres landings internas (PLAN.md §5).
 *
 *  Los titulares llevan una palabra que rota. Siguiendo el criterio de
 *  copy (§1), las palabras nombran partes concretas del trabajo en vez
 *  de vender: "vender / escalar / durar" era promesa, "catálogo /
 *  checkout / envíos" es lo que efectivamente se construye.
 */

export const landings: Record<LandingSlug, Landing> = {
  ecommerce: {
    slug: 'ecommerce',
    titulo: {
      antes: 'Ecommerce',
      palabras: ['con catálogo', 'con checkout', 'con pagos'],
      despues: '',
    },
    bajada:
      'Desarrollamos la tienda completa: la parte que ve el cliente y el panel con el que se administra.',
    tipoPreseleccionado: 'ecommerce',
    beneficios: [
      {
        numero: '01',
        titulo: 'Catálogo y búsqueda',
        descripcion:
          'Productos con variantes, stock, categorías y filtros. Buscador que tolera errores de tipeo y devuelve resultados por relevancia.',
      },
      {
        numero: '02',
        titulo: 'Checkout y pagos',
        descripcion:
          'Checkout en una sola pantalla, con cálculo de envío antes del pago. Integramos Mercado Pago, Stripe o la pasarela que la empresa ya tenga.',
      },
      {
        numero: '03',
        titulo: 'Envíos y logística',
        descripcion:
          'Cotización por código postal, etiquetas y seguimiento. Se conecta con Andreani, OCA o el operador que corresponda.',
      },
      {
        numero: '04',
        titulo: 'Panel de administración',
        descripcion:
          'Alta de productos, gestión de pedidos, estados de envío e informes de venta. Lo opera el equipo de la empresa.',
      },
    ],
    mockup: {
      url: 'tienda-atelier.com/campera-lino',
      alt: 'Ficha de producto de una tienda online: galería, precio, talles, cálculo de envío y checkout en tres pasos',
    },
    meta: {
      title: 'Desarrollo de ecommerce a medida',
      description:
        'Desarrollamos tiendas online con catálogo, checkout, pagos, envíos y panel de administración. Integradas con las pasarelas y la logística que ya usás.',
    },
  },

  'sitios-institucionales': {
    slug: 'sitios-institucionales',
    titulo: {
      antes: 'Sitios web para',
      palabras: ['empresas', 'estudios', 'comercios'],
      despues: '',
    },
    bajada:
      'El sitio de la empresa, con la estructura de contenido pensada para que la información se encuentre.',
    tipoPreseleccionado: 'institucional',
    beneficios: [
      {
        numero: '01',
        titulo: 'Estructura y contenido',
        descripcion:
          'Definimos las secciones y la jerarquía antes de diseñar, para que cada página tenga un propósito y un lugar en la navegación.',
      },
      {
        numero: '02',
        titulo: 'Búsqueda e indexación',
        descripcion:
          'URLs legibles, metadatos por página, datos estructurados y sitemap. El sitio se sirve renderizado, no depende de JavaScript para indexarse.',
      },
      {
        numero: '03',
        titulo: 'Panel de contenido',
        descripcion:
          'El equipo actualiza textos, secciones, novedades e imágenes desde un panel, con vista previa antes de publicar.',
      },
      {
        numero: '04',
        titulo: 'Velocidad',
        descripcion:
          'Imágenes optimizadas por dispositivo, fuentes servidas desde el propio dominio y CSS mínimo. Se mide con Lighthouse antes de entregar.',
      },
    ],
    mockup: {
      url: 'norvex.com/panel/novedades',
      alt: 'Panel de contenido de un sitio institucional: árbol de secciones, editor de texto, campos de búsqueda, biblioteca de imágenes y barra de publicación',
    },
    meta: {
      title: 'Desarrollo de sitios institucionales',
      description:
        'Sitios institucionales rápidos e indexables, con panel de contenido para que el equipo los actualice. Estructura pensada para búsqueda.',
    },
  },

  'software-a-medida': {
    slug: 'software-a-medida',
    titulo: {
      antes: 'Software para',
      palabras: ['gestión', 'operaciones', 'integraciones'],
      despues: '',
    },
    bajada:
      'Sistemas internos y plataformas construidos sobre el proceso que la empresa ya tiene.',
    tipoPreseleccionado: 'webapp',
    beneficios: [
      {
        numero: '01',
        titulo: 'Paneles de gestión',
        descripcion:
          'Tableros con los datos que el equipo mira todos los días, filtros por lo que realmente se consulta, y exportación a planilla.',
      },
      {
        numero: '02',
        titulo: 'Usuarios y permisos',
        descripcion:
          'Roles con alcance definido: quién ve qué y quién puede modificarlo. Registro de quién hizo cada cambio y cuándo.',
      },
      {
        numero: '03',
        titulo: 'Integraciones',
        descripcion:
          'Conexión con los sistemas que ya están en uso: facturación, stock, CRM, bancos o APIs propias.',
      },
      {
        numero: '04',
        titulo: 'Automatizaciones',
        descripcion:
          'Tareas que hoy se hacen a mano y se repiten: cargas, cruces de datos, avisos por mail, generación de informes periódicos.',
      },
    ],
    mockup: {
      url: 'app.gestion.com/pedidos/4821',
      alt: 'Detalle de un pedido en un sistema de gestión: línea de tiempo del estado, integraciones con facturación, stock y logística, y registro de actividad',
    },
    meta: {
      title: 'Desarrollo de software y webapps a medida',
      description:
        'Paneles de gestión, plataformas con usuarios e integraciones con los sistemas que la empresa ya tiene. Software construido sobre el proceso real.',
    },
  },
}

/** Etiquetas comunes a las tres landings. */
export const landingUi = {
  volverAlInicio: 'Volver al inicio',
  ctaHero: 'Cotizar mi proyecto',
  ctaSecundario: 'Ver soluciones',
  tituloBeneficios: 'Qué incluye',
  tituloProceso: 'Cómo',
  tituloProcesoDegrade: 'trabajamos',
  bajadaProceso: 'El mismo proceso en los cuatro casos.',
  tituloContacto: 'Contacto',
  tituloContactoDegrade: 'y presupuesto',
}
