import { terrazas } from '@/content/plantillas/terrazas'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Zonas y valores, en una tabla real.
 *
 *  **Es una `<table>` y no una grilla de cards**, y es la decisión de la
 *  sección: el valor del m² por zona existe para compararse, y comparar
 *  cuatro columnas entre cinco filas es exactamente lo que una tabla
 *  hace y una grilla de cards impide.
 *
 *  Todas las cifras llevan `tabular-nums`: sin eso los dígitos tienen
 *  ancho variable, las columnas de números dejan de alinearse en la
 *  coma y la tabla se lee como texto en lugar de como dato. En una
 *  tabla de precios es la diferencia entre parecer un informe y parecer
 *  una maqueta.
 *
 *  La variación va en verde y con el `+` explícito. El signo no es
 *  redundante: en una serie donde todo sube, el `+` es lo que avisa que
 *  la columna admite negativos y que estos son los valores reales del
 *  trimestre.
 *
 *  La tabla envuelta en un contenedor con `overflow-x-auto`: a 390px
 *  cuatro columnas no entran, y sin el contenedor el desborde lo
 *  absorbe el `body` y toda la página scrollea de costado.
 */
export default function Zonas() {
  const { zonas } = terrazas
  const { encabezados } = zonas

  return (
    <section style={{ background: 'var(--blanco)' }}>
      <div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-10 lg:py-16">
        {/* `items-start` en el grid: la columna del texto no tiene que
            estirarse al alto de la tabla, que es más alta y dejaba un
            hueco muerto abajo del párrafo. */}
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-14">
          <Aparecer y={20}>
            <p
              style={{ color: 'var(--bronce)' }}
              className="text-[11.5px] font-semibold uppercase tracking-[0.16em]"
            >
              {zonas.volanta}
            </p>
            <h2
              style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
              className="mt-2 text-[27px] font-semibold leading-tight tracking-[-0.01em] lg:text-[34px]"
            >
              {zonas.titulo}
            </h2>
            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-3 max-w-[42ch] text-[14px] leading-relaxed"
            >
              {zonas.bajada}
            </p>
          </Aparecer>

          <Aparecer y={20}>
            <div className="overflow-x-auto" data-lenis-prevent>
              <table className="w-full min-w-[420px] border-collapse text-left">
                <thead>
                  <tr style={{ borderBottomColor: 'var(--tinta)' }} className="border-b">
                    <th
                      style={{ color: 'var(--tinta-tenue)' }}
                      className="pb-2.5 text-[10.5px] font-semibold uppercase tracking-[0.1em]"
                    >
                      {encabezados.zona}
                    </th>
                    <th
                      style={{ color: 'var(--tinta-tenue)' }}
                      className="pb-2.5 text-right text-[10.5px] font-semibold uppercase tracking-[0.1em]"
                    >
                      {encabezados.n}
                    </th>
                    <th
                      style={{ color: 'var(--tinta-tenue)' }}
                      className="pb-2.5 text-right text-[10.5px] font-semibold uppercase tracking-[0.1em]"
                    >
                      {encabezados.valor}
                    </th>
                    <th
                      style={{ color: 'var(--tinta-tenue)' }}
                      className="pb-2.5 text-right text-[10.5px] font-semibold uppercase tracking-[0.1em]"
                    >
                      {encabezados.var}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {zonas.items.map((z) => (
                    <tr
                      key={z.z}
                      style={{ borderBottomColor: 'var(--linea)' }}
                      className="border-b transition-colors duration-200 hover:bg-[var(--bronce-claro)]"
                    >
                      <td
                        style={{ color: 'var(--tinta)' }}
                        className="py-3.5 text-[14.5px] font-medium"
                      >
                        {z.z}
                      </td>
                      <td
                        style={{ color: 'var(--tinta-media)' }}
                        className="py-3.5 text-right text-[14px] tabular-nums"
                      >
                        {z.n}
                      </td>
                      <td
                        style={{ color: 'var(--tinta)' }}
                        className="py-3.5 text-right text-[14px] font-semibold tabular-nums"
                      >
                        {z.valor}
                      </td>
                      <td
                        style={{ color: 'var(--verde-dato)' }}
                        className="py-3.5 text-right text-[14px] font-semibold tabular-nums"
                      >
                        {z.var}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Aparecer>
        </div>
      </div>
    </section>
  )
}
