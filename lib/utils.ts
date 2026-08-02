import type { CSSProperties } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retraso de un reveal, en ms. El CSS lo lee como `--rd` y lo suma a la
 * transición (ver globals.css). Se usa sobre todo en el hero, donde cada
 * bloque entra 120ms después del anterior.
 */
export function rd(ms: number): CSSProperties {
  return { "--rd": `${ms}ms` } as CSSProperties;
}
