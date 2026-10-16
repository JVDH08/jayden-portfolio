import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import CaseStudy from "@/components/sections/CaseStudy";
import Footer from "@/components/sections/Footer";
import AmbientField from "@/components/ui/AmbientField";
import { cases, projects, seo, site } from "@/lib/content";
import JsonLd from "@/lib/jsonld";

const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: seo.ogAlt };

const findCase = (slug: string) => cases.find((c) => c.slug === slug);

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

// Alleen de cases uit lib/content.ts; elke andere /werk/<x> is een 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = findCase(slug);
  if (!data) return {};
  const path = `/werk/${data.slug}`;
  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: { canonical: path },
    // openGraph/twitter replace the layout's objects entirely, so all fields are set here.
    openGraph: {
      type: "article",
      locale: "nl_NL",
      url: `${site.url}${path}`,
      siteName: site.brand,
      title: data.seo.title,
      description: data.seo.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.description,
      images: [ogImage],
    },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = cases.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const data = cases[index];
  const next = cases[(index + 1) % cases.length];
  const project = projects.find((p) => p.name === data.project);
  const url = `${site.url}/werk/${data.slug}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#case`,
      name: data.project,
      headline: data.seo.title,
      description: data.seo.description,
      url,
      inLanguage: "nl-NL",
      creator: { "@id": `${site.url}/#organization` },
      image: data.images.map((img) => `${site.url}${img.src}`),
      keywords: data.techniek.join(", "),
      ...(project?.year ? { dateCreated: project.year } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.brand, item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Werk", item: `${site.url}/#projecten` },
        { "@type": "ListItem", position: 3, name: data.project, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Navbar base="/" />
      <main id="main" className="relative isolate">
        <AmbientField />
        <CaseStudy
          data={data}
          project={project}
          next={{ slug: next.slug, project: next.project, soort: next.soort }}
        />
      </main>
      <Footer base="/" />
    </>
  );
}
