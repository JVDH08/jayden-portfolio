"use client";

import { useEffect, useRef } from "react";

/**
 * HeroBackground
 * --------------
 * A continuously moving, cinematic "aurora mesh" rendered to a canvas.
 * Several large radial-gradient blobs (violet / cyan / indigo) drift and
 * breathe using additive blending, producing a soft, premium living gradient.
 *
 * Composition is art-directed, not random: the light sits to the right and
 * top, away from the headline column, and a shade layer keeps the text zone
 * dark (left on desktop, lower half on phones).
 *
 * Performance:
 *  - Renders at a downscaled internal resolution (RENDER_SCALE) and is
 *    CSS-blurred, so per-frame cost stays tiny even on large screens.
 *  - Frame-rate capped (≈48fps desktop / 30fps mobile) to spare the GPU.
 *  - requestAnimationFrame; pauses when the tab is hidden.
 *  - prefers-reduced-motion → paints a single static frame.
 *  - Mobile → fewer blobs + lower fps.
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Very low internal resolution: the browser's bilinear upscale is the
    // softening, so no CSS blur filter is needed (that blur was re-run over
    // the full hero on every frame and made the first scroll stutter).
    const RENDER_SCALE = isMobile ? 0.1 : 0.12;
    const FPS = isMobile ? 30 : 40;
    const frameInterval = 1000 / FPS;

    type Blob = {
      hueA: string;
      hueB: string;
      baseX: number;
      baseY: number;
      ax: number;
      ay: number;
      sx: number; // speed
      sy: number;
      phase: number;
      r: number;
    };

    /** Fractions of the canvas: position, drift amplitude, radius. */
    type Layout = {
      hue: [string, string];
      x: number;
      y: number;
      ax: number;
      ay: number;
      r: number;
      phase: number;
    };

    const violet: [string, string] = ["rgba(110,91,255,0.9)", "rgba(110,91,255,0)"];
    const cyan: [string, string] = ["rgba(61,214,245,0.5)", "rgba(61,214,245,0)"];
    const soft: [string, string] = ["rgba(154,139,255,0.75)", "rgba(154,139,255,0)"];
    const indigo: [string, string] = ["rgba(80,60,200,0.7)", "rgba(80,60,200,0)"];

    // The headline block sits left/centre (x 0.08–0.86, y 0.2–0.6 on desktop,
    // full width y 0.28–0.55 on phones). Light centres stay outside that block:
    // top-right and right edge, with a deep indigo under the buttons.
    const desktop: Layout[] = [
      { hue: violet, x: 0.8, y: 0.18, ax: 0.07, ay: 0.08, r: 0.55, phase: 0.4 },
      { hue: cyan, x: 0.93, y: 0.72, ax: 0.05, ay: 0.08, r: 0.4, phase: 2.1 },
      { hue: soft, x: 0.5, y: 0.02, ax: 0.1, ay: 0.05, r: 0.45, phase: 3.6 },
      { hue: indigo, x: 0.22, y: 0.98, ax: 0.12, ay: 0.05, r: 0.5, phase: 5.0 },
    ];
    const phone: Layout[] = [
      { hue: violet, x: 0.7, y: 0.08, ax: 0.1, ay: 0.06, r: 0.6, phase: 0.4 },
      { hue: cyan, x: 0.98, y: 0.3, ax: 0.06, ay: 0.08, r: 0.4, phase: 2.1 },
      { hue: indigo, x: 0.25, y: 1.0, ax: 0.12, ay: 0.05, r: 0.55, phase: 5.0 },
    ];

    let blobs: Blob[] = [];
    let w = 0;
    let h = 0;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width * RENDER_SCALE));
      h = Math.max(1, Math.floor(rect.height * RENDER_SCALE));
      canvas.width = w;
      canvas.height = h;

      const layout = isMobile ? phone : desktop;
      blobs = layout.map((l, i) => ({
        hueA: l.hue[0],
        hueB: l.hue[1],
        baseX: l.x * w,
        baseY: l.y * h,
        ax: l.ax * w,
        ay: l.ay * h,
        sx: 0.05 + i * 0.012,
        sy: 0.04 + i * 0.01,
        phase: l.phase,
        r: l.r * Math.max(w, h),
      }));
    };

    const drawFrame = (t: number) => {
      // base
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#08080c";
      ctx.fillRect(0, 0, w, h);

      // additive blobs
      ctx.globalCompositeOperation = "lighter";
      for (const bl of blobs) {
        const x = bl.baseX + Math.sin(t * bl.sx + bl.phase) * bl.ax;
        const y = bl.baseY + Math.cos(t * bl.sy + bl.phase) * bl.ay;
        const pulse = 0.85 + 0.15 * Math.sin(t * 0.06 + bl.phase);
        const r = bl.r * pulse;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, bl.hueA);
        g.addColorStop(1, bl.hueB);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
    };

    setup();

    let raf = 0;
    let last = 0;
    const startTime = performance.now();

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < frameInterval) return;
      last = now;
      drawFrame((now - startTime) / 1000);
    };

    // Only animate while the hero is on screen and the tab is visible.
    let onScreen = true;
    const start = () => {
      cancelAnimationFrame(raf);
      if (!prefersReduced && onScreen && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    drawFrame(0);
    start();

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        setup();
        if (prefersReduced) drawFrame(0);
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    // The whole backdrop dissolves into the page over its lower third, so the
    // hero hands over to the page-wide light instead of ending on a line.
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(180deg,#000_64%,transparent_100%)]"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ filter: "saturate(1.2)" }}
      />
      {/* readability vignette over the moving gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(8,8,12,0.55)_75%,rgba(8,8,12,0.9)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg" />
      {/* shade behind the headline column (desktop: left; phone: lower half) */}
      <div className="absolute inset-0 hidden bg-[radial-gradient(60%_75%_at_16%_50%,rgba(8,8,12,0.6)_0%,rgba(8,8,12,0.3)_45%,transparent_80%)] md:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,12,0.05)_0%,rgba(8,8,12,0.4)_38%,rgba(8,8,12,0.72)_70%,rgba(8,8,12,1)_100%)] md:hidden" />
    </div>
  );
}
