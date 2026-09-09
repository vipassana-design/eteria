---
name: mockups-animados
description: Construir mockups SVG animados de interfaces (tiendas, paneles, sitios) que se arman por partes con GSAP. Usar cuando haya que crear o modificar un mockup del sitio — los del hero, los de las cards de servicios, los del carrusel de Soluciones o los de las landings. Incluye la geometría, los marcadores que espera el timeline, cómo integrar fotos reales, y la lista de errores que ya se cometieron.
---

# Mockups animados

Mockups de interfaces en SVG inline que se arman por partes con GSAP.
Se ven como capturas de sitios reales, no como wireframes.

## Antes de empezar

Leé el mockup existente más parecido al que vas a hacer. Los que hay:

| Archivo | Qué muestra |
|---|---|
| `components/home/TiendaListado.tsx` | listado de categoría con filtros |
| `components/home/PanelDashboard.tsx` | tablero de resumen |
| `components/home/CorporativoHome.tsx` | home institucional |
| `components/landing/PantallasLanding.tsx` | tres pantallas de 6 partes |

**Cada mockup nuevo tiene que mostrar una pantalla distinta de las que
ya existen.** Nueve mockups del mismo flujo se leen como repetición. Si
el hero muestra el listado de una tienda, la card de servicios muestra
otra cosa: una ficha, un checkout, un panel de pedidos.

## La geometría

Hay **dos lienzos**, y elegir el que no corresponde deja franjas del
color de fondo arriba y abajo. `LienzoMockup.tsx` los exporta:

```jsx
import { ALTOS, Lienzo } from './LienzoMockup'

<Lienzo alto={ALTOS.ventana}>   // 720×460 — la ventana del hero, 16:10
<Lienzo alto={ALTOS.celda}>     // 720×538 — las cards de servicios
```

**El alto del lienzo se calcula desde la celda que lo contiene, no se
elige.** Medí la celda real en el navegador y sacá la proporción:

```js
var c = document.querySelector('#servicios a').getBoundingClientRect()
console.log(c.width, c.height, c.width / c.height, '→ alto =', Math.round(720 * c.height / c.width))
```

La celda de servicios da 575×430 = 1.337; con el lienzo de 460 la
proporción era 1.565, más ancha, así que al ajustar el ancho sobraba
alto. De ahí el 538.

Todo el contenido tiene que terminar **antes del alto elegido**.
Verificalo midiendo el `y` más alto que usás:

```bash
grep -oE "y=\{[0-9]+\}" components/home/MiMockup.tsx | grep -oE "[0-9]+" | sort -n | tail -1
```

Si el máximo pasa de unos 20px antes del alto, el contenido queda
apretado contra el borde. Y si queda **más de 40px corto**, el problema
es el opuesto y también se ve: el kanban tenía las columnas terminando
a 100px del pie y leía como media pantalla vacía.

**El grep de arriba solo ve los `y` literales.** Lo calculado
(`y={132 + ti * 89}`) hay que medirlo por DOM:

```js
var maxY = 0
for (const el of sv.querySelectorAll('rect,text,image,circle,line,path')) {
  try { var b = el.getBBox() } catch (e) { continue }
  maxY = Math.max(maxY, b.y + b.height)
}
console.log('maxY', Math.round(maxY))   // tiene que dar cerca del alto
```

**Márgenes internos.** El contenido arranca en x=32-40 y termina en
x=680-688. Menos que eso se ve pegado al marco.

## Los marcadores que espera el timeline

**El mockup no anima solo.** Es contenido estático; lo mueve el
envoltorio que lo monta:

| Dónde | Quién anima |
|---|---|
| ventana del hero | el ciclo de `Hero.tsx` (avanza entre etapas) |
| cards de servicios | `CicloPantalla` (rearma la misma pantalla en loop) |
| landings | el ciclo de `LandingHero.tsx` |

Montado sin envoltorio se ve completo y quieto, que es un estado
válido: es lo que corresponde con `prefers-reduced-motion`.

