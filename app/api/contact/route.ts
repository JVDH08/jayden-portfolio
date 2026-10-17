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
 * Verstuurt het contactformulier via de Resend REST-API, en (als ingesteld)
 * ook als melding naar Telegram, zodat geen aanvraag blijft liggen als de
 * mailbox vol of traag is.
 * Env: RESEND_API_KEY, CONTACT_TO (fallback: site.email),
 * CONTACT_FROM (fallback: "Sixtyfold <onboarding@resend.dev>"),
 * TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID (optioneel).
 * Is er geen enkel kanaal ingesteld, dan antwoordt de route 503; het formulier
 * toont dan een mailto-fallback. Gelukt = minstens één kanaal kwam aan.
 */
export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChat = process.env.TELEGRAM_CHAT_ID;
  if (!key && !(tgToken && tgChat)) {
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

  const sendMail = async () => {
    if (!key) return false;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, reply_to: email, subject, text }),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const sendTelegram = async () => {
    if (!tgToken || !tgChat) return false;
    try {
      const res = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: tgChat,
          text: `📩 ${subject}\n\n${text}`.slice(0, 4000),
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(8000),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const [mailOk, telegramOk] = await Promise.all([sendMail(), sendTelegram()]);
  if (!mailOk && !telegramOk) {
    return NextResponse.json({ ok: false, reason: "send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
