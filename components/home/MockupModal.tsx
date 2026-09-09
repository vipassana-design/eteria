'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Flip, gsap, useGSAP } from '@/lib/gsap'
import { bloquearScroll } from '@/lib/lenis'
import { prefiereMenosMovimiento } from '@/lib/motion'
import { plantillas, seccionSoluciones } from '@/content/plantillas'
import { PLANTILLAS } from '@/components/plantillas/registro'
import type { Plantilla } from '@/types'

/** Las que ya tienen componente. Es el conjunto por defecto: el de la
 *  home. Las landings pasan su propio subconjunto por `lista`. */
const TODAS = plantillas.filter((p) => PLANTILLAS[p.slug])

interface Props {
  /** Índice de la plantilla abierta, o null si el modal está cerrado. */
  indice: number | null
  onCerrar: () => void
  onCambiar: (indice: number) => void
  /** Estado de la card de origen, capturado por el carrusel en el click.
   *  Tiene que venir de afuera: el modal no está en el DOM mientras
   *  está cerrado, así que no puede medir la posición de partida. */
  estadoOrigen: React.RefObject<Flip.FlipState | null>
  /** Sobre qué conjunto navegan las flechas y el contador.
   *
   *  La home pasa las nueve; cada landing de servicio pasa las tres de
   *  su línea, así el modal recorre el conjunto que el visitante está
   *  mirando y el contador dice "2 de 3" y no "5 de 9". */
  lista?: Plantilla[]
}

/** Modal de previsualización (PLAN.md §4.6 y §16).
 *
 *  La card se expande al centro con Flip desde su posición real. Flechas
 *  laterales para pasar a la siguiente sin cerrar, cierre con Esc, click
 *  fuera o botón, focus trap y aria-modal.
 *
 *  **Dentro va un iframe con la plantilla completa.** El Flip sigue
 *  funcionando sin cambios porque opera sobre el marco de navegador,
 *  que vive en este documento; el iframe es hijo del marco y se escala
 *  con él sin enterarse.
 *
 *  Dos cosas que el iframe obliga a resolver:
 *
 *  - **El teclado no cruza el borde del documento.** Las teclas
 *    presionadas dentro de la plantilla no llegan al `keydown` de acá,
 *    así que `MarcoPlantilla` las reenvía por `postMessage` y este
 *    componente las escucha.
 *  - **El iframe entra con `opacity: 0` y aparece al terminar el
 *    Flip**, con el preview visible mientras dura. Escalar un iframe
 *    con `transform` mientras carga produce un reflow interno visible,
 *    y de paso esto tapa cualquier destello de carga.
 */
