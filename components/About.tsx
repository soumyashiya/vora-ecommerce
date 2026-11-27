"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { IMG } from "@/lib/data";
import { getProduct } from "@/lib/products";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type TabKey = "formulation" | "purity" | "traceability";

const TABS: {
  key: TabKey;
  word: string;
  title: string;
  intro: string;
  bg: string;
  bgPos?: string;
}[] = [
  {
    key: "formulation",
    word: "Formulation",
    title: "The Rigor Behind Every Vora Labs Batch",
    intro:
      "We stay focused on identity, purity and documentation at every step, so your results rest on material you can account for.",
    bg: IMG.aboutB,
  },
  {
    key: "purity",
    word: "Purity",
    title: "Vora Labs Purity You Can Verify",
    intro:
      "Every fill is analysed in house and independently confirmed before it is released.",
    bg: "/new-images/purity.webp",
    // Head sits at the top edge of the shot, so anchor the crop to the top
    // on wide screens; on phones keep both the pen and her face in frame.
    bgPos: "object-[80%_center] lg:object-[70%_top]",
  },
  {
    key: "traceability",
    word: "Traceability",
    title: "Every Vora Labs Batch, Traceable",
    intro:
      "Each compound carries a batch number you can match to its published certificate of analysis.",
    bg: "/new-images/tracability-bg.webp",
    // Phones: the whole pen, cap to "ALLUVI" end, stays in the narrower frame.
    bgPos: "object-[82%_center] lg:object-right",
  },
];

/** Formulation tab: three proof cards. */
const CARDS = [
  {
    title: "100% Batches Tested",
    body: "Each batch is analysed for purity, identity and verified content before any unit is released.",
    img: "/new-images/rigor-card1.webp",
  },
  {
    title: "99%+ HPLC Verified",
    body: "Analytical HPLC confirms purity percentage and content against specification on every fill.",
    img: "/new-images/riger-card2.webp",
  },
  {
    title: "Batch-Level Certificates",
    body: "Representative samples are independently certified by Janoshik, and every COA is published.",
    img: "/new-images/rigor-card3.webp",
    pos: "object-[center_100%]",
  },
];

/** Purity tab: ruled list of checks. */
const CHECKS = [
  {
    title: "Independently Tested",
    body: "Representative samples from every batch are sent to Janoshik Analytical for third-party testing.",
  },
  {
    title: "HPLC Verified",
    body: "Analytical HPLC confirms purity percentage and verified content against specification.",
  },
  {
    title: "Identity Confirmed",
    body: "Each compound's identity is confirmed before fill, so the label matches what is inside.",
  },
  {
    title: "Stability Validated",
    body: "Formulations hold verified purity for 56 days at room temperature, longer refrigerated.",
  },
];

/** Traceability tab: product cards that step through with the arrow. */
const TRACE = [
  { slug: "retatrutide-40mg", img: "/new-images/tracability-card.webp" },
  {
    slug: "tirzepatide-40mg",
    img: "/new-images/tirzepatide/Tirzepatide cartons with orange-accented pen-1.webp",
  },
  { slug: "nad-1000mg", img: "/new-images/nad/ALLUVI NAD+ carton and pen hero-2.webp" },
  { slug: "glow-70mg", img: "/new-images/glow/Alluvi Glow GHK-CU Carton and Pen-3.webp" },
  {
    slug: "bpc-157-tb-500-40mg",
    img: "/new-images/bpc/Luxury cream carton and capped pen-3 (1).webp",
  },
]
  .map((t) => ({ ...t, product: getProduct(t.slug) }))
  .filter((t) => t.product);

/**
 * Process band, three views. The photograph runs full-bleed behind
 * everything and changes with the tab; the heading sits top-left, the tab
 * list low on the left, and the right side swaps between proof cards
 * (Formulation), a ruled checklist (Purity) and a product/batch card
 * carousel (Traceability).
 */
