"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import { ProcessIcon } from "@/components/ui/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LIT = {
  color: "#9a8bff",
  borderColor: "rgba(110,91,255,0.6)",
  backgroundColor: "rgba(110,91,255,0.12)",
};

/**
 * Aanpak — four steps on one line that draws itself as you scroll.
 * Vertical timeline up to xl, one horizontal row on xl. The accent line is
 * scrubbed (transform only); each step marker lights up as the line reaches
 * it. Without JS or under reduced motion the line is simply fully drawn.
 */
export default function Process() {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const line = root.querySelector<HTMLElement>("[data-line]");
    const marks = gsap.utils.toArray<HTMLElement>("[data-mark]", root);
    if (!line) return;

    const mm = gsap.matchMedia();
    const build = (axis: "scaleX" | "scaleY") => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          end: "bottom 62%",
          scrub: 0.6,
        },
      });
      tl.fromTo(line, { [axis]: 0 }, { [axis]: 1, duration: 1 }, 0);
      marks.forEach((mark, i) => {
        tl.to(mark, { ...LIT, duration: 0.04 }, (i / Math.max(1, marks.length - 1)) * 0.94);
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([line, ...marks], { clearProps: "all" });
      };
    };

    mm.add(
      {
        wide: "(min-width: 1280px) and (prefers-reduced-motion: no-preference)",
        narrow: "(max-width: 1279.98px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { wide } = ctx.conditions as { wide: boolean };
        return build(wide ? "scaleX" : "scaleY");
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="werkwijze" className="relative py-28 md:py-40">
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow>{process.eyebrow}</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              className="mt-6 max-w-xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-gradient"
            >
              {process.title}
            </LineReveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
              {process.intro}
            </p>
          </Reveal>
        </div>

        <ol
          ref={list}
          className="relative mt-16 grid gap-12 pl-14 xl:grid-cols-4 xl:gap-8 xl:pl-0 xl:pt-20"
        >
          {/* track + drawn line: vertical up to xl, horizontal on xl */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[1.125rem] top-0 w-px bg-white/10 xl:bottom-auto xl:left-0 xl:right-0 xl:top-[1.125rem] xl:h-px xl:w-auto"
          />
          <div
            data-line
            aria-hidden
            className="absolute bottom-0 left-[1.125rem] top-0 w-px origin-top bg-gradient-to-b from-accent via-accent-soft to-[#4de0ff] xl:bottom-auto xl:left-0 xl:right-0 xl:top-[1.125rem] xl:h-px xl:w-auto xl:origin-left xl:bg-gradient-to-r"
          />

          {process.steps.map((step, i) => (
            <li key={step.no} className="relative xl:pt-16">
              {/* marker on the line */}
              <span
                data-mark
                aria-hidden
                className="absolute -left-14 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-bg text-text-secondary xl:left-0"
              >
                <ProcessIcon index={i} className="h-4 w-4" />
              </span>

              <Reveal delay={i * 0.08}>
                <span
                  aria-hidden
                  className="block font-display text-5xl font-extrabold leading-none tracking-[-0.04em] text-white/[0.07] xl:text-6xl"
                >
                  {step.no}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-text-primary">
                  <span className="sr-only">Stap {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary md:text-base xl:max-w-none">
                  {step.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