`CicloPantalla` sirve para cualquier mockup nuevo que vaya en una
sección de la página:

```jsx
<CicloPantalla>
  <MiMockup />
</CicloPantalla>
```

Arranca al entrar en viewport y se suspende al salir. **No uses `once`
para esto:** volver a la sección tiene que volver a mostrar el armado,
que es lo único que el efecto tiene para ofrecer.

El componente que lo monta anima estos atributos. Sin ellos el mockup
aparece de golpe.

| Atributo | Dónde va | Qué hace |
|---|---|---|
| `data-parte` | un `<g>` por bloque | entra con fade + `y` |
| `data-item` | elementos dentro de una parte | stagger, **solo si hay más de uno** |
| `data-trazo` | un `<path>` de línea | se dibuja con `strokeDashoffset` |

**El error más común: pocos `data-item`.** Una parte con elementos
sueltos entra de golpe. Los tres mockups del hero tenían 4, 4 y 3 y
hubo que llevarlos a 11, 10 y 10 agrupando lo que se puebla junto —
los ítems de una barra de navegación, un buscador con su ícono y su
placeholder, la leyenda de un gráfico.

Contá antes de dar por terminado:

```bash
for f in MiMockup Otro; do
  printf "  %-18s parte:%-2s item:%s\n" "$f" \
    "$(grep -c 'data-parte=' components/home/$f.tsx)" \
    "$(grep -c 'data-item' components/home/$f.tsx)"
done
```

Apuntá a 5-6 partes y 10+ items.

## Qué hace que se vea real

Lo que delata un mockup no es la técnica, es la falta de contenido.

**Fotos reales** donde iría una foto. Sin ellas el techo es "wireframe
prolijo". Ver la sección de fotos más abajo.

**Datos plausibles** donde no van fotos. Un panel de gestión no tiene
fotos de escena: lo que lo hace real son importes con decimales,
nombres de personas, tiempos relativos ("hace 4 min"), estados
concretos ("Esperando stock"). Nunca `Lorem` ni `$0,00`.

**Sombras de dos capas.** Una card sin sombra es un rectángulo; con
sombra es una superficie:

```jsx
<filter id="sombraCard" x="-20%" y="-20%" width="140%" height="140%">
  <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#1B1733" floodOpacity="0.06" />
  <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#1B1733" floodOpacity="0.07" />
</filter>
```

**Estados, no solo elementos.** Un filtro aplicado con su chip, un
favorito marcado, un badge de descuento, un ítem de navegación
subrayado, una fila con acción pendiente. Los controles vacíos se ven
como plantilla; los controles *en uso* se ven como captura.

**Densidad realista.** "61 productos" y un paginado que llega a 9 dice
que hay catálogo. Cuatro productos sueltos, no.

**Jerarquía tipográfica.** Rango de 7,5px a 25px en la misma pantalla.
Los tamaños del medio (10-13px) son la mayoría; los extremos son el
titular y los metadatos.

## Las fotos

Van como `<image>` **dentro** del SVG, no como `<img>` aparte: así
siguen formando parte del grupo `data-parte` que anima el timeline.

```jsx
<Foto id="prodListado0" href="/mockups/tienda-prod-1.webp" x={218} y={102} w={96} h={124} rx={6} />
```

`components/home/LienzoMockup.tsx` tiene el helper. Dos cosas que
importan:

- `preserveAspectRatio="xMidYMid slice"` es el `object-fit: cover` de
  SVG: llena el slot sin deformar.
- **Cada slot necesita su propio `clipPath` con id único.** Compartir
  uno recorta todas las fotos con la misma caja.

### Conseguir y procesar las fotos

Pexels sirve (licencia libre, uso comercial sin atribución) y se puede
bajar sin API:

```bash
curl -s -o foto.jpg "https://images.pexels.com/photos/ID/pexels-photo-ID.jpeg?auto=compress&cs=tinysrgb&w=600"
```

