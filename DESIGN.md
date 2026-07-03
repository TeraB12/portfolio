# PULSO — Sistema de diseño del portfolio de Mateo Valentin Pereyra

> **Concepto:** el sitio no es un portfolio, es un organismo de software vivo. Todo el sitio
> comparte un único reloj cardíaco global (un latido cada ~4.5s) que se propaga por una señal
> continua: nace horizontal en el hero como electrocardiograma y baja como columna vertebral
> (spine) por el margen izquierdo durante las 13 secciones. La telemetría es honesta: uptime
> real de la sesión, hora real de Córdoba, datos reales de TeraB en producción.
> **Mensaje en 5 segundos:** "este desarrollador no hace demos; opera sistemas que respiran."

Design Read: portfolio de desarrollador full-stack para conseguir clientes y trabajo, lenguaje
experimental-premium (Awwwards), en español (Argentina, profesional).
Dials: `DESIGN_VARIANCE: 8 / MOTION_INTENSITY: 7 / VISUAL_DENSITY: 3`.

---

## 1. Paleta (LOCK, un solo acento, tema dark único en TODA la página)

| Token CSS | Valor | Uso |
|---|---|---|
| `--bg` | `#0A0A08` | Fondo global. Negro CÁLIDO (base amarronada, jamás azul) |
| `--surface` | `#141310` | Placas, filas expandidas, inputs |
| `--text` | `#E9E6DD` | Texto principal (blanco hueso, nunca #fff) |
| `--text-dim` | `#A8A49B` | Texto secundario, párrafos de apoyo (pasa AA sobre --bg) |
| `--text-faint` | `#6B675D` | SOLO texto grande (≥18px) o decorativo, no body chico |
| `--accent` | `#FFB454` | ÚNICO croma: ámbar fosfórico (instrumentación, aviónica) |
| `--accent-soft` | `rgba(255,180,84,0.12)` | Halos, anillos de pulso, fills de hover |
| `--hairline` | `rgba(233,230,221,0.08)` | Bordes 1px |

Reglas: PROHIBIDO violeta/púrpura, verde terminal, gradientes multicolor. Los únicos
degradados permitidos son radiales de luz ámbar (glow). El ámbar se raciona: <10% de la
superficie visible. Sombras: ninguna caja con drop-shadow; la elevación se comunica con
hairlines y luz.

## 2. Tipografía (tres voces)

| Voz | Fuente | Variable CSS | Uso |
|---|---|---|---|
| Monumento | Cabinet Grotesk 500/700/800 (local) | `--font-display` → clase `font-display` | Titulares. Tracking -0.03em, uppercase solo en hero/índice |
| Prosa | Satoshi 400/500/700 (local) | `--font-sans` (default en body) | Párrafos, UI |
| Instrumento | IBM Plex Mono 400/500 (Google) | `--font-mono` → clase `font-mono` | SOLO telemetría, timestamps, métricas, labels. 11–13px, uppercase, tracking +0.08em. JAMÁS párrafos |

Escala display: `clamp()` siempre. Hero: `clamp(4.5rem, 11vw, 9.5rem)`. Títulos de sección:
`clamp(2.5rem, 5vw, 4.5rem)` peso 700. Body: 17–18px, `leading-relaxed`, `max-w-[65ch]`.

## 3. Forma y espacio (LOCK)

- **Radio de esquinas: 0 en todo** (instrumentación = aristas vivas). Sin excepciones.
- Bordes 1px `--hairline`. Nada de glassmorphism, nada de blur de fondo en cards.
- Secciones: `py-28 md:py-40`, contenedor `max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20`.
- En desktop (≥lg) el contenido deja un carril izquierdo de ~96px libre para la spine.
- Grano global: overlay SVG turbulence al 3%, `fixed inset-0 pointer-events-none z-[70]`.
- Z-index (documentado, no inventar): contenido 0-10, spine 30, nav 40, cursor 50, preloader 60, grano 70.

## 4. El sistema PULSO (arquitectura del latido)

Un solo reloj para TODO el sitio. Nada late por su cuenta.

- `lib/pulse.tsx` — `PulseProvider` corre UN `requestAnimationFrame` global que:
  - calcula el sobre del latido `--pulse` (0→1 con pico y decaimiento ~900ms) y lo setea en
    `:root` cada frame; también `--pulse-b` (misma señal desfasada medio intervalo).
  - expone `usePulse()` → `{ subscribe(cb), setRate(mult), beat$ }` para componentes canvas.
  - intervalo base 4500ms; `setRate` lo acelera (clímax de contacto: hasta 1200ms).
  - se pausa con `document.hidden`; con `prefers-reduced-motion` NO hay loop: `--pulse: 0.5`
    fijo y todo queda estático y elegante.
- Cualquier elemento que "vive" usa CSS con `var(--pulse)`:
  `opacity: calc(0.45 + 0.55 * var(--pulse))` o `transform: scale(calc(1 + 0.02 * var(--pulse)))`.
  Variar entre `--pulse` y `--pulse-b` para que no lata todo al unísono.
- `components/signal/SpineRail.tsx` — carril fijo izquierdo (desktop ≥lg): línea vertical 1.5px
  ámbar en x≈48px, un glow que la recorre con cada latido, y **waypoints**: un nodo por sección
  (posiciones distribuidas), el actual encendido; hover muestra el nombre en mono; click
  scrollea (es el indicador de scroll Y la navegación). En mobile: barra de 2px al edge
  izquierdo con pulso de opacidad por CSS, sin canvas.
- El hero tiene su propio canvas horizontal (ECG). Handoff: al scrollear el primer 100vh el ECG
  se desvanece y la spine se enciende con un latido (crossfade coreografiado, no morphing).

## 5. Primitivas compartidas (components/ui/) — USARLAS, no reinventar

- `Section` — `<Section id spine?>`: wrapper con padding estándar, carril izquierdo, y ping de
  órgano al entrar al viewport (anillo ámbar que se expande desde la spine, una vez).
- `SectionTitle` — título display con reveal por máscara (`clip-path` rise). Prop `eyebrow?`
  SOLO mono-label; **máx 4 eyebrows en todo el sitio** (presupuesto: Hero-telemetría,
  Proyectos, Casos de éxito, Contacto). Las demás secciones: título pelado.
- `Reveal` — `whileInView` una vez: `y: 24→0, opacity 0→1, blur 8→0`, ease `[0.16,1,0.3,1]`,
  respeta reduced-motion. Prop `delay`.
- `Button` — rectangular sharp. Primario: bg ámbar / texto `#0A0A08` peso 500 (contraste AAA);
  secundario: hairline + texto hueso, hover fill `--accent-soft`. `:active` baja 1px
  ("golpe de matriz"). Label máx 3 palabras, jamás wrappea.
- `MonoLabel` — etiqueta mono 11px uppercase tracking wide. Racionada (ver eyebrows).
- `Field`, `SelectField`, `TextArea` — inputs sharp sobre `--surface`, label ARRIBA (Satoshi 500
  14px), focus ring ámbar 1px + glow suave, error inline abajo en ámbar 13px. Placeholder
  `--text-faint` pero label siempre visible (nunca placeholder-como-label).

## 6. Motion (motivado o no existe)

- Easing global: `[0.16, 1, 0.3, 1]`. Springs: `stiffness 100, damping 20`.
- Animar SOLO `transform` y `opacity`. PROHIBIDO `window.addEventListener('scroll')`:
  usar `useScroll` de motion, ScrollTrigger de GSAP o IntersectionObserver.
- GSAP SOLO en: Proyectos (pin de paneles) y Timeline (scrub del latido). Todo lo demás:
  `motion/react` (import desde `"motion/react"`). Jamás mezclar GSAP y motion sobre el MISMO nodo.
- Todo `useEffect` con animación limpia al desmontar (`ctx.revert()` en GSAP).
- `useReducedMotion()` en cada componente animado: degradar a estático nítido.

## 7. Copy y contenido

- TODO el texto vive en `content/data.ts`. Los componentes NO hardcodean copy.
- Español argentino profesional (voseo suave, sin lunfardo). Sin palabras de relleno
  ("revolucionar", "elevar", "seamless"). Concreto y verificable.
- **PROHIBIDO el guion largo (—) y el guion medio (–) en todo texto visible.** Usar coma,
  punto o dos puntos. Rangos con guion común (2024-2026).
- Punto medio `·` máximo 1 por línea, solo en strips de telemetría mono.
- Números reales solamente (2.300+ productos de MyA, 6 integraciones, etc.). Nada inventado.
- Sin numeración de secciones ("01 / TRABAJO" prohibido). Sin "scroll para explorar".
- Testimonios: NO inventar. Tratamiento "ZONA SIN RELEVAR": achurado diagonal sutil + texto
  honesto ("Los primeros clientes están operando; sus palabras van a aparecer acá.").

## 8. Las 13 secciones (familia de layout + motion motivado)

| # | Sección | Archivo | Layout (familia única) | Motion |
|---|---|---|---|---|
| 1 | Hero | `Hero.tsx` + `HeroSignal.tsx` | Editorial monumental asimétrico: nombre gigante arriba-izq, ECG horizontal al 62%, telemetría mono arriba-der | Boot: línea se dibuja → primer latido enciende el nombre letra por letra (rise+blur). Línea se curva hacia el cursor (spring, ±12px) |
| 2 | Sobre mí | `About.tsx` | Split asimétrico 7/5, texto dominante; retrato/monograma duotono ámbar anclado a la spine con conector 1px | Párrafos revelados por línea con máscara; una única pasada de scanline sobre el retrato (una vez) |
| 3 | Experiencia | `Experience.tsx` | Tabla tipográfica editorial full-width, filas con año en mono al margen, acordeón. SIN cards | Al expandir, la spine emite un pulso lateral hacia la fila (feedback) |
| 4 | Skills | `Skills.tsx` | Constelación SVG de nodos agrupados (Frontend/Backend/Integraciones/Infra), conectados con líneas 1px. Peso tipográfico del label = dominio real (injerto PLOMO). SIN barras ni % | Nodos respiran con `--pulse`/`--pulse-b`; hover ilumina la cadena real de dependencias (Prisma enciende PostgreSQL y NestJS) |
| 5 | Stack | `Stack.tsx` | Banda horizontal full-bleed tipo bahía de racks: módulos rectangulares, nombre mono, LED. Scroll-snap horizontal contenido en la franja | Boot sequence: LEDs encienden en secuencia al entrar; después laten con el reloj global en offsets |
| 6 | Proyectos | `Projects.tsx` | Paneles caso-estudio apilados con pin GSAP; TeraB dominante: esquema SVG del sistema (módulos reales conectados) en marco de instrumento con ticks, anillo de specs mono alrededor (POS · AFIP · MP · ML · ANDROID · IA), callouts conectados por la señal | Pin + los callouts se encienden en secuencia según progreso del scroll (recorrido guiado) |
| 7 | Timeline | `Timeline.tsx` | La línea pasa AL CENTRO: hitos alternados izq/der como eventos de log con timestamp mono; cada hito es un spike congelado | Scrub ScrollTrigger: el latido viaja por la línea y enciende cada hito al llegar |
| 8 | Servicios | `Services.tsx` | Grid asimétrico 2×2 desigual (celda "Sistemas para comercios" dominante), bordes hairline, sin sombras | Hover: contenido sube 4px + tick mono de confirmación |
| 9 | Tecnologías favoritas | `FavoriteTech.tsx` | Índice tipográfico gigante: palabras enormes en outline que se llenan de ámbar al hover; panel lateral fijo mono con el porqué honesto. Foco: fila activa 100%, resto 40% (injerto APERTURA) | Fill con clip-path al hover + crossfade del panel |
| 10 | Casos de éxito | `CaseStudies.tsx` | Dossier documental: cabecera mono "EN PRODUCCIÓN · MYA IMPORTACIONES", 3 columnas de datos duros, cita del flujo real | Números cuentan desde 0 UNA vez al entrar, disparados por el latido |
| 11 | Testimonios | `Testimonials.tsx` | Cita monumental única centrada (Cabinet 500 grande). Placeholder honesto "ZONA SIN RELEVAR" con achurado diagonal | Transición por blur + 12px de desplazamiento |
| 12 | Contacto | `Contact.tsx` | **El cotizador**: título grande + form en 2 columnas (campos izq, contexto der), CTA "Enviar por WhatsApp". La señal se aplana detrás | El latido se acelera con cada campo completado (setRate); submit = golpe de matriz + abre wa.me |
| 13 | Footer | `Footer.tsx` | Barra de estado full-width mono: © 2026, Córdoba AR, uptime de sesión, hora local, colofón de imprenta ("Compuesto en Cabinet Grotesk y Satoshi. Corriendo en Next.js. Córdoba, 2026."), link "volver arriba". La señal termina en un punto que late para siempre | El punto final late con el reloj global |

Familias usadas: editorial-monumental, split-asimétrico, tabla-editorial, constelación-SVG,
banda-racks, paneles-pin, timeline-central, grid-asimétrico, índice-tipográfico, dossier,
cita-monumental, form-2col, status-bar → 13 layouts, cero repetición.

## 9. Contacto: el cotizador (requisito del cliente)

Form: nombre*, email*, tipo de desarrollo* (select: Sistema para comercio (POS + stock +
facturación) / Tienda online / Web institucional / App o sistema a medida / Integración o
automatización / Otro), "Contame de tu comercio o proyecto"* (textarea), "Ideas o contexto
extra" (textarea opcional). Validación inline en español. Al enviar:

```
https://wa.me/5493515946404?text=<encodeURIComponent(mensaje estructurado)>
```

Mensaje (armado en `lib/wa.ts`): saludo, nombre, email, tipo, descripción, ideas, cierre.
`window.open(..., "_blank", "noopener")`. Sin backend. Mostrar también mail y WhatsApp directos.

## 10. Performance y accesibilidad (innegociable)

- Un solo rAF global (el de PulseProvider). Canvas acotados (hero + carril de 96px).
- `next/font/local` para Cabinet/Satoshi, `next/font/google` para IBM Plex Mono.
- Lazy: GSAP se importa solo en los componentes que lo usan (client leafs).
- Lenis en un provider client; se desactiva con reduced-motion.
- Focus visible SIEMPRE (ring ámbar). Navegación completa por teclado. `aria-label` en
  waypoints e iconos. Contraste AA mínimo en todo texto (AAA en body).
- El cursor custom se desactiva en `pointer: coarse` y con reduced-motion (vuelve el nativo).
- Mobile: spine → barra 2px; constelación → lista agrupada con dots latientes; racks → scroll
  táctil natural; paneles pin → apilado normal sin pin; ECG → línea al 70% sin cursor-spring.
