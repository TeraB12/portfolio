// ============================================================================
// PULSO · Contenido central del sitio de empresa
// TODO el texto visible del sitio vive acá. Los componentes no hardcodean copy.
//
// ENFOQUE: Pulso es una empresa de desarrollo de software a medida. El público
// son empresas y comercios que necesitan resolver, automatizar y ordenar sus
// procesos. El copy habla de lo que la empresa del cliente gana, no de
// tecnicismos. La voz es "nosotros": es una empresa, no una persona.
// Mateo Pereyra queda como fundador y cara visible (sección Empresa), porque
// conocer a quién está atrás baja el miedo a contratar.
//
// REGLA DE POSICIONAMIENTO: lo que vendemos son SISTEMAS A MEDIDA, uno por
// cliente. Que por dentro varios corran sobre la misma base es un detalle
// técnico nuestro, no la oferta. PROHIBIDO en texto visible: "SaaS",
// "multi-tenant", "plataforma multi-tenant", "licencia", "suscribite".
// Los clientes se nombran por su nombre (MyA, Logiweb, El Paso del Elefante).
//
// Regla dura: nada de guiones largos ni medios en texto visible.
//
// Estos textos vienen cerrados y aprobados por el cliente (rediseño 2026-08).
// Se reescribieron varias veces: no tocar sin pedido explícito.
// ============================================================================

export const COMPANY = {
  name: "Pulso",
  wordmark: "PULSO",
  descriptor: "Software a medida",
  location: "Córdoba, Argentina",
  email: "mateovpereyra@gmail.com",
  phoneDisplay: "+54 9 351 203 7813",
  whatsappNumber: "5493512037813",
  github: "https://github.com/TeraB12",
} as const;

export const NAV = {
  links: [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "Empresa", href: "#empresa" },
  ],
  cta: { label: "Presupuesto", href: "#contacto" },
} as const;

// ============================================================================
// HERO
// ============================================================================
export const HERO = {
  eyebrow: "Córdoba, Argentina · desde 2022",
  titleTop: ["Tu empresa ya sabe", "cómo trabaja."],
  titleBottom: "Nosotros hacemos el sistema que la sigue.",
  intro:
    "Hacemos sistemas de gestión, tiendas online y automatizaciones para empresas que ya tienen una forma de trabajar y no quieren cambiarla por culpa de un programa. Primero entendemos cómo se mueve tu operación. Recién ahí desarrollamos el sistema.",
  ctaPrimary: { label: "Pedir presupuesto", href: "#contacto" },
  ctaSecondary: { label: "Ver sistemas funcionando", href: "#proyectos" },
} as const;

// ============================================================================
// 01 · ANTES DE PROGRAMAR
// ============================================================================
export const PROBLEM = {
  eyebrow: "01 — Antes de programar",
  title:
    "Casi nadie nos llama porque el sistema anda mal. Nos llaman por todo lo que hay que hacer a mano alrededor.",
  quote:
    "Planillas que actualiza una sola persona. Y si esa persona falta, el mes no cierra.",
  rows: [
    {
      k: "A",
      title: "Lo enlatado te obliga a cambiar de método",
      detail:
        "Pagás la licencia y después acomodás la operación a lo que el programa deja hacer. Termina siempre igual: media empresa adentro del sistema y la otra media en Excel.",
    },
    {
      k: "B",
      title: "Nada habla con nada",
      detail:
        "La tienda por un lado, la facturación por otro, Mercado Libre aparte. La misma venta se carga tres veces y alguna de las tres queda mal.",
    },
    {
      k: "C",
      title: "El sistema queda a medio hacer",
      detail:
        "Es la queja que más escuchamos: alguien lo armó, cobró y no volvió. Nosotros seguimos atendiendo el sistema después de entregarlo, y eso ya está incluido en el abono.",
    },
  ],
} as const;

