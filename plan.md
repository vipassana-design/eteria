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
| Servicios | Ecommerce · Sitios institucionales · Webapps / software a medida |
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
--text-low:     #807A9F;  /* labels, metadatos */

/* Bordes */
--border:       rgba(255,255,255,0.07);
--border-hover: rgba(139,92,246,0.35);

/* Glow */
--glow-violet:  radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%);
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
| Hero H1 | 76px | 40px | 600 | -0.03em |
| H2 sección | 52px | 32px | 600 | -0.02em |
| H3 card | 28px | 22px | 500 | -0.01em |
| Cuerpo grande | 20px | 18px | 400 | 0 |
| Cuerpo | 17px | 16px | 400 | 0 |
| Label | 14px | 13px | 500 | 0 |

- Line-height: 1.05 en títulos grandes, 1.65 en cuerpo.
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

1. **Campo de partículas** — canvas fijo, ~60 puntos violeta a 8–14% de opacidad, deriva lenta. Se apaga en mobile y con reduced-motion.
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
  /design-system/page.tsx       temporal, revisión visual — se elimina en la Fase 9
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
  /ui
    Boton.tsx  TituloSeccion.tsx  Campo.tsx  Reveal.tsx
  /bg
    Particulas.tsx  Glow.tsx  Grano.tsx
/lib
  gsap.ts                       registro de plugins
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
  queHacemos.ts                 texto y datos de la sección
  servicios.ts  proceso.ts  stack.ts
  designSystem.ts               temporal, contenido de /design-system
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
[Eteria]        Servicios  Proceso  Ejemplos  Qué hacemos      [ Contacto ]
```

- Logo tipográfico en Clash Display 600. `Eter` en `--text-hi`, `ia` con el degradé de marca.
- Links con scroll suavizado a la sección (ScrollSmoother o Lenis, ver 8.1).
- Botón "Contacto" con degradé + glow, va a la sección de contacto.
- Scrollbar del navegador finita (8px) con thumb violeta.

### 4.2 Hero — mockups flotantes

**Layout:** dos tercios de texto a la izquierda, mockups a la derecha en perspectiva.

```
┌──────────────────────────────────────────────────────────┐
│                                          ╱▔▔▔▔▔▔╲        │
│  Desarrollamos el software              │ mockup │╲      │
│  que tu negocio necesita.               │  color │ │╲    │
│                                          ╲______╱ │ │    │
│  Ecommerce, plataformas y sitios a         ╲______╱ │    │
│  medida. Construidos desde cero,             ╲______╱    │
│  sin plantillas ni limitaciones.                         │
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

**Resuelto en la Fase 4.**

- **Los mockups son SVG, no imágenes.** `PantallasMockup.tsx` dibuja tres pantallas con UI realista y a color: tienda de indumentaria (grilla de productos con precios y prendas), panel de administración (sidebar, métricas con delta, gráfico de área, tabla de pedidos con estados) y sitio institucional (hero editorial y servicios). Los mockups reales siguen siendo un pendiente del cliente; mientras tanto el hero se puede juzgar con contenido real en vez de cajas grises, y al escalar quedan nítidos sin peso de red. Cuando lleguen las imágenes se reemplaza el contenido de `VentanaMockup`.
- **Los cortes de línea del H1 vienen del contenido**, no del ancho. A 76px de cuerpo "Desarrollamos" mide 560px y con la columna original el título caía en 4 líneas cortas, o dejaba "software" solo en una línea. `hero.titulo` guarda los cortes como arrays y el H1 los renderiza en bloques con `text-wrap: nowrap`.
- **La columna de texto es 1.35fr contra 1fr** de los mockups, para respetar los dos tercios del layout. Los mockups se ensanchan al 132% de su columna y se desbordan hacia la derecha: el corte contra el borde es parte del efecto, y la capa `#capa-sitio` lo recorta sin generar scroll horizontal.
- **Las dos ventanas de atrás llevan `brightness` reducido.** Sin eso competían con la de adelante en vez de leerse como profundidad.
- Escalonado en diagonal a 19% vertical y 14% horizontal: con offsets menores las ventanas se tapaban entre sí y solo se leía la de adelante.

### 4.3 Qué hacemos

Sin card. Texto grande sobre el fondo, dos columnas asimétricas.

