"use client";

/**
 * PULSO · Sección Proyectos (id "proyectos").
 *
 * Carrusel horizontal de tarjetas deslizables: cada tarjeta muestra la CAPTURA
 * REAL de la portada del sistema (public/previews, recortadas a 16/10). Si un
 * proyecto no tiene captura (`shot: null`, porque no es público) la tarjeta cae
 * al esquema técnico honesto de ese sistema, que se conserva de la versión
 * anterior de la sección.
 *
 * Interacción: scroll-snap nativo (táctil, trackpad y teclado salen gratis) +
 * arrastre con el mouse + flechas prev/next. El índice activo lo resuelve un
 * IntersectionObserver sobre las tarjetas, no un listener de scroll.
 *
 * Ya NO usa GSAP: el apilado con pin quedó reemplazado por el carrusel.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { PROJECTS, PROJECT_ARCHIVE } from "@/content/data";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

type ProjectItem = (typeof PROJECTS)["items"][number];

/* ============================================================
   Vocabulario visual de los esquemas (fallback sin captura)
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
   Esquemas por proyecto (diagramas reales del sistema, no mockups).
   Solo se usan cuando el proyecto no tiene captura pública.
   ============================================================ */

function PlataformaSchematic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Esquema de la plataforma: un centro que conecta el panel, las tiendas, la caja, el servidor, los datos, la app del celular y la inteligencia artificial."
    >
      <SchLine d="M200 158 L84 72" />
      <SchLine d="M200 158 L200 52" />
      <SchLine d="M200 158 L316 72" />
      <SchLine d="M200 158 L60 158" />
      <SchLine d="M200 158 L344 158" />
      <SchLine d="M200 158 L100 248" />
      <SchLine d="M200 158 L300 248" />
      <SignalPath d="M316 72 L200 158 L100 248" />
      <SchNode x={84} y={72} w={56} h={22} label="PANEL" />
      <SchNode x={200} y={52} w={64} h={22} label="TIENDAS" />
      <SchNode x={316} y={72} w={48} h={22} label="CAJA" />
      <SchNode x={60} y={158} w={66} h={22} label="CELULAR" />
      <SchNode x={344} y={158} w={66} h={22} label="SERVIDOR" />
      <SchNode x={100} y={248} w={52} h={22} label="DATOS" />
      <SchNode x={300} y={248} w={40} h={22} label="IA" />
      <SchNode x={200} y={158} w={92} h={30} label="CENTRO" accent />
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
      aria-label="Esquema de catálogos de revendedores: la empresa genera tres catálogos propios y el alta de cada uno se hace de forma automática."
    >
      <SchLine d="M200 78 L200 112 L84 112 L84 141" />
      <SchLine d="M200 78 L200 141" />
      <SchLine d="M200 78 L200 112 L316 112 L316 141" />
      <SchLine d="M84 163 L84 205" />
      <SchLine d="M200 163 L200 205" />
      <SchLine d="M316 163 L316 205" />
      <SchLine d="M84 205 L316 205" />
      <SchLine d="M200 205 L200 233" />
      <SchArrow x={200} y={233} dir="down" />
      <SignalPath d="M200 78 L200 233" />
      <SchNode x={84} y={152} w={64} h={22} label="REV-A" />
      <SchNode x={200} y={152} w={64} h={22} label="REV-B" />
      <SchNode x={316} y={152} w={64} h={22} label="REV-C" />
      <SchNode x={200} y={248} w={104} h={26} label="AUTOMÁTICO" />
      <SchNode x={200} y={64} w={84} h={28} label="EMPRESA" accent />
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
      <SchLine d="M82 150 L113 150" />
      <SchArrow x={113} y={150} />
      <SchLine d="M175 150 L203 150" />
      <SchArrow x={203} y={150} />
      <SchLine d="M297 150 L316 150" />
      <SchArrow x={316} y={150} />
      <SchLine d="M250 162 C250 212 144 212 144 162" dashed />
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
      aria-label="Esquema de la app del celular: el teléfono escanea códigos de barras con la cámara y se conecta con los avisos de pedidos y la caja."
    >
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
        LA APP
      </text>
      <SchLine d="M188 100 L282 100" />
      <SchArrow x={282} y={100} />
      <SchLine d="M188 204 L284 204" />
      <SchArrow x={284} y={204} />
      <SignalPath d="M174 152 L232 152 L232 204 L284 204" />
      <SchNode x={312} y={100} w={64} h={24} label="AVISOS" />
      <SchNode x={312} y={204} w={56} h={24} label="CAJA" />
    </svg>
  );
}

