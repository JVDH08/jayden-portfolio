"use client";

import { useEffect, useRef } from "react";

/**
 * HeroBackground
 * --------------
 * A continuously moving, cinematic "aurora mesh" rendered to a canvas.
 * Several large radial-gradient blobs (violet / cyan / indigo) drift and
 * breathe using additive blending, producing a soft, premium living gradient.
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

    const RENDER_SCALE = isMobile ? 0.28 : 0.4; // low internal res → cheap + smooth
    const FPS = isMobile ? 30 : 48;
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

    const palette: Array<[string, string]> = [
      ["rgba(110,91,255,0.9)", "rgba(110,91,255,0)"], // violet
      ["rgba(61,214,245,0.7)", "rgba(61,214,245,0)"], // cyan
      ["rgba(154,139,255,0.8)", "rgba(154,139,255,0)"], // soft violet
      ["rgba(80,60,200,0.7)", "rgba(80,60,200,0)"], // indigo
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

      const count = isMobile ? 3 : 4;
      blobs = Array.from({ length: count }, (_, i) => {
        const [a, b] = palette[i % palette.length];
        return {
          hueA: a,
          hueB: b,
          baseX: (0.2 + 0.6 * Math.random()) * w,
          baseY: (0.2 + 0.6 * Math.random()) * h,
          ax: (0.12 + 0.16 * Math.random()) * w,
          ay: (0.12 + 0.16 * Math.random()) * h,
          sx: 0.04 + Math.random() * 0.05,
          sy: 0.03 + Math.random() * 0.05,
          phase: Math.random() * Math.PI * 2,
          r: (0.45 + 0.25 * Math.random()) * Math.max(w, h),
        };
      });
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
    let startTime = performance.now();

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < frameInterval) return;
      last = now;
      drawFrame((now - startTime) / 1000);
    };

    if (prefersReduced) {
      drawFrame(0); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!prefersReduced) {
        last = 0;
        startTime = performance.now() - 0;
        raf = requestAnimationFrame(loop);
      }
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
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          filter: "blur(60px) saturate(1.2)",
          transform: "scale(1.15)", // hide blurred edges
        }}
      />
      {/* readability vignette over the moving gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(8,8,12,0.55)_75%,rgba(8,8,12,0.9)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg" />
    </div>
  );
}
