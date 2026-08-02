import Image from "next/image";
import { PROJECTS } from "@/content/data";
import { Cta } from "@/components/ui/Cta";
import { Dot } from "@/components/ui/Dot";
import { cn } from "@/lib/utils";

const SHOT_W = 1440;
const SHOT_H = 900;

/**
 * 03 — Proyectos. La prueba, antes que el discurso.
 *
 * Arriba el caso principal dentro de un marco de navegador, y debajo la grilla
 * de sistemas con captura. Los cuatro proyectos que todavía no tienen captura
 * viven en la última celda como lista de texto: preferimos decirlo así antes
 * que inventar una maqueta.
 */
export function Projects() {
  return (
    <section
      id="proyectos"
      className="border-t border-hairline bg-alt py-[clamp(80px,10vw,132px)]"
    >
      <div className="shell">
        <div className="mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <div data-reveal="rise" className="t-eyebrow mb-[22px]">
              {PROJECTS.eyebrow}
            </div>
            <h2 data-reveal="mask" className="t-h2 max-w-[24ch]">
              {PROJECTS.title}
            </h2>
          </div>
          <p
            data-reveal="rise"
            className="max-w-[34ch] text-[15px] leading-[1.6] text-ink-50"
          >
            {PROJECTS.intro}
          </p>
        </div>

        {/* caso principal */}
        <div
          data-reveal="media"
          className="mb-[clamp(48px,6vw,84px)] grid items-center gap-[clamp(28px,4vw,60px)] [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]"
        >
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <Dot />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                {PROJECTS.featured.status}
              </span>
            </div>
            <h3 className="mb-[18px] text-[clamp(27px,3.2vw,44px)] leading-[1.02] tracking-[-0.04em]">
              {PROJECTS.featured.name}
            </h3>
            <p className="mb-[22px] max-w-[44ch] text-[16px] leading-[1.6] text-ink-70">
              {PROJECTS.featured.description}
            </p>
            <ul className="rule-grid mb-[26px]">
              {PROJECTS.featured.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-baseline gap-3.5 bg-alt py-[13px] pl-0.5"
                >
                  <span aria-hidden className="font-mono text-[10px] text-accent">
                    /
                  </span>
                  <span className="text-[14.5px] text-ink-60">{b}</span>
                </li>
              ))}
            </ul>
            <Cta
              href={PROJECTS.featured.url}
              external
              variant="outlineAccent"
              className="px-[22px] py-3.5 text-[13.5px]"
            >
              {PROJECTS.featured.urlLabel}
              <span aria-hidden className="font-mono text-[11px] opacity-60">
                ↗
              </span>
            </Cta>
          </div>

          {/* marco de navegador: la captura no flota, está adentro de algo */}
          <div className="border border-[rgba(244,241,234,0.13)] bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-[7px] border-b border-hairline-soft px-3.5 py-[11px]">
              <span className="h-2 w-2 rounded-full bg-[#33332C]" />
              <span className="h-2 w-2 rounded-full bg-[#33332C]" />
              <span className="h-2 w-2 rounded-full bg-[#33332C]" />
              <span className="ml-3 font-mono text-[10px] tracking-[0.06em] text-ink-35">
                {PROJECTS.featured.domain}
              </span>
            </div>
            <Image
              src={PROJECTS.featured.shot}
              alt={PROJECTS.featured.shotAlt}
              width={SHOT_W}
              height={SHOT_H}
              sizes="(max-width: 900px) 100vw, 620px"
              priority
              className="block h-auto w-full"
            />
          </div>
        </div>

        {/* grilla de sistemas */}
        <div className="rule-grid border border-hairline [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
          {PROJECTS.cards.map((card) => (
            <div
              key={card.id}
              data-reveal="media"
              className="pj-card flex flex-col gap-4 bg-alt p-[clamp(20px,2vw,26px)]"
            >
              <div className="overflow-hidden border border-[rgba(244,241,234,0.1)] bg-card">
                <Image
                  src={card.shot}
                  alt={card.shotAlt}
                  width={SHOT_W}
                  height={SHOT_H}
                  sizes="(max-width: 700px) 100vw, 400px"
                  className="block h-auto w-full"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {card.chips.map((c) => (
                  <span key={c} className="t-chip">
                    {c}
                  </span>
                ))}
                <span
                  className={cn(
                    "t-chip",
                    card.status.tone === "signal"
                      ? "border-[rgba(90,201,138,0.3)] text-signal"
                      : "border-[rgba(233,178,62,0.32)] text-accent",
                  )}
                >
                  {card.status.label}
                </span>
              </div>
              <h3 className="text-[23px] leading-[1.1] tracking-[-0.03em]">
                {card.name}
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-ink-50">
                {card.description}
              </p>
              {card.url && (
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener"
                  className="link-ul mt-auto self-start font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-colors duration-300 hover:text-ink"
                >
                  {card.urlLabel} ↗
                </a>
              )}
            </div>
          ))}

          {/* los que todavía no tienen captura */}
          <div
            data-reveal="rise"
            className="flex flex-col justify-center gap-3.5 bg-alt p-[clamp(20px,2vw,26px)]"
          >
            <div className="t-label mb-1 text-ink-50">{PROJECTS.alsoLabel}</div>
            {PROJECTS.also.map((p) => (
              <div
                key={p.n}
                className="flex items-baseline gap-4 border-t border-[rgba(244,241,234,0.1)] py-3.5"
              >
                <span className="shrink-0 font-mono text-[10px] text-accent">
                  {p.n}
                </span>
                <div>
                  <h4 className="mb-[5px] text-[16.5px] font-semibold tracking-[-0.02em]">
                    {p.name}
                  </h4>
                  <p className="text-[13.5px] leading-[1.55] text-ink-45">
                    {p.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
