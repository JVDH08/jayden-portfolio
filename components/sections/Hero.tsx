"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content";
import HeroBackground from "@/components/ui/HeroBackground";
import Eyebrow from "@/components/ui/Eyebrow";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: title drifts up & fades as you leave the hero.
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);

  const lineVariant = {
    hidden: { opacity: 0, y: reduce ? 0 : "0.5em", filter: reduce ? "blur(0px)" : "blur(10px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        delay: 0.35 + i * 0.12,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <HeroBackground />
      {/* grid lines for tech feel */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="container-x relative z-10 pt-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </motion.div>

        <h1 className="mt-7 font-display text-[clamp(2.15rem,8.5vw,7rem)] font-extrabold leading-[1.04] tracking-[-0.03em]">
          {hero.titleLines.map((line, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={lineVariant}
              initial="hidden"
              animate="show"
              className={`block pb-[0.04em] ${
                i === hero.highlightLine
                  ? "text-gradient-accent glow-text"
                  : "text-gradient"
              }`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href={hero.cta.href}>
            {hero.cta.label}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>
          <MagneticButton href={hero.ctaSecondary.href} variant="ghost">
            {hero.ctaSecondary.label}
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">
            {hero.scrollHint}
          </span>
          <div className="flex h-9 w-5 justify-center rounded-full border border-white/15 pt-1.5">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-accent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
