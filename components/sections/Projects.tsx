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
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { PROJECTS } from "@/content/data";
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

/** Logiweb: la lista del proveedor entra y sale convertida en documentos. */
function LogiwebSchematic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Esquema de las funciones a medida de Logiweb: la lista de precios del proveedor entra al sistema y sale como remitos, PDF y venta por medio pack."
    >
      <SchLine d="M92 150 L140 150" />
      <SchArrow x={140} y={150} />
      <SchLine d="M246 150 L286 92" />
      <SchArrow x={286} y={92} />
      <SchLine d="M246 150 L286 150" />
      <SchArrow x={286} y={150} />
      <SchLine d="M246 150 L286 208" />
      <SchArrow x={286} y={208} />
      {/* la señal: la lista cruza el sistema y sale hecha remito */}
      <SignalPath d="M60 150 L200 150 L316 150" />
      <SchNode x={60} y={150} w={68} h={26} label="LISTA" />
      <SchNode x={330} y={92} w={80} h={24} label="REMITOS" />
      <SchNode x={330} y={150} w={62} h={24} label="PDF" />
      <SchNode x={330} y={208} w={98} h={24} label="MEDIO PACK" />
      <SchNode x={200} y={150} w={92} h={30} label="SISTEMA" accent />
      <circle cx={237} cy={142} r={2.5} fill={SCH.amber} className="led" />
    </svg>
  );
}

/** El Paso del Elefante: depósito por posiciones, tareas medidas y cuenta en dos monedas. */
function ElefanteSchematic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Esquema del sistema de El Paso del Elefante: un depósito dividido en racks y posiciones, tareas con cronómetro y cuenta corriente en pesos y en dólares."
    >
      {/* la grilla del depósito: racks y posiciones */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={40 + col * 26}
            y={62 + row * 26}
            width={20}
            height={20}
            fill={SCH.nodeFill}
            stroke={SCH.nodeStroke}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        )),
      )}
      {/* la posición ocupada late */}
      <rect
        x={66}
        y={88}
        width={20}
        height={20}
        fill="rgba(255,180,84,0.25)"
        stroke="rgba(255,180,84,0.85)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        className="led"
      />
      <text
        x={92}
        y={158}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fill={SCH.amber}
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}
      >
        DEPÓSITO
      </text>
      <SchLine d="M156 100 L214 100" />
      <SchArrow x={214} y={100} />
      <SchLine d="M92 176 L92 214 L214 214" />
      <SchArrow x={214} y={214} />
      <SchLine d="M296 226 L296 254" />
      <SchArrow x={296} y={254} dir="down" />
      {/* la señal: de la posición del depósito a la tarea que la mueve */}
      <SignalPath d="M76 98 L156 98 L156 100 L258 100" />
      <SchNode x={258} y={100} w={88} h={26} label="TAREAS" accent />
      <SchNode x={258} y={214} w={104} h={24} label="CUENTA CTE." />
      <SchNode x={296} y={268} w={116} h={22} label="PESOS / DÓLAR" />
      <circle cx={292} cy={92} r={2.5} fill={SCH.amber} className="led-b" />
    </svg>
  );
}

/** Sneakers Hub: cuentas y roles, carrito y ticket de compra. */
function SneakersSchematic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Esquema de Sneakers Hub: las cuentas con roles entran al carrito, que descuenta stock y emite el ticket de compra."
    >
      <SchLine d="M96 118 L146 118" />
      <SchArrow x={146} y={118} />
      <SchLine d="M96 196 L146 196" />
      <SchArrow x={146} y={196} />
      <SchLine d="M246 157 L292 157" />
      <SchArrow x={292} y={157} />
      {/* el stock responde al carrito */}
      <SchLine d="M200 186 C200 232 116 232 116 214" dashed />
      <SignalPath d="M60 118 L200 157 L330 157" />
      <SchNode x={60} y={118} w={72} h={24} label="CUENTAS" />
      <SchNode x={60} y={196} w={62} h={24} label="STOCK" />
      <SchNode x={330} y={157} w={72} h={24} label="TICKET" />
      <SchNode x={200} y={157} w={84} h={30} label="CARRITO" accent />
      <circle cx={233} cy={149} r={2.5} fill={SCH.amber} className="led" />
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
    case "logiweb":
      return <LogiwebSchematic />;
    case "elefante":
      return <ElefanteSchematic />;
    case "sneakers":
      return <SneakersSchematic />;
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