// ============================================================================
// 02 · QUÉ HACEMOS. No son tarjetas: son las filas de un índice.
// ============================================================================
export const SERVICES = {
  eyebrow: "02 — Qué hacemos",
  title: "Cuatro formas de sacarte trabajo de encima",
  items: [
    {
      n: "01",
      name: "Sistemas de gestión a medida",
      spec: "Ventas · Caja · Stock · Compras · Cuentas corrientes · Permisos por puesto",
      detail:
        "No hay dos iguales. Nos sentamos a ver cómo se mueve tu empresa y desarrollamos las pantallas y los circuitos que esa operación pide. Si tu manera de facturar, de armar un pedido o de controlar el depósito no se parece a la de nadie, eso es exactamente lo que programamos.",
    },
    {
      n: "02",
      name: "Automatización con IA",
      spec: "Asistentes · Avisos · Seguimientos · Carga automática",
      detail:
        "Carga de datos, avisos, seguimientos y respuestas que hoy hace alguien a mano. Un asistente puede contestar con tu catálogo y tu stock del momento, y pasarle la charla al vendedor cuando la venta avanza.",
    },
    {
      n: "03",
      name: "Tiendas y webs a medida",
      spec: "Dominio propio · Cobros · Envíos · Google",
      detail:
        "Tienda online o web institucional, con dominio propio y diseño hecho para vos. Cobros y envíos ya conectados, y armada para que Google la encuentre.",
    },
    {
      n: "04",
      name: "Integraciones",
      spec: "AFIP · Mercado Pago · Mercado Libre · WhatsApp",
      detail:
        "Conectamos lo que ya estás usando, y lo que haga falta más adelante. La idea es simple: que cada dato se cargue una sola vez y aparezca en todos lados.",
    },
  ],
} as const;

