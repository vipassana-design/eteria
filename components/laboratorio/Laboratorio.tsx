'use client'

import { useState } from 'react'
import {
  aHex,
  aRgb,
  alfaDe,
  componer,
  contraste,
  hslARgb,
  nivelWcag,
  rgbAHsl,
} from '@/lib/color'
import {
  controlesFondo,
  gruposColor,
  gruposNumero,
  laboratorioUi,
  paresContraste,
  type ControlColor,
  type ControlNumero,
} from '@/content/laboratorio'
import { botonesUi, degradesBoton, tokensDeBoton } from '@/content/botones'
import { paletas, paletasUi } from '@/content/paletas'
import { useLaboratorio } from './useLaboratorio'

/** Laboratorio de paleta (PLAN.md §15).
 *
 *  Panel flotante para explorar colores y escala en vivo: escribe las
 *  variables CSS del documento, así que el sitio entero se repinta sin
 *  recompilar ni recargar.
 *
 *  Herramienta interna. Se monta solo cuando está habilitada, y no
 *  entra en el bundle de producción: el layout la importa detrás de un
 *  flag y el tree-shaking la elimina cuando está apagado.
 *
 *  Sin localStorage, por la regla del proyecto: las paletas guardadas
 *  viven en memoria y para conservar una hay que copiar el CSS.
 */

type Pestana = 'paletas' | 'color' | 'escala' | 'fondo' | 'contraste'

