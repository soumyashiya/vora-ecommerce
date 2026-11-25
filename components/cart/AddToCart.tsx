"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import { useCart } from "./CartContext";
import type { Product } from "@/lib/products";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  // Phones: once the main buy row scrolls up out of view, a slim bar pins
  // to the bottom of the screen so the shopper can add without scrolling back.
  const rowRef = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const check = () => setShowBar(el.getBoundingClientRect().bottom < 0);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const handleAdd = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-3">
      <div ref={rowRef} className="flex items-stretch gap-3">
        {/* Quantity */}
        <div className="flex flex-none items-center rounded-full border border-sand">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-[52px] w-10 place-items-center rounded-l-full sm:w-11 text-espresso transition-colors hover:bg-beige"
          >
            <FiMinus size={15} />
          </button>
          <span
            aria-live="polite"
            className="w-8 text-center text-[15px] font-medium text-espresso"
          >
            {qty}
          </span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="grid h-[52px] w-10 place-items-center rounded-r-full sm:w-11 text-espresso transition-colors hover:bg-beige"
          >
            <FiPlus size={15} />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="btn-base h-[52px] min-w-0 flex-1 whitespace-nowrap border border-espresso bg-espresso px-4 text-cream hover:bg-transparent hover:text-espresso sm:px-6"
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-2"
              >
                <FiCheck size={16} /> Added
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                Add to cart
                <span className="hidden xs:inline"> — {product.priceLabel}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <Link href="/cart" className="btn-outline w-full">
        View cart
      </Link>

      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
          >
            <div className="container-x flex items-center gap-3 py-3">
              <div className="relative h-12 w-12 flex-none overflow-hidden rounded-[6px] bg-beige">
                <Image src={product.image} alt="" fill sizes="48px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold uppercase tracking-[0.02em] text-espresso">
                  {product.name}
                </p>
                <p className="text-[14px] text-clay">
                  {product.priceLabel}
                  {qty > 1 && <span> × {qty}</span>}
                </p>
              </div>
              <button
                onClick={handleAdd}
                className="btn-base h-11 flex-none border border-espresso bg-espresso px-5 text-cream"
              >
                {added ? (
                  <span className="flex items-center gap-1.5">
                    <FiCheck size={15} /> Added
                  </span>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
