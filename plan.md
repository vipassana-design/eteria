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
- **No defenderse de acusaciones que nadie hizo.** Negar plantillas, aclarar que no se terceriza, subrayar quién escribe el código: son preocupaciones de proveedor chico. Instalan la duda al responderla y bajan el registro. Un equipo consolidado no lo menciona porque se da por sentado. Vale también en afirmativo: "el código lo escribimos nosotros" es la misma defensa sin el "no".
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

Tres capas globales, todas sutiles, ninguna protagonista:

1. **Campo de partículas** — canvas fijo, ~60 puntos con deriva lenta. Se apaga en mobile y con reduced-motion.

   **Ajustado a pedido del cliente:** la opacidad pasó de 8–14% a 16–42% y los puntos toman uno de cuatro tonos al azar (del violeta de marca al blanco puro), para que el campo no se lea como una trama plana. Se sacó el fade-in que los hacía entrar al final de la secuencia del hero: ahora están desde el primer frame.
2. **Glows de sección** — divs con `--glow-violet`, blur alto, posicionados detrás de secciones clave. Se desplazan a distinta velocidad que el scroll (parallax con ScrollTrigger `scrub`).
3. **Grano** — overlay de ruido a 3% de opacidad, PNG tileable de 128px. Evita el banding de los degradés en pantallas grandes y le quita el aspecto plástico al dark.

**Fondo del hero.** Además de las tres capas globales, los heros llevan un fondo animado propio: `FondoHero` (`/components/bg/FondoHero.tsx`), elegido entre las propuestas de §13. Son dos capas apiladas —las manchas de gradiente de Mesh como base, los trazos de Flujo encima— con el desvanecido de bordes puesto una sola vez al final. El detalle de por qué apilarlas requiere props (`conVelo`, `conDesvanecido`, `modoBorrado`) está en §13.

Va en el hero de la home **y en el de las tres landings**. Reemplaza a los `Glow` que tenían: las manchas ya aportan el color y la profundidad, y sumarles los glows encima lavaba el contraste del texto. Los `Glow` siguen en el resto de las secciones (Qué hacemos, Contacto, 404, privacidad, design-system).

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
  /fondos/                      5 fondos para el hero — temporal, con noindex
  not-found.tsx
  /api/contacto/route.ts        POST → envío de mail
/components
  /layout
    Header.tsx  MobileMenu.tsx  Footer.tsx  WhatsappFab.tsx
    PageTransition.tsx  SmoothScroll.tsx  Logo.tsx
  /home
    Hero.tsx  QueHacemos.tsx  Servicios.tsx  Proceso.tsx
    Soluciones.tsx  MockupModal.tsx  Stack.tsx  Contacto.tsx
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

El estado se calcula con `onUpdate` de un ScrollTrigger comparando la posición contra un umbral de 24px, **no con `onToggle`**. `onToggle` informa si el scroll está dentro del rango del trigger, y ese rango termina en `max`: al tocar el fondo de la página el trigger se desactivaba y el fondo del header desaparecía, el mismo síntoma que arriba pero por el extremo opuesto. Lo que importa acá es la posición, no la pertenencia a un rango. El estado inicial se setea a mano, porque `onUpdate` no corre hasta el primer movimiento y la página puede cargar ya scrolleada (una recarga a mitad de página, o entrar con un ancla).

```
[Eteria]        Sobre nosotros  Servicios  Proceso  Soluciones [ Contacto ]
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
│  se construye sobre el alcance que                       │
│  definimos con el cliente.                               │
│                                                          │
│  [ Cotizar mi proyecto ]  [ Ver soluciones ]             │
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
> Somos un equipo de desarrollo especializado en software para empresas. Cada proyecto tiene un equipo asignado y un responsable técnico que lo sigue de principio a fin.
>
> Trabajamos con empresas que ya tienen un sistema funcionando y necesitan ampliarlo o reemplazarlo, y con equipos que están armando la primera versión de un producto. En los dos casos empezamos por definir qué tiene que hacer el sistema y con qué se integra.

**A la derecha, tres datos:**

- `+20` años acompañando clientes
- `End to end` del relevamiento al lanzamiento
- `Soporte` asistencia post lanzamiento

Los valores en Clash Display con degradé, el label debajo en `--text-low`. Los dos últimos no son cifras: van con `esTexto` y a `--text-h3`, que el tamaño de número grande queda para las que sí lo son.

**Reescrito por el cliente.** La sección pasó de "Qué hacemos" a **"Sobre nosotros"**: el título anterior repetía lo que ya dicen el hero y servicios, y el copy arrancaba con "cada proyecto arranca en cero", que no dice nada. Ahora la sección habla del equipo.

De los datos originales se sacaron dos: "24h tiempo de respuesta" (ya está en la sección de contacto) y "Ecommerce · Plataformas · Sitios", que no era un número y desbalanceaba el bloque.

**Primer párrafo, dos pasadas (cliente).** La versión original decía "no revendemos plantillas ni tercerizamos el trabajo"; la siguiente, "el código lo escribimos nosotros". Las dos fueron rechazadas por lo mismo, y de ahí sale una regla para todo el copy:

> **No defenderse de acusaciones que nadie hizo.** Negar plantillas, aclarar que no se terceriza o subrayar quién escribe el código son preocupaciones de proveedor chico: instalan la duda al responderla y bajan el registro. Un equipo consolidado no lo menciona porque se da por sentado.

El párrafo habla ahora de cómo se organiza el trabajo —equipo asignado, responsable técnico que sigue el proyecto de principio a fin—, que es verificable y no compite con nadie. (Una tercera versión decía "sin intermediarios entre quien decide y quien construye": misma defensa con otra ropa, también fuera.) Tampoco repite los datos de la columna derecha: los años están en `+20`, el alcance en `End to end` y la continuidad en `Soporte`, así que el párrafo no vuelve sobre ninguno de los tres.

**Barrido del resto del copy.** A pedido del cliente se revisaron los 14 archivos de `/content` y el JSX buscando el mismo patrón. Se corrigieron cinco lugares más:

| Dónde | Decía | Por qué |
|---|---|---|
| Bajada del hero (y `SITIO.descripcion`, y `/heros`) | "Cada proyecto **se escribe desde cero**" | "Desde cero" solo significa algo por contraste con lo prearmado, y "se escribe" vuelve al foco de quién teclea. Ahora: "se construye sobre el alcance que definimos con el cliente" |
| Landing de ecommerce, panel | "Lo usa el equipo **sin pasar por nosotros**" | Se defiende de "te cobran cada cambio". Ahora: "Lo opera el equipo de la empresa" |
| Landing institucional, panel | "**sin tocar código ni pedirlo por mail**" | Igual que el anterior. Ahora: "con vista previa antes de publicar", que agrega información en lugar de justificar |

También se reemplazaron tres textos de muestra de la escala tipográfica en `/design-system`, que arrastraban copy descartado: "Software a medida, **sin atajos**" (adjetivo prohibido por nombre en §1) y "Tiendas que venden, **no que solo existen**" (estructura "X, no Y"). Las muestras usan ahora copy real del sitio.

Quedan dos menciones de "plantilla" en `designSystem.ts` y `heros.ts`, pero son notas técnicas de las rutas de revisión —por qué el fondo lleva croma, qué representa la propuesta de terminal—, no copy publicable.

**Segunda pasada de los datos (cliente).** Los tres pasaron a `+20 años acompañando clientes`, `End to end` y `Soporte`. Con esto se resuelve el pendiente que había: las dos cifras sin verificar (`+100 proyectos` y `9 de 10 clientes siguen con nosotros`) ya no están, y los datos describen el alcance del trabajo en lugar de afirmar volumen. El flag `esTexto` de `DatoHero`, que había quedado sin uso, vuelve a usarse en los dos últimos.

### El fondo va en violeta (revisión del cliente)

Las capas de fondo —las manchas del mesh, los trazos del flujo, las partículas y el glow de sección— se veían **azules**, y con eso el segundo acento violeta quedaba justificado solo por dos números de "Sobre nosotros".

La causa es una trampa de nombres que arrastramos: **`--color-violet-*` tiene nombre violeta y valor azul** desde que se aplicó la paleta final (`--color-violet-500: #0076fd`, hue 212). Se dejó así porque renombrarlos tocaba las utilidades de Tailwind en ~20 archivos. El violeta real es `--color-acento-2: #8b5cf6`, hue 258.

