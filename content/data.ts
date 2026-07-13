// ============================================================================
// PULSO · Contenido central del portfolio
// TODO el texto visible del sitio vive acá. Los componentes no hardcodean copy.
//
// ENFOQUE: el público es gente de comercios y empresas que quiere COMPRAR un
// sistema, sin saber de programación. El copy habla de lo que el negocio gana,
// no de tecnicismos. Eje transversal: TODO se hace a medida del cliente.
// La jerga de programación pura queda fuera del texto que lee el cliente; los
// nombres de tecnología solo sobreviven como "sello de respaldo" (chico) en las
// secciones donde aportan confianza (Herramientas, Lo que domino, Por qué).
// Se conserva el lenguaje de marca PULSO (señal, latido, operativo, telemetría).
//
// Regla dura: nada de guiones largos ni medios en texto visible.
// ============================================================================

export const IDENTITY = {
  name: "Mateo Valentin Pereyra",
  firstName: "MATEO",
  lastName: "PEREYRA",
  role: "Desarrollador de software",
  location: "Córdoba, Argentina",
  locationShort: "CBA · AR",
  email: "mateovpereyra@gmail.com",
  phoneDisplay: "+54 9 351 594 6404",
  whatsappNumber: "5493515946404",
  github: "https://github.com/TeraB12",
  // el hero resalta en negrita la frase "a medida" (ver Hero.tsx · <Keyword>)
  heroTagline: "Creo sistemas a medida para tu comercio o empresa.",
  heroSubline:
    "Software pensado para tu forma de trabajar, para que vendas más y trabajes menos. Hoy hay comercios reales vendiendo y facturando con mis sistemas, todos los días.",
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
  { id: "skills", label: "LO QUE DOMINO" },
  { id: "stack", label: "HERRAMIENTAS" },
  { id: "proyectos", label: "PROYECTOS" },
  { id: "timeline", label: "LA HISTORIA" },
  { id: "servicios", label: "SERVICIOS" },
  { id: "proceso", label: "CÓMO TRABAJAMOS" },
  { id: "tecnologias", label: "POR QUÉ" },
  { id: "casos", label: "CASOS" },
  { id: "testimonios", label: "TESTIMONIOS" },
  { id: "contacto", label: "CONTACTO" },
] as const;

export const ABOUT = {
  title: "Un sistema, una persona.",
  paragraphs: [
    "Soy Mateo, desarrollador de software en Córdoba. Creo sistemas a medida para comercios y empresas: en vez de que te adaptes vos a una plantilla, el sistema se adapta a cómo vendés. Si tu negocio hace algo distinto, el sistema lo hace.",
    "Mi trabajo más grande es el sistema con el que hoy varios comercios venden, cobran y facturan todos los días. Lo hice, lo puse a andar y lo cuido yo.",
    "No entrego demos que quedan a medias: entrego sistemas funcionando. Y me quedo cerca, midiendo y mejorando cada semana para que te siga rindiendo.",
  ],
  ficha: [
    { k: "BASE", v: "Córdoba, AR" },
    { k: "TRABAJO", v: "Todo a medida" },
    { k: "FUNCIONANDO", v: "Comercios reales" },
    { k: "DISPONIBLE", v: "Nuevos proyectos" },
  ],
} as const;

