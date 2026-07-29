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
// La jerga de programación sobrevive solo como "sello de respaldo" (chico) en
// las secciones donde aporta confianza (Herramientas, Lo que dominamos, Por qué).
// Se conserva el lenguaje de marca PULSO (señal, latido, operativo, telemetría).
//
// Regla dura: nada de guiones largos ni medios en texto visible.
// ============================================================================

export const COMPANY = {
  name: "Pulso",
  // lockup monumental del hero: dos líneas
  wordmarkTop: "PULSO",
  wordmarkBottom: "SOFTWARE",
  descriptor: "Software a medida",
  tagline: "Desarrollo de software a medida y automatización con IA",
  location: "Córdoba, Argentina",
  locationShort: "CBA · AR",
  email: "mateovpereyra@gmail.com",
  phoneDisplay: "+54 9 351 203 7813",
  whatsappNumber: "5493512037813",
  github: "https://github.com/TeraB12",
  // el hero resalta en negrita la frase "a medida" (ver Hero.tsx · <Keyword>)
  heroTagline: "Desarrollamos software a medida para tu empresa.",
  heroSubline:
    "Sistemas que resuelven, automatizan y ordenan los procesos de tu negocio, hechos para tu forma de trabajar. Hoy hay empresas reales operando y facturando con nuestros sistemas, todos los días.",
} as const;

export const HERO = {
  ctaPrimary: "Pedí tu presupuesto",
  ctaSecondary: "Ver proyectos",
} as const;

export const NAV = {
  links: [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Empresa", href: "#empresa" },
    { label: "Presupuesto", href: "#contacto" },
  ],
  statusLabel: "OPERATIVO",
} as const;

// Waypoints de la spine (indicador de scroll + navegación por anclas).
// El orden DEBE coincidir con el de las secciones en app/page.tsx.
export const WAYPOINTS = [
  { id: "inicio", label: "INICIO" },
  { id: "proyectos", label: "PROYECTOS" },
  { id: "servicios", label: "SERVICIOS" },
  { id: "proceso", label: "CÓMO TRABAJAMOS" },
  { id: "casos", label: "CASOS" },
  { id: "empresa", label: "LA EMPRESA" },
  { id: "skills", label: "LO QUE DOMINAMOS" },
  { id: "stack", label: "HERRAMIENTAS" },
  { id: "tecnologias", label: "POR QUÉ" },
  { id: "historia", label: "LA HISTORIA" },
  { id: "contacto", label: "CONTACTO" },
] as const;

