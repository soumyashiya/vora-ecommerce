import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientsBar from "@/components/ClientsBar";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Facilities from "@/components/Facilities";
import Marquee from "@/components/Marquee";
import Team from "@/components/Team";
import Blog from "@/components/Blog";
import Comparison from "@/components/Comparison";
import Loved from "@/components/Loved";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Premium Research Peptides for Laboratory R&D",
  description:
    "Vora Labs supplies premium research peptides for laboratory R&D. Janoshik tested, 99%+ HPLC verified, batch COA included. Research use only.",
});

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <Hero />
      <ClientsBar />
      {/* Catalogue rail + photographic entry points */}
      <Programs />
      <Benefits />
      {/* Commitment band, then the guided route into the catalogue */}
      <CTA />
      <Facilities />
      {/* Process, proof, origin */}
      <About />
      <Testimonials />
      <Marquee />
      <Team />
      <Blog />
      <Comparison />
      <Loved />
      <FAQ />
      <Footer />
    </main>
  );
}
