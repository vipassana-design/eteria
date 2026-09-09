import Reveal from '@/components/ui/Reveal'
import TituloSeccion from '@/components/ui/TituloSeccion'
import NumeroQueSube from '@/components/ui/NumeroQueSube'
import Glow from '@/components/bg/Glow'
import { queHacemos } from '@/content/queHacemos'
import MapaIntegraciones from './MapaIntegraciones'

/** Sección "Sobre nosotros" (PLAN.md §4.3).
 *
 *  Dos columnas: el texto a la izquierda y el mapa de integraciones a
 *  la derecha. El mapa es la única pieza del sitio que no es una
 *  pantalla —los nueve mockups son capturas de producto— y dice con qué
 *  se integra lo que se construye, que es el argumento del párrafo que
 *  tiene al lado.
 *
 *  Los tres datos cierran la sección en una franja a todo el ancho. En
 *  la columna del costado competían con el texto, y el primero —la
 *  única cifra— quedaba a otro tamaño que los otros dos.
 */
export default function QueHacemos() {
  return (
    <section id="que-hacemos" className="seccion relative scroll-mt-24">
      <Glow className="-left-64 top-0" tamano={640} intensidad={0.7} />

      <div className="contenedor">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <TituloSeccion degrade={queHacemos.tituloDegrade}>{queHacemos.titulo}</TituloSeccion>

            <div className="mt-8 flex flex-col gap-6">
              {queHacemos.parrafos.map((p, i) => (
                <Reveal key={p.slice(0, 24)} delay={0.08 * (i + 1)}>
                  <p className="text-cuerpo-lg medida text-mid">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <MapaIntegraciones />
        </div>

        {/* Franja de datos. Las columnas arrancan en `lg` y no en `sm`:
            entre 640 y 1024 cada una quedaba en 171px y "End to end" a
            40px partía en dos líneas. Abajo de lg van apiladas, que es
            donde igual hay lugar de sobra. */}
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
