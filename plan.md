# Eteria — Plan de construcción del sitio

> Documento de trabajo para construir el sitio con Claude en VS Code.
> Marca provisional: **Eteria** (reemplazo global cuando se defina el nombre final).
>
> **Este documento es vivo.** Cuando cambie una decisión de diseño, contenido, estructura o alcance, se actualiza acá antes de seguir programando. Un plan desactualizado es peor que no tener plan: las decisiones que solo viven en la conversación se pierden en la sesión siguiente. Las reglas de trabajo y las convenciones de código van en `CLAUDE.md`.

---

## 1. Definiciones cerradas

| Ítem | Decisión |
|---|---|
| Qué es | Sitio de agencia de desarrollo a medida. Carta de presentación + captación por ads. |
| Servicios | Ecommerce · Sitios institucionales · Software a medida |
| Posicionamiento | Agencia. Voz en "nosotros". Sin foto, sin nombre propio, sin perfil personal. |
| Tono | Profesional y claro. Sin lenguaje corporativo frío, sin marketing inflado. |
| Idioma | Español neutro (sin voseo) |
| Stack | Next.js (App Router) + TypeScript + React + GSAP + Tailwind |
| Tema | Dark constante |
| Tipografía | Clash Display (títulos) + Satoshi (cuerpo) — Fontshare, variable |
| Acento | Violeta → azul, con degradés en títulos y botones |
| Estructura | One-page + 3 landings internas con misma línea gráfica |
| Conversión | Formulario (home + cada landing) · Email en footer · WhatsApp flotante |
| Portfolio | No hay. Carrusel de 6 mockups presentados como capacidades. |
| CMS | No. Todo hardcodeado en archivos de contenido. |
| Precios | No se muestran. |
| Preloader | No. |
| Cursor custom | No. |
| Prueba social | +20 años de experiencia. Sin conteo de proyectos. |

### Criterio de copy

Definido por el cliente en la revisión de la Fase 6. Aplica a todo el texto del sitio, incluidas las landings.

**La prueba:** si un título se puede reemplazar por el nombre llano de lo que describe sin perder información, entonces no estaba informando, estaba adornando.

- Los títulos nombran, los párrafos explican. El peso informativo va en el cuerpo, no en el titular.
- Nada de estructuras del tipo "X, no Y" ni negaciones que suenan a chicana.
- Nada de adjetivos de venta: potente, definitivo, real, verdadero, sin atajos.
- Nada que no sea verificable. "Sin atajos" no significa nada comprobable; "el entregable es el documento de alcance" sí.
- Si una frase podría estar en el sitio de cualquier agencia, no sirve.
- Se puede usar la etiqueta del servicio como título si es lo más claro.

### Pendientes del cliente

- Nombre definitivo de la marca y dominio
- Hosting y método de envío del formulario
- Imágenes reales de los mockups (se trabaja con placeholders)
- Referencias visuales propias

---

## 2. Design system

### 2.1 Color

Fondo con croma real, no negro neutro. Un negro puro con un solo acento brillante es el patrón más reconocible de plantilla genérica; acá el fondo tiene temperatura propia (índigo) y el acento tiene una rampa completa, no un único tono.

```css
/* Superficies */
--bg-base:      #0C0A18;  /* página */
--bg-surface:   #14112370; /* cards, secciones elevadas */
--bg-elevated:  #1B1733;  /* modal, header con scroll, hover de cards */

/* Acento — rampa completa, no un tono suelto */
--violet-300:   #C4B5FD;
--violet-500:   #8B5CF6;  /* acento principal */
--violet-600:   #7C3AED;
--blue-400:     #60A5FA;
--blue-500:     #3B82F6;  /* acento secundario */

/* Degradé de marca — títulos y botones */
--grad-brand:   linear-gradient(100deg, #C4B5FD 0%, #8B5CF6 45%, #3B82F6 100%);

/* Texto */
--text-hi:      #F4F2FF;  /* títulos */
--text-mid:     #B9B3D6;  /* cuerpo */
--text-low:     #8B85AD;  /* labels, metadatos */

/* Bordes */
--border:       rgba(255,255,255,0.07);
--border-hover: rgba(139,92,246,0.35);

/* Glow */
--glow-violet:  radial-gradient(circle, rgba(139,92,246,0.24) 0%, transparent 70%);
```

**Reglas de uso**

- El color saturado entra por tres vías: los mockups (imagen real a color), los degradés de título, y los botones. Nada más.
- Los degradés de título se usan en el H1 del hero y en el título de cada sección principal. No en subtítulos ni en cuerpo.
- Un solo botón con degradé + glow por pantalla. Los secundarios van con borde y fondo transparente.
- El fondo nunca es plano: lleva el campo de partículas y los glows de sección (ver 2.5).

### 2.2 Tipografía

Ambas de Fontshare, variables, self-hosted en `/public/fonts` con `next/font/local`.

```
Clash Display  → títulos, números del proceso, logo
Satoshi        → cuerpo, botones, labels, navegación
```

**Escala** (base 16px, ratio 1.333 en desktop, comprimida en mobile con `clamp()`)

| Rol | Desktop | Mobile | Peso | Tracking |
|---|---|---|---|---|
| Hero H1 | 64px | 40–48px | 600 | -0.03em |
| H2 sección | 52px | 32px | 600 | -0.02em |
| H3 card | 28px | 22px | 500 | -0.01em |
| Cuerpo grande | 20px | 18px | 400 | 0 |
| Cuerpo | 17px | 16px | 400 | 0 |
| Label | 14px | 13px | 500 | 0 |

- Line-height: 1.05 en títulos grandes, 1.65 en cuerpo.
- **El H1 del hero se mide contra su columna, no contra el viewport.** Bajó de 76 a 64px porque a ese tamaño las palabras más largas de los títulos rotantes no entraban y el overflow de la máscara las cortaba: "para empresas" medía 546px en una columna de 491. Además usa las utilidades `titulo-hero` / `titulo-hero-texto`, que atan el tamaño al ancho de la columna con `cqw`: el clamp del viewport no alcanzaba, porque entre 1024 y 1280px la columna queda angosta mientras el viewport todavía pide 64px, y ahí desbordaban tres de las cuatro páginas. Verificado con holgura de 23px en el peor caso a 1440, 1280, 1024 y 390.
- Ancho máximo de párrafo: 68 caracteres.
- Sentence case en todo. Nada de labels en mayúsculas — es uno de los tells de plantilla.

### 2.3 Espaciado y layout

```
Contenedor:      1280px máx, padding lateral 24px (mobile) / 64px (desktop)
Grilla:          12 columnas, gap 24px
Ritmo vertical:  secciones a 120px (desktop) / 72px (mobile) de padding vertical
Radio:           16px cards · 12px botones e inputs · 999px pills
```

Alineación: todo a la izquierda. El hero, los títulos de sección y las cards arrancan en el mismo eje. El centrado se reserva para el modal y el footer. Esto le da estructura y evita la sensación de landing genérica centrada.

### 2.4 Motion — tokens

```js
export const ease = {
  out:   'power3.out',
  inOut: 'power2.inOut',
  snap:  'expo.out',
}

export const dur = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
}
```

**Principio rector:** una sola cosa se mueve por vez y cada movimiento responde a algo. El reveal de fade+slide en absolutamente todas las secciones es el default genérico — acá el hero tiene su secuencia orquestada, y el resto de las secciones usan reveals más contenidos y variados (stagger horizontal en el proceso, escala en las cards, máscara en los títulos).

