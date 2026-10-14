import { useEffect, useRef } from "react";
import { sim } from "@/store/experience";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sim.ui.isMobile) return;

    document.documentElement.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      const hover = sim.ui.hovering;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ring.current) {
        const s = hover ? 1.85 : 1;
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${s})`;
        ring.current.style.borderColor = hover ? "rgba(196,165,116,0.9)" : "rgba(243,239,230,0.35)";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (typeof window !== "undefined" && sim.ui.isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block" aria-hidden="true">
      <div
        ref={dot}
        className="absolute top-0 left-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper"
      />
      <div
        ref={ring}
        className="absolute top-0 left-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/30"
      />
    </div>
  );
}
