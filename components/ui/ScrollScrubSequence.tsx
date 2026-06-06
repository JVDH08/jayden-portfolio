"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  /** how many viewport-heights of scroll the scrub spans (desktop) */
  scrollLength?: number;
  /** overlay content rendered above the canvas, pinned with it */
  children?: ReactNode;
  /** receives scrub progress 0..1 (desktop scrub only) */
  onProgress?: (p: number) => void;
  className?: string;
};

type Mode = "pending" | "scrub" | "static";

/**
 * ScrollScrubSequence
 * -------------------
 * The site's signature moment, with a device-aware strategy:
 *
 *  • DESKTOP ("scrub"): the full frame sequence is preloaded and drawn to a
 *    <canvas>, with the current frame bound to scroll position via GSAP
 *    ScrollTrigger `scrub`. The section is pinned, so it plays "in place".
 *    The canvas is sized to its real CSS box × devicePixelRatio for sharpness.
 *
 *  • MOBILE / reduced-motion ("static"): scroll-linked scrubbing is JANKY and
 *    memory-heavy on phones (decoding ~90 large frames). Instead we load a
 *    SINGLE sharp representative frame and give it a subtle Framer Motion
 *    parallax. Smooth beats spectacular on mobile. No pin, no heavy preload.
 *
 * The mode is decided once on mount from viewport width + touch + motion prefs.
 */
export default function ScrollScrubSequence({
  frameCount,
  getFrameUrl = (i) => `/frames/frame_${String(i).padStart(4, "0")}.webp`,
  scrollLength = 4,
  children,
  onProgress,
  className = "",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameState = useRef({ current: 0, drawn: -1 });

  const [mode, setMode] = useState<Mode>("pending");
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [staticLoaded, setStaticLoaded] = useState(false);

  const staticFrame = getFrameUrl(Math.max(1, Math.round(frameCount * 0.5)));

  /* ---------- decide mode once (client only) ---------- */
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 820px)").matches;
    const isMobile = narrow || (coarse && window.innerWidth < 1024);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setMode(isMobile || prefersReduced ? "static" : "scrub");
  }, []);

  /* ---------- preload (scrub mode only) ---------- */
  useEffect(() => {
    if (mode !== "scrub") return;
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
  }, [mode, frameCount, getFrameUrl]);

  /* ---------- draw + scrub (scrub mode only) ---------- */
  useEffect(() => {
    if (mode !== "scrub" || !ready) return;
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

    const st = ScrollTrigger.create({
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

    ScrollTrigger.refresh();

    return () => {
      ro.disconnect();
      gsap.ticker.remove(render);
      st.kill();
    };
  }, [mode, ready, frameCount, scrollLength, onProgress]);

  /* ---------- static-mode subtle parallax ---------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.14, 1.08]);

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen w-full overflow-hidden bg-bg ${className}`}
    >
      {/* ---- DESKTOP: canvas scrub ---- */}
      {mode === "scrub" && (
        <>
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
            className="absolute inset-0 h-full w-full"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
            aria-hidden
          />
        </>
      )}

      {/* ---- MOBILE / reduced-motion: single sharp frame + parallax ---- */}
      {mode === "static" && (
        <motion.img
          src={staticFrame}
          alt=""
          aria-hidden
          onLoad={() => setStaticLoaded(true)}
          style={{ y: parallaxY, scale: parallaxScale, willChange: "transform" }}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: staticLoaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
      )}

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
