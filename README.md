# Jayden van den Hoek — Portfolio

Cinematische, premium portfoliowebsite voor freelance webdesigner Jayden van den Hoek (Haarlem). Donker, futuristisch, met een scroll-gestuurde canvas-animatie als signature-moment.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `app/globals.css`)
- **Framer Motion** — UI-animaties, scroll-reveals, magnetic buttons, 3D-tilt
- **Lenis** — smooth scrolling (de premium feel)
- **GSAP + ScrollTrigger** — frame-sequence scrubbing op scrollpositie

## Aan de slag

```bash
npm install
npm run dev      # http://localhost:3000
```

Productie:

```bash
npm run build
npm run start
```

## Scripts

| Script             | Doel                                                            |
| ------------------ | --------------------------------------------------------------- |
| `npm run dev`      | Dev-server                                                      |
| `npm run build`    | Productie-build                                                 |
| `npm run frames`   | (Her)genereert de placeholder frame-sequence in `/public/frames` |
| `npm run previews` | (Her)genereert placeholder project-previews in `/public/images` |

## Structuur

```
app/
  layout.tsx        # fonts (Syne/Inter), grain, cursor, smooth-scroll provider, metadata
  globals.css       # design tokens (@theme), utilities, reduced-motion
  page.tsx          # assembleert alle secties
components/
  providers/        # SmoothScrollProvider (Lenis + GSAP ticker)
  ui/               # ScrollScrubSequence, MagneticButton, Reveal, WordReveal,
                    # Aurora, Eyebrow, CursorGlow  (herbruikbaar)
  sections/         # Navbar, Hero, Statement, Showcase, Process, Projects,
                    # About, Contact, Footer
lib/
  content.ts        # ALLE teksten & data (CMS-ready — één bron van waarheid)
scripts/            # placeholder-generators (sharp)
public/frames/      # frame-sequence voor de scroll-scrub (zie README-ASSETS.md)
public/images/      # project-previews & portret (placeholders)
```

## Content aanpassen

Alle copy en projectdata staan in **`lib/content.ts`**. Een nieuw project toevoegen?
Voeg een object toe aan de `projects`-array — de grid en kaarten passen zich
automatisch aan. Dit patroon maakt de site CMS-ready (vervang `content.ts`
later door een CMS-fetch).

## Belangrijkste features

- **ScrollScrubSequence** — frame-sequence op `<canvas>`, gekoppeld aan scroll via
  GSAP ScrollTrigger (`scrub`). Vooruit scrollen speelt vooruit, terug speelt
  terug. Alle frames worden gepreload met een progress-loader.
- **Mobiele fallback** — op mobiel geen pin/scrub maar een lichte auto-loop;
  zware effecten degraderen netjes.
- **`prefers-reduced-motion`** — gerespecteerd door alle animaties (Lenis,
  scrub, reveals, cursor).
- **Custom cursor-glow**, magnetic CTA's, glassmorphism, aurora-gradients, grain.

## Toegankelijkheid & performance

- Semantische HTML, alt-teksten, zichtbare focus-states, `sr-only` labels.
- `next/font` preload (Syne + Inter), `next/image` voor previews.
- Doel: vloeiend 60fps; canvas hertekent alleen bij frame-wissel.

## Nog te doen door Jayden

1. **Echte frames** plaatsen in `/public/frames/` — zie **README-ASSETS.md**.
2. **Projectscreenshots** vervangen in `/public/images/` (`terra.jpg`, `victor.jpg`).
3. **Portretfoto** toevoegen (`/public/images/jayden.jpg`) en in `About.tsx`
   de placeholder vervangen door `<Image src={about.photo} … />`.
4. **WhatsApp-nummer** invullen in `lib/content.ts` (`site.whatsapp`).
5. **Contact-backend** koppelen — zie de `TODO` in `components/sections/Contact.tsx`
   (bv. een Resend API-route op `/api/contact`).
6. **Deploy** naar Vercel + custom domein koppelen.

---

Made by Jayden van den Hoek.
