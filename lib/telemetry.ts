"use client";

/**
 * PULSO · Telemetría honesta.
 * Uptime real de la sesión y hora real de Córdoba. Nada inventado.
 */

import { useEffect, useState } from "react";

/** inicio de la sesión, compartido por todas las instancias */
const SESSION_START = Date.now();

export function formatUptime(ms: number): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${String(h).padStart(2, "0")}:${mm}:${ss}` : `00:${mm}:${ss}`;
}

/** uptime de la sesión, tick por segundo. Devuelve "" hasta hidratar. */
export function useUptime(): string {
  const [uptime, setUptime] = useState("");
  useEffect(() => {
    const tick = () => setUptime(formatUptime(Date.now() - SESSION_START));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return uptime;
}

/** hora local de Córdoba (HH:MM), tick por segundo. Devuelve "" hasta hidratar. */
export function useCordobaTime(): string {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Argentina/Cordoba",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