// ============================================================================
// PROYECTOS: el carrusel de tarjetas deslizables, con captura real de la
// portada cuando el sistema está online. Si un proyecto no tiene captura
// (`shot: null`) la tarjeta cae al esquema técnico honesto del sistema.
// Las capturas viven en public/previews y se recortan a 16/10 (1440x900).
// ============================================================================
export const PROJECTS = {
  eyebrow: "SISTEMAS FUNCIONANDO",
  title: "Proyectos",
  intro:
    "No mostramos maquetas: cada tarjeta es un sistema que hoy está funcionando en una empresa real. Deslizá para verlos todos.",
  hint: "Deslizá para ver todos",
  // ORDEN: primero las tarjetas que tienen captura real; los proyectos sin
  // foto (que caen al esquema SVG) van después.
  items: [
    {
      id: "mya",
      name: "MyA Importaciones",
      kind: "Un mayorista real operando todo su día a día con el sistema",
      description:
        "Tienda online con dominio propio, catálogo de más de 2.300 productos con fotos y variantes, cobros, envíos y facturación electrónica. Todo el circuito del negocio funciona sobre el sistema, del mostrador a la factura.",
      bullets: [
        "Más de 2.300 productos con sus fotos y variantes",
        "Venta de mostrador, tienda online y mayorista, juntas",
        "Cobros, envíos y facturación electrónica",
      ],
      specs: ["TIENDA ONLINE", "MAYORISTA", "COBROS", "EN PRODUCCIÓN"],
      shot: "/previews/mya.webp",
      shotAlt:
        "Portada de la tienda online de MyA Importaciones, con su buscador, sus categorías y sus promociones.",
      url: "https://myaimportaciones.com.ar",
      urlLabel: "Ver en vivo",
    },
    {
      // OJO: esta tarjeta NO es un sistema que se le vende a un cliente. Es la
      // consola INTERNA de Pulso, que recibe información de todos los sistemas
      // en funcionamiento. Va en el sitio porque explica por qué el soporte es
      // rápido, no como producto.
      id: "gestion",
      name: "Sistema de gestión",
      kind: "Nuestro centro de control: todos los clientes en un mapa",
      description:
        "El sistema interno con el que manejamos Pulso. Cada cliente, cada proyecto, los pedidos de soporte y los cobros quedan conectados en un solo mapa, y recibe información de todos los sistemas que tenemos funcionando. Así vemos qué está pasando en cada uno y respondemos rápido.",
      bullets: [
        "Cada cliente y cada proyecto, conectados en un mapa",
        "Los pedidos de soporte entran acá y se atienden por orden",
        "Vemos el estado de cada sistema sin esperar a que nos avisen",
      ],
      specs: ["INTERNO", "CLIENTES", "SOPORTE", "SEGUIMIENTO"],
      shot: "/previews/panel.webp",
      shotAlt:
        "Centro de control interno de Pulso, con el mapa de clientes, cobros, tickets y calendario conectados entre sí.",
      url: null,
      urlLabel: null,
    },
    {
      id: "meli",
      name: "Sistema automático Meli",
      kind: "Ventas y estadísticas de Mercado Libre en un solo lugar",
      description:
        "La pantalla donde una empresa maneja todas sus ventas y estadísticas de Mercado Libre sin entrar cuenta por cuenta, con varias cuentas y varias empresas conviviendo a la vez.",
      bullets: [
        "Varias cuentas manejadas sin entrar una por una",
        "Ingresos, ganancia y margen calculados solos",
        "Varias empresas, cada una con su operación",
      ],
      specs: ["MERCADO LIBRE", "VARIAS CUENTAS", "ESTADÍSTICAS"],
      shot: "/previews/meli.webp",
      shotAlt:
        "Panel de reportes del sistema Meli, con ingresos, ganancia, margen y el detalle por cada empresa.",
      url: null,
      urlLabel: null,
    },
    {
      id: "evolux",
      name: "Evolux",
      kind: "Web a medida para una agencia especialista en Mercado Libre",
      description:
        "Diseño y desarrollo de la web institucional de Evolux, la agencia que escala marcas dentro de Mercado Libre: su propuesta, sus servicios, sus resultados y la captación de nuevos clientes.",
      bullets: [
        "Diseño y desarrollo hechos de cero para ellos",
        "Pensada para captar consultas, no solo para mostrar",
        "Carga rápida y lista para publicidad",
      ],
      specs: ["WEB INSTITUCIONAL", "CAPTACIÓN", "DISEÑO PROPIO"],
      shot: "/previews/evolux.webp",
      shotAlt:
        "Portada de la web de Evolux, agencia especialista en Mercado Libre, con su titular y sus métricas.",
      url: "https://evolux-rouge.vercel.app",
      urlLabel: "Ver en vivo",
    },
    {
      id: "elefante",
      name: "El Paso del Elefante",
      kind: "Sistema a medida para depósito y taller, en desarrollo",
      description:
        "Un sistema pensado para una operación distinta: control de depósito por racks y posiciones, tareas con cronómetro para medir el trabajo real, y cuenta corriente en pesos y en dólares. Cada módulo se activa solo para esta empresa.",
      bullets: [
        "Depósito por racks y posiciones",
        "Tareas con cronómetro para medir el trabajo",
        "Cuenta corriente en pesos y en dólares",
      ],
      specs: ["DEPÓSITO", "TAREAS", "PESOS Y DÓLARES"],
      shot: "/previews/elefante.webp",
      shotAlt:
        "Panel a medida de El Paso del Elefante, con su centro de tareas pendientes, depósito, listas de precios y mayoristas.",
      url: null,
      urlLabel: null,
    },
    {
      id: "catalogos",
      name: "Catálogos automáticos",
      kind: "Un catálogo online propio para cada revendedor, creado solo",
      description:
        "Cada revendedor recibe su catálogo con su dominio, su logo, su surtido y sus precios. El alta es automática: se carga al revendedor y el catálogo queda publicado, tomando el stock del sistema. En la imagen, cuatro reales: Logiweb Distribuciones, De todo para hogar, Wolf Tecno Hogar y MF FRESH.",
      bullets: [
        "Se publica solo, sin que nadie lo arme a mano",
        "Marca, dominio y precios propios de cada revendedor",
        "El stock sale del sistema, siempre al día",
      ],
      specs: ["AUTOMÁTICO", "DOMINIO PROPIO", "MARCA PROPIA"],
      shot: "/previews/catalogos.webp",
      shotAlt:
        "Cuatro catálogos de revendedores reales, cada uno con su logo, su nombre y su surtido de productos.",
      url: "https://logiweb.catalogocba.com.ar",
      urlLabel: "Ver un catálogo",
    },
    {
      id: "logiweb",
      name: "Logiweb Distribuciones",
      kind: "Una distribuidora con funciones hechas para su operación",
      description:
        "Sobre el sistema base le construimos lo que su operación pedía: importar listas de precios del proveedor, emitir remitos, exportar a PDF, vender por medio pack y un tablero con sus números. Cada función se enciende solo para quien la necesita.",
      bullets: [
        "Importación de listas de precios del proveedor",
        "Remitos y exportación a PDF",
        "Venta por medio pack y tablero propio",
      ],
      specs: ["A MEDIDA", "REMITOS", "LISTAS DE PRECIOS"],
      shot: null,
      shotAlt: null,
      url: "https://logiweb.catalogocba.com.ar",
      urlLabel: "Ver su catálogo",
    },
    {
      id: "asistente",
      name: "Asistente con IA",
      kind: "Un vendedor virtual que responde con datos reales",
      description:
        "Una burbuja de chat dentro de la tienda que responde con el catálogo real: stock, colores, talles y precios del momento. Cuando la charla avanza, lleva al cliente directo al WhatsApp del vendedor.",
      bullets: [
        "Responde solo con productos y stock reales",
        "Nunca inventa: si no lo tiene, lo dice",
        "Cierra la venta derivando a WhatsApp",
      ],
      specs: ["INTELIGENCIA ARTIFICIAL", "CATÁLOGO REAL", "WHATSAPP"],
      shot: null,
      shotAlt: null,
      url: null,
      urlLabel: null,
    },
    {
      id: "android",
      name: "App para el celular",
      kind: "Toda la administración, en el bolsillo del dueño",
      description:
        "La administración completa como app de celular: escáner de códigos de barras con la cámara para cargar stock y vender, y avisos al instante de cada pedido nuevo.",
      bullets: [
        "Escáner real con la cámara del teléfono",
        "Aviso al instante de cada pedido",
        "La misma información que en la computadora",
      ],
      specs: ["ANDROID", "ESCÁNER", "AVISOS"],
      shot: null,
      shotAlt: null,
      url: null,
      urlLabel: null,
    },
    {
      id: "sneakers",
      name: "Sneakers Hub",
      kind: "Tienda de zapatillas construida de cero, pieza por pieza",
      description:
        "Una tienda completa levantada y reconstruida en varias etapas: cuentas de usuario con roles y permisos, carrito, control de stock y tickets de compra. El banco de pruebas donde se afinó lo que después entró a los sistemas de clientes.",
      bullets: [
        "Cuentas, roles y permisos",
        "Carrito, stock y tickets de compra",
        "Construida y reconstruida por etapas",
      ],
      specs: ["TIENDA", "CUENTAS Y ROLES", "CARRITO"],
      shot: null,
      shotAlt: null,
      url: null,
      urlLabel: null,
    },
  ],
} as const;