function MeliSchematic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Esquema del sistema Meli: varias cuentas de Mercado Libre convergen en un núcleo que consolida ventas y estadísticas por empresa."
    >
      <SchLine d="M84 75 L200 143" />
      <SchLine d="M200 67 L200 143" />
      <SchLine d="M316 75 L200 143" />
      <SchLine d="M200 173 L110 237" />
      <SchLine d="M200 173 L290 237" />
      <SchLine d="M246 158 L344 158" dashed />
      <SignalPath d="M84 75 L200 158 L110 237" />
      <SchNode x={84} y={64} w={56} h={22} label="ML A" />
      <SchNode x={200} y={56} w={56} h={22} label="ML B" />
      <SchNode x={316} y={64} w={56} h={22} label="ML C" />
      <SchNode x={344} y={158} w={80} h={22} label="EMPRESAS" />
      <SchNode x={110} y={248} w={62} h={22} label="VENTAS" />
      <SchNode x={290} y={248} w={104} h={22} label="ESTADÍSTICAS" />
      <SchNode x={200} y={158} w={92} h={30} label="SISTEMA" accent />
      <circle cx={237} cy={150} r={2.5} fill={SCH.amber} className="led-b" />
    </svg>
  );
}

function Schematic({ id }: { id: ProjectItem["id"] }) {
  switch (id) {
    case "meli":
      return <MeliSchematic />;
    case "asistente":
      return <AsistenteSchematic />;
    case "android":
      return <AndroidSchematic />;
    case "catalogos":
      return <CatalogosSchematic />;
    default:
      return <PlataformaSchematic />;
  }
}

/* ============================================================
   Ticks de instrumento en las esquinas del visor
   ============================================================ */
function CornerTicks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-pulse/50" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-pulse/50" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-pulse/50" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-pulse/50" />
    </div>
  );
}

/* ============================================================
   Tarjeta del carrusel: visor 16/10 + anillo de specs + ficha
   ============================================================ */
