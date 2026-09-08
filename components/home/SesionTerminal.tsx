import type { LineaTerminal } from '@/types'

/** La sesión de terminal de la primera etapa del ciclo del hero.
 *
 *  Vive en su propio componente porque la usan el hero de la home y el
 *  de las tres landings, cada uno con su propia sesión: el ciclo abre
 *  siempre levantando el proyecto y sigue con la pantalla armada.
 *
 *  Los marcadores `data-linea-term` y `data-texto-term` son los que
 *  busca el timeline: las líneas entran una por una y los comandos se
 *  tipean revelando con `clip-path`, que no fuerza layout como sí lo
 *  haría reescribir `textContent` en cada frame.
 */

/** Verde de terminal. Solo en las líneas de éxito: es acento funcional,
 *  no decoración, y la paleta del sitio no cambia. */
const VERDE = '#4EC9A0'

export default function SesionTerminal({ lineas }: { lineas: readonly LineaTerminal[] }) {
  return (
    <div className="size-full bg-[#0A0814] p-5 font-mono text-[12.5px] leading-[1.85] lg:p-7 lg:text-[14px]">
      {lineas.map((l, i) => (
        <p
          key={`${l.texto}-${i}`}
          data-linea-term
          data-tipo={l.tipo}
          className="flex gap-2 whitespace-nowrap"
          // display:none hasta entrar, así las líneas no reservan alto
          // y el cursor queda pegado al último comando.
          style={{ opacity: 0, display: 'none' }}
        >
          <span
            aria-hidden="true"
            className={`shrink-0 text-violet-300 ${l.tipo === 'comando' ? '' : 'opacity-0'}`}
          >
            $
          </span>
          <span
            data-texto-term
            className="block will-change-[clip-path]"
            style={{
              clipPath: 'inset(0 100% 0 0)',
              color:
                l.tipo === 'ok' ? VERDE : l.tipo === 'comando' ? '#F4F2FF' : '#8B85AD',
            }}
          >
            {l.texto}
          </span>
        </p>
      ))}

      <p className="flex gap-2">
        <span aria-hidden="true" className="shrink-0 text-violet-300">
          $
        </span>
        <span
          data-cursor
          aria-hidden="true"
          className="inline-block h-[1.15em] w-[0.55em] translate-y-[0.15em] bg-violet-300"
        />
      </p>
    </div>
  )
}
