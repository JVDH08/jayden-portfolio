/**
 * Google Ads-conversiemeting, alleen met toestemming.
 *
 * - Uit zolang NEXT_PUBLIC_GADS_ID (bijv. "AW-123456789") niet in Vercel staat:
 *   dan geen banner, geen script en geen cookies, precies zoals de site was.
 * - Met ID: eerst een cookiebanner. Pas na "Akkoord" laadt het Google-script
 *   (basic consent mode). Bij "Liever niet" laadt er niets.
 * - Een verstuurd contactformulier telt als conversie
 *   (NEXT_PUBLIC_GADS_CONVERSION, bijv. "AW-123456789/AbCdEfGh").
 */

export const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID ?? "";
export const GADS_CONVERSION = process.env.NEXT_PUBLIC_GADS_CONVERSION ?? "";
export const TRACKING_ENABLED = /^AW-\d+$/.test(GADS_ID);

export type Consent = "granted" | "denied";

const KEY = "sf-consent";
/** Event om de banner opnieuw te tonen (link "Cookie-instellingen"). */
export const CONSENT_OPEN_EVENT = "sf:consent-open";

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
  }
}

let loaded = false;

/** Laadt gtag.js. Alleen aanroepen ná toestemming. */
export function loadGoogleAds(): void {
  if (!TRACKING_ENABLED || loaded || typeof window === "undefined") return;
  loaded = true;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GADS_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GADS_ID)}`;
  document.head.appendChild(s);
}

/** Intrekken: Google stopt met meten in dit bezoek; bij het volgende bezoek laadt er niets. */
export function revokeGoogleAds(): void {
  window.gtag?.("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
}

/** Een aanvraag via het contactformulier. Doet niets zonder toestemming of zonder conversie-ID. */
export function trackLead(): void {
  if (!TRACKING_ENABLED || !GADS_CONVERSION || readConsent() !== "granted") return;
  window.gtag?.("event", "conversion", { send_to: GADS_CONVERSION });
}
