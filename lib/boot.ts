"use client";

/**
 * PULSO · Coordinación del boot (preloader ↔ hero).
 * El preloader corre una sola vez por sesión; el hero retrasa su secuencia
 * de entrada solo cuando el preloader está en pantalla.
 */

const BOOT_KEY = "pulso-boot";

/** duración total del preloader en ms */
export const PRELOADER_MS = 1400;

export function hasBooted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return true;
  }
}

export function markBooted(): void {
  try {
    sessionStorage.setItem(BOOT_KEY, "1");
  } catch {
    /* modo incógnito estricto: no pasa nada */
  }
}

/** segundos de retraso que el hero debe aplicar a su secuencia de entrada */
export function bootDelaySeconds(): number {
  return hasBooted() ? 0 : PRELOADER_MS / 1000 - 0.25;
}
