"use client";

import { why } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import { CheckIcon, CrossIcon, WhyIcon } from "@/components/ui/Icons";

/**
 * Waarom Sixtyfold — zes sterke punten als editorial lijst (hairlines, bare
 * line icons, geen kaarten) plus een compacte vergelijkingsstrook.
 */
export default function Why() {
  const { compare } = why;

  return (
    <section id="waarom" className="relative py-28 md:py-40">
      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{why.eyebrow}</Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-gradient"
          >
            {why.title}
          </LineReveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
              {why.intro}
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-x-12 md:grid-cols-2">
          {why.points.map((point, i) => (
            <Reveal
              as="li"
              key={point.title}
              delay={0.05 * i}
              className="border-t border-white/10 py-8 md:py-9"
            >
              <div className="flex gap-5">
                <span className="mt-1 shrink-0 text-accent-soft">
                  <WhyIcon name={point.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-text-primary md:text-2xl">
                    {point.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary md:text-base">
                    {point.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* vergelijkingsstrook */}
        <Reveal delay={0.1} className="mt-14">
          <div className="glass overflow-hidden rounded-3xl">
            <div className="hidden grid-cols-[1fr_1.4fr_1.4fr] gap-4 border-b border-white/10 px-8 py-4 text-xs uppercase tracking-[0.2em] text-text-secondary md:grid">
              <span>{compare.title}</span>
              <span>{compare.columns.a}</span>
              <span className="text-accent-soft">{compare.columns.b}</span>
            </div>
            <ul>
              {compare.rows.map((row) => (
                <li
                  key={row.label}
                  className="grid gap-2 border-b border-white/10 px-6 py-5 last:border-b-0 md:grid-cols-[1fr_1.4fr_1.4fr] md:items-center md:gap-4 md:px-8"
                >
                  <span className="font-display text-base font-semibold text-text-primary">
                    {row.label}
                  </span>
                  <span className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <CrossIcon className="h-4 w-4 shrink-0 text-text-secondary/60" />
                    <span className="sr-only">{compare.columns.a}: </span>
                    {row.a}
                  </span>
                  <span className="flex items-center gap-2.5 text-sm text-text-primary">
                    <CheckIcon className="h-4 w-4 shrink-0 text-accent-soft" />
                    <span className="sr-only">{compare.columns.b}: </span>
                    {row.b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
