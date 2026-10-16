"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, navCta, site } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * Floating pill navbar.
 * - Own ink (glass-deep): readable even where backdrop-filter is skipped.
 * - Hides while scrolling down, returns on the way up; an in-page anchor
 *   click keeps it visible until the visitor scrolls themselves.
 * - Marks the section in view (aria-current="location").
 * - `base` ("/" on pages without the homepage sections) points the anchors
 *   at the homepage; the homepage itself keeps plain "#..." anchors.
 */
export default function Navbar({ base = "" }: { base?: string } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const hold = useRef(false);
  const menuId = useId();

  // Scroll position + direction (rAF-throttled; native scroll events keep
  // firing under Lenis because it scrolls the window itself).
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      setScrolled(y > 40);
      if (y < 120 || hold.current) setHidden(false);
      else if (dy > 6) setHidden(true);
      else if (dy < -6) setHidden(false);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    const release = () => {
      hold.current = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(e.key)) {
        release();
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Which section is in view: the one crossing the upper third of the screen.
  // Nothing is marked above the first section (hero) or between sections.
  useEffect(() => {
    const targets = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.id}`;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        setActive(nav.find((item) => visible.has(item.href))?.href ?? null);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Escape sluit het mobiele menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const anchorClick = () => {
    hold.current = true;
    setHidden(false);
    setOpen(false);
  };

  return (
    <header
      className="site-header fixed inset-x-0 top-0 z-50"
      data-hidden={hidden && !open ? "true" : "false"}
    >
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-[background-color,border-color,box-shadow,margin] duration-500 md:px-5 ${
          scrolled || open ? "glass-deep mx-3 lg:mx-auto" : "border border-transparent bg-transparent"
        }`}
      >
        <a
          href="#top"
          data-cursor
          onClick={anchorClick}
          aria-label={`${site.brand}, naar boven`}
          className="group flex items-center gap-2.5 pl-2 font-display text-sm font-bold tracking-tight"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="flex items-baseline gap-1">
            {site.brand}
            <span className="text-[11px] font-medium text-accent-soft/80 transition-colors group-hover:text-accent-soft">
              {site.mark}
            </span>
          </span>
        </a>

        {/* desktop nav */}
        <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const current = active === item.href;
            return (
              <a
                key={item.href}
                href={`${base}${item.href}`}
                data-cursor
                onClick={anchorClick}
                aria-current={current ? "location" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 hover:text-text-primary ${
                  current ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300 ${
                    current ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton href={`${base}${navCta.href}`} onClick={anchorClick} className="px-5 py-2.5 text-xs">
            {navCta.label}
          </MagneticButton>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          data-cursor
          className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
        >
          <span className="relative block h-2 w-5" aria-hidden>
            <span
              className={`absolute left-0 h-px w-full bg-text-primary transition-transform duration-500 ease-out-expo ${
                open ? "top-1 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-text-primary transition-transform duration-500 ease-out-expo ${
                open ? "top-1 -rotate-45" : "top-2"
              }`}
            />
          </span>
        </button>
      </motion.div>

      {/* mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            id={menuId}
            aria-label="Mobiele navigatie"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-deep mx-3 mt-2 flex flex-col gap-1 rounded-3xl p-3 lg:hidden"
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={`${base}${item.href}`}
                onClick={anchorClick}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                aria-current={active === item.href ? "location" : undefined}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-semibold transition-colors hover:bg-white/5 hover:text-text-primary ${
                  active === item.href ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {item.label}
                {active === item.href ? (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                ) : null}
              </motion.a>
            ))}
            <a
              href={`${base}${navCta.href}`}
              onClick={anchorClick}
              className="mt-2 rounded-2xl bg-accent px-4 py-3.5 text-center font-medium text-white glow-accent"
            >
              {navCta.label}
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
