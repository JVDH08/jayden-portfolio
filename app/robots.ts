import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { ALLOW_INDEXING } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ALLOW_INDEXING
      ? { userAgent: "*", allow: "/", disallow: ["/api/"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