// ============================================================================
// 03 · PROYECTOS
// Las capturas viven en public/previews. Los proyectos sin captura caen a la
// celda de texto "Y también"; cuando haya imagen real pasan a ser tarjeta.
// ============================================================================
export const PROJECTS = {
  eyebrow: "03 — Proyectos",
  title: "Ninguna de estas pantallas es una maqueta",
  intro:
    "Son capturas de sistemas que están andando. Donde hay link, entrá y miralo vos.",

  featured: {
    status: "En producción · caso principal",
    name: "MyA Importaciones",
    domain: "myaimportaciones.com.ar",
    description:
      "Un mayorista que hace todo el día sobre el sistema. Vende en el mostrador, vende online con dominio propio, tiene más de 2.300 productos con fotos y variantes, y la factura sale sola al cerrar la venta.",
    bullets: [
      "Mostrador, online y mayorista sobre la misma base",
      "Cobro, envío y factura sin salir de la venta",
      "Cuatro revendedores con su propio catálogo publicado",
    ],
    shot: "/previews/mya.webp",
    shotAlt:
      "Tienda online de MyA Importaciones con su buscador, categorías y promociones",
    url: "https://myaimportaciones.com.ar",
    urlLabel: "Verlo en vivo",
  },

  cards: [
    {
      id: "panel",
      name: "Sistema de gestión interno",
      // OJO: no es un sistema que se le venda a un cliente. Es la consola
      // INTERNA de Pulso. Va en el sitio porque explica por qué el soporte
      // es rápido, no como producto.
      chips: ["interno", "soporte"],
      status: { label: "en producción", tone: "signal" },
      shot: "/previews/panel.webp",
      shotAlt:
        "Centro de control interno de Pulso con clientes, cobros, tickets y calendario",
      description:
        "Con esto manejamos Pulso. Cada cliente, sus proyectos, los pedidos de soporte y los cobros están en la misma pantalla, y los sistemas que tenemos andando le mandan señal. Casi siempre vemos el problema antes de que el cliente escriba.",
      url: null,
      urlLabel: null,
    },
    {
      id: "meli",
      name: "Sistema automático Meli",
      chips: ["mercado libre", "varias cuentas"],
      status: { label: "en producción", tone: "signal" },
      shot: "/previews/meli.webp",
      shotAlt:
        "Panel de reportes del sistema Meli con ingresos, ganancia y margen por empresa",
      description:
        "Una empresa que vende en Mercado Libre con varias cuentas y antes tenía que entrar a una por una. Le armamos la pantalla donde las ve todas juntas, con ingreso, ganancia y margen ya calculados y cada firma separada de la otra.",
      url: null,
      urlLabel: null,
    },
    {
      id: "catalogos",
      name: "Catálogos automáticos",
      chips: ["automático", "marca propia"],
      status: { label: "en producción", tone: "signal" },
      shot: "/previews/catalogos.webp",
      shotAlt:
        "Cuatro catálogos de revendedores reales con su logo, nombre y surtido",
      description:
        "MyA quería que cada revendedor tuviera su propio catálogo online. Lo da de alta y el catálogo se publica solo, con su dominio, su logo y sus precios, tomando el stock desde el sistema de MyA. Hoy hay cuatro andando.",
      url: "https://logiweb.catalogocba.com.ar",
      urlLabel: "Ver un catálogo",
    },
    {
      id: "elefante",
      name: "El Paso del Elefante",
      chips: ["depósito", "pesos y dólares"],
      status: { label: "en desarrollo", tone: "accent" },
      shot: "/previews/elefante.webp",
      shotAlt:
        "Panel a medida de El Paso del Elefante con tareas, depósito y listas de precios",
      description:
        "Acá el pedido era otro: control de depósito por rack y posición, tareas con cronómetro para saber cuánto lleva cada trabajo, y cuenta corriente en pesos y en dólares.",
      url: null,
      urlLabel: null,
    },
    {
      id: "evolux",
      name: "Evolux",
      chips: ["web institucional", "captación"],
      status: { label: "en producción", tone: "signal" },
      shot: "/previews/evolux.webp",
      shotAlt:
        "Web institucional de Evolux, agencia especialista en Mercado Libre",
      description:
        "Una agencia que escala marcas dentro de Mercado Libre. Les diseñamos y programamos la web desde cero, pensada para que les escriban y no solo para mostrar lo que hacen.",
      url: "https://evolux-rouge.vercel.app",
      urlLabel: "Verla en vivo",
    },
  ],

  // Los cuatro que todavía no tienen captura.
  alsoLabel: "Y también",
  also: [
    {
      n: "06",
      name: "Logiweb Distribuciones",
      detail:
        "Una distribuidora con necesidades muy suyas: importar la lista de precios del proveedor, emitir remitos, exportarlos a PDF y vender por medio pack. Todo eso lo desarrollamos porque ellos lo pidieron.",
    },
    {
      n: "07",
      name: "Asistente con IA",
      detail:
        "Lo desarrollamos para la tienda de un cliente: un chat que contesta con su catálogo de verdad, stock, colores, talles y precio del momento. Si no hay, lo dice, y le pasa la charla al WhatsApp del vendedor.",
    },
    {
      n: "08",
      name: "App para el celular",
      detail:
        "La administración del sistema, también en el celular. Escanea códigos con la cámara para cargar stock y vender, y le avisa al dueño apenas entra un pedido.",
    },
    {
      n: "09",
      name: "Sneakers Hub",
      detail:
        "Una tienda que levantamos y rehicimos varias veces: cuentas, roles, carrito, stock y tickets. Fue el banco de pruebas de lo que después entró a los sistemas de clientes.",
    },
  ],
} as const;

// ============================================================================
// 04 · CÓMO TRABAJAMOS
// ============================================================================
export const PROCESS = {
  eyebrow: "04 — Cómo trabajamos",
  title: "Contratar software no tendría que dar miedo",
  intro:
    "Así es trabajar con nosotros, desde la primera charla hasta que el sistema está andando.",
  steps: [
    {
      n: "PASO 01",
      title: "Miramos tu operación",
      detail:
        "Nos contás qué hace la empresa y cómo trabajan hoy. No hace falta que sepas nada técnico. De ahí sacamos dónde se está yendo el tiempo y qué conviene automatizar primero.",
    },
    {
      n: "PASO 02",
      title: "Te pasamos la propuesta",
      detail:
        "No tenemos precio de lista porque no hay dos sistemas iguales. Te mandamos un presupuesto por escrito, con qué incluye y cuánto tarda, antes de tocar nada.",
    },
    {
      n: "PASO 03",
      title: "Lo construimos por etapas",
      detail:
        "Vamos por etapas cortas y al final de cada una ves algo funcionando, no un informe. Si hay que cambiar el rumbo, se cambia ahí.",
    },
    {
      n: "PASO 04",
      title: "Lo dejamos andando",
      detail:
        "Entregamos andando y capacitamos a tu gente. El sistema queda siendo tuyo. Después hay un abono mensual que cubre el hosting, el mantenimiento y las mejoras que vayan saliendo.",
    },
  ],
  closer:
    "La primera charla no se cobra y no te compromete a nada. Escribinos y arrancamos por ahí.",
  closerCta: { label: "Pedir presupuesto", href: "#contacto" },
} as const;

