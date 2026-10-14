"use client";

import { packages } from "@/lib/content";
import { selectPackage } from "@/lib/packageSelect";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { CheckIcon } from "@/components/ui/Icons";

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-soft ring-1 ring-accent/25">
        <CheckIcon className="h-3 w-3" />
      </span>
      <span>{children}</span>
    </li>
  );
}

/** "vanaf" as a small label above the amount, so every price sits on one line. */
function Price({
  value,
  prefix,
  suffix,
}: {
  value: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <p className="flex flex-col">
      {prefix ? (
        <span className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
          {prefix}
        </span>
      ) : null}
      <span className="mt-1 flex items-baseline gap-x-2">
        <span className="font-display text-4xl font-extrabold tracking-tight text-gradient">
          {value}
        </span>
        {suffix ? (
          <span className="text-sm text-text-secondary">{suffix}</span>
        ) : null}
      </span>
    </p>
  );
}

export default function Packages() {
  const { care } = packages;

  return (
    <section id="pakketten" className="relative py-28 md:py-40">
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">{packages.eyebrow}</Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-gradient"
          >
            {packages.title}
          </LineReveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
              {packages.intro}
            </p>
          </Reveal>
        </div>

        {/* drie pakketten, gelijke hoogte; lijsten starten op dezelfde hoogte */}
        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {packages.tiers.map((tier, i) => {
            const popular = Boolean(tier.badge);
            return (
              <Reveal as="li" key={tier.id} delay={i * 0.1} className="h-full">
                <article
                  className={`relative flex h-full flex-col rounded-3xl glass p-8 ${
                    popular
                      ? "ring-1 ring-accent/50 shadow-[0_0_90px_-30px_var(--color-accent-glow)]"
                      : ""
                  }`}
                >
                  {popular ? (
                    <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white glow-accent">
                      {tier.badge}
                    </span>
                  ) : null}

                  <h3 className="font-display text-2xl font-bold text-text-primary">
                    {tier.name}
                  </h3>
                  <div className="mt-5">
                    <Price value={tier.price} prefix={packages.pricePrefix} />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary md:min-h-[4.5rem]">
                    {tier.description}
                  </p>

                  <ul className="mt-7 space-y-3 border-t border-white/10 pt-7">
                    {tier.features.map((f) => (
                      <Feature key={f}>{f}</Feature>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <MagneticButton
                      href="#contact"
                      onClick={() => selectPackage(tier.id)}
                      variant={popular ? "primary" : "ghost"}
                      strength={0.2}
                      className="w-full"
                    >
                      {packages.cta}
                      <span className="sr-only"> voor {tier.name}</span>
                    </MagneticButton>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        {/* Sixtyfold Zorg: brede kaart */}
        <Reveal delay={0.15}>
          <article className="mt-5 grid gap-8 rounded-3xl glass p-8 md:grid-cols-[1.1fr_1.5fr] md:p-10 xl:grid-cols-[1fr_1.4fr_auto] xl:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-text-primary">
                {care.name}
              </h3>
              <div className="mt-5">
                <Price
                  value={care.price}
                  prefix={packages.pricePrefix}
                  suffix={care.period}
                />
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
                {care.description}
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-6 md:self-center">
              {care.features.map((f) => (
                <Feature key={f}>{f}</Feature>
              ))}
            </ul>

            <div className="flex flex-col items-start gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between xl:col-span-1 xl:flex-col xl:items-end">
              <MagneticButton href="#contact" variant="ghost" strength={0.2}>
                {care.cta}
                <span className="sr-only"> voor {care.name}</span>
              </MagneticButton>
              <span className="text-xs text-text-secondary">{care.note}</span>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-text-secondary">
            {packages.payment}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
