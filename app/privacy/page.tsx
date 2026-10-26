import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import AmbientField from "@/components/ui/AmbientField";
import Eyebrow from "@/components/ui/Eyebrow";
import { privacy, seo, site } from "@/lib/content";

const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: seo.ogAlt };

export const metadata: Metadata = {
  title: privacy.seo.title,
  description: privacy.seo.description,
  alternates: { canonical: privacy.path },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${site.url}${privacy.path}`,
    siteName: site.brand,
    title: privacy.seo.title,
    description: privacy.seo.description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: privacy.seo.title, description: privacy.seo.description, images: [ogImage] },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar base="/" />
      <main id="main" className="relative isolate">
        <AmbientField />
        <section id="top" className="relative pb-24 pt-32 md:pb-32 md:pt-44">
          <div className="container-x relative max-w-3xl">
            <Eyebrow>Laatst bijgewerkt: {privacy.updated}</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-gradient">
              {privacy.title}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">{privacy.intro}</p>

            <div className="mt-14 space-y-12">
              {privacy.sections.map((s) => (
                <section key={s.title} id={"id" in s ? s.id : undefined} className="scroll-mt-28 border-t border-white/10 pt-8">
                  <h2 className="font-display text-xl font-bold text-text-primary md:text-2xl">{s.title}</h2>
                  <div className="mt-4 space-y-4">
                    {s.paragraphs.map((p, i) => (
                      <p key={i} className="text-sm leading-relaxed text-text-secondary md:text-base">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
              <section className="border-t border-white/10 pt-8">
                <h2 className="font-display text-xl font-bold text-text-primary md:text-2xl">{privacy.contactTitle}</h2>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary md:text-base">
                  {privacy.contactText}{" "}
                  <a href={`mailto:${site.email}`} className="text-accent-soft underline-offset-4 hover:underline">
                    {site.email}
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer base="/" />
    </>
  );
}
