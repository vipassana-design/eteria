'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { dur, ease } from '@/lib/motion'
import { enviarConsulta, type DatosConsulta } from '@/lib/enviarConsulta'
import {
  hayErrores,
  validarConsulta,
  type ErroresConsulta,
} from '@/lib/validarConsulta'
import { contactoSeccion as txt, tiposProyecto } from '@/content/contacto'
import { marca } from '@/content/marca'
import type { TipoProyecto } from '@/types'
import Boton from '@/components/ui/Boton'
import Campo from '@/components/ui/Campo'
import Reveal from '@/components/ui/Reveal'
import TituloSeccion from '@/components/ui/TituloSeccion'
import MontarDisponibilidad from './MontarDisponibilidad'
import Glow from '@/components/bg/Glow'

type Estado = 'normal' | 'enviando' | 'enviado'

const VACIO: DatosConsulta = {
  nombre: '',
  email: '',
  empresa: '',
  tipo: '',
  mensaje: '',
  website: '',
}

interface Props {
  /** Preselecciona el tipo de proyecto. Lo usan las landings (§4.8). */
  tipoPreseleccionado?: TipoProyecto
  /** En las landings la sección va sin su propio título. */
  conTitulo?: boolean
}

/** Sección de contacto (PLAN.md §4.8).
 *
 *  Dos columnas: a la izquierda el texto y los datos de contacto
 *  directo, a la derecha el formulario.
 *
 *  El envío está detrás de `enviarConsulta`, que hoy simula el
 *  resultado: el hosting no está definido (§8.4). Este componente no
 *  sabe cómo viaja el mensaje.
 */
