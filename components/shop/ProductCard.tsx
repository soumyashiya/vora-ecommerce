"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiPlus } from "react-icons/fi";
import { useCart } from "@/components/cart/CartContext";
import { StarRow } from "@/components/ui/Bits";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Catalogue card.
 *
 * Tall photographic panel with a floating quick-add control, then a quiet
 * text block beneath it: attribute pill, uppercase name, one line of
 * description, and a rating / price row. Nothing is boxed — the photograph
 * is the card.
 */
export default function ProductCard({
  product,
  index = 0,
  className,
}: {
  product: Product;
  index?: number;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.07 }}
      className={cn("group flex flex-col", className)}
    >
      <div className="relative overflow-hidden rounded-[6px] bg-beige">
        <Link
          href={`/products/${product.slug}`}
          className="block aspect-[7/8]"
          aria-label={product.name}
        >
          {/* Packshots are 4:5 studio shots with their own backdrop, so they
              fill the frame edge to edge. */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            quality={90}
            sizes="(max-width:640px) 60vw, (max-width:1024px) 45vw, 31vw"
            className="origin-[50%_55%] object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-[1.05]"
          />
        </Link>

        <div className="pointer-events-none absolute left-2.5 top-2.5 flex origin-top-left scale-[0.85] items-center gap-2 sm:left-4 sm:top-4 sm:scale-100">
          <span className="badge-float">{product.id}</span>
          {product.isNew && (
            <span className="inline-flex items-center rounded-full bg-chartreuse px-4 py-2 text-[12px] font-medium uppercase tracking-[0.04em] text-espresso">
              New
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-[6px] sm:right-4 sm:top-4 bg-cream text-espresso transition-colors duration-300 hover:bg-espresso hover:text-cream"
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <FiCheck size={15} />
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <FiPlus size={15} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <Link href={`/products/${product.slug}`} className="mt-3 flex min-w-0 flex-col sm:mt-4">
        {/* Attribute pill — the reference uses this slot for variants. */}
        <span className="inline-flex max-w-full items-center gap-1.5 self-start rounded-full border border-sand bg-cream py-1 pl-1 pr-2.5 text-[11px] font-light text-espresso sm:gap-2 sm:py-1.5 sm:pl-1.5 sm:pr-3.5 sm:text-[13px]">
          <span className="h-3 w-3 flex-none rounded-full bg-chartreuse sm:h-[18px] sm:w-[18px]" />
          <span className="truncate">{product.category}</span>
        </span>

        <h3 className="mt-2.5 font-sans text-[13px] font-semibold uppercase leading-snug tracking-[0.02em] text-espresso sm:mt-3 sm:text-[15px]">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-[13px] font-light leading-snug text-clay sm:line-clamp-1 sm:text-[15px]">
          {product.tagline}
        </p>

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:mt-3">
          {product.purity ? (
            <StarRow count={product.purity} label="Verified" />
          ) : (
            <span className="text-[12px] font-light text-clay sm:text-[13px]">New release</span>
          )}
          <span className="text-[14px] text-espresso sm:text-[15px]">
            <span className="font-light text-clay">from </span>
            {product.priceLabel}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
