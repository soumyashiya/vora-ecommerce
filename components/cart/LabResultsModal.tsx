"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiX } from "react-icons/fi";
import type { Product } from "@/lib/products";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Opens shortly after the page loads — long enough for the preloader to clear. */
const OPEN_DELAY = 1600;

/**
 * Lab-results card that greets the shopper on a product page: the batch,
 * fill and purity up top, then each measured compound with a bar scaled
 * against the largest one. Shown once per product per browser session so it
 * never nags on a return visit.
 */
export default function LabResultsModal({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const storageKey = `vora-lab-modal:${product.slug}`;

  useEffect(() => {
    if (product.analytes.length === 0) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(storageKey) === "1";
    } catch {}
    if (seen) return;

    const t = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {}
    }, OPEN_DELAY);
    return () => clearTimeout(t);
  }, [product.analytes.length, storageKey]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const amounts = product.analytes.map((a) => parseFloat(a.verifiedContent) || 0);
  const max = Math.max(...amounts, 1);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          className="fixed inset-0 z-[95] flex items-end justify-center bg-espresso/60 backdrop-blur-[2px] sm:items-center sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lab-modal-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            // Phones: a bottom sheet with rounded top corners. From sm a
            // centred card. svh keeps the close button inside the visible area.
            className="relative flex max-h-[92svh] w-full max-w-[560px] flex-col overflow-hidden rounded-t-[18px] bg-cream shadow-lift sm:rounded-[16px]"
          >
            <div className="overflow-y-auto overscroll-contain">
              {/* Header band */}
              <div className="relative overflow-hidden bg-gradient-to-br from-beige via-beige to-sand px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream text-espresso shadow-sm transition-colors hover:bg-white"
                >
                  <FiX size={18} />
                </button>

                <div className="flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-espresso">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-chartreuse">
                        <FiCheck size={10} strokeWidth={3} />
                      </span>
                      Janoshik verified
                    </span>

                    <h2
                      id="lab-modal-title"
                      className="mt-4 font-serif text-[clamp(1.9rem,6vw,2.5rem)] leading-[1.02] tracking-display text-espresso"
                    >
                      Independently
                      <br />
                      <span className="serif-italic">assayed</span>
                    </h2>
                    <p className="mt-3 max-w-[30ch] text-[14px] font-light leading-relaxed text-clay sm:text-[15px]">
                      {product.name} · batch{" "}
                      <span className="font-medium text-espresso">{product.batchNumber}</span>{" "}
                      was tested by Janoshik Analytical.
                    </p>
                  </div>

                  <div className="relative mt-8 hidden aspect-square w-[150px] flex-none overflow-hidden rounded-[10px] xs:block sm:w-[170px]">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="170px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
                {/* Batch facts */}
                <dl className="grid grid-cols-3 gap-2 sm:gap-3">
                  <Fact label="Batch" value={product.batchNumber} small />
                  <Fact label="Fill volume" value={product.fillVolume} />
                  <Fact label="Purity" value={product.purity} />
                </dl>

                {/* Measured content */}
                <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-espresso">
                  Measured content
                </p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {product.analytes.map((a, i) => (
                    <li
                      key={a.compound}
                      className="rounded-[10px] border border-sand bg-white/40 px-4 py-3.5"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[15px] text-espresso">{a.compound}</span>
                        <span className="text-[17px] font-semibold text-espresso">
                          {a.verifiedContent}
                        </span>
                      </div>
                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(amounts[i] / max) * 100}%` }}
                            transition={{ duration: 0.9, delay: 0.25 + i * 0.1, ease: EASE }}
                            className="h-full rounded-full bg-espresso"
                          />
                        </div>
                        <span className="flex-none text-[12px] font-light text-clay">
                          {a.concentration}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row [&>*]:px-6">
                  {product.janoshikUrl ? (
                    <a
                      href={product.janoshikUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-solid flex-1"
                    >
                      View certificate
                      <FiArrowUpRight size={15} />
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={close}
                    className={product.janoshikUrl ? "btn-outline flex-1" : "btn-solid flex-1"}
                  >
                    Shop this product
                  </button>
                </div>

                <p className="mt-4 text-center text-[11px] font-light text-taupe">
                  For laboratory research use only — not for human or veterinary use.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Fact({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="min-w-0 rounded-[10px] bg-beige px-3 py-3 sm:px-4">
      <dt className="text-[10px] font-medium uppercase tracking-[0.08em] text-taupe sm:text-[11px]">
        {label}
      </dt>
      <dd
        className={`mt-1 break-words font-semibold text-espresso ${
          small ? "text-[12px] sm:text-[14px]" : "text-[14px] sm:text-[16px]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
