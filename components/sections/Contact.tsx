"use client";

import { useState, type FormEvent } from "react";
import { contact, site } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Aurora from "@/components/ui/Aurora";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: FormData) => {
    const next: Record<string, string> = {};
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!name) next.name = "Vul je naam in.";
    if (!email) next.email = "Vul je e-mailadres in.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Dit lijkt geen geldig e-mailadres.";
    if (!message) next.message = "Vertel kort waar het over gaat.";
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");

    // TODO: plug een echte backend in (bv. Resend API route op /api/contact).
    // Voor nu: gesimuleerde verzending zodat de UI-flow compleet werkt.
    try {
      await new Promise((r) => setTimeout(r, 1100));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldBase =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-text-primary placeholder:text-text-secondary/60 outline-none transition-all duration-300 focus:border-accent/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-accent/20";

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      <Aurora className="opacity-70" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">{contact.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-7 max-w-3xl font-display text-[clamp(2.2rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-gradient">
              {contact.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
              {contact.subtitle}
            </p>
          </Reveal>

          {/* quick contact buttons */}
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                ✉ {site.email}
              </MagneticButton>
              <MagneticButton
                href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
                variant="ghost"
              >
                {site.whatsappDisplay}
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* form card */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-2xl">
            {status === "success" ? (
              <div className="glass flex flex-col items-center gap-4 rounded-3xl p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="max-w-sm text-text-primary">
                  {contact.form.success}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="glass space-y-5 rounded-3xl p-7 md:p-10"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      {contact.form.name}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={contact.form.name}
                      className={fieldBase}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="mt-2 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      {contact.form.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={contact.form.email}
                      className={fieldBase}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-2 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    {contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={contact.form.message}
                    className={`${fieldBase} resize-none`}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">{contact.form.error}</p>
                )}

                <div className="flex items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-text-secondary">
                    Of mail direct naar{" "}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-accent-soft underline-offset-2 hover:underline"
                    >
                      {site.email}
                    </a>
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    data-cursor
                    className="group relative inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white glow-accent transition-colors hover:bg-accent-soft disabled:opacity-60"
                  >
                    {status === "sending"
                      ? contact.form.sending
                      : contact.form.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
