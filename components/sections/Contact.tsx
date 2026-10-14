"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { contact, site, type PackageId } from "@/lib/content";
import { PACKAGE_EVENT, packageFromUrl } from "@/lib/packageSelect";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Aurora from "@/components/ui/Aurora";
import { CheckIcon, ChevronDownIcon, MailIcon } from "@/components/ui/Icons";

type Status = "idle" | "sending" | "success" | "error" | "rate" | "unconfigured";

type Values = {
  name: string;
  email: string;
  company: string;
  website: string;
  package: string;
  message: string;
};

type FieldName = keyof Values;

const { form: copy } = contact;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readValues(data: FormData): Values {
  const get = (key: FieldName) => ((data.get(key) as string) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    website: get("website"),
    package: get("package"),
    message: get("message"),
  };
}

function validate(v: Values) {
  const next: Partial<Record<FieldName, string>> = {};
  if (!v.name) next.name = copy.errors.name;
  if (!v.email) next.email = copy.errors.email;
  else if (!EMAIL.test(v.email)) next.email = copy.errors.emailInvalid;
  if (!v.message) next.message = copy.errors.message;
  return next;
}

/** Fallback zonder mailserver: open een e-mail met het bericht alvast ingevuld. */
function mailtoHref(v: Values) {
  const pkg = copy.package.options.find((o) => o.value === v.package)?.label;
  const subject = `Demo-aanvraag: ${v.company || v.name}`;
  const body = [
    `Naam: ${v.name}`,
    `E-mail: ${v.email}`,
    v.company ? `Bedrijf: ${v.company}` : "",
    v.website ? `Huidige website: ${v.website}` : "",
    pkg ? `Pakket: ${pkg}` : "",
    "",
    v.message,
  ]
    .filter((line) => line !== "")
    .join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

const fieldBase =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-text-primary placeholder:text-text-secondary/50 outline-none transition-all duration-300 focus:border-accent/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-accent/25 aria-[invalid=true]:border-red-400/60";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-text-primary/80"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [pkg, setPkg] = useState<string>("unknown");
  const [fallback, setFallback] = useState<string | null>(null);

  // Pakket vooraf invullen: via ?pakket=… in de URL of via een klik op een pakketkaart.
  useEffect(() => {
    const fromUrl = packageFromUrl();
    if (fromUrl) setPkg(fromUrl);
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<PackageId>).detail;
      if (id) setPkg(id);
    };
    window.addEventListener(PACKAGE_EVENT, onSelect);
    return () => window.removeEventListener(PACKAGE_EVENT, onSelect);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = readValues(data);

    const found = validate(values);
    setErrors(found);
    const firstError = (Object.keys(found) as FieldName[])[0];
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    setFallback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          nickname: (data.get("nickname") as string) ?? "",
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setPkg("unknown");
        return;
      }
      if (res.status === 503) {
        setFallback(mailtoHref(values));
        setStatus("unconfigured");
        return;
      }
      setStatus(res.status === 429 ? "rate" : "error");
    } catch {
      setStatus("error");
    }
  };

  const describedBy = (name: FieldName) =>
    errors[name] ? `${name}-error` : undefined;

  return (
    <section id="contact" className="relative py-28 md:py-40">
      <Aurora className="aurora-fade opacity-70" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">{contact.eyebrow}</Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            className="mx-auto mt-7 max-w-3xl font-display text-[clamp(2.2rem,6vw,5rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-gradient"
          >
            {contact.title}
          </LineReveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
              {contact.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex justify-center">
              <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                <MailIcon className="h-4 w-4" />
                {site.email}
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* form card */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-2xl">
            {status === "success" ? (
              <div
                role="status"
                className="glass flex flex-col items-center gap-4 rounded-3xl p-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
                  <CheckIcon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-text-primary">
                  {copy.success.title}
                </h3>
                <p className="max-w-sm text-text-secondary">{copy.success.text}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="glass space-y-5 rounded-3xl p-7 md:p-10"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field id="name" label={copy.name.label} error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={copy.name.placeholder}
                      className={fieldBase}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={describedBy("name")}
                    />
                  </Field>
                  <Field id="email" label={copy.email.label} error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder={copy.email.placeholder}
                      className={fieldBase}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={describedBy("email")}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field id="company" label={copy.company.label}>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder={copy.company.placeholder}
                      className={fieldBase}
                    />
                  </Field>
                  <Field id="website" label={copy.website.label}>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      placeholder={copy.website.placeholder}
                      className={fieldBase}
                    />
                  </Field>
                </div>

                <Field id="package" label={copy.package.label}>
                  <div className="relative">
                    <select
                      id="package"
                      name="package"
                      value={pkg}
                      onChange={(e) => setPkg(e.target.value)}
                      className={`${fieldBase} appearance-none pr-12`}
                    >
                      {copy.package.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                  </div>
                </Field>

                <Field id="message" label={copy.message.label} error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={copy.message.placeholder}
                    className={`${fieldBase} resize-none`}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={describedBy("message")}
                  />
                </Field>

                {/* honeypot: onzichtbaar voor mensen, bots vullen het in */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="nickname">Laat dit veld leeg</label>
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {status === "unconfigured" && fallback ? (
                  <div
                    role="alert"
                    className="rounded-2xl border border-accent/30 bg-accent/10 p-5"
                  >
                    <p className="font-display text-base font-bold text-text-primary">
                      {copy.unconfigured.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {copy.unconfigured.text}
                    </p>
                    <div className="mt-4">
                      <MagneticButton href={fallback} strength={0.2}>
                        <MailIcon className="h-4 w-4" />
                        {copy.unconfigured.button}
                      </MagneticButton>
                    </div>
                  </div>
                ) : null}

                {status === "error" || status === "rate" ? (
                  <p role="alert" className="text-sm text-red-300">
                    {status === "rate" ? copy.rate : copy.error}
                  </p>
                ) : null}

                <div className="flex flex-col items-stretch gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-text-secondary">
                    {copy.direct}{" "}
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
                    className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white glow-accent transition-[background-color,scale] duration-300 hover:bg-accent-soft active:scale-[0.98] disabled:opacity-60"
                  >
                    {status === "sending" ? copy.sending : copy.submit}
                  </button>
                </div>
                <p role="status" aria-live="polite" className="sr-only">
                  {status === "sending" ? copy.sending : ""}
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
