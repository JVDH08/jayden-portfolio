import { cases, faq, haarlem, packages, privacy, seo, site } from "@/lib/content";

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
  const questions = faq.items.map((i) => `- ${i.q} ${i.a}`).join("\n");

  const body = `# ${site.brand}

> ${site.brand} is een webstudio uit ${site.location} (${site.region}) van ${site.founders.join(" en ")}. We maken websites op maat voor ondernemers in heel Nederland, met een gratis demo vooraf: je ziet je nieuwe site voordat je betaalt.

${seo.description}

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
