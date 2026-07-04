"use client";

/**
 * PULSO · Sección Proyectos (id "proyectos").
 * Paneles caso-estudio apilados con pin GSAP (sticky-stack) en lg+ sin
 * reduced-motion. Cada panel: texto a la izquierda, esquema técnico SVG
 * honesto a la derecha en marco de instrumento. En mobile: apilado normal,
 * esquema arriba. Única sección (junto a Timeline) autorizada a usar GSAP.
 */

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import { PROJECTS, PROJECT_ARCHIVE } from "@/content/data";
import { cn } from "@/lib/utils";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

type ProjectItem = (typeof PROJECTS)["items"][number];

/* ============================================================
   Vocabulario visual de los esquemas (ver spec de la sección)
   ============================================================ */
const SCH = {
  line: "rgba(233,230,221,0.15)",
  arrow: "rgba(233,230,221,0.3)",
  nodeStroke: "rgba(233,230,221,0.2)",
  nodeFill: "rgba(10,10,8,0.85)",
  label: "#A8A49B",
  amber: "#FFB454",
} as const;

function SchLine({ d, dashed = false }: { d: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={SCH.line}
      strokeWidth={1}
      strokeDasharray={dashed ? "4 5" : undefined}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function SchArrow({
  x,
  y,
  dir = "right",
}: {
  x: number;
  y: number;
  dir?: "right" | "down";
}) {
  const d =
    dir === "right"
      ? `M${x - 5} ${y - 3.5} L${x} ${y} L${x - 5} ${y + 3.5}`
      : `M${x - 3.5} ${y - 5} L${x} ${y} L${x + 3.5} ${y - 5}`;
  return (
    <path
      d={d}
      fill="none"
      stroke={SCH.arrow}
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function SchNode({
  x,
  y,
  w,
  h,
  label,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        fill={SCH.nodeFill}
        stroke={accent ? "rgba(255,180,84,0.85)" : SCH.nodeStroke}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fill={accent ? SCH.amber : SCH.label}
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}
      >
        {label}
      </text>
    </g>
  );
}

/** La señal cruza el esquema: path ámbar 1.5px que se dibuja una vez. */
function SignalPath({ d }: { d: string }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <path
        d={d}
        fill="none"
        stroke={SCH.amber}
        strokeWidth={1.5}
        opacity={0.9}
        vectorEffect="non-scaling-stroke"
      />
    );
  }
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={SCH.amber}
      strokeWidth={1.5}
      strokeLinecap="square"
      vectorEffect="non-scaling-stroke"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.9 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.6, ease: EASE }}
    />
  );
}

/* ============================================================
   Esquemas por proyecto (diagramas reales del sistema, no mockups)
   ============================================================ */

function TerabSchematic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Esquema de la plataforma: un núcleo central conectado con panel, tiendas, POS, API, base de datos, app Android e inteligencia artificial."
    >
      {/* conexiones núcleo, satélites */}
      <SchLine d="M200 158 L84 72" />
      <SchLine d="M200 158 L200 52" />
      <SchLine d="M200 158 L316 72" />
      <SchLine d="M200 158 L60 158" />
      <SchLine d="M200 158 L344 158" />
      <SchLine d="M200 158 L100 248" />
      <SchLine d="M200 158 L300 248" />
      {/* la señal: una venta en el POS atraviesa el núcleo y aterriza en la DB */}
      <SignalPath d="M316 72 L200 158 L100 248" />
      <SchNode x={84} y={72} w={56} h={22} label="PANEL" />
      <SchNode x={200} y={52} w={64} h={22} label="TIENDAS" />
      <SchNode x={316} y={72} w={44} h={22} label="POS" />
      <SchNode x={60} y={158} w={66} h={22} label="ANDROID" />
      <SchNode x={344} y={158} w={44} h={22} label="API" />
      <SchNode x={100} y={248} w={40} h={22} label="DB" />
      <SchNode x={300} y={248} w={40} h={22} label="IA" />
      <SchNode x={200} y={158} w={92} h={30} label="CORE" accent />
      <circle cx={237} cy={150} r={2.5} fill={SCH.amber} className="led" />
    </svg>
  );
}

