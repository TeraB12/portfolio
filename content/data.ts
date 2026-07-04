// ============================================================================
// PULSO · Contenido central del portfolio
// TODO el texto visible del sitio vive acá. Los componentes no hardcodean copy.
// Las líneas marcadas con [EDITÁ] son aproximaciones que Mateo puede ajustar.
// Regla dura: nada de guiones largos (—) ni medios (–) en texto visible.
// ============================================================================

export const IDENTITY = {
  name: "Mateo Valentin Pereyra",
  firstName: "MATEO",
  lastName: "PEREYRA",
  role: "Desarrollador full-stack",
  location: "Córdoba, Argentina",
  locationShort: "CBA · AR",
  email: "mateovpereyra@gmail.com",
  phoneDisplay: "+54 9 351 594 6404",
  whatsappNumber: "5493515946404",
  github: "https://github.com/TeraB12",
  heroTagline: "Diseño, construyo y opero sistemas en producción.",
  heroSubline:
    "Mi mejor desarrollo hasta hoy: una plataforma SaaS de e-commerce multi-tenant con clientes reales operando.",
} as const;

export const HERO = {
  ctaPrimary: "Pedí tu presupuesto",
  ctaSecondary: "Ver proyectos",
} as const;

export const NAV = {
  links: [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Presupuesto", href: "#contacto" },
  ],
  statusLabel: "OPERATIVO",
} as const;

// Waypoints de la spine (indicador de scroll + navegación por anclas)
export const WAYPOINTS = [
  { id: "inicio", label: "INICIO" },
  { id: "sobre-mi", label: "SOBRE MÍ" },
  { id: "experiencia", label: "EXPERIENCIA" },
  { id: "skills", label: "SKILLS" },
  { id: "stack", label: "STACK" },
  { id: "proyectos", label: "PROYECTOS" },
  { id: "timeline", label: "TIMELINE" },
  { id: "servicios", label: "SERVICIOS" },
  { id: "tecnologias", label: "TECNOLOGÍAS" },
  { id: "casos", label: "CASOS" },
  { id: "testimonios", label: "TESTIMONIOS" },
  { id: "contacto", label: "CONTACTO" },
] as const;

export const ABOUT = {
  title: "Un sistema, una persona.",
  paragraphs: [
    "Soy Mateo, desarrollador full-stack de Córdoba. Construyo productos de punta a punta: del esquema de base de datos al pixel, del primer commit al servidor en producción.",
    "Mi proyecto central es una plataforma SaaS de e-commerce multi-tenant que diseñé, programé y opero solo. Hoy tiene comercios reales facturando con ella todos los días.",
    "No entrego demos: entrego sistemas que quedan funcionando. Y me quedo cerca, midiendo, corrigiendo y mejorando cada semana.",
  ],
  ficha: [
    { k: "BASE", v: "Córdoba, AR" },
    { k: "ENFOQUE", v: "Producto end-to-end" },
    { k: "EN PRODUCCIÓN", v: "Plataforma + clientes" },
    { k: "DISPONIBLE", v: "Proyectos a medida" },
  ],
} as const;

