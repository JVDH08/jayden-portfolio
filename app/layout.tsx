import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CursorGlow from "@/components/ui/CursorGlow";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jaydenvandenhoek.nl"),
  title: "Jayden van den Hoek — Freelance Webdesign uit Haarlem",
  description:
    "Ik bouw cinematische, snelle websites op maat. Freelance webdesigner uit Haarlem. Modern, premium en gericht op resultaat.",
  keywords: [
    "webdesign Haarlem",
    "freelance webdesigner",
    "websites op maat",
    "Next.js developer",
    "Jayden van den Hoek",
  ],
  openGraph: {
    title: "Jayden van den Hoek — Freelance Webdesign uit Haarlem",
    description:
      "Cinematische, snelle websites op maat. Modern, premium en gericht op resultaat.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${syne.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-text-primary antialiased">
        {/* Global grain overlay for depth */}
        <div className="grain" aria-hidden />
        {/* Cursor glow (auto-disables on touch / reduced motion) */}
        <CursorGlow />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
