import type { SVGProps } from "react";
import type { WhyIcon as WhyIconName } from "@/lib/content";

type IconProps = SVGProps<SVGSVGElement>;

/* Shared stroke style: 1.5px line icons, inherit colour from the parent. */
const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...line} strokeWidth={1.8} {...props}>
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export function CrossIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...line} strokeWidth={1.6} {...props}>
      <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...line} strokeWidth={1.6} {...props}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...line} {...props}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...line} {...props}>
      <path d="M5 11L11 5M11 5H6M11 5V10" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...line} {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...line} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </svg>
  );
}

/* ---- "Waarom Sixtyfold" icons ---- */

const whyPaths: Record<WhyIconName, React.ReactNode> = {
  custom: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  motion: <path d="M3 12h3l2.5-6 3.5 12 3-9 2 3h4" />,
  camera: (
    <>
      <path d="M4 8h3l1.5-2.5h7L17 8h3v11H4V8z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

export function WhyIcon({ name, ...props }: IconProps & { name: WhyIconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...line} {...props}>
      {whyPaths[name]}
    </svg>
  );
}

/* ---- "Aanpak" step icons (by step index) ---- */

const processPaths: React.ReactNode[] = [
  // Kennismaking
  <path
    key="chat"
    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
  />,
  // Gratis demo
  <g key="demo">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </g>,
  // Bouwen en verfijnen
  <path
    key="build"
    d="M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z M2 2l7.586 7.586 M11 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
  />,
  // Live en zorg
  <path
    key="live"
    d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0 M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
  />,
];

export function ProcessIcon({ index, ...props }: IconProps & { index: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...line} {...props}>
      {processPaths[index % processPaths.length]}
    </svg>
  );
}
