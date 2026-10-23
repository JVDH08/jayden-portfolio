import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import AmbientField from "@/components/ui/AmbientField";
import Eyebrow from "@/components/ui/Eyebrow";
import MagneticButton from "@/components/ui/MagneticButton";
import { CheckIcon, MailIcon } from "@/components/ui/Icons";
import { contact, site } from "@/lib/content";

/**
 * Bedankpagina na een verstuurd contactformulier.
 * Google Ads gebruikt deze URL als conversiepagina, daarom een eigen pad.
 * Niet indexeren en niet in de sitemap: alleen bedoeld voor wie net een aanvraag deed.
 */
export const metadata: Metadata = {
  title: "Bedankt voor je aanvraag | Sixtyfold",
  description: contact.form.success.text,
  alternates: { canonical: "/bedankt" },
  robots: { index: false, follow: true },
};

export default function BedanktPage() {
  return (
    <>
      <Navbar base="/" />
      <main id="main" className="relative isolate">
        <AmbientField />
        <section id="top" className="relative pb-28 pt-36 md:pb-40 md:pt-48">
          <div className="container-x relative max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
              <CheckIcon className="h-7 w-7" />
            </div>
            <Eyebrow className="mt-8 justify-center">Aanvraag ontvangen</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-gradient">
              {contact.form.success.title}
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
              {contact.form.success.text}
            </p>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-text-secondary">
              Iets vergeten, zoals je logo of een voorbeeld dat je mooi vindt? Mail het naar{" "}
              <a href={`mailto:${site.email}`} className="text-accent-soft underline-offset-4 hover:underline">
                {site.email}
              </a>
              .
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/#projecten">Bekijk ons werk</MagneticButton>
              <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                <MailIcon className="h-4 w-4" />
                Mail ons
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
      <Footer base="/" />
    </>
  );
}
