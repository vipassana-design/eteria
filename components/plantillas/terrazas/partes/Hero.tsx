'use client'

import Image from 'next/image'
import { terrazas } from '@/content/plantillas/terrazas'

/** Hero de Terrazas: foto grande y el buscador de cuatro campos.
 *
 *  La tarjeta del buscador **se superpone al borde inferior de la
 *  foto**. No es adorno: es la jerarquía real de estos sitios —lo
 *  primero que alguien hace es filtrar— y el solape ata la foto al
 *  contenido en lugar de dejar dos bloques apilados.
 *
 *  Los `<select>` son nativos y reales: se abren, tienen las opciones
 *  del contenido y el estado vive en React. Un buscador de mentira
 *  —divs estilizados que no hacen nada— es lo que hace que un mockup se
 *  sienta muerto en cuanto se lo toca. También son el caso que verifica
 *  `color-scheme: light` dentro del iframe.
 *
 *  El `onSubmit` corta el envío: no hay backend, y sin `preventDefault`
 *  el formulario navegaría y dejaría la plantilla en blanco.
 *
 *  `'use client'` por el estado de los campos y el submit.
 */
export default function Hero() {
  const { hero } = terrazas
  const { buscador } = hero

  const estiloCampo = {
    borderColor: 'var(--linea)',
    background: 'var(--blanco)',
    color: 'var(--tinta)',
  }

  const campos = [
    { k: 'operacion', etiqueta: buscador.etiquetas.operacion, opciones: buscador.operacion },
    { k: 'tipo', etiqueta: buscador.etiquetas.tipo, opciones: buscador.tipos },
    { k: 'zona', etiqueta: buscador.etiquetas.zona, opciones: buscador.zonas },
    { k: 'ambientes', etiqueta: buscador.etiquetas.ambientes, opciones: buscador.ambientes },
  ]

  return (
    <section>
      <div className="mx-auto max-w-[1240px] px-5 pt-8 lg:px-10 lg:pt-10">
        <p
          style={{ color: 'var(--bronce)' }}
          className="text-[11.5px] font-semibold uppercase tracking-[0.16em]"
        >
          {hero.volanta}
        </p>
        <h1
          style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
          className="mt-3 max-w-[20ch] whitespace-pre-line text-[32px] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[42px] lg:text-[52px]"
        >
          {hero.titulo}
        </h1>
        <p
          style={{ color: 'var(--tinta-media)' }}
          className="mt-4 text-[15px] leading-relaxed lg:text-[16px]"
        >
          {hero.bajada}
        </p>
      </div>

      {/* El bloque foto + buscador. El padding inferior en desktop deja
          el hueco por el que la tarjeta sube: sin él, el solape se
          comería el inicio de la sección siguiente. */}
      <div className="mx-auto mt-7 max-w-[1240px] px-5 lg:px-10 lg:pb-16">
        <div className="relative">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={hero.foto}
              alt={hero.fotoAlt}
              fill
              priority
              sizes="(min-width: 1240px) 1160px, 100vw"
              className="object-cover"
            />
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              background: 'var(--blanco)',
              borderColor: 'var(--linea)',
            }}
            // En mobile va debajo de la foto y en flujo normal; el
            // solape solo en desktop, donde hay espacio para que la
            // tarjeta no tape media imagen.
            className="relative -mt-6 rounded-sm border p-5 shadow-[0_18px_44px_-24px_rgba(35,31,28,0.35)] lg:absolute lg:-bottom-12 lg:left-10 lg:right-10 lg:mt-0 lg:p-6"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-end lg:gap-4">
              {campos.map((c) => (
                <label key={c.k} className="flex flex-col gap-1.5">
                  <span
                    style={{ color: 'var(--tinta-tenue)' }}
                    className="text-[10.5px] font-semibold uppercase tracking-[0.1em]"
                  >
                    {c.etiqueta}
                  </span>
                  <select
                    defaultValue={c.opciones[0]}
                    style={estiloCampo}
                    className="rounded-sm border px-3 py-2.5 text-[13.5px] outline-none"
                  >
                    {c.opciones.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              ))}

              <button
                type="submit"
                style={{ background: 'var(--tinta)' }}
                className="mt-1 rounded-sm px-7 py-[11px] text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-[var(--bronce)] sm:col-span-2 lg:col-span-1 lg:mt-0"
              >
                {buscador.cta}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
