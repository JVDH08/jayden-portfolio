import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Why from "@/components/sections/Why";
import Showcase from "@/components/sections/Showcase";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import Packages from "@/components/sections/Packages";
import About from "@/components/sections/About";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AmbientField from "@/components/ui/AmbientField";
import Ticker from "@/components/ui/Ticker";
import { ticker } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* `isolate`: the light field sits at z -1 inside main, behind every
          section but above the page background. */}
      <main id="main" className="relative isolate">
        <AmbientField />
        <Hero />
        <Statement />
        <Ticker words={ticker.words} />
        <Why />
        <Showcase />
        <Process />
        <Projects />
        <Packages />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
