"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiCheck, FiRotateCcw } from "react-icons/fi";
import { IMG } from "@/lib/data";
import { FINDER, FINDER_START } from "@/lib/finder";
import { getProduct } from "@/lib/products";
import { useCart } from "@/components/cart/CartContext";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Guided compound finder: a tall photograph on the left; on the right a
 * short question flow (see lib/finder.ts) that narrows down to one exact
 * product, shown with add-to-cart in place.
 */
export default function Facilities() {
  const { add } = useCart();
  // Question ids answered so far; the last entry is the current question.
  const [path, setPath] = useState<string[]>([FINDER_START]);
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const current = FINDER[path[path.length - 1]];
  const product = result ? getProduct(result) : undefined;
  const stepNo = result ? path.length + 1 : path.length;

  const next = () => {
    if (picked === null) return;
    const opt = current.options[picked];
    if (opt.product) setResult(opt.product);
    else if (opt.next) setPath((p) => [...p, opt.next!]);
    setPicked(null);
  };

  const back = () => {
    setPicked(null);
    setAdded(false);
    if (result) setResult(null);
    else if (path.length > 1) setPath((p) => p.slice(0, -1));
  };

  const restart = () => {
    setPath([FINDER_START]);
    setPicked(null);
    setResult(null);
    setAdded(false);
  };

  const addToCart = () => {
    if (!product) return;
    add(
      { slug: product.slug, name: product.name, price: product.price, image: product.image },
      1
    );
    setAdded(true);
  };

  const viewKey = result ? `result-${result}` : current.id;

  return (
    <section id="finder" className="section-pad-sm scroll-mt-28">
      <div className="container-x grid items-stretch gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-beige sm:aspect-[4/3] lg:aspect-auto lg:min-h-[620px]"
        >
          <Image
            src={IMG.aboutA}
            alt="Athlete in a gym behind the Tirzepatide 40mg kit and pen"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover object-[center_65%]"
          />
        </motion.div>

        <div className="flex flex-col justify-center text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={viewKey}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {product ? (
                <>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-clay">
                    Your exact match
                  </p>
                  <h2 className="mt-3 font-serif text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.05] tracking-display text-espresso">
                    We Recommend {product.name}
                  </h2>

                  <div className="mx-auto mt-8 flex max-w-[560px] flex-col items-center gap-5 rounded-[10px] border border-sand bg-cream p-5 text-left sm:flex-row sm:items-stretch">
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative aspect-square w-full flex-none overflow-hidden rounded-[8px] bg-beige sm:w-[180px]"
                    >
                      <Image src={product.image} alt={product.name} fill sizes="200px" className="object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="w-fit rounded-full border border-sand px-3 py-1 text-[12px] font-light text-espresso">
                        {product.category}
                      </span>
                      <p className="mt-3 text-[16px] font-semibold uppercase tracking-[0.02em] text-espresso">
                        {product.name}
                      </p>
                      <p className="mt-1 text-[14px] font-light leading-relaxed text-clay">
                        {product.tagline}
                      </p>
                      <p className="mt-3 text-[17px] text-espresso">{product.priceLabel}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={addToCart}
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
                </>
              ) : (
                <>
                  <h2 className="font-serif text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.05] tracking-display text-espresso">
                    Find the Vora Labs Compound That Fits Your Work
                  </h2>
                  <p className="serif-italic mt-1 font-serif text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight text-espresso">
                    {current.title}
                  </p>

                  <div
                    className={cn(
                      "mx-auto mt-9 grid gap-3 lg:gap-4",
                      current.options.length > 2
                        ? "max-w-[700px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "max-w-[520px] grid-cols-1 sm:grid-cols-2"
                    )}
                  >
                    {current.options.map((o, i) => (
                      <button
                        key={o.label}
                        type="button"
                        onClick={() => setPicked(i)}
                        aria-pressed={picked === i}
                        className={cn(
                          "flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-[6px] border px-4 py-3 transition-colors duration-300",
                          picked === i
                            ? "border-espresso bg-espresso text-cream"
                            : "border-sand bg-cream text-espresso hover:border-espresso/45"
                        )}
                      >
                        <span className="text-[12px] font-medium uppercase leading-snug tracking-[0.06em]">
                          {o.label}
                        </span>
                        {o.hint && (
                          <span
                            className={cn(
                              "text-[12px] font-light",
                              picked === i ? "text-cream/75" : "text-clay"
                            )}
                          >
                            {o.hint}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-9 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={back}
              disabled={!result && path.length === 1}
              aria-label="Previous question"
              className="grid h-10 w-10 place-items-center rounded-full bg-beige text-espresso transition-opacity disabled:opacity-35"
            >
              <FiArrowLeft size={16} />
            </button>

            {product ? (
              <button
                type="button"
                onClick={restart}
                className="btn-base inline-flex min-w-[200px] items-center justify-center gap-2 bg-beige text-espresso transition-colors hover:bg-espresso hover:text-cream xs:min-w-[240px]"
              >
                <FiRotateCcw size={14} /> Start again
              </button>
            ) : (
              <button
                type="button"
                onClick={next}
                disabled={picked === null}
                className="btn-base min-w-[200px] bg-beige text-espresso transition-colors hover:bg-espresso hover:text-cream disabled:cursor-not-allowed disabled:hover:bg-beige disabled:hover:text-espresso xs:min-w-[240px]"
              >
                {path.length === 1 ? "Find your compound" : "Next"}
              </button>
            )}
          </div>

          <p className="label-xs mt-5 text-taupe">
            {product ? "Your match" : `Step ${stepNo}`}
          </p>
        </div>
      </div>
    </section>
  );
}