Los cuatro fondos pasaron a `--color-acento-2` y `--color-acento-2-claro`, manteniendo la variación tonal con distintos porcentajes de `color-mix()`: con un solo color y una sola opacidad el fondo queda plano. También `--glow-violet`, que ya decía violeta en el nombre pero usaba el token azul.

Queda así el reparto: **el azul lleva títulos, botones y enlaces; el violeta el fondo y los datos.** `--grad-brand` sigue en azul a propósito.

Verificado midiendo el color resuelto: el glow da `srgb 0.545 0.361 0.965` = #8B5CF6 en la home y en las tres landings.

### El halo de la ventana del mockup

Una línea en degradé que recorre el borde de la ventana del hero, como si se fuera encendiendo por tramos. Marca la ventana sin agregarle nada adentro, que es lo que importa: el mockup ya está lleno.

Es un `conic-gradient` que gira detrás del marco, recortado a una franja de 1,5px con dos máscaras que se restan —el rectángulo completo menos el interior—, así queda solo el contorno. El tramo encendido cubre el 18% de la vuelta; con más, se lee como un marco de color en lugar de una luz que recorre.

**El giro va por CSS y no por GSAP.** Con `@property` el ángulo es una propiedad animable y el navegador la interpola en el compositor. Un tween que reescriba el `background-image` recalcularía el degradé 60 veces por segundo, y en el ciclo del hero hay cuatro ventanas. Vuelta completa en 5,5s.

Va en el contenedor de afuera, no en el marco: el marco lleva `overflow-hidden` para recortar el mockup, y ahí adentro el halo quedaría cortado justo en el borde que tiene que iluminar.

**Pero en un contenedor que abarca solo el marco.** La primera versión lo puso en `data-ventana`, que incluye el indicador de etapa de abajo —la etiqueta "Ecommerce", "Panel de administración"… y las rayitas—, así que con el `inset` negativo la línea pasaba por encima de esas palabras. Hay un div `relative` intermedio que envuelve el marco y nada más. Medido: el halo excede al marco 1px por lado, el grosor del borde, y la etiqueta arranca 15px más abajo.

**Y un resplandor detrás del filo.** El mismo degradé en un `::after`, con el borde más grueso (7px contra 1,5) para que el `blur(6px)` tenga de dónde sangrar —con el ancho de la línea el desenfoque se come la luz y no queda nada— a opacidad 0,5. El degradé está factorizado en `--halo-luz` para que la línea y el resplandor compartan el mismo ángulo y no se desfasen.

Va **por delante** con `mix-blend-mode: screen`, que suma luz en lugar de pintar encima. La primera versión usó `z-index: -1` para meterlo detrás de la línea, y eso lo mandaba detrás del marco, que es opaco: medido con una captura del borde, salía gris sin nada de violeta.

Con `prefers-reduced-motion` el bloque global ya detiene la animación, pero eso dejaría el cónico congelado con la luz en una esquina: se reemplaza por un color plano tenue, línea y resplandor.

Medido con el resplandor puesto: **60 fps en escritorio y 56 con la CPU 4× más lenta.** Un `blur` sobre una capa que gira es de lo más caro que se le puede pedir al navegador, así que ese número confirma que el `@property` mantiene el trabajo en el compositor.

**Por ahora solo en la home**, a pedido del cliente, para verlo antes de llevarlo a las landings.

### Mapa de capacidades

A la derecha del texto. Es la **única pieza del sitio que no es una pantalla**: los nueve mockups son capturas de producto, esto es el mapa de lo que el equipo abarca. Un nodo central —"El sistema / a medida", las dos líneas al mismo tamaño— y seis alrededor unidos por radios que se dibujan:

**Desarrollo · Arquitectura · Integraciones · Infraestructura · Mantenimiento · Soporte**

La primera versión nombraba los sistemas externos con los que se integra —facturación, pagos, stock— y decía "así encaja tu operación". El cliente lo pasó a las capacidades del equipo: dice "esto abarcamos", que es más directo aunque pierda especificidad técnica. `Integraciones` recupera lo anterior en una palabra.

