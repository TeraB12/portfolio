# Pulso · sitio de empresa

Sitio de [plataformaterab.com](https://plataformaterab.com): Pulso, empresa de desarrollo de
software a medida de Córdoba, Argentina.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · three.js para el pulso
del hero · Lenis para el smooth scroll.

## Arrancar

```bash
npm install
```

```bash
npm run dev
```

El sitio queda en http://localhost:3000.

## Cómo está armado

```
app/
  layout.tsx              fuentes, metadatos y el chrome (header, cursor, reveals)
  page.tsx                el orden de las secciones
  globals.css             tokens, escala tipográfica, reveals y hovers
  api/presupuesto/        recepción del formulario
components/
  chrome/                 header, cursor, smooth scroll, observer de reveals
  sections/               una por sección de la home
  signal/                 el pulso 3D y el trazo del ECG
  ui/                     primitivas compartidas
content/data.ts           TODO el texto visible del sitio
lib/                      scroll unificado y utilidades
public/previews/          capturas reales de los sistemas
```

**Antes de tocar nada, leé [DESIGN.md](DESIGN.md).** Ahí están los tokens, las reglas de
tipografía, el sistema de movimiento y la lista de cosas que el cliente pidió no volver a
agregar.

Dos reglas que se rompen seguido:

1. **Todo el texto visible vive en `content/data.ts`.** Los componentes no hardcodean copy.
2. **Los textos están cerrados y aprobados.** No reescribirlos sin pedido explícito.

## Variables de entorno

| Variable | Para qué |
|---|---|
| `PULSO_PANEL_WEBHOOK` | URL del panel de control adonde se reenvían los pedidos de presupuesto |
| `PULSO_PANEL_TOKEN` | Bearer token, si el panel pide autenticación |

Sin `PULSO_PANEL_WEBHOOK` el formulario sigue funcionando: acepta el pedido y lo deja en el
log del server.

## Verificar antes de publicar

```bash
npm run lint && npx tsc --noEmit && npm run build
```
