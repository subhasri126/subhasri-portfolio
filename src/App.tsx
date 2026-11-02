import { useState } from "react";
import Boot from "./components/Boot";
import ChapterRail from "./components/ChapterRail";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import BuildLog from "./components/BuildLog";
import { Achievements, Education, Journey } from "./components/Background";
import Contact from "./components/Contact";

const BOOT_KEY = "subhasri.dev/booted";

export default function App() {
  // The boot sequence runs once per browser session — never a repeat blocker.
  const [booted, setBooted] = useState(() => {
    try {
      return sessionStorage.getItem(BOOT_KEY) === "1";
    } catch {
      return false;
    }
  });

  const finishBoot = () => {
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      /* private mode — harmless */
    }
    setBooted(true);
  };

  return (
    <div className="noise relative min-h-screen bg-ink text-paper antialiased">
      {!booted && <Boot onDone={finishBoot} />}

      {/* Editorial page rules — hairlines framing the sheet */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 bottom-0 z-0 mx-auto hidden max-w-[1240px] border-x border-line/50 md:block"
        aria-hidden="true"
      />

      <Cursor />
      <Nav />
      <ChapterRail />

      <main className="relative z-10">
        <Hero booted={booted} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <BuildLog />
        <Achievements />
        <Education />
        <Journey />
        <Contact />
      </main>
    </div>
  );
}
