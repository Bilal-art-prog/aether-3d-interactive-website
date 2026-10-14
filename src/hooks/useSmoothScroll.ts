import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sim } from "@/store/experience";

gsap.registerPlugin(ScrollTrigger);

export let lenis: Lenis | null = null;

export function scrollToId(id: string, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return;
  setTimeout(() => {
    if (lenis) {
      lenis.scrollTo(el, {
        offset,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      el.scrollIntoView({ behavior: sim.ui.reducedMotion ? "auto" : "smooth" });
    }
  }, 30);
}

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled || sim.ui.reducedMotion) return;

    const instance = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
      autoRaf: false,
    });

    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      instance.destroy();
      if (lenis === instance) lenis = null;
    };
  }, [enabled]);
}

export function stopScroll() {
  lenis?.stop();
}

export function startScroll() {
  lenis?.start();
}
