"use client";

import type { ReactNode } from "react";
import { scrollToHash, scrollToTop } from "@/lib/scroll";

/**
 * Ancla interna. Intercepta el clic para pasar por el scroll unificado
 * (Lenis + foco al destino) en vez del salto nativo.
 */
export function HashLink({
  href,
  children,
  className,
  top = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  top?: boolean;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (top) scrollToTop();
        else scrollToHash(href);
      }}
    >
      {children}
    </a>
  );
}
