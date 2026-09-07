import type { DatosConsulta } from './enviarConsulta'

/** Validación del formulario de contacto (PLAN.md §4.8).
 *
 *  Vive aparte del componente para que el endpoint la reutilice cuando
 *  se implemente: la validación del cliente es para la persona que
 *  completa, no es una barrera. El servidor tiene que validar igual.
 */

export type ErroresConsulta = Partial<Record<keyof DatosConsulta, string>>

/** Mínimos de longitud, también aplicables en el servidor. */
export const LIMITES = {
  nombreMin: 2,
  mensajeMin: 20,
  mensajeMax: 2000,
} as const

/** Chequeo de email deliberadamente laxo: alcanza con que tenga forma
 *  de dirección. Una expresión estricta rechaza direcciones válidas y
 *  el rebote del mail es la verificación real. */
const FORMA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const mensajes = {
  nombreRequerido: 'Escribí tu nombre.',
  nombreCorto: 'El nombre es demasiado corto.',
  emailRequerido: 'Escribí tu email para que podamos responderte.',
  emailInvalido: 'Revisá el email: no parece una dirección válida.',
  tipoRequerido: 'Elegí un tipo de proyecto.',
  mensajeRequerido: 'Contanos qué necesitás construir.',
  mensajeCorto: `Contanos un poco más: al menos ${LIMITES.mensajeMin} caracteres.`,
  mensajeLargo: `El mensaje es demasiado largo (máximo ${LIMITES.mensajeMax} caracteres).`,
} as const

export function validarConsulta(datos: DatosConsulta): ErroresConsulta {
  const errores: ErroresConsulta = {}

  const nombre = datos.nombre.trim()
  if (nombre === '') errores.nombre = mensajes.nombreRequerido
  else if (nombre.length < LIMITES.nombreMin) errores.nombre = mensajes.nombreCorto

  const email = datos.email.trim()
  if (email === '') errores.email = mensajes.emailRequerido
  else if (!FORMA_EMAIL.test(email)) errores.email = mensajes.emailInvalido

  if (datos.tipo === '') errores.tipo = mensajes.tipoRequerido

  const mensaje = datos.mensaje.trim()
  if (mensaje === '') errores.mensaje = mensajes.mensajeRequerido
  else if (mensaje.length < LIMITES.mensajeMin) errores.mensaje = mensajes.mensajeCorto
  else if (mensaje.length > LIMITES.mensajeMax) errores.mensaje = mensajes.mensajeLargo

  // La empresa es opcional y el honeypot no se valida acá: lo resuelve
  // el envío, que responde ok sin mandar nada.
  return errores
}

export function hayErrores(errores: ErroresConsulta): boolean {
  return Object.keys(errores).length > 0
}
