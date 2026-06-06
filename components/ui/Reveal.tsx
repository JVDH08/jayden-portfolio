"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** delay in seconds */
  delay?: number;
  /** vertical travel in px */
  y?: number;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Reveal — fade + slide-up on scroll into view (one-shot).
 * Honors prefers-reduced-motion by rendering content immediately.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
