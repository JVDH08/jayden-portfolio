import type { Metadata, Viewport } from "next";
import { Inter_Tight, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CursorGlow from "@/components/ui/CursorGlow";
import { seo, site } from "@/lib/content";
import { ALLOW_INDEXING } from "@/lib/seo";

// Display: Inter Tight — modern, normale/compacte breedte, strak (niet expanded).
const interTight = Inter_Tight({
  variable: "--font-display-src",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  applicationName: site.brand,
  authors: [{ name: site.brand, url: site.url }],
  creator: site.brand,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: site.brand,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: ALLOW_INDEXING
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#08080c",
  colorScheme: "dark",
};

/** ProfessionalService: alleen wat echt is (geen adres, reviews of cijfers). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  email: site.email,
  description: seo.description,
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/icon.svg`,
  priceRange: "€€",
  areaServed: [
    { "@type": "City", name: site.location },
    { "@type": "AdministrativeArea", name: site.region },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  founder: site.founders.map((name) => ({ "@type": "Person", name })),
  knowsAbout: ["Webdesign", "Webdevelopment", "Scroll-animaties", "SEO"],
  sameAs: [site.github],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${interTight.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-text-primary antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main" className="skip-link">
          Naar de inhoud
        </a>
        {/* Global grain overlay for depth */}
        <div className="grain" aria-hidden />
        {/* Cursor glow (auto-disables on touch / reduced motion) */}
        <CursorGlow />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
