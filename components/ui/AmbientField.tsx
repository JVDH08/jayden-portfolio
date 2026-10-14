"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * AmbientField — the light between the sections.
 * One fixed layer behind the whole page with three soft glows in the hero's
 * colours. Each glow drifts with the scroll position (a slow sine, transform
 * only, so it never leaves the screen) and breathes on its own (CSS drift).
 * Sections stay transparent, so the light is never cut by a section edge.
 * Reduced motion: a still layer.
 */
const glows = [
  {
    tone: "glow-violet",
    box: "-right-[16rem] -top-[14rem] h-[52rem] w-[52rem]",
    ax: 0.08,
    ay: 0.18,
    px: 2600,
    py: 1900,
    drift: "drift 26s ease-in-out infinite",
  },
  {
    tone: "glow-cyan",
    box: "-left-[14rem] -bottom-[10rem] h-[38rem] w-[38rem]",
    ax: 0.06,
    ay: 0.14,
    px: 2200,
    py: 2900,
    drift: "drift 22s ease-in-out infinite reverse",
  },
  {
    tone: "glow-soft",
    box: "left-[28%] top-[52%] h-[40rem] w-[40rem]",
    ax: 0.1,
    ay: 0.12,
    px: 3300,
    py: 2500,
    drift: "drift 30s ease-in-out infinite",
  },
];

export default function AmbientField() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-glow]")).map(
      (node, i) => ({
        x: gsap.quickSetter(node, "x", "px"),
        y: gsap.quickSetter(node, "y", "px"),
        ...glows[i],
      })
    );

    let raf = 0;
    const paint = () => {
      raf = 0;
      const s = window.scrollY;
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (const g of layers) {
        g.x(Math.sin(s / g.px) * g.ax * w);
        g.y(Math.cos(s / g.py) * g.ay * h);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {glows.map((g) => (
        <div key={g.tone} data-glow className={`absolute ${g.box}`}>
          <div className={`glow inset-0 ${g.tone}`} style={{ animation: g.drift }} />
        </div>
      ))}
    </div>
  );
}