- `prefers-reduced-motion` respetado en todo: los reveals pasan a opacidad simple, el rolling text se congela en la primera palabra, las partículas se apagan.
- Todo GSAP dentro de `useGSAP()` de `@gsap/react` con scope, para cleanup automático.

**Variantes de `Reveal`** (definidas en la Fase 2). El componente no tiene una sola animación: cada sección elige la que le corresponde, que es lo que evita el default genérico.

| Variante | Movimiento | Dónde |
|---|---|---|
| `subir` | Fade + 24px desde abajo | El default contenido, para bloques de texto |
| `escala` | Escala 0.96 → 1 con fade | Cards |
| `mascara` | El contenido se descubre desde abajo | Títulos de sección |
| `lateral` | Fade + desplazamiento horizontal | Filas con stagger, como el proceso |

Con la prop `stagger` la animación pasa a los hijos directos en vez del bloque entero. Todas usan `ScrollTrigger` con `once: true` y arrancan al 85% del viewport.

### 2.5 Fondo vivo

Tres capas, todas sutiles, ninguna protagonista:

1. **Campo de partículas** — canvas fijo, ~60 puntos con deriva lenta. Se apaga en mobile y con reduced-motion.

   **Ajustado a pedido del cliente:** la opacidad pasó de 8–14% a 16–42% y los puntos toman uno de cuatro tonos al azar (del violeta de marca al blanco puro), para que el campo no se lea como una trama plana. Se sacó el fade-in que los hacía entrar al final de la secuencia del hero: ahora están desde el primer frame.
2. **Glows de sección** — divs con `--glow-violet`, blur alto, posicionados detrás de secciones clave. Se desplazan a distinta velocidad que el scroll (parallax con ScrollTrigger `scrub`).
3. **Grano** — overlay de ruido a 3% de opacidad, PNG tileable de 128px. Evita el banding de los degradés en pantallas grandes y le quita el aspecto plástico al dark.

---

## 3. Arquitectura de archivos

```
/app
  layout.tsx                    fuentes, metadata, providers
  page.tsx                      home
  /ecommerce/page.tsx
  /software-a-medida/page.tsx
  /sitios-institucionales/page.tsx
  /privacidad/page.tsx
  /design-system/page.tsx       revisión visual — queda, con noindex
  /heros/                       5 propuestas de hero — temporal, con noindex
  /fondos/                      4 fondos para el hero — temporal, con noindex
  not-found.tsx
  /api/contacto/route.ts        POST → envío de mail
/components
  /layout
    Header.tsx  MobileMenu.tsx  Footer.tsx  WhatsappFab.tsx
    PageTransition.tsx  SmoothScroll.tsx  Logo.tsx
  /home
    Hero.tsx  QueHacemos.tsx  Servicios.tsx  Proceso.tsx
    Ejemplos.tsx  MockupModal.tsx  Stack.tsx  Contacto.tsx
    VentanaMockup.tsx             marco de navegador de los mockups
    PantallasMockup.tsx           pantallas SVG placeholder del hero
    IlustracionesProceso.tsx      SVG de las 4 etapas
    LogosStack.tsx                logos SVG de las tecnologías
  /landing
    LandingHero.tsx  LandingBeneficios.tsx  LandingLayout.tsx
    LandingProceso.tsx            version compacta del proceso
    PantallasLanding.tsx          pantallas SVG por landing, en partes
  /ui
    Boton.tsx  TituloSeccion.tsx  Campo.tsx  Reveal.tsx
    RollingText.tsx               palabra que rota — home y landings
  /bg
    Particulas.tsx  Glow.tsx  Grano.tsx
/lib
  gsap.ts                       registro de plugins
  enviarConsulta.ts             envío del formulario — HOY SIMULADO, ver §8.4
  validarConsulta.ts            validación compartida cliente/servidor
  motion.ts                     tokens de ease/duración y helpers de media query
  fuentes.ts                    next/font/local de Clash Display y Satoshi
  lenis.ts                      scroll a secciones y bloqueo de scroll
  animaciones.ts                helpers reutilizables
/types
  index.ts                      tipos compartidos de contenido
/content
  mockups.ts  landings.ts
  marca.ts                      nombre, email, WhatsApp, navegación y footer
  hero.ts                       títulos, CTAs y mockups del hero
  contacto.ts                   textos del formulario y tipos de proyecto
  landings.ts                   contenido de las tres landings
  queHacemos.ts                 texto y datos de la sección
  servicios.ts  proceso.ts  stack.ts
  designSystem.ts               contenido de /design-system
  heros.ts                      contenido de las propuestas de hero
  fondos.ts                     contenido de los fondos
/public
  /fonts  /mockups  /og
  grano.png                     ruido tileable de 128px generado, no descargado
```

Los objetos de `/content` se tipan contra las interfaces de `/types/index.ts` (`Servicio`, `EtapaProceso`, `Mockup`, `Tecnologia`, `Landing`). Es el lugar donde TypeScript más aporta en este proyecto: si se agrega un servicio sin algún campo, el error aparece al escribirlo y no al renderizar.

Todo el texto del sitio vive en `/content`. Ningún copy hardcodeado dentro de un componente — así se edita sin tocar JSX.

---

## 4. Home — sección por sección

### 4.1 Header

Fijo. Al scrollear pasa de transparente a `--bg-elevated` con `backdrop-filter: blur(12px)` y borde inferior hairline.

```
[Eteria]        Sobre nosotros  Servicios  Proceso  Ejemplos   [ Contacto ]
```

- Logo tipográfico en Clash Display 600. `Eter` en `--text-hi`, `ia` con el degradé de marca.
- **Servicios abre un dropdown** con las tres landings. El enlace propio sigue llevando a la sección de la home; los hijos van a su página. Un item de `navegacion` abre dropdown por tener `hijos` en `/content/marca.ts`, así que sumar otro submenú no requiere tocar componentes.
  - En desktop abre con hover y con foco de teclado, cierra con `Esc` y cuando el foco sale del item. El cierre por hover tiene 120ms de retardo: sin eso el hueco entre el disparador y el panel alcanza para que el mouse "salga" y el panel se cierre en el camino.
  - En mobile el submenú se despliega con un botón aparte, no al tocar la etiqueta: si el toque abriera el submenú no habría forma de llegar a la sección de la home. Se anima con `grid-template-rows` de `0fr` a `1fr`, que no requiere medir el alto del contenido, y los hijos quedan con `tabIndex -1` mientras está plegado.
- Links con scroll suavizado a la sección (ScrollSmoother o Lenis, ver 8.1).
- Botón "Contacto" con degradé + glow, va a la sección de contacto.
- Scrollbar del navegador finita (8px) con thumb violeta.

### 4.2 Hero — mockups flotantes

**Layout:** dos tercios de texto a la izquierda, mockups a la derecha en perspectiva.

```
┌──────────────────────────────────────────────────────────┐
│                                          ╱▔▔▔▔▔▔╲        │
│  Desarrollo                             │ mockup │╲      │
│  de software                            │  color │ │╲    │
│  a medida                                ╲______╱ │ │    │
│                                            ╲______╱ │    │
│  Ecommerce, plataformas de gestión y         ╲______╱    │
│  sitios institucionales. Cada proyecto                   │
│  se escribe desde cero, sobre el alcance                 │
│  que definimos con el cliente.                           │
│                                                          │
│  [ Cotizar mi proyecto ]  [ Ver ejemplos ]               │
│                                                          │
│  +20 años construyendo software                          │
└──────────────────────────────────────────────────────────┘
```