`Soporte` y `Mantenimiento` son el único lugar visual donde aparece el argumento del párrafo que tiene al lado: quien construyó es quien mantiene.

Se descartaron "Soluciones" —la palabra más genérica del rubro—, "Web" —deja afuera todo lo que no es un sitio— y "Diseño", que no se menciona en ninguna parte del copy. El radio del círculo bajó de 148 a 132: "Infraestructura" y "Mantenimiento" son bastante más largas que "Stock" o "CRM".

**Se descartó una foto.** Las opciones eran equipo (no hay), oficina (no comunica desarrollo) o stock de gente frente a monitores, que es justamente lo que hace que un sitio se lea como plantilla. Acabábamos de sacar el copy genérico; una foto de stock reintroducía el problema por otra vía.

**Se anima al entrar y una sola vez, no con el scroll.** Proceso ya tiene una línea scroll-driven, y dos secciones seguidas con el mismo recurso se leen como un truco repetido. Después queda un pulso en loop lento que viaja del centro a cada nodo: es lo que lo mantiene vivo sin pedir atención.

**Dos disposiciones.** En desktop los nodos van en círculo. En mobile eso no funciona: la caja se comprime al ancho de la columna y las etiquetas caerían a 9-10px, abajo del mínimo legible —está medido. Ahí el centro va arriba y los nodos en dos columnas de tres debajo, así cada etiqueta tiene media columna de ancho en lugar de un radio comprimido.

**La conexión también cambia de forma (revisión del cliente).** La primera versión de mobile mantenía el radio recto, y el cliente marcó que las líneas pasaban por encima de las palabras. Es geométrico: el centro está arriba y los nodos abajo a los costados, así que cada radio salía en diagonal justo por donde va la etiqueta. Medido muestreando cada trazo contra la caja de cada texto, **las seis** lo cruzaban.

Se reemplazó por una **ruta en L**: baja por el eje vertical y dobla horizontal a la altura del nodo, con el codo redondeado en un arco de radio 10. Y el nodo pasó al lado **interno** de su columna con la etiqueta hacia afuera —al revés de lo que parece natural, y necesario: con el nodo contra el borde exterior el tramo horizontal viene del eje y tiene que atravesar la etiqueta entera para alcanzarlo. Ese fue el segundo bug, y también salió medido.

Con el quiebre, el pulso ya no puede ser un tween de `cx`/`cy`: cortaría en diagonal por fuera de la línea. Se anima un proxy con el avance sobre la ruta y la opacidad juntos, y el `onUpdate` lee `getPointAtLength`. La opacidad va en el mismo objeto a propósito: escrita aparte, el `onUpdate` del frame siguiente pisaba el 0 del `onRepeat` y el punto no se apagaba entre vueltas.

Las etiquetas subieron a **14px** en mobile —el cliente notó que había espacio de sobra—, el nodo a r=7,5 y el nombre del centro a 14px. La caja creció de 292 a 330 de alto para que las filas no quedaran a 4px entre sí. Verificado en cuatro anchos, de 1440 a 360: **0 trazos sobre texto, 0 etiquetas pisadas, 0 fuera de la caja**.

**El degradé de los radios va en `userSpaceOnUse` anclado al centro.** Con el default (`objectBoundingBox`) cada línea resuelve el degradé contra su propia caja, y con seis nodos dos caen exactamente sobre el eje vertical —"Desarrollo" arriba e "Infraestructura" abajo—: su caja tiene ancho 0, el degradé no se puede resolver y el navegador no las pinta. Desaparecían las dos, y el cliente lo marcó. Anclado al centro el apagado es uno solo para todo el diagrama en lugar de repetirse dentro de cada línea, que además es lo que se quería.

Es un bug que el DOM no muestra: el `<line>` está, con `opacity: 1` y `strokeDashoffset: 0`. Se detectó midiendo el ancho del `getBBox` de cada trazo y preguntando con `elementFromPoint` qué hay pintado en su punto medio.

Se montan los dos SVG y CSS decide cuál se ve. Alternar con JavaScript pediría un estado de ancho de ventana que en el primer render no existe, y eso produce un salto al hidratar. La animación lee cuál está visible con `offsetParent !== null`: animar el oculto no haría nada, porque sus medidas son 0 y el pulso apuntaría al origen.

### Ajustes de los mockups del hero (revisión del cliente)

**Tienda (Atelier).** Le quedaba media pantalla vacía: la columna de filtros terminaba en y=282 de 460 y las cards de producto, de 214px de alto, dejaban 150px libres al pie cruzando todo el ancho. Cuatro cambios:

- La columna de filtros baja hasta el pie: **color** en swatches con el aplicado tildado, **material** con contador y **valoración** en estrellas, además del precio y los talles que ya tenía. Va de y=62 a 444.
- Un **banner de campaña** sobre la grilla (y=62-154), con la foto del hero a la derecha fundida por un degradé, la volanta de temporada y un contador de vigencia. Es la franja que toda tienda pone sobre el catálogo.
- Las cards **más bajas y apoyadas al pie**: de y=96-310 pasan a 200-436, con la foto de 124 a 116 y 24px de margen abajo.
- El **toast del carrito a la derecha**, del lado del ícono de donde sale. Antes iba abajo a la izquierda, en el hueco de los filtros, que ya no existe. A la altura de la grilla y no del banner: apoyado arriba tapaba la mitad de la franja de campaña que el mockup acaba de presentar.

Quedó en 6 partes, 35 ítems y 6 fotos, con `maxY` 460 y nada fuera del viewBox.

**Corporativo (Norvex).** La bajada "Operamos plantas y redes…" tenía su baseline en y=180 y el botón arrancaba en 184: 4px, se leía pegada. El texto sube a 174 y el botón baja a 188, con lo que quedan 12px.

**Panel de gestión.** El tooltip del último valor del gráfico —"Semana 4 / $342.100"— aparecía **antes** de que la línea llegara al punto que señala. Entraba con el stagger de los `data-item`, mientras el trazo se dibuja después y durante 0,7-0,75s.

