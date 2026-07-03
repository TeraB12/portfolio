"use client";

/**
 * PULSO · Reloj cardíaco global.
 *
 * UN solo requestAnimationFrame para todo el sitio. Cada frame:
 *  - calcula el sobre del latido (0→1 con ataque corto y decaimiento suave)
 *  - lo publica como custom properties `--pulse` y `--pulse-b` (desfasada medio
 *    intervalo) en :root, para que cualquier elemento "viva" solo con CSS
 *  - notifica a los suscriptores de frame (canvas) y de beat (animaciones puntuales)
 *
 * Con prefers-reduced-motion NO hay loop: `--pulse` queda fija en 0.5 y el sitio
 * es igual de legible quieto. Con la pestaña oculta, el reloj se pausa.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

export const PULSE_TIMING = {
  /** primer latido tras el load (coordina el boot del hero) */
  FIRST_BEAT_MS: 1800,
  /** intervalo base entre latidos */
  INTERVAL_MS: 4500,
  /** intervalo mínimo (clímax de contacto) */
  MIN_INTERVAL_MS: 1200,
  /** duración del sobre del latido */
  ENVELOPE_MS: 900,
} as const;

export type FrameInfo = {
  /** timestamp del frame (performance.now()) */
  t: number;
  /** sobre del latido principal, 0..1 */
  pulse: number;
  /** sobre desfasado medio intervalo, 0..1 */
  pulseB: number;
  /** ms desde el último latido */
  sinceBeat: number;
  /** número de latido actual */
  beatIndex: number;
};

type PulseAPI = {
  /** suscribe un callback por frame (canvas). Devuelve la función de baja. */
  onFrame: (cb: (f: FrameInfo) => void) => () => void;
  /** suscribe un callback por latido. Devuelve la función de baja. */
  onBeat: (cb: (beatIndex: number) => void) => () => void;
  /** acelera o normaliza el corazón. 1 = reposo, hasta ~3.75 = clímax */
  setRate: (mult: number) => void;
};

const PulseContext = createContext<PulseAPI | null>(null);

/** ataque 140ms, decaimiento suave 760ms */
function envelope(since: number): number {
  const A = 140;
  const D = PULSE_TIMING.ENVELOPE_MS - A;
  if (since < 0) return 0;
  if (since < A) return since / A;
  if (since < A + D) {
    const x = (since - A) / D;
    return 1 - x * x * (3 - 2 * x); // smoothstep de bajada
  }
  return 0;
}

export function PulseProvider({ children }: { children: ReactNode }) {
  const frameSubs = useRef(new Set<(f: FrameInfo) => void>());
  const beatSubs = useRef(new Set<(i: number) => void>());
  const rate = useRef(1);

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let running = false;
    let lastBeat = 0;
    let beatIndex = -1; // -1 = todavía no hubo primer latido
    let started = performance.now();

    const setVars = (p: number, pb: number) => {
      root.style.setProperty("--pulse", p.toFixed(3));
      root.style.setProperty("--pulse-b", pb.toFixed(3));
    };

    const interval = () =>
      Math.max(
        PULSE_TIMING.MIN_INTERVAL_MS,
        PULSE_TIMING.INTERVAL_MS / rate.current,
      );

    const loop = (t: number) => {
      if (!running) return;

      if (beatIndex === -1) {
        // esperando el primer latido del boot
        if (t - started >= PULSE_TIMING.FIRST_BEAT_MS) {
          beatIndex = 0;
          lastBeat = t;
          beatSubs.current.forEach((cb) => cb(0));
        }
      } else if (t - lastBeat >= interval()) {
        beatIndex += 1;
        lastBeat = t;
        beatSubs.current.forEach((cb) => cb(beatIndex));
      }

      const sinceBeat = beatIndex === -1 ? Infinity : t - lastBeat;
      const half = interval() / 2;
      const p = envelope(sinceBeat);
      const pb = envelope(
        beatIndex === -1 ? Infinity : (sinceBeat + half) % interval(),
      );
      setVars(p, pb);

      const info: FrameInfo = { t, pulse: p, pulseB: pb, sinceBeat, beatIndex };
      frameSubs.current.forEach((cb) => cb(info));

      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || mq.matches) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const applyMotionPref = () => {
      if (mq.matches) {
        stop();
        setVars(0.5, 0.5); // vida congelada pero visible
      } else {
        started = performance.now();
        beatIndex = -1;
        start();
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else if (!mq.matches) {
        // re-ancla para no disparar una ráfaga de latidos atrasados
        lastBeat = performance.now();
        start();
      }
    };

    applyMotionPref();
    mq.addEventListener("change", applyMotionPref);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      mq.removeEventListener("change", applyMotionPref);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const api = useMemo<PulseAPI>(
    () => ({
      onFrame: (cb) => {
        frameSubs.current.add(cb);
        return () => frameSubs.current.delete(cb);
      },
      onBeat: (cb) => {
        beatSubs.current.add(cb);
        return () => beatSubs.current.delete(cb);
      },
      setRate: (mult) => {
        rate.current = Math.min(4, Math.max(1, mult));
      },
    }),
    [],
  );

  return <PulseContext.Provider value={api}>{children}</PulseContext.Provider>;
}

export function usePulse(): PulseAPI {
  const ctx = useContext(PulseContext);
  if (!ctx) throw new Error("usePulse debe usarse dentro de <PulseProvider>");
  return ctx;
}
