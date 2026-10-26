/**
 * Google Ads-conversiemeting met Consent Mode v2.
 *
 * - Vooraf staat alle toestemming op "denied" (CONSENT_DEFAULT_SCRIPT, app/layout.tsx).
 * - gtag.js en de Ads-tag (`config`) laden pas na "Accepteren", of meteen bij een
 *   volgend bezoek als sf-consent al "granted" is. Zonder keuze of na "Weigeren"
 *   gaat er geen enkel verzoek naar een Google-domein.
 * - De conversie telt Google Ads via het bezoek aan /bedankt; daar is geen
 *   eigen event voor nodig.
 */

export const GADS_ID = "AW-18518875599";

export type Consent = "granted" | "denied";

const KEY = "sf-consent";
/** Event om de banner opnieuw te tonen (link "Cookie-instellingen"). */
export const CONSENT_OPEN_EVENT = "sf:consent-open";

/**
 * Wat "Accepteren" toestaat: alleen wat conversiemeting nodig heeft.
 * Gepersonaliseerde advertenties en Analytics blijven uit.
 */
const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

const GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`;

/**
 * Inline script in de root layout: standaard alles denied. Een eerder
 * gegeven "Accepteren" wordt meteen toegepast en laadt gtag.js, zodat ook /bedankt meetelt.
 */
export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', ${JSON.stringify(DENIED)});
gtag('js', new Date());
try {
  if (localStorage.getItem('${KEY}') === 'granted') {
    gtag('consent', 'update', ${JSON.stringify(GRANTED)});
    gtag('config', '${GADS_ID}');
    window.__sfAdsConfigured = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = '${GTAG_SRC}';
    document.head.appendChild(s);
  }
} catch (e) {}
`;

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent): void {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // privévenster of geblokkeerde opslag: de keuze geldt dan alleen voor dit bezoek
  }
}

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    __sfAdsConfigured?: boolean;
  }
}

/** Na "Accepteren": toestemming bijwerken, de Ads-tag aanzetten en gtag.js laden. */
export function grantConsent(): void {
  window.gtag?.("consent", "update", GRANTED);
  if (!window.__sfAdsConfigured) {
    window.gtag?.("config", GADS_ID);
    window.__sfAdsConfigured = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = GTAG_SRC;
    document.head.appendChild(s);
  }
}

/** Na "Weigeren" (ook bij intrekken): alles denied en de Ads-cookies van dit domein weg. */
export function denyConsent(): void {
  window.gtag?.("consent", "update", DENIED);
  const host = window.location.hostname;
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_gcl_")) continue;
    for (const domain of ["", `; domain=${host}`, `; domain=.${host.replace(/^www\./, "")}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}
