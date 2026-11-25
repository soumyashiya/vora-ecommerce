"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { SHOP_CATEGORIES } from "@/lib/categories";
import { PRODUCTS } from "@/lib/products";

const EASE = [0.22, 1, 0.36, 1] as const;
const DIR = "/new-images/header-shop-hover";

/** Photograph for each collection tile, keyed by collection slug. */
const GOAL_IMAGES: Record<string, string> = {
  "weight-management": "/new-images/weight (2).webp",
  "fitness-endurance": `${DIR}/Alluvi MOTS-C Box and Pen (1).png`,
  "growth-performance": `${DIR}/Golden tagliatelle and Alluvi studio set-4.png`,
  "energy-longevity": `${DIR}/MOTS-C Carton with Amber Iced Coffees-3.png`,
  "recovery-repair": `${DIR}/Teal Pebbles, Driftwood, and ALLUVI Carton-6.png`,
  "skin-hair-care": `${DIR}/Champagne-lit GLOW carton with flowing hair-5.png`,
};

/** Tile order mirrors the reference layout: metabolic first, beauty last. */
const GOAL_ORDER = [
  "weight-management",
  "fitness-endurance",
  "growth-performance",
  "energy-longevity",
  "recovery-repair",
  "skin-hair-care",
];

const GOALS = GOAL_ORDER.map((slug) =>
  SHOP_CATEGORIES.find((c) => c.slug === slug)
).filter((c): c is (typeof SHOP_CATEGORIES)[number] => Boolean(c));

const half = Math.ceil(PRODUCTS.length / 2);
const PRODUCT_COLUMNS = [PRODUCTS.slice(0, half), PRODUCTS.slice(half)];

const EXPLORE = [
  { label: "How we verify", href: "/why-us" },
  { label: "About Vora Labs", href: "/about" },
  { label: "Track an order", href: "/track" },
  { label: "Wholesale enquiries", href: "/wholesale" },
];

/**
 * Desktop "Shop" mega menu: a promo strip, six photographic collection
 * tiles, then product and explore link columns.
 */
export default function ShopMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="absolute inset-x-0 top-full border-b border-sand bg-cream text-espresso shadow-[0_30px_60px_-40px_rgba(33,24,14,0.45)]"
    >
      <div className="container-x py-7">
        {/* Promo strip */}
        <Link
          href="/products"
          onClick={onNavigate}
          className="group flex items-stretch overflow-hidden rounded-[10px] bg-espresso"
        >
          <div className="relative w-[22%] min-w-[160px] flex-none">
            <Image
              src="/new-images/ALLUVI-Cocoa-Retatrutide-20mg.webp"
              alt=""
              fill
              sizes="22vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 items-center justify-between gap-6 px-8 py-5">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-chartreuse">
                Janoshik tested · 99%+ HPLC
              </p>
              <p className="mt-1.5 font-sans text-[clamp(1.4rem,2.2vw,2rem)] font-bold uppercase leading-none tracking-[0.02em] text-cream">
                Every batch, verified
              </p>
            </div>
            <span className="inline-flex flex-none items-center gap-2 rounded-full bg-chartreuse px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-espresso transition-transform duration-300 group-hover:translate-x-1">
              Shop the catalogue <FiArrowRight size={15} />
            </span>
          </div>
        </Link>

        {/* Shop by goal */}
        <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.08em] text-clay">
          Shop by goal
        </p>
        <div className="mt-3 grid grid-cols-6 gap-4">
          {GOALS.map((g, i) => (
            <motion.div
              key={g.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.04 * i, ease: EASE }}
            >
              <Link
                href={`/products?category=${g.slug}`}
                onClick={onNavigate}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[8px] bg-espresso"
              >
                <Image
                  src={GOAL_IMAGES[g.slug]}
                  alt=""
                  fill
                  sizes="16vw"
                  className="object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-105"
                />
                <span className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-black/45 to-transparent" />
                <span className="absolute left-3 right-12 top-3 text-[13px] font-semibold uppercase leading-tight tracking-[0.06em] text-cream xl:text-[14px]">
                  {g.label}
                </span>
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-[6px] bg-cream/85 text-espresso transition-colors duration-300 group-hover:bg-chartreuse">
                  <FiArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Link columns */}
        <div className="mt-7 grid grid-cols-6 gap-4">
          <div className="col-span-1">
            <p className="text-[14px] font-medium uppercase tracking-[0.06em]">
              Shop best sellers
            </p>
            <Link
              href="/products"
              onClick={onNavigate}
              className="btn-solid btn-sm mt-4 inline-flex"
            >
              Shop all
            </Link>
          </div>

          <div className="col-span-2">
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-clay">
              Shop by product
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {PRODUCT_COLUMNS.map((col, i) => (
                <ul key={i} className="flex flex-col gap-2.5">
                  {col.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={onNavigate}
                        className="text-[15px] text-espresso/85 transition-colors hover:text-espresso hover:underline hover:underline-offset-4"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-clay">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={onNavigate}
                    className="text-[15px] text-espresso/85 transition-colors hover:text-espresso hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