Se resolvió con un marcador nuevo, **`data-tras-trazo`**, agregado a los tres envoltorios (`Hero`, `CicloPantalla`, `LandingHero`): el elemento se excluye del stagger general con `[data-item]:not([data-tras-trazo])` y entra al terminar el trazo, con un `back.out` corto. Sirve para cualquier gráfico que se agregue después.

También se separaron las dos cards de la fila del medio, que tenían 12px de hueco: con la sombra de dos capas se leían como si se tocaran. El gráfico cede 8px de ancho y el ranking arranca 8 más a la derecha, así quedan 20.

### 4.4 Servicios — cards apiladas

Tres cards que se apilan al scrollear: cada una queda pineada y la siguiente sube por encima, con la anterior escalando levemente hacia atrás y perdiendo opacidad. Es el efecto que viste en Wavespace.

Cada card: mitad texto, mitad mockup a color.

**Mockups propios (§14).** Las tres cards tienen su propio mockup, y cada uno muestra una pantalla que no aparece en ningún otro lugar del sitio:

| Servicio | El hero muestra | Las landings | La card |
|---|---|---|---|
| Ecommerce | listado con filtros | ficha de producto | **ficha de tecnología** |
| Institucionales | home industrial | panel de contenido | **home de estudio** |
| Software | tablero de KPIs | detalle de pedido | **tablero kanban** |

Cada uno con paleta propia —azul, verde sobre crema, índigo— porque representan sitios de clientes distintos. No están atados a los tokens del tema: si el sitio cambia de acento, los mockups no.

**El mockup ocupa la mitad derecha completa.** Antes iba centrado con `p-8` y quedaba flotando con márgenes; el recorte contra el borde es lo que le da el aire de captura.

**Y el lienzo tiene su propio alto: 720×538, no 460.** Sacado el padding quedaban franjas del color de fondo arriba y abajo, que el cliente marcó. Es una diferencia de proporción: la celda mide 575×430 = 1.337 y el lienzo del hero 720/460 = 1.565, más ancho, así que al ajustarse al ancho de la celda sobraba alto. Con ancho 720, el alto que iguala la proporción es 538. `LienzoMockup` exporta los dos como `ALTOS.ventana` y `ALTOS.celda`.

Los 78px extra **se llenaron con contenido**, no moviendo los bloques hacia abajo: la ficha ganó una tabla de especificaciones y una galería más grande, el estudio un bloque de equipo con los cuatro socios, y el kanban dos tarjetas más por columna —4/3/3/3 en lugar de 2/2/1/1— con el paso subido de 82 a 89px. El kanban era el caso que el cliente marcó aparte: las columnas terminaban a 100px del pie y leía como media pantalla vacía.

Verificado en las tres: SVG 574×430 en celda de 575×430 (**franja vertical 0**), `maxY` exactamente 538, nada fuera del viewBox, y 7/6/5 partes con 29/21/28 ítems de stagger.

**La foto del hero del estudio se alineó a la grilla.** Iba a sangre desde `x=0` mientras el logo está en 34 y las cards de áreas en 32: era lo único pegado al borde y el cliente lo marcó. Ahora arranca en 32 con `rx=3`, como las cards. Medido, la x mínima de cada parte del mockup: barra 34, hero 32, áreas 32, equipo 32, notas 32, foto 32.

**Los tres se arman en loop (`CicloPantalla`).** Es el mismo armado que la ventana del hero —cada `data-parte` entra con fade y `y`, los `data-item` caen con stagger, los `data-trazo` se dibujan— pero acá la pantalla es una sola y el ciclo la rearma en lugar de avanzar a la siguiente etapa: una card tiene su mockup y nada más. Compás: 0,34s entre partes y 3,2s de sostén con la pantalla completa, que es largo a propósito —el mockup tiene datos que se leen, y desarmarlo enseguida lo vuelve una animación en vez de una captura.

El armado corre **solo cuando la card está a la vista**, con `onEnter`/`onLeave` en lugar de `once`: las tres están bien abajo de la página, un loop desde la carga gasta frames sobre algo que nadie ve y el visitante se perdería el armado. Al volver retoma donde quedó (`onEnterBack: play`, no `restart`) para que scrollear hacia arriba y abajo no dispare el armado de nuevo cada vez.

El envoltorio es lo único que anima: los mockups siguen siendo SVG estáticos con marcadores, sin `'use client'`. Uno montado sin `CicloPantalla` se ve completo y quieto, que es un estado válido —y es lo que muestra `prefers-reduced-motion`.

Verificado con el apilado sticky, que es donde podía fallar: las tres disparan su trigger a distintas alturas de scroll (+0, +400 y +1200 desde el inicio de la sección) y las tres ciclan.

**Jerarquía del texto (revisión del cliente).** Son tres niveles: el **nombre del servicio** como título (`--text-h3`, lleva el enlace a la landing), un **subtítulo** en `--text-cuerpo-lg` sobre `--text-mid`, y la **descripción** en `--text-cuerpo` sobre `--text-low`.

Estaba al revés: el nombre del servicio iba como label chico en `--text-low` y el subtítulo ocupaba el `h3`. El dato más importante de la card quedaba como metadato.

**Card 1 — Ecommerce**
> Tiendas online para vender y administrar el negocio.
>
> Catálogo, carrito, checkout, pagos, envíos y panel de administración. Integramos las pasarelas y los operadores logísticos que la empresa ya usa, y la arquitectura contempla el crecimiento.
>
> `Ver ecommerce →` (a `/ecommerce`)

**Card 2 — Sitios institucionales**
> La cara pública de la empresa, con su contenido al día.
>
> Definimos las secciones y la jerarquía del contenido para que cada página tenga un propósito claro. El equipo administra textos, novedades, imágenes y documentos desde un panel propio.
>
> `Ver sitios institucionales →`

**Card 3 — Software a medida**
> Sistemas que se adaptan a cómo trabaja la empresa.
>
> Paneles de gestión, plataformas con usuarios y permisos, y automatización de tareas que hoy se hacen a mano. Se conecta con los sistemas que la empresa ya tiene en uso: facturación, stock o CRM.
>
> `Ver software a medida →`

**Copys reescritos (revisión del cliente).** Los tres subtítulos y dos descripciones cambiaron:

