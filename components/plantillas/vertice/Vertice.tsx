import Barra from './partes/Barra'
import Hero from './partes/Hero'
import Listado from './partes/Listado'
import Sucursales from './partes/Sucursales'
import Garantia from './partes/Garantia'
import Pie from './partes/Pie'

/** Vértice — ecommerce de tecnología (PLAN.md §16).
 *
 *  Denso y técnico, el opuesto de Atelier: acá la información manda,
 *  porque es lo que un comprador de tecnología busca antes de decidir.
 *  Specs comparables, stock por sucursal, precio de lista y precio con
 *  transferencia —que es como se vende en el país—, cuotas con su
 *  monto.
 *
 *  La densidad alta **es** su carácter. Una tienda de tecnología con
 *  mucho aire y cuatro productos se ve como una boutique, no como un
 *  lugar donde comparar 84 modelos.
 *
 *  El comparador de la sección `Listado` es la interacción real: se
 *  eligen hasta tres modelos y las specs se muestran lado a lado.
 *
 *  Tokens locales y hex literales (`plan.md` §15). El azul `#2563EB` es
 *  el de Tailwind por defecto y **no** el del sitio anfitrión, que vale
 *  cian: `bg-blue-500` acá daría el color equivocado, así que el azul
 *  entra por token propio.
 */
const TOKENS = {
  '--papel': '#F6F8FB',
  '--blanco': '#FFFFFF',
  '--tinta': '#0F172A',
  '--tinta-media': '#475569',
  '--tinta-tenue': '#94A3B8',
  '--linea': '#E2E8F0',
  '--azul': '#2563EB',
  '--azul-hondo': '#1E3A8A',
  '--azul-claro': '#EFF6FF',
  '--verde': '#059669',
  '--rojo': '#DC2626',
  '--ambar': '#D97706',
  '--sans': "'Inter', 'Segoe UI', -apple-system, ui-sans-serif, system-ui, sans-serif",
} as React.CSSProperties

export default function Vertice() {
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
        <Listado />
        <Sucursales />
        <Garantia />
      </main>
      <Pie />

      <p className="sr-only">
        Vértice Tecnología es una tienda de demostración. No hay
        productos reales a la venta y las marcas son inventadas.
      </p>
    </div>
  )
}
