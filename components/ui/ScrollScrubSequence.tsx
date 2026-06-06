"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  /** total number of frames in the sequence */
  frameCount: number;
  /** builds a URL for frame index `i` (1-based) */
  getFrameUrl?: (i: number) => string;
  /** intrinsic frame dimensions (for canvas backing store) */
  width?: number;
  height?: number;
  /** how many viewport-heights of scroll the scrub spans (desktop) */
  scrollLength?: number;
  /** overlay content rendered above the canvas, pinned with it */
  children?: ReactNode;
  /** receives scrub progress 0..1 (desktop scrub only) */
  onProgress?: (p: number) => void;
  className?: string;
};

/**
 * ScrollScrubSequence
 * -------------------
 * The site's signature moment. A frame sequence is drawn to a <canvas> and the
 * current frame is bound to scroll position via GSAP ScrollTrigger `scrub`.
 * Scroll down → frames advance; scroll up → frames rewind. The section is
 * pinned so the animation plays "in place" while you scroll.
 *
 * Performance:
 *  - All frames are preloaded (with a progress loader) before scrubbing starts.
 *  - Drawing happens via requestAnimationFrame; we only repaint when the
 *    frame index actually changes.
 *  - Honors prefers-reduced-motion and mobile: on those it skips the heavy
 *    pin/scrub and shows a single representative frame (graceful degrade).
 *
 * Reusable: pass any `frameCount` + `getFrameUrl`.
 */
export default function ScrollScrubSequence({
  frameCount,
  getFrameUrl = (i) =>
    `/frames/frame_${String(i).padStart(4, "0")}.webp`,
  width = 1600,
  height = 900,
  scrollLength = 4,
  children,
  onProgress,
  className = "",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameState = useRef({ current: 0, drawn: -1 });

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  /* ---------- preload all frames ---------- */
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.decoding = "async";
      const done = () => {
        if (cancelled) return;
        loaded++;
        setProgress(Math.round((loaded / frameCount) * 100));
        if (loaded === frameCount) setReady(true);
      };
      img.onload = done;
      img.onerror = done; // don't block on a missing frame
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, [frameCount, getFrameUrl]);

  /* ---------- draw + scrub ---------- */
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Track the canvas' real CSS size; the backing store is that size × DPR
    // so frames are pixel-sharp on retina / high-DPI displays.
    let cssW = 0;
    let cssH = 0;

    // "cover" draw: fill the canvas box preserving aspect ratio.
    const draw = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = cssW;
      const ch = cssH;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number;
      let dh: number;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
      } else {
        dw = cw;
        dh = cw / ir;
      }
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const render = () => {
      const idx = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(frameState.current.current))
      );
      if (idx !== frameState.current.drawn) {
        draw(idx);
        frameState.current.drawn = idx;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      frameState.current.drawn = -1; // force repaint at new resolution
      render();
    };

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    gsap.ticker.add(render);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let st: ScrollTrigger | undefined;

    if (prefersReduced) {
      // Static, representative frame — no pin, no scrub.
      frameState.current.current = Math.floor(frameCount * 0.5);
      render();
    } else if (isMobile) {
      // Light fallback: auto-advance the loop slowly while the section is
      // in view, without pinning (keeps mobile scroll snappy).
      const obj = { f: 0 };
      const tween = gsap.to(obj, {
        f: frameCount - 1,
        duration: 6,
        ease: "none",
        repeat: -1,
        paused: true,
        onUpdate: () => {
          frameState.current.current = obj.f;
        },
      });
      st = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
      });
    } else {
      // Desktop: pin + scrub the full sequence to scroll position.
      st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${scrollLength * 100}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          frameState.current.current = self.progress * (frameCount - 1);
          onProgress?.(self.progress);
        },
      });
    }

    ScrollTrigger.refresh();

    return () => {
      ro.disconnect();
      gsap.ticker.remove(render);
      st?.kill();
    };
  }, [ready, frameCount, width, height, scrollLength, onProgress]);

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen w-full overflow-hidden bg-bg ${className}`}
    >
      {/* Loader */}
      {!ready && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-bg">
          <div className="font-display text-sm uppercase tracking-[0.3em] text-text-secondary">
            Sequence laden
          </div>
          <div className="h-px w-56 overflow-hidden bg-white/10">
            <div
              className="h-full bg-accent glow-accent transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="font-display text-2xl tabular-nums text-text-primary">
            {progress}%
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
        aria-hidden
      />

      {/* readability gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/80" />

      {/* overlay content */}
      {children && (
        <div className="relative z-20 flex h-full w-full items-center">
          {children}
        </div>
      )}
    </section>
  );
}
