import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  website?: unknown;
  package?: unknown;
  message?: unknown;
  /** Honeypot: must stay empty. */
  nickname?: unknown;
};

const MAX = {
  name: 120,
  email: 200,
  company: 160,
  website: 200,
  package: 40,
  message: 4000,
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PACKAGE_LABEL: Record<string, string> = {
  start: "Start",
  plus: "Plus",
  signature: "Signature",
  unknown: "Weet ik nog niet",
};

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

// Minimal in-memory rate limit per instance: 5 berichten per 10 minuten per IP.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

/**
 * Verstuurt het contactformulier via de Resend REST-API.
 * Env: RESEND_API_KEY (verplicht), CONTACT_TO (fallback: site.email),
 * CONTACT_FROM (fallback: "Sixtyfold <onboarding@resend.dev>").
 * Zonder sleutel antwoordt de route 503; het formulier toont dan een mailto-fallback.
 */
export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  if (!key) {
    return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, reason: "rate" }, { status: 429 });
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  if (clean(body.nickname, 10)) {
    // Honeypot ingevuld: doe alsof het gelukt is, verstuur niets.
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const company = clean(body.company, MAX.company);
  const website = clean(body.website, MAX.website);
  const pkg = clean(body.package, MAX.package);
  const message = clean(body.message, MAX.message);

  if (!name || !message || !EMAIL.test(email)) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const from = process.env.CONTACT_FROM ?? `${site.brand} <onboarding@resend.dev>`;
  const packageLabel = PACKAGE_LABEL[pkg] ?? "";
  const text = [
    `Naam: ${name}`,
    `E-mail: ${email}`,
    company ? `Bedrijf: ${company}` : null,
    website ? `Huidige website: ${website}` : null,
    packageLabel ? `Pakket: ${packageLabel}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const subject = `Demo-aanvraag via ${site.brand}: ${name}${
    company ? ` (${company})` : ""
  }`;

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, reply_to: email, subject, text }),
    });
  } catch {
    return NextResponse.json({ ok: false, reason: "send" }, { status: 502 });
  }

  if (!res.ok) {
    return NextResponse.json({ ok: false, reason: "send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