// ============================================================================
// SERVICIOS: lo que le vendemos a una empresa.
// ============================================================================
export const SERVICES = {
  title: "Servicios",
  availableLabel: "DISPONIBLE",
  items: [
    {
      id: "sistemas",
      dominant: true,
      name: "Sistemas de gestión a medida",
      description:
        "El sistema que tu empresa necesita y que ningún programa enlatado te da: ventas, stock, compras, facturación, cuentas corrientes, permisos por puesto y reportes. Construido sobre tu forma real de trabajar, no sobre una plantilla. Sirve para cualquier rubro, del mayorista a la industria y al comercio.",
      bullets: [
        "Ventas, caja y facturación electrónica",
        "Stock, compras y proveedores",
        "Permisos y roles por puesto",
        "Reportes y finanzas al día",
      ],
    },
    {
      id: "automatizacion",
      dominant: false,
      name: "Automatización con IA",
      description:
        "Sacamos de encima las tareas repetitivas: carga de datos, avisos, seguimientos y respuestas a clientes. Menos horas perdidas y menos errores humanos.",
      bullets: [
        "Tareas en piloto automático",
        "Asistentes que responden solos",
        "Menos carga manual",
      ],
    },
    {
      id: "tiendas",
      dominant: false,
      name: "Tiendas y webs a medida",
      description:
        "Tu tienda online o tu web institucional, con dominio propio, diseño exclusivo y pensadas para vender y captar consultas desde el primer día.",
      bullets: ["Diseño exclusivo", "Cobros y envíos integrados", "Preparada para Google"],
    },
    {
      id: "integraciones",
      dominant: false,
      name: "Integraciones",
      description:
        "Conectamos lo que tu empresa ya usa: AFIP, Mercado Pago, Mercado Libre, WhatsApp y lo que haga falta. Un solo circuito, sin doble carga.",
      bullets: ["AFIP y facturación", "Cobros y marketplaces", "WhatsApp y avisos"],
    },
  ],
} as const;

