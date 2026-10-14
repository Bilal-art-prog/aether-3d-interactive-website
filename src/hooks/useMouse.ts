import { useEffect } from "react";
import { sim } from "@/store/experience";

export function useMouse() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      sim.mouse.x = x;
      sim.mouse.y = y;

      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a, button, [data-cursor='interactive']");
      if (interactive !== sim.ui.hovering) {
        sim.ui.hovering = interactive;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}
