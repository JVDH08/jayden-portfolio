"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { faq, site } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { MailIcon, PlusIcon } from "@/components/ui/Icons";

type Item = (typeof faq.items)[number];

function FaqItem({
  item,
  index,
  open,
  onToggle,
  baseId,
}: {
  item: Item;
  index: number;
  open: boolean;
  onToggle: () => void;
  baseId: string;
}) {
  const reduce = useReducedMotion();
  const buttonId = `${baseId}-q${index}`;
  const panelId = `${baseId}-a${index}`;

  return (
    <li className="border-t border-white/10 last:border-b">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          data-cursor
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-lg font-semibold text-text-primary transition-colors group-hover:text-white md:text-xl">
            {item.q}
          </span>
          <span
            aria-hidden
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300 ${
              open
                ? "rotate-45 bg-accent text-white ring-accent/60"
                : "bg-white/5 text-text-primary ring-white/10 group-hover:bg-white/10"
            }`}
          >
            <PlusIcon className="h-4 w-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduce ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <p className="max-w-xl pb-7 text-base leading-relaxed text-text-secondary">
              {item.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export default function Faq() {
  const baseId = useId();
  // De eerste vraag (prijs) staat open: dat is wat de meeste bezoekers willen weten.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    // No overflow clipping here: the left column is sticky.
    <section id="faq" className="relative py-28 md:py-40">
      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:gap-20">
          <div className="md:sticky md:top-32 md:self-start">
            <Reveal>
              <Eyebrow>{faq.eyebrow}</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-gradient"
            >
              {faq.title}
            </LineReveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-text-secondary md:text-lg">
                {faq.intro}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8">
                <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                  <MailIcon className="h-4 w-4" />
                  {site.email}
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ul>
              {faq.items.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  index={i}
                  baseId={baseId}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
                />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