function CatalogosSchematic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Esquema de catálogos de revendedores: el comercio genera tres subdominios propios y el alta del dominio se hace vía la API de Vercel."
    >
      {/* comercio hacia los tres subdominios (ruteo ortogonal) */}
      <SchLine d="M200 78 L200 112 L84 112 L84 141" />
      <SchLine d="M200 78 L200 141" />
      <SchLine d="M200 78 L200 112 L316 112 L316 141" />
      {/* subdominios hacia el bus y bajada al alta vía Vercel API */}
      <SchLine d="M84 163 L84 205" />
      <SchLine d="M200 163 L200 205" />
      <SchLine d="M316 163 L316 205" />
      <SchLine d="M84 205 L316 205" />
      <SchLine d="M200 205 L200 233" />
      <SchArrow x={200} y={233} dir="down" />
      {/* la señal: el alta de un subdominio baja del comercio a la API */}
      <SignalPath d="M200 78 L200 233" />
      <SchNode x={84} y={152} w={64} h={22} label="REV-A" />
      <SchNode x={200} y={152} w={64} h={22} label="REV-B" />
      <SchNode x={316} y={152} w={64} h={22} label="REV-C" />
      <SchNode x={200} y={248} w={92} h={26} label="VERCEL API" />
      <SchNode x={200} y={64} w={84} h={28} label="COMERCIO" accent />
      <circle cx={232} cy={64} r={2.5} fill={SCH.amber} className="led-b" />
    </svg>
  );
}

function AsistenteSchematic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Esquema del asistente de tienda: el cliente habla con el chat de inteligencia artificial, que consulta el catálogo real y deriva la venta a WhatsApp."
    >
      {/* cadena horizontal con flechas */}
      <SchLine d="M82 150 L113 150" />
      <SchArrow x={113} y={150} />
      <SchLine d="M175 150 L203 150" />
      <SchArrow x={203} y={150} />
      <SchLine d="M297 150 L316 150" />
      <SchArrow x={316} y={150} />
      {/* retorno: el catálogo responde al chat con stock del momento */}
      <SchLine d="M250 162 C250 212 144 212 144 162" dashed />
      {/* la señal: chat, catálogo real, WhatsApp */}
      <SignalPath d="M144 150 L352 150" />
      <SchNode x={52} y={150} w={60} h={24} label="CLIENTE" />
      <SchNode x={250} y={150} w={94} h={24} label="CATÁLOGO REAL" />
      <SchNode x={352} y={150} w={72} h={24} label="WHATSAPP" />
      <SchNode x={144} y={150} w={62} h={26} label="CHAT IA" accent />
      <circle cx={169} cy={142} r={2.5} fill={SCH.amber} className="led" />
    </svg>
  );
}

const BARCODE_BARS: ReadonlyArray<readonly [number, number]> = [
  [100, 3],
  [106, 1.5],
  [111, 4],
  [118, 1.5],
  [123, 3],
  [129, 1.5],
  [134, 4],
  [141, 1.5],
  [146, 3],
  [152, 1.5],
  [157, 4],
  [164, 1.5],
  [169, 3],
];

