"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { showcase } from "@/lib/content";
import ScrollScrubSequence from "@/components/ui/ScrollScrubSequence";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Showcase — the signature, scroll-scrubbed canvas moment.
 * Overlay step copy crossfades as the scrub progresses.
 */
export default function Showcase() {
  const [progress, setProgress] = useState(0);

  const handleProgress = useCallback((p: number) => setProgress(p), []);

  // Which step is "active" based on scrub progress.
  const activeIndex = showcase.steps.reduce((acc, step, i) => {
    return progress >= step.at ? i : acc;
  }, 0);

  return (
    <section id="showcase" className="relative">
      <ScrollScrubSequence
        frameCount={showcase.frameCount}
        scrollLength={4}
        onProgress={handleProgress}
      >
        <div className="container-x grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* left: persistent label */}
          <div className="hidden md:block">
            <Eyebrow>{showcase.eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-md font-display text-4xl font-bold leading-tight tracking-tight text-gradient lg:text-5xl">
              De scroll bestuurt
              <span className="text-gradient-accent"> de beweging.</span>
            </h2>
          </div>

          {/* right: crossfading steps */}
          <div className="relative min-h-[12rem] md:justify-self-end md:text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass max-w-sm rounded-3xl p-7 md:ml-auto"
              >
                <div className="font-display text-5xl font-extrabold text-accent/30">
                  0{activeIndex + 1}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-text-primary">
                  {showcase.steps[activeIndex].title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                  {showcase.steps[activeIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* progress dots */}
            <div className="mt-6 flex gap-2 md:justify-end">
              {showcase.steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-accent"
                      : "w-2 bg-white/15"
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
