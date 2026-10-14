# MASTERPROMPT – Sixtyfold (sixtyfold.nl), studiosite van Jayden & Bodhi

> Geschreven door Claude op verzoek van Jayden (14 okt 2026). Dit bestand gaat vóór de algemene bouwopdracht van de websitefabriek: waar die iets anders zegt (bijv. `content/site.ts`, `components/Beeld.tsx`, `BEELDPLAN.md`, Higgsfield), volg je DIT bestand.

## 0. De belangrijkste regel: de look blijft
Jayden vindt de huidige site heel mooi. **Dit is een uitbreiding en aanscherping, geen herontwerp.**
- Kleuren (`app/globals.css`: bg `#08080c`, surface, accent `#6e5bff` / `#9a8bff`, glow), fonts (Syne display + Inter), grain, Aurora, CursorGlow, MagneticButton, Reveal/WordReveal, Lenis-smooth-scroll en de ScrollScrubSequence-signature blijven precies zoals ze zijn.
- Nieuwe secties bouw je **in dezelfde visuele taal** met de bestaande ui-componenten (`components/ui/*`), dezelfde spacing (`container-x`, `py-28 md:py-40`), dezelfde typografie-schaal en dezelfde subtiele motion. Iemand moet niet kunnen zien welke secties nieuw zijn.
- Ook in de verbeterrondes: alleen verbeteren binnen deze look (uitlijning, ritme, details, mobiel, tekst). Geen nieuwe kleuren, geen nieuwe fonts, geen andere stijl.
- Lees eerst `AGENTS.md`: dit is Next.js 16; check bij twijfel `node_modules/next/dist/docs/`.
- Alle teksten in **`lib/content.ts`** (niet `content/site.ts`). Componenten lezen daaruit.

## 1. In het kort
- **Wie:** Sixtyfold, de webstudio van Jayden en Bodhi uit Haarlem (voorheen "Jayden & Bodhi").
- **Doel van de site:** lokale ondernemers en merken laten zien dat Sixtyfold op een ander niveau bouwt dan template-bureaus, en ze een **gratis demo** laten aanvragen.
- **De ene actie:** "Vraag je gratis demo aan" (naar het contactformulier).
- **Domein:** https://sixtyfold.nl (metadataBase, canonical, OG, sitemap).

## 2. Merk en verhaal
- **Naam:** Sixtyfold. Wordmark in de header/footer: `Sixtyfold` (Syne, zoals het huidige wordmark), eventueel met een klein `60`-teken of `/60` als detail; geen nieuw logo-ontwerp verzinnen dat de stijl breekt.
- **Betekenis (gebruik in Over ons, 2–3 zinnen):** *sixtyfold* = zestigvoudig. Een knipoog naar 60 frames per seconde: alles beweegt vloeiend. En naar wat een goede site oplevert: niet een beetje beter, maar zestig keer.
- **Toon:** direct, zelfverzekerd, Nederlands, je-vorm, geen jargon zonder uitleg, geen superlatieven zonder bewijs. Kort en concreet. Geen emoji.
- **Doelgroep:** ondernemers in Haarlem en omgeving (horeca, salons, ambacht, hotels, dienstverleners) en merken die willen opvallen; ze zoeken op de telefoon en vergelijken met bureaus als WordPress/Elementor-bouwers.

## 3. Secties (volgorde) en inhoud
Pas `app/page.tsx` aan naar deze volgorde. Navigatie: **Werk · Aanpak · Pakketten · Over · Contact** + knop **Gratis demo**.

### 3.1 Hero (bestaande component, nieuwe tekst)
- Eyebrow: `Sixtyfold · Webstudio uit Haarlem`
- Titel (3 regels, zelfde animatie, regel 2 in accent): `Websites die` / `niemand wegklikt.` / `Op maat. In beweging.` (Mag je verbeteren als het beter leest, maar houd het kort en krachtig.)
- Subtitel: `Maatwerk met scroll-animaties, eigen beeld en een site die laadt in een oogwenk. En het mooiste: je ziet je nieuwe site vóór je betaalt.`
- CTA: `Vraag je gratis demo aan` → `#contact` · secundair: `Bekijk ons werk` → `#projecten`
- Kleine badge/regel onder de CTA's: `Gratis demo · Vaste prijzen · Reactie binnen 24 uur`

