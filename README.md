# Sixtyfold — studiosite

Studiosite van Sixtyfold (Jayden & Bodhi, Haarlem): webdesign op maat met
scroll-animaties, eigen beeld en een gratis demo vóór je betaalt. Donker,
cinematisch, met een scroll-gestuurde canvas-animatie als signature-moment.

Live: https://sixtyfold.nl

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `app/globals.css`)
- **Framer Motion** — UI-animaties, scroll-reveals, magnetic buttons, 3D-tilt, accordeon
- **Lenis** — smooth scrolling
- **GSAP + ScrollTrigger** — frame-sequence scrubbing op scrollpositie
- **Resend REST-API** — contactformulier (zonder SDK, zonder extra packages)

## Aan de slag

```bash
npm install
cp .env.example .env.local   # vul RESEND_API_KEY in (optioneel lokaal)
npm run dev                  # http://localhost:3000
npm run build && npm run start
npm run lint                 # typecheck (tsc --noEmit); ESLint is bewust niet geïnstalleerd
```

## Structuur

```
app/
  layout.tsx          # fonts (Inter Tight/Inter), metadata, JSON-LD, grain, cursor, smooth scroll
  page.tsx            # volgorde van de secties
  globals.css         # design tokens (@theme), utilities, focus, reduced motion
  opengraph-image.tsx # OG-beeld in de huisstijl
  icon.svg            # favicon
  sitemap.ts, robots.ts
  api/contact/route.ts  # POST → Resend (503 zonder sleutel → mailto-fallback)
components/
  providers/          # SmoothScrollProvider (Lenis + GSAP ticker)
  ui/                 # ScrollScrubSequence, MagneticButton, Reveal, WordReveal, LineReveal,
                      # AmbientField (lichtveld achter de hele pagina), Ticker, CountUp,
                      # Aurora, Eyebrow, CursorGlow, Icons
  sections/           # Navbar, Hero, Statement, Why, Showcase, Process, Projects,
                      # Packages, About, Faq, Contact, Footer
lib/
  content.ts          # ALLE teksten & data (één bron van waarheid)
  packageSelect.ts    # pakketkaart → contactformulier (event + ?pakket=)
  seo.ts              # indexeer-schakelaar (NOINDEX=1)
public/frames/        # frame-sequence voor de scroll-scrub (zie README-ASSETS.md)
public/images/projecten/  # projectbeelden
```

## Content aanpassen

Alle copy, prijzen, projecten en FAQ staan in **`lib/content.ts`**. Wat de klant
nog moet bevestigen of aanleveren staat in **`CONTENT-CHECK.md`**.

## Omgevingsvariabelen

| Variabele        | Doel                                                        |
| ---------------- | ----------------------------------------------------------- |
| `RESEND_API_KEY` | Verzenden van het contactformulier                          |
| `CONTACT_TO`     | Ontvanger (fallback: e-mail uit `lib/content.ts`)           |
| `CONTACT_FROM`   | Afzender (fallback: `Sixtyfold <onboarding@resend.dev>`)    |
| `NOINDEX`        | `1` = robots/metadata op noindex (voor preview-omgevingen)  |

## Toegankelijkheid & performance

- Semantische HTML, zichtbare focus, skip-link, labels bij alle velden, accordeon met `aria-expanded`.
- `prefers-reduced-motion` gerespecteerd door alle animaties (Lenis, scrub, reveals, cursor, accordeon).
- `next/font`, `next/image` met `sizes` en alt-teksten; canvas hertekent alleen bij frame-wissel; mobiel laadt één frame in plaats van de hele sequence.
