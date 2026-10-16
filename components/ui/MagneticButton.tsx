"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  strength?: number;
  /** Opens `href` in a new tab (for links to other sites). */
  external?: boolean;
};

/**
 * MagneticButton
 * --------------
 * A glowing CTA that subtly leans toward the cursor (magnetic effect).
 * Renders as <a> when `href` is given, otherwise a <button>.
 * Disables the magnetic motion under prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  strength = 0.35,
  external = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  // `scale` is its own CSS property in Tailwind v4, so the press feedback
  // composes with the magnetic translate that Framer writes to `transform`.
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-[color,background-color,scale] duration-300 ease-out-expo select-none active:scale-[0.97]";

  const styles =
    variant === "primary"
      ? "bg-accent text-white glow-accent hover:bg-accent-soft"
      : "glass text-text-primary hover:text-white";

  const MotionTag = (href ? motion.a : motion.button) as typeof motion.a;

  return (
    <MotionTag
      ref={ref as never}
      href={href}
      target={href && external ? "_blank" : undefined}
      rel={href && external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      data-cursor
      className={`${base} ${styles} ${className}`}
    >
      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-white/15 opacity-0 blur-md transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
      </span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </MotionTag>
  );
}
