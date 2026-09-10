'use client'

import { useEffect } from 'react'

/** Esconde el cromo del sitio dentro del iframe de plantilla (§16).
 *
 *  Las plantillas viven en rutas bajo `app/`, así que heredan el root
 *  layout con su header, footer, botón de WhatsApp y capas de fondo.
 *  Dentro del iframe nada de eso corresponde: la plantilla es un sitio
 *  ajeno.
 *
 *  **Se resuelve con un `<style>` y no con un atributo en el body.** La
 *  primera versión usaba un `<script>` inline que escribía
 *  `body[data-plantilla]`, y eso producía un mismatch de hidratación:
 *  React compara el DOM contra el HTML del servidor, que no tiene el
 *  atributo porque el root layout no sabe qué ruta se sirve. Un
 *  `useEffect` en su lugar correría después del primer paint y se vería
 *  el header del sitio aparecer y desaparecer.
 *
 *  El `<style>` viaja en el HTML del servidor, así que el cromo nunca
 *  se pinta, y React lo renderiza igual en las dos pasadas. El
 *  `useEffect` solo agrega el atributo, que es lo que usa la regla de
 *  `globals.css` para el caso de una navegación del lado del cliente
 *  —y lo saca al desmontar, para que volver al sitio no deje el header
 *  oculto.
 */
/** Los selectores excluyen lo que esté dentro de `.raiz-plantilla`.
 *
 *  Sin el `:not()`, `[data-flotante]` y los selectores de header/footer
 *  atrapan también los de la plantilla —que es justo lo que hay que
 *  mostrar. Medido: la barra de Atelier salía con `display: none` y 0px
 *  de alto. Los de `#capa-sitio` ya están acotados por el ancestro,
 *  pero se dejan explícitos para que el patrón se lea igual en los
 *  cuatro. */
const OCULTAR =
  '#capa-sitio > header:not(.raiz-plantilla *),' +
  '#capa-sitio > footer:not(.raiz-plantilla *),' +
  '[data-flotante]:not(.raiz-plantilla *),' +
  '[data-capa-fondo]:not(.raiz-plantilla *),' +
  // El overlay del menú mobile del sitio. Queda en `opacity: 0` y con
  // `pointer-events: none`, así que no bloquea nada —pero su
  // `backdrop-filter: blur(24px)` **se aplica igual con opacidad 0**, y
  // dentro del iframe eso desenfoca la plantilla entera en mobile.
  // Medido en /plantillas/atelier a 390px: display flex, visibility
  // visible, 390×844.
  '#menu-mobile:not(.raiz-plantilla *)' +
  ' { display: none !important }'

export default function MarcaBody() {
  useEffect(() => {
    document.body.dataset.plantilla = 'true'
    return () => {
      delete document.body.dataset.plantilla
    }
  }, [])

  return (
    <style
      // Las extensiones de modo oscuro le agregan una clase a los
      // `<style>` del documento antes de que React hidrate —vista en
      // producción como `native-dark-class-modified`—, y React avisa
      // que el árbol no coincide con su HTML.
      //
      // No es un bug del sitio y no hay forma de evitar que la
      // extensión lo toque; `suppressHydrationWarning` existe para
      // exactamente este caso. Solo silencia este nodo: cualquier otro
      // mismatch real sigue apareciendo.
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: OCULTAR }}
    />
  )
}
