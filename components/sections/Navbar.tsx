"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-5 ${
          scrolled ? "glass mx-3 md:mx-auto" : "bg-transparent"
        }`}
      >
        <a
          href="#top"
          data-cursor
          className="group flex items-center gap-2.5 pl-2 font-display text-sm font-bold tracking-tight"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          Jayden<span className="text-text-secondary"> v.d. Hoek</span>
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor
              className="rounded-full px-4 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton href="#contact" className="px-5 py-2.5 text-xs">
            Start een project
          </MagneticButton>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          data-cursor
          className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-px w-5 bg-text-primary transition-transform ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-text-primary transition-transform ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-3 mt-2 flex flex-col gap-1 rounded-3xl p-4 md:hidden"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-accent px-4 py-3 text-center font-medium text-white"
            >
              Start een project
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
