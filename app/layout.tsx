import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import { SEO, IDENTITY } from "@/content/data";
import { PulseProvider } from "@/lib/pulse";
import { LenisProvider } from "@/components/chrome/LenisProvider";
import { Preloader } from "@/components/chrome/Preloader";
import { Noise } from "@/components/chrome/Noise";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { Nav } from "@/components/chrome/Nav";
import { SpineRail } from "@/components/signal/SpineRail";

const cabinet = localFont({
  src: [
    { path: "./fonts/cabinet-grotesk-500.woff2", weight: "500" },
    { path: "./fonts/cabinet-grotesk-700.woff2", weight: "700" },
    { path: "./fonts/cabinet-grotesk-800.woff2", weight: "800" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "./fonts/satoshi-400.woff2", weight: "400" },
    { path: "./fonts/satoshi-500.woff2", weight: "500" },
    { path: "./fonts/satoshi-700.woff2", weight: "700" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: SEO.title,
  description: SEO.description,
  keywords: [
    "sistemas a medida",
    "software a medida Córdoba",
    "sistema para comercio",
    "sistema de gestión comercial",
    "punto de venta",
    "tienda online",
    "facturación AFIP",
    "Mercado Pago",
    "Mercado Libre",
    "desarrollador de software",
    "Córdoba",
    "Argentina",
  ],
  authors: [{ name: IDENTITY.name }],
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.url,
    siteName: IDENTITY.name,
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cabinet.variable} ${satoshi.variable} ${plexMono.variable} antialiased`}
      // el script de boot muta data-booted en <html> ANTES de hidratar (a propósito)
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg font-sans text-ink">
        {/* gate del preloader ANTES del primer paint: en revisitas de la misma
            sesión (o con reduced-motion) el overlay ni se muestra */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('pulso-boot')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.booted='1'}catch(e){document.documentElement.dataset.booted='1'}",
          }}
        />
        {/* sin JS, motion deja todo en su estado initial (opacity 0): forzar
            visibilidad y esconder el preloader */}
        <noscript>
          <style>{`[data-preloader]{display:none!important}body [style]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
        </noscript>
        <PulseProvider>
          <LenisProvider>
            <Preloader />
            <Noise />
            <CustomCursor />
            <Nav />
            <SpineRail />
            {children}
          </LenisProvider>
        </PulseProvider>
      </body>
    </html>
  );
}