**Mockups:** 3 ventanas de navegador superpuestas en perspectiva isométrica suave (`rotateY(-14deg) rotateX(6deg)`), con pantallas a color reales, escalonadas en profundidad. Cada una con su glow violeta detrás. Siguen el mouse con desplazamiento amortiguado (máx 12px, `quickTo` de GSAP).

**Secuencia de entrada** (el único momento orquestado del sitio, ~1.4s):

1. Título con SplitText por líneas, máscara desde abajo, stagger 0.08
2. Párrafo y botones, fade + 20px arriba, delay 0.5
3. Mockups entran en cascada desde la derecha con escala 0.94 → 1, stagger 0.12
4. Partículas hacen fade-in al final

**CTA primario:** "Cotizar mi proyecto" → scroll al formulario. Sin promesa de inmediatez.

**Hero definido: la propuesta mixta.** El hero de la Fase 4 (tres ventanas en perspectiva con seguimiento de mouse) se reemplazó por el ciclo de terminal y ventanas: la terminal levanta un proyecto en ~3,3s y después las tres pantallas se arman por partes, una tras otra, antes de volver a la terminal. La terminal comparte el marco y la caja 16:10 de las ventanas, medido en 722x451 constante en las cuatro etapas.

El texto conserva la secuencia de entrada orquestada del sitio y después queda quieto: el movimiento vive en la ventana. El H1 bajó a tamaño H2 para convivir con la ventana, que ahora es más grande.

Las otras propuestas siguen en `/heros` para comparar. Ver §12.

**Resuelto en la Fase 4.**

- **Los mockups son SVG, no imágenes.** `PantallasMockup.tsx` dibuja tres pantallas con UI realista y a color: tienda de indumentaria (grilla de productos con precios y prendas), panel de administración (sidebar, métricas con delta, gráfico de área, tabla de pedidos con estados) y sitio institucional (hero editorial y servicios). Los mockups reales siguen siendo un pendiente del cliente; mientras tanto el hero se puede juzgar con contenido real en vez de cajas grises, y al escalar quedan nítidos sin peso de red. Cuando lleguen las imágenes se reemplaza el contenido de `VentanaMockup`.
- **Los cortes de línea del H1 vienen del contenido**, no del ancho. A 76px de cuerpo "Desarrollamos" mide 560px y con la columna original el título caía en 4 líneas cortas, o dejaba "software" solo en una línea. `hero.titulo` guarda los cortes como arrays y el H1 los renderiza en bloques con `text-wrap: nowrap`.
- **La columna de texto es 1.35fr contra 1fr** de los mockups, para respetar los dos tercios del layout. Los mockups se ensanchan al 132% de su columna y se desbordan hacia la derecha: el corte contra el borde es parte del efecto, y la capa `#capa-sitio` lo recorta sin generar scroll horizontal.
- **Las dos ventanas de atrás llevan `brightness` reducido.** Sin eso competían con la de adelante en vez de leerse como profundidad.
- Escalonado en diagonal a 19% vertical y 14% horizontal: con offsets menores las ventanas se tapaban entre sí y solo se leía la de adelante.

### 4.3 Sobre nosotros

Sin card. Texto grande sobre el fondo, dos columnas asimétricas.

> **Título:** Sobre nosotros
>
> **Cuerpo:**
> Somos un equipo de desarrollo. No revendemos plantillas ni tercerizamos el trabajo: el código lo escribimos nosotros y lo mantenemos después de entregarlo.
>
> Trabajamos con empresas que ya tienen un sistema funcionando y necesitan ampliarlo o reemplazarlo, y con equipos que están armando la primera versión de un producto. En los dos casos empezamos por definir qué tiene que hacer el sistema y con qué se integra.

**A la derecha, tres datos:**

- `+20` años construyendo software
- `+100` proyectos entregados
- `9 de 10` clientes siguen con nosotros

Los números en Clash Display grande con degradé, el label debajo en `--text-low`.

**Reescrito por el cliente.** La sección pasó de "Qué hacemos" a **"Sobre nosotros"**: el título anterior repetía lo que ya dicen el hero y servicios, y el copy arrancaba con "cada proyecto arranca en cero", que no dice nada. Ahora la sección habla del equipo.

De los datos originales se sacaron dos: "24h tiempo de respuesta" (ya está en la sección de contacto) y "Ecommerce · Plataformas · Sitios", que no era un número y desbalanceaba el bloque. El flag `esTexto` de `DatoHero` queda disponible pero sin uso.

> **Pendiente de confirmar:** `+100 proyectos` y `9 de 10 clientes siguen con nosotros` son valores propuestos, no datos verificados. El tercero apunta a la continuidad con el cliente, que es lo que distingue a un equipo chico de una agencia grande. Hay que confirmarlos o cambiarlos antes de publicar.

### 4.4 Servicios — cards apiladas

Tres cards que se apilan al scrollear: cada una queda pineada y la siguiente sube por encima, con la anterior escalando levemente hacia atrás y perdiendo opacidad. Es el efecto que viste en Wavespace.

Cada card: mitad texto, mitad mockup a color.

**Card 1 — Ecommerce**
> Tiendas online con catálogo, checkout y administración.
>
> Catálogo, carrito, checkout, pagos, envíos y panel de administración. Integramos las pasarelas de pago y los operadores logísticos que la empresa ya usa, y la arquitectura contempla el crecimiento en catálogo y en tráfico.
>
> `Ver más sobre ecommerce →` (a `/ecommerce`)

**Card 2 — Sitios institucionales**
> El sitio de la empresa y su contenido.
>
> Sitios rápidos e indexables, con la estructura de contenido y las URLs pensadas para búsqueda. Se entregan con un panel para que el equipo actualice textos, secciones e imágenes.
>
> `Ver más sobre sitios institucionales →`

**Card 3 — Software a medida**
> Sistemas internos, plataformas e integraciones.
>
> Paneles de gestión, plataformas con usuarios y permisos, automatización de tareas repetitivas e integraciones con los sistemas que la empresa ya tiene: facturación, stock, CRM o lo que corresponda.
>
> `Ver más sobre software a medida →`

**Implementación:** `position: sticky` en las cards + ScrollTrigger para la escala/opacidad de las de atrás. En mobile se desactiva el pin y quedan tres cards apiladas normalmente.

**Resuelto en la Fase 5.** Sticky nativo funciona con Lenis: se verificó que las cards se pinean y se apilan con el scroll suavizado activo, así que no hizo falta caer al `pin: true` de ScrollTrigger que anticipaba §11. La clave es que `#capa-sitio` usa `overflow-x: clip` y no `hidden`, que sí rompería el sticky.

Dos ajustes que no estaban previstos:

- **El apagado de las cards de atrás va con un velo encima, no con `opacity` sobre la card.** Bajar la opacidad la vuelve translúcida entera y se lee el texto de la card de atrás a través de la de adelante. El velo es un div con `bg-base` que ScrollTrigger lleva de 0 a 0.62.
- El `top` de sticky crece 1.25rem por card, así queda visible el borde superior de las de atrás, y el gap entre cards es de `60vh` en desktop: es lo que da el recorrido de scroll para que una alcance a la siguiente.

