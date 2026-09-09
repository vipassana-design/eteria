import Barra from './partes/Barra'
import Hero from './partes/Hero'
import Turnos from './partes/Turnos'
import Especialidades from './partes/Especialidades'
import Estudios from './partes/Estudios'
import Equipo from './partes/Equipo'
import Obras from './partes/Obras'
import Visita from './partes/Visita'
import Pie from './partes/Pie'

/** Clínica Norte — sitio institucional de salud (PLAN.md §16).
 *
 *  Luminoso y tranquilizador, con verde agua como acento. Contrasta con
 *  las otras dos institucionales por temperatura: Terrazas es cálida y
 *  aspiracional, Márquez es sobria y densa. Si las tres compartieran
 *  registro, el carrusel mostraría el mismo sitio tres veces.
 *
 *  A pedido del cliente estas ocho llevan **más color** que Atelier: el
 *  verde aparece en los fondos de sección, en los iconos, en los chips
 *  de especialidad y en las señales del hero, no solo en los enlaces.
 *
 *  Tokens locales y hex literales, como el resto: son sitios ajenos y
 *  un token compartido es la vía por la que nueve plantillas terminan
 *  pareciéndose (`plan.md` §15).
 *
 *  La tipografía es un stack humanista de sistema. En salud el serif
 *  editorial se lee frío y el geométrico se lee tecnológico; lo que
 *  corresponde es una sans de formas abiertas.
 */
const TOKENS = {
  '--papel': '#FFFFFF',
  '--crudo': '#F2F9F7',
  '--tinta': '#0F2E2A',
  '--tinta-media': '#4A6B66',
  '--tinta-tenue': '#8AA5A1',
  '--linea': '#DCEAE7',
  '--verde': '#0D9488',
  '--verde-hondo': '#134E4A',
  '--verde-claro': '#CCF0EA',
  '--durazno': '#F97316',
  '--sans':
    "'Segoe UI', -apple-system, 'Helvetica Neue', ui-sans-serif, system-ui, sans-serif",
} as React.CSSProperties

export default function Clinica() {
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
        <Turnos />
        <Especialidades />
        <Estudios />
        <Equipo />
        <Obras />
        <Visita />
      </main>
      <Pie />

      <p className="sr-only">
        Clínica Norte es un sitio de demostración. No es un centro médico
        real y los datos de contacto no corresponden a ninguna
        institución.
      </p>
    </div>
  )
}
