"use client";

import { about } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import CountUp from "@/components/ui/CountUp";

/**
 * Over Sixtyfold. No portraits: a designed studio card instead, with the
 * outlined "60" bleeding off the edge and the three working principles.
 * Phones read heading and copy first, then the card.
 */
export default function About() {
  return (
    <section id="over" className="relative py-28 md:py-40">
      <div className="container-x relative">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          {/* text */}
          <div>
            <Reveal>
              <Eyebrow>{about.eyebrow}</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-gradient"
            >
              {about.title}
            </LineReveal>

            <div className="mt-7 space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="max-w-[52ch] text-base leading-relaxed text-text-secondary md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {about.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-extrabold text-gradient-accent md:text-4xl">
                      <CountUp value={s.value} />
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-text-secondary">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* studio card */}
          <Reveal className="md:order-first">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:aspect-[5/4] md:aspect-[4/5]">
              <div
                aria-hidden
                className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-105"
                style={{
                  background:
                    "radial-gradient(110% 80% at 18% 12%, rgba(110,91,255,0.48), transparent 60%), radial-gradient(90% 70% at 100% 100%, rgba(61,214,245,0.2), transparent 60%), #0c0c16",
                }}
              />
              {/* hairline grid, like the hero */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              {/* outlined numeral, bleeding off the card */}
              <span
                aria-hidden
                className="absolute -right-[0.06em] -top-[0.16em] font-display text-[13rem] font-extrabold leading-none tracking-[-0.07em] text-transparent transition-transform duration-700 ease-out-expo [-webkit-text-stroke:1.5px_rgba(154,139,255,0.38)] group-hover:translate-y-2 sm:text-[16rem] md:text-[14rem] lg:text-[19rem]"
              >
                {about.card.numeral}
              </span>

              <div className="relative flex h-full flex-col p-7 md:p-9">
                <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.25em] text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(110,91,255,0.9)]" />
                  {about.card.label}
                </div>
                <ul className="mt-auto space-y-4">
                  {about.card.principles.map((line, i) => (
                    <li key={line} className="flex items-baseline gap-4">
                      <span className="font-display text-sm font-bold tabular-nums text-accent-soft">
                        0{i + 1}
                      </span>
                      <span className="font-display text-lg font-semibold leading-snug text-text-primary md:text-xl">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
