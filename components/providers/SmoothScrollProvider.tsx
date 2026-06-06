"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScrollProvider
 * --------------------
 * Drives the whole site's premium feel. Lenis intercepts native scroll and
 * lerps it; GSAP's ScrollTrigger is driven from the SAME RAF loop so the
 * canvas scrub stays perfectly in sync with the smoothed scroll position.
 *
 * Respects `prefers-reduced-motion`: when set, Lenis is skipped entirely and
 * the browser uses native scrolling.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Let ScrollTrigger still work with native scroll.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger updated on every Lenis frame.
    lenis.on("scroll", ScrollTrigger.update);

    // Single shared RAF loop (gsap.ticker is in seconds → *1000).
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recalculate triggers once everything is laid out / images loaded.
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