export default function Contacto({ tipoPreseleccionado, conTitulo = true }: Props) {
  const raiz = useRef<HTMLElement>(null)
  const [datos, setDatos] = useState<DatosConsulta>({
    ...VACIO,
    tipo: tipoPreseleccionado ?? '',
  })
  const [errores, setErrores] = useState<ErroresConsulta>({})
  const [estado, setEstado] = useState<Estado>('normal')
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null)
  /** Los errores aparecen recién cuando se intentó enviar: marcar en
   *  rojo mientras la persona escribe por primera vez es hostil. */
  const [intentado, setIntentado] = useState(false)

  const actualizar = (campo: keyof DatosConsulta) => (valor: string) => {
    const nuevos = { ...datos, [campo]: valor }
    setDatos(nuevos)

    // Después del primer intento, los errores se recalculan al escribir
    // para que se limpien apenas se corrigen.
    if (intentado) setErrores(validarConsulta(nuevos))
  }

  const alEnviar = async (e: React.FormEvent) => {
    e.preventDefault()
    setIntentado(true)
    setErrorEnvio(null)

    const encontrados = validarConsulta(datos)
    setErrores(encontrados)

    if (hayErrores(encontrados)) {
      // El foco va al primer campo con error, para no dejar a alguien
      // que navega con teclado buscándolo.
      const primero = Object.keys(encontrados)[0]
      raiz.current?.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus()
      return
    }

    setEstado('enviando')
    const resultado = await enviarConsulta(datos)

    if (resultado.ok) {
      setEstado('enviado')
      return
    }

    setEstado('normal')
    setErrorEnvio(resultado.error)
  }

  const reiniciar = () => {
    setDatos({ ...VACIO, tipo: tipoPreseleccionado ?? '' })
    setErrores({})
    setIntentado(false)
    setErrorEnvio(null)
    setEstado('normal')
  }

  // La confirmación entra en el lugar del formulario.
  useGSAP(
    () => {
      if (estado !== 'enviado') return
      gsap.from('[data-confirmacion]', {
        opacity: 0,
        y: 16,
        duration: dur.base,
        ease: ease.out,
      })
    },
    { scope: raiz, dependencies: [estado] },
  )

  const enviando = estado === 'enviando'

  return (
    <section ref={raiz} id="contacto" className="seccion relative scroll-mt-24">
      <Glow className="-right-52 top-10" tamano={720} intensidad={0.75} />

      <div className="contenedor grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* Columna izquierda: texto y contacto directo */}
        <div>
          {conTitulo ? (
            <TituloSeccion degrade={txt.tituloDegrade} bajada={txt.bajada}>
              {txt.titulo}
            </TituloSeccion>
          ) : (
            <Reveal>
              <p className="text-cuerpo-lg medida text-mid">{txt.bajada}</p>
            </Reveal>
          )}

          <Reveal variante="lateral" stagger={0.1} className="mt-12 flex flex-col gap-8">
            <div className="border-l border-hairline pl-6">
              <p className="text-label text-low">{txt.directo.tituloEmail}</p>
              <a
                href={`mailto:${marca.email}`}
                className="text-cuerpo-lg mt-1 inline-block text-hi transition-colors duration-300 hover:text-violet-300"
              >
                {marca.email}
              </a>
            </div>

            <div className="border-l border-hairline pl-6">
              <p className="text-label text-low">{txt.directo.tituloWhatsapp}</p>
              <a
                href={`https://wa.me/${marca.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cuerpo-lg mt-1 inline-block text-hi transition-colors duration-300 hover:text-violet-300"
              >
                {marca.whatsappVisible}
              </a>
              <div className="mt-2">
                <MontarDisponibilidad />
              </div>
            </div>

            {/* Qué pasa después de enviar. Va antes del formulario y no
                después: el que duda de llenarlo es el que necesita
                saber a qué se compromete. */}
            <div className="border-l border-hairline pl-6">
              <p className="text-label text-low">{txt.despues.titulo}</p>
              <ol className="mt-3 flex flex-col gap-2.5">
                {txt.despues.pasos.map((paso, i) => (
                  <li key={paso} className="text-cuerpo flex gap-3 text-mid">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-hairline text-[10px] font-semibold text-low"
                    >
                      {i + 1}
                    </span>
                    {paso}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* Columna derecha: formulario o confirmación */}
        <Reveal variante="escala" delay={0.1}>
          <div className="rounded-(--radius-card) border border-hairline bg-surface p-6 lg:p-10">
            {estado === 'enviado' ? (
              <div data-confirmacion className="flex flex-col items-start gap-4 py-8">
                <span className="flex size-12 items-center justify-center rounded-(--radius-pill) bg-(image:--grad-brand)">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6 text-base"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 5 5L19 8" />
                  </svg>
                </span>
                <h3 className="text-h3 font-medium">{txt.confirmacion.titulo}</h3>
                <p className="text-cuerpo medida text-mid">{txt.confirmacion.texto}</p>
                <div className="mt-2">
                  <Boton variante="secundario" tamano="chico" onClick={reiniciar}>
                    {txt.confirmacion.volver}
                  </Boton>
                </div>
              </div>
            ) : (
              <form onSubmit={alEnviar} noValidate className="flex flex-col gap-5">
                {/* Honeypot: oculto para personas, visible para bots.
                    No usa display:none porque algunos bots lo detectan. */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                  <label htmlFor="website">No completar</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={datos.website}
                    onChange={(e) => actualizar('website')(e.target.value)}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Campo
                    name="nombre"
                    label={txt.campos.nombre.label}
                    placeholder={txt.campos.nombre.placeholder}
                    requerido
                    autoComplete="name"
                    value={datos.nombre}
                    onChange={(e) => actualizar('nombre')(e.target.value)}
                    error={errores.nombre}
                    disabled={enviando}
                  />
                  <Campo
                    name="email"
                    label={txt.campos.email.label}
                    tipo="email"
                    placeholder={txt.campos.email.placeholder}
                    requerido
                    autoComplete="email"
                    value={datos.email}
                    onChange={(e) => actualizar('email')(e.target.value)}
                    error={errores.email}
                    disabled={enviando}
                  />
                </div>

                <Campo
                  name="empresa"
                  label={txt.campos.empresa.label}
                  placeholder={txt.campos.empresa.placeholder}
                  autoComplete="organization"
                  value={datos.empresa}
                  onChange={(e) => actualizar('empresa')(e.target.value)}
                  disabled={enviando}
                />

                <Campo
                  name="tipo"
                  label={txt.campos.tipo.label}
                  tipo="select"
                  opciones={tiposProyecto}
                  requerido
                  value={datos.tipo}
                  onChange={(e) => actualizar('tipo')(e.target.value)}
                  error={errores.tipo}
                  disabled={enviando}
                />

                <Campo
                  name="mensaje"
                  label={txt.campos.mensaje.label}
                  tipo="textarea"
                  placeholder={txt.campos.mensaje.placeholder}
                  requerido
                  rows={5}
                  value={datos.mensaje}
                  onChange={(e) => actualizar('mensaje')(e.target.value)}
                  error={errores.mensaje}
                  disabled={enviando}
                />

                {/* Error del envío, distinto de los de validación. */}
                {errorEnvio ? (
                  <p role="alert" className="text-cuerpo rounded-(--radius-control) border border-danger/40 bg-danger/5 px-4 py-3 text-danger">
                    {errorEnvio}
                  </p>
                ) : null}

                <div className="mt-2">
                  <Boton type="submit" disabled={enviando} className="w-full sm:w-auto">
                    {enviando ? (
                      <>
                        <Spinner />
                        {txt.enviando}
                      </>
                    ) : (
                      txt.enviar
                    )}
                  </Boton>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Spinner del botón mientras se envía. */
function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 animate-spin" aria-hidden="true" fill="none">
      <circle cx={12} cy={12} r={9} stroke="currentColor" strokeOpacity={0.25} strokeWidth={2.5} />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  )
}
