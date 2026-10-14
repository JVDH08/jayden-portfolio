import { ImageResponse } from "next/og";
import { hero, seo, site } from "@/lib/content";

export const alt = seo.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Probeert Inter Tight 800 (het display-font van de site) op te halen zodat
 * het OG-beeld dezelfde kop heeft als de hero. Lukt dat niet (geen netwerk
 * tijdens de build), dan valt Satori terug op zijn standaard sans.
 */
async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800&display=swap",
      {
        // Oude UA → Google levert TTF-bronnen (Satori leest geen woff2).
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
        },
        signal: AbortSignal.timeout(5000),
      }
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\((.+?)\)\s*format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url, { signal: AbortSignal.timeout(5000) }).then((r) =>
      r.arrayBuffer()
    );
  } catch {
    return null;
  }
}

/**
 * OG image in de huisstijl: donker vlak, accentgloed, wordmark en belofte.
 * Satori ondersteunt alleen flexbox, dus alles is expliciet display:flex.
 */
export default async function OpenGraphImage() {
  const font = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#08080c",
          color: "#ededf2",
          fontFamily: "'Inter Tight', Inter, 'Helvetica Neue', Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* accent glows */}
        <div
          style={{
            position: "absolute",
            left: -120,
            top: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(110,91,255,0.55) 0%, rgba(110,91,255,0) 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -140,
            bottom: -220,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(61,214,245,0.32) 0%, rgba(61,214,245,0) 65%)",
            display: "flex",
          }}
        />
        {/* faint grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            display: "flex",
          }}
        />

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              background: "#6e5bff",
              boxShadow: "0 0 24px rgba(110,91,255,0.9)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {site.brand}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#9a8bff",
              display: "flex",
              marginTop: 6,
            }}
          >
            {site.mark}
          </div>
        </div>

        {/* promise */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              display: "flex",
            }}
          >
            {hero.titleLines[0]}
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#9a8bff",
              display: "flex",
            }}
          >
            {hero.titleLines[1]}
          </div>
        </div>

        {/* footer line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "#b9b9cc",
          }}
        >
          <div style={{ display: "flex" }}>{site.tagline}</div>
          <div style={{ display: "flex", color: "#8a8a9a" }}>sixtyfold.nl</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Inter Tight", data: font, weight: 800, style: "normal" }]
        : undefined,
    }
  );
}
