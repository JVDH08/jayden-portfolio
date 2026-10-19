"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_OPEN_EVENT,
  TRACKING_ENABLED,
  loadGoogleAds,
  readConsent,
  revokeGoogleAds,
  saveConsent,
  type Consent,
} from "@/lib/tracking";
import { cookieBanner } from "@/lib/content";

/**
 * Cookiebanner voor de Google Ads-meting. Rendert niets zolang de meting uit
 * staat (geen NEXT_PUBLIC_GADS_ID), dus dan verandert er niets aan de site.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    const choice = readConsent();
    if (choice === "granted") loadGoogleAds();
    if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!TRACKING_ENABLED || !open) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    if (value === "granted") loadGoogleAds();
    else revokeGoogleAds();
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label={cookieBanner.label}
      className="glass-deep fixed inset-x-4 bottom-4 z-[60] rounded-2xl !bg-bg/95 p-5 text-sm leading-relaxed text-text-secondary sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
    >
      <p>
        {cookieBanner.text}{" "}
        <a href="/privacy" className="text-accent-soft underline-offset-4 hover:underline">
          {cookieBanner.more}
        </a>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent-soft"
        >
          {cookieBanner.accept}
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-text-primary/90 transition-colors duration-300 hover:border-white/30"
        >
          {cookieBanner.decline}
        </button>
      </div>
    </div>
  );
}

/** Link "Cookie-instellingen" (in de footer), alleen als de meting aan staat. */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  if (!TRACKING_ENABLED) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))} className={className}>
      {cookieBanner.settings}
    </button>
  );
}
