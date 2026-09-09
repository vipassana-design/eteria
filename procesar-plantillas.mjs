// Procesa las fotos de las plantillas de muestra a los slots de cada
// una. Al doble del tamaño en pantalla, no más.
//
// Descartadas del set bajado: unas flores, vías de tren, una casita de
// juguete y un plato de comida. Los IDs de Pexels no corresponden a lo
// que uno espera, así que hay que mirar cada una (skill de mockups).
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const ORIGEN = process.env.TEMP + '/fotos-plantillas'

const SETS = {
  clinica: [
    { de: 'f4173251.jpg', a: 'hero.webp', w: 1500, h: 1000, pos: 'attention', q: 74 },
    { de: 'f4266931.jpg', a: 'espera.webp', w: 900, h: 700, pos: 'attention', q: 74 },
    { de: 'f8532616.jpg', a: 'lab.webp', w: 760, h: 560, pos: 'attention', q: 74 },
    { de: 'f3184292.jpg', a: 'equipo.webp', w: 760, h: 560, pos: 'attention', q: 74 },
  ],
  terrazas: [
    { de: 'f106399.jpg', a: 'hero.webp', w: 1500, h: 1000, pos: 'attention', q: 74 },
    { de: 'f1571460.jpg', a: 'prop-1.webp', w: 800, h: 600, pos: 'attention', q: 74 },
    { de: 'f271816.jpg', a: 'prop-2.webp', w: 800, h: 600, pos: 'attention', q: 74 },
    { de: 'f4266931.jpg', a: 'prop-3.webp', w: 800, h: 600, pos: 'centre', q: 74 },
  ],
  marquez: [
    { de: 'f3771089.jpg', a: 'hero.webp', w: 1200, h: 1400, pos: 'attention', q: 74 },
    { de: 'f5439381.jpg', a: 'socio-1.webp', w: 420, h: 520, pos: 'attention', q: 76 },
    { de: 'f1181605.jpg', a: 'socio-2.webp', w: 420, h: 520, pos: 'attention', q: 76 },
    { de: 'f5668858.jpg', a: 'socio-3.webp', w: 420, h: 520, pos: 'attention', q: 76 },
    { de: 'f3184291.jpg', a: 'socio-4.webp', w: 420, h: 520, pos: 'attention', q: 76 },
  ],
  vertice: [
    { de: 'f5077047.jpg', a: 'hero.webp', w: 1200, h: 800, pos: 'attention', q: 74 },
  ],
  feria: [
    { de: 'f8532616.jpg', a: 'hero.webp', w: 1200, h: 800, pos: 'centre', q: 72 },
  ],
}

let total = 0
for (const [slug, slots] of Object.entries(SETS)) {
  const destino = 'public/plantillas/' + slug
  mkdirSync(destino, { recursive: true })
  let sub = 0
  for (const s of slots) {
    const info = await sharp(ORIGEN + '/' + s.de)
      .resize(s.w, s.h, { fit: 'cover', position: s.pos })
      .webp({ quality: s.q ?? 76, effort: 6 })
      .toFile(destino + '/' + s.a)
    sub += info.size
  }
  total += sub
  console.log('  ' + slug.padEnd(10) + String(slots.length).padStart(2) + ' fotos  ' + (sub / 1024).toFixed(1).padStart(7) + ' KB')
}
console.log('  ' + '-'.repeat(36))
console.log('  ' + 'TOTAL'.padEnd(13) + (total / 1024).toFixed(1).padStart(9) + ' KB')
