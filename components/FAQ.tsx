"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { FAQS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Home FAQ: heading on the left, a narrow ruled list of questions on the
 * right. One answer opens at a time; the plus turns into a cross.
 */
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-pad border-t border-sand">
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-16">
        <div>
          <h2 className="display-3 font-serif text-espresso">Vora Labs FAQs</h2>
          <p className="mt-3 text-[15px] font-light text-clay">
            Shipping, returns, testing and storage — answered.
          </p>
        </div>

        <ul className="border-t border-sand">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-sand">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium text-espresso sm:text-[16px]">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex-none text-espresso"
                  >
                    <FiPlus size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-5 text-[15px] font-light leading-relaxed text-clay">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
