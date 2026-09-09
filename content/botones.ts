/** Degradés de CTA para el laboratorio (PLAN.md §15).
 *
 *  Los botones se prueban aparte del resto de la paleta: son el
 *  llamado a la acción, así que necesitan más saturación que un acento
 *  de interfaz. Los diez están entre 78% y 96% de saturación en su
 *  color medio —nada apagado— y todos pasan AA contra el texto oscuro
 *  que llevan encima.
 *
 *  **Qué afecta cada uno.** El primario cambia su degradé y el color
 *  del glow que aparece en hover. El secundario, que es transparente,
 *  cambia solo el color del borde en hover. Los dos salen de los
 *  mismos tres tokens.
 *
 *  **Sin elegir ninguno**, los tokens derivan de la paleta vigente: el
 *  degradé es el de marca y el glow sale del acento principal. Elegir
 *  uno los desacopla, así que se puede combinar cualquier paleta con
 *  cualquier CTA.
 */

export interface DegradeBoton {
  id: string
  nombre: string
  /** Los tres puntos del degradé: claro, medio y cierre. */
  de: string
  medio: string
  a: string
  /** Contraste del texto del botón contra el punto más exigente. */
  contraste: number
}

/** El ángulo es el mismo que el degradé de marca: 100°. */
export const ANGULO_BOTON = 100

export const degradesBoton: DegradeBoton[] = [
  { id: 'violeta-azul', nombre: 'Violeta a azul', de: '#c4b5fd', medio: '#8b5cf6', a: '#3b82f6', contraste: 4.68 },
  { id: 'indigo-violeta', nombre: 'Índigo a violeta', de: '#a5b4fc', medio: '#818cf8', a: '#c084fc', contraste: 6.64 },
  { id: 'azul-cian', nombre: 'Azul a cian', de: '#7dd3fc', medio: '#0ea5e9', a: '#06b6d4', contraste: 7.14 },
  { id: 'cian-violeta', nombre: 'Cian a violeta', de: '#67e8f9', medio: '#22d3ee', a: '#8b5cf6', contraste: 4.68 },
  { id: 'teal-verde', nombre: 'Teal a verde', de: '#5eead4', medio: '#14b8a6', a: '#22c55e', contraste: 7.95 },
  { id: 'lima-teal', nombre: 'Lima a teal', de: '#d9f99d', medio: '#a3e635', a: '#2dd4bf', contraste: 10.64 },
  { id: 'ambar-naranja', nombre: 'Ámbar a naranja', de: '#fde047', medio: '#fbbf24', a: '#f97316', contraste: 7.06 },
  { id: 'naranja-rosa', nombre: 'Naranja a rosa', de: '#fdba74', medio: '#fb923c', a: '#f472b6', contraste: 7.48 },
  { id: 'coral-ambar', nombre: 'Coral a ámbar', de: '#fda4af', medio: '#fb7185', a: '#fbbf24', contraste: 7.36 },
  { id: 'rosa-violeta', nombre: 'Rosa a violeta', de: '#f9a8d4', medio: '#ec4899', a: '#8b5cf6', contraste: 4.68 },
]

/** Los tokens que escribe un degradé elegido.
 *
 *  El glow toma el color medio al 55% de alfa, que es la intensidad
 *  que ya tenía el botón. El borde del secundario toma el mismo color
 *  pero al 45%, más contenido: es un borde de 1px, no un resplandor. */
export function tokensDeBoton(d: DegradeBoton): Record<string, string> {
  return {
    '--grad-boton': `linear-gradient(${ANGULO_BOTON}deg, ${d.de} 0%, ${d.medio} 45%, ${d.a} 100%)`,
    '--glow-boton': `color-mix(in srgb, ${d.medio} 55%, transparent)`,
    '--borde-boton-hover': `color-mix(in srgb, ${d.medio} 45%, transparent)`,
  }
}

export const botonesUi = {
  titulo: 'Botones',
  bajada:
    'El degradé del primario y el borde del secundario en hover. Sin elegir ninguno, salen de la paleta.',
  porDefecto: 'De la paleta',
  porDefectoNota: 'El degradé de marca y el glow del acento principal.',
  contraste: 'texto',
  nota: 'Los diez pasan AA contra el texto del botón. El número es el contraste en el punto más exigente del degradé.',
}
