import { PROCESS } from "@/content/data";
import { Cta } from "@/components/ui/Cta";

/**
 * 04 — Cómo trabajamos. Los cuatro pasos van unidos por una línea horizontal
 * que arranca dorada y se apaga hacia la derecha: el camino de la primera
 * charla al sistema andando.
 */
export function Process() {
  return (
    <section
      id="proceso"
      className="border-t border-hairline bg-alt py-[clamp(80px,10vw,132px)]"
    >
      <div className="shell">
        <div className="mb-[clamp(44px,5vw,68px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <div data-reveal="rise" className="t-eyebrow mb-[22px]">
              {PROCESS.eyebrow}
            </div>
            <h2 data-reveal="mask" className="t-h2 max-w-[22ch]">
              {PROCESS.title}
            </h2>
          </div>
          <p
            data-reveal="rise"
            className="max-w-[34ch] text-[15px] leading-[1.6] text-ink-50"
          >
            {PROCESS.intro}
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-x-0 top-[52px] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg,rgba(233,178,62,0.5) 0%,rgba(244,241,234,0.14) 100%)",
            }}
          />
          <div className="rule-grid [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
            {PROCESS.steps.map((step, i) => (
              <div
                key={step.n}
                data-reveal="rise"
                /* los bordes al ras solo en xl, que es donde la grilla es
                   siempre de 4 columnas; abajo el padding va parejo para que
                   no se desalineen las filas */
                className="bg-alt pb-[30px] md:px-[26px] xl:first:pl-0 xl:last:pr-0"
              >
                <div className="flex h-[52px] items-center">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-ink-35">
                    {step.n}
                  </span>
                </div>
                <div
                  aria-hidden
                  className={`relative top-[-5px] mb-[26px] h-[11px] w-[11px] ${
                    i === 0 ? "bg-accent" : "bg-[rgba(244,241,234,0.28)]"
                  }`}
                />
                <h3 className="mb-3.5 text-[clamp(20px,1.9vw,25px)] leading-[1.12] tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink-50">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal="rise"
          className="mt-[clamp(40px,5vw,60px)] flex flex-wrap items-center justify-between gap-[26px] border border-[rgba(244,241,234,0.13)] p-[clamp(24px,3vw,36px)]"
        >
          <p className="max-w-[44ch] text-[clamp(17px,1.7vw,22px)] leading-[1.4] tracking-[-0.02em]">
            {PROCESS.closer}
          </p>
          <Cta
            href={PROCESS.closerCta.href}
            magnetic
            arrow
            className="whitespace-nowrap px-[26px] py-4 text-[14px]"
          >
            {PROCESS.closerCta.label}
          </Cta>
        </div>
      </div>
    </section>
  );
}