// Cómo trabajamos: los pasos de la relación con el cliente, de la primera charla
// al sistema andando. Baja el miedo a contratar a una empresa que no conocés.
export const PROCESS = {
  eyebrow: "SIN VUELTAS",
  title: "Cómo trabajamos",
  intro:
    "Contratar software no tiene que dar miedo. Así de simple es trabajar con nosotros, de la primera charla a tu empresa funcionando.",
  steps: [
    {
      n: "01",
      title: "Analizamos tu operación",
      detail:
        "Nos contás qué hace tu empresa y cómo trabaja hoy, en tu idioma y sin tecnicismos. Detectamos dónde se pierde tiempo y qué conviene automatizar. Esta primera charla no se cobra.",
    },
    {
      n: "02",
      title: "Te pasamos una propuesta",
      detail:
        "Como cada sistema es a medida, no hay precio de lista: analizamos lo tuyo y te pasamos un presupuesto claro, con alcance y tiempos, antes de arrancar.",
    },
    {
      n: "03",
      title: "Lo construimos por etapas",
      detail:
        "Desarrollamos tu sistema en etapas cortas y vas viendo los avances en cada una. Si algo hay que ajustar, se ajusta en el momento y no al final.",
    },
    {
      n: "04",
      title: "Lo dejamos andando",
      detail:
        "Te lo entregamos funcionando y capacitamos a tu equipo. El sistema queda siendo tuyo, y un abono mensual cubre el hosting, el mantenimiento y las mejoras, para que siga al día sin sorpresas.",
    },
  ],
  // cierre debajo de los pasos, al lado del CTA
  closer:
    "La primera charla no se cobra ni te compromete a nada. Nos escribís, nos contás tu operación y te respondemos con una propuesta concreta.",
  closerCta: "Pedí tu presupuesto",
} as const;

export const CASE_STUDIES = {
  eyebrow: "FUNCIONANDO · MYA IMPORTACIONES",
  title: "Casos de éxito",
  intro:
    "Una empresa mayorista y minorista real que maneja todo su día a día con nuestro sistema: ventas de mostrador, tienda online, facturación y catálogos para sus revendedores.",
  metrics: [
    { value: 2300, suffix: "+", label: "productos cargados con sus fotos y variantes" },
    { value: 6, suffix: "", label: "conexiones funcionando en su día a día" },
    { value: 4, suffix: "", label: "revendedores con su propio catálogo publicado" },
  ],
  flowQuote:
    "Una venta de mostrador descuenta stock, cobra, factura y queda en los reportes. Sin planillas, sin doble carga, sin fin de mes a mano.",
  flowLabel: "EL FLUJO REAL",
  note: "Los números salen del uso real del sistema, todos los días.",
} as const;

