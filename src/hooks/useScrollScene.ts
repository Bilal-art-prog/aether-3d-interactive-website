import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sim, type SectionId } from "@/store/experience";

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS: SectionId[] = [
  "hero",
  "intro",
  "showcase",
  "technology",
  "story",
  "visual",
  "philosophy",
  "specs",
  "cta",
];

export function useScrollScene(ready: boolean) {
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      SECTION_IDS.forEach((id) => {
        const trigger = document.getElementById(id);
        if (!trigger) return;
        ScrollTrigger.create({
          trigger,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            sim.progress[id] = self.progress;
          },
        });
      });

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          sim.progress.global = self.progress;
          const bar = document.getElementById("nav-progress");
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
        },
      });

      const storyCaption = document.querySelectorAll("[data-story-step]");
      if (storyCaption.length) {
        const story = document.getElementById("story");
        if (story) {
          ScrollTrigger.create({
            trigger: story,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              const step = Math.min(5, Math.floor(self.progress * 6));
              storyCaption.forEach((el, i) => {
                (el as HTMLElement).dataset.active = i === step ? "true" : "false";
              });
            },
          });
        }
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-line]").forEach((wrap) => {
        const inner = wrap.querySelector("[data-reveal-inner]");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { y: "108%" },
          {
            y: "0%",
            duration: 1.25,
            ease: "power4.out",
            scrollTrigger: {
              trigger: wrap,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      const track = document.getElementById("philosophy-track");
      const pin = document.getElementById("philosophy-pin");
      if (track && pin && !sim.ui.isMobile) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count || "0");
        const decimals = Number(el.dataset.decimals || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals);
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax || "0.15");
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 120);
    const t2 = window.setTimeout(refresh, 700);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [ready]);
}