/** Cómo se asienta una tarjeta al llegar a su puesto (springs de DESIGN.md §6). */
const SETTLE = { stiffness: 120, damping: 26, mass: 0.5 } as const;

/** Cuánto dura el viaje de una tarjeta a la siguiente. */
const TRAVEL = 0.72;

/* ============================================================
   Tarjeta del carrusel: visor 16/10 + anillo de specs + ficha.

   La tarjeta reacciona A SU POSICIÓN en el riel: `d` es la distancia, medida
   en tarjetas, hasta el puesto de lectura (0 = la están leyendo). De ahí salen
   escala, opacidad y color del borde, así el carrusel tiene profundidad y las
   tarjetas entran y salen en vez de aparecer de golpe.
   ============================================================ */
function ProjectCard({
  item,
  index,
  scrollX,
  pitchRef,
  reduced,
}: {
  item: ProjectItem;
  index: number;
  scrollX: MotionValue<number>;
  pitchRef: { current: number };
  reduced: boolean;
}) {
  // `PROJECTS.items` es `as const`, así que cada tarjeta es un tipo distinto y
  // preguntar por `item.shot` dentro del JSX estrecha la unión a `never`.
  // Sacamos los valores acá, ensanchados, y el JSX no tiene que narrowear nada.
  const shot: string | null = item.shot;
  const shotAlt: string | null = item.shotAlt;
  const url: string | null = item.url;
  const urlLabel: string | null = item.urlLabel;
  const specs: readonly string[] = item.specs;
  const bullets: readonly string[] = item.bullets;

  // distancia en tarjetas hasta el puesto de lectura
  const d = useTransform(scrollX, (v) => {
    const p = pitchRef.current;
    return p > 0 ? v / p - index : 0;
  });

  // la vecina no desaparece: queda presente para invitar a deslizar
  const scaleRaw = useTransform(d, [-1, 0, 1], [0.93, 1, 0.93], {
    clamp: true,
  });
  const opacityRaw = useTransform(d, [-1, 0, 1], [0.42, 1, 0.42], {
    clamp: true,
  });
  const borderRaw = useTransform(
    d,
    [-0.6, 0, 0.6],
    [
      "rgba(233,230,221,0.08)",
      "rgba(255,180,84,0.32)",
      "rgba(233,230,221,0.08)",
    ],
    { clamp: true },
  );

  // el spring es lo que hace que "asiente" en vez de cortar seco
  const scale = useSpring(scaleRaw, SETTLE);
  const opacity = useSpring(opacityRaw, SETTLE);

  return (
    <motion.article
      data-card
      data-index={index}
      style={
        reduced
          ? undefined
          : {
              scale,
              opacity,
              borderColor: borderRaw,
              transformOrigin: "50% 45%",
              willChange: "transform, opacity",
            }
      }
      className={cn(
        "group relative flex w-[86vw] max-w-[880px] flex-none snap-start flex-col",
        "border border-hairline bg-surface/40",
        "md:w-[72vw]",
        reduced && "hover:border-pulse/30",
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
    </motion.article>
  );
}

/* ============================================================
   Carrusel: scroll-snap nativo + arrastre con mouse + flechas
   ============================================================ */
const TOTAL = PROJECTS.items.length;

function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = !!useReducedMotion();

  /** posición real del riel: de acá cuelgan TODAS las animaciones */
  const scrollX = useMotionValue(0);
  /** paso entre tarjetas (ancho + gap), medido del DOM */
  const pitchRef = useRef(0);
  /** aire final para que la última tarjeta también llegue al puesto de lectura */
  const [tail, setTail] = useState(0);
  const tween = useRef<{ stop: () => void } | null>(null);

  /* medir el paso y el aire final; se rehace en cada resize */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const medir = () => {
      const cards = track.querySelectorAll<HTMLElement>("[data-card]");
      if (cards.length < 2) return;
      pitchRef.current = cards[1].offsetLeft - cards[0].offsetLeft;

      // sin este aire, la última tarjeta nunca alcanza el borde izquierdo y
      // quedaría apagada para siempre
      const tr = track.getBoundingClientRect();
      const cr = cards[0].getBoundingClientRect();
      const padIzq = cr.left - tr.left + track.scrollLeft;
      setTail(Math.max(0, Math.round(track.clientWidth - padIzq - cr.width)));

      // recalcular las transformaciones ahora que el paso ya se conoce
      scrollX.set(track.scrollLeft);
    };

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(track);
    return () => ro.disconnect();
  }, [scrollX]);

  /* el índice activo sale del scroll real: nunca se desincroniza */
  useEffect(() => {
    return scrollX.on("change", (v) => {
      const p = pitchRef.current;
      if (p <= 0) return;
      const i = Math.min(TOTAL - 1, Math.max(0, Math.round(v / p)));
      setActive((prev) => (prev === i ? prev : i));
    });
  }, [scrollX]);

  /* progreso continuo del riel, para la barra (arranca en 1/TOTAL) */
  const progress = useTransform(scrollX, (v) => {
    const track = trackRef.current;
    const max = track ? track.scrollWidth - track.clientWidth : 0;
    const t = max > 0 ? Math.min(1, Math.max(0, v / max)) : 0;
    return (1 + (TOTAL - 1) * t) / TOTAL;
  });

  /* viaje a una tarjeta con la curva de la casa, no con el smooth del navegador */
  const irA = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const p = pitchRef.current;
      if (!track || p <= 0) return;
      const max = track.scrollWidth - track.clientWidth;
      const destino = Math.max(0, Math.min(max, i * p));

      tween.current?.stop();
      tween.current = null;

      if (reduced) {
        track.scrollLeft = destino;
        scrollX.set(destino);
        return;
      }

      // el snap del navegador pelea contra la animación: se apaga mientras dura
      track.style.scrollSnapType = "none";
      tween.current = animate(track.scrollLeft, destino, {
        duration: TRAVEL,
        ease: EASE,
        onUpdate: (v) => {
          track.scrollLeft = v;
          scrollX.set(v);
        },
        onComplete: () => {
          track.style.scrollSnapType = "";
          tween.current = null;
        },
      });
    },
    [reduced, scrollX],
  );

  const step = useCallback(
    (dir: 1 | -1) => irA(active + dir),
    [irA, active],
  );

  /* arrastre con el mouse (el táctil ya funciona nativo, no lo tocamos) */
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    // agarrar el riel corta cualquier viaje en curso
    tween.current?.stop();
    tween.current = null;
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
    scrollX.set(track.scrollLeft);
  };

  const endDrag = () => {
    const track = trackRef.current;
    if (!drag.current.active || !track) return;
    drag.current.active = false;
    const p = pitchRef.current;
    // al soltar, la tarjeta se acomoda con NUESTRA curva, no con el snap seco
    if (p > 0) irA(Math.round(track.scrollLeft / p));
    else track.style.scrollSnapType = "";
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
          {/* la barra sigue al riel de forma continua: escala, no ancho */}
          <motion.span
            className="absolute inset-0 origin-left bg-pulse"
            style={{ scaleX: progress }}
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
        onScroll={(e) => scrollX.set(e.currentTarget.scrollLeft)}
        className={cn(
          "flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain py-6",
          "px-6 scroll-px-6 md:px-12 md:scroll-px-12 lg:pl-28 lg:scroll-pl-28",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "cursor-grab active:cursor-grabbing",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pulse",
        )}
      >
        {PROJECTS.items.map((item, i) => (
          <ProjectCard
            key={item.id}
            item={item}
            index={i}
            scrollX={scrollX}
            pitchRef={pitchRef}
            reduced={reduced}
          />
        ))}
        {/* aire final: sin esto la última tarjeta nunca llega al puesto de
            lectura y se quedaría siempre apagada */}
        <span aria-hidden className="flex-none" style={{ width: tail }} />
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
    </Section>
  );
}
