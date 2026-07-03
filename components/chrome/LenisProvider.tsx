"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll global. Se desactiva por completo con prefers-reduced-motion.
 * La instancia queda en window.__lenis para scroll programático (nav, spine).
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const create = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        autoRaf: true,
        anchors: true,
      });
      window.__lenis = lenis;
    };
    const destroy = () => {
      lenis?.destroy();
      lenis = null;
      delete window.__lenis;
    };
    const onChange = () => (mq.matches ? destroy() : create());

    if (!mq.matches) create();
    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
      destroy();
    };
  }, []);

  return <>{children}</>;
}
