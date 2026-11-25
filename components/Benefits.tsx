"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Category entry points sitting directly under the catalogue rail.
 * Styled product photographs on warm dark grounds, a bold uppercase label
 * top-left and a light arrow control top-right.
 */
type Tile = { title: string; href: string; img: string };

/** Home shows four featured categories. */
const TILES: Tile[] = [
  {
    title: "Weight Management",
    href: "/products?category=weight-management",
    img: "/new-images/weigh-management.png",
  },
  {
    title: "Recovery & Repair",
    href: "/products?category=recovery-repair",
    img: "/new-images/recovery.png",
  },
  {
    title: "Fitness & Endurance",
    href: "/products?category=fitness-endurance",
    img: "/new-images/fitness.png",
  },
  {
    title: "Energy & Longevity",
    href: "/products?category=energy-longevity",
    img: "/new-images/energy.png",
  },
];

export default function Benefits() {
  return (
    <section className="pb-[clamp(40px,5vw,80px)]">
      <div className="container-x">
        <div className="snap-rail no-scrollbar -mx-[max(20px,3.2vw)] flex gap-3 overflow-x-auto px-[max(20px,3.2vw)] xs:gap-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0">
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.06, ease: EASE }}
              className="w-[72vw] flex-none xs:w-[58vw] sm:w-[42vw] md:w-[34vw] lg:w-auto"
            >
              <Link
                href={tile.href}
                className="group relative block aspect-[16/10] overflow-hidden rounded-[8px] bg-espresso"
              >
                <Image
                  src={tile.img}
                  alt=""
                  fill
                  sizes="(max-width:1024px) 72vw, 25vw"
                  quality={90}
                  className="object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-105"
                />
                {/* Keeps the label legible over lighter parts of the photo */}
                <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/35 to-transparent" />

                {/* The arrow grows at sm, so the label's gutter grows with it
                    and returns to its desktop value at lg. */}
                <span className="absolute left-4 right-14 top-4 z-10 font-sans [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] text-[14px] font-semibold uppercase leading-tight tracking-[0.04em] text-cream xs:text-[15px] sm:left-5 sm:right-[4.25rem] sm:top-5 sm:text-[17px] lg:right-14 lg:text-[15px] xl:text-[17px]">
                  {tile.title}
                </span>

                <span className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-[6px] bg-cream/85 text-espresso transition-colors duration-300 group-hover:bg-chartreuse sm:right-5 sm:top-5 sm:h-9 sm:w-9">
                  <FiArrowRight size={15} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
