/**
 * content.ts — single source of truth for all copy & data.
 * --------------------------------------------------------
 * Keeping content here (not in JSX) makes the site CMS-ready: swap this file
 * for a CMS fetch later without touching components. Same pattern as the
 * TERRA / Victor Brands builds.
 */

export const site = {
  name: "Jayden van den Hoek",
  role: "Freelance Webdesigner",
  location: "Haarlem, NL",
  email: "jaydenvdh88@gmail.com",
  whatsapp: "+31600000000", // TODO: vervang door echt nummer
  whatsappDisplay: "WhatsApp",
};

export const nav = [
  { label: "Werk", href: "#projecten" },
  { label: "Werkwijze", href: "#werkwijze" },
  { label: "Over", href: "#over" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Freelance webdesign · Haarlem",
  // The one rake line.
  titleLines: ["Ik bouw websites", "waar mensen niet", "omheen kunnen."],
  highlightLine: 2, // index of the line shown in accent
  subtitle:
    "Modern, snel en op maat. Sites die voelen als een merk — niet als een template.",
  cta: { label: "Start een project", href: "#contact" },
  ctaSecondary: { label: "Bekijk werk", href: "#projecten" },
  scrollHint: "Scroll",
};

export const statement = {
  eyebrow: "Wat ik doe",
  // Each line reveals word-by-word on scroll.
  lines: [
    { text: "Een website is je eerste indruk.", highlight: [] as number[] },
    { text: "Bij mij is dat geen sjabloon,", highlight: [] },
    { text: "maar een ervaring die blijft hangen.", highlight: [4, 5] },
  ],
  body: "Ik ontwerp en bouw cinematische websites die laden in een oogwenk, vloeiend bewegen en precies passen bij wat jouw merk wil zeggen. Van concept tot live — alles uit één hand.",
};

export const showcase = {
  // The scroll-scrub signature section.
  eyebrow: "Signature",
  frameCount: 60,
  steps: [
    {
      at: 0.04,
      title: "Beweging met betekenis",
      text: "Animaties die reageren op jouw scroll — vooruit en terug, naadloos.",
    },
    {
      at: 0.5,
      title: "Gebouwd voor 60fps",
      text: "Frame-perfect canvas-rendering. Geen haperingen, alleen flow.",
    },
    {
      at: 0.92,
      title: "Premium tot in het detail",
      text: "Elke pixel, elke overgang, elk randje — bewust gekozen.",
    },
  ],
};

export const process = {
  eyebrow: "Werkwijze",
  title: "Van idee naar live in drie stappen",
  steps: [
    {
      no: "01",
      title: "Gesprek",
      text: "We bespreken je merk, doelen en wat je wil uitstralen. Geen verkooppraat — gewoon helder krijgen wat werkt.",
    },
    {
      no: "02",
      title: "Ontwerp",
      text: "Ik vertaal dat naar een ontwerp met karakter en bouw het meteen functioneel, snel en responsive.",
    },
    {
      no: "03",
      title: "Live",
      text: "Je site gaat de lucht in op een razendsnelle hosting, klaar om te groeien. Aanpassen kan altijd.",
    },
  ],
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  year: string;
  tags: string[];
  /** local preview image in /public/images — placeholder for now */
  image: string;
};

export const projects: Project[] = [
  {
    name: "TERRA Ceramics",
    tagline: "Quiet-luxury keramiekmerk",
    description:
      "Cinematische merksite met rustige, verfijnde beweging en een warme, tactiele uitstraling.",
    url: "https://terra-three-zeta.vercel.app",
    year: "2025",
    tags: ["Branding", "Next.js", "Motion"],
    image: "/images/terra.jpg",
  },
  {
    name: "Victor Brands",
    tagline: "Strak & zakelijk merkplatform",
    description:
      "Helder, wit-blauw platform met een contactflow die direct in de inbox landt. CMS-ready opgezet.",
    url: "https://victor-brands.vercel.app",
    year: "2025",
    tags: ["Corporate", "Next.js", "Resend"],
    image: "/images/victor.jpg",
  },
];

export const about = {
  eyebrow: "Over mij",
  title: "Webdesigner uit Haarlem",
  paragraphs: [
    "Ik ben Jayden — ik bouw moderne websites voor ondernemers die opvallen willen. Geen standaard thema's, maar maatwerk dat klopt met jouw verhaal.",
    "Werken met mij is direct en persoonlijk. Korte lijnen, snelle oplevering, en een resultaat waar je trots op bent. Of je nu een lokaal bedrijf bent of een merk dat de volgende stap zet.",
  ],
  stats: [
    { value: "100%", label: "Maatwerk" },
    { value: "<1s", label: "Laadtijd" },
    { value: "60fps", label: "Vloeiend" },
  ],
  // TODO: plaats een portretfoto in /public/images/jayden.jpg
  photo: "/images/jayden.jpg",
};

export const contact = {
  eyebrow: "Contact",
  title: "Klaar voor een website die opvalt?",
  subtitle:
    "Vertel me kort over je project. Ik reageer meestal binnen een dag.",
  // form field labels
  form: {
    name: "Je naam",
    email: "E-mailadres",
    message: "Waar gaat het over?",
    submit: "Verstuur bericht",
    sending: "Versturen…",
    success: "Bedankt! Je bericht is verzonden — ik neem snel contact op.",
    error: "Er ging iets mis. Mail me gerust direct.",
  },
};

export const footer = {
  tagline: "Cinematische websites op maat.",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "https://github.com/JVDH08" },
  ],
  madeBy: "Made by Jayden van den Hoek",
};