### 3.2 Statement (bestaand, tekst bijwerken)
Regels: `Een website is je eerste indruk.` / `Bij ons geen sjabloon,` / `maar een ervaring die blijft hangen.` (highlight zoals nu). Body: korte alinea over maatwerk, snelheid en beweging, één uit-één-hand.

### 3.3 NIEUW – Waarom Sixtyfold (id `waarom`)
Zes punten in een grid (2 kolommen desktop, 1 mobiel), elk met korte titel + 1–2 zinnen, rustige Reveal-stagger. Dit zijn Jaydens sterke punten tegenover template-bureaus:
1. **Maatwerk, geen template.** Geen WordPress- of Elementor-thema dat op duizend andere sites lijkt: elk ontwerp begint bij jouw zaak.
2. **Beweging op 60 fps.** Scroll-animaties die vloeiend en snel zijn, ook op je telefoon. Dat is waar onze naam vandaan komt.
3. **Eigen beeld en video.** Geen stockfoto's: we maken beeld en video op maat die bij jouw sfeer passen.
4. **Je ziet je site vóór je betaalt.** Na een kort gesprek bouwen we een demo van jóuw site. Pas als je hem goed vindt, gaan we verder.
5. **Snel en vindbaar.** Laadt in een oogwenk, scoort hoog in Google Lighthouse en is technisch klaar voor Google.
6. **Ook ná de livegang.** We houden je site in de gaten (online, SSL, snelheid) en je krijgt elke maand een kort rapport.
Optioneel als het mooi uitpakt: een compacte vergelijkingsstrook "Template-bureau vs Sixtyfold" (3–4 rijen) in dezelfde stijl. Noem géén concurrenten bij naam.

### 3.4 Showcase (bestaand, ongewijzigd)
De scroll-scrub signature blijft. Teksten mogen licht aangescherpt.

### 3.5 Aanpak (bestaande Process-component, 4 stappen; id `werkwijze` blijft werken als anker, nav-label "Aanpak")
Titel: `Van eerste gesprek tot live, zonder verrassingen`
1. **Kennismaking**: gratis, 30 minuten, bij jou of online. We vragen naar je zaak, je klanten en wat je wilt uitstralen.
2. **Gratis demo**: binnen een paar dagen zie je een eerste versie van jóuw site. Niet goed? Dan betaal je niets.
3. **Bouwen en verfijnen**: we maken hem af, met correctierondes tot hij klopt. Teksten, beeld, animaties, SEO.
4. **Live en zorg**: we koppelen je domein, zetten hem live en houden hem daarna in de gaten.
(De nummering is hier terecht: het is een echte volgorde.)

### 3.6 Werk (Projects, id `projecten`) – vier projecten
Gebruik de echte beelden in `public/images/projecten/<project>/` (bekijk ze met Read en kies per project het sterkste beeld; uitsnede met `object-cover`/`object-position`; `next/image` met `sizes` en alt). De oude placeholders `public/images/terra.jpg` en `victor.jpg` niet meer gebruiken. Lees voor beschrijvingen gerust de projecten zelf (README/DESIGN.md in de referentiemappen).
1. **VAEKST Hospitality**: premium hospitality-opleider. Cinematische site met hero-video, gouden accenten, gepinde scroll-scènes en 3D-detail. Tags: Hospitality · Next.js · GSAP · 3D. Link: https://vaekst.vercel.app · Jaar 2026.
2. **NOORDVAART**: donkere, filmische webshop voor luxe jachten (conceptproject). Tags: E-commerce · Cinematic · Motion. Link: https://noordvaart.vercel.app · 2026.
3. **TERRA Ceramics**: quiet-luxury keramiekmerk, rustige en tactiele beweging. Tags: Branding · Next.js · Motion. Link: https://terra-three-zeta.vercel.app · 2025.
4. **Victor Brands**: strak zakelijk merkplatform, live op eigen domein met contactflow naar de inbox. Tags: Corporate · Next.js · Resend. Link: https://victorbrands.nl · 2025.
Volgorde zoals hierboven (sterkste eerst). Layout: bestaande grid; met 4 projecten mag één uitgelicht groot (VAEKST) en drie kleiner, of 2×2. Links openen in een nieuw tabblad.

