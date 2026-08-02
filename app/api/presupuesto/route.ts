import { CONTACT } from "@/content/data";

/**
 * Recepción de pedidos de presupuesto.
 *
 * El formulario del sitio postea acá y desde acá se reenvía al panel de
 * control de Pulso, que lo guarda en su sección Consultas. La URL del panel
 * vive en la variable de entorno PULSO_PANEL_WEBHOOK y la clave en
 * PULSO_PANEL_TOKEN.
 *
 * Los dos proyectos siguen siendo independientes: esto es lo único que los
 * toca. El sitio no lee nada del panel, no comparte base ni sesión, y si el
 * panel se cae el formulario sigue en pie.
 *
 * Si la variable no está configurada el pedido igual se acepta y se deja en
 * el log del server: preferimos eso antes que darle un error a alguien que
 * quiere contratarnos.
 */

export type QuoteBody = {
  nombre: string;
  email: string;
  empresa: string;
  tipo: string;
  mensaje: string;
  origen: string;
  utm: Record<string, string>;
  /** Campo trampa del formulario. Si viene con algo, lo escribió un bot. */
  hp: string;
};

const MAX = 4000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Cuántos pedidos se le aceptan a la misma IP y en cuánto tiempo. */
const LIMITE = 5;
const VENTANA_MS = 60 * 60 * 1000;

/**
 * Freno por IP. Vive en memoria del proceso a propósito: es un lomo de burro
 * contra el que manda cien veces seguidas, no un candado. En serverless cada
 * instancia tiene el suyo y se pierde al reciclarse — para lo que hay que
 * frenar acá alcanza, y montar un Redis para esto sería más pieza rota que
 * problema resuelto. El filtro que sí importa (clave compartida y honeypot) lo
 * aplica el panel.
 */
const recientes = new Map<string, number[]>();

function excedido(ip: string): boolean {
  if (!ip) return false;
  const ahora = Date.now();
  const previos = (recientes.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  previos.push(ahora);
  recientes.set(ip, previos);
  // El Map no puede crecer para siempre: se barre lo vencido cada tanto.
  if (recientes.size > 500) {
    for (const [k, v] of recientes) {
      if (v.every((t) => ahora - t >= VENTANA_MS)) recientes.delete(k);
    }
  }
  return previos.length > LIMITE;
}

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX) : "";
}

/** utm_* de la URL: solo pares texto→texto y pocos. */
function cleanUtm(v: unknown): Record<string, string> {
  if (!v || typeof v !== "object" || Array.isArray(v)) return {};
  const out: Record<string, string> = {};
  for (const [k, raw] of Object.entries(v as Record<string, unknown>).slice(0, 8)) {
    if (typeof raw === "string" && raw.trim()) {
      out[k.slice(0, 40)] = raw.trim().slice(0, 200);
    }
  }
  return out;
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
    email: clean(body.email).toLowerCase(),
    empresa: clean(body.empresa),
    tipo: clean(body.tipo),
    mensaje: clean(body.mensaje),
    origen: clean(body.origen).slice(0, 160),
    utm: cleanUtm(body.utm),
    hp: clean(body.hp),
  };

  // Bot: se responde OK igual. Un 4xx le confirmaría que encontró el filtro y
  // le diría qué probar después.
  if (quote.hp) {
    return Response.json({ ok: true, delivered: false });
  }

  // las mismas reglas que valida el formulario, por si alguien postea derecho
  const invalid =
    quote.nombre.length < 2 ||
    !EMAIL.test(quote.email) ||
    quote.mensaje.length < 10 ||
    !CONTACT.tipoOptions.includes(quote.tipo as (typeof CONTACT.tipoOptions)[number]);

  if (invalid) {
    return Response.json({ ok: false, error: "campos" }, { status: 422 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (excedido(ip)) {
    return Response.json({ ok: false, error: "limite" }, { status: 429 });
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
      body: JSON.stringify({
        nombre: quote.nombre,
        email: quote.email,
        empresa: quote.empresa,
        tipo: quote.tipo,
        mensaje: quote.mensaje,
        origen: quote.origen,
        ...(Object.keys(quote.utm).length ? { utm: quote.utm } : {}),
        // La IP y el navegador son del VISITANTE, no de este server: el panel
        // no lo ve nunca y los necesita para rastrear spam.
        ip,
        userAgent: (request.headers.get("user-agent") ?? "").slice(0, 400),
      }),
    });
    if (!res.ok) throw new Error(`panel respondió ${res.status}`);
  } catch (err) {
    // El pedido queda en el log aunque el panel esté caído: un interesado no se
    // pierde porque el otro deploy tuvo un mal momento.
    console.error("[presupuesto] no se pudo entregar al panel", err, quote);
    return Response.json({ ok: false, error: "panel" }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}
