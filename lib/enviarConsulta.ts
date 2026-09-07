import type { TipoProyecto } from '@/types'

/** Envío del formulario de contacto.
 *
 *  ─────────────────────────────────────────────────────────────────
 *  PENDIENTE: hoy simula el envío. El hosting no está definido y de
 *  eso depende el método (PLAN.md §8.4).
 *
 *  Para conectarlo hay que cambiar SOLO el cuerpo de `enviarConsulta`.
 *  El formulario consume el tipo `ResultadoEnvio` y no sabe nada de
 *  cómo viaja el mensaje, así que no hay que tocar componentes.
 *  ─────────────────────────────────────────────────────────────────
 */

export interface DatosConsulta {
  nombre: string
  email: string
  empresa: string
  tipo: TipoProyecto | ''
  mensaje: string
  /** Honeypot: si viene con contenido, es un bot (§4.8). */
  website: string
}

export type ResultadoEnvio =
  | { ok: true }
  | {
      ok: false
      /** Mensaje para mostrarle a la persona, ya redactado. */
      error: string
    }

/** Simulación activa mientras no haya endpoint.
 *  Se apaga sola cuando se implemente el envío real. */
const SIMULAR = true

/** Latencia simulada, para que los estados del formulario se vean como
 *  se van a ver en producción. */
const DEMORA_SIMULADA = 1200

export async function enviarConsulta(datos: DatosConsulta): Promise<ResultadoEnvio> {
  // El honeypot se corta acá, antes de cualquier envío: si un bot
  // completó el campo oculto, se responde ok sin mandar nada.
  if (datos.website.trim() !== '') {
    return { ok: true }
  }

  if (SIMULAR) {
    await new Promise((r) => setTimeout(r, DEMORA_SIMULADA))

    // Una dirección de prueba para poder ver el estado de error sin
    // romper nada. Se elimina junto con la simulación.
    if (datos.email.trim().toLowerCase() === 'error@test.com') {
      return { ok: false, error: 'No pudimos enviar la consulta. Probá de nuevo en un momento.' }
    }

    return { ok: true }
  }

  // ── Implementación real ────────────────────────────────────────
  // Sirve para las dos opciones de §8.4: cambia la URL, no el resto.
  //
  //   Node (route handler + Nodemailer):  '/api/contacto'
  //   cPanel compartido (script PHP):     '/contacto.php'
  //
  // En los dos casos el endpoint tiene que responder JSON
  // { ok: true } o { ok: false, error: '...' }, y validar de nuevo del
  // lado del servidor: la validación del cliente es para la persona,
  // no es una barrera.
  try {
    const respuesta = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })

    if (!respuesta.ok) {
      return { ok: false, error: 'No pudimos enviar la consulta. Probá de nuevo en un momento.' }
    }

    const cuerpo = (await respuesta.json()) as ResultadoEnvio
    return cuerpo
  } catch {
    // Sin conexión, o el endpoint no responde.
    return {
      ok: false,
      error: 'No pudimos conectar con el servidor. Revisá tu conexión y probá de nuevo.',
    }
  }
}

/** Destino del POST. Se define al resolver el hosting. */
const ENDPOINT = '/api/contacto'
