import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ShopHeader from "@/components/cart/ShopHeader";
import AboutContent from "@/components/about/AboutContent";
import AssuranceStrip from "@/components/AssuranceStrip";
import Footer from "@/components/Footer";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About — Vora Labs",
  description:
    "Vora Labs supplies research-grade peptide compounds for controlled laboratory R&D, with a focus on documented quality, independent testing, and traceable sourcing.",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream">
      <ShopHeader />
      <AboutContent />
      <AssuranceStrip />
      <Footer />
    </main>
  );
}
