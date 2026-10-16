"use client";

import Image from "next/image";
import { caseSection, type CaseStudy as CaseData, type Project } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@/components/ui/Icons";

type Props = {
  data: CaseData;
  project?: Project;
  next: { slug: string; project: string; soort: string };
};

const labelClass = "text-xs uppercase tracking-[0.2em] text-text-secondary";
const h2Class =
  "font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-gradient";

/**
 * Case-pagina (/werk/<slug>): dezelfde beeldtaal als de homepage
 * (glass, hairlines, Eyebrow, LineReveal), maar dan als verhaal per project.
 */
export default function CaseStudy({ data, project, next }: Props) {
  const { labels } = caseSection;
  const [cover, ...gallery] = data.images;
  const isConcept = data.soort === "Conceptproject";

  return (
    <>
      {/* header */}
      <section id="top" className="relative pb-14 pt-32 md:pb-20 md:pt-44">
        <div className="container-x relative">
          <Reveal>
            <a
              href="/#projecten"
              data-cursor
              className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              <ArrowRightIcon className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
              {caseSection.back}
            </a>
          </Reveal>

          <Reveal delay={0.05} className="mt-10">
            <Eyebrow>
              {caseSection.eyebrow} · {data.soort}
            </Eyebrow>
          </Reveal>
          <LineReveal
            as="h1"
            className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-gradient"
          >
            {data.project}
          </LineReveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-xl">
              {data.lead}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-[1.4fr_0.6fr_1.6fr] sm:gap-8">
              <div>
                <dt className={labelClass}>{labels.voor}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-primary/90 md:text-base">{data.voor}</dd>
              </div>
              {project?.year ? (
                <div>
                  <dt className={labelClass}>{labels.jaar}</dt>
                  <dd className="mt-2 text-sm text-text-primary/90 md:text-base">{project.year}</dd>
                </div>
              ) : null}
              <div>
                <dt className={labelClass}>{labels.techniek}</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {data.techniek.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            {project?.url ? (
              <MagneticButton href={project.url} external>
                {caseSection.live}
                <ArrowUpRightIcon className="h-4 w-4" />
              </MagneticButton>
            ) : null}
            <MagneticButton href={caseSection.cta.href} variant="ghost">
              {caseSection.cta.button}
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* cover */}
      {cover ? (
        <div className="container-x relative">
          <Reveal y={40}>
            <div className="glass relative aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:aspect-[16/9]">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
                style={{ objectPosition: cover.position ?? "50% 50%" }}
              />
            </div>
          </Reveal>
        </div>
      ) : null}

      {isConcept ? (
        <div className="container-x relative mt-8">
          <Reveal>
            <p className="glass max-w-3xl rounded-2xl px-6 py-5 text-sm leading-relaxed text-text-secondary md:text-base">
              {caseSection.conceptNote}
            </p>
          </Reveal>
        </div>
      ) : null}

      {/* opdracht */}
      <section className="relative py-24 md:py-32">
        <div className="container-x relative grid gap-8 md:grid-cols-[0.8fr_1.6fr] md:gap-16">
          <Reveal>
            <Eyebrow>{labels.opdracht}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-display text-[clamp(1.35rem,2.6vw,2rem)] font-semibold leading-snug tracking-tight text-text-primary">
              {data.opdracht}
            </p>
          </Reveal>
        </div>
      </section>

      {/* aanpak */}
      <section className="relative pb-24 md:pb-32">
        <div className="container-x relative">
          <Reveal>
            <Eyebrow>{labels.aanpak}</Eyebrow>
          </Reveal>
          <ol className="mt-10">
            {data.aanpak.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={0.05 * i}
                className="grid gap-3 border-t border-white/10 py-8 md:grid-cols-[0.8fr_1.6fr] md:gap-16 md:py-10"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm font-semibold text-accent-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-bold text-text-primary md:text-2xl">
                    {step.title}
                  </h3>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* galerij */}
      {gallery.length ? (
        <div className="container-x relative">
          <div className={`grid gap-5 ${gallery.length > 1 ? "md:grid-cols-2" : ""}`}>
            {gallery.map((img, i) => (
              <Reveal key={img.src} delay={0.08 * i}>
                <div className="glass relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={gallery.length > 1 ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
                    className="object-cover"
                    style={{ objectPosition: img.position ?? "50% 50%" }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}

      {/* inhoud + resultaat */}
      <section className="relative py-24 md:py-32">
        <div className="container-x relative grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="glass h-full rounded-3xl p-7 md:p-9">
              <h2 className={labelClass}>{labels.inhoud}</h2>
              <ul className="mt-5 space-y-3">
                {data.inhoud.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-primary/90 md:text-base">
                    <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-soft" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:self-center">
            <Eyebrow>{labels.resultaat}</Eyebrow>
            <p className="mt-6 text-lg leading-relaxed text-text-primary/90 md:text-xl">{data.resultaat}</p>
            {project?.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="group mt-6 inline-flex items-center gap-2 text-sm text-accent-soft transition-colors hover:text-text-primary"
              >
                {project.url.replace(/^https?:\/\//, "")}
                <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* volgende case + CTA */}
      <section className="relative pb-24 md:pb-32">
        <div className="container-x relative space-y-5">
          <Reveal>
            <a
              href={`/werk/${next.slug}`}
              data-cursor
              className="group glass flex items-center justify-between gap-6 rounded-3xl px-7 py-7 transition-colors md:px-10 md:py-9"
            >
              <span>
                <span className={labelClass}>{caseSection.next}</span>
                <span className="mt-2 block font-display text-2xl font-bold text-text-primary md:text-4xl">
                  {next.project}
                </span>
                <span className="mt-1 block text-sm text-text-secondary">{next.soort}</span>
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="glass rounded-3xl px-7 py-10 md:px-12 md:py-14">
              <h2 className={h2Class}>{caseSection.cta.title}</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                {caseSection.cta.text}
              </p>
              <div className="mt-8">
                <MagneticButton href={caseSection.cta.href}>
                  {caseSection.cta.button}
                  <ArrowRightIcon className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
