"use client";

import { TRUST_ITEMS } from "@/lib/data";

/**
 * Quiet assurance strip directly under the hero: one continuous line of
 * tracked uppercase claims separated by hairline rules. It reads as a
 * caption to the hero rather than a section of its own.
 */
export default function ClientsBar() {
  const loop = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <section className="bg-chartreuse">
      {/* Desktop: static, evenly distributed */}
      <div className="container-x hidden py-5 lg:block">
        <ul className="flex items-center justify-between">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="label-xs whitespace-nowrap text-[12px] font-medium text-espresso"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: the same line, scrolling */}
      <div className="overflow-hidden py-4 lg:hidden">
        <div className="flex w-max animate-marquee items-center">
          {loop.map((item, i) => (
            <span key={i} className="flex flex-none items-center">
              <span className="label-xs whitespace-nowrap px-5 text-[11px] font-medium text-espresso">
                {item}
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-espresso/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
