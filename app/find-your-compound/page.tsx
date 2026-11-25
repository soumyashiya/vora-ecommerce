import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ShopHeader from "@/components/cart/ShopHeader";
import FinderQuiz from "@/components/finder/FinderQuiz";

export const metadata: Metadata = pageMetadata({
  path: "/find-your-compound",
  title: "Find Your Compound — Vora Labs",
  description:
    "Answer a few questions about your research and we'll match you to the right Vora Labs compound.",
});

export default function FindYourCompoundPage() {
  return (
    <main className="min-h-screen bg-cream">
      <ShopHeader />
      <FinderQuiz />
    </main>
  );
}
