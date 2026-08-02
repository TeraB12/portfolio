import { PROBLEM } from "@/content/data";

/**
 * 01 — Antes de programar. El diagnóstico antes de la oferta: por qué se rompe
 * la operación de una empresa, en su propio idioma.
 *
 * Las tres filas se separan con hairlines de 1px hechas con el truco del gap:
 * el contenedor tiene fondo hairline y cada fila su propio fondo opaco.
 */
export function Problem() {
  return (
    <section className="shell py-[clamp(88px,11vw,148px)]">
      <div className="grid items-start gap-[clamp(40px,6vw,88px)] [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        <div>
          <div data-reveal="rise" className="t-eyebrow mb-6">
            {PROBLEM.eyebrow}
          </div>
          <h2 data-reveal="mask" className="t-h2-long max-w-[20ch]">
            {PROBLEM.title}
          </h2>
          <p
            data-reveal="rise"
            className="mt-[30px] max-w-[44ch] border-l border-accent pl-5 font-mono text-[clamp(13px,1.15vw,15.5px)] leading-[1.95] tracking-[0.02em] text-ink-70"
          >
            {PROBLEM.quote}
          </p>
        </div>

        <div className="rule-grid">
          {PROBLEM.rows.map((row) => (
            <div
              key={row.k}
              data-reveal="rise"
              className="flex items-start gap-[22px] bg-bg py-[26px] pl-7"
            >
              <span className="pt-1.5 font-mono text-[11px] text-ink-50">
                {row.k}
              </span>
              <div>
                <h3 className="mb-2 text-[19px] tracking-[-0.02em]">
                  {row.title}
                </h3>
                <p className="text-[15px] leading-[1.55] text-ink-50">
                  {row.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
