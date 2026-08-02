"use client";

import { useEffect, useRef } from "react";

/**
 * El pulso 3D del hero.
 *
 * Una tira de electrocardiograma que se desplaza sin fin detrás del titular.
 * El loop es perfecto porque la onda es periódica exactamente cada BEAT: se
 * desplaza el módulo del ancho de un latido y nunca se ve el salto.
 *
 * three.js entra por import dinámico dentro del efecto, así no pesa en el
 * bundle inicial ni corre en el server. Si el import falla o el visitante pidió
 * menos movimiento, el hero simplemente queda sin canvas: se ve igual de bien.
 *
 * El color sale de la variable --accent, así que si cambia el dorado de marca
 * no hay que tocar nada de acá.
 */
export function HeroPulse() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = canvas.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        return; // sin 3D, el hero se sostiene solo
      }
      if (disposed) return;

      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim() || "#E9B23E";
      const col = new THREE.Color(accent);

      const renderer = new THREE.WebGLRenderer({
        canvas: el,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0a0a08, 9, 26);

      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120);
      camera.position.set(0, 1.05, 9.4);

      const rig = new THREE.Group();
      rig.rotation.y = -0.44;
      rig.rotation.x = 0.14;
      scene.add(rig);

      const strip = new THREE.Group();
      rig.add(strip);

      // la onda: una campana por tramo del complejo, el pico R al cubo
      const bump = (p: number, a: number, b: number) =>
        p < a || p > b ? 0 : Math.sin(((p - a) / (b - a)) * Math.PI);
      const ecg = (p: number) =>
        0.13 * bump(p, 0.08, 0.19) -
        0.09 * bump(p, 0.26, 0.31) +
        1.05 * Math.pow(bump(p, 0.31, 0.365), 3) -
        0.3 * bump(p, 0.365, 0.425) +
        0.27 * bump(p, 0.5, 0.7);

      const BEAT = 3.0;
      const BEATS = 12;
      const PER = 150;

      const pts: InstanceType<typeof THREE.Vector3>[] = [];
      for (let b = 0; b < BEATS; b++) {
        for (let i = 0; i < PER; i++) {
          const p = i / PER;
          pts.push(new THREE.Vector3(b * BEAT + p * BEAT, ecg(p) * 1.35, 0));
        }
      }
      pts.push(new THREE.Vector3(BEATS * BEAT, 0, 0));

      const curve = new THREE.CatmullRomCurve3(pts);
      const tube = new THREE.TubeGeometry(curve, pts.length, 0.032, 7, false);

      const lineMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.95,
      });
      strip.add(new THREE.Mesh(tube, lineMat));

      const glowGeo = new THREE.TubeGeometry(
        curve,
        Math.floor(pts.length / 3),
        0.17,
        6,
        false,
      );
      const glowMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.09,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      strip.add(new THREE.Mesh(glowGeo, glowMat));

      // reflejo: la misma geometría dada vuelta y hundida
      const mirrorMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.1,
      });
      const mirror = new THREE.Mesh(tube, mirrorMat);
      mirror.scale.y = -1;
      mirror.position.y = -2.5;
      strip.add(mirror);

      const baseGeo = new THREE.BoxGeometry(BEATS * BEAT, 0.006, 0.006);
      const baseMat = new THREE.MeshBasicMaterial({
        color: 0xf4f1ea,
        transparent: true,
        opacity: 0.13,
      });
      const baseLine = new THREE.Mesh(baseGeo, baseMat);
      baseLine.position.set((BEATS * BEAT) / 2, 0, 0);
      strip.add(baseLine);

      // una esfera en el pico R de cada latido; laten todas juntas
      const peakGeo = new THREE.SphereGeometry(0.055, 14, 14);
      const peakMat = new THREE.MeshBasicMaterial({ color: 0xf4f1ea });
      const peaks: InstanceType<typeof THREE.Mesh>[] = [];
      for (let b = 0; b < BEATS; b++) {
        const d = new THREE.Mesh(peakGeo, peakMat);
        d.position.set(b * BEAT + 0.34 * BEAT, ecg(0.34) * 1.35, 0);
        strip.add(d);
        peaks.push(d);
      }

      // polvo de fondo: da profundidad sin competir con el texto
      const gN = 1400;
      const gp = new Float32Array(gN * 3);
      for (let i = 0; i < gN; i++) {
        gp[i * 3] = (Math.random() - 0.5) * 46;
        gp[i * 3 + 1] = (Math.random() - 0.5) * 15;
        gp[i * 3 + 2] = -2 - Math.random() * 9;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(gp, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0xf4f1ea,
        size: 0.022,
        transparent: true,
        opacity: 0.3,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      rig.add(dust);

      let mx = 0;
      let my = 0;
      let tmx = 0;
      let tmy = 0;
      const onMove = (e: MouseEvent) => {
        tmx = e.clientX / window.innerWidth - 0.5;
        tmy = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("mousemove", onMove, { passive: true });

      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.fov = w < 760 ? 52 : 38;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);
      el.style.opacity = "1";

      const t0 = performance.now();
      let raf = requestAnimationFrame(function loop(now: number) {
        raf = requestAnimationFrame(loop);
        const t = (now - t0) / 1000;

        strip.position.x = -3.2 - ((t * 0.9 * BEAT) % BEAT) - BEAT * 2;

        mx += (tmx - mx) * 0.045;
        my += (tmy - my) * 0.045;
        rig.rotation.y = -0.44 + mx * 0.2;
        rig.rotation.x = 0.14 - my * 0.12;
        dust.rotation.z = t * 0.008;

        const b = 0.5 + 0.5 * Math.sin(t * Math.PI * 1.35);
        const s = 1 + b * 0.75;
        for (const p of peaks) p.scale.setScalar(s);
        glowMat.opacity = 0.06 + b * 0.07;

        renderer.render(scene, camera);
      });

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("mousemove", onMove);
        tube.dispose();
        glowGeo.dispose();
        baseGeo.dispose();
        peakGeo.dispose();
        dustGeo.dispose();
        lineMat.dispose();
        glowMat.dispose();
        mirrorMat.dispose();
        baseMat.dispose();
        peakMat.dispose();
        dustMat.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className="pointer-events-none absolute inset-0 block h-full w-full opacity-0 transition-opacity duration-[1400ms] delay-200"
    />
  );
}