export const EXPERIENCE = {
  title: "Experiencia",
  rows: [
    {
      period: "2025-HOY",
      role: "Fundador y desarrollador",
      org: "Plataforma propia",
      summary:
        "El sistema completo con el que un comercio vende, cobra y factura sin planillas, hecho y operado por mí de punta a punta.",
      detail:
        "Un solo sistema hecho a medida: cada comercio con su tienda y su dominio propio, punto de venta, facturación AFIP, cobros con Mercado Pago, ventas por Mercado Libre, app para el celular y un asistente con inteligencia artificial. Todo online y con mejoras cada semana.",
    },
    {
      period: "2026",
      role: "Puesta en marcha real",
      org: "MyA Importaciones",
      summary: "Un comercio real funcionando por completo con el sistema.",
      detail:
        "Carga de más de 2.300 productos con sus fotos y variantes, configuración del punto de venta para la venta diaria, facturación electrónica, un catálogo propio para cada revendedor y capacitación del equipo. Todo el día a día del comercio funciona con el sistema.",
    },
    {
      period: "2026",
      role: "Sistema automático Meli",
      org: "Proyecto a medida",
      summary:
        "Ventas y estadísticas de Mercado Libre, con varias cuentas y varias empresas en un solo lugar.",
      detail:
        "Un solo lugar donde el comercio maneja todas sus ventas y estadísticas de Mercado Libre sin entrar cuenta por cuenta: soporta varias cuentas y varias empresas a la vez, cada una con sus números y su operación. Hecho a medida de principio a fin.",
    },
    {
      period: "2026",
      role: "Web para consultora",
      org: "Evolux",
      summary:
        "Desarrollo web a medida para una consultora de cursos de venta online y gestión comercial.",
      detail:
        "Diseño y desarrollo a medida de la web de Evolux: la presentación de la consultora y de su oferta de cursos de venta online y gestión comercial, hecha de cero para ellos.",
    },
    {
      period: "MAR 2025-HOY",
      role: "Diplomatura en Desarrollo de Software",
      org: "En curso",
      summary:
        "Formación integral en desarrollo, con 12 certificaciones ya obtenidas en el camino.",
      detail:
        "La diplomatura ordena la teoría; los sistemas reales son la escuela de verdad, donde cada tema se pone a prueba con clientes del otro lado. Certificaciones obtenidas hasta hoy:",
      certs: [
        "Desarrollo web",
        "JavaScript",
        "React JS",
        "Arquitectura de sistemas",
        "Rendimiento y escalabilidad",
        "Control de calidad (QA)",
        "Ciberseguridad",
        "Java",
        "Gestión ágil de proyectos",
        "Trabajo con inteligencia artificial",
        "Cultura digital",
        "Inglés avanzado",
      ],
    },
    {
      period: "2022",
      role: "Primer cliente real",
      org: "Falling Life",
      summary:
        "Web completa para un servidor de rol de GTA V: mi primera experiencia con un cliente de verdad.",
      detail:
        "El primer proyecto grande: la web oficial de un servidor de rol de GTA V, hecha a mano desde cero. Ahí aprendí lo que no enseña ningún curso: escuchar lo que el cliente necesita, entregar a tiempo y ajustar con su devolución.",
    },
  ],
} as const;

