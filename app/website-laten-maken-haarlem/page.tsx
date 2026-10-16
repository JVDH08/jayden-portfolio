import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import LocalIntro from "@/components/sections/LocalIntro";
import Why from "@/components/sections/Why";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import Packages from "@/components/sections/Packages";
import About from "@/components/sections/About";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AmbientField from "@/components/ui/AmbientField";
import { haarlem, packages, seo, site } from "@/lib/content";
import JsonLd, { faqSchema } from "@/lib/jsonld";

const url = `${site.url}${haarlem.path}`;

const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: seo.ogAlt };

export const metadata: Metadata = {
  title: haarlem.seo.title,
  description: haarlem.seo.description,
  alternates: { canonical: haarlem.path },
  // openGraph/twitter replace the layout's objects entirely, so all fields are set here.
  // The root opengraph-image route is reused explicitly (file images don't cascade here).
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url,
    siteName: site.brand,
    title: haarlem.seo.title,
    description: haarlem.seo.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: haarlem.seo.title,
    description: haarlem.seo.description,
    images: [ogImage],
  },
};

const toPrice = (p: string) => p.replace(/[^\d,]/g, "").replace(",", ".");

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Website laten maken in Haarlem",
    serviceType: "Webdesign en websites laten maken",
    url,
    description: haarlem.seo.description,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: haarlem.intro.areas.map((name) => ({ "@type": "City", name })),
    offers: packages.tiers.map((tier) => ({
      "@type": "Offer",
      name: `Website ${tier.name}`,
      description: tier.description,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: toPrice(tier.price),
        minPrice: toPrice(tier.price),
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.brand, item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: haarlem.seo.breadcrumb, item: url },
    ],
  },
  faqSchema(url, haarlem.faq.items),
];

export default function WebsiteLatenMakenHaarlem() {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main id="main" className="relative isolate">
        <AmbientField />
        <Hero content={haarlem.hero} />
        <LocalIntro content={haarlem.intro} />
        <Why />
        <Process />
        <Projects />
        <Packages />
        <About />
        <Faq data={haarlem.faq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
