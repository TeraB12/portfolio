# PULSO — Sistema de diseño del sitio de empresa

> **Concepto:** un instrumento, no un folleto. Negro cálido, un solo dorado, cero curvas.
> Todo lo que es dato, estado, etiqueta o cita va en mono, en caja alta y con el tracking
> abierto: esa es la firma visual de la marca. La única señal de vida es el latido, que
> aparece en tres lugares y siempre significa lo mismo (algo está funcionando): el pulso 3D
> del hero, el trazo del ECG y los puntos verdes de estado.
> **Mensaje en 5 segundos:** "esta empresa no hace demos; opera sistemas que andan."

Sitio de PULSO, empresa de desarrollo de software a medida de Córdoba, para captar empresas
como clientes. La voz es "nosotros"; Mateo Pereyra aparece como fundador y cara visible en
la sección 05.

**POSICIONAMIENTO (regla dura de copy):** lo que se vende son SISTEMAS A MEDIDA, uno por
cliente. Que por dentro varios corran sobre la misma base es un detalle técnico interno, NO
la oferta. PROHIBIDO en texto visible: "SaaS", "multi-tenant", "plataforma multi-tenant",
"licencia", "suscribite". Los clientes se nombran por su nombre: MyA Importaciones, Logiweb
Distribuciones, El Paso del Elefante, Evolux. La voz es SIEMPRE plural. Nada de guiones
largos ni medios. Todo el texto visible vive en `content/data.ts`, sin excepción.

Los textos de esta versión están **cerrados y aprobados por el cliente** (rediseño de
agosto 2026). Se reescribieron varias veces: no tocarlos sin pedido explícito.

---

## 1. Paleta (LOCK, un solo acento, dark único)

