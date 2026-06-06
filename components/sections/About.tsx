"use client";

import { about } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="over" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          {/* photo placeholder */}
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass">
                {/* TODO: vervang door <Image src={about.photo} ... /> */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 30% 20%, rgba(110,91,255,0.35), transparent 55%), radial-gradient(120% 100% at 80% 90%, rgba(61,214,245,0.25), transparent 55%), #0c0c16",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[7rem] font-extrabold text-white/5">
                    JvdH
                  </span>
                </div>
                {/* location chip */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Haarlem, NL
                </div>
              </div>
              {/* floating accent ring */}
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-accent/30 animate-spin-slow" />
            </div>
          </Reveal>

          {/* text */}
          <div>
            <Reveal>
              <Eyebrow>{about.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-gradient">
                {about.title}
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="text-base leading-relaxed text-text-secondary md:text-lg">
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
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-text-secondary">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