export const EXPERIENCE = {
  title: "Experiencia",
  rows: [
    {
      period: "2025-HOY", // [EDITÁ] año de arranque real de la plataforma
      role: "Fundador y desarrollador",
      org: "Plataforma propia",
      summary: "Plataforma SaaS de e-commerce multi-tenant, construida y operada en solitario.",
      detail:
        "API en NestJS con Prisma y PostgreSQL, panel de administración en Next.js, tiendas con dominio propio por comercio, POS, facturación AFIP, pagos con MercadoPago, integración con Mercado Libre, app Android y asistente IA. Deploy y operación en Railway, Vercel y Cloudflare, con monitoreo y mejoras continuas en producción.",
    },
    {
      period: "2026",
      role: "Implementación en producción",
      org: "MyA Importaciones",
      summary: "Puesta en marcha completa de un comercio real sobre la plataforma.",
      detail:
        "Migración de más de 2.300 productos con variantes y fotos, configuración de POS para la venta diaria, facturación electrónica, catálogos para revendedores con subdominios automáticos y capacitación del equipo. La operación completa del comercio corre sobre la plataforma.",
    },
    {
      period: "2026",
      role: "Plataforma para consultora",
      org: "Evolux",
      summary:
        "Desarrollo web para una consultora de cursos de e-commerce y gestión comercial.",
      detail:
        "Diseño y desarrollo a medida de la plataforma web de Evolux: la presentación de la consultora y de su oferta de cursos de e-commerce y gestión comercial, construida de punta a punta.",
    },
    {
      period: "MAR 2025-HOY",
      role: "Diplomatura en Full Stack",
      org: "En curso",
      summary:
        "Formación integral en desarrollo, con 12 certificaciones ya obtenidas en el camino.",
      detail:
        "La diplomatura ordena la teoría; la plataforma es la escuela real donde cada tema se pone a prueba con usuarios verdaderos del otro lado. Certificaciones obtenidas hasta hoy:",
      certs: [
        "Desarrollo web",
        "JavaScript",
        "React JS",
        "Diseño y arquitectura backend",
        "Testing y escalabilidad backend",
        "Testing QA",
        "Ciberseguridad",
        "Java",
        "Scrum",
        "Prompt Engineering para IA",
        "Cultura digital",
        "Inglés avanzado",
      ],
    },
    {
      period: "2022",
      role: "Primer cliente real",
      org: "Falling Life",
      summary:
        "Web completa para un servidor de roleplay de GTA V: mi primera experiencia con un cliente de verdad.",
      detail:
        "El primer proyecto grande: la web oficial de un servidor de roleplay de GTA V, hecha a pulso con HTML, CSS y JavaScript. Ahí aprendí lo que no enseña ningún curso: escuchar requerimientos, entregar a tiempo y ajustar con el feedback del cliente.",
    },
  ],
} as const;

