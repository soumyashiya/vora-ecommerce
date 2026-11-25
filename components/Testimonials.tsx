"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SplitReveal from "@/components/ui/SplitReveal";
import { TESTIMONIALS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Social proof as an editorial contact sheet: four tall portraits, each with
 * the quote set in the display serif beneath it and the attribution as a
 * tracked uppercase micro-label.
 */
export default function Testimonials() {
  const items = TESTIMONIALS.slice(0, 4);

  return (
    <section id="testimonials" className="section-pad">
      <div className="container-x">
        <SplitReveal
          text="Trusted by"
          accent="Researchers Worldwide"
          as="h2"
          className="display-2 max-w-[20ch] font-serif text-espresso"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              className="flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[6px] bg-beige">
                <Image
                  src={t.avatar}
                  alt=""
                  fill
                  sizes="(max-width:1024px) 46vw, 23vw"
                  className="object-cover"
                />
              </div>

              <blockquote className="mt-5 font-serif text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.3] tracking-display text-espresso">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="label-xs mt-5 text-espresso">
                {t.name} · {t.sub}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
