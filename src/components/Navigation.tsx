import { useEffect } from "react";
import { Mark } from "@/components/Mark";
import { MenuOverlay } from "@/components/MenuOverlay";
import { useSimUi } from "@/hooks/useSim";
import { scrollToId, startScroll, stopScroll } from "@/hooks/useSmoothScroll";
import { setMenuOpen } from "@/store/experience";

export function Navigation() {
  const ui = useSimUi();

  useEffect(() => {
    if (ui.menuOpen) {
      stopScroll();
      document.body.style.overflow = "hidden";
    } else {
      startScroll();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [ui.menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div id="nav-progress" className="nav-progress" />
      <header className="fixed top-0 right-0 left-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <button
            type="button"
            data-cursor="interactive"
            onClick={() => {
              setMenuOpen(false);
              scrollToId("hero");
            }}
            className="flex items-center gap-3 text-paper"
            aria-label="Aether home"
          >
            <Mark className="h-7 w-7" />
            <span className="tracking-label text-[11px] text-paper">AETHER</span>
          </button>

          <button
            type="button"
            data-cursor="interactive"
            aria-expanded={ui.menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(!ui.menuOpen)}
            className="flex items-center gap-3 text-paper"
          >
            <span className="tracking-label text-[11px]">{ui.menuOpen ? "CLOSE" : "MENU"}</span>
            <span className="relative flex h-3 w-6 flex-col justify-between" aria-hidden="true">
              <span
                className="menu-line"
                style={ui.menuOpen ? { transform: "translateY(5.5px) rotate(45deg)" } : undefined}
              />
              <span className="menu-line" style={ui.menuOpen ? { opacity: 0 } : undefined} />
              <span
                className="menu-line"
                style={ui.menuOpen ? { transform: "translateY(-5.5px) rotate(-45deg)" } : undefined}
              />
            </span>
          </button>
        </div>
      </header>
      <MenuOverlay open={ui.menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
