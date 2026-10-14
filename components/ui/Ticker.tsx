"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  words: readonly string[];
  /** Base speed in px/s. */
  speed?: number;
  className?: string;
};

/**
 * Ticker — one running line of display words between two sections.
 * Moves on its own, speeds up with the scroll velocity and flips direction
 * with it. Two copies of the strip make the loop seamless; the track only
 * ever gets a transform. Runs only while on screen. Decorative: the words
 * are said elsewhere on the page. Reduced motion: a still, clipped line.
 */
export default function Ticker({ words, speed = 40, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const strip = [...words, ...words];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const track = el.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const setX = gsap.quickSetter(track, "x", "px");
      let half = track.scrollWidth / 2;
      let x = 0;
      let dir = 1;
      let boost = 0;
      let active = false;

      const ro = new ResizeObserver(() => {
        half = track.scrollWidth / 2;
      });
      ro.observe(track);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          active = self.isActive;
        },
        onUpdate: (self) => {
          // Scroll velocity (px/s) → extra speed, clamped; direction follows.
          const v = self.getVelocity();
          boost = gsap.utils.clamp(0, 1400, Math.abs(v) * 0.5);
          if (Math.abs(v) > 30) dir = v > 0 ? 1 : -1;
        },
      });

      const tick = () => {
        if (!active || document.hidden) return;
        const dt = gsap.ticker.deltaRatio() / 60;
        boost += (0 - boost) * Math.min(1, dt * 4);
        x -= (speed + boost) * dt * dir;
        if (half > 0) {
          if (x <= -half) x += half;
          if (x > 0) x -= half;
        }
        setX(x);
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
        st.kill();
      };
    });

    return () => mm.revert();
  }, [speed]);

  return (
    <div ref={root} aria-hidden className={`fade-x overflow-hidden ${className}`}>
      <div
        data-track
        className="flex w-max items-center whitespace-nowrap will-change-transform"
      >
        {strip.map((word, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`font-display text-[clamp(2.75rem,7vw,6.5rem)] font-extrabold leading-none tracking-[-0.04em] ${
                i % 2 === 0
                  ? "text-gradient"
                  : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]"
              }`}
            >
              {word}
            </span>
            <span className="mx-[0.45em] inline-block h-[0.14em] w-[0.14em] shrink-0 rounded-full bg-accent shadow-[0_0_14px_rgba(110,91,255,0.9)] text-[clamp(2.75rem,7vw,6.5rem)]" />
          </span>
        ))}
      </div>
    </div>
  );
}
