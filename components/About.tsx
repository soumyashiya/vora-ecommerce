"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMG } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const PILLARS = [
  {
    word: "Formulation",
    title: "100% Batches Tested",
    body: "Each batch is analysed for purity, identity and verified content before any unit is released.",
    img: "/new-images/rigor-card1.png",
  },
  {
    word: "Purity",
    title: "99%+ HPLC Verified",
    body: "Analytical HPLC confirms purity percentage and content against specification on every fill.",
    img: "/new-images/riger-card2.png",
  },
  {
    word: "Traceability",
    title: "Batch-Level Certificates",
    body: "Representative samples are independently certified by Janoshik, and every COA is published.",
    img: "/new-images/rigor-card3.png",
    // Shift the crop down so the pen sits higher in the frame.
    pos: "object-[center_100%]",
  },
];

/**
 * Process band. The photograph runs full-bleed behind everything; the
 * heading anchors the top-left, a vertical pillar list sits low on the left,
 * and three sand cards overlap the lower right of the image.
 */
export default function About() {
  const [active, setActive] = useState(0);

  return (
    <section id="about" className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMG.aboutB}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-espresso/75 via-espresso/40 to-espresso/25" />

      <div className="container-x relative py-[clamp(48px,6vw,80px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-[min(560px,92%)]"
        >
          <h2 className="display-3 font-serif text-cream">
            The Rigor Behind Every Batch
          </h2>
          <p className="mt-4 max-w-[44ch] text-[16px] font-light leading-relaxed text-cream/80">
            We stay focused on identity, purity and documentation at every step,
            so your results rest on material you can account for.
          </p>
        </motion.div>

        <div className="mt-10 grid items-end gap-8 lg:mt-16 lg:grid-cols-[minmax(170px,230px)_1fr] lg:gap-10">
          {/* Pillar list */}
          <ul className="hidden flex-col gap-1 lg:flex">
            {PILLARS.map((p, i) => (
              <li key={p.word}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "font-serif text-[clamp(1.5rem,2.1vw,2.125rem)] leading-[1.35] tracking-display transition-colors duration-300",
                    active === i ? "text-cream" : "text-cream/55"
                  )}
                >
                  <span
                    className={cn(
                      "border-b pb-1 transition-colors duration-300",
                      active === i ? "border-cream" : "border-transparent"
                    )}
                  >
                    {p.word}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Cards */}
          <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
            {PILLARS.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "rounded-[14px] bg-beige p-3.5 transition-shadow duration-500",
                  active === i ? "shadow-lift" : ""
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-sand">
                  <Image
                    src={p.img}
                    alt=""
                    fill
                    sizes="(max-width:640px) 92vw, 30vw"
                    className={cn("object-cover", "pos" in p && p.pos)}
                  />
                </div>
                <h3 className="mt-4 font-sans text-[14px] font-semibold tracking-[0.01em] text-espresso">
                  {p.title}
                </h3>
                <p className="mb-1 mt-2 text-[15px] font-light leading-relaxed text-clay">
                  {p.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