- **Institucionales** era el más flojo. El subtítulo, "El sitio de la empresa", no informaba nada; la descripción abría con "sitios rápidos e indexables" —jerga técnica en la primera línea— y seguía con performance y Lighthouse, que no es lo que decide la compra. También decía "se entregan con un panel", que nadie había definido. Ahora la descripción habla del trabajo de estructura y de quién administra el contenido. La misma frase abría la bajada de la landing `/sitios-institucionales`: se corrigió ahí también.
- **Software a medida**: el subtítulo, "Sistemas internos, plataformas e integraciones", enumeraba lo mismo que el título y que la descripción. Ahora dice para qué sirven.
- **Ecommerce**: el subtítulo repetía la enumeración con la que arranca la descripción. Ahora el subtítulo dice para qué es y la descripción qué incluye.

El largo de las tres descripciones se ajustó (189 / 184 / 194 caracteres) para que las cards midan igual: con `justify-center` el texto se centra, pero una línea de más cambia el alto de la card. Verificado en 1440 / 1024 / 390: las tres en 432px, 432px y 635px respectivamente.

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

### 4.6 Soluciones — carrusel de mockups

**Título:** Soluciones digitales
**Bajada:** Explorá algunas propuestas conceptuales de productos y experiencias digitales.

**Renombrada por el cliente.** Era "Ejemplos de proyectos" y el ítem del menú decía "Ejemplos". Los seis mockups no son trabajos entregados, así que "ejemplos" y "casos" sugerían un portfolio que no existe; "propuestas conceptuales" dice lo que son. El cambio arrastró el ancla (`#ejemplos` → `#soluciones`), el ítem del menú, el CTA secundario del hero de la home y de las tres landings ("Ver ejemplos" → "Ver soluciones"), y el nombre del componente y del export de contenido (`Ejemplos.tsx` → `Soluciones.tsx`, `seccionEjemplos` → `seccionSoluciones`).

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

**Sin plazo comprometido (revisión del cliente).** La bajada decía "respondemos en menos de 24 horas con una primera devolución sobre el alcance" y la confirmación repetía las 24 horas. Prometer un plazo fijo obliga a cumplirlo con cualquier carga de trabajo, así que las dos pasaron a "nos ponemos en contacto a la brevedad": es amplio y sigue siendo una respuesta.

Se probaron y descartaron dos piezas: un indicador de disponibilidad calculado con el reloj del visitante ("te respondemos mañana a primera hora" no suena profesional) y una lista de tres pasos de qué pasa después de enviar (redundante: si te contactan, es obvio que van a llamar y presupuestar).
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

**Fase 6 — Soluciones**
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

## 13. Fondos para el hero (resuelto: Mesh + Flujo)

El fondo original (glows suaves y partículas) se sentía flojo. Se armaron cinco variantes en `/fondos`, cada una con **el hero completo de la home encima** para ver cómo conviven: la comparación es de fondo, no de hero. Las cinco son `noindex` y están excluidas en `robots.txt`.

**Elegido: #5, Mesh + Flujo**, montado como `FondoHero` en el hero de la home y en el de las tres landings (§2.5).

| # | Ruta | Nombre | Qué hace | Técnica |
|---|---|---|---|---|
| 1 | `/fondos/mesh` | Mesh | Manchas de gradiente grandes que derivan lento y se solapan | CSS: cuatro radiales con blur, animados con GSAP sobre `x/y/scale` |
| 2 | `/fondos/grilla` | Grilla | Retícula fina con celdas que se encienden un instante | Retícula como `background` repetido; los destellos son divs que GSAP enciende al azar |
| 3 | `/fondos/halo` | Halo | Patrón de puntos apagado que se revela donde pasa el cursor | `mask-image` radial sobre el patrón, seguimiento con `quickTo` |
| 4 | `/fondos/flujo` | Flujo | Trazos finos con estela corta que se desvanece | Canvas: la estela sale de **no** limpiar el frame, sino pintar un velo encima |
| 5 | `/fondos/mesh-flujo` | Mesh + Flujo | Las manchas de Mesh como base y los trazos de Flujo encima | Los dos componentes apilados, cada uno sin su velo propio |

**Combinación Mesh + Flujo (pedido del cliente).** Apilar los dos no era sumar los componentes tal cual. Dos cosas tapaban la base:

1. **Los velos opacos propios de cada uno**, encimados, oscurecían todo. Mesh acepta `conVelo={false}` y Flujo `conDesvanecido={false}`: el velo y el desvanecido los pone la capa combinada, una sola vez.

2. **El velo que borra la estela.** Flujo lo pinta sobre *todo* el canvas cada frame, y ese canvas está encima de las manchas: el fondo se veía brillante al cargar y se iba oscureciendo a medida que el loop acumulaba velo. Se resuelve con `modoBorrado="borrar"`, que usa `destination-out` para bajar el alfa de lo pintado en vez de pintar encima, así el canvas queda transparente donde no hay trazo.

Verificado midiendo el brillo del fondo a lo largo de 5,6s: **17,4 → 18,6** y estable, contra 15,4 de Mesh solo y 13,4 de Flujo solo. Antes de la corrección era el más oscuro de los tres. El contraste del párrafo del hero sobre el fondo más claro con los trazos pasando da **6,3 — pasa AA**.

**Ajuste de la estela (revisión del cliente).** La primera versión dejaba franjas colgadas que ensuciaban la pantalla. Eran tres causas sumadas: el velo borraba a 0.075 por frame (unos 40 frames para desaparecer), los trazos usaban `lighter`, que *suma* luz sobre lo anterior y volvía el rastro más brillante donde el trazo pasaba despacio, y el degradé no llegaba a cero en la cola. Ahora el velo borra a 0.3, todo el dibujado va con `source-over` y los trazos son más cortos. Verificado: la superficie con tinta visible queda en 0,02–0,03% y **estable en el tiempo** —antes crecía—, con brillo promedio de 1 sobre el fondo.

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

### Qué se hizo al elegirlo

