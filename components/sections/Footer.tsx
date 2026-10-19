import { site, footer, nav } from "@/lib/content";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { CookieSettingsLink } from "@/components/ui/CookieConsent";

const linkClass =
  "text-sm text-text-primary/80 transition-colors hover:text-accent-soft";
const headingClass = "text-xs uppercase tracking-[0.2em] text-text-secondary";

/** `base` = "/" op subpagina's zonder de homepage-secties, zodat de ankers naar de homepage gaan. */
export default function Footer({ base = "" }: { base?: string } = {}) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-14">
      <div className="container-x relative">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <a
              href="#top"
              className="inline-flex items-baseline gap-1.5 font-display text-lg font-bold"
            >
              {site.brand}
              <span className="text-xs font-medium text-accent-soft/80">
                {site.mark}
              </span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {footer.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <nav aria-label="Voettekst">
              <h2 className={headingClass}>{footer.navTitle}</h2>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={`${base}${n.href}`} className={linkClass}>
                      {n.label}
                    </a>
                  </li>
                ))}
                {footer.pages.map((p) => (
                  <li key={p.href}>
                    {/* Narrow on phones so both footer columns stay side by side. */}
                    <a
                      href={p.href}
                      className={`${linkClass} inline-block max-w-[7.5rem] leading-snug sm:max-w-none`}
                    >
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className={headingClass}>{footer.contactTitle}</h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href={`mailto:${site.email}`} className={linkClass}>
                    {site.email}
                  </a>
                </li>
                {footer.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="text-sm text-text-secondary">{site.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {footer.copyright}
            {site.kvk ? ` · ${footer.kvkLabel} ${site.kvk}` : null}
            <CookieSettingsLink className="ml-3 underline-offset-4 transition-colors hover:text-accent-soft hover:underline" />
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-text-primary/80 transition-colors hover:text-accent-soft"
          >
            {footer.toTop}
            <ArrowRightIcon className="h-3.5 w-3.5 -rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* the wordmark as the last word, sinking below the fold */}
        <p
          aria-hidden
          className="pointer-events-none -mb-[0.22em] mt-10 select-none text-center font-display text-[clamp(4.5rem,15.5vw,14rem)] font-extrabold leading-none tracking-[-0.05em] text-white/[0.05] md:mt-14"
        >
          {site.brand}
        </p>
      </div>
    </footer>
  );
}