// ============================================================================
// LA EMPRESA: quiénes somos + el fundador como cara visible.
// ============================================================================
export const ABOUT = {
  title: "Somos Pulso.",
  paragraphs: [
    "Pulso es una empresa de desarrollo de software a medida con base en Córdoba. Construimos los sistemas que una empresa necesita para vender, producir y administrar sin planillas sueltas ni tareas repetidas a mano.",
    "Trabajamos con desarrolladores de software certificados y sumamos automatizaciones con inteligencia artificial donde de verdad ahorran horas. No vendemos licencias de un programa enlatado: cada sistema se diseña sobre la operación real del cliente, y se le agrega lo que esa empresa necesita y nada más.",
    "No entregamos demos que quedan a medias: entregamos sistemas funcionando. Y nos quedamos cerca, midiendo y mejorando cada semana para que el sistema le siga rindiendo al negocio.",
  ],
  pillars: [
    {
      k: "EQUIPO",
      t: "Desarrolladores certificados",
      d: "Gente formada y certificada en desarrollo, arquitectura, calidad y ciberseguridad.",
    },
    {
      k: "IA",
      t: "Automatización con IA",
      d: "Asistentes y procesos automáticos que sacan de encima las tareas repetitivas.",
    },
    {
      k: "PRODUCCIÓN",
      t: "Sistemas en producción",
      d: "Empresas reales facturando con nuestros sistemas todos los días, no pruebas de laboratorio.",
    },
  ],
  ficha: [
    { k: "BASE", v: "Córdoba, AR" },
    { k: "TRABAJO", v: "Todo a medida" },
    { k: "FUNCIONANDO", v: "Empresas reales" },
    { k: "DISPONIBLE", v: "Nuevos proyectos" },
  ],
} as const;

// El fundador: la cara visible de Pulso. Conocer a quién está atrás genera
// confianza, sobre todo cuando la empresa es joven.
export const FOUNDER = {
  label: "FUNDADOR",
  name: "Mateo Valentin Pereyra",
  role: "Fundador y director de desarrollo",
  bio: [
    "Arranqué programando para clientes en 2022 y desde entonces no paré. Diseñé y construí los sistemas con los que hoy varias empresas venden, cobran y facturan todos los días, y sigo al frente de cada proyecto.",
    "Estoy cursando la Diplomatura en Desarrollo de Software y ya obtuve 12 certificaciones en el camino, de arquitectura y rendimiento a control de calidad y ciberseguridad. En cada proyecto de Pulso hay alguien del equipo del otro lado del teléfono, y muchas veces soy yo.",
  ],
  quote:
    "Prefiero un sistema que resuelva un problema real antes que uno lleno de funciones que nadie usa.",
} as const;

