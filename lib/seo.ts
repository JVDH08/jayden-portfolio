/**
 * Server-only SEO switches.
 * Indexing is on by default (MASTERPROMPT §4). Set NOINDEX=1 on a preview
 * environment to keep crawlers out until the site is live on sixtyfold.nl.
 */
export const ALLOW_INDEXING = process.env.NOINDEX !== "1";
