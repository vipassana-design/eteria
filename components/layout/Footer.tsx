import Link from 'next/link'
import { footer, marca } from '@/content/marca'
import Logo from './Logo'

/** Footer (PLAN.md §4.9).
 *  Tres columnas, línea divisoria, y abajo copyright con el link de
 *  privacidad a la derecha. Sin redes sociales. */
export default function Footer() {
  const anio = new Date().getFullYear()
  const enlaceWhatsapp = `https://wa.me/${marca.whatsapp}`

  return (
    <footer className="border-t border-hairline">
      <div className="contenedor py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <Logo />
            <p className="text-cuerpo mt-3 text-low">{marca.descripcion}</p>
          </div>

          {/* Servicios */}
          <nav aria-label={footer.servicios.titulo}>
            <h2 className="text-cuerpo-lg font-sans font-semibold text-hi">
              {footer.servicios.titulo}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {footer.servicios.enlaces.map((enlace) => (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    className="text-cuerpo text-mid transition-colors duration-300 hover:text-hi"
                  >
                    {enlace.etiqueta}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h2 className="text-cuerpo-lg font-sans font-semibold text-hi">
              {footer.contacto.titulo}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${marca.email}`}
                  className="text-cuerpo text-mid transition-colors duration-300 hover:text-hi"
                >
                  {marca.email}
                </a>
              </li>
              <li>
                <a
                  href={enlaceWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cuerpo text-mid transition-colors duration-300 hover:text-hi"
                >
                  {marca.whatsappVisible}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-label text-low">{footer.copyright(anio)}</p>
          <Link
            href={footer.privacidad.href}
            className="text-label text-low transition-colors duration-300 hover:text-mid"
          >
            {footer.privacidad.etiqueta}
          </Link>
        </div>
      </div>
    </footer>
  )
}
