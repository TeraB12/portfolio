import { COMPANY, FOOTER } from "@/content/data";
import { EcgLine } from "@/components/signal/EcgLine";
import { Dot } from "@/components/ui/Dot";
import { HashLink } from "@/components/ui/HashLink";

const linkClass =
  "link-ul self-start text-[14px] text-ink-60 transition-colors duration-300 hover:text-ink";

/**
 * Cierre: el trazo vuelve una última vez, más lento, y el nombre queda grande.
 */
export function Footer() {
  return (
    <footer className="border-t border-hairline pb-8 pt-[clamp(48px,6vw,72px)]">
      <div className="shell">
        <EcgLine
          height={44}
          dash="70 1330"
          duration="6.5s"
          trackOpacity={0.11}
          className="mb-10"
        />

        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="text-[clamp(38px,7vw,86px)] font-extrabold leading-[0.9] tracking-[-0.055em]">
              {COMPANY.wordmark}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-35">
              {FOOTER.tagline}
            </div>
          </div>

          <div className="flex flex-wrap gap-9">
            {FOOTER.columns.map((col) => (
              <nav
                key={col.title}
                aria-label={col.title}
                className="flex flex-col items-start gap-[11px]"
              >
                <span className="t-label text-ink-50">{col.title}</span>
                {col.links.map((l) =>
                  l.href.startsWith("#") ? (
                    <HashLink key={l.label} href={l.href} className={linkClass}>
                      {l.label}
                    </HashLink>
                  ) : (
                    <a
                      key={l.label}
                      href={l.href}
                      {...(l.external
                        ? { target: "_blank", rel: "noopener" }
                        : {})}
                      className={linkClass}
                    >
                      {l.label}
                    </a>
                  ),
                )}
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-[18px] border-t border-[rgba(244,241,234,0.09)] pt-[22px]">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-50">
            {FOOTER.rights}
          </span>
          <div className="flex items-center gap-2">
            <Dot size={5} />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-50">
              {FOOTER.status}
            </span>
          </div>
          <HashLink
            href="#inicio"
            top
            className="link-ul font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-50 transition-colors duration-300 hover:text-ink"
          >
            {FOOTER.backToTop}
          </HashLink>
        </div>
      </div>
    </footer>
  );
}
