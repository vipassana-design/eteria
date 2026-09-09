import Reveal from '@/components/ui/Reveal'
import TituloSeccion from '@/components/ui/TituloSeccion'
import NumeroQueSube from '@/components/ui/NumeroQueSube'
import Glow from '@/components/bg/Glow'
import { queHacemos } from '@/content/queHacemos'

/** Sección "Sobre nosotros" (PLAN.md §4.3).
 *
 *  Sin card: texto grande sobre el fondo. Los tres datos bajaron a una
 *  franja que cierra la sección, a todo el ancho, en vez de una columna
 *  al costado: apilados a la derecha competían con el texto y el
 *  primero —la única cifra— quedaba a otro tamaño que los otros dos.
 *
 *  En la franja los tres van al mismo tamaño y el número cuenta desde
 *  cero al entrar en viewport.
 */
export default function QueHacemos() {
  return (
    <section id="que-hacemos" className="seccion relative scroll-mt-24">
      <Glow className="-left-64 top-0" tamano={640} intensidad={0.7} />

      <div className="contenedor">
        <TituloSeccion degrade={queHacemos.tituloDegrade}>{queHacemos.titulo}</TituloSeccion>

        <div className="mt-8 flex flex-col gap-6">
          {queHacemos.parrafos.map((p, i) => (
            <Reveal key={p.slice(0, 24)} delay={0.08 * (i + 1)}>
              <p className="text-cuerpo-lg medida text-mid">{p}</p>
            </Reveal>
          ))}
        </div>

        {/* Franja de datos. Las columnas arrancan en `lg` y no en
            `sm`: entre 640 y 1024 cada una quedaba en 171px y "End to
            end" a 40px partía en dos líneas. Abajo de lg van apiladas,
            que es donde igual hay lugar de sobra. */}
        <Reveal
          variante="lateral"
          stagger={0.12}
          className="mt-16 grid gap-8 border-t border-hairline pt-10 lg:mt-20 lg:grid-cols-3 lg:gap-14"
        >
          {queHacemos.datos.map((d) => (
            <div key={d.etiqueta}>
              <p className="font-display texto-degrade-2 text-h2 font-semibold leading-none">
                {d.cuenta ? (
                  <NumeroQueSube
                    hasta={d.cuenta.hasta}
                    prefijo={d.cuenta.prefijo}
                    sufijo={d.cuenta.sufijo}
                  />
                ) : (
                  d.valor
                )}
              </p>
              <p className="text-cuerpo mt-4 text-low">{d.etiqueta}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
