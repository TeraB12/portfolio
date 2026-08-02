import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Company } from "@/components/sections/Company";
import { Tech } from "@/components/sections/Tech";
import { History } from "@/components/sections/History";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { EcgLine } from "@/components/signal/EcgLine";

/**
 * El orden cuenta una historia: primero el diagnóstico (01), después qué
 * hacemos (02), después la PRUEBA de que funciona (03), cómo se trabaja (04),
 * quiénes somos (05), con qué está hecho (06), de dónde venimos (07) y recién
 * al final el pedido de contacto (08).
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />

      <div className="shell">
        <EcgLine />
      </div>

      <Services />
      <Projects />
      <Process />
      <Company />
      <Tech />
      <History />
      <Contact />
      <Footer />
    </main>
  );
}
