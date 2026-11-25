"use client";

import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";

/**
 * Auth pages share the site header and sit on plain cream — the form is a
 * centred column with a serif title, not a floating card.
 */
export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  note,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  note?: string;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-cream">
      <SiteHeader variant="solid" />

      <div className="flex flex-1 items-start justify-center px-5 py-[clamp(48px,8vw,100px)]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[440px]"
        >
          <h1 className="display-2-sm text-center font-serif text-espresso">
            {title}
          </h1>
          <p className="mt-3 text-center text-[15px] font-light text-clay">
            {subtitle}
          </p>

          <div className="mt-9">{children}</div>

          <div className="mt-7 text-center text-[14px] font-light text-clay">
            {footer}
          </div>

          {note && (
            <p className="label-xs mt-6 text-center text-[11px] leading-relaxed text-taupe">
              {note}
            </p>
          )}
        </motion.div>
      </div>
    </main>
  );
}