// Constelación de "lo que dominamos". weight = font-weight REAL de Satoshi
// (cargada en 400/500/700): 700 dominio alto, 500 sólido, 400 en uso activo.
// Los nombres de tecnología quedan como sello de respaldo; los GRUPOS traducen
// para qué sirve cada bloque. deps: aristas reales de dependencia (id -> id).
export const SKILLS = {
  title: "Lo que dominamos",
  groups: [
    {
      name: "Lo que se ve",
      nodes: [
        { id: "react", label: "React", weight: 700 },
        { id: "nextjs", label: "Next.js", weight: 700 },
        { id: "typescript", label: "TypeScript", weight: 700 },
        { id: "tailwind", label: "Tailwind CSS", weight: 500 },
        { id: "capacitor", label: "Capacitor", weight: 400 },
      ],
    },
    {
      name: "El motor",
      nodes: [
        { id: "nodejs", label: "Node.js", weight: 500 },
        { id: "nestjs", label: "NestJS", weight: 700 },
        { id: "prisma", label: "Prisma", weight: 700 },
        { id: "postgresql", label: "PostgreSQL", weight: 500 },
        { id: "redis", label: "Redis", weight: 400 },
      ],
    },
    {
      name: "Conexiones",
      nodes: [
        { id: "mercadopago", label: "Mercado Pago", weight: 500 },
        { id: "afip", label: "AFIP", weight: 500 },
        { id: "mercadolibre", label: "Mercado Libre", weight: 400 },
        { id: "meta", label: "WhatsApp / Meta", weight: 400 },
        { id: "gemini", label: "IA (Gemini)", weight: 400 },
      ],
    },
    {
      name: "Dónde vive",
      nodes: [
        { id: "railway", label: "Railway", weight: 500 },
        { id: "vercel", label: "Vercel", weight: 500 },
        { id: "cloudflare", label: "Cloudflare", weight: 400 },
        { id: "docker", label: "Docker", weight: 400 },
        { id: "git", label: "Git / CI", weight: 500 },
      ],
    },
  ],
  deps: [
    ["nextjs", "react"],
    ["nextjs", "typescript"],
    ["nestjs", "nodejs"],
    ["nestjs", "typescript"],
    ["prisma", "postgresql"],
    ["nestjs", "prisma"],
    ["nestjs", "redis"],
    ["capacitor", "react"],
    ["mercadopago", "nestjs"],
    ["afip", "nestjs"],
    ["mercadolibre", "nestjs"],
    ["meta", "nestjs"],
    ["gemini", "nestjs"],
    ["nextjs", "vercel"],
    ["nestjs", "railway"],
    ["postgresql", "railway"],
    ["cloudflare", "vercel"],
  ] as [string, string][],
} as const;

// Bahía de racks. HÍBRIDO: el beneficio en criollo es el titular grande (name);
// el nombre de la herramienta queda como sello chico en mono (role).
export const STACK = {
  title: "Herramientas de primera",
  modules: [
    { name: "Webs que vuelan", role: "Next.js" },
    { name: "Sin errores tontos", role: "TypeScript" },
    { name: "Cerebro ordenado", role: "NestJS" },
    { name: "Datos prolijos", role: "Prisma" },
    { name: "Nada se pierde", role: "PostgreSQL" },
    { name: "Respuestas al toque", role: "Redis" },
    { name: "Diseño a medida", role: "Tailwind" },
    { name: "En tu celular", role: "Capacitor" },
    { name: "Siempre encendido", role: "Railway" },
    { name: "Online en segundos", role: "Vercel" },
    { name: "Fotos al instante", role: "Cloudflare" },
    { name: "Todo respaldado", role: "Git" },
  ],
} as const;

// Por qué queda bien hecho. HÍBRIDO: el beneficio en criollo es el titular
// monumental (name); la herramienta que lo hace posible queda como sello (tech).
export const FAVORITE_TECH = {
  title: "Por qué queda bien hecho",
  panelLabel: "POR QUÉ",
  items: [
    {
      name: "Al instante",
      tech: "Next.js",
      why: "Tu web y tu tienda cargan rapidísimo. Y el cliente que no espera, compra.",
    },
    {
      name: "Nada se rompe",
      tech: "TypeScript",
      why: "Los problemas se detectan antes de publicar, no cuando tu cliente ya está comprando.",
    },
    {
      name: "Crece con vos",
      tech: "NestJS",
      why: "Por dentro está todo ordenado, así el sistema crece con tu empresa sin volverse un lío.",
    },
    {
      name: "A salvo",
      tech: "PostgreSQL",
      why: "Tus ventas y tus datos quedan bien guardados. Nada se borra ni se traspapela.",
    },
    {
      name: "Flexible",
      tech: "Prisma",
      why: "Cambiar o sumar algo más adelante se hace fácil, sin romper lo que ya funciona.",
    },
    {
      name: "Aguanta todo",
      tech: "Redis",
      why: "Soporta muchísima gente comprando a la vez sin ponerse lento. No se cae en el momento clave.",
    },
  ],
} as const;

