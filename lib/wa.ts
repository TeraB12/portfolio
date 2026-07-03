/**
 * PULSO · Armado del mensaje de presupuesto para WhatsApp.
 * Sin backend: el formulario arma un mensaje estructurado y abre wa.me.
 */

import { IDENTITY } from "@/content/data";

export type QuoteRequest = {
  name: string;
  email: string;
  devType: string;
  business: string;
  ideas?: string;
};

export function buildQuoteMessage(q: QuoteRequest): string {
  const lines = [
    `Hola Mateo, soy *${q.name.trim()}*.`,
    "Te escribo desde tu portfolio para pedir un presupuesto.",
    "",
    `*Tipo de desarrollo:* ${q.devType}`,
    `*Email de contacto:* ${q.email.trim()}`,
    "",
    "*Sobre mi comercio / proyecto:*",
    q.business.trim(),
  ];
  if (q.ideas && q.ideas.trim()) {
    lines.push("", "*Ideas y contexto:*", q.ideas.trim());
  }
  lines.push("", "Quedo atento. ¡Gracias!");
  return lines.join("\n");
}

export function buildWhatsAppUrl(q: QuoteRequest): string {
  const text = encodeURIComponent(buildQuoteMessage(q));
  return `https://wa.me/${IDENTITY.whatsappNumber}?text=${text}`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}
