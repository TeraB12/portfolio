import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { SEO, COMPANY } from "@/content/data";
import { LenisProvider } from "@/components/chrome/LenisProvider";
import { RevealObserver } from "@/components/chrome/RevealObserver";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { Header } from "@/components/chrome/Header";

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
  title: SEO.title,
  description: SEO.description,
  keywords: [
    "software a medida",
    "empresa de desarrollo de software",
    "desarrollo de software Córdoba",
    "sistema de gestión a medida",
    "automatización de procesos",
    "automatización con IA",
    "sistema para empresas",
    "punto de venta",
    "tienda online",
    "facturación AFIP",
    "Mercado Pago",
    "Mercado Libre",
    "Córdoba",
    "Argentina",
  ],
  authors: [{ name: COMPANY.name }],
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
  robots: { index: true, follow: true },
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
