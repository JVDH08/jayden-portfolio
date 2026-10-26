"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_OPEN_EVENT,
  denyConsent,
  grantConsent,
  readConsent,
  saveConsent,
  type Consent,
} from "@/lib/tracking";
import { cookieBanner } from "@/lib/content";

// Beide knoppen precies gelijk: zelfde maat, kleur en gewicht (geen voorkeursknop).
const buttonClass =
  "flex-1 rounded-full border border-accent/50 bg-accent/15 px-5 py-2.5 text-sm font-medium text-text-primary transition-colors duration-300 hover:border-accent-soft hover:bg-accent/30";

/** Cookiebanner voor de Google Ads-meting. De toestemming zelf staat in lib/tracking.ts. */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    if (value === "granted") grantConsent();
    else denyConsent();
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label={cookieBanner.label}
      className="glass-deep glow-accent fixed inset-x-4 bottom-4 z-[60] rounded-2xl !bg-bg/95 p-5 text-sm leading-relaxed text-text-secondary sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
    >
      <p>
        {cookieBanner.text}{" "}
        <a href="/privacy#cookies" className="text-accent-soft underline-offset-4 hover:underline">
          {cookieBanner.more}
        </a>
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose("granted")} className={buttonClass}>
          {cookieBanner.accept}
        </button>
        <button type="button" onClick={() => choose("denied")} className={buttonClass}>
          {cookieBanner.decline}
        </button>
      </div>
    </div>
  );
}

/** Link "Cookie-instellingen" (in de footer): opent de banner opnieuw. */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))} className={className}>
      {cookieBanner.settings}
    </button>
  );
}
