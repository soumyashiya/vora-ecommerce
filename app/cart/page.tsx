"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "@/components/cart/CartContext";
import ShopHeader from "@/components/cart/ShopHeader";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { items, setQty, remove, subtotal, count, ready } = useCart();
  const total = subtotal;

  return (
    <main className="min-h-screen bg-cream">
      <ShopHeader />

      <div className="container-x pb-20 pt-[clamp(40px,5vw,72px)]">
        <header>
          <h1 className="display-2 font-serif text-espresso">Your Cart</h1>
          <p className="lead mt-3">
            {ready && count > 0
              ? `${count} item${count > 1 ? "s" : ""} ready for checkout`
              : "Review your research order"}
          </p>
        </header>

        {ready && items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-[14px] bg-beige py-24 text-center">
            <p className="font-serif text-[28px] tracking-display text-espresso">
              Your cart is empty
            </p>
            <p className="mt-2 text-[15px] font-light text-clay">
              Browse our research compounds to get started.
            </p>
            <Link href="/products" className="btn-solid mt-8">
              Browse compounds
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            {/* Line items */}
            <div className="border-t border-sand">
              <AnimatePresence initial={false}>
                {items.map((it) => (
                  <motion.div
                    key={it.slug}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    className="flex items-start gap-5 border-b border-sand py-6 sm:gap-7"
                  >
                    <Link
                      href={`/products/${it.slug}`}
                      className="relative h-28 w-24 flex-none overflow-hidden rounded-[6px] bg-beige sm:h-32 sm:w-28"
                    >
                      <Image
                        src={it.image}
                        alt={it.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
                        <Link
                          href={`/products/${it.slug}`}
                          className="text-[15px] font-semibold uppercase tracking-[0.02em] text-espresso transition-opacity hover:opacity-70"
                        >
                          {it.name}
                        </Link>
                        <span className="text-[16px] text-espresso">
                          ${(it.price * it.qty).toFixed(2)}
                        </span>
                      </div>

                      <p className="mt-1 text-[14px] font-light text-clay">
                        ${it.price.toFixed(2)} USD each
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                        <div className="flex items-center rounded-full border border-sand">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => setQty(it.slug, it.qty - 1)}
                            className="grid h-10 w-10 place-items-center rounded-l-full text-espresso transition-colors hover:bg-beige"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="w-7 text-center text-[14px] font-medium text-espresso">
                            {it.qty}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => setQty(it.slug, it.qty + 1)}
                            className="grid h-10 w-10 place-items-center rounded-r-full text-espresso transition-colors hover:bg-beige"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => remove(it.slug)}
                          className="tap-pad flex items-center gap-1.5 text-[13px] font-light text-clay underline-offset-4 transition-colors hover:text-espresso hover:underline"
                        >
                          <FiTrash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-[82px] lg:self-start">
              <div className="rounded-[14px] bg-beige p-7 sm:p-8">
                <h2 className="font-serif text-[26px] tracking-display text-espresso">
                  Order summary
                </h2>

                <dl className="mt-7 flex flex-col gap-4 text-[15px]">
                  <div className="flex justify-between">
                    <dt className="font-light text-clay">Subtotal</dt>
                    <dd className="text-espresso">
                      ${subtotal.toFixed(2)} USD
                    </dd>
                  </div>
                  <div className="h-px bg-sand" />
                  <div className="flex items-baseline justify-between">
                    <dt className="text-[16px] font-medium text-espresso">
                      Total
                    </dt>
                    <dd className="font-serif text-[26px] tracking-display text-espresso">
                      ${total.toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <Link href="/checkout" className="btn-solid mt-8 w-full">
                  Checkout
                </Link>
                <Link
                  href="/products"
                  className="tap-pad mt-4 block text-center text-[13px] font-light text-clay underline underline-offset-4 transition-colors hover:text-espresso"
                >
                  Continue shopping
                </Link>
              </div>

              <p className="mt-5 text-[12px] font-light leading-relaxed text-taupe">
                These products are intended solely for laboratory research
                purposes and are not intended for human or veterinary use. Not
                intended to diagnose, treat, cure or prevent any disease.
              </p>
            </aside>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
