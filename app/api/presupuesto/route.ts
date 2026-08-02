import { CONTACT } from "@/content/data";

/**
 * Recepción de pedidos de presupuesto.
 *
 * El formulario del sitio postea acá y desde acá se reenvía al panel de
 * control de Pulso. La URL del panel vive en la variable de entorno
 * PULSO_PANEL_WEBHOOK (y PULSO_PANEL_TOKEN si el panel pide autenticación).
 *
 * Si la variable no está configurada el pedido igual se acepta y se deja en
 * el log del server: preferimos eso antes que darle un error a alguien que
 * quiere contratarnos. El día que el panel esté listo, se setea la variable y
 * no hay que tocar nada del front.
 */

export type QuoteBody = {
  nombre: string;
  empresa: string;
  tipo: string;
  mensaje: string;
};

const MAX = 4000;

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX) : "";
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: "json" }, { status: 400 });
  }

  const body = raw as Partial<QuoteBody>;
  const quote: QuoteBody = {
    nombre: clean(body.nombre),
    empresa: clean(body.empresa),
    tipo: clean(body.tipo),
    mensaje: clean(body.mensaje),
  };

  // las mismas reglas que valida el formulario, por si alguien postea derecho
  const invalid =
    quote.nombre.length < 2 ||
    quote.mensaje.length < 10 ||
    !CONTACT.tipoOptions.includes(quote.tipo as (typeof CONTACT.tipoOptions)[number]);

  if (invalid) {
    return Response.json({ ok: false, error: "campos" }, { status: 422 });
  }

  const webhook = process.env.PULSO_PANEL_WEBHOOK;
  if (!webhook) {
    console.info("[presupuesto] sin PULSO_PANEL_WEBHOOK, queda en el log", quote);
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.PULSO_PANEL_TOKEN
          ? { authorization: `Bearer ${process.env.PULSO_PANEL_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ origen: "web", ...quote }),
    });
    if (!res.ok) throw new Error(`panel respondió ${res.status}`);
  } catch (err) {
    console.error("[presupuesto] no se pudo entregar al panel", err, quote);
    return Response.json({ ok: false, error: "panel" }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}
