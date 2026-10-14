"use client";

import type { PackageId } from "@/lib/content";

/**
 * Tiny pub/sub between the Pakketten cards and the contact form.
 * A card click dispatches the chosen package; the form listens and preselects
 * it. Deep links also work: /?pakket=plus#contact (read once on mount).
 */
export const PACKAGE_EVENT = "sixtyfold:pakket";

export const PACKAGE_IDS: PackageId[] = ["start", "plus", "signature"];

export function isPackageId(value: string | null): value is PackageId {
  return value !== null && (PACKAGE_IDS as string[]).includes(value);
}

export function selectPackage(id: PackageId) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<PackageId>(PACKAGE_EVENT, { detail: id }));
}

export function packageFromUrl(): PackageId | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("pakket");
  return isPackageId(value) ? value : null;
}
