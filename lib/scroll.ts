"use client";

/**
 * PULSO · Scroll programático unificado (Lenis si está activo, nativo si no).
 * Mueve también el FOCO al destino: sin esto, un usuario de teclado que activa
 * un ancla queda "atrás" y el próximo Tab lo devuelve al origen (WCAG 2.4.3).
 */

import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** header fijo (70px) + aire. Espeja el scroll-margin-top de globals.css */
const HEADER_OFFSET = 88;

function focusInto(el: HTMLElement): void {
  el.tabIndex = -1;
  el.focus({ preventScroll: true });
}

export function scrollToHash(hash: string): void {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -HEADER_OFFSET });
  } else {
    // el nativo respeta el scroll-margin-top de la sección
    el.scrollIntoView({ behavior: "smooth" });
  }
  focusInto(el);
}

export function scrollToTop(): void {
  if (window.__lenis) {
    window.__lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const target =
    document.getElementById("inicio") ?? document.querySelector("h1");
  if (target instanceof HTMLElement) focusInto(target);
}
