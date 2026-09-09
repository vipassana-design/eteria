'use client'

import { useCallback, useState } from 'react'
import { ajustar } from '@/lib/color'
import {
  controlesFondo,
  gruposColor,
  gruposNumero,
  type ControlColor,
} from '@/content/laboratorio'

/** Estado del laboratorio: los valores que difieren del original.
 *
 *  Se guarda solo el delta y no la paleta entera: así el reset es
 *  borrar el mapa, y el CSS exportado incluye únicamente lo que
 *  cambiaste en vez de volcar los 40 tokens.
 */
export type Cambios = Record<string, string>

export interface PaletaGuardada {
  nombre: string
  cambios: Cambios
}

/** Todos los tokens que el panel puede tocar. */
const TOKENS = [
  // El tope suelto del hero: no tiene control propio, lo mueve el
  // slider de --text-hero junto con el token.
  '--text-hero-max',
  // Los tres de botón (§15): no tienen control de color propio, los
  // escribe el selector de degradés. Van en la lista para que el
  // reset los limpie y el CSS exportado los incluya.
  // Los del header (§15): los escribe su propio control.
  '--fondo-header',
  '--borde-header',
  '--grad-boton',
  '--glow-boton',
  '--borde-boton-hover',
  ...gruposColor.flatMap((g) =>
    g.controles.flatMap((c) => [c.token, ...(c.derivados?.map((d) => d.token) ?? [])]),
  ),
  ...gruposNumero.flatMap((g) => g.controles.map((c) => c.token)),
  ...controlesFondo.map((c) => c.token),
]

/** Lee el valor efectivo de una variable CSS del documento. */
function leer(token: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim()
}

/** El máximo de un `clamp(min, fluido, max)`, en px.
 *
 *  Los tokens de tipografía son clamp: el panel mueve el máximo, que
 *  es el tamaño en desktop, y respeta el mínimo de mobile. Si no
 *  parsea —porque ya lo sobrescribimos con un valor plano— cae al
 *  número que haya. */
export function maxDeClamp(valor: string): number {
  const m = valor.match(/clamp\([^,]+,[^,]+,\s*([\d.]+)rem\s*\)/)
  if (m?.[1]) return Number(m[1]) * 16
  const plano = valor.match(/([\d.]+)rem/)
  if (plano?.[1]) return Number(plano[1]) * 16
  const px = valor.match(/([\d.]+)px/)
  return px?.[1] ? Number(px[1]) : 0
}

/** El valor que escribe un slider de tipografía.
 *
 *  Escribe un tamaño **plano**, no un clamp. Reemplazar solo el máximo
 *  no funcionaba: el tramo fluido de estos tokens
 *  (`1.27rem + 3.11vw`) a 1440px ya supera el techo, así que pisaba
 *  cualquier máximo mayor y subir el slider no tenía efecto.
 *
 *  Se pierde el comportamiento responsive mientras el laboratorio está
 *  puesto, que para explorar no molesta: el CSS exportado se pega como
 *  techo del clamp original. */
function tamanoPlano(px: number): string {
  return `${px / 16}rem`
}

