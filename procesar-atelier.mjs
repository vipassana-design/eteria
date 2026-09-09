// Procesa las fotos de la plantilla Atelier a los tamaños de cada slot.
//
// Se recortan al DOBLE del tamaño en pantalla, no más: es el criterio
// del skill de mockups y lo que mantiene el peso bajo. `attention`
// para las que tienen sujeto —una persona, una prenda—, `centre` para
// las texturas.
//
// Descartadas del set bajado: una de hamburguesas y un paisaje marino
// (los IDs de Pexels no corresponden a lo que uno espera), y una
// campera con texto de marca legible en la espalda: poner una marca
// real en una tienda ficticia es engañoso además de uso de marca ajena.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const ORIGEN = process.env.TEMP + '/fotos-atelier'
// Los candidatos de la segunda tanda quedaron en una subcarpeta.
const ORIGEN2 = ORIGEN + '/nuevos'
const DESTINO = 'public/plantillas/atelier'
mkdirSync(DESTINO, { recursive: true })

const SLOTS = [
  // El hero es full-bleed: se sirve a ~1400px de ancho.
  { de: 'n5119206.jpg', a: 'hero.webp', w: 1600, h: 1000, pos: 'attention', q: 76 },

  // Las tres categorías: cards verticales de ~380px de ancho.
  { de: 'p6311392.jpg', a: 'cat-1.webp', w: 760, h: 950, pos: 'attention', q: 72 },
  { de: 'p7679720.jpg', a: 'cat-2.webp', w: 760, h: 950, pos: 'attention', q: 72 },
  { de: 'n8386654.jpg', a: 'cat-3.webp', w: 760, h: 950, pos: 'attention', q: 72 },

  // Los cuatro productos de la grilla: ~300px en pantalla.
  { de: 'p9558579.jpg', a: 'prod-1.webp', w: 600, h: 800, pos: 'attention' },
  { de: 'p6764040.jpg', a: 'prod-2.webp', w: 600, h: 800, pos: 'attention' },
  { de: 'q5480696.jpg', a: 'prod-3.webp', w: 600, h: 800, pos: 'attention' },
  { de: 'q6311475.jpg', a: 'prod-4.webp', w: 600, h: 800, pos: 'attention' },

  // El bloque editorial: media pantalla.
  { de: 'p1755428.jpg', a: 'editorial.webp', w: 1100, h: 1300, pos: 'attention', q: 76 },
]

let total = 0
for (const s of SLOTS) {
  const info = await sharp((s.de.startsWith('q') ? ORIGEN2 : ORIGEN) + '/' + s.de)
    .resize(s.w, s.h, { fit: 'cover', position: s.pos })
    .webp({ quality: s.q ?? 78, effort: 6 })
    .toFile(DESTINO + '/' + s.a)
  total += info.size
  console.log(
    '  ' + s.a.padEnd(16) + (s.w + '×' + s.h).padEnd(11) +
      (info.size / 1024).toFixed(1).padStart(7) + ' KB',
  )
}
console.log('  ' + '-'.repeat(42))
console.log('  ' + 'TOTAL'.padEnd(16) + String(SLOTS.length).padEnd(11) + (total / 1024).toFixed(1).padStart(7) + ' KB')
