"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const MESSAGES = [
  "Research use only — not for human or veterinary consumption",
  "Every batch independently Janoshik tested · 99%+ HPLC purity",
  "Batch-level certificate of analysis with every order",
  "Tracked, discreet dispatch on all orders",
];

const INTERVAL = 5000;

/**
 * Chartreuse utility strip above the header. Rotates through short
 * messages on a timer, with arrow controls either side.
 */
export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const go = (step: 1 | -1) => {
    setDir(step);
    setIndex((i) => (i + step + MESSAGES.length) % MESSAGES.length);
  };

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused]);

  return (
    <div
      className="relative z-10 bg-chartreuse text-espresso"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x flex h-8 items-center justify-between gap-3">
        <button
          type="button"
          aria-label="Previous message"
          onClick={() => go(-1)}
          className="grid h-7 w-7 flex-none place-items-center transition-opacity hover:opacity-60"
        >
          <FiArrowLeft size={14} />
        </button>

        <div className="relative h-full flex-1 overflow-hidden" aria-live="polite">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.p
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center truncate text-center text-[11px] font-semibold uppercase leading-none tracking-[0.06em] sm:text-[12px]"
            >
              {MESSAGES[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="Next message"
          onClick={() => go(1)}
          className="grid h-7 w-7 flex-none place-items-center transition-opacity hover:opacity-60"
        >
          <FiArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
