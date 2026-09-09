import { atelier } from '@/content/plantillas/atelier'
import Barra from './partes/Barra'
import Hero from './partes/Hero'
import Categorias from './partes/Categorias'
import Grilla from './partes/Grilla'
import Editorial from './partes/Editorial'
import Servicios from './partes/Servicios'
import Resenas from './partes/Resenas'
import Pie from './partes/Pie'

/** Atelier — ecommerce de indumentaria (PLAN.md §16).
 *
 *  Registro editorial premium: blanco frío, serif de alto contraste,
 *  fotos grandes, densidad baja y casi ningún borde. La densidad baja
 *  **es** lo que la hace premium; llenarla de cards la volvería una
 *  tienda cualquiera.
 *
 *  Los tokens van como variables CSS locales en este contenedor, y los
 *  colores como hex literales. Es deliberado y está justificado en
 *  `plan.md` §15: si las plantillas usaran los tokens de `@theme`
 *  dejarían de leerse como sitios ajenos, y un token compartido es la
 *  vía por la que nueve plantillas terminan pareciéndose. Cada una
 *  escribe sus propias cards y botones aunque eso duplique: la
 *  duplicación acá es el objetivo.
 *
 *  La tipografía es un stack de sistema, no un archivo nuevo: sumar una
 *  familia por plantilla serían ~900 KB. El serif de alto contraste
 *  —Didot, Bodoni— es lo que da el registro de revista de moda, y en
 *  2026 los stacks de sistema lo cubren sin descargar nada.
 *
 *  **Restricción de la Etapa 0:** con `prefers-reduced-motion` el
 *  `!important` de `globals.css` anula toda `transition` CSS y se
 *  hereda al iframe. Ningún hover de esta plantilla es la única vía de
 *  acceso a información: son refuerzo (color, sombra, un desplazamiento
 *  corto), y lo que revelan está también en el texto.
 */

/** El sistema de la plantilla, en un solo lugar. */
const TOKENS = {
  '--papel': '#FAF8F5',
  '--tinta': '#1A1A1A',
  '--tinta-media': '#5C5852',
  '--tinta-tenue': '#918B82',
  '--linea': '#E5E0D8',
  '--terracota': '#B5654F',
  '--serif': "'Didot', 'Bodoni MT', 'Playfair Display', 'Times New Roman', serif",
  '--sans': "'Helvetica Neue', Inter, ui-sans-serif, system-ui, sans-serif",
} as React.CSSProperties

export default function Atelier() {
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
        <Categorias />
        <Grilla />
        <Editorial />
        <Servicios />
        <Resenas />
      </main>
      <Pie />

      {/* El aviso legal del pie de la plantilla no alcanza: quien la ve
          tiene que entender que es una demostración y no un sitio en
          producción. Va acá, fuera del diseño, para no ensuciarlo. */}
      <p className="sr-only">
        {atelier.marca.nombre} es una tienda de demostración. No hay
        productos reales a la venta.
      </p>
    </div>
  )
}
