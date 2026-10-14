export type HotspotId = "core" | "surface" | "light" | null;

export type SectionId =
  | "hero"
  | "intro"
  | "showcase"
  | "technology"
  | "story"
  | "visual"
  | "philosophy"
  | "specs"
  | "cta";

type Listener = () => void;

const listeners = new Set<Listener>();
let uiVersion = 0;

export const sim = {
  mouse: { x: 0, y: 0 },
  progress: {
    hero: 0,
    intro: 0,
    showcase: 0,
    technology: 0,
    story: 0,
    visual: 0,
    philosophy: 0,
    specs: 0,
    cta: 0,
    global: 0,
  },
  ui: {
    loaded: false,
    menuOpen: false,
    hotspot: null as HotspotId,
    hovering: false,
    isMobile: false,
    reducedMotion: false,
    webgl: true,
  },
};

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function emit() {
  uiVersion += 1;
  listeners.forEach((fn) => fn());
}

export function getUiVersion() {
  return uiVersion;
}

export function setMenuOpen(open: boolean) {
  sim.ui.menuOpen = open;
  emit();
}

export function setHotspot(id: HotspotId) {
  sim.ui.hotspot = id;
  emit();
}

export function setLoaded(value: boolean) {
  sim.ui.loaded = value;
  emit();
}

export function initClientFlags() {
  if (typeof window === "undefined") return;
  sim.ui.isMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
  sim.ui.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  sim.ui.webgl = !!gl;
  emit();
}

if (typeof window !== "undefined") {
  initClientFlags();
}
