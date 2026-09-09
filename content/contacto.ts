import type { OpcionSelect } from '@/components/ui/Campo'
import type { TipoProyecto } from '@/types'

/** Sección "Contacto" (PLAN.md §4.8).
 *  El mismo componente se reutiliza en las tres landings con la prop
 *  `tipoPreseleccionado`. */
export const contactoSeccion = {
  titulo: 'Contacto',
  tituloDegrade: 'y presupuesto',
  bajada:
    'Contanos qué necesitás construir, con qué se tiene que integrar y en qué plazo. Nos ponemos en contacto a la brevedad.',

  /** Datos de contacto directo, al lado del formulario. */
  directo: {
    tituloEmail: 'Por mail',
    tituloWhatsapp: 'Por WhatsApp',
    notaWhatsapp: 'Lunes a viernes, de 9 a 18.',
  },

  campos: {
    nombre: { label: 'Nombre', placeholder: 'Tu nombre' },
    email: { label: 'Email', placeholder: 'nombre@empresa.com' },
    empresa: { label: 'Empresa', placeholder: 'Opcional' },
    tipo: { label: 'Tipo de proyecto' },
    mensaje: {
      label: 'Mensaje',
      placeholder: 'Qué necesitás construir, con qué se tiene que integrar y en qué plazo.',
    },
  },

  enviar: 'Enviar consulta',
  enviando: 'Enviando',

  /** Estado de confirmación, en el lugar del formulario. */
  confirmacion: {
    titulo: 'Recibimos tu consulta',
    texto: 'Nos ponemos en contacto a la brevedad, a la dirección que dejaste.',
    volver: 'Enviar otra consulta',
  },

  /** Error general del envío, arriba del formulario. */
  errorGeneral: 'Revisá los campos marcados.',
}

export const tiposProyecto: OpcionSelect[] = [
  { valor: '', etiqueta: 'Elegí una opción' },
  { valor: 'ecommerce', etiqueta: 'Ecommerce' },
  { valor: 'institucional', etiqueta: 'Sitio institucional' },
  { valor: 'webapp', etiqueta: 'Desarrollo a medida' },
  { valor: 'otro', etiqueta: 'Otro' },
]

/** Verifica que un valor del select sea un tipo válido. */
export function esTipoProyecto(valor: string): valor is TipoProyecto {
  return ['ecommerce', 'institucional', 'webapp', 'otro'].includes(valor)
}
