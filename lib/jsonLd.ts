import {
  COMPANY,
  FOUNDER,
  PROCESS,
  SEO,
  SERVICES,
} from "@/content/data";

/**
 * JSON-LD del sitio.
 *
 * Esto es lo que lee Google (y los buscadores con IA) para entender QUÉ es
 * Pulso, no solo qué palabras dice la página. Sin esto somos un texto más;
 * con esto somos una empresa de desarrollo de software, con rubro, zona,
 * servicios y fundador declarados.
 *
 * Todo sale de content/data.ts a propósito: si mañana cambia un servicio,
 * cambia acá solo. Nada se escribe dos veces y nada se inventa (sin
 * calificaciones ni reseñas falsas: eso Google lo penaliza).
 *
 * Se valida en https://validator.schema.org y en el Rich Results Test.
 */

const ORG_ID = `${SEO.url}/#pulso`;
const SITE_ID = `${SEO.url}/#sitio`;
const PAGE_ID = `${SEO.url}/#home`;
const FOUNDER_ID = `${SEO.url}/#fundador`;

/** Las zonas donde se trabaja, en el formato que espera schema.org. */
const AREA_SERVED = SEO.areaServed.map((name) => ({
  "@type": "AdministrativeArea",
  name,
}));

/**
 * Organization + ProfessionalService en el mismo nodo: lo primero nos da la
 * entidad "empresa" (logo, fundador, redes), lo segundo la vuelve un negocio
 * con ciudad y rubro, que es lo que se pelea las búsquedas locales del tipo
 * "sistema de gestión Córdoba".
 */
const organization = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: COMPANY.name,
  alternateName: "Pulso Software",
  legalName: COMPANY.name,
  url: SEO.url,
  logo: `${SEO.url}/apple-icon.png`,
  image: `${SEO.url}/opengraph-image`,
  description: SEO.description,
  slogan: COMPANY.descriptor,
  foundingDate: SEO.foundingYear,
  email: COMPANY.email,
  telephone: `+${COMPANY.whatsappNumber}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Córdoba",
    addressRegion: "Córdoba",
    addressCountry: "AR",
  },
  areaServed: AREA_SERVED,
  knowsAbout: SEO.knowsAbout,
  // El rubro, en los términos del buscador.
  serviceType: SERVICES.items.map((item) => item.name),
  founder: { "@id": FOUNDER_ID },
  employee: { "@id": FOUNDER_ID },
  sameAs: [COMPANY.github],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${COMPANY.whatsappNumber}`,
      email: COMPANY.email,
      areaServed: "AR",
      availableLanguage: ["Spanish"],
    },
  ],
  // Los cuatro servicios tal como están en la sección 02.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: SERVICES.title,
    itemListElement: SERVICES.items.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item.name,
        serviceType: item.name,
        description: item.detail,
        provider: { "@id": ORG_ID },
        areaServed: AREA_SERVED,
      },
    })),
  },
};

const founder = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: FOUNDER.name,
  jobTitle: FOUNDER.role,
  image: `${SEO.url}${FOUNDER.photo}`,
  worksFor: { "@id": ORG_ID },
  knowsAbout: SEO.knowsAbout,
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SEO.url,
  name: `${COMPANY.name} · ${COMPANY.descriptor}`,
  description: SEO.description,
  inLanguage: "es-AR",
  publisher: { "@id": ORG_ID },
};

const webPage = {
  "@type": "WebPage",
  "@id": PAGE_ID,
  url: `${SEO.url}/`,
  name: SEO.title,
  description: SEO.description,
  isPartOf: { "@id": SITE_ID },
  about: { "@id": ORG_ID },
  primaryImageOfPage: `${SEO.url}/opengraph-image`,
  inLanguage: "es-AR",
};

/**
 * Los cuatro pasos de la sección 04, como instructivo. Es lo que puede salir
 * en los resultados cuando alguien busca cómo se contrata un sistema a medida.
 */
const howTo = {
  "@type": "HowTo",
  "@id": `${SEO.url}/#proceso`,
  name: PROCESS.title,
  description: PROCESS.intro,
  inLanguage: "es-AR",
  step: PROCESS.steps.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.detail,
    url: `${SEO.url}/#proceso`,
  })),
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [organization, founder, website, webPage, howTo],
};

/**
 * Serializado y listo para meter en un <script type="application/ld+json">.
 * El reemplazo de "<" es la defensa contra XSS que recomienda Next: si algún
 * día un texto de data.ts trae una etiqueta, no se cierra el script.
 */
export const jsonLd = JSON.stringify(graph).replace(/</g, "\\u003c");
