import type { MetadataRoute } from "next";

import { SEO } from "@/content/data";

/**
 * El sitio es una sola página, así que el sitemap tiene una sola URL. No se
 * listan los anclas (#servicios, #proyectos): Google descarta el fragmento y
 * las contaría todas como la misma dirección.
 *
 * Queda servido en /sitemap.xml y se declara desde app/robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SEO.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
