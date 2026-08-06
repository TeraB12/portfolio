import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { SEO, COMPANY } from "@/content/data";
import { LenisProvider } from "@/components/chrome/LenisProvider";
import { RevealObserver } from "@/components/chrome/RevealObserver";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { Header } from "@/components/chrome/Header";
import { jsonLd } from "@/lib/jsonLd";

/**
 * Dos familias y nada más: Archivo para todo lo que se lee y JetBrains Mono
 * para lo que es dato, estado o etiqueta. Sin serif y sin cursivas en ningún
 * lado (se sacaron a pedido).
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: {
    default: SEO.title,
    template: `%s · ${COMPANY.name}`,
  },
  description: SEO.description,
  // La canónica evita que el sitio se cuente dos veces si alguien lo alcanza
  // por www, por el dominio viejo o con parámetros pegados en el link.
  alternates: { canonical: "/" },
  keywords: [
    "software a medida",
    "empresa de desarrollo de software",
    "desarrollo de software Córdoba",
    "sistema de gestión a medida",
    "software de gestión para empresas",
    "sistema de stock",
    "sistema de facturación",
    "automatización de procesos",
    "automatización con IA",
    "sistema para empresas",
    "software para pymes",
    "punto de venta",
    "tienda online",
    "desarrollo web a medida",
    "facturación AFIP",
    "Mercado Pago",
    "Mercado Libre",
    "Córdoba",
    "Argentina",
  ],
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.name, url: SEO.url }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  category: "Desarrollo de software",
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.url,
    siteName: COMPANY.name,
    locale: SEO.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
  // El bloque de Googlebot es el que habilita la miniatura grande y el
  // fragmento largo en los resultados. Sin esto Google recorta por defecto.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A08",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        {/* Quiénes somos, a qué nos dedicamos y dónde, en el formato que leen
            Google y los buscadores con IA. Se arma en lib/jsonLd.ts a partir
            de content/data.ts. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {/* sin JS los reveals se quedarían en su estado inicial (invisibles):
            acá se anulan de una */}
        <noscript>
          <style>{`[data-reveal],[data-reveal]>*{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
        </noscript>
        <LenisProvider>
          <RevealObserver />
          <CustomCursor />
          <Header />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
