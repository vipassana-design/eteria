import { legajos } from '@/content/plantillas/legajos'

/** El pie del sistema.
 *
 *  Un sistema interno no tiene footer de sitio —no hay columnas de
 *  enlaces ni redes—: tiene una línea con la versión y el aviso. Ponerle
 *  un footer de tres columnas la haría ver como una web institucional,
 *  que es justo lo que esta plantilla no es.
 */
export default function Pie() {
  return (
    <footer
      style={{ borderTopColor: 'var(--linea)' }}
      className="mt-2 border-t"
    >
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 px-4 py-4 lg:px-6">
        <p
          style={{ color: 'var(--texto-tenue)' }}
          className="text-[10.5px]"
        >
          {legajos.pie.legal}
        </p>
        <p
          style={{ color: 'var(--texto-tenue)' }}
          className="text-[10.5px] tabular-nums"
        >
          {legajos.producto.nombre} 4.2
        </p>
      </div>
    </footer>
  )
}
