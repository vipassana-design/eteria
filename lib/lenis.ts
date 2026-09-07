import type Lenis from 'lenis'

/** Referencia a la instancia activa de Lenis.
 *
 *  El header necesita pedirle a Lenis que scrollee a una sección, pero
 *  la instancia vive dentro de SmoothScroll. Un módulo con una variable
 *  evita montar un contexto de React para un solo consumidor, y deja el
 *  scroll funcionando igual cuando Lenis no está activo (mobile,
 *  reduced-motion): en ese caso se cae al scroll nativo.
 */

let instancia: Lenis | null = null

export function registrarLenis(l: Lenis | null) {
  instancia = l
}

/** Scrollea a un elemento por selector y deja el hash en la URL.
 *
 *  Devuelve false si no pudo resolver el destino, para que el llamador
 *  deje pasar la navegación normal.
 *
 *  El offset del header no se aplica acá: las secciones llevan
 *  `scroll-mt`, que Lenis respeta igual que el scroll nativo. Sumar un
 *  offset propio lo duplicaría.
 */
export function scrollearA(selector: string): boolean {
  if (typeof document === 'undefined') return false

  const destino = document.querySelector(selector)
  if (!destino) return false

  if (instancia) {
    instancia.scrollTo(destino as HTMLElement)
  } else {
    // Sin Lenis (mobile o reduced-motion): scroll nativo.
    destino.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  // El hash queda en la URL para que el enlace sea compartible y entre
  // en el historial, sin que el navegador haga su propio salto.
  history.pushState(null, '', selector)
  return true
}

/** Lleva el scroll al tope, sin animación.
 *  Lo usa la transición de página: al cambiar de ruta el scroll vuelve
 *  arriba antes del fade in (§6). */
export function irArriba() {
  if (typeof window === 'undefined') return

  if (instancia) {
    instancia.scrollTo(0, { immediate: true })
  }
  // También el scroll nativo: en mobile Lenis no está corriendo, y en
  // desktop hace falta para que el navegador no restaure la posición.
  window.scrollTo(0, 0)
}

/** Detiene o reanuda el scroll. Lo usa el menú mobile para bloquear el
 *  fondo mientras está abierto.
 *
 *  Además marca el body con data-menu-abierto: es la señal que usan los
 *  elementos flotantes (el botón de WhatsApp) para apartarse sin que el
 *  menú tenga que conocerlos.
 */
export function bloquearScroll(bloquear: boolean) {
  if (instancia) {
    if (bloquear) instancia.stop()
    else instancia.start()
  }

  if (typeof document !== 'undefined') {
    // Con Lenis apagado (mobile) el bloqueo tiene que ser por CSS.
    document.body.style.overflow = bloquear ? 'hidden' : ''
    if (bloquear) document.body.dataset.menuAbierto = 'true'
    else delete document.body.dataset.menuAbierto
  }
}