// ============================================================================
// 05 · LA EMPRESA
// ============================================================================
export const COMPANY_SECTION = {
  eyebrow: "05 — La empresa",
  titleTop: "Somos Pulso.",
  titleBottom: "Software a medida, desde Córdoba.",
  paragraphs: [
    "Lo que resolvemos es concreto: que la información de tu empresa deje de estar repartida entre planillas, cuadernos y tres programas que no se hablan. Cuando el circuito queda armado, el equipo deja de cargar lo mismo dos veces, el stock se mira en un solo lugar y el cierre de mes deja de depender de que alguien se acuerde.",
    "Somos un equipo chico y eso se nota en el trato: hablás con quien programa, no con un intermediario. Desarrolladores certificados, entregas por etapas cortas y una decisión que no negociamos: quedarnos después de la entrega, midiendo cómo rinde el sistema y mejorándolo a medida que la empresa crece.",
  ],
  ficha: [
    { k: "Base", v: "Córdoba, AR" },
    { k: "Trabajo", v: "Todo a medida" },
    { k: "Equipo", v: "Certificado" },
    { k: "Agenda", v: "Abierta", live: true },
  ],
} as const;

export const FOUNDER = {
  label: "Fundador",
  name: "Mateo Valentín Pereyra",
  role: "CEO y director de desarrollo",
  photo: "/mateo.jpeg",
  photoAlt:
    "Retrato de Mateo Valentín Pereyra, CEO y director de desarrollo de Pulso",
  bio: [
    "Me encargo del análisis de cada operación, de la arquitectura con la que se va a construir y de que el sistema aguante cuando la empresa crezca. Después superviso el desarrollo del equipo y reviso lo que sale antes de que llegue al cliente.",
    "Estoy terminando la Diplomatura en Desarrollo de Software, a pocas materias de recibirme, y llevo doce certificaciones, de arquitectura y rendimiento a calidad y ciberseguridad. A la reunión con tu empresa voy yo, no un vendedor.",
  ],
  quote:
    "Nadie conoce el negocio mejor que el que lo atiende todos los días. Mi trabajo es traducir eso a un sistema.",
} as const;

// ============================================================================
// 06 · CÓMO ESTÁ HECHO
// La herramienta es el sello chico; el titular es lo que cambia en tu día.
// Nada de chips de tecnologías.
// ============================================================================
export const TECH = {
  eyebrow: "06 — Cómo está hecho",
  title: "Con qué está hecho, sin vueltas",
  intro:
    "Los nombres no le importan a nadie. Lo que sigue es lo que cada uno cambia en tu día.",
  items: [
    {
      tool: "con Next.js",
      title: "Carga al instante",
      detail:
        "La tienda abre rápido hasta en un teléfono viejo. El que no espera, compra.",
    },
    {
      tool: "con TypeScript",
      title: "Nada se rompe",
      detail:
        "Los errores aparecen antes de publicar, no cuando tu cliente ya está comprando.",
    },
    {
      tool: "con NestJS",
      title: "Crece con vos",
      detail:
        "Está ordenado por dentro, así sumar una función más adelante no rompe otras tres.",
    },
    {
      tool: "con PostgreSQL",
      title: "Tus datos a salvo",
      detail:
        "Las ventas, los clientes y el stock quedan guardados como corresponde. Nada se traspapela.",
    },
    {
      tool: "con Prisma",
      title: "Se adapta",
      detail:
        "Cuando el negocio cambia, cambiar cómo se guardan los datos deja de ser un drama.",
    },
    {
      tool: "con Redis",
      title: "Aguanta el pico",
      detail:
        "Mucha gente comprando al mismo tiempo sin que se ponga lento. Un día de oferta no lo tumba.",
    },
  ],
  full: "Lo demás, para el que quiera saberlo: React, Next.js, TypeScript y Tailwind del lado que se ve; Node, NestJS, Prisma, PostgreSQL y Redis del lado que no; Capacitor para la app del celular; Railway, Vercel, Cloudflare y Docker para que esté siempre en línea.",
} as const;