**Los IDs de Pexels no son buscables desde acá y muchos no corresponden
a lo que uno espera.** Bajá varios candidatos y **mirá cada uno con
Read antes de usarlo**. Ya pasó de bajar una "planta industrial" que
eran trajes y una "turbina" que era un drone.

**Descartá cualquier foto con marca visible.** Unas zapatillas con
logo reconocible se descartaron: poner una marca real en la tienda
ficticia de un mockup es engañoso además de uso de marca ajena.

Procesar con `sharp`, que ya está en `node_modules` (lo trae Next):

```js
const sharp = require('sharp')
await sharp('origen.jpg')
  .resize(240, 300, { fit: 'cover', position: 'attention' })
  .webp({ quality: 78, effort: 6 })
  .toFile('public/mockups/destino.webp')
```

- Recortá al **doble del tamaño en pantalla**, no más.
- `position: 'attention'` para fotos con sujeto (caras, productos);
  `'center'` para texturas.
- WebP a 78 de calidad. Once fotos así suman ~160 KB.
- Verificá los recortes armando un contacto y mirándolo: es donde se
  ven las caras cortadas.

## El montaje

La caja del contenedor y el lienzo tienen que tener **la misma
proporción**, y el SVG llenarla sin padding. En el hero la caja es
16:10 y se declara así:

```jsx
<div className="aspect-16/10">
  <MiMockup />
</div>
```

En las cards de servicios la celda no tiene proporción declarada: la
define la grilla, y el mockup se estira a lo que le toque. Ahí el
lienzo se calcula desde la celda medida (`ALTOS.celda`) y el SVG va a
`size-full` sobre un contenedor sin aspecto fijo.

**No pongas `p-*` en el contenedor del mockup.** Un padding deja el
mockup flotando con márgenes en lugar de ocupar el espacio, y el
recorte de la ventana pierde el efecto de captura.

Si el contenedor no es 16:10, `preserveAspectRatio="xMidYMid meet"`
deja franjas y `slice` recorta. Alinealos.

## Errores ya cometidos

No los repitas:

- **Pocos `data-item`** → el mockup aparece de golpe (ver arriba).
- **Contenido que pasa y=460** → el panel y el institucional llegaban a
  445 y 455 y quedaban apretados contra el borde.
- **Textos que se pisan** → medí `x + ancho` del texto contra el `x` del
  siguiente. Un toast decía "Sweater trenzado · M**$74.900**".
- **Elementos de tamaño 0** → quedan de una idea descartada. Buscá
  `r={0}` y `height={0}`.
- **Degradé sobre una línea perfectamente horizontal o vertical** → no
  se pinta, y el DOM no lo delata: el elemento está con `opacity: 1`.
  Un `linearGradient`/`radialGradient` sin `gradientUnits` usa
  `objectBoundingBox`, y una línea recta tiene caja de ancho o alto 0,
  contra la que el degradé no se puede resolver. Pasó con dos radios
  del diagrama de capacidades. La solución es
  `gradientUnits="userSpaceOnUse"` con las coordenadas explícitas.
  Para detectarlo:

  ```js
  for (const el of sv.querySelectorAll('[stroke^="url("], [fill^="url("]')) {
    const b = el.getBBox()
    if (b.width < 0.01 || b.height < 0.01) console.log('CAJA 0:', el.tagName)
  }
  ```
- **Un badge sobre una zona clara de la foto** → el texto blanco
  desaparece. Poné el badge donde la foto es oscura, o dale fondo.
- **`preserveAspectRatio="slice"` con contenedor de otra proporción** →
  recorta los costados. Usá `meet` o alineá la caja.
- **Lienzo de otra proporción que la celda** → franjas del color de
  fondo arriba y abajo. No se arregla con `preserveAspectRatio`: hay
  que darle al lienzo el alto que la celda pide (ver *La geometría*).
