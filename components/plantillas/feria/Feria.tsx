import Barra from './partes/Barra'
import Hero from './partes/Hero'
import Senales from './partes/Senales'
import Listado from './partes/Listado'
import Vender from './partes/Vender'
import Pie from './partes/Pie'

/** Feria — marketplace de varios vendedores (PLAN.md §16).
 *
 *  El tercer ecommerce del set, y el que se diferencia por lo que solo
 *  un marketplace tiene: cada producto pertenece a una tienda distinta,
 *  con su reputación, sus ventas acumuladas y su tiempo de despacho.
 *  Atelier vende lo propio y Vértice también; acá el sitio es la plaza,
 *  no el comerciante.
 *
 *  Y por eso tiene dos audiencias: quien compra y quien vende. La
 *  sección `Vender` es la mitad que las otras dos plantillas no
 *  necesitan.
 *
 *  El naranja es el acento más cálido del set. En un marketplace la
 *  urgencia es parte del rubro —"lo están viendo 84 personas", "llega
 *  gratis mañana"— y un acento frío la contradice.
 *
 *  Tokens locales y hex literales (`plan.md` §15).
 */
const TOKENS = {
  '--papel': '#FDFCFB',
  '--blanco': '#FFFFFF',
  '--tinta': '#1F2937',
  '--tinta-media': '#586372',
  '--tinta-tenue': '#98A1AE',
  '--linea': '#E7E3DE',
  '--naranja': '#EA580C',
  '--naranja-claro': '#FFF1E7',
  '--verde': '#15803D',
  '--ambar': '#D97706',
  '--sans': "'Segoe UI', Roboto, -apple-system, ui-sans-serif, system-ui, sans-serif",
} as React.CSSProperties

export default function Feria() {
  return (
    <div
      style={{
        ...TOKENS,
        background: 'var(--papel)',
        color: 'var(--tinta)',
        fontFamily: 'var(--sans)',
      }}
      className="min-h-screen antialiased"
    >
      <Barra />
      <main>
        <Hero />
        <Senales />
        <Listado />
        <Vender />
      </main>
      <Pie />

      <p className="sr-only">
        Feria es un marketplace de demostración. Las tiendas, los
        productos y las reputaciones son inventados.
      </p>
    </div>
  )
}
