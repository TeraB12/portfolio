/**
 * PULSO · Armado del mensaje de presupuesto para WhatsApp.
 * Sin backend: el formulario arma un mensaje estructurado y abre wa.me.
 */

import { COMPANY } from "@/content/data";

export type QuoteRequest = {
  name: string;
  email: string;
  devType: string;
  business: string;
  ideas?: string;
};

export function buildQuoteMessage(q: QuoteRequest): string {
  const lines = [
    `Hola ${COMPANY.name}, soy *${q.name.trim()}*.`,
    "Les escribo desde la web para pedir un presupuesto.",
    "",
    `*Qué necesito:* ${q.devType}`,
    `*Email de contacto:* ${q.email.trim()}`,
    "",
    "*Sobre mi empresa / proyecto:*",
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
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${text}`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}
