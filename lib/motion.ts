/** Tokens de motion (PLAN.md §2.4).
 *
 *  Principio rector: una sola cosa se mueve por vez y cada
 *  movimiento responde a algo.
 */

export const ease = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  snap: 'expo.out',
} as const

export const dur = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
} as const

/** true si el usuario pidió menos movimiento.
 *  Devuelve false en el servidor, donde no hay matchMedia. */
export function prefiereMenosMovimiento(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Breakpoint a partir del cual se considera desktop.
 *  Es el corte que usan las partículas y el scroll suavizado (§7). */
export const BP_DESKTOP = 1024

export function esDesktop(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(`(min-width: ${BP_DESKTOP}px)`).matches
}
