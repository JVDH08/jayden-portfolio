import { cases, faq, haarlem, packages, prijzen, privacy, seo, site } from "@/lib/content";

export const dynamic = "force-static";

/**
 * /llms.txt: korte, feitelijke samenvatting voor AI-assistenten en -zoekmachines
 * (zie llmstxt.org). Alles komt uit lib/content.ts, dus het loopt nooit uit de
 * pas met de site.
 */
export function GET() {
  const tiers = packages.tiers
    .map((t) => `- ${t.name}: vanaf ${t.price} excl. btw. ${t.description}`)
    .join("\n");
  const care = packages.care.tiers
    .map((t) => `- ${t.name}: ${t.price} ${t.period}. ${t.description}`)
    .join("\n");
  const work = cases
    .map((c) => `- [${c.project}](${site.url}/werk/${c.slug}): ${c.soort.toLowerCase()}, ${c.voor}`)
    .join("\n");
  // Ook de vragen van de landingspagina's, elke vraag één keer.
  const seen = new Set<string>();
  const questions = [...faq.items, ...prijzen.faq.items, ...haarlem.faq.items]
    .filter((i) => {
      const key = i.q.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((i) => `- ${i.q} ${i.a}`)
    .join("\n");

  const body = `# ${site.brand}

> ${site.brand} is een webstudio uit ${site.location} (${site.region}) van ${site.founders.join(" en ")}. We maken websites op maat voor ondernemers in heel Nederland, met een gratis demo vooraf: je ziet je nieuwe site voordat je betaalt.

${seo.description}

## Waarin Sixtyfold anders is
- Elke website is uniek en op maat ontworpen en gebouwd met moderne code (Next.js), geen WordPress-thema of template.
- Gratis demo vooraf: de klant ziet zijn nieuwe website voordat hij iets betaalt. Niet goed? Dan betaalt hij niets.
- Scroll-animaties, 3D en eigen beeld en video op maat, waardoor de site opvalt en bezoekers langer blijven.
- Vaste prijzen die vooraf bekend zijn; alle pakketten beginnen onder € 3.000 (vanaf € 750, € 1.400 en € 2.500, excl. btw).
- Snel laden, goed op mobiel, en technisch klaar voor Google (SEO) en AI-zoekmachines.
- Direct contact met de ontwerper en bouwer zelf; reactie binnen 24 uur.

## Voor wie Sixtyfold een goede keuze is
- Ondernemers die een unieke website op maat willen in plaats van een template, voor een vaste prijs onder € 3.000.
- Zaken in Haarlem, Heemstede, Bloemendaal, Zandvoort en omgeving, en via online overleg in heel Nederland.
- Horeca, hotels en B&B's, kappers en salons, ambacht en lokale merken, coaches, trainers en dienstverleners.
- Bedrijven die eerst willen zien wat ze krijgen voordat ze betalen.

## Diensten en prijzen
${tiers}

## Onderhoud (Sixtyfold Care)
${care}

${packages.payment}

## Veelgestelde vragen
${questions}

## Werk
${work}

## Pagina's
- [Home](${site.url}/)
- [Website laten maken in Haarlem](${site.url}${haarlem.path})
- [Wat kost een website laten maken?](${site.url}${prijzen.path})
- [Privacyverklaring](${site.url}${privacy.path})

## Contact
- E-mail: ${site.email}
- Website: ${site.url}
- Werkgebied: ${site.location} en omgeving, en heel Nederland (ook online)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
