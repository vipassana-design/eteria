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

```
viewBox="0 0 720 460"     // 16:10, la caja de la ventana del sitio
```

Todo el contenido tiene que terminar **antes de y=460**. Verificalo
midiendo el `y` más alto que usás:

```bash
grep -oE "y=\{[0-9]+\}" components/home/MiMockup.tsx | grep -oE "[0-9]+" | sort -n | tail -1
```

Si el máximo pasa de ~440 el contenido queda apretado contra el borde.

**Márgenes internos.** El contenido arranca en x=32-40 y termina en
x=680-688. Menos que eso se ve pegado al marco.

## Los marcadores que espera el timeline

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

La caja del contenedor tiene que ser **16:10 exacto**, y el SVG llenarla
sin padding:

```jsx
<div className="aspect-16/10">
  <MiMockup />
</div>
```

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
- **Un badge sobre una zona clara de la foto** → el texto blanco
  desaparece. Poné el badge donde la foto es oscura, o dale fondo.
- **`preserveAspectRatio="slice"` con contenedor de otra proporción** →
  recorta los costados. Usá `meet` o alineá la caja.
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

**Igual la verificación por DOM es más confiable que la captura** para
lo que importa acá —geometría, cantidad de marcadores, si el SVG llena
su celda, si algo sale del viewBox. Usá la captura solo para juzgar el
diseño, y si sale negra no insistas: medí por DOM y dejá que el cliente
lo mire en el navegador.
