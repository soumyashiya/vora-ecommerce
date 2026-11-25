"use client";

import { MARQUEE_ITEMS } from "@/lib/data";

/**
 * Full-bleed display-serif marquee on sand. Compound names set large, with
 * a small dot between each — a typographic rest between dense sections.
 */
export default function Marquee() {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="overflow-hidden bg-beige py-9 sm:py-12">
      <div className="flex w-max animate-marquee items-center">
        {loop.map((item, i) => (
          <span key={i} className="flex flex-none items-center">
            <span className="px-7 font-serif text-[clamp(2rem,5vw,4rem)] leading-none tracking-display text-espresso sm:px-10">
              {item}
            </span>
            <span
              aria-hidden
              className="h-1.5 w-1.5 flex-none rounded-full bg-espresso/35"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
