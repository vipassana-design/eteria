import { marquez } from '@/content/plantillas/marquez'
import Aparecer from '@/components/plantillas/comun/Aparecer'
import Cifra from '@/components/plantillas/comun/Cifra'

/** La franja "Desde 1987", sobre el azul petróleo.
 *
 *  **Es la sección que rompe el blanco.** Sin ella la plantilla son seis
 *  pantallas de gris sobre papel, que es en lo que se convierte
 *  "sobrio" cuando se lo confunde con "sin color". Va después de los
 *  socios y antes de las publicaciones: parte la página al medio, que
 *  es donde la lectura empieza a aplanarse.
 *
 *  Las cifras cuentan con `Cifra`, y acá sí corresponde: son datos
 *  verificables sobre fondo oscuro, no una landing pidiendo atención.
 *  El separador de miles va activado porque 1240 sin punto se lee como
 *  un año.
 *
 *  **Nada de porcentajes de éxito.** En ejercicio profesional no se
 *  pueden publicitar resultados, y un "97% de casos ganados" es la
 *  señal más rápida de que el sitio lo escribió alguien ajeno al rubro.
 *  Lo que se publica es años, expedientes, socios y clientes con
 *  asesoramiento permanente.
 */
export default function Trayectoria() {
  const { trayectoria } = marquez

  return (
    <section style={{ background: 'var(--tinta)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Aparecer y={18}>
            <p
              style={{ color: 'var(--bronce)' }}
              className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
            >
              {trayectoria.volanta}
            </p>
            <h2
              style={{ fontFamily: 'var(--serif)' }}
              className="mt-3 max-w-[22ch] text-[27px] font-semibold leading-tight tracking-[-0.01em] text-white lg:text-[34px]"
            >
              {trayectoria.titulo}
            </h2>
            <p className="mt-4 max-w-[46ch] text-[14px] leading-[1.7] text-white/65">
              {trayectoria.bajada}
            </p>
          </Aparecer>

          <Aparecer y={18}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-9">
              {trayectoria.items.map((c) => (
                <div key={c.t}>
                  <span
                    style={{ background: 'var(--bronce)' }}
                    className="block h-[2px] w-8"
                  />
                  <dd
                    style={{ fontFamily: 'var(--serif)' }}
                    className="mt-4 text-[34px] font-semibold leading-none text-white lg:text-[40px]"
                  >
                    <Cifra hasta={c.n} sufijo={c.s} separador />
                  </dd>
                  <dt className="mt-2.5 text-[12.5px] leading-snug text-white/60">
                    {c.t}
                  </dt>
                </div>
              ))}
            </dl>
          </Aparecer>
        </div>
      </div>
    </section>
  )
}
