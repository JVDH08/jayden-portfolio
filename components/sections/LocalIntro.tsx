"use client";

import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import { CheckIcon } from "@/components/ui/Icons";

type IntroContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  areasTitle: string;
  areas: string[];
  areasNote: string;
  forTitle: string;
  forList: string[];
};

/**
 * Lokale intro voor landingspagina's: verhaal links, werkgebied en
 * doelgroepen rechts in een glass-kaart. Zelfde typografie en spacing
 * als de secties op de homepage.
 */
export default function LocalIntro({ content }: { content: IntroContent }) {
  return (
    <section id="intro" className="relative py-28 md:py-40">
      <div className="container-x relative">
        <div className="grid gap-14 md:grid-cols-[1.25fr_1fr] md:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{content.eyebrow}</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-gradient"
            >
              {content.title}
            </LineReveal>
            <div className="mt-8 space-y-5">
              {content.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 * (i + 1)}>
                  <p className="max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15} className="md:self-center">
            <div className="glass rounded-3xl p-7 md:p-9">
              <h3 className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                {content.areasTitle}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {content.areas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-white/5 px-4 py-2 text-sm text-text-primary ring-1 ring-white/10"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {content.areasNote}
              </p>

              <h3 className="mt-9 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.2em] text-text-secondary">
                {content.forTitle}
              </h3>
              <ul className="mt-4 space-y-3">
                {content.forList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-primary/90 md:text-base">
                    <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-soft" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
