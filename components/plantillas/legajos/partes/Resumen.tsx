import { legajos } from '@/content/plantillas/legajos'
import Aparecer from '@/components/plantillas/comun/Aparecer'
import Cifra from '@/components/plantillas/comun/Cifra'

/** Las cuatro tarjetas de resumen: dotación, licencias, ingresos y
 *  cumpleaños.
 *
 *  Acá sí se usan `Aparecer` y `Cifra` —los dos únicos componentes que
 *  las plantillas comparten—: esta plantilla scrollea, así que la
 *  entrada por scroll tiene sentido, y los cuatro valores son estáticos,
 *  así que el conteo se dispara una vez y queda. Ninguno de los dos
 *  impone nada visual: la card, los colores y la tipografía las escribe
 *  esta plantilla (`plan.md` §15).
 *
 *  **El color es lo que le saca el gris al panel.** Cada tarjeta lleva
 *  su icono sobre un fondo tenue del mismo tono, y los cuatro tonos son
 *  distintos —índigo, cian, verde, ámbar—. Cuatro tarjetas iguales en
 *  gris sobre un fondo hueso es exactamente el software de RR. HH. que
 *  esta plantilla no quiere ser.
 */

/** Los cuatro iconos, en un mapa. Grilla de 20, trazo 1.5. */
const ICONOS: Record<string, string> = {
  personas:
    'M7.5 9a2.2 2.2 0 1 0 0-4.4A2.2 2.2 0 0 0 7.5 9Zm6 .4a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM2.8 16c0-2.3 2.1-3.8 4.7-3.8s4.7 1.5 4.7 3.8m1.3-3.6c2 .2 3.7 1.4 3.7 3.6',
  licencia:
    'M4.5 4.5h11v11h-11v-11Zm0 3.5h11M7.5 2.8v3m5-3v3m-4 6.2 1.3 1.3 2.7-2.7',
  alta: 'M10 4.5v11m-5.5-5.5h11',
  torta:
    'M4 16.5h12v-5H4v5Zm2-5V9.5a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 14 9.5v2M10 8V5.5m0-1.8v.6',
}

export default function Resumen() {
  return (
    <Aparecer
      escalonado={0.07}
      className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
    >
      {legajos.resumen.map((r) => (
        <article
          key={r.etiqueta}
          style={{ background: 'var(--superficie)', borderColor: 'var(--linea)' }}
          className="rounded-xl border p-3.5 lg:p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <p
              style={{ color: 'var(--texto-medio)' }}
              className="text-[11.5px] font-medium leading-snug"
            >
              {r.etiqueta}
            </p>

            <span
              style={{ background: r.fondo, color: r.color }}
              className="grid size-8 shrink-0 place-items-center rounded-lg"
              aria-hidden="true"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d={ICONOS[r.icono]}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <Cifra
            hasta={r.valor}
            separador
            className="mt-2 block text-[24px] font-semibold leading-none lg:text-[27px]"
          />

          <p
            style={{ color: 'var(--texto-tenue)' }}
            className="mt-1.5 text-[10.5px] leading-snug tabular-nums"
          >
            {r.pie}
          </p>
        </article>
      ))}
    </Aparecer>
  )
}