| Token CSS | Valor | Uso |
|---|---|---|
| `--bg` | `#0A0A08` | Fondo base. Negro CÁLIDO (base amarronada, jamás azul) |
| `--bg-alt` | `#0C0C0A` | Secciones alternas: Proyectos, Proceso, Cómo está hecho, Contacto |
| `--bg-card` | `#0E0E0C` | Marcos de captura y ficha del fundador |
| `--bg-card-hover` | `#111110` | Hover de celdas y panel del desplegable |
| `--accent` | `#E9B23E` | Dorado de marca. **Único croma cálido** |
| `--signal` | `#5AC98A` | Verde de "en producción" / operativo. **Único croma frío** |
| `--ink` | `#F4F1EA` | Texto principal (blanco cálido, nunca #fff) |
| `--ink-70` | `#B6B1A8` | Párrafos destacados |
| `--ink-60` | `#A5A19A` | Texto secundario |
| `--ink-50` | `#8A857C` | Cuerpo de tarjetas, etiquetas |
| `--ink-45` | `#807C74` | Etiquetas mono, listas técnicas |
| `--ink-35` | `#6B6862` | Placeholders y rótulos de formulario |
| `--hairline` | `rgba(244,241,234,0.11)` | Líneas divisorias estándar |
| `--border` | `rgba(244,241,234,0.18)` | Bordes de botones y tarjetas |

**El acento se toca en un solo lugar.** Todo lo dorado lo usa vía `var(--accent)`, incluido
el pulso 3D, que lo lee con `getComputedStyle`. Si el cliente ajusta el amarillo de marca,
se cambia `--accent` en `:root` y listo.

PROHIBIDO: violeta, verde terminal, gradientes multicolor. Los únicos degradados son el
scrim radial del hero, el halo del contacto y el fundido sobre la foto del fundador.

## 2. Tipografía (dos familias, ninguna más)

```
Archivo        400 500 600 700 800   → títulos y texto corrido
JetBrains Mono 400 500               → etiquetas, estados, datos, citas
```

Ambas por `next/font/google` (self-hosted, sin pedido a Google en runtime).
**Sin serif y sin cursivas en ningún lado.** Se sacaron a pedido del cliente.

Las clases de rol viven en `globals.css` y son la única fuente de los tamaños exactos:

| Clase | Rol | Valor |
|---|---|---|
| `.t-h1` | H1 del hero | `clamp(40px,7.4vw,104px)` / 700 / `-0.045em` / 0.94 |
| `.t-h2` | H2 de sección | `clamp(30px,4.4vw,60px)` / 600 / `-0.045em` / 1.0 |
| `.t-h2-long` | H2 largo (01) | `clamp(30px,4vw,54px)` / 600 / `-0.04em` / 1.04 |
| `.t-h3` | Título de fila | `clamp(22px,2.3vw,32px)` / 600 / `-0.038em` / 1.06 |
| `.t-eyebrow` | Eyebrow numerado | mono 11px / `0.22em` / caja alta / accent |
| `.t-label` | Etiqueta mono | mono 10.5px / `0.18em` / caja alta |
| `.t-chip` | Chip de estado | mono 9px / `0.14em` / caja alta / con borde |
| `.t-quote` | Cita | mono `clamp(13.5px,1.25vw,16px)` / 1.9 |

**Regla de oro:** todo lo que sea dato, estado, etiqueta o cita va en JetBrains Mono
mayúsculas con tracking abierto. Si dudás entre Archivo y mono, fijate si es *información de
sistema*: si lo es, es mono.

## 3. Forma y espacio (LOCK)

- Contenedor: `.shell` = `max-width:1280px` + `padding-inline: clamp(18px,4vw,44px)`
- Header fijo de `70px`, `backdrop-filter: blur(14px)`, fondo `rgba(10,10,8,0.72)`
- Padding vertical de sección: `clamp(72px,9vw,132px)`
- `scroll-margin-top: 88px` en `section[id]`, que espeja el `HEADER_OFFSET` de `lib/scroll.ts`
- **Sin border-radius en ningún lado.** Los únicos círculos son los puntos de estado (5 a
  8px) y el anillo del cursor
- Una sola sombra en todo el sitio: la captura destacada de MyA,
  `0 30px 80px -30px rgba(0,0,0,0.9)`
- Las divisiones se hacen con la **rejilla de 1px** (`.rule-grid`): el contenedor lleva fondo
  hairline y cada celda su fondo opaco, así los gaps quedan como líneas de 1px perfectas.
  Nunca poner borders por celda: se duplican
- Los `minmax()` de las grillas van siempre como `minmax(min(Xpx,100%),1fr)`, si no la grilla
  se desborda en pantallas angostas

## 4. Primitivas compartidas — USARLAS, no reinventar

| Pieza | Dónde | Para qué |
|---|---|---|
| `<Cta>` | `components/ui/Cta.tsx` | **El único botón del sitio.** `solid` / `outline` / `outlineAccent`, con barrido, flecha y magnetismo opcionales |
| `<Choice>` | `components/ui/Choice.tsx` | Desplegable propio (patrón combobox de ARIA) |
| `<Dot>` | `components/ui/Dot.tsx` | Punto de estado que late |
| `<HashLink>` | `components/ui/HashLink.tsx` | Ancla interna que pasa por el scroll unificado |
| `<EcgLine>` | `components/signal/EcgLine.tsx` | El trazo de la marca |
| `<HeroPulse>` | `components/signal/HeroPulse.tsx` | El pulso 3D |
| `.link-ul` | `globals.css` | Subrayado que entra por la izquierda y sale por la derecha |
| `rd(ms)` | `lib/utils.ts` | Retraso de un reveal |

**El `<select>` nativo está prohibido:** en Windows y Android el sistema pinta su propio
panel blanco y no hay CSS que lo cambie. Para eso está `<Choice>`.

## 5. Motion (motivado o no existe)

Un solo easing en todo el sitio: **`cubic-bezier(.16,1,.3,1)`** (`var(--e)` / `ease-site`).

### Entradas por scroll

El estado inicial lo pone **CSS** (por eso no hay flash antes de hidratar) y
`<RevealObserver />` agrega `data-shown` al entrar al viewport. Un solo observer para toda
la página, `threshold: 0.06`, `rootMargin: '0px 0px -7% 0px'`.

| `data-reveal` | Cuándo usarlo | Qué hace |
|---|---|---|
| `mask` | `h1`, `h2`, citas | Se descubre de arriba abajo con clip-path, 1.25s |
| `media` | Bloques con imagen | Aparece con clip + la imagen desescala de 1.14 a 1 |
| `group` | Listas de hermanos | Los hijos entran de a uno, escalón de 90ms (hasta 9) |
| `rise` | Todo lo demás | Sube 24px y se enfoca, 0.95s |

Detalles que importan y ya están resueltos:
- a los 1.5s se agrega `data-clear`, porque un clip-path activo recorta sombras y hovers
- red de seguridad a 4.2s: si el observer no dispara, se revela todo igual
- sin JS, el `<noscript>` del layout anula todos los estados iniciales
- en el hero cada bloque suma 120ms desde 220ms, vía `rd()`

### Scroll y hovers

- Canvas del hero `y * 0.24`, contenido del hero `y * 0.09` y opacidad `1 - y/620`
- Barra de progreso del header, en `<Header>`
- Todo con listener pasivo y un único `requestAnimationFrame` encolado
- Los hovers son **CSS puro** salvo dos: el barrido del botón (tiene que salir por el otro
  lado, y eso no se puede sin JS) y el magnetismo. Ambos viven en `<Cta>`

### Reduced motion

`@media (prefers-reduced-motion: reduce)` anula toda animación y transición, el observer no
hace nada, el pulso 3D no se monta, el cursor no aparece y el parallax no se engancha. El
sitio queda quieto y se lee exactamente igual.

## 6. Las secciones

Header fijo → Hero → 01 Antes de programar → divisor ECG → 02 Qué hacemos → 03 Proyectos →
04 Cómo trabajamos → 05 La empresa → 06 Cómo está hecho → 07 La historia → 08 Contacto →
Footer.

El orden cuenta una historia: diagnóstico, oferta, **prueba**, método, quiénes somos, con qué
está hecho, de dónde venimos, y recién ahí el pedido. Los eyebrows van numerados de 01 a 08;
si se agrega o saca una sección hay que renumerar en `content/data.ts`.

Notas por sección:
- **02 Qué hacemos** no son tarjetas, son las **filas de un índice**. Nunca convertirlas en
  cards: la diferencia de densidad con Proyectos es lo que hace respirar la página
- **03 Proyectos** los cuatro sistemas sin captura viven en la celda "Y también" como lista
  de texto. Cuando haya imagen real, pasan a tarjeta como los otros
- **06 Cómo está hecho** el nombre de la herramienta es el sello chico; el titular es lo que
  cambia en el día del cliente. **Nada de chips de tecnologías**

## 7. Contacto y el formulario

El formulario postea a `/api/presupuesto`, que reenvía al panel de control de Pulso.
La URL del panel va en `PULSO_PANEL_WEBHOOK` (y `PULSO_PANEL_TOKEN` si pide auth). Mientras
la variable no esté, el pedido se acepta igual y queda en el log del server: preferimos eso
antes que darle un error a alguien que quiere contratarnos.

El botón dice **"Enviar"**, no "Enviar por WhatsApp". Las dos vías directas (WhatsApp y mail)
están al lado, sin formulario de por medio.

## 8. Performance y accesibilidad (innegociable)

- Un solo `<h1>`, el del hero
- Todas las capturas con `alt` descriptivo, no decorativo
- Contraste verificado: nada baja de 4.5:1. El texto más chico es 9px y solo en chips de
  estado, en caja alta y con tracking abierto
- Los anclas mueven el **foco** al destino, no solo el scroll (WCAG 2.4.3): `lib/scroll.ts`
- El desplegable sigue el patrón combobox de ARIA y se maneja con flechas y Escape
- El cursor propio NO oculta el nativo: acompaña, así no se pierde el I-beam ni la mano
- `next/image` para las 7 capturas; solo la del caso destacado es `priority`
- three.js entra por import dinámico dentro del efecto: no pesa en el bundle inicial y no
  corre en el server

## 9. Cosas que NO hay que agregar

Se sacaron a pedido del cliente y no deberían volver:

- Marquesina de nombres de clientes pasando en loop
- Fila de contadores animados en el hero
- Tarjetas de servicio con badges tipo "DISPONIBLE"
- Indicador "SCROLL" en el hero
- Chips de tecnologías
- Cualquier tipografía serif o texto en cursiva
- `<select>` nativo
- Testimonios (se eliminaron el 2026-07-29: la prueba la dan los proyectos, con cliente
  real, nombre y captura)
