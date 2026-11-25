import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Figtree } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { CartProvider } from "@/components/cart/CartContext";
import { AuthProvider } from "@/hooks/useAuth";
import { ToastProvider } from "@/components/ui/Toast";
import Preloader from "@/components/Preloader";
import { SITE_URL } from "@/lib/seo";

// Display serif — high-contrast, narrow, with a true italic for the
// second line of split headings.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

// Geometric-humanist sans for body copy and the tracked uppercase labels.
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFDF5",
};

// Fallback metadata for routes that do not declare their own (cart, checkout,
// account, tracking, auth). Sheet-managed pages override this per route.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vora Labs — Premium Research Peptides for Laboratory R&D",
  description:
    "Vora Labs develops, fills and independently verifies premium research peptides for controlled laboratory R&D. Janoshik tested, 99%+ HPLC verified purity, batch-level Certificate of Analysis on every release. Research use only — not for human or veterinary consumption.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${figtree.variable}`}>
      <body>
        <Preloader />
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <SmoothScroll>{children}</SmoothScroll>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
