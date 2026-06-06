/**
 * generate-previews.mjs
 * ---------------------
 * Renders PLACEHOLDER project preview images so the site builds & looks good
 * before real screenshots are added. Replace /public/images/*.jpg with real
 * captures of each project later.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "images");

const W = 1600;
const H = 1000;

function mock({ title, sub, bg, accent, light = false }) {
  const text = light ? "#16213a" : "#ededf2";
  const dim = light ? "rgba(22,33,58,0.55)" : "rgba(237,237,242,0.5)";
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      ${bg.map((c, i) => `<stop offset="${(i / (bg.length - 1)) * 100}%" stop-color="${c}"/>`).join("")}
    </linearGradient>
    <radialGradient id="acc" cx="80%" cy="15%" r="70%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#acc)"/>

  <!-- faux browser chrome -->
  <rect x="60" y="60" width="${W - 120}" height="64" rx="14" fill="${light ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)"}"/>
  <circle cx="100" cy="92" r="7" fill="${accent}" opacity="0.8"/>
  <circle cx="128" cy="92" r="7" fill="${dim}"/>
  <circle cx="156" cy="92" r="7" fill="${dim}"/>

  <!-- big title -->
  <text x="100" y="${H / 2 - 20}" font-family="Syne, sans-serif" font-size="120" font-weight="800" fill="${text}">${title}</text>
  <text x="106" y="${H / 2 + 60}" font-family="Inter, sans-serif" font-size="34" fill="${dim}">${sub}</text>

  <!-- faux UI blocks -->
  <rect x="100" y="${H - 240}" width="380" height="120" rx="18" fill="${light ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)"}"/>
  <rect x="500" y="${H - 240}" width="380" height="120" rx="18" fill="${light ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)"}"/>
  <rect x="900" y="${H - 240}" width="600" height="120" rx="18" fill="${accent}" opacity="0.25"/>
</svg>`;
}

const previews = [
  {
    file: "terra.jpg",
    title: "TERRA",
    sub: "Quiet-luxury ceramics",
    bg: ["#1a1410", "#0f0c0a"],
    accent: "#c8a27a",
  },
  {
    file: "victor.jpg",
    title: "VICTOR",
    sub: "Brands · strak &amp; zakelijk",
    bg: ["#eef3fb", "#dbe6f7"],
    accent: "#2f6bff",
    light: true,
  },
];

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const p of previews) {
    await sharp(Buffer.from(mock(p)))
      .jpeg({ quality: 86 })
      .toFile(join(OUT, p.file));
    console.log("wrote", p.file);
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