function AndroidSchematic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Esquema de la app admin Android: el teléfono escanea códigos de barras con la cámara y se conecta con las notificaciones push y el POS."
    >
      {/* contorno del teléfono, aristas vivas */}
      <rect
        x={78}
        y={52}
        width={110}
        height={206}
        fill="none"
        stroke="rgba(233,230,221,0.25)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <SchLine d="M120 64 L146 64" />
      <rect
        x={86}
        y={74}
        width={94}
        height={150}
        fill="none"
        stroke={SCH.line}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      {/* código de barras en pantalla */}
      {BARCODE_BARS.map(([bx, bw]) => (
        <rect
          key={bx}
          x={bx}
          y={132}
          width={bw}
          height={40}
          fill="rgba(233,230,221,0.22)"
        />
      ))}
      {/* línea de escaneo ámbar, late con el reloj global */}
      <line
        x1={92}
        y1={152}
        x2={174}
        y2={152}
        stroke={SCH.amber}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
        className="led"
      />
      <text
        x={133}
        y={242}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fill={SCH.amber}
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}
      >
        APP ADMIN
      </text>
      {/* flechas hacia PUSH y POS */}
      <SchLine d="M188 100 L282 100" />
      <SchArrow x={282} y={100} />
      <SchLine d="M188 204 L284 204" />
      <SchArrow x={284} y={204} />
      {/* la señal: el escaneo alimenta directo al POS */}
      <SignalPath d="M174 152 L232 152 L232 204 L284 204" />
      <SchNode x={312} y={100} w={60} h={24} label="PUSH" />
      <SchNode x={312} y={204} w={56} h={24} label="POS" />
    </svg>
  );
}

function Schematic({ id }: { id: ProjectItem["id"] }) {
  switch (id) {
    case "terab":
      return <TerabSchematic />;
    case "catalogos":
      return <CatalogosSchematic />;
    case "asistente":
      return <AsistenteSchematic />;
    case "android":
      return <AndroidSchematic />;
  }
}

/* ============================================================
   Marco de instrumento: hairline, ticks de esquina, anillo de specs
   ============================================================ */
