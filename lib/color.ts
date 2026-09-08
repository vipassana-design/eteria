/** Utilidades de color para el laboratorio de paleta (PLAN.md §15).
 *
 *  Se resuelve a mano y no con una librería: son 60 líneas, no suma
 *  una dependencia al bundle de producción, y el cálculo de contraste
 *  tiene que ser exactamente el de la WCAG para que el número que
 *  muestra el panel sea el mismo que se audita.
 */

export interface Rgb {
  r: number
  g: number
  b: number
}

export interface Hsl {
  h: number
  s: number
  l: number
}

/** Acepta `#rgb`, `#rrggbb` y `rgba(...)`. Devuelve null si no parsea. */
export function aRgb(color: string): Rgb | null {
  const c = color.trim()

  if (c.startsWith('#')) {
    const hex = c.slice(1)
    if (hex.length === 3) {
      const [r, g, b] = [...hex].map((d) => parseInt(d + d, 16))
      return r === undefined || g === undefined || b === undefined ? null : { r, g, b }
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      return Number.isNaN(r + g + b) ? null : { r, g, b }
    }
    return null
  }

  const m = c.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i)
  if (!m) return null
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) }
}

export function aHex({ r, g, b }: Rgb): string {
  const dos = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0')
  return `#${dos(r)}${dos(g)}${dos(b)}`
}

export function rgbAHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  const l = (max + min) / 2

  if (d === 0) return { h: 0, s: 0, l: l * 100 }

  const s = d / (1 - Math.abs(2 * l - 1))
  let h: number
  if (max === rn) h = ((gn - bn) / d) % 6
  else if (max === gn) h = (bn - rn) / d + 2
  else h = (rn - gn) / d + 4

  return { h: ((h * 60) % 360 + 360) % 360, s: s * 100, l: l * 100 }
}

export function hslARgb({ h, s, l }: Hsl): Rgb {
  const sn = s / 100
  const ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const hp = (((h % 360) + 360) % 360) / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))

  const [r1, g1, b1]: [number, number, number] =
    hp < 1 ? [c, x, 0]
    : hp < 2 ? [x, c, 0]
    : hp < 3 ? [0, c, x]
    : hp < 4 ? [0, x, c]
    : hp < 5 ? [x, 0, c]
    : [c, 0, x]

  const m = ln - c / 2
  return { r: (r1 + m) * 255, g: (g1 + m) * 255, b: (b1 + m) * 255 }
}

/** Luminancia relativa de la WCAG 2.1. */
export function luminancia({ r, g, b }: Rgb): number {
  const canal = (v: number) => {
    const n = v / 255
    return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)
}

/** Ratio de contraste WCAG entre dos colores. 1 = idénticos, 21 = máximo. */
export function contraste(a: Rgb, b: Rgb): number {
  const la = luminancia(a)
  const lb = luminancia(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** Compone un color con alfa sobre un fondo opaco.
 *
 *  Hace falta para medir contraste de verdad: `--color-surface` es
 *  translúcido, así que el contraste real del texto encima depende de
 *  lo que haya debajo, no del color declarado. */
export function componer(frente: Rgb, alfa: number, fondo: Rgb): Rgb {
  return {
    r: frente.r * alfa + fondo.r * (1 - alfa),
    g: frente.g * alfa + fondo.g * (1 - alfa),
    b: frente.b * alfa + fondo.b * (1 - alfa),
  }
}

/** Alfa de un color en formato `#rrggbbaa` o `rgba(...)`. 1 si es opaco. */
export function alfaDe(color: string): number {
  const c = color.trim()
  if (c.startsWith('#') && c.length === 9) return parseInt(c.slice(7, 9), 16) / 255
  const m = c.match(/rgba\(\s*[\d.]+[\s,]+[\d.]+[\s,]+[\d.]+[\s,/]+([\d.]+)\s*\)/i)
  return m?.[1] ? Number(m[1]) : 1
}

/** Mueve un color en el espacio HSL, en deltas relativos. */
export function ajustar(color: string, d: Partial<Hsl>): string {
  const rgb = aRgb(color)
  if (!rgb) return color
  const hsl = rgbAHsl(rgb)
  return aHex(
    hslARgb({
      h: hsl.h + (d.h ?? 0),
      s: Math.max(0, Math.min(100, hsl.s + (d.s ?? 0))),
      l: Math.max(0, Math.min(100, hsl.l + (d.l ?? 0))),
    }),
  )
}

/** Nivel WCAG que alcanza un ratio, para el tamaño de texto dado.
 *
 *  `grande` es 24px+ o 19px+ en bold, que la norma permite a 3:1. */
export function nivelWcag(ratio: number, grande = false): 'AAA' | 'AA' | 'falla' {
  if (grande) return ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : 'falla'
  return ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'falla'
}