> **Título:** Software a medida, sin atajos
>
> **Cuerpo:**
> Cada proyecto arranca en cero. No adaptamos plantillas ni forzamos un sistema que no encaja: escribimos el código que tu operación necesita, con la estructura que va a soportar lo que viene después.
>
> Trabajamos con empresas que ya tienen algo funcionando y necesitan que funcione mejor, y con equipos que están armando la primera versión de un producto. En los dos casos el punto de partida es el mismo: entender qué tiene que hacer el sistema antes de escribir una línea.

**A la derecha, tres datos:**

- `+20` años construyendo software
- `Ecommerce · Plataformas · Sitios` lo que desarrollamos
- `24h` tiempo de respuesta

Los números en Clash Display grande con degradé, el label debajo en `--text-low`.

**Ajuste de la Fase 5.** El dato del medio no es un número: al mismo tamaño que `+20` y `24h` ocupaba tres líneas y desbalanceaba el bloque. Lleva `esTexto: true` en el contenido y se renderiza a tamaño H3, así el peso de número grande queda para las cifras.

### 4.4 Servicios — cards apiladas

Tres cards que se apilan al scrollear: cada una queda pineada y la siguiente sube por encima, con la anterior escalando levemente hacia atrás y perdiendo opacidad. Es el efecto que viste en Wavespace.

Cada card: mitad texto, mitad mockup a color.

**Card 1 — Ecommerce**
> Tiendas que venden, no que solo existen.
>
> Catálogo, checkout, pagos, envíos y panel de administración. Integramos las pasarelas y la logística que ya usás, y el sistema queda preparado para crecer en productos y en tráfico sin rehacerse.
>
> `Ver más sobre ecommerce →` (a `/ecommerce`)

**Card 2 — Sitios institucionales**
> La cara de tu empresa, bien construida.
>
> Sitios rápidos, indexables y fáciles de mantener. Estructura pensada para que la información se encuentre y para que el equipo pueda actualizarla sin depender de nadie.
>
> `Ver más sobre sitios institucionales →`

**Card 3 — Webapps y software a medida**
> Sistemas que resuelven tu operación.
>
> Paneles internos, plataformas con usuarios, automatizaciones, integraciones con lo que ya tenés. Software pensado para tu proceso, no un producto genérico al que hay que adaptarse.
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

**Título:** Lo que se puede construir
**Bajada:** Distintos tipos de proyecto y cómo se resuelven.

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

### 4.7 Stack

Grid estático de tecnologías con hover. Una línea de contexto arriba, sin explicación larga.

> **Título:** Con qué trabajamos
> **Bajada:** Tecnologías actuales, elegidas por lo que resuelven y no por moda.

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
| Tipo de proyecto | select: Ecommerce / Sitio institucional / Webapp o sistema / Otro | sí |
| Mensaje | textarea | sí |
| `website` | honeypot oculto | — |

- Validación en cliente con mensajes inline en `--text-danger`, no alerts.
- Estados: normal → enviando (botón con spinner) → enviado (mensaje de confirmación en el lugar del form).
- Sin reCAPTCHA por ahora. Honeypot + validación de longitud mínima en el servidor.
- El mismo componente `<Contacto />` se reutiliza en las tres landings, con la prop `tipoPreseleccionado`.

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

### 4.10 WhatsApp flotante

Abajo a la derecha, **siempre visible**, `z-index` por debajo del modal. Círculo con el degradé de marca y glow suave. Abre chat directo sin mensaje precargado. En mobile se achica y se separa 16px de los bordes.

**Siempre visible, decidido por el cliente en la Fase 4.** En la Fase 3 se había probado que apareciera recién tras el primer viewport, para que no compitiera con el CTA del hero. Se descartó: llega tráfico de ads y hay gente que consulta sin leer la página. Lo único que queda animado es la entrada, con un delay de 1.3s para no pisar la secuencia del hero.

Se aparta mientras el menú mobile está abierto, donde tapaba el email del pie del overlay: el menú marca el body con `data-menu-abierto` y el botón lleva `data-flotante`, así el menú no necesita conocer a los flotantes.

---

## 5. Landings internas

Tres páginas: `/ecommerce`, `/software-a-medida`, `/sitios-institucionales`.

Mismo header, mismo footer, misma línea gráfica. Más cortas y más directas al formulario.

**Estructura:**

1. **Hero split** — mitad izquierda titular grande con rolling text, mitad derecha mockup del servicio con más presencia visual
2. **Beneficios** — 3 o 4 bloques de qué incluye, sin cards genéricas: layout editorial con números o íconos
3. **Proceso** — versión compacta de las 4 etapas
4. **Formulario** — el mismo componente, con el tipo de proyecto preseleccionado