// ============================================================================
// 07 · LA HISTORIA
// ============================================================================
export const HISTORY = {
  eyebrow: "07 — La historia",
  title: "Cómo llegamos hasta acá",
  events: [
    {
      stamp: "2022",
      tone: "dim",
      title: "El primer cliente",
      detail:
        "La web de un servidor de rol, hecha a mano y entregada en fecha. De ese trabajo salió la única regla que seguimos usando: escuchar antes de escribir código.",
    },
    {
      stamp: "2023",
      tone: "dim",
      title: "Llegan por recomendación",
      detail:
        "Dos servidores de rol más nos buscan por el trabajo del año anterior, y son los primeros proyectos con integraciones: compra directa con Mercado Pago dentro de la tienda. Llega también la primera certificación en desarrollo.",
    },
    {
      stamp: "2024",
      tone: "dim",
      title: "Arranca la diplomatura",
      detail:
        "Empieza la Diplomatura en Desarrollo de Software, que se cursa en paralelo a los proyectos y sigue durante los tres años siguientes. Arquitectura, rendimiento, calidad y seguridad dejan de aprenderse sobre la marcha.",
    },
    {
      stamp: "2025",
      tone: "dim",
      title: "El primer sistema de gestión",
      detail:
        "Arranca el sistema completo con el que una empresa vende, cobra y factura, pensado para ella desde el primer día. La formación sigue en paralelo: cada cosa que se estudia entra directo en el proyecto.",
    },
    {
      stamp: "2025—2026",
      tone: "dim",
      title: "51 etapas de desarrollo",
      detail:
        "Ventas, tienda, punto de venta, cobros y facturación. Cada pieza probada antes de que la usara alguien de verdad.",
    },
    {
      stamp: "JUN 2026",
      tone: "accent",
      title: "La primera empresa vendiendo",
      detail:
        "Migramos todo su sistema anterior sin perder un solo dato. Cargan el catálogo entero, capacitamos al equipo y pasan a trabajar sobre el sistema nuevo.",
    },
    {
      stamp: "2026",
      tone: "dim",
      title: "Más empresas, más a medida",
      detail:
        "Se suman Logiweb con sus funciones propias, El Paso del Elefante con su depósito y Evolux con su web.",
    },
    {
      stamp: "HOY",
      tone: "live",
      title: "Pulso, como empresa",
      detail:
        "Lo que era trabajo de a uno pasa a ser una empresa, con equipo certificado y varios proyectos en paralelo.",
    },
  ],
} as const;

// ============================================================================
// 08 · CONTACTO
// El formulario se manda al panel de control de Pulso (POST /api/presupuesto).
// ============================================================================
export const CONTACT = {
  eyebrow: "08 — Contacto",
  titleLines: ["Contanos qué", "necesita tu empresa"],
  intro:
    "Escribinos y te contestamos con algo concreto. El presupuesto no se cobra: primero miramos tu operación y después hablamos de números.",
  direct: [
    {
      k: "WhatsApp directo",
      v: COMPANY.phoneDisplay,
      href: `https://wa.me/${COMPANY.whatsappNumber}`,
      external: true,
    },
    {
      k: "Email",
      v: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
      external: false,
    },
  ],
  formNote: "Nos llega directo al panel y te respondemos el mismo día",
  fields: {
    nombre: { label: "Tu nombre", placeholder: "Nombre y apellido" },
    // El único dato de contacto que pide el formulario, y por eso es
    // obligatorio: la respuesta sale por mail desde el panel de control.
    email: { label: "Tu email", placeholder: "nombre@correo.com" },
    empresa: { label: "Tu empresa", placeholder: "Nombre del comercio o empresa" },
    tipo: { label: "Qué necesitás", placeholder: "Elegí una opción" },
    mensaje: {
      label: "Contanos de tu operación",
      placeholder:
        "Qué hace tu empresa, cómo trabajan hoy y qué te está costando más",
    },
  },
  tipoOptions: [
    "Un sistema de gestión a medida",
    "Automatizar tareas con IA",
    "Una tienda online o web",
    "Integraciones (AFIP, Mercado Pago, Meli)",
    "Todavía no lo tengo claro",
  ],
  submitLabel: "Enviar",
  sendingLabel: "Enviando",
  sentLabel: "Recibido. Te escribimos hoy mismo.",
  errorLabel:
    "No pudimos enviarlo. Probá de nuevo o escribinos por WhatsApp.",
  errors: {
    nombre: "Decinos tu nombre así sabemos con quién hablamos.",
    email: "Dejanos un email, que es por donde te contestamos.",
    tipo: "Elegí qué es lo que estás buscando.",
    mensaje: "Contanos aunque sea en dos líneas de qué se trata.",
  },
} as const;

