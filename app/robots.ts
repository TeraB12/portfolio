import type { MetadataRoute } from "next";

import { SEO } from "@/content/data";

/**
 * Todo abierto menos /api: el endpoint del formulario no tiene nada que
 * indexar y solo gastaría presupuesto de rastreo.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SEO.url}/sitemap.xml`,
    host: SEO.url,
  };
}