**Rolling text del hero:** el sustantivo del titular rota — la palabra sale hacia arriba con máscara y entra la siguiente desde abajo. Timeline en loop con `SplitText` + `yPercent`, 2.2s por palabra.

| Landing | Titular | Palabras que rotan |
|---|---|---|
| `/ecommerce` | Tu tienda online, construida para **vender / escalar / durar** | vender, escalar, durar |
| `/software-a-medida` | Software que resuelve tu **operación / proceso / problema** | operación, proceso, problema |
| `/sitios-institucionales` | El sitio de tu empresa, **rápido / claro / tuyo** | rápido, claro, tuyo |

---

## 6. Transiciones de página

Fade out (0.35s) → cambio de ruta → fade in (0.45s). La URL cambia realmente, así que las landings funcionan como destino de ads.

Implementación: componente `PageTransition` con `usePathname()`, overlay con el color base que hace fade. Sin wipes pesados ni cortinas — la transición tiene que sentirse instantánea, no lucirse.

Al navegar, el scroll vuelve arriba antes del fade in.

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

### 8.5 SEO

- Metadata por página con la API de metadata de Next.
- Open Graph con imagen propia por landing (`/public/og`).
- `sitemap.xml` y `robots.txt` generados.
- JSON-LD de `Organization` en el layout.
- Títulos por landing orientados a la búsqueda: "Desarrollo de ecommerce a medida | Eteria".

### 8.6 Accesibilidad

Piso mínimo, sin anunciarlo:

- Contraste AA en todo el texto. `--text-low` se verificó en la Fase 2: el valor original `#7B7499` daba 4.48 sobre `--bg-base` y AA pide 4.5 para texto normal, que es justo el tamaño de los labels. Se subió a `#807A9F` (4.85), el cambio más chico que cruza el umbral manteniendo el matiz. El resto de los tokens de texto pasan con holgura (`--text-mid` 9.78, `--text-hi` 17.71).
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
Qué hacemos → Servicios apiladas → Proceso con ilustraciones y línea → Stack.

**Fase 6 — Ejemplos**
Carrusel con drag e inercia, modal con Flip, navegación entre mockups.

**Fase 7 — Contacto**
Formulario, validación, estados, route handler, prueba de envío real.

**Fase 8 — Landings**
Componente de layout compartido, hero split con rolling text, contenido de las tres, transiciones de página.

**Fase 9 — Cierre**
404, página de privacidad, metadata y OG, sitemap, pasada de accesibilidad, pasada de mobile, Lighthouse.

---

## 10. Checklist final

- [ ] Reemplazo global de `Eteria` por el nombre definitivo
- [ ] Mockups reales reemplazando placeholders
- [ ] SMTP configurado y envío probado en producción
- [ ] Email real en el footer
- [ ] Número de WhatsApp real
- [ ] Metadata y OG de las 4 páginas
- [ ] Lighthouse > 90 en Performance y Accessibility
- [ ] Probado en Safari iOS (el blur y el sticky rompen ahí antes que en ningún lado)
- [ ] `prefers-reduced-motion` verificado
- [ ] Formulario probado desde mobile

---

## 11. Riesgos a vigilar

**Las cards apiladas y el scroll suavizado pelean.** `position: sticky` con scroll virtualizado es la combinación que más problemas da. Si Lenis rompe el pin, la salida es usar ScrollTrigger `pin: true` en vez de sticky nativo, o resignar el suavizado en esa sección.

**El hero con perspectiva puede verse mal en pantallas chicas de laptop.** Probar a 1280×720 además de a 1920.

**El modal con imágenes largas es el punto de peso.** Si las imágenes de los mockups son de 3000px de alto, el modal va a tironear. Definir un máximo de alto y comprimir bien.

**ScrollTrigger y los errores de hidratación en Next.** Es el problema más reportado de esta combinación: ScrollTrigger modifica estilos del `body`, y el servidor y el cliente terminan renderizando atributos distintos. Aparece como un warning de atributos extra del servidor. Se evita manteniendo los componentes animados como client components y no dejando que ScrollTrigger toque el `body` antes de que monte. Si aparece, es esto y no un problema del código propio.

**StrictMode duplica animaciones en desarrollo.** Si una animación se ejecuta dos veces o arranca de una posición rara solo en local, la causa casi siempre es haber usado `useEffect` en lugar de `useGSAP`.

**Demasiado movimiento mata el efecto.** Si al terminar el sitio se siente inquieto, la primera medida es sacar reveals, no sumar. La regla es: un momento memorable (el hero) y el resto disciplinado.
