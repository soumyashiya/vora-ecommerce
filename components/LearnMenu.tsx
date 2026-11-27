"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { LEARN_LINKS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    title: "How we verify every batch",
    href: "/why-us",
    img: "/new-images/rigor-card1.webp",
  },
  {
    title: "Our story",
    href: "/about",
    img: "/new-images/ourstory.webp",
  },
];

/** Photos for the header to fetch before the panel is first opened. */
export const LEARN_MENU_IMAGES = FEATURES.map((f) => ({ src: f.img, sizes: "30vw" }));

/** Desktop "Learn" panel: link list on the left, two feature cards right. */
export default function LearnMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="absolute inset-x-0 top-full border-b border-sand bg-cream text-espresso shadow-[0_30px_60px_-40px_rgba(33,24,14,0.45)]"
    >
      <div className="container-x grid grid-cols-6 gap-4 py-8">
        <div className="col-span-2">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-clay">
            Learn
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {LEARN_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onNavigate}
                  className="text-[16px] text-espresso/85 transition-colors hover:text-espresso hover:underline hover:underline-offset-4"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {FEATURES.map((f, i) => (
          <motion.div
            key={f.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 * i, ease: EASE }}
            className="col-span-2"
          >
            <Link
              href={f.href}
              onClick={onNavigate}
              className="group relative block aspect-[16/10] overflow-hidden rounded-[8px] bg-espresso"
            >
              <Image
                src={f.img}
                alt=""
                fill
                sizes="30vw"
                className="object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-105"
              />
              <span className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-black/45 to-transparent" />
              <span className="absolute left-4 right-14 top-4 text-[14px] font-semibold uppercase leading-tight tracking-[0.06em] text-cream">
                {f.title}
              </span>
              <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-[6px] bg-cream/85 text-espresso transition-colors duration-300 group-hover:bg-chartreuse">
                <FiArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
