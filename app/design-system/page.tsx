import type { Metadata } from 'next'
import Boton from '@/components/ui/Boton'
import Campo from '@/components/ui/Campo'
import Reveal from '@/components/ui/Reveal'
import TituloSeccion from '@/components/ui/TituloSeccion'
import Glow from '@/components/bg/Glow'
import Grano from '@/components/bg/Grano'
import Particulas from '@/components/bg/Particulas'
import { designSystem as ds } from '@/content/designSystem'

/** Ruta temporal de revisión visual (Fase 2).
 *  No se indexa y se elimina en la fase de cierre. */
export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
}

/** Bloque de sección de la página, con el mismo ritmo vertical del sitio. */
function Bloque({
  titulo,
  bajada,
  children,
}: {
  titulo: string
  bajada: string
  children: React.ReactNode
}) {
  return (
    <section className="relative border-t border-hairline py-16 lg:py-24">
      <TituloSeccion as="h2" bajada={bajada}>
        {titulo}
      </TituloSeccion>
      <div className="mt-12">{children}</div>
    </section>
  )
}

export default function DesignSystemPage() {
  return (
    <>
      <Particulas />
      <Grano />

      <div className="contenedor relative pb-24 pt-32">
        {/* Encabezado */}
        <header className="relative py-16 lg:py-24">
          <Glow className="-left-40 -top-20" tamano={720} />
          <p className="text-label text-low">{ds.aviso}</p>
          <h1 className="text-hero mt-6 font-semibold">
            <span className="texto-degrade inline-block">{ds.titulo}</span>
          </h1>
          <p className="text-cuerpo-lg medida mt-6 text-mid">{ds.bajada}</p>
        </header>

        {/* Color */}
        <Bloque titulo={ds.secciones.color.titulo} bajada={ds.secciones.color.bajada}>
          <div className="flex flex-col gap-14">
            {ds.colores.map((grupo) => (
              <div key={grupo.titulo}>
                <h3 className="text-h3 font-medium">{grupo.titulo}</h3>
                <p className="text-cuerpo medida mt-3 text-mid">{grupo.descripcion}</p>

                <Reveal
                  stagger={0.06}
                  variante="escala"
                  className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
                >
                  {grupo.muestras.map((m) => (
                    <div
                      key={m.variable}
                      className="rounded-(--radius-card) border border-hairline p-3 transition-colors duration-300 hover:border-hairline-hover"
                    >
                      {m.comoTexto ? (
                        // Los tokens de texto se muestran como texto sobre el
                        // fondo real: es ahí donde se juzga el contraste, no
                        // en un bloque de color.
                        <div className="flex h-20 w-full flex-col justify-center gap-1 rounded-[10px] border border-hairline bg-base px-3">
                          <p className="text-h3 font-display leading-none" style={{ color: m.valor }}>
                            Aa
                          </p>
                          <p className="text-label" style={{ color: m.valor }}>
                            Texto de ejemplo
                          </p>
                        </div>
                      ) : (
                        <div
                          className="h-20 w-full rounded-[10px] border border-hairline"
                          style={
                            m.conAlfa
                              ? {
                                  // Tablero a cuadros: deja ver la transparencia.
                                  backgroundColor: m.valor,
                                  backgroundImage:
                                    'linear-gradient(45deg,rgba(255,255,255,.07) 25%,transparent 25%,transparent 75%,rgba(255,255,255,.07) 75%),linear-gradient(45deg,rgba(255,255,255,.07) 25%,transparent 25%,transparent 75%,rgba(255,255,255,.07) 75%)',
                                  backgroundSize: '12px 12px',
                                  backgroundPosition: '0 0, 6px 6px',
                                }
                              : { backgroundColor: m.valor }
                          }
                        />
                      )}
                      <p className="text-label mt-3 font-mono text-hi">{m.variable}</p>
                      <p className="text-label mt-1 font-mono text-low">{m.valor}</p>
                      {m.nota ? <p className="text-label mt-2 text-mid">{m.nota}</p> : null}
                    </div>
                  ))}
                </Reveal>
              </div>
            ))}
          </div>
        </Bloque>

        {/* Tipografía */}
        <Bloque titulo={ds.secciones.tipografia.titulo} bajada={ds.secciones.tipografia.bajada}>
          <div className="flex flex-col divide-y divide-hairline">
            {ds.tipografia.map((t) => (
              <div key={t.rol} className="grid gap-4 py-8 lg:grid-cols-[220px_1fr] lg:gap-10">
                <div>
                  <p className="text-label text-hi">{t.rol}</p>
                  <p className="text-label mt-1 text-low">{t.fuente}</p>
                  <p className="text-label mt-2 font-mono text-low">{t.medidas}</p>
                  <p className="text-label mt-1 font-mono text-violet-300">.{t.clase}</p>
                </div>
                <p
                  className={`${t.clase} ${
                    t.fuente === 'Clash Display'
                      ? 'font-display font-semibold text-hi'
                      : 'font-sans text-mid'
                  } medida`}
                >
                  {t.ejemplo}
                </p>
              </div>
            ))}
          </div>
        </Bloque>

        {/* Degradé de marca */}
        <Bloque titulo={ds.secciones.degrade.titulo} bajada={ds.secciones.degrade.bajada}>
          <div className="flex flex-col gap-10">
            <div
              className="h-24 w-full rounded-(--radius-card)"
              style={{ backgroundImage: 'var(--grad-brand)' }}
            />
            <p className="text-label font-mono text-low">--grad-brand</p>
            <p className="text-hero font-display font-semibold">
              <span className="texto-degrade inline-block">Sobre título grande</span>
            </p>
            <p className="text-h2 font-display font-semibold">
              Mezclado con <span className="texto-degrade inline-block">texto plano</span>
            </p>
          </div>
        </Bloque>

        {/* Botones */}
        <Bloque titulo={ds.secciones.botones.titulo} bajada={ds.secciones.botones.bajada}>
          <div className="flex flex-col gap-12">
            <div>
              <p className="text-label text-low">Primario</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Boton>Cotizar mi proyecto</Boton>
                <Boton tamano="chico">Contacto</Boton>
                <Boton disabled>Enviando</Boton>
              </div>
            </div>

            <div>
              <p className="text-label text-low">Secundario</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Boton variante="secundario">Ver ejemplos</Boton>
                <Boton variante="secundario" tamano="chico">
                  Ver ejemplos
                </Boton>
                <Boton variante="secundario" disabled>
                  Ver ejemplos
                </Boton>
              </div>
            </div>

            <div>
              <p className="text-label text-low">Enlace</p>
              <div className="mt-5 flex flex-col items-start gap-4">
                <Boton variante="enlace" href="/ecommerce">
                  Ver más sobre ecommerce <span data-flecha>&rarr;</span>
                </Boton>
                <Boton variante="enlace" href="#" >
                  Ver más sobre software a medida <span data-flecha>&rarr;</span>
                </Boton>
              </div>
            </div>

            <div>
              <p className="text-label text-low">
                Estados: pasá el mouse por encima y navegá con Tab para ver hover y foco.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-(--radius-card) border border-hairline p-5">
                  <p className="text-label text-hi">Reposo</p>
                  <p className="text-label mt-1 text-low">Sin glow</p>
                  <div className="mt-4">
                    <Boton tamano="chico">Botón</Boton>
                  </div>
                </div>
                <div className="rounded-(--radius-card) border border-hairline p-5">
                  <p className="text-label text-hi">Hover</p>
                  <p className="text-label mt-1 text-low">Glow violeta, sube 2px</p>
                  <div className="mt-4">
                    <Boton
                      tamano="chico"
                      className="-translate-y-0.5 shadow-[0_8px_32px_-4px_rgba(139,92,246,0.55)]"
                    >
                      Botón
                    </Boton>
                  </div>
                </div>
                <div className="rounded-(--radius-card) border border-hairline p-5">
                  <p className="text-label text-hi">Foco</p>
                  <p className="text-label mt-1 text-low">Anillo violeta a 3px</p>
                  <div className="mt-4">
                    <Boton
                      tamano="chico"
                      className="outline outline-2 outline-offset-[3px] outline-violet-500"
                    >
                      Botón
                    </Boton>
                  </div>
                </div>
                <div className="rounded-(--radius-card) border border-hairline p-5">
                  <p className="text-label text-hi">Deshabilitado</p>
                  <p className="text-label mt-1 text-low">Opacidad 50%, sin puntero</p>
                  <div className="mt-4">
                    <Boton tamano="chico" disabled>
                      Botón
                    </Boton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Bloque>

        {/* Formulario */}
        <Bloque titulo={ds.secciones.formulario.titulo} bajada={ds.secciones.formulario.bajada}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-label text-low">Estado normal</p>
              <div className="mt-5 flex flex-col gap-5">
                <Campo name="nombre" label="Nombre" requerido placeholder="Tu nombre" />
                <Campo
                  name="email"
                  label="Email"
                  tipo="email"
                  requerido
                  placeholder="nombre@empresa.com"
                />
                <Campo name="empresa" label="Empresa" placeholder="Opcional" />
                <Campo
                  name="tipo"
                  label="Tipo de proyecto"
                  tipo="select"
                  requerido
                  defaultValue=""
                  opciones={[...ds.tiposProyecto]}
                />
                <Campo
                  name="mensaje"
                  label="Mensaje"
                  tipo="textarea"
                  requerido
                  placeholder="Contanos qué necesitás construir"
                />
              </div>
            </div>

            <div>
              <p className="text-label text-low">Con error, deshabilitado y relleno</p>
              <div className="mt-5 flex flex-col gap-5">
                <Campo
                  name="nombre-error"
                  label="Nombre"
                  requerido
                  error="Escribí tu nombre."
                  defaultValue="A"
                />
                <Campo
                  name="email-error"
                  label="Email"
                  tipo="email"
                  requerido
                  error="Revisá el email: falta el @."
                  defaultValue="matias.empresa.com"
                />
                <Campo
                  name="empresa-lleno"
                  label="Empresa"
                  defaultValue="Webmedia"
                />
                <Campo
                  name="tipo-error"
                  label="Tipo de proyecto"
                  tipo="select"
                  requerido
                  error="Elegí un tipo de proyecto."
                  defaultValue=""
                  opciones={[...ds.tiposProyecto]}
                />
                <Campo
                  name="mensaje-deshabilitado"
                  label="Mensaje"
                  tipo="textarea"
                  disabled
                  defaultValue="Campo deshabilitado mientras se envía el formulario."
                />
                <div className="pt-2">
                  <Boton>Enviar consulta</Boton>
                </div>
              </div>
            </div>
          </div>
        </Bloque>

        {/* Capas de fondo */}
        <Bloque titulo={ds.secciones.fondo.titulo} bajada={ds.secciones.fondo.bajada}>
          <div className="relative grid gap-6 lg:grid-cols-3">
            <Glow className="-bottom-32 left-1/3" tamano={560} intensidad={0.8} />
            {ds.capasFondo.map((capa) => (
              <div
                key={capa.titulo}
                className="rounded-(--radius-card) border border-hairline bg-surface p-7 transition-colors duration-300 hover:border-hairline-hover"
              >
                <h3 className="text-h3 font-medium">{capa.titulo}</h3>
                <p className="text-cuerpo mt-3 text-mid">{capa.descripcion}</p>
              </div>
            ))}
          </div>

          {/* Muestra aislada del grano y del glow, para verlos sin el
              resto de la página encima. */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="relative h-56 overflow-hidden rounded-(--radius-card) border border-hairline">
              <div
                className="absolute inset-0"
                style={{ backgroundImage: 'var(--grad-brand)', opacity: 0.9 }}
              />
              <div
                className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
                style={{ backgroundImage: 'url(/grano.png)', backgroundSize: '128px 128px' }}
              />
              <p className="text-label absolute bottom-4 left-5 rounded-(--radius-pill) bg-base/80 px-3 py-1.5 font-medium text-hi">
                Grano al 18% sobre el degradé, para verlo
              </p>
            </div>
            <div className="relative h-56 overflow-hidden rounded-(--radius-card) border border-hairline bg-base">
              <div
                className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                style={{ backgroundImage: 'var(--glow-violet)' }}
              />
              <p className="text-label absolute bottom-4 left-5 text-mid">
                Glow violeta aislado sobre el fondo base
              </p>
            </div>
          </div>
        </Bloque>

        {/* Reveals */}
        <Bloque titulo={ds.secciones.reveals.titulo} bajada={ds.secciones.reveals.bajada}>
          <div className="flex flex-col gap-8">
            {ds.reveals.map((r) => (
              <div key={r.variante} className="grid gap-3 lg:grid-cols-[220px_1fr] lg:gap-10">
                <p className="text-label font-mono text-violet-300">{r.variante}</p>
                <Reveal variante={r.variante}>
                  <div className="rounded-(--radius-card) border border-hairline bg-surface p-6">
                    <p className="text-cuerpo text-mid">{r.nota}</p>
                  </div>
                </Reveal>
              </div>
            ))}

            <div className="grid gap-3 lg:grid-cols-[220px_1fr] lg:gap-10">
              <p className="text-label font-mono text-violet-300">lateral + stagger</p>
              <Reveal variante="lateral" stagger={0.1} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {['01', '02', '03', '04'].map((n) => (
                  <div
                    key={n}
                    className="rounded-(--radius-card) border border-hairline bg-surface p-6"
                  >
                    <p className="text-h3 font-display texto-degrade inline-block font-semibold">
                      {n}
                    </p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </Bloque>
      </div>
    </>
  )
}