// Constelación de "lo que domino". weight = font-weight REAL de Satoshi (cargada
// en 400/500/700): 700 dominio alto, 500 sólido, 400 en uso activo. Los nombres
// de tecnología quedan como sello de respaldo; los GRUPOS traducen para qué sirve
// cada bloque. deps: aristas reales de dependencia (id -> id) que se iluminan al hover.
export const SKILLS = {
  title: "Lo que domino",
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

export const PROJECTS = {
  eyebrow: "SISTEMAS FUNCIONANDO",
  title: "Proyectos",
  items: [
    {
      id: "terab",
      name: "Plataforma para comercios",
      kind: "El sistema completo de un comercio, mi mejor trabajo hasta hoy",
      description:
        "Un solo sistema para que cada comercio tenga su tienda con dominio propio, su punto de venta y su facturación. Hecho a medida y completo: tienda, ventas, cobros, apps y más.",
      specsRing: ["PUNTO DE VENTA", "AFIP", "MERCADO PAGO", "MERCADO LIBRE", "CELULAR", "IA"],
      callouts: [
        {
          t: "Cada comercio, su mundo",
          d: "Cada comercio con su propio dominio, su marca y sus datos separados de los demás.",
        },
        {
          t: "Del mostrador a la factura",
          d: "Una venta en el mostrador descuenta stock, cobra con Mercado Pago y hace la factura AFIP, todo en el mismo paso.",
        },
        {
          t: "Siempre mejorando",
          d: "Mejoras cada semana y todo funcionando sin que el comercio tenga que ocuparse de nada técnico.",
        },
      ],
      // las métricas con count-up viven en Casos de éxito (no duplicar acá)
      metrics: [],
      schematic: true,
      // la mejor demo es el cliente real vendiendo, no una captura de pantalla
      url: "https://myaimportaciones.com.ar",
    },
    {
      id: "meli",
      name: "Sistema automático Meli",
      kind: "Ventas y estadísticas de Mercado Libre en un solo lugar",
      description:
        "La plataforma donde un comercio maneja todas sus ventas y estadísticas de Mercado Libre desde un solo lugar, con varias cuentas y varias empresas a la vez.",
      specsRing: ["MERCADO LIBRE", "VARIAS CUENTAS", "VARIAS EMPRESAS", "A MEDIDA"],
      callouts: [
        {
          t: "Varias cuentas, una pantalla",
          d: "Todas las cuentas de Mercado Libre conectadas y manejadas sin entrar una por una.",
        },
        {
          t: "Estadísticas del negocio",
          d: "Ventas y números claros para decidir con datos, no con corazonadas.",
        },
        {
          t: "Varias empresas juntas",
          d: "Varias empresas conviven en el mismo sistema, cada una con su operación y sus datos.",
        },
      ],
      metrics: [],
      schematic: true,
      url: null,
    },
    {
      id: "catalogos",
      name: "Catálogos de revendedores",
      kind: "Un catálogo propio para cada revendedor",
      description:
        "Cada revendedor de un comercio recibe su propio catálogo online, con su logo y sus precios. Se crea solo, sin que nadie tenga que armarlo a mano.",
      specsRing: ["CATÁLOGO PROPIO", "LOGO", "PRECIOS", "AUTOMÁTICO"],
      callouts: [
        {
          t: "Se arma solo",
          d: "El catálogo se crea y queda listo solo: el comercio carga al revendedor y nada más.",
        },
        {
          t: "Marca propia",
          d: "Logo, precios y catálogo del revendedor, sobre el sistema del comercio.",
        },
      ],
      metrics: [],
      schematic: false,
      url: null,
    },
    {
      id: "asistente",
      name: "Asistente con IA para tu tienda",
      kind: "Un vendedor virtual que responde con datos reales",
      description:
        "Una burbuja de chat en tu tienda que responde con tu catálogo real: stock, colores, talles y precios del momento. Si la charla avanza, lleva al cliente directo a tu WhatsApp.",
      specsRing: ["INTELIGENCIA ARTIFICIAL", "CATÁLOGO REAL", "WHATSAPP"],
      callouts: [
        {
          t: "Cero inventos",
          d: "Responde solo con tus productos y tu stock real, nunca se inventa nada.",
        },
        {
          t: "Cierra en WhatsApp",
          d: "Cuando el cliente quiere comprar, lo lleva directo a vos, el vendedor de verdad.",
        },
      ],
      metrics: [],
      schematic: false,
      url: null,
    },
    {
      id: "android",
      name: "App para el celular",
      kind: "Todo el comercio, en tu bolsillo",
      description:
        "La administración completa como app en el celular: escáner de códigos de barras con la cámara para cargar stock y vender, y avisos al instante de cada pedido nuevo.",
      specsRing: ["ANDROID", "ESCÁNER", "AVISOS"],
      callouts: [
        {
          t: "Escáner de verdad",
          d: "Apuntás la cámara al producto y aparece en la caja o en la carga de stock.",
        },
        {
          t: "El negocio te avisa",
          d: "Pedido nuevo, aviso al instante. No hace falta vivir pendiente de la pantalla.",
        },
      ],
      metrics: [],
      schematic: false,
      url: null,
    },
  ],
} as const;

// Archivo de proyectos: el recorrido antes y alrededor de la plataforma.
// No venden: cuentan. El stack chico queda como sello; solo linkea demos vivas.
export const PROJECT_ARCHIVE = {
  title: "Archivo",
  intro: "El recorrido también cuenta: del primer proyecto grande a todo lo que vino después.",
  items: [
    {
      name: "Falling Life",
      year: "2022",
      description:
        "Web completa para un servidor de rol de GTA V. Mi primer proyecto grande y mi primer cliente de verdad, hecha a mano desde cero.",
      stack: ["HTML", "CSS", "JavaScript"],
      link: "https://fallinglife-finalproyect.netlify.app",
    },
    {
      name: "Sneakers Hub",
      year: "2025-2026",
      description:
        "Tienda de zapatillas que armé y rearmé en varias etapas para practicar de todo: cuentas de usuario, roles, carrito y tickets de compra.",
      stack: ["Node.js", "Express", "MongoDB"],
      link: null,
    },
    {
      name: "Evolux",
      year: "2026",
      description:
        "Web a medida para una consultora que ofrece cursos de venta online y gestión comercial.",
      stack: ["HTML", "CSS", "JavaScript"],
      link: null,
    },
  ],
} as const;

export const TIMELINE = {
  title: "La historia",
  events: [
    {
      stamp: "2025",
      title: "Nace el sistema",
      detail: "Arranca el diseño, pensado a medida desde el día cero para que cada comercio tenga lo suyo.",
    },
    {
      stamp: "2025-2026",
      title: "51 etapas de desarrollo",
      detail: "Ventas, tiendas, punto de venta, cobros y facturación: el sistema completo, probado pieza por pieza.",
    },
    {
      stamp: "JUN 2026",
      title: "Sale a la calle",
      detail: "El sistema queda online y funcionando, con su dominio propio y conexión segura.",
    },
    {
      stamp: "JUN 2026",
      title: "Primer comercio vendiendo",
      detail: "MyA Importaciones carga todo su catálogo y empieza a vender con el sistema.",
    },
    {
      stamp: "JUN 2026",
      title: "Celular e inteligencia artificial",
      detail: "App para el celular con escáner de productos, y un asistente que ayuda a vender en cada tienda.",
    },
    {
      stamp: "HOY",
      title: "Mejorando cada semana",
      detail: "Nuevas funciones y mejoras constantes, para que el sistema acompañe el crecimiento del negocio.",
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
        "Punto de venta, stock, facturación AFIP, cuentas corrientes y reportes. Todo el circuito de tu negocio en una sola pantalla, hecho a la medida de cómo trabajás. Sirve para cualquier rubro: ropa, ferretería, kiosco, comida o venta mayorista.",
      bullets: ["Caja y ventas del día", "Stock con variantes", "Facturación electrónica", "Reportes y finanzas"],
    },
    {
      id: "tiendas",
      dominant: false,
      name: "Tiendas online",
      description:
        "Catálogo, carrito, pagos con Mercado Pago y envíos, todo hecho a tu medida y listo para vender desde el primer día.",
      bullets: ["Compra fácil y rápida", "Pagos integrados", "Dominio propio"],
    },
    {
      id: "webs",
      dominant: false,
      name: "Webs para tu negocio",
      description:
        "La cara digital de tu negocio, con diseño propio y lista para que la actualices vos, sin depender de nadie.",
      bullets: ["Diseño a medida", "La actualizás vos", "Aparecés en Google"],
    },
    {
      id: "integraciones",
      dominant: false,
      name: "Conexiones y automatización",
      description:
        "Conecto lo que ya usás: Mercado Pago, AFIP, Mercado Libre, WhatsApp e inteligencia artificial. Menos carga manual, menos errores.",
      bullets: ["Se conecta con todo", "Asistentes con IA", "Tareas en piloto automático"],
    },
  ],
} as const;

// Cómo trabajamos: los pasos de la relación con el cliente, de la primera charla
// al sistema andando. Baja el miedo a comprarle a alguien que no conocés.
export const PROCESS = {
  eyebrow: "SIN VUELTAS",
  title: "Cómo trabajamos",
  intro:
    "Comprar un sistema no tiene que dar miedo. Así de simple es trabajar conmigo, de la primera charla a tu negocio funcionando.",
  steps: [
    {
      n: "01",
      title: "Charlamos",
      detail:
        "Me contás qué vendés y cómo trabajás hoy. En tu idioma, sin tecnicismos. Esta primera charla no se cobra.",
    },
    {
      n: "02",
      title: "Te paso una propuesta",
      detail:
        "Como cada sistema es a medida, no hay un precio de lista: analizo lo que necesitás y te paso un presupuesto claro, con tiempos y sin compromiso, antes de arrancar.",
    },
    {
      n: "03",
      title: "Lo construyo a medida",
      detail:
        "Armo tu sistema pensado para tu negocio, no una plantilla. Vas viendo los avances y me decís si hay que ajustar algo.",
    },
    {
      n: "04",
      title: "Lo dejo andando",
      detail:
        "Te lo entrego funcionando y te enseño a usarlo. El sistema queda siendo tuyo, y una cuota mensual cubre el hosting, el mantenimiento y las mejoras, para que siga al día sin sorpresas.",
    },
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
      why: "Por dentro está todo ordenado, así el sistema crece con tu negocio sin volverse un lío.",
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

export const CASE_STUDIES = {
  eyebrow: "FUNCIONANDO · MYA IMPORTACIONES",
  title: "Casos de éxito",
  intro:
    "Un comercio mayorista y minorista real que maneja todo su día a día con el sistema: ventas de mostrador, tienda online, facturación y catálogos para revendedores.",
  metrics: [
    { value: 2300, suffix: "+", label: "productos cargados con sus fotos y variantes" },
    { value: 6, suffix: "", label: "conexiones funcionando en su día a día" },
    { value: 51, suffix: "", label: "etapas probadas una por una antes de salir a vender" },
  ],
  flowQuote:
    "Una venta de mostrador descuenta stock, cobra, factura y queda en los reportes. Sin planillas, sin doble carga, sin fin de mes a mano.",
  flowLabel: "EL FLUJO REAL",
  note: "Los números salen del uso real del sistema, todos los días.",
} as const;

export const TESTIMONIALS = {
  title: "Testimonios",
  // Todavía no hay testimonios escritos, así que en vez de un hueco mostramos
  // PRUEBA real y verificable: un cliente operando y sus revendedores activos.
  proof: {
    label: "SEÑAL RECIBIDA",
    text: "Los números hablan antes que las palabras: MyA Importaciones maneja todo su día a día con el sistema desde junio de 2026, y ya tiene 3 revendedores con su propio catálogo activo. Los testimonios escritos van a aparecer acá cuando los clientes quieran contarlo.",
    ctaLabel: "Ver la tienda en vivo",
    ctaHref: "https://myaimportaciones.com.ar",
  },
} as const;

export const CONTACT = {
  eyebrow: "INICIAR TRANSMISIÓN",
  title: "Pedí tu presupuesto",
  intro:
    "Contame qué necesitás y te respondo con una propuesta concreta. El presupuesto es sin cargo ni compromiso: como todo es a medida, primero miro lo tuyo y después hablamos de números. El formulario arma el mensaje y lo abre directo en mi WhatsApp.",
  devTypes: [
    "Sistema para comercio (ventas, stock y facturación)",
    "Tienda online",
    "Web para mi negocio",
    "App o sistema a medida",
    "Conexión o automatización",
    "Otro / no estoy seguro",
  ],
  fields: {
    name: { label: "Tu nombre", placeholder: "Nombre y apellido" },
    email: { label: "Tu email", placeholder: "nombre@correo.com" },
    devType: { label: "Qué necesitás", placeholder: "Elegí una opción" },
    business: {
      label: "Contame de tu comercio o proyecto",
      placeholder: "Qué vendés o hacés, cómo trabajás hoy, para qué querés el sistema...",
    },
    ideas: {
      label: "Ideas o contexto extra (opcional)",
      placeholder: "Referencias, cosas que imaginás, plazos, lo que tengas en mente...",
    },
  },
  errors: {
    name: "Decime tu nombre así sé con quién hablo.",
    email: "Necesito un email válido para responderte.",
    devType: "Elegí qué es lo que estás buscando.",
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
  title: "Mateo Pereyra · Sistemas a medida para comercios | Córdoba, Argentina",
  description:
    "Creo sistemas a medida para comercios y empresas: puntos de venta, tiendas online, facturación AFIP y conexiones con Mercado Pago y Mercado Libre. Software que te hace vender más y trabajar menos. Pedí tu presupuesto.",
  url: "https://plataformaterab.com",
  locale: "es_AR",
} as const;