export default function Laboratorio() {
  const [abierto, setAbierto] = useState(true)
  const [pestana, setPestana] = useState<Pestana>('paletas')
  const [copiado, setCopiado] = useState(false)
  const p = useLaboratorio()

  if (!p.listo) return null

  const copiar = async () => {
    const css = p.css()
    if (!css) return
    try {
      await navigator.clipboard.writeText(css)
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 1600)
    } catch {
      // Sin permiso de portapapeles: el CSS se muestra igual en el
      // bloque de abajo para copiarlo a mano.
      setCopiado(false)
    }
  }

  /** Mueve el tono del acento y arrastra el resto: es la exploración
   *  más rápida, porque el tono es lo que más cambia el carácter. */
  const alAzar = () => {
    const h = Math.floor(Math.random() * 360)
    const violeta = gruposColor[1]?.controles[0]
    const azul = gruposColor[1]?.controles[1]
    if (violeta) p.setColor(violeta, aHex(hslARgb({ h, s: 91, l: 66 })))
    if (azul) p.setColor(azul, aHex(hslARgb({ h: (h + 40) % 360, s: 91, l: 60 })))
    // El fondo toma un poco del tono nuevo, para que no quede huérfano.
    p.escribir('--color-base', aHex(hslARgb({ h, s: 40, l: 6 })))
    p.escribir('--color-elevated', aHex(hslARgb({ h, s: 34, l: 14 })))
  }

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        aria-label={laboratorioUi.mostrar}
        className="fixed bottom-6 left-6 z-[70] flex size-11 items-center justify-center rounded-full border border-white/15 bg-[#1b1733] text-violet-300 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] transition-colors duration-200 hover:border-violet-500/60 hover:text-white"
      >
        <span aria-hidden="true" className="text-lg leading-none">
          &rsaquo;
        </span>
      </button>
    )
  }

  return (
    <aside
      // El z-index va por encima del header (z-50) y del FAB, pero el
      // panel no bloquea el scroll de la página.
      className="fixed bottom-6 left-6 z-[70] flex max-h-[min(72vh,640px)] w-[326px] flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#141122]/97 shadow-[0_24px_70px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl"
      style={{ colorScheme: 'dark' }}
    >
      {/* Cabecera */}
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white">
            {laboratorioUi.titulo}
            {p.cuenta > 0 ? (
              <span className="ml-2 rounded-full bg-violet-500/25 px-1.5 py-0.5 text-[10px] font-medium text-violet-200">
                {p.cuenta}
              </span>
            ) : null}
          </p>
          <p className="truncate text-[10.5px] text-white/45">{laboratorioUi.bajada}</p>
        </div>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          aria-label={laboratorioUi.ocultar}
          className="flex size-7 shrink-0 items-center justify-center rounded-md text-white/50 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        >
          <span aria-hidden="true" className="text-base leading-none">
            &lsaquo;
          </span>
        </button>
      </header>

      {/* Pestañas */}
      <nav className="flex shrink-0 gap-1 border-b border-white/10 px-2 py-2">
        {(Object.keys(laboratorioUi.pestanas) as Pestana[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setPestana(k)}
            className={`flex-1 rounded-md px-1.5 py-1.5 text-[10.5px] font-medium transition-colors duration-200 ${
              pestana === k
                ? 'bg-violet-500/22 text-violet-100'
                : 'text-white/45 hover:bg-white/6 hover:text-white/75'
            }`}
          >
            {laboratorioUi.pestanas[k]}
          </button>
        ))}
      </nav>

      {/* Cuerpo. `data-lenis-prevent` es necesario: Lenis captura el
          wheel de toda la página, y sin esto scrollear acá movía el
          sitio de atrás en lugar del panel. */}
      <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {pestana === 'paletas' ? <PanelPaletas p={p} /> : null}
        {pestana === 'color' ? <PanelColor p={p} /> : null}
        {pestana === 'escala' ? <PanelNumeros p={p} grupos={gruposNumero} /> : null}
        {pestana === 'fondo' ? (
          <PanelNumeros p={p} grupos={[{ titulo: 'Capas de fondo', controles: controlesFondo }]} />
        ) : null}
        {pestana === 'contraste' ? <PanelContraste p={p} /> : null}
      </div>

      {/* Pie: acciones. Scrollea cuando hay varias paletas guardadas,
          así que también se excluye de Lenis. */}
      <footer
        data-lenis-prevent
        className="max-h-[40%] shrink-0 overflow-y-auto border-t border-white/10 px-4 py-3"
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copiar}
            disabled={p.cuenta === 0}
            className="flex-1 rounded-lg bg-violet-600 px-3 py-2 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-white/8 disabled:text-white/30"
          >
            {copiado ? laboratorioUi.exportado : laboratorioUi.exportar}
          </button>
          <button
            type="button"
            onClick={p.guardar}
            disabled={p.cuenta === 0}
            className="rounded-lg border border-white/15 px-3 py-2 text-[11px] font-medium text-white/80 transition-colors duration-200 hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:border-white/8 disabled:text-white/25"
          >
            {laboratorioUi.guardar}
          </button>
          <button
            type="button"
            onClick={p.reset}
            disabled={p.cuenta === 0}
            className="rounded-lg border border-white/15 px-3 py-2 text-[11px] font-medium text-white/80 transition-colors duration-200 hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:border-white/8 disabled:text-white/25"
          >
            ↺
          </button>
        </div>

        <button
          type="button"
          onClick={alAzar}
          title={laboratorioUi.aleatorioNota}
          className="mt-2 w-full rounded-lg border border-dashed border-white/15 px-3 py-1.5 text-[10.5px] text-white/55 transition-colors duration-200 hover:border-violet-500/50 hover:text-violet-200"
        >
          {laboratorioUi.aleatorio}
        </button>

        {p.guardadas.length > 0 ? (
          <div className="mt-3 border-t border-white/8 pt-3">
            <p className="mb-2 text-[10px] uppercase tracking-wide text-white/35">
              {laboratorioUi.guardadas}
            </p>
            <ul className="flex flex-col gap-1">
              {p.guardadas.map((g, i) => (
                <li key={g.nombre} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => p.aplicar(g.cambios)}
                    className="min-w-0 flex-1 truncate rounded px-2 py-1 text-left text-[11px] text-white/70 transition-colors duration-200 hover:bg-white/8 hover:text-white"
                  >
                    {g.nombre}
                    <span className="ml-1.5 text-white/30">
                      {Object.keys(g.cambios).length}
                    </span>
                  </button>
                  {/* Muestras de la paleta guardada, para reconocerla. */}
                  <span className="flex shrink-0 gap-0.5" aria-hidden="true">
                    {['--color-base', '--color-violet-500', '--color-blue-500'].map((t) => (
                      <span
                        key={t}
                        className="size-3 rounded-sm border border-white/15"
                        style={{ background: g.cambios[t] ?? p.originales[t] }}
                      />
                    ))}
                  </span>
                  <button
                    type="button"
                    onClick={() => p.borrarGuardada(i)}
                    aria-label={`${laboratorioUi.borrar} ${g.nombre}`}
                    className="shrink-0 rounded px-1 text-[11px] text-white/30 transition-colors duration-200 hover:text-red-300"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="mt-3 text-[9.5px] leading-relaxed text-white/28">{laboratorioUi.aviso}</p>
      </footer>
    </aside>
  )
}

// ────────────────────────── Pestaña de paletas ──────────────────────────

/** Las plantillas: doce paletas completas, listas para aplicar.
 *
 *  Todas pasan AA en los doce pares, así que se puede elegir por
 *  criterio visual sin tener que auditar cada una. El badge del
 *  contraste mínimo dice cuánto margen deja cada una para después
 *  ajustar los colores a mano. */
function PanelPaletas({ p }: { p: ReturnType<typeof useLaboratorio> }) {
  // Agrupadas por origen, en el orden en que están declaradas.
  const origenes = [...new Set(paletas.map((x) => x.origen))]

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[10px] leading-relaxed text-white/40">{paletasUi.bajada}</p>

      {origenes.map((origen) => (
        <section key={origen}>
          <p className="mb-2 text-[10px] uppercase tracking-wide text-white/35">
            {paletasUi.origenes[origen]}
          </p>
          <div className="flex flex-col gap-1.5">
            {paletas
              .filter((x) => x.origen === origen)
              .map((pal) => (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => p.aplicar(pal.tokens)}
                  className="group rounded-lg border border-white/10 p-2.5 text-left transition-colors duration-200 hover:border-violet-500/50 hover:bg-white/4"
                >
                  <span className="flex items-center gap-2">
                    {/* Las muestras: fondo, card, acento, su clara y el
                        cuerpo de texto. Alcanza para reconocer la
                        paleta sin aplicarla. */}
                    <span aria-hidden="true" className="flex shrink-0 gap-0.5">
                      {[
                        '--color-base',
                        '--color-elevated',
                        '--color-violet-500',
                        '--color-violet-300',
                        '--color-mid',
                      ].map((t) => (
                        <span
                          key={t}
                          className="size-4 rounded-sm border border-white/12"
                          style={{ background: pal.tokens[t] }}
                        />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium text-white/85">
                      {pal.nombre}
                    </span>
                    <span
                      title={`Contraste más bajo de la paleta: ${pal.peorContraste.toFixed(2)}`}
                      className="shrink-0 rounded bg-emerald-500/18 px-1.5 py-0.5 font-mono text-[9px] text-emerald-200"
                    >
                      {paletasUi.contrasteMinimo} {pal.peorContraste.toFixed(2)}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[9.5px] leading-relaxed text-white/38">
                    {pal.linea}
                  </span>
                </button>
              ))}
          </div>
        </section>
      ))}

      <p className="text-[9.5px] leading-relaxed text-white/30">{paletasUi.nota}</p>
    </div>
  )
}

// ─────────────────────────── Pestaña de color ───────────────────────────

function PanelColor({ p }: { p: ReturnType<typeof useLaboratorio> }) {
  return (
    <div className="flex flex-col gap-5">
      {gruposColor.map((g) => (
        <section key={g.titulo}>
          <p className="mb-2.5 text-[10px] uppercase tracking-wide text-white/35">{g.titulo}</p>
          <div className="flex flex-col gap-3.5">
            {g.controles.map((c) => (
              <FilaColor key={c.token} control={c} p={p} />
            ))}
          </div>
        </section>
      ))}

      <PanelBotones p={p} />
    </div>
  )
}

/** Los CTA, aparte del resto de la paleta.
 *
 *  No hay picker: son diez degradés armados y verificados. Un CTA
 *  necesita más saturación que un acento de interfaz, y elegir dos
 *  puntos de un degradé a mano es difícil de acertar.
 *
 *  El primario cambia su degradé y su glow; el secundario, que es
 *  transparente, cambia solo el borde en hover. */
function PanelBotones({ p }: { p: ReturnType<typeof useLaboratorio> }) {
  const actual = p.valorDe('--grad-boton')

  /** Cuál está elegido: se compara contra el degradé que escribiría
   *  cada uno, así el estado sale del documento y no de un useState
   *  paralelo que podría desincronizarse con el reset. */
  const elegido = degradesBoton.find((d) => tokensDeBoton(d)['--grad-boton'] === actual)

  /** Vuelve a derivar de la paleta: se borran los tres tokens. */
  const volverALaPaleta = () => {
    for (const t of ['--grad-boton', '--glow-boton', '--borde-boton-hover']) {
      p.borrarToken(t)
    }
  }

  return (
    <section>
      <p className="mb-1 text-[10px] uppercase tracking-wide text-white/35">
        {botonesUi.titulo}
      </p>
      <p className="mb-2.5 text-[9.5px] leading-relaxed text-white/38">{botonesUi.bajada}</p>

      {/* Vuelta al default. Queda marcado cuando ningún degradé está
          elegido, que es el estado inicial. */}
      <button
        type="button"
        onClick={volverALaPaleta}
        className={`mb-2 flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left transition-colors duration-200 ${
          elegido
            ? 'border-white/10 hover:border-white/30'
            : 'border-violet-500/60 bg-violet-500/10'
        }`}
      >
        <span
          aria-hidden="true"
          className="size-5 shrink-0 rounded border border-white/15"
          style={{ backgroundImage: 'var(--grad-brand)' }}
        />
        <span className="min-w-0 flex-1">
          <span className="block text-[10.5px] font-medium text-white/85">
            {botonesUi.porDefecto}
          </span>
          <span className="block text-[9px] text-white/35">{botonesUi.porDefectoNota}</span>
        </span>
      </button>

      {/* Los diez, en una grilla de dos columnas. */}
      <div className="grid grid-cols-2 gap-1.5">
        {degradesBoton.map((d) => {
          const t = tokensDeBoton(d)
          const activo = elegido?.id === d.id
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => p.aplicarTokens(t)}
              title={`${d.nombre} · contraste ${d.contraste.toFixed(2)} con el texto del botón`}
              className={`rounded-lg border p-1.5 text-left transition-colors duration-200 ${
                activo
                  ? 'border-violet-500/60 bg-violet-500/10'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {/* La muestra es el degradé real, del tamaño de un botón
                  chico: se juzga la pieza, no el color suelto. */}
              <span
                aria-hidden="true"
                className="mb-1 flex h-7 items-center justify-center rounded-md text-[9px] font-semibold"
                style={{
                  backgroundImage: t['--grad-boton'],
                  color: 'var(--color-base)',
                  boxShadow: activo ? `0 4px 16px -3px ${t['--glow-boton']}` : 'none',
                }}
              >
                Cotizar
              </span>
              <span className="block truncate text-[9.5px] text-white/70">{d.nombre}</span>
              <span className="block font-mono text-[8.5px] text-white/30">
                {d.contraste.toFixed(2)} {botonesUi.contraste}
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-2 text-[9px] leading-relaxed text-white/30">{botonesUi.nota}</p>
    </section>
  )
}

/** Un color: picker nativo + los tres sliders HSL.
 *
 *  El picker sirve para "quiero este color"; los sliders para explorar,
 *  que es lo que se hace cuando todavía no sabés qué buscás. */
function FilaColor({
  control,
  p,
}: {
  control: ControlColor
  p: ReturnType<typeof useLaboratorio>
}) {
  const [abierto, setAbierto] = useState(false)
  const valor = p.valorDe(control.token)
  const rgb = aRgb(valor)
  const hex = rgb ? aHex(rgb) : '#000000'
  const hsl = rgb ? rgbAHsl(rgb) : { h: 0, s: 0, l: 0 }
  const alfa = alfaDe(valor)

  const mover = (d: Partial<typeof hsl>) => {
    p.setColor(control, aHex(hslARgb({ ...hsl, ...d })))
  }

  return (
    <div>
      <div className="flex items-center gap-2.5">
        {/* El input de color nativo va detrás de la muestra: se ve el
            swatch grande y el picker abre al hacer click. */}
        <label className="relative size-8 shrink-0 cursor-pointer overflow-hidden rounded-md border border-white/20">
          <span className="block size-full" style={{ background: hex }} />
          <input
            type="color"
            value={hex}
            onChange={(e) => p.setColor(control, e.target.value)}
            aria-label={control.etiqueta}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          className="min-w-0 flex-1 text-left"
        >
          <span className="block truncate text-[11.5px] font-medium text-white/85">
            {control.etiqueta}
          </span>
          <span className="block font-mono text-[10px] text-white/40">
            {hex}
            {alfa < 1 ? ` · ${Math.round(alfa * 100)}%` : ''}
          </span>
        </button>

        <span
          aria-hidden="true"
          className={`shrink-0 text-[10px] text-white/30 transition-transform duration-200 ${abierto ? 'rotate-90' : ''}`}
        >
          &rsaquo;
        </span>
      </div>

      {abierto ? (
        <div className="mt-2.5 rounded-lg bg-black/25 p-2.5">
          <p className="mb-2.5 text-[10px] leading-relaxed text-white/40">{control.nota}</p>
          <Slider etiqueta="H" valor={hsl.h} min={0} max={360} paso={1} alCambiar={(h) => mover({ h })} />
          <Slider etiqueta="S" valor={hsl.s} min={0} max={100} paso={1} alCambiar={(s) => mover({ s })} sufijo="%" />
          <Slider etiqueta="L" valor={hsl.l} min={0} max={100} paso={1} alCambiar={(l) => mover({ l })} sufijo="%" />

          {control.derivados ? (
            <div className="mt-2 flex items-center gap-1.5 border-t border-white/8 pt-2">
              <span className="text-[9.5px] text-white/30">Rampa</span>
              {control.derivados.map((d) => (
                <span
                  key={d.token}
                  title={d.token}
                  className="size-4 rounded-sm border border-white/15"
                  style={{ background: p.valorDe(d.token) }}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

// ────────────────────── Pestañas de escala y fondo ──────────────────────

function PanelNumeros({
  p,
  grupos,
}: {
  p: ReturnType<typeof useLaboratorio>
  grupos: { titulo: string; controles: ControlNumero[] }[]
}) {
  return (
    <div className="flex flex-col gap-5">
      {grupos.map((g) => (
        <section key={g.titulo}>
          <p className="mb-2.5 text-[10px] uppercase tracking-wide text-white/35">{g.titulo}</p>
          <div className="flex flex-col gap-3">
            {g.controles.map((c) => (
              <FilaNumero key={c.token} control={c} p={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function FilaNumero({
  control,
  p,
}: {
  control: ControlNumero
  p: ReturnType<typeof useLaboratorio>
}) {
  const esFondo = control.token.startsWith('--lab-')
  const bruto = p.valorDe(control.token)
  const valor = esFondo
    ? Number(bruto) || 1
    : control.unidad === 'rem'
      ? (Number(bruto.replace('rem', '')) || 0)
      : p.pxDe(control.token)

  const alCambiar = (n: number) => {
    if (esFondo) p.escribir(control.token, String(n))
    else p.setPx(control.token, n, control.esClamp ?? false, control.unidad)
  }

  return (
    <div>
      <div className="mb-1 flex items-baseline gap-2">
        <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium text-white/85">
          {control.etiqueta}
        </span>
        <span className="shrink-0 font-mono text-[10px] text-violet-200">
          {Number.isInteger(valor) ? valor : valor.toFixed(2)}
          {control.unidad}
        </span>
      </div>
      <input
        type="range"
        min={control.min}
        max={control.max}
        step={control.paso}
        value={valor}
        onChange={(e) => alCambiar(Number(e.target.value))}
        aria-label={control.etiqueta}
        className="w-full accent-violet-500"
      />
      <p className="mt-1 text-[9.5px] leading-relaxed text-white/32">{control.nota}</p>
    </div>
  )
}

// ───────────────────────── Pestaña de contraste ─────────────────────────

function PanelContraste({ p }: { p: ReturnType<typeof useLaboratorio> }) {
  const filas = paresContraste.map((par) => {
    const textoRgb = aRgb(p.valorDe(par.texto))
    let fondoRgb = aRgb(p.valorDe(par.fondo))

    // Un fondo translúcido no tiene contraste propio: se compone sobre
    // lo que haya debajo. Sin esto el número es fantasía.
    if (par.sobre && fondoRgb) {
      const debajo = aRgb(p.valorDe(par.sobre))
      const a = alfaDe(p.valorDe(par.fondo))
      if (debajo) fondoRgb = componer(fondoRgb, a, debajo)
    }

    if (!textoRgb || !fondoRgb) return null

    const ratio = contraste(textoRgb, fondoRgb)
    return {
      ...par,
      ratio,
      nivel: nivelWcag(ratio, par.grande),
      muestraTexto: aHex(textoRgb),
      muestraFondo: aHex(fondoRgb),
    }
  })

  const fallan = filas.filter((f) => f?.nivel === 'falla').length

  return (
    <div>
      {fallan > 0 ? (
        <p className="mb-3 rounded-lg border border-red-400/30 bg-red-500/12 px-2.5 py-2 text-[10.5px] text-red-200">
          {fallan === 1 ? '1 par no pasa AA.' : `${fallan} pares no pasan AA.`}
        </p>
      ) : (
        <p className="mb-3 rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-2 text-[10.5px] text-emerald-200">
          Todos los pares pasan AA.
        </p>
      )}

      <ul className="flex flex-col gap-1">
        {filas.map((f) =>
          f ? (
            <li
              key={f.etiqueta}
              className="flex items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-white/4"
            >
              {/* Muestra real: el texto sobre su fondo compuesto. */}
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded border border-white/12 text-[11px] font-semibold"
                style={{ background: f.muestraFondo, color: f.muestraTexto }}
              >
                Aa
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] text-white/75">{f.etiqueta}</span>
                {f.grande ? (
                  <span className="block text-[9px] text-white/30">texto grande · 3:1</span>
                ) : null}
              </span>
              <span className="shrink-0 font-mono text-[10.5px] text-white/60">
                {f.ratio.toFixed(2)}
              </span>
              <span
                className={`w-[34px] shrink-0 rounded px-1 py-0.5 text-center text-[9px] font-semibold ${
                  f.nivel === 'AAA'
                    ? 'bg-emerald-500/25 text-emerald-200'
                    : f.nivel === 'AA'
                      ? 'bg-amber-500/22 text-amber-200'
                      : 'bg-red-500/25 text-red-200'
                }`}
              >
                {f.nivel === 'falla' ? '✕' : f.nivel}
              </span>
            </li>
          ) : null,
        )}
      </ul>

      <p className="mt-3 text-[9.5px] leading-relaxed text-white/32">
        {laboratorioUi.contrasteNota}
      </p>

      {p.cuenta > 0 ? (
        <div className="mt-4 border-t border-white/8 pt-3">
          <p className="mb-1.5 text-[10px] uppercase tracking-wide text-white/35">CSS</p>
          <pre className="max-h-40 overflow-auto rounded-lg bg-black/40 p-2.5 font-mono text-[9.5px] leading-relaxed text-violet-100">
            {p.css()}
          </pre>
          <p className="mt-2 text-[9.5px] leading-relaxed text-white/32">
            {laboratorioUi.sinPersistencia}
          </p>
        </div>
      ) : null}
    </div>
  )
}

// ───────────────────────────── Slider HSL ─────────────────────────────

function Slider({
  etiqueta,
  valor,
  min,
  max,
  paso,
  alCambiar,
  sufijo = '',
}: {
  etiqueta: string
  valor: number
  min: number
  max: number
  paso: number
  alCambiar: (n: number) => void
  sufijo?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2.5 shrink-0 font-mono text-[9.5px] text-white/35">{etiqueta}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={paso}
        value={Math.round(valor)}
        onChange={(e) => alCambiar(Number(e.target.value))}
        aria-label={etiqueta}
        className="min-w-0 flex-1 accent-violet-500"
      />
      <span className="w-8 shrink-0 text-right font-mono text-[9.5px] text-white/45">
        {Math.round(valor)}
        {sufijo}
      </span>
    </div>
  )
}
