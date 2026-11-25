"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiChevronUp, FiRotateCcw } from "react-icons/fi";
import { FINDER, FINDER_START } from "@/lib/finder";
import { getProduct } from "@/lib/products";
import { useCart } from "@/components/cart/CartContext";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const LETTERS = "ABCDEFGHIJ";

/**
 * Full-page, one-question-at-a-time finder (lib/finder.ts). Numbered
 * question, lettered pill answers, an OK button; answers can also be picked
 * with the A/B/C… keys and confirmed with Enter. Ends on one exact product.
 */
export default function FinderQuiz() {
  const { add } = useCart();
  const [path, setPath] = useState<string[]>([FINDER_START]);
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);

  const current = FINDER[path[path.length - 1]];
  const product = result ? getProduct(result) : undefined;

  const advance = useCallback(
    (index: number) => {
      const opt = current.options[index];
      if (!opt) return;
      setDir(1);
      if (opt.product) setResult(opt.product);
      else if (opt.next) setPath((p) => [...p, opt.next!]);
      setPicked(null);
    },
    [current]
  );

  // Picking an answer highlights it, then moves on after a short beat.
  const choose = (index: number) => {
    setPicked(index);
    window.setTimeout(() => advance(index), 420);
  };

  const back = () => {
    setDir(-1);
    setPicked(null);
    setAdded(false);
    if (result) setResult(null);
    else if (path.length > 1) setPath((p) => p.slice(0, -1));
  };

  const restart = () => {
    setDir(-1);
    setPath([FINDER_START]);
    setPicked(null);
    setResult(null);
    setAdded(false);
  };

  // Keyboard: letter keys pick, Enter confirms.
  useEffect(() => {
    if (result) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const i = LETTERS.indexOf(e.key.toUpperCase());
      if (i >= 0 && i < current.options.length) {
        e.preventDefault();
        choose(i);
      } else if (e.key === "Enter" && picked !== null) {
        e.preventDefault();
        advance(picked);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, picked, result, advance]);

  const questionNo = path.length;
  const viewKey = result ? `result-${result}` : current.id;

  return (
    <div className="relative flex min-h-[calc(100svh-90px)] items-center justify-center px-5 py-16">
      <div className="w-full max-w-[640px]">
        {/* Re-keyed per question so each one slides in fresh (down when
            moving forward, up when going back). */}
          <motion.div
            key={viewKey}
            initial={{ opacity: 0, y: dir * 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {product ? (
              <div>
                <p className="flex items-center gap-2 text-[14px] text-clay">
                  <FiCheck size={16} /> Your exact match
                </p>
                <h1 className="mt-3 font-sans text-[clamp(1.5rem,3vw,2rem)] leading-snug text-espresso">
                  We recommend {product.name}
                </h1>

                <div className="mt-8 flex flex-col gap-5 rounded-[14px] border border-sand bg-cream p-5 sm:flex-row">
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative aspect-square w-full flex-none overflow-hidden rounded-[10px] bg-beige sm:w-[200px]"
                  >
                    <Image src={product.image} alt={product.name} fill sizes="220px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="w-fit rounded-full border border-sand px-3 py-1 text-[12px] font-light text-espresso">
                      {product.category}
                    </span>
                    <p className="mt-3 text-[17px] font-semibold uppercase tracking-[0.02em] text-espresso">
                      {product.name}
                    </p>
                    <p className="mt-1 text-[15px] font-light leading-relaxed text-clay">
                      {product.tagline}
                    </p>
                    <p className="mt-3 text-[18px] text-espresso">{product.priceLabel}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          add(
                            {
                              slug: product.slug,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                            },
                            1
                          );
                          setAdded(true);
                        }}
                        className="btn-solid btn-sm inline-flex items-center gap-2"
                      >
                        {added ? (
                          <>
                            <FiCheck size={14} /> Added
                          </>
                        ) : (
                          "Add to cart"
                        )}
                      </button>
                      <Link href={`/products/${product.slug}`} className="btn-outline btn-sm">
                        View details
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-beige px-5 py-2.5 text-[16px] font-medium text-espresso transition-colors hover:bg-sand"
                  >
                    <FiRotateCcw size={15} /> Start again
                  </button>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-[15px] text-espresso underline-offset-4 hover:underline"
                  >
                    Browse all compounds <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="flex items-start gap-3 font-sans text-[clamp(1.375rem,2.6vw,1.75rem)] leading-snug text-espresso">
                  <span className="mt-[0.3em] grid h-5 min-w-5 flex-none place-items-center rounded-[4px] bg-espresso px-1 text-[11px] font-bold leading-none text-cream">
                    {questionNo}
                  </span>
                  {current.prompt}
                </h1>

                <ul className="mt-7 flex flex-col gap-2.5 pl-0 sm:pl-8">
                  {current.options.map((o, i) => {
                    const active = picked === i;
                    return (
                      <li key={o.label}>
                        <button
                          type="button"
                          onClick={() => choose(i)}
                          aria-pressed={active}
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-full border px-3 py-2.5 text-left transition-all duration-200 sm:w-fit sm:min-w-[380px] sm:pr-6",
                            active
                              ? "border-espresso bg-espresso text-cream"
                              : "border-sand/70 bg-[#F0EEEA] text-espresso hover:border-espresso/40 hover:bg-[#E9E5DE]"
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-6 w-6 flex-none place-items-center rounded-full border text-[11px] font-semibold",
                              active
                                ? "border-cream bg-cream text-espresso"
                                : "border-espresso/30 bg-cream text-espresso"
                            )}
                          >
                            {active ? <FiCheck size={12} /> : LETTERS[i]}
                          </span>
                          <span className="flex flex-col">
                            <span className="text-[17px] leading-snug">{o.label}</span>
                            {o.hint && (
                              <span
                                className={cn(
                                  "text-[13px] font-light",
                                  active ? "text-cream/75" : "text-clay"
                                )}
                              >
                                {o.hint}
                              </span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-7 flex items-center gap-4 pl-0 sm:pl-8">
                  <button
                    type="button"
                    onClick={() => picked !== null && advance(picked)}
                    disabled={picked === null}
                    className="rounded-[10px] bg-beige px-5 py-2.5 text-[17px] font-medium text-espresso transition-colors hover:bg-sand disabled:opacity-60"
                  >
                    OK
                  </button>
                  <span className="hidden text-[13px] text-clay sm:inline">
                    press <strong className="font-semibold">Enter ↵</strong>
                  </span>
                </div>
              </div>
            )}
          </motion.div>
      </div>

      {/* Back control, bottom-right like a form stepper */}
      {(path.length > 1 || result) && (
        <button
          type="button"
          onClick={back}
          aria-label="Previous question"
          className="fixed bottom-6 right-6 grid h-10 w-10 place-items-center rounded-[8px] bg-espresso text-cream shadow-lift transition-opacity hover:opacity-85"
        >
          <FiChevronUp size={18} />
        </button>
      )}
    </div>
  );
}
