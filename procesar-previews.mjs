// Reduce las capturas de las plantillas al preview del carrusel.
//
// La celda es aspect-16/10 con 576px de ancho en desktop, y next/image
// las sirve a ese tamaño. Se guardan a 1440x900 —el doble— que es el
// criterio del skill: al doble del tamaño en pantalla, no más.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const slug = process.argv[2]
if (!slug) throw new Error('uso: node procesar-previews.mjs <slug>')

const DESTINO = 'public/plantillas/' + slug
mkdirSync(DESTINO, { recursive: true })

const info = await sharp(process.env.TEMP + '/preview-' + slug + '.png')
  .resize(1440, 900, { fit: 'cover', position: 'top' })
  .webp({ quality: 80, effort: 6 })
  .toFile(DESTINO + '/preview.webp')

console.log('  ' + slug + '/preview.webp  1440×900  ' + (info.size / 1024).toFixed(1) + ' KB')