1. Los tres componentes de la propuesta ganadora pasaron a `/components/bg/`: `FondoMesh.tsx`, `FondoFlujo.tsx` y el combinado como `FondoHero.tsx`.
2. Montado en `Hero` (home) y `LandingHero`, reemplazando los `Glow` que tenían.
3. Las partículas y el grano **conviven**: son capas globales fijas y aportan textura sobre cualquier fondo. Los `Glow` se sacaron solo de los heros.
4. `Hero` recibió una prop `conFondo` (default `true`) que solo se apaga en `/fondos`, que monta el hero real con otro fondo detrás: sin eso se verían los dos apilados.

**La ruta `/fondos` queda**, igual que `/design-system` y `/heros`: por decisión del cliente no se borran las pruebas. Se mantienen con `noindex` y fuera del sitemap, y las cuatro propuestas no elegidas siguen en `/components/fondos/` para poder volver a compararlas.

---

## 14. Mockups del hero con fotos reales (adoptados)

Los tres mockups del ciclo del hero eran SVG de rectángulos y líneas: se leían como wireframes, no como capturas. Se rehicieron con fotos reales y más densidad de información, y **están en uso en la home y en las tres landings**.

`/mockups` queda como ruta de revisión —`noindex` y fuera del sitemap, igual que `/fondos` y `/heros`—: ahí se ven quietos y grandes, con la lista de qué cambió en cada uno. Corriendo se ven en la home y en las landings.

**El pedido tenía dos partes**, y conviene separarlas porque solo una es costosa:

1. **Fotos reales.** Es lo que hace el salto: sin imágenes ni texto de verdad, el techo de un SVG mejorado es "wireframe prolijo".
2. **Detalle de SVG.** Sombras de dos capas, jerarquía tipográfica, badges, estados, densidad de datos plausible.

### Qué pantalla muestra cada uno

Cada mockup del hero muestra una pantalla **distinta** de la que muestra su landing, para no repetir:

| Mockup | La landing muestra | El hero muestra |
|---|---|---|
| Tienda | ficha de producto | **listado de categoría**: filtros aplicados, orden, grilla con precios y estados, paginado |
| Panel | detalle de un pedido | **tablero de resumen**: KPIs comparados, dos series, ranking, cola de trabajo |
| Institucional | panel de contenido | **home pública**: hero con foto, divisiones, cifras, novedades |

### Las fotos

Once imágenes de **Pexels** (licencia libre, uso comercial sin atribución), en `/public/mockups`. Recortadas al slot que ocupan con `sharp` y convertidas a WebP al doble del tamaño de pantalla: **160 KB en total**, menos de lo estimado.

Van como `<image>` dentro del SVG, no como `<img>` aparte: así siguen formando parte del grupo `data-parte` que anima el timeline. `preserveAspectRatio="xMidYMid slice"` es el equivalente de `object-fit: cover`, y cada slot lleva su propio `clipPath` con id único —compartir uno recortaría todas las fotos con la misma caja.

El panel lleva una sola foto (el avatar del usuario): un sistema de gestión no tiene fotos de escena, y ahí el realismo lo dan los datos —importes con decimales, nombres, tiempos relativos.

**Una se descartó por marca visible.** Unas zapatillas con una marca deportiva reconocible: poner una marca real en la tienda ficticia de un mockup es engañoso y además es uso de marca ajena.

### Reemplazar las fotos

Se sobrescribe el archivo en `/public/mockups` manteniendo el nombre. Los tamaños de cada slot están en el `Foto` correspondiente de cada componente; si la foto nueva tiene otra proporción, `slice` la recorta al centro sin deformarla.

### Lo que hubo que corregir al verificar

Medido con capturas del SVG aislado, no a ojo:

- **El toast del carrito** estaba en `y=388..444` y se solapaba con el paginado. Pasó al hueco libre bajo la columna de filtros, que estaba vacío.
- **La cruz de los chips de filtro** quedaba a 1px del texto: se lee como pisada aunque no se superponga. Se ensancharon los chips.
- **El panel y el institucional no entraban en los 460 del lienzo**: el contenido llegaba a `y=445` y `y=455`. Se comprimió cada bloque; ahora terminan en 413 y 422.
- **"Andreani" se pisaba con "Sincronizado 14:02"** en la barra de integraciones del panel.

Se verificó también que ningún elemento salga del `viewBox` y que el SVG se vea entero: la caja del hero es 16:10 (1.600) y el `viewBox` 720×460 (1.565), así que las escalas quedan en 1.597 × 1.563 y no hay recorte.

### Puestos en uso

`POR_PARTES` pasó a exportar los tres nuevos, así que la home los recibió sin tocar el `Hero`. Los componentes viven en `/components/home/`, con la base compartida en `LienzoMockup.tsx`.

**Los `data-item` había que completarlos.** El timeline hace stagger sobre los `[data-item]` de cada parte, pero solo si hay más de uno: las partes con elementos sueltos entraban de golpe. Los mockups nuevos tenían 4, 4 y 3; se agruparon los elementos que se pueblan juntos y quedaron en **11, 10 y 10**. Sin eso el mockup aparecía entero en vez de armarse.

### El ciclo de las landings

Antes cada landing armaba su pantalla, la desarmaba y la volvía a armar. Ahora tienen el mismo ciclo de dos etapas que la home, con su propio mockup:

| Landing | Ciclo |
|---|---|
| `/ecommerce` | terminal → listado de tienda → loop |
| `/sitios-institucionales` | terminal → home institucional → loop |
| `/software-a-medida` | terminal → tablero de gestión → loop |

Cada una tiene **su propia sesión de terminal**, con los comandos del stack que corresponde: `@mercadopago/sdk-react` en ecommerce, `@payloadcms/next` en institucionales, `prisma migrate` en software. No es decoración: es lo que se usaría de verdad.

La terminal se extrajo a `/components/home/SesionTerminal.tsx`. Estaba inline en el `Hero` y copiarla en el `LandingHero` habría duplicado 50 líneas de JSX con los marcadores que busca el timeline.

Los mockups de 6 partes de `/components/landing/PantallasLanding.tsx` quedaron sin uso. Se dejan como referencia de diseño: fueron los que marcaron el nivel de densidad al que se llevaron estos.

### Verificado

Muestreando el DOM cada 1,4s durante 25s en las cuatro páginas:

