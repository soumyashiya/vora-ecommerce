"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = { key: string; label: string; body: React.ReactNode };

/**
 * Underlined tab row rather than a pill switcher — it keeps the panel flat
 * and lets the rule align with the section dividers around it.
 */
export default function ProductInfoTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key ?? "");
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div className="min-w-0">
      <div
        role="tablist"
        aria-label="Product information"
        className="no-scrollbar flex gap-x-5 overflow-x-auto border-b border-sand sm:gap-x-7"
      >
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.key)}
              className={`tap-pad relative flex-none whitespace-nowrap pb-3 text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.06em] transition-colors ${
                isActive ? "text-espresso" : "text-clay hover:text-espresso"
              }`}
            >
              {t.label}
              {isActive && (
                <motion.span
                  layoutId="info-tab-underline"
                  className="absolute inset-x-0 bottom-0 h-px bg-espresso"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] font-light leading-relaxed text-clay"
          >
            {current.body}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
