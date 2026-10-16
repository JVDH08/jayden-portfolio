"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { concepts, conceptsSection, projects, projectsSection, type Project } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/Icons";

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  // Met een case-pagina linkt de kaart naar de case (die linkt weer door naar de live site).
  const href = project.caseSlug ? `/werk/${project.caseSlug}` : project.url;
  const external = !project.caseSlug;

  // Subtle 3D tilt toward the cursor; the wide featured card tilts less.
  const amount = featured ? 3.5 : 6;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [amount, -amount]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-amount, amount]), {
    stiffness: 150,
    damping: 18,
  });

  // The image travels a little slower than the card while it crosses the
  // viewport (transform only; the wrapper has 8% bleed top and bottom).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-7%", "7%"]
  );

  // The tilt and the accent sheen (CSS vars, see .card-sheen) follow the cursor.
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
    ref.current.style.setProperty("--sx", String(px * 100));
    ref.current.style.setProperty("--sy", String(py * 100));
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Reveal
      delay={index * 0.1}
      className={featured ? "md:col-span-2 lg:col-span-3" : ""}
    >
      <motion.a
        ref={ref}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        data-cursor
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className={`card-sheen group relative block h-full overflow-hidden rounded-[1.75rem] glass [transform-style:preserve-3d] ${
          featured ? "md:grid md:grid-cols-2 lg:grid-cols-5" : ""
        }`}
      >
        {/* preview */}
        <div
          className={`relative overflow-hidden ${
            featured
              ? "aspect-[16/10] md:aspect-auto md:min-h-[26rem] lg:col-span-3 lg:min-h-[30rem]"
              : "aspect-[16/10]"
          }`}
        >
          <motion.div
            style={{ y: imgY }}
            className="absolute inset-x-0 -inset-y-[8%] will-change-transform"
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 760px"
                  : "(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
              }
              style={{ objectPosition: project.imagePosition ?? "50% 50%" }}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>
          {/* readability: fade into the card body (bottom on mobile, right on the wide card) */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent ${
              featured
                ? "md:bg-[linear-gradient(90deg,transparent_50%,rgba(8,8,12,0.55)_85%,rgba(8,8,12,0.9)_100%)]"
                : ""
            }`}
          />

          {/* year chip */}
          <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs text-text-primary backdrop-blur-md">
            {project.year}
          </span>
        </div>

        {/* body */}
        <div
          className={`relative p-7 ${
            featured
              ? "md:flex md:flex-col md:justify-between md:p-9 lg:col-span-2 lg:p-10"
              : ""
          }`}
          style={{ transform: "translateZ(40px)" }}
        >
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className={`font-display font-bold text-text-primary ${
                    featured ? "text-2xl md:text-3xl" : "text-2xl"
                  }`}
                >
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-accent-soft">{project.tagline}</p>
              </div>
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-accent group-hover:text-white"
              >
                <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </div>

            <p
              className={`mt-4 max-w-md text-sm leading-relaxed text-text-secondary ${
                featured ? "md:text-base" : ""
              }`}
            >
              {project.description}
            </p>
          </div>

          <div>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technieken">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary"
                >
                  {t}
                </li>
              ))}
            </ul>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-primary">
              {external ? projectsSection.visit : projectsSection.case}
              <span className="sr-only">
                {" "}
                {project.name}
                {external ? ` ${projectsSection.newTab}` : ""}
              </span>
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </motion.a>
    </Reveal>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section id="projecten" className="relative py-28 md:py-40">
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow>{projectsSection.eyebrow}</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              className="mt-6 max-w-xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-gradient"
            >
              {projectsSection.title}
            </LineReveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
              {projectsSection.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard project={featured} index={0} featured />
          {rest.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i + 1} />
          ))}
        </div>

        {/* concept-redesigns: ongevraagd, duidelijk geen klantwerk */}
        <div className="mt-24 flex flex-col gap-4 border-t border-white/10 pt-14 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
              {conceptsSection.title}
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-text-secondary">{conceptsSection.intro}</p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {concepts.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
