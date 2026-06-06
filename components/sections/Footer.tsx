import { site, footer, nav } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <a href="#top" className="font-display text-lg font-bold">
              {site.brand}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {footer.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                Navigatie
              </h4>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="text-sm text-text-primary/80 transition-colors hover:text-accent-soft"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                Volg
              </h4>
              <ul className="mt-4 space-y-2.5">
                {footer.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-primary/80 transition-colors hover:text-accent-soft"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                Contact
              </h4>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-text-primary/80 transition-colors hover:text-accent-soft"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="text-sm text-text-secondary">{site.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-xs text-text-secondary md:flex-row">
          <p>
            © {year} {site.name}. Alle rechten voorbehouden.
          </p>
          <p>{footer.madeBy}</p>
        </div>
      </div>
    </footer>
  );
}
