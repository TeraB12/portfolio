import { TECH } from "@/content/data";

/**
 * 06 — Cómo está hecho.
 *
 * El nombre de la herramienta va chiquito y en mono; el titular es lo que esa
 * herramienta cambia en el día del cliente. Nada de chips de tecnologías: a
 * quien contrata no le sirven, y el que sí quiere los nombres los tiene en el
 * párrafo del final.
 */
export function Tech() {
  return (
    <section className="border-t border-hairline bg-alt py-[clamp(80px,10vw,132px)]">
      <div className="shell">
        <div className="mb-[clamp(40px,5vw,60px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <div data-reveal="rise" className="t-eyebrow mb-[22px]">
              {TECH.eyebrow}
            </div>
            <h2 data-reveal="mask" className="t-h2 max-w-[22ch]">
              {TECH.title}
            </h2>
          </div>
          <p
            data-reveal="rise"
            className="max-w-[34ch] text-[15px] leading-[1.6] text-ink-50"
          >
            {TECH.intro}
          </p>
        </div>

        <div className="rule-grid border border-hairline [grid-template-columns:repeat(auto-fit,minmax(min(250px,100%),1fr))]">
          {TECH.items.map((item) => (
            <div
              key={item.tool}
              data-reveal="rise"
              className="tech-cell bg-alt p-[clamp(22px,2.2vw,30px)]"
            >
              <div className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.18em] text-accent">
                {item.tool}
              </div>
              <h3 className="mb-2.5 text-[21px] tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-ink-50">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <p
          data-reveal="rise"
          className="mt-[clamp(28px,3vw,42px)] max-w-[82ch] border-t border-hairline pt-6 font-mono text-[12px] leading-[2.05] tracking-[0.03em] text-ink-50"
        >
          {TECH.full}
        </p>
      </div>
    </section>
  );
}