export default function About() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="about" className="relative isolate overflow-hidden bg-espresso">
      {/* Background — crossfades per tab. Below lg it is a photo block above
          the copy instead of sitting behind it. */}
      {/* The photos are very wide, so phones get a wider 16:10 block (instead
          of 4:3) to keep each product whole rather than cropping into it. */}
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
      <AnimatePresence initial={false}>
        <motion.div
          key={tab.bg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={tab.bg}
            alt=""
            fill
            quality={90}
            sizes="100vw"
            className={cn("object-cover", tab.bgPos ?? "object-right")}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-espresso to-transparent lg:hidden" />
      </div>
      {/* Photo-led tabs get a lighter wash so the image still reads; the
          right side darkens where the copy sits. */}
      <div
        className={cn(
          "absolute inset-0 hidden bg-gradient-to-br lg:block",
          tab.key === "formulation"
            ? "from-espresso/75 via-espresso/40 to-espresso/25"
            : "from-espresso/60 via-espresso/15 to-transparent"
        )}
      />
      {tab.key !== "formulation" && (
        <div className="absolute inset-0 hidden bg-gradient-to-l from-espresso/70 via-espresso/10 to-transparent lg:block" />
      )}

      <div className="container-x relative pb-[clamp(48px,6vw,80px)] pt-6 lg:min-h-[720px] lg:pt-[clamp(48px,6vw,80px)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab.key + "-head"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="max-w-[min(560px,92%)]"
          >
            <h2 className="display-3 font-serif text-cream">{tab.title}</h2>
            <p className="mt-4 max-w-[44ch] text-[16px] font-light leading-relaxed text-cream/80">
              {tab.intro}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Tabs — horizontal on phones, stacked bottom-left on desktop */}
        <div
          role="tablist"
          aria-label="Our process"
          className="no-scrollbar mt-6 flex gap-5 overflow-x-auto sm:gap-6 lg:absolute lg:bottom-[clamp(48px,6vw,80px)] lg:mt-0 lg:flex-col lg:gap-1 lg:overflow-visible"
        >
          {TABS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "flex-none text-left font-serif text-[1.375rem] leading-[1.35] tracking-display transition-colors duration-300 sm:text-[clamp(1.5rem,2.1vw,2.125rem)]",
                active === i ? "text-cream" : "text-cream/55 hover:text-cream/80"
              )}
            >
              <span
                className={cn(
                  "border-b pb-1 transition-colors duration-300",
                  active === i ? "border-cream" : "border-transparent"
                )}
              >
                {t.word}
              </span>
            </button>
          ))}
        </div>

        {/* Right-hand content */}
        <div className="mt-8 lg:ml-[clamp(200px,18vw,260px)] lg:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab.key}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {tab.key === "formulation" && <FormulationCards />}
              {tab.key === "purity" && <PurityList />}
              {tab.key === "traceability" && <TraceCarousel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FormulationCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
      {CARDS.map((c) => (
        <article key={c.title} className="rounded-[14px] bg-beige p-3.5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-sand">
            <Image
              src={c.img}
              alt=""
              fill
              sizes="(max-width:640px) 92vw, 30vw"
              className={cn("object-cover", c.pos)}
            />
          </div>
          <h3 className="mt-4 font-sans text-[14px] font-semibold tracking-[0.01em] text-espresso">
            {c.title}
          </h3>
          <p className="mb-1 mt-2 text-[15px] font-light leading-relaxed text-clay">{c.body}</p>
        </article>
      ))}
    </div>
  );
}

function PurityList() {
  return (
    <ul className="ml-auto max-w-[460px] border-t border-cream/40 lg:mt-[-40px]">
      {CHECKS.map((c) => (
        <li
          key={c.title}
          className="grid grid-cols-[minmax(0,110px)_1fr] gap-5 border-b border-cream/40 py-5 sm:grid-cols-[130px_1fr] sm:gap-6"
        >
          <span className="font-serif text-[clamp(1.375rem,2vw,1.75rem)] leading-[1.05] tracking-display text-cream">
            {c.title}
          </span>
          <span className="text-[15px] font-light leading-relaxed text-cream/85">{c.body}</span>
        </li>
      ))}
    </ul>
  );
}

function TraceCarousel() {
  const [i, setI] = useState(0);
  const item = TRACE[i];
  const p = item.product!;
  const step = (d: 1 | -1) => setI((n) => (n + d + TRACE.length) % TRACE.length);

  return (
    <div className="ml-auto w-full max-w-[560px] lg:mt-[-60px]">
      <div className="relative aspect-square overflow-hidden rounded-[12px] bg-beige sm:aspect-[5/4]">
        <AnimatePresence initial={false}>
          <motion.div
            key={item.img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-0"
          >
            <Link href={`/products/${p.slug}`} aria-label={p.name} className="absolute inset-0">
              <Image src={item.img} alt={p.name} fill sizes="(max-width:1024px) 92vw, 40vw" className="object-cover" />
            </Link>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous compound"
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-espresso/85 text-cream transition-colors hover:bg-espresso"
        >
          <FiArrowLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next compound"
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-espresso/85 text-cream transition-colors hover:bg-espresso"
        >
          <FiArrowRight size={16} />
        </button>

        <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-2 px-3 pb-4">
          {[p.name, p.batchNumber && `Batch ${p.batchNumber}`, p.purity && `${p.purity} purity`]
            .filter(Boolean)
            .map((t) => (
              <span
                key={t as string}
                className="rounded-[6px] bg-cream/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-espresso backdrop-blur-sm sm:text-[13px]"
              >
                {t}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