// ============================================================================
// FOOTER
// ============================================================================
export const FOOTER = {
  tagline: "Software a medida · Córdoba, Argentina",
  columns: [
    {
      title: "Secciones",
      links: [
        { label: "Proyectos", href: "#proyectos", external: false },
        { label: "Servicios", href: "#servicios", external: false },
        { label: "Proceso", href: "#proceso", external: false },
        { label: "Empresa", href: "#empresa", external: false },
      ],
    },
    {
      title: "Contacto",
      links: [
        {
          label: "WhatsApp",
          href: `https://wa.me/${COMPANY.whatsappNumber}`,
          external: true,
        },
        { label: "Email", href: `mailto:${COMPANY.email}`, external: false },
        { label: "GitHub", href: COMPANY.github, external: true },
      ],
    },
  ],
  rights: `© 2026 ${COMPANY.name}`,
  status: "Sistemas operativos",
  backToTop: "Volver arriba ↑",
} as const;

export const SEO = {
  title: "Pulso · Software a medida para empresas | Córdoba, Argentina",
  description:
    "Empresa de desarrollo de software a medida en Córdoba. Sistemas de gestión, automatización con IA, tiendas online e integraciones con AFIP, Mercado Pago y Mercado Libre. Resolvemos, automatizamos y optimizamos los procesos de tu empresa. Pedí tu presupuesto.",
  url: "https://pulsosoftware.com",
  locale: "es_AR",

  // Lo que se dibuja en la tarjeta cuando alguien pega el link en WhatsApp,
  // LinkedIn o X. La imagen se genera en app/opengraph-image.tsx.
  ogImageAlt:
    "Pulso, software a medida para empresas. Córdoba, Argentina.",

  // ---------------------------------------------------------------------------
  // Lo que sigue NO se ve en pantalla: es lo que se le declara al buscador en
  // el JSON-LD (lib/jsonLd.ts) sobre a qué se dedica Pulso y dónde trabaja.
  // Es la parte que hace que Google entienda el rubro, no solo las palabras.
  // ---------------------------------------------------------------------------
  foundingYear: "2022",

  // Dónde se atiende. La ciudad primero, después la provincia y el país.
  areaServed: ["Córdoba", "Provincia de Córdoba", "Argentina"],

  // El rubro, en los términos con los que la gente lo busca. Solo cosas que
  // Pulso realmente hace: si algo no está en SERVICES o en PROJECTS, no va acá.
  knowsAbout: [
    "Desarrollo de software a medida",
    "Sistemas de gestión a medida",
    "Software de gestión para empresas",
    "Sistema de stock y depósito",
    "Sistema de facturación electrónica",
    "Punto de venta",
    "Cuentas corrientes",
    "Automatización de procesos",
    "Automatización con inteligencia artificial",
    "Tiendas online a medida",
    "Desarrollo web a medida",
    "Integración con AFIP",
    "Integración con Mercado Pago",
    "Integración con Mercado Libre",
    "Integración con WhatsApp",
    "Aplicaciones móviles",
    "Software para pymes",
    "Migración de sistemas",
  ],
} as const;
