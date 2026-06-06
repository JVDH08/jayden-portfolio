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
 * WordReveal — staggered word-by-word fade/slide reveal on scroll.
 * Used for the big statement lines.
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
      transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : "0.6em" },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            variants={word}
            className={`inline-block ${
              highlight.includes(i) ? "text-gradient-accent" : ""
            }`}
            aria-hidden
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
