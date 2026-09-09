import { feria } from '@/content/plantillas/feria'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** La grilla de productos: seis, cada uno de una tienda distinta.
 *
 *  Es lo que hace que esta plantilla se lea como marketplace y no como
 *  las otras dos tiendas del set. Cada card muestra:
 *
 *  - **El nombre del vendedor**, con su reputación y sus ventas
 *    acumuladas. Sin eso, un marketplace es una tienda con más stock.
 *  - **El distintivo de tienda oficial** en dos de los seis: si todos
 *    lo tuvieran no significaría nada.
 *  - **El envío como está**: dos con envío pago, cuatro gratis, y con
 *    el día concreto de llegada.
 *  - **Cuántos lo están viendo.** Es el recurso de urgencia propio del
 *    rubro, y los números son desparejos (19, 23, 41, 57, 84, 132)
 *    porque redondos se leerían inventados.
 *
 *  Va sin fotos de producto a propósito: seis fotos de rubros distintos
 *  —herramientas, sillas, macetas, pelotas— serían seis fotos de stock
 *  sin relación entre sí, y eso ensucia más de lo que aporta. En su
 *  lugar, cada card tiene una banda de color con la inicial de su
 *  tienda, que además refuerza que son vendedores distintos.
 */

/** Un color por tienda, para que la banda las distinga entre sí. */
const COLORES = ['#0F766E', '#7C3AED', '#B45309', '#1D4ED8', '#BE185D', '#4D7C0F']

export default function Listado() {
  const { listado } = feria
  const pesos = (n: number) => `$${n.toLocaleString('es-AR')}`

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-11 lg:px-8 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            style={{ color: 'var(--naranja)' }}
            className="text-[11.5px] font-semibold uppercase tracking-[0.12em]"
          >
            {listado.volanta}
          </p>
          <h2
            style={{ color: 'var(--tinta)' }}
            className="mt-1.5 text-[24px] font-bold leading-tight lg:text-[30px]"
          >
            {listado.titulo}
          </h2>
        </div>

        <a
          href="#"
          style={{ color: 'var(--naranja)' }}
          className="group inline-flex items-center gap-2 text-[13px] font-semibold"
        >
          {listado.enlace}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>

      <Aparecer
        escalonado={0.06}
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {listado.items.map((p, i) => (
          <article
            key={p.nombre}
            style={{ background: 'var(--blanco)', borderColor: 'var(--linea)' }}
            className="group flex flex-col overflow-hidden rounded-xl border transition-shadow duration-300 hover:shadow-[0_12px_30px_-16px_rgba(31,41,55,0.28)]"
          >
            {/* La banda de la tienda, con su inicial. */}
            <div
              style={{ background: COLORES[i % COLORES.length] }}
              className="relative flex h-24 items-center justify-center"
            >
              <span className="text-[34px] font-bold text-white/25">
                {p.tienda.n.charAt(0)}
              </span>

              {p.etiqueta ? (
                <span
                  style={{
                    background: p.etiqueta.startsWith('-') ? 'var(--naranja)' : 'var(--blanco)',
                    color: p.etiqueta.startsWith('-') ? '#fff' : 'var(--tinta)',
                  }}
                  className="absolute left-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold"
                >
                  {p.etiqueta}
                </span>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3
                style={{ color: 'var(--tinta)' }}
                className="text-[13.5px] font-medium leading-snug"
              >
                {p.nombre}
              </h3>

              <div className="mt-2.5 flex items-baseline gap-2">
                <span
                  style={{ color: 'var(--tinta)' }}
                  className="text-[19px] font-bold tabular-nums"
                >
                  {pesos(p.precio)}
                </span>
                {p.antes ? (
                  <span
                    style={{ color: 'var(--tinta-tenue)' }}
                    className="text-[11.5px] tabular-nums line-through"
                  >
                    {pesos(p.antes)}
                  </span>
                ) : null}
              </div>

              <p style={{ color: 'var(--verde)' }} className="mt-0.5 text-[11.5px] font-semibold">
                {p.cuotas}
              </p>
              <p
                style={{ color: p.envio.startsWith('Envío') ? 'var(--tinta-media)' : 'var(--verde)' }}
                className="mt-1.5 text-[12px] font-medium"
              >
                {p.envio}
              </p>

              {/* El vendedor: lo que solo un marketplace muestra. */}
              <div
                style={{ borderTopColor: 'var(--linea)' }}
                className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t pt-3"
              >
                <span
                  style={{ color: 'var(--tinta-media)' }}
                  className="text-[11.5px] font-medium"
                >
                  {p.tienda.n}
                </span>
                {p.tienda.oficial ? (
                  <span
                    style={{ background: 'var(--naranja-claro)', color: 'var(--naranja)' }}
                    className="rounded px-1.5 py-0.5 text-[9.5px] font-bold uppercase"
                  >
                    {listado.ui.oficial}
                  </span>
                ) : null}
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 11 11" aria-hidden="true">
                    <path
                      d="M5.5 0l1.7 3.4 3.8.6-2.7 2.7.6 3.8-3.4-1.8-3.4 1.8.6-3.8L0 4l3.8-.6L5.5 0Z"
                      fill="var(--ambar)"
                    />
                  </svg>
                  <span
                    style={{ color: 'var(--tinta)' }}
                    className="text-[11px] font-semibold tabular-nums"
                  >
                    {p.tienda.rep.toLocaleString('es-AR')}
                  </span>
                </span>
                <span style={{ color: 'var(--tinta-tenue)' }} className="text-[10.5px] tabular-nums">
                  · {listado.ui.ventas(p.tienda.ventas)}
                </span>
              </div>

              {/* Cuántos lo están viendo, y el botón al pie. */}
              <p
                style={{ color: 'var(--tinta-tenue)' }}
                className="mt-2.5 text-[11px]"
              >
                {listado.ui.viendo(p.vistas)}
              </p>

              <button
                type="button"
                style={{ borderColor: 'var(--naranja)', color: 'var(--naranja)' }}
                className="mt-3 w-full rounded-lg border py-2.5 text-[12.5px] font-semibold transition-colors duration-200 hover:bg-[var(--naranja)] hover:text-white"
              >
                {listado.ui.agregar}
              </button>
            </div>
          </article>
        ))}
      </Aparecer>
    </section>
  )
}
