import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import ShopHeader from "@/components/cart/ShopHeader";
import ShopGrid from "@/components/shop/ShopGrid";
import AssuranceStrip from "@/components/AssuranceStrip";
import Footer from "@/components/Footer";

export const metadata: Metadata = pageMetadata({
  path: "/products",
  title: "Research Peptides, Janoshik Tested & COA",
  description:
    "Vora Labs provides premium research-grade peptides for laboratory research. Third-party tested, HPLC verified, with batch COAs.",
});

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-cream">
      <ShopHeader />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-x py-3">
        <ol className="flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] text-clay">
          <li>
            <Link href="/" className="hover:text-espresso">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-taupe">
            /
          </li>
          <li className="text-espresso">Shop</li>
        </ol>
      </nav>

      <div className="pb-[clamp(56px,7vw,110px)]">
        <Suspense
          fallback={<div className="h-[70vh] animate-pulse bg-beige/60" />}
        >
          <ShopGrid />
        </Suspense>
      </div>

      <AssuranceStrip />

      <Footer />
    </main>
  );
}
