"use client";

import SiteHeader from "@/components/SiteHeader";

/**
 * Home-page header. Sits transparently over the hero image and resolves to
 * the cream bar once the hero is scrolled past.
 */
export default function Navbar() {
  return <SiteHeader variant="overlay" />;
}
