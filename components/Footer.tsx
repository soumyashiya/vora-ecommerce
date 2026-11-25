"use client";

import Link from "next/link";
import { useState } from "react";
import { FOOTER_LINKS } from "@/lib/data";
import BrandLogo from "@/components/ui/BrandLogo";
import { subscribeNewsletter } from "@/services/newsletter.service";

type SubscribeStatus = "idle" | "loading" | "success" | "already" | "error";

/** Columns mirror the reference's Shop / Learn / Social / Support grouping. */
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  { title: "Shop", links: FOOTER_LINKS.quick },
  { title: "Support", links: FOOTER_LINKS.utility },
];

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [message, setMessage] = useState("");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const result = await subscribeNewsletter(email, "footer_research_updates");
      if (result.alreadySubscribed) {
        setStatus("already");
        setMessage("You're already on the list.");
      } else {
        setStatus("success");
        setMessage("Subscribed — check your inbox for updates.");
        setEmail("");
        setName("");
      }
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Couldn't subscribe. Please try again."
      );
    }
  };

  return (
    <footer id="footer" className="bg-espresso text-cream">
      <div className="container-x pb-10 pt-16 lg:pb-12 lg:pt-20">
        {/* Masthead + link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 md:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <BrandLogo
            dark
            size="lg"
            className="col-span-2 self-start md:col-span-3 lg:col-span-1"
          />

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="label-xs text-cream">{col.title}</p>
              <ul className="mt-6 flex flex-col gap-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[15px] font-light text-cream/75 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <p className="label-xs text-cream">Verification</p>
            <ul className="mt-6 flex flex-col gap-3.5 text-[15px] font-light text-cream/75">
              <li>Janoshik independent testing</li>
              <li>99%+ HPLC verified purity</li>
              <li>Batch-level certificate of analysis</li>
              <li>
                <a
                  href="mailto:support@voralabs.com"
                  className="transition-colors hover:text-cream"
                >
                  support@voralabs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Signup block */}
        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <h3 className="display-3 max-w-[15ch] font-serif text-cream">
            Batch releases, new{" "}
            <i className="serif-italic">certificates</i> and restock alerts,
            straight to your inbox.
          </h3>

          <form
            onSubmit={subscribe}
            className="rounded-[20px] border border-cream/35 p-7 sm:p-9"
          >
            <label className="block">
              <span className="sr-only">First name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First Name"
                autoComplete="given-name"
                className="field-line text-cream/90 placeholder:text-cream/70"
              />
            </label>

            <label className="mt-6 block">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                autoComplete="email"
                disabled={status === "loading"}
                className="field-line text-cream/90 placeholder:text-cream/70 disabled:opacity-60"
              />
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-base mt-8 bg-cream text-espresso hover:bg-chartreuse disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>

            {message && (
              <p
                role="status"
                className={`mt-4 text-[13px] ${
                  status === "error" ? "text-[#F2A28C]" : "text-chartreuse"
                }`}
              >
                {message}
              </p>
            )}

            <p className="mt-6 max-w-[48ch] text-[13px] font-light leading-relaxed text-cream/60">
              By submitting, you agree to receive research updates from Vora
              Labs. Consent isn&apos;t required for purchase. Unsubscribe at any
              time —{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>

        {/* Legal rail */}
        <div className="mt-14 flex flex-col gap-6 border-t border-cream/15 pt-8 lg:flex-row lg:items-start lg:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] font-light text-cream/70">
            <li>
              <Link href="/privacy-policy" className="underline underline-offset-4">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="underline underline-offset-4">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="underline underline-offset-4">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="underline underline-offset-4">
                Shipping Policy
              </Link>
            </li>
          </ul>

          <p className="max-w-[72ch] text-[13px] font-light leading-relaxed text-cream/55 lg:text-right">
            © {new Date().getFullYear()} Vora Labs. All rights reserved. Supplied
            strictly for laboratory research and analytical study by qualified
            professionals. Not intended to diagnose, treat, cure or prevent any
            disease, and not for human or veterinary consumption.
          </p>
        </div>
      </div>
    </footer>
  );
}
