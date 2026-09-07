/** Campo de formulario (PLAN.md §4.8).
 *
 *  Cubre input, textarea y select con la misma caja visual.
 *  El error va inline debajo, en --text-danger. Nunca alerts.
 */

export interface OpcionSelect {
  valor: string
  etiqueta: string
}

interface Base {
  /** Se usa como id, name y target del label. */
  name: string
  label: string
  error?: string
  requerido?: boolean
  className?: string
}

type Props = Base &
  (
    | ({ tipo?: 'text' | 'email' | 'tel' } & Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'name' | 'id' | 'type' | 'className' | 'required'
      >)
    | ({ tipo: 'textarea' } & Omit<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        'name' | 'id' | 'className' | 'required'
      >)
    | ({ tipo: 'select'; opciones: OpcionSelect[] } & Omit<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        'name' | 'id' | 'className' | 'required'
      >)
  )

const CAJA =
  'w-full rounded-(--radius-control) border bg-white/[0.02] px-4 py-3 text-cuerpo ' +
  'text-hi placeholder:text-low transition-colors duration-300 ease-(--ease-suave) ' +
  'hover:border-hairline-hover focus:border-violet-500 focus:bg-white/[0.04] ' +
  'focus:outline-none disabled:opacity-50'

export default function Campo({
  name,
  label,
  error,
  requerido = false,
  className = '',
  ...resto
}: Props) {
  const idError = `${name}-error`
  const borde = error ? 'border-danger' : 'border-hairline'
  const aria = {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? idError : undefined,
    required: requerido,
  } as const

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-label text-low">
        {label}
        {requerido ? (
          <span className="text-violet-300" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>

      {resto.tipo === 'textarea' ? (
        (() => {
          const { tipo: _t, rows = 5, ...ta } = resto
          return (
            <textarea
              id={name}
              name={name}
              rows={rows}
              className={`${CAJA} ${borde} resize-y`}
              {...aria}
              {...ta}
            />
          )
        })()
      ) : resto.tipo === 'select' ? (
        (() => {
          const { tipo: _t, opciones, ...sel } = resto
          return (
            <div className="relative">
              <select
                id={name}
                name={name}
                className={`${CAJA} ${borde} cursor-pointer appearance-none pr-11`}
                {...aria}
                {...sel}
              >
                {opciones.map((o) => (
                  <option key={o.valor} value={o.valor} className="bg-elevated text-hi">
                    {o.etiqueta}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-low"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )
        })()
      ) : (
        (() => {
          const { tipo = 'text', ...inp } = resto
          return (
            <input
              id={name}
              name={name}
              type={tipo}
              className={`${CAJA} ${borde}`}
              {...aria}
              {...inp}
            />
          )
        })()
      )}

      {/* aria-live para que el lector anuncie el error al aparecer. */}
      <p
        id={idError}
        aria-live="polite"
        className={`text-label text-danger ${error ? '' : 'sr-only'}`}
      >
        {error ?? ''}
      </p>
    </div>
  )
}