### 3.7 NIEUW – Pakketten (id `pakketten`)
Titel: `Vaste prijzen. Geen verrassingen.` · Intro: `Elk pakket begint met een gratis demo. Prijzen zijn vanaf-prijzen, excl. btw.`
Drie kaarten (op mobiel onder elkaar, middelste "Meest gekozen" accent), daaronder een brede kaart voor onderhoud:
- **Start, vanaf € 750**: Een strakke onepager waarmee je snel en professioneel online staat. ✓ onepager met eigen ontwerp ✓ contactformulier ✓ basis-SEO ✓ koppeling van je domein ✓ 1 correctieronde ✓ live in ± 1 week
- **Plus, vanaf € 1.400** (Meest gekozen): Een site die opvalt: eigen ontwerp met scroll-animaties, tot 5 pagina's, en zelf teksten aanpassen. ✓ tot 5 pagina's ✓ scroll-animaties op maat ✓ zelf aanpassen via CMS ✓ contactformulier ✓ SEO + Google Search Console ✓ 2 correctierondes ✓ live in ± 2–3 weken
- **Signature, vanaf € 2.500**: Maatwerk voor een merk dat een ervaring wil. ✓ ontwerp en opbouw op maat ✓ filmische scroll of 3D ✓ beeld en video op maat ✓ CMS ✓ uitgebreide SEO ✓ 3 correctierondes ✓ planning in overleg
- **Sixtyfold Care** (twee onderhoudspakketten, maandelijks automatisch afgeschreven, maandelijks opzegbaar):
  - **Care, € 24,99 per maand**: hosting en SSL, 24/7 bewaking (je hoort het van ons als er iets mis is), elke maand een kort rapport, updates en back-ups.
  - **Care Plus, € 49,99 per maand**: alles uit Care, plus tot 1 uur aanpassingen per maand (teksten, foto's, openingstijden), voorrang met reactie binnen 1 werkdag, elk kwartaal een check op snelheid en vindbaarheid.
  - Ongebruikte uren schuiven niet door; grotere wijzigingen krijgen een losse prijs.
Onder de kaarten één regel: `Betalen in twee delen: de helft bij akkoord op de demo, de rest bij livegang.`
Knoppen op elke kaart: `Vraag een demo aan` → `#contact` (en zet het pakket alvast in het formulier, via `?pakket=` of state).
Gebruik de vinkjes als nette iconen (geen emoji ✓-tekens), consistent uitgelijnd; gelijke kaarthoogtes.

### 3.8 Over ons (bestaand About, tekst bijwerken)
Titel: `Twee makers uit Haarlem`. Twee alinea's: wie Jayden en Bodhi zijn (jong, perfectionistisch, korte lijnen, gaan tot in het detail) + de betekenis van de naam Sixtyfold (zie §2). Team: Jayden (Design & Development), Bodhi (Design & Strategie). Portretfoto's bestaan nog niet: gebruik de bestaande initialen-weergave, netjes. Stats mogen blijven (`100% maatwerk`, `<1s laadtijd`, `60 fps`).

### 3.9 NIEUW – Veelgestelde vragen (id `faq`)
Accordeon (toegankelijk: `<details>/<summary>` of buttons met aria-expanded), 6 vragen, rustige animatie:
1. *Wat kost een website?* Vanaf € 750 voor een onepager, € 1.400 voor een site met meerdere pagina's en animaties, vanaf € 2.500 voor volledig maatwerk. Na de demo krijg je een vaste prijs.
2. *Moet ik betalen voor de demo?* Nee. Vind je de demo niet goed, dan stopt het daar en betaal je niets.
3. *Hoe snel staat mijn site online?* Een onepager meestal binnen een week, grotere sites in twee tot drie weken.
4. *Kan ik zelf teksten aanpassen?* Ja, vanaf Plus krijg je een eenvoudig CMS.
5. *Regelen jullie domein en hosting?* Ja. We koppelen je domein en hosten je site snel en veilig; met Sixtyfold Care hoef je er niet meer naar om te kijken.
6. *Is de site van mij?* Ja. Na oplevering is de site van jou, inclusief alle teksten en beelden.

### 3.10 Contact (bestaand, echte verzending)
Titel: `Benieuwd hoe jouw site eruit kan zien?` · Sub: `Vertel kort over je zaak. Binnen 24 uur hoor je van ons, en daarna maken we gratis een demo.`
Velden: naam, e-mail, **bedrijf**, **huidige website (optioneel)**, **pakket (select: Start / Plus / Signature / Weet ik nog niet)**, bericht. Validatie zoals nu.
- Maak `app/api/contact/route.ts` (POST, JSON): stuurt via de **Resend REST-API** (`fetch("https://api.resend.com/emails")`, env `RESEND_API_KEY`, `CONTACT_TO` met fallback `jaydenvdh88@gmail.com`, from `Sixtyfold <onboarding@resend.dev>` tenzij env `CONTACT_FROM`). Zonder sleutel: antwoord 503 → het formulier toont dan nette fallback: "Mail ons direct" met mailto. Honeypot-veld tegen spam, simpele limiet op lengte. Geen nieuwe packages.
- **Geen WhatsApp-knop en geen telefoonnummer** (Jayden wil dat niet). Haal `whatsapp`-velden en verwijzingen weg.
- E-mail op de site: `jaydenvdh88@gmail.com` (later info@sixtyfold.nl).

### 3.11 Footer
Wordmark Sixtyfold, tagline `Websites op maat uit Haarlem.`, links naar secties, e-mail, GitHub. Socials met `href="#"` weghalen (geen dode links). `© 2026 Sixtyfold · Haarlem`.

## 4. SEO en techniek
- `app/layout.tsx`: `metadataBase: new URL("https://sixtyfold.nl")`, title `Sixtyfold · Websites op maat uit Haarlem`, description (± 150 tekens) met webdesign Haarlem, maatwerk, scroll-animaties, gratis demo. `lang="nl"`. OpenGraph + Twitter.
- `app/opengraph-image.tsx` (ImageResponse) in de huisstijl: donker, accentgloed, "Sixtyfold" + "Websites op maat uit Haarlem".
- `app/icon.svg`: simpel, passend (bijv. "60" of "S" in accent op donker).
- `app/sitemap.ts` en `app/robots.ts` (indexeren toegestaan, sitemap `https://sixtyfold.nl/sitemap.xml`).
- JSON-LD `ProfessionalService` in de layout: name Sixtyfold, url, areaServed Haarlem/Noord-Holland, email, priceRange "€€", geen verzonnen adres of reviews.
- Prestatie: Lighthouse ≥ 90 mobiel; afbeeldingen via `next/image` met `sizes`; zware effecten pas na idle; reduced motion respecteren (bestaat al).
- Toegankelijkheid: zichtbare focus, alt-teksten, contrast AA, accordeon en formulier met labels.
- `npm run build` moet slagen. Er is geen `lint`-script in dit project: dat is geen fout; typecheck via de build.

## 5. Niet doen
- Geen nieuwe kleuren, fonts of stijl; geen glassmorphism-kaarten die nergens anders op de site zitten.
- Geen verzonnen reviews, klantlogo's, cijfers ("50+ klanten") of awards.
- Geen WhatsApp, geen telefoonnummer, geen `href="#"`.
- Geen nieuwe npm-packages.
- Geen "Jayden & Bodhi" meer als merknaam (wel als de twee makers in Over ons).
- Geen lange lappen tekst: maximaal 2–3 zinnen per alinea.

## 6. Kwaliteitslat (controleer je screenshots hierop)
1. De site ziet er nog precies uit als de oude in kleur, type en sfeer; nieuwe secties vallen niet uit de toon.
2. Hero: de belofte en "gratis demo" zijn binnen 3 seconden duidelijk, CTA boven de vouw op 390 breed.
3. Elk project toont een echt, scherp beeld (geen placeholder), goed uitgesneden op desktop en mobiel.
4. Pakketkaarten: gelijke hoogte, prijzen in één lijn, vinkjes uitgelijnd; "Meest gekozen" valt op maar schreeuwt niet.
5. Geen enkele dode link of `#`; alle ankers in de nav werken; nav werkt op mobiel.
6. FAQ opent en sluit soepel, ook met toetsenbord.
7. Formulier: velden, foutmeldingen en succes/fallback-staat zien er verzorgd uit.
8. Geen horizontaal scrollen op 320–430 px; tekst nergens afgekapt.
9. Ritme: secties wisselen genoeg af (niet drie keer dezelfde kaartengrid achter elkaar).
10. Teksten lezen natuurlijk Nederlands, kort, zonder jargon en zonder spelfouten.
11. Metadata, OG-beeld, favicon en JSON-LD staan goed; build slaagt.
12. Scroll-scrub en animaties lopen vloeiend; niets "flitst" of springt bij laden.

## 7. Eindig met
Een samenvatting (max. 8 regels): wat er nieuw is, wat afwijkt en waarom, en wat Jayden nog moet aanleveren of instellen (Resend-sleutel, portretfoto's, info@sixtyfold.nl, KvK/btw-vermelding).
