"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Each point swaps the photograph and the tags pinned to it. */
const POINTS = [
  {
    label: "Independent Janoshik Testing",
    img: "/new-images/over-the-shoulder-glow.webp",
    // Landscape shot in a square frame: shift right so the face and the
    // pen in her hand both stay in view.
    position: "60% center",
    tags: ["Janoshik tested", "Batch COA", "Published results"],
  },
  {
    label: "99%+ HPLC Verified Purity",
    // Portrait photo widened to a square (Higgsfield outpaint, original pen
    // pasted back so its label stays sharp): fills the frame uncropped and
    // keeps the pen above the tag pills.
    img: "/new-images/pale-pear-square.webp",
    tags: ["HPLC verified", "99%+ purity", "Identity confirmed"],
  },
  {
    label: "Pre-Filled Precision Pens",
    img: "/new-images/where vora labs/Golden Lemons with Carton and Pen-3.webp",
    tags: ["Exact concentration", "No reconstitution", "Dose increments"],
  },
  {
    label: "56-Day Stability Hold",
    img: "/new-images/Chartreuse studio portrait with TESAMORELIN pen-2.png",
    // Landscape studio shot in a square frame: nudge right so the figure and
    // the pen she's holding stay centred in the crop.
    position: "55% center",
    tags: ["Room-temp hold", "2–8°C storage", "Batch traceable"],
  },
];

/**
 * Feature band: heading and intro top-left, a stack of large serif points
 * bottom-left that drive the photograph on the right, with tag pills
 * pinned along the photo's lower edge.
 */
export default function Comparison() {
  const [active, setActive] = useState(0);
  const point = POINTS[active];

  return (
    <section className="section-pad">
      {/* Phones: heading → photo → points. Desktop: heading and points stack
          on the left, the photo spans both rows on the right. */}
      <div className="container-x grid gap-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="display-2 font-serif text-espresso">
            Where Vora Labs Stands Apart
          </h2>
          <p className="mt-4 max-w-[46ch] text-[16px] font-light leading-relaxed text-espresso/85">
            Here&apos;s what comes with every order: independent testing, a
            batch-level certificate and a pen that&apos;s ready to use.
          </p>
        </motion.div>

        {/* Photograph with tag pills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative aspect-square overflow-hidden rounded-[10px] bg-[#2B150C] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={point.img}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={point.img}
                alt={point.label}
                fill
                quality={90}
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: point.position ?? "center" }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-2 px-2 pb-3 sm:gap-3 sm:px-4 sm:pb-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                // Phones: smaller pills so all three fit on one row and don't stack up
                // over the product near the bottom of the photo.
                className="flex flex-wrap justify-center gap-1 xs:gap-1.5 sm:gap-3"
              >
                {point.tags.map((t) => (
                  <span
                    key={t}
                    className="whitespace-nowrap rounded-[6px] bg-cream/90 px-1.5 py-1 text-[10px] font-medium uppercase tracking-[0.02em] xs:px-2 xs:tracking-[0.04em] text-espresso backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[13px] sm:tracking-[0.06em]"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-end lg:pt-16">
          <ul className="flex flex-col gap-2">
            {POINTS.map((p, i) => (
              <li key={p.label}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={active === i}
                  className={cn(
                    "text-left font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15] tracking-display transition-colors duration-300",
                    active === i
                      ? "text-espresso"
                      : "text-espresso/45 hover:text-espresso/70",
                  )}
                >
                  <span
                    className={cn(
                      "border-b pb-0.5 transition-colors duration-300",
                      active === i ? "border-espresso" : "border-transparent",
                    )}
                  >
                    {p.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <Link
            href="/why-us"
            className="mt-8 inline-block border-b border-espresso pb-0.5 text-[14px] text-espresso transition-opacity hover:opacity-70"
          >
            See how we verify every batch
          </Link>
        </div>
      </div>
    </section>
  );
}
