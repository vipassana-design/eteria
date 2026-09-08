import type { EnlaceNav, Marca } from '@/types'

/** Marca y contacto.
 *
 *  El nombre, el email y el número de WhatsApp son pendientes del
 *  cliente (PLAN.md §1). Están acá para reemplazarlos en un solo lugar
 *  cuando se definan, en vez de buscarlos por todo el proyecto.
 */
export const marca: Marca = {
  nombre: { inicio: 'Eter', fin: 'ia' },
  descripcion: 'Desarrollo a medida',
  email: 'hola@eteria.com',
  // Placeholder: número de ejemplo hasta que el cliente dé el real.
  whatsapp: '5491100000000',
  whatsappVisible: 'WhatsApp',
}

/** Navegación del header y del menú mobile.
 *  Anclas a las secciones de la home, en el orden en que aparecen. */
export const navegacion: EnlaceNav[] = [
  { etiqueta: 'Sobre nosotros', href: '/#que-hacemos' },
  {
    etiqueta: 'Servicios',
    href: '/#servicios',
    // Con hijos, el header abre un dropdown al pasar el mouse y el menú
    // mobile despliega un submenú al tocar. El enlace propio sigue
    // llevando a la sección de la home.
    hijos: [
      { etiqueta: 'Ecommerce', href: '/ecommerce' },
      { etiqueta: 'Sitios institucionales', href: '/sitios-institucionales' },
      { etiqueta: 'Software a medida', href: '/software-a-medida' },
    ],
  },
  { etiqueta: 'Proceso', href: '/#proceso' },
  { etiqueta: 'Soluciones', href: '/#soluciones' },
]

/** Enlaces del CTA de contacto, compartidos por header, menú y footer. */
export const contacto = {
  etiqueta: 'Contacto',
  href: '/#contacto',
}

/** Columnas del footer (PLAN.md §4.9). Sin redes sociales. */
export const footer = {
  servicios: {
    titulo: 'Servicios',
    enlaces: [
      { etiqueta: 'Ecommerce', href: '/ecommerce' },
      { etiqueta: 'Sitios institucionales', href: '/sitios-institucionales' },
      { etiqueta: 'Software a medida', href: '/software-a-medida' },
    ] satisfies EnlaceNav[],
  },
  contacto: {
    titulo: 'Contacto',
  },
  privacidad: { etiqueta: 'Privacidad', href: '/privacidad' },
  /** El año se resuelve en el render para que no quede fijo. */
  copyright: (anio: number) => `© ${anio} Eteria`,
}

/** Etiquetas de interfaz que no son contenido de sección.
 *  Van acá para no hardcodear texto en JSX. */
export const ui = {
  abrirMenu: 'Abrir menú',
  cerrarMenu: 'Cerrar menú',
  irAlInicio: 'Ir al inicio',
  escribinosPorWhatsapp: 'Escribinos por WhatsApp',
  navegacionPrincipal: 'Navegación principal',
  saltarAlContenido: 'Saltar al contenido',
}
