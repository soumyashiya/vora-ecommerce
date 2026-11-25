"use client";

import SiteHeader from "@/components/SiteHeader";

/**
 * Inner-page header. The site now uses one header everywhere, so the former
 * back-link props are accepted but no longer rendered — navigation lives in
 * the shared nav instead.
 */
export default function ShopHeader(_props?: {
  backHref?: string;
  backLabel?: string;
}) {
  return <SiteHeader variant="solid" />;
}
