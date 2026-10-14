"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { showcase } from "@/lib/content";
import OrbitScene from "@/components/ui/OrbitScene";
import Eyebrow from "@/components/ui/Eyebrow";

const pad = (n: number) => String(n).padStart(3, "0");

/**
 * Showcase: the signature moment. A live-drawn vector scene (OrbitScene)
 * pinned for a few screens; the step copy changes as the scroll advances.
 * The counter is written straight to the DOM, so scrolling never re-renders
 * React; state only changes when the active step changes.
 */
export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  const handleProgress = useCallback((p: number) => {
    const idx = showcase.steps.reduce((acc, step, i) => (p >= step.at ? i : acc), 0);
    setActiveIndex((cur) => (cur === idx ? cur : idx));
    if (counterRef.current) counterRef.current.textContent = pad(Math.round(p * 100));
  }, []);

  return (
    <section id="showcase" className="relative">
      <OrbitScene scrollLength={3} onProgress={handleProgress}>
        <div className="container-x grid w-full grid-cols-1 items-end gap-6 md:grid-cols-2 md:items-center md:gap-8">
          {/* left: persistent label + title */}
          <div>
            <Eyebrow>{showcase.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-md font-display text-[1.75rem] font-bold leading-[1.1] tracking-tight text-gradient md:mt-6 md:text-4xl lg:text-5xl">
              {showcase.title[0]}
              <span className="text-gradient-accent"> {showcase.title[1]}</span>
            </h2>

            <p
              aria-hidden
              className="mt-8 hidden items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-text-secondary tabular-nums md:flex"
            >
              <span className="h-px w-8 bg-accent/60" />
              {showcase.liveLabel} <span ref={counterRef}>000</span> / 100
            </p>
          </div>

          {/* right: crossfading steps */}
          <div className="relative md:min-h-[12rem] md:justify-self-end md:text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-sm rounded-3xl border border-white/[0.08] bg-[rgba(8,8,12,0.78)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_-30px_rgba(0,0,0,0.9)] md:ml-auto md:p-7"
              >
                <div className="font-display text-4xl font-extrabold text-accent/35 md:text-5xl">
                  0{activeIndex + 1}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-text-primary md:mt-3 md:text-2xl">
                  {showcase.steps[activeIndex].title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary md:mt-2.5">
                  {showcase.steps[activeIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* progress dots */}
            <div className="mt-5 flex gap-2 md:mt-6 md:justify-end">
              {showcase.steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-8 bg-accent" : "w-2 bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </OrbitScene>
    </section>
  );
}
