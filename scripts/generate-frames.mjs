/**
 * generate-frames.mjs
 * -------------------
 * Renders a seamless, loopable PLACEHOLDER frame sequence for the
 * <ScrollScrubSequence /> signature animation, so the site looks and works
 * great before real Higgsfield footage is dropped in.
 *
 * Output: /public/frames/frame_0001.webp ... frame_0060.webp  (1600x900)
 *
 * The motion: a rotating "core" — concentric tilted rings, a glowing orb,
 * and orbiting particles — over a deep, drifting gradient. Because every
 * value is a pure function of the frame index, scrubbing it forwards/back
 * (driven by scroll) looks perfectly continuous.
 *
 * Run:  npm run frames
 *
 * Replace these with real footage later — see README-ASSETS.md.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "frames");

const FRAMES = 90;
const W = 1920;
const H = 1080;
const CX = W / 2;
const CY = H / 2;

const TAU = Math.PI * 2;
const rad = (deg) => (deg * Math.PI) / 180;

/** Build one SVG frame. `t` goes 0 → 1 over the loop. */
function frameSVG(t) {
  const spin = t * 360; // full rotation across the loop → seamless
  const pulse = 0.5 + 0.5 * Math.sin(t * TAU); // 0..1 breathing

  // Orbiting particles
  const particles = Array.from({ length: 7 }, (_, k) => {
    const a = rad(spin * 1.4 + (360 / 7) * k);
    const orbit = 250 + 60 * Math.sin(t * TAU + k);
    const px = CX + Math.cos(a) * orbit * 1.35;
    const py = CY + Math.sin(a) * orbit * 0.55;
    const r = 2 + 2.5 * (0.5 + 0.5 * Math.sin(t * TAU * 2 + k));
    const op = 0.35 + 0.45 * (0.5 + 0.5 * Math.cos(a));
    return `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(
      1
    )}" r="${r.toFixed(1)}" fill="#9a8bff" opacity="${op.toFixed(2)}"/>`;
  }).join("");

  // Three tilted, rotating rings
  const ring = (rx, ry, rot, op, w) =>
    `<ellipse cx="${CX}" cy="${CY}" rx="${rx}" ry="${ry}" fill="none" stroke="url(#ring)" stroke-width="${w}" opacity="${op}" transform="rotate(${rot} ${CX} ${CY})"/>`;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#11111f"/>
      <stop offset="55%" stop-color="#0a0a12"/>
      <stop offset="100%" stop-color="#08080c"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#6e5bff" stop-opacity="${(
        0.55 *
        (0.6 + 0.4 * pulse)
      ).toFixed(2)}"/>
      <stop offset="45%" stop-color="#6e5bff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#6e5bff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb" cx="40%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#d9d4ff"/>
      <stop offset="35%" stop-color="#7a68ff"/>
      <stop offset="80%" stop-color="#2d2470"/>
      <stop offset="100%" stop-color="#15123a"/>
    </radialGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#9a8bff"/>
      <stop offset="50%" stop-color="#6e5bff"/>
      <stop offset="100%" stop-color="#3dd6f5"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- ambient glow, breathing -->
  <circle cx="${CX}" cy="${CY}" r="${520 + 40 * pulse}" fill="url(#glow)"/>

  <!-- rotating rings -->
  <g>
    ${ring(360, 150, spin, 0.55, 1.5)}
    ${ring(300, 120, -spin * 1.3 + 30, 0.4, 1.2)}
    ${ring(420, 175, spin * 0.7 + 60, 0.28, 1)}
  </g>

  <!-- core orb -->
  <circle cx="${CX}" cy="${CY}" r="${88 + 6 * pulse}" fill="url(#orb)"/>
  <circle cx="${CX}" cy="${CY}" r="${88 + 6 * pulse}" fill="none" stroke="#9a8bff" stroke-width="1" opacity="0.5"/>

  <!-- orbiting particles -->
  ${particles}

  <!-- subtle vignette -->
  <rect width="${W}" height="${H}" fill="url(#bg)" opacity="0.18"/>
</svg>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Rendering ${FRAMES} frames → ${OUT_DIR}`);

  for (let i = 0; i < FRAMES; i++) {
    const t = i / FRAMES; // 0 .. <1  (loops cleanly back to 0)
    const svg = frameSVG(t);
    const n = String(i + 1).padStart(4, "0");
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(join(OUT_DIR, `frame_${n}.webp`));
    process.stdout.write(`\r  frame_${n}.webp`);
  }
  console.log(`\nDone. ${FRAMES} frames written.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