- **La home** recorre las cuatro etapas en orden y vuelve: Desarrollo (terminal) → Ecommerce → Panel de administración → Sitio institucional → Desarrollo.
- **Las tres landings** alternan terminal → pantalla → terminal, cada una con su mockup y su URL en la barra de la ventana.
- **Las partes se arman de a poco**, no de golpe: la secuencia va 1/5 → 3/5 → 5/5 (o /6 en el panel).
- **La caja no cambia de tamaño entre etapas**: 721,7 × 451,1 en las cuatro, con la columna de texto en 491px. Medido con decimales —redondeado parecía variar 2px, y era el redondeo.

> **Pendiente:** las fotos son de stock. Para la tienda y el institucional funcionan; cuando haya imágenes reales de proyectos, se reemplazan en `/public/mockups` manteniendo el nombre del archivo.

> **Sin decidir:** si los seis mockups del carrusel de Soluciones y los tres de las cards de servicios reciben el mismo tratamiento.

---

## 15. Laboratorio de paleta (herramienta interna)

Panel flotante abajo a la izquierda para explorar colores y escala **en vivo**, sin recompilar ni recargar. Se pidió para definir la paleta más rápido viendo los cambios sobre el sitio real en vez de sobre swatches.

Se colapsa con la flecha de su cabecera y vuelve con el círculo que queda en su lugar.

### Cómo funciona

Escribe las variables CSS del documento con `setProperty`. Como todos los colores del sitio viven en `@theme` de `globals.css`, cambiar un token repinta **todo** —botones, degradés, glows, bordes— sin tocar ningún componente.

### Qué controla

| Pestaña | Contenido |
|---|---|
| **Paletas** | Veintidós combinaciones completas para dark mode, listas para aplicar |
| **Color** | 8 controles: dos superficies, dos acentos, cuatro de texto. Cada uno con picker nativo y sliders H/S/L |
| **Escala** | Los cinco tamaños de tipografía, los dos radios, el ancho del contenedor y el margen lateral |
| **Fondo** | Multiplicadores de glows, partículas, mesh y grano |
| **Contraste** | Los 12 pares texto/superficie con su ratio WCAG, recalculados en vivo |

Son ~8 controles de color y no los 40 tokens del tema: el resto son derivados. El violeta principal arrastra su rampa (`600` más oscuro, `300` más claro) con deltas HSL, así la escala queda coherente sin tener que ajustarla a mano.

### Las paletas

Trece combinaciones completas, listas de un click. Salen de las **escalas dark de Radix Colors**, que traen dos cosas que no se improvisan: el gris que acompaña cada matiz —Radix empareja mauve con los violetas, slate con los azules, sage con los verdes, sand con los cálidos— y un step 9 construido con la máxima croma de la escala. Dos vienen de sistemas reales.

**Todas pasan AA en los doce pares.** El punto de tener plantillas es poder elegir por criterio visual sin auditar cada una, así que cada card muestra su contraste más bajo: dice cuánto margen queda para ajustar después.

Lo que hubo que corregir: el botón primario usa `text-base` sobre el degradé —el fondo de página oscuro encima del acento— y varios step 9 no llegaban a 4,5:1 en ese par. Se aclararon hasta pasar, medido uno por uno.

Un par del panel estaba mal definido y se descubrió acá: medía `--color-hi` sobre el botón, cuando el sitio pinta `text-base`. El par corregido es fondo-de-página sobre `violet-500`, que es el tramo medio del degradé.

**Cuatro candidatas se descartaron por redundancia, no por contraste.** Jade y verde terminal quedaban a 8° y 22° de matiz de teal: los tres se leían igual. Violeta Radix e índigo caían dentro de un racimo de siete paletas entre 206° y 258°. Las trece que quedaron cubren el círculo cromático con la menor distancia en 6°, y en esos casos el fondo las distingue antes que el acento.

### El fondo del header

La barra translúcida que aparece al scrollear sale de dos tokens propios: `--fondo-header` y `--borde-header`. Antes era `bg-elevated/80` escrito en el componente, así que no se podía ajustar sin recompilar.

El control tiene **color y opacidad separados**: el `input[type=color]` nativo no maneja alfa, y la opacidad es justamente lo que decide cuánto se nota la barra sobre el contenido que pasa debajo. Se guarda como `color-mix()` para que el token exportado se lea igual que el resto del CSS del proyecto.

La muestra del panel es una barra con el fondo y el blur reales sobre un degradé que simula el contenido: es la única forma de juzgar una superficie translúcida.

### Los botones, aparte

Los CTA se prueban por separado del resto de la paleta: son el llamado a la acción, así que necesitan más saturación que un acento de interfaz. En la pestaña Color hay un bloque **Botones** con diez degradés armados, sin picker manual —elegir dos puntos de un degradé a mano es difícil de acertar.

Tres tokens nuevos: `--grad-boton`, `--glow-boton` y `--borde-boton-hover`. El primario cambia su degradé y el color del glow en hover; el secundario, que es transparente, cambia solo el borde en hover.

**El glow estaba hardcodeado.** El componente tenía `rgba(139,92,246,0.55)` escrito a mano, así que cambiar el acento dejaba el resplandor en violeta. Ahora sale de `--glow-boton`, que por defecto deriva del acento principal: es una mejora del sitio además de la herramienta.

Los diez están entre 78% y 96% de saturación en su color medio y pasan AA contra el texto oscuro que llevan encima, con el peor punto del degradé entre 4,68 y 10,64. La muestra en el panel es el degradé real del tamaño de un botón chico, con su glow: se juzga la pieza, no el color suelto.

**Sin elegir ninguno**, los tres tokens derivan de la paleta vigente. Elegir uno los desacopla, y **una paleta ya no pisa el CTA elegido**: son dos decisiones independientes, así que se puede combinar cualquier fondo con cualquier botón. Una paleta guardada sí los trae adentro, porque el guardado captura el estado completo.

### El segundo acento

El sitio usaba **un solo color para todo**: botones, glows, bordes en hover, números, cifras. Se agregó `--color-acento-2` para separar dos cosas que no son lo mismo: "hacé click" y "esto es un dato".

Va en tres lugares, los que son valor y no acción:

