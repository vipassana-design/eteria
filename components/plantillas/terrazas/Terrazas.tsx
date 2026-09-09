import Barra from './partes/Barra'
import Hero from './partes/Hero'
import Destacadas from './partes/Destacadas'
import Zonas from './partes/Zonas'
import Servicios from './partes/Servicios'
import Contacto from './partes/Contacto'
import Pie from './partes/Pie'

/** Terrazas — sitio de una inmobiliaria (PLAN.md §16).
 *
 *  Cálido y aspiracional: bronce sobre piedra, fotos grandes de
 *  propiedades y una tabla de valores por zona. Contrasta con la
 *  Clínica —luminosa y verde— y con Márquez, que es sobria y gris. Las
 *  tres son institucionales: lo que las diferencia es la temperatura.
 *
 *  El buscador del hero y la ficha de propiedad son lo que hace que se
 *  lea como un sitio inmobiliario y no como una plantilla con fotos de
 *  casas: metros cubiertos y totales por separado, expensas,
 *  antigüedad, orientación y código de referencia.
 *
 *  Tokens locales y hex literales, como el resto (`plan.md` §15). La
 *  tipografía mezcla una serif de sistema en los títulos con sans en el
 *  cuerpo: es el registro de las inmobiliarias de zona norte, que se
 *  presentan como establecidas y no como startups.
 */
const TOKENS = {
  '--papel': '#FAFAF8',
  '--blanco': '#FFFFFF',
  '--tinta': '#231F1C',
  '--tinta-media': '#5C544E',
  '--tinta-tenue': '#968D85',
  '--linea': '#E4DED6',
  '--bronce': '#9A6B3F',
  '--bronce-claro': '#F4EBE0',
  '--verde-dato': '#3F7D58',
  '--serif': "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif",
  '--sans': "'Segoe UI', -apple-system, ui-sans-serif, system-ui, sans-serif",
} as React.CSSProperties

export default function Terrazas() {
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
        <Destacadas />
        <Zonas />
        <Servicios />
        <Contacto />
      </main>
      <Pie />

      <p className="sr-only">
        Terrazas Propiedades es un sitio de demostración. Las propiedades
        y los datos de contacto no son reales.
      </p>
    </div>
  )
}