function ProjectCard({ item, index }: { item: ProjectItem; index: number }) {
  // `PROJECTS.items` es `as const`, así que cada tarjeta es un tipo distinto y
  // preguntar por `item.shot` dentro del JSX estrecha la unión a `never`.
  // Sacamos los valores acá, ensanchados, y el JSX no tiene que narrowear nada.
  const shot: string | null = item.shot;
  const shotAlt: string | null = item.shotAlt;
  const url: string | null = item.url;
  const urlLabel: string | null = item.urlLabel;
  const specs: readonly string[] = item.specs;
  const bullets: readonly string[] = item.bullets;

  return (
    <article
      data-card
      data-index={index}
      className={cn(
        "group relative flex w-[86vw] max-w-[880px] flex-none snap-start flex-col",
        "border border-hairline bg-surface/40 transition-colors duration-500",
        "hover:border-pulse/30 md:w-[72vw]",
      )}
    >
      {/* visor: la captura real de la portada, o el esquema del sistema */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-hairline bg-bg">
        {shot ? (
          <Image
            src={shot}
            alt={shotAlt ?? item.name}
            width={1440}
            height={900}
            // ya vienen recortadas y en WebP: no hace falta reoptimizarlas
            unoptimized
            sizes="(min-width: 768px) 72vw, 86vw"
            className={cn(
              "h-full w-full object-cover object-top",
              // la captura vive apagada dentro del instrumento y se enciende al hover
              "brightness-[0.82] saturate-[0.9] transition-all duration-700",
              "group-hover:brightness-100 group-hover:saturate-100",
            )}
          />
        ) : (
          <Schematic id={item.id} />
        )}
        <CornerTicks />
      </div>

      {/* anillo de specs */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-hairline px-5 py-2.5 md:px-7">
        {specs.map((s) => (
          <span key={s} className="mono-label text-dim">
            {s}
          </span>
        ))}
      </div>

      {/* ficha */}
      <div className="flex flex-1 flex-col px-5 py-7 md:px-7 md:py-8">
        <h3 className="font-display text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold leading-[1] tracking-[-0.02em] text-ink">
          {item.name}
        </h3>
        <p className="mt-2.5 text-sm font-medium text-pulse">{item.kind}</p>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-dim">
          {item.description}
        </p>

        <ul className="mt-6 flex flex-col gap-2.5">
          {bullets.map((b) => (
            <li
              key={b}
              className="border-l border-hairline pl-4 text-[14px] leading-relaxed text-dim transition-colors duration-300 hover:border-pulse/50"
            >
              {b}
            </li>
          ))}
        </ul>

        {url && (
          <div className="mt-7">
            <ButtonLink
              variant="ghost"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {urlLabel ?? "Ver en vivo"}
              <ArrowUpRight
                aria-hidden
                className="ml-2 h-4 w-4"
                strokeWidth={1.5}
              />
            </ButtonLink>
          </div>
        )}
      </div>
    </article>
  );
}

/* ============================================================
   Carrusel: scroll-snap nativo + arrastre con mouse + flechas
   ============================================================ */
const TOTAL = PROJECTS.items.length;

function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  /* índice activo: IntersectionObserver, no listener de scroll */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-card]");

    const io = new IntersectionObserver(
      (entries) => {
        // la tarjeta más visible manda
        let best: { i: number; ratio: number } | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.index);
          if (!best || e.intersectionRatio > best.ratio) {
            best = { i, ratio: e.intersectionRatio };
          }
        }
        if (best) setActive(best.i);
      },
      { root: track, threshold: [0.5, 0.75, 1] },
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  /* mover una tarjeta (paso real medido del DOM, no un número mágico) */
  const step = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const first = track.querySelector<HTMLElement>("[data-card]");
      const second = track.querySelector<HTMLElement>(
        "[data-card]:nth-of-type(2)",
      );
      const delta =
        first && second
          ? second.offsetLeft - first.offsetLeft
          : (first?.offsetWidth ?? track.clientWidth);
      track.scrollBy({
        left: dir * delta,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [reduced],
  );

  /* arrastre con el mouse (el táctil ya funciona nativo, no lo tocamos) */
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!drag.current.active || !track) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    // el arrastre necesita desactivar el snap o el navegador pelea con nosotros
    if (drag.current.moved > 4) track.style.scrollSnapType = "none";
    track.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    const track = trackRef.current;
    if (!drag.current.active || !track) return;
    drag.current.active = false;
    // devolver el snap deja que el navegador acomode la tarjeta más cercana
    track.style.scrollSnapType = "";
  };

  /* un click que en realidad fue un arrastre no debe abrir el link */
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current.moved = 0;
  };

  return (
    <div className="mt-12 md:mt-16">
      {/* barra de instrumento: índice, progreso y flechas */}
      <div className="mx-auto mb-6 flex max-w-[1400px] items-center gap-6 px-6 md:px-12 lg:pl-28 lg:pr-20">
        <span className="mono-label shrink-0 text-dim tabular-nums">
          {String(active + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>

        <div
          aria-hidden
          className="relative h-px flex-1 bg-[var(--hairline)]"
        >
          <motion.span
            className="absolute inset-y-0 left-0 bg-pulse"
            animate={{ width: `${((active + 1) / TOTAL) * 100}%` }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE }}
          />
        </div>

        <span className="mono-label hidden shrink-0 text-faint sm:inline">
          {PROJECTS.hint}
        </span>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={active === 0}
            aria-label="Proyecto anterior"
            className="flex h-9 w-9 items-center justify-center border border-hairline text-dim transition-colors duration-300 hover:border-pulse/50 hover:text-pulse disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={active === TOTAL - 1}
            aria-label="Proyecto siguiente"
            className="flex h-9 w-9 items-center justify-center border border-hairline text-dim transition-colors duration-300 hover:border-pulse/50 hover:text-pulse disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* el riel: full-bleed, snap por tarjeta.
          data-lenis-prevent evita que el scroll suave global se coma el gesto. */}
      <div
        ref={trackRef}
        data-lenis-prevent
        role="region"
        tabIndex={0}
        aria-label="Carrusel de proyectos. Usá las flechas del teclado para recorrerlo."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className={cn(
          "flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-4",
          "px-6 scroll-px-6 md:px-12 md:scroll-px-12 lg:pl-28 lg:scroll-pl-28 lg:pr-20",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "cursor-grab active:cursor-grabbing",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pulse",
        )}
      >
        {PROJECTS.items.map((item, i) => (
          <ProjectCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Sección
   ============================================================ */
export function Projects() {
  return (
    <Section id="proyectos" bleed>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:pl-28 lg:pr-20">
        <SectionTitle eyebrow={PROJECTS.eyebrow} title={PROJECTS.title} />
        <Reveal>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-dim">
            {PROJECTS.intro}
          </p>
        </Reveal>
      </div>

      <Carousel />

      <ProjectArchive />
    </Section>
  );
}

/* ============================================================
   Archivo: el recorrido antes y alrededor de la plataforma.
   Filas editoriales SIN links al código; solo linkea la demo viva.
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