### 4.5 Proceso — 4 etapas

Cuatro cards horizontales con ilustración SVG propia arriba, con una línea conectora que cruza por detrás de las cuatro.

```
    ●━━━━━━━━━━━━●━━━━━━━━━━━━●━━━━━━━━━━━━●
  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
  │ ▭▭▭    │  │ ▯ ▭▭   │  │  </>   │  │   ✓    │
  │        │  │   ▭▭   │  │  ▭▭▭   │  │        │
  │ 01     │  │ 02     │  │ 03     │  │ 04     │
  │Relevam.│  │Diseño  │  │Desarr. │  │Entrega │
  │ texto  │  │ texto  │  │ texto  │  │ texto  │
  └────────┘  └────────┘  └────────┘  └────────┘
```

| # | Etapa | Texto | Ilustración |
|---|---|---|---|
| 01 | Relevamiento | Entendemos qué tiene que hacer el sistema, con quién se integra y qué problema resuelve. De acá sale el alcance real. | Documento con líneas |
| 02 | Diseño | Definimos estructura, pantallas y flujos antes de programar. Vas a ver cómo se usa el sistema antes de que exista. | Wireframe de bloques |
| 03 | Desarrollo | Construimos sobre lo acordado, con entregas parciales para que veas el avance y corrijas a tiempo. | Ventana con `</>` |
| 04 | Entrega | Publicación, pruebas en producción y acompañamiento durante las primeras semanas. | Check |

**Ilustraciones:** SVG inline, hechos con primitivas (rects, líneas, paths simples), trazo `--border-hover`, sin relleno. Coherentes entre sí: mismo grosor de trazo, misma caja de 100×56.

**Animación:** la línea conectora se dibuja de izquierda a derecha con `strokeDashoffset` al entrar en viewport, y las cards aparecen con stagger horizontal siguiendo a la línea. No fade genérico: entran desde abajo con la línea como guía.

**Mobile:** cards apiladas en vertical, línea conectora rotada a vertical del lado izquierdo.

### 4.6 Ejemplos — carrusel de mockups

**Título:** Ejemplos de proyectos
**Bajada:** Seis casos de demostración, uno por tipo de proyecto.

Carrusel horizontal con 6 mockups. Navegación por flechas + drag con inercia (`Draggable` + `InertiaPlugin` de GSAP, ambos gratis). Se ven ~2.5 cards a la vez para que se entienda que hay más.

| # | Mockup | Rubro |
|---|---|---|
| 1 | Tienda de indumentaria | Ecommerce |
| 2 | Tienda de vinos | Ecommerce de nicho |
| 3 | Sitio corporativo | Institucional |
| 4 | Landing de producto SaaS | Startup |
| 5 | Panel de administración | Webapp |
| 6 | Estudio de servicios profesionales | Institucional |

**Modal de previsualización:** al hacer click, la card se expande al centro con un `Flip` de GSAP (transición desde la posición real de la card, no un fade genérico). Fondo con blur. Dentro, la imagen larga con scroll propio, contenedor con marco de navegador. Flechas laterales para pasar al siguiente mockup sin cerrar. Cierre con `Esc`, click fuera, o botón. Focus trap y `aria-modal`.

**Nota:** los mockups son imágenes de demostración. No se declara autoría ni se atribuye a clientes.

**Resuelto en la Fase 6.**

**Flip + Lenis: el orden importa.** La transición de la card al modal salta si no se resuelven dos cosas, las dos por el mismo motivo (Flip compara mediciones de `getBoundingClientRect()` tomadas en momentos distintos):

1. **Lenis se detiene en el handler del click**, antes de que React re-renderice. Con el scroll interpolando, lo que Flip mide deja de ser válido en el frame siguiente.
2. **El estado de la card se captura también en el click**, no dentro del modal. El modal devuelve `null` mientras está cerrado, así que cuando monta ya no hay forma de leer la posición de partida: `Flip.getState` ahí adentro mide un elemento que recién existe. El estado viaja al modal por un ref.

Con el estado ya capturado, el modal hace `Flip.fit` para posar el marco sobre la card, guarda esa posición como partida, devuelve el marco a su lugar real y anima con `Flip.from`. Verificado por muestreo: el marco arranca en la posición exacta de la card (388, 144, 576px) e interpola hasta la del modal (103, 272, 896px).

**Los seis mockups son pantallas SVG**, como los del hero: se sumaron tienda de vinos, landing SaaS y sitio corporativo a las tres que ya existían. Cada card del carrusel recorta la pantalla en 16:10 y el modal la muestra completa con scroll propio.

**Snap y flechas comparten las mismas posiciones medidas.** `Draggable` con `inertia: true` usa una función de snap que busca la posición de card más cercana respetando el límite, y las flechas llaman al mismo cálculo. En mobile no hay flechas: solo drag, como pide §7.

### 4.7 Stack

Grid estático de tecnologías con hover. Una línea de contexto arriba, sin explicación larga.

> **Título:** Stack de trabajo
> **Bajada:** Las tecnologías con las que desarrollamos.

`Next.js · React · TypeScript · Node.js · PostgreSQL`

Cada logo en una celda con borde hairline. En hover: el borde pasa a `--border-hover`, el logo pasa de monocromo a color, y aparece el nombre debajo.

**Resuelto en la Fase 5.** Los logos son SVG inline con `fill="currentColor"` en `LogosStack.tsx`, así el paso a color es un cambio de color heredado y no dos archivos. Son las marcas oficiales, sin alterar forma ni proporción: es uso nominativo, que es lo que las licencias de las cinco permiten. El nombre está siempre en el DOM (en `text-transparent`) para no cambiar el alto de la celda en hover y para que los lectores de pantalla lo lean.

Son cinco, así que el grid va de 5 columnas en desktop y 2 en mobile (la quinta celda queda sola en la última fila, alineada a la izquierda como el resto del sitio). Si en algún momento se suma una sexta tecnología, pasa a 3 columnas en desktop.

### 4.8 Contacto

Dos columnas. Izquierda el texto y los datos, derecha el formulario.

> **Título:** Contanos qué necesitás construir
> **Bajada:** Respondemos en menos de 24 horas con una primera devolución sobre el alcance.

**Campos:**

| Campo | Tipo | Requerido |
|---|---|---|
| Nombre | text | sí |
| Email | email | sí |
| Empresa | text | no |
| Tipo de proyecto | select: Ecommerce / Sitio institucional / Desarrollo a medida / Otro | sí |
| Mensaje | textarea | sí |
| `website` | honeypot oculto | — |

- Validación en cliente con mensajes inline en `--text-danger`, no alerts.
- Estados: normal → enviando (botón con spinner) → enviado (mensaje de confirmación en el lugar del form).
- Sin reCAPTCHA por ahora. Honeypot + validación de longitud mínima en el servidor.
- El mismo componente `<Contacto />` se reutiliza en las tres landings, con la prop `tipoPreseleccionado`. Lleva además `conTitulo`, que en las landings lo deja sin su propio H2.

**Resuelto en la Fase 7.** El formulario está terminado; el envío quedó pendiente por el hosting (ver el recuadro en §8.4). Detalles que no estaban en el plan:

- **Los errores aparecen recién al primer intento de envío**, no mientras se escribe: marcar en rojo un campo que la persona todavía está completando es hostil. Después del primer intento sí se recalculan al escribir, para que se limpien apenas se corrigen.
- **El foco salta al primer campo con error** al enviar, para que alguien que navega con teclado no tenga que buscarlo.
- **Si el envío falla, los datos se conservan.** El error va en un bloque con `role="alert"` arriba del botón, separado de los errores de validación.
- El honeypot se posiciona fuera de pantalla en vez de `display:none`, que algunos bots detectan.
- La validación vive en `/lib/validarConsulta.ts`, aparte del componente, para que el endpoint la reutilice cuando exista.

### 4.9 Footer

```
Eteria                    Servicios        Contacto
Desarrollo a medida       Ecommerce        hola@eteria.com
                          Institucionales  WhatsApp
                          Software
────────────────────────────────────────────────────
© 2026 Eteria                              Privacidad
```

Link de privacidad chico, en `--text-low`, a la derecha. Sin redes sociales.

**Ajuste del cliente.** Los títulos de columna ("Servicios", "Contacto") estaban en `text-label` a 14px contra enlaces de 17px, así que se leían como subordinados a su propia lista. Pasaron a `text-cuerpo-lg` (20px) en semibold y `--text-hi`: quedan por encima de los enlaces, que es la jerarquía que corresponde.

### 4.10 WhatsApp flotante

Abajo a la derecha, **siempre visible**, `z-index` por debajo del modal. Círculo con el degradé de marca y glow suave. Abre chat directo sin mensaje precargado. En mobile se achica y se separa 16px de los bordes.

**Siempre visible, decidido por el cliente en la Fase 4.** En la Fase 3 se había probado que apareciera recién tras el primer viewport, para que no compitiera con el CTA del hero. Se descartó: llega tráfico de ads y hay gente que consulta sin leer la página. Lo único que queda animado es la entrada, con un delay de 1.3s para no pisar la secuencia del hero.

Se aparta mientras el menú mobile está abierto, donde tapaba el email del pie del overlay: el menú marca el body con `data-menu-abierto` y el botón lleva `data-flotante`, así el menú no necesita conocer a los flotantes.

---

## 5. Landings internas

Tres páginas: `/ecommerce`, `/software-a-medida`, `/sitios-institucionales`.

Mismo header, mismo footer, misma línea gráfica. Más cortas y más directas al formulario.

**Estructura:**

1. **Hero split** — mitad izquierda titular grande con rolling text, mitad derecha una ventana donde la interfaz del servicio se arma sola por partes, se desarma y vuelve a armarse.

   **Rehecho en la revisión del cliente.** Antes era un mockup estático y rotado en perspectiva. Ahora usa la misma mecánica que el hero de la home, sin la etapa de terminal (esa es de la home), y la ventana va **alineada, sin perspectiva**: el mockup es el protagonista del hero y rotarlo le quitaba legibilidad.

   Cada landing tiene su propia pantalla en `PantallasLanding.tsx`, distinta de las de la home y de seis partes en vez de cuatro, para que el armado dure más: la ficha de producto con checkout (`/ecommerce`), el panel de contenido (`/sitios-institucionales`) y el detalle de un pedido con sus integraciones (`/software-a-medida`). Cada una muestra la vista que sostiene el argumento de su landing.

   **El grid usa `minmax(0,1fr)` y no `1fr`**: con `fr` pelado el reparto se hace por contenido mínimo, así que el ancho del título definía el tamaño de la ventana y cada página la tenía distinta. Con `minmax` la ventana mide 724px en las cuatro.
2. **Beneficios** — 3 o 4 bloques de qué incluye, sin cards genéricas: layout editorial con números o íconos
3. **Proceso** — versión compacta de las 4 etapas
4. **Formulario** — el mismo componente, con el tipo de proyecto preseleccionado

**Rolling text del hero:** el sustantivo del titular rota — la palabra sale hacia arriba con máscara y entra la siguiente desde abajo. 2,2s por palabra.

**Reimplementado dos veces.** El enfoque de apilar las palabras y animar cada una por separado falla de dos formas: con curvas distintas o con la opacidad animada, la que sale y la que entra se leen superpuestas a mitad del cruce; y reencadenar timelines con `onComplete` suma la latencia de cada reencadenado al intervalo, así que los cambios pasaban de 2,4s a 5,3s.

La versión que funciona es **una sola tira vertical** con las palabras apiladas y la primera duplicada al final. La tira se desplaza un renglón por vez con un único tween, así la que sale y la que entra se mueven como un bloque: no hay dos animaciones que cruzarse. Al llegar al duplicado la tira vuelve a 0 sin transición, y el salto no se ve porque el contenido es idéntico. Verificado: 0 superposiciones e intervalos de 2,6 a 2,8s.

El `yPercent` es relativo al alto de la tira, que tiene un renglón más que palabras: el divisor es la cantidad de renglones. Y el contenedor lleva `padding-block-end` para compensar el que agrega `texto-degrade`, si no la palabra asoma por debajo de la máscara mientras se desplaza.

**Titulares reescritos en la Fase 8.** Los originales ("construida para vender / escalar / durar") eran anteriores al criterio de copy de §1: prometían en vez de nombrar. Las palabras que rotan ahora nombran partes concretas del trabajo.

| Landing | Titular | Palabras que rotan |
|---|---|---|
| `/ecommerce` | Tiendas online con **catálogo / checkout / pagos / envíos** | catálogo, checkout, pagos, envíos |
| `/software-a-medida` | Software para **gestión / operaciones / integraciones** | gestión, operaciones, integraciones |
| `/sitios-institucionales` | Sitios institucionales para **empresas / estudios / instituciones** | empresas, estudios, instituciones |

---

## 6. Transiciones de página

Fade out (0.35s) → cambio de ruta → fade in (0.45s). La URL cambia realmente, así que las landings funcionan como destino de ads.

Implementación: componente `PageTransition` con `usePathname()`, overlay con el color base que hace fade. Sin wipes pesados ni cortinas — la transición tiene que sentirse instantánea, no lucirse.

Al navegar, el scroll vuelve arriba antes del fade in.

**Resuelto en la Fase 8.**

**ScrollTriggers de la ruta anterior.** Al cambiar de ruta, `useGSAP` con scope mata los tweens de cada componente, pero los ScrollTrigger quedan registrados globalmente con las medidas de la página vieja. El síntoma es que al volver a la home los reveals no disparan o disparan en el lugar equivocado.

`PageTransition` hace `ScrollTrigger.refresh()` después de cada cambio de ruta, en dos tiempos: uno inmediato y otro tras un `requestAnimationFrame`, para alcanzar a los componentes que React monta en ese mismo commit.

Verificado con navegación de ida y vuelta a las tres landings, midiendo el apilado de las cards de servicios —que es lo que más depende de medidas— a mitad de recorrido. Los valores quedan idénticos al baseline de una home recién cargada: mismos `top` (124/136/556), mismas escalas (0.94/0.98/1) y mismas opacidades de velo. También se probó landing → landing sin pasar por la home.

**El fade out va por intercepción de clicks**, no envolviendo cada `Link`: un listener en `document` toma cualquier enlace interno, anima el overlay y recién ahí llama a `router.push()`. Así funciona igual en el header, el footer y las cards, sin tocar cada componente. Respeta ctrl/cmd/click medio para abrir en pestaña nueva, y con `prefers-reduced-motion` navega sin animar.

