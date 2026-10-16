import type { MetadataRoute } from "next";
import { cases, haarlem, privacy, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}${haarlem.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}${privacy.path}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...cases.map((c) => ({
      url: `${site.url}/werk/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