function InstrumentFrame({
  specs,
  children,
}: {
  specs: readonly string[];
  children: React.ReactNode;
}) {
  return (
    <div className="relative aspect-[4/3] w-full border border-hairline bg-surface/50">
      <span
        aria-hidden
        className="absolute left-0 top-0 h-3 w-3 border-l border-t border-pulse/50"
      />
      <span
        aria-hidden
        className="absolute right-0 top-0 h-3 w-3 border-r border-t border-pulse/50"
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-pulse/50"
      />
      <span
        aria-hidden
        className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-pulse/50"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-wrap gap-x-4 gap-y-1 border-b border-hairline px-4 py-2.5">
        {specs.map((s) => (
          <span key={s} className="mono-label text-dim">
            {s}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}

/* ============================================================
   Callouts: se encienden en secuencia al entrar al viewport
   ============================================================ */
const calloutList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const calloutItem: Variants = {
  hidden: { opacity: 0.25, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ============================================================
   Panel caso-estudio
   ============================================================ */
function ProjectPanel({ item, index }: { item: ProjectItem; index: number }) {
  const reduced = useReducedMotion();

  return (
    <article
      data-panel
      style={{ zIndex: index + 1 }}
      className="relative flex items-center border-t border-hairline bg-bg py-16 lg:min-h-[100dvh] lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:pl-28 lg:pr-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* texto: abajo en mobile, izquierda en desktop */}
          <div className="order-2 lg:order-1">
            <h3 className="font-display text-[clamp(2.6rem,4.5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-ink">
              {item.name}
            </h3>
            <p className="mt-3 text-sm font-medium text-pulse">{item.kind}</p>
            <p className="mt-5 max-w-[50ch] leading-relaxed text-dim">
              {item.description}
            </p>

            <motion.ul
              className="mt-10 flex flex-col gap-5"
              variants={calloutList}
              initial={reduced ? false : "hidden"}
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              {item.callouts.map((c) => (
                <motion.li
                  key={c.t}
                  variants={calloutItem}
                  className="border-l border-hairline pl-5 transition-colors duration-300 hover:border-pulse/50"
                >
                  <p className="font-medium text-ink">{c.t}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-dim">
                    {c.d}
                  </p>
                </motion.li>
              ))}
            </motion.ul>

            {item.url && (
              <div className="mt-9">
                <ButtonLink
                  variant="ghost"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver en vivo
                  <ArrowUpRight
                    aria-hidden
                    className="ml-2 h-4 w-4"
                    strokeWidth={1.5}
                  />
                </ButtonLink>
              </div>
            )}
          </div>

          {/* esquema: arriba en mobile, derecha en desktop */}
          <div className="order-1 lg:order-2">
            <InstrumentFrame specs={item.specsRing}>
              <Schematic id={item.id} />
            </InstrumentFrame>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   Sección: sticky-stack con pin GSAP (solo lg+ y sin reduced-motion)
   ============================================================ */
export function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = gsap.utils.toArray<HTMLElement>(
            "[data-panel]",
            wrapRef.current,
          );
          if (panels.length < 2) return;
          const last = panels[panels.length - 1];

          panels.forEach((panel, i) => {
            if (panel === last) return;
            ScrollTrigger.create({
              trigger: panel,
              // paneles más altos que el viewport se pinean desde su fondo
              // para que el CTA y los callouts inferiores lleguen a verse
              start: () =>
                panel.offsetHeight <= window.innerHeight
                  ? "top top"
                  : "bottom bottom",
              endTrigger: last,
              end: "top top",
              pin: true,
              pinSpacing: false,
            });
            gsap.to(panel, {
              scale: 0.94,
              opacity: 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: panels[i + 1],
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
          });
        },
      );
    }, wrapRef);

    // Experiencia (más arriba) expande filas y cambia la altura del documento:
    // re-medir los pins con un refresh debounced.
    let t: number | undefined;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);

    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <Section id="proyectos" bleed>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:pl-28 lg:pr-20">
        <SectionTitle eyebrow={PROJECTS.eyebrow} title={PROJECTS.title} />
      </div>
      <div ref={wrapRef}>
        {PROJECTS.items.map((item, i) => (
          <ProjectPanel key={item.id} item={item} index={i} />
        ))}
      </div>
      <ProjectArchive />
    </Section>
  );
}

/* ============================================================
   Archivo: el recorrido antes y alrededor de la plataforma.
   Filas editoriales SIN links al código (decisión de Mateo);
   solo linkea la demo viva cuando existe.
   ============================================================ */
function ArchiveRowContent({
  p,
  linked,
}: {
  p: (typeof PROJECT_ARCHIVE)["items"][number];
  linked: boolean;
}) {
  return (
    <>
      <span className="order-1 font-mono text-[12px] tracking-wide text-dim md:order-none">
        {p.year}
      </span>
      <span className="col-span-2 md:col-span-1">
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span
            className={cn(
              "font-display text-xl font-bold text-ink md:text-2xl",
              linked && "transition-colors duration-300 group-hover:text-pulse",
            )}
          >
            {p.name}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
            {p.stack.join("  /  ")}
          </span>
        </span>
        <span className="mt-2 block max-w-[62ch] text-[15px] leading-relaxed text-dim">
          {p.description}
        </span>
      </span>
      {linked && (
        <ArrowUpRight
          aria-hidden
          strokeWidth={1.5}
          className="h-4 w-4 self-center text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pulse"
        />
      )}
    </>
  );
}

function ProjectArchive() {
  const rowClass =
    "grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-hairline py-7 md:grid-cols-[110px_1fr_auto]";

  return (
    <div className="mx-auto mt-28 max-w-[1400px] px-6 md:mt-36 md:px-12 lg:pl-28 lg:pr-20">
      <Reveal>
        <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-ink md:text-3xl">
          {PROJECT_ARCHIVE.title}
        </h3>
        <p className="mt-3 max-w-[55ch] text-[15px] leading-relaxed text-dim">
          {PROJECT_ARCHIVE.intro}
        </p>
      </Reveal>

      <div className="mt-10 border-t border-hairline">
        {PROJECT_ARCHIVE.items.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            {p.link ? (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${p.name} en vivo`}
                className={cn(
                  rowClass,
                  "group transition-colors duration-300 hover:bg-surface/60",
                )}
              >
                <ArchiveRowContent p={p} linked />
              </a>
            ) : (
              <div className={rowClass}>
                <ArchiveRowContent p={p} linked={false} />
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
