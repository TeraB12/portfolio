import { ImageResponse } from "next/og";

import { COMPANY, SEO, SERVICES } from "@/content/data";

/**
 * La tarjeta que se ve cuando alguien pega el link en WhatsApp, LinkedIn o X.
 * Hasta ahora el sitio declaraba `summary_large_image` sin imagen, así que la
 * tarjeta salía en blanco.
 *
 * Se dibuja con la misma paleta del sitio (fondo #0A0A08, ámbar de acento) y
 * el mismo mark que app/icon.svg. Sin fuente propia a propósito: usa la que
 * trae next/og, así el build no depende de bajar una tipografía.
 *
 * Next la sirve en /opengraph-image y arma solo los meta og:image y
 * twitter:image.
 */

export const alt = SEO.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0A0A08";
const INK = "#F4F1EA";
const INK_DIM = "#A5A19A";
const AMBER = "#FFB454";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          color: INK,
        }}
      >
        {/* Cabecera: el mark y el wordmark a la izquierda, la base a la derecha */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 76,
                height: 76,
                borderRadius: 999,
                border: `11px solid ${AMBER}`,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  background: AMBER,
                }}
              />
            </div>
            <div
              style={{
                fontSize: 46,
                fontWeight: 700,
                letterSpacing: "0.2em",
              }}
            >
              {COMPANY.wordmark}
            </div>
          </div>

          <div style={{ fontSize: 26, color: INK_DIM }}>{COMPANY.location}</div>
        </div>

        {/* El titular: lo único que se lee de verdad en una tarjeta chica */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              maxWidth: 940,
            }}
          >
            Software a medida para empresas
          </div>
          <div style={{ fontSize: 29, color: INK_DIM, maxWidth: 1000 }}>
            {SERVICES.items.map((item) => item.name).join(" · ")}
          </div>
        </div>

        {/* El trazo del ECG, igual que en el sitio, y el dominio */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <svg width="1040" height="34" viewBox="0 0 1040 34" fill="none">
            <path
              d="M0 17h470l14-6 10 8 12-15 14 26 12-13h508"
              stroke={AMBER}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 27,
            }}
          >
            <div style={{ color: AMBER }}>
              {SEO.url.replace("https://", "")}
            </div>
            <div style={{ color: INK_DIM }}>{COMPANY.descriptor}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