export default function MockupModal({
  indice,
  onCerrar,
  onCambiar,
  estadoOrigen,
  lista,
}: Props) {
  const listas = lista ?? TODAS
  const raiz = useRef<HTMLDivElement>(null)
  const marco = useRef<HTMLDivElement>(null)
  const fondo = useRef<HTMLDivElement>(null)
  /** Guarda el índice anterior para saber si es apertura o cambio. */
  const previo = useRef<number | null>(null)
  /** A dónde devolver el foco al cerrar: la card que abrió el modal. */
  const volverElFoco = useRef<HTMLElement | null>(null)

  /** Qué vista muestra el iframe.
   *
   *  Las plantillas son responsivas, así que en lugar de simular un
   *  teléfono con una imagen se estrecha el iframe a 390px y el
   *  documento embebido responde con sus propios breakpoints: lo que se
   *  ve es la plantilla real en mobile, no una maqueta de ella.
   *
   *  Arranca en escritorio siempre, incluso si el visitante está en un
   *  teléfono: ahí el modal ya es angosto y el switch no tendría con
   *  qué contrastar. */
  const [vista, setVista] = useState<'escritorio' | 'mobile'>('escritorio')

  /** El poster que cubre el marco hasta que la plantilla carga. */
  const poster = useRef<HTMLImageElement>(null)

  /** El iframe recién se muestra cuando la plantilla cargó: hasta
   *  entonces se ve el preview.
   *
   *  Va como ref y no como estado porque el linter avisa —con razón—
   *  que un `setState` síncrono dentro del efecto de apertura puede
   *  cascadear renders. Lo único que controla es una opacidad, así que
   *  se escribe en el DOM directo desde el `onLoad` del iframe, que ya
   *  corre fuera del render. */
  const iframe = useRef<HTMLIFrameElement>(null)

  const abierto = indice !== null
  const plantilla = indice !== null ? listas[indice] : null

  /** Cierra y devuelve la vista a escritorio.
   *
   *  El reset va acá y no en el efecto de cierre: un `setState`
   *  síncrono dentro de un efecto puede cascadear renders, y el linter
   *  lo marca con razón. Todos los caminos de cierre —Escape, click
   *  fuera, el botón, el `postMessage` del iframe— pasan por esta
   *  función, así que el estado queda limpio para la próxima apertura. */


  useGSAP(
    () => {
      const contenedor = raiz.current
      const caja = marco.current
      if (!contenedor || !caja) return

      // --- Apertura ---
      if (abierto && previo.current === null) {
        // La vista arranca en escritorio en cada apertura. Va acá y no
        // en el cierre porque un `setState` dentro del efecto de cierre
        // dispara el aviso de renders en cascada, y escribir un ref
        // durante el render tampoco se permite. Mientras el modal está
        // cerrado el valor no se lee, así que resetear al abrir alcanza.
        setVista('escritorio')

        const estado = estadoOrigen.current

        gsap.set(contenedor, { pointerEvents: 'auto' })
        gsap.to(fondo.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })

        if (!estado || prefiereMenosMovimiento()) {
          // Sin estado de origen (o con reduced-motion) no hay nada que
          // "expandir": entra con un fade corto.
          gsap.fromTo(
            caja,
            { opacity: 0, scale: prefiereMenosMovimiento() ? 1 : 0.96 },
            { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' },
          )
          return
        }

        // El estado de la card viene capturado desde el click en el
        // carrusel, con Lenis ya detenido (medir acá no serviría: el
        // modal recién monta en este commit).
        //
        // Flip.fit posa el marco sobre la card; se guarda ESA posición
        // como punto de partida, se devuelve el marco a su lugar real, y
        // Flip.from anima del uno al otro.
        Flip.fit(caja, estado, { scale: true })
        const partida = Flip.getState(caja)
        gsap.set(caja, { clearProps: 'transform,width,height' })

        Flip.from(partida, {
          targets: caja,
          duration: 0.55,
          ease: 'power3.inOut',
          scale: true,
          onComplete: () => gsap.set(caja, { clearProps: 'transform' }),
        })
        return
      }

      // --- Cambio de plantilla sin cerrar ---
      // El flag se baja acá y no en el render: en el render correría en
      // cada pasada y el iframe nunca llegaría a mostrarse.
      if (abierto && previo.current !== null && previo.current !== indice) {
        // El poster vuelve: el iframe nuevo tarda en cargar y sin esto
        // se vería el marco vacío.
        if (poster.current) poster.current.style.opacity = '1'
        gsap.fromTo(
          caja.querySelector('[data-pantalla]'),
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' },
        )
      }
    },
    { scope: raiz, dependencies: [indice, abierto] },
  )

  // Bloqueo de scroll, foco y teclado. Va en useEffect y no en useGSAP
  // porque no es animación, y porque tiene que correr ANTES de que Flip
  // mida: detener Lenis acá es lo que evita el salto.
  useEffect(() => {
    if (!abierto) {
      previo.current = null
      return
    }

    bloquearScroll(true)
    // Se guarda antes de mover el foco al modal.
    if (document.activeElement instanceof HTMLElement) {
      volverElFoco.current = document.activeElement
    }

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCerrar()
        return
      }
      if (e.key === 'ArrowRight') {
        onCambiar((indice + 1) % listas.length)
        return
      }
      if (e.key === 'ArrowLeft') {
        onCambiar((indice - 1 + listas.length) % listas.length)
        return
      }
      if (e.key !== 'Tab') return

      const el = raiz.current
      if (!el) return
      const focoables = el.querySelectorAll<HTMLElement>('button:not([disabled]), [href]')
      if (focoables.length === 0) return
      const primero = focoables[0]!
      const ultimo = focoables[focoables.length - 1]!

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }

    // El teclado del iframe: `MarcoPlantilla` reenvía Escape y las
    // flechas por `postMessage`, porque las teclas presionadas dentro
    // de la plantilla no llegan al `keydown` de este documento.
    const alMensaje = (e: MessageEvent) => {
      // Solo del propio origen: un mensaje de cualquier otra página no
      // tiene por qué manejar este modal.
      if (e.origin !== window.location.origin) return
      const d = e.data
      if (!d || d.fuente !== 'plantilla') return

      if (d.tipo === 'cerrar') onCerrar()
      else if (d.tipo === 'siguiente') onCambiar((indice + 1) % listas.length)
      else if (d.tipo === 'anterior') onCambiar((indice - 1 + listas.length) % listas.length)
    }

    document.addEventListener('keydown', alTeclado)
    window.addEventListener('message', alMensaje)
    raiz.current?.querySelector<HTMLElement>('button')?.focus()

    return () => {
      document.removeEventListener('keydown', alTeclado)
      window.removeEventListener('message', alMensaje)
      bloquearScroll(false)
      // El foco vuelve a donde estaba: sin esto queda en el body y
      // seguir con Tab arranca desde el principio de la página.
      volverElFoco.current?.focus()
    }
  }, [abierto, indice, onCerrar, onCambiar, listas.length])

  // Registrar el índice ya procesado, después de que corrió useGSAP.
  useEffect(() => {
    previo.current = indice
  })

  if (!plantilla || indice === null) {
    return null
  }

  const { ui } = seccionSoluciones

  return (
    <div
      ref={raiz}
      role="dialog"
      aria-modal="true"
      aria-label={plantilla.titulo}
      className="fixed inset-0 z-60 flex items-center justify-center p-4 lg:p-6"
    >
      {/* Fondo con blur. El click cierra. */}
      <div
        ref={fondo}
        onClick={onCerrar}
        className="absolute inset-0 bg-base/80 opacity-0 backdrop-blur-md"
      />

      {/* Flecha anterior */}
      <button
        type="button"
        onClick={() => onCambiar((indice - 1 + listas.length) % listas.length)}
        aria-label={ui.anterior}
        className="absolute left-2 z-10 flex size-11 items-center justify-center rounded-(--radius-pill) border border-hairline bg-elevated/80 text-hi backdrop-blur transition-colors duration-300 hover:border-hairline-hover lg:left-6"
      >
        <Flecha direccion="izquierda" />
      </button>

      {/* Marco de navegador */}
      <div
        ref={marco}
        // El alto es explícito, no `max-h-full` a secas: con el SVG
        // viejo el marco se ajustaba a la altura de la pantalla, pero un
        // iframe no tiene alto intrínseco y el marco colapsaba al alto
        // de la barra y el pie —medido, 273px, la plantilla se veía por
        // una rendija. `h-full` sobre el contenedor `p-10` da todo el
        // viewport menos el margen.
        // El ancho es relativo al viewport con tope, no un `max-w`
        // fijo: `max-w-6xl` daba 1152px y en los paneles —sidebar de
        // 240 más tabla más columna de actividad— las tres columnas
        // quedaban comprimidas. Con 94vw/1600px un monitor de 1920 da
        // 1600 y uno de 1440 da ~1354.
        //
        // No es pantalla completa a propósito: el fondo con blur sigue
        // visible por los bordes y el modal se lee como una ventana
        // sobre el sitio, que es lo que el Flip desde la card cuenta.
        className="relative z-[1] flex h-full max-h-full w-full max-w-[94vw] flex-col overflow-hidden rounded-(--radius-card) border border-white/10 bg-elevated shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] lg:max-w-[min(94vw,1600px)]"
      >
        <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#211C3D] px-3.5 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-[#4A4370]" />
            <span className="size-2 rounded-full bg-[#4A4370]" />
            <span className="size-2 rounded-full bg-[#4A4370]" />
          </span>
          <span className="min-h-[1.375rem] flex-1 truncate rounded-(--radius-pill) bg-black/25 px-3 py-1 text-[11px] leading-none text-low">
            {plantilla.url}
          </span>
          <button
            type="button"
            onClick={onCerrar}
            aria-label={ui.cerrar}
            className="flex size-7 items-center justify-center rounded-md text-low transition-colors duration-300 hover:bg-white/5 hover:text-hi"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="m4 4 8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* La plantilla, en un iframe.

            El scroll es del documento embebido, así que la rueda del
            mouse no burbujea al padre y no hace falta que Lenis lo
            ignore. Igual lleva `data-lenis-prevent`: es gratis y la
            regla del proyecto lo pide para todo contenedor con scroll
            propio.

            El preview queda debajo mientras la plantilla carga. Sin eso
            se ve el marco vacío durante el Flip, y escalar un iframe que
            todavía está montando produce un reflow visible. */}
        <div
          data-pantalla
          data-lenis-prevent
          className="relative min-h-0 flex-1 overflow-hidden bg-[#F7F6FB]"
          // En vista mobile el fondo se oscurece: el iframe angosto
          // deja franjas a los costados y sobre el gris claro se leerían
          // como parte de la plantilla.
          style={vista === 'mobile' ? { background: '#151318' } : undefined}
        >
          {/* El poster: cubre el marco durante el Flip y mientras la
              plantilla carga. Se apaga cuando el iframe está listo —si
              no, en vista mobile asoma a los costados del iframe
              angosto, que mide 390px sobre un contenedor de 1598. */}
          <Image
            ref={poster}
            src={`/plantillas/${plantilla.slug}/preview.webp`}
            alt=""
            fill
            sizes="(min-width: 1024px) 96rem, 100vw"
            className="object-cover object-top transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* El iframe se centra y se estrecha a 390px en vista
              mobile. La plantilla es responsiva, así que responde con
              sus propios breakpoints: lo que se ve es la versión mobile
              real, no una simulación. */}
          <iframe
            ref={iframe}
            key={plantilla.slug}
            src={`/plantillas/${plantilla.slug}`}
            title={`${plantilla.titulo} · ${plantilla.rubro}`}
            onLoad={() => {
              // Directo al DOM: son dos opacidades y no hay razón para
              // que pasen por un render.
              if (iframe.current) iframe.current.style.opacity = '1'
              if (poster.current) poster.current.style.opacity = '0'
            }}
            // `scrollea: false` son los paneles: son one page y el
            // scroll vive en sus columnas internas, no en el documento.
            scrolling={plantilla.scrollea ? 'yes' : 'no'}
            // El ancho cambia de golpe y lo que se anima es la
            // opacidad. Con `transition` sobre el `width`, el documento
            // embebido re-renderiza en cada frame y el navegador pinta
            // el layout viejo y el nuevo superpuestos —medido, se veía
            // el panel ancho detrás del angosto.
            className={`relative h-full border-0 transition-opacity duration-300 ${
              vista === 'mobile' ? 'mx-auto w-full max-w-[390px] shadow-2xl' : 'w-full'
            }`}
            style={{ opacity: 0 }}
          />
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] px-5 py-3">
          <div className="min-w-0">
            <p className="text-cuerpo truncate text-hi">{plantilla.titulo}</p>
            <p className="text-label text-low">{plantilla.rubro}</p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            {/* El switch de vista. Dos botones en un riel, con el activo
                marcado: es más claro que un toggle de un solo control,
                porque dice cuáles son las dos opciones sin que haya que
                probarlo.

                Solo desde `sm`: en un teléfono el modal ya es angosto
                y estrecharlo más no tendría con qué contrastar. */}
            <div
              role="group"
              aria-label={ui.vista.grupo}
              className="hidden items-center rounded-(--radius-pill) border border-white/10 bg-black/25 p-0.5 sm:flex"
            >
              {(['escritorio', 'mobile'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    if (v === vista) return
                    // Se apaga antes de cambiar el ancho: el documento
                    // embebido reacomoda su layout con el iframe
                    // invisible, y `onLoad` no vuelve a dispararse
                    // porque el iframe no recarga.
                    // Solo el iframe se apaga. El poster queda
                    // oculto: el documento no recarga al cambiar de
                    // ancho, así que `onLoad` no vuelve a dispararse y
                    // prenderlo acá lo dejaría visible para siempre.
                    const el = iframe.current
                    if (el) el.style.opacity = '0'
                    setVista(v)
                    window.setTimeout(() => {
                      if (iframe.current) iframe.current.style.opacity = '1'
                    }, 260)
                  }}
                  aria-pressed={vista === v}
                  className={`flex items-center gap-1.5 rounded-(--radius-pill) px-3 py-1.5 text-[11px] transition-colors duration-300 ease-(--ease-suave) ${
                    vista === v
                      ? 'bg-white/10 text-hi'
                      : 'text-low hover:text-mid'
                  }`}
                >
                  {v === 'escritorio' ? (
                    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.3}>
                      <rect x="1" y="2" width="12" height="8" rx="1" />
                      <path d="M5 12.5h4" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.3}>
                      <rect x="4" y="1" width="6" height="12" rx="1.2" />
                      <path d="M6.4 11.4h1.2" strokeLinecap="round" />
                    </svg>
                  )}
                  {ui.vista[v]}
                </button>
              ))}
            </div>

            <p className="text-label text-low">{ui.contador(indice + 1, listas.length)}</p>
          </div>
        </div>
      </div>

      {/* Flecha siguiente */}
      <button
        type="button"
        onClick={() => onCambiar((indice + 1) % listas.length)}
        aria-label={ui.siguiente}
        className="absolute right-2 z-10 flex size-11 items-center justify-center rounded-(--radius-pill) border border-hairline bg-elevated/80 text-hi backdrop-blur transition-colors duration-300 hover:border-hairline-hover lg:right-6"
      >
        <Flecha direccion="derecha" />
      </button>
    </div>
  )
}

function Flecha({ direccion }: { direccion: 'izquierda' | 'derecha' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direccion === 'izquierda' ? <path d="m14 6-6 6 6 6" /> : <path d="m10 6 6 6-6 6" />}
    </svg>
  )
}
