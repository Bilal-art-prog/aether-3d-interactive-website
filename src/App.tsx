import { useCallback, useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { Cursor } from "@/components/Cursor";
import { Navigation } from "@/components/Navigation";
import { Experience } from "@/three/Experience";
import { Hero } from "@/sections/Hero";
import { Introduction } from "@/sections/Introduction";
import { Showcase } from "@/sections/Showcase";
import { Technology } from "@/sections/Technology";
import { Story } from "@/sections/Story";
import { VisualBreak } from "@/sections/VisualBreak";
import { Philosophy } from "@/sections/Philosophy";
import { Specs } from "@/sections/Specs";
import { FinalCTA } from "@/sections/FinalCTA";
import { Footer } from "@/sections/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useScrollScene } from "@/hooks/useScrollScene";
import { useMouse } from "@/hooks/useMouse";
import { initClientFlags } from "@/store/experience";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initClientFlags();
  }, []);

  useMouse();
  useSmoothScroll(ready);
  useScrollScene(ready);

  const onComplete = useCallback(() => setReady(true), []);

  return (
    <div className="relative overflow-x-hidden bg-ink text-paper">
      <a href="#hero" className="skip-link">
        Skip to content
      </a>
      <Loader onComplete={onComplete} />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Cursor />
      <Navigation />
      <Experience />
      <main>
        <Hero />
        <Introduction />
        <Showcase />
        <Technology />
        <Story />
        <VisualBreak />
        <Philosophy />
        <Specs />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