**El rolling text avanza con un índice propio, no con un timeline en loop.** Encadenar los tweens con `repeat: -1` dejaba a la última palabra saliendo mientras la primera ya había sido reposicionada por el repeat, y quedaban frames sin ninguna palabra visible. Además el estado inicial se aplica fuera del `matchMedia`: dentro, con reduced-motion quedaban las cuatro palabras superpuestas en vez de la primera sola.

---

## 7. Mobile

El objetivo es que no pierda peso visual, solo carga.

| Elemento | Desktop | Mobile |
|---|---|---|
| Partículas de fondo | Activas | Apagadas — se compensa con los glows, que quedan |
| Glows de sección | Parallax con scrub | Estáticos, misma intensidad |
| Mockups del hero | 3 en perspectiva + seguimiento de mouse | 1 mockup, perspectiva más plana, sin seguimiento |
| Cards de servicios | Apiladas con pin | Stack vertical normal, sin pin |
| Proceso | 4 en fila, línea horizontal | Vertical, línea a la izquierda |
| Carrusel | Flechas + drag | Solo drag, snap por card |
| Menú | Links en el header | Overlay a pantalla completa |
| Tipografía | Escala completa | `clamp()`, títulos hasta 40px |

**Menú mobile:** overlay full screen, fondo `--bg-elevated` con blur, links en Clash Display 32px con stagger de entrada, botón de contacto abajo con degradé. Bloquea el scroll del body mientras está abierto.

---

## 8. Técnico

### 8.1 Scroll suavizado

`ScrollSmoother` de GSAP (ahora gratis) o Lenis. Recomendación: **Lenis**, porque se lleva mejor con el App Router de Next y con `position: sticky`, que es justo lo que usan las cards apiladas. ScrollSmoother requiere una estructura de wrappers que complica el layout.

Se desactiva en mobile — el scroll nativo táctil es mejor que cualquier suavizado.

**Resuelto en la Fase 3.** Lenis se monta en `SmoothScroll` con `gsap.matchMedia()`, y avanza con el ticker de GSAP en vez de su propio `requestAnimationFrame`: así hay un solo rAF en la página y ScrollTrigger lee la misma posición en el mismo frame.

La navegación a secciones vive en `/lib/lenis.ts`, que expone:

- `scrollearA(selector)` — scrollea con Lenis si está activo, o con `scrollIntoView` nativo si no (mobile, reduced-motion), y deja el hash en la URL con `pushState` para que el enlace sea compartible. Verificado: **Lenis respeta `scroll-margin-top`**, así que el offset del header se resuelve con `scroll-mt` en las secciones y no hay que sumar un offset propio — hacerlo lo duplicaba.
- `bloquearScroll(bool)` — lo usa el menú mobile. Detiene Lenis y además pone `overflow:hidden` en el body, porque en mobile Lenis no está corriendo. Marca el body con `data-menu-abierto`, que es la señal que usan los flotantes para apartarse.

Las secciones de la home llevan `id` y `scroll-mt-24` (96px, contra los 81px del header).

### 8.2 GSAP

Todo gratis desde que Webflow lo compró, incluidos los plugins que antes eran de pago.

Plugins a usar: `ScrollTrigger`, `SplitText`, `Draggable`, `InertiaPlugin`, `Flip`.

```bash
npm install gsap @gsap/react
```

Registro centralizado en `/lib/gsap.ts`, importado una sola vez. Registrar plugins dentro de cada componente es la causa más común de comportamiento raro.

Todas las animaciones dentro de `useGSAP({ scope })` para cleanup automático al desmontar — sin esto las transiciones de página dejan ScrollTriggers huérfanos.

**TypeScript con GSAP.** No hay fricción real: `gsap` y `@gsap/react` traen sus propias definiciones, incluidos los tipos de `useGSAP` y `contextSafe`. No hace falta instalar nada de `@types/`.

Dos detalles a tener presentes:

- Tipar los refs explícitamente: `useRef<HTMLDivElement>(null)`.
- Guardar instancias de plugins en un ref pide anotación: `useRef<SplitText | null>(null)`.

Todos los componentes con GSAP llevan `'use client'`.

### 8.2.1 Versiones y decisiones de la base

Definido en la Fase 1:

- Next 16.3 con App Router y Turbopack, React 19, Tailwind 4, GSAP 3.15.
- Tailwind 4 usa configuración CSS-first: no hay `tailwind.config.js`. Los tokens se declaran en el bloque `@theme` de `app/globals.css` y quedan disponibles a la vez como utilidades (`text-hi`, `bg-surface`) y como variables CSS.
- TypeScript estricto, más `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters` y `noFallthroughCasesInSwitch`.
- `agentRules: false` en `next.config.ts`. Sin esto, `next dev` reescribe `CLAUDE.md` en cada arranque con su propio bloque de instrucciones y pisa las reglas del proyecto.
- Las fuentes se bajaron de la API de Fontshare en su versión variable y viven en `/public/fonts` (`ClashDisplay-Variable.woff2`, `Satoshi-Variable.woff2`). Next las sirve optimizadas vía `next/font/local`.
- El PNG de grano se genera con un script de Node en vez de descargarse: 128px, ruido con semilla fija, escala de grises con alfa. Queda en 19KB y es reproducible.

### 8.3 Imágenes

- `next/image` en todo, formato WebP.
- Los tres mockups del hero con `priority`.
- Los del carrusel con `loading="lazy"` y `placeholder="blur"`.
- Las imágenes largas del modal se cargan recién al abrirlo, no antes.

### 8.4 Formulario — envío

Route handler en `/api/contacto` con Nodemailer apuntando al SMTP del dominio. Variables en `.env.local`:

```
SMTP_HOST=  SMTP_PORT=  SMTP_USER=  SMTP_PASS=  MAIL_TO=
```

Validación en el servidor además de en el cliente. Rate limit simple por IP.

> **Nota de hosting:** esto requiere Node corriendo. Si el hosting final es cPanel compartido, la alternativa es exportar el sitio estático y postear a un script PHP en el mismo hosting. Decisión pendiente.

---

#### ⚠️ PENDIENTE: el envío no está implementado

**Estado al cerrar la Fase 7.** El formulario está completo y funcionando —campos, validación, los tres estados, honeypot y confirmación—, pero **no envía nada**. El hosting no está definido y de eso depende el método.

Hoy `enviarConsulta()` simula el resultado con una demora de 1,2s, para que los estados se vean como se van a ver en producción. Escribiendo `error@test.com` en el email se puede ver el estado de error sin romper nada.

**Todo lo que hay que cambiar está en un solo archivo: `/lib/enviarConsulta.ts`.** El componente `Contacto` consume el tipo `ResultadoEnvio` y no sabe cómo viaja el mensaje, así que no hay que tocar ningún componente.

**Pasos comunes a las dos opciones**

1. En `/lib/enviarConsulta.ts`: poner `SIMULAR = false` y borrar el bloque de simulación junto con el atajo de `error@test.com`.
2. Ajustar la constante `ENDPOINT` según la opción elegida.
3. El endpoint tiene que responder JSON: `{ ok: true }` o `{ ok: false, error: 'mensaje para el usuario' }`.
4. Validar de nuevo en el servidor. `/lib/validarConsulta.ts` es agnóstico del cliente y se puede importar tal cual desde un route handler; para PHP hay que replicar los mínimos de `LIMITES`.
5. Cortar cuando `website` (el honeypot) venga con contenido, respondiendo `{ ok: true }` sin enviar.