- **Contenido que no llega al pie** → al pasar a un lienzo más alto no
  alcanza con mover los bloques hacia abajo: hay que **sumar
  contenido**. Al kanban le entraron dos tarjetas más por columna, al
  estudio un bloque de equipo, a la ficha una tabla de
  especificaciones. Un mockup con la mitad de abajo vacía se ve peor
  que uno chico.
- **Paso entre ítems repetidos sin recalcular** → el kanban seguía con
  `ti * 82` en un lienzo 78px más alto, así que las columnas crecían
  pero las tarjetas quedaban arriba. Si el bloque es un `.map()` con
  paso fijo, el paso también sube.
- **Colores del sitio en el mockup** → los mockups representan **sitios
  de clientes** y tienen paleta propia. No los ates a
  `--color-violet-500` ni a ningún token del tema: si el sitio cambia
  de acento, los mockups no deben cambiar.

## Verificar antes de terminar

```js
// Que nada salga del viewBox
const sv = [...document.querySelectorAll('svg')]
  .find((s) => s.getAttribute('viewBox') === '0 0 720 460')
for (const el of sv.querySelectorAll('rect,text,image,circle,line')) {
  const b = el.getBBox()
  if (b.x < -1 || b.y < -1 || b.x + b.width > 721 || b.y + b.height > 461) {
    console.log('FUERA:', el.tagName, el.textContent?.trim().slice(0, 20))
  }
}
```

Y en el navegador: que las fotos devuelvan 200, que la caja no cambie
de tamaño entre etapas del ciclo, y que las partes se armen de a poco
—muestreando `[data-parte]` visibles cada 1,5s— en lugar de aparecer
todas juntas.

**El timing no se juzga en capturas.** Terminá el mockup y avisá; el
cliente lo evalúa corriendo.

## Cuando encuentres algo nuevo

Este skill se actualiza. Si aparece un bug o una técnica que no está
acá, agregala a la sección que corresponda antes de cerrar la tarea.

## Capturar un mockup ya montado

Las secciones del sitio usan `Reveal` y ScrollTrigger, así que un
`Page.captureScreenshot` sobre una sección recién scrolleada sale
**negro**: los elementos están en `opacity: 0` esperando su trigger.

Ha pasado cuatro veces. Antes de capturar:

1. Scrollear **gradualmente** hasta pasar la sección (`for` con pasos
   de 250-300px y una pausa de 200ms), no de un salto.
2. Volver a la sección con `scrollIntoView`.
3. Esperar 2,5s largos.
4. Verificar la opacidad antes de disparar la captura:

```js
Number(getComputedStyle(document.querySelector('#servicios article')).opacity)
```

Si sigue en 0, el trigger no se disparó y la captura no sirve.

**Ya falló cinco veces, y las dos últimas ni forzando el estado.**
Escribirle `opacity: 1 !important` a todo lo que estuviera en 0 no
alcanzó: con Lenis el scroll de la página y el `y` que devuelve
`getBoundingClientRect` no coinciden, así que el `clip` de
`captureScreenshot` recorta una zona que no es la que se ve.

**No insistas: medí por DOM.** Es más confiable que la captura para
todo lo que importa acá y no depende del estado de la animación:

| Qué verificar | Cómo |
|---|---|
| franjas de fondo | `celda.height - svg.height` tiene que dar 0 |
| contenido al pie | `maxY` de todos los `getBBox()` cerca del alto |
| nada desbordado | `getBBox()` contra el `viewBox` |
| marcadores | `querySelectorAll('[data-parte]').length` |
| textos pisados | intersección de las cajas de los `<text>` |
| trazos sobre texto | muestrear `getPointAtLength` contra cada caja |

El último es el que encontró el bug del diagrama en mobile, que a ojo
se veía en la captura del cliente pero no se podía localizar: muestreando
cada trazo cada 2 unidades de largo salió que las seis líneas entraban
por el lado interno de su etiqueta, y con la coordenada exacta del
punto de contacto quedó claro que el nodo estaba del lado equivocado.

El diseño lo evalúa el cliente en el navegador.
