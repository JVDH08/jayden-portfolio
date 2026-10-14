"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CursorGlow
 * ----------
 * A soft accent-coloured glow that trails the cursor, plus a small precise
 * dot. Auto-disables on touch devices and when the user prefers reduced
 * motion. The glow grows + brightens over interactive elements ([data-cursor]
 * or links/buttons) for a tactile, premium feel.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePointer || prefersReduced) return;

    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let raf = 0;

    // Nothing shows until the pointer has actually moved (no dot parked in
    // the corner on load), and both fade out when the pointer leaves the page.
    const setVisible = (on: boolean) => {
      glowRef.current?.setAttribute("data-visible", String(on));
      dotRef.current?.setAttribute("data-visible", String(on));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current?.dataset.visible !== "true") {
        glowX = mouseX;
        glowY = mouseY;
        setVisible(true);
      }

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea"
      );
      if (glowRef.current) {
        glowRef.current.dataset.hover = interactive ? "true" : "false";
      }
    };

    const loop = () => {
      // Lerp the big glow for a trailing feel.
      glowX += (mouseX - glowX) * 0.14;
      glowY += (mouseY - glowY) * 0.14;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        data-hover="false"
        data-visible="false"
        className="pointer-events-none fixed left-0 top-0 z-[70] h-[26rem] w-[26rem] rounded-full opacity-0 mix-blend-screen transition-[width,height,opacity] duration-300 data-[visible=true]:opacity-60 data-[visible=true]:data-[hover=true]:opacity-90"
        style={{
          background:
            "radial-gradient(circle, rgba(110,91,255,0.22) 0%, rgba(110,91,255,0.05) 40%, transparent 70%)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        data-visible="false"
        className="pointer-events-none fixed left-0 top-0 z-[71] h-1.5 w-1.5 rounded-full bg-accent-soft opacity-0 mix-blend-screen transition-opacity duration-300 data-[visible=true]:opacity-100"
      />
    </>
  );
}
