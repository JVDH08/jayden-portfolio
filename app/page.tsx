import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Showcase from "@/components/sections/Showcase";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Showcase />
        <Process />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
