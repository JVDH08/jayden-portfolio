"use client";

import { about } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import CountUp from "@/components/ui/CountUp";

/**
 * Over ons. Portraits don't exist yet, so each maker gets a monogram tile
 * that is designed rather than "photo to follow": a coloured depth, a large
 * outlined initial and the name. Swap the tile body for <Image> later.
 * Phones read heading and copy first, then the tiles.
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

          {/* two makers */}
          <Reveal className="md:order-first">
            <div className="grid grid-cols-2 gap-4">
              {about.team.map((member, i) => (
                <div
                  key={member.name}
                  className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  {/* TODO: vervang door <Image src={member.photo} alt={member.name} fill className="object-cover" /> */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    style={{
                      background:
                        i === 0
                          ? "radial-gradient(120% 90% at 20% 15%, rgba(110,91,255,0.5), transparent 60%), radial-gradient(80% 60% at 90% 100%, rgba(61,214,245,0.14), transparent 60%), #0c0c16"
                          : "radial-gradient(120% 90% at 80% 15%, rgba(61,214,245,0.34), transparent 60%), radial-gradient(80% 60% at 10% 100%, rgba(110,91,255,0.22), transparent 60%), #0c0c16",
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
                  {/* outlined monogram, bleeding off the tile */}
                  <span
                    aria-hidden
                    className="text-outline absolute -bottom-[0.18em] -right-[0.06em] font-display text-[9rem] font-extrabold leading-none tracking-[-0.06em] transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 sm:text-[11rem] md:text-[9rem] lg:text-[12rem]"
                  >
                    {member.initials}
                  </span>
                  <span
                    aria-hidden
                    className="absolute left-4 top-4 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(110,91,255,0.9)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent p-4 pt-10">
                    <div className="font-display text-base font-bold text-text-primary">
                      {member.name}
                    </div>
                    <div className="text-xs text-text-secondary">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
