"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { showcase } from "@/lib/content";
import ScrollScrubSequence, { type ScrubMode } from "@/components/ui/ScrollScrubSequence";
import Eyebrow from "@/components/ui/Eyebrow";

/** Static mode (phones): where in the section's travel each step starts. */
const STATIC_AT = [0, 0.42, 0.62];

/**
 * Showcase — the signature canvas moment.
 * Desktop: overlay step copy crossfades as the scrub progresses, with a
 * frame counter as the "frame for frame" proof.
 * Mobile: the steps follow the section's travel through the viewport.
 */
export default function Showcase() {
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<ScrubMode>("pending");

  const handleProgress = useCallback((p: number, m: ScrubMode) => {
    setProgress(p);
    setMode((cur) => (cur === m ? cur : m));
  }, []);

  const thresholds =
    mode === "static" ? STATIC_AT : showcase.steps.map((step) => step.at);
  const activeIndex = thresholds.reduce(
    (acc, at, i) => (progress >= at ? i : acc),
    0
  );
  const frame = Math.round(progress * (showcase.frameCount - 1)) + 1;
  const pad = (n: number) => String(n).padStart(3, "0");

  return (
    <section id="showcase" className="relative">
      <ScrollScrubSequence
        frameCount={showcase.frameCount}
        scrollLength={4}
        onProgress={handleProgress}
      >
        <div className="container-x grid w-full grid-cols-1 items-end gap-6 md:grid-cols-2 md:items-center md:gap-8">
          {/* left: persistent label + title */}
          <div>
            <Eyebrow>{showcase.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-md font-display text-[1.75rem] font-bold leading-[1.1] tracking-tight text-gradient md:mt-6 md:text-4xl lg:text-5xl">
              {showcase.title[0]}
              <span className="text-gradient-accent"> {showcase.title[1]}</span>
            </h2>

            {/* frame counter: the frame-for-frame proof (desktop scrub only) */}
            {mode === "scrub" ? (
              <p
                aria-hidden
                className="mt-8 hidden items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-text-secondary tabular-nums md:flex"
              >
                <span className="h-px w-8 bg-accent/60" />
                {showcase.frameLabel} {pad(frame)} / {pad(showcase.frameCount)}
              </p>
            ) : null}
          </div>

          {/* right: crossfading steps */}
          <div className="relative md:min-h-[12rem] md:justify-self-end md:text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-deep max-w-sm rounded-3xl p-5 md:ml-auto md:p-7"
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
      </ScrollScrubSequence>
    </section>
  );
}