**Opción A — Node (Vercel, VPS, cualquier hosting con Node)**

- `ENDPOINT = '/api/contacto'`
- Crear `/app/api/contacto/route.ts` con Nodemailer y las variables SMTP de arriba.
- Rate limit por IP. Con una sola instancia alcanza un `Map` en memoria; si hay varias, hace falta almacenamiento compartido.

**Opción B — cPanel compartido (sin Node)**

- `ENDPOINT = '/contacto.php'`
- El sitio se exporta estático: `output: 'export'` en `next.config.ts`. **Atención:** eso desactiva los route handlers y la optimización de imágenes de Next (`images.unoptimized: true`).
- El script PHP recibe el JSON, valida, y manda con `mail()` o PHPMailer.
- Hay que verificar que el hosting permita `mail()` saliente, que muchos cPanel lo limitan.

**Lo que falta definir antes de implementar:** hosting, casilla real de destino (hoy `hola@eteria.com` es placeholder en `/content/marca.ts`) y credenciales SMTP.

### 8.5 SEO

- Metadata por página con la API de metadata de Next.
- Open Graph con imagen propia por landing (`/public/og`).
- `sitemap.xml` y `robots.txt` generados.
- JSON-LD de `Organization` en el layout.
- Títulos por landing orientados a la búsqueda: "Desarrollo de ecommerce a medida | Eteria".

### 8.6 Accesibilidad

Piso mínimo, sin anunciarlo:

- Contraste AA en todo el texto, verificado sobre las tres superficies del sitio y no solo sobre el fondo base. `--text-low` pasó por dos ajustes: de `#7B7499` a `#807A9F` en la Fase 2 (daba 4.48 sobre `--bg-base`), y de ahí a `#8B85AD` en la Fase 9, porque sobre `--bg-elevated` —las cards y el modal— daba 4.27. El valor actual da 5.65 / 4.98 / 5.10 sobre base, elevated y la barra de las ventanas de mockup. **Lección: un token de texto hay que medirlo contra cada superficie donde se usa, no contra el fondo de la página.**
- Focus visible en todos los interactivos (anillo violeta).
- Modal con focus trap y cierre por `Esc`.
- `prefers-reduced-motion` respetado.
- Navegación completa por teclado en carrusel y menú.
- `alt` real en los mockups.

---

## 9. Orden de armado

Cada fase es un punto de revisión: se mira, se corrige, se avanza.

**Fase 0 — Repositorio**
`git init` si no existe. `.gitignore` con `node_modules`, `.next`, `out`, `.env*.local`, `.DS_Store`, `*.log`. Crear el `.gitignore` antes de instalar dependencias, para que `node_modules` nunca entre al índice. Commit inicial con el plan y el `CLAUDE.md`.

Commit al cerrar cada fase, con mensaje descriptivo. Son nueve puntos de retorno en vez de uno.

**Fase 1 — Base**
Proyecto Next con TypeScript en modo estricto, Tailwind, fuentes locales, tokens de color en CSS variables, GSAP registrado en `/lib/gsap.ts`, Lenis, interfaces de contenido en `/types`, layout con header y footer vacíos.

**Fase 2 — Design system**
`Boton`, `TituloSeccion`, `Campo`, `Reveal`. Página de prueba con todos los componentes y la escala tipográfica para revisar tono visual antes de construir secciones.

**Fase 3 — Chrome**
Header con scroll state, menú mobile overlay, footer, WhatsApp flotante, scrollbar custom, capas de fondo (partículas, glows, grano).

**Fase 4 — Hero**
La sección más importante. Mockups en perspectiva, secuencia de entrada, seguimiento de mouse. Revisar acá antes de seguir: si el hero funciona, el resto del sitio se acomoda.

**Fase 5 — Secciones de contenido**
Sobre nosotros → Servicios apiladas → Proceso con ilustraciones y línea → Stack.

**Fase 6 — Ejemplos**
Carrusel con drag e inercia, modal con Flip, navegación entre mockups.

**Fase 7 — Contacto**
Formulario, validación, estados, route handler, prueba de envío real.

**Fase 8 — Landings**
Componente de layout compartido, hero split con rolling text, contenido de las tres, transiciones de página.

**Fase 9 — Cierre**
404, página de privacidad, metadata y OG, sitemap, pasada de accesibilidad, pasada de mobile, Lighthouse.

**`/design-system` no se elimina.** Decisión del cliente en la Fase 9: la ruta queda publicada como referencia de trabajo. Se mantiene fuera de los buscadores por tres vías, y las tres tienen que seguir así:

- `robots: { index: false, follow: false }` en la metadata de la página.
- `Disallow: /design-system` en `robots.txt`.
- Ausente de `RUTAS` en `/content/sitio.ts`, que es lo que alimenta el sitemap.

Si más adelante se decide sacarla, hay que borrar `/app/design-system/` y `/content/designSystem.ts`, y quitar el `Disallow` de `/app/robots.ts`.

---

## 10. Checklist final

- [ ] Reemplazo global de `Eteria` por el nombre definitivo
- [ ] Mockups reales reemplazando placeholders
- [ ] **Implementar el envío del formulario** (hoy simulado, ver el recuadro de §8.4)
- [ ] SMTP configurado y envío probado en producción
- [ ] Email real en el footer
- [ ] Número de WhatsApp real
- [x] Metadata y OG de las 4 páginas (imagen OG generada con next/og, canonical por ruta, JSON-LD de Organization)
- [x] Lighthouse medido en la Fase 9 sobre el build de producción (`npm run build` + `npm start`, no el dev server, que da números muy por debajo):

  | Ruta | Performance | Accessibility | Best practices | SEO |
  |---|---|---|---|---|
  | `/ecommerce` | 94 | 100 | 100 | 100 |
  | `/privacidad` | 95 | 100 | 100 | 100 |
  | `/` desktop | 86 | 100 | 100 | 100 |
  | `/` mobile | 87 | 100 | — | — |

  **La home queda en 86 por la secuencia de entrada del hero, no por peso de carga.** El 87% del LCP es "render delay": el elemento más grande es la bajada del hero, que entra con el delay de 0,5s que pide §4.2. La red no es el problema (todos los recursos bajo 21ms, CLS 0). Subir la home a >90 implica adelantar o sacar ese delay, que es una decisión de diseño y no un ajuste técnico.
- [ ] Probado en Safari iOS (el blur y el sticky rompen ahí antes que en ningún lado)
- [x] `prefers-reduced-motion` verificado en partículas, reveals, hero, rolling text y transiciones de página
- [ ] Formulario probado desde mobile

---

## 11. Riesgos a vigilar

**Las cards apiladas y el scroll suavizado pelean.** `position: sticky` con scroll virtualizado es la combinación que más problemas da. Si Lenis rompe el pin, la salida es usar ScrollTrigger `pin: true` en vez de sticky nativo, o resignar el suavizado en esa sección.

**El hero con perspectiva puede verse mal en pantallas chicas de laptop.** Probar a 1280×720 además de a 1920.

**El modal con imágenes largas es el punto de peso.** Si las imágenes de los mockups son de 3000px de alto, el modal va a tironear. Definir un máximo de alto y comprimir bien.