// El nombre va en inglés y no en español como el resto del proyecto:
// la regla react-hooks/rules-of-hooks exige el prefijo `use` para
// reconocerlo como hook y validar el orden de las llamadas.
export function useLaboratorio() {
  const [cambios, setCambios] = useState<Cambios>({})
  const [guardadas, setGuardadas] = useState<PaletaGuardada[]>([])

  /** Los valores del sitio antes de tocar nada, para el reset.
   *
   *  Se leen en el inicializador y no en un efecto: el componente se
   *  monta sin SSR, así que el documento ya existe, y de este modo los
   *  originales están disponibles en el primer render y no cambian
   *  nunca más. */
  const [originales] = useState<Cambios>(() => {
    if (typeof document === 'undefined') return {}
    const base: Cambios = {}
    for (const t of TOKENS) base[t] = leer(t)
    // Las variables del laboratorio no existen todavía: su neutro es 1.
    for (const c of controlesFondo) if (!base[c.token]) base[c.token] = '1'
    return base
  })

  const listo = Object.keys(originales).length > 0

  /** Escribe un token en el documento y lo registra como cambio. */
  const escribir = useCallback((token: string, valor: string) => {
    document.documentElement.style.setProperty(token, valor)
    setCambios((c) => ({ ...c, [token]: valor }))
  }, [])

  /** Un control de color: escribe el token y recalcula sus derivados. */
  const setColor = useCallback(
    (control: ControlColor, hex: string) => {
      escribir(control.token, hex)
      for (const d of control.derivados ?? []) {
        escribir(d.token, ajustar(hex, { h: d.dh, s: d.ds, l: d.dl }))
      }
    },
    [escribir],
  )

  const valorDe = useCallback(
    (token: string) => cambios[token] ?? originales[token] ?? '',
    [cambios, originales],
  )

  /** El tamaño en px de un token de tipografía. */
  const pxDe = useCallback((token: string) => maxDeClamp(valorDe(token)), [valorDe])

  const setPx = useCallback(
    (token: string, px: number, esClamp: boolean, unidad: string) => {
      if (esClamp) {
        escribir(token, tamanoPlano(px))
        // El hero mide contra su columna con container queries, así que
        // además del token hay que mover su tope suelto.
        if (token === '--text-hero') escribir('--text-hero-max', tamanoPlano(px))
      } else if (unidad === 'rem') {
        escribir(token, `${px}rem`)
      } else {
        escribir(token, `${px}px`)
      }
    },
    [escribir],
  )

  /** Escribe varios tokens de una vez, sin tocar el resto.
   *
   *  Distinto de `aplicar`, que reemplaza el estado entero: esto suma.
   *  Lo usa el selector de degradés de botón, que tiene que poder
   *  combinarse con la paleta ya elegida. */
  const aplicarTokens = useCallback((t: Cambios) => {
    for (const [k, v] of Object.entries(t)) {
      document.documentElement.style.setProperty(k, v)
    }
    setCambios((c) => ({ ...c, ...t }))
  }, [])

  /** Devuelve un token a su valor original y lo saca de los cambios,
   *  así el CSS exportado no lo incluye. */
  const borrarToken = useCallback((token: string) => {
    document.documentElement.style.removeProperty(token)
    setCambios((c) => {
      const { [token]: _, ...resto } = c
      return resto
    })
  }, [])

  const reset = useCallback(() => {
    for (const t of TOKENS) document.documentElement.style.removeProperty(t)
    setCambios({})
  }, [])

  /** Aplica una paleta completa, reemplazando el estado.
   *
   *  Los tokens de botón sobreviven: son una elección independiente de
   *  la paleta —el punto es poder combinar cualquier fondo con
   *  cualquier CTA— y una paleta que los pisara obligaría a volver a
   *  elegir el degradé cada vez.
   *
   *  Una paleta guardada, en cambio, ya los trae adentro si estaban
   *  puestos, así que se aplican con ella. */
  const aplicar = useCallback(
    (c: Cambios) => {
      const deBoton = ['--grad-boton', '--glow-boton', '--borde-boton-hover']
      const conserva: Cambios = {}
      for (const t of deBoton) {
        if (cambios[t] && !(t in c)) conserva[t] = cambios[t]
      }

      for (const t of TOKENS) document.documentElement.style.removeProperty(t)
      const final = { ...c, ...conserva }
      for (const [t, v] of Object.entries(final)) {
        document.documentElement.style.setProperty(t, v)
      }
      setCambios(final)
    },
    [cambios],
  )

  const guardar = useCallback(() => {
    setGuardadas((g) => [...g, { nombre: `Paleta ${g.length + 1}`, cambios: { ...cambios } }])
  }, [cambios])

  const borrarGuardada = useCallback((i: number) => {
    setGuardadas((g) => g.filter((_, j) => j !== i))
  }, [])

  /** El CSS para pegar en globals.css. Solo lo que cambió.
   *
   *  Los tokens de tipografía se exportan como clamp y no con el valor
   *  plano que usa el panel: el plano es un recurso de la herramienta
   *  para que el slider tenga efecto a cualquier ancho, pero pegarlo en
   *  el tema dejaría el sitio sin escala fluida. Se reconstruye el
   *  clamp original con el techo nuevo. */
  const css = useCallback(() => {
    const entradas = Object.entries(cambios)
      // El tope suelto del hero es un detalle de implementación de la
      // utilidad `titulo-hero-texto`: se exporta con su token.
      .filter(([t]) => t !== '--text-hero-max')
      .map(([t, v]): [string, string] => {
        const orig = originales[t] ?? ''
        if (!orig.startsWith('clamp(')) return [t, v]
        const partes = orig.match(/^clamp\(([^,]+),(.+),\s*[\d.]+rem\s*\)$/)
        return partes ? [t, `clamp(${partes[1]!.trim()},${partes[2]!}, ${v})`] : [t, v]
      })
    if (entradas.length === 0) return ''

    // @theme es solo para lo que Tailwind convierte en utilidades
    // (colores, tamaños, radios). Los degradés y el padding lateral
    // viven en :root, y las variables --lab-* no se exportan: son de
    // la herramienta, no del sitio.
    const enRaizSiempre = [
      '--padding-lateral',
      '--grad-boton',
      '--glow-boton',
      '--borde-boton-hover',
      '--fondo-header',
      '--borde-header',
    ]
    const enTema = entradas.filter(
      ([t]) => !t.startsWith('--lab-') && !enRaizSiempre.includes(t),
    )
    const enRaiz = entradas.filter(([t]) => enRaizSiempre.includes(t))

    const lineas: string[] = []
    if (enTema.length > 0) {
      lineas.push('@theme {')
      for (const [t, v] of enTema) lineas.push(`  ${t}: ${v};`)
      lineas.push('}')
    }
    if (enRaiz.length > 0) {
      if (lineas.length > 0) lineas.push('')
      lineas.push(':root {')
      for (const [t, v] of enRaiz) lineas.push(`  ${t}: ${v};`)
      lineas.push('}')
    }
    return lineas.join('\n')
  }, [cambios, originales])

  return {
    listo,
    cambios,
    originales,
    valorDe,
    pxDe,
    setColor,
    setPx,
    escribir,
    aplicarTokens,
    borrarToken,
    reset,
    aplicar,
    guardadas,
    guardar,
    borrarGuardada,
    css,
    /** Cuántos tokens difieren del original. */
    cuenta: Object.keys(cambios).length,
  }
}
