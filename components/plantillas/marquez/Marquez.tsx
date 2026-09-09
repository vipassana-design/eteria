import Barra from './partes/Barra'
import Hero from './partes/Hero'
import Areas from './partes/Areas'
import Socios from './partes/Socios'
import Trayectoria from './partes/Trayectoria'
import Publicaciones from './partes/Publicaciones'
import Consulta from './partes/Consulta'
import Pie from './partes/Pie'

/** Márquez & Asociados — sitio de un estudio jurídico (PLAN.md §16).
 *
 *  Es la plantilla **seria** del set: institucional sobria, sin una sola
 *  animación decorativa. La jerarquía la hacen la tipografía y el
 *  espaciado, que es como se presentan los estudios establecidos.
 *
 *  **Sobria no es apagada**, y esa es la corrección del cliente. El
 *  bronce aparece en las volantas, en los filetes de sección, en los
 *  iconos de las áreas y en las matrículas; la franja de trayectoria va
 *  sobre el azul petróleo. Sin eso el sitio sería seis pantallas de
 *  gris sobre blanco, que es lo que pasa cuando "sobrio" se confunde
 *  con "sin color".
 *
 *  Contrasta con las otras dos institucionales por temperatura: la
 *  Clínica es luminosa y verde, Terrazas es cálida y aspiracional. Si
 *  las tres compartieran registro, el carrusel mostraría el mismo sitio
 *  tres veces.
 *
 *  **La mezcla serif/sans es deliberada**: Georgia en h1 y h2, sans de
 *  sistema en el resto. Es el registro de los estudios jurídicos con
 *  décadas de ejercicio —la serif dice institución, la sans mantiene el
 *  cuerpo legible en pantalla—. Todo en serif se leería como un PDF de
 *  jurisprudencia y todo en sans, como una legaltech.
 *
 *  Tokens locales y hex literales, como el resto: son sitios ajenos y
 *  un token compartido es la vía por la que nueve plantillas terminan
 *  pareciéndose (`plan.md` §15).
 */
const TOKENS = {
  '--papel': '#FCFCFA',
  '--blanco': '#FFFFFF',
  '--tinta': '#1C2530',
  '--tinta-media': '#4A5D6E',
  '--linea': '#E8E3D9',
  '--bronce': '#8B6F3D',
  /** El bronce al 8% para los fondos: el token de acento no sirve como
   *  superficie, y calcularlo acá evita que cada parte invente su
   *  propia mezcla. */
  '--bronce-tenue': '#F5F1E8',
  '--serif': "Georgia, 'Times New Roman', serif",
  '--sans': "system-ui, -apple-system, 'Segoe UI', sans-serif",
} as React.CSSProperties

export default function Marquez() {
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
        <Areas />
        <Socios />
        <Trayectoria />
        <Publicaciones />
        <Consulta />
      </main>
      <Pie />

      <p className="sr-only">
        Márquez &amp; Asociados es un sitio de demostración. No es un
        estudio jurídico real, y las matrículas y los datos de contacto
        no corresponden a ninguna persona ni firma.
      </p>
    </div>
  )
}
