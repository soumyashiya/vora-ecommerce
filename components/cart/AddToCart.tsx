"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import { useCart } from "./CartContext";
import type { Product } from "@/lib/products";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

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
      <div className="flex items-stretch gap-3">
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
    </div>
  );
}
