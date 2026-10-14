"use client";

import { statement } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import WordReveal from "@/components/ui/WordReveal";
import Reveal from "@/components/ui/Reveal";

export default function Statement() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="container-x relative">
        <Reveal>
          <Eyebrow>{statement.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-10 max-w-5xl font-display text-[clamp(1.8rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.02em]">
          {statement.lines.map((line, i) => (
            <span key={i} className="block text-text-primary/90">
              <WordReveal
                text={line.text}
                highlight={line.highlight}
                delay={i * 0.1}
              />
            </span>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 max-w-xl">
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            {statement.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
