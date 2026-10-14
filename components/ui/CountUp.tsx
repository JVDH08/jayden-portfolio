"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { observeOnce } from "@/lib/inview";

type Props = {
  /** e.g. "100%", "60 fps", "<1s". The first integer counts up; the rest stays. */
  value: string;
  className?: string;
};

const NUMBER = /^([^\d]*)(\d+)(.*)$/;

/**
 * CountUp — a stat that counts up to its value when it scrolls into view
 * (once; shared IntersectionObserver). The server renders the final value,
 * so without JS, with reduced motion or for a value without a number to
 * count (e.g. "<1s") the real text is simply there.
 */
export default function CountUp({ value, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const match = NUMBER.exec(value);
    if (!match) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    if (target < 10) return; // nothing worth counting

    const state = { v: 0 };
    const render = () => {
      el.textContent = `${prefix}${Math.round(state.v)}${suffix}`;
    };
    render();
    const tween = { current: null as gsap.core.Tween | null };
    const unobserve = observeOnce(el, () => {
      tween.current = gsap.to(state, {
        v: target,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: render,
      });
    });
    return () => {
      unobserve();
      tween.current?.kill();
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}
