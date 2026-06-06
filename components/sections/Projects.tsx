"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { projects, type Project } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Reveal delay={index * 0.1}>
      <motion.a
        ref={ref}
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        className="group relative block overflow-hidden rounded-[1.75rem] glass [transform-style:preserve-3d]"
      >
        {/* preview */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={`Preview van ${project.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />

          {/* year chip */}
          <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs text-text-primary backdrop-blur-md">
            {project.year}
          </span>
        </div>

        {/* body */}
        <div className="relative p-7" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-text-primary">
                {project.name}
              </h3>
              <p className="mt-1 text-sm text-accent-soft">{project.tagline}</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-accent group-hover:text-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5 11L11 5M11 5H6M11 5V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-primary">
            Bekijk live
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </motion.a>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projecten" className="relative py-28 md:py-40">
      {/* soft ambient */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
      />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Geselecteerd werk</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-gradient">
                Projecten die voor zich spreken
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
              Een greep uit recent werk. Elk merk een eigen wereld, elke site op
              maat gebouwd.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
