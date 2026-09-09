import { flota } from '@/content/plantillas/flota'
import Cifra from '@/components/plantillas/comun/Cifra'

/** La barra inferior con los totales del turno.
 *
 *  Acá sí se usa `Cifra` —el componente compartido— y no una cifra
 *  estática: estos cinco valores no cambian con ninguna interacción, así
 *  que el conteo al entrar en viewport se dispara una vez y queda. Es lo
 *  contrario de los KPIs del panel comercial, que cambian con el filtro
 *  y por eso no pueden usarlo.
 *
 *  `Cifra` es uno de los dos únicos componentes que las plantillas
 *  comparten, y no impone nada visual: solo cuenta y pone
 *  `tabular-nums`. Todo lo demás —la card, los colores, la tipografía—
 *  lo escribe esta plantilla (`plan.md` §15).
 *
 *  En mobile los cinco totales van en dos columnas y no en una fila con
 *  scroll horizontal: a 390px una fila de cinco obliga a arrastrar para
 *  ver el último, y el desborde horizontal es justo lo que hay que
 *  evitar.
 */
export default function Totales() {
  return (
    <section
      style={{ background: 'var(--superficie)', borderColor: 'var(--borde)' }}
      className="grid shrink-0 grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-3 lg:grid-cols-5"
      aria-label="Totales del turno"
    >
      {flota.barra.map((t) => (
        <div
          key={t.t}
          style={{ background: 'var(--superficie)' }}
          className="px-3 py-2.5"
        >
          <p
            style={{ color: 'var(--texto-tenue)' }}
            className="truncate text-[10px]"
          >
            {t.t}
          </p>
          <p className="mt-0.5 flex items-baseline gap-0.5">
            <Cifra
              hasta={t.valor}
              separador={'separador' in t ? t.separador : false}
              className="text-[17px] font-semibold leading-none"
            />
            {t.sufijo ? (
              <span
                style={{ color: 'var(--texto-medio)' }}
                className="text-[11px] font-medium tabular-nums"
              >
                {t.sufijo}
              </span>
            ) : null}
          </p>
        </div>
      ))}
    </section>
  )
}
