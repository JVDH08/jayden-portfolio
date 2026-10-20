# CONTENT-CHECK – wat Jayden/Bodhi nog moet bevestigen of aanleveren

Alle teksten staan in `lib/content.ts`. Dit is de lijst van zaken die de site nu
met voorbeeld- of voorlopige inhoud toont, en wat er nog ingesteld moet worden.

## Instellen (techniek)
- [ ] **Resend-sleutel**: `RESEND_API_KEY` in Vercel (en lokaal in `.env.local`, zie `.env.example`). Zonder sleutel toont het formulier een nette mailto-fallback.
- [ ] **Afzender**: zodra sixtyfold.nl bij Resend geverifieerd is: `CONTACT_FROM="Sixtyfold <hallo@sixtyfold.nl>"`. Tot die tijd gaat het via `onboarding@resend.dev`.
- [ ] **Ontvanger**: `CONTACT_TO` (nu fallback `jaydenvdh88@gmail.com`).
- [ ] **E-mailadres op de site**: nu `jaydenvdh88@gmail.com`, later `info@sixtyfold.nl` → `site.email` in `lib/content.ts`.
- [ ] **Indexeren**: staat aan (robots + sitemap). Zet `NOINDEX=1` op een preview-omgeving als je dat niet wilt. Vercel-previews krijgen sowieso `noindex`.
- [ ] **Domein**: sixtyfold.nl koppelen in Vercel; `site.url` staat al op `https://sixtyfold.nl`.
- [ ] **Google Search Console**: sitemap `https://sixtyfold.nl/sitemap.xml` indienen na livegang.

## Aanleveren (beeld)
- [ ] **Portretfoto**: voorlopig niet. Over Sixtyfold heeft een studiokaart zonder foto en noemt geen aantal makers ("je praat direct met wie je site ontwerpt én bouwt"), dus dit hoeft niet aangepast als Bodhi later instapt.
- [ ] **NOORDVAART-beeld**: de projectmap bevat alleen placeholders met ingebrande tekst. De site gebruikt nu het enige echte beeld uit de NOORDVAART-repo (jacht op de waterlijn, 1280×720, `waterlijn.webp`). Een scherper beeld of een screenshot van de live site is welkom.
- [ ] **VAEKST-beeld**: `hero.jpg` is 1280×720; voor het grote uitgelichte kaartje is een 1920-brede versie scherper op retina-schermen.

## Bevestigen (tekst en cijfers)
- [ ] **Prijzen** en wat erin zit: Start € 750 · Plus € 1.400 · Signature € 2.500 · Care € 24,99 p/m · Care Plus € 49,99 p/m (allemaal "vanaf", excl. btw).
- [ ] **Doorlooptijden**: Start ± 1 week, Plus ± 2–3 weken, Signature in overleg.
- [ ] **Correctierondes**: 1 / 2 / 3.
- [ ] **Betaling in twee delen**: helft bij akkoord op de demo, rest bij livegang.
- [ ] **Reactietermijn**: "binnen 24 uur" (hero, contact, FAQ).
- [ ] **Kennismaking**: gratis, 30 minuten, bij jou of online.
- [ ] **Sixtyfold Care**: Care € 24,99 (hosting + SSL, 24/7 bewaking, maandrapport, updates/back-ups) en Care Plus € 49,99 (alles uit Care + tot 1 uur aanpassingen p/m, reactie binnen 1 werkdag, kwartaalcheck). Maandelijks automatisch afgeschreven (Mollie), maandelijks opzegbaar.
- [ ] **Oprichter** in de structured data (`site.founders`): nu alleen Jayden van den Hoek.
- [ ] **Betekenis van de naam** (Over ons): "zestigvoudig", 60 fps, zestig keer beter.
- [ ] **Projectomschrijvingen en jaartallen** (VAEKST 2026, NOORDVAART 2026, TERRA 2025, Victor Brands 2025) en de live-links.
- [ ] **Stats** in Over ons: 100% maatwerk · <1s laadtijd · 60 fps.
- [ ] **Vergelijkingsstrook** (Waarom): "Template-bureau vs Sixtyfold", vier rijen. Weglaten kan door `why.compare` niet te renderen.
- [ ] **Lopende regel** tussen Statement en Waarom: Maatwerk · 60 fps · Eigen beeld · Gratis demo · Snel en vindbaar · Haarlem (`ticker.words`; decoratief, loopt mee met de scroll).

## Juridisch
- [ ] **KvK- en btw-nummer** in de footer zodra de inschrijving rond is (`footer` in `lib/content.ts` + `components/sections/Footer.tsx`).
- [ ] **Privacyverklaring**: het formulier verwerkt naam, e-mail, bedrijf en bericht via Resend. Een korte privacypagina is aan te raden vóór livegang.