- Las cifras de Sobre nosotros (`+20`, `End to end`, `Soporte`)
- Los números de las cuatro etapas del proceso
- Los números de los beneficios de cada landing («Qué incluye»)
- Los números del proceso de cada landing («Cómo trabajamos»)

Se aplica con la utilidad `texto-degrade-2`, gemela de `texto-degrade` pero con `--grad-acento-2`. El hover del stack quedó con el principal a propósito: es una interacción.

**Arranca igual al acento principal**, así que el sitio se ve como si la distinción no existiera hasta que se mueve. El cambio es opt-in: la separación se decide moviéndolo en el panel o aplicando una de las paletas que lo traen.

### Los grises neutros

Cinco variantes que cambian el piso (de 3% a 13% de luminosidad), la elevación de las cards y el cast del gris:

| Paleta | Fondo | Cast | Por qué |
|---|---|---|---|
| Gris tinta | `#08090a` | frío mínimo | El de mayor contraste |
| Gris neutro | `#0a0a0a` | sin croma | El de las plataformas de deploy |
| Gris medio | `#111111` | sin croma | Deja respirar las sombras de las cards |
| Gris carbón | `#131315` | frío | El más claro; el azul sube para no perderse |
| Gris cálido | `#100f0e` | cálido mínimo | Menos clínico, casi imperceptible |

El fondo importa más de lo que parece: los mockups tienen sombras de `0_30px_80px_-20px`, y sobre negro casi puro se pierden. Por eso las variantes de 11% y 13%.

Otras cinco parten del gris neutro y suman un segundo acento —ámbar, violeta, teal, lima o coral— para ver la distinción funcionando sin tener que armarla a mano.

### La pestaña de contraste

Es la que más valor da. Cada par muestra el ratio y su nivel (AAA / AA / ✕), y arriba avisa cuántos fallan. **Mide cada color de texto contra todas las superficies sobre las que aparece**, no solo la principal: es la lección de las dos veces que `--color-low` falló AA —pasaba sobre el fondo de página y fallaba sobre las cards.

Los fondos translúcidos se componen antes de medir: `--color-surface` tiene alfa, así que el contraste real del texto encima depende de lo que haya debajo. Sin componer, el número sería fantasía.

### Lo que hubo que cambiar en el sitio

Tres cosas no seguían los tokens y por eso no respondían al panel:

1. **Los degradés `--grad-brand` y `--glow-violet`** tenían los hex escritos a mano. Ahora se arman con `var(--color-violet-500)` y `color-mix()`, así que siguen la paleta. Es una mejora del sitio, no solo de la herramienta: antes cambiar el acento dejaba los degradés en el color viejo.
2. **El canvas de partículas** lee los colores en JS, y el canvas no hereda variables CSS. Ahora las lee con `getComputedStyle` en cada frame —barato al lado de los 60 arcos que ya pinta— así que el campo acompaña la paleta.
3. **`titulo-hero-texto`** tenía su propio `clamp(2.5rem, 13cqw, 4rem)` y no leía `--text-hero`: el slider escribía un token que nadie usaba. Ahora el techo sale de `--text-hero-max`, así que el hero sigue midiéndose contra su columna (lo que arregló el título cortado) y además responde a la escala.

**Los mockups quedan afuera a propósito.** Tienen su propia paleta clara —el coral de la tienda, el azul corporativo— porque representan sitios de clientes distintos. Si siguieran la paleta del sitio dejarían de leerse como tres pantallas ajenas.

### Los sliders de tipografía escriben un valor plano

Los tokens de tipografía son `clamp(min, fluido, max)`. Reemplazar solo el máximo no funcionaba: el tramo fluido de `--text-h2` (`1.27rem + 3.11vw`) a 1440px ya da 52,8px, así que pisaba cualquier máximo mayor y subir el slider no tenía efecto.

El panel escribe un tamaño plano, que sí responde a cualquier ancho. **El CSS exportado reconstruye el clamp** con el techo nuevo, para que lo que se pegue en el tema conserve la escala fluida.

### Exportar

"Copiar CSS" deja en el portapapeles solo lo que cambió, agrupado en `@theme` y `:root` según corresponda. El bloque también se muestra en la pestaña de contraste, para copiarlo a mano si el navegador niega el permiso de portapapeles.

Se pueden guardar varias combinaciones y alternar entre ellas. **Viven en memoria**: la regla del proyecto prohíbe `localStorage`, así que al recargar se pierden. Para conservar una hay que copiar el CSS.

### Cómo se enciende y se apaga

```bash
# .env.local
NEXT_PUBLIC_LAB=1
```

Sin esa variable el panel no se monta. Es una constante y no una lectura en runtime a propósito: Next la reemplaza literalmente al compilar, el `if` queda en `false` y el tree-shaking **elimina el panel del bundle**. Un flag dinámico lo dejaría dentro aunque nunca se muestre.

Los multiplicadores de las capas de fondo usan `var(--lab-glow, 1)`: apagado, el fallback deja el sitio exactamente como estaba.

`.env.local` está en `.gitignore`, así que **el panel viene apagado por defecto** para cualquiera que clone el repo.

### Verificado

- El fondo repinta: `rgb(12,10,24)` → `rgb(45,10,61)`.
- El violeta arrastra su rampa: `#22c55e` deja el `600` en `#1b9e4b` y el `300` en `#80e2a4`, y el degradé de marca y el glow lo siguen.
- Las capas responden: glow 0,7 → 0,14; grano 0,03 → 0,075; mesh 1 → 0,3.
- El contraste detecta las fallas: bajar `--color-low` a `#5a5470` marca **2 pares que no pasan AA** (2,74 sobre página y 2,41 sobre card).
- Los cinco sliders de tipografía mueven el tamaño real: hero 40px, sección 30px, subtítulo 38px, cuerpo 21px, medidos en el DOM.
- Ocultar y mostrar: el panel colapsa a un círculo de 44×44 y vuelve.
- El reset devuelve todos los tokens a su valor original.

### Cuando se defina la paleta

1. Copiar el CSS y pegarlo en el `@theme` de `globals.css`.
2. Borrar `NEXT_PUBLIC_LAB` de `.env.local` (o ponerlo en `0`).
3. **No borrar el laboratorio**: queda para la próxima vez que haya que revisar contraste o escala. Apagado no pesa nada.
