"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";
import { ArrowControl } from "@/components/ui/Bits";
import SplitReveal from "@/components/ui/SplitReveal";
import { SHOP_CATEGORIES } from "@/lib/categories";
import { PRODUCTS } from "@/lib/products";

/** The home row shows the first few collections; Shop all reaches the rest. */
const HOME_TAB_COUNT = 4;

const TABS = [
  { label: "Best Sellers", match: (_c: string) => true },
  ...SHOP_CATEGORIES.slice(0, HOME_TAB_COUNT),
];

export default function Programs() {
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => PRODUCTS.filter((p) => TABS[active].match(p.category)),
    [active]
  );

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="products" className="section-pad">
      <div className="container-x">
        <SplitReveal
          text="Targeted Compounds for"
          accent="Precise Research"
          as="h2"
          className="display-2 mx-auto max-w-[20ch] text-center font-serif text-espresso"
        />

        {/* Category filter — filters the rail in place. Auto margins centre
            the row when it fits without clipping it when it scrolls. */}
        <div className="no-scrollbar mt-10 flex items-center gap-6 overflow-x-auto pb-1 lg:gap-8 xl:gap-10 [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(i)}
              data-active={active === i}
              aria-pressed={active === i}
              className="tab-link flex-none"
            >
              {tab.label}
            </button>
          ))}

          <Link href="/products" className="btn-solid btn-sm ml-2 flex-none">
            Shop all
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative mt-10">
          <motion.div
            ref={rail}
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="snap-rail no-scrollbar -mx-[max(20px,3.2vw)] flex gap-6 overflow-x-auto px-[max(20px,3.2vw)] pb-2 lg:mx-0 lg:px-0"
          >
            {items.map((p, i) => (
              <ProductCard
                key={p.slug}
                product={p}
                index={i}
                className="w-[78vw] flex-none xs:w-[66vw] sm:w-[44vw] lg:w-[calc((100%-48px)/3)]"
              />
            ))}
          </motion.div>

          {/* Rail controls — hidden when everything already fits */}
          {items.length > 3 && (
            <div className="mt-6 flex justify-center gap-3 lg:absolute lg:-right-1 lg:top-[38%] lg:mt-0 lg:justify-end">
              <ArrowControl
                direction="left"
                label="Previous products"
                onClick={() => scrollBy(-1)}
                className="lg:hidden"
              />
              <ArrowControl
                direction="right"
                label="Next products"
                onClick={() => scrollBy(1)}
                className="bg-espresso text-cream lg:h-12 lg:w-12"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