// Constelación de skills. weight = font-weight REAL de Satoshi (cargada en
// 400/500/700): 700 dominio alto, 500 sólido, 400 en uso activo.
// deps: aristas reales de dependencia (id -> id) que se iluminan al hover.
export const SKILLS = {
  title: "Skills",
  groups: [
    {
      name: "Frontend",
      nodes: [
        { id: "react", label: "React", weight: 700 },
        { id: "nextjs", label: "Next.js", weight: 700 },
        { id: "typescript", label: "TypeScript", weight: 700 },
        { id: "tailwind", label: "Tailwind CSS", weight: 500 },
        { id: "capacitor", label: "Capacitor", weight: 400 },
      ],
    },
    {
      name: "Backend",
      nodes: [
        { id: "nodejs", label: "Node.js", weight: 500 },
        { id: "nestjs", label: "NestJS", weight: 700 },
        { id: "prisma", label: "Prisma", weight: 700 },
        { id: "postgresql", label: "PostgreSQL", weight: 500 },
        { id: "redis", label: "Redis", weight: 400 },
      ],
    },
    {
      name: "Integraciones",
      nodes: [
        { id: "mercadopago", label: "MercadoPago", weight: 500 },
        { id: "afip", label: "AFIP", weight: 500 },
        { id: "mercadolibre", label: "Mercado Libre", weight: 400 },
        { id: "meta", label: "WhatsApp / Meta", weight: 400 },
        { id: "gemini", label: "IA (Gemini)", weight: 400 },
      ],
    },
    {
      name: "Infraestructura",
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

// Bahía de racks: módulos del stack con rol en mono
export const STACK = {
  title: "Stack",
  modules: [
    { name: "Next.js", role: "FRONT" },
    { name: "TypeScript", role: "LENGUAJE" },
    { name: "NestJS", role: "API" },
    { name: "Prisma", role: "ORM" },
    { name: "PostgreSQL", role: "DATOS" },
    { name: "Redis", role: "CACHÉ" },
    { name: "Tailwind", role: "UI" },
    { name: "Capacitor", role: "ANDROID" },
    { name: "Railway", role: "API HOST" },
    { name: "Vercel", role: "DEPLOY" },
    { name: "Cloudflare", role: "CDN + R2" },
    { name: "Git", role: "CONTROL" },
  ],
} as const;

export const PROJECTS = {
  eyebrow: "SISTEMAS EN PRODUCCIÓN",
  title: "Proyectos",
  items: [
    {
      id: "terab",
      name: "Plataforma multi-tenant",
      kind: "SaaS de e-commerce en producción, mi mejor desarrollo hasta hoy",
      description:
        "Una sola plataforma para que cada comercio tenga su tienda con dominio propio, su punto de venta y su facturación. Construida completa: API, panel, tiendas, apps e integraciones.",
      specsRing: ["POS", "AFIP", "MERCADOPAGO", "MERCADO LIBRE", "ANDROID", "IA"],
      callouts: [
        {
          t: "Multi-tenant real",
          d: "Cada comercio opera con su propio dominio, su marca y sus datos aislados.",
        },
        {
          t: "Del mostrador a la factura",
          d: "Una venta en el POS descuenta stock, cobra con MercadoPago y factura en AFIP en el mismo flujo.",
        },
        {
          t: "Operación viva",
          d: "Deploy continuo, monitoreo, auditorías de escalabilidad y mejoras semanales en producción.",
        },
      ],
      // las métricas con count-up viven en Casos de éxito (no duplicar acá)
      metrics: [],
      // [EDITÁ] Reemplazar por screenshot real del panel cuando quieras exponerlo
      schematic: true,
      url: "https://panel.plataformaterab.com",
    },
    {
      id: "catalogos",
      name: "Catálogos de revendedores",
      kind: "Subdominios automáticos por revendedor",
      description:
        "Cada revendedor de un comercio recibe su catálogo propio en un subdominio generado automáticamente, con su logo y sus precios. El alta del dominio se hace sola, vía API.",
      specsRing: ["VERCEL API", "DNS", "MULTI-TENANT", "PRECIOS"],
      callouts: [
        {
          t: "Alta sin manos",
          d: "El subdominio se crea y verifica solo: el comercio carga el revendedor y listo.",
        },
        {
          t: "Marca propia",
          d: "Logo, precios y catálogo del revendedor, sobre la infraestructura del comercio.",
        },
      ],
      metrics: [],
      schematic: false,
      url: null,
    },
    {
      id: "asistente",
      name: "Asistente IA de tienda",
      kind: "Vendedor virtual con datos reales",
      description:
        "Una burbuja de chat en cada tienda que responde con el catálogo real: stock, colores, talles y precios del momento. Si la charla avanza, deriva al WhatsApp del comercio.",
      specsRing: ["GEMINI", "CATÁLOGO VIVO", "ANTI-INYECCIÓN"],
      callouts: [
        {
          t: "Cero inventos",
          d: "Responde solo con productos y stock reales del comercio, nunca alucina catálogo.",
        },
        {
          t: "Cierra en WhatsApp",
          d: "Cuando el cliente quiere comprar, el asistente lo lleva directo al vendedor humano.",
        },
      ],
      metrics: [],
      schematic: false,
      url: null,
    },
    {
      id: "android",
      name: "App admin Android",
      kind: "El panel del comercio, en el bolsillo",
      description:
        "La administración completa como app nativa: escáner de códigos de barras con la cámara para cargar stock y vender, y notificaciones push de pedidos nuevos.",
      specsRing: ["CAPACITOR", "ML KIT", "PUSH FCM"],
      callouts: [
        {
          t: "Escáner real",
          d: "Apuntás la cámara al producto y aparece en el POS o en la carga de stock.",
        },
        {
          t: "El negocio avisa",
          d: "Pedido nuevo, notificación al instante. El comercio no vive pendiente del panel.",
        },
      ],
      metrics: [],
      schematic: false,
      url: null,
    },
  ],
} as const;

// Archivo de proyectos: el recorrido antes y alrededor de la plataforma.
// No venden: cuentan. Sin links al código (decisión de Mateo); solo demos vivas.
export const PROJECT_ARCHIVE = {
  title: "Archivo",
  intro: "El recorrido también cuenta: del primer proyecto grande a los finales de cada etapa.",
  items: [
    {
      name: "Falling Life",
      year: "2022",
      description:
        "Web completa para un servidor de roleplay de GTA V. Mi primer proyecto grande y mi primer cliente real, hecho a pulso con HTML, CSS y JavaScript.",
      stack: ["HTML", "CSS", "JavaScript"],
      link: "https://fallinglife-finalproyect.netlify.app",
    },
    {
      name: "Sneakers Hub",
      year: "2025-2026",
      description:
        "E-commerce de zapatillas construido y reconstruido en varias etapas: Express, MongoDB, WebSockets y una arquitectura por capas con JWT, roles y tickets de compra.",
      stack: ["Node.js", "Express", "MongoDB"],
      link: null,
    },
    {
      name: "Evolux",
      year: "2026",
      description:
        "Plataforma web para una consultora que ofrece cursos de e-commerce y gestión comercial.",
      stack: ["HTML", "CSS", "JavaScript"],
      link: null,
    },
  ],
} as const;

export const TIMELINE = {
  title: "Timeline",
  events: [
    {
      stamp: "2025", // [EDITÁ] fecha real de arranque
      title: "Primera línea de la plataforma",
      detail: "Arranca el diseño del sistema: multi-tenant desde el día cero.",
    },
    {
      stamp: "2025-2026",
      title: "51 fases de producto",
      detail: "Backend, panel, tiendas, POS, pagos, facturación: el programa completo, con tests e2e.",
    },
    {
      stamp: "JUN 2026",
      title: "Deploy a producción",
      detail: "Railway, Vercel y Cloudflare. La plataforma queda viva, con dominio y SSL.",
    },
    {
      stamp: "JUN 2026",
      title: "Primer cliente operando",
      detail: "MyA Importaciones migra su catálogo completo y empieza a vender sobre la plataforma.",
    },
    {
      stamp: "JUN 2026",
      title: "Android + IA",
      detail: "App de administración con escáner y push. Asistente de ventas con Gemini en las tiendas.",
    },
    {
      stamp: "HOY",
      title: "Iterando en producción",
      detail: "Auditorías de escalabilidad, nuevas integraciones y mejoras cada semana.",
    },
  ],
} as const;

export const SERVICES = {
  title: "Servicios",
  availableLabel: "DISPONIBLE",
  items: [
    {
      id: "comercios",
      dominant: true,
      name: "Sistemas para comercios",
      description:
        "Punto de venta, stock, facturación AFIP, cuentas corrientes y reportes. Todo el circuito del negocio en una sola pantalla, hecho a la medida de cómo trabajás.",
      bullets: ["POS y caja diaria", "Stock con variantes", "Facturación electrónica", "Reportes y finanzas"],
    },
    {
      id: "tiendas",
      dominant: false,
      name: "Tiendas online",
      description:
        "Catálogo, carrito, pagos con MercadoPago y envíos. Lista para vender desde el primer día.",
      bullets: ["Checkout completo", "Pagos integrados", "Dominio propio"],
    },
    {
      id: "webs",
      dominant: false,
      name: "Webs institucionales",
      description:
        "Presencia profesional rápida y editable: la cara digital de tu negocio, sin depender de nadie para actualizarla.",
      bullets: ["Diseño a medida", "Contenido editable", "SEO de base"],
    },
    {
      id: "integraciones",
      dominant: false,
      name: "Integraciones y automatización",
      description:
        "Conecto lo que ya usás: MercadoPago, AFIP, Mercado Libre, WhatsApp, IA. Menos carga manual, menos errores.",
      bullets: ["APIs externas", "Bots y asistentes IA", "Flujos automáticos"],
    },
  ],
} as const;

export const FAVORITE_TECH = {
  title: "Tecnologías favoritas",
  panelLabel: "POR QUÉ",
  items: [
    {
      name: "Next.js",
      why: "Un framework para todo el frontend: render en servidor, rutas, imágenes y deploy resuelto.",
    },
    {
      name: "TypeScript",
      why: "Los errores aparecen en el editor, no en la pantalla del cliente.",
    },
    {
      name: "NestJS",
      why: "Estructura de verdad para el backend: módulos, guards y testing sin volverse sopa.",
    },
    {
      name: "PostgreSQL",
      why: "Los datos de un comercio no se negocian. Transacciones, integridad y 30 años de historia.",
    },
    {
      name: "Prisma",
      why: "El esquema es la documentación. Migraciones versionadas y tipos generados solos.",
    },
    {
      name: "Redis",
      why: "Lo que se consulta mil veces se responde una: caché para que producción vuele.",
    },
  ],
} as const;

export const CASE_STUDIES = {
  eyebrow: "EN PRODUCCIÓN · MYA IMPORTACIONES",
  title: "Casos de éxito",
  intro:
    "Un comercio mayorista y minorista real que opera su día a día completo sobre la plataforma: ventas de mostrador, tienda online, facturación y catálogos de revendedores.",
  metrics: [
    { value: 2300, suffix: "+", label: "productos con variantes y fotos migrados" },
    { value: 6, suffix: "", label: "integraciones activas en su operación" },
    { value: 51, suffix: "", label: "fases de producto detrás de su plataforma" },
  ],
  flowQuote:
    "Una venta de mostrador descuenta stock, cobra, factura y queda en los reportes. Sin planillas, sin doble carga, sin fin de mes a mano.",
  flowLabel: "EL FLUJO REAL",
  note: "Los números salen de la operación real de la plataforma.",
} as const;

export const TESTIMONIALS = {
  title: "Testimonios",
  placeholder: {
    label: "ZONA SIN RELEVAR",
    text: "Los primeros clientes están operando la plataforma todos los días. Sus palabras van a aparecer acá cuando ellos quieran contarlo.",
  },
} as const;

export const CONTACT = {
  eyebrow: "INICIAR TRANSMISIÓN",
  title: "Pedí tu presupuesto",
  intro:
    "Contame qué necesitás y te respondo con una propuesta concreta. El formulario arma el mensaje y lo abre directo en mi WhatsApp.",
  devTypes: [
    "Sistema para comercio (POS + stock + facturación)",
    "Tienda online",
    "Web institucional",
    "App o sistema a medida",
    "Integración o automatización",
    "Otro / no estoy seguro",
  ],
  fields: {
    name: { label: "Tu nombre", placeholder: "Nombre y apellido" },
    email: { label: "Tu email", placeholder: "nombre@correo.com" },
    devType: { label: "Tipo de desarrollo", placeholder: "Elegí una opción" },
    business: {
      label: "Contame de tu comercio o proyecto",
      placeholder: "Qué vendés o hacés, cómo trabajás hoy, para qué querés el desarrollo...",
    },
    ideas: {
      label: "Ideas o contexto extra (opcional)",
      placeholder: "Referencias, funcionalidades que imaginás, plazos, lo que tengas en mente...",
    },
  },
  errors: {
    name: "Decime tu nombre así sé con quién hablo.",
    email: "Necesito un email válido para responderte.",
    devType: "Elegí el tipo de desarrollo que buscás.",
    business: "Contame aunque sea en dos líneas de qué se trata.",
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
  rights: `© 2026 ${IDENTITY.name}`,
} as const;

export const SEO = {
  title: "Mateo Pereyra · Desarrollador full-stack | Córdoba, Argentina",
  description:
    "Diseño, construyo y opero sistemas en producción: plataformas de e-commerce, puntos de venta, facturación AFIP, integraciones con MercadoPago y Mercado Libre, apps Android e IA. Pedí tu presupuesto.",
  url: "https://plataformaterab.com",
  locale: "es_AR",
} as const;
