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
          text="What Customers Say About"
          accent="Vora Labs"
          as="h2"
          className="display-2 max-w-[20ch] font-serif text-espresso"
        />

        {/* Two columns on a phone leave the quotes at a ~20ch measure, so the
            contact sheet becomes a swipeable rail below sm and keeps the grid
            from there up. */}
        <div className="snap-rail no-scrollbar -mx-[max(20px,3.2vw)] mt-10 flex gap-4 overflow-x-auto px-[max(20px,3.2vw)] pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              className="flex w-[70vw] flex-none flex-col xs:w-[58vw] sm:w-auto"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[6px] bg-beige">
                <Image
                  src={t.avatar}
                  alt=""
                  fill
                  // Matches the card widths above exactly: rounding 70 up to
                  // 72 tipped a 390px phone over the 828 candidate and into
                  // 1080, which is 70% more pixels for the same box.
                  sizes="(max-width:480px) 70vw, (max-width:640px) 58vw, (max-width:1024px) 46vw, 23vw"
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
