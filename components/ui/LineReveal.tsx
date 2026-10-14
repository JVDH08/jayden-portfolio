"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { observeOnce } from "@/lib/inview";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

type Props = {
  as?: Tag;
  children: ReactNode;
  className?: string;
  id?: string;
  /** delay in seconds before the first line starts */
  delay?: number;
};

/**
 * LineReveal — line-by-line masked reveal when the element scrolls into
 * view (once). Lines are split after the fonts are in, re-split on resize
 * (autoSplit), and handed back to normal text flow on unmount.
 * Trigger is the shared IntersectionObserver, not a ScrollTrigger.
 * Reduced motion: plain text, nothing hidden.
 */
export default function LineReveal({
  as = "h2",
  children,
  className = "",
  id,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | null = null;
    let cancelled = false;
    let unobserve = () => {};
    let lines: Element[] = [];
    let inView = false;
    let played = false;

    const play = () => {
      if (played || !inView || !lines.length) return;
      played = true;
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        delay,
        ease: "expo.out",
        stagger: 0.09,
      });
    };

    document.fonts.ready.then(() => {
      if (cancelled) return;
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "reveal-line",
        // Split spans keep the real text; no aria-label on headings.
        aria: "none",
        autoSplit: true,
        onSplit(self) {
          lines = self.lines;
          el.classList.add("is-split");
          if (!played) gsap.set(lines, { yPercent: 110 });
          play();
        },
      });
      unobserve = observeOnce(el, () => {
        inView = true;
        play();
      });
    });

    return () => {
      cancelled = true;
      unobserve();
      split?.revert();
      el.classList.remove("is-split");
    };
  }, [delay]);

  return createElement(as, { ref, id, className }, children);
}
