"use client";

import { useEffect } from "react";

/**
 * Motor de entradas por scroll del sitio entero.
 *
 * El estado inicial de cada `[data-reveal]` lo pone el CSS (ver globals.css),
 * así no hay flash antes de hidratar. Acá solo se agrega `data-shown` cuando
 * el elemento entra al viewport. Un único observer para toda la página.
 *
 * Dos detalles que importan:
 *  - a los ~1.5s se agrega `data-clear`, porque un clip-path activo recorta
 *    las sombras y los hovers de lo que ya se reveló.
 *  - red de seguridad a 4.2s: si el observer no dispara (scroll restaurado,
 *    pestaña en segundo plano), igual se revela todo.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const timers: number[] = [];

    const show = (el: HTMLElement) => {
      if (el.dataset.shown !== undefined) return;
      el.dataset.shown = "";
      timers.push(
        window.setTimeout(() => {
          el.dataset.clear = "";
        }, 1500),
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -7% 0px" },
    );

    for (const el of els) io.observe(el);

    const net = window.setTimeout(() => els.forEach(show), 4200);

    return () => {
      io.disconnect();
      clearTimeout(net);
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
