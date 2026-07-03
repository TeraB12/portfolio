"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { usePulse } from "@/lib/pulse";
import { bootDelaySeconds } from "@/lib/boot";

const AMBER = "255,180,84";
const ENVELOPE_TRAVEL_MS = 900;

/** forma del spike de electrocardiograma alrededor del punto dx=0 (px de offset vertical) */
function ecgOffset(dx: number): number {
  if (dx < -70 || dx > 50) return 0;
  if (dx < -40) return 6 * ((dx + 70) / 30); // pequeña Q
  if (dx < -10) return 6 - 34 * ((dx + 40) / 30); // subida R (hasta -28)
  if (dx < 10) return -28 + 40 * ((dx + 10) / 20); // caída S (hasta +12)
  return 12 * (1 - (dx - 10) / 40); // recuperación
}

/**
 * El electrocardiograma del hero: línea ámbar horizontal que se dibuja al boot,
 * recorre un spike con cada latido global y se curva suavemente hacia el cursor.
 * Un solo canvas, dibujado desde el rAF global de PulseProvider (cero loops propios).
 */
export function HeroSignal({ yRatio = 0.62 }: { yRatio?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const pulse = usePulse();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let visible = true;
    let beatT = -1;
    let lastFrameStatic = false;
    const mountT = performance.now();
    const drawDelay = bootDelaySeconds() * 1000 + 550;

    // cursor suavizado (solo punteros finos)
    const cursor = { x: -9999, y: -9999, sx: -9999, sy: -9999, in: false };
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // micro-cambios de dvh en mobile: si el tamaño no cambió de verdad, no realocar el canvas
      if (Math.abs(rect.width - w) < 1 && Math.abs(rect.height - h) < 1) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // reasignar width/height blanquea el buffer: forzar un redibujo aunque estemos en idle
      lastFrameStatic = false;
      if (reduced) drawStatic();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      const y = h * yRatio;
      ctx.lineWidth = 6;
      ctx.strokeStyle = `rgba(${AMBER},0.10)`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(${AMBER},0.85)`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    };

    const draw = (t: number) => {
      if (!visible || w === 0) return;

      const y = h * yRatio;
      const drawProgress = Math.min(
        1,
        Math.max(0, (t - mountT - drawDelay) / 600),
      );
      if (drawProgress === 0) return;

      // spike viajero
      let spikeX = -9999;
      let spikeAmp = 0;
      if (beatT > 0) {
        const p = (t - beatT) / ENVELOPE_TRAVEL_MS;
        if (p >= 0 && p <= 1) {
          spikeX = p * w;
          spikeAmp = p > 0.85 ? 1 - (p - 0.85) / 0.15 : 1;
        }
      }

      // cursor con inercia: rect fresco por frame (el scroll mueve el canvas sin pointermove)
      let cursorSettled = true;
      if (finePointer) {
        const rect = canvas.getBoundingClientRect();
        const lx = cursor.x - rect.left;
        const ly = cursor.y - rect.top;
        cursor.in = lx >= 0 && lx <= rect.width && ly >= 0 && ly <= rect.height;
        cursor.sx += (lx - cursor.sx) * 0.12;
        cursor.sy += (ly - cursor.sy) * 0.12;
        if (cursor.in) {
          cursorSettled =
            Math.abs(lx - cursor.sx) < 0.05 && Math.abs(ly - cursor.sy) < 0.05;
        }
      }

      // frame estático (línea completa, sin spike, cursor quieto): el buffer ya tiene
      // exactamente esta imagen, no rasterizar de nuevo. El primer frame estático sí
      // dibuja (el último animado puede dejar un remanente del spike desvaneciéndose).
      const isStatic = drawProgress === 1 && spikeAmp === 0 && cursorSettled;
      if (isStatic && lastFrameStatic) return;
      lastFrameStatic = isStatic;

      ctx.clearRect(0, 0, w, h);
      const endX = w * (0.05 + 0.95 * drawProgress);

      const pts: [number, number][] = [];
      for (let x = 0; x <= endX; x += 4) {
        let dy = 0;
        if (spikeAmp > 0) dy += ecgOffset(x - spikeX) * spikeAmp;
        if (cursor.in && finePointer) {
          const dx = x - cursor.sx;
          const g = Math.exp(-(dx * dx) / (2 * 100 * 100));
          const pull = Math.max(-12, Math.min(12, cursor.sy - y));
          dy += g * pull;
        }
        pts.push([x, y + dy]);
      }

      const stroke = (width: number, alpha: number) => {
        ctx.lineWidth = width;
        ctx.strokeStyle = `rgba(${AMBER},${alpha})`;
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (const [px, py] of pts) ctx.lineTo(px, py);
        ctx.stroke();
      };
      stroke(6, 0.1); // glow
      stroke(1.5, 0.9); // señal

      // cabeza del spike: un punto brillante
      if (spikeAmp > 0 && spikeX <= endX) {
        ctx.fillStyle = `rgba(${AMBER},${0.9 * spikeAmp})`;
        ctx.beginPath();
        ctx.arc(spikeX, y + ecgOffset(0) * spikeAmp, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      // coords crudas del viewport; draw() las localiza con un rect fresco por frame
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    if (finePointer && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    const offFrame = reduced ? () => {} : pulse.onFrame((f) => draw(f.t));
    const offBeat = reduced
      ? () => {}
      : pulse.onBeat(() => {
          beatT = performance.now();
        });

    if (reduced) drawStatic();

    return () => {
      ro.disconnect();
      io.disconnect();
      offFrame();
      offBeat();
      if (finePointer && !reduced) window.removeEventListener("pointermove", onMove);
    };
  }, [pulse, reduced, yRatio]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
