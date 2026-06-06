"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  /** delay before the whole line starts */
  delay?: number;
  /** highlight these words (0-indexed) with the accent gradient */
  highlight?: number[];
};

/**
 * WordReveal — staggered word-by-word reveal on scroll.
 *
 * Deliberately NOT clipped with overflow-hidden: words fade + rise + unblur,
 * so glyph ascenders/descenders are never cut off. Uses inline-block words so
 * wrapping stays natural.
 */
export default function WordReveal({
  text,
  className = "",
  delay = 0,
  highlight = [],
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : "0.35em",
      filter: reduce ? "blur(0px)" : "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={`inline ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className={`inline-block whitespace-pre ${
            highlight.includes(i) ? "text-gradient-accent" : ""
          }`}
          aria-hidden
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