**ScrollTrigger y los errores de hidratación en Next.** Es el problema más reportado de esta combinación: ScrollTrigger modifica estilos del `body`, y el servidor y el cliente terminan renderizando atributos distintos. Aparece como un warning de atributos extra del servidor. Se evita manteniendo los componentes animados como client components y no dejando que ScrollTrigger toque el `body` antes de que monte. Si aparece, es esto y no un problema del código propio.

**StrictMode duplica animaciones en desarrollo.** Si una animación se ejecuta dos veces o arranca de una posición rara solo en local, la causa casi siempre es haber usado `useEffect` en lugar de `useGSAP`.

**Demasiado movimiento mata el efecto.** Si al terminar el sitio se siente inquieto, la primera medida es sacar reveals, no sumar. La regla es: un momento memorable (el hero) y el resto disciplinado.

---

## 12. Propuestas de hero (en revisión)

El hero de la Fase 4 funciona pero le falta peso visual. Se armaron cinco alternativas en `/heros`, cada una a pantalla completa en su propia ruta, con **el mismo copy y la misma paleta**: la comparación es de dirección visual, no de texto. Las cinco son `noindex` y están excluidas en `robots.txt`.

| # | Ruta | Nombre | Qué la hace distinta |
|---|---|---|---|
| 1 | `/heros/franja` | Franja | Los mockups desfilan en loop en el tercio inferior, cortados por los dos bordes. El mouse sobre una tarjeta frena la marcha y le devuelve el color. |
| 2 | `/heros/reveal` | Reveal | Grilla de mockups apagados a pantalla completa detrás del texto. El cursor funciona como foco: lo que pasa cerca recupera color y nitidez. |
| 3 | `/heros/ventana` | Ventana que se construye sola | Una ventana grande donde la interfaz se arma por partes, se desarma y vuelve a armarse con otro tipo de proyecto: tienda → panel → institucional. |
| 4 | `/heros/video` | Video | Loop abstracto oscuro a pantalla completa con velo y degradé que lo funde hacia abajo. |
| 5 | `/heros/terminal` | Terminal | Una sesión de trabajo: los comandos se escriben solos y van levantando un proyecto. |

### Decisiones técnicas comunes

- **Todo el movimiento va sobre propiedades de composición.** El loop de la franja usa `x`; el foco del reveal usa `opacity`, `scale` y `filter`; el tipeo de la terminal usa `clip-path` en vez de reescribir `textContent`, que forzaría layout en cada frame.
- **El seguimiento del cursor no crea un tween por evento.** El reveal usa `quickTo` y agenda un único recálculo por frame en `gsap.ticker`; los centros de las celdas se miden una vez y se recalculan solo en `resize`.
- **El freno de la franja usa `timeScale`**, no un `pause`: no reinicia el loop ni recalcula posiciones.
- **`prefers-reduced-motion` en las cinco:** sin loop, sin seguimiento, y el video pausado en el primer frame. Verificado: franja con la pista en `x:0`, reveal con la zona central encendida, ventana con las 4 partes visibles, terminal con las 10 líneas, video `paused: true` en `t:0`.
- `PantallasPorPartes.tsx` existe porque las pantallas de `PantallasMockup.tsx` son un SVG monolítico: sirven para mostrar una interfaz, no para armarla por etapas.

### Pendiente de revisión: el video de la propuesta 4

El placeholder es de **Pexels** (id 2611250), 3,3 MB, 1920×1080, H.264. La licencia de Pexels permite uso comercial sin atribución obligatoria. Se eligió Pexels sobre Coverr porque expone descarga directa por URL sin API key.

**El contenido visual no se pudo verificar automáticamente:** Chrome headless no decodifica H.264, así que en las capturas el video sale negro. El layout y los velos sí están verificados. Hay que mirarlo en un navegador real y confirmar que sea suficientemente oscuro y de movimiento lento.

Para reemplazarlo: pisar `/public/heros/abstracto.mp4` manteniendo el nombre, o cambiar `archivo` en `/content/heros.ts`. Para producción conviene además una versión WebM y un poster JPG del primer frame.

### Cuando se elija

1. Llevar el componente elegido de `/components/heros/` a `/components/home/Hero.tsx`.
2. Borrar `/app/heros/`, `/components/heros/`, `/content/heros.ts` y, si no se eligió la propuesta 4, `/public/heros/`.
3. Quitar `/heros` del `disallow` en `/app/robots.ts`.
4. Actualizar §4.2 con la dirección elegida y borrar esta sección.

---

## 13. Fondos para el hero (en revisión)

El fondo actual (glows suaves y partículas) se siente flojo. Se armaron cuatro variantes en `/fondos`, cada una con **el hero completo de la home encima** para ver cómo conviven: la comparación es de fondo, no de hero. Las cuatro son `noindex` y están excluidas en `robots.txt`.

| # | Ruta | Nombre | Qué hace | Técnica |
|---|---|---|---|---|
| 1 | `/fondos/mesh` | Mesh | Manchas de gradiente grandes que derivan lento y se solapan | CSS: cuatro radiales con blur, animados con GSAP sobre `x/y/scale` |
| 2 | `/fondos/grilla` | Grilla | Retícula fina con celdas que se encienden un instante | Retícula como `background` repetido; los destellos son divs que GSAP enciende al azar |
| 3 | `/fondos/halo` | Halo | Patrón de puntos apagado que se revela donde pasa el cursor | `mask-image` radial sobre el patrón, seguimiento con `quickTo` |
| 4 | `/fondos/flujo` | Flujo | Trazos finos con estela corta que se desvanece | Canvas: la estela sale de **no** limpiar el frame, sino pintar un velo encima |

### Por qué CSS en tres y canvas en uno

- **Mesh, Grilla y Halo van en CSS** porque lo que se mueve son transformaciones y máscaras: el compositor las resuelve sin repintar. Mesh en canvas obligaría a redibujar gradientes de 620px en cada frame; Halo obligaría a redibujar el patrón enmascarado en cada movimiento del mouse.
- **Flujo va en canvas** porque la estela se consigue por acumulación: cada frame pinta un velo semitransparente sobre lo anterior en vez de limpiar. Con divs habría que mantener un elemento por segmento de estela.
- El loop de Flujo corre en `gsap.ticker`, que es el único `requestAnimationFrame` de la página.

### Mobile y reduced-motion

Verificado en los cuatro:

| | Mobile | `prefers-reduced-motion` |
|---|---|---|
| Mesh | 3 manchas, estáticas (el blur de 100px es lo que más cuesta en GPU móvil) | 4 manchas visibles, 0 animadas |
| Grilla | Retícula igual, destellos a la mitad | Retícula igual, 0 destellos |
| Halo | Sin cursor: el halo queda fijo | Halo fijo |
| Flujo | Mitad de trazos y más lentos | Canvas vacío, el loop no se monta |

### Cuando se elija

1. Llevar el fondo elegido a `/components/bg/` y montarlo en el hero de la home (y en el de landing si corresponde).
2. Decidir qué pasa con las partículas y los glows actuales: el fondo nuevo puede reemplazarlos o convivir.
3. Borrar `/app/fondos/`, `/components/fondos/` y `/content/fondos.ts`.
4. Quitar `/fondos` del `disallow` en `/app/robots.ts`.
5. Actualizar §2.5 con la capa nueva y borrar esta sección.
