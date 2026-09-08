import Link from 'next/link'
import { mockupsNuevos, mockupsUi, type MockupId } from '@/content/mockupsNuevos'
import { POR_PARTES } from '@/components/home/PantallasPorPartes'

/** Marco de ventana, igual al del hero: el mockup se juzga dentro del
 *  cromo que va a tener, no suelto. */
function Ventana({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-(--radius-card) border border-white/10 bg-elevated shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#211C3D] px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-[#4A4370]" />
          <span className="size-2 rounded-full bg-[#4A4370]" />
          <span className="size-2 rounded-full bg-[#4A4370]" />
        </span>
        <span className="flex-1 truncate rounded-(--radius-pill) bg-black/25 px-3 py-1 text-[11px] leading-none text-low">
          {url}
        </span>
      </div>
      <div className="aspect-16/10">{children}</div>
    </div>
  )
}

const URLS: Record<MockupId, string> = {
  tienda: 'tienda-atelier.com/mujer',
  panel: 'app.gestion.com/resumen',
  corporativo: 'norvex.com',
}

/** Una propuesta: el mockup nuevo grande, el actual al lado y la lista
 *  de qué cambió. */
export default function Comparador({ id }: { id: MockupId }) {
  const propuesta = mockupsNuevos.find((m) => m.id === id)
  if (!propuesta) return null

  const Pantalla = POR_PARTES[id]

  const indice = mockupsNuevos.findIndex((m) => m.id === id)
  const anterior = mockupsNuevos[indice - 1]
  const siguiente = mockupsNuevos[indice + 1]

  return (
    <div className="contenedor py-20 lg:py-28">
      <p className="text-label text-low">
        {mockupsUi.aviso} · {propuesta.numero} de {mockupsNuevos.length}
      </p>
      <h1 className="text-h2 mt-4 font-semibold">{propuesta.nombre}</h1>
      <p className="text-cuerpo-lg medida mt-4 text-mid">{propuesta.linea}</p>

      {/* El mockup quieto y grande. La entrada por partes se ve en el
          hero, que es donde corre; acá se revisa el diseño. */}
      <div className="mt-14">
        <Ventana url={URLS[id]}>
          <Pantalla />
        </Ventana>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="text-label mb-4 text-low">{mockupsUi.tituloCambios}</p>
          <ul className="flex flex-col gap-3">
            {propuesta.cambios.map((c) => (
              <li key={c} className="text-cuerpo flex gap-3 text-mid">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-500" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-label mb-2 text-low">{mockupsUi.tituloFotos}</p>
          <p className="text-cuerpo text-mid">{propuesta.fotos}</p>
        </div>
      </div>

      {/* Navegación entre propuestas. */}
      <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-hairline pt-8">
        <div className="flex gap-6">
          {anterior ? (
            <Link
              href={`/mockups/${anterior.id}`}
              className="text-cuerpo text-low transition-colors duration-300 hover:text-hi"
            >
              &larr; {anterior.nombre}
            </Link>
          ) : null}
          {siguiente ? (
            <Link
              href={`/mockups/${siguiente.id}`}
              className="text-cuerpo text-low transition-colors duration-300 hover:text-hi"
            >
              {siguiente.nombre} &rarr;
            </Link>
          ) : null}
        </div>

        <div className="flex gap-6">
          <Link
            href="/"
            className="text-cuerpo text-violet-300 transition-colors duration-300 hover:text-hi"
          >
            {mockupsUi.verEnHero}
          </Link>
          <Link
            href="/mockups"
            className="text-cuerpo text-low transition-colors duration-300 hover:text-hi"
          >
            {mockupsUi.volverAlSitio}
          </Link>
        </div>
      </div>
    </div>
  )
}
