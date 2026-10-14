import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Mark } from "@/components/Mark";
import { setLoaded, sim } from "@/store/experience";

const STATUS = ["CALIBRATING LIGHT", "COMPOSING SILENCE", "ALIGNING MOTION"];

type Props = {
  onComplete: () => void;
};

export function Loader({ onComplete }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState(STATUS[0]);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (sim.ui.reducedMotion) {
      setPercent(100);
      setLoaded(true);
      onComplete();
      setGone(true);
      return;
    }

    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        const el = root.current;
        if (!el) {
          setLoaded(true);
          onComplete();
          setGone(true);
          return;
        }
        gsap.to(el, {
          yPercent: -110,
          duration: 1.05,
          ease: "power4.inOut",
          delay: 0.18,
          onComplete: () => {
            setLoaded(true);
            onComplete();
            setGone(true);
          },
        });
      },
    });

    tl.to(obj, {
      v: 100,
      duration: 1.65,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = obj.v;
        setPercent(Math.round(v));
        if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
        if (v > 70) setStatus(STATUS[2]);
        else if (v > 32) setStatus(STATUS[1]);
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink text-paper"
      role="status"
      aria-live="polite"
      aria-label="Loading Aether experience"
    >
      <div className="flex flex-col items-center">
        <Mark className="h-11 w-11 text-champagne" />
        <p className="mt-8 font-serif text-4xl font-light tracking-[0.35em] text-paper sm:text-5xl">
          AETHER
        </p>
        <p className="mt-5 tracking-label text-fog">{status}</p>
      </div>

      <div className="absolute bottom-10 left-1/2 w-[min(420px,72vw)] -translate-x-1/2">
        <div className="mb-3 flex items-end justify-between text-[10px] tracking-[0.28em] text-fog">
          <span>INITIALIZING EXPERIENCE</span>
          <span className="tabular-nums text-champagne">{String(percent).padStart(3, "0")}</span>
        </div>
        <div className="h-px w-full bg-paper/10">
          <div
            ref={bar}
            className="h-px origin-left scale-x-0 bg-champagne"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
