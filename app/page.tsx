import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Stack } from "@/components/sections/Stack";
import { FavoriteTech } from "@/components/sections/FavoriteTech";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/**
 * Orden de la página como empresa: primero la PRUEBA (los proyectos que ya
 * están funcionando), después qué vendemos y cómo trabajamos, y recién
 * entonces quiénes somos. El orden DEBE coincidir con WAYPOINTS en
 * content/data.ts, que alimenta la spine.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Services />
      <Process />
      <CaseStudies />
      <About />
      <Skills />
      <Stack />
      <FavoriteTech />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