export const TIMELINE = {
  title: "La historia",
  events: [
    {
      stamp: "2022",
      title: "El primer cliente",
      detail:
        "La web de un servidor de rol, hecha a mano y entregada a tiempo. El primer proyecto grande y la primera lección: escuchar antes de programar.",
    },
    {
      stamp: "2025",
      title: "El primer sistema de gestión",
      detail:
        "Arranca el desarrollo del sistema completo con el que una empresa vende, cobra y factura, pensado a medida desde el día cero.",
    },
    {
      stamp: "2025-2026",
      title: "51 etapas de desarrollo",
      detail:
        "Ventas, tienda, punto de venta, cobros y facturación: el sistema completo, probado pieza por pieza antes de tocar un cliente.",
    },
    {
      stamp: "JUN 2026",
      title: "La primera empresa vendiendo",
      detail:
        "MyA Importaciones carga todo su catálogo, capacita a su equipo y pasa a operar su día a día con el sistema.",
    },
    {
      stamp: "2026",
      title: "Más empresas, más a medida",
      detail:
        "Se suman Logiweb Distribuciones con sus funciones propias, El Paso del Elefante con su depósito y sus tareas, y Evolux con su web.",
    },
    {
      stamp: "HOY",
      title: "Pulso, como empresa",
      detail:
        "El trabajo pasa a ser una empresa de desarrollo a medida, con equipo certificado y automatizaciones con IA.",
    },
  ],
} as const;

// Testimonios se eliminó el 2026-07-29: la prueba ya la dan los proyectos, que
// muestran clientes reales con nombre y captura. Una sección de testimonios sin
// testimonios escritos era un hueco, no un argumento.

export const CONTACT = {
  eyebrow: "INICIAR TRANSMISIÓN",
  title: "Pedí tu presupuesto",
  intro:
    "Contanos qué necesita tu empresa y te respondemos con una propuesta concreta. El presupuesto es sin cargo ni compromiso: como todo es a medida, primero miramos lo tuyo y después hablamos de números. El formulario arma el mensaje y lo abre directo en nuestro WhatsApp.",
  devTypes: [
    "Sistema de gestión a medida",
    "Automatización de procesos o IA",
    "Tienda online",
    "Web institucional",
    "Integración con AFIP, Mercado Pago o Mercado Libre",
    "App para celular",
    "Otro / no estoy seguro",
  ],
  fields: {
    name: { label: "Tu nombre", placeholder: "Nombre y apellido" },
    email: { label: "Tu email", placeholder: "nombre@correo.com" },
    devType: { label: "Qué necesitás", placeholder: "Elegí una opción" },
    business: {
      label: "Contanos de tu empresa o proyecto",
      placeholder:
        "A qué se dedica, cómo trabajan hoy, qué proceso te gustaría resolver o automatizar...",
    },
    ideas: {
      label: "Ideas o contexto extra (opcional)",
      placeholder: "Referencias, cosas que imaginás, plazos, lo que tengas en mente...",
    },
  },
  errors: {
    name: "Decinos tu nombre así sabemos con quién hablamos.",
    email: "Necesitamos un email válido para responderte.",
    devType: "Elegí qué es lo que estás buscando.",
    business: "Contanos aunque sea en dos líneas de qué se trata.",
  },
  submitLabel: "Enviar por WhatsApp",
  sentLabel: "SEÑAL ENVIADA",
  sentHint:
    "Se abrió WhatsApp con tu mensaje armado. Si no se abrió, tocá el botón de nuevo.",
  directLabel: "O directo, sin formulario:",
} as const;

export const FOOTER = {
  statusPrefix: "SISTEMA OPERATIVO",
  backToTop: "Volver arriba",
  rights: `© 2026 ${COMPANY.name}`,
} as const;

export const SEO = {
  title: "Pulso · Software a medida para empresas | Córdoba, Argentina",
  description:
    "Empresa de desarrollo de software a medida en Córdoba. Sistemas de gestión, automatización con IA, tiendas online e integraciones con AFIP, Mercado Pago y Mercado Libre. Resolvemos, automatizamos y optimizamos los procesos de tu empresa. Pedí tu presupuesto.",
  url: "https://plataformaterab.com",
  locale: "es_AR",
} as const;
