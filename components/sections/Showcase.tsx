"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { showcase } from "@/lib/content";
import ScrollScrubSequence from "@/components/ui/ScrollScrubSequence";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Showcase — the signature canvas moment.
 * Desktop: overlay step copy crossfades as the scrub progresses.
 * Mobile: there is no scrub, so the steps auto-cycle on a gentle timer.
 */
export default function Showcase() {
  const [progress, setProgress] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [mobileStep, setMobileStep] = useState(0);

  const handleProgress = useCallback((p: number) => setProgress(p), []);

  // Detect mobile once (matches ScrollScrubSequence's static-mode breakpoint).
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 820px)").matches;
    setMobile(narrow || (coarse && window.innerWidth < 1024));
  }, []);

  // On mobile, cycle through the steps on a timer.
  useEffect(() => {
    if (!mobile) return;
    const id = setInterval(
      () => setMobileStep((s) => (s + 1) % showcase.steps.length),
      3000
    );
    return () => clearInterval(id);
  }, [mobile]);

  // Which step is "active": timer on mobile, scrub progress on desktop.
  const activeIndex = mobile
    ? mobileStep
    : showcase.steps.reduce(
        (acc, step, i) => (progress >= step.at ? i : acc),
        0
      );

  return (
    <section id="showcase" className="relative">
      <ScrollScrubSequence
        frameCount={showcase.frameCount}
        scrollLength={4}
        onProgress={handleProgress}
      >
        <div className="container-x grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* left: persistent label */}
          <div>
            <Eyebrow>{showcase.eyebrow}</Eyebrow>
            <h2 className="mt-6 hidden max-w-md font-display text-4xl font-bold leading-tight tracking-tight text-gradient md:block lg:text-5xl">
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
