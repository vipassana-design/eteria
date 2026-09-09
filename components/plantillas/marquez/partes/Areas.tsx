import { marquez } from '@/content/plantillas/marquez'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Las seis áreas de práctica, en grilla de 3×2.
 *
 *  **Los iconos se dibujan acá, en SVG, y son de línea.** Un set de
 *  librería con la balanza, el martillo y el maletín es exactamente lo
 *  que hace que un sitio de abogados se lea como plantilla: son los
 *  mismos seis iconos en los mismos seis lugares en cientos de sitios.
 *  Estos son trazos que representan el objeto del área —el organigrama
 *  del societario, el reloj del laboral, el porcentaje del tributario—
 *  con `stroke` en bronce y `fill: none`.
 *
 *  Van a 1.5 de trazo y en 32px: un ícono de línea fina en un tamaño
 *  grande es un gesto de dibujo técnico, que es el registro de la
 *  plantilla. Relleno sólido lo volvería un pictograma de app.
 *
 *  Dos líneas de texto por área y no una: la primera dice qué incluye,
 *  la segunda en qué etapa se interviene. Con una sola línea la
 *  descripción se colapsa en un adjetivo y ahí es donde el copy
 *  empieza a vender en lugar de informar.
 *
 *  Las áreas están separadas por filetes de la grilla y no por bordes
 *  de card: es una lista de competencias, no seis productos.
 */

/** Los trazos, indexados por la clave `icono` del contenido.
 *
 *  Van en un mapa y no en un componente por área: son seis `path` y un
 *  componente por cada uno sería andamiaje sin ganancia. El `viewBox`
 *  es 24 en los seis, así que el trazo se ve del mismo peso en todos
 *  —que es la única forma de que un set dibujado a mano no parezca
 *  reunido de tres fuentes distintas. */
const TRAZOS: Record<string, React.ReactNode> = {
  // Societario: un organigrama. Es la estructura de la sociedad.
  societario: (
    <>
      <rect x="9" y="2.5" width="6" height="4.5" />
      <rect x="2.5" y="17" width="6" height="4.5" />
      <rect x="15.5" y="17" width="6" height="4.5" />
      <path d="M12 7v5M5.5 17v-2.5h13V17" />
    </>
  ),
  // Laboral: un reloj. La jornada y los plazos son el eje del fuero.
  laboral: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3.5 2.5" />
    </>
  ),
  // Tributario: el porcentaje.
  tributario: (
    <>
      <path d="M5 19 19 5" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </>
  ),
  // Familia: dos figuras unidas.
  familia: (
    <>
      <circle cx="8" cy="7" r="3" />
      <circle cx="16" cy="7" r="3" />
      <path d="M3 21v-2a5 5 0 0 1 10 0v2M13.5 21v-2a5 5 0 0 1 7.5-4.3" />
    </>
  ),
  // Sucesiones: el sello sobre el documento.
  sucesiones: (
    <>
      <path d="M5.5 2.5h9L18.5 6.5v15h-13z" />
      <path d="M14 2.5v4.5h4.5" />
      <circle cx="12" cy="14" r="2.5" />
      <path d="M9 19h6" />
    </>
  ),
  // Litigios: el estrado y el expediente. Dos trazos, no una balanza.
  litigios: (
    <>
      <path d="M12 3v18" />
      <path d="M4 8h16" />
      <path d="M7 8l-3 6h6zM17 8l-3 6h6z" />
      <path d="M7.5 21h9" />
    </>
  ),
}

export default function Areas() {
  const { areas } = marquez

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10 lg:py-20">
      <Aparecer y={18} className="max-w-[58ch]">
        <p
          style={{ color: 'var(--bronce)' }}
          className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
        >
          {areas.volanta}
        </p>
        <h2
          style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
          className="mt-3 text-[27px] font-semibold leading-tight tracking-[-0.01em] lg:text-[34px]"
        >
          {areas.titulo}
        </h2>
        <p
          style={{ color: 'var(--tinta-media)' }}
          className="mt-4 text-[14.5px] leading-[1.7]"
        >
          {areas.bajada}
        </p>
      </Aparecer>

      {/* La grilla con filetes: los bordes los da el gap sobre el color
          de línea, así las seis áreas se leen como una tabla y no como
          seis cards. */}
      <Aparecer
        escalonado={0.06}
        className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3"
      >
        {areas.items.map((a) => (
          <article
            key={a.t}
            style={{ background: 'var(--blanco)', outlineColor: 'var(--linea)' }}
            className="p-6 outline outline-[0.5px] lg:p-7"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--bronce)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {TRAZOS[a.icono]}
            </svg>

            <h3
              style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
              className="mt-5 text-[19px] font-semibold leading-snug"
            >
              {a.t}
            </h3>

            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-3 text-[13.5px] leading-[1.65]"
            >
              {a.d1}
            </p>
            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-2 text-[13.5px] leading-[1.65]"
            >
              {a.d2}
            </p>
          </article>
        ))}
      </Aparecer>
    </section>
  )
}
