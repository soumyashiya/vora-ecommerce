"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";
import { COMPLIANCE } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Bump the suffix to show the panel again to people who dismissed the last one. */
const STORAGE_KEY = "vora-partner-notice-v1";

/**
 * Session-scoped: it returns once per browser session rather than once ever,
 * so returning researchers still see the partnership line without it nagging
 * on every route change. Swap to localStorage for once-and-done.
 */
const store = () =>
  typeof window === "undefined" ? null : window.sessionStorage;

/** The preloader curtain runs for roughly 2.1s; open once it has cleared. */
const DELAY_MS = 2600;

/** Nothing should interrupt someone who is mid-purchase. */
const SUPPRESSED = ["/cart", "/checkout", "/payment-capture"];

/* ---- copy ------------------------------------------------------------- */
/* Kept together so the whole panel can be reworded without touching markup. */
const COPY = {
  caption: "Official partner",
  partner: "Alluvi",
  partnerSub: "Healthcare",
  headingLead: "Authorised reseller of",
  headingAccent: "Alluvi",
  headingTail: "research peptides.",
  body: "Every pen on this site is a genuine Alluvi Healthcare kit, supplied through our authorised partnership, batch-verified by Janoshik Analytical and shipped sealed and cold.",
  marks: ["Genuine Alluvi batches", "Janoshik verified"],
  primary: { label: "Shop the range", href: "/products" },
  secondary: { label: "How we verify", href: "/why-us" },
};

const PANEL_IMAGE = "/new-images/bpc/Luxury cream carton and capped pen-3 (1).png";

/**
 * Entry panel announcing the Alluvi partnership. A warm packshot on the left,
 * an espresso ground carrying the type on the right — the same pairing the
 * hero and commitment band use, so it reads as part of the site rather than a
 * bolted-on interstitial.
 */
export default function PartnerModal() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // The global reduced-motion rule only reaches CSS transitions; these are
  // JS-driven, so the panel has to opt out itself.
  const stillness = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      store()?.setItem(STORAGE_KEY, "seen");
    } catch {
      /* private mode — it simply shows again next load */
    }
  }, []);

  // Open once, after the preloader, unless already seen or mid-purchase.
  useEffect(() => {
    if (SUPPRESSED.some((p) => pathname?.startsWith(p))) return;
    let seen = false;
    try {
      seen = store()?.getItem(STORAGE_KEY) === "seen";
    } catch {
      /* ignore */
    }
    if (seen) return;
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  // Escape to close, Tab kept inside the panel, scroll locked behind it.
  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the dialog without landing it on a control — a ring
    // around the close button is a poor first thing to look at.
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      restoreTo.current?.focus?.();
    };
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="partner-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={dismiss}
          className="fixed inset-0 z-[120] grid place-items-center bg-espresso/70 p-4 backdrop-blur-[3px] sm:p-6"
        >
          <motion.div
            ref={panelRef}
            key="partner-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-modal-heading"
            tabIndex={-1}
            initial={stillness ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={stillness ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: stillness ? 0.2 : 0.55, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            // The capped row matters: without it the grid track sizes to the
            // copy, outgrows max-h on a short laptop window and the panel
            // clips the compliance line instead of letting the column scroll.
            className="relative flex max-h-[92svh] w-full max-w-[1040px] flex-col overflow-hidden rounded-[14px] bg-espresso shadow-lift outline-none lg:grid lg:max-h-[88svh] lg:grid-cols-[0.82fr_1fr] lg:grid-rows-[minmax(0,1fr)]"
          >
            {/* Packshot. A short band on phones so the copy stays above the
                fold, the full height of the panel from lg. On a stacked layout
                under ~600px of viewport height — a phone held sideways — the
                band would eat most of the panel, so the copy takes it all.
                The lg min-height is capped against the panel's own max-height
                so a short laptop window never crops the column. */}
            <div className="relative h-[146px] flex-none bg-[#efe6d8] max-lg:[@media(max-height:600px)]:hidden xs:h-[172px] sm:h-[230px] lg:h-auto lg:min-h-[min(540px,72svh)]">
              <Image
                src={PANEL_IMAGE}
                alt="Alluvi BPC-157 & TB-500 carton with its pre-filled research pen"
                fill
                quality={90}
                sizes="(max-width:1024px) 100vw, 470px"
                // The source is a tall portrait, so a short band on phones has
                // to sit on the carton face rather than the empty ground above
                // it or the reflection below.
                className="object-cover object-[50%_52%] lg:object-[50%_center]"
              />
              {/* Phones stack the photograph straight onto the panel, so its
                  foot fades into it. Side by side the split is clean — a dark
                  gradient over this pale a shot just reads as a smudge. */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-espresso to-transparent lg:hidden"
              />
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-espresso/55 text-cream backdrop-blur-sm transition-colors hover:bg-espresso lg:right-4 lg:top-4 lg:bg-transparent lg:hover:bg-cream/10"
            >
              <FiX size={19} />
            </button>

            {/* Copy. Scrolls on its own if a small landscape viewport runs out
                of room, so the actions are always reachable. */}
            <div
              data-lenis-prevent
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 py-6 sm:px-9 sm:py-9 lg:px-11 lg:py-12"
              style={{
                paddingBottom: "max(1.75rem, env(safe-area-inset-bottom))",
              }}
            >
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 flex-none bg-chartreuse" />
                <p className="label-xs text-cream/55">{COPY.caption}</p>
              </div>

              {/* Set in type, not as artwork — there is no licensed partner
                  logo in this project to reproduce. */}
              <p className="mt-4 flex items-baseline gap-2.5 font-sans leading-none text-cream sm:mt-5">
                <span className="text-[21px] font-semibold uppercase tracking-[0.2em] sm:text-[24px]">
                  {COPY.partner}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-cream/45 sm:text-[11px]">
                  {COPY.partnerSub}
                </span>
              </p>

              <h2
                id="partner-modal-heading"
                className="mt-5 font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.06] tracking-display text-cream sm:mt-6"
              >
                {COPY.headingLead}{" "}
                <i className="serif-italic">{COPY.headingAccent}</i>{" "}
                {COPY.headingTail}
              </h2>

              <p className="mt-4 max-w-[48ch] text-[15px] font-light leading-relaxed text-cream/75 sm:mt-5 sm:text-[16px]">
                {COPY.body}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2.5 sm:mt-7">
                {COPY.marks.map((m) => (
                  <li
                    key={m}
                    className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.07em] text-cream/90 sm:px-4 sm:text-[12px]"
                  >
                    <FiCheck size={13} className="flex-none text-chartreuse" />
                    {m}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <Link
                  href={COPY.primary.href}
                  onClick={dismiss}
                  className="btn-accent w-full justify-center sm:w-auto"
                >
                  {COPY.primary.label}
                  <FiArrowRight size={15} className="flex-none" />
                </Link>
                <Link
                  href={COPY.secondary.href}
                  onClick={dismiss}
                  className="btn-on-dark w-full justify-center sm:w-auto"
                >
                  {COPY.secondary.label}
                </Link>
              </div>

              <p className="label-xs mt-6 text-[10px] leading-[1.5] text-cream/40 sm:mt-8 sm:text-[11px]">
                {COMPLIANCE}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
